---
title: Fitbit
category: 22-entities
tags: [entity, brand, competitor, wearables]
aliases: [Fitbit (Google), Fitbit Charge, Fitbit Sense, Fitbit Versa]
relationships:
  - target: "[[32-wearlab/brand-histories]]"
    type: derived_from
  - target: "[[12-business/competitive-landscape]]"
    type: related_to
  - target: "[[05-data/data-sources]]"
    type: related_to
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
sources:
  - "wearlab/src/timemachine/fitbits.ts"
  - "wearlab/src/timemachine/compare.ts"
  - "wearlab/src/data/brands.ts"
  - "wearlab/docs/PLAN.md"
  - "https://wearlab-learn.vercel.app/history/fitbit"
summary: Fitbit trackers and smartwatches (19 models, 2009–2023 in WearLab), now part of Google; its data reaches us through Google Health, the route our course uses.
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

# Fitbit

**What it is.** A maker of activity trackers and smartwatches. In WearLab ([[32-wearlab/brand-histories|Brand histories]]) it is the first and largest Time Machine: "Clip-on trackers, then bands, then smartwatches: 19 models from the 2009 Tracker to the Charge 6 and Sense 2." Google's Pixel Watch (13 Oct 2022) appears as an event: it launched "with Fitbit's health features built in", after which "Fitbit's own watches got simpler".

**Form factor.** Clip, band and watch (`types: clip, band, watch` in `brands.ts`). It is the only brand in WearLab that spans all three.

**Key idea.** WearLab sets no `keyTopic` for Fitbit. Its story is breadth: "From a clip-on step counter to a smartwatch with ECG." Its listed topics are steps, heart, sleep, HRV, SpO2, ECG, temperature, floors, location and recovery. For us, Fitbit's distinguishing feature is less a sensor than its **data route**: it is the device and API our course teaches. ^[inferred]

## Line-up (from `fitbits.ts`)

| Line | Models (release) |
|---|---|
| Trackers (12) | Tracker 2009 · Ultra 2011 · One 2012 · Flex 2013 · Force 2013 · Charge 2014 · Charge HR 2015 · Charge 2 2016 · Charge 3 2018 · Charge 4 2020 · Charge 5 2021 · Charge 6 2023 |
| Smartwatches (7) | Surge 2015 · Blaze 2016 · Ionic 2017 · Versa 2018 · Versa 2 2019 · Sense 2020 · Sense 2 2022 |

Versa 3 (with the Sense, 2020), Versa 4 (with the Sense 2, 2022) and the Pixel Watch are events, not models.

## Hardware milestones

- **2009** Tracker: one sensor (accelerometer), a 2.4 GHz radio to a base station.
- **2011** Ultra: altimeter (floors).
- **2012** One: Bluetooth to a phone.
- **2013** Flex: on the wrist, with NFC (used to pair).
- **2015** Charge HR: optical heart rate, and battery life dropped to 5 days. Surge: GPS + heart rate.
- **2017** Sleep stages reached the Charge 2 by update (Mar 2017).
- **2018** Charge 3: red + infrared LEDs, switched on Jan 2020.
- **2020** Charge 4: built-in GPS. Sense: ECG + EDA electrodes, a skin temperature sensor, a speaker and a mic.
- **2021** Charge 5: colour AMOLED, ECG/EDA electrodes, altimeter dropped. Its ECG app arrived on 9 Nov 2021.
- **2023** Charge 6: haptic button returns.
- **Recalls:** Force (Feb 2014, skin irritation) and Ionic (Mar 2022, battery overheating).

## What it measures today (latest models in the catalog)

- **Charge 6:** accelerometer, ambient light, device temperature, optical HR, red + infrared (SpO2), ECG + EDA electrodes, GPS, NFC, Bluetooth.
- **Sense 2:** adds a gyroscope, altimeter, skin temperature sensor, mic and speaker. Its Wi-Fi is permanently disabled, and the headline is "all-day stress sensing".

## "Asleep then woken"

- **Blood oxygen:** red + infrared LEDs in the Charge 3, Ionic, Versa and Versa 2 were switched on in Jan 2020 ("Estimated Oxygen Variation").
- **Charge 4:** SpO2 and skin temperature variation arrived by update on 22 Mar 2021.
- **ECG:** the Sense's ECG went live in Oct 2020 after FDA clearance, and the Charge 5's on 9 Nov 2021. In both cases the electrodes already worked for EDA Scan, so WearLab doesn't model it as a wake.
- **Permanently off:** the Sense 2's Wi-Fi.

## Data access relevance for us

- Our course reaches Fitbit data through **Google Health** (Fitbit → phone sync → Google Health account → authorised API → JSON). HR arrives as sparse point samples, and the course lab expects the `com.google.fitbit` source package. See [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]] and [[05-data/data-sources|Data sources]].
- Students can borrow a **Fitbit Air** in the course. That device is **not** in WearLab's catalog (which ends at the Charge 6 and Sense 2), so its sensors and features need checking separately. ^[inferred]
- The Sense-era features (EDA Scan, skin temperature variation, SpO2 variation) exist in hardware. Whether Google Health exposes them to our OAuth scopes is unverified, and HRV is already flagged as unverified on [[05-data/data-sources|Data sources]]. ^[inferred]
- Which device we use is still open: [[24-synthesis/open-decisions|Open decisions]] #4.

Concepts: [[21-concepts/photoplethysmography|PPG]] · [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/step-counting|Step counting]] · [[21-concepts/sleep-staging|Sleep staging]] · [[21-concepts/blood-oxygen-spo2|Blood oxygen (SpO2)]] · [[21-concepts/ecg-and-atrial-fibrillation|ECG and AF]] · [[21-concepts/skin-temperature-trends|Skin temperature trends]].

## What this means for the Cognitive Performance Agent

- Fitbit is our **data supplier, not our competitor**: it measures the body, and we add laptop behaviour, study-task results and an action. See [[12-business/competitive-landscape|Competitive landscape]]. ^[inferred]
- Fitbit's own history (sleep stages, SpO2 and ECG arriving by update) suggests that what Google Health returns for a given device can change over time. Our pipeline should record data types present per user per day rather than assume them from the model name. ^[inferred]

## Sources

- `wearlab/src/timemachine/fitbits.ts` (models, parts, events, facts, per-model source links)
- `wearlab/src/timemachine/compare.ts` (arrivals), `wearlab/src/data/brands.ts`, `wearlab/docs/PLAN.md` §2.2, §5
- Live: https://wearlab-learn.vercel.app/history/fitbit
- Course: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]]
