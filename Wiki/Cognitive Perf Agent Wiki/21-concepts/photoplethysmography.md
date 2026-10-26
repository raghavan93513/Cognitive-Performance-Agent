---
title: Photoplethysmography (PPG)
category: 21-concepts
tags: [concept, wearables, physiology]
aliases: [PPG, optical heart rate, wrist pulse, optical HR]
relationships:
  - target: "[[21-concepts/heart-rate-variability]]"
    type: related_to
  - target: "[[21-concepts/wearable-measurement-error]]"
    type: related_to
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: derived_from
sources: ["binf4070-2026/week-03/slides-03.pdf", "binf4070-2026/week-03/lab-03.ipynb"]
summary: How a watch turns reflected light into heart rate, HRV and sleep inputs, as taught in BINF 4070 Week 3. It is peripheral pulse timing, not ECG, and it is fragile under motion.
provenance:
  extracted: 0.8
  inferred: 0.17
  ambiguous: 0.03
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Photoplethysmography (PPG)

The optical sensing method behind wrist heart rate on Fitbit, Apple Watch, Garmin and similar devices. Taught in [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]] (slides pp. 18–23, 27–28, 36–38).

## What it measures

- **PPG measures an optical signal affected by peripheral blood-volume change** (p. 19).
- **Light-emitting diodes** on the skin-facing side shine into tissue, and a **photodetector** measures the light that comes back (pp. 3, 19).
- With each heartbeat, arterial blood volume under the sensor rises and falls, which changes how much light returns. Venous blood and other tissue add a slower, roughly constant component (Charlton et al. 2022 figure, p. 19).
- **PPG is not ECG.** ECG measures the heart's *electrical* activity. PPG measures *peripheral pulse timing*, and ECG events and diagnoses require different evidence (pp. 19–20).

## From waveform to heart rate

1. **Acquire** the optical waveform, preprocess it (filter baseline wander and out-of-band noise), and run **signal-quality assessment** to reject unusable windows (p. 36).
2. **Detect landmarks**: pulse peaks or feet. Successive landmarks give **inter-beat intervals (IBIs)** (pp. 20, 36).
3. **Pulse rate = 60 / mean IBI.** Example: IBIs of 0.83, 0.80 and 0.87 s give a mean of 0.833 s, so **72.0 bpm** (p. 20).
4. **A missed or extra peak changes the intervals and therefore the displayed rate** (p. 20).
5. The device or app reports the result as a **point sample**. Through the Google Health API it arrives as `heartRate.beatsPerMinute` (a string) at a `sampleTime`, with `metadata.motionContext` (ACTIVE or SEDENTARY) and `sensorLocation` (WRIST). The lab stresses that each value is "a point measurement, not a ten-minute mean" (lab Part 2.2).

The full chain from light to API record is the Week 3 pipeline: phenomenon → sensor → samples → time index → quality checks → filtering → window → features → model → displayed metric → API record. **Every step is a vendor choice** (p. 5).

## From PPG to HRV

- HRV is variation in the time between heartbeats. Its reference definition uses **NN (normal-to-normal) intervals between ECG R peaks** (p. 22).
- **Wrist PPG uses pulse timing, so its HRV estimates can differ from ECG** (p. 22). Pulse arrival at the wrist isn't identical to electrical beat timing, and every missed or extra peak distorts beat-to-beat differences. ^[inferred]
- Features: **SDNN** (overall spread), **RMSSD** (successive differences), **pNN50** (% of adjacent pairs differing by > 50 ms) and **LF/HF** (frequency-band power) (p. 23). They can be computed from an IBI list with NeuroKit2 or HeartPy.
- See [[21-concepts/heart-rate-variability|Heart rate variability]] for how our project uses overnight RMSSD.

## PPG in sleep staging

- Pulse and HRV patterns, often combined with motion, SpO₂ and skin temperature, are inputs to wearable sleep-stage models (pp. 24, 28).
- PPG-only staging is "only a rough estimation" against polysomnography. The slide figure shows κ ≈ 0.53–0.71 and accuracy ≈ 69–83% for 4-class staging (p. 28).

## Why PPG fails

Details on [[21-concepts/wearable-measurement-error|Wearable measurement error]]. In short:

- **Motion artifact.** Wrist movement changes skin contact and the optical path. When the motion rhythm matches the pulse rhythm (both 1.5 Hz in the slide's example), **frequency filtering alone cannot separate them**. Concurrent accelerometry and quality checks help, but results stay method-dependent (p. 21).
- **Activity raises error** on average, and how much differs by device (p. 37, Bent et al. 2020).
- **Fit, placement, perfusion, hardware and algorithm** all matter (p. 37).
- **Missing data** (rejected or absent windows) also depends on device and activity (p. 38).
- **Skin tone:** slide p. 37 plots error by Fitzpatrick skin type alongside device and activity, so it's a factor to evaluate. ^[ambiguous] The slide text draws its conclusions about device and activity and doesn't state a skin-tone effect. It warns that pulse-oximetry bias evidence (Sjoding et al. 2020) can't be transferred automatically to wrist pulse rate.

## Implications for the Cognitive Performance Agent

- Treat watch HR as a **sparse, synced, point-sampled estimate**, not a live continuous signal. Store `motionContext` and the sample count per feature window. ^[inferred] → [[05-data/data-pipeline|Data pipeline]]
- **Down-weight or exclude HR recorded while ACTIVE** (e.g. during a suggested walk) when judging physiological state, because this is where PPG is least reliable. ^[inferred] → [[04-agent-engine/performance-model|Performance model]]
- Overnight HRV is the most favourable PPG condition (still, low motion), which supports our choice of **overnight RMSSD as daily context** rather than daytime HRV. ^[inferred]
- Never let the LLM describe PPG output as an ECG or as a diagnosis, consistent with our agent guardrails. ^[inferred] → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]

## Sources

- `binf4070-2026/week-03/slides-03.pdf`: pp. 3, 5, 19–23, 28, 36–38 (pp. 19–21, 28 and 37–38 viewed as images).
- `binf4070-2026/week-03/lab-03.ipynb`: heart-rate DataPoint shape and Part 2.2 notes.
- Course reading: [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent et al. 2020]].
