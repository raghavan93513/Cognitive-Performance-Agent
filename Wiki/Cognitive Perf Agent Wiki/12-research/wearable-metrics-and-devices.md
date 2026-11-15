---
title: Wearable metrics and devices (research, 2026-11-14)
category: 12-research
tags: [research, wearables, physiology, reference]
sources: ["Dial et al. 2025, Physiological Reports (PMC12367097)", "Schyvens et al. 2025, Sleep Advances (zpaf021)", "Siepe et al. 2025, J Psychopathol Clin Sci", "Natarajan et al. 2021, npj Digit Med 4:136 (doi 10.1038/s41746-021-00493-6)", "Gilgen-Ammann et al. 2019, Eur J Appl Physiol (doi 10.1007/s00421-019-04142-5)", "Miller et al. 2022, Sensors 22:6317 (PMC9412437)", "Creswell et al. 2023, PNAS (doi 10.1073/pnas.2209123120)", "whoof-40 docs/PROTOCOL.md (MIT)", "zordhalo/whoopsie-protocol"]
summary: "About 60 metrics we could compute from a WHOOP 4.0, in 8 groups, plus how Fitbit, Oura, Apple, Polar and Garmin compute the same ones. Sleep length has the best student evidence; no paper shows overnight HRV or resting HR predicts next-day studying. Borrow the brands' rules, never their composite scores."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: supporting
created: 2026-11-15T16:55:00Z
updated: 2026-11-15T16:55:00Z
relationships:
  - target: "[[12-research/science-and-tech-evidence]]"
    type: extends
  - target: "[[04-agent-engine/night-calculator]]"
    type: related_to
  - target: "[[05-data/variable-map]]"
    type: related_to
---

# Wearable metrics and devices (research, 2026-11-14)

Asked by Heramb in the "Connecting Halftime's variables" session: what could Halftime compute from a wearable, and
how do the big brands do it? Several CTO-seat research agents ran in parallel:
- three on the metrics: heart and HRV; sleep, breathing and temperature; activity, load and WHOOP's methods and patents;
- five on brands: Fitbit, Oura, Apple Watch, Polar and Garmin;
- one on other devices.

Key citations were checked against the papers (marked ✓). The rest is the agents' reading and is **not yet checked** ^[inferred].
It is research only: nothing was bought, installed or built from it. The full notes (about 470 KB) stay in the sessions' local
notes folder, outside this repo. Session note: [[25-journal/2026-11-14-variables-and-wearable-research]].

## The headline

- **Sleep length has the best student evidence.** ✓ Creswell 2023: each extra hour of average nightly sleep went with +0.07 end-of-term GPA. The "under 6 h" line comes from the CMU press release, not the paper.
- **No paper shows that overnight HRV or resting HR predicts the next day's studying.** Treat them as context, not as a trigger.
- **The Google Health API returns samples and daily summaries, not Fitbit's scores.** There is no Sleep Score, Readiness, Stress or EDA. On any device, a composite score would be ours to compute, and we shouldn't compute one.

## What a WHOOP 4.0 can give us (8 groups)

What the band keeps in memory while it isn't connected is documented only as **heart rate plus beat-to-beat (RR) intervals,
about once a second**. Motion, optical (PPG) and temperature data are live streams that need a connection. So unless the
stored motion data gets decoded, last night = heart data plus wrist on/off events, and sleep has to be estimated from heart data alone.

| Group | Ready from heart data | Needs motion or optical decode | Skip |
|---|---|---|---|
| 1. Heart rate (awake) | Live HR, HR reserve %, HR zones, 1-min HR recovery after a walk | "HR up while still" | — |
| 2. Sleeping heart rate | Resting HR (lowest 5-min mean), sleeping HR, resting-HR trend (7 nights vs a 28-night usual) | — | — |
| 3. HRV | Overnight lnRMSSD (5-min windows), HRV trend vs baseline ± 0.5 SD after 28 nights, night-to-night swing | Daytime HRV while studying (direction contested; never a break trigger) | LF/HF, DFA α1, stress index, Body Battery |
| 4. Sleep and timing | Wear coverage (the "not enough data" gate), main sleep window confirmed with one tap, sleep length (upper bound), 7/14-night sleep debt, regularity, midpoint | Onset, waking, efficiency, naps | Sleep stages (HR-only agreement κ ≈ 0.04), "sleep need" |
| 5. Breathing, oxygen, temperature | Nightly breathing rate (experimental), breathing-rate rise as a "quieter today" flag | Skin-temperature deviation | SpO2 (no calibration, skin-tone bias) |
| 6. Movement | — | Intensity (ENMO), steps, minutes since you last moved, a check that the walk break happened | Calories (> 20% error on every wrist device) |
| 7. Training load (athletes) | Cardio load (TRIMP), typed session RPE × minutes | — | Acute:chronic ratio, VO2max estimate, WHOOP's own names |
| 8. Band events | Wrist on/off, charging, double tap as a break marker, battery | — | — |

✓ Miller 2022 measured the WHOOP 3.0 against an ECG: heart rate bias −0.3 bpm (limits ±1.9), and RMSSD bias −4.5 ms (limits ±7.6).

**Shortlist for Halftime, from tonight's data:**
1. a data-quality gate;
2. a confirmed sleep window, giving sleep length and 7-night sleep debt;
3. overnight resting HR against your usual;
4. overnight HRV against your usual, as context only;
5. nightly breathing rate, as a quiet flag.

After the motion decode: a check that the walk break happened, "minutes since you last moved", and double-tap break markers.
The Night tab's calculator already covers 2–4 ([[04-agent-engine/night-calculator|night-v1]]).

## Best brand per metric

| Metric | Best source | Why |
|---|---|---|
| Nightly HRV, resting HR | Oura | ✓ Dial 2025 (13 adults, 536 nights, against ECG): nightly HRV agreement 0.99 for Oura 4, 0.97 Oura 3, 0.94 WHOOP 4.0, 0.87 Garmin, 0.82 Polar |
| Sleep window and length | Apple Watch | ✓ Schyvens 2025 (62 adults): Series 8 κ 0.53, best of six devices |
| Beat-interval reference | Polar H10 chest strap | ✓ Gilgen-Ammann 2019: 99.6% of beat intervals right against a Holter ECG (only 10 people) |
| Alertness from sleep timing | Polar SleepWise | The only vendor API that exposes an hourly alertness model; needs 5 days of sleep |
| Breathing-rate method | Fitbit | ✓ Natarajan 2021 publishes the full recipe (error 0.46 breaths/min) |
| Temperature rules | Oura | "Temperature can only lower readiness" |
| Running VO2max, exercise load | Garmin | GPS and power based |
| Live HR every second, no subscription | WHOOP 4.0 over Bluetooth | What we already have |

- **Garmin's stress score barely matches how students feel.** ✓ Siepe 2025 followed 781 students for 3 months; its sleep measures did agree well.
- **Apple Series 12 and Ultra 4 (Sep 2026)** read heart rate every 5 s and HRV up to every 5 minutes, and add a 0–10 Readiness score after 7 nights. It is **not confirmed** that HRV reaches HealthKit as RMSSD. The older documentation says SDNN, which isn't comparable with our RMSSD.

## Rules every brand agrees on (borrow these)

- personal baselines only;
- a waiting period before any comparison: 3–7 nights for the first one, 3–4 weeks for the baseline to settle;
- at least 3–4 h of sleep for a night to count;
- HRV and arousal only from still periods;
- a quality flag for every beat or window;
- a named reason for every night left out: coverage, gaps over 2 h, sleep under 3 h, moving, too noisy;
- start the baseline again when the device changes;
- separate names for look-alike metrics (SDNN vs RMSSD, Apple's resting HR vs ours);
- provenance on every number: method, estimated or not, coverage, decoder version.

**Never borrow:** Stress, Body Battery, Readiness or Recovery-style composite scores (their weights aren't published),
sleep stages, SpO2, calories, or VO2max without GPS. This matches the [[24-synthesis/declutter-brief-2026-11-15|declutter brief]]'s
"no combined score".

## Other devices

| Verdict | Device | Why |
|---|---|---|
| Use now | Polar H10 chest strap (~$80–110) | Reference for beat intervals, RMSSD and resting HR; the standard Bluetooth HR service works in Chrome |
| Consider | Polar Loop ($199.90, no subscription) | Official API with nightly RMSSD, breathing and skin temperature. Not validated. The API details came from a third party, so check Polar's own docs |
| Consider | Movesense, Bangle.js 2, Colmi R02 ring | Open or raw data; not validated |
| Consider | Oura | 10 users before approval, and needs a membership |
| After Dec 11 | Apple Watch | Needs a native app; HRV may not be comparable |
| Skip before Dec 11 | Garmin, Samsung, WHOOP 5.0, EDA, EEG headbands, CGM | Reported closed API (not confirmed), no iPhone, firmware lock, weak field evidence, or cost and safety |

## Proposed validation: WHOOP 4.0 against a Polar H10

- **Readings:** seated and lying 5-minute rests, twice a day for 7 days, plus 2–3 nights. The same cleaning code for both devices.
- **Analysis:** Bland–Altman with repeated measures, Lin's CCC and MAPE.
- **Pass limits, set before collecting:** for example RMSSD bias within ±3 ms (limits ±10), and resting HR within ±1 bpm (limits ±3).
- **A Fitbit Air on the other wrist** is only an agreement check, not a reference, because it has the same optical failure modes.

Not started; it would need a Polar H10 (a purchase, so the team's call).

## Cautions

- The WHOOP 4.0 protocol comes from community reverse engineering, and the two sources disagree on some header bytes.
  Using the band in the class project is a team and instructor call (licences and terms; see `THIRD_PARTY_NOTICES.md`).
- **Don't reconnect a decoded band to the official WHOOP app.** The app updates the firmware automatically, and newer 5.0/MG
  firmware withholds data. The 4.0 isn't known to be affected.
- Everything above is wellness context, not a measurement claim.

## Related

- [[12-research/science-and-tech-evidence|Science and tech evidence]] · [[22-entities/whoop|WHOOP]] · [[22-entities/oura|Oura]] · [[22-entities/apple-watch|Apple Watch]] · [[22-entities/fitbit|Fitbit]] · [[22-entities/garmin|Garmin]]
