/* Halftime: last night, from a WHOOP 4.0's stored heart rate and beat intervals (method "night-v1").
 * Plain code; no language model. Three numbers, each against the person's own usual:
 *   sleep           the longest calm stretch of heart rate between 6 pm and 2 pm, 3 h or more; the person confirms it
 *   resting HR      the lowest 5-minute average heart rate inside that stretch
 *   HRV             RMSSD of the time between beats, in 5-minute windows inside that stretch, averaged (Oura/Fitbit style)
 * "Not enough data" (with the reason) when the band was worn too little, no stretch of 3 h is found, or beats are too few.
 * Usual = the middle of the last 28 valid nights, once there are 7; the range around it is ±0.75 × spread, with a floor.
 * The Algorithm Card: Wiki/Cognitive Perf Agent Wiki/04-agent-engine/night-calculator.md
 *
 * Storage (this browser only; nothing here is sent anywhere):
 *   IndexedDB "halftime-whoop", store "samples" {t, hr, rr[]}: the band's readings, kept 35 days
 *   localStorage "ht-night-nights": the night records; "ht-night-meta": device, last sync, owner
 * Both are cleared by "Delete my data", and when a different person signs in on this browser.
 */
(function (root) {
  "use strict";
  const VERSION = "night-v1";
  const MIN = 60000, H = 60 * MIN;
  const KEEP_DAYS = 35;

  // ---------- helpers
  const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const pctile = (a, p) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.max(0, Math.round(p * (s.length - 1))))]; };
  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const atLocal = (key, h) => { const [y, m, d] = key.split("-").map(Number); return new Date(y, m - 1, d, h, 0, 0, 0).getTime(); };
  const addDays = (key, n) => { const [y, m, d] = key.split("-").map(Number); return dateKey(new Date(y, m - 1, d + n)); };

  // the window a night is looked for in: 6 pm the evening before the wake date, to 2 pm on it
  const windowFor = (wakeKey) => ({ from: atLocal(addDays(wakeKey, -1), 18), to: atLocal(wakeKey, 14) });

  /* minute bins from samples [{t (s), hr, rr[]}] inside [from, to) (ms) */
  function minutes(samples, from, to) {
    const n = Math.round((to - from) / MIN), bins = Array.from({ length: n }, () => ({ hrs: [], rr: [] }));
    for (const s of samples) {
      const i = Math.floor((s.t * 1000 - from) / MIN); if (i < 0 || i >= n) continue;
      if (s.hr != null && s.hr >= 25 && s.hr <= 230) bins[i].hrs.push(s.hr);
      if (s.rr && s.rr.length) for (const r of s.rr) bins[i].rr.push(r);
    }
    return bins.map((b) => ({ hr: b.hrs.length >= 10 ? median(b.hrs) : null, n: b.hrs.length, rr: b.rr }));
  }

  // RMSSD of one window after cleaning: 300–2000 ms, and within 20% of the median of the last 9 kept beats
  function windowRmssd(rr) {
    const kept = []; let rejected = 0;
    for (const r of rr) {
      if (r < 300 || r > 2000) { rejected++; kept.push(null); continue; }
      const recent = kept.filter((x) => x != null).slice(-9), med = recent.length >= 3 ? median(recent) : recent.length ? recent[recent.length - 1] : null;
      if (med != null && Math.abs(r - med) > 0.2 * med) { rejected++; kept.push(null); continue; }
      kept.push(r);
    }
    let ss = 0, pairs = 0;
    for (let i = 1; i < kept.length; i++) if (kept[i] != null && kept[i - 1] != null) { ss += (kept[i] - kept[i - 1]) ** 2; pairs++; }
    const good = kept.filter((x) => x != null).length;
    return { rmssd: pairs ? Math.sqrt(ss / pairs) : null, good, rejected, pairs };
  }

  /* the night for one wake date. opts.window = {bed, wake} (ms) uses that window instead of detecting one (the person changed it) */
  function computeNight(samples, wakeKey, opts = {}) {
    const W = windowFor(wakeKey), bins = minutes(samples, W.from, W.to);
    const worn = bins.filter((b) => b.hr != null).length;
    const base = { v: VERSION, date: wakeKey, source: "whoop4", computedAt: Date.now() };
    if (!opts.window && worn < 180) return { ...base, ok: false, reason: worn ? "worn" : "none", wornMin: worn };

    let bedI, wakeI;
    if (opts.window) {
      bedI = Math.max(0, Math.round((opts.window.bed - W.from) / MIN)); wakeI = Math.min(bins.length, Math.round((opts.window.wake - W.from) / MIN));
    } else {
      // 5-minute rolling median, then "calm" = at or under a personal threshold for this night
      const s5 = bins.map((_, i) => { const w = bins.slice(Math.max(0, i - 2), i + 3).map((b) => b.hr).filter((v) => v != null); return w.length >= 3 ? median(w) : null; });
      const vals = s5.filter((v) => v != null), lo = pctile(vals, 0.1), hi = pctile(vals, 0.9);
      const thr = Math.max(lo + 6, lo + 0.4 * (hi - lo));
      let best = null, start = null, last = null, gap = 0, unworn = 0;
      for (let i = 0; i <= bins.length; i++) {
        const calm = i < bins.length && s5[i] != null && s5[i] <= thr;
        if (calm) { if (start == null) start = i; last = i; gap = 0; unworn = 0; continue; }
        if (start == null) continue;
        gap++; if (i < bins.length && bins[i].hr == null) unworn++;
        if (gap > 20 || unworn > 30 || i === bins.length) { if (!best || last - start > best[1] - best[0]) best = [start, last]; start = null; gap = 0; unworn = 0; }
      }
      if (best) { // heart rate drifts down after falling asleep and up before waking: extend the edges at a looser level
        const loose = lo + 0.6 * (hi - lo);
        while (best[0] > 0 && s5[best[0] - 1] != null && s5[best[0] - 1] <= loose) best[0]--;
        while (best[1] < bins.length - 1 && s5[best[1] + 1] != null && s5[best[1] + 1] <= loose) best[1]++;
      }
      if (!best || best[1] + 1 - best[0] < 180) return { ...base, ok: false, reason: "short", wornMin: worn, longestMin: best ? best[1] + 1 - best[0] : 0 };
      bedI = best[0]; wakeI = best[1] + 1;
    }
    const span = bins.slice(bedI, wakeI), sleepMin = wakeI - bedI;
    const coverage = span.length ? span.filter((b) => b.hr != null).length / span.length : 0;
    const bed = W.from + bedI * MIN, wake = W.from + wakeI * MIN;
    if (sleepMin < 180 || coverage < 0.6) return { ...base, ok: false, reason: sleepMin < 180 ? "short" : "gaps", wornMin: worn, bed, wake, sleepMin, coverage: +coverage.toFixed(2) };

    // resting heart rate: the lowest 5-minute average with at least 4 worn minutes
    let rhr = null, lowAt = null;
    for (let i = 0; i + 5 <= span.length; i++) {
      const w = span.slice(i, i + 5).map((b) => b.hr).filter((v) => v != null);
      if (w.length < 4) continue;
      const m = w.reduce((a, b) => a + b, 0) / w.length;
      if (rhr == null || m < rhr) { rhr = m; lowAt = bed + (i + 2) * MIN; }
    }
    // HRV: 5-minute windows with at least 120 kept beats and at most 20% thrown out; at least 6 windows
    const wins = [];
    for (let i = 0; i + 5 <= span.length; i += 5) {
      const rr = span.slice(i, i + 5).flatMap((b) => b.rr);
      if (rr.length < 60) continue;
      const r = windowRmssd(rr);
      if (r.rmssd != null && r.good >= 120 && r.rejected / (r.good + r.rejected) <= 0.2) wins.push(r.rmssd);
    }
    const hrv = wins.length >= 6 ? wins.reduce((a, b) => a + b, 0) / wins.length : null;
    // the heart-rate line for the picture: one point every 5 minutes
    const hr5 = [];
    for (let i = 0; i < span.length; i += 5) { const w = span.slice(i, i + 5).map((b) => b.hr).filter((v) => v != null); if (w.length) hr5.push([i, Math.round(median(w) * 10) / 10]); }
    const beats = span.reduce((a, b) => a + b.rr.length, 0);
    return { ...base, ok: true, reason: null, bed, wake, sleepMin, coverage: +coverage.toFixed(2), wornMin: worn,
      rhr: rhr == null ? null : Math.round(rhr), lowAt, hrv: hrv == null ? null : Math.round(hrv), hrvWindows: wins.length,
      hrvReason: hrv == null ? (beats < 3000 ? "few_beats" : "noisy") : null, beats, hr5, confirmed: !!opts.window, edited: !!opts.window };
  }

  /* the wake dates the samples could cover: any date whose window holds at least 3 h of readings */
  function wakeDates(samples) {
    if (!samples.length) return [];
    const first = new Date(samples[0].t * 1000), last = new Date(samples[samples.length - 1].t * 1000);
    const out = []; let k = dateKey(first);
    const end = dateKey(new Date(last.getTime() + 24 * H));
    for (let g = 0; g < 60 && k <= end; g++, k = addDays(k, 1)) out.push(k);
    return out;
  }

  /* your usual, from earlier valid nights (28 days back, at least 7) */
  const FLOOR = { sleepMin: 20, rhr: 2, hrv: 5 };
  function usual(nights, wakeKey) {
    const from = addDays(wakeKey, -28), prior = nights.filter((n) => n.ok && n.date < wakeKey && n.date >= from);
    const out = { n: prior.length, learning: prior.length < 7, need: 7 };
    for (const k of ["sleepMin", "rhr", "hrv"]) {
      const v = prior.map((n) => n[k]).filter((x) => x != null);
      if (v.length < 7) { out[k] = null; continue; }
      const m = median(v), mad = median(v.map((x) => Math.abs(x - m))) * 1.4826, half = Math.max(0.75 * mad, FLOOR[k]);
      // whole numbers (minutes, bpm, ms), so the words and the "usual" label shown on screen always agree
      out[k] = { mid: m, lo: Math.round(m - half), hi: Math.round(m + half), n: v.length };
    }
    // the usual bed and wake times, as minutes after midnight (bedtimes before midnight are negative)
    const tod = (ms) => { const d = new Date(ms), m = d.getHours() * 60 + d.getMinutes(); return m > 14 * 60 ? m - 1440 : m; };
    if (prior.length >= 7) { out.bedTod = median(prior.map((n) => tod(n.bed))); out.wakeTod = median(prior.map((n) => tod(n.wake))); }
    return out;
  }
  const compare = (v, u) => { if (v == null || !u) return null; v = Math.round(v); return v < u.lo ? "low" : v > u.hi ? "high" : "usual"; };

  // ---------- storage (browser only)
  const DB = "halftime-whoop", STORE = "samples";
  const ls = {
    get(k, d) { try { const v = root.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { root.localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
    del(k) { try { root.localStorage.removeItem(k); } catch {} },
  };
  let dbP = null;
  function db() {
    if (!root.indexedDB) return Promise.reject(new Error("no IndexedDB"));
    return dbP || (dbP = new Promise((res, rej) => {
      const r = root.indexedDB.open(DB, 1);
      r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE, { keyPath: "t" }); };
      r.onsuccess = () => { const d = r.result; d.onversionchange = () => { d.close(); dbP = null; }; res(d); };
      r.onerror = () => { dbP = null; rej(r.error); };
      r.onblocked = () => { dbP = null; rej(new Error("blocked")); };
    }));
  }
  const tx = (mode, fn) => db().then((d) => new Promise((res, rej) => { const t = d.transaction(STORE, mode), st = t.objectStore(STORE); const out = fn(st); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error || new Error("abort")); }));
  const putSamples = (recs) => tx("readwrite", (st) => { for (const r of recs) st.put({ t: r.t, hr: r.hr, rr: r.rr || [] }); });
  const range = (fromS, toS) => tx("readonly", (st) => st.getAll(IDBKeyRange.bound(fromS, toS)));
  const prune = () => tx("readwrite", (st) => st.delete(IDBKeyRange.upperBound(Math.floor(Date.now() / 1000) - KEEP_DAYS * 86400)));
  const countAll = () => tx("readonly", (st) => st.count());
  function wipeDb() {
    return new Promise((res) => {
      const go = () => { try { const r = root.indexedDB.deleteDatabase(DB); r.onsuccess = r.onerror = r.onblocked = () => res(); } catch { res(); } };
      if (dbP) dbP.then((d) => { d.close(); dbP = null; go(); }, () => { dbP = null; go(); }); else go();
    });
  }

  const nightsAll = () => ls.get("ht-night-nights", []);
  const meta = () => ls.get("ht-night-meta", null);
  function saveNight(n) {
    const all = nightsAll().filter((x) => x.date !== n.date); all.push(n); all.sort((a, b) => (a.date < b.date ? -1 : 1));
    return ls.set("ht-night-nights", all.slice(-60));
  }

  /* after a sync: recompute every night the new readings touch (a night the person confirmed keeps its window) */
  async function recompute(newRecs) {
    if (!newRecs || !newRecs.length) return [];
    const sorted = [...newRecs].sort((a, b) => a.t - b.t), keys = wakeDates(sorted), old = nightsAll(), done = [];
    const now = new Date(), today = dateKey(now);
    for (const k of keys) {
      if (k > today) continue;                       // a night that hasn't happened yet
      if (k === today && now.getHours() < 4) continue; // tonight is still going: wait for the morning
      const W = windowFor(k), samples = await range(Math.floor(W.from / 1000), Math.ceil(W.to / 1000));
      if (!samples.length) continue;
      const prev = old.find((n) => n.date === k);
      const n = prev && prev.confirmed && prev.bed ? computeNight(samples, k, { window: { bed: prev.bed, wake: prev.wake } }) : computeNight(samples, k);
      if (!n.ok && n.reason === "none") continue;
      if (prev && prev.confirmed && n.ok) { n.confirmed = true; n.edited = !!prev.edited; }
      saveNight(n); done.push(n);
    }
    return done;
  }
  /* the person changed (or confirmed) the window */
  async function setWindow(wakeKey, bed, wake) {
    const W = windowFor(wakeKey), samples = await range(Math.floor(Math.min(W.from, bed) / 1000), Math.ceil(Math.max(W.to, wake) / 1000));
    const n = computeNight(samples, wakeKey, { window: { bed, wake } });
    n.confirmed = true; n.edited = true; saveNight(n); return n;
  }
  function confirm(wakeKey) { const all = nightsAll(), n = all.find((x) => x.date === wakeKey); if (!n) return null; n.confirmed = true; ls.set("ht-night-nights", all); return n; }

  // a different person on this browser starts clean (same owner rule as the study sessions)
  async function checkOwner(owner) {
    if (!owner) return; // who is signed in isn't known yet: never wipe on that
    const m = meta();
    if (m && m.owner && m.owner !== owner) await forget();
    const now = meta(); if (now && !now.owner) ls.set("ht-night-meta", { ...now, owner });
  }
  async function forget() { ls.del("ht-night-nights"); ls.del("ht-night-meta"); await wipeDb(); }

  /* what the study setup reads: last night's sleep from the WHOOP, or why there isn't one */
  const clockText = (ms) => new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?([AP])M/i, (m, a) => " " + a.toLowerCase() + "m");
  function forStudy(now = Date.now()) {
    const m = meta(); if (!m) return null;
    const today = dateKey(new Date(now)), n = nightsAll().find((x) => x.date === today);
    const lastSync = m.lastSync ? new Date(m.lastSync).toLocaleDateString([], { weekday: "short" }) + " " + clockText(m.lastSync) : "never";
    const baseW = { mode: "live", device: "WHOOP 4.0", short: "WHOOP", via: "read from your WHOOP 4.0 over Bluetooth", lastSync, source: "whoop4" };
    if (n && n.ok) return { ...baseW, fresh: true, sleepMin: n.sleepMin, sleepH: n.sleepMin / 60, bed: clockText(n.bed), wake: clockText(n.wake), confirmed: !!n.confirmed };
    return { ...baseW, fresh: false, note: n ? "Halftime didn't get enough from your WHOOP for last night." : "Last night isn't synced yet. Open the Night tab on your laptop and press Sync my WHOOP." };
  }

  const api = { VERSION, atLocal, computeNight, usual, compare, windowFor, wakeDates, dateKey, addDays, windowRmssd, minutes,
    putSamples, range, prune, countAll, recompute, setWindow, confirm, nightsAll, meta, setMeta: (m) => ls.set("ht-night-meta", m), saveNight, forget, checkOwner, forStudy, clockText };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.HalftimeNight = api;
})(typeof window !== "undefined" ? window : globalThis);
