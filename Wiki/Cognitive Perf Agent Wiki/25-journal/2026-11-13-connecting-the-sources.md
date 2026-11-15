---
title: "Connecting the sources: live Fitbit, a data layer and /desktop (2026-11-13)"
category: 25-journal
tags: [journal, data, wearables, architecture]
sources: [tools/site/CONNECTIONS.md, site/api/_gh.js, site/api/health.js, site/assets/halftime-data.js, site/desktop.html, tools/site/test-data.mjs]
summary: "One computer reads a real Fitbit through the Google Health API. A shared data layer turns watch, laptop, phone and calendar records into today's numbers. /desktop shows every source on one clock beside the real study session. Live Fitbit sleep can set the study timer but is never logged; the public site stays on sample data."
base_confidence: 0.65
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: supporting
created: 2026-11-15T17:00:00Z
updated: 2026-11-15T17:00:00Z
relationships:
  - target: "[[25-journal/2026-11-13-real-study-sessions]]"
    type: related_to
  - target: "[[05-data/variable-map]]"
    type: related_to
---

# Connecting the sources (2026-11-13)

Heramb asked for a session on "how we could connect things together". It ran next to the session that built
[[25-journal/2026-11-13-real-study-sessions|real study sessions]]. This is the prototype's wiring, not the team's backend:
there is still no database for health data, no laptop app and no agents. Full write-up: `tools/site/CONNECTIONS.md`.

## What was built

```
watch or ring ─ Google Health API ─► /api/health ─┐
laptop  (sample afternoon) ───────────────────────┼─► records ─► today's numbers ─► one fixed rule ─► the suggestion
phone   (sample pickups, context only) ───────────┤        site/assets/halftime-data.js
calendar (sample day) ────────────────────────────┘
```

- **`site/api/_gh.js` and `site/api/health.js`:** read a Fitbit through the Google Health API. They give one row per night (sleep, resting HR, overnight HRV), heart rate thinned to 5 minutes, and steps. `/api/health` answers `{connected:false}` unless the credentials are set **and** the request is local. It stores nothing.
- **`site/assets/halftime-data.js`:** the data layer.
  - `HalftimeData.build()` and `.load()` return the sources, the features, a decision and the records.
  - `watchNow()` says whether a watch is live and fresh, live but stale, a sample, or none.
  - It holds the "sample-day rule": walk when two of three are high (session vs usual, switches vs usual, sleep vs usual). This is a stand-in, not the team's model.
- **`site/desktop.html` (`/desktop`):** the real `/app` session on the left, and every source on one clock on the right. The laptop activity is made up and labelled sample.
- **The study setup uses live Fitbit sleep** when the profile's device is a Fitbit and it synced recently (Heramb approved). Rule v0 uses the number, but `study_start` logs `sleep_h = null` with `sleep_src = "wearable"`. Real readings are never logged.
- **`tools/site/test-data.mjs`:** 22 checks, no network.

## Real vs sample

| Source | Today |
|---|---|
| Watch or ring | Live from one Fitbit Air, on Heramb's machine only, with his course OAuth helper credentials kept **outside the repo**. Sample everywhere else, including the public site. |
| Laptop | Sample: one seeded afternoon of app switches |
| Phone | Sample pickups, context only; a web page can't read them |
| Calendar | Sample day (student or athlete) |

## Findings from a real Fitbit Air

The real device had last synced on Oct 2, so the setup showed "hasn't synced since…" and offered no number. That is the
stale path working. A synced night was tested with a made-up `/api/health`: 5 h 35 min → "Under 6 h of sleep: 10 min sooner".

## Not done

- **Per-person sign-in:** each person needs their own Google Cloud OAuth client and sign-in. It is still one person's credentials, and the reconnect path for an expired token isn't built.
- **Laptop collector:** none yet. Two spikes followed on 2026-11-15: [[25-journal/2026-11-15-spike-laptop-use|laptop]] and [[25-journal/2026-11-15-spike-phone-use|phone]].
- **Watch values in the log:** HRV and resting HR are read but never logged, so the prediction question can't be tested yet. See [[05-data/variable-map|Variable map]].
- **Team decisions still open:** #4, #16 and #22 in [[24-synthesis/open-decisions|Open decisions]].

Nothing was committed on the day. It went into the commits of 2026-11-15.
