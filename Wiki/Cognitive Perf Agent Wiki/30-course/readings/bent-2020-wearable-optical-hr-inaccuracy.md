---
title: "Bent 2020 — Sources of Inaccuracy in Wearable Optical HR"
category: 30-course
tags: [course, reading, wearables, physiology, bias]
aliases: ["Investigating sources of inaccuracy in wearable optical heart rate sensors"]
sources: ["https://www.nature.com/articles/s41746-020-0226-6"]
summary: Six wrist wearables vs ECG across all skin tones. Skin tone had no significant effect on error, but devices and activity did; absolute error during activity averaged 30% above rest.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 03
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Bent 2020 — Sources of Inaccuracy in Wearable Optical HR

> [!cite] Brinnae Bent, Benjamin A. Goldstein, Warren A. Kibbe, Jessilyn P. Dunn. *Investigating sources of inaccuracy in wearable optical heart rate sensors.* npj Digital Medicine 3, 2020. https://www.nature.com/articles/s41746-020-0226-6
> Assigned in [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 3 — Wearable Sensors and Measurements]].

## Core idea

- Wrist heart rate comes from **photoplethysmography (PPG)**, an optical measurement of blood-volume changes under the skin. The paper names three suspected error sources: **skin tone**, **motion artifacts** and **signal crossover**, where the sensor locks onto a repetitive motion such as walking and mistakes it for the heartbeat.
- Manufacturers assess their own accuracy and publish little about their methods. The authors ran an independent, systematic test against a clinical-grade **ECG**.

## Key findings

- **Protocol:** 53 participants (32 female, 21 male, aged 18–54), spread evenly across the six Fitzpatrick skin-tone groups. They wore six devices (four consumer-grade, two research-grade) for about an hour of seated rest, paced deep breathing, walking, washout and a **typing task**.
- **Skin tone:** no statistically significant difference in heart-rate accuracy across skin tones, at rest or during activity. HRV metrics (including RMSSD, SDNN and pNN50) also showed no accuracy difference by skin tone.
- **Device and activity mattered:** error differed significantly between devices and between activity types. On average, absolute error during activity was **30% higher than at rest**.
- **Signal crossover:** rhythmic walking produced significantly higher errors in all but one device.
- **Lag:** ECG and PPG heart-rate signals were offset by **0–43 s**, sometimes fixed and sometimes varying. After re-aligning with cross-correlation or rolling-window smoothing, the conclusions did not change.
- **Research-grade is not more accurate:** research-grade wearables expose raw PPG and HRV, but their heart rate was *less* accurate than consumer devices.
- All devices were reasonably accurate at rest and during sustained elevated heart rate, but differed in how they **responded to changes** in activity.
- The Week 3 slides reuse the paper's Figures 2 and 3 (error by device, skin tone and activity; missing values by device and activity) and add that a claim about exercise must be tested during exercise (slides pp. 37–38).

## Why the course assigned it

- Week 3's objective is to see how raw sensor signals become steps, heart rate and sleep, and why dashboard numbers are **estimates, not ground truth**. Bent quantifies that gap against ECG. ^[inferred]
- Paired with [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding 2020]], it teaches that measurement bias must be **tested for a specific device, metric, population and context**. The slides note that evidence about clinical pulse oximetry does not automatically carry over to consumer wrist pulse rate (slides p. 37).

## What this means for us

- **Our setting is the hard case:** students switching between typing, standing up and walking breaks are exactly the activity transitions where wrist heart rate is least reliable. The [[04-agent-engine/performance-model|performance model]] should not treat second-by-second heart rate during transitions as trustworthy. ^[inferred]
- This supports [[21-concepts/heart-rate-variability|heart rate variability]] being used **only as daily, overnight context**, measured at rest when PPG is most accurate, and never as a live focus score. ^[inferred]
- The 0–43 s lag means watch and laptop events cannot be aligned to the second. The [[05-data/data-pipeline|data pipeline]] time-alignment rules should use windows of a minute or more, with tolerance for lag. ^[inferred]
- Device choice matters, so the watch API decision on [[24-synthesis/open-decisions|open decisions]] should fix **one device model** for the pilot and record device and model for every observation. ^[inferred]
- Missing-data coverage depends on device and activity (slides p. 38), so the pipeline's freshness and missingness flags should be reported per activity state, not as one global number. ^[inferred]

## Read status

- **Full text** read from nature.com (open access) on 2026-10-26: abstract, Results (skin tone, HRV, activity, signal crossover, lag), Discussion and the protocol in Methods.
