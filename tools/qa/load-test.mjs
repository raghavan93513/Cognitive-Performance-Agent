#!/usr/bin/env node
// Load test: N people using the site at once, at the HTTP level (each phone's own rendering doesn't depend on
// anyone else, so the shared parts are what can slow down: Vercel's edge for pages and files, and the analytics
// path /api/collect → Supabase).
//
//   node tools/qa/load-test.mjs --url=https://halftime-study.vercel.app --users=50 --minutes=3
//
// Each virtual person: opens the landing page and its files, /start, then /app and its files (like a phone), then sends
// analytics batches the way site/assets/track.js does (about every 15 s, retrying with backoff on 503). Batches are
// marked test:true, so they are stored with test = true and the admin page hides them unless "Load tests" is ticked.
// Prints page and asset latency (p50, p95, max), errors, analytics delivery and latency.

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const BASE = arg("url", "http://127.0.0.1:3007").replace(/\/$/, "");
const USERS = +arg("users", 50), MINUTES = +arg("minutes", 3), RAMP = +arg("ramp", 10); // ramp: seconds over which people arrive
const run = Date.now().toString(36);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pct = (a, p) => { if (!a.length) return 0; const s = [...a].sort((x, y) => x - y); return Math.round(s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]); };
const stats = { page: [], asset: [], collect: [], errors: [], status: {}, sent: 0, stored: 0, retries: 0, gaveUp: 0 };

async function timed(kind, path, opts) {
  const t = performance.now();
  try {
    const r = await fetch(BASE + path, opts);
    const body = await r.text();
    const ms = performance.now() - t;
    stats.status[r.status] = (stats.status[r.status] || 0) + 1;
    if (kind !== "collect" && !r.ok) stats.errors.push(`${r.status} ${path}`);
    stats[kind].push(ms);
    return { r, body, ms };
  } catch (e) { stats.errors.push(`${kind} ${path}: ${e.message}`); return null; }
}
const assetsOf = (html) => [...html.matchAll(/(?:src|href)="(\/[^"#?]+\.(?:js|css|svg|png|jpg|woff2))"/g)].map((m) => m[1]);

function batch(v, n) {
  const ev = [];
  for (let i = 0; i < n; i++) ev.push({ t: new Date().toISOString(), seq: ++v.seq, visitor: v.id, session: v.sid, name: `load-${v.i}`, device: "phone", os: "iOS", browser: "Safari",
    screen: "390x844@3", viewport: "390x844", event: ["tap", "scroll_depth", "screen_view", "attention", "movement"][i % 5], page: "/app", state: "idle", target: "button#x", x: 100, y: 200,
    scroll: 40, dwell: 1200, value: "", ref: "", extra: i % 5 === 4 ? JSON.stringify({ path: Array.from({ length: 30 }, (_, k) => [k * 3, k * 5, k * 300]) }) : "" });
  return ev;
}

async function person(i) {
  const v = { i, id: `loadtest-${run}-${i}`, sid: `s-${run}-${i}`, seq: 0 };
  await sleep((RAMP * 1000 * i) / USERS);
  for (const path of ["/", "/start", "/app"]) {
    const p = await timed("page", path, { headers: { "user-agent": "halftime-load-test (iPhone)" } });
    if (p) await Promise.all(assetsOf(p.body).map((a) => timed("asset", a)));
    await sleep(1500 + (i % 7) * 300);
  }
  const end = Date.now() + MINUTES * 60000;
  let queue = [], backoff = 0;
  while (Date.now() < end) {
    queue.push(...batch(v, 12 + (i % 9))); // ~12-20 events per 15 s, like a person tapping and scrolling
    const send = queue.splice(0, 150);
    stats.sent += send.length;
    const res = await timed("collect", "/api/collect", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ events: send, test: true }) });
    let ok = false;
    if (res && res.r.ok) { try { const j = JSON.parse(res.body); ok = true; stats.stored += typeof j.stored === "number" ? j.stored : 0; } catch { ok = true; } }
    if (!ok) { stats.sent -= send.length; queue.unshift(...send); stats.retries++; backoff = Math.min(3, backoff + 1); } else backoff = 0;
    await sleep(15000 * (1 << backoff) + (i % 5) * 400);
  }
  if (queue.length) { stats.gaveUp += queue.length; }
}

const t0 = Date.now();
console.log(`${USERS} people on ${BASE} for ${MINUTES} min (arriving over ${RAMP} s), run ${run}`);
await Promise.all(Array.from({ length: USERS }, (_, i) => person(i)));
const line = (k) => `${k.padEnd(8)} n=${String(stats[k].length).padStart(5)}  p50 ${String(pct(stats[k], 50)).padStart(5)} ms  p95 ${String(pct(stats[k], 95)).padStart(5)} ms  max ${String(pct(stats[k], 100)).padStart(5)} ms`;
console.log(line("page")); console.log(line("asset")); console.log(line("collect"));
console.log("status codes", JSON.stringify(stats.status));
console.log(`analytics: ${stats.sent} events delivered (${stats.stored} stored), ${stats.retries} batches retried, ${stats.gaveUp} still queued at the end`);
console.log(`errors: ${stats.errors.length}`, stats.errors.slice(0, 8));
console.log(`took ${Math.round((Date.now() - t0) / 1000)} s · run id ${run} (load-test rows have visitor ids loadtest-${run}-*)`);
