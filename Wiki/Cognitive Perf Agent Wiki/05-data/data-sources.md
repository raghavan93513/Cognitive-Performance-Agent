---
title: Data Sources
category: 05-data
tags: [data, wearables, privacy]
aliases: [inputs, signals, data collection]
relationships:
  - target: "[[21-concepts/heart-rate-variability]]"
    type: uses
  - target: "[[05-data/data-pipeline]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf, binf4070-2026/week-03]
summary: What the agent collects. Watch data gives context, laptop data gives behaviour, study tasks give measured performance. Private content like keystrokes or screenshots is never captured.
provenance:
  extracted: 0.85
  inferred: 0.05
  ambiguous: 0.1
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T19:30:00Z
updated: 2026-11-05T00:10:00Z
---

# Data Sources

Stage 1 of the [[07-backend/system-architecture|system architecture]]. The rule of thumb: **watch = context, laptop = behaviour, study task = measured performance.**

## What gets collected

| Source | Data points | What it tells us |
|---|---|---|
| Watch | Heart rate + resting HR (bpm) | Physiological context, read alongside movement. Arrives as sparse point samples after cloud sync, not live (see below). |
| Watch | Overnight HRV (RMSSD, ms) | Change from the student's usual overnight level. Daily context, **not** a live focus score. |
| Watch | Sleep duration, bed/wake time, awake periods | Prior-night sleep and schedule context |
| Watch | Steps + active minutes | Tells a walk or exercise apart from sedentary study |
| Laptop | Foreground app *category* + switch timestamps | Switches per active minute, time per app category |
| Laptop | Idle/active spans + session start/stop | Idle fraction, continuous study duration. Idle does not always mean distracted. |
| Study task | Task version/difficulty, correctness, response/completion time | **Independent performance labels**, used to test predictions and break benefit |
| User check-in | Fatigue rating + chosen/completed break | Optional subjective context. Not a substitute for task labels. |

More on overnight HRV and how to read it: [[21-concepts/heart-rate-variability|Heart rate variability (HRV)]].

## How each source is accessed

- **Watch.** Raghavan's deck uses permitted **Google Health** access or participant exports. Alexa's doc uses **Apple HealthKit** on iOS and **Health Connect** on Android, behind a common adapter interface. ^[ambiguous]
- Watch fields depend on the device, permissions and sync timing. These are **not guaranteed live readings**: show the sync time. Use overnight HRV summaries first and don't assume continuous daytime HRV.
- **Laptop.** Electron provides idle time, and an OS-specific adapter provides foreground-app categories. On macOS that adapter is `NSWorkspace.frontmostApplication`.
- **Study task.** Records version, difficulty, correct answers and timing. Picking the actual task is step 1 of the [[02-product/roadmap|roadmap]].

## What is never collected (by default)

Keystrokes, typed text, screenshots, clipboard contents, window titles, URLs, document contents and message contents. Collection is visible and pausable, with an easy uninstall/disable path. → [[10-trust-safety/privacy-and-consent|Privacy and consent]]

## Optional / later sources

- **Phone signals** and **CGM (continuous glucose monitor)** trends are optional future experiments. The first build runs without them.
- Alexa's doc keeps CGM in scope but only after consent, source access and research value are established.

## Upload format

Every record carries user, session, metric, value, unit, measured time and received time. Unsent batches stay on the device until the server confirms them. The full canonical schema is on [[05-data/data-pipeline|Data pipeline]].

## What the course taught us about these sources

Added after ingesting [[30-course/weeks/week-03-wearable-sensors-and-measurements|course week 3]]:

- **Watch HR is sparse and synced, not live.** In the course's Fitbit / Google Health data, HR comes as point samples roughly every 5 minutes, delivered through cloud sync. A 5-minute study window may hold zero or one HR value, so record the sample count per window.
- **Optical HR is weakest during motion.** See [[21-concepts/photoplethysmography|PPG]] and [[21-concepts/wearable-measurement-error|wearable measurement error]]. HR recorded *during* a walk can't show that the walk worked. Measure the effect with the follow-up task instead. ^[inferred]
- **Choose step sources, don't sum them.** Two apps can write overlapping step records, and the course lab picks one source package.
- **Google Health data quirks:**
  - numbers arrive as strings, and lists come newest-first;
  - times are physical time plus a `utcOffset`, and filters use civil time;
  - sleep is assigned to the date it ends;
  - a true-zero step point may have no `count` field;
  - an empty list means "no observations", not zero.
- **HRV is unverified.** The course labs never fetch HRV, so the overnight RMSSD record our HRV page relies on hasn't been seen yet. Confirm it during roadmap step 1. ^[inferred]
- **Target users are on iPhones** (Heramb, 2026-11-05): Health Connect is out. Apple Watch data is only reachable through HealthKit on the phone (a native iOS app or exports, no web API); Fitbit, Garmin, Oura and Whoop expose cloud APIs a web app can use. ^[inferred]
- **Device choice.** Using the course loaner Fitbit means the course OAuth helper and the Google Health route, not HealthKit or Health Connect. See [[24-synthesis/open-decisions|Open decisions]] #4. ^[inferred]

## Sources

- [[31-decks/raghavan-architecture-deck]] — slides 2, 4
- [[31-decks/alexa-kafka-system-design]] — §4.1–4.4
