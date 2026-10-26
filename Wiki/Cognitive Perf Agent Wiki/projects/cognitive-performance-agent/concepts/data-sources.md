---
title: Data Sources
category: concepts
tags: [data, wearables, privacy]
aliases: [inputs, signals, data collection]
relationships:
  - target: "[[concepts/heart-rate-variability]]"
    type: uses
  - target: "[[projects/cognitive-performance-agent/concepts/data-pipeline]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
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
updated: 2026-10-26T19:30:00Z
---

# Data Sources

Stage 1 of the [[projects/cognitive-performance-agent/concepts/system-architecture|system architecture]]. The rule of thumb: **watch = context, laptop = behaviour, study task = measured performance.**

## What gets collected

| Source | Data points | What it tells us |
|---|---|---|
| Watch | Heart rate + resting HR (bpm) | Physiological context. Read current HR alongside movement. |
| Watch | Overnight HRV (RMSSD, ms) | Change from the student's usual overnight level. Daily context, **not** a live focus score. |
| Watch | Sleep duration, bed/wake time, awake periods | Prior-night sleep and schedule context |
| Watch | Steps + active minutes | Tells a walk or exercise apart from sedentary study |
| Laptop | Foreground app *category* + switch timestamps | Switches per active minute, time per app category |
| Laptop | Idle/active spans + session start/stop | Idle fraction, continuous study duration. Idle does not always mean distracted. |
| Study task | Task version/difficulty, correctness, response/completion time | **Independent performance labels**, used to test predictions and break benefit |
| User check-in | Fatigue rating + chosen/completed break | Optional subjective context. Not a substitute for task labels. |

More on overnight HRV and how to read it: [[concepts/heart-rate-variability|Heart rate variability (HRV)]].

## How each source is accessed

- **Watch.** Raghavan's deck uses permitted **Google Health** access or participant exports. Alexa's doc uses **Apple HealthKit** on iOS and **Health Connect** on Android, behind a common adapter interface. ^[ambiguous]
- Watch fields depend on the device, permissions and sync timing. These are **not guaranteed live readings**: show the sync time. Use overnight HRV summaries first and don't assume continuous daytime HRV.
- **Laptop.** Electron provides idle time, and an OS-specific adapter provides foreground-app categories. On macOS that adapter is `NSWorkspace.frontmostApplication`.
- **Study task.** Records version, difficulty, correct answers and timing. Picking the actual task is step 1 of the [[projects/cognitive-performance-agent/concepts/roadmap|roadmap]].

## What is never collected (by default)

Keystrokes, typed text, screenshots, clipboard contents, window titles, URLs, document contents and message contents. Collection is visible and pausable, with an easy uninstall/disable path. → [[projects/cognitive-performance-agent/concepts/privacy-and-consent|Privacy and consent]]

## Optional / later sources

- **Phone signals** and **CGM (continuous glucose monitor)** trends are optional future experiments. The first build runs without them.
- Alexa's doc keeps CGM in scope but only after consent, source access and research value are established.

## Upload format

Every record carries user, session, metric, value, unit, measured time and received time. Unsent batches stay on the device until the server confirms them. The full canonical schema is on [[projects/cognitive-performance-agent/concepts/data-pipeline|Data pipeline]].

## Sources

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]] — slides 2, 4
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design]] — §4.1–4.4
