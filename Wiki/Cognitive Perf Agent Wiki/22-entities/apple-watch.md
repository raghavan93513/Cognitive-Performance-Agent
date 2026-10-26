---
title: Apple Watch
category: 22-entities
tags: [entity, brand, competitor, wearables]
aliases: [Apple, Apple Watch Ultra, Apple Watch Series]
relationships:
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[21-concepts/ecg-and-atrial-fibrillation]]"
    type: related_to
  - target: "[[12-business/competitive-landscape]]"
    type: related_to
  - target: "[[05-data/data-sources]]"
    type: related_to
sources:
  - "wearlab/src/timemachine/apples.ts"
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/data/brands.ts"
  - "wearlab/docs/PLAN.md"
  - "https://wearlab-learn.vercel.app/history/apple"
summary: Apple's smartwatch (11 main models 2015–2025 plus 3 Ultras in WearLab), built around the Digital Crown and the finger-on-crown ECG; data reaches apps via HealthKit.
provenance:
  extracted: 0.75
  inferred: 0.22
  ambiguous: 0.03
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Apple Watch

**What it is.** "The smartwatch with a Digital Crown: 11 models from the 2015 original to Series 11, and the three Ultras." That makes 14 models in WearLab. History: [[32-wearlab/brand-histories|Brand histories]].

**Form factor.** A watch, drawn portrait (read along the strap). Every model in the catalog has a Digital Crown and wireless charging. From Series 3 the catalog shows the GPS + Cellular model.

**Key idea: the ECG.** WearLab's key topic is "How it spots atrial fibrillation with a finger on the crown", with the **ECG** lab (atrial fibrillation) and a quiz. See [[21-concepts/ecg-and-atrial-fibrillation|ECG and atrial fibrillation]]. From Series 4 there is an electrode cap on the crown and a ring electrode round the back crystal.

## Line-up (from `apples.ts`)

| Line | Models (release) |
|---|---|
| Apple Watch (11) | original Apr 2015 · Series 2 Sep 2016 · 3 Sep 2017 · 4 Sep 2018 · 5 Sep 2019 · 6 Sep 2020 · 7 Oct 2021 · 8 Sep 2022 · 9 Sep 2023 · 10 Sep 2024 · 11 Sep 2025 |
| Ultra (3) | Ultra Sep 2022 · Ultra 2 Sep 2023 · Ultra 3 Sep 2025 |

Series 1 (Sep 2016) and Apple Watch SE (from Sep 2020) are events, not models.

## Hardware milestones

- **Original (2015):** optical HR (green + infrared), NFC, Wi-Fi, a speaker and wireless charging. It is the first in the app with wireless charging and a speaker.
- **Series 2:** GPS. **Series 3:** cellular and the altimeter. A Bosch pressure sensor was already inside Series 2 but not advertised.
- **Series 4:** ECG electrodes (asleep until 6 Dec 2018) and an LTPO screen. **Series 5:** compass and always-on.
- **Series 6:** blood oxygen. It is also the first model where Apple published its LED make-up: four clusters of green, red and infrared LEDs and four photodiodes. Earlier counts are illustrative. Series 6 also brought U1 Ultra Wideband, and Force Touch was gone.
- **Series 8:** two temperature sensors (one on the back, one under the display). **Series 10:** depth and water temperature, 9.7 mm thick. **Series 11:** 5G, up to 24 hours. The catalog notes hypertension notifications need no new hardware and reached Series 9 and 10 by software.
- **Ultra only:** dual-frequency GPS, the Action button and an 86-dB siren. **Ultra 3:** satellite messaging.
- **Battery:** the shortest in the app. Up to 18 hours (0.75 days) on every main model through Series 10, 24 hours on Series 11, and 36–42 hours on the Ultras.

## Health events

- **6 Dec 2018:** watchOS 5.1.2 switched on ECG for Series 4 in the US, plus irregular rhythm notifications from the optical sensor for Series 1 and later. The FDA had granted both a De Novo classification in Sep 2018.
- **16 Mar 2019 (Apple Heart Study):** 419,297 participants. 0.52% got an irregular-rhythm notification, and AF was confirmed 84% of the time when an ECG patch was worn at the same time.
- **18 Jan 2024:** Blood Oxygen was disabled on Series 9 and Ultra 2 sold in the US after the Masimo patent ruling. **14 Aug 2025:** a redesigned version returned, with the iPhone calculating the result.

## What it measures today (Series 11 / Ultra 3)

Accelerometer, gyroscope, compass, altimeter, depth, water temperature, ambient light, optical HR, red + infrared (SpO2), ECG, skin temperature, mic, GPS (multi-band on the Ultra), Bluetooth, Wi-Fi, NFC, U1, and 5G (plus satellite on the Ultra 3). No EDA in any Apple Watch in the catalog.

## "Asleep then woken"

- **ECG on Series 4:** shipped 21 Sep 2018, switched on 6 Dec 2018.
- **Blood Oxygen:** the reverse case, switched *off* for some US watches in Jan 2024 and restored in Aug 2025.

## Data access relevance for us

- Apple Watch data reaches third-party apps through **Apple HealthKit** on iOS, the route Alexa's design proposes behind a common adapter. Raghavan's deck and the course use **Google Health** instead. Which one we use is open: [[05-data/data-sources|Data sources]] and [[24-synthesis/open-decisions|Open decisions]] #4. ^[ambiguous]
- The Blood Oxygen episode shows that a feature's availability can depend on **region and purchase date**, not just the model. Our pipeline must treat each data type as optional. ^[inferred]
- Sleep stage naming differs: the course notes N1 is "Core" on Apple and "Light" on Fitbit and Oura ([[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]], [[21-concepts/sleep-staging|Sleep staging]]).

Concepts: [[21-concepts/ecg-and-atrial-fibrillation|ECG and AF]] · [[21-concepts/photoplethysmography|PPG]] · [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO2)]] · [[21-concepts/skin-temperature-trends|Skin temperature trends]] · [[21-concepts/sleep-staging|Sleep staging]].

## What this means for the Cognitive Performance Agent

- Apple's health features that need regulatory clearance (ECG, irregular rhythm notifications) mark the line we must **not** cross. We are a wellness tool, not a diagnostic one, and our agent should never interpret rhythm or SpO2 as a medical finding. See [[13-trust-safety/privacy-and-consent|Privacy and consent]] and [[12-business/competitive-landscape|Competitive landscape]]. ^[inferred]
- Apple's 18-hour battery means the watch is likely off-wrist for charging at some point each day. Expect daily gaps in Apple-sourced data and record coverage per window. ^[inferred]

## Sources

- `wearlab/src/timemachine/apples.ts` (header sourcing rules, models, events, facts with source links)
- `wearlab/src/timemachine/compare.ts`, `wearlab/src/data/brands.ts`, `wearlab/docs/PLAN.md` §2.2, §5
- Live: https://wearlab-learn.vercel.app/history/apple
