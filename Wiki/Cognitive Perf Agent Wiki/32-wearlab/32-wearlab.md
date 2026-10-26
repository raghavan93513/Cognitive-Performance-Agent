---
title: "32 · WearLab"
category: 32-wearlab
tags: [moc, wearlab, wearables]
aliases: [WearLab, wearlab, wearlab-learn]
relationships:
  - target: "[[32-wearlab/what-we-reuse]]"
    type: related_to
  - target: "[[01-foundation/project-overview]]"
    type: related_to
sources: ["https://wearlab-learn.vercel.app", "wearlab/README.md", "wearlab/docs/PLAN.md", "wearlab git log"]
summary: Hub for WearLab, Heramb's 3D web app that teaches how wearables work. It is a product we already shipped, a source of tested signal pipelines and brand data, and a set of reusable assets.
provenance:
  extracted: 0.8
  inferred: 0.2
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# 32 · WearLab

> **How wearables really work.** A dark-mode 3D web app that takes fitness wearables apart, down to the silicon inside each chip. It follows each signal from your body to the number on the screen and explains every part in plain words with everyday analogies.

- **Live:** <https://wearlab-learn.vercel.app>
- **Source:** `~/Desktop/Fitbit` on Heramb's Mac (package `wearlab` v0.1.0). It has no git remote yet, so the code exists only on that machine.
- **Built by:** [[13-team/13-team|Heramb Chaudhari]]. 4 commits, all on 2026-09-27; the deployed build is from 2026-10-20.
- **Stack:** Vite, React 19, React Three Fiber / three.js, TypeScript, Tailwind v4, zustand. Hosted on Vercel. → [[32-wearlab/architecture|Architecture]]

![[attachments/wearlab/wearlab-home.jpg]]

## By the numbers (live site, 2026-10-26)

| | |
|---|---|
| Device types in 3D | 5: clip, band, ring, chest strap, smartwatch |
| Parts explained | 96 part kinds in the library. 91 appear in the five device trees; the other 5 are brand-only, which is why the README says 91. |
| "How it works" topics | 17: 11 measurements + 6 hardware |
| Guided journeys | 3: Photon Journey (13 chapters), One Step (16), One Night (17) |
| Interactive labs | 12 |
| Inside-the-part animations | 23 |
| Brand Time Machines | 5 brands, 66 models, 2003–2026, plus Compare brands |
| Quizzes | 52 (409 items: 313 questions + 96 cards), with no scores or locks. The validator passes. |

## Why it's in this wiki

WearLab matters to the [[01-foundation/project-overview|Cognitive Performance Agent]] in three ways: ^[inferred]

1. **A product we already shipped.** It shows the team can build polished, sourced, plain-language health-tech UX. That's useful for the proposal and the showcase. → [[13-team/13-team|Team]]
2. **A tested knowledge base about the exact signals we use.** Its PPG, HRV, sleep-staging, step-counting, recovery and temperature pipelines are plain TypeScript with headless tests. They're the most detailed explanation we have of how our input numbers are made and where they break. → [[32-wearlab/heart-signal-pipelines|Heart-signal pipelines]], [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]]
3. **Reusable assets.** Its simulators can generate synthetic wearable data, its sourced brand histories map the competition, and its explain-card pattern and design language can carry over. → [[32-wearlab/what-we-reuse|What we reuse]]

## Pages

- [[32-wearlab/product-tour|Product tour]]: every tab, route, journey, lab and quiz as a visitor sees it
- [[32-wearlab/architecture|Architecture]]: stack, data-first design, 3D engine, validator, tests, Blender pipeline, design tokens
- [[32-wearlab/teardowns-and-parts|Teardowns and parts]]: the 5 device trees, the explain card, the part library, inside views
- [[32-wearlab/heart-signal-pipelines|Heart-signal pipelines]]: PPG heart rate, HRV, SpO₂ and ECG, stage by stage
- [[32-wearlab/motion-sleep-recovery-pipelines|Motion, sleep and recovery pipelines]]: steps, sleep staging, recovery and strain, temperature, battery, floors, GPS, falls
- [[32-wearlab/brand-histories|Brand histories]]: the Time Machines and Compare brands
- [[32-wearlab/curriculum-and-quizzes|Curriculum and quizzes]]: the no-game learning design
- [[32-wearlab/what-we-reuse|What we reuse]]: what WearLab gives the Cognitive Performance Agent

Knowledge it fed elsewhere:
- **Concepts:** [[21-concepts/photoplethysmography|PPG]] · [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/blood-oxygen-spo2|SpO₂]] · [[21-concepts/ecg-and-atrial-fibrillation|ECG and AF]] · [[21-concepts/step-counting|Step counting]] · [[21-concepts/sleep-staging|Sleep staging]] · [[21-concepts/recovery-and-strain|Recovery and strain]] · [[21-concepts/skin-temperature-trends|Skin temperature trends]]
- **Brands:** [[22-entities/fitbit|Fitbit]] · [[22-entities/whoop|WHOOP]] · [[22-entities/oura|Oura]] · [[22-entities/garmin|Garmin]] · [[22-entities/apple-watch|Apple Watch]]
- **Market:** [[24-synthesis/competitive-landscape|Competitive landscape]]

## A look inside

![[attachments/wearlab/wearlab-smartwatch-teardown.jpg]]
*Smartwatch teardown: explode, X-ray and slice modes, numbered parts, "what it measures", and the device's own quiz.*

![[attachments/wearlab/wearlab-devices.jpg]]
*The five types of wearable, simplest first, each tagged with what it can measure.*

![[attachments/wearlab/wearlab-compare-brands.jpg]]
*Compare brands: five brands on one clock at true scale.*

## Sources

- Live site, browsed 2026-10-26 (screenshots above)
- `wearlab/README.md`, `wearlab/docs/PLAN.md`, git log of `~/Desktop/Fitbit`
