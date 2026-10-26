---
title: Sleep staging
category: 21-concepts
tags: [concept, physiology, wearables, ml]
aliases: [sleep stages, hypnogram, wearable sleep staging, epoch scoring]
relationships:
  - target: "[[32-wearlab/motion-sleep-recovery-pipelines]]"
    type: derived_from
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
  - target: "[[21-concepts/heart-rate-variability]]"
    type: related_to
  - target: "[[21-concepts/photoplethysmography]]"
    type: related_to
sources: ["wearlab/src/sleep/night.ts", "wearlab/src/sleep/band.ts", "wearlab/src/sleep/classify.ts", "wearlab/src/sleep/model.gen.ts", "wearlab/scripts/train-sleep.ts", "wearlab/scripts/test-sleep.ts", "wearlab/src/lab/labs/sleep.tsx", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app/journey/sleep"]
summary: How a wrist device guesses wake/REM/light/deep from movement, heartbeats and breathing in 30-second pages, how accurate that is, and which sleep outputs we should trust.
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

# Sleep staging

A sleep lab scores the night from brain waves (EEG), eye movements (EOG) and chin muscle (EMG) in **30-second pages** (epochs). This is polysomnography (PSG), the reference standard. A wrist device can't see the brain. It **guesses the stage** from how still you are and how your heart and breathing behave. WearLab's **One Night** journey implements this end to end and tests it. Parameters and results are on [[32-wearlab/motion-sleep-recovery-pipelines|WearLab: motion, sleep and recovery pipelines]]. The course treatment is [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] (pp. 24–29).

## Stages and what the body does

- Clinical stages are wake, N1, N2, N3 (deep, slow-wave) and REM. Consumer apps merge N1 and N2 into **"light"** (Week 3, p. 25). WearLab's band does the same.
- A normal night has **about five 90-minute cycles**. Deep sleep comes mostly early and REM mostly late. Brief wake-ups are normal and usually forgotten.
- WearLab's body model encodes these physiological signatures:
  - **Heart rate** is lowest in deep sleep, then light, REM and awake.
  - **HRV (RMSSD)** is highest in deep sleep, then light, then REM.
  - **Breathing** is steadiest in deep sleep and most ragged in REM.
  - **Movement**: deep sleep is still, REM brings brief twitches (the body is otherwise paralysed), and awake brings fidgeting.
  - Wrist skin warms by about 1 °C after sleep onset.

## How a band stages a night (WearLab's method)

1. **Find the sleep period from movement.** It starts at the first hour with very little movement (the code cites Fitbit's help pages) and ends at the last 10 still minutes.
2. **Turn light into heartbeats.** Keep a gap between beats only if it is within 20% of the recent ones. Movement smears beats away.
3. **Compute six numbers per page:**
   - movement
   - heart rate above the night's 10th percentile
   - 5-minute ln RMSSD relative to the night's median
   - breathing irregularity (breaths counted from the gaps between beats)
   - heart wandering over ±2 min
   - hours since sleep onset
4. **Odds per stage.** Each stage has a Gaussian with a mean and covariance, learned from labelled nights. Each covariance is blended half-and-half with the pooled one.
5. **Sleep has rules.** A Viterbi pass finds the most likely path, using learned stage-to-stage transition chances. Each page's evidence is down-weighted to **0.35** because neighbouring pages share their measurement windows.
6. **Morning report:** time asleep, minutes per stage, restlessness, awakenings, and sleep onset and wake times.

The model is trained on **14 simulated nights** (13,187 pages) whose seeds are never used for testing.

## How accurate is it?

| Evidence | Accuracy |
|---|---|
| WearLab, unseen *simulated* nights | 81% page agreement; time asleep within 3 min; deep sleep off by 28% per night |
| Beattie 2017, real people (cited by WearLab) | 69% |
| Course, PPG staging vs PSG (Week 3, p. 28) | κ ≈ 0.53–0.71, accuracy ≈ 69–83% |

Other findings from WearLab's tests:
- **Movement alone can't separate the sleep stages.** It can only say awake or asleep, and lying awake and still fools it badly: WearLab adds **87 min** of false sleep. Adding the heart cuts the error to 35 min.
- **The rules trade detail for stability.** They cut stage changes from 75 to 25 (the lab scores 46) and smooth away brief wake-ups.
- **Physiology can mislead.** After drinks, the faster heart hides deep sleep: 48 min on the band vs 88 min in the lab.
- **WearLab's 81% is optimistic.** The stager is trained and tested on the same generator, so the model and the "world" share their assumptions. Use the course's 69–83% for real devices. ^[inferred]

## Definitions we'll use

From Week 3 (p. 26):
- time in bed (TIB)
- sleep latency
- wake after sleep onset (WASO)
- total sleep time (TST) = TIB − latency − WASO
- **sleep efficiency** = TST / TIB × 100

WearLab's `report()` gives time asleep, time awake inside the period and time in bed, so efficiency can be derived from it. ^[inferred]

## What this means for the Cognitive Performance Agent

- **Trust quantity and timing more than stage minutes.** Total sleep, sleep onset and wake time, and long awakenings are robust. Deep and REM minutes are not reliable enough to drive a "keep studying or take a break" suggestion. ^[inferred] → [[04-agent-engine/performance-model|Performance model]]
- Compare last night with **the student's own need and history**, not population norms. WHOOP-style sleep need rises after a hard day; see [[21-concepts/recovery-and-strain|Recovery and strain]]. ^[inferred]
- **Laptop idle time is like movement-only staging.** Stillness is ambiguous, so don't infer rest or sleep from idle time alone. ^[inferred]
- Overnight RMSSD (our [[21-concepts/heart-rate-variability|HRV]] input) comes from this same still, low-motion window, which is the most favourable PPG condition ([[21-concepts/photoplethysmography|PPG]]). ^[inferred]
- **Synthetic nights.** WearLab's `makeNight(kind, seed)` → `analyse()` → `stage()` produces a realistic hypnogram with heartbeats, features and a band report in about 0.1 s per night. It has five kinds of night: normal, coffee, alcohol, restless and lying awake. It is a ready-made generator for our synthetic-data path once a person layer and a calendar are added (§7 of the [[32-wearlab/motion-sleep-recovery-pipelines|pipelines page]]). ^[inferred]

## Sources

- `wearlab/src/sleep/{night,band,classify}.ts`, `model.gen.ts` (structure), `wearlab/scripts/train-sleep.ts`, `wearlab/scripts/test-sleep.ts` (80 checks, all passing, run 2026-10-26), `wearlab/src/lab/labs/sleep.tsx`, `wearlab/docs/PLAN.md` §7.
- WearLab One Night journey: <https://wearlab-learn.vercel.app/journey/sleep>.
- Course: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]], slides pp. 24–29.
