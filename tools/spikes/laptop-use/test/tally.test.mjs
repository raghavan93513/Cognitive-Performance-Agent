// node tools/spikes/laptop-use/test/tally.test.mjs — the counting rules, with made-up timestamps (no browser).
import assert from "node:assert/strict";
import * as T from "../extension/tally.js";

const M = 60000;
const P = (site) => ({ bucket: "picked", site }), OTHER = { bucket: "other" }, OUT = { bucket: "outside" }, AWAY = { bucket: "away" };
let n = 0; const ok = (name, fn) => { fn(); n++; console.log("ok -", name); };

ok("host matching: exact, subdomains, not look-alikes", () => {
  const p = ["instagram.com", "x.com"];
  assert.equal(T.matchPick("instagram.com", p), "instagram.com");
  assert.equal(T.matchPick("www.instagram.com", p), "instagram.com");
  assert.equal(T.matchPick("WWW.Instagram.com.", p), "instagram.com");
  assert.equal(T.matchPick("notinstagram.com", p), null);
  assert.equal(T.matchPick("instagram.com.evil.io", p), null);
  assert.equal(T.matchPick("box.com", p), null); // "x.com" must not match "box.com"
  assert.equal(T.matchPick("", p), null);
  assert.equal(T.matchPick(null, p), null);
});

ok("every minute lands in exactly one of the four buckets", () => {
  const s = T.start(0, "abc-12345", 120);
  T.observe(s, 0, OTHER);              // Halftime tab, Docs…  0–5
  T.observe(s, 5 * M, P("instagram.com"));  // 5–12
  T.observe(s, 12 * M, OUT);           // Word, Zoom…  12–20
  T.observe(s, 20 * M, AWAY);          // locked  20–25
  T.observe(s, 25 * M, P("youtube.com"));   // 25–28
  T.observe(s, 26 * M, P("youtube.com"));   // a repeat "still here" changes nothing
  T.observe(s, 28 * M, OTHER);         // 28–30
  const { share, local } = T.finish(s, 30 * M);
  assert.deepEqual(share, { picked_min: 10, other_min: 7, outside_min: 8, away_min: 5 });
  assert.equal(Object.values(share).reduce((a, b) => a + b), 30); // = session length
  assert.deepEqual(local.sites, { "instagram.com": 7, "youtube.com": 3 });
});

ok("what Halftime may get has no sites; the local result does", () => {
  const s = T.start(0, "abc-12345", 60); T.observe(s, 0, P("instagram.com"));
  const { share, local } = T.finish(s, 4 * M);
  assert.deepEqual(Object.keys(share).sort(), ["away_min", "other_min", "outside_min", "picked_min"]);
  assert.doesNotMatch(JSON.stringify(share), /instagram/);
  assert.deepEqual(local.sites, { "instagram.com": 4 });
});

ok("snapshot includes the open stretch and doesn't change the session", () => {
  const s = T.start(0, "abc-12345", 60); T.observe(s, 0, P("reddit.com"));
  const snap = T.snapshot(s, 3 * M);
  assert.equal(snap.ms.picked, 3 * M); assert.equal(snap.sites["reddit.com"], 3 * M);
  assert.equal(s.ms.picked, 0); assert.equal(s.since, 0);
});

ok("never counts past the session's end-by time", () => {
  const s = T.start(0, "abc-12345", 30);
  T.observe(s, 20 * M, P("tiktok.com"));
  assert.equal(T.finish(s, 500 * M).share.picked_min, 10); // 20 → 30, not 20 → 500
});

ok("a dropped open stretch (browser restart) isn't counted", () => {
  const s = T.start(0, "abc-12345", 60); T.observe(s, 0, P("tiktok.com")); T.forgetOpen(s);
  T.observe(s, 30 * M, OTHER);
  assert.deepEqual(T.finish(s, 31 * M).share, { picked_min: 0, other_min: 1, outside_min: 0, away_min: 0 });
});

ok("caps sessions at 6 h and ignores bad maxMin", () => {
  assert.equal(T.start(0, "abc-12345", 9999).endBy, 360 * M);
  assert.equal(T.start(0, "abc-12345", "x").endBy, 360 * M);
  assert.equal(T.start(0, "abc-12345", -5).endBy, 360 * M);
});

ok("rounds each bucket to whole minutes", () => {
  const s = T.start(0, "abc-12345", 60); T.observe(s, 0, P("x.com"));
  assert.equal(T.finish(s, 29 * 1000).share.picked_min, 0);
  const s2 = T.start(0, "abc-12345", 60); T.observe(s2, 0, P("x.com"));
  assert.equal(T.finish(s2, 90 * 1000).share.picked_min, 2); // 1.5 rounds up
});

ok("a session holds no URL, title or page content", () => {
  const s = T.start(0, "abc-12345", 60); T.observe(s, 0, P("instagram.com")); T.observe(s, M, OTHER);
  assert.deepEqual(Object.keys(s).sort(), ["cur", "endBy", "id", "ms", "since", "sites", "startAt"]);
  assert.deepEqual(s.cur, { bucket: "other" });
});

console.log(`${n} passed`);
