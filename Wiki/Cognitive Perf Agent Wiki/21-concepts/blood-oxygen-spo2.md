---
title: Blood Oxygen (SpO₂)
category: 21-concepts
tags: [concept, physiology, wearables]
aliases: [SpO2, SpO₂, blood oxygen, pulse oximetry, ratio of ratios]
relationships:
  - target: "[[21-concepts/photoplethysmography]]"
    type: related_to
  - target: "[[32-wearlab/heart-signal-pipelines]]"
    type: related_to
  - target: "[[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry]]"
    type: related_to
sources: ["wearlab/src/lab/labs/spo2.tsx", "wearlab/src/data/library/content-sense.ts", "wearlab/src/data/topics.ts", "wearlab/src/journey/ppg.ts", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app"]
summary: How wearables estimate blood oxygen from red vs infrared PPG (ratio of ratios plus a calibration curve), why motion and fit break it, and why we don't use it.
provenance:
  extracted: 0.65
  inferred: 0.3
  ambiguous: 0.05
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Blood Oxygen (SpO₂)

**SpO₂** is the percentage of haemoglobin carrying oxygen, estimated through the skin with light. The WearLab library entry for the red LED gives healthy SpO₂ as "typically 95–100%". It is a sibling of optical heart rate. It uses the same LEDs, photodiodes and AFE as [[21-concepts/photoplethysmography|PPG]], but **compares two colours** instead of timing beats.

## How it works

1. **Two colours.** A red LED (about 660 nm) and an infrared LED (about 880–940 nm) take turns. Deoxygenated haemoglobin absorbs far more red. Oxygenated haemoglobin absorbs slightly more infrared (from the `led-red` and `led-ir` library entries).
2. **AC/DC per colour.** For each colour, the pulsing part (AC) is divided by the steady part (DC). This cancels LED brightness and how much the rest of the wrist dims the light.
3. **Ratio of ratios.** R = (AC_red / DC_red) ÷ (AC_IR / DC_IR). Less oxygen means a bigger red ripple, so R gets bigger.
4. **Calibration curve.** R is turned into a percentage. WearLab uses a simplified textbook line, **SpO₂ ≈ 110 − 25 × R**, and stresses that "real devices use their own curves, measured in the lab on real people."
5. **Quality gate.** The reading is only trusted when the wearer is **still** (accelerometer) **and** the red and IR ripples look alike (correlation ≥ 0.9). Otherwise the watch discards it and tries again.

The full stage-by-stage parameters and probe results are on [[32-wearlab/heart-signal-pipelines|WearLab heart signal pipelines]] §4.

## Why it fails

- **Motion.** Movement adds nearly the same wobble to both colours and drags R toward about 1, which reads as roughly 85% on WearLab's line *regardless of the true value*. In a probe of the lab, moving gave 85.6–89.2% for true values of 98, 90 and 84%. ^[inferred]
- **A shape check can't catch motion.** In the same probe the red/IR correlation stayed at 0.98–1.00 while moving, because the junk is common to both colours. Only the separate accelerometer gate rejects it. ^[inferred]
- **Loose fit.** Less light gets through and stray light grows. In the lab, a fit of 30% or less dropped the red/IR match below 0.9.
- **Perfusion is small.** In WearLab's PPG model the pulsing share is only **0.6% for red and 0.9% for IR**, against 2% for green (`PERFUSION` in `ppg.ts`).
- **Skin tone.** WearLab's SpO₂ lab does **not** model skin tone. Course reading [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding et al. 2020]] shows clinical pulse oximeters missed hypoxaemia more often in Black patients. The course (Week 3, p. 37) warns that pulse-oximetry evidence can't be transferred automatically to wrist pulse rate, and the reverse holds too. ^[ambiguous] Whether consumer wrist SpO₂ inherits the clinical bias isn't settled by any source we hold.
- **Medical status.** WearLab: watches "are wellness gadgets, not medical devices." Readings are taken mostly during sleep or on demand while still. The brand Time Machines record SpO₂ hardware that shipped "asleep" until a firmware update (for example Fitbit's January 2020 wake-up, and Oura Gen 3 in July 2022). See [[32-wearlab/brand-histories|Brand histories]].

## What the course says

Week 3 covers SpO₂ only as a polysomnography channel and a sleep-model input (pp. 27–28), and through the Sjoding caution. It doesn't teach the ratio-of-ratios method. WearLab is our only source for the mechanism. See [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]].

## What this means for the Cognitive Performance Agent

^[inferred]
- **We don't use SpO₂.** It isn't in [[05-data/data-sources|Data sources]], and it has no plausible link to study focus in daytime windows. Keep it out of the performance model and the agents' prompts.
- If a watch export includes overnight SpO₂, store it only as raw context, never interpret it, and never surface it to students. Low readings carry health-alarm risk that our wellness framing can't handle. → [[13-trust-safety/privacy-and-consent|Privacy and consent]]
- **The general lesson we do use:** quality gates need an *independent* motion signal. A self-consistency check on the measured signal can pass while the number is garbage. The same rule applies to our HR features. See [[32-wearlab/heart-signal-pipelines|Heart signal pipelines]].

## Sources

- `wearlab/src/lab/labs/spo2.tsx`: model, calibration line, quality gate and captions. Probe numbers come from running its model section unchanged.
- `wearlab/src/data/library/content-sense.ts`: the `led-red`, `led-ir` and `photodiode` entries.
- `wearlab/src/data/topics.ts`: the `spo2` topic. `wearlab/src/journey/ppg.ts`: `PERFUSION`. `wearlab/docs/PLAN.md`: SpO₂ journey listed as a next idea.
- Live: https://wearlab-learn.vercel.app (`/how/spo2`).
- Course: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]]. [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding et al. 2020]].
