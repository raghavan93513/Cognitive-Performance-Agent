/* ICP testing 1: made-up data for ICP_6 Ethan Park, injected into the page by the device walk (eval steps).
   Everything is generated here with the app's own calculator (window.HalftimeNight), so the screens show exactly
   what the app computes. Nothing is real; nothing is sent anywhere (local server, no database key). */
window.__icp = {
  // move the page's clock by whole days (day 1 of the test runs one day behind day 2)
  shift(days) {
    if (window.__shifted === days) return true;
    const R = window.__RealDate || Date; window.__RealDate = R; const off = days * 864e5;
    function D(...a) { if (!(this instanceof D)) return new R(R.now() + off).toString(); return a.length ? new R(...a) : new R(R.now() + off); }
    D.prototype = R.prototype; D.now = () => R.now() + off; D.UTC = R.UTC; D.parse = R.parse;
    window.Date = D; window.__shifted = days; return true;
  },
  rng(seed) { let s = seed; const u = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff); return { u, g: () => { let a = 0, b = 0; while (!a) a = u(); while (!b) b = u(); return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b); } }; },
  // one night of 1-per-second readings (heart rate + up to 2 beat intervals), bed/wake in local time on the wake date
  samplesFor(key, bedH, bedM, wakeH, wakeM, rhr, rmssd, seed) {
    const NT = window.HalftimeNight, { g } = this.rng(seed);
    const [y, mo, d] = key.split("-").map(Number), at = (dd, h, m) => new Date(y, mo - 1, dd, h, m).getTime();
    const tBed = bedH >= 18 ? at(d - 1, bedH, bedM) : at(d, bedH, bedM), tWake = at(d, wakeH, wakeM);
    const out = [];
    for (let t = tBed - 2 * 36e5; t < tWake + 90 * 6e4; t += 1000) {
      const asleep = t >= tBed && t < tWake, x = (t - tBed) / (tWake - tBed), m = (t - tBed) / 6e4;
      let hr = asleep ? rhr + 30 * (x - 0.6) ** 2 + 9 * Math.exp(-m / 8) + g() * 1.1 : 71 + g() * 6;
      hr = Math.max(38, Math.min(150, hr));
      const base = 60000 / hr;
      out.push({ t: Math.floor(t / 1000), hr: Math.round(hr), rr: asleep ? [Math.round(base + g() * rmssd / Math.SQRT2), Math.round(base + g() * rmssd / Math.SQRT2)] : [Math.round(base + g() * 30)] });
    }
    return out;
  },
  // a rower's month: 6 am practice six days a week (early wake), a lie-in on Sundays, a regatta weekend, a deadline night
  plan(key, i) {
    const dow = new Date(key + "T12:00:00").getDay(), { u, g } = this.rng(1000 + i * 7);
    if (dow === 0) return [0, 30 + Math.round(u() * 30), 8, 15 + Math.round(u() * 30)];          // Sunday lie-in
    if (i % 11 === 3) return [1, 50, 5, 20];                                                           // deadline night
    return [u() < 0.55 ? 23 : 0, 5 + Math.round(u() * 40), 5, 20 + Math.round(u() * 20)];                // practice days: 5:20–5:40 wake
  },
  // 30 nights ending on today's wake date (with the page clock as it is now); the last night's readings are also stored,
  // so "Change" can recompute it
  async seedNights(n = 30, lastNight = [0, 10, 5, 20]) {
    const NT = window.HalftimeNight, today = NT.dateKey(new Date());
    const prof = JSON.parse(localStorage.getItem("ht-profile") || "{}"), owner = String(prof.name || "") + "|" + String(prof.created || "");
    const nights = [];
    for (let i = n - 1; i >= 0; i--) {
      const key = NT.addDays(today, -i), p = i === 0 ? lastNight : this.plan(key, i);
      const { g } = this.rng(77 + i);
      const rhr = 47 + Math.round(g() * 1.5) + (p[2] <= 5 && p[3] < 30 ? 1 : 0), rmssd = 92 + g() * 7;
      const s = this.samplesFor(key, p[0], p[1], p[2], p[3], rhr, rmssd, 500 + i);
      const night = NT.computeNight(s, key); night.confirmed = i !== 0; // last night still waits for "Is this when you slept?"
      NT.saveNight(night); nights.push(night);
      if (i === 0) await NT.putSamples(s);
    }
    const last = nights[nights.length - 1];
    NT.setMeta({ owner, lastSync: Date.now(), device: "WHOOP 4.0", name: "WHOOP 4C0ETHAN", battery: 64, firmware: "41.16.6.0",
      last: { records: 41230, from: last.bed - 3 * 36e5, to: Date.now() - 20 * 6e4, dropped: 0, complete: true } });
    window.dispatchEvent(new CustomEvent("halftime:night"));
    return nights.map((x) => `${x.date} ${x.ok ? Math.round(x.sleepMin) + "m rhr" + x.rhr + " hrv" + x.hrv : "nodata:" + x.reason}`).join(" | ");
  },
  // one more night (day 2's sync): the new wake date's night, with its readings stored
  async addNight(bed = [23, 25], wake = [6, 45]) {
    const NT = window.HalftimeNight, key = NT.dateKey(new Date());
    const s = this.samplesFor(key, bed[0], bed[1], wake[0], wake[1], 48, 88, 9001);
    await NT.putSamples(s); const made = await NT.recompute(s);
    const m = NT.meta() || {}; NT.setMeta({ ...m, lastSync: Date.now(), battery: 51, last: { records: s.length, from: s[0].t * 1000, to: s[s.length - 1].t * 1000, dropped: 0, complete: true } });
    window.dispatchEvent(new CustomEvent("halftime:night"));
    return made.map((x) => `${x.date} ${x.ok ? Math.round(x.sleepMin) + "m" : x.reason}`).join(" | ");
  },
  // 18 study sessions over the month (laptop), both arms, as the app logs them
  seedLog() {
    const { u } = this.rng(42), plans = ["STAT 5703 problem set", "Capstone EDA", "ML reading", "Capstone write-up", "Algorithms pset", "Stats midterm review", "Lecture notes", "Kaggle practice"];
    const log = [], now = Date.now();
    for (let i = 0; i < 18; i++) {
      const day = Math.round(1 + i * 1.6), start = new Date(now - day * 864e5); start.setHours(i % 3 === 0 ? 20 : 15, 10 + Math.round(u() * 40), 0, 0);
      const arm = i % 2 ? "pomodoro" : "halftime", minutes = 40 + Math.round(u() * 100), cue = arm === "halftime" ? { kind: u() < 0.7 ? "walk" : "break", response: u() < 0.6 ? "take" : u() < 0.5 ? "keep" : "snooze", min: 40 + Math.round(u() * 15) } : null;
      log.push({ id: "icp-" + i, arm, startAt: start.getTime(), minutes, breaks: arm === "pomodoro" ? Math.floor(minutes / 30) : cue && cue.response === "take" ? 1 : 0, planned: [45, 60, 90, 120][i % 4], plan: plans[i % plans.length],
        cue, cues: arm === "halftime" ? 1 : Math.floor(minutes / 30), taken: arm === "pomodoro" ? Math.floor(minutes / 30) : cue && cue.response === "take" ? 1 : 0, finished: ["yes", "mostly", "no", "yes"][i % 4], qa: false });
    }
    localStorage.setItem("ht-study-log", JSON.stringify(log)); localStorage.setItem("ht-study-n", "18");
    localStorage.setItem("ht-arms", JSON.stringify(Array.from({ length: 20 }, (_, k) => (k % 2 ? "pomodoro" : "halftime"))));
    return log.length;
  },
};
true;
