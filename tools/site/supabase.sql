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

create or replace function halftime._num(v jsonb) returns real language sql immutable as $$
  select case when jsonb_typeof(v) = 'number' then (v #>> '{}')::real
              when jsonb_typeof(v) = 'string' and (v #>> '{}') ~ '^-?[0-9]+(\.[0-9]+)?$' then (v #>> '{}')::real end $$;

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
