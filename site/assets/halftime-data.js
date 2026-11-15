/* Halftime data layer: the one place where the sources meet.

     watch or ring ─┐
     laptop ────────┼─► records ─► today's numbers ─► one fixed rule ─► the suggestion (phone and desktop read the same one)
     phone ─────────┤
     calendar ──────┘

   What is real today, and what is sample:
     watch     LIVE when /api/health answers (a Fitbit through the Google Health API), otherwise the sample nights.
     laptop    SAMPLE. The laptop app isn't built yet; this file makes one afternoon of app-category spans and switches.
     phone     SAMPLE, and context only: it is never used in the suggestion. Reading pickups needs a native iOS app.
     calendar  SAMPLE (the dummy student or athlete day from demo-data.js).

   Rules this file keeps (CLAUDE.md): numbers come from code, never from a language model; a gap is "unknown", not 0;
   a stale or missing source is left out and said so; with too little data the answer is "Not enough data yet".
   The rule below is a stand-in that explains the sample afternoon ("sample-day rule"). It is not the team's validated
   model, and it is not the timing rule the phone's real study mode uses (RULE in study.js). The team should pick one.

   Load order in the browser: demo-data.js, then this file. Node: tools/site/test-data.mjs loads both. */
(function (root) {
  "use strict";
  const DEMO = root.HALFTIME_DEMO;
  if (!DEMO) throw new Error("halftime-data.js needs demo-data.js loaded first");

  /* ---------- small helpers ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const clock = (min, ampm = true) => { const h = Math.floor(min / 60) % 24, m = Math.floor(min % 60); return `${h % 12 || 12}:${pad(m)}${ampm ? (h < 12 ? " am" : " pm") : ""}`; };
  const dur = (min) => { const m = Math.round(min), h = Math.floor(m / 60); return h ? `${h} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`; };
  const parseClock = (s) => { const m = /^(\d+):(\d+)\s*(am|pm)$/i.exec(s || ""); if (!m) return null; return ((+m[1] % 12) + (m[3].toLowerCase() === "pm" ? 12 : 0)) * 60 + +m[2]; };
  const median = (a) => { const v = a.filter((x) => x != null).sort((x, y) => x - y); return v.length ? (v.length % 2 ? v[v.length >> 1] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2) : null; };
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; // mulberry32: same seed, same afternoon
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayLabel = (iso) => { const d = new Date(iso + "T12:00:00Z"); return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()}`; };
  const dateLabel = (iso) => { const d = new Date(iso.length > 10 ? iso : iso + "T12:00:00Z"); return `${MONTHS[d.getMonth()]} ${d.getDate()}`; };

  /* ---------- the sample afternoon: Thursday Nov 5, 3:45 pm ---------- */
  const NOW = 15 * 60 + 45;
  // what the laptop app will report: which KIND of app is in front, never its name, title, URL or contents
  const CATS = { study: "Study apps", browser: "Browser", messages: "Messages", media: "Video and music", other: "Other" };
  // moments the demo can jump to. `windows` = app switches in each 20-minute window, the last one ending now.
  const MOMENTS = {
    now: { start: 13 * 60 + 5, windows: [4, 5, 6, 5, 7, 9, 11, 14], idle: [[14 * 60 + 2, 14 * 60 + 6], [15 * 60 + 10, 15 * 60 + 13]], seed: 7 },
    calm: { start: 14 * 60 + 55, windows: [3, 6, 6], first: 10, idle: [], seed: 11 },   // 50 minutes in, switching as usual
    early: { start: 15 * 60 + 33, windows: [4], first: 12, idle: [], seed: 13 },          // 12 minutes in: too soon to say
  };
  const USUAL_LAPTOP = { sessionMin: [45, 90], switches20: [5, 8] }; // the person's own usual (sample)
  const AFTERNOONS = { like: 6, settled: 4 };                         // sample history: afternoons like this one, and how many settled after a walk

  function laptopSample(moment) {
    const M = MOMENTS[moment] || MOMENTS.now, rand = rng(M.seed), switches = [];
    let end = NOW;
    for (let i = M.windows.length - 1; i >= 0; i--) {
      const len = i === 0 && M.first ? M.first : 20, n = M.windows[i], a = end - len;
      for (let k = 0; k < n; k++) switches.push(+(a + ((k + 0.15 + rand() * 0.7) / n) * len).toFixed(2));
      end = a;
    }
    switches.sort((x, y) => x - y);
    // later in a long session the sample drifts from study apps toward messages and video
    const pick = (t) => { const late = Math.max(0, Math.min(1, (t - M.start) / 160)), r = rand(); return r < 0.5 - late * 0.2 ? "study" : r < 0.78 - late * 0.12 ? "browser" : r < 0.9 ? "messages" : r < 0.97 ? "media" : "other"; };
    const spans = []; let cat = "study", from = M.start;
    for (const t of switches) { spans.push({ s: from, e: t, cat }); let next = pick(t); if (next === cat) next = cat === "study" ? "browser" : "study"; cat = next; from = t; }
    spans.push({ s: from, e: NOW, cat });
    const in20 = NOW - M.start >= 20 ? switches.filter((t) => t > NOW - 20).length : null; // under 20 minutes: unknown, not a small number
    return {
      id: "laptop", mode: "sample", name: "Laptop", detail: "sample · the laptop app isn't built yet", lastSeen: "1 min ago",
      session: { start: M.start, now: NOW, minutes: NOW - M.start }, spans, switches, idle: M.idle.map(([s, e]) => ({ s, e })),
      switches20: in20, usual: USUAL_LAPTOP, history: AFTERNOONS,
      reads: "which kind of app is in front, and when you switch", never: "app names, window titles, sites, typing or screenshots",
    };
  }

  function phoneSample(moment) {
    const all = [[13, 22, 2], [13, 58, 1], [14, 20, 3], [14, 41, 2], [15, 2, 4], [15, 14, 2], [15, 21, 3], [15, 29, 2], [15, 34, 1], [15, 39, 3], [15, 43, 1]];
    const start = (MOMENTS[moment] || MOMENTS.now).start;
    const pickups = all.map(([h, m, len]) => ({ t: h * 60 + m, min: len })).filter((p) => p.t >= start && p.t <= NOW);
    return {
      id: "phone", mode: "sample", name: "iPhone", detail: "sample · needs the iPhone app", lastSeen: "2 min ago",
      pickups, pickups20: NOW - start >= 20 ? pickups.filter((p) => p.t > NOW - 20).length : null, usual: { pickups20: [1, 2] },
      reads: "how often you pick it up while a study session runs", never: "which apps, messages, sites or location",
    };
  }

  function calendarSample(role, provider) {
    const events = DEMO.calendar(role).map((e) => ({ ...e, s: parseClock(e.t), e2: parseClock(e.end) }));
    const next = events.find((e) => e.state === "next") || null;
    return {
      id: "calendar", mode: "sample", name: (DEMO.PROVIDERS && DEMO.PROVIDERS[provider]) || "Calendar", detail: "sample day", lastSeen: "just now",
      events, next: next ? { what: next.stop || next.what, start: next.s, where: next.where } : null, week: DEMO.week(role),
      reads: role === "athlete" ? "your next class, practice and away games" : "the time of your next class", never: "event details, guests or your location",
    };
  }

  /* ---------- the watch: sample nights, or the live answer from /api/health ---------- */
  const DEVICE = { fitbit: ["Fitbit Air", "Fitbit", "through Google Health"], oura: ["Oura Ring", "Oura", "Oura"], whoop: ["WHOOP", "WHOOP", "WHOOP"], apple: ["Apple Watch", "Apple Watch", "through Apple Health"], garmin: ["Garmin Forerunner", "Garmin", "through Garmin Connect"] };
  const LEARN_NIGHTS = 14; // nights before we call anything "your usual" (team proposal; open decision #19)

  function watchSample(role, device, variant) {
    if (!DEVICE[device] || variant === "none") return { id: "watch", mode: "none", name: "No watch or ring", detail: "not connected", nights: [], usual: null, lastNight: null, hr: [], stale: false, reads: "", never: "" };
    const [name, short, via] = DEVICE[device], T = DEMO.today(role), rand = rng(3);
    const nights = DEMO.NIGHTS.map((n) => ({ label: n.d, sleepH: n.sleep, sleepMin: Math.round(n.sleep * 60), rhr: n.rhr, hrv: n.hrv }));
    // heart rate during the session: one reading about every 5 minutes after a sync, with gaps. Never live.
    const hr = []; for (let t = 13 * 60 + 8; t <= 15 * 60 + 33; t += 5) { if (rand() < 0.14) continue; hr.push([t, Math.round(72 + Math.sin(t / 17) * 5 + (rand() - 0.5) * 9 + (t > 15 * 60 ? 3 : 0))]); }
    hr[hr.length - 1] = [15 * 60 + 33, T.hrNow.bpm];
    const stale = variant === "stale";
    return {
      id: "watch", mode: "sample", name, short, via, detail: stale ? "sample · not synced since yesterday 7:42 am" : "sample · synced 12 min ago",
      lastSync: stale ? "yesterday 7:42 am" : "12 min ago", stale,
      nights, usual: { ...DEMO.USUAL, n: 28 }, learning: null,
      lastNight: stale ? null : { label: "last night", sleepMin: 310, sleepText: T.lastNight.sleep, bed: T.lastNight.bed, wake: T.lastNight.wake, rhr: T.lastNight.rhr, hrv: T.lastNight.hrv },
      hr: stale ? [] : hr, hrvKind: (DEMO.HRV_KIND || {})[device] || "RMSSD",
      reads: "sleep, heart rate, resting heart rate and overnight HRV", never: "the device's own scores, location or anything you logged",
    };
  }

  // /api/health → the same shape. `today` is the real date, because live data is about the real you.
  function watchLive(api, today = new Date()) {
    const nights = (api.nights || []).map((n) => ({ label: dayLabel(n.date), date: n.date, sleepH: +(n.sleepMin / 60).toFixed(1), sleepMin: n.sleepMin, rhr: n.rhr, hrv: n.hrv == null ? null : Math.round(n.hrv), bed: n.bed, wake: n.wake }));
    const last = nights[nights.length - 1] || null;
    const ageDays = last ? Math.floor((Date.parse(today.toISOString().slice(0, 10)) - Date.parse(last.date)) / 864e5) : Infinity;
    const stale = ageDays > 1; // last night's sleep ends today; anything older can't speak for today
    const have = nights.length, learned = have >= LEARN_NIGHTS;
    const since = api.lastSync ? dateLabel(api.lastSync) : last ? dateLabel(last.date) : "never";
    return {
      id: "watch", mode: "live", name: api.device || "Fitbit", short: "Fitbit", via: "through Google Health",
      detail: stale ? `live · not synced since ${since}` : "live · synced today", lastSync: since, lastSyncIso: api.lastSync || null, stale,
      nights, usual: learned ? { sleep: +(median(nights.map((n) => n.sleepH))).toFixed(1), rhr: Math.round(median(nights.map((n) => n.rhr))), hrv: Math.round(median(nights.map((n) => n.hrv))), n: have } : null,
      learning: learned ? null : { have, need: LEARN_NIGHTS },
      lastNight: stale || !last ? null : { label: "last night", sleepMin: last.sleepMin, sleepText: dur(last.sleepMin), bed: last.bed, wake: last.wake, rhr: last.rhr, hrv: last.hrv },
      lastKnown: last, hr: stale || !api.day ? [] : api.day.hr || [], hrvKind: "RMSSD", counts: api.counts || null, fetchedAt: api.fetchedAt || null,
      reads: "sleep, heart rate, resting heart rate and overnight HRV", never: "the device's own scores, location or anything you logged",
    };
  }

  /* ---------- records: every source in one plain shape (source, metric, value, unit, when) ---------- */
  function records(src) {
    const out = [], add = (source, metric, value, unit, at, mode) => out.push({ source, metric, value, unit, at, mode });
    const L = src.laptop, P = src.phone, W = src.watch, C = src.calendar;
    add("laptop", "session_start", clock(L.session.start), "time", clock(L.session.start), L.mode);
    L.spans.forEach((s) => add("laptop", "app_category", CATS[s.cat], "category", `${clock(s.s)}–${clock(s.e, false)}`, L.mode));
    L.switches.forEach((t, i) => add("laptop", "app_switch", `${CATS[L.spans[i].cat]} → ${CATS[L.spans[i + 1].cat]}`, "switch", clock(t), L.mode));
    L.idle.forEach((s) => add("laptop", "idle", Math.round(s.e - s.s), "min", clock(s.s), L.mode));
    P.pickups.forEach((p) => add("phone", "pickup", p.min, "min", clock(p.t), P.mode));
    W.nights.forEach((n) => { add("watch", "sleep", n.sleepH, "h", n.label, W.mode); if (n.rhr != null) add("watch", "resting_heart_rate", n.rhr, "bpm", n.label, W.mode); if (n.hrv != null) add("watch", "hrv_overnight", n.hrv, "ms", n.label, W.mode); });
    (W.hr || []).forEach(([t, bpm]) => add("watch", "heart_rate", bpm, "bpm", clock(t), W.mode));
    C.events.forEach((e) => add("calendar", "event", e.what, "event", e.t + (e.end ? `–${e.end}` : ""), C.mode));
    return out;
  }

  /* ---------- today's numbers, then the rule ---------- */
  function features(src) {
    const L = src.laptop, W = src.watch, C = src.calendar, P = src.phone;
    return {
      sessionMin: L.session.minutes,
      switches20: L.switches20,                                   // null = under 20 minutes of session
      idleMin: L.idle.reduce((a, s) => a + (s.e - s.s), 0),
      sleepMin: W.lastNight ? W.lastNight.sleepMin : null,        // null = no watch, or it hasn't synced: left out
      sleepUsualMin: W.usual ? Math.round(W.usual.sleep * 60) : null,
      rhr: W.lastNight ? W.lastNight.rhr : null, hrv: W.lastNight ? W.lastNight.hrv : null,
      minutesToNext: C.next ? C.next.start - L.session.now : null,
      pickups20: P.pickups20,                                     // context only
    };
  }

  const WALK = 5, MARGIN = 10; // a walk must leave 10 minutes before the next stop
  function decide(src, f) {
    const L = src.laptop, W = src.watch, C = src.calendar, U = L.usual;
    const rule = { id: "sample-day rule", text: "Suggest a short walk when at least two of these hold: the session is longer than your usual, you're switching apps more than your usual, last night was over an hour short of your usual sleep. Only if a 5-minute walk fits before your next stop. Under 20 minutes of session, say there isn't enough data." };
    if (f.sessionMin < 20 || f.switches20 == null) {
      return { action: "abstain", headline: "Not enough data yet", sub: `You're ${dur(f.sessionMin)} in. Halftime needs about 20 minutes of a session before it says anything.`, reasons: [], context: [], sure: null, rule, used: [] };
    }
    const long = f.sessionMin > U.sessionMin[1], scattered = f.switches20 > U.switches20[1];
    const short = f.sleepMin != null && f.sleepUsualMin != null && f.sleepMin < f.sleepUsualMin - 60;
    const fits = f.minutesToNext == null || f.minutesToNext >= WALK + MARGIN;
    const reasons = [], used = [];
    let k = 0;
    const R = (lane, label, value, usual, flag) => { reasons.push({ k: ++k, lane, label, value, usual, flag }); used.push(lane); };
    R("laptop", "Session time", dur(f.sessionMin), `usual ${U.sessionMin[0]}–${U.sessionMin[1]} min`, long);
    R("laptop", "App switches", `${f.switches20} / 20 min`, `usual ${U.switches20[0]}–${U.switches20[1]}`, scattered);
    if (f.sleepMin != null) R("watch", "Sleep last night", dur(f.sleepMin), f.sleepUsualMin != null ? `usual about ${dur(f.sleepUsualMin)}` : `still learning your usual (${W.learning.have} of ${W.learning.need} nights)`, short);
    if (C.next) R("calendar", "Next stop", `${C.next.what} ${clock(C.next.start, false)}`, `${f.minutesToNext} min away`, false);
    const left = [];
    if (W.mode === "none") left.push("No watch or ring, so sleep isn't part of this. It uses your laptop and calendar.");
    else if (W.stale) left.push(`Sleep is left out today: your ${W.name} hasn't synced since ${W.lastSync}. Open the ${W.short} app to sync.`);
    else if (f.sleepMin != null && f.sleepUsualMin == null) left.push(`Sleep is shown but not counted yet: ${W.learning.have} of ${W.learning.need} nights so far.`);
    const context = [];
    if (f.rhr != null) context.push({ lane: "watch", label: "Heart, last night", value: `${f.rhr} bpm${f.hrv != null ? ` · ${f.hrv} ms` : ""}`, note: "resting heart rate and HRV · context only" });
    if (f.pickups20 != null) context.push({ lane: "phone", label: "Phone pickups", value: `${f.pickups20} / 20 min`, note: `usual ${src.phone.usual.pickups20.join("–")} · context only` });
    const score = long + scattered + short;
    const H = L.history, sure = H.like < 10 ? { tag: "Early read", text: `In ${H.settled} of your last ${H.like} afternoons like this, your app switching settled back to usual after a walk.`, n: H.like } : { tag: "Steady read", text: `In ${H.settled} of ${H.like} afternoons like this, your app switching settled after a walk.`, n: H.like };
    const base = { reasons, context, left, rule, used: [...new Set(used)], score, flags: { long, scattered, short, fits } };
    if (score >= 2 && fits) {
      const back = clock(L.session.now + WALK, false);
      return { ...base, action: "walk", headline: "Short walk now?", sub: C.next ? `5 minutes fits. You'll be back by ${back}, well before ${C.next.what.toLowerCase().startsWith("chem") ? "lab" : C.next.what.toLowerCase()}.` : `5 minutes. You'll be back by ${back}.`, sure, walk: { s: L.session.now, e: L.session.now + WALK } };
    }
    if (score >= 2) return { ...base, action: "break", headline: `Stop at ${clock(C.next.start, false)}`, sub: `No room for a walk: ${C.next.what} is in ${f.minutesToNext} min. Take the walk there as your break.`, sure };
    return { ...base, action: "continue", headline: "Keep going", sub: score === 1 ? "One thing is off your usual, but nothing that calls for a break yet. Halftime will look again in 20 minutes." : "Your session looks like your usual. Halftime stays quiet until that changes.", sure: null };
  }

  /* ---------- put it together ---------- */
  // opts: role "student"|"athlete", device (wearable key, "" = none), calProvider, moment "now"|"calm"|"early",
  //       watch "sample"|"stale"|"none", live (the /api/health answer, when connected)
  function build(opts = {}) {
    const role = opts.role === "athlete" ? "athlete" : "student", moment = MOMENTS[opts.moment] ? opts.moment : "now";
    const device = opts.device === undefined ? "fitbit" : opts.device;
    const watch = opts.live && opts.live.connected && opts.watch !== "sample" && opts.watch !== "none" && opts.watch !== "stale" ? watchLive(opts.live, opts.today) : watchSample(role, device, opts.watch);
    const sources = { laptop: laptopSample(moment), phone: phoneSample(moment), watch, calendar: calendarSample(role, opts.calProvider || "google") };
    const f = features(sources), recs = records(sources);
    return {
      role, moment, now: { min: NOW, label: clock(NOW), day: "Thursday, Nov 5" }, sources, features: f, decision: decide(sources, f), records: recs,
      counts: recs.reduce((a, r) => { a[r.source] = (a[r.source] || 0) + 1; return a; }, {}),
      sample: Object.values(sources).some((s) => s.mode === "sample"), liveWatch: watch.mode === "live",
    };
  }

  // The browser asks /api/health once. No answer, or "not connected", simply means the sample watch.
  async function load(opts = {}) {
    let live = null;
    if (opts.watch !== "sample" && opts.watch !== "none" && opts.watch !== "stale" && typeof fetch === "function") {
      try { const r = await fetch("/api/health", { cache: "no-store" }); if (r.ok) live = await r.json(); } catch { live = null; }
    }
    return build({ ...opts, live });
  }

  // For the phone app's real study mode: "what does the watch say about last night, right now?"
  // One question per page load, kept in memory only (never in storage: these are real readings).
  //   { mode: "sample" }                                  no live watch on this computer: keep using sample or typed sleep
  //   { mode: "live", fresh: true,  sleepH, sleepText, … } use it, and say it came from the watch
  //   { mode: "live", fresh: false, lastSync, … }          connected but not synced: leave sleep out or let the person type it
  let WATCH = null;
  const watchNow = (force) => (!force && WATCH) || (WATCH = (async () => {
    let api = null;
    try { const r = await fetch("/api/health", { cache: "no-store" }); if (r.ok) api = await r.json(); } catch { api = null; }
    if (!api || !api.connected) return { mode: "sample", reason: (api && api.reason) || "unreachable" };
    const W = watchLive(api), n = W.lastNight;
    return {
      mode: "live", fresh: !W.stale, device: W.name, short: W.short, via: W.via, lastSync: W.lastSync,
      sleepH: n ? +(n.sleepMin / 60).toFixed(1) : null, sleepMin: n ? n.sleepMin : null, sleepText: n ? n.sleepText : null,
      bed: n ? n.bed : null, wake: n ? n.wake : null, rhr: n ? n.rhr : null, hrv: n ? n.hrv : null,
      nights: W.nights, usual: W.usual, learning: W.learning, lastKnown: W.lastKnown || null,
    };
  })());

  // The same sample numbers in demo-data.js's shape, so the phone app can switch to this layer without a rewrite.
  const asDemo = (state) => ({ NIGHTS: state.sources.watch.nights.map((n) => ({ d: n.label, sleep: n.sleepH, rhr: n.rhr, hrv: n.hrv })), USUAL: state.sources.watch.usual, live: state.liveWatch });

  root.HalftimeData = { build, load, watchNow, records, asDemo, clock, dur, CATS, MOMENTS: Object.keys(MOMENTS), LEARN_NIGHTS, watchLive };
})(typeof window !== "undefined" ? window : globalThis);
