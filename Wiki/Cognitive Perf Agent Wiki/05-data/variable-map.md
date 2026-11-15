---
title: Variable map (prototype, 2026-11-14)
category: 05-data
tags: [data, wearables, evaluation, decision]
sources: [site/assets/study.js, site/assets/halftime-data.js, site/api/health.js, site/api/_gh.js, tools/site/supabase.sql, site/assets/admin.js, tools/site/CONNECTIONS.md]
summary: "Every variable the live prototype has: where it comes from, what uses it, where it's logged and whether it's live. Rule v0 reads only sleep, the clock and the session end; HRV, resting HR, the usual-sleep baseline and app switches never reach it and are never logged."
base_confidence: 0.7
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: core
created: 2026-11-15T16:50:00Z
updated: 2026-11-15T16:50:00Z
relationships:
  - target: "[[05-data/data-sources]]"
    type: related_to
  - target: "[[04-agent-engine/performance-model]]"
    type: related_to
  - target: "[[12-research/evaluation-plan]]"
    type: related_to
---

# Variable map (prototype, 2026-11-14)

Heramb asked how Halftime's variables connect. This is the map of the **deployed prototype** (`site/`) as it was on
2026-11-14, read from the code, not the plan. It was a read-only pass, and nothing was changed. Session note: [[25-journal/2026-11-14-variables-and-wearable-research]].

Every study event goes `HT.event` → `/api/collect` → one row in `halftime.events`, with the details in `extra` (jsonb).
Nothing is logged before consent is "agree". `/api/health` answers `{connected:false, reason:"local_only"}` on Vercel,
so a real Fitbit is read only on Heramb's machine. The WHOOP 4.0 Night tab reads the band in the browser and logs nothing
([[04-agent-engine/night-calculator|Night calculator]]).

## The flow today

```
setup (once, at Start)                        decided once at Start          during the session        after
  sleep (typed | sample | watch | none) ─┐
  planned length (typed) ────────────────┼─► rule v0 ─► when + what ─► timer ─► card / push ─► answer ─► study_end ─► check-in ─► SUS (3rd)
  next stop (sample calendar | typed) ───┤   (Halftime arm only;
  clock at the moment (late night) ──────┘    Pomodoro arm = fixed 25/5)
  arm (random, in pairs, per browser) ───► picks rule v0 or 25/5
HRV, resting HR, usual sleep, app switches, phone pickups ─► shown on /desktop, History or Night only. Never in rule v0. Never logged.
```

## The map

| Variable | From | Used by | Logged as | Status |
|---|---|---|---|---|
| Sleep last night | Typed, sample (5 h 10), Fitbit (local only), WHOOP 4.0 (Night tab), or left out | Rule v0 (<5 h −15 min, <6 h −10, ≥8 h +10; a 15-min break if <5 h); the card's reason; See why | `study_start` · `sleep_h`, `sleep_src`. **`sleep_h` is null when the sleep came from a real watch** (on purpose) | Typed: live. Watch: on one machine |
| Usual sleep (baseline) | Median of up to 28 nights, after 14 | Sample-day rule (`/desktop`), Night tab. **Not rule v0** | Not logged | Not in the real rule |
| Overnight HRV (RMSSD) | Fitbit via Google Health; WHOOP 4.0 | Shown as context only | Not logged | Collected, unused |
| Resting HR | Same | Same | Not logged | Collected, unused |
| Study minutes | The app's timer | Rule v0's focus block; card reason 1 | `study_end` · `minutes`, `planned` | Live |
| Break minutes | The timer | Restarts the focus block | `study_break`; `study_end` · `break_min`, `breaks` | Live |
| Planned length | Typed at setup | When the session ends: "keep going", nothing, or a break | `study_start` · `planned` | Live |
| App switches | **No collector.** `/desktop` makes them up (labelled sample) | Sample-day rule only | Not logged | Sample. The plan's lead feature has no source |
| Phone pickups | Sample only (a web page can't read them) | Context line on `/desktop` | Not logged | Sample; see the spikes below |
| Late night | Device clock | Rule v0: −5 min and a 15-min break | Not logged directly | Live |
| Next commitment | Sample calendar, typed, or none | Rule v0 (end time); card source 3 | `study_start` · `next_min`, `next_src` (the label never leaves the phone) | Typed: live. Calendar: sample |
| Session arm | Random within pairs, per browser | Picks rule v0 or 25/5; `/admin` compares the arms | `extra.arm` on every study event | Live |
| Rule's choice | Rule v0 | Timer and push | `study_start` · `fire_min`, `kind`, `rule` | Logged; not shown in `/admin` |
| Answer to the cue | Card or push | — | `study_suggest`, `study_response` (take, keep, snooze, wrong, missed) | Live |
| Check-in | 2 questions after End | `/admin` arm table | `study_checkin` · `finished`, `wrong` | Live |
| SUS | After the 3rd session | `/admin` | `study_sus` | Live |
| Study-task score | Placeholder; PVT-B trial at `?task=pvtb` | `/admin` main-outcome row | `study_checkin` · `task` | Planned (open decision #2) |
| Connection state | Fresh, stale, sample or none | Setup wording | Only indirectly, through `sleep_src` | Stale is handled; an expired Google token has no reconnect path |
| Phone or laptop | User agent and width | Wording, layout, keys | `study_start` · `computer`, `wide` | Live |

## Gaps

- **Collected but unused:** HRV, resting HR and usual sleep are read and drawn, but rule v0 never reads them and nothing
  logs them. So the evaluation plan's prediction question ("does watch data add anything?") can't be tested yet.
- **Used but logged wrongly:** sleep from a real watch drives rule v0 but is logged as `sleep_h = null`, so `/admin` shows it as
  "left out". Rule steps and the late-night flag aren't logged.
- **Sample data in real sessions:**
  - a profile with a watch starts from the sample 5 h 10, so rule v0 fires 10 minutes early on a made-up number;
  - the sample calendar's next stop sets the end time.

  Both can be filtered out later (`sleep_src = wearable_sample`, `next_src = sample_calendar`).
- **In the plan but missing:**
  - app switches or idle time (no laptop collector);
  - personal baselines in the rule (#19);
  - the main outcome (#2, #3);
  - a reconnect flow for Google Health;
  - an HR quality gate;
  - steps or "minutes since you last moved".
- **Two rules:** rule v0 in `study.js` (sleep, clock, end; absolute cut-offs) and the "sample-day rule" in `halftime-data.js`
  (session vs usual, switches vs usual, sleep vs usual). Rule v0 is decided once at Start; nothing measured during the
  session moves it.
- **Balance is per browser, not per person:** Safari, the Home Screen app and a laptop each keep their own arm sequence.

Since this map, the [[24-synthesis/declutter-brief-2026-11-15|declutter brief]] made the sleep-to-device-use link the
product, and two spikes tested how to measure device use: [[25-journal/2026-11-15-spike-phone-use|phone]] and
[[25-journal/2026-11-15-spike-laptop-use|laptop]].

## The three choices that block the rest

1. **The outcome:** the study task (#2) and the prediction target (#3). Without them, no input can be shown to matter.
2. **One rule and its inputs:** absolute or personal cut-offs (#19); decided once at Start or re-checked during the session; switches and HRV in the rule or only logged.
3. **The watch route and what gets logged:** #4 and #22, plus consent. Until each person has their own path, watch variables are Heramb's alone. Logging real readings changes the consent text, which is a team decision.

See [[24-synthesis/open-decisions|Open decisions]]. Which metrics are worth computing, and from which device:
[[12-research/wearable-metrics-and-devices|Wearable metrics and devices]].
