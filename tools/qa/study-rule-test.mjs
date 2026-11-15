#!/usr/bin/env node
// Unit checks for the numeric parts of site/assets/study.js: the timing rule (RULE.decide) and the SUS score.
//   node tools/qa/study-rule-test.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
const src = readFileSync(fileURLToPath(new URL("../../site/assets/study.js", import.meta.url)), "utf8");
const win = {}; const noStore = { getItem: () => null, setItem() {}, removeItem() {} };
vm.runInNewContext(src, { window: win, location: { search: "" }, URLSearchParams, localStorage: noStore, sessionStorage: noStore, document: {}, navigator: { userAgent: "" }, matchMedia: () => ({ matches: false, addEventListener() {} }), console });
const { RULE, susScore } = win.STUDY;
const at = (h) => new Date(2026, 10, 13, h, 0, 0).getTime(); // a start time at hour h, local
let fails = 0;
const eq = (name, got, want) => { const ok = JSON.stringify(got) === JSON.stringify(want); if (!ok) fails++; console.log(`${ok ? "ok  " : "FAIL"} ${name}${ok ? "" : `: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`); };
const pick = (d) => [d.kind, d.fireMin, d.breakMin];
eq("7 h sleep, afternoon, 2 h planned → walk at 50", pick(RULE.decide({ sleepH: 7, startMs: at(14), endMin: 120 })), ["walk", 50, 5]);
eq("5.5 h sleep → walk 10 min sooner", pick(RULE.decide({ sleepH: 5.5, startMs: at(14), endMin: 120 })), ["walk", 40, 5]);
eq("4.5 h sleep → 15-min break at 35", pick(RULE.decide({ sleepH: 4.5, startMs: at(14), endMin: 120 })), ["break", 35, 15]);
eq("8.5 h sleep → walk at 60", pick(RULE.decide({ sleepH: 8.5, startMs: at(14), endMin: 120 })), ["walk", 60, 5]);
eq("sleep unknown → walk at 50", pick(RULE.decide({ sleepH: null, startMs: at(14), endMin: 120 })), ["walk", 50, 5]);
eq("late night → 5 min sooner, longer break", pick(RULE.decide({ sleepH: 7, startMs: at(23), endMin: 120 })), ["break", 45, 15]);
eq("short sleep but the long break doesn't fit → walk", pick(RULE.decide({ sleepH: 4.5, startMs: at(14), endMin: 55 })), ["walk", 35, 5]);
eq("end is within 10 min of the moment → keep going, 10 min before the end", pick(RULE.decide({ sleepH: 7, startMs: at(14), endMin: 45 })), ["keep", 35, 0]);
eq("30-minute session → keep going at 20", pick(RULE.decide({ sleepH: 7, startMs: at(14), endMin: 30 })), ["keep", 20, 0]);
eq("under 20 minutes → nothing", pick(RULE.decide({ sleepH: 7, startMs: at(14), endMin: 15 })), ["none", null, 0]);
eq("block never under 25", pick(RULE.decide({ sleepH: 3, startMs: at(1), endMin: 240 })), ["break", 30, 15]);
eq("every decision lists its steps", RULE.decide({ sleepH: 4.5, startMs: at(23), endMin: 120 }).steps.map((s) => s.k), ["base", "sleep", "late"]);
eq("SUS: best answers → 100", susScore([5, 1, 5, 1, 5, 1, 5, 1, 5, 1]), 100);
eq("SUS: worst answers → 0", susScore([1, 5, 1, 5, 1, 5, 1, 5, 1, 5]), 0);
eq("SUS: all 3s → 50", susScore([3, 3, 3, 3, 3, 3, 3, 3, 3, 3]), 50);
console.log(fails ? `${fails} failed` : "all passed"); process.exit(fails ? 1 : 0);
