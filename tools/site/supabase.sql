-- Halftime prototype analytics in Supabase (project "Heramb Stylist proj"; everything lives in its own `halftime`
-- schema, so it never touches other tables in that project).
--
-- How it fits together
--   browser (site/assets/track.js) → Vercel /api/collect (adds IP + place) → public.halftime_ingest()   → halftime.events
--   /admin page → Vercel /api/admin (session cookie)                        → public.halftime_admin_*() → JSON views
-- The tables have row-level security on and no policies, and the schema isn't exposed, so the public (publishable)
-- key can't read or write them directly: only these functions can, and the admin ones need a signed-in session.
-- Re-runnable: everything is "if not exists" / "create or replace".

create schema if not exists halftime;
create extension if not exists pgcrypto with schema extensions;
revoke all on schema halftime from public, anon, authenticated;

create table if not exists halftime.events (
  id          bigint generated always as identity primary key,
  received_at timestamptz not null default now(),
  ip text, country text, region text, city text,
  visitor text not null, session text, name text,
  device text, os text, browser text, screen text, viewport text,
  event text not null, page text, state text, target text,
  x real, y real, scroll real, dwell integer, value text,
  client_time timestamptz, seq integer, ref text, extra jsonb,
  test boolean not null default false
);
create index if not exists events_time    on halftime.events (received_at desc);
create index if not exists events_visitor on halftime.events (visitor, received_at);
create index if not exists events_session on halftime.events (session, received_at);
create index if not exists events_event   on halftime.events (event, received_at);
create unique index if not exists events_session_seq on halftime.events (session, seq); -- one row per event, even if a batch is sent twice

create table if not exists halftime.admins (
  username text primary key, pass_hash text not null, created_at timestamptz not null default now()
);
create table if not exists halftime.admin_sessions (
  token_hash text primary key, username text not null references halftime.admins on delete cascade,
  created_at timestamptz not null default now(), expires_at timestamptz not null, ip text
);
create table if not exists halftime.login_attempts (
  id bigint generated always as identity primary key, ip text, username text, ok boolean not null, at timestamptz not null default now()
);
create index if not exists login_attempts_ip on halftime.login_attempts (ip, at desc);

alter table halftime.events         enable row level security;
alter table halftime.admins         enable row level security;
alter table halftime.admin_sessions enable row level security;
alter table halftime.login_attempts enable row level security;

-- ---------------------------------------------------------------- helpers
create or replace function halftime._ts(t text) returns timestamptz language plpgsql stable as $$
begin return t::timestamptz; exception when others then return null; end $$;

-- A number too big for the columns it feeds (real, integer) counts as missing, so one odd event can't make a cast
-- fail and take a whole batch or an admin view down with it.
create or replace function halftime._num(v jsonb) returns real language sql immutable as $$
  select case when jsonb_typeof(v) = 'number' and abs((v #>> '{}')::numeric) < 2000000000 then (v #>> '{}')::real
              when jsonb_typeof(v) = 'string' and (v #>> '{}') ~ '^-?[0-9]{1,9}(\.[0-9]{1,9})?$' then (v #>> '{}')::real end $$;

create or replace function halftime._s(v jsonb, n int) returns text language sql immutable as $$
  select nullif(left(case when v is null or jsonb_typeof(v) = 'null' then '' when jsonb_typeof(v) = 'string' then v #>> '{}' else v::text end, n), '') $$;

alter function halftime._ts(text) set search_path = pg_catalog;
alter function halftime._num(jsonb) set search_path = pg_catalog;
alter function halftime._s(jsonb, int) set search_path = pg_catalog;

-- ---------------------------------------------------------------- ingest (called by /api/collect only)
-- p = { rows: [event...], ip, country, region, city, test }
create or replace function public.halftime_ingest(p jsonb) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare n int; v text; recent int;
begin
  if jsonb_typeof(p->'rows') <> 'array' then return jsonb_build_object('ok', false, 'error', 'no rows'); end if;
  v := halftime._s(p->'rows'->0->'visitor', 64);
  if v is null then return jsonb_build_object('ok', false, 'error', 'no visitor'); end if;
  -- one browser can't flood the table: at most 2,000 events a minute per visitor
  select count(*) into recent from halftime.events where visitor = v and received_at > now() - interval '1 minute';
  if recent > 2000 then return jsonb_build_object('ok', true, 'stored', 0, 'throttled', true); end if;
  insert into halftime.events (ip, country, region, city, visitor, session, name, device, os, browser, screen, viewport,
    event, page, state, target, x, y, scroll, dwell, value, client_time, seq, ref, extra, test)
  select halftime._s(p->'ip', 64), halftime._s(p->'country', 8), halftime._s(p->'region', 60), halftime._s(p->'city', 80),
    halftime._s(e->'visitor', 64), halftime._s(e->'session', 64), halftime._s(e->'name', 40),
    halftime._s(e->'device', 16), halftime._s(e->'os', 16), halftime._s(e->'browser', 24), halftime._s(e->'screen', 24), halftime._s(e->'viewport', 24),
    coalesce(halftime._s(e->'event', 40), 'unknown'), halftime._s(e->'page', 80), halftime._s(e->'state', 60), halftime._s(e->'target', 160),
    halftime._num(e->'x'), halftime._num(e->'y'), halftime._num(e->'scroll'), halftime._num(e->'dwell')::int, halftime._s(e->'value', 200),
    halftime._ts(halftime._s(e->'t', 40)), halftime._num(e->'seq')::int, halftime._s(e->'ref', 120),
    case when jsonb_typeof(e->'extra') in ('object', 'array') and length((e->'extra')::text) < 4000 then e->'extra' end,
    coalesce((p->>'test')::boolean, false)
  from jsonb_array_elements(p->'rows') with ordinality as r(e, i)
  where i <= 200 and jsonb_typeof(e) = 'object' and halftime._s(e->'visitor', 64) is not null
  on conflict (session, seq) do nothing; -- a batch sent twice (retry, or resent as the page closed) is stored once
  get diagnostics n = row_count;
  return jsonb_build_object('ok', true, 'stored', n);
end $$;

-- ---------------------------------------------------------------- admin accounts and sessions
-- Create or reset an admin. Not callable from the website: run it in the SQL editor.
create or replace function public.halftime_admin_create(p_user text, p_pass text) returns void
language plpgsql security definer set search_path = halftime, public, extensions as $$
begin
  if length(p_pass) < 12 then raise exception 'password must be at least 12 characters'; end if;
  insert into halftime.admins (username, pass_hash) values (lower(p_user), crypt(p_pass, gen_salt('bf', 10)))
  on conflict (username) do update set pass_hash = excluded.pass_hash;
  delete from halftime.admin_sessions where username = lower(p_user);
end $$;

-- 8 wrong tries from one IP in 15 minutes locks that IP out for the rest of the 15 minutes
create or replace function public.halftime_admin_login(p_user text, p_pass text, p_ip text) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare h text; tok text; fails int;
begin
  select count(*) into fails from halftime.login_attempts where ip = p_ip and not ok and at > now() - interval '15 minutes';
  if fails >= 8 then return jsonb_build_object('ok', false, 'error', 'locked'); end if;
  select pass_hash into h from halftime.admins where username = lower(left(p_user, 64));
  if h is null or h <> crypt(left(p_pass, 200), h) then
    insert into halftime.login_attempts (ip, username, ok) values (p_ip, left(p_user, 64), false);
    return jsonb_build_object('ok', false, 'error', 'wrong');
  end if;
  insert into halftime.login_attempts (ip, username, ok) values (p_ip, lower(p_user), true);
  tok := encode(gen_random_bytes(32), 'hex');
  insert into halftime.admin_sessions (token_hash, username, expires_at, ip) values (encode(digest(tok, 'sha256'), 'hex'), lower(p_user), now() + interval '7 days', p_ip);
  delete from halftime.admin_sessions where expires_at < now();
  return jsonb_build_object('ok', true, 'token', tok, 'user', lower(p_user));
end $$;

create or replace function halftime._who(p_token text) returns text
language sql stable security definer set search_path = halftime, public, extensions as $$
  select username from halftime.admin_sessions where token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex') and expires_at > now() $$;

create or replace function public.halftime_admin_logout(p_token text) returns void
language sql security definer set search_path = halftime, public, extensions as $$
  delete from halftime.admin_sessions where token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex') $$;

create or replace function public.halftime_admin_password(p_token text, p_old text, p_new text) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare u text := halftime._who(p_token); h text;
begin
  if u is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select pass_hash into h from halftime.admins where username = u;
  if h <> crypt(p_old, h) then return jsonb_build_object('ok', false, 'error', 'wrong'); end if;
  if length(p_new) < 12 then return jsonb_build_object('ok', false, 'error', 'short'); end if;
  update halftime.admins set pass_hash = crypt(p_new, gen_salt('bf', 10)) where username = u;
  delete from halftime.admin_sessions where username = u and token_hash <> encode(digest(p_token, 'sha256'), 'hex');
  return jsonb_build_object('ok', true);
end $$;

-- ---------------------------------------------------------------- the dashboard's data
-- p_args: { range: "live" | "today" | "24h" | "7d" | "all", tests: bool, page, state, visitor }
create or replace function public.halftime_admin_data(p_token text, p_view text, p_args jsonb default '{}') returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare
  u text := halftime._who(p_token);
  rng text := coalesce(p_args->>'range', '24h');
  since timestamptz := case rng when 'live' then now() - interval '30 minutes' when 'today' then date_trunc('day', now() at time zone 'America/New_York') at time zone 'America/New_York'
                                when '24h' then now() - interval '24 hours' when '7d' then now() - interval '7 days' else '-infinity'::timestamptz end;
  tests boolean := coalesce((p_args->>'tests')::boolean, false);
  res jsonb;
begin
  if u is null then return jsonb_build_object('error', 'auth'); end if;

  create temp table if not exists _ev on commit drop as select * from halftime.events limit 0;
  truncate _ev;
  if p_view in ('visitor', 'heat', 'me') then null;
  else insert into _ev select * from halftime.events where received_at >= since and (tests or not test); end if;

  if p_view = 'me' then
    return jsonb_build_object('user', u, 'total', (select count(*) from halftime.events where not test), 'since', (select min(received_at) from halftime.events where not test));

  elsif p_view = 'pulse' then
    select jsonb_build_object(
      'now', (select count(distinct visitor) from halftime.events where received_at > now() - interval '2 minutes' and (tests or not test)),
      'active', coalesce((select jsonb_agg(a order by a->>'last' desc) from (
          select distinct on (visitor) jsonb_build_object('visitor', visitor, 'name', name, 'page', page, 'state', state, 'device', device, 'os', os,
                 'city', city, 'last', received_at, 'event', event) a
          from halftime.events where received_at > now() - interval '2 minutes' and (tests or not test)
          order by visitor, received_at desc) s), '[]'),
      'visitors', (select count(distinct visitor) from _ev),
      'sessions', (select count(distinct session) from _ev),
      'named',    (select count(distinct visitor) from _ev where name is not null),
      'events',   (select count(*) from _ev),
      'errors',   (select count(*) from _ev where event = 'js_error'),
      'rage',     (select count(*) from _ev where event = 'rage_tap'),
      'qr',       (select count(distinct visitor) from _ev where event = 'page_view' and extra->>'q' like '%src=qr%'),
      'avg_minutes', (select round(avg(m)::numeric, 1) from (select extract(epoch from max(received_at) - min(received_at)) / 60 m from _ev group by session having count(*) > 3) t),
      'series', coalesce((select jsonb_agg(jsonb_build_array(b, v, e) order by b) from (
          select date_bin(case when rng in ('live') then interval '1 minute' when rng in ('today', '24h') then interval '30 minutes' when rng = '7d' then interval '6 hours' else interval '1 day' end, received_at at time zone 'America/New_York', '2026-01-01') at time zone 'America/New_York' b,
                 count(distinct visitor) v, count(*) e from _ev group by 1) t), '[]'),
      'feed', coalesce((select jsonb_agg(f) from (select jsonb_build_object('at', received_at, 'name', coalesce(name, left(visitor, 6)), 'visitor', visitor, 'event', event, 'page', page, 'state', state, 'value', value, 'target', target) f
          from _ev where event in ('screen_view', 'account_created', 'identify', 'tour_done', 'tour_skip', 'rage_tap', 'js_error', 'calendar_connected', 'consent')
          order by received_at desc limit 40) t), '[]')
    ) into res;

  elsif p_view = 'funnel' then
    with v as (
      select visitor,
        bool_or(page = '/') landed, bool_or(page = '/start') started, bool_or(event = 'account_created') created, bool_or(event = 'identify') named,
        bool_or(page = '/app') app, bool_or(event = 'tour_done') tour, bool_or(event = 'screen_view' and value = 'walk') saw,
        bool_or(event = 'screen_view' and value in ('running', 'walking', 'live')) took,
        (array_agg(extra->>'role' order by received_at desc) filter (where event = 'account_created'))[1] role,
        (array_agg(value order by received_at desc) filter (where event = 'account_created'))[1] wearable
      from _ev group by visitor)
    select jsonb_build_object(
      'steps', jsonb_build_array(
        jsonb_build_array('Opened the landing page', count(*) filter (where landed)),
        jsonb_build_array('Went to log in or set up', count(*) filter (where started)),
        jsonb_build_array('Typed a name', count(*) filter (where named)),
        jsonb_build_array('Finished setup', count(*) filter (where created)),
        jsonb_build_array('Opened the app', count(*) filter (where app)),
        jsonb_build_array('Finished the tour', count(*) filter (where tour)),
        jsonb_build_array('Saw "Short walk now?"', count(*) filter (where saw)),
        jsonb_build_array('Took the walk', count(*) filter (where took))),
      'roles', coalesce((select jsonb_object_agg(coalesce(role, 'unknown'), c) from (select role, count(*) c from v where created group by role) r), '{}'),
      'wearables', coalesce((select jsonb_object_agg(coalesce(wearable, 'unknown'), c) from (select wearable, count(*) c from v where created group by wearable) w), '{}'),
      'setup_steps', coalesce((select jsonb_agg(jsonb_build_array(value, c) order by c desc) from (
          select value, count(distinct visitor) c from _ev where page = '/start' and event = 'screen_view' group by value) s), '[]')
    ) into res from v;

  elsif p_view = 'screens' then
    select jsonb_build_object(
      'screens', coalesce((select jsonb_agg(s order by (s->>'views')::int desc) from (
          select jsonb_build_object('page', page, 'screen', value, 'views', count(*), 'people', count(distinct visitor),
                 'avg_s', round(avg(dwell)::numeric / 1000, 1), 'median_s', round((percentile_cont(0.5) within group (order by dwell))::numeric / 1000, 1),
                 'avg_scroll', round(avg(scroll)::numeric)) s
          from _ev where event = 'screen_leave' and dwell between 0 and 3600000 group by page, value) t), '[]'),
      'exits', coalesce((select jsonb_agg(jsonb_build_array(page, value, c) order by c desc) from (
          select page, value, count(*) c from (select distinct on (session) page, value from _ev where event = 'screen_view' order by session, received_at desc) l group by page, value) t), '[]'),
      'attention', coalesce((select jsonb_agg(jsonb_build_array(target, s, p) order by s desc) from (
          select target, round(sum(dwell)::numeric / 1000) s, count(distinct visitor) p from _ev where event = 'attention' group by target) t), '[]'),
      'scroll', coalesce((select jsonb_agg(jsonb_build_array(state, scroll, c) order by state, scroll) from (
          select state, scroll, count(distinct session) c from _ev where event = 'scroll_depth' and page = '/' group by state, scroll) t), '[]')
    ) into res;

  elsif p_view = 'tour' then
    select jsonb_build_object(
      'steps', coalesce((select jsonb_agg(jsonb_build_array(value, c) order by o) from (
          select value, count(distinct visitor) c, min(case value when 'compare' then 0 when 'pill' then 1 when 'forecast' then 2 when 'body' then 3 when 'calendar' then 4
                 when 'card' then 5 when 'sources' then 6 when 'decide' then 7 when 'tabs' then 8 else 9 end) o
          from _ev where event = 'tour_step' group by value) t), '[]'),
      'started', (select count(distinct visitor) from _ev where event = 'tour_step'),
      'done',    (select count(distinct visitor) from _ev where event = 'tour_done'),
      'skipped', (select count(distinct visitor) from _ev where event = 'tour_skip'),
      'skipped_at', coalesce((select jsonb_agg(jsonb_build_array(step, c) order by c desc) from (
          select (select value from _ev s where s.session = k.session and s.event = 'tour_step' and s.received_at <= k.received_at order by s.received_at desc, s.seq desc limit 1) step, count(*) c
          from _ev k where k.event = 'tour_skip' group by 1) t), '[]'),
      'replays', (select count(*) from _ev where event = 'tap' and target ~* '(replay the tour|take the tour)')
    ) into res;

  elsif p_view = 'taps' then
    select jsonb_build_object(
      'top', coalesce((select jsonb_agg(jsonb_build_array(page, target, c, p) order by c desc) from (
          select page, target, count(*) c, count(distinct visitor) p from _ev where event = 'tap' group by page, target order by c desc limit 40) t), '[]'),
      'rage', coalesce((select jsonb_agg(jsonb_build_array(page, state, target, c) order by c desc) from (
          select page, state, target, count(*) c from _ev where event = 'rage_tap' group by page, state, target order by c desc limit 20) t), '[]'),
      'dead', coalesce((select jsonb_agg(jsonb_build_array(page, state, target, c) order by c desc) from (
          select page, state, target, count(*) c from _ev where event = 'dead_tap' group by page, state, target order by c desc limit 20) t), '[]'),
      'screens', coalesce((select jsonb_agg(jsonb_build_array(page, state, c) order by c desc) from (
          select page, state, count(*) c from _ev where event in ('tap', 'dead_tap') and x is not null group by page, state order by c desc limit 40) t), '[]')
    ) into res;

  elsif p_view = 'heat' then
    select jsonb_build_object('points', coalesce(jsonb_agg(jsonb_build_array(x, y, case event when 'tap' then 0 when 'dead_tap' then 1 else 2 end, device)), '[]'),
      'n', (select count(*) from halftime.events where received_at >= since and (tests or not test) and event in ('tap', 'dead_tap', 'rage_tap') and x is not null
              and page = p_args->>'page' and coalesce(state, '') = coalesce(p_args->>'state', '')))
    into res from (select x, y, event, device from halftime.events
      where received_at >= since and (tests or not test) and event in ('tap', 'dead_tap', 'rage_tap') and x is not null
        and page = p_args->>'page' and coalesce(state, '') = coalesce(p_args->>'state', '') order by received_at desc limit 4000) t;

  elsif p_view = 'visitors' then
    select coalesce(jsonb_agg(v order by v->>'last' desc), '[]') into res from (
      select jsonb_build_object('visitor', visitor,
        'name', (array_agg(name order by received_at desc) filter (where name is not null))[1],
        'first', min(received_at), 'last', max(received_at), 'ip', (array_agg(ip order by received_at desc))[1],
        'city', (array_agg(city order by received_at desc))[1], 'region', (array_agg(region order by received_at desc))[1], 'country', (array_agg(country order by received_at desc))[1],
        'device', (array_agg(device order by received_at desc))[1], 'os', (array_agg(os order by received_at desc))[1], 'browser', (array_agg(browser order by received_at desc))[1],
        'viewport', (array_agg(viewport order by received_at desc))[1],
        'sessions', count(distinct session), 'events', count(*), 'taps', count(*) filter (where event = 'tap'),
        'minutes', round((sum(dwell) filter (where event = 'screen_leave'))::numeric / 60000, 1),
        'role', (array_agg(extra->>'role' order by received_at desc) filter (where event = 'account_created'))[1],
        'wearable', (array_agg(value order by received_at desc) filter (where event = 'account_created'))[1],
        'stage', case when bool_or(event = 'screen_view' and value = 'walk') then 'saw suggestion' when bool_or(event = 'tour_done') then 'finished tour'
                      when bool_or(page = '/app') then 'opened app' when bool_or(event = 'account_created') then 'finished setup'
                      when bool_or(page = '/start') then 'started setup' else 'landing only' end,
        'qr', bool_or(event = 'page_view' and extra->>'q' like '%src=qr%'),
        'errors', count(*) filter (where event = 'js_error')) v
      from _ev group by visitor order by max(received_at) desc limit 500) t;

  elsif p_view = 'visitor' then
    select jsonb_build_object('events', coalesce(jsonb_agg(e order by (e->>'id')::bigint desc), '[]')) into res from (
      select jsonb_build_object('id', id, 'at', received_at, 'session', session, 'event', event, 'page', page, 'state', state, 'target', target, 'value', value,
             'x', x, 'y', y, 'scroll', scroll, 'dwell', dwell, 'name', name, 'ip', ip, 'city', city, 'device', device, 'os', os, 'browser', browser, 'viewport', viewport,
             'extra', case when event = 'movement' then null else extra end) e
      from halftime.events where visitor = p_args->>'visitor' and (tests or not test) order by id desc limit 1500) t;

  elsif p_view = 'devices' then
    select jsonb_build_object(
      'devices', coalesce((select jsonb_agg(jsonb_build_array(device, os, browser, c) order by c desc) from (select device, os, browser, count(distinct visitor) c from _ev group by 1, 2, 3) t), '[]'),
      'viewports', coalesce((select jsonb_agg(jsonb_build_array(viewport, c) order by c desc) from (select viewport, count(distinct visitor) c from _ev group by 1 order by 2 desc limit 15) t), '[]'),
      'places', coalesce((select jsonb_agg(jsonb_build_array(country, region, city, c) order by c desc) from (select country, region, city, count(distinct visitor) c from _ev group by 1, 2, 3 order by 4 desc limit 30) t), '[]'),
      'sources', coalesce((select jsonb_agg(jsonb_build_array(s, c) order by c desc) from (
          select case when extra->>'q' like '%src=qr%' then 'QR code' when coalesce(ref, '') = '' then 'Direct / typed' else ref end s, count(distinct visitor) c
          from _ev where event = 'page_view' group by 1) t), '[]'),
      'prefs', jsonb_build_object('dark', (select count(distinct visitor) from _ev where event = 'page_view' and extra->>'dark' = 'true'),
                                  'reduce_motion', (select count(distinct visitor) from _ev where event = 'page_view' and extra->>'reduceMotion' = 'true'),
                                  'returning', (select count(distinct visitor) from _ev where event = 'page_view' and extra->>'returning' = 'true'))
    ) into res;

  elsif p_view = 'health' then
    select jsonb_build_object(
      'lcp', coalesce((select jsonb_agg(jsonb_build_array(page, p50, p75, n)) from (select page, percentile_cont(0.5) within group (order by value::numeric) p50, percentile_cont(0.75) within group (order by value::numeric) p75, count(*) n
          from _ev where event = 'lcp' and value ~ '^[0-9.]+$' group by page) t), '[]'),
      'cls', coalesce((select jsonb_agg(jsonb_build_array(page, p75, n)) from (select page, percentile_cont(0.75) within group (order by value::numeric) p75, count(*) n
          from _ev where event = 'cls' and value ~ '^[0-9.]+$' group by page) t), '[]'),
      'slow', coalesce((select jsonb_agg(jsonb_build_array(page, target, c, mx) order by c desc) from (select page, target, count(*) c, max(value::numeric) mx
          from _ev where event = 'slow_interaction' and value ~ '^[0-9.]+$' group by page, target order by c desc limit 15) t), '[]'),
      'load', coalesce((select jsonb_agg(jsonb_build_array(page, p50, n)) from (select page, percentile_cont(0.5) within group (order by (extra->>'load')::numeric) p50, count(*) n
          from _ev where event = 'perf' and extra->>'load' ~ '^[0-9]+$' and (extra->>'load')::numeric > 0 group by page) t), '[]'),
      'errors', coalesce((select jsonb_agg(jsonb_build_array(value, target, c, last, p) order by c desc) from (select value, target, count(*) c, max(received_at) last, count(distinct visitor) p
          from _ev where event = 'js_error' group by value, target order by c desc limit 25) t), '[]'),
      'opted_out', (select count(distinct visitor) from _ev where event = 'consent' and value = 'opt_out')
    ) into res;

  elsif p_view = 'export' then
    select coalesce(jsonb_agg(jsonb_build_array(received_at, ip, country, region, city, visitor, session, name, device, os, browser, screen, viewport,
           event, page, state, target, x, y, scroll, dwell, value, client_time, seq, ref, extra) order by id), '[]') into res
    from (select * from _ev order by id desc limit 50000) t;

  else
    return jsonb_build_object('error', 'unknown view');
  end if;
  return coalesce(res, '{}'::jsonb);
end $$;

-- ---------------------------------------------------------------- who can call what
revoke all on function public.halftime_ingest(jsonb), public.halftime_admin_create(text, text), public.halftime_admin_login(text, text, text),
  public.halftime_admin_logout(text), public.halftime_admin_password(text, text, text), public.halftime_admin_data(text, text, jsonb) from public, anon, authenticated;
revoke all on function halftime._ts(text), halftime._num(jsonb), halftime._s(jsonb, int), halftime._who(text) from public, anon, authenticated;
grant execute on function public.halftime_ingest(jsonb), public.halftime_admin_login(text, text, text), public.halftime_admin_logout(text),
  public.halftime_admin_password(text, text, text), public.halftime_admin_data(text, text, jsonb) to anon;
-- halftime_admin_create stays with the database owner only (SQL editor).

-- ================================================================ real study sessions (added 2026-11-13)
-- Study sessions, suggestions, check-ins and the SUS survey arrive as ordinary events through halftime_ingest
-- (study_start, study_suggest, study_response, study_break, study_end, study_checkin, study_sus, consent_study),
-- each with extra.study = the session's id and extra.arm = 'halftime' | 'pomodoro'. Nothing new is needed to store
-- them. What is new here: Web Push delivery, "Delete my data", and the admin view that compares the two arms.

-- ---------------------------------------------------------------- web push: one address per visitor, and a queue
create table if not exists halftime.push_subs (
  visitor text primary key, endpoint text not null, p256dh text not null, auth text not null,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), test boolean not null default false
);
create table if not exists halftime.push_jobs (
  id bigint generated always as identity primary key,
  visitor text not null, study text, kind text not null, m integer not null default 0,
  fire_at timestamptz not null, state text not null default 'pending', -- pending → claimed → sent | failed; or cancelled | expired
  token text not null default encode(extensions.gen_random_bytes(24), 'hex'),
  attempts integer not null default 0, claimed_at timestamptz, sent_at timestamptz, status integer, error text,
  created_at timestamptz not null default now(), test boolean not null default false
);
create index if not exists push_jobs_due on halftime.push_jobs (fire_at) where state = 'pending';
create index if not exists push_jobs_visitor on halftime.push_jobs (visitor, state);
alter table halftime.push_subs enable row level security;
alter table halftime.push_jobs enable row level security;

-- p = { visitor, endpoint, p256dh, auth, test }
create or replace function public.halftime_push_save(p jsonb) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare v text := halftime._s(p->'visitor', 64);
begin
  -- only real browser push services (the same list as site/api/_webpush.js), and a ceiling on how many phones
  if v is null or length(v) < 16 or coalesce(halftime._s(p->'endpoint', 600), '') !~ '^https://([a-z0-9-]+\.)*(push\.apple\.com|fcm\.googleapis\.com|push\.services\.mozilla\.com|notify\.windows\.com)/'
    then return jsonb_build_object('ok', false, 'error', 'bad'); end if;
  if not exists (select 1 from halftime.push_subs where visitor = v) and (select count(*) from halftime.push_subs) >= 2000 then return jsonb_build_object('ok', false, 'error', 'full'); end if;
  insert into halftime.push_subs (visitor, endpoint, p256dh, auth, test)
  values (v, halftime._s(p->'endpoint', 600), halftime._s(p->'p256dh', 200), halftime._s(p->'auth', 80), coalesce((p->>'test')::boolean, false))
  on conflict (visitor) do update set endpoint = excluded.endpoint, p256dh = excluded.p256dh, auth = excluded.auth, updated_at = now(), test = excluded.test;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.halftime_push_remove(p_visitor text) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
begin
  update halftime.push_jobs set state = 'cancelled' where visitor = p_visitor and state = 'pending';
  delete from halftime.push_subs where visitor = p_visitor;
  return jsonb_build_object('ok', true);
end $$;

-- p = { visitor, study, jobs: [{ kind, at, m }], replace, test }. Only for a visitor with a saved push address;
-- at most 24 notifications, each within the next 12 hours. The words sent are fixed templates picked by `kind`
-- (site/api/push.js), so this can't be used to send free text.
create or replace function public.halftime_push_schedule(p jsonb) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare v text := halftime._s(p->'visitor', 64); n int;
begin
  if v is null or jsonb_typeof(p->'jobs') <> 'array' then return jsonb_build_object('ok', false, 'error', 'bad'); end if;
  if not exists (select 1 from halftime.push_subs where visitor = v) then return jsonb_build_object('ok', true, 'scheduled', 0, 'reason', 'no_sub'); end if;
  if coalesce((p->>'replace')::boolean, true) then update halftime.push_jobs set state = 'cancelled' where visitor = v and state = 'pending'; end if;
  -- one phone can't fill the queue: at most 30 waiting, and 400 queued a day
  if (select count(*) from halftime.push_jobs where visitor = v and state = 'pending') + least(jsonb_array_length(p->'jobs'), 24) > 30
     or (select count(*) from halftime.push_jobs where visitor = v and created_at > now() - interval '1 day') > 400 then return jsonb_build_object('ok', true, 'scheduled', 0, 'reason', 'limit'); end if;
  insert into halftime.push_jobs (visitor, study, kind, m, fire_at, test)
  select v, halftime._s(p->'study', 64), halftime._s(j->'kind', 24), coalesce(halftime._num(j->'m')::int, 0), halftime._ts(halftime._s(j->'at', 40)), coalesce((p->>'test')::boolean, false)
  from jsonb_array_elements(p->'jobs') with ordinality as r(j, i)
  where i <= 24 and halftime._s(j->'kind', 24) in ('suggest_walk', 'suggest_break', 'suggest_keep', 'break_over', 'pomo_break', 'pomo_work')
    and halftime._ts(halftime._s(j->'at', 40)) between now() - interval '1 minute' and now() + interval '12 hours';
  get diagnostics n = row_count;
  return jsonb_build_object('ok', true, 'scheduled', n);
end $$;

-- p = { visitor, study, kinds: [..] | null }
create or replace function public.halftime_push_cancel(p jsonb) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare n int;
begin
  update halftime.push_jobs set state = 'cancelled'
  where visitor = halftime._s(p->'visitor', 64) and state = 'pending'
    and (halftime._s(p->'study', 64) is null or study = halftime._s(p->'study', 64))
    and (jsonb_typeof(p->'kinds') <> 'array' or kind in (select jsonb_array_elements_text(p->'kinds')));
  get diagnostics n = row_count;
  return jsonb_build_object('ok', true, 'cancelled', n);
end $$;

-- Called by /api/push?op=send with the id and one-time token the timer below handed it.
create or replace function public.halftime_push_take(p_id bigint, p_token text) returns jsonb
language sql security definer set search_path = halftime, public, extensions as $$
  select coalesce((select jsonb_build_object('ok', true, 'kind', j.kind, 'm', j.m, 'study', j.study, 'endpoint', s.endpoint, 'p256dh', s.p256dh, 'auth', s.auth)
    from halftime.push_jobs j join halftime.push_subs s on s.visitor = j.visitor
    where j.id = p_id and j.token = p_token and j.state = 'claimed'), jsonb_build_object('ok', false)) $$;

create or replace function public.halftime_push_result(p_id bigint, p_token text, p_status int, p_error text default '') returns void
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare v text;
begin
  update halftime.push_jobs set state = case when p_status between 200 and 299 then 'sent' when p_status in (404, 410) or attempts >= 3 then 'failed' else 'pending' end,
    sent_at = now(), status = p_status, error = nullif(left(p_error, 200), '')
  where id = p_id and token = p_token and state = 'claimed' returning visitor into v;
  if v is not null and p_status in (404, 410) then delete from halftime.push_subs where visitor = v; end if; -- the phone removed the app or turned notifications off
end $$;

-- The timer: every 30 seconds pg_cron runs this. It hands notifications that are due to the website, which signs
-- and sends them (the signing key lives only in Vercel). Not in the public schema, so the website's key can't call it.
create extension if not exists pg_net;
create extension if not exists pg_cron;
create or replace function halftime._push_tick() returns void
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare j jsonb;
begin
  update halftime.push_jobs set state = case when attempts >= 3 then 'failed' else 'pending' end where state = 'claimed' and claimed_at < now() - interval '90 seconds';
  update halftime.push_jobs set state = 'expired' where state = 'pending' and fire_at < now() - interval '10 minutes'; -- too late to be useful
  with due as (
    update halftime.push_jobs set state = 'claimed', claimed_at = now(), attempts = attempts + 1
    where id in (select id from halftime.push_jobs where state = 'pending' and fire_at <= now() order by fire_at limit 100 for update skip locked)
    returning id, token)
  select jsonb_agg(jsonb_build_object('id', id, 'token', token)) into j from due;
  if j is not null then
    perform net.http_post(url := 'https://halftime-study.vercel.app/api/push?op=send', body := jsonb_build_object('jobs', j),
      headers := '{"Content-Type": "application/json"}'::jsonb, timeout_milliseconds := 9000);
  end if;
  delete from halftime.push_jobs where created_at < now() - interval '14 days';
end $$;
revoke all on function halftime._push_tick() from public, anon, authenticated;
select cron.unschedule(jobid) from cron.job where jobname in ('halftime-push', 'halftime-cron-clean');
select cron.schedule('halftime-push', '30 seconds', 'select halftime._push_tick()');
select cron.schedule('halftime-cron-clean', '17 9 * * *', $c$delete from cron.job_run_details where end_time < now() - interval '1 day' and jobid in (select jobid from cron.job where jobname like 'halftime-%')$c$);

-- ---------------------------------------------------------------- "Delete my data" (called by /api/forget)
-- Removes everything stored for one browser's visitor id. The id is a random uuid made on the phone.
create or replace function public.halftime_forget(p_visitor text) returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare n int;
begin
  if p_visitor is null or length(p_visitor) < 16 then return jsonb_build_object('ok', false, 'error', 'bad'); end if;
  delete from halftime.push_jobs where visitor = p_visitor;
  delete from halftime.push_subs where visitor = p_visitor;
  delete from halftime.events where visitor = p_visitor;
  get diagnostics n = row_count;
  -- one anonymous marker, so the admin page can count deletions without keeping anything about the person
  if n > 0 then insert into halftime.events (visitor, event, value) values ('deleted', 'data_deleted', n::text); end if;
  return jsonb_build_object('ok', true, 'deleted', n);
end $$;

-- ---------------------------------------------------------------- admin: the two arms side by side
-- p_args: { range, tests }. Sessions run at test speed (?speed=, extra.qa) count only when "Load tests" is ticked.
create or replace function public.halftime_admin_study(p_token text, p_args jsonb default '{}') returns jsonb
language plpgsql security definer set search_path = halftime, public, extensions as $$
declare
  u text := halftime._who(p_token);
  rng text := coalesce(p_args->>'range', '24h');
  since timestamptz := case rng when 'live' then now() - interval '30 minutes' when 'today' then date_trunc('day', now() at time zone 'America/New_York') at time zone 'America/New_York'
                                when '24h' then now() - interval '24 hours' when '7d' then now() - interval '7 days' else '-infinity'::timestamptz end;
  tests boolean := coalesce((p_args->>'tests')::boolean, false);
  res jsonb;
begin
  if u is null then return jsonb_build_object('error', 'auth'); end if;
  with ev as (
    select * from halftime.events where received_at >= since and (tests or not test)
      and event in ('study_start', 'study_suggest', 'study_response', 'study_break', 'study_end', 'study_checkin', 'study_sus', 'consent_study', 'push_status', 'data_deleted')),
  s as (
    select extra->>'study' sid, visitor, (array_agg(name order by received_at desc) filter (where name is not null))[1] nm,
      max(extra->>'arm') arm, bool_or(extra->>'qa' = 'true') qa,
      min(received_at) filter (where event = 'study_start') started,
      max(halftime._num(extra->'n')) filter (where event = 'study_start') n,
      max(halftime._num(extra->'planned')) filter (where event = 'study_start') planned,
      max(halftime._num(extra->'sleep_h')) filter (where event = 'study_start') sleep_h,
      max(extra->>'sleep_src') filter (where event = 'study_start') sleep_src,
      max(extra->>'push') filter (where event = 'study_start') push,
      bool_or(event = 'study_end') ended,
      max(halftime._num(extra->'minutes')) filter (where event = 'study_end') minutes,
      max(halftime._num(extra->'break_min')) filter (where event = 'study_end') break_min,
      count(*) filter (where event = 'study_suggest') suggested,
      count(*) filter (where event = 'study_suggest' and extra->>'via' = 'push') via_push,
      count(*) filter (where event = 'study_response' and value = 'take') taken,
      count(*) filter (where event = 'study_response' and value = 'keep') kept,
      count(*) filter (where event = 'study_response' and value = 'snooze') snoozed,
      count(*) filter (where event = 'study_response' and value = 'wrong') wrong_taps,
      count(*) filter (where event = 'study_break' and value = 'manual') manual_breaks,
      bool_or(event = 'study_checkin') checked,
      max(extra->>'finished') filter (where event = 'study_checkin') finished,
      max(extra->>'wrong') filter (where event = 'study_checkin') wrong,
      max(extra->'task'->>'id') filter (where event = 'study_checkin') task_id,
      max(halftime._num(extra->'task'->'score')) filter (where event = 'study_checkin') score
    from ev where event like 'study\_%' and event <> 'study_sus' and extra ? 'study' group by 1, 2),
  ok as (select * from s where arm in ('halftime', 'pomodoro') and started is not null and (tests or not coalesce(qa, false))),
  arms as (
    select arm, jsonb_build_object('arm', arm, 'sessions', count(*), 'people', count(distinct visitor), 'ended', count(*) filter (where ended), 'checkins', count(*) filter (where checked),
      'avg_min', round(avg(minutes)::numeric, 1), 'median_min', round((percentile_cont(0.5) within group (order by minutes))::numeric, 1), 'avg_planned', round(avg(planned)::numeric, 1),
      'suggested', sum(suggested), 'via_push', sum(via_push), 'taken', sum(taken), 'kept', sum(kept), 'snoozed', sum(snoozed), 'wrong_taps', sum(wrong_taps), 'manual_breaks', sum(manual_breaks),
      'fin_yes', count(*) filter (where finished = 'yes'), 'fin_mostly', count(*) filter (where finished = 'mostly'), 'fin_no', count(*) filter (where finished = 'no'),
      'wrong_no', count(*) filter (where wrong = 'no'), 'wrong_timing', count(*) filter (where wrong = 'timing'), 'wrong_reason', count(*) filter (where wrong = 'reason'), 'wrong_none', count(*) filter (where wrong = 'none'),
      'score_n', count(score), 'score_avg', round(avg(score)::numeric, 1), 'score_sd', round(stddev_samp(score)::numeric, 1)) a
    from ok group by arm)
  select jsonb_build_object(
    'arms', coalesce((select jsonb_agg(a order by arm) from arms), '[]'),
    'people', (select count(distinct visitor) from ok),
    'both_arms', (select count(*) from (select visitor from ok group by visitor having count(distinct arm) = 2) t),
    'sessions', coalesce((select jsonb_agg(x order by x->>'started' desc) from (select jsonb_build_object('study', sid, 'visitor', visitor, 'name', coalesce(nm, left(visitor, 6)), 'arm', arm, 'qa', coalesce(qa, false),
        'n', n, 'started', started, 'planned', planned, 'minutes', minutes, 'break_min', break_min, 'ended', ended, 'sleep_h', sleep_h, 'sleep_src', sleep_src, 'push', push,
        'suggested', suggested, 'via_push', via_push, 'taken', taken, 'kept', kept, 'snoozed', snoozed, 'checked', checked, 'finished', finished, 'wrong', wrong, 'task', task_id, 'score', score) x
      from ok order by started desc limit 300) t), '[]'),
    'sus', coalesce((select jsonb_agg(jsonb_build_object('visitor', visitor, 'name', coalesce(name, left(visitor, 6)), 'at', received_at, 'score', halftime._num(to_jsonb(value)), 'answers', extra->'answers', 'sessions', extra->'sessions') order by received_at desc)
      from ev where event = 'study_sus' and (tests or extra->>'qa' is distinct from 'true')), '[]'),
    'consent', coalesce((select jsonb_object_agg(value, c) from (select value, count(distinct visitor) c from ev where event = 'consent_study' and value is not null group by value) t), '{}'),
    'push', coalesce((select jsonb_object_agg(value, c) from (select value, count(distinct visitor) c from (select distinct on (visitor) visitor, value from ev where event = 'push_status' and value is not null order by visitor, received_at desc) l group by value) t), '{}'),
    'jobs', coalesce((select jsonb_object_agg(state, c) from (select state, count(*) c from halftime.push_jobs where created_at >= since and (tests or not test) group by state) t), '{}'),
    'subs', (select count(*) from halftime.push_subs where tests or not test),
    'deleted', (select count(*) from ev where event = 'data_deleted')
  ) into res;
  return coalesce(res, '{}'::jsonb);
end $$;

revoke all on function public.halftime_push_save(jsonb), public.halftime_push_remove(text), public.halftime_push_schedule(jsonb), public.halftime_push_cancel(jsonb),
  public.halftime_push_take(bigint, text), public.halftime_push_result(bigint, text, int, text), public.halftime_forget(text), public.halftime_admin_study(text, jsonb) from public, anon, authenticated;
grant execute on function public.halftime_push_save(jsonb), public.halftime_push_remove(text), public.halftime_push_schedule(jsonb), public.halftime_push_cancel(jsonb),
  public.halftime_push_take(bigint, text), public.halftime_push_result(bigint, text, int, text), public.halftime_forget(text), public.halftime_admin_study(text, jsonb) to anon;
