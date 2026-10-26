---
title: Heart Rate Variability (HRV)
category: 21-concepts
tags: [physiology, wearables]
aliases: [HRV, RMSSD]
relationships:
  - target: "[[05-data/data-sources]]"
    type: related_to
  - target: "[[32-wearlab/heart-signal-pipelines]]"
    type: related_to
  - target: "[[21-concepts/photoplethysmography]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, "wearlab/src/lab/labs/hrv.tsx", "wearlab/src/data/topics.ts", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app"]
summary: Variation in time between heartbeats, usually reported by watches as overnight RMSSD in ms. The project uses it only as daily context, never as a live focus score.
provenance:
  extracted: 0.58
  inferred: 0.39
  ambiguous: 0.03
base_confidence: 0.57
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Heart Rate Variability (HRV)

The variation in time between consecutive heartbeats. ^[inferred] Wearables commonly summarize it as **RMSSD** (root mean square of successive differences), in milliseconds. ^[inferred]

## How WearLab implements it

Our teammate's [[32-wearlab/32-wearlab|WearLab]] teaches HRV in an interactive lab (`wearlab/src/lab/labs/hrv.tsx`). Full detail is on [[32-wearlab/heart-signal-pipelines|WearLab heart signal pipelines]] §3.

- **Beats:** 30 s of an ECG-style trace at 250 Hz. Each beat interval = steady rate + breathing (respiratory sinus arrhythmia) + small jitter. Beats are detected above a fixed level, at least 0.25 s apart, with parabolic sub-sample timing.
- **RR intervals → successive differences → RMSSD = √(mean of squared differences)**, in ms. HR = 60000 ÷ mean RR.
- **States:** relaxed, normal, stressed and workout, plus a slow-breathing toggle (6 vs 15 breaths/min). Measured RMSSD at normal breathing was about 58, 37, 19 and 12 ms. Slow breathing raised each by about 3–10 ms. ^[inferred] (from my probe of the lab code)
- **Lab guidance:** compare with **your own usual baseline**, not with other people. "Real watches measure for at least a minute, often over several minutes of sleep." One low reading means little, and a trend over days tells you more.
- **Verdict bands in the lab:** ≥ 50 ms "high", 30–50 "ordinary", < 30 "low". Typical resting values given are "relaxed 50–80 ms, stressed 15–25 ms".
- WearLab's **One Night** journey derives overnight RMSSD from simulated beats and keeps a gap only if it matches its neighbours (PLAN §7.1). See [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]].

**What breaks it.** The lab trace is clean, so it never shows artefacts itself. My probe of its code shows how fragile RMSSD is: ^[inferred]
- Dropping **one** beat from 30 s of a "normal" heart moved RMSSD from 36.6 to 221 ms.
- One spurious extra beat moved it to 104 ms.
- ±20 ms alternating timing jitter, a stand-in for blurry PPG peaks, moved it to 92 ms.

**Course comparison** ([[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]], p. 22):
- **Agrees on the definition.** RMSSD is computed exactly as taught, on ECG-style R peaks, the course's NN-interval reference.
- **Agrees that PPG timing is blurrier than ECG.** The lab says so in text.
- **Differs:** the lab skips the course's "handle artifacts" step.
- **Differs:** its absolute bands (≥ 50 / < 30 ms) cut against the baseline-relative reading both sources recommend. ^[ambiguous]

## How the Cognitive Performance Agent uses it

- Read as **overnight RMSSD** from the watch, via Google Health in Raghavan's deck.
- Interpreted as a **change from the student's own usual overnight level**, so a personal baseline is needed.
- It is **daily context, not a live focus score**. Don't assume continuous daytime HRV is available.
- Whether HRV improves prediction beyond laptop data is an **open test**, not an assumption. See [[04-agent-engine/performance-model|Performance model]].
- An LLM must never infer a fatigue score directly from HRV. Numeric code handles it.
- **Don't copy WearLab's absolute bands** into the agent. Keep the personal-baseline comparison, and treat a single night's large jump as a possible artefact (one missed beat can multiply RMSSD several-fold) before treating it as a change in state. ^[inferred]
- Breathing rate alone shifts RMSSD, which is another reason to prefer the overnight value (steady sleep breathing) over any daytime spot reading. ^[inferred]

## Sources

- [[31-decks/raghavan-architecture-deck]] — slides 2, 4, 6 (cites Google Health sleep/vitals data-type docs)
- WearLab: `wearlab/src/lab/labs/hrv.tsx` (model and captions; the probe ran its model section unchanged), `wearlab/src/data/topics.ts` (`hrv` topic), `wearlab/docs/PLAN.md` §7.1; https://wearlab-learn.vercel.app. Summarised on [[32-wearlab/heart-signal-pipelines|WearLab heart signal pipelines]].
- Course: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3]] p. 22.
