---
title: "Variable map and wearable research (2026-11-14)"
category: 25-journal
tags: [journal, data, wearables, research]
sources: ["05-data/variable-map.md", "12-research/wearable-metrics-and-devices.md", site/assets/study.js, site/assets/halftime-data.js]
summary: "A read-only pass mapped every variable in the prototype (rule v0 uses only sleep, the clock and the session end). Then about ten research agents covered ~60 wearable metrics and how Fitbit, Oura, Apple, Polar and Garmin compute them; six key citations were checked. Nothing was built from it; it fed the Night tab and the declutter brief."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: supporting
created: 2026-11-15T17:00:00Z
updated: 2026-11-15T17:00:00Z
relationships:
  - target: "[[05-data/variable-map]]"
    type: derived_from
  - target: "[[12-research/wearable-metrics-and-devices]]"
    type: derived_from
---

# Variable map and wearable research (2026-11-14)

Heramb asked for a new session to talk through "how we can connect variables". It ran as "Connecting Halftime's
variables" on 2026-11-14 and changed nothing in `site/` itself. The [[25-journal/2026-11-14-night-tab-whoop|Night tab]]
built later that day used its WHOOP research.

## 1. The variable map

The full map is at [[05-data/variable-map|Variable map]]. In short:
- **Rule v0 reads only sleep, the clock and when the session ends.** It decides once, at Start.
- **HRV, resting HR, the usual-sleep baseline and app switches never reach it, and are never logged.** So "does watch data help?" can't be tested yet.
- **Real watch sleep is logged as null**, so `/admin` shows it as "left out".
- **Two rules exist:** rule v0, and the sample-day rule in the data layer.
- **Three choices block the rest:** the outcome (#2, #3), one rule and its inputs (#19), and the watch route plus what gets logged (#4, #22, consent).

## 2. Wearable research

Heramb has a WHOOP 4.0 (spare) and wanted it to feed Halftime without a membership. The session researched:
- what the 4.0 sends over Bluetooth (from community protocol notes);
- about 60 metrics in 8 groups, each with a formula, its evidence and whether the 4.0 can support it;
- how Fitbit, Oura, Apple Watch, Polar and Garmin compute the same metrics;
- which other devices are worth considering.

The results are at [[12-research/wearable-metrics-and-devices|Wearable metrics and devices]].

**Checked against the papers:**
- Dial 2025 (nightly HRV vs ECG, by brand);
- Schyvens 2025 (sleep, Apple Watch best);
- Siepe 2025 (Garmin stress vs 781 students' self-report);
- Natarajan 2021 (breathing rate);
- Gilgen-Ammann 2019 (Polar H10);
- Miller 2022 (WHOOP 3.0 vs ECG);
- Creswell 2023 (sleep and GPA).

The rest is the agents' reading and still unchecked. The raw notes (~470 KB) stay in the sessions' local notes folder, outside the repo.

**What it changed:**
- The Night tab's calculator computes sleep, resting HR and overnight RMSSD against your usual, with a quality gate and named "not enough data" reasons ([[04-agent-engine/night-calculator|night-v1]]).
- The [[24-synthesis/declutter-brief-2026-11-15|declutter brief]] keeps "no combined score": the brands' readiness-style composites have unpublished weights, and Garmin's stress score barely matches how students feel.

## Open

- A Polar H10 as a reference strap is a purchase, so it's the team's call.
- Using the band in the class project is a team and instructor call (licences, terms).
- Whether the rule should read HRV or resting HR is still #19. The research says context only.
