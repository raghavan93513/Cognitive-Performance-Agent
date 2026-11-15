// Checks the data layer (site/assets/halftime-data.js) and the Google Health reader (site/api/_gh.js). No network.
//   node tools/site/test-data.mjs
// Every fixture below is made up. Never paste real readings into this file: the repo is public.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { nightsFromSleep, dailyRhr, dailyHrv, hrDay, stepsDay, civil } from "../../site/api/_gh.js";

const SITE = join(dirname(fileURLToPath(import.meta.url)), "../../site");
const win = {}; win.window = win; vm.createContext(win);
for (const f of ["assets/demo-data.js", "assets/halftime-data.js"]) vm.runInContext(readFileSync(join(SITE, f), "utf8"), win, { filename: f });
const HD = win.HalftimeData;
const B = (o) => JSON.parse(JSON.stringify(HD.build(o))); // plain copies: objects made inside vm fail strict equality otherwise
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("  ok  " + name); };

console.log("data layer");
ok("the sample afternoon suggests a short walk, for the reasons the phone app shows", () => {
  const s = B({ role: "student", device: "fitbit" }), d = s.decision;
  assert.equal(d.action, "walk"); assert.equal(d.headline, "Short walk now?");
  assert.equal(s.features.sessionMin, 160); assert.equal(s.features.switches20, 14); assert.equal(s.features.sleepMin, 310); assert.equal(s.features.minutesToNext, 45);
  assert.deepEqual(d.reasons.map((r) => r.value), ["2 h 40 min", "14 / 20 min", "5 h 10 min", "Chem lab 4:30"]);
  assert.match(d.sub, /back by 3:50/); assert.equal(d.sure.tag, "Early read");
});
ok("the same seed gives the same afternoon", () => assert.deepEqual(B({}).sources.laptop.switches, B({}).sources.laptop.switches));
ok("spans cover the session with no gaps, and every switch changes the category", () => {
  const L = B({}).sources.laptop;
  assert.equal(L.spans[0].s, L.session.start); assert.equal(L.spans.at(-1).e, L.session.now); assert.equal(L.spans.length, L.switches.length + 1);
  L.spans.forEach((sp, i) => { if (i) { assert.equal(sp.s, L.spans[i - 1].e); assert.notEqual(sp.cat, L.spans[i - 1].cat); } });
});
ok("no watch: sleep is left out and said so; the walk still stands on laptop + calendar", () => {
  const d = B({ device: "" }).decision;
  assert.equal(d.action, "walk"); assert.ok(!d.reasons.some((r) => r.lane === "watch")); assert.match(d.left[0], /No watch or ring/);
});
ok("watch not synced: sleep is left out, never guessed", () => {
  const s = B({ device: "oura", watch: "stale" });
  assert.equal(s.features.sleepMin, null); assert.match(s.decision.left[0], /hasn't synced since yesterday/); assert.equal(s.sources.watch.hr.length, 0);
});
ok("12 minutes in: not enough data, not a small number", () => {
  const s = B({ moment: "early" });
  assert.equal(s.decision.action, "abstain"); assert.equal(s.features.switches20, null); assert.equal(s.decision.reasons.length, 0);
});
ok("a usual-looking session: keep going", () => {
  const s = B({ moment: "calm" });
  assert.equal(s.features.sessionMin, 50); assert.equal(s.features.switches20, 6); assert.equal(s.decision.action, "continue");
});
ok("athlete day: the next stop comes from the calendar", () => assert.match(B({ role: "athlete" }).decision.reasons.at(-1).value, /Team lift 4:30/));
ok("phone pickups are context only, never a reason", () => {
  const d = B({}).decision; assert.ok(!d.used.includes("phone")); assert.ok(d.context.some((c) => c.lane === "phone"));
});
ok("every record names its source and whether it is sample or live", () => {
  const s = B({}); assert.ok(s.records.length > 150);
  assert.ok(s.records.every((r) => r.source && r.metric && r.at && (r.mode === "sample" || r.mode === "live")));
});

console.log("live watch (made-up /api/health answers)");
const night = (date, sleepMin, rhr, hrv) => ({ date, sleepMin, inBedMin: sleepMin + 30, bed: "12:10 am", wake: "7:00 am", rhr, hrv });
const days = (endIso, k) => Array.from({ length: k }, (_, i) => new Date(Date.parse(endIso + "T00:00:00Z") - (k - 1 - i) * 864e5).toISOString().slice(0, 10));
ok("synced this morning, 20 nights: sleep counts, against the person's own median", () => {
  const live = { connected: true, device: "Fitbit Air", lastSync: "2026-11-05T12:00:00Z", nights: days("2026-11-05", 20).map((d, i) => night(d, i === 19 ? 300 : 420 + (i % 3) * 10, 58, 45.4)), day: { date: "2026-11-05", hr: [[800, 70]] } };
  const s = B({ live, today: new Date("2026-11-05T20:00:00Z") });
  assert.equal(s.sources.watch.mode, "live"); assert.equal(s.sources.watch.stale, false); assert.equal(s.features.sleepMin, 300);
  assert.equal(s.sources.watch.usual.n, 20); assert.equal(s.decision.reasons.find((r) => r.lane === "watch").flag, true);
});
ok("last synced weeks ago: live but stale, so sleep is left out and the date is shown", () => {
  const live = { connected: true, device: "Fitbit Air", lastSync: "2026-10-02T16:54:58Z", nights: days("2026-10-02", 6).map((d) => night(d, 300, 70, 60)), day: { date: "2026-10-02", hr: [[800, 90]] } };
  const s = B({ live, today: new Date("2026-11-13T15:00:00Z") });
  assert.equal(s.sources.watch.stale, true); assert.equal(s.features.sleepMin, null); assert.equal(s.sources.watch.hr.length, 0);
  assert.match(s.decision.left[0], /Fitbit Air hasn't synced since Oct 2/); assert.deepEqual({ ...s.sources.watch.learning }, { have: 6, need: 14 });
});
ok("fresh but only 6 nights: sleep is shown, not counted", () => {
  const live = { connected: true, device: "Fitbit Air", lastSync: "2026-11-05T12:00:00Z", nights: days("2026-11-05", 6).map((d) => night(d, 240, 70, 60)) };
  const s = B({ live, today: new Date("2026-11-05T20:00:00Z") });
  assert.equal(s.sources.watch.usual, null); assert.equal(s.decision.reasons.find((r) => r.lane === "watch").flag, false); assert.match(s.decision.left[0], /6 of 14 nights/);
});
ok("asking for the sample watch wins over a live answer", () => assert.equal(B({ watch: "sample", live: { connected: true, nights: [] } }).sources.watch.mode, "sample"));

console.log("watchNow (what the phone's study mode asks)");
const answer = async (body) => { win.fetch = async () => ({ ok: true, json: async () => body }); return JSON.parse(JSON.stringify(await HD.watchNow(true))); };
const iso = (back) => new Date(Date.now() - back * 864e5).toISOString().slice(0, 10);
await (async () => {
  const none = await answer({ ok: true, connected: false, reason: "local_only" });
  ok("no live watch here: keep the sample or typed sleep", () => assert.deepEqual(none, { mode: "sample", reason: "local_only" }));
  const fresh = await answer({ connected: true, device: "Fitbit Air", lastSync: new Date().toISOString(), nights: [night(iso(1), 400, 60, 50), night(iso(0), 315, 62, 44.6)] });
  ok("synced today: last night's sleep, from the watch", () => { assert.equal(fresh.mode, "live"); assert.equal(fresh.fresh, true); assert.equal(fresh.sleepH, 5.3); assert.equal(fresh.sleepText, "5 h 15 min"); assert.equal(fresh.device, "Fitbit Air"); });
  const old = await answer({ connected: true, device: "Fitbit Air", lastSync: "2026-10-02T16:54:58Z", nights: [night("2026-10-02", 244, 72, 63.7)] });
  ok("not synced: no sleep number is offered, only the date it last synced", () => { assert.equal(old.fresh, false); assert.equal(old.sleepH, null); assert.equal(old.lastSync, "Oct 2"); });
})();

console.log("Google Health reader");
const sleepPt = (start, end, asleep, main = true) => ({ sleep: { interval: { startTime: start, startUtcOffset: "-14400s", endTime: end, endUtcOffset: "-14400s" }, metadata: { mainSleep: main }, summary: { minutesAsleep: String(asleep) } } });
ok("times become the person's own clock", () => assert.deepEqual(civil("2026-09-11T03:55:00Z", "-14400s"), { date: "2026-09-10", min: 23 * 60 + 55 }));
ok("sleep is keyed by the day it ends; the longest main sleep wins; naps are left out", () => {
  const nights = nightsFromSleep([sleepPt("2026-09-10T03:48:00Z", "2026-09-10T11:12:00Z", 401), sleepPt("2026-09-10T18:00:00Z", "2026-09-10T18:40:00Z", 35, false), sleepPt("2026-09-11T05:00:00Z", "2026-09-11T10:00:00Z", 270)]);
  assert.deepEqual(nights.map((x) => [x.date, x.sleepMin, x.bed, x.wake]), [["2026-09-10", 401, "11:48 pm", "7:12 am"], ["2026-09-11", 270, "1:00 am", "6:00 am"]]);
});
ok("numbers that arrive as strings are read as numbers", () => {
  assert.deepEqual(dailyRhr([{ dailyRestingHeartRate: { date: { year: 2026, month: 9, day: 10 }, beatsPerMinute: "58" } }]), { "2026-09-10": 58 });
  assert.deepEqual(dailyHrv([{ dailyHeartRateVariability: { date: { year: 2026, month: 9, day: 10 }, averageHeartRateVariabilityMilliseconds: 44.5 } }]), { "2026-09-10": 44.5 });
});
ok("heart rate thins to one reading per 5 minutes, for one local day only", () => {
  const hr = (t, bpm) => ({ heartRate: { sampleTime: { physicalTime: t, utcOffset: "-14400s" }, beatsPerMinute: String(bpm) } });
  assert.deepEqual(hrDay([hr("2026-09-10T17:01:00Z", 70), hr("2026-09-10T17:02:00Z", 90), hr("2026-09-10T17:03:00Z", 74), hr("2026-09-11T05:00:00Z", 60)], "2026-09-10"), [[13 * 60, 74]]);
});
ok("steps come from one source app; two apps are never added together", () => {
  const st = (pkg, count) => ({ dataSource: { application: { packageName: pkg } }, steps: { interval: { startTime: "2026-09-10T17:00:00Z", startUtcOffset: "-14400s" }, ...(count == null ? {} : { count: String(count) }) } });
  assert.deepEqual(stepsDay([st("com.google.fitbit", 120), st("com.google.fitbit", null), st("com.other", 110)], "2026-09-10"), { total: 120, source: "com.google.fitbit", sources: 2 });
  assert.equal(stepsDay([], "2026-09-10"), null);
});
console.log(`\n${n} checks passed`);
