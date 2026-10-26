---
title: Recovery and strain
category: 21-concepts
tags: [concept, physiology, wearables, ml]
aliases: [recovery score, strain score, readiness, WHOOP recovery, training load, personal baseline]
relationships:
  - target: "[[32-wearlab/motion-sleep-recovery-pipelines]]"
    type: derived_from
  - target: "[[21-concepts/heart-rate-variability]]"
    type: related_to
  - target: "[[22-entities/whoop]]"
    type: related_to
  - target: "[[04-agent-engine/performance-model]]"
    type: related_to
sources: ["wearlab/src/lab/recovery-model.ts", "wearlab/scripts/test-recovery.ts", "wearlab/src/lab/labs/recovery.tsx", "wearlab/src/data/topics.ts", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app"]
summary: Strain (0–21 from time in heart-rate zones) and recovery (1–99% from HRV, resting HR, breathing and sleep vs your own normal). WearLab's open stand-in and the personal-baseline lessons for our model.
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

# Recovery and strain

Two daily numbers that [[22-entities/whoop|WHOOP]] built its product around. Other brands call similar scores "readiness" (WearLab topic `recovery`).
- **Strain** measures how hard your heart worked today.
- **Recovery** measures how ready last night says your body is, compared with **your own normal**.

WearLab's lab (`wearlab/src/lab/recovery-model.ts`) states plainly that **WHOOP publishes the ideas, not the formulas**. Its numbers are an open stand-in that behaves the same way. Full parameters are on [[32-wearlab/motion-sleep-recovery-pipelines|WearLab: motion, sleep and recovery pipelines]] §3.

## Strain (0–21)

- **Heart-rate zones** are shares of heart-rate reserve (the gap between resting and maximum HR). Zone 1 is 50–60% and Zone 5 is 90–100%, weighted 1 to 5. Time at 30–50% counts half. Below 30%, nothing counts.
- **Load** = Σ minutes × weight. **Strain** = 21 · ln(1 + load/22) / ln(1 + 1500/22), capped at 21. The scale is logarithmic, so each extra point takes more work than the last, and two sessions add up to less than the sum of their strains.
- **Bands** (as WearLab cites WHOOP): light < 10, moderate 10–13, high 14–17, all out 18–21. A rest day with an hour of ordinary moving about scores about 4.
- **Blind spot:** heart rate undercounts weight training.
- **Sleep need** = 7.6 h (WHOOP members' average) plus extra after a hard day. A strain of 15 adds 37 min.

## Recovery (1–99%)

Each overnight reading is compared with **the person's usual value and its usual night-to-night spread**. The result is a z-score signed so that positive means better rested, clamped to ±3:

| Input | Weight | Direction |
|---|---|---|
| HRV (overnight RMSSD) | 0.55 | higher is better |
| Resting heart rate | 0.25 | lower is better |
| Breathing rate | 0.08 | lower is better |
| Sleep performance (slept ÷ need) | 0.12 | vs 90% ± 8 |

Score = 100 / (1 + e^−(1.2·Σ weight·z + 0.55)), so an ordinary day and night land in the mid-60s. Colours: **red 1–33, yellow 34–66, green 67–99**. Skin temperature is shown but not scored.

**Why it must be personal.** The lab's two example people make the point. Sam's usual HRV is 38 ± 6 ms and Alex's is 85 ± 12 ms. An HRV of 50 ms would be a great night for Sam and a poor one for Alex.

**What moves it** (`nightOf()`, typical effect sizes):

| Night | HRV | Resting HR | Breathing | Skin temp |
|---|---|---|---|---|
| Drinks | −25% | +5 bpm | +0.3 /min | +0.2 °C |
| Coming down with a cold | −20% | +6 bpm | +1.6 /min | +0.8 °C |

Short sleep and a very hard day lower recovery more gently, and an easy day nudges HRV up. The tests confirm that drinks, illness, short sleep and a very hard day each lower the score, and that the worst combination is red.

## Personal baselines: WearLab vs the course

- **In WearLab's lab**, each person's "usual" mean and SD are fixed constants. The lab doesn't model how the baseline is learned. The temperature lab does, with a 28-night trailing mean and a 14-night learning period ([[21-concepts/skin-temperature-trends|Skin temperature trends]]).
- **The course** ([[30-course/weeks/week-07-time-series-multimodal-features|Week 7]], lab part 2.2) computes resting-HR z against the **7 previous days** and flags |z| > 2. It misses the third sick day and raises a false alarm, because sick days enter both the mean and the SD, and 7 days is a noisy SD. ^[inferred]
- **What to combine** ^[inferred]:
  - a long trailing window (about 28 days) that **excludes flagged days**
  - a robust centre and spread (median and MAD, or an SD floor)
  - a learning period before any comparison
  - z clamped to ±3
  - a **multi-signal composite** (HRV + resting HR + breathing + sleep) rather than one signal crossing a threshold
  - a minimum change in natural units

## What this means for the Cognitive Performance Agent

- **Use a recovery-style composite as a slow daily prior, not a live score.** Low recovery lowers the threshold for suggesting a break. It never overrides the student's own choice. Our numeric code computes it, never the LLM ([[04-agent-engine/multi-agent-decision|Multi-agent decision]]). ^[inferred]
- **Don't show users a brand-like 1–99% number.** The [[04-agent-engine/performance-model|Performance model]] rejects unexplained universal readiness scores. Show the inputs in plain words instead, for example "HRV below your usual for 2 nights". ^[inferred]
- **Strain is mostly irrelevant for studying students.** It measures training load, and a sitting day is near a rest day (about 4). It may matter for our **athlete** users: a high-strain day raises sleep need, which then feeds tonight's expected sleep. ^[inferred]
- **Synthetic data.** `recovery-model.ts` gives us `dayTrace()` (minute-by-minute daytime HR for a day's sessions) and `nightOf()` (overnight HRV, resting HR, breathing and temperature from strain, sleep, drinks or illness). Together they form a ready night-to-night physiology layer for the synthetic path. ^[inferred]
- Whether recovery-type features add predictive value beyond laptop data remains an **open test** ([[15-research/evaluation-plan|Evaluation plan]]). ^[inferred]

## Sources

- `wearlab/src/lab/recovery-model.ts`; `wearlab/scripts/test-recovery.ts` (43 checks, all passing, run 2026-10-26); `wearlab/src/lab/labs/recovery.tsx`; `wearlab/src/data/topics.ts` (topic `recovery`); `wearlab/docs/PLAN.md` §2.2 and §9.
- WHOOP's public descriptions, as cited in WearLab's code comments (bands, 7.6 h, 37 min). ^[ambiguous] Not checked against WHOOP directly.
- Course: [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]] lab part 2.2.
