// Pure accounting for one Halftime session: no browser APIs, so test/tally.test.mjs runs it in Node.
// Every moment of a session falls in exactly one of four buckets:
//   picked  - the focused browser window's front tab is on a site the tester picked
//   other   - a browser tab is in front but it isn't a picked site (Canvas, Docs, Gmail, the Halftime tab…; we never learn which)
//   outside - no browser window is in front: another app is (Word, Zoom, a game…; we never learn which)
//   away    - the screen is locked
// For "picked" it also keeps minutes per picked site. Those stay on this laptop for the student's own view;
// Halftime only ever gets the four bucket totals.

export const UNIT_MS = 60000; // what one reported "minute" is (the local test build sets 1000 so a test runs in seconds)
export const MAX_MIN = 360; // a session the page never ends stops counting after 6 h (study.js caps sessions at 360 min)
export const BUCKETS = ["picked", "other", "outside", "away"];

// host = a tab's hostname; picks = the domains the tester picked. Returns the picked domain it matches, or null.
// "www.instagram.com" matches "instagram.com"; "box.com" doesn't match "x.com".
export function matchPick(host, picks) {
  const h = String(host || "").toLowerCase().replace(/\.$/, "");
  if (!h) return null;
  return picks.find((d) => h === d || h.endsWith("." + d)) || null;
}
export const matches = (host, picks) => matchPick(host, picks) != null;

export function start(now, id, maxMin) {
  const m = Math.min(Number(maxMin) > 0 ? Number(maxMin) : MAX_MIN, MAX_MIN);
  return { id, startAt: now, endBy: now + m * 60000, ms: { picked: 0, other: 0, outside: 0, away: 0 }, sites: {}, cur: null, since: null };
}

// where = { bucket, site? } (site only for "picked"). Call whenever it may have changed; repeats are harmless.
// Counting stops at endBy whatever happens.
export function observe(s, now, where) {
  if (!s) return s;
  if (s.cur && s.since != null) {
    const d = Math.max(0, Math.min(now, s.endBy) - s.since);
    s.ms[s.cur.bucket] += d;
    if (s.cur.bucket === "picked" && s.cur.site) s.sites[s.cur.site] = (s.sites[s.cur.site] || 0) + d;
  }
  if (where && now < s.endBy) { s.cur = { bucket: where.bucket, ...(where.bucket === "picked" && where.site ? { site: where.site } : {}) }; s.since = now; }
  else { s.cur = null; s.since = null; }
  return s;
}

// Drop the open stretch without counting it (after a browser restart the gap can't be trusted).
export function forgetOpen(s) { if (s) { s.cur = null; s.since = null; } return s; }

// Counted so far, including the open stretch, without changing the session.
export function snapshot(s, now) {
  if (!s) return null;
  const c = observe({ ...s, ms: { ...s.ms }, sites: { ...s.sites } }, now, null);
  return { ms: c.ms, sites: c.sites };
}

const toMin = (ms) => Math.round(ms / UNIT_MS);

// Close the session. `share` is everything Halftime may get (four whole-minute totals, no sites);
// `local` adds minutes per picked site for the student's own view on this laptop.
export function finish(s, now) {
  observe(s, now, null);
  const share = { picked_min: toMin(s.ms.picked), other_min: toMin(s.ms.other), outside_min: toMin(s.ms.outside), away_min: toMin(s.ms.away) };
  const sites = {};
  for (const [d, ms] of Object.entries(s.sites)) sites[d] = toMin(ms);
  return { share, local: { ...share, sites } };
}
