---
title: WearLab curriculum and quizzes
category: 32-wearlab
tags: [wearlab, product, students, evaluation, design]
aliases: [WearLab quizzes, WearLab tiers, WearLab no-game design, curriculum validator]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[32-wearlab/product-tour]]"
    type: related_to
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
  - target: "[[08-frontend/student-interface-and-feedback]]"
    type: related_to
sources: ["wearlab/src/data/curriculum/tier1.ts", "wearlab/src/data/curriculum/tier2.ts", "wearlab/src/data/curriculum/tier3.ts", "wearlab/src/data/curriculum/tier4.ts", "wearlab/src/data/curriculum/tier5.ts", "wearlab/src/data/concepts.ts", "wearlab/src/data/topics.ts", "wearlab/src/lib/types.ts", "wearlab/src/screens/Quiz.tsx", "wearlab/src/lesson/exercises.tsx", "wearlab/src/store/progress.ts", "wearlab/scripts/validate-curriculum.ts", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app/#/quiz/t3-u2-l2"]
summary: "WearLab's quizzes: no-game design, 7 item types, 5 device tiers, 52 quizzes and 409 items each homed in one topic or device, the validator's rules, and paraphrased HR, HRV, sleep and steps questions."
provenance:
  extracted: 0.8
  inferred: 0.15
  ambiguous: 0.05
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# WearLab curriculum and quizzes

WearLab teaches with short quizzes. Each one opens with a card or two of explanation and then asks questions with instant feedback. The quizzes are organised by device tier in the source files but presented by topic in the app.

## The no-game philosophy

- **PLAN's opening sentence:** "There is no game layer: no points, lives, streaks or locks."
- **Removal date:** PLAN §3 D is headed "Quizzes (the game layer that was here was removed on 2026-09-27)". §9 lists "D. Gamification: Removed (2026-09-27)", replaced by the four-tab organisation.
- **How a quiz behaves** (PLAN §2.3, `src/screens/Quiz.tsx`):
  - **Any order:** every quiz can be taken at any time. Nothing is locked.
  - **Instant feedback:** right or wrong, with the reason (each question's `why`).
  - **One retry:** wrong answers are re-queued once at the end.
  - **The end screen:** "N of M right first time", then the next quiz in the same home or a link back to it.
  - **What is saved:** only a quiet ✓ for finished quizzes and journeys, in the browser (`useProgress`).
- **Game leftovers:**
  - The persisted store's v1 → v2 migration drops XP, chips, battery and streaks.
  - The type `LessonKind = 'lesson' | 'boss'` survives. "boss" now just means a device's "put it together" quiz.
  - `concepts.ts` still says "mastery is tracked per concept", but no mastery is stored. PLAN's "spaced review… lowest mastery" idea depends on that removed feature. ^[ambiguous]
- **One exception:** the Time Machine's "spot the change" challenge does keep a running score, one point for a first-try answer and half on the second. It is still "nothing is saved or rewarded" (PLAN §5.4).

## Item types

The `Exercise` union in `src/lib/types.ts` defines six question types. A seventh item type, `Card`, is a teaching card. Totals were counted across all five tier files on 2026-10-26.

| Type | What the learner does | Count |
|---|---|---|
| card | Reads a teaching card (title, text, optional analogy). It can show a device, an inside view or a lab | 96 |
| mcq | Multiple choice. It can show a 3D device opened to a part | 177 |
| tap | Taps the right part in the 3D model, after the model is opened along a path of part ids | 61 |
| match | Pairs left items with right items (the UI shuffles the right column) | 40 |
| order | Puts steps in order (the UI shuffles them) | 12 |
| sim | Reaches a named goal inside an algorithm lab | 18 |
| build | Assembles a device's modules from back to front | 5 |
| **Total** | | **409** (313 questions + 96 cards) |

Every question also carries:

- a difficulty from 1 to 5;
- one or more concept ids, out of 49 in `concepts.ts`;
- a `why` explanation.

The 313 questions split by difficulty as 20 / 74 / 119 / 76 / 24 for levels 1 to 5.

**MCQ authoring convention:** every one of the 177 MCQs is written with the correct option first (`answer: 0`). `useShuffled()` in `src/lesson/exercises.tsx` then shuffles the options with a seed derived from the exercise key, so the order is stable between renders.

## Tiers (source organisation)

The tier files are `src/data/curriculum/tier1.ts` to `tier5.ts`. Each tier is one device, and the curriculum climbs from simplest to hardest. They are loaded by `import.meta.glob`.

| Tier | Title | Device | Units | Quizzes | Why it sits here (from data) |
|---|---|---|---|---|---|
| 1 | First Steps | clip | 2 | 8 | Few parts and one algorithm, the first teardown |
| 2 | Light & Blood | band | 4 | 12 | Adds light sensing, a radio and a screen |
| 3 | Tiny but Mighty | ring | 2 | 9 | No new sensors, but every choice is a trade-off |
| 4 | Electric Heart | strap | 1 | 6 | New physics (electrical) and the sport gold standard |
| 5 | Computer on Your Wrist | watch | 4 | 17 | Everything before, plus a computer, navigation and a health lab |

That is 13 units and 52 quizzes: 47 of kind "lesson" and 5 "boss" (the `Build the …` quizzes). Quizzes have 6 to 9 items each. Some lessons were added with the brands:

- **WHOOP:** `t2-u4-l1` and `t2-u4-l2` (Strain and Recovery).
- **Oura:** `t3-u2-l4` (A month of nights).
- **Apple:** `t4-u1-l5` (Spotting atrial fibrillation).
- **Garmin:** `t5-u4-l5` (A battery that lasts for weeks).

## How quizzes are homed

Visitors never see tiers. `src/data/topics.ts` gives each quiz exactly one home:

- **Topic quizzes:** 46 quizzes across the 17 topics. Examples:
  - Steps: `t1-u2-l1`, `t1-u2-l2`, `t1-u2-l3`.
  - Heart rate: 7 quizzes, from `t2-u1-*`, `t2-u2-*` and `t3-u1-l3`.
  - HRV: `t3-u2-l2`.
  - Sleep: `t3-u2-l3`.
  - Recovery: `t2-u4-l1`, `t2-u4-l2`.
- **Device quizzes:** 6 in `DEVICE_QUIZZES`. The clip has "Meet the clip" and "Build the pedometer". The band, ring, strap and watch each have their "Build the …" quiz.
- **Routing:** `homeOf(id)` and `homePath(id)` decide where the quiz's "back" and "next" lead. The quiz URL is `#/quiz/<id>`.

## Validator rules

`node --experimental-strip-types scripts/validate-curriculum.ts` is read-only. On 2026-10-26 it printed: "Every one of 52 quizzes lives in exactly one topic or device. Checked 5 tiers, 52 lessons, 409 items. All good." The checks are:

**Lessons**
- Lesson ids must be unique.
- Each lesson must have at least 3 items.

**Cards**
- An `inside` must be one of the 23 `INSIDE_IDS`.
- A `lab` must be one of the 12 `ALGO_IDS`.
- Any device `open` path must walk real parent→child ids from the root, and `focus` must be a child of the opened node.

**All questions**
- Every concept id must exist in `concepts.ts`.
- A `why` is required.

**Per question type**
- **mcq:** the answer index must be in range, and the device path and focus must be valid.
- **tap:** the answer and every candidate must be children of the opened node, and the candidates must include the answer.
- **build:** every id must be a top-level module of that device.
- **sim:** the goal must be in the lab's whitelist, for example `steps: real-steps, ignore-shake`, `heart: fix-running`, `hrv: relaxed`, `sleep: find-deep`, `recovery: high-strain, green-after-hard`, `temp: flag-cold`, `battery: month, always-on`, `ecg: clean, afib`.
- **match:** at least 3 pairs. **order:** at least 3 items.

**Homes and links**
- Each lesson must live in exactly one topic or device.
- Every quiz id named in `topics.ts` must exist.
- Every topic part must be a real manifest id, and every topic lab a real lab.
- Every topic must have something to do (a quiz, a lab or a journey).
- Every lab must belong to some topic.
- Every `ready` brand must have a page, a Time Machine catalog and a History blurb, and its topics must be real.

## Sample questions (paraphrased)

These are representative items from the topics closest to our product. The correct answer is given after the arrow.

1. **Steps** (`t1-u2-l2`, mcq, difficulty 2): If the peak threshold is set too low, what happens? → small jiggles get counted as extra steps. The explanation: too high misses gentle steps, too low lets wobbles in.
2. **Steps** (`t1-u2-l3`, sim then mcq): first tune the lab so shaking the clip does not count. Then: which rule best stops shaking? → ignore peaks closer together than real steps can be. Size alone fails because shakes are big.
3. **Heart rate** (`t2-u2-l2`, mcq, difficulty 3): why is a filter alone not enough on a run? → running cadence of about 2.5–3 steps a second sits inside the heart-rate band, so the motion sensor is needed to subtract arm swing.
4. **Heart rate vs ECG** (`t4-u1-l4`, mcq, difficulty 4): on a jog the wrist reads 160 bpm, the chest strap 130, and cadence is 160 steps per minute. What happened? → the wrist algorithm locked onto the step rhythm.
5. **HRV** (`t3-u2-l2`, mcq, difficulty 4): your friend's HRV is 80 ms and yours is 45 ms. What does that tell you? → not much, because HRV varies a lot between people. Compare against your own baseline.
6. **HRV** (`t3-u2-l2`, mcq, difficulty 3): why does a ring usually measure HRV during sleep? → a still hand gives clean beat-to-beat timing, which needs millisecond precision.
7. **Sleep** (`t3-u2-l3`, mcq, difficulty 4): the ring says 2 h of deep sleep and a sleep lab says 1 h 20 min. Why? → the ring estimates stages without brain waves. Treat stage times as estimates and watch the trend.
8. **Sleep** (`t3-u2-l3`, mcq, difficulty 4): what if you lie perfectly still, awake, for an hour? → the ring may count some of it as sleep. Heart rate and HRV help but do not always catch it.
9. **Recovery** (`t2-u4-l2`, mcq, difficulty 3): after a few drinks, what usually happens overnight? → HRV drops and resting heart rate rises, so Recovery falls.
10. **Recovery** (`t2-u4-l2`, card): teaches WHOOP's published rules:
    - it holds back scores for the first four nights;
    - it compares against the last 30 days;
    - the bands are green 67–99%, yellow 34–66% and red 1–33%.

## Agreement with BINF 4070

I compared WearLab's teaching with [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]] and [[21-concepts/photoplethysmography|Photoplethysmography]].

- **PPG vs ECG timing: agrees.** `t4-u1-l4` teaches that wrist pulses arrive a fraction of a second after the chest R-peak, and that HRV is best timed from sharp ECG R-peaks. That matches the course's point that wrist PPG HRV can differ from ECG.
- **Step counting: same idea, different numbers.** The course's worked rule uses fixed values: prominence ≥ 0.20 g and spacing ≥ 0.40 s (slide p. 13). WearLab's quizzes teach the same threshold-plus-timing idea. Its One Step simulation uses an **adaptive** threshold (30% of the biggest rise in 2 s, never below 0.07 g), at least 0.28 s between steps, and a 10-step debounce. Both agree that a cart or trolley makes wrist steps go missing and that vibration can add false steps. ^[inferred]
- **Sleep staging: agrees.** WearLab's "estimate, not a medical test" framing fits the course's κ ≈ 0.53–0.71 and accuracy ≈ 69–83% for PPG staging. One Night reports about 80% agreement on its own simulated nights and cites Beattie 2017 (69%) for real people. That simulated figure should not be quoted as real-world accuracy. ^[inferred]
- **Not in the course:** Recovery and Strain (WHOOP) and the temperature-trend alert (Oura). WearLab teaches these as vendor rules. Our [[21-concepts/heart-rate-variability|Heart rate variability]] page treats overnight HRV only as daily context, never as a score.

## What this means for the Cognitive Performance Agent

^[inferred]
- **The no-game stance supports our wellness framing.** No streaks, scores or locks is a deliberate, tested choice from a teammate. It argues against adding streaks or points to our break suggestions, which could push students to over-comply or game the system. See [[08-frontend/student-interface-and-feedback|Student interface and feedback]] and [[24-synthesis/open-decisions|Open decisions]].
- **Reusable onboarding content.** The HR, HRV, sleep and steps quizzes, especially items 3–8 above, could become a short "what your watch numbers can and can't tell you" onboarding. Linking the live `#/quiz/<id>` routes would cost nothing.
- **Comprehension as an evaluation probe.** A few WearLab items could be adapted into pre/post questions measuring whether students understand the agent's rationale. See [[15-research/evaluation-plan|Evaluation plan]].
- **Validator pattern.** The "every item has one home, every reference resolves" check is a cheap model for validating our policy rule tables and explanation templates in CI. See [[04-agent-engine/multi-agent-decision|Multi-agent decision]].
- **Do not copy vendor bands.** WHOOP's 67/34 colour cut-offs are product rules, not science we should adopt. See [[21-concepts/recovery-and-strain|Recovery and strain]] and [[04-agent-engine/performance-model|Performance model]].

## Sources

- `wearlab/src/data/curriculum/tier1.ts` … `tier5.ts`, `wearlab/src/data/curriculum/index.ts`
- `wearlab/src/data/concepts.ts`, `wearlab/src/data/topics.ts`, `wearlab/src/lib/types.ts`
- `wearlab/src/screens/Quiz.tsx`, `wearlab/src/lesson/exercises.tsx`, `wearlab/src/store/progress.ts`
- `wearlab/scripts/validate-curriculum.ts` (run read-only on 2026-10-26)
- `wearlab/docs/PLAN.md` §2.1, §2.3, §3 D, §5.4, §6.1, §9
- Live: https://wearlab-learn.vercel.app/#/quiz/t3-u2-l2
