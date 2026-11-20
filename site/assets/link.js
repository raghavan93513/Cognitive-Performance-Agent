/* Halftime: the link between last night and today's studying (method "link-v0", added 2026-11-16 for /v2).
 * Plain code; no language model. It compares, it doesn't score:
 *   a night        sleep minutes for one wake date (typed by the person, or from a WHOOP synced in this browser)
 *   a study day    the sessions that started between 5 am that day and 5 am the next (so 1 am counts as the day before)
 *   kept minutes   minutes on the study timer (breaks left out), shown against the minutes planned
 *   usual          the middle night of the 28 days before, once there are 7 of them
 *   shorter night  45 minutes or more under your usual
 * The comparison shows only when it has enough to rest on (NEED_NIGHTS nights logged, NEED_DAYS study days that
 * follow a night with a usual, and at least 2 days on each side). It always says how many nights it rests on and
 * that it could be chance. Until then it says how far along it is ("Learning you: night 4 of 7").
 * Thresholds are proposals for the team (declutter brief, item 3: "when the link may first show").
 */
(function (root) {
  "use strict";
  const VERSION = "link-v0";
  const NEED_NIGHTS = 7, NEED_DAYS = 5, MIN_SIDE = 2, SHORT_BY = 45, LOOKBACK = 28, DAY_START_H = 5;

  const pad = (n) => String(n).padStart(2, "0");
  const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (key, n) => { const [y, m, d] = key.split("-").map(Number); return dateKey(new Date(y, m - 1, d + n)); };
  // the study day a moment belongs to: before 5 am it is still the day before
  const dayOf = (ms) => dateKey(new Date(ms - DAY_START_H * 3600000));
  const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y), m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
  const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);

  /* the usual night before a wake date: the middle of the nights in the 28 days before it, once there are 7 */
  function usual(nights, key) {
    const from = addDays(key, -LOOKBACK);
    const prior = nights.filter((n) => n.sleepMin != null && n.date < key && n.date >= from).map((n) => n.sleepMin);
    return { n: prior.length, need: NEED_NIGHTS, mid: prior.length >= NEED_NIGHTS ? median(prior) : null };
  }

  /* how one night compares with the usual: words a tired student reads at a glance (no colours, no verdicts) */
  function nightWords(sleepMin, u) {
    if (sleepMin == null) return null;
    if (!u || u.mid == null) return { kind: "learning", text: `Learning your usual: night ${Math.min(u ? u.n + 1 : 1, NEED_NIGHTS)} of ${NEED_NIGHTS}.` };
    const d = Math.round(sleepMin - u.mid), a = Math.abs(d);
    const usualTxt = hm(u.mid);
    if (a < 20) return { kind: "usual", diff: d, text: `About your usual (${usualTxt}).` };
    return { kind: d < 0 ? "less" : "more", diff: d, short: d <= -SHORT_BY, text: `${hm(a)} ${d < 0 ? "less" : "more"} than your usual ${usualTxt}.` };
  }
  // non-breaking spaces, so "7 h 02 min" never wraps in the middle
  const hm = (min) => { min = Math.round(min); const h = Math.floor(min / 60), m = min % 60; return h ? `${h}\u00a0h${m ? "\u00a0" + pad(m) + "\u00a0min" : ""}` : `${m}\u00a0min`; };

  /* sessions: [{startAt, minutes, planned, qa}] (minutes = kept, on the timer) · nights: [{date, sleepMin}] */
  function compute({ nights = [], sessions = [], now = Date.now() } = {}) {
    nights = nights.filter((n) => n && n.date && n.sleepMin != null).sort((a, b) => (a.date < b.date ? -1 : 1));
    const real = sessions.filter((s) => s && !s.qa && s.minutes != null && s.planned);
    const byDay = new Map();
    for (const s of real) { const k = dayOf(s.startAt); if (!byDay.has(k)) byDay.set(k, []); byDay.get(k).push(s); }
    const pairs = [];
    for (const n of nights) {
      const day = byDay.get(n.date); if (!day) continue;
      const u = usual(nights, n.date); if (u.mid == null) continue;
      pairs.push({ date: n.date, sleepMin: n.sleepMin, usualMin: u.mid, short: n.sleepMin <= u.mid - SHORT_BY,
        kept: mean(day.map((s) => Math.min(s.minutes, s.planned))), planned: mean(day.map((s) => s.planned)), sessions: day.length });
    }
    const shortP = pairs.filter((p) => p.short), usualP = pairs.filter((p) => !p.short);
    const side = (list) => ({ n: list.length, kept: list.length ? Math.round(mean(list.map((p) => p.kept))) : null, planned: list.length ? Math.round(mean(list.map((p) => p.planned))) : null });
    const out = { v: VERSION, nightsN: nights.length, needNights: NEED_NIGHTS, daysN: pairs.length, needDays: NEED_DAYS, sessionsN: real.length,
      pairs, shorter: side(shortP), usualSide: side(usualP), today: dayOf(now) };
    const enough = nights.length >= NEED_NIGHTS && pairs.length >= NEED_DAYS;
    if (!enough) {
      out.state = "learning";
      out.progress = nights.length < NEED_NIGHTS
        ? { what: "night", have: nights.length, need: NEED_NIGHTS, text: `Learning you: night ${Math.max(nights.length, 0)} of ${NEED_NIGHTS}.` }
        : { what: "day", have: pairs.length, need: NEED_DAYS, text: `Learning you: study day ${pairs.length} of ${NEED_DAYS} after a logged night.` };
      out.sentence = out.progress.text + (nights.length < NEED_NIGHTS ? " Log your sleep and study, and the link shows up here." : " Study on days you've logged your sleep.");
      return out;
    }
    if (shortP.length < MIN_SIDE || usualP.length < MIN_SIDE) {
      out.state = "one_side";
      out.sentence = shortP.length < MIN_SIDE
        ? `Your ${pairs.length} logged study days followed nights close to your usual, so there's nothing to compare yet. That's good news, not missing data.`
        : `Most of your ${pairs.length} logged study days followed a shorter night, so there aren't enough usual nights to compare with yet.`;
      return out;
    }
    out.state = "ready";
    const s = out.shorter, u = out.usualSide;
    out.sentence = `After your ${s.n} shorter night${s.n === 1 ? "" : "s"} you kept ${s.kept} of ${s.planned} min; after usual nights, ${u.kept} of ${u.planned}. ${pairs.length} nights, so this could be chance.`;
    out.diff = (u.kept / u.planned - s.kept / s.planned);
    return out;
  }

  const api = { VERSION, NEED_NIGHTS, NEED_DAYS, SHORT_BY, compute, usual, nightWords, dayOf, dateKey, addDays, hm, median };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.HalftimeLink = api;
})(typeof window !== "undefined" ? window : globalThis);
