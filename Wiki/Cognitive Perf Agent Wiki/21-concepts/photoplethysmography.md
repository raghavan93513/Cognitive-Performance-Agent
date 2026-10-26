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
  - target: "[[32-wearlab/heart-signal-pipelines]]"
    type: related_to
sources: ["binf4070-2026/week-03/slides-03.pdf", "binf4070-2026/week-03/lab-03.ipynb", "wearlab/src/journey/ppg.ts", "wearlab/src/journey/tissue.ts", "wearlab/scripts/test-journey.ts", "wearlab/src/lab/labs/heart.tsx", "https://wearlab-learn.vercel.app"]
summary: How a watch turns reflected light into heart rate, HRV and sleep inputs (BINF 4070 Week 3, plus WearLab's simulated pipeline). It is peripheral pulse timing, not ECG, and fragile under motion.
provenance:
  extracted: 0.76
  inferred: 0.2
  ambiguous: 0.04
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T21:30:00Z
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

## How WearLab implements it

Our teammate's [[32-wearlab/32-wearlab|WearLab]] simulates the whole chain in code. Full parameters and test results are on [[32-wearlab/heart-signal-pipelines|WearLab heart signal pipelines]].

- **Photon Journey** (`wearlab/src/journey/ppg.ts`):
  - 25 samples/s.
  - Perfusion (AC/DC) is green 2%, red 0.6%, IR 0.9%.
  - LED auto-gain targets 8 µA, between 1 and 40 mA.
  - 16-bit ADC with 50 µA full scale.
  - LED-off ambient subtraction.
  - 0.5–4 Hz band-pass.
  - NLMS motion cancel (16 taps, μ 0.2) that only learns while the wrist is moving.
  - Peaks use an adaptive threshold, with a refractory window of 0.55 × the median gap.
  - bpm = 60 ÷ median of the last 5 gaps, smoothed.
  - Quality flag from the gaps' coefficient of variation (< 0.10 good, < 0.20 fair, else poor; "lost" after 3 s without a beat).
  - **"--" while it re-measures.**
- **Tissue model** (`tissue.ts`): a 2-D Monte-Carlo photon walk through epidermis, dermis and fat, with melanin per skin tone, vessels that swell with the pulse, and a light barrier.
- **Heart rate lab** (`heart.tsx`): a second, spectral pipeline. It takes an 8 s window, band-passes it, applies least-squares motion cancel, then picks the tallest spectral peak between 30 and 240 bpm. While walking (true HR 96, cadence 112 steps/min) it reads **112 without motion correction**: cadence lock.

**Where WearLab agrees or disagrees with what the course taught:**

- **Agrees: PPG is not ECG.** WearLab keeps separate optical and electrical pipelines. See [[21-concepts/ecg-and-atrial-fibrillation|ECG and AFib]].
- **Agrees, and quantifies, "motion can mimic the pulse" (p. 21).** WearLab's motion-cancel blind spot sits at its arm-swing rate of 1.42 Hz, about 85 bpm. The course example uses 1.5 Hz. `test-journey.ts` deliberately doesn't test that rate and documents it instead. In a probe, HR between about 80 and 90 bpm while running read 7–36 bpm wrong, the quality flag still said "good" part of the time, and the number never blanked. ^[inferred]
- **Different estimator.** The course computes pulse rate as 60 / *mean* IBI (p. 20). WearLab uses the *median* of recent gaps plus smoothing in the Journey, and a *spectral peak* in the lab. Both illustrate the course's "every step is a vendor choice" (p. 5). ^[inferred]
- **Skin tone** (ambiguous on slide p. 37). WearLab's model reads HR within 2.5 bpm on all four tones because the LED auto-gain compensates. Green on the deepest tone hits the 40 mA cap and returns less light than the target. That matches [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent et al. 2020]] (no significant skin-tone effect), but it is a model assumption, not evidence. ^[inferred]
- **Missing data** (p. 38). WearLab models it as "--" or "lost" (no reading) rather than a wrong number. The course's API samples carry no quality flag, only `motionContext`, so we can't see the device's own quality state. ^[inferred]

## Implications for the Cognitive Performance Agent

- Treat watch HR as a **sparse, synced, point-sampled estimate**, not a live continuous signal. Store `motionContext` and the sample count per feature window. ^[inferred] → [[05-data/data-pipeline|Data pipeline]]
- **Down-weight or exclude HR recorded while ACTIVE** (e.g. during a suggested walk) when judging physiological state, because this is where PPG is least reliable. ^[inferred] → [[04-agent-engine/performance-model|Performance model]]
- Overnight HRV is the most favourable PPG condition (still, low motion), which supports our choice of **overnight RMSSD as daily context** rather than daytime HRV. ^[inferred]
- Never let the LLM describe PPG output as an ECG or as a diagnosis, consistent with our agent guardrails. ^[inferred] → [[04-agent-engine/multi-agent-decision|Multi-agent decision]]
- **Copy WearLab's "not enough signal" behaviour:** show "--" rather than a stale or imputed HR, and grade windows good/fair/poor. We only have point samples, so grade on sample count, `motionContext` and steps in the window, not on HR plausibility. A locked-on wrong reading can look perfectly regular. ^[inferred]
- **Cadence-lock guard:** flag HR samples where steps > 0, and treat |HR − steps per minute| < 5 as a likely cadence lock. Walking cadence (about 100–120 steps/min) overlaps walking HR. ^[inferred] Details: [[32-wearlab/heart-signal-pipelines|Heart signal pipelines]].

## Sources

- `binf4070-2026/week-03/slides-03.pdf`: pp. 3, 5, 19–23, 28, 36–38 (pp. 19–21, 28 and 37–38 viewed as images).
- `binf4070-2026/week-03/lab-03.ipynb`: heart-rate DataPoint shape and Part 2.2 notes.
- Course reading: [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent et al. 2020]].
- WearLab: `wearlab/src/journey/ppg.ts`, `tissue.ts`, `wearlab/scripts/test-journey.ts` (run read-only, all checks passed), `wearlab/src/lab/labs/heart.tsx`; https://wearlab-learn.vercel.app. Summarised on [[32-wearlab/heart-signal-pipelines|WearLab heart signal pipelines]].
