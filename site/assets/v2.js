/* Halftime /v2: the decluttered phone app (2026-11-16, from the declutter brief of 2026-11-15).
 *
 * Four screens and a sheet:
 *   Today     "the two halves": last night on the left, today's studying on the right, one button (Start studying)
 *   Session   the timer and the one suggestion card (reasons, sources, how sure, Talk to someone)
 *   Check-in  finished what you planned? · how much did your phone pull you away? (+ the study task once chosen)
 *   Week      seven pairs of halves, the link sentence once there's enough, and your sessions
 *   Sources & privacy (sheet): what it reads, what it can't see, sharing, notifications, Delete my data
 * First run: Today (labelled sample) → consent → "have a band?" → length → Start: 5 taps to a running timer.
 *
 * Shared with /app on purpose (one engine, one rule): RULE v0, the study tasks and the SUS score come from
 * assets/study.js (window.STUDY); the push server, /api/collect and /api/forget are the same. Its own storage keys
 * (ht2-*), so a session on /app and one here never mix. Events are the same names as /app with extra.app = "v2", so
 * /admin's Study tab counts both.
 * New here: minutes the app was out of view during a session (route A of the brief: another app, or the screen
 * locked; never which app), and the check-in's phone-pull answer. Both are in the consent text (v2).
 * No language model anywhere: link-v0 (assets/link.js) and RULE v0 are plain code.
 * QA: ?speed=N (study.js), ?arm=halftime|pomodoro, ?demo=week (a labelled synthetic fortnight; saves and sends nothing).
 */
(() => {
  "use strict";
  const Qs = new URLSearchParams(location.search);
  const DEMO = Qs.get("demo") === "week";
  const L = window.HalftimeLink, ST = window.STUDY;
  const RULE = ST.RULE, TASKS = ST.TASKS, susScore = ST.susScore;

  // ---------- storage (demo mode: an in-memory copy, so nothing on this phone changes)
  const mem = {};
  const store = {
    get(k, d) { if (DEMO) return k in mem ? JSON.parse(mem[k]) : d; try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { if (DEMO) { mem[k] = JSON.stringify(v); return; } try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { if (DEMO) { delete mem[k]; return; } try { localStorage.removeItem(k); } catch {} },
  };
  const sget = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
  const sset = (k, v) => { try { sessionStorage.setItem(k, v); } catch {} };
  const esc = (x) => String(x == null ? "" : x).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MIN = 60000;
  const clampN = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const SPEED = clampN(+(sget("ht-speed") || 1) || 1, 1, 600); // set by study.js from ?speed=N

  // ---------- words
  const clock = (ms) => { const d = new Date(ms); let h = d.getHours(); const m = d.getMinutes(), ap = h >= 12 ? "pm" : "am"; h = h % 12 || 12; return `${h}:${String(m).padStart(2, "0")} ${ap}`; };
  const dur = (min) => { min = Math.max(0, Math.round(min)); return min >= 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")} min` : `${min} min`; };
  const sleepText = (min) => { min = Math.round(min); return `${Math.floor(min / 60)}\u00a0h${min % 60 ? "\u00a0" + String(min % 60).padStart(2, "0") + "\u00a0min" : ""}`; };
  const sleepShort = (min) => { min = Math.round(min); return `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, "0") : ""}`; };
  const dayLabel = (key) => { const [y, m, d] = key.split("-").map(Number); const dt = new Date(y, m - 1, d); return `${dt.toLocaleDateString("en-US", { weekday: "short" })} ${d}`; };
  const longDate = (ms) => new Date(ms).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  const dayName = (ms) => { const k = L.dayOf(ms), t = L.dayOf(Date.now()); return k === t ? "Today" : k === L.addDays(t, -1) ? "Yesterday" : dayLabel(k); };
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  // ---------- who this is on (words and a few behaviours)
  const COMPUTER = !/iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) && !(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const here = COMPUTER ? "this computer" : "this phone";
  const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const visitor = () => { try { return localStorage.getItem("ht-visitor") || ""; } catch { return ""; } };

  // ---------- consent (v2 adds out-of-view time and the phone-pull answer) and analytics
  const CONSENT_V = 2;
  const consent = () => store.get("ht2-consent", null); // { choice: "agree" | "decline", at, v }
  const joined = () => (consent() || {}).choice === "agree";
  function sev(type, value, extra) {
    if (DEMO || !window.HT || !joined()) return;
    HT.event(type, { value, extra: { app: "v2", ...extra, ...(SPEED !== 1 ? { qa: true } : {}) } });
  }
  const sflush = () => { if (window.HT && HT.flush && !DEMO) HT.flush(); };
  const screen = (name) => { if (window.HT && !DEMO) HT.screen("v2_" + name); };

  // ---------- the band they wear (asked once): only changes the words, never what is read
  const BANDS = { whoop: "WHOOP", fitbit: "Fitbit", oura: "Oura ring", apple: "Apple Watch", garmin: "Garmin", none: "" };
  const band = () => store.get("ht2-band", null);
  const bandName = () => BANDS[band()] || "";

  // ---------- nights: typed here, or a WHOOP night synced in this browser (assets/night.js, laptop Chrome)
  const typedNights = () => store.get("ht2-nights", []);
  function whoopNights() {
    if (DEMO) return [];
    try { return window.HalftimeNight ? HalftimeNight.nightsAll().filter((n) => n.ok).map((n) => ({ date: n.date, sleepMin: n.sleepMin, rhr: n.rhr, hrv: n.hrv, src: "whoop4" })) : []; } catch { return []; }
  }
  function nights() {
    const by = new Map();
    for (const n of typedNights()) if (n.sleepMin != null) by.set(n.date, { ...n, src: n.src || "typed" });
    for (const n of whoopNights()) by.set(n.date, n); // the band wins over a typed number for the same night
    return [...by.values()].sort((a, b) => (a.date < b.date ? -1 : 1));
  }
  const todayKey = () => L.dayOf(Date.now());
  const nightFor = (key) => nights().find((n) => n.date === key) || null;
  function saveTyped(key, sleepMin) {
    const all = typedNights().filter((n) => n.date !== key);
    if (sleepMin != null) all.push({ date: key, sleepMin: Math.round(sleepMin), src: "typed", at: Date.now() });
    all.sort((a, b) => (a.date < b.date ? -1 : 1));
    store.set("ht2-nights", all.slice(-60));
  }
  const lastTyped = () => { const t = typedNights(); return t.length ? t[t.length - 1].sleepMin : 420; };
  // a pattern that should point to a person (brief item 4): 3 or more nights under 6 h in the last 5 logged
  function shortRun() {
    const last = nights().filter((n) => n.date > L.addDays(todayKey(), -8)).slice(-5);
    const short = last.filter((n) => n.sleepMin < 360).length;
    return short >= 3 ? { short, of: last.length } : null;
  }

  // ---------- sessions
  const logList = () => store.get("ht2-log", []);
  const todaySessions = () => logList().filter((s) => L.dayOf(s.startAt) === todayKey() && (!s.qa || SPEED !== 1)); // test-speed sessions show only while testing
  function nextArm() {
    const forced = Qs.get("arm"); if (forced === "halftime" || forced === "pomodoro") return forced;
    const arms = store.get("ht2-arms", []), n = store.get("ht2-n", 0);
    if (arms.length <= n) { const pair = Math.random() < 0.5 ? ["halftime", "pomodoro"] : ["pomodoro", "halftime"]; while (arms.length <= n) arms.push(...pair); store.set("ht2-arms", arms); }
    return arms[n];
  }

  // ---------- delivery: Home Screen app + Web Push (same server as /app), with a fallback when either is missing
  const Push = {
    cfg: null, reg: null, sub: null, state: "checking",
    async init() {
      if (DEMO) { this.state = "unsupported"; if (booted) draw(); return; }
      try { if ("serviceWorker" in navigator) this.reg = await navigator.serviceWorker.register("/sw.js"); } catch {}
      try { this.cfg = await (await fetch("/api/push?op=config")).json(); } catch { this.cfg = { configured: false }; }
      await this.refresh();
    },
    async refresh() {
      const before = this.state;
      if (!this.reg || !("PushManager" in window) || !("Notification" in window)) this.state = isIOS() && !standalone() ? "install" : "unsupported";
      else if (!this.cfg || !this.cfg.configured) this.state = "server_off";
      else if (consent() && !joined()) this.state = "not_shared";
      else if (Notification.permission === "denied") this.state = "denied";
      else {
        try { this.sub = await this.reg.pushManager.getSubscription(); } catch { this.sub = null; }
        this.state = Notification.permission === "granted" && this.sub && store.get("ht-push-saved", "") === this.sub.endpoint ? "on" : "ask";
      }
      if (before !== this.state) { if (before !== "checking" || this.state !== "ask") sev("push_status", this.state, { standalone: standalone() }); if (booted) draw(); }
    },
    async enable() {
      if (this.state === "on") return true;
      if (this.state !== "ask" || !joined()) return false;
      try {
        const perm = await Notification.requestPermission();
        if (perm !== "granted") { await this.refresh(); return false; }
        const b64 = this.cfg.key.replace(/-/g, "+").replace(/_/g, "/"), key = Uint8Array.from(atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4)), (c) => c.charCodeAt(0));
        const reg = await Promise.race([navigator.serviceWorker.ready, new Promise((res) => setTimeout(() => res(this.reg), 4000))]);
        this.sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key }));
        const r = await fetch("/api/push?op=subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor(), sub: this.sub.toJSON() }) });
        if (!r.ok) throw new Error("save " + r.status);
        store.set("ht-push-saved", this.sub.endpoint);
        await this.refresh(); return this.state === "on";
      } catch (e) {
        this.lastError = `${(e && e.name) || "Error"}: ${String((e && e.message) || e).slice(0, 120)}`;
        sev("push_status", "error", { error: this.lastError, standalone: standalone() });
        await this.refresh(); return false;
      }
    },
    async post(op, body) {
      if (this.state !== "on" || !joined() || DEMO) return null;
      try { const r = await fetch("/api/push?op=" + op, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor(), ...body }), keepalive: true }); return r.ok ? await r.json() : null; } catch { return null; }
    },
    schedule(jobs, replace = true) { return this.post("schedule", { study: S.id, jobs, replace }); },
    cancel(kinds) { return this.post("cancel", { study: S ? S.id : "", kinds: kinds || null }); },
    async test() {
      try {
        const reg = this.reg || (await navigator.serviceWorker.ready);
        await reg.showNotification("Halftime test", { body: `Notifications work on ${here}.`, tag: "halftime-test", icon: "/icon-192.png", data: { url: "/v2", kind: "test" } });
        sev("push_status", "test", { standalone: standalone() });
        toast(COMPUTER ? "Sent. Nothing appeared? Allow notifications for your browser in your computer's settings." : "Sent. Nothing appeared? Check Settings → Notifications → Halftime, and Focus.");
      } catch { toast(`${cap(here)} couldn't show a test notification.`); }
    },
    async off() { try { if (this.sub) await this.sub.unsubscribe(); } catch {} try { await fetch("/api/push?op=unsubscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor() }) }); } catch {} store.del("ht-push-saved"); this.sub = null; await this.refresh(); },
  };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  // a tapped notification for this session opens /v2, not /app (sw.js matches the notification's session id to this)
  function rememberStudy(id) { try { if (window.caches && !DEMO) caches.open("halftime-v1").then((c) => c.put("/__v2study", new Response(id))).catch(() => {}); } catch {} }
  const deliveryLine = () => ({
    on: COMPUTER ? "It arrives as a notification, even with this tab in the background." : "It arrives as a notification, even with the phone locked.",
    ask: COMPUTER ? "Turn on notifications to get it with this tab in the background." : "Turn on notifications to get it on a locked phone.",
    denied: COMPUTER ? "Notifications are blocked for this site in your browser, so it shows here while this tab is open." : "Notifications are off for Halftime in Settings, so it shows when you open the app.",
    install: "In Safari it shows when you open this page. For a locked phone, add Halftime to your Home Screen.",
    unsupported: "This browser can't send notifications, so it shows when you open the app.",
    not_shared: "You're not sharing data, and a notification needs the server to keep a push address. So it shows when you open the app.",
    server_off: "Notifications aren't switched on for this prototype yet, so it shows when you open the app.",
    checking: "",
  }[Push.state]);
  function pushMsg(ok) {
    if (ok) return "Notifications on.";
    if (Push.state === "denied") return COMPUTER ? "Notifications are blocked for this site. Allow them from the icon left of the address." : "Notifications are blocked for Halftime in Settings.";
    if (Push.lastError) return `Notifications couldn't be set up (${Push.lastError}). The suggestion will show when you open the app.`;
    return "Notifications weren't turned on.";
  }
  const turnOnPush = () => Push.enable().then((ok) => { toast(pushMsg(ok)); draw(); });
  let wake = null, wakeWanted = false;
  async function setWake(on) {
    wakeWanted = on;
    try { if (on && "wakeLock" in navigator && !wake) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => { wake = null; }); } else if (!on && wake) { await wake.release(); wake = null; } } catch { wake = null; }
  }
  function localNotice(title, body) {
    try {
      if (!title || !document.hidden || Push.state === "on" || !("Notification" in window) || Notification.permission !== "granted" || !joined()) return;
      if (Push.reg && Push.reg.showNotification) Push.reg.showNotification(title, { body, tag: "halftime-local", icon: "/icon-192.png", data: { url: "/v2", kind: "local" } });
      else new Notification(title, { body, tag: "halftime-local", icon: "/icon-192.png" });
    } catch {}
  }

  // ---------- state
  let root, S = null, view = "today", sheet = null, draft = null, tickT = null, booted = false, dead = false;
  let cardOpen = false, whyOpen = false, wrongOpen = false, endAsk = false, breakAsk = false, checkin = null, susA = null, delBusy = false;
  let starting = false, taskRunning = false, drawnAt = 0, lastKey = "", afterConsent = null, sleepDraft = null, hintOpen = false, howOpen = false;
  let pushOpen = Qs.get("from") === "push" && /^(suggest|pomo_break)/.test(Qs.get("k") || "");
  const tabView = () => (view === "today" || view === "week");
  const home = () => (!S ? "today" : S.phase === "checkin" ? "checkin" : S.brk ? "break" : "live");
  const toast = (m) => { const t = document.getElementById("toast"); if (!t) return; t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 3600); };
  const save = () => { if (S) store.set("ht2-session", S); else store.del("ht2-session"); };

  // session time: real milliseconds × SPEED
  const sessMin = (at = Date.now()) => ((at - S.startAt) * SPEED) / MIN;
  const realAt = (min) => S.startAt + (min * MIN) / SPEED;
  const breakMs = (at = Date.now()) => (S.breaks || []).reduce((a, b) => a + (Math.min(b.endAt || at, at) - b.startAt), 0);
  const studyMin = (at = Date.now()) => Math.max(0, ((at - S.startAt - breakMs(at)) * SPEED) / MIN);
  const awayMin = (at = Date.now()) => { if (!S) return 0; let ms = (S.away || []).reduce((a, w) => a + w.ms, 0); if (S.hidAt) ms += Math.max(0, at - S.hidAt); return (ms * SPEED) / MIN; };

  // ---------- start a session
  function newDraft() {
    const n = nightFor(todayKey()), last = store.get("ht2-last", {});
    return { planned: last.planned || 60, plan: "", sleepMin: n ? n.sleepMin : lastTyped(), sleepSrc: n ? n.src : "typed", sleepKnown: !!n, sleepSkip: false, sleepEdit: !n };
  }
  async function begin() { if (starting) return; starting = true; try { await begin2(); } finally { starting = false; } }
  async function begin2() {
    if (Push.state === "ask") await Promise.race([Push.enable(), new Promise((res) => setTimeout(res, 15000))]);
    if (!draft) return;
    const now = Date.now(), n = store.get("ht2-n", 0) + 1, arm = nextArm();
    // the night: a typed number is saved for today (Week and the link read it); a band's night is only read
    if (!draft.sleepSkip && draft.sleepSrc !== "whoop4" && (draft.sleepEdit || !draft.sleepKnown)) saveTyped(todayKey(), draft.sleepMin);
    const night = draft.sleepSkip ? null : nightFor(todayKey());
    const sleepH = night ? night.sleepMin / 60 : null, sleepSrc = !night ? "none" : night.src === "whoop4" ? "wearable" : "self";
    S = { id: crypto.randomUUID ? crypto.randomUUID() : now.toString(36) + Math.random().toString(36).slice(2), arm, n, startAt: now, planned: draft.planned, plan: draft.plan.trim().slice(0, 60),
      sleepH, sleepSrc, sleepDev: sleepSrc === "wearable" ? "WHOOP 4.0" : "", endMin: draft.planned, speed: SPEED, breaks: [], away: [], hidAt: 0, cues: 0, taken: 0, seenAt: now, phase: "live" };
    if (arm === "halftime") {
      const d = RULE.decide({ sleepH, startMs: now, endMin: S.endMin });
      S.rule = d; S.cue = d.kind === "none" ? null : { kind: d.kind, breakMin: d.breakMin, at: realAt(d.fireMin), min: d.fireMin, block: d.fireMin, snoozes: 0 };
    } else S.pomo = { cycle: -1 };
    store.set("ht2-n", n); store.set("ht2-last", { planned: draft.planned });
    draft = null; save(); rememberStudy(S.id);
    const jobs = [];
    if (S.cue) jobs.push({ kind: "suggest_" + S.cue.kind, at: new Date(S.cue.at).toISOString(), m: Math.round(S.cue.min) });
    if (arm === "pomodoro") for (let c = 0; c * 30 + 25 <= Math.min(S.endMin + 30, 360) && jobs.length < 23; c++)
      jobs.push({ kind: "pomo_break", at: new Date(realAt(c * 30 + 25)).toISOString(), m: c * 30 + 25 }, { kind: "pomo_work", at: new Date(realAt(c * 30 + 30)).toISOString(), m: c * 30 + 30 });
    sev("study_start", arm, { study: S.id, arm, n, planned: S.planned, sleep_h: sleepSrc === "self" ? Math.round(sleepH * 4) / 4 : null, sleep_src: sleepSrc, ...(sleepSrc === "wearable" ? { sleep_watch: "whoop4" } : {}),
      next_min: null, next_src: "none", fire_min: S.cue ? Math.round(S.cue.min) : null, kind: S.cue ? S.cue.kind : arm === "pomodoro" ? "pomo" : "none", rule: RULE.version, push: Push.state, standalone: standalone(), plan_len: S.plan.length, computer: COMPUTER, band: band() || "" });
    sflush();
    if (jobs.length) Push.schedule(jobs).then((r) => { if (S && r) { S.pushed = r.scheduled > 0; save(); } });
    cardOpen = false; go("live");
  }

  // ---------- the tick: once a second while a session runs, and at once when the app comes back
  function tick() {
    if (!S || S.phase === "checkin" || view === "stale" || view === "delete" || view === "consent") return;
    const now = Date.now();
    if ((now - S.seenAt) * SPEED > 45 * MIN && sessMin(now) > S.planned + 90) { S.staleAt = S.seenAt; save(); view = "stale"; clearInterval(tickT); tickT = null; return draw(); }
    S.seenAt = now;
    if (S.brk && now >= S.brk.endAt) endBreak("time");
    if (S.arm === "halftime" && S.cue && !S.cue.done && !S.brk && now >= S.cue.at && !S.cue.shownAt) showCue(now);
    if (S.arm === "pomodoro") pomoTick(now);
    if (view === "live" || view === "break") paintClock();
    if (Math.floor(now / 1000) % 10 === 0) save();
  }
  function via(now, at) { if (pushOpen) { pushOpen = false; return "push"; } return (now - at) * SPEED < 20000 && document.visibilityState === "visible" ? "app" : "return"; }
  function showCue(now) {
    const c = S.cue; c.shownAt = now; c.via = via(now, c.at); S.cues++;
    if (c.kind !== "keep" && S.endMin - sessMin(now) < c.breakMin + 1) { c.kind = "keep"; c.breakMin = 0; }
    if (c.via === "app") Push.cancel(["suggest_walk", "suggest_break", "suggest_keep"]);
    sev("study_suggest", c.kind, { study: S.id, arm: S.arm, min: Math.round(sessMin(c.at)), late_s: Math.round(((now - c.at) * SPEED) / 1000), via: c.via, snoozes: c.snoozes });
    localNotice(cueHead(c), "Open Halftime to see why.");
    sflush(); save(); cardOpen = true; whyOpen = false; wrongOpen = false; if (view === "live" || view === "break") go("live", true);
  }
  function pomoTick(now) {
    const t = sessMin(now), cyc = Math.floor(t / 30), inBreak = t % 30 >= 25, c = S.cue;
    if (c && !c.done && (cyc > c.cycle || !inBreak) && !S.brk) respond("missed");
    const passed = cyc - 1;
    if (S.pomo.cycle < passed) { const k = Math.min(12, passed - S.pomo.cycle); S.missed = (S.missed || 0) + k; S.pomo.cycle = passed;
      sev("study_response", "missed", { study: S.id, arm: S.arm, kind: "pomo", min: Math.round(t), detail: "closed", n: k }); save(); }
    if (inBreak && S.pomo.cycle < cyc && !S.brk) {
      S.pomo.cycle = cyc; const at = realAt(cyc * 30 + 25);
      S.cue = { kind: "pomo", breakMin: 5, at, min: cyc * 30 + 25, cycle: cyc, shownAt: now, via: via(now, at) }; S.cues++;
      localNotice("25 minutes done", "Take 5. Fixed-timer session.");
      sev("study_suggest", "pomo", { study: S.id, arm: S.arm, min: cyc * 30 + 25, late_s: Math.round(((now - at) * SPEED) / 1000), via: S.cue.via, cycle: cyc });
      sflush(); save(); cardOpen = true; whyOpen = false; wrongOpen = false; if (view === "live" || view === "break") go("live", true);
    }
  }
  function respond(kind, detail) {
    const c = S.cue; if (!c || c.done) return;
    const now = Date.now();
    sev("study_response", kind, { study: S.id, arm: S.arm, kind: c.kind, min: Math.round(sessMin(now)), rt_s: Math.round((now - c.shownAt) / 1000), ...(detail ? { detail } : {}) });
    if (kind === "snooze") { c.snoozes++; c.at = now + (10 * MIN) / SPEED; c.shownAt = 0; Push.schedule([{ kind: "suggest_" + c.kind, at: new Date(c.at).toISOString(), m: Math.round(sessMin(c.at)) }]); toast(`Snoozed. Quiet until ${clock(c.at)}.`); }
    else { c.done = true; c.response = kind; }
    if (kind === "take") { S.taken++; startBreak(c.kind === "pomo" ? Math.max(1, 5 - (sessMin(now) - c.min)) : c.breakMin, c.kind === "pomo" ? "pomo" : "suggest"); }
    if (kind === "keep" && c.kind !== "keep") toast(S.arm === "pomodoro" ? "Skipped. Next break in about 25 minutes." : "OK, keep going. It won't bring it up again this session.");
    if (kind === "wrong") toast("Thanks. That's noted, and this suggestion is closed.");
    cardOpen = false; wrongOpen = false; whyOpen = false; save(); sflush();
    if (kind !== "take") go("live");
  }
  function startBreak(min, from) {
    const now = Date.now(), c = S.cue;
    if (from === "manual" && c && !c.done && c.shownAt) {
      sev("study_response", "take", { study: S.id, arm: S.arm, kind: c.kind, min: Math.round(sessMin(now)), rt_s: Math.round((now - c.shownAt) / 1000), detail: "manual" });
      c.done = true; c.response = "take"; S.taken++;
    } else if (from === "manual" && S.arm === "halftime" && c && !c.done) Push.cancel(["suggest_walk", "suggest_break", "suggest_keep"]);
    S.brk = { startAt: now, endAt: now + (min * MIN) / SPEED, min, from, plus: 0 }; S.breaks.push({ startAt: now, endAt: null, from });
    sev("study_break", from === "manual" ? "manual" : "start", { study: S.id, arm: S.arm, from, len: Math.round(min), min: Math.round(sessMin(now)) });
    if (from !== "pomo") Push.schedule([{ kind: "break_over", at: new Date(S.brk.endAt).toISOString(), m: 0 }], false);
    save(); breakAsk = false; cardOpen = false; go("break");
  }
  function endBreak(how) {
    if (!S.brk) return; const now = Date.now(), b = S.breaks[S.breaks.length - 1];
    if (b) b.endAt = Math.min(now, how === "time" ? S.brk.endAt : now);
    sev("study_break", "end", { study: S.id, arm: S.arm, how, len: Math.round((((b ? b.endAt : now) - S.brk.startAt) * SPEED) / MIN) });
    if (how !== "time") Push.cancel(["break_over"]);
    const endedAt = b ? b.endAt : now, c = S.cue;
    S.brk = null;
    if (S.arm === "halftime" && c && !c.done && !c.shownAt && c.kind !== "keep") {
      const at = endedAt + ((c.block || c.min) * MIN) / SPEED;
      if (sessMin(at) > S.endMin - 10) { c.done = true; c.response = "not_needed"; }
      else { c.at = at; c.min = sessMin(at); Push.schedule([{ kind: "suggest_" + c.kind, at: new Date(at).toISOString(), m: Math.round(c.min) }], false); }
    }
    save();
    if (document.visibilityState === "visible") toast(how === "time" ? "Break's over. Back to it when you're ready." : "Welcome back.");
    if (view === "break") go("live");
  }
  function closeAway(at) { if (S && S.hidAt) { const ms = Math.max(0, at - S.hidAt); if (ms * SPEED >= 5000) S.away.push({ at: S.hidAt, ms }); S.hidAt = 0; } }
  function endSession(how, at) {
    const now = at || Date.now();
    closeAway(now);
    if (S.brk) { const b = S.breaks[S.breaks.length - 1]; if (b && !b.endAt) b.endAt = now; S.brk = null; }
    if (S.cue && !S.cue.done && S.cue.shownAt) { S.cue.done = true; S.cue.response = "ended"; }
    S.endAt = now; S.phase = "checkin"; { const t = document.getElementById("toast"); if (t) t.classList.remove("on"); }
    const minutes = Math.round(studyMin(now)), bmin = Math.round((breakMs(now) * SPEED) / MIN);
    S.minutes = minutes; S.breakMin = bmin; S.awayN = S.away.length; S.awayMin = Math.round(awayMin(now));
    Push.cancel(null); setWake(false);
    if (how === "discard") {
      sev("study_end", S.arm, { study: S.id, arm: S.arm, minutes, break_min: bmin, planned: S.planned, ended: "discard" }); sflush();
      store.set("ht2-n", Math.max(0, store.get("ht2-n", 1) - 1));
      S = null; save(); endAsk = false; toast("Session discarded."); return go("today");
    }
    sev("study_end", S.arm, { study: S.id, arm: S.arm, minutes, break_min: bmin, planned: S.planned, breaks: S.breaks.length, suggested: S.cues, taken: S.taken, ended: how, away_n: S.awayN, away_min: S.awayMin });
    sflush(); endAsk = false;
    checkin = { step: task().run ? "task" : "finished", task: null, finished: null, pull: null }; S.ck = checkin; save(); go("checkin");
  }
  const task = () => TASKS[store.get("ht-task", "placeholder")] || TASKS.placeholder;
  function finishCheckin() {
    sev("study_checkin", S.arm, { study: S.id, arm: S.arm, task: checkin.task || { id: task().id, score: null }, finished: checkin.finished, pull: checkin.pull });
    sflush();
    const log = logList();
    log.unshift({ id: S.id, n: S.n, arm: S.arm, startAt: S.startAt, minutes: S.minutes, planned: S.planned, plan: S.plan, breaks: S.breaks.length, awayN: S.awayN, awayMin: S.awayMin,
      cue: S.cue ? { kind: S.cue.kind, response: S.cue.response || (S.cue.shownAt ? "seen" : "none") } : null, cues: S.cues, taken: S.taken, finished: checkin.finished, pull: checkin.pull, qa: SPEED !== 1 });
    store.set("ht2-log", log.slice(0, 120));
    const done = S; S = null; save(); checkin.done = done;
    go("done");
  }

  // ---------- drawing helpers
  const btn = (label, s, cls = "", v) => `<button type="button" class="btn ${cls}" data-s="${s}"${v != null ? ` data-v="${esc(v)}"` : ""}>${label}</button>`;
  const chip = (label, s, on, v) => `<button type="button" class="chip" data-s="${s}" data-v="${esc(v)}" aria-pressed="${on}">${label}</button>`;
  const num = (k, label) => `<span class="n" aria-label="Source ${k}: ${esc(label)}">${k}</span>`;
  const topbar = (title) => `<header class="top"><p class="brand"><span class="dot" aria-hidden="true"></span>Halftime</p><button type="button" class="link" data-s="privacy" aria-haspopup="dialog">Sources &amp; privacy</button></header>${title ? `<p class="date">${esc(title)}</p>` : ""}`;

  // ---------- Today: the two halves
  function sampleHalves() {
    return `<div class="halves sample" aria-label="Sample data: what Today looks like once you've used it">
      <section class="half night"><p class="hl">Last night</p><p class="big">6<small>h</small>10</p><p class="hs">50 min less than your usual 7 h.</p></section>
      <section class="half day"><p class="hl">Today</p><p class="big">42<small>min</small></p><p class="hs">kept of 50 planned · out of view 3 times</p></section>
      <p class="stamp">Sample data</p></div>
      <p class="linkline">Halftime puts these two side by side. After a week it tells you, in one sentence, what your shorter nights did to your studying.</p>`;
  }
  function nightHalf() {
    const key = todayKey(), n = nightFor(key);
    if (!n) return `<section class="half night"><p class="hl">Last night</p><p class="big none" aria-label="No sleep logged">–</p>
      <button type="button" class="halfbtn" data-s="sleep-open">Add last night's sleep</button></section>`;
    const u = L.usual(nights(), key), w = L.nightWords(n.sleepMin, u), sm = Math.round(n.sleepMin), h = Math.floor(sm / 60), m = sm % 60;
    const heart = n.src === "whoop4" && (n.rhr != null || n.hrv != null)
      ? `<dl class="heart">${n.rhr != null ? `<div><dt>Resting HR</dt><dd>${n.rhr} bpm</dd></div>` : ""}${n.hrv != null ? `<div><dt>HRV</dt><dd>${n.hrv} ms</dd></div>` : ""}</dl>` : "";
    return `<section class="half night"><p class="hl">Last night</p><p class="big">${h}<small>h</small>${m ? String(m).padStart(2, "0") : ""}</p>
      <p class="hs">${esc(w.text)}</p>${heart}
      <p class="src">${n.src === "whoop4" ? "From your WHOOP 4.0" : "Typed by you"}</p>${n.src === "whoop4" ? "" : `<button type="button" class="halfbtn ghost" data-s="sleep-open">Change</button>`}</section>`;
  }
  function dayHalf() {
    const list = todaySessions(), kept = list.reduce((a, s) => a + s.minutes, 0), planned = list.reduce((a, s) => a + s.planned, 0), away = list.reduce((a, s) => a + (s.awayN || 0), 0);
    if (!list.length) return `<section class="half day"><p class="hl">Today</p><p class="big none" aria-label="No studying yet">–</p><p class="hs">No sessions yet today.</p></section>`;
    return `<section class="half day"><p class="hl">Today</p><p class="big">${kept >= 60 ? `${Math.floor(kept / 60)}<small>h</small>${kept % 60 ? String(kept % 60).padStart(2, "0") : ""}` : `${kept}<small>min</small>`}</p>
      <p class="hs">kept of ${dur(planned)} planned · ${plural(list.length, "session")}${list.some((x) => x.qa) ? " (test speed)" : ""}</p><p class="src">${away ? `Out of view ${away === 1 ? "once" : away + " times"}` : "Never out of view"}</p></section>`;
  }
  function changesLine() {
    const n = nightFor(todayKey()); if (!n) return "";
    const d = RULE.decide({ sleepH: n.sleepMin / 60, startMs: Date.now(), endMin: 120 }), s = d.steps.find((x) => x.k === "sleep");
    if (!s || s.val === "no change") return `<p class="changes">Last night doesn't move Halftime's first break today.</p>`;
    return `<p class="changes">Last night moves Halftime's first break <b>${esc(s.val)}</b> today${d.kind === "break" ? ", and makes it a longer one" : ""}.</p>`;
  }
  function linkLine(k) {
    if (k.state !== "learning") return k.sentence;
    const left = k.progress.need - k.progress.have;
    return k.progress.what === "night"
      ? `${left} more logged night${left === 1 ? "" : "s"}, and Halftime starts putting your sleep beside your studying.`
      : `${left} more study day${left === 1 ? "" : "s"} after a logged night, and the link shows up here.`;
  }
  function drawToday() {
    const fresh = !logList().length && !typedNights().length && !whoopNights().length;
    const link = L.compute({ nights: nights(), sessions: logList() }), run = shortRun();
    const installNote = Push.state === "install" && !store.get("ht2-install-hide", false)
      ? `<section class="note" data-attn="v2-install"><h2>Want your break on a locked phone?</h2><p>Add Halftime to your Home Screen${fresh ? " first" : ""}. In Safari only, it shows when you open the page.${fresh ? "" : " The Home Screen app starts fresh: what's here stays in Safari."}</p>
        ${hintOpen ? `<ol class="steps"><li>Tap the <b>Share</b> button (or <b>•••</b>, then <b>Share</b>).</li><li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li><li>Open <b>Halftime</b> from your Home Screen.</li></ol>` : ""}
        <div class="row">${btn(hintOpen ? "Hide the steps" : "Show me how", "hint", "ghost sm")}${btn("Not now", "install-hide", "ghost sm")}</div></section>` : "";
    return `${topbar(longDate(Date.now()))}
      <h1 class="title">${fresh ? "Last night, and today." : "Your two halves"}</h1>
      ${fresh ? sampleHalves() : `<div class="halves">${nightHalf()}${dayHalf()}</div><p class="linkline">${esc(linkLine(link))}</p>${link.state === "ready" || link.state === "one_side" ? `<button type="button" class="link" data-s="tab" data-v="week">See the week</button>` : ""}`}
      ${fresh ? "" : changesLine()}
      <div class="go">${btn("Start studying", "start", "big")}<p class="fine">${fresh ? "Halftime times your session and speaks up once, when a break would help, with its reasons." : esc(deliveryLine())}</p></div>
      ${run ? `<section class="note care" data-attn="v2-care"><h2>Several short nights</h2><p>${run.short} of your last ${run.of} nights were under 6 hours. If it's more than a busy week, talking to someone can help.</p>${btn("Talk to someone", "talk", "ghost sm")}</section>` : ""}
      ${installNote}
      ${Push.state === "ask" && consent() && joined() ? `<p class="fine center"><button type="button" class="link sm" data-s="push-on">Turn on notifications</button> to get your break on a locked phone.</p>` : ""}
      ${SPEED !== 1 ? `<p class="fine qa">Test speed ×${SPEED}: sessions are marked as tests.</p>` : ""}
      <p class="foot">A class project (BINF 4070). A wellness tool, not medical advice.</p>`;
  }

  // ---------- Week: seven pairs of halves, the link, your sessions
  function drawWeek() {
    const all = nights(), log = logList().filter((s) => !s.qa || SPEED !== 1), link = L.compute({ nights: all, sessions: log }), t = todayKey();
    const days = Array.from({ length: 7 }, (_, i) => L.addDays(t, -i));
    const maxKept = Math.max(60, ...days.map((k) => log.filter((s) => L.dayOf(s.startAt) === k).reduce((a, s) => a + s.minutes, 0)));
    const rows = days.map((k) => {
      const n = all.find((x) => x.date === k), u = L.usual(all, k), sess = log.filter((s) => L.dayOf(s.startAt) === k);
      const kept = sess.reduce((a, s) => a + s.minutes, 0), planned = sess.reduce((a, s) => a + s.planned, 0);
      const nw = n ? clampN((n.sleepMin / 600) * 100, 3, 100) : 0, uw = u.mid != null ? clampN((u.mid / 600) * 100, 0, 100) : null;
      const short = n && u.mid != null && n.sleepMin <= u.mid - L.SHORT_BY;
      const aria = `${dayLabel(k)}: ${n ? "slept " + sleepText(n.sleepMin) + (short ? ", a shorter night" : "") : "no sleep logged"}; ${sess.length ? `kept ${kept} of ${planned} min` : "no studying"}.`;
      return `<li class="pair" aria-label="${esc(aria)}"><span class="pd">${k === t ? "Today" : esc(dayLabel(k))}</span>
        <span class="pn">${n ? `<span class="bar${short ? " short" : ""}"><i style="width:${nw}%"></i>${uw != null ? `<em style="left:${uw}%"></em>` : ""}</span><b>${sleepShort(n.sleepMin)}</b>` : `<span class="dash">–</span>`}</span>
        <span class="pk">${sess.length ? `<span class="bar day"><i style="width:${clampN((kept / maxKept) * 100, 3, 100)}%"></i></span><b>${kept}<small> min</small></b>` : `<span class="dash">–</span>`}</span></li>`;
    }).join("");
    const linkBlock = link.state === "ready"
      ? `<div class="cmp"><div><span>After shorter nights</span><b>${link.shorter.kept}<small> of ${link.shorter.planned} min</small></b><em>${plural(link.shorter.n, "night")}</em></div><div><span>After usual nights</span><b>${link.usualSide.kept}<small> of ${link.usualSide.planned} min</small></b><em>${plural(link.usualSide.n, "night")}</em></div></div><p class="ls">${esc(link.sentence)}</p>`
      : link.state === "one_side" ? `<p class="ls">${esc(link.sentence)}</p>`
      : `<div class="prog" role="img" aria-label="${esc(link.progress.text)}">${Array.from({ length: link.progress.need }, (_, i) => `<i class="${i < link.progress.have ? "on" : ""}"></i>`).join("")}</div><p class="ls">${esc(link.sentence)}</p>`;
    const sessRows = log.slice(0, 10).map((s) => `<li><span class="when">${esc(dayName(s.startAt))}<br>${esc(clock(s.startAt))}</span><span><b>${esc(s.plan || "Study session")}</b><br><span class="what">kept ${s.minutes} of ${s.planned} min · ${plural(s.breaks, "break")}${s.awayN ? ` · out of view ${s.awayN}×` : ""} · ${s.arm === "pomodoro" ? "fixed timer" : "Halftime timing"}${s.qa ? " · test" : ""}</span></span></li>`).join("");
    return `${topbar("Your last seven days")}
      <h1 class="title">Your week</h1>
      <section class="card" data-attn="v2-week-pairs"><div class="phead"><span></span><span>Night</span><span>Studying kept</span></div><ul class="pairs">${rows}</ul>
        <p class="fine">The red tick is your usual night (after 7 nights). An outlined bar is a shorter night: 45 min or more under your usual.</p></section>
      <section class="card" data-attn="v2-week-link"><h2>The link</h2>${linkBlock}
        <button type="button" class="link sm" data-s="how" aria-expanded="${howOpen}">${howOpen ? "Hide how it's worked out" : "How it's worked out"}</button>
        ${howOpen ? `<div class="how"><p>Plain code compares two numbers; no AI is involved. For each day you studied, it takes the minutes you kept on the timer (breaks left out) against the minutes you planned. It splits those days by the night before: <b>shorter</b> (45 min or more under your usual) or <b>usual</b>. Your usual is the middle night of the 28 days before, once there are 7.</p><p>It needs ${L.NEED_NIGHTS} logged nights and ${L.NEED_DAYS} study days after them, with at least 2 on each side, before it says anything. With this few nights a difference can easily be chance, so it always says how many it rests on. Method: ${esc(link.v)}.</p></div>` : ""}</section>
      <section class="card" data-attn="v2-week-sessions"><h2>Sessions</h2>${log.length ? `<ul class="log">${sessRows}</ul>` : `<p class="fine">None yet. Start one from Today.</p>`}</section>
      <p class="foot">${typedNights().length || whoopNights().length ? `Nights and sessions are kept on ${here}.` : ""} A wellness tool, not medical advice.</p>`;
  }

  // ---------- first run: consent and the band question
  function consentList() {
    const li = (b, t) => `<li><b>${b}</b> ${t}</li>`;
    return `<section class="card"><h2>What's saved</h2><ul class="clist">
        ${li("Your sessions.", "Start and end, the length you planned, your breaks, and what you tapped on each suggestion.")}
        ${li("Out of view.", "How many times, and how long, Halftime was out of view during a session (another app, or the screen locked). Never which app.")}
        ${li("Your answers.", "The sleep hours you type when you start a session, which sleep tracker you have (if any), your check-in after each session, and a 10-question survey after a few sessions.")}
        ${li("How you use the app.", COMPUTER ? "Screens, clicks, scrolling, time on each screen and rough mouse paths." : "Screens, taps, scrolling, time on each screen and rough finger paths.")}
        ${li("Your device, IP address and rough location", "(city and region).")}
        ${li("If you turn on notifications:", `a push address for ${here}, used only to send your break.`)}</ul></section>
      <section class="card"><h2>What isn't</h2><ul class="clist">
        ${li("Which apps you use, your Screen Time, messages, photos, contacts or exact location.", "")}
        ${li("What you're studying.", `It stays on ${here}.`)}
        ${li("A band's readings.", `A WHOOP synced on a laptop stays in that browser. A session notes only that sleep came from a band.`)}
        ${li("No AI reads your data.", "Plain code does the math.")}</ul></section>
      <section class="card"><h2>Good to know</h2><ul class="clist">
        ${li("Two timers.", "Each session randomly uses Halftime's timing or a fixed 25-on, 5-off timer, so the team can compare them. It tells you which.")}
        ${li("Who sees it.", "The four students on the project team, for the course report, with names removed. How long it's kept isn't set yet.")}
        ${li("Wellness, not medicine.", "Halftime suggests study breaks. It doesn't diagnose or treat anything.")}
        ${li("You can stop any time.", `Sources & privacy → Delete my data removes everything from the server and ${here}.`)}</ul></section>`;
  }
  function drawConsent() {
    const c = consent();
    return `<header class="sub"><button type="button" class="back" data-s="consent-back">‹ Back</button><span>Class project · BINF 4070</span></header>
      <h1 class="title">${c ? "What's collected" : "Before your first session"}</h1>
      <p class="lead">Halftime is a student prototype, and this is a class test of it. If you join, this is everything it saves.</p>
      ${consentList()}
      <div class="stick">${btn(c && c.choice === "agree" ? "Keep sharing" : "Agree and join", "consent-yes", "big")}${btn(c && c.choice === "decline" ? "Keep not sharing" : "Use it without sharing", "consent-no", "ghost")}</div>`;
  }
  function drawBand() {
    const opt = (k, label, sub) => `<button type="button" class="opt" data-s="band" data-v="${k}"><b>${label}</b><span>${sub}</span></button>`;
    return `<header class="sub"><button type="button" class="back" data-s="band-back">‹ Back</button><span>One question</span></header>
      <h1 class="title">Do you wear a sleep tracker?</h1>
      <p class="lead">Halftime only needs how long you slept. You can type it each morning from your tracker's app, or from memory.</p>
      <div class="opts">${opt("whoop", "WHOOP", COMPUTER ? "A WHOOP 4.0 can sync here over Bluetooth, in Chrome" : "Type it from the WHOOP app. A WHOOP 4.0 can also sync on a laptop")}
        ${opt("fitbit", "Fitbit", "Type it from the Fitbit app")}${opt("oura", "Oura ring", "Type it from the Oura app")}${opt("apple", "Apple Watch", "Type it from the Health app")}
        ${opt("none", "No tracker", "A rough guess is fine")}</div>
      <p class="fine">Halftime can't read a tracker from a phone yet, so nothing is connected. You can change this in Sources &amp; privacy.</p>`;
  }

  // ---------- setup (length; and last night if it isn't logged yet)
  function drawSetup() {
    const d = draft, lens = [[30, "30 min"], [45, "45 min"], [60, "1 h"], [90, "1.5 h"], [120, "2 h"], [180, "3 h"]];
    const from = bandName() && band() !== "none" ? `from your ${esc(bandName())} app` : "";
    const sleepBlock = d.sleepSkip
      ? `<p class="val">Left out</p><p class="fine">Halftime goes on time alone, and says so.</p>${btn("Add my sleep", "sleep-unskip", "ghost sm")}`
      : d.sleepKnown && !d.sleepEdit
        ? `<p class="val">${sleepText(d.sleepMin)}</p><p class="fine">${d.sleepSrc === "whoop4" ? "From your WHOOP 4.0, synced in this browser." : "You logged it this morning."}</p><div class="row">${d.sleepSrc === "whoop4" ? "" : btn("Change", "sleep-edit", "ghost sm")}${btn("Leave it out", "sleep-skip", "ghost sm")}</div>`
        : `<div class="stepper"><button type="button" data-s="sleep-dec" aria-label="15 minutes less">−</button><p class="val" aria-live="polite">${sleepText(d.sleepMin)}</p><button type="button" data-s="sleep-inc" aria-label="15 minutes more">+</button></div>
           <p class="fine">${from ? `Type it ${from}.` : "A rough guess is fine."} It's saved for today's Week and link.</p><div class="row">${btn("Leave it out", "sleep-skip", "ghost sm")}</div>`;
    const arm = nextArm();
    return `<header class="sub"><button type="button" class="back" data-s="cancel-setup">‹ Today</button><span>Session ${store.get("ht2-n", 0) + 1}</span></header>
      <h1 class="title">Ready when you are</h1>
      <section class="card" data-attn="v2-setup-length"><h2>How long?</h2><div class="row wrap">${lens.map(([m, l]) => chip(l, "len", d.planned === m, m)).join("")}</div></section>
      <section class="card" data-attn="v2-setup-sleep"><h2>Last night's sleep</h2>${sleepBlock}</section>
      <section class="card"><h2><label for="v-plan">Working on</label> <span class="opt-t">optional</span></h2><input id="v-plan" class="input" maxlength="60" placeholder="e.g. Orgo problem set 7" value="${esc(d.plan)}" autocomplete="off" enterkeyhint="done" aria-label="What are you working on"><p class="fine">Stays on ${here}, so you can check it off at the end.</p></section>
      <p class="fine arm">${arm === "pomodoro" ? "This session uses the <b>fixed 25/5 timer</b>, the comparison. Each session is picked at random." : "This session uses <b>Halftime's timing</b>. Each session is picked at random: this one or a fixed 25/5 timer."}</p>
      <div class="stick">${btn("Start the timer", "begin", "big")}</div>`;
  }

  // ---------- the session
  function lineHtml() {
    const now = Date.now(), endAt = realAt(Math.max(S.endMin, sessMin(now) + 1)), span = endAt - S.startAt, pct = (t) => clampN(((t - S.startAt) / span) * 100, 0, 100);
    const slots = [];
    (S.breaks || []).forEach((b) => slots.push(`<span class="fill" style="left:${pct(b.startAt)}%;width:${Math.max(1.2, pct(b.endAt || now) - pct(b.startAt))}%"></span>`));
    if (S.arm === "pomodoro") for (let c = 0; c * 30 + 25 < S.endMin; c++) slots.push(`<span class="slot" style="left:${pct(realAt(c * 30 + 25))}%;width:${Math.max(1.5, pct(realAt(c * 30 + 30)) - pct(realAt(c * 30 + 25)))}%"></span>`);
    if (S.arm === "halftime" && S.cue && S.cue.shownAt && !S.cue.done && S.cue.kind !== "keep") slots.push(`<span class="slot" style="left:${pct(now)}%;width:${Math.max(2, pct(now + (S.cue.breakMin * MIN) / SPEED) - pct(now))}%"></span>`);
    const over = sessMin(now) > S.endMin;
    return `<section class="line" aria-label="This session as a line, from ${clock(S.startAt)} to your planned end at ${clock(realAt(S.endMin))}">
      <div class="ll"><span>This session</span><span class="ol">${over ? "past your plan" : "to your planned end"}</span></div>
      <div class="track"><span class="done" style="width:${pct(now)}%"></span>${slots.join("")}<span class="nowm" style="left:${pct(now)}%"></span><span class="stop"></span></div>
      <div class="ticks"><span>${clock(S.startAt)}</span><span class="tn">now ${clock(now)}</span><span>${clock(realAt(S.endMin))}</span></div></section>`;
  }
  function clockHtml() { const secs = Math.floor(studyMin() * 60), h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60; return `${h}:${String(m).padStart(2, "0")}<small><span class="secs">:${String(s).padStart(2, "0")}</span> studying</small>`; }
  function titleNow() {
    if (!S || !(view === "live" || view === "break")) return "Halftime";
    if (S.cue && S.cue.shownAt && !S.cue.done) return (pastEnd(S.cue) ? "Time to wrap up" : { walk: "Short walk now?", break: "Take a break?", keep: "Keep going.", pomo: "Take 5?" }[S.cue.kind] || "Halftime") + " · Halftime";
    if (S.brk) { const left = Math.max(0, Math.round(((S.brk.endAt - Date.now()) * SPEED) / 1000)); return `Break ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")} · Halftime`; }
    const secs = Math.floor(studyMin() * 60); return `${Math.floor(secs / 3600)}:${String(Math.floor((secs % 3600) / 60)).padStart(2, "0")} studying · Halftime`;
  }
  function paintClock() {
    document.title = titleNow();
    const c = root.querySelector("#v-clock"); if (c) c.innerHTML = clockHtml();
    const b = root.querySelector("#v-bleft"); if (b && S.brk) { const left = Math.max(0, Math.round(((S.brk.endAt - Date.now()) * SPEED) / 1000)); b.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; }
    const now = Date.now(), nm = root.querySelector(".line .nowm"), dn = root.querySelector(".line .done"), tn = root.querySelector(".line .tn");
    if (nm && dn) { const endAt = realAt(Math.max(S.endMin, sessMin(now) + 1)), p = clampN(((now - S.startAt) / (endAt - S.startAt)) * 100, 0, 100); nm.style.left = p + "%"; dn.style.width = p + "%"; if (tn) tn.textContent = "now " + clock(now); }
    const pn = root.querySelector("#v-pomo"); if (pn && S.arm === "pomodoro") pn.textContent = pomoLine();
    const ol = root.querySelector(".line .ol"); if (ol) ol.textContent = sessMin(now) > S.endMin ? "past your plan" : "to your planned end";
  }
  const pomoLine = () => { const t = sessMin(), r = t % 30; return r < 25 ? `Fixed timer: next break in ${Math.max(1, Math.ceil(25 - r))} min.` : `Fixed timer: break time, ${Math.max(1, Math.ceil(30 - r))} min left.`; };
  const pastEnd = (c) => c.kind === "keep" && S.endMin - sessMin(c.shownAt || Date.now()) < 1.5;
  const cueHead = (c) => (pastEnd(c) ? "Time to wrap up." : { walk: "Short walk now?", break: "Take a 15-minute break?", keep: "Keep going.", pomo: "25 minutes done. Take 5?" }[c.kind]);
  const lastBreakEnd = () => { const b = (S.breaks || []).filter((x) => x.endAt).pop(); return b ? b.endAt : S.startAt; };
  function sureLine() {
    if (S.sleepSrc === "none") return "No sleep number, so this rests on time alone. A rough guess.";
    if (S.sleepSrc === "wearable") return "Based on this timer and last night's sleep from your WHOOP. A starting rule, not yet personal to you.";
    return "Based on this timer and the sleep you typed. A starting rule, not yet personal to you.";
  }
  function sourceRows() {
    const c = S.cue, since = lastBreakEnd(), rows = [];
    rows.push(`<div class="ev"><span class="k">1 · Time since your last break</span><span class="v">${dur(sessMin(c.shownAt || Date.now()) - sessMin(since))}</span><span class="m">${here}'s timer · ${since === S.startAt ? "started" : "last break ended"} ${clock(since)}</span></div>`);
    rows.push(`<div class="ev"><span class="k">2 · Sleep last night</span><span class="v">${S.sleepH == null ? "not given" : sleepText(S.sleepH * 60)}</span><span class="m">${S.sleepSrc === "wearable" ? "WHOOP 4.0, synced in this browser" : S.sleepSrc === "self" ? "you typed this" : "left out of this suggestion"}</span></div>`);
    rows.push(`<div class="ev"><span class="k">3 · Planned end</span><span class="v">${clock(realAt(S.planned))}</span><span class="m">the length you picked: ${dur(S.planned)}</span></div>`);
    const steps = (S.rule && S.rule.steps || []).map((s) => `${esc(s.text)}: ${esc(s.val)}`).join(" · ");
    rows.push(`<div class="ev"><span class="k">How the moment was picked</span><span class="v">rule ${RULE.version}</span><span class="m">${steps}. A starting rule the team chose, the same for everyone. Plain code, no AI.</span></div>`);
    return `<div class="evs">${rows.join("")}</div>`;
  }
  function cardHtml() {
    const c = S.cue, now = c.shownAt || Date.now(), since = dur(sessMin(now) - sessMin(lastBreakEnd()));
    const late = c.via !== "app" && (now - c.at) * SPEED > 2 * MIN ? `from ${clock(c.at)}` : "";
    const talk = `<button type="button" data-s="talk">Talk to someone</button>`;
    if (wrongOpen) return `<div class="status"><span>Halftime · you choose</span><span></span></div><h2 class="q q2">What looks wrong?</h2>
      <div class="rungs"><button type="button" class="rung" data-s="wrong" data-v="timing"><b>The timing</b><span>Too early, or too late</span></button><button type="button" class="rung" data-s="wrong" data-v="reason"><b>The reason</b><span>A number or a source is off</span></button><button type="button" class="rung" data-s="wrong" data-v="no_need"><b>I don't need a break</b><span>I'm in a good stretch</span></button></div>
      <div class="links"><button type="button" data-s="wrong-back">Back</button></div>`;
    if (c.kind === "pomo") return `<div class="status"><span>Fixed timer · ${dur(c.min)} in</span><span>${late || "25 on, 5 off"}</span></div>
      <h2 class="q">25 minutes done. Take 5?</h2>
      <p class="why">This session uses a <b>fixed timer</b>, not Halftime's own timing: a break every 25 minutes, whatever your night was. The team compares the two.</p>
      <div class="acts"><button type="button" class="a yes" data-s="take">Start break</button><button type="button" class="a no" data-s="keep">Skip it</button></div>
      <div class="links"><button type="button" data-s="wrong-open">Looks wrong</button>${talk}</div>`;
    const leftMin = S.endMin - sessMin(), atEnd = leftMin < 1.5;
    const nx = atEnd ? "you've reached your planned end" : `your planned end is in ${dur(leftMin)}`;
    const sleepBit = S.sleepH == null ? "" : `, on <b>${sleepText(S.sleepH * 60)}</b> of sleep<span class="nw">${num(2, "sleep last night")}</span>`;
    const sub = c.kind === "keep" ? (pastEnd(c) ? "You're at your planned end. Stopping now is your break." : "You're close to done. The end is your break.") : `${c.breakMin} minutes. Back by ${clock(Date.now() + (c.breakMin * MIN) / SPEED)}.`;
    const why = c.kind === "keep"
      ? `You've been going <b>${since}</b><span class="nw">${num(1, "time since your last break")}</span>${sleepBit}. But ${nx}<span class="nw">${num(3, "planned end")},</span> so a break now wouldn't fit. Finish up, then rest.`
      : `You've been going <b>${since}</b> without a break<span class="nw">${num(1, "time since your last break")}</span>${sleepBit}. ${cap(nx)}<span class="nw">${num(3, "planned end")},</span>${atEnd ? ` so this ${c.kind === "walk" ? "walk" : "break"} can be your stopping point.` : ` so a ${c.kind === "walk" ? "walk" : "break"} fits.`}${S.rule && S.rule.late && c.kind === "break" ? " It's late, so the break is longer." : ""}`;
    return `<div class="status"><span>Halftime · ${dur(sessMin(c.at))} in</span><span>${late || (c.snoozes ? "snoozed once" : "speaks once")}</span></div>
      <h2 class="q">${cueHead(c)}</h2><p class="subq">${sub}</p><p class="why">${why}</p>
      <p class="sure"><span class="tag">How sure</span><span>${sureLine()}</span></p>
      ${whyOpen ? sourceRows() : ""}
      <div class="acts">${c.kind === "keep" ? `<button type="button" class="a yes" data-s="keep">OK</button><button type="button" class="a no" data-s="take-anyway">Break anyway</button>` : `<button type="button" class="a yes" data-s="take">Start ${c.kind === "walk" ? "walk" : "break"}</button><button type="button" class="a no" data-s="keep">Keep going</button>`}</div>
      <div class="links"><button type="button" data-s="why" aria-expanded="${whyOpen}">${whyOpen ? "Hide sources" : "See why"}</button>${c.kind !== "keep" && c.snoozes < 1 && S.endMin - sessMin() - 10 >= c.breakMin + 2 ? `<button type="button" data-s="snooze">Snooze 10 min</button>` : ""}<button type="button" data-s="wrong-open">Looks wrong</button>${talk}</div>`;
  }
  function drawLive() {
    const c = S.cue, showing = c && c.shownAt && !c.done && cardOpen, pending = c && c.shownAt && !c.done && !cardOpen;
    const breaks = (S.breaks || []).filter((b) => b.endAt).length;
    const quiet = S.arm === "pomodoro" ? `<span id="v-pomo">${pomoLine()}</span>`
      : !S.cue ? "This session is too short for a break suggestion. Halftime will stay quiet."
      : c.done ? ({ take: "You took a break when Halftime suggested one.", keep: c.kind === "keep" ? "Halftime said to finish first. It's done for this session." : "You kept going. Halftime is done for this session.", wrong: "You flagged the suggestion. Thanks.", not_needed: "You already took a break, so Halftime will stay quiet.", ended: "" }[c.response] || "")
      : c.shownAt ? "Halftime has a suggestion for you." : "Halftime will speak up once, when a break would help.";
    return `<section class="hero${showing ? " dim" : ""}" aria-label="This session" data-attn="v2-clock">
        <p class="subj"><span>${esc(S.plan || "Study session")}</span><span>Started ${clock(S.startAt)}</span></p>
        <p class="clock" id="v-clock">${clockHtml()}</p>
        <p class="since">${breaks ? `${plural(breaks, "break")} so far.` : "No break yet."} ${S.arm === "pomodoro" ? "Fixed 25/5 timer." : "Halftime's timing."}</p>
        <p class="fine quiet">${quiet}</p>
        ${pending ? btn("See the suggestion", "card-open", "ghost sm") : ""}
      </section>
      ${showing ? `<section class="scard" role="region" aria-label="Halftime's suggestion" aria-live="polite" data-attn="v2-card">${cardHtml()}</section>` : lineHtml()}
      ${showing ? "" : `<section class="acts2">
        ${breakAsk ? `<p class="ask">How long a break?</p><div class="row">${btn("5 min", "break-5", "ghost")}${btn("15 min", "break-15", "ghost")}${btn("Cancel", "break-cancel", "ghost")}</div>`
          : endAsk ? `<p class="ask">End this session?</p><p class="fine">${studyMin() < 2 ? "Under 2 minutes in. You can discard it instead, and it won't count." : task().run ? "Then three quick questions." : "Then two quick taps."}</p><div class="row">${btn("End session", "end-yes", "")}${studyMin() < 2 ? btn("Discard", "end-discard", "ghost") : ""}${btn("Keep studying", "end-no", "ghost")}</div>`
          : `<div class="row two">${btn("Take a break", "break-ask", "ghost")}${btn("End session", "end-ask", "ghost")}</div>`}
        ${!COMPUTER && "wakeLock" in navigator && Push.state !== "on" ? `<button type="button" class="sw" role="switch" aria-checked="${wakeWanted}" data-s="wake"><span>Keep the screen on<br><small>So you see the suggestion on time without notifications</small></span><i></i></button>` : ""}
      </section>`}
      <p class="foot">${esc(deliveryLine())}${SPEED !== 1 ? ` Test speed ×${SPEED}.` : ""}</p>`;
  }
  function drawBreak() {
    const b = S.brk;
    return `<section class="scard brk" role="region" aria-label="Break" data-attn="v2-break">
        <div class="status"><span>${b.from === "pomo" ? "Fixed timer · on a break" : b.from === "manual" ? "Your break" : "Halftime · on a break"}</span><span>back by ${clock(b.endAt)}</span></div>
        <p class="bleft" id="v-bleft" aria-live="off">0:00</p>
        <p class="why">Step away from the screen if you can. ${Push.state === "on" ? "You'll get a notification when it's over." : "Halftime will be here when you're back."}</p>
        <div class="acts">${b.from !== "pomo" && !b.plus ? `<button type="button" class="a no" data-s="plus5">+5 min</button>` : `<span></span>`}<button type="button" class="a yes" data-s="break-end">End break</button></div>
      </section>
      <section class="hero dim2" aria-label="This session"><p class="subj"><span>${esc(S.plan || "Study session")}</span><span>Started ${clock(S.startAt)}</span></p><p class="clock" id="v-clock">${clockHtml()}</p><p class="since">The study clock is paused while you're on a break.</p></section>
      ${lineHtml()}`;
  }
  function drawStale() {
    return `<h1 class="title">Still studying?</h1><p class="lead">This session started ${dur(sessMin())} ago, and Halftime was last open at ${clock(S.staleAt)}.</p>
      <div class="col">${btn("I stopped around " + clock(S.staleAt), "stale-stop", "big")}${btn("Still going", "stale-go", "ghost")}</div>`;
  }

  // ---------- check-in: 2 taps until the team picks the study task, then 3
  function drawCheckin() {
    const T = task(), c = checkin, total = T.run ? 3 : 2, n = (k) => (T.run ? k : k - 1);
    const head = (k, title) => `<p class="kick">Check-in · ${n(k)} of ${total}</p><h1 class="title">${title}</h1>`;
    if (c.step === "task") return `${head(1, esc(T.title))}<p class="lead">${esc(T.intro)}</p><div id="v-task"></div>
      <div class="col">${T.run ? btn("Start", "task-run", "big") + btn("Skip this", "task-skip", "ghost") : btn("Continue", "task-skip", "big")}</div>`;
    if (c.step === "finished") return `${head(2, "Did you finish what you planned?")}<p class="lead">${S.plan ? `You planned: <b>${esc(S.plan)}</b>. ` : ""}${S.minutes > S.planned ? `You studied ${dur(S.minutes)}, past the ${dur(S.planned)} you planned.` : `You kept ${dur(S.minutes)} of ${dur(S.planned)} on the timer.`}</p>
      <div class="col">${[["yes", "Yes"], ["mostly", "Mostly"], ["no", "No"]].map(([v, l]) => `<button type="button" class="btn pick" data-s="fin" data-v="${v}">${l}</button>`).join("")}</div>`;
    return `${head(3, "How much did your phone pull you away?")}<p class="lead">Your honest guess. Halftime can't see other apps, so this is the part only you know.</p>
      <div class="col">${[["none", "Not at all"], ["little", "A little"], ["lot", "A lot"]].map(([v, l]) => `<button type="button" class="btn pick" data-s="pull" data-v="${v}">${l}</button>`).join("")}</div>`;
  }
  function drawDone() {
    const s = checkin.done, due = logList().filter((x) => !x.qa || SPEED !== 1).length >= 3 && !store.get("ht2-sus-done", false);
    const pct = s.planned ? Math.round((Math.min(s.minutes, s.planned) / s.planned) * 100) : 0;
    return `<p class="kick">Session ${s.n} saved</p><h1 class="title">${Math.min(s.minutes, s.planned)} of ${s.planned} min kept${s.awayN ? ` · out of view ${s.awayN === 1 ? "once" : s.awayN + " times"}` : ""}</h1>
      <div class="keptbar" role="img" aria-label="${pct}% of your planned time kept"><i style="width:${pct}%"></i></div>
      <p class="lead">${s.minutes > s.planned ? `You went ${dur(s.minutes - s.planned)} past your plan. ` : ""}${plural(s.breaks.length, "break")}${s.awayN ? `, and ${dur(s.awayMin)} out of view (another app, or the screen locked)` : ""}. This session used ${s.arm === "pomodoro" ? "the <b>fixed 25/5 timer</b>" : "<b>Halftime's timing</b>"}.${joined() ? "" : " Nothing was sent: you're not sharing data."}</p>
      <div class="col">${due ? btn("Two more minutes: 10 quick questions", "sus-start", "big") + btn("Not now", "done", "ghost") : btn("Done", "done", "big")}</div>
      ${due ? `<p class="fine center">You've done ${logList().length} sessions. The team would like your view of the app itself.</p>` : ""}`;
  }
  const SUS = ["I think that I would like to use Halftime frequently.", "I found Halftime unnecessarily complex.", "I thought Halftime was easy to use.", "I think that I would need the support of a technical person to be able to use Halftime.", "I found the various functions in Halftime were well integrated.", "I thought there was too much inconsistency in Halftime.", "I would imagine that most people would learn to use Halftime very quickly.", "I found Halftime very cumbersome to use.", "I felt very confident using Halftime.", "I needed to learn a lot of things before I could get going with Halftime."];
  function drawSus() {
    const i = susA.length;
    if (i >= SUS.length) return `<p class="kick">Survey done</p><h1 class="title">Thank you.</h1><p class="lead">That's everything. Your answers help the team decide what to fix first.</p><div class="col">${btn("Done", "done", "big")}</div>`;
    return `<p class="kick">About the app · ${i + 1} of ${SUS.length}</p><h1 class="title susq">${esc(SUS[i])}</h1>
      <div class="sus" role="group" aria-label="${esc(SUS[i])}">${[1, 2, 3, 4, 5].map((v) => `<button type="button" data-s="sus" data-v="${v}" aria-label="${v} of 5${v === 1 ? ", strongly disagree" : v === 5 ? ", strongly agree" : ""}">${v}</button>`).join("")}</div>
      <div class="susl"><span>Strongly disagree</span><span>Strongly agree</span></div>
      <div class="col">${i ? btn("Back", "sus-back", "ghost") : ""}${btn("Stop the survey", "done", "ghost")}</div>`;
  }
  function drawDelete() {
    return `<header class="sub">${delBusy ? "<span></span>" : `<button type="button" class="back" data-s="del-cancel">‹ Back</button>`}<span></span></header>
      <h1 class="title">Delete my data</h1>
      <p class="lead">This removes everything saved for ${here} from the team's server: sessions, answers, usage data and the push address. It also clears Halftime on ${here}, including your nights, and turns sharing off.</p>
      <p class="lead"><b>It can't be undone.</b></p><p class="fine" id="v-delmsg" role="alert"></p>
      <div class="col">${btn(delBusy ? "Deleting…" : "Delete everything", "del-yes", "big danger")}${delBusy ? "" : btn("Cancel", "del-cancel", "ghost")}</div>`;
  }

  // ---------- sheets: Sources & privacy, Talk to someone, last night's sleep
  function sheetHtml() {
    if (sheet === "privacy") {
      const c = consent(), b = band();
      const row = (title, sub, s, right) => `<button type="button" class="srow" data-s="${s}"><span><b>${title}</b><small>${sub}</small></span><em>${right || "›"}</em></button>`;
      return `<h2 class="sh-t" id="sheet-title">Sources &amp; privacy</h2>
        <p class="sh-l">What Halftime reads</p>
        <ul class="reads"><li><b>This timer</b><span>Your sessions, breaks and taps on ${here}.</span></li>
          <li><b>Last night's sleep</b><span>${b && b !== "none" ? `Typed by you from your ${esc(bandName())}.` : "Typed by you."}${whoopNights().length ? " A WHOOP 4.0 synced in this browser." : ""}</span></li>
          <li><b>Out of view</b><span>How long Halftime wasn't on screen during a session. Not which app.</span></li></ul>
        <p class="sh-l">What it can't see</p>
        <p class="sh-p">Other apps, Screen Time, websites, messages, contacts, photos or your exact location. No AI reads your data: plain code does the math.</p>
        <p class="sh-l">Your choices</p>
        <div class="rows">
          <button type="button" class="srow" role="switch" aria-checked="${joined()}" data-s="share"><span><b>Share with the team</b><small>${joined() ? "On: sessions, answers, out-of-view time, usage" : c ? "Off: nothing leaves " + here : "Not chosen yet"}</small></span><i class="tg"></i></button>
          ${row("Notifications", esc(deliveryLine()), "notif", Push.state === "on" ? "On" : Push.state === "ask" ? "Off" : "")}
          ${row("Sleep tracker", b ? (b === "none" ? "No tracker" : esc(bandName())) : "Not asked yet", "band-change")}
          ${row("Everything that's collected", "The full list from the consent screen", "collected")}
          ${row("Delete my data", `From the server and ${here}. Can't be undone.`, "delete", "")}
        </div>
        <p class="sh-p fine">How long the team keeps it isn't set yet. It's used for the BINF 4070 course report.</p>
        <button type="button" class="btn ghost" data-s="sheet-close">Close</button>`;
    }
    if (sheet === "talk") return `<h2 class="sh-t" id="sheet-title">Talk to someone</h2>
      <p class="sh-p">Halftime is a study timer, not a counselor. If tiredness, stress or low mood keep coming back, talking to a person helps more than any timer.</p>
      <ul class="reads"><li><b>Your campus counseling service</b><span>Columbia students: Counseling and Psychological Services (CPS). The team is confirming the exact contact to put here.</span></li>
        <li><b>Someone you trust</b><span>A friend, a teammate, a coach or an advisor.</span></li>
        <li><b>If you're in crisis</b><span>Call or text <a href="tel:988">988</a> (Suicide &amp; Crisis Lifeline, US, any time). In an emergency, call <a href="tel:911">911</a>.</span></li></ul>
      <button type="button" class="btn ghost" data-s="sheet-close">Close</button>`;
    if (sheet === "sleep") {
      const from = bandName() && band() !== "none" ? `from your ${esc(bandName())} app` : "";
      return `<h2 class="sh-t" id="sheet-title">Last night's sleep</h2>
        <p class="sh-p">${from ? `Type it ${from}.` : "A rough guess is fine."} It's kept on ${here} for Today and Week.</p>
        <div class="stepper big2"><button type="button" data-s="sl-dec" aria-label="15 minutes less">−</button><p class="val" aria-live="polite">${sleepText(sleepDraft)}</p><button type="button" data-s="sl-inc" aria-label="15 minutes more">+</button></div>
        <div class="col">${btn("Save", "sl-save", "big")}${nightFor(todayKey()) && nightFor(todayKey()).src === "typed" ? btn("Remove it", "sl-del", "ghost") : ""}${btn("Cancel", "sheet-close", "ghost")}</div>`;
    }
    return "";
  }
  function paintSheet() {
    const sc = document.getElementById("scrim"), sh = document.getElementById("sheet");
    if (!sc || !sh) return;
    const open = !!sheet;
    sc.classList.toggle("on", open); sh.classList.toggle("on", open); sh.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) { sh.innerHTML = `<div class="grab" aria-hidden="true"></div>${sheetHtml()}`; sh.setAttribute("aria-labelledby", "sheet-title"); }
    document.body.classList.toggle("locked", open);
    root.inert = open; const tb = document.getElementById("tabs"); if (tb) tb.inert = open;
  }
  function openSheet(name) { sheet = name; if (name === "sleep") { const n = nightFor(todayKey()); sleepDraft = n ? n.sleepMin : lastTyped(); } paintSheet(); screen("sheet_" + name); const f = document.querySelector("#sheet button"); if (f) f.focus({ preventScroll: true }); }
  function closeSheet() { sheet = null; paintSheet(); }

  // ---------- draw
  const VIEWS = { today: drawToday, week: drawWeek, consent: drawConsent, band: drawBand, setup: drawSetup, live: drawLive, break: drawBreak, stale: drawStale, checkin: drawCheckin, done: drawDone, sus: drawSus, delete: drawDelete };
  // a redraw that lands between a finger going down and coming up would swallow the tap: wait for the finger
  let fingerDown = false, drawLater = false;
  function draw() {
    if (!root || taskRunning || dead) return;
    if (fingerDown) { drawLater = true; return; }
    drawLater = false;
    const keep = document.activeElement && document.activeElement.id && root.contains(document.activeElement) ? document.activeElement.id : null;
    root.innerHTML = (DEMO ? `<p class="demo">Sample fortnight · synthetic data · nothing is saved</p>` : "") + VIEWS[view]();
    root.dataset.view = view;
    const tb = document.getElementById("tabs");
    if (tb) { tb.hidden = !tabView(); tb.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-current", b.dataset.tab === view ? "page" : "false")); }
    document.body.dataset.view = view;
    if (!(view === "live" || view === "break")) document.title = view === "week" ? "Week · Halftime" : "Halftime";
    if (keep) { const el = document.getElementById(keep); if (el) { el.focus({ preventScroll: true }); try { el.setSelectionRange(el.value.length, el.value.length); } catch {} } }
    if (view === "live" || view === "break") paintClock();
    if (sheet) paintSheet();
    document.body.classList.toggle("has-stick", !!root.querySelector(".stick"));
    if (window.HT && HT.watch) HT.watch(root);
  }
  function go(v, keepScroll) {
    const changed = view !== v; view = v;
    if (v === "live" || v === "break") { if (!tickT) tickT = setInterval(tick, 1000); } else if (!S || S.phase === "checkin") { clearInterval(tickT); tickT = null; }
    draw();
    if (changed || v === "live") screen(v + (v === "live" && S && S.cue && S.cue.shownAt && !S.cue.done && cardOpen ? "_suggest" : ""));
    if (!keepScroll || cardOpen) scrollTo(0, 0);
  }
  function setSharing(yes) {
    store.set("ht2-consent", { choice: yes ? "agree" : "decline", at: Date.now(), v: CONSENT_V });
    if (DEMO) return;
    if (yes) { if (window.HT) HT.optIn(); sev("consent_study", "agree", { v: CONSENT_V }); sflush(); }
    else if (window.HT && HT.isRecording()) { HT.event("consent_study", { value: "decline", extra: { v: CONSENT_V, app: "v2" } }); HT.optOut(); }
    if (!yes && (Push.sub || store.get("ht-push-saved", ""))) Push.off(); else Push.refresh();
  }
  // where the first run goes next: consent → band → setup
  function startFlow() {
    if (DEMO) { toast("This is the sample fortnight. Open /v2 without ?demo to study for real."); return; }
    if (S) return go(home());
    if (!consent()) { afterConsent = "start"; return go("consent"); }
    if (!band()) return go("band");
    draft = newDraft(); go("setup");
  }

  // ---------- taps
  function onClick(e) {
    fingerDown = false; // the tap is over: what it changes draws at once (only background redraws wait for a finger)
    const b = e.target.closest("[data-s]"); if (!b) return;
    const inSheet = b.closest("#sheet"), inTabs = b.closest("#tabs");
    if (!inSheet && !inTabs && !root.contains(b)) return;
    const k = b.dataset.s, v = b.dataset.v;
    if (Date.now() - drawnAt < 280 && /^(break-ask|end-ask|sus|sus-start|fin|pull|task-skip|start|done|take|keep|band|consent-yes|consent-no|begin)$/.test(lastKey)) return; // the second half of a double tap
    drawnAt = Date.now(); lastKey = k;
    // tabs and sheets
    if (k === "tab") { if (!tabView()) return; howOpen = false; return go(v); }
    if (k === "privacy") return openSheet("privacy");
    if (k === "talk") { sev("talk_open", view, S ? { study: S.id, arm: S.arm } : {}); return openSheet("talk"); }
    if (k === "sheet-close") return closeSheet();
    if (k === "sleep-open") return openSheet("sleep");
    if (k === "sl-inc" || k === "sl-dec") { sleepDraft = clampN(sleepDraft + (k === "sl-inc" ? 15 : -15), 0, 840); return paintSheet(); }
    if (k === "sl-save") { saveTyped(todayKey(), sleepDraft); closeSheet(); toast("Saved for today."); return draw(); }
    if (k === "sl-del") { saveTyped(todayKey(), null); closeSheet(); toast("Removed."); return draw(); }
    if (k === "share" && !consent()) { closeSheet(); afterConsent = "back"; return go("consent"); }
    if (k === "share") { const yes = !joined(); setSharing(yes); toast(yes ? "Sharing on. Thanks." : `Sharing off. Nothing leaves ${here}.`); return paintSheet(); }
    if (k === "notif") {
      if (Push.state === "on") { Push.off().then(() => { toast("Notifications off."); paintSheet(); }); return; }
      if (Push.state === "ask" && !consent()) { closeSheet(); afterConsent = "push"; return go("consent"); }
      if (Push.state === "ask") { Push.enable().then((ok) => { toast(pushMsg(ok)); paintSheet(); }); return; }
      if (Push.state === "install") { closeSheet(); hintOpen = true; store.del("ht2-install-hide"); if (!S) go("today"); return; }
      return toast(deliveryLine());
    }
    if (k === "band-change") { if (S) return toast("Finish this session first."); closeSheet(); afterConsent = null; return go("band"); }
    if (k === "collected") { closeSheet(); afterConsent = "back"; return go("consent"); }
    if (k === "delete") { if (taskRunning) return; closeSheet(); delBusy = false; return go("delete"); }
    if (k === "push-on") { if (!consent()) { afterConsent = "push"; return go("consent"); } return turnOnPush(); }
    if (k === "push-test") return void Push.test();
    if (k === "hint") { hintOpen = !hintOpen; return draw(); }
    if (k === "install-hide") { store.set("ht2-install-hide", true); return draw(); }
    if (k === "how") { howOpen = !howOpen; return draw(); }
    // first run
    if (k === "start") return startFlow();
    if (k === "consent-back") return go(afterConsent === "back" && S ? home() : "today");
    if (k === "consent-yes" || k === "consent-no") {
      const yes = k === "consent-yes"; setSharing(yes);
      const next = afterConsent; afterConsent = null;
      if (next === "start") { if (!band()) return go("band"); draft = newDraft(); return go("setup"); }
      if (next === "push") { go(home()); if (yes) return turnOnPush(); toast(`OK. Nothing is shared from ${here}, so notifications stay off.`); return; }
      toast(yes ? "Thanks for joining." : `OK. Nothing is shared from ${here}.`);
      return go(home());
    }
    if (k === "band-back") return go("today");
    if (k === "band") { store.set("ht2-band", v); if (S) return go(home()); draft = newDraft(); return go("setup"); }
    // setup
    if (k === "cancel-setup") { if (starting) return; draft = null; return go("today"); }
    if (k === "len") { draft.planned = +v; return draw(); }
    if (k === "sleep-inc" || k === "sleep-dec") { draft.sleepMin = clampN(draft.sleepMin + (k === "sleep-inc" ? 15 : -15), 0, 840); draft.sleepEdit = true; draft.sleepSrc = "typed"; return draw(); }
    if (k === "sleep-edit") { draft.sleepEdit = true; draft.sleepSrc = "typed"; return draw(); }
    if (k === "sleep-skip") { draft.sleepSkip = true; return draw(); }
    if (k === "sleep-unskip") { draft.sleepSkip = false; return draw(); }
    if (k === "begin") { b.disabled = true; b.textContent = "Starting…"; return begin(); }
    if (!S && !["done", "sus", "sus-back", "sus-start", "del-yes", "del-cancel"].includes(k)) return;
    // session
    if (k === "card-open") { cardOpen = true; return go("live"); }
    if (k === "why") { whyOpen = !whyOpen; sev("study_why", whyOpen ? "open" : "close", { study: S.id, arm: S.arm }); return draw(); }
    if (k === "wrong-open") { wrongOpen = true; return draw(); }
    if (k === "wrong-back") { wrongOpen = false; return draw(); }
    if (k === "wrong") return respond("wrong", v);
    if (k === "take") return respond("take");
    if (k === "take-anyway") { respond("keep"); return startBreak(5, "manual"); }
    if (k === "keep") return respond("keep");
    if (k === "snooze") return respond("snooze");
    if (k === "break-ask") { breakAsk = true; endAsk = false; return draw(); }
    if (k === "break-cancel") { breakAsk = false; return draw(); }
    if (k === "break-5" || k === "break-15") return startBreak(k === "break-5" ? 5 : 15, "manual");
    if (k === "plus5") { if (!S.brk) return; S.brk.plus = 5; S.brk.endAt += (5 * MIN) / SPEED; sev("study_break", "plus5", { study: S.id, arm: S.arm }); Push.cancel(["break_over"]).then(() => S && S.brk && Push.schedule([{ kind: "break_over", at: new Date(S.brk.endAt).toISOString(), m: 0 }], false)); save(); toast(`Added 5 minutes. Back by ${clock(S.brk.endAt)}.`); return draw(); }
    if (k === "break-end") return endBreak("user");
    if (k === "end-ask") { endAsk = true; breakAsk = false; return draw(); }
    if (k === "end-no") { endAsk = false; return draw(); }
    if (k === "end-yes") return endSession("user");
    if (k === "end-discard") return endSession("discard");
    if (k === "wake") { setWake(!wakeWanted).then(draw); return; }
    if (k === "stale-stop") return endSession("stale", S.staleAt);
    if (k === "stale-go") { S.seenAt = Date.now(); S.hidAt = 0; save(); if (!tickT) tickT = setInterval(tick, 1000); return go(home()); }
    // check-in
    if (k === "task-skip") { checkin.step = "finished"; save(); return go("checkin"); }
    if (k === "task-run") { const T = task(), el = root.querySelector("#v-task"), mine = checkin; root.querySelector(".col").hidden = true; taskRunning = true;
      return Promise.resolve().then(() => T.run(el)).catch(() => null).then((r) => { taskRunning = false; if (checkin !== mine) return; checkin.task = r ? r : { id: T.id, score: null, skipped: true }; checkin.step = "finished"; save(); go("checkin"); }); }
    if (k === "fin") { checkin.finished = v; checkin.step = "pull"; save(); return go("checkin"); }
    if (k === "pull") { checkin.pull = v; return finishCheckin(); }
    if (k === "sus-start") { susA = []; return go("sus"); }
    if (k === "sus") { if (!susA) return; susA.push(+v); if (susA.length === SUS.length) { store.set("ht2-sus-done", true); sev("study_sus", String(susScore(susA)), { answers: susA, sessions: logList().length }); sflush(); } return go("sus"); }
    if (k === "sus-back") { susA.pop(); return go("sus"); }
    if (k === "done") { checkin = null; susA = null; return go("today"); }
    if (k === "del-cancel") { if (delBusy) return; return go(home()); }
    if (k === "del-yes") return forget();
  }
  function onInput(e) { if (e.target.id === "v-plan" && draft) draft.plan = e.target.value; }

  // ---------- delete my data: the server's rows for this visitor id, then this phone's copy
  async function forget() {
    if (delBusy || DEMO) return; delBusy = true; draw();
    const v = visitor(), wasOn = !!(window.HT && HT.isRecording());
    const call = () => fetch("/api/forget", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: v }) });
    try {
      if (window.HT && HT.forget) HT.forget();
      if (v.length >= 16) { const r = await call(); if (!r.ok) throw new Error(String(r.status)); }
      try { if (Push.sub) await Push.sub.unsubscribe(); } catch {}
      if (v.length >= 16) { await new Promise((res) => setTimeout(res, 1500)); await call().catch(() => {}); }
      clearInterval(tickT); tickT = null; S = null;
      if (window.HalftimeNight) await HalftimeNight.forget().catch(() => {});
      try { Object.keys(localStorage).filter((k) => k.startsWith("ht") && k !== "ht-optout").forEach((k) => localStorage.removeItem(k)); sessionStorage.clear(); } catch {}
      dead = true; const tb = document.getElementById("tabs"); if (tb) tb.hidden = true;
      root.innerHTML = `<h1 class="title">Deleted.</h1><p class="lead">Everything saved for ${here} is gone from the server, and Halftime on ${here} is cleared. Sharing is off.</p><div class="col"><a class="btn big" href="/v2">Start over</a></div>`;
    } catch (e) {
      if (wasOn) { try { localStorage.removeItem("ht-optout"); } catch {} }
      delBusy = false; draw(); const m = root.querySelector("#v-delmsg"); if (m) m.textContent = `The server couldn't delete it just now, so nothing was deleted and nothing changed on ${here}. Please try again later.`;
    }
  }

  // ---------- the synthetic fortnight for ?demo=week (seeded, labelled; never saved or sent)
  function seedDemo() {
    let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    const t = L.dayOf(Date.now()), ns = [], log = [];
    for (let i = 20; i >= 0; i--) {
      const k = L.addDays(t, -i), short = rnd() < 0.3, sleep = Math.round(short ? 330 + rnd() * 40 : 415 + rnd() * 45);
      ns.push({ date: k, sleepMin: sleep, src: "typed" });
      if (i > 0 && rnd() < 0.8) { const [y, m, d] = k.split("-").map(Number), at = new Date(y, m - 1, d, 14 + Math.floor(rnd() * 5), Math.floor(rnd() * 60)).getTime(), planned = [45, 50, 60][Math.floor(rnd() * 3)];
        const kept = Math.round(planned * (short ? 0.72 + rnd() * 0.12 : 0.88 + rnd() * 0.1)), aw = short ? 4 + Math.floor(rnd() * 4) : 1 + Math.floor(rnd() * 3);
        log.unshift({ id: "demo" + i, n: 0, arm: rnd() < 0.5 ? "halftime" : "pomodoro", startAt: at, minutes: kept, planned, plan: "", breaks: 1, awayN: aw, awayMin: aw * 2, cue: null, cues: 1, taken: 1, finished: "mostly", pull: short ? "little" : "none", qa: false }); }
    }
    log.sort((a, b) => b.startAt - a.startAt);
    store.set("ht2-nights", ns); store.set("ht2-log", log); store.set("ht2-consent", { choice: "decline", at: Date.now(), v: CONSENT_V }); store.set("ht2-band", "none");
  }

  // ---------- boot
  function init() {
    root = document.getElementById("v2"); if (!root) return;
    if (DEMO) seedDemo();
    document.addEventListener("click", onClick);
    const up = () => { if (!fingerDown) return; fingerDown = false; if (drawLater) setTimeout(() => { if (!fingerDown && drawLater) draw(); }, 350); }; // after the click that follows has landed
    document.addEventListener("pointerdown", () => { fingerDown = true; setTimeout(up, 1500); }, true); // never stuck: a lost pointerup lets go after 1.5 s
    document.addEventListener("pointerup", up, true); document.addEventListener("pointercancel", up, true);
    root.addEventListener("input", onInput);
    document.getElementById("scrim").addEventListener("click", closeSheet);
    addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet) closeSheet(); });
    S = DEMO ? null : store.get("ht2-session", null);
    if (S && S.speed && S.speed !== SPEED) { Push.cancel(null); S = null; save(); }
    if (S && S.hidAt) { // the app was closed or reloaded mid-session: that time was out of view, unless it was left overnight (the stale screen asks)
      const now = Date.now(), stale = (now - S.seenAt) * SPEED > 45 * MIN && sessMin(now) > S.planned + 90;
      closeAway(stale ? Math.max(S.hidAt, S.seenAt) : now); save(); }
    if (S && S.phase === "checkin") { checkin = S.ck || { step: "finished", task: null, finished: null, pull: null }; S.ck = checkin; view = "checkin"; }
    else if (S) { view = home(); cardOpen = !!(S.cue && S.cue.shownAt && !S.cue.done); }
    const t = Qs.get("tab"); if (!S && t === "week") view = "week";
    booted = true;
    if (S && (view === "live" || view === "break")) { tickT = setInterval(tick, 1000); tick(); }
    pushOpen = false;
    draw();
    screen(view);
    // route A: time out of view during a session (another app, or the screen locked). Breaks don't count.
    document.addEventListener("visibilitychange", () => {
      const now = Date.now();
      if (document.visibilityState === "hidden") { if (S && S.phase === "live" && !S.brk && !S.hidAt) { S.hidAt = now; save(); } else if (S) save(); }
      else {
        if (S) { tick(); if (view !== "stale") closeAway(now); save(); } // left running overnight: the stale screen asks first, and the night isn't "out of view"
        if (wakeWanted && !wake) setWake(true); Push.refresh(); if (tabView()) draw();
      }
    });
    addEventListener("pagehide", () => { if (S) save(); });
    if ("serviceWorker" in navigator) navigator.serviceWorker.addEventListener("message", (e) => { if (e.data && e.data.type === "push_open" && S) { pushOpen = /^(suggest|pomo_break)/.test(e.data.kind || ""); tick(); pushOpen = false; } });
    // a WHOOP sync in this browser (laptop): Today and setup follow it
    addEventListener("halftime:night", () => { if (tabView() || view === "setup") draw(); });
    Push.init();
    if (standalone() && !sget("ht-pwa-seen")) { sset("ht-pwa-seen", "1"); if (window.HT && !DEMO) HT.event("pwa", { value: "standalone_open", extra: { app: "v2" } }); }
  }
  window.V2 = { init, link: () => L.compute({ nights: nights(), sessions: logList() }), view: () => view };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
