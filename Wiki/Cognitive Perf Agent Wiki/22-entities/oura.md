---
title: Oura
category: 22-entities
tags: [entity, brand, competitor, wearables]
aliases: [Oura Ring, Oura Ring 4, Oura Ring 5, ŌURA]
relationships:
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[21-concepts/skin-temperature-trends]]"
    type: related_to
  - target: "[[12-business/competitive-landscape]]"
    type: related_to
sources:
  - "wearlab/src/timemachine/ouras.ts"
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/data/brands.ts"
  - "wearlab/docs/PLAN.md"
  - "https://wearlab-learn.vercel.app/history/oura"
summary: Smart ring (5 generations, 2015–2026 in WearLab) that reads the finger, built around night-by-night temperature trends, sleep and HRV.
provenance:
  extracted: 0.72
  inferred: 0.24
  ambiguous: 0.04
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# Oura

**What it is.** "A smart ring that reads your finger instead of your wrist: 5 generations from the 2015 Kickstarter ring to the Ring 5." The Kickstarter raised $651,803 from 2,383 backers against a $100,000 goal. Gen 1 was "a sleep tracker you wear as a ring" and measured only night-time heart rate. History: [[32-wearlab/brand-histories|Brand histories]].

**Form factor.** A ring only, with no screen and no buttons, and everything inside a wall under 3 mm thick. Oura is the first ring in WearLab, drawn with its own ring layout (`layoutRing` in `model.ts`). LEDs, light sensors and temperature sensors face the palm.

**Key idea: temperature trends.** WearLab's key topic for Oura is "How it tracks your temperature, night after night", with a lab and a quiz in the Skin temperature topic. See [[21-concepts/skin-temperature-trends|Skin temperature trends]]. On the Compare page, Oura Gen 1 had a skin temperature sensor in Dec 2015. The next model in the app with one, the Fitbit Sense, came 5 years later.

## Line-up (from `ouras.ts`)

| Model | Release | Case | Optics (green / red / IR / photodiodes) | Temp sensors | Battery |
|---|---|---|---|---|---|
| Gen 1 | Dec 2015 | ceramic | 0 / 0 / 1 / 1 | 1 (estimate) | every third day |
| Gen 2 | Apr 2018 | titanium | 0 / 0 / 2 / 1 | 2 (estimate) | about 1 week |
| Gen 3 | 15 Nov 2021 | titanium | 2 / 1 / 1 / 2 | 7 | up to 7 days |
| Ring 4 | 15 Oct 2024 | titanium | 2 / 2 / 2 / 3 | 1 | 5–8 days |
| Ring 5 | 4 Jun 2026 | titanium | 2 / 2 / 2 / 2 | 1 | 6–9 days |

Ring wall thickness is 2.55 mm (Gen 2, review), 2.7 mm (Gen 3, review), 2.88 mm (Ring 4, official) and 2.28 mm (Ring 5, official). Width is 7.9 mm for Gen 2–4 and 6.09 mm for Ring 5 ("forty percent smaller"). A Ring 4 Ceramic note (1 Oct 2025) puts the same insides in a zirconia shell.

## Hardware and feature milestones

- Gen 1–2 read the pulse with **infrared only**.
- Gen 3 added green and red light, seven temperature sensors and a membership. Oura says it samples light 250 times a second from LEDs on either side of the finger.
- **26 Jul 2022:** Gen 3's red LED was switched on for blood oxygen during sleep and Breathing Regularity (nights longer than three hours).
- **2 Aug 2022:** Natural Cycles began using the ring's night-time temperature.
- **Sep 2023:** Cycle Insights. **10 Oct 2023:** **Daytime Stress** (HR, HRV, motion and temperature through the day turned into moments of stress and recovery).
- **May 2024:** Cardiovascular Age (estimated from pulse-wave shape). **Dec 2024:** **Symptom Radar** (temperature, breathing rate, resting HR, HRV and inactivity watched together for early signs of illness).
- Ring 5 stores 3 days of data between syncs, down from 7 on Ring 4. Oura claims a pulse signal up to 100 times stronger than a wrist wearable's.

## What it measures today (Ring 5)

Accelerometer, optical HR, red + infrared (SpO2), skin temperature and Bluetooth. Oura never advertised a gyroscope, though TechInsights found one built into Gen 3's motion chip. There is no GPS, screen, ECG, EDA, NFC or Wi-Fi in any Oura in the catalog.

## "Asleep then woken"

Gen 3 blood oxygen: shipped Nov 2021, switched on 26 Jul 2022.

## Data access relevance for us

- WearLab doesn't cover Oura's API or export. Whether Oura data could reach us (directly or through HealthKit or Health Connect) is unresearched. ^[inferred]
- A ring's **3-day sync buffer** on Ring 5 (down from 7) is a reminder that data arrives late and in batches. This matches the course point that wearable data is synced, not live: [[05-data/data-sources|Data sources]]. ^[inferred]
- Sleep stage naming differs by vendor (the course notes N1 is "Light" for Fitbit and Oura, "Core" for Apple). See [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]] and [[21-concepts/sleep-staging|Sleep staging]].

Concepts: [[21-concepts/skin-temperature-trends|Skin temperature trends]] · [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/sleep-staging|Sleep staging]] · [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO2)]] · [[21-concepts/recovery-and-strain|Recovery and strain]] · [[21-concepts/photoplethysmography|PPG]].

## What this means for the Cognitive Performance Agent

- Oura's whole product is **change from your own normal**, night after night. That is the framing our overnight-HRV and sleep features should use, not population thresholds. ^[inferred]
- Daytime Stress and Symptom Radar mean Oura already makes "stress" and "you may be getting ill" claims. Our product should make neither. We predict study-task performance and suggest continue, walk or break, with sources or abstention. See [[12-business/competitive-landscape|Competitive landscape]] and [[13-trust-safety/privacy-and-consent|Privacy and consent]]. ^[inferred]

## Sources

- `wearlab/src/timemachine/ouras.ts` (header sourcing rules, models, events, facts with source links)
- `wearlab/src/timemachine/compare.ts`, `wearlab/src/data/brands.ts`, `wearlab/docs/PLAN.md` §2.2, §5
- Live: https://wearlab-learn.vercel.app/history/oura
