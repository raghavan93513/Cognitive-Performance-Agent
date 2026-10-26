---
title: WHOOP
category: 22-entities
tags: [entity, brand, competitor, wearables]
aliases: [WHOOP strap, WHOOP 4.0, WHOOP 5.0, WHOOP MG]
relationships:
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[21-concepts/recovery-and-strain]]"
    type: related_to
  - target: "[[24-synthesis/competitive-landscape]]"
    type: related_to
sources:
  - "wearlab/src/timemachine/whoops.ts"
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/data/brands.ts"
  - "wearlab/docs/PLAN.md"
  - "https://wearlab-learn.vercel.app/history/whoop"
summary: Screenless band (5 models, 2015–2025) built around Strain and Recovery, sold as a membership; the closest existing product to a "readiness" recommendation.
provenance:
  extracted: 0.72
  inferred: 0.25
  ambiguous: 0.03
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# WHOOP

**What it is.** In WearLab's words: "A screenless band worn day and night, built around Strain and Recovery: 5 models from the 2015 athletes' strap to the 5.0." It was made for athletes first. Early users included Michael Phelps and LeBron James through their trainers. History: [[32-wearlab/brand-histories|Brand histories]].

**Form factor.** A band with no screen, ever (a WearLab test checks this). Everything it shows is in the phone app. From the 2.0 on there is a slide-on battery pack, so you charge it while wearing it.

**Key idea: Recovery and Strain.** WearLab gives this its own topic, with a lab and two quizzes. See [[21-concepts/recovery-and-strain|Recovery and strain]]. Related catalog events:

- **Jul 2020:** overnight breathing rate joined the Recovery score. It is derived from how heart rate rises and falls with each breath.
- **29 Mar 2023:** the **Stress Monitor**, a live 0–3 stress level from HR and HRV against your two-week normal, with movement removed so exercise doesn't count as stress.

**Business model.** On 15 May 2018 the strap became free with a membership ($30/month, six months minimum). In May 2025 WHOOP first asked members to pay to upgrade to the 5.0, then made the upgrade free two days after launch for members with a year or more left.

## Line-up (from `whoops.ts`)

| Model | Release | What changed |
|---|---|---|
| Original WHOOP | Sep 2015 | HR, EDA, device temperature, accelerometer; battery never published |
| Strap 2.0 | Dec 2016 | Slide-on battery pack; about 36 h (WHOOP later quoted 40) |
| 3.0 | 22 May 2019 | Gyroscope; up to 5 days |
| 4.0 | 8 Sep 2021 | Blood oxygen, skin temperature, haptics, wireless charging; 3 green LEDs, 4 photodiodes |
| 5.0 | 8 May 2025 | 14+ days; 34.7 × 24 × 10.6 mm (the only published WHOOP size) |

The **WHOOP MG** launched alongside the 5.0 as an event. Its ECG electrodes are in the band's clasp (thumb and finger for 30 seconds), and it adds **Blood Pressure Insights** calibrated against a cuff every 30 days. The FDA cleared WHOOP's ECG on 4 Apr 2025. WHOOP says the 5.0 lacks the sensors for either feature.

## What it measures today (5.0)

Accelerometer, gyroscope, optical HR, red + infrared (SpO2), skin temperature, EDA (skin conductance), device temperature, Bluetooth, a vibration motor and a wireless charging coil. WHOOP doesn't list every sensor for the 5.0, so parts not mentioned as changed are carried over from the 4.0 (WearLab's rule). ^[ambiguous]

Sampling: WHOOP's research notes say the 4.0 samples HR and motion 52 times a second and computes one HR per second. WHOOP says the 5.0 records 26 times a second.

In WearLab's Compare page, the original WHOOP had **EDA** in Sep 2015. The next model in the app with EDA, the Fitbit Sense, came 5 years later.

## "Asleep then woken"

None is modelled for WHOOP. New sensing arrived with new hardware (4.0) or a sibling model (MG), and new scores arrived as software (breathing rate in Recovery, Stress Monitor).

## Data access relevance for us

- WearLab says nothing about WHOOP's data export or API. Whether WHOOP data could feed our pipeline (directly, or through HealthKit or Health Connect) needs research. ^[inferred]
- Accuracy note from the catalog: a 2021 study found the Strap 2.0 within 0.4% (HR) and about 2% (HRV) of a chest ECG **during deep sleep**. In the same catalog, DC Rainmaker called the 3.0's workout HR one of the least accurate mainstream optical sensors. Both fit the course's lesson that PPG is good at rest and weak in motion: [[21-concepts/wearable-measurement-error|Wearable measurement error]].

Concepts: [[21-concepts/recovery-and-strain|Recovery and strain]] · [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/photoplethysmography|PPG]] · [[21-concepts/skin-temperature-trends|Skin temperature trends]] · [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO2)]] · [[21-concepts/sleep-staging|Sleep staging]].

## What this means for the Cognitive Performance Agent

- WHOOP is the **closest positioning neighbour**: it already tells users how "recovered" they are and when they are "stressed". A reviewer will ask how we differ. Our answer is that we measure *performance on a study task*, use laptop behaviour, and recommend a specific short action with sources, or abstain. See [[24-synthesis/competitive-landscape|Competitive landscape]]. ^[inferred]
- The Stress Monitor's design (HR + HRV against a **two-week personal normal**, with motion removed) is a useful reference for our own baseline features on [[04-agent-engine/performance-model|Performance model]]. ^[inferred]
- The membership model shows that people pay monthly for interpretation, not hardware. ^[inferred]

## Sources

- `wearlab/src/timemachine/whoops.ts` (header sourcing rules, models, events, facts with source links)
- `wearlab/src/timemachine/compare.ts`, `wearlab/src/data/brands.ts`, `wearlab/docs/PLAN.md` §2.2, §5
- Live: https://wearlab-learn.vercel.app/history/whoop
