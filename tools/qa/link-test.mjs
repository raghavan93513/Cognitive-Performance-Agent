#!/usr/bin/env node
// Unit checks for site/assets/link.js (method link-v0): the study day, the usual night, the words, and when the
// comparison may show.   TZ=America/New_York node tools/qa/link-test.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const win = {}; vm.runInNewContext(readFileSync(fileURLToPath(new URL("../../site/assets/link.js", import.meta.url)), "utf8"), { window: win });
const L = win.HalftimeLink;
let fails = 0;
const nb = (x) => JSON.parse(JSON.stringify(x).replace(/\u00a0/g, " "));
const eq = (name, got, want) => { got = nb(got); const ok = JSON.stringify(got) === JSON.stringify(want); if (!ok) fails++; console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok ? "" : `: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`); };
const at = (key, h, m = 0) => { const [y, mo, d] = key.split("-").map(Number); return new Date(y, mo - 1, d, h, m).getTime(); };

eq("2 pm belongs to that day", L.dayOf(at("2026-11-16", 14)), "2026-11-16");
eq("1 am still belongs to the day before", L.dayOf(at("2026-11-17", 1)), "2026-11-16");
eq("5 am starts the new day", L.dayOf(at("2026-11-17", 5)), "2026-11-17");

const run = (n, start, f) => Array.from({ length: n }, (_, i) => ({ date: L.addDays(start, i), sleepMin: f(i) }));
const six = run(6, "2026-11-01", () => 420);
eq("6 nights: no usual yet", L.usual(six, "2026-11-07").mid, null);
const seven = run(7, "2026-11-01", (i) => 400 + i * 5);
eq("7 nights: usual is the middle one", L.usual(seven, "2026-11-08").mid, 415);
eq("the night itself doesn't count toward its own usual", L.usual(seven, "2026-11-07").n, 6);
eq("only the 28 days before count", L.usual(run(40, "2026-10-01", () => 420), "2026-11-09").n, 28);

eq("words: learning", L.nightWords(400, { n: 3, mid: null }).text, "Learning your usual: night 4 of 7.");
eq("words: about usual", L.nightWords(430, { n: 9, mid: 420 }).kind, "usual");
eq("words: less", L.nightWords(370, { n: 9, mid: 420 }).text, "50 min less than your usual 7 h.");
eq("words: 45 min under is shorter", L.nightWords(375, { n: 9, mid: 420 }).short, true);
eq("words: 30 min under is not shorter", !!L.nightWords(390, { n: 9, mid: 420 }).short, false);
eq("words: more", L.nightWords(510, { n: 9, mid: 420 }).text, "1 h 30 min more than your usual 7 h.");

const now = at("2026-11-30", 12);
eq("nothing logged → learning, night 0 of 7", L.compute({ nights: [], sessions: [], now }).progress.text, "Learning you: night 0 of 7.");
eq("4 nights → night 4 of 7", L.compute({ nights: run(4, "2026-11-20", () => 420), sessions: [], now }).progress.text, "Learning you: night 4 of 7.");

// 21 nights: 7 to learn the usual (420), then 14 with sessions; shorter nights (330) on days 9, 12, 15 and 18
const ns = run(21, "2026-11-01", (i) => (i >= 7 && i % 3 === 0 ? 330 : 420));
const sess = ns.slice(7).map((n) => ({ startAt: at(n.date, 15), planned: 50, minutes: n.sleepMin < 400 ? 40 : 48 }));
const r = L.compute({ nights: ns, sessions: sess, now });
eq("ready with enough nights on both sides", r.state, "ready");
eq("shorter side", [r.shorter.n, r.shorter.kept, r.shorter.planned], [4, 40, 50]);
eq("usual side", [r.usualSide.n, r.usualSide.kept, r.usualSide.planned], [10, 48, 50]);
eq("the sentence says the count and 'could be chance'", r.sentence, "After your 4 shorter nights you kept 40 of 50 min; after usual nights, 48 of 50. 14 nights, so this could be chance.");
eq("kept is capped at the plan (going over isn't 'more kept')", L.compute({ nights: ns, sessions: sess.map((s) => ({ ...s, minutes: 90 })), now }).usualSide.kept, 50);
eq("test-speed sessions are left out", L.compute({ nights: ns, sessions: sess.map((s) => ({ ...s, qa: true })), now }).state, "learning");
eq("a 1 am session counts for the day before", L.compute({ nights: ns, sessions: [{ startAt: at("2026-11-19", 1), planned: 50, minutes: 40 }], now }).pairs.map((p) => p.date), ["2026-11-18"]);
const even = run(21, "2026-11-01", () => 420);
eq("no shorter nights → says there's nothing to compare, not a number", L.compute({ nights: even, sessions: even.slice(7).map((n) => ({ startAt: at(n.date, 15), planned: 50, minutes: 45 })), now }).state, "one_side");
console.log(fails ? `${fails} failed` : "all passed"); process.exit(fails ? 1 : 0);
