---
title: "Algorithm Card: the night calculator (night-v1)"
category: 04-agent-engine
tags: [algorithm, sleep, hrv, wearables]
sources: [site/assets/night.js, site/assets/whoop4.js, tools/qa/night-test.mjs]
summary: "How Halftime turns a WHOOP 4.0's stored heart rate and beat intervals into last night's sleep, resting heart rate and HRV, each against the person's usual, or says not enough data."
base_confidence: 0.55
lifecycle: draft
lifecycle_changed: 2026-11-14
tier: core
created: 2026-11-14T19:00:00Z
updated: 2026-11-14T19:00:00Z
---

# Algorithm Card: the night calculator (night-v1)

**What it answers:** "How did last night go, compared with my usual?" in three numbers, for the Night tab and for the study setup's sleep. Plain code in `site/assets/night.js`; no language model (CLAUDE.md ground rule 3). Built 2026-11-14 at Heramb's request; **the team has not reviewed it**, and it has not been checked against a reference device. ^[inferred]

## Input
The WHOOP 4.0's stored records, read over Bluetooth by `site/assets/whoop4.js`: about one per second while worn, each a Unix time, a heart rate (bpm) and 0–4 beat-to-beat intervals (ms). Records stamped before 2020 (a band whose clock ran flat) are dropped. Motion, light and temperature aren't used: the band stores only heart data while away from the laptop (shared notes, `whoop-4-signals.md`).

## Steps
1. **Window.** For a wake date D, look from 6 pm on D−1 to 2 pm on D (local time).
2. **Minutes.** A minute counts as worn when it holds 10 or more valid heart rates (25–230 bpm); its value is their median.
3. **Calm threshold.** A 5-minute rolling median; low = its 10th percentile, high = its 90th. Calm = at or under max(low + 6, low + 0.4 × (high − low)).
4. **Sleep window.** The longest calm run, bridging gaps of up to 20 minutes (and up to 30 unworn minutes). Its edges are then extended while the median stays under low + 0.6 × (high − low), because heart rate drifts down after falling asleep and up before waking. **The person confirms or changes it** with one tap.
5. **Resting heart rate.** The lowest 5-minute average inside the window (at least 4 worn minutes).
6. **HRV.** RMSSD in 5-minute pieces inside the window. Beats outside 300–2000 ms, or more than 20% from the median of the last 9 kept beats, are thrown out. A piece counts with 120+ kept beats and at most 20% thrown out. Night HRV = the mean of at least 6 pieces (the Oura/Fitbit whole-night style).
7. **Not enough data** (with the reason shown): worn under 3 hours; no calm stretch of 3 hours; or under 60% of the window worn. HRV alone can be missing: "not enough beat-to-beat readings" or "too uneven".
8. **Your usual.** From valid nights in the 28 days before, once there are 7: the median, and a range of ±max(0.75 × robust spread, floor), floors 20 min / 2 bpm / 5 ms. Words: shorter/longer (lower/higher) than usual, or your usual. Before 7 nights: "Learning your usual, n of 7".

## What it changes
Only sleep reaches the break rule (rule v0 in `site/assets/study.js`: under 5 h → 15 min sooner, under 6 h → 10 min sooner, 8 h or more → 10 min later), and only for today's night. Resting HR and HRV are shown as context and never change breaks.

## Checks (`TZ=America/New_York node tools/qa/night-test.mjs`, 43 pass; also in Los Angeles and Kolkata time)
- Synthetic nights with a known answer: bed and wake within 25 min, sleep length within 40 min, resting HR within 2 bpm, HRV within 9 ms of the generated values.
- Each not-enough-data reason; beats missing or noisy; a changed window recomputes; usual needs 7 nights and ignores nights older than 28 days.
- The WHOOP command framing matches 5 frames recorded from WHOOP's own app byte for byte; a fake band shows that a lost connection keeps only saved batches and that an unsaved batch is never acknowledged.

## Known limits
- **Heart rate alone can't tell lying still awake from sleep** (Walch 2019: heart-rate-only wake detection was poor), so the window is a guess the person confirms; onset latency, night wakings and stages aren't attempted. ^[inferred]
- **Not validated against a reference.** WHOOP 3.0 RR intervals gave RMSSD within ±7.6 ms of ECG over one lab night (Miller 2022, data supplied by WHOOP), but our own decoder and filter have to earn that. A Polar H10 check is proposed in the shared notes. ^[inferred]
- The historical-record byte layout comes from community notes (whoof-40), not WHOOP; it needs confirming on Heramb's band.
- One person's band; not a participant route. Fitbit Air nights will fill the same record later.

## Related
- [[04-agent-engine/algorithm-book|Algorithm Book]] · [[04-agent-engine/performance-model|Performance model]] · [[21-concepts/heart-rate-variability|HRV]] · [[21-concepts/sleep-staging|Sleep staging]] · [[25-journal/2026-11-14-night-tab-whoop|The Night tab]]
