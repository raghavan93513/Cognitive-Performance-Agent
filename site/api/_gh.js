// Google Health API (the route Fitbit data takes since the Fitbit Web API was turned off on 2 Nov 2026).
// Two parts: (1) get a short-lived access token, (2) turn Google's DataPoints into Halftime's small, plain shapes.
// Nothing here stores anything: the access token lives in memory, the readings go straight back to the caller.
//
// Credentials come from env vars only, never from the repo (it is public):
//   GOOGLE_HEALTH_REFRESH_TOKEN + GOOGLE_HEALTH_HELPER_TOKEN   the pair the BINF 4070 course OAuth helper issues
//   GOOGLE_HEALTH_HELPER_URL                                    optional: a different helper
const HELPER = process.env.GOOGLE_HEALTH_HELPER_URL || "https://binf4070-health-oauth-helper-7pw5f3iaiq-ue.a.run.app";
const BASE = "https://health.googleapis.com/v4";
export const hasCreds = () => Boolean(process.env.GOOGLE_HEALTH_REFRESH_TOKEN && process.env.GOOGLE_HEALTH_HELPER_TOKEN);

let TOKEN = { value: "", until: 0 };
export async function accessToken() {
  if (TOKEN.value && Date.now() < TOKEN.until) return TOKEN.value;
  const res = await fetch(HELPER + "/refresh", {
    method: "POST", redirect: "manual", signal: AbortSignal.timeout(30000),
    headers: { Authorization: "Bearer " + process.env.GOOGLE_HEALTH_HELPER_TOKEN, Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: process.env.GOOGLE_HEALTH_REFRESH_TOKEN }),
  });
  if (!res.ok) { const e = new Error("helper " + res.status); e.status = res.status; throw e; } // 400/401: re-authorize; 403: wrong account
  const j = await res.json();
  TOKEN = { value: j.access_token, until: Date.now() + (j.expires_in - 60) * 1000 };
  return TOKEN.value;
}

// One data type, newest first. `pages` caps how far back we go, so one call can never run away.
export async function list(type, { filter = "", pageSize = 1000, pages = 1 } = {}) {
  const token = await accessToken(), out = [];
  let pageToken = "";
  for (let i = 0; i < pages; i++) {
    const q = new URLSearchParams({ pageSize: String(pageSize) });
    if (filter) q.set("filter", filter);
    if (pageToken) q.set("pageToken", pageToken);
    const res = await fetch(`${BASE}/users/me/dataTypes/${type}/dataPoints?${q}`, { headers: { Authorization: "Bearer " + token }, signal: AbortSignal.timeout(30000) });
    if (!res.ok) { const e = new Error(`${type} ${res.status}`); e.status = res.status; throw e; }
    const j = await res.json();
    out.push(...(j.dataPoints || []));
    if (!j.nextPageToken || j.nextPageToken === pageToken) break;
    pageToken = j.nextPageToken;
  }
  return out;
}

/* ---------- Google's shapes → ours (pure functions; tools/site/test-data.mjs checks them) ---------- */
const num = (v) => { const n = typeof v === "string" ? parseFloat(v) : v; return Number.isFinite(n) ? n : null; }; // numbers arrive as strings
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => (d && d.year ? `${d.year}-${pad(d.month)}-${pad(d.day)}` : null);
const offsetSec = (s) => num(String(s || "0").replace("s", "")) || 0;
// physical time + utcOffset → the person's own clock (their local day is what we bucket by)
export const civil = (iso, off) => {
  const t = new Date(Date.parse(iso) + offsetSec(off) * 1000);
  return { date: t.toISOString().slice(0, 10), min: t.getUTCHours() * 60 + t.getUTCMinutes() };
};
export const clock = (min) => { const h = Math.floor(min / 60) % 24, m = Math.round(min % 60); return `${h % 12 || 12}:${pad(m)} ${h < 12 ? "am" : "pm"}`; };

// Sleep sessions → one row per night, keyed by the date the sleep ENDS (Google's own rule). The longest main sleep wins;
// naps are left out. sleepMin is time asleep, not time in bed.
export function nightsFromSleep(points) {
  const by = new Map();
  for (const p of points) {
    const s = p.sleep; if (!s || !s.interval || !s.interval.endTime) continue;
    if (s.metadata && s.metadata.mainSleep === false) continue;
    const a = civil(s.interval.startTime, s.interval.startUtcOffset), b = civil(s.interval.endTime, s.interval.endUtcOffset);
    const inBed = Math.round((Date.parse(s.interval.endTime) - Date.parse(s.interval.startTime)) / 60000);
    const asleep = num(s.summary && s.summary.minutesAsleep);
    const row = { date: b.date, sleepMin: asleep == null ? inBed : asleep, inBedMin: inBed, bed: clock(a.min), wake: clock(b.min), wakeMin: b.min, syncedAt: s.updateTime || s.createTime || null };
    const old = by.get(row.date);
    if (!old || row.sleepMin > old.sleepMin) by.set(row.date, row);
  }
  return [...by.values()].sort((x, y) => (x.date < y.date ? -1 : 1));
}
export const dailyRhr = (points) => Object.fromEntries(points.map((p) => p.dailyRestingHeartRate).filter(Boolean).map((d) => [ymd(d.date), num(d.beatsPerMinute)]).filter(([k, v]) => k && v != null));
// daily HRV is RMSSD in ms, from the main sleep (Google Health reference; confirmed on a Fitbit Air, 2026-11-13)
export const dailyHrv = (points) => Object.fromEntries(points.map((p) => p.dailyHeartRateVariability).filter(Boolean).map((d) => [ymd(d.date), num(d.averageHeartRateVariabilityMilliseconds)]).filter(([k, v]) => k && v != null));
// heart-rate samples → [minuteOfDay, bpm] for one local day, thinned to one reading per 5 minutes (the median of that window)
export function hrDay(points, date) {
  const win = new Map();
  for (const p of points) {
    const h = p.heartRate; if (!h || !h.sampleTime) continue;
    const c = civil(h.sampleTime.physicalTime, h.sampleTime.utcOffset), bpm = num(h.beatsPerMinute);
    if (c.date !== date || bpm == null) continue;
    const k = Math.floor(c.min / 5) * 5; (win.get(k) || win.set(k, []).get(k)).push(bpm);
  }
  return [...win.entries()].sort((a, b) => a[0] - b[0]).map(([m, v]) => { v.sort((a, b) => a - b); return [m, v[v.length >> 1]]; });
}
// steps → total for one local day from ONE source app (two apps can write overlapping steps: choose, never add)
export function stepsDay(points, date) {
  const by = {};
  for (const p of points) {
    const s = p.steps; if (!s || !s.interval) continue;
    const c = civil(s.interval.startTime, s.interval.startUtcOffset); if (c.date !== date) continue;
    const src = (p.dataSource && p.dataSource.application && p.dataSource.application.packageName) || (p.dataSource && p.dataSource.platform) || "unknown";
    by[src] = (by[src] || 0) + (num(s.count) || 0); // a true zero may have no count field
  }
  const pick = Object.entries(by).sort((a, b) => b[1] - a[1])[0];
  return pick ? { total: pick[1], source: pick[0], sources: Object.keys(by).length } : null;
}

// Everything the prototype needs, in one small object. No raw DataPoints leave this function.
export async function snapshot() {
  const [sleep, rhrP, hrvP] = await Promise.all([
    list("sleep", { pageSize: 25, pages: 2 }),                      // the newest ~50 sessions (the API's page limit for sleep is 25)
    list("daily-resting-heart-rate", { pageSize: 60 }),
    list("daily-heart-rate-variability", { pageSize: 60 }),
  ]);
  const rhr = dailyRhr(rhrP), hrv = dailyHrv(hrvP);
  const all = nightsFromSleep(sleep), newest = all[all.length - 1];
  // the 28 days up to the newest night (an account can hold nights from years ago; those say nothing about now)
  const from = newest ? new Date(Date.parse(newest.date + "T00:00:00Z") - 27 * 864e5).toISOString().slice(0, 10) : "";
  const nights = all.filter((n) => n.date >= from).map(({ syncedAt, ...n }) => ({ ...n, rhr: rhr[n.date] ?? null, hrv: hrv[n.date] ?? null }));
  const last = nights[nights.length - 1] || null;
  let hr = [], steps = null, lastReading = null;
  if (last) {
    const next = new Date(Date.parse(last.date + "T00:00:00Z") + 864e5).toISOString().slice(0, 10);
    const [hrP, stP] = await Promise.all([
      list("heart-rate", { filter: `heart_rate.sample_time.civil_time >= "${last.date}" AND heart_rate.sample_time.civil_time < "${next}"`, pageSize: 10000, pages: 3 }),
      list("steps", { filter: `steps.interval.civil_start_time >= "${last.date}" AND steps.interval.civil_start_time < "${next}"`, pageSize: 10000, pages: 2 }),
    ]);
    hr = hrDay(hrP, last.date); steps = stepsDay(stP, last.date);
    const newest = hrP[0] && hrP[0].heartRate && hrP[0].heartRate.sampleTime; // lists come newest first
    if (newest) lastReading = newest.physicalTime;
  }
  const dev = sleep[0] && sleep[0].dataSource && sleep[0].dataSource.device;
  const synced = sleep.map((p) => p.sleep && (p.sleep.updateTime || p.sleep.createTime)).filter(Boolean).sort().pop() || null;
  return {
    device: (dev && dev.displayName) || "Fitbit", via: "Google Health API",
    lastSync: [synced, lastReading].filter(Boolean).sort().pop() || null, // the newest thing Google has from the device
    nights, day: last ? { date: last.date, hr, steps } : null,
    counts: { sleep: sleep.length, restingHeartRate: rhrP.length, hrv: hrvP.length, heartRate: hr.length, nights: nights.length },
  };
}
