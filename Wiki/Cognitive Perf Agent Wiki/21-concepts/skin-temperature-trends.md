---
title: Skin temperature trends
category: 21-concepts
tags: [concept, physiology, wearables, privacy]
aliases: [skin temperature, temperature deviation, nightly temperature baseline, Oura temperature]
relationships:
  - target: "[[32-wearlab/motion-sleep-recovery-pipelines]]"
    type: derived_from
  - target: "[[22-entities/oura]]"
    type: related_to
  - target: "[[21-concepts/recovery-and-strain]]"
    type: related_to
  - target: "[[13-trust-safety/privacy-and-consent]]"
    type: related_to
sources: ["wearlab/src/lab/temp-model.ts", "wearlab/scripts/test-temp.ts", "wearlab/src/lab/labs/temp.tsx", "wearlab/src/data/topics.ts", "wearlab/src/sleep/night.ts", "https://wearlab-learn.vercel.app"]
summary: Nightly skin temperature is one robust number per night compared with a learned personal baseline. WearLab's alert at +0.5 °C catches a cold but not a menstrual cycle, a template for our baselines.
provenance:
  extracted: 0.68
  inferred: 0.29
  ambiguous: 0.03
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Skin temperature trends

A wearable's skin-temperature sensor is a resistor that changes with heat. It sits against the finger or wrist (WearLab topic `temp`). **A single reading means little**, so the device compares **tonight with your usual nights** and reports the change. [[22-entities/oura|Oura]] built much of its ring around this: cycles, early signs of illness, recovery. WearLab's lab (`wearlab/src/lab/temp-model.ts`) implements the method. Parameters are on [[32-wearlab/motion-sleep-recovery-pipelines|WearLab: motion, sleep and recovery pipelines]] §4.

## The method

1. **Readings through the night.** WearLab simulates one reading every 5 min for 8 h (96 samples). The finger warms by about 3.6 °C as its blood vessels open after you fall asleep. It dips for a while whenever a hand leaves the covers.
2. **One steady number per night.** Skip the first hour, then take the **median** of the rest, so the dips don't pull it down. The code notes that Oura describes an average over your sleep and has its own ways of dropping the dips.
3. **Compare with your baseline.** Subtract the **mean of up to 28 earlier nights**. The baseline only looks backwards: changing a later night never changes an earlier comparison.
4. **Learn first.** Make **no comparisons for the first 14 nights**. The code cites Oura learning your baseline over the first couple of weeks, and says Oura itself uses a two-month baseline.
5. **Flag** nights warmer than the baseline by more than a threshold.

## The patterns, and how to tune the alert

| Pattern | Size in WearLab | Flagged at +0.5 °C? |
|---|---|---|
| Uneventful month | within ±0.2 °C | no |
| Menstrual cycle, warm phase (from day 15, more than 10 nights) | +0.3 °C | no |
| Night of drinks | +0.35 °C | no |
| Hot bedroom | +0.12 °C | no |
| Cold, first night (then +0.8, +0.45, +0.2) | +1.0 °C | **yes** |

- **+0.5 °C (0.45–0.55 works) catches the cold and nothing else**, wherever in the cycle the cold lands.
- **+0.15 °C** fires on the cycle's warm phase.
- **+1.3 °C** misses the cold.

The lesson is that the threshold sets the trade-off between false alarms and misses, and it should be set in **natural units against known confounders**.

## Why this baseline beats a 7-day z-score

The course's [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]] lab flags resting HR with a z-score against the previous 7 days. It **misses the third sick day** and raises a **false alarm**. WearLab's temperature method sidesteps both failures ^[inferred]:

- **Longer memory.** A 4-night cold totals 2.45 °C·nights. In a 28-night baseline that shifts the mean by about +0.09 °C. In a 7-night baseline, the first two sick nights alone shift it by about +0.26 °C.
- **No SD in the denominator.** A fixed threshold in °C can't be inflated by the sick nights entering the window.
- **A learning period** avoids judging against a tiny, noisy history.
- **What it still lacks:** flagged nights aren't excluded from later baselines, and there's no robust spread for people whose nightly noise differs. Add both in our version.

## What this means for the Cognitive Performance Agent

- **Copy this baseline recipe for every slow daily signal** (resting HR, overnight RMSSD, sleep duration, temperature) ^[inferred]:
  - a robust nightly summary
  - a 28-day look-back that excludes today and flagged days
  - a 14-night learning period, abstaining before it
  - thresholds in natural units, combined with a z-score

  → [[04-agent-engine/performance-model|Performance model]]
- **Temperature, if used at all, is a "take it easy today" flag.** Possible illness lowers the bar for suggesting breaks. It is never named as illness and never a diagnosis. ^[inferred]
- **Privacy.** Nightly temperature reveals the menstrual cycle. Don't infer, store or surface cycle phase. If temperature is ingested, keep only the deviation flag, and ask for explicit consent ([[13-trust-safety/privacy-and-consent|Privacy and consent]]). It may be simpler to leave temperature out of the MVP. ^[inferred]
- **Synthetic data.** `temp-model.ts` generates 56 nights with cycle, cold, drinks and hot-room events. That is a ready test set for our anomaly-flag code, including the "doesn't fire on the cycle" check. ^[inferred]

## Sources

- `wearlab/src/lab/temp-model.ts`; `wearlab/scripts/test-temp.ts` (21 checks, all passing, run 2026-10-26); `wearlab/src/lab/labs/temp.tsx`; `wearlab/src/data/topics.ts` (topic `temp`); `wearlab/src/sleep/night.ts` (about +1 °C wrist warming after sleep onset).
- Oura's baseline descriptions, as cited in WearLab's code comments. ^[ambiguous] Not checked against Oura directly.
- Course: [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]] lab part 2.2.
