---
title: What We Reuse from WearLab
category: 32-wearlab
tags: [wearlab, synthesis, decision]
aliases: [WearLab reuse, WearLab assets]
relationships:
  - target: "[[32-wearlab/motion-sleep-recovery-pipelines]]"
    type: derived_from
  - target: "[[32-wearlab/heart-signal-pipelines]]"
    type: derived_from
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[24-synthesis/open-decisions]]"
    type: related_to
sources: ["wearlab/src/sleep/*", "wearlab/src/steps/*", "wearlab/src/journey/ppg.ts", "wearlab/src/lab/*-model.ts", "wearlab/src/timemachine/compare.ts", "https://wearlab-learn.vercel.app"]
summary: What WearLab gives the Cognitive Performance Agent — a synthetic data generator, signal-quality rules, a personal-baseline recipe, evidence-by-construction, brand data and design — and what each would take.
provenance:
  extracted: 0.45
  inferred: 0.55
  ambiguous: 0.0
base_confidence: 0.55
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T21:45:00Z
updated: 2026-10-26T21:45:00Z
---

# What We Reuse from WearLab

[[32-wearlab/32-wearlab|WearLab]] already contains working, tested versions of several things the [[01-foundation/project-overview|Cognitive Performance Agent]] needs. The helpers ran WearLab's own test scripts read-only, and all passed: journey, ECG 44, steps 51, sleep 80, recovery 43, temperature 21, battery 31, compare 617, Time Machine 27,231.

> [!success] Reuse approved (2026-10-26)
> Heramb, WearLab's author, approved reusing its code. See [[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data|ADR-001]]. Still to do: add a licence file to WearLab (MIT recommended) so the vendored copy carries one.

## 1. A synthetic-data generator for the demo (highest value)

**Now planned:** [[05-data/synthetic-data-generator|Synthetic data generator]].

- **What exists.** `src/sleep/night.ts`, `band.ts`, `classify.ts` and `model.gen.ts` build a full night in about 0.1 s: a lab hypnogram, every heartbeat, six features per 30-second page, the band's staging and a morning report. `src/lab/recovery-model.ts` adds minute-by-minute daytime HR and night-to-night physiology. `src/journey/ppg.ts` (`PpgSim`) is seeded, needs no browser, and simulates a day of PPG heart rate in about 4 s. `src/steps/sim.ts` produces step streams. All are plain TypeScript that runs with `node --experimental-strip-types`, with no npm packages. → [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]], [[32-wearlab/heart-signal-pipelines|Heart-signal pipelines]]
- **Why it matters.** The course lets teams use a synthetic-data path, and the showcase demands a recorded fallback and honest labelling of mocked data. → [[30-course/project-requirements|Project requirements]] We need believable student days (a night, then study sessions, then breaks), and this is most of that.
- **What it would take** (estimated 1–2 days):
  - copy about 10 files;
  - add a **person layer** (today resting HR is redrawn each night with no carry-over);
  - add a **calendar**, and free the fixed 23:00–07:00 night;
  - add **laptop-activity and study-task streams**, which WearLab doesn't model;
  - write output in **Google-Health-shaped records**, so the demo exercises our real ingest path. → [[05-data/data-pipeline|Data pipeline]]
- **Limits.** PPG simulation only models a *running* arm swing, so walking needs scripting. Staging accuracy of about 81% is measured on the same generator it was trained on; the course cites 69–83% for real devices. Never present simulated accuracy as real. → [[21-concepts/sleep-staging|Sleep staging]]

## 2. Signal-quality rules for our Signal agent

From the heart-signal work, these feed [[04-agent-engine/multi-agent-decision|Multi-agent decision]] and [[05-data/data-pipeline|Data pipeline]]:
- **Show "--", never a stale or imputed number.** It matches our abstain rule.
- **Grade HR quality from beat-interval consistency:** good below 0.10 coefficient of variation, fair below 0.20, otherwise poor.
- **Distrust wrist HR while steps are being counted.** Without motion correction, walking makes HR lock onto step cadence (112 bpm shown for a true 96; 124 with a loose strap). Running near the arm-swing rate (about 80–90 bpm) gives 7–36 bpm errors, and the quality flag can still say "good". Proposed guard: ignore HR when steps > 0, and flag when |HR − steps per minute| < 5. → [[21-concepts/photoplethysmography|PPG]]
- **Consequence for the "short walk" suggestion:** don't use HR *during* the walk as evidence it worked. Measure the follow-up task. → [[12-research/evaluation-plan|Evaluation plan]]
- **HRV is fragile.** One missed beat takes RMSSD from 37 to 221 ms, so require clean beat series and use overnight values only. → [[21-concepts/heart-rate-variability|HRV]]

## 3. A personal-baseline recipe for the performance model

The temperature lab's design avoids both failures of the plain 7-day z-score shown in course week 7 (a missed sick day and a false alarm):
1. one robust number per night;
2. a **28-night look-back**;
3. a **14-night learning period** before alerting;
4. thresholds in natural units;
5. *plus our addition:* leave flagged days out of the baseline. ^[inferred]

Prior art backs this. WHOOP's Stress Monitor (a two-week normal), Garmin HRV Status and Oura all compare you to your own baseline. → [[04-agent-engine/performance-model|Performance model]], [[21-concepts/skin-temperature-trends|Skin temperature trends]], [[21-concepts/recovery-and-strain|Recovery and strain]]

**One conflict to settle:** the HRV lab uses absolute bands (≥ 50 / < 30 ms), which go against our personal-baseline rule. For our product, use the personal baseline. ^[inferred]

## 4. Which wearable signals deserve a place in "keep studying or take a break?"

| Use as context | Don't use |
|---|---|
| Sleep quantity and timing (last night) | Deep / REM minutes (off by about 28% a night even in simulation) |
| Overnight composite: HRV, resting HR, breathing vs personal normal | Strain score |
| Minutes since last movement | Floors, GPS, fall detection |
| Temperature-deviation flag (possible illness) | Live HR during movement |

This narrows our [[05-data/data-sources|Data sources]] and [[04-agent-engine/performance-model|Performance model]] features. ^[inferred]

## 5. Evidence that is true by construction

`src/timemachine/compare.ts` `insights()` only writes a sentence when the checked data supports it. It's a small, ready pattern for our Evidence agent: generate rationale sentences from verified records with templates, and let the LLM only choose and phrase among them. That's the opposite of free text that could invent a claim. → [[04-agent-engine/multi-agent-decision|Multi-agent decision]] ^[inferred]

WearLab's **sourcing rules** carry over to our evidence corpus too: take the union of sources, carry a value over rather than guess it, and flag illustrative values. → [[32-wearlab/brand-histories|Brand histories]]

## 6. Product, market and design

- **Key on data types, not device models.** Hardware ships switched off and wakes later (SpO₂, ECG), and features get switched off (Apple Blood Oxygen in the US, 2024–25, after a court ruling). So decide per user, per day, which data types are actually present. → [[05-data/data-sources|Data sources]]
- **Positioning.** Every brand already covers the physiological core: optical HR, HRV, sleep, temperature, SpO₂. Our difference has to be laptop context, measured study-task performance, and sourced suggestions that can abstain. → [[24-synthesis/competitive-landscape|Competitive landscape]]
- **"Learn why" deep links.** Every WearLab topic and quiz has a stable hash route, e.g. `https://wearlab-learn.vercel.app/#/how/hrv`. A suggestion's rationale could link "why your watch's overnight HRV matters" straight to the explainer, turning each nudge into a chance to learn. → [[32-wearlab/product-tour|Product tour]]
- **A UI starter.** The React 19 + Vite + Tailwind v4 + zustand stack is teammate-built and deployed, so it's a ready template for our frontend if we go web or Electron + React. → [[07-backend/tech-stack|Tech stack]]
- **Explain cards.** WearLab's What / Simple / Like… / Deep dive card is a good shape for our "why this suggestion" panel. → [[32-wearlab/teardowns-and-parts|Teardowns and parts]], [[08-frontend/student-interface-and-feedback|Student interface]]
- **Design language and the no-game stance.** WearLab's dark theme, chunky UI and "quiet ✓, no streaks" approach suit a tool that shouldn't nag students. → [[32-wearlab/architecture|Architecture]], [[32-wearlab/curriculum-and-quizzes|Curriculum and quizzes]], [[09-design/09-design|Design]]
- **Engineering habits worth keeping.** Plain-TypeScript models tested headless, and a validator that checks every cross-reference. → [[11-engineering/11-engineering|Engineering]]

## Gaps WearLab doesn't cover

- The course's loaner **Fitbit Air** isn't in WearLab's Fitbit catalog, which ends at the Charge 6 / Sense 2. → [[22-entities/fitbit|Fitbit]]
- No laptop or behavioural signals, and no study-task model. Those are ours to build.

## Sources

- Helper reports from reading and test-running `~/Desktop/Fitbit` read-only (2026-10-26)
- [[32-wearlab/heart-signal-pipelines]] · [[32-wearlab/motion-sleep-recovery-pipelines]] · [[32-wearlab/brand-histories]]
