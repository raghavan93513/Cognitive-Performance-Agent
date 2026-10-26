---
title: Step counting
category: 21-concepts
tags: [concept, wearables, signal-processing, physiology]
aliases: [pedometer, step counter, step detection, accelerometer steps]
relationships:
  - target: "[[32-wearlab/motion-sleep-recovery-pipelines]]"
    type: derived_from
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
  - target: "[[21-concepts/wearable-measurement-error]]"
    type: related_to
sources: ["wearlab/src/steps/counter.ts", "wearlab/src/steps/sensor.ts", "wearlab/src/steps/body.ts", "wearlab/src/steps/sim.ts", "wearlab/scripts/test-steps.ts", "wearlab/src/lab/labs/steps.tsx", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app/journey/step"]
summary: How a wrist or hip accelerometer becomes a step count (magnitude, gravity removal, smoothing, peaks, rhythm, vertical check), what fools it, and how we should use steps for walk breaks.
provenance:
  extracted: 0.7
  inferred: 0.27
  ambiguous: 0.03
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Step counting

A step counter turns a 3-axis accelerometer stream into a count of steps. It does this by finding the **steady up-and-down bounce of walking** and ignoring every other movement. This page follows WearLab's tested reference implementation, the **One Step** journey (`wearlab/src/steps/counter.ts`). Full parameters and test results are on [[32-wearlab/motion-sleep-recovery-pipelines|WearLab: motion, sleep and recovery pipelines]]. The course version is [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] (pp. 6–17).

## The pipeline

1. **Sample.** The accelerometer is read at **50 Hz** as 12-bit numbers at **±4 g** (about 1.95 mg per step of the converter). At rest it reads **1 g**: gravity.
2. **Magnitude.** √(x² + y² + z²) turns three axes into one number, so how the band sits on the wrist stops mattering. In WearLab, twisting the band changes the axes by up to 0.42 g but the magnitude by only 0.002 g, and the count is the same.
3. **Remove gravity** with a slow running average (about a 1.2 s time constant).
4. **Smooth** with a **3 Hz** low-pass filter. Without it, running is miscounted by more than 20%.
5. **Find bumps from peak to trough.** Each candidate is measured from the dip before it, so the slow arm swing doesn't shift it. A bump must rise more than an **adaptive threshold**: 30% of the biggest rise in the last 2 s, but never less than 0.07 g. A fixed 0.25 g threshold misses wrist steps that ride on the arm swing, and misses every step of a slow shuffle at the hip.
6. **Not too soon.** Steps must be at least **0.28 s** apart.
7. **Rhythm.** Counting starts only after **10 steady steps**, which are then added all at once. The code says this is ST's LSM6DSL pedometer default. A pause longer than 1.25 s restarts the wait.
8. **Vertical check.** At least **28%** of the movement energy must be along gravity. This is what rejects clapping and brushing teeth.

## What fools it

| Situation | What happens in WearLab's tests | Course says (Week 3, p. 14) |
|---|---|---|
| Clapping, brushing teeth | 0 false steps with the vertical check; 66 and 90 without it | — |
| Bus, random jolts | 0 false steps, because the rhythm check rejects them | Vibration counted as steps (false positive) |
| Bus on steady cobbles | 27 false steps in 48 s: the jolts keep a beat | "Periodicity alone does not establish walking" |
| Pushing a trolley, wrist | 84–95% of steps counted; the hip gets 100% | Reduced wrist motion means missed steps (false negative) |
| Short walks under 10 steps | Not counted (by design) | — |

**Wrist vs hip.** A hip clip feels about twice the heel-strike jolt (0.5 g vs 0.28 g when walking) and no arm swing, so it is the easier place to count. The wrist depends on the adaptive threshold and the vertical check.

## Where WearLab and the course differ

- The course's worked rule (p. 13) is fixed: prominence **≥ 0.20 g** and spacing **≥ 0.40 s**. WearLab's journey uses an adaptive threshold (floor 0.07 g) and a 0.28 s spacing. WearLab's simpler steps *lab* uses 0.25 s spacing and a run of 4 peaks.
- A 0.40 s spacing caps the count at 150 steps per minute, so the course rule would undercount a 166-steps-per-minute run. That is fine as a teaching example, but it matters for any real implementation. ^[inferred]
- The course goes on to learned counters (neural networks, OxWearables `stepcount`, IMU foundation models; pp. 15–17). WearLab stays rule-based. ^[inferred] Expect vendor numbers to come from proprietary models with error profiles like the ones above, not identical to them.
- Accelerometers don't measure speed or position directly (course p. 7). WearLab never claims they do.

## Using steps in our product

- Steps reach us as **per-minute counts from Google Health** (Week 7 data types), not as raw 50 Hz data. ^[inferred] The pipeline above explains the error profile of those counts. It isn't something we run.
- **Verifying a walk break.** A suggested "short walk" of 2–5 minutes at about 108 steps per minute is about 216–540 steps, well above the 10-step debounce. A missing count means "not confirmed", not "didn't walk": the student may have pushed a trolley, carried a bag or left the watch to charge. ^[inferred]
- **Sedentary time** (minutes since the last counted walking bout) is a sound signal for suggesting movement. Daily step totals are weaker context for cognition. ^[inferred]
- For synthetic data, `wearlab/src/steps/sim.ts` produces 50 Hz streams with ground-truth heel strikes. Per-minute counts at day scale are cheaper to generate from cadence × minutes walked. See §7 of the [[32-wearlab/motion-sleep-recovery-pipelines|pipelines page]]. ^[inferred]

## What this means for the Cognitive Performance Agent

- Treat step counts as an **estimate with known blind spots**. Undercounting from pushing things or holding the arm still is the main risk for confirming breaks. Rhythmic vibration on transport adds false steps. ^[inferred]
- Use **sedentary time and whether a walk happened** as policy inputs. Don't treat step totals as a cognitive signal. ^[inferred] → [[04-agent-engine/performance-model|Performance model]]
- Record our tolerance for step error in the [[15-research/evaluation-plan|evaluation plan]] before we rely on step-confirmed breaks. ^[inferred]

## Sources

- `wearlab/src/steps/{counter,sensor,body,sim}.ts`; `wearlab/scripts/test-steps.ts` (51 checks, all passing, run 2026-10-26); `wearlab/src/lab/labs/steps.tsx`; `wearlab/docs/PLAN.md` §6.
- WearLab One Step journey: <https://wearlab-learn.vercel.app/journey/step>.
- Course: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]], slides pp. 6–17.
