/* Halftime: real study sessions (added 2026-11-13). The Now tab's own view, next to the sample day the Demo tab plays.
 *
 *   Start studying → a real timer → one suggestion at the real moment → a break → end → a short check-in.
 *
 * What is real and what is not, said the same way on screen:
 *   real    the timer, the breaks, what you tap, the sleep hours you type, the check-in answers
 *   sample  the watch's sleep number and the calendar (nothing is read from a real watch or calendar yet)
 *
 * The evaluation is built in. Each session is randomly given one of two arms, in pairs so they stay balanced:
 *   halftime   the timing rule below picks one moment and one of: keep going / 5-minute walk / longer break
 *   pomodoro   a fixed timer, 25 minutes on and 5 off, the comparison
 * Then a check-in (a study-task slot, "finished what you planned?", "did a suggestion feel wrong?") and, after
 * three sessions, the 10-question System Usability Scale. Everything is logged through HT.event → /api/collect.
 *
 * The suggestion is made by numeric rules in RULE.decide (no language model anywhere in this file).
 * Test speed: /app?speed=60 runs a session 60× faster; those sessions are marked qa and hidden in /admin by default.
 * Pick the arm for a test with ?arm=halftime or ?arm=pomodoro, and the check-in task with ?task=pvtb.
 */
(() => {
  "use strict";
  const Qs = new URLSearchParams(location.search);
  const PREVIEW_MODE = Qs.get("preview") === "1";
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { if (PREVIEW_MODE) return; try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };
  const sget = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
  const sset = (k, v) => { try { sessionStorage.setItem(k, v); } catch {} };
  const esc = (x) => String(x == null ? "" : x).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MIN = 60000;
  const clampN = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ---------- test speed (QA and live demos only)
  if (Qs.get("speed")) sset("ht-speed", Qs.get("speed"));
  const SPEED = clampN(+(sget("ht-speed") || 1) || 1, 1, 600);
  if (Qs.get("task")) store.set("ht-task", Qs.get("task"));

  // ---------- words
  const clock = (ms) => { const d = new Date(ms); let h = d.getHours(); const m = d.getMinutes(), ap = h >= 12 ? "pm" : "am"; h = h % 12 || 12; return `${h}:${String(m).padStart(2, "0")} ${ap}`; };
  const dur = (min) => { min = Math.max(0, Math.round(min)); return min >= 60 ? `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")} min` : `${min} min`; };
  const sleepText = (h) => { const m = Math.round(h * 60); return `${Math.floor(m / 60)} h${m % 60 ? " " + String(m % 60).padStart(2, "0") + " min" : ""}`; };
  const dayName = (ms) => { const d = new Date(ms), t = new Date(); const days = Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()) - new Date(d.getFullYear(), d.getMonth(), d.getDate())) / 864e5); return days === 0 ? "Today" : days === 1 ? "Yesterday" : d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };

  /* ---------- the timing rule (version 0). Numbers in, one decision out, with the reason for every step.
     Not learned from anyone yet and the same for everyone: a starting rule the team chose, shown as that on the card.
       focus block   50 min
       sleep         under 5 h: 15 min sooner · under 6 h: 10 sooner · 8 h or more: 10 later · unknown: no change
       late night    11 pm to 5 am: 5 min sooner
       the block stays between 25 and 60 min
       what it suggests   a 5-minute walk; a 15-minute break after under 5 h of sleep or late at night (if it fits);
                          "keep going" when the session ends within 10 min of the moment (the end is the break);
                          nothing when the session is under 20 min (too short to judge) */
  const RULE = {
    version: "v0",
    decide({ sleepH, startMs, endMin }) {
      const steps = []; let block = 50;
      steps.push({ k: "base", text: "Focus block to start from", val: "50 min" });
      if (sleepH == null) steps.push({ k: "sleep", text: "Sleep unknown", val: "no change" });
      else if (sleepH < 5) { block -= 15; steps.push({ k: "sleep", text: "Under 5 h of sleep", val: "15 min sooner" }); }
      else if (sleepH < 6) { block -= 10; steps.push({ k: "sleep", text: "Under 6 h of sleep", val: "10 min sooner" }); }
      else if (sleepH >= 8) { block += 10; steps.push({ k: "sleep", text: "8 h of sleep or more", val: "10 min later" }); }
      else steps.push({ k: "sleep", text: "6 to 8 h of sleep", val: "no change" });
      const hr = new Date(startMs + block * MIN).getHours(), late = hr >= 23 || hr < 5;
      if (late) { block -= 5; steps.push({ k: "late", text: "Late night (11 pm to 5 am)", val: "5 min sooner" }); }
      block = clampN(block, 25, 60);
      if (endMin != null && endMin < 20) return { kind: "none", fireMin: null, breakMin: 0, late, steps };
      if (endMin != null && endMin - block < 10) return { kind: "keep", fireMin: Math.max(10, Math.round(endMin - 10)), breakMin: 0, late, steps };
      let kind = (sleepH != null && sleepH < 5) || late ? "break" : "walk";
      if (kind === "break" && endMin != null && endMin - block < 25) kind = "walk"; // a 15-minute break has to fit before the end
      return { kind, fireMin: block, breakMin: kind === "break" ? 15 : 5, late, steps };
    },
  };

  // ---------- the check-in's study task: a slot the team can swap. Which task is open decision #2; PVT-B leads.
  // A task is { id, title, intro, run(el) → Promise<{ score, unit, ... } | null> }. "placeholder" records nothing.
  const TASKS = {
    placeholder: { id: "placeholder", title: "A short task goes here", intro: "The team is still choosing the 3-minute task for this step, so there's nothing to do yet. Your other two answers still count.", run: null },
    pvtb: {
      id: "pvtb", title: "3-minute reaction check", intro: "Numbers will start counting up in the box. Tap the box as soon as you see them. It takes 3 minutes. This is a trial version: the team hasn't picked the final task.",
      run(el) { // PVT-B style: random 1 to 4 s waits for 3 minutes; reaction time in ms; a lapse is 355 ms or slower
        return new Promise((resolve) => {
          const LEN = 180000 / SPEED, t0 = performance.now(), rts = []; let falseStarts = 0, timeouts = 0, shownAt = 0, waitT, raf, over = false;
          el.innerHTML = `<button type="button" class="pvt" id="pvt-box" aria-label="Reaction box. Tap when numbers appear."><span id="pvt-n">Wait…</span></button><p class="sfine" id="pvt-left">3:00 left</p><button type="button" class="slink" data-s="pvt-stop">Stop the task</button>`;
          const box = el.querySelector("#pvt-box"), num = el.querySelector("#pvt-n"), left = el.querySelector("#pvt-left");
          const finish = (stopped) => { if (over) return; over = true; clearTimeout(waitT); cancelAnimationFrame(raf); clearInterval(leftT);
            if (stopped || rts.length < 5) return resolve(null);
            const mean = rts.reduce((a, b) => a + b, 0) / rts.length;
            resolve({ id: "pvtb", score: Math.round(mean), unit: "ms", n: rts.length, lapses: rts.filter((r) => r >= 355).length + timeouts, timeouts, false_starts: falseStarts, speed: Math.round(1e5 / mean) / 100 }); };
          const arm = () => { if (over) return; shownAt = 0; // a pending re-arm after "Stop the task" does nothing num.textContent = ""; box.classList.remove("go"); if (performance.now() - t0 > LEN) return finish(false);
            waitT = setTimeout(() => { shownAt = performance.now(); box.classList.add("go"); const tick = () => { if (!shownAt) return; num.textContent = Math.round(performance.now() - shownAt); raf = requestAnimationFrame(tick); }; tick(); }, 1000 + Math.random() * 3000); };
          box.addEventListener("pointerdown", () => { if (over) return;
            if (!shownAt) { falseStarts++; num.textContent = "Too soon"; clearTimeout(waitT); setTimeout(arm, 800); return; }
            const rt = performance.now() - shownAt; shownAt = 0; cancelAnimationFrame(raf); if (rt >= 100) rts.push(rt); else falseStarts++;
            num.textContent = Math.round(rt) + " ms"; setTimeout(arm, 700); });
          el.querySelector("[data-s=pvt-stop]").addEventListener("click", () => finish(true));
          const leftT = setInterval(() => { const now = performance.now(), s = Math.max(0, Math.round((LEN - (now - t0)) / 1000 * SPEED)); left.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} left`;
            if (shownAt && now - shownAt > 10000) { timeouts++; cancelAnimationFrame(raf); num.textContent = "Missed"; shownAt = 0; setTimeout(arm, 700); } // no tap for 10 s: a missed one, not a reaction time
            if (now - t0 > LEN + 800) finish(false); }, 250); // the 3 minutes are up, whatever is on screen
          arm();
        });
      },
    },
  };
  const task = () => TASKS[store.get("ht-task", "placeholder")] || TASKS.placeholder;

  const SUS = ["I think that I would like to use Halftime frequently.", "I found Halftime unnecessarily complex.", "I thought Halftime was easy to use.",
    "I think that I would need the support of a technical person to be able to use Halftime.", "I found the various functions in Halftime were well integrated.",
    "I thought there was too much inconsistency in Halftime.", "I would imagine that most people would learn to use Halftime very quickly.",
    "I found Halftime very cumbersome to use.", "I felt very confident using Halftime.", "I needed to learn a lot of things before I could get going with Halftime."];
  const susScore = (a) => a.reduce((s, v, i) => s + (i % 2 === 0 ? v - 1 : 5 - v), 0) * 2.5;
  const SUS_AFTER = 3;

  // ---------- state
  let root, S = null, view = "idle", draft = null, tickT = null, cardOpen = false, whyOpen = false, wrongOpen = false, endAsk = false, breakAsk = false, wake = null, wakeWanted = false;
  let checkin = null, susA = null, consentReturn = null, delAsk = false, delBusy = false, hintOpen = false, booted = false;
  let taskRunning = false, starting = false, drawnAt = 0, dead = false;
  // opened by tapping a suggestion's notification: counts once, for the suggestion it was about
  let pushOpen = Qs.get("from") === "push" && /^(suggest|pomo_break)/.test(Qs.get("k") || "");
  // where "back" goes from a side screen (consent, delete): wherever the session really is
  const home = () => (!S ? (draft ? "setup" : "idle") : S.phase === "checkin" ? "checkin" : S.brk ? "break" : "live");
  let lastKey = "";
  const P = () => (typeof PROFILE !== "undefined" ? PROFILE : {});
  const DEMO = () => window.HALFTIME_DEMO;
  const role = () => (P().role === "athlete" ? "athlete" : "student");
  const device = () => { try { return typeof dev === "function" ? dev() : null; } catch { return null; } };
  const firstName = () => String(P().name || "").split(" ")[0] || "there";
  const logList = () => store.get("ht-study-log", []);
  const consent = () => store.get("ht-consent-study", null); // { choice: "agree" | "decline", at, v }
  const joined = () => (consent() || {}).choice === "agree";
  const toast = (m) => window.APP && APP.toast(m);
  // a laptop or desktop (any computer browser) vs a phone or tablet: decides the words and the laptop extras
  const COMPUTER = !/iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent) && !(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const here = COMPUTER ? "this computer" : "this phone";
  // the wide layout (two columns, top bar): any window 1024 px or wider, phone or not
  const WIDE = matchMedia("(min-width: 1024px)");
  const kbd = (k) => (COMPUTER ? `<kbd>${k}</kbd>` : "");

  // analytics: study events go only after "Agree and join"; with analytics off nothing leaves the phone at all
  function sev(type, value, extra) {
    if (PREVIEW_MODE || !window.HT || !joined()) return;
    HT.event(type, { value, extra: { ...extra, ...(SPEED !== 1 ? { qa: true } : {}) } });
  }
  const sflush = () => { if (window.HT && HT.flush) HT.flush(); };
  const screen = (name) => { if (window.HT && !PREVIEW_MODE) HT.screen(name); };
  const save = () => { if (S) store.set("ht-study", S); else store.del("ht-study"); };

  // session time: real milliseconds × SPEED
  const sessMin = (at = Date.now()) => ((at - S.startAt) * SPEED) / MIN;
  const realAt = (min) => S.startAt + (min * MIN) / SPEED;
  const breakMs = (at = Date.now()) => (S.breaks || []).reduce((a, b) => a + (Math.min(b.endAt || at, at) - b.startAt), 0);
  const studyMin = (at = Date.now()) => Math.max(0, ((at - S.startAt - breakMs(at)) * SPEED) / MIN);

  // ---------- the sample calendar, placed on today's real clock
  function parseClock(t) { const m = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(String(t).trim()); if (!m) return null; let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12; const d = new Date(); d.setHours(h, +m[2], 0, 0); return d.getTime(); }
  function sampleNext() {
    if (P().cal === false || !DEMO()) return null;
    const now = Date.now();
    for (const e of DEMO().calendar(role())) {
      const at = parseClock(e.t); if (!at || at < now + 15 * MIN || /^Study block/.test(e.what)) continue;
      return { label: e.stop && P().next && P().next !== e.stop ? String(P().next).slice(0, 30) : e.what, at, src: "sample_calendar" };
    }
    return null;
  }
  const calName = () => (DEMO() && DEMO().PROVIDERS[P().calProvider]) || "Google Calendar";

  // ---------- arms: random within each pair of sessions, so every person gets both, in a random order
  function nextArm() {
    const forced = Qs.get("arm"); if (forced === "halftime" || forced === "pomodoro") return forced;
    const arms = store.get("ht-arms", []), n = store.get("ht-study-n", 0);
    if (arms.length <= n) { const pair = Math.random() < 0.5 ? ["halftime", "pomodoro"] : ["pomodoro", "halftime"]; while (arms.length <= n) arms.push(...pair); store.set("ht-arms", arms); }
    return arms[n];
  }

  // ---------- delivery: Home Screen app + Web Push, with a fallback when either is missing
  const standalone = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const Push = {
    cfg: null, reg: null, sub: null, state: "checking", // on | ask | denied | install | unsupported | server_off
    async init() {
      if (PREVIEW_MODE) { this.state = "unsupported"; return; }
      try { if ("serviceWorker" in navigator) this.reg = await navigator.serviceWorker.register("/sw.js"); } catch {}
      try { this.cfg = await (await fetch("/api/push?op=config")).json(); } catch { this.cfg = { configured: false }; }
      await this.refresh();
    },
    async refresh() {
      const before = this.state;
      if (!this.reg || !("PushManager" in window) || !("Notification" in window)) this.state = isIOS() && !standalone() ? "install" : "unsupported";
      else if (!this.cfg || !this.cfg.configured) this.state = "server_off";
      else if (consent() && !joined()) this.state = "not_shared"; // the server would have to keep this phone's push address
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
        const reg = await Promise.race([navigator.serviceWorker.ready, new Promise((res) => setTimeout(() => res(this.reg), 4000))]); // subscribing needs an active worker
        this.sub = (await reg.pushManager.getSubscription()) || (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key }));
        const r = await fetch("/api/push?op=subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor(), sub: this.sub.toJSON() }) });
        if (!r.ok) throw new Error("save " + r.status);
        store.set("ht-push-saved", this.sub.endpoint);
        await this.refresh(); return this.state === "on";
      } catch (e) {
        // the phone said yes but the subscription failed: say so, and record why (no personal data, just the error)
        this.lastError = `${(e && e.name) || "Error"}: ${String((e && e.message) || e).slice(0, 120)}`;
        sev("push_status", "error", { error: this.lastError, standalone: standalone(), perm: "Notification" in window ? Notification.permission : "" });
        await this.refresh(); return false;
      }
    },
    async post(op, body) {
      if (this.state !== "on" || !joined()) return null;
      try { const r = await fetch("/api/push?op=" + op, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor(), ...body }), keepalive: true }); return r.ok ? await r.json() : null; } catch { return null; }
    },
    schedule(jobs, replace = true) { return this.post("schedule", { study: S.id, jobs, replace }); },
    cancel(kinds) { return this.post("cancel", { study: S ? S.id : "", kinds: kinds || null }); },
    // a notification shown on this device right now, without the server: checks the last step (the system showing it)
    async test() {
      try {
        const reg = this.reg || (await navigator.serviceWorker.ready);
        await reg.showNotification("Halftime test", { body: `Notifications work on ${here}.`, tag: "halftime-test", icon: "/icon-192.png", data: { url: "/app", kind: "test" } });
        sev("push_status", "test", { standalone: standalone() });
        toast(COMPUTER ? "Sent. Nothing appeared? Allow notifications for your browser in your computer's settings (Mac: System Settings → Notifications → your browser), and turn off Focus." : "Sent. Nothing appeared? Check Settings → Notifications → Halftime, and Focus.");
      } catch { toast(`${here.charAt(0).toUpperCase() + here.slice(1)} couldn't show a test notification.`); }
    },
    async off() { try { if (this.sub) await this.sub.unsubscribe(); } catch {} try { await fetch("/api/push?op=unsubscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor() }) }); } catch {} store.del("ht-push-saved"); this.sub = null; await this.refresh(); },
  };
  const visitor = () => { try { return localStorage.getItem("ht-visitor") || ""; } catch { return ""; } };
  const deliveryLine = () => ({
    on: COMPUTER ? "You'll get it as a notification from your browser, even with this tab in the background." : "You'll get it as a notification, even with the phone locked.",
    ask: COMPUTER ? "Turn on notifications to get it even with this tab in the background." : "Turn on notifications to get it on a locked phone.",
    denied: COMPUTER ? "Notifications are blocked for this site in your browser (allow them from the icon left of the address), so it shows here while this tab is open." : "Notifications are off for Halftime in Settings, so it will show when you open the app.",
    install: "To get it on a locked phone, add Halftime to your Home Screen first.",
    unsupported: "This browser can't send notifications, so it will show when you open the app.",
    not_shared: `You're not sharing data, and a notification needs the server to keep a push address for ${here}. So it will show when you open the app.`,
    server_off: "Notifications aren't switched on for this prototype yet, so it will show when you open the app.",
    checking: "Checking notifications…",
  }[Push.state]);

  // "Turn on notifications": the browser's question, then one clear line on what happened
  function pushMsg(ok) {
    if (ok) return "Notifications on.";
    if (Push.state === "denied") return COMPUTER ? "Notifications are blocked for this site in your browser. Allow them from the icon left of the address." : "Notifications are blocked for Halftime in Settings.";
    if (Push.lastError) return `Notifications couldn't be set up on ${here} (${Push.lastError}). The suggestion will show when you open the app.`;
    return COMPUTER ? "Notifications aren't on yet. If your browser didn't ask, click the icon left of the address (or the crossed-out bell) and allow notifications, then try again." : "Notifications weren't turned on.";
  }
  const turnOnPush = () => Push.enable().then((ok) => { toast(pushMsg(ok)); draw(); if (window.APP) APP.drawYou(); });
  async function setWake(on) {
    wakeWanted = on;
    try { if (on && "wakeLock" in navigator && !wake) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => { wake = null; }); } else if (!on && wake) { await wake.release(); wake = null; } } catch { wake = null; }
  }

  // ---------- start
  // the sample watch's night, as the Home screen words it ("5 h 10 min"), in hours
  const sampleSleep = () => { const m = /(\d+)\s*h\s*(\d+)?/.exec(DEMO() ? DEMO().today(role()).lastNight.sleep : "5 h 10"); return m ? +m[1] + (+m[2] || 0) / 60 : 5.2; };
  // A real watch (added by the connections session, 2026-11-13). When this computer has a Fitbit connected through
  // Google Health, /api/health answers and halftime-data.js turns it into "last night's sleep". Everywhere else,
  // including the public site, LIVEW stays null and the sample or typed sleep is used exactly as before.
  //   fresh      synced today: use its number, and say it came from the watch (sleepMode "wearable_live")
  //   not fresh  connected but not synced: offer no number; the person types their sleep or leaves it out
  // The reading drives the timing rule on this device only. It is never put in the log (see study_start below).
  let LIVEW = null;
  const fitbitWatch = () => { const D = device(); return LIVEW && LIVEW.mode === "live" && D && D.short === "Fitbit" ? LIVEW : null; };
  // A WHOOP 4.0 read over Bluetooth on this computer (the Night tab, assets/night-tab.js, added 2026-11-14). Its night
  // wins when it has last night; otherwise a live Fitbit, if any; otherwise it says how to sync. Never logged either.
  const whoopNight = () => { try { return window.HalftimeNight && !PREVIEW_MODE ? HalftimeNight.forStudy() : null; } catch { return null; } };
  const liveWatch = () => { const w = whoopNight(), f = fitbitWatch(); return w && (w.fresh || !f) ? w : f; };
  const applyWatch = (d) => {
    const W = liveWatch(); if (!W) return d;
    if (W.fresh && W.sleepH != null) { d.sleepMode = "wearable_live"; d.sleepH = W.sleepMin / 60; }
    else { d.sleepMode = "self"; d.sleepH = store.get("ht-last-setup", {}).sleepSelf || 7; }
    return d;
  };
  if (window.HalftimeData && HalftimeData.watchNow && !PREVIEW_MODE) HalftimeData.watchNow().then((w) => {
    LIVEW = w; if (!liveWatch()) return;
    if (view === "setup" && draft && draft.sleepMode === "wearable" && !draft.sleepSkip) applyWatch(draft); // still on the sample number: swap it
    if (view === "setup" || view === "idle") draw();
    const hist = document.getElementById("h-real"); if (hist && hist.innerHTML) drawHistory(hist); // History already open: add the real nights
  }).catch(() => {});
  // a WHOOP sync, a confirmed or changed night, or a wipe on the Night tab: the setup's sleep follows it
  if (typeof addEventListener === "function") addEventListener("halftime:night", () => {
    if (view === "setup" && draft && !draft.sleepSkip) { if (liveWatch()) applyWatch(draft); else if (draft.sleepMode === "wearable_live") { draft.sleepMode = "self"; draft.sleepH = store.get("ht-last-setup", {}).sleepSelf || 7; } }
    if (view === "setup" || view === "idle") draw();
  });
  // A suggestion that comes up while this tab is in the background and no push is on: the page shows the system
  // notification itself (the browser allows it while the tab is open). With push on, the server's push does it.
  function localNotice(title, body) {
    try {
      if (!title || !document.hidden || Push.state === "on" || !("Notification" in window) || Notification.permission !== "granted" || !joined()) return;
      if (Push.reg && Push.reg.showNotification) Push.reg.showNotification(title, { body, tag: "halftime-local", icon: "/icon-192.png", data: { url: "/app", kind: "local" } });
      else new Notification(title, { body, tag: "halftime-local", icon: "/icon-192.png" });
    } catch {}
  }

  // ---------- a mini timer that stays on top of other windows (Document Picture-in-Picture: Chrome and Edge on a computer)
  let mini = null, fromKey = false; // fromKey: a keyboard shortcut, which the double-tap guard leaves alone
  const miniOK = () => COMPUTER && "documentPictureInPicture" in window;
  async function openMini() {
    if (!miniOK()) return;
    if (mini) { mini.close(); mini = null; draw(); return; }
    try {
      mini = await documentPictureInPicture.requestWindow({ width: 300, height: 190 });
      const d = mini.document;
      d.head.innerHTML = `<meta charset="utf-8"><title>Halftime</title><style>
        *{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}
        body{background:#000;color:#fff;font:400 14px/1.35 system-ui,-apple-system,sans-serif;padding:14px 16px;display:flex;flex-direction:column;gap:8px;font-variant-numeric:tabular-nums}
        .st{display:flex;justify-content:space-between;gap:8px;font:500 11px/1.2 ui-monospace,Menlo,monospace;color:rgba(255,255,255,.6)}
        .st span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .ck{font:300 44px/1 system-ui,-apple-system,sans-serif;letter-spacing:-.04em}.ck.br{color:#8ED6BC}
        .q{font:600 20px/1.15 system-ui,-apple-system,sans-serif;letter-spacing:-.02em}
        .row{display:flex;gap:8px;margin-top:auto}button{flex:1;min-height:36px;border:0;border-radius:18px;font:600 13px/1 system-ui,-apple-system,sans-serif;cursor:pointer}
        .y{background:#fff;color:#000}.n{background:#2C2C2E;color:#fff}.dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:#8ED6BC;margin-right:6px}
        button:focus-visible{outline:2px solid #8ED6BC;outline-offset:2px}</style>`;
      d.body.addEventListener("click", (e) => { const b = e.target.closest("[data-m]"); if (!b) return; const k = b.dataset.m;
        if (k === "open") { window.focus(); if (S && S.cue && S.cue.shownAt && !S.cue.done) { whyOpen = true; draw(); } return; }
        if (k === "take" || k === "keep") respond(k); else if (k === "break-end") endBreak("user");
        sev("study_mini", "tap", { action: k, ...(S ? { study: S.id, arm: S.arm } : {}) }); paintMini(); });
      mini.addEventListener("pagehide", () => { mini = null; if (booted) draw(); });
      sev("study_mini", "open", S ? { study: S.id, arm: S.arm } : {});
      paintMini(); draw();
    } catch (e) { mini = null; toast("This browser couldn't open the mini timer."); }
  }
  function paintMini() {
    if (!mini) return; const b = mini.document && mini.document.body; if (!b) return;
    let html;
    if (!S || S.phase === "checkin") html = `<div class="st"><span><i class="dot"></i>Halftime</span><span></span></div><p class="q">${S ? "Session over. Check in on the page." : "No session running."}</p><div class="row"><button class="n" data-m="open">Open Halftime</button></div>`;
    else if (S.brk) { const left = Math.max(0, Math.round(((S.brk.endAt - Date.now()) * SPEED) / 1000));
      html = `<div class="st"><span>On a break</span><span>back by ${clock(S.brk.endAt)}</span></div><p class="ck br">${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}</p><div class="row"><button class="y" data-m="break-end">End break</button></div>`; }
    else if (S.cue && S.cue.shownAt && !S.cue.done) { const k = S.cue.kind;
      html = `<div class="st"><span><i class="dot"></i>${k === "pomo" ? "Fixed timer" : "Halftime"}</span><span>${dur(sessMin())} in</span></div><p class="q">${cueHead(S.cue)}</p>
        <div class="row">${k === "keep" ? `<button class="y" data-m="keep">OK</button>` : `<button class="y" data-m="take">${k === "walk" ? "Start walk" : "Start break"}</button><button class="n" data-m="keep">${k === "pomo" ? "Skip it" : "Keep going"}</button>`}<button class="n" data-m="open">Why?</button></div>`; }
    else { const secs = Math.floor(studyMin() * 60);
      html = `<div class="st"><span><i class="dot"></i>${S.arm === "pomodoro" ? "Fixed timer" : "Halftime"}</span><span>${esc(S.plan || "studying")}</span></div><p class="ck">${Math.floor(secs / 3600)}:${String(Math.floor((secs % 3600) / 60)).padStart(2, "0")}<span style="font-size:20px;color:rgba(255,255,255,.5)">:${String(secs % 60).padStart(2, "0")}</span></p><div class="row"><button class="n" data-m="open">Open Halftime</button></div>`; }
    if (b.__last !== html) { b.innerHTML = html; b.__last = html; }
  }

  // ---------- keys on a computer (never while typing, never with a modifier, only on the Now tab)
  function onKey(e) {
    if (!COMPUTER || e.metaKey || e.ctrlKey || e.altKey || dead || taskRunning || e.repeat) return;
    if (window.APP && APP.isReal && !APP.isReal()) return;
    const t = e.target; if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) { if (!(e.key === "Enter" && view === "setup" && t.type !== "time")) return; }
    if (t && t.closest && t.closest("button,a") && e.key === "Enter") return; // Enter on a focused button presses that button
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key, has = (s) => root.querySelector(`[data-s="${s}"]`);
    const press = (s) => { const b = has(s); if (!b) return false; e.preventDefault(); fromKey = true; try { b.click(); } finally { fromKey = false; } return true; };
    if (k === "Escape") { press("wrong-back") || press("break-cancel") || press("end-no") || press("cancel-setup") || press("consent-back") || press("del-cancel"); return; }
    if (view === "idle" && (k === "n" || k === "Enter")) return void press("start");
    if (view === "setup" && k === "Enter") return void press("begin");
    if (view === "live") {
      if (k === "Enter") return void (press("take") || press("keep") || press("end-yes"));
      if (k === "k") return void press("keep");
      if (k === "s") return void press("snooze");
      if (k === "w") return void press("why");
      if (k === "b") return void (press("break-5") || press("break-ask"));
      if (k === "e") return void press("end-ask");
      if (k === "5") return void press("break-5");
      if (k === "1") return void press("break-15");
      if (k === "t") { e.preventDefault(); openMini(); return; }
    }
    if (view === "break") { if (k === "Enter" || k === "e") return void press("break-end"); if (k === "+" || k === "=") return void press("plus5"); if (k === "t") { e.preventDefault(); openMini(); } }
    // the check-in, the end screen and the survey: Enter for the main button, 1 to 5 for the nth answer
    const nth = (sel) => { const b = /^[1-5]$/.test(k) && root.querySelectorAll(sel)[+k - 1]; if (!b) return false; e.preventDefault(); fromKey = true; try { b.click(); } finally { fromKey = false; } return true; };
    if (view === "checkin") { if (k === "Enter") return void (press("task-run") || press("task-skip")); return void nth(".sbtn.pick"); }
    if (view === "done" && k === "Enter") return void (press("sus-start") || press("done"));
    if (view === "sus") { if (k === "Enter" && susA && susA.length >= SUS.length) return void press("done"); return void nth("[data-s=sus]"); }
  }

  function newDraft() {
    const D = device(), last = store.get("ht-last-setup", {});
    return applyWatch({
      plan: "", planned: last.planned || 60,
      sleepMode: D ? "wearable" : "self", sleepH: D ? sampleSleep() : (last.sleepSelf || 7), sleepSkip: false,
      nextMode: sampleNext() ? "cal" : "none", nextLabel: P().cal === false && P().next ? String(P().next).slice(0, 30) : "", nextTime: "",
    });
  }
  function draftNext() {
    if (draft.nextMode === "cal") return sampleNext();
    if (draft.nextMode === "typed" && draft.nextTime) { const [h, m] = draft.nextTime.split(":").map(Number); const d = new Date(); d.setHours(h, m, 0, 0); let at = d.getTime(); if (at < Date.now()) at += 864e5; return { label: draft.nextLabel.trim() || "Next stop", at, src: "typed" }; }
    return null;
  }
  async function begin() {
    if (starting) return; starting = true;
    try { await begin2(); } finally { starting = false; }
  }
  async function begin2() {
    // the Start tap is the permission tap; the clock starts after the answer, or after 15 s if the browser's prompt is
    // never answered (Chrome's quiet prompt can sit unseen); notifications then switch on later if the person allows them
    if (Push.state === "ask") await Promise.race([Push.enable(), new Promise((res) => setTimeout(res, 15000))]);
    if (!draft) return;
    const now = Date.now(), nx = draftNext(), n = store.get("ht-study-n", 0) + 1, arm = nextArm();
    const D = device(), sleepH = draft.sleepSkip ? null : draft.sleepH;
    const sleepSrc = draft.sleepSkip ? "none" : draft.sleepMode === "wearable_live" && liveWatch() ? "wearable" : draft.sleepMode === "wearable" ? "wearable_sample" : "self";
    const nextMin = nx ? ((nx.at - now) * SPEED) / MIN : null;
    const endMin = nextMin != null ? Math.min(draft.planned, nextMin) : draft.planned;
    S = { id: (crypto.randomUUID ? crypto.randomUUID() : now.toString(36) + Math.random().toString(36).slice(2)), arm, n, startAt: now, planned: draft.planned, plan: draft.plan.trim().slice(0, 60),
      sleepH, sleepSrc, sleepDev: sleepSrc === "wearable" ? liveWatch().device : D && sleepSrc === "wearable_sample" ? D.name : "", next: nx, endMin, speed: SPEED, breaks: [], cues: 0, taken: 0, seenAt: now, phase: "live" };
    if (arm === "halftime") {
      const d = RULE.decide({ sleepH, startMs: now, endMin });
      S.rule = d; S.cue = d.kind === "none" ? null : { kind: d.kind, breakMin: d.breakMin, at: realAt(d.fireMin), min: d.fireMin, block: d.fireMin, snoozes: 0 };
    } else S.pomo = { cycle: -1 };
    store.set("ht-study-n", n);
    store.set("ht-last-setup", { planned: draft.planned, sleepSelf: draft.sleepMode === "self" && !draft.sleepSkip ? draft.sleepH : store.get("ht-last-setup", {}).sleepSelf });
    save(); draft = null;
    const jobs = [];
    if (S.cue) jobs.push({ kind: "suggest_" + S.cue.kind, at: new Date(S.cue.at).toISOString(), m: Math.round(S.cue.min) });
    if (arm === "pomodoro") for (let c = 0; c * 30 + 25 <= Math.min(endMin + 30, 360) && jobs.length < 23; c++) {
      jobs.push({ kind: "pomo_break", at: new Date(realAt(c * 30 + 25)).toISOString(), m: c * 30 + 25 }, { kind: "pomo_work", at: new Date(realAt(c * 30 + 30)).toISOString(), m: c * 30 + 30 });
    }
    sev("study_start", arm, { study: S.id, arm, n, planned: S.planned, sleep_h: sleepSrc === "wearable" ? null : sleepH, sleep_src: sleepSrc, ...(sleepSrc === "wearable" ? { sleep_watch: liveWatch().source === "whoop4" ? "whoop4" : "fitbit" } : {}), next_min: nextMin == null ? null : Math.round(nextMin), next_src: nx ? nx.src : "none",
      fire_min: S.cue ? Math.round(S.cue.min) : null, kind: S.cue ? S.cue.kind : arm === "pomodoro" ? "pomo" : "none", rule: RULE.version, push: Push.state, standalone: standalone(), plan_len: S.plan.length, computer: COMPUTER, wide: WIDE.matches });
    sflush();
    if (jobs.length) Push.schedule(jobs).then((r) => { if (S && r) { S.pushed = r.scheduled > 0; save(); } });
    go("live");
  }

  // ---------- the tick: once a second while a session is on screen, and at once when the app comes back
  function tick() {
    if (!S || S.phase === "checkin" || view === "stale" || view === "consent" || view === "delete") return;
    const now = Date.now();
    // left running? (the app was closed for hours past the plan)
    if ((now - S.seenAt) * SPEED > 45 * MIN && sessMin(now) > S.planned + 90) { S.staleAt = S.seenAt; save(); view = "stale"; clearInterval(tickT); tickT = null; return draw(); }
    S.seenAt = now;
    if (S.brk && now >= S.brk.endAt) endBreak("time");
    if (S.arm === "halftime" && S.cue && !S.cue.done && !S.brk && now >= S.cue.at && !S.cue.shownAt) showCue(now);
    if (S.arm === "pomodoro") pomoTick(now);
    if (view === "live" || view === "break") paintClock();
    if (Math.floor(now / 1000) % 10 === 0) save();
  }
  function via(now, at) {
    if (pushOpen) { pushOpen = false; return "push"; }
    return (now - at) * SPEED < 20000 && document.visibilityState === "visible" ? "app" : "return";
  }
  function showCue(now) {
    const c = S.cue; c.shownAt = now; c.via = via(now, c.at); S.cues++;
    if (c.kind !== "keep" && S.endMin - sessMin(now) < c.breakMin + 1) { c.kind = "keep"; c.breakMin = 0; } // late (snoozed, or the app was closed) and the break no longer fits: the end is the break now
    if (c.via === "app") Push.cancel(["suggest_walk", "suggest_break", "suggest_keep"]); // on screen already: no need to buzz the phone too
    sev("study_suggest", c.kind, { study: S.id, arm: S.arm, min: Math.round(sessMin(c.at)), late_s: Math.round(((now - c.at) * SPEED) / 1000), via: c.via, snoozes: c.snoozes });
    localNotice(cueHead(c), "Open Halftime to see why.");
    sflush(); save(); cardOpen = true; whyOpen = false; wrongOpen = false; go("live", true);
  }
  function pomoTick(now) {
    const t = sessMin(now), cyc = Math.floor(t / 30), inBreak = t % 30 >= 25, c = S.cue;
    if (c && !c.done && (cyc > c.cycle || !inBreak) && !S.brk) { respond("missed"); }
    const passed = cyc - 1; // the last break window that is fully over (window c runs from c*30+25 to c*30+30)
    if (S.pomo.cycle < passed) { const n = Math.min(12, passed - S.pomo.cycle); S.missed = (S.missed || 0) + n; S.pomo.cycle = passed;
      sev("study_response", "missed", { study: S.id, arm: S.arm, kind: "pomo", min: Math.round(t), detail: "closed", n }); save(); }
    if (inBreak && S.pomo.cycle < cyc && !S.brk) {
      S.pomo.cycle = cyc; const at = realAt(cyc * 30 + 25);
      S.cue = { kind: "pomo", breakMin: 5, at, min: cyc * 30 + 25, cycle: cyc, shownAt: now, via: via(now, at) }; S.cues++;
      localNotice("25 minutes done", "Take 5. Fixed-timer session.");
      sev("study_suggest", "pomo", { study: S.id, arm: S.arm, min: cyc * 30 + 25, late_s: Math.round(((now - at) * SPEED) / 1000), via: S.cue.via, cycle: cyc });
      sflush(); save(); cardOpen = true; whyOpen = false; wrongOpen = false; go("live", true);
    }
  }
  function respond(kind, detail) {
    const c = S.cue; if (!c || c.done) return;
    const now = Date.now();
    sev("study_response", kind, { study: S.id, arm: S.arm, kind: c.kind, min: Math.round(sessMin(now)), rt_s: Math.round((now - c.shownAt) / 1000), ...(detail ? { detail } : {}) });
    if (kind === "snooze") { c.snoozes++; c.at = now + (10 * MIN) / SPEED; c.shownAt = 0; Push.schedule([{ kind: "suggest_" + c.kind, at: new Date(c.at).toISOString(), m: Math.round(sessMin(c.at)) }]); toast(`Snoozed. I'll stay quiet until ${clock(c.at)}.`); }
    else { c.done = true; c.response = kind; }
    if (kind === "take") { S.taken++; startBreak(c.kind === "pomo" ? Math.max(1, 5 - ((sessMin(now) - c.min))) : c.breakMin, c.kind === "pomo" ? "pomo" : "suggest"); }
    if (kind === "keep" && c.kind !== "keep") toast(S.arm === "pomodoro" ? "Skipped. Next break in about 25 minutes." : "OK, keep going. I won't bring it up again this session.");
    if (kind === "wrong") toast("Thanks. That's noted, and this suggestion is closed.");
    cardOpen = false; wrongOpen = false; whyOpen = false; save(); sflush();
    if (kind !== "take") go("live");
  }
  function startBreak(min, from) {
    const now = Date.now(), c = S.cue;
    if (from === "manual" && c && !c.done && c.shownAt) { // the card was open and they took a break their own way
      sev("study_response", "take", { study: S.id, arm: S.arm, kind: c.kind, min: Math.round(sessMin(now)), rt_s: Math.round((now - c.shownAt) / 1000), detail: "manual" });
      c.done = true; c.response = "take"; S.taken++;
    } else if (from === "manual" && S.arm === "halftime" && c && !c.done) Push.cancel(["suggest_walk", "suggest_break", "suggest_keep"]); // not mid-break; re-queued when the break ends
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
    // a break taken before the suggestion: the focus block starts again from the end of the break
    if (S.arm === "halftime" && c && !c.done && !c.shownAt && c.kind !== "keep") {
      const at = endedAt + ((c.block || c.min) * MIN) / SPEED;
      if (sessMin(at) > S.endMin - 10) { c.done = true; c.response = "not_needed"; }
      else { c.at = at; c.min = sessMin(at); Push.schedule([{ kind: "suggest_" + c.kind, at: new Date(at).toISOString(), m: Math.round(c.min) }], false); }
    }
    save();
    toast(how === "time" ? "Break's over. Back to it when you're ready." : "Welcome back.");
    if (view === "break") go("live");
  }
  function endSession(how, at) {
    const now = at || Date.now();
    if (S.brk) { const b = S.breaks[S.breaks.length - 1]; if (b && !b.endAt) b.endAt = now; S.brk = null; }
    if (S.cue && !S.cue.done && S.cue.shownAt) { S.cue.done = true; S.cue.response = "ended"; }
    S.endAt = now; S.phase = "checkin";
    const minutes = Math.round(studyMin(now)), bmin = Math.round((breakMs(now) * SPEED) / MIN);
    S.minutes = minutes; S.breakMin = bmin;
    Push.cancel(null); setWake(false);
    if (how === "discard") {
      sev("study_end", S.arm, { study: S.id, arm: S.arm, minutes, break_min: bmin, planned: S.planned, ended: "discard" }); sflush();
      store.set("ht-study-n", Math.max(0, store.get("ht-study-n", 1) - 1)); // the arm goes back in the pair
      S = null; save(); endAsk = false; toast("Session discarded."); return go("idle");
    }
    sev("study_end", S.arm, { study: S.id, arm: S.arm, minutes, break_min: bmin, planned: S.planned, breaks: S.breaks.length, suggested: S.cues, taken: S.taken, ended: how });
    sflush(); save(); endAsk = false;
    checkin = { step: task().run ? "task" : "finished", task: null, finished: null, wrong: null }; S.ck = checkin; save(); go("checkin");
  }
  function finishCheckin() {
    sev("study_checkin", S.arm, { study: S.id, arm: S.arm, task: checkin.task || { id: task().id, score: null }, finished: checkin.finished, wrong: checkin.wrong });
    sflush();
    const log = logList(); log.unshift({ id: S.id, arm: S.arm, startAt: S.startAt, minutes: S.minutes, breaks: S.breaks.length, planned: S.planned, plan: S.plan, cue: S.cue ? { kind: S.cue.kind, response: S.cue.response || (S.cue.shownAt ? "seen" : "none"), min: Math.round(S.cue.min) } : null, cues: S.cues, taken: S.taken, finished: checkin.finished, qa: SPEED !== 1 });
    store.set("ht-study-log", log.slice(0, 60));
    const done = S; S = null; save(); checkin.done = done;
    go("done");
  }

  // ---------- drawing
  const btn = (label, s, cls = "") => `<button type="button" class="sbtn ${cls}" data-s="${s}">${label}</button>`;
  const chipBtn = (label, s, on, v) => `<button type="button" class="schip" data-s="${s}" data-v="${esc(v)}" aria-pressed="${on}">${label}</button>`;
  const numChip = (k, label) => `<span class="chip" aria-label="Source ${k}: ${esc(label)}">${k}</span>`;

  function deliveryCard(quiet) {
    const st = Push.state;
    // on the start screen (quiet pass, 2026-11-14): a card only when it needs you; "on" is a line, nothing-to-do is nothing
    if (quiet && (st === "server_off" || st === "unsupported" || st === "not_shared" || st === "checking")) return "";
    if (quiet && st === "on") return `<p class="sfine sline2">Notifications are on. <button type="button" class="slink" data-s="push-test">Send a test</button></p>`;
    if (st === "on") return `<section class="hc snote"><h2>Notifications are on</h2><p class="sfine">Your suggestion arrives once, ${COMPUTER ? "even with this tab in the background" : "even with the phone locked"}.</p>${btn("Send a test notification", "push-test", "ghost sm")}</section>`;
    if (st === "install") return `<section class="hc snote" id="s-install" data-attn="study-install"><h2>Get it on your lock screen</h2><p class="sfine">On an iPhone, a notification can only come from the Home Screen app (iOS 16.4 or later). In Safari, your suggestion shows when you open this page.</p>
      ${hintOpen ? `<ol class="steps"><li>In Safari, tap <b>•••</b> or the <b>Share</b> button, then <b>Share</b>.</li><li>Choose <b>Add to Home Screen</b> (it may be under <b>View More</b>), then <b>Add</b>.</li><li>Open <b>Halftime</b> from your Home Screen and set it up there. It takes about a minute.</li></ol><p class="sfine">The Home Screen app starts fresh: what you did here in Safari stays in Safari.</p>${btn("Hide the steps", "hint", "ghost sm")}` : btn("Show me how", "hint", "ghost sm")}</section>`;
    if (st === "ask") return `<section class="hc snote"><h2>Notifications</h2><p class="sfine">Get your one suggestion ${COMPUTER ? "as a notification, even when this tab is in the background" : "on a locked phone"}. Halftime only sends break suggestions, nothing else.</p>${Push.lastError ? `<p class="sfine qa">Last try didn't work on ${here} (${esc(Push.lastError)}). Until it does, the suggestion shows when you open the app.</p>` : ""}${btn(Push.lastError ? "Try again" : "Turn on notifications", "push-on", "ghost sm")}</section>`;
    if (st === "checking") return "";
    return `<section class="hc snote"><h2>Notifications</h2><p class="sfine">${deliveryLine()}</p></section>`;
  }
  function recentCard(quiet) {
    const log = logList().slice(0, 3);
    if (!log.length && quiet) return "";
    if (!log.length) return `<section class="hc"><h2>Your sessions</h2><p class="sfine" style="margin-top:6px">None yet. The History tab shows a sample week until you have your own.</p></section>`;
    return `<section class="hc"><h2>Your sessions <span class="smp">on ${here}</span></h2><ul class="log">${log.map(sessionRow).join("")}</ul></section>`;
  }
  const armLabel = (a) => (a === "pomodoro" ? "fixed timer" : "Halftime timing");
  const sessionRow = (s) => `<li><span class="when">${esc(dayName(s.startAt))}<br>${esc(clock(s.startAt))}</span><b>${esc(s.plan || "Study session")}</b><span class="what">${dur(s.minutes)} · ${s.breaks} break${s.breaks === 1 ? "" : "s"} · ${esc(armLabel(s.arm))}${s.qa ? " · test speed" : ""}</span></li>`;

  function drawIdle() {
    const n = logList().length;
    return `<div class="cols"><div class="c1 lead1"><p class="hello">Hi ${esc(firstName())}</p>
      <h1>${n ? "Ready for another?" : "Ready to study?"}</h1>
      <p class="slead">Start a session. Halftime speaks up once, when a break would help, and tells you why.</p>
      ${liveWatch() && liveWatch().fresh ? `<p class="sfine sline2">Last night: <b>${sleepText(liveWatch().sleepH)}</b> of sleep, from your ${esc(liveWatch().device)}.${liveWatch().source === "whoop4" ? ` <button type="button" class="slink" data-s="go-night">See last night</button>` : ""}</p>` : ""}
      ${btn(`Start studying${kbd("N")}`, "start", "big")}
      ${SPEED !== 1 ? `<p class="sfine qa">Test speed ×${SPEED}: sessions here are marked as tests.</p>` : ""}
      ${COMPUTER ? `<p class="sfine lapnote">Keep this tab open while you study.${miniOK() ? " Once you start, you can keep a small timer on top of your other windows." : ""}</p>` : ""}</div>
      <div class="c2">${deliveryCard(true)}${recentCard(true)}
      <p class="sfine sline2">A class test: your timer and answers are real${liveWatch() && liveWatch().fresh ? `, and so is last night's sleep from your ${esc(liveWatch().device)}` : ""}. Each session gets Halftime's timing or a fixed 25/5 timer, at random. <button type="button" class="slink" data-s="consent-view">What's collected${joined() ? " (you joined)" : consent() ? " (not sharing)" : ""}</button></p></div></div>
      <p class="smp sfoot">Halftime is a wellness tool, not medical advice.</p>`;
  }

  function drawSetup() {
    const D = device(), d = draft, cal = sampleNext();
    const lens = [[30, "30 min"], [45, "45 min"], [60, "1 h"], [90, "1.5 h"], [120, "2 h"], [180, "3 h"]];
    const sleepBlock = d.sleepSkip
      ? `<p class="sval">Left out</p><p class="sfine">Halftime will go on time alone, and say so.</p>${btn("Add my sleep", "sleep-unskip", "ghost sm")}`
      : d.sleepMode === "wearable_live" && liveWatch()
        ? `<p class="sval">${sleepText(d.sleepH)}</p><p class="sfine"><b>From your ${esc(liveWatch().device)}.</b> Last night${liveWatch().bed ? `, ${esc(liveWatch().bed)} to ${esc(liveWatch().wake)}` : ""}, ${liveWatch().source === "whoop4" ? "read from your WHOOP over Bluetooth" : "read through Google Health"}. It stays on this device.</p><div class="srow">${btn("Type my own", "sleep-self", "ghost sm")}${btn("Leave sleep out", "sleep-skip", "ghost sm")}</div>`
      : d.sleepMode === "wearable"
        ? `<p class="sval">${sleepText(d.sleepH)}</p><p class="sfine"><b>Sample data.</b> This prototype can't read your ${esc(D ? D.name : "watch")} yet, so this is not your real sleep.</p><div class="srow">${btn("Type my real sleep", "sleep-self", "ghost sm")}${btn("Leave sleep out", "sleep-skip", "ghost sm")}</div>`
        : `<div class="stepper"><button type="button" data-s="sleep-dec" aria-label="Half an hour less">−</button><p class="sval" aria-live="polite">${sleepText(d.sleepH)}</p><button type="button" data-s="sleep-inc" aria-label="Half an hour more">+</button></div>
           <p class="sfine">${liveWatch() && !liveWatch().fresh ? (liveWatch().note ? `${esc(liveWatch().note)} Or type your sleep.` : `Your ${esc(liveWatch().device)} hasn't synced since ${esc(liveWatch().lastSync)}, so Halftime can't see last night. Open the Fitbit app to sync, or type your sleep.`) : D ? "Your own number, typed by you." : "No watch is connected, so you tell Halftime."} A rough guess is fine.</p><div class="srow">${liveWatch() ? (liveWatch().fresh ? btn("Use my " + liveWatch().short, "sleep-live", "ghost sm") : "") : D ? btn("Use the sample", "sleep-wear", "ghost sm") : ""}${btn("Leave sleep out", "sleep-skip", "ghost sm")}</div>`;
    const nx = draftNext();
    const nextBlock = `<div class="srow">${cal ? chipBtn("From calendar", "next-mode", d.nextMode === "cal", "cal") : ""}${chipBtn("Type my own", "next-mode", d.nextMode === "typed", "typed")}${chipBtn("Nothing after", "next-mode", d.nextMode === "none", "none")}</div>
      ${d.nextMode === "cal" && cal ? `<p class="sval sm">${esc(cal.label)} · ${clock(cal.at)}</p><p class="sfine"><b>Sample calendar</b> (${esc(calName())}, not your real one). In ${dur((cal.at - Date.now()) / MIN)}.</p>` : ""}
      ${d.nextMode === "typed" ? `<div class="sfields"><label>What<input id="s-nlabel" data-track="next-label" aria-label="Next stop name" maxlength="30" placeholder="e.g. Chem lab" value="${esc(d.nextLabel)}" autocomplete="off" enterkeyhint="done"></label><label>When<input id="s-ntime" data-track="next-time" aria-label="Next stop time" type="time" value="${esc(d.nextTime)}"></label></div><p class="sfine">${nx ? `In ${dur((nx.at - Date.now()) / MIN)}. The name stays on ${here}.` : "Pick a time, so breaks can fit before it."}</p>` : ""}
      ${d.nextMode === "none" ? `<p class="sfine">No next stop. Halftime will plan around the length you picked.</p>` : ""}`;
    return `<header class="sh"><button type="button" class="back" data-s="cancel-setup">‹ Back</button><span class="smp">Session ${store.get("ht-study-n", 0) + 1}</span></header>
      <h1>Set up this session</h1>
      <div class="cols"><div class="c1"><section class="hc" data-attn="setup-plan"><h2><label for="s-plan">What are you working on?</label> <span class="smp">optional</span></h2>
        <input id="s-plan" class="sinput" data-track="plan" aria-label="What are you working on" maxlength="60" placeholder="e.g. Orgo problem set 7" value="${esc(d.plan)}" autocomplete="off" enterkeyhint="done"><p class="sfine">Stays on ${here}. It's only here so you can check it off at the end.</p></section>
      <section class="hc" data-attn="setup-length"><h2>How long do you plan to study?</h2><div class="srow">${lens.map(([m, l]) => chipBtn(l, "len", d.planned === m, m)).join("")}</div></section>
      </div><div class="c2"><section class="hc" data-attn="setup-sleep"><h2>Sleep last night</h2>${sleepBlock}</section>
      <section class="hc" data-attn="setup-next"><h2>Your next stop</h2>${nextBlock}</section></div></div>
      <p class="sfine deliv">${esc(deliveryLine())}</p>
      <p class="sfine sarm">${(() => { const a = nextArm(); return a === "pomodoro" ? "This session uses the <b>fixed 25/5 timer</b>: the comparison. Each session is picked at random." : "This session uses <b>Halftime's timing</b>. Each session is picked at random: this one or a fixed 25/5 timer."; })()}</p>
      <div class="sticky">${btn(`Start the timer${kbd("↵")}`, "begin", "big")}</div>`;
  }

  function lineHtml() {
    const now = Date.now(), endAt = realAt(Math.max(S.endMin, sessMin(now) + 1)), span = endAt - S.startAt, pct = (t) => clampN(((t - S.startAt) / span) * 100, 0, 100);
    const slots = [];
    (S.breaks || []).forEach((b) => slots.push(`<span class="fill on" style="left:${pct(b.startAt)}%;width:${Math.max(1.2, pct(b.endAt || now) - pct(b.startAt))}%"></span>`));
    if (S.arm === "pomodoro") for (let c = 0; c * 30 + 25 < S.endMin; c++) slots.push(`<span class="slot on" style="left:${pct(realAt(c * 30 + 25))}%;width:${Math.max(1.5, pct(realAt(c * 30 + 30)) - pct(realAt(c * 30 + 25)))}%"></span>`);
    if (S.arm === "halftime" && S.cue && S.cue.shownAt && !S.cue.done && S.cue.kind !== "keep") slots.push(`<span class="slot on" style="left:${pct(now)}%;width:${Math.max(2, pct(now + (S.cue.breakMin * MIN) / SPEED) - pct(now))}%"></span>`);
    const overrun = sessMin(now) > S.endMin, stopName = S.next && sessMin(S.next.at) <= S.planned + 0.5 ? S.next.label : "planned end";
    return `<section class="forecast sline" aria-label="Your session as a line, from ${clock(S.startAt)} to ${esc(stopName)}" data-attn="study-line">
      <div class="flabel"><span>This session</span><span>${overrun ? "past your plan" : "up to " + esc(stopName === "planned end" ? "your planned end" : stopName)}</span></div>
      <div class="track"><span class="done" style="width:${pct(now)}%"></span>${slots.join("")}<span class="nowmark" style="left:${pct(now)}%"></span><span class="stop"></span></div>
      <div class="ticks sticks"><span>${clock(S.startAt)}</span><span class="t-now">now ${clock(now)}</span><span>${clock(realAt(S.endMin))}</span></div></section>`;
  }
  function clockHtml() {
    const sm = studyMin(), secs = Math.floor(sm * 60), h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
    return `${h}:${String(m).padStart(2, "0")}<small><span class="secs">:${String(s).padStart(2, "0")}</span> studying</small>`;
  }
  function titleNow() {
    if (!S || !(view === "live" || view === "break")) return "Halftime";
    if (S.cue && S.cue.shownAt && !S.cue.done) return (pastEnd(S.cue) ? "Time to wrap up" : { walk: "Short walk now?", break: "Take a break?", keep: "Keep going.", pomo: "Take 5?" }[S.cue.kind] || "Halftime") + " · Halftime";
    if (S.brk) { const left = Math.max(0, Math.round(((S.brk.endAt - Date.now()) * SPEED) / 1000)); return `Break ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")} · Halftime`; }
    const secs = Math.floor(studyMin() * 60); return `${Math.floor(secs / 3600)}:${String(Math.floor((secs % 3600) / 60)).padStart(2, "0")} studying · Halftime`;
  }
  function paintClock() {
    if (!window.APP || !APP.isReal || APP.isReal() || S) document.title = titleNow(); paintMini();
    const c = root.querySelector("#s-clock"); if (c) c.innerHTML = clockHtml();
    const b = root.querySelector("#s-bleft"); if (b && S.brk) { const left = Math.max(0, Math.round(((S.brk.endAt - Date.now()) * SPEED) / 1000)); b.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; }
    const now = Date.now(), nm = root.querySelector(".sline .nowmark"), dn = root.querySelector(".sline .done"), tn = root.querySelector(".sline .t-now");
    if (nm && dn) { const endAt = realAt(Math.max(S.endMin, sessMin(now) + 1)), p = clampN(((now - S.startAt) / (endAt - S.startAt)) * 100, 0, 100); nm.style.left = p + "%"; dn.style.width = p + "%"; if (tn) tn.textContent = "now " + clock(now); }
    const pn = root.querySelector("#s-pomo"); if (pn && S.arm === "pomodoro") pn.textContent = pomoLine();
  }
  const pomoLine = () => { const t = sessMin(), r = t % 30; return r < 25 ? `Fixed timer: next break in ${Math.max(1, Math.ceil(25 - r))} min.` : `Fixed timer: break time, ${Math.max(1, Math.ceil(30 - r))} min left.`; };

  function sourceRows() {
    const c = S.cue, rows = [], since = lastBreakEnd();
    rows.push(`<div class="row"><span class="k">1 · Time since your last break</span><span class="val">${dur(sessMin(c.shownAt || Date.now()) - sessMin(since))}</span><span class="m">${COMPUTER ? "this computer's" : "this phone's"} timer · ${since === S.startAt ? "started" : "last break ended"} ${clock(since)}</span></div>`);
    rows.push(`<div class="row"><span class="k">2 · Sleep last night</span><span class="val">${S.sleepH == null ? "not given" : sleepText(S.sleepH)}</span><span class="m">${S.sleepSrc === "wearable" ? esc(S.sleepDev) + " · read at " + clock(S.startAt) : S.sleepSrc === "wearable_sample" ? esc(S.sleepDev) + " · sample data, not your real sleep" : S.sleepSrc === "self" ? "you typed this at " + clock(S.startAt) : "left out of this suggestion"}</span></div>`);
    // source 3 is whatever ends the session: the next stop when it comes first, otherwise the planned end (as the card words it)
    const atNext = endsAtNext(), nxSrc = S.next ? (S.next.src === "sample_calendar" ? "sample calendar, not your real one" : "you typed this") : "";
    rows.push(`<div class="row"><span class="k">3 · ${atNext ? "Next stop" : "Planned end"}</span><span class="val">${atNext ? esc(S.next.label) + " · " + clock(S.next.at) : clock(realAt(S.planned))}</span><span class="m">${atNext ? nxSrc : "the length you picked: " + dur(S.planned) + (S.next ? ` · after it: ${esc(S.next.label)} at ${clock(S.next.at)} (${nxSrc})` : "")}</span></div>`);
    const steps = (S.rule && S.rule.steps || []).map((s) => `${esc(s.text)}: ${esc(s.val)}`).join(" · ");
    rows.push(`<div class="row"><span class="k">How the moment was picked</span><span class="val">rule ${RULE.version}</span><span class="m">${steps}. A starting rule the team chose, the same for everyone. It can't see your laptop${S.sleepSrc === "wearable" ? "" : " or a real watch"} yet.</span></div>`);
    return `<div class="ev">${rows.join("")}</div>`;
  }
  const endsAtNext = () => !!(S.next && sessMin(S.next.at) <= S.planned + 0.5);
  // what a suggestion says at the top, everywhere it shows (card, tab title, mini timer, a local notification)
  const pastEnd = (c) => c.kind === "keep" && S.endMin - sessMin(c.shownAt || Date.now()) < 1.5;
  const cueHead = (c) => (pastEnd(c) ? "Time to wrap up." : { walk: "Short walk now?", break: "Take a 15-minute break?", keep: "Keep going.", pomo: "25 minutes done. Take 5?" }[c.kind]);
  const lastBreakEnd = () => { const b = (S.breaks || []).filter((x) => x.endAt).pop(); return b ? b.endAt : S.startAt; };
  function sureLine() {
    if (S.sleepSrc === "wearable_sample") return "The sleep number is sample data, so read this as a demo of the reasoning, not a personal call.";
    if (S.sleepSrc === "none") return "No sleep number, so this rests on time alone. A rough guess.";
    if (S.sleepSrc === "wearable") return `Based on this timer and last night's sleep from your ${S.sleepDev}. A starting rule, not yet personal to you.`;
    return "Based on this timer and the sleep you typed. A starting rule, not yet personal to you.";
  }
  function cardHtml() {
    const c = S.cue, now = c.shownAt || Date.now(), since = dur(sessMin(now) - sessMin(lastBreakEnd()));
    const late = c.via !== "app" && (now - c.at) * SPEED > 2 * MIN ? `from ${clock(c.at)}` : "";
    if (wrongOpen) return `<div class="status"><span>Halftime · you choose</span><span></span></div><h2 class="q q2">What looks wrong?</h2>
      <div class="rungs"><button type="button" class="rung" data-s="wrong" data-v="timing"><b>The timing</b><span>Too early, or too late</span></button><button type="button" class="rung" data-s="wrong" data-v="reason"><b>The reason</b><span>A number or a source is off</span></button><button type="button" class="rung" data-s="wrong" data-v="no_need"><b>I don't need a break</b><span>I'm in a good stretch</span></button></div>
      <div class="links"><button type="button" data-s="wrong-back">Back</button></div>`;
    if (c.kind === "pomo") return `<div class="status"><span>Fixed timer · ${dur(c.min)} in</span><span>${late || "25 on, 5 off"}</span></div>
      <h2 class="q">25 minutes done. Take 5?</h2>
      <p class="why">This session uses a <b>fixed timer</b>, not Halftime's own timing: a break every 25 minutes, whatever your day looks like. The team compares the two.</p>
      <div class="acts"><button type="button" class="a yes" data-s="take">Start break${kbd("↵")}</button><button type="button" class="a no" data-s="keep">Skip it${kbd("K")}</button></div>
      <div class="links"><button type="button" data-s="wrong-open">Looks wrong</button></div>`;
    const leftMin = S.endMin - sessMin(), atEnd = leftMin < 1.5, atNext = endsAtNext(), stopChip = numChip(3, atNext ? "next stop" : "planned end");
    const nx = atEnd ? (atNext ? `it's time for ${esc(S.next.label)}` : "you've reached your planned end") : atNext ? `${esc(S.next.label)} is in ${dur(leftMin)}` : `your planned end is in ${dur(leftMin)}`;
    const sleepBit = S.sleepH == null ? "" : `, on <b>${sleepText(S.sleepH)}</b> of sleep<span class="nw">${numChip(2, "sleep last night")}</span>`;
    const head = cueHead(c);
    const sub = c.kind === "keep" ? (pastEnd(c) ? "You're at your planned end. Stopping now is your break." : "You're close to done. The end is your break.") : `${c.breakMin} minutes. Back by ${clock(Date.now() + (c.breakMin * MIN) / SPEED)}.`;
    const why = c.kind === "keep"
      ? `You've been going <b>${since}</b><span class="nw">${numChip(1, "time since your last break")}</span>${sleepBit}. But ${nx}<span class="nw">${stopChip},</span> so a break now wouldn't fit. Finish up, then rest.`
      : `You've been going <b>${since}</b> without a break<span class="nw">${numChip(1, "time since your last break")}</span>${sleepBit}. ${nx.charAt(0).toUpperCase() + nx.slice(1)}<span class="nw">${stopChip},</span>${atEnd ? ` so this ${c.kind === "walk" ? "walk" : "break"} can be your stopping point.` : ` so a ${c.kind === "walk" ? "walk" : "break"} fits.`}${S.rule && S.rule.late && c.kind === "break" ? " It's late, so the break is longer." : ""}`;
    return `<div class="status"><span>Halftime · ${dur(sessMin(c.at))} in</span><span>${late || (c.snoozes ? "snoozed once" : "speaks once")}</span></div>
      <h2 class="q">${head}</h2><p class="sub">${sub}</p><p class="why">${why}</p>
      <p class="sure"><span class="tag">How sure</span><span>${sureLine()}</span></p>
      ${whyOpen ? sourceRows() : ""}
      <div class="acts">${c.kind === "keep" ? `<button type="button" class="a yes" data-s="keep">OK${kbd("↵")}</button><button type="button" class="a no" data-s="take-anyway">Break anyway</button>` : `<button type="button" class="a yes" data-s="take">Start ${c.kind === "walk" ? "walk" : "break"}${kbd("↵")}</button><button type="button" class="a no" data-s="keep">Keep going${kbd("K")}</button>`}</div>
      <div class="links"><button type="button" data-s="why" aria-expanded="${whyOpen}">${whyOpen ? "Hide sources" : "See why"}</button>${c.kind !== "keep" && c.snoozes < 1 && S.endMin - sessMin() - 10 >= c.breakMin + 2 ? `<button type="button" data-s="snooze">Snooze 10 min</button>` : ""}<button type="button" data-s="wrong-open">Looks wrong</button></div>`;
  }

  function drawLive() {
    const c = S.cue, showing = c && c.shownAt && !c.done && cardOpen;
    const pending = c && c.shownAt && !c.done && !cardOpen;
    const breaks = (S.breaks || []).filter((b) => b.endAt).length;
    const quiet = S.arm === "pomodoro" ? `<span id="s-pomo">${pomoLine()}</span>`
      : !S.cue ? "This session is too short for a break suggestion. Halftime will stay quiet."
      : c.done ? ({ take: "You took a break when Halftime suggested one.", keep: c.kind === "keep" ? "Halftime said to finish first. It's done for this session." : "You kept going. Halftime is done for this session.", wrong: "You flagged the suggestion. Thanks.", not_needed: "You already took a break, so Halftime will stay quiet." }[c.response] || "")
      : c.shownAt ? "Halftime has a suggestion for you." : "Halftime will speak up once, when a break would help.";
    return `<div class="cols"><div class="c1">
      <section class="hero${showing ? " dim" : ""}" aria-label="This session" data-attn="study-clock">
        <p class="subject"><span>${esc(S.plan || "Study session")}</span><span>Started ${clock(S.startAt)}</span></p>
        <p class="clock" id="s-clock">${clockHtml()}</p>
        <p class="since">${breaks ? `${breaks} break${breaks === 1 ? "" : "s"} so far this session.` : "No break yet this session."}</p>
        <p class="sfine quietline">${quiet}</p>
        ${pending ? btn("See the suggestion", "card-open", "ghost sm") : ""}
      </section>
      ${lineHtml()}
      ${S.next ? `<div class="next"><span class="sq" aria-hidden="true"></span><div><b>${esc(S.next.label)} · ${clock(S.next.at)}</b><br><span>${S.next.src === "sample_calendar" ? "sample calendar" : "you typed this"}</span></div></div>` : ""}
      <section class="hc sact">
        ${breakAsk ? `<h2>How long a break?</h2><div class="srow" style="margin-top:10px">${btn("5 min", "break-5", "ghost sm")}${btn("15 min", "break-15", "ghost sm")}${btn("Cancel", "break-cancel", "ghost sm")}</div>`
          : endAsk ? `<h2>End this session?</h2><p class="sfine">${studyMin() < 2 ? "Under 2 minutes in. You can discard it instead, and it won't count." : (task().run ? "Next: three quick questions." : "Next: two quick questions.")}</p><div class="srow" style="margin-top:10px">${btn("End session", "end-yes", "sm")}${studyMin() < 2 ? btn("Discard", "end-discard", "ghost sm") : ""}${btn("Keep studying", "end-no", "ghost sm")}</div>`
          : `<div class="srow two">${btn(`Take a break${kbd("B")}`, "break-ask", "ghost")}${btn(`End session${kbd("E")}`, "end-ask", "ghost")}</div>`}
        ${!COMPUTER && "wakeLock" in navigator && Push.state !== "on" ? `<button type="button" class="rowbtn" role="switch" aria-checked="${wakeWanted}" data-s="wake" style="margin-top:8px;border-top:1px solid var(--line)"><div>Keep the screen on<br><span>So you see the suggestion on time without notifications</span></div><i class="swt"></i></button>` : ""}
      </section></div>
      <div class="c2">${showing ? `<section class="scard" id="s-card" role="region" aria-label="Halftime's suggestion" aria-live="polite" data-attn="study-card">${cardHtml()}</section>` : sidePanel()}</div></div>
      <p class="smp sfoot">${S.arm === "pomodoro" ? "This session: fixed 25/5 timer (comparison)." : "This session: Halftime's timing."} ${Push.state === "on" ? "Notifications on." : COMPUTER ? "No notifications: keep this tab open and it shows here." : "No notifications: it shows when the app is open."}${SPEED !== 1 ? ` Test speed ×${SPEED}.` : ""}</p>`;
  }
  // the right-hand column on a computer while Halftime is quiet (a phone never shows it)
  function sidePanel() {
    if (!COMPUTER) return "";
    const keys = [["B", "take a break"], ["E", "end the session"], ["↵", S.arm === "pomodoro" ? "start the break" : "accept a suggestion"], ["K", S.arm === "pomodoro" ? "skip the break" : "keep going"]].concat(S.arm === "pomodoro" ? [] : [["S", "snooze it"], ["W", "see why"]], miniOK() ? [["T", "mini timer on top"]] : []);
    return `<section class="hc side"><h2>${S.arm === "pomodoro" ? "Fixed timer" : "Halftime is timing this session"}</h2>
      <p class="sfine">${S.arm === "pomodoro" ? "A break every 25 minutes, whatever your day looks like. This is the comparison timer." : `It uses this timer${S.sleepH != null ? " and last night's sleep" : ""}, and speaks up once, when a break would help, with its reasons. Until then it stays out of your way.`}</p>
      <p class="sfine">${esc(deliveryLine())}</p>
      ${miniOK() ? `<button type="button" class="sbtn ghost sm" data-s="mini" style="margin-top:12px">${mini ? "Close the mini timer" : "Keep a mini timer on top"}</button>` : ""}
      ${Push.state === "ask" ? `<button type="button" class="sbtn ghost sm" data-s="push-on" style="margin-top:8px">Turn on notifications</button>` : ""}
      <dl class="keys">${keys.map(([k, t]) => `<div><dt><kbd>${k}</kbd></dt><dd>${t}</dd></div>`).join("")}</dl></section>`;
  }
  function drawBreak() {
    const b = S.brk;
    return `<div class="cols"><div class="c2"><section class="scard brk" role="region" aria-label="Break" data-attn="study-break">
        <div class="status"><span>${b.from === "pomo" ? "Fixed timer · on a break" : b.from === "manual" ? "Your break" : "Halftime · on a break"}</span><span>back by ${clock(b.endAt)}</span></div>
        <p class="bleft" id="s-bleft" aria-live="off">0:00</p>
        <p class="why">${b.from === "manual" ? "Your break. " : ""}Step away from the screen if you can. ${Push.state === "on" ? "You'll get a notification when it's over." : "Halftime will be here when you're back."}</p>
        <div class="acts">${b.from !== "pomo" && !b.plus ? `<button type="button" class="a no" data-s="plus5">+5 min${kbd("+")}</button>` : `<span></span>`}<button type="button" class="a yes" data-s="break-end">End break${kbd("↵")}</button></div>
      </section></div>
      <div class="c1"><section class="hero dim2" aria-label="This session"><p class="subject"><span>${esc(S.plan || "Study session")}</span><span>Started ${clock(S.startAt)}</span></p><p class="clock" id="s-clock">${clockHtml()}</p><p class="since">The study clock is paused while you're on a break.</p></section>
      ${lineHtml()}</div></div>`;
  }
  function drawStale() {
    return `<h1>Still studying?</h1><p class="slead">This session started ${dur(sessMin())} ago and Halftime was last open at ${clock(S.staleAt)}.</p>
      <div class="scol">${btn("I stopped around " + clock(S.staleAt), "stale-stop", "big")}${btn("Still going", "stale-go", "ghost")}</div>`;
  }

  function drawCheckin() {
    const T = task(), c = checkin, step = c.step;
    const total = T.run ? 3 : 2, head = (n, title) => `<p class="hello">Check-in · ${T.run ? n : n - 1} of ${total}</p><h1>${title}</h1>`; // no task chosen yet: 2 questions
    if (step === "task") return `${head(1, esc(T.title))}<p class="slead">${esc(T.intro)}</p><div id="s-task"></div>
      <div class="scol">${T.run ? btn("Start", "task-run", "big") + btn("Skip this", "task-skip", "ghost") : btn("Continue", "task-skip", "big")}</div>`;
    if (step === "finished") return `${head(2, "Did you finish what you planned?")}${S.plan ? `<p class="slead">You planned: <b>${esc(S.plan)}</b>, ${dur(S.planned)}. You studied ${dur(S.minutes)}.</p>` : `<p class="slead">You planned ${dur(S.planned)} and studied ${dur(S.minutes)}.</p>`}
      <div class="scol">${[["yes", "Yes"], ["mostly", "Mostly"], ["no", "No"]].map(([v, l]) => `<button type="button" class="sbtn pick" data-s="fin" data-v="${v}">${l}</button>`).join("")}</div>`;
    const got = S.cues > 0 || (S.missed || 0) > 0, pom = S.arm === "pomodoro";
    return `${head(3, got ? (pom ? "Did the timer's breaks feel wrong?" : "Did the suggestion feel wrong?") : "You didn't get a suggestion this time.")}
      <p class="slead">${got ? "Be honest. A wrong one is the most useful thing you can tell the team." : "Did that feel right?"}</p>
      <div class="scol">${got
        ? [["no", "No, it fit"], ["timing", "Yes, the timing"], ["reason", pom ? "Yes, I didn't need them" : "Yes, the reason"]].map(([v, l]) => `<button type="button" class="sbtn pick" data-s="wrongq" data-v="${v}">${l}</button>`).join("")
        : [["none", "Yes, I didn't need one"], ["timing", "No, I wanted one"]].map(([v, l]) => `<button type="button" class="sbtn pick" data-s="wrongq" data-v="${v}">${l}</button>`).join("")}</div>`;
  }
  function drawDone() {
    const s = checkin.done, due = logList().filter((x) => !x.qa || SPEED !== 1).length >= SUS_AFTER && !store.get("ht-sus-done", false);
    return `<p class="hello">Session ${s.n} saved</p><h1>${dur(s.minutes)} of studying.</h1>
      <p class="slead">${s.breaks.length} break${s.breaks.length === 1 ? "" : "s"}. This session used ${s.arm === "pomodoro" ? "the <b>fixed 25/5 timer</b>" : "<b>Halftime's timing</b>"}.${joined() ? "" : " Nothing was sent: you're not sharing data."}</p>
      <div class="scol">${due ? btn("Two more minutes: 10 quick questions", "sus-start", "big") + btn("Not now", "done", "ghost") : btn("Done", "done", "big")}</div>
      ${due ? `<p class="sfine" style="text-align:center">You've done ${logList().length} sessions. The team would like your view of the app itself.</p>` : ""}`;
  }
  function drawSus() {
    const i = susA.length;
    if (i >= SUS.length) return `<p class="hello">Survey done</p><h1>Thank you.</h1><p class="slead">That's everything. Your answers help the team decide what to fix first.</p><div class="scol">${btn("Done", "done", "big")}</div>`;
    return `<p class="hello">About the app · ${i + 1} of ${SUS.length}</p><h1 class="susq">${esc(SUS[i])}</h1>
      <div class="sus" role="group" aria-label="${esc(SUS[i])}">${[1, 2, 3, 4, 5].map((v) => `<button type="button" data-s="sus" data-v="${v}" aria-label="${v} of 5${v === 1 ? ", strongly disagree" : v === 5 ? ", strongly agree" : ""}">${v}</button>`).join("")}</div>
      <div class="susl"><span>Strongly disagree</span><span>Strongly agree</span></div>
      <div class="scol">${i ? btn("Back", "sus-back", "ghost") : ""}${btn("Stop the survey", "done", "ghost")}</div>`;
  }

  function drawConsent() {
    const c = consent();
    const li = (b, t) => `<li><b>${b}</b> ${t}</li>`;
    return `<header class="sh"><button type="button" class="back" data-s="consent-back">‹ Back</button><span class="smp">BINF 4070 class project</span></header>
      <h1>${c ? "What's collected" : "Before your first session"}</h1>
      <p class="slead">Halftime is a student prototype, and this is a class test of it. If you join, here is everything it saves.</p>
      <section class="hc" data-attn="consent-list"><h2>What's saved</h2><ul class="clist">
        ${li("Your sessions.", "Start and end times, the length you planned, your breaks, and what you tapped on each suggestion.")}
        ${li("Your answers.", "The sleep hours you type, the check-in after each session, and a 10-question survey after a few sessions.")}
        ${li("How you use the app.", COMPUTER ? "Screens, clicks, scrolling, time on each screen and rough mouse paths." : "Screens, taps, scrolling, time on each screen and rough finger paths.")}
        ${li("Your device.", "Phone or laptop, browser, screen size, language and time zone.")}
        ${li("Your IP address and rough location", "(city and region), added by the server.")}
        ${li("The name you typed", "when you logged in.")}
        ${li("If you turn on notifications:", `a push address for ${here}, used only to send your break suggestion.`)}</ul></section>
      <section class="hc"><h2>What isn't</h2><ul class="clist">
        ${li("What you're studying.", `That stays on ${here}.`)}
        ${liveWatch() ? `${li("Your watch's readings.", `They stay on ${here}. A session notes only that its sleep came from a watch, not the hours.`)}${li("Anything from a real calendar.", "The calendar is sample data in this prototype.")}` : li("Anything from a real watch or calendar.", "Those numbers are sample data in this prototype.")}
        ${li("Your exact location, contacts, photos or messages.", "")}</ul></section>
      <section class="hc"><h2>Good to know</h2><ul class="clist">
        ${li("Two timers.", "Each session randomly uses Halftime's timing or a fixed 25-minutes-on, 5-off timer, so the team can compare them. The app tells you which.")}
        ${li("Who sees it.", "The four students on the project team. It's stored in a private database and used for the course report, with names removed.")}
        ${li("Wellness, not medicine.", "Halftime gives study-break suggestions. It doesn't diagnose or treat anything.")}
        ${li("You can stop any time.", `You → Delete my data removes everything from the server and ${here}.`)}</ul></section>
      ${c ? `<p class="sfine" style="text-align:center;margin-top:14px">Your choice now: <b>${c.choice === "agree" ? "joined" : "not sharing"}</b>, since ${esc(dayName(c.at).toLowerCase())}.</p>` : ""}
      <div class="sticky col">${btn(c && c.choice === "agree" ? "Keep sharing" : "Agree and join", "consent-yes", "big")}${btn(c && c.choice === "decline" ? "Keep not sharing" : "Use it without sharing", "consent-no", "ghost")}</div>`;
  }
  function drawDelete() {
    return `<header class="sh">${delBusy ? "" : `<button type="button" class="back" data-s="del-cancel">‹ Back</button>`}<span class="smp"></span></header>
      <h1>Delete my data</h1>
      <p class="slead">This removes everything saved for ${here} from the team's server: sessions, answers, usage data and the push address. It also clears Halftime on ${here} and turns sharing off.</p>
      <p class="slead"><b>It can't be undone.</b></p>
      <p class="sfine" id="s-delmsg" role="alert"></p>
      <div class="scol">${btn(delBusy ? "Deleting…" : "Delete everything", "del-yes", "big danger")}${delBusy ? "" : btn("Cancel", "del-cancel", "ghost")}</div>`;
  }

  const VIEWS = { idle: drawIdle, setup: drawSetup, live: drawLive, break: drawBreak, stale: drawStale, checkin: drawCheckin, done: drawDone, sus: drawSus, consent: drawConsent, delete: drawDelete };
  function draw() {
    if (!root || taskRunning || dead) return;
    const keep = document.activeElement && document.activeElement.id && root.contains(document.activeElement) ? document.activeElement.id : null;
    root.innerHTML = VIEWS[view]();
    root.dataset.view = view;
    if (!(view === "live" || view === "break")) { document.title = titleNow(); paintMini(); }
    if (keep) { const el = document.getElementById(keep); if (el) { el.focus({ preventScroll: true }); try { el.setSelectionRange(el.value.length, el.value.length); } catch {} } }
    if (view === "live" || view === "break") paintClock();
    if (window.HT && HT.watch) HT.watch(root);
  }
  function go(v, keepScroll) {
    const changed = view !== v; view = v;
    if (v === "live" || v === "break") { clearInterval(tickT); tickT = setInterval(tick, 1000); } else if (!S) { clearInterval(tickT); tickT = null; }
    draw();
    if (changed || v === "live") screen("study_" + v + (v === "live" && S && S.cue && S.cue.shownAt && !S.cue.done && cardOpen ? "_suggest" : ""));
    if (!keepScroll || cardOpen) scrollTo(0, 0);
    if (window.APP && APP.isReal && !APP.isReal() && (v === "live" || v === "break") && cardOpen) { APP.showReal(); toast("Your session has a suggestion."); }
  }

  function setSharing(yes) {
    store.set("ht-consent-study", { choice: yes ? "agree" : "decline", at: Date.now(), v: 1 });
    if (yes) { if (window.HT) HT.optIn(); sev("consent_study", "agree", { v: 1 }); sflush(); }
    else if (window.HT && HT.isRecording()) { HT.event("consent_study", { value: "decline", extra: { v: 1 } }); HT.optOut(); } // the last thing sent is the "no"
    // declining: remove the push address from the server even when this page never loaded the subscription itself
    if (!yes && (Push.sub || store.get("ht-push-saved", ""))) Push.off(); else Push.refresh();
    if (window.APP) APP.drawYou();
  }
  // ---------- taps
  function onClick(e) {
    const b = e.target.closest("[data-s]"); if (!b || !root.contains(b)) return;
    const k = b.dataset.s, v = b.dataset.v;
    if (!fromKey && Date.now() - drawnAt < 280 && /^(break-ask|end-ask|sus|sus-start|fin|task-skip|start|done|take|keep)$/.test(lastKey)) return; // the second half of a double tap, landing on a button that just took the first one's place
    drawnAt = Date.now(); lastKey = k;
    if (k === "start") { if (!consent()) { consentReturn = "setup"; return go("consent"); } draft = newDraft(); return go("setup"); }
    if (k === "demo") return APP.openDemo();
    if (k === "go-night") return window.APP && APP.setTab("night");
    if (k === "hint") { hintOpen = !hintOpen; return draw(); }
    if (k === "push-on" && !consent()) { consentReturn = "push"; return go("consent"); } // a push address is saved on the server, so the choice comes first; agreeing then goes straight on to the browser's question
    if (k === "push-on") return turnOnPush();
    if (k === "push-test") return void Push.test();
    if (k === "consent-view") { consentReturn = "back"; return go("consent"); }
    if (k === "consent-back") return go(home());
    if (k === "consent-yes" || k === "consent-no") {
      const yes = k === "consent-yes"; setSharing(yes);
      if (consentReturn === "setup") { draft = draft || newDraft(); return go("setup"); }
      if (consentReturn === "push") { go(home()); if (yes) return turnOnPush(); toast(`OK. Nothing is shared from ${here}, so notifications stay off.`); return; }
      toast(yes ? "Thanks for joining." : `OK. Nothing is shared from ${here}.`);
      return go(home());
    }
    // setup
    if (k === "cancel-setup") { if (starting) return; draft = null; return go("idle"); }
    if (k === "len") { draft.planned = +v; return draw(); }
    if (k === "sleep-inc" || k === "sleep-dec") { draft.sleepH = clampN(draft.sleepH + (k === "sleep-inc" ? 0.5 : -0.5), 0, 14); return draw(); }
    if (k === "sleep-self") { draft.sleepMode = "self"; draft.sleepH = store.get("ht-last-setup", {}).sleepSelf || 7; return draw(); }
    if (k === "sleep-wear") { draft.sleepMode = "wearable"; draft.sleepH = sampleSleep(); return draw(); }
    if (k === "sleep-live") { applyWatch(draft); return draw(); }
    if (k === "sleep-skip") { draft.sleepSkip = true; return draw(); }
    if (k === "sleep-unskip") { draft.sleepSkip = false; return draw(); }
    if (k === "next-mode") { draft.nextMode = v; return draw(); }
    if (k === "begin") {
      if (draft.nextMode === "typed" && !draft.nextTime) { toast("Pick a time for your next stop, or choose Nothing after."); return; }
      b.disabled = true; b.textContent = "Starting…"; return begin();
    }
    if (!S && !["done", "sus", "sus-back", "sus-start", "del-yes", "del-cancel"].includes(k)) return;
    // live
    if (k === "card-open") { cardOpen = true; return go("live"); }
    if (k === "mini") return void openMini();
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
    if (k === "plus5") { S.brk.plus = 5; S.brk.endAt += (5 * MIN) / SPEED; sev("study_break", "plus5", { study: S.id, arm: S.arm }); Push.cancel(["break_over"]).then(() => S && S.brk && Push.schedule([{ kind: "break_over", at: new Date(S.brk.endAt).toISOString(), m: 0 }], false)); save(); toast(`Added 5 minutes. Back by ${clock(S.brk.endAt)}.`); return draw(); }
    if (k === "break-end") return endBreak("user");
    if (k === "end-ask") { endAsk = true; breakAsk = false; return draw(); }
    if (k === "end-no") { endAsk = false; return draw(); }
    if (k === "end-yes") return endSession("user");
    if (k === "end-discard") return endSession("discard");
    if (k === "wake") { setWake(!wakeWanted).then(draw); return; }
    if (k === "stale-stop") return endSession("stale", S.staleAt);
    if (k === "stale-go") { S.seenAt = Date.now(); save(); return go(home()); }
    // check-in
    if (k === "task-skip") { checkin.step = "finished"; save(); return go("checkin"); }
    if (k === "task-run") { const T = task(), el = root.querySelector("#s-task"), mine = checkin; root.querySelector(".scol").hidden = true; taskRunning = true;
      return T.run(el).then((r) => { taskRunning = false; if (checkin !== mine) return; checkin.task = r ? r : { id: T.id, score: null, skipped: true }; checkin.step = "finished"; save(); go("checkin"); }); }
    if (k === "fin") { checkin.finished = v; checkin.step = "wrong"; save(); return go("checkin"); }
    if (k === "wrongq") { checkin.wrong = v; return finishCheckin(); }
    if (k === "sus-start") { susA = []; return go("sus"); }
    if (k === "sus") { susA.push(+v); if (susA.length === SUS.length) { const score = susScore(susA); store.set("ht-sus-done", true); sev("study_sus", String(score), { answers: susA, sessions: logList().length }); sflush(); } return go("sus"); }
    if (k === "sus-back") { susA.pop(); return go("sus"); }
    if (k === "done") { checkin = null; susA = null; if (window.APP) APP.drawYou(); return go("idle"); }
    if (k === "del-cancel") { if (delBusy) return; delAsk = false; view = home(); if (window.APP) APP.setTab("you"); return; }
    if (k === "del-yes") return forget();
  }
  function onInput(e) {
    const t = e.target; if (!draft) return;
    if (t.id === "s-plan") draft.plan = t.value;
    if (t.id === "s-nlabel") draft.nextLabel = t.value;
    if (t.id === "s-ntime") { draft.nextTime = t.value; draw(); }
  }

  // ---------- delete my data: the server's rows for this visitor id, then this phone's copy
  async function forget() {
    if (delBusy) return; delBusy = true; draw();
    const v = visitor(), msg = () => root.querySelector("#s-delmsg"), wasOn = !!(window.HT && HT.isRecording());
    const call = () => fetch("/api/forget", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: v }) });
    try {
      if (window.HT && HT.forget) HT.forget(); // stop recording and drop anything not sent yet
      // the server first: its delete also removes the push address and any queued notifications. Only when it
      // worked does this phone change, so a failure really leaves everything as it was (apart from sharing, restored below)
      const r = await call(); if (!r.ok) throw new Error(String(r.status));
      try { if (Push.sub) await Push.sub.unsubscribe(); } catch {}
      await new Promise((res) => setTimeout(res, 1500)); await call().catch(() => {}); // anything that was already on its way when the button was tapped
      clearInterval(tickT); S = null;
      if (window.HalftimeNight) await HalftimeNight.forget().catch(() => {}); // the WHOOP readings kept in this browser
      try { Object.keys(localStorage).filter((k) => k.startsWith("ht-") && k !== "ht-optout").forEach((k) => localStorage.removeItem(k)); sessionStorage.clear(); } catch {}
      dead = true; const bar = document.querySelector(".tabbar"); if (bar) bar.hidden = true;
      root.innerHTML = `<h1>Deleted.</h1><p class="slead">Everything saved for ${here} is gone from the server, and Halftime on ${here} is cleared. Sharing is off.</p><div class="scol"><a class="sbtn big" href="/">Back to the start</a></div>`;
    } catch (e) {
      if (wasOn) { try { localStorage.removeItem("ht-optout"); } catch {} }
      delBusy = false; draw(); const m = msg(); if (m) m.textContent = `The server couldn't delete it just now, so nothing was deleted and nothing changed on ${here}. Please try again later.`;
    }
  }

  // ---------- History and You tabs (called by the app shell)
  function drawHistory(el) {
    if (!el) return; const log = logList();
    const tot = log.reduce((a, s) => a + s.minutes, 0), ht = log.filter((s) => s.arm !== "pomodoro"), pom = log.filter((s) => s.arm === "pomodoro");
    const cues = ht.filter((s) => s.cues > 0).length, taken = ht.filter((s) => s.taken > 0).length, pomBreaks = pom.reduce((a, s) => a + (s.taken || 0), 0);
    el.innerHTML = `<h2>Your sessions <span class="smp">real · on ${here}</span></h2>${log.length
      ? `<div class="stats3"><div><b>${log.length}</b><span>session${log.length === 1 ? "" : "s"}</span></div><div><b>${tot >= 60 ? (tot / 60).toFixed(1) + " h" : tot + " min"}</b><span>studying</span></div><div><b>${taken} of ${cues}</b><span>Halftime suggestions taken</span></div></div>${pom.length ? `<p class="sfine" style="margin-top:8px">Fixed-timer sessions: ${pom.length}, with ${pomBreaks} break${pomBreaks === 1 ? "" : "s"} taken. They're the comparison, so they aren't counted as suggestions.</p>` : ""}<ul class="log" style="margin-top:10px">${log.slice(0, 12).map(sessionRow).join("")}</ul>`
      : `<p class="sfine" style="margin-top:6px">None yet. Start one from the Now tab.</p>`}${nightsHtml()}`;
  }
  // Real nights from a live watch (connections session, 2026-11-13). Shown with the person's real sessions, above the
  // sample week, and only when this computer has a Fitbit connected. No "usual" until there are 14 nights.
  function nightsHtml() {
    const W = fitbitWatch(); if (!W || !W.nights || !W.nights.length) return "";
    const N = W.nights.slice(-14), mx = Math.max(9, ...N.map((n) => n.sleepH)), H = 140 - 17, last = N[N.length - 1];
    const usual = W.usual ? `<span class="usual" style="bottom:${Math.round(17 + (W.usual.sleep / mx) * H)}px"><em>usual ${sleepText(W.usual.sleep)}</em></span>` : "";
    const note = [W.fresh ? "" : `Not synced since ${esc(W.lastSync)}, so last night isn't here yet. Open the Fitbit app to sync.`,
      W.usual ? `"Usual" is your own middle night of the last ${W.usual.n}.` : `Halftime waits for ${W.learning ? W.learning.need : 14} nights before it calls anything your usual. So far: ${W.nights.length}.`,
      last.rhr != null ? `${esc(last.label)}: resting heart rate ${last.rhr} bpm${last.hrv != null ? `, overnight HRV ${last.hrv} ms` : ""}. Context only.` : ""].filter(Boolean).join(" ");
    return `<h2 style="margin-top:20px">Your nights <span class="smp">${esc(W.device)} · real</span></h2>
      <div class="bars" role="img" aria-label="Hours slept on ${N.length} nights: ${N.map((n) => `${esc(n.label)} ${sleepText(n.sleepH)}`).join(", ")}.">${N.map((n) => `<div class="b"><i style="height:${Math.max(2, Math.round((n.sleepH / mx) * H))}px" title="${esc(n.label)}: ${sleepText(n.sleepH)}"></i><small>${esc(String(n.label).split(" ")[1] || "")}</small></div>`).join("")}${usual}</div>
      <p class="sfine">${note} These readings stay on this device.</p>`;
  }
  const youRows = () => ({ push: Push.state, joined: joined(), consent: !!consent(), sessions: logList().length });
  const busyTask = () => { if (!taskRunning) return false; toast("Finish or stop the reaction check first."); if (window.APP) APP.setTab("now"); return true; };
  function openDelete() { if (busyTask()) return; delAsk = true; delBusy = false; view = "delete"; draw(); screen("study_delete"); scrollTo(0, 0); }
  function openConsent() { if (busyTask()) return; consentReturn = "back"; view = "consent"; draw(); screen("study_consent"); scrollTo(0, 0); }
  async function youPush() {
    if (Push.state === "on") { await Push.off(); toast("Notifications off."); }
    else if (Push.state === "ask" && !consent()) { if (window.APP) APP.setTab("now"); openConsent(); consentReturn = "push"; return; }
    else if (Push.state === "ask") { const ok = await Push.enable(); toast(pushMsg(ok)); }
    else if (Push.state === "install") { hintOpen = true; view = home(); if (window.APP) APP.setTab("now"); const el = document.getElementById("s-install"); if (el) el.scrollIntoView({ block: "center" }); else toast(deliveryLine()); return; }
    else toast(deliveryLine());
    if (window.APP) APP.drawYou();
  }

  // ---------- boot
  function init() {
    root = document.getElementById("study"); if (!root) return;
    root.addEventListener("click", onClick);
    addEventListener("keydown", onKey);
    if (WIDE.addEventListener) WIDE.addEventListener("change", () => draw());
    document.documentElement.classList.toggle("computer", COMPUTER);
    root.addEventListener("input", onInput);
    // someone else signed in on this phone (another name, or a new account): their sessions, choices and survey start clean
    const owner = String(P().name || "") + "|" + String(P().created || ""), was = store.get("ht-study-owner", null);
    if (!PREVIEW_MODE && was !== owner) {
      if (was !== null) { ["ht-study", "ht-study-log", "ht-study-n", "ht-arms", "ht-consent-study", "ht-sus-done", "ht-last-setup"].forEach((k) => store.del(k)); if (window.HalftimeNight) HalftimeNight.forget().catch(() => {}); }
      store.set("ht-study-owner", owner);
    }
    S = store.get("ht-study", null);
    if (PREVIEW_MODE) { S = null; const st = Qs.get("state") || ""; view = /^study_(setup|consent)/.test(st) ? st.slice(6) : "idle"; if (view === "setup") draft = newDraft(); }
    else if (S && S.phase === "checkin") { checkin = S.ck || { step: "task", task: null, finished: null, wrong: null }; S.ck = checkin; view = "checkin"; }
    else if (S) { view = home(); cardOpen = !!(S.cue && S.cue.shownAt && !S.cue.done); }
    if (S && S.speed && S.speed !== SPEED) { // a test-speed session doesn't carry into a normal one: drop it, and its queued notifications
      if (store.get("ht-push-saved", "")) fetch("/api/push?op=cancel", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ visitor: visitor(), study: S.id, kinds: null }), keepalive: true }).catch(() => {});
      S = null; save(); view = "idle";
    }
    booted = true;
    if (S && (view === "live" || view === "break")) { tickT = setInterval(tick, 1000); tick(); }
    pushOpen = false; // only the suggestion that was waiting when the notification was tapped
    draw();
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { if (S) tick(); if (wakeWanted && !wake) setWake(true); Push.refresh(); } else if (S) save(); });
    addEventListener("pagehide", () => { if (S) save(); });
    if ("serviceWorker" in navigator) navigator.serviceWorker.addEventListener("message", (e) => { if (e.data && e.data.type === "push_open" && S) { pushOpen = /^(suggest|pomo_break)/.test(e.data.kind || ""); tick(); pushOpen = false; if (window.APP && !taskRunning) APP.showReal(); } });
    Push.init();
    if (standalone() && !sget("ht-pwa-seen")) { sset("ht-pwa-seen", "1"); if (window.HT && !PREVIEW_MODE) HT.event("pwa", { value: "standalone_open" }); }
  }

  window.STUDY = {
    init, RULE, susScore, TASKS, computer: COMPUTER,
    onShow() { if (!root) return; if (view === "live" || view === "break" || view === "idle") view = home(); if (S && S.phase !== "checkin") tick(); if ((view === "live" || view === "break") && !tickT) tickT = setInterval(tick, 1000); draw(); screen("study_" + view); },
    active: () => !!S, view: () => view,
    drawHistory, youRows, openDelete, openConsent, youPush, deliveryLine, setSharing,
    leaveSubview() { if ((view === "consent" || view === "delete") && !delBusy) view = home(); },
    // the Night tab's "Type last night's sleep": session setup, opened on the typed-sleep stepper (a running session is left as it is)
    typeSleep() { this.startSetup(true); },
    // the same as pressing Start studying (the tour's last button): the consent screen first if it hasn't been answered
    startSetup(typed) {
      if (!root || S || dead) return;
      draft = newDraft(); // made first, so it survives the consent screen (consentReturn "setup" keeps it)
      if (typed) { draft.sleepSkip = false; draft.sleepMode = "self"; draft.sleepH = store.get("ht-last-setup", {}).sleepSelf || 7; }
      if (!consent()) { consentReturn = "setup"; return go("consent"); }
      go("setup");
    },
  };
})();
