// Route B spike tests. Synthetic events only (no real person's data).
//   node tools/spikes/phone-use/minutes-test.mjs
import assert from "node:assert/strict";
import { pullMinutes } from "./minutes.mjs";
import { start } from "./pull-endpoint.mjs";

const M = 60000, T0 = Date.UTC(2026, 10, 16, 14, 0); // synthetic session 14:00–14:50 UTC
const S = { start: T0, end: T0 + 50 * M };
const at = (min, kind) => ({ t: T0 + min * M, kind });
let n = 0;
const ok = (name, fn) => { fn(); n++; console.log("ok", name); };

ok("one clean visit", () => {
  const r = pullMinutes([at(10, "open"), at(16, "close")], S);
  assert.equal(r.minutes, 6); assert.equal(r.visits, 1); assert.equal(r.quality, "ok");
});
ok("three visits add up", () => {
  const r = pullMinutes([at(5, "open"), at(7, "close"), at(20, "open"), at(24, "close"), at(40, "open"), at(41, "close")], S);
  assert.equal(r.minutes, 7); assert.equal(r.visits, 3);
});
ok("direct switch between two picked apps (open arrives before close)", () => {
  const r = pullMinutes([at(10, "open"), at(14, "open"), at(14, "close"), at(18, "close")], S);
  // 10→14 stretch, then the late close at 18 extends it (no open since): 8 min, one visit
  assert.equal(r.minutes, 8); assert.equal(r.flags.doubleOpen, 1);
});
ok("Control Center false close then real close (iOS 26.6 report)", () => {
  const r = pullMinutes([at(10, "open"), at(12, "close"), at(19, "close")], S);
  assert.equal(r.minutes, 9); assert.equal(r.flags.extended, 1);
});
ok("screen lock with no close: capped and flagged", () => {
  const r = pullMinutes([at(30, "open")], S, { capMs: 10 * M });
  assert.equal(r.minutes, 10); assert.equal(r.quality, "check"); assert.equal(r.flags.unmatchedOpen, 1);
});
ok("unmatched open never runs past the session end", () => {
  const r = pullMinutes([at(45, "open")], S);
  assert.equal(r.minutes, 5);
});
ok("app already open when the session starts is counted from the start", () => {
  const r = pullMinutes([at(-3, "open"), at(4, "close")], S);
  assert.equal(r.minutes, 4);
});
ok("visits outside the session do not count", () => {
  const r = pullMinutes([at(-30, "open"), at(-20, "close"), at(60, "open"), at(70, "close")], S);
  assert.equal(r.minutes, 0); assert.equal(r.visits, 0);
});
ok("orphan close far from anything is ignored", () => {
  const r = pullMinutes([at(-60, "open"), at(-58, "close"), at(30, "close")], S);
  assert.equal(r.minutes, 0); assert.equal(r.flags.orphanClose, 1);
});
ok("no events → 0 minutes, ok (the page shows 'nothing logged', not 'no phone use')", () => {
  const r = pullMinutes([], S);
  assert.equal(r.minutes, 0); assert.equal(r.quality, "ok");
});

// Endpoint: only code + kind are stored; anything naming an app is refused.
const server = await start(0, "127.0.0.1");
const base = `http://127.0.0.1:${server.address().port}`;
const post = body => fetch(base + "/pull-event", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
const code = "synth0001";
try {
  assert.equal((await post({ code, kind: "open" })).status, 204);
  assert.equal((await post({ code, kind: "close" })).status, 204);
  assert.equal((await post({ code, kind: "open", app: "Instagram" })).status, 400);
  assert.equal((await post({ code, kind: "closed" })).status, 400);
  assert.equal((await post({ code: "x", kind: "open" })).status, 400);
  assert.equal((await post({ code, kind: "open", pad: "x".repeat(300) })).status, 413);
  const now = Date.now();
  const r = await (await fetch(`${base}/minutes?code=${code}&start=${now - 10 * M}&end=${now + M}`)).json();
  assert.equal(r.visits, 1); assert.equal(r.minutes, 0); // open→close a few ms apart
  n++; console.log("ok endpoint keeps code+kind+server time only, refuses extra keys");
} finally {
  server.close();
}
console.log(`${n} passed (synthetic)`);
