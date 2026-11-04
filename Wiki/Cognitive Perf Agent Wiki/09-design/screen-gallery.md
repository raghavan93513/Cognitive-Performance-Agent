---
title: Screen Gallery
category: 09-design
tags: [frontend, reference]
sources: ["tools/qa/device-walk.mjs"]
summary: "Screenshots of every screen and state (suggestion, not enough data, snoozed, escalate, consent…) on phone and laptop, captured with the device walk tool. Synthetic data only."
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: supporting
created: 2026-11-04T23:00:00Z
updated: 2026-11-04T23:00:00Z
---

# Screen Gallery

Real screenshots of every screen and state, so anyone can see what the product looks like today without running it. Capture with `node tools/qa/device-walk.mjs --devices=iphone,laptop …`. Copy the chosen frames into `attachments/screens/`, **synthetic data only**, and note the date and the build or mockup they came from.

## States to cover

| State | Phone (390×844) | Laptop (1440×900) |
|---|---|---|
| First run and consent | — | — |
| Suggestion: continue | — | — |
| Suggestion: short walk | — | — |
| Suggestion: break | — | — |
| Reason and sources open | — | — |
| Not enough data | — | — |
| Snoozed / declined | — | — |
| Escalate to a person | — | — |
| Watch disconnected / laptop-only | — | — |
| History | — | — |
| Privacy controls (pause, delete) | — | — |

*Nothing captured yet: no screens exist.*

## Related

- [[09-design/09-design|Design hub]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]] · [[08-frontend/student-interface-and-feedback|Student interface]]
