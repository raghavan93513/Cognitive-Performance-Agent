---
title: "ADR-001 — Reuse WearLab's simulators for our synthetic data"
category: 20-decisions
tags: [decision, data, synthetic, wearlab]
status: accepted
decided_on: 2026-10-26
deciders: [Heramb Chaudhari]
relationships:
  - target: "[[05-data/synthetic-data-generator]]"
    type: related_to
  - target: "[[32-wearlab/what-we-reuse]]"
    type: derived_from
sources: ["team decision 2026-10-26", "[[32-wearlab/motion-sleep-recovery-pipelines]]", "[[32-wearlab/heart-signal-pipelines]]"]
summary: We build our synthetic data by vendoring WearLab's tested sleep, step, PPG, recovery and temperature simulators and wrapping them with person, calendar, laptop and task layers.
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T22:15:00Z
updated: 2026-10-26T22:15:00Z
---

# ADR-001 — Reuse WearLab's simulators for our synthetic data

**Status:** accepted · **Decided:** 2026-10-26 · **Decider:** Heramb Chaudhari, WearLab's author, who approved reusing the code.

## Context

- The course gives full credit for a synthetic-data path, and the showcase needs a recorded fallback. → [[30-course/project-requirements|Project requirements]]
- We need believable *student days*: a night, then study sessions and breaks, with known ground truth to test our pipeline, model and agents. → [[05-data/synthetic-data-generator|Synthetic data generator]]
- [[32-wearlab/32-wearlab|WearLab]] already has seeded, dependency-free, headless-tested TypeScript simulators:
  - a full night in about 0.1 s;
  - 50 Hz steps;
  - PPG heart rate measured from simulated light;
  - recovery physiology;
  - a month of temperature.
- This was open decision #17 in [[24-synthesis/open-decisions|Open decisions]].

## Options considered

| Option | For | Against |
|---|---|---|
| A. Use only the course's synthetic Fitbit data (weeks 3 and 7) | Zero effort; already Google-Health-shaped | One person, fixed days, no laptop or task streams, no ground truth for cognition |
| B. Write our own generator from scratch | Full control | Days of work to reach the realism WearLab already has, and untested |
| **C. Vendor WearLab's simulators and wrap them** | Tested, seeded, realistic; about 1–2 days to wrap; we own the code | Teaching models, not validated on real people; fixed 23:00–07:00 night unless retrained |
| D. Real pilot data only | Most realistic | No ground truth; too little data before Dec 4; failure modes rare |

## Decision

**Option C**, with the course's own synthetic files kept as **ingest-format test fixtures**. WearLab files are copied verbatim into `tools/synth/vendor/wearlab/` with their source commit (`210abc4`) noted. We add person, calendar, day, laptop, task and hidden-truth layers, plus Google Health and observation emitters. Full plan: [[05-data/synthetic-data-generator|Synthetic data generator]].

## Consequences

- **Easier:** reproducible demos and tests, planted-effect and null-world checks, failure-path coverage, and a showcase fallback.
- **Harder:** we maintain a vendored copy. Its tests must keep passing, and any retrain of the sleep stager must happen in our copy.
- **Must do:**
  - label all synthetic data as synthetic, in records and in the UI;
  - never report accuracy or effectiveness from synthetic data;
  - add a licence file to WearLab (recommended: MIT), so the vendored copy has a clear licence.

## Revisit when

- Real pilot data shows the simulated distributions are far off (e.g. sleep timing or HR ranges). Recalibrate the person layer.
- We switch devices away from Fitbit or Google Health shapes.
- WearLab's models change materially. Re-vendor and re-run its tests.
