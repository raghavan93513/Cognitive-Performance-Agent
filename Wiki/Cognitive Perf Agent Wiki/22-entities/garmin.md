---
title: Garmin
category: 22-entities
tags: [entity, brand, competitor, wearables]
aliases: [Garmin Forerunner, Garmin fēnix, Garmin fenix, Garmin Connect]
relationships:
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[12-business/competitive-landscape]]"
    type: related_to
  - target: "[[21-concepts/recovery-and-strain]]"
    type: related_to
sources:
  - "wearlab/src/timemachine/garmins.ts"
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/data/brands.ts"
  - "wearlab/docs/PLAN.md"
  - "https://wearlab-learn.vercel.app/history/garmin"
summary: GPS sports watches on two lines (Forerunner from 2003, fēnix from 2012; 23 models in WearLab), built around battery life measured in weeks, with HRV Status and Training Readiness.
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

# Garmin

**What it is.** "GPS watches for runners and adventurers: the Forerunner line from the 2003 wrist-top GPS, and the fēnix line from 2012." In WearLab's catalogs it is "GPS first": the Forerunner 201 (Nov 2003) is the earliest model in the whole app. History: [[32-wearlab/brand-histories|Brand histories]].

**Form factor.** A watch. Round from the Forerunner 405 on (drawn with `L = W`). Garmin-only parts in WearLab include ANT+, multi-band GPS, memory-in-pixel and transflective colour screens, solar, a flashlight, a depth sensor, LTE, satellite and storage.

**Key idea: battery life measured in weeks.** WearLab's key topic is "How a watch lasts for weeks: its power budget", with the **Battery budget** lab and a quiz in the Battery and charging topic. Catalog figures (everyday mode): Forerunner 620 and fēnix 3 up to 6 weeks (42 days), Forerunner 965 23 days (about 7 always-on), fēnix 8 AMOLED 16 days. Compare Apple's 0.75–1 day. Solar figures assume 3 hours a day outside in 50,000 lux.

## Line-up (from `garmins.ts`)

| Line | Models (release) |
|---|---|
| Forerunner (11) | 201 2003 · 305 2006 · 405 2008 · 620 2013 · 225 2015 · 935 2017 · 645 Music 2018 · 945 2019 · 955 Solar 2022 · 965 2023 · 970 2025 |
| fēnix (12) | fēnix 2012 · 2 2014 · 3 2015 · 3 HR 2016 · 5 Sapphire 2017 · 5 Plus 2018 · 6 Pro 2019 · 6 Pro Solar 2020 · 7 Sapphire Solar 2022 · 7 Pro Sapphire Solar 2023 · 8 AMOLED 2024 · 8 Pro 2025 |

## Hardware milestones

- **201 / 305:** GPS only, no motion sensor ("every number came from the satellites"). The 305 added ANT+ for a chest strap.
- **405 (2008):** round, with a touch bezel.
- **620 (Nov 2013):** colour, touch, Bluetooth and Wi-Fi. It is the first in the app with a colour screen and with Wi-Fi.
- **225 (Jul 2015):** wrist heart rate (a Mio sensor). Garmin's own **Elevate** sensor followed on the Forerunner 235 (21 Oct 2015).
- **935 / fēnix 3:** memory-in-pixel screens.
- **945 (Apr 2019):** blood oxygen. Garmin's first was the fēnix 5X Plus (Jun 2018), not in the app.
- **955 Solar (Jun 2022):** multi-band GPS and solar.
- **965 / fēnix 8:** AMOLED.
- **fēnix 7 Pro (May 2023):** ECG contacts asleep until Oct 2023.
- **Forerunner 970 (May 2025):** flashlight, ECG, speaker, and skin temperature. It is Garmin's first skin temperature sensor in the app.
- **fēnix 8 Pro (Sep 2025):** LTE and satellite messaging, 11 days before the Apple Watch Ultra 3 (the Compare page's "closest race").
- Garmin publishes **no LED counts**. Elevate Gen 5's 6 green, 2 red and 4 light sensors are the5krunner's count from photos, and the other counts are illustrative.

## Software and analytics events

- **30 Jun 2020:** Garmin bought **Firstbeat**, the company behind Training Effect, VO₂ max estimates, **Body Battery** and much of Garmin's training analysis.
- **23 Jul 2020:** a cyber attack took Garmin Connect down for days. Watches kept recording but couldn't sync.
- **28 Jun 2022:** beta firmware brought **HRV Status** (overnight HRV against your normal), **Training Readiness** (a morning readiness score) and SatIQ to the fēnix 7.
- **27 Mar 2025:** **Garmin Connect+**, a $6.99/month subscription. Existing features stayed free.

## What it measures today

The **Forerunner 970** has an accelerometer, gyroscope, compass, altimeter, ambient light, device temperature, multi-band GPS, ANT+, Bluetooth, Wi-Fi, NFC, optical HR, SpO2, skin temperature, ECG, a speaker, a mic and a flashlight. The **fēnix 8 Pro** adds a depth sensor, LTE and satellite, but has no skin temperature sensor in its part list.

## "Asleep then woken"

- **ECG on the fēnix 7 Pro:** shipped 31 May 2023, switched on 17 Oct 2023 (FDA-cleared ECG app, US).
- **Galileo satellites:** added by firmware to the Forerunner 935 (27 Jun 2018) and the fēnix 5 (22 Jun 2018). The chip could already hear them.

## Data access relevance for us

- Garmin data lives in **Garmin Connect**. WearLab doesn't cover Garmin's developer APIs or whether Garmin writes to HealthKit or Health Connect, so this needs research. ^[inferred]
- The 2020 outage is a concrete case for our design rule that the device keeps recording when the cloud is down, and that we must show sync time and handle late batches. See [[05-data/data-pipeline|Data pipeline]]. ^[inferred]

Concepts: [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/recovery-and-strain|Recovery and strain]] · [[21-concepts/photoplethysmography|PPG]] · [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO2)]] · [[21-concepts/ecg-and-atrial-fibrillation|ECG and AF]] · [[21-concepts/skin-temperature-trends|Skin temperature trends]].

## What this means for the Cognitive Performance Agent

- Garmin is the main athlete-side competitor. Training Readiness, HRV Status and Body Battery already answer "how ready am I today?" for training. If our athlete use case stays in scope ([[24-synthesis/open-decisions|Open decisions]] #10), we need a clear answer on how ours differs: task-measured performance and in-session suggestions, rather than a morning score. See [[12-business/competitive-landscape|Competitive landscape]]. ^[inferred]
- Connect+ shows Garmin putting extra insights behind a subscription, which tells us where the market expects to charge. ^[inferred]

## Sources

- `wearlab/src/timemachine/garmins.ts` (header sourcing rules, models, events, facts with source links)
- `wearlab/src/timemachine/compare.ts` (capability side notes for Garmin models not shown), `wearlab/src/data/brands.ts`, `wearlab/docs/PLAN.md` §2.2, §5
- Live: https://wearlab-learn.vercel.app/history/garmin
