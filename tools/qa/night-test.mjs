// Checks for the WHOOP 4.0 reader (site/assets/whoop4.js) and the night calculator (site/assets/night.js).
//   TZ=America/New_York node tools/qa/night-test.mjs
// No network, no Bluetooth: synthetic nights with a known answer, the 5 frames recorded from WHOOP's own app,
// and a fake band that streams stored history (including a connection lost halfway).
import fs from "node:fs";
import vm from "node:vm";
// the files are classic browser scripts (site/ is an ES-module package, so Node can't require them directly)
const load = (rel) => { const m = { exports: {} }; vm.runInThisContext(`(function (module) {${fs.readFileSync(new URL(rel, import.meta.url), "utf8")}\n})`)(m); return m.exports; };
const W = load("../../site/assets/whoop4.js");
const N = load("../../site/assets/night.js");

let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log("FAIL", m); } };
const near = (a, b, tol) => a != null && Math.abs(a - b) <= tol;

// ---------- a seeded random generator
let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

/* one synthetic night at 1 reading per second.
   bed/wake: "HH:MM" (bed before 18:00 means after midnight). rhr = lowest HR asleep, rmssd = target HRV.
   worn: [from, to] as "HH:MM" relative to the evening before (default 21:00 → 10:00). gapMin: an off-wrist gap. */
function night(wakeKey, o = {}) {
  const { bed = "00:40", wake = "06:30", rhr = 54, rmssd = 60, worn = ["21:00", "10:00"], gap = null, awake = 76 } = o;
  const prev = N.addDays(wakeKey, -1);
  const at = (hm, dayKey) => { const [h, m] = hm.split(":").map(Number); const [y, mo, d] = dayKey.split("-").map(Number); return new Date(y, mo - 1, d, h, m).getTime(); };
  const when = (hm) => at(hm, +hm.split(":")[0] >= 18 ? prev : wakeKey);
  const tBed = when(bed), tWake = when(wake), from = when(worn[0]), to = when(worn[1]);
  const out = []; let rr = 60000 / awake;
  const sigma = rmssd / Math.SQRT2;
  for (let t = from; t < to; t += 1000) {
    if (gap && t >= when(gap[0]) && t < when(gap[1])) continue;
    const asleep = t >= tBed && t < tWake;
    let hr;
    // asleep: a quick fall over the first ~15 min, a low point late in the night, a rise toward waking
    if (asleep) { const x = (t - tBed) / (tWake - tBed), m = (t - tBed) / 60000; hr = rhr + 32 * Math.pow(x - 0.6, 2) + 9 * Math.exp(-m / 8) + gauss() * 1.2; }
    else hr = awake + gauss() * 6 + (rnd() < 0.05 ? 15 : 0);
    hr = Math.max(40, Math.min(150, hr));
    const base = 60000 / hr, beats = [];
    let acc = 0;
    while (acc < 1000) { const r = asleep ? base + gauss() * sigma : base + gauss() * 25; beats.push(Math.round(r)); acc += r; }
    out.push({ t: Math.floor(t / 1000), hr: Math.round(hr), rr: asleep ? beats.slice(0, 4) : beats.slice(0, 2) });
    rr = base;
  }
  return out;
}

// ---------- 1. framing: the 5 frames recorded from WHOOP's own app
const REC = [[0, 0x23, [0], "aa0800a823002300ada86a2d"], [1, 0x4c, [0], "aa0800a823014c00f2b5cdce"], [2, 0x22, [0], "aa0800a823022200824df537"], [3, 0x43, [1], "aa0800a823034301c54dd63d"], [4, 0x16, [0], "aa0800a823041600c7c25288"]];
for (const [s, c, p, w] of REC) ok(W.hex(W.frame(s, c, p)) === w, `frame ${c.toString(16)}`);
ok(W.crc8([..."123456789"].map((ch) => ch.charCodeAt(0))) === 0xf4, "crc8 check value");
ok(W.crc32([..."123456789"].map((ch) => ch.charCodeAt(0))) === 0xcbf43926, "crc32 check value");

// band → laptop frames, built the same way the band does
const bandFrame = (type, seq, cmd, data) => { const inner = [type, seq, cmd, ...data], len = inner.length + 4, lb = [len & 255, len >> 8]; return Uint8Array.from([0xaa, ...lb, W.crc8(lb), ...inner, ...W.le32(W.crc32(inner))]); };
const histRec = (t, hr, rr) => bandFrame(0x2f, 5, 0, [10, 0, 0, 0, ...W.le32(t), 0, 0, 1, 0, 0, 0, hr, rr.length, ...rr.flatMap((v) => [v & 255, v >> 8]), ...Array(8 - rr.length * 2).fill(0)]);
{
  const got = []; const feed = W.reassembler((p) => got.push(p));
  const f = histRec(1763100000, 58, [1030, 1012]);
  feed(f.subarray(0, 7)); feed(f.subarray(7)); feed(Uint8Array.from([0, 0, 0, ...f]));
  ok(got.length === 2 && got.every((p) => p.ok), "reassembly across notifications and padding");
  const h = W.decode.historical(got[0].data);
  ok(h && h.t === 1763100000 && h.hr === 58 && h.rr.join() === "1030,1012", "historical record decode " + JSON.stringify(h));
  const bad = Uint8Array.from(f); bad[bad.length - 1] ^= 1; const got2 = []; W.reassembler((p) => got2.push(p))(bad);
  ok(got2.length === 1 && !got2[0].ok, "a corrupted frame is flagged");
}

// ---------- 2. the night calculator
const WAKE = "2026-11-14";
{
  const s = night(WAKE, { bed: "00:40", wake: "06:30", rhr: 54, rmssd: 60 });
  const n = N.computeNight(s, WAKE);
  const hm = (ms) => { const d = new Date(ms); return d.getHours() * 60 + d.getMinutes(); };
  ok(n.ok, "normal night ok " + n.reason);
  ok(near(hm(n.bed), 40, 25), `bed near 00:40, got ${new Date(n.bed).toTimeString().slice(0, 5)}`);
  ok(near(hm(n.wake), 390, 25), `wake near 06:30, got ${new Date(n.wake).toTimeString().slice(0, 5)}`);
  ok(near(n.sleepMin, 350, 40), "sleep length near 5 h 50, got " + n.sleepMin);
  ok(near(n.rhr, 54, 2), "resting HR near 54, got " + n.rhr);
  ok(near(n.hrv, 60, 9), "HRV near 60 ms, got " + n.hrv);
  ok(n.hr5.length > 50 && n.coverage > 0.95, "picture points and coverage");
  ok(n.v === "night-v1" && n.source === "whoop4" && n.confirmed === false, "record labels");
  // the person moves the window: numbers recompute inside it
  const fixed = N.computeNight(s, WAKE, { window: { bed: n.bed + 60 * 60000, wake: n.wake } });
  ok(fixed.ok && fixed.sleepMin === n.sleepMin - 60 && fixed.confirmed, "changed window recomputes");
}
{
  const n = N.computeNight(night(WAKE, { worn: ["23:30", "01:30"] }), WAKE);
  ok(!n.ok && n.reason === "worn", "worn 2 h → not enough data (worn), got " + n.reason);
}
{
  const n = N.computeNight(night(WAKE, { bed: "03:30", wake: "05:40", worn: ["21:00", "10:00"] }), WAKE);
  ok(!n.ok && n.reason === "short", "2 h 10 sleep → not enough data (short), got " + n.reason);
}
{
  const n = N.computeNight(night(WAKE, { gap: ["02:00", "04:30"] }), WAKE);
  ok(!n.ok || n.coverage >= 0.6, "a long off-wrist gap never passes with low coverage");
}
{
  const n = N.computeNight([], WAKE);
  ok(!n.ok && n.reason === "none", "no readings → none");
}
{ // no beat intervals at all: sleep and resting HR still work, HRV says why it's missing
  const s = night(WAKE).map((r) => ({ ...r, rr: [] }));
  const n = N.computeNight(s, WAKE);
  ok(n.ok && n.rhr != null && n.hrv == null && n.hrvReason === "few_beats", "no beats → HRV missing with reason");
}
{ // noisy beats (motion): HRV abstains rather than reporting a wild number
  const s = night(WAKE).map((r) => ({ ...r, rr: r.rr.map((v) => (rnd() < 0.4 ? v + 400 : v)) }));
  const n = N.computeNight(s, WAKE);
  ok(n.ok && (n.hrv == null || n.hrv < 90), "noisy beats → no wild HRV, got " + n.hrv);
}
{ // RMSSD of a known series
  const r = N.windowRmssd([1000, 1010, 1000, 1010, 1000, 1010, 1000, 1010]);
  ok(near(r.rmssd, 10, 0.001) && r.rejected === 0, "RMSSD of an alternating series is 10");
  const r2 = N.windowRmssd([1000, 1005, 1700, 1000, 995]);
  ok(r2.rejected === 1, "an ectopic jump is thrown out");
}

// ---------- 3. your usual
{
  const mk = (d, sleepMin, rhr, hrv) => ({ ok: true, date: d, sleepMin, rhr, hrv, bed: new Date(2026, 10, 1, 0, 20).getTime(), wake: new Date(2026, 10, 1, 7, 20).getTime() });
  const prior = Array.from({ length: 6 }, (_, i) => mk(N.addDays(WAKE, -(i + 1)), 420 + i * 5, 52 + (i % 3), 60 + i));
  let u = N.usual(prior, WAKE);
  ok(u.learning && u.n === 6 && u.sleepMin === null, "6 nights → still learning");
  prior.push(mk(N.addDays(WAKE, -7), 440, 53, 65));
  u = N.usual(prior, WAKE);
  ok(!u.learning && u.sleepMin && u.sleepMin.lo < u.sleepMin.mid && u.sleepMin.hi - u.sleepMin.lo >= 40, "7 nights → a usual with a floor-wide range");
  ok(N.compare(350, u.sleepMin) === "low" && N.compare(u.sleepMin.mid, u.sleepMin) === "usual", "short night reads as low");
  ok(Number.isInteger(u.sleepMin.lo) && Number.isInteger(u.sleepMin.hi), "the usual range is whole minutes");
  ok(N.compare(u.sleepMin.hi + 0.4, u.sleepMin) === "usual" && N.compare(u.sleepMin.hi + 1, u.sleepMin) === "high", "a value shown as the range's edge reads as usual");
  ok(u.bedTod != null && u.wakeTod != null, "usual bed and wake times");
  const old = [...prior, mk(N.addDays(WAKE, -40), 100, 90, 10)];
  ok(N.usual(old, WAKE).n === 7, "nights older than 28 days are left out");
  ok(N.usual(prior, N.addDays(WAKE, -3)).n === 4, "only nights before the date count");
}

// ---------- 4. a fake band streaming stored history
function fakeBand({ batches, dropAfter = Infinity, clock = Math.floor(Date.now() / 1000) }) {
  const listeners = {}, acks = [], writes = [];
  let sent = 0, connected = true;
  const chars = {};
  const device = {
    name: "WHOOP 4C0TEST", gatt: { connected: true, connect: async () => server, disconnect() { connected = false; this.connected = false; (listeners.gattserverdisconnected || []).forEach((f) => f()); } },
    addEventListener(k, f) { (listeners[k] = listeners[k] || []).push(f); }, removeEventListener() {},
  };
  const emit = (k, bytes) => setTimeout(() => { if (!connected) return; (chars[k].l || []).forEach((f) => f({ target: { value: new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength) } })); }, 1);
  const respond = (cmd, data) => emit("response", bandFrame(0x24, 1, cmd, data));
  function sendBatch() {
    if (sent >= batches.length) { emit("data", bandFrame(0x31, 3, 3, [0, 0, 0, 0])); return; }
    if (sent >= dropAfter) { setTimeout(() => device.gatt.disconnect(), 5); return; }
    const b = batches[sent];
    emit("data", bandFrame(0x31, 3, 1, Array(10).fill(0)));
    for (const r of b) emit("data", histRec(r.t, r.hr, r.rr));
    emit("data", bandFrame(0x31, 3, 2, [...Array(10).fill(0), ...W.le32(1000 + sent), 0, 0, 0, 0]));
  }
  const mkChar = (k) => (chars[k] = { properties: { write: true }, l: [], addEventListener(_, f) { this.l.push(f); }, startNotifications: async () => {},
    writeValueWithResponse: async (f) => {
      const p = W.parse(f); writes.push(p.cmd);
      if (p.cmd === 35) respond(35, [0, 0, 0, 0, 0, 0, 0, 0, 0, ..."4C0TEST01".split("").map((c) => c.charCodeAt(0)), ...Array(100).fill(0)]);
      else if (p.cmd === 26) respond(26, [0, 0, 820 & 255, 820 >> 8]);
      else if (p.cmd === 11) respond(11, [0, 0, ...W.le32(clock)]);
      else if (p.cmd === 7) respond(7, [0, 0, 0, ...Array(64).fill(1)]);
      else if (p.cmd === 22) sendBatch();
      else if (p.cmd === 23) { acks.push(Array.from(p.data.slice(1, 5))); sent++; sendBatch(); }
    } });
  const svc = { getCharacteristic: async (u) => chars[Object.keys(W.UUID).find((k) => W.UUID[k] === u)] };
  ["command", "response", "event", "data"].forEach(mkChar);
  const server = { getPrimaryService: async () => svc };
  Object.defineProperty(globalThis, "navigator", { value: { bluetooth: { requestDevice: async () => device, getAvailability: async () => true } }, configurable: true, writable: true });
  Object.defineProperty(globalThis, "isSecureContext", { value: true, configurable: true, writable: true });
  return { acks, writes };
}
const recs = (n, t0) => Array.from({ length: n }, (_, i) => ({ t: t0 + i, hr: 55 + (i % 5), rr: [1000, 1010] }));
{
  const t0 = Math.floor(Date.now() / 1000) - 3600, stored = [];
  const fb = fakeBand({ batches: [recs(50, t0), recs(50, t0 + 50), recs(20, t0 + 100)] });
  const order = [];
  const r = await W.sync({ onBatch: async (b) => { order.push("save"); stored.push(...b); await new Promise((x) => setTimeout(x, 5)); }, quietMs: 3000 });
  ok(r.complete && r.records === 120 && stored.length === 120, `full sync stores everything (${r.records}, ${stored.length})`);
  ok(fb.acks.length === 3, "each batch acknowledged once: " + fb.acks.length);
  ok(r.serial === "4C0TEST01" && r.battery === 82, "band details read " + r.serial + " " + r.battery);
  ok(!fb.writes.includes(10), "clock left alone when it's right");
}
{
  const t0 = Math.floor(Date.now() / 1000) - 3600, stored = [];
  const fb = fakeBand({ batches: [recs(50, t0), recs(50, t0 + 50), recs(50, t0 + 100)], dropAfter: 1 });
  let err = null;
  try { await W.sync({ onBatch: async (b) => { stored.push(...b); }, quietMs: 3000 }); } catch (e) { err = e; }
  ok(err && err.code === "lost" && stored.length === 50 && fb.acks.length === 1, `lost connection keeps the saved batch only (${err && err.code}, ${stored.length})`);
}
{
  const t0 = Math.floor(Date.now() / 1000) - 3600;
  const fb = fakeBand({ batches: [recs(10, t0)] });
  let err = null;
  try { await W.sync({ onBatch: async () => { throw new Error("disk full"); }, quietMs: 3000 }); } catch (e) { err = e; }
  ok(err && fb.acks.length === 0, "a batch that couldn't be saved is never acknowledged");
}
{
  const fb = fakeBand({ batches: [recs(5, 1000)], clock: 5000 });
  const r = await W.sync({ onBatch: async () => {}, quietMs: 3000 });
  ok(r.clockReset && fb.writes.includes(10) && r.dropped === 5 && r.records === 0, "a reset clock is set, and 1970 records are dropped");
}

// ---------- 5. what the study setup reads
{
  const store = {}; globalThis.localStorage = { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } };
  const Nb = load("../../site/assets/night.js");
  ok(Nb.forStudy() === null, "no WHOOP ever → nothing (typed or sample sleep as before)");
  Nb.setMeta({ lastSync: Date.now(), owner: "a" });
  let f = Nb.forStudy(); ok(f && f.fresh === false && /Sync my WHOOP/.test(f.note), "synced before, nothing today → says how to sync");
  const s = night(N.dateKey(new Date()), {}); const n = N.computeNight(s, N.dateKey(new Date())); Nb.saveNight(n);
  f = Nb.forStudy(); ok(f && f.fresh && near(f.sleepH, n.sleepMin / 60, 0.01) && f.source === "whoop4", "today's night → used, labelled WHOOP");
  // the profile isn't known yet (the page defines it after the scripts load): never wipe on that
  await Nb.checkOwner(""); ok(Nb.meta() && Nb.nightsAll().length === 1, "unknown owner → nothing wiped");
  await Nb.checkOwner("a"); ok(Nb.nightsAll().length === 1, "same owner → kept");
  await Nb.checkOwner("b"); ok(!Nb.meta() && Nb.nightsAll().length === 0, "a different person → wiped");
}

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
