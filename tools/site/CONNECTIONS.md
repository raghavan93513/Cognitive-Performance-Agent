# How Halftime's pieces connect (prototype, 2026-11-13)

Asked for by Heramb. This is the prototype's wiring, not the team's backend: there is still no database for health
data, no laptop app and no agents. The team decides those (open decisions #1, #4, #6, #11, #16, #22).

```
watch or ring ─ Google Health API ─► /api/health ─┐
laptop  (sample afternoon) ───────────────────────┼─► records ─► today's numbers ─► one fixed rule ─► the suggestion
phone   (sample pickups, context only) ───────────┤        site/assets/halftime-data.js              │
calendar (sample day) ────────────────────────────┘                                    /desktop reads it today;
                                                                                        /app can switch to it
```

## What is real and what is sample

| Source | Today | To make it real |
|---|---|---|
| Watch or ring | **Live** from a Fitbit through the Google Health API, on a computer that holds the credentials. Sample everywhere else, including the public site. | Our own Google Cloud OAuth client and a per-person sign-in (now it is one person's course-helper credentials). |
| Laptop | Sample: one seeded afternoon of app-category spans and switches. | The laptop app (Electron or other; not started). |
| Phone | Sample pickups, shown as context only and never used in a suggestion. | A native iOS app. A website cannot read pickups. Whether to collect this at all is a team decision. |
| Calendar | Sample day (student or athlete) from `demo-data.js`. | Google or Apple calendar sign-in. |

## Files

- `site/api/_gh.js`: gets an access token and turns Google's DataPoints into small plain rows (one row per night:
  sleep, resting heart rate, overnight HRV; heart rate thinned to 5 minutes; steps from one source app).
- `site/api/health.js`: `GET /api/health`. Answers `{connected:false}` unless the credentials are set **and** the request
  is local (or `HEALTH_PUBLIC=1` is set on purpose). Stores nothing; caches the answer in memory for 5 minutes.
- `site/assets/halftime-data.js`: the data layer. `HalftimeData.build(opts)` returns
  `{ sources, features, decision, records, counts }`. `HalftimeData.load(opts)` asks `/api/health` first.
  Options: `role`, `device`, `moment` (`now`, `calm`, `early`), `watch` (`sample`, `stale`, `none`), `live`.
- `site/desktop.html`: the laptop version, at `/desktop`. Two halves:
  - **Left, your session:** the phone app itself (`/app`) in a frame, so the timer, the suggestion, breaks and the
    check-in all work on a laptop and there is one study engine (`site/assets/study.js`), not a copy of it.
  - **Right, the evidence:** one lane per source on one clock. While a session runs it reads the app's saved session
    (`localStorage` `ht-study`) once a second and draws the real timer, breaks and suggestion, with **sample** laptop
    activity made up minute by minute from the session id (more switching the longer you go without a break, idle
    during a break). With no session it shows the sample afternoon from the data layer.
  - "Fast demo" runs a session 60× faster (`/app?speed=60&arm=halftime`); those sessions are marked as tests.
  - It does not load `track.js` itself (two copies in one tab would share one event counter); it reports through
    the frame's copy.
- `tools/site/test-data.mjs`: 19 checks, no network. `node tools/site/test-data.mjs`.

## The rule (a stand-in, the "sample-day rule")

Suggest a short walk when at least two of these hold: the session is longer than the person's usual, app switching is
above their usual, last night was over an hour short of their usual sleep. Only if a 5-minute walk leaves 10 minutes
before the next stop. Under 20 minutes of session it says "Not enough data yet". A stale or missing watch is left out
and the card says so. Sleep is not counted until there are 14 nights. It is plain code; no language model is involved.
This is not the team's tested model.

## Running it with a live Fitbit

The credentials are the pair the BINF 4070 course OAuth helper issues (`GOOGLE_HEALTH_REFRESH_TOKEN`,
`GOOGLE_HEALTH_HELPER_TOKEN`). Keep them in a file **outside this repo** and load them as env vars:

```bash
set -a; . ../halftime-google-health.env; set +a; node tools/site/serve.mjs 3011
```

Then open http://127.0.0.1:3011/desktop. Without the env vars the page shows the sample watch.
`/desktop?watch=sample|stale|none`, `?moment=now|calm|early` and `?role=student|athlete` jump between states.

## Checked against a real Fitbit Air (2026-11-13)

- The course helper's `/refresh` gives a one-hour access token; `users/me/identity` answers 200.
- `sleep`, `daily-resting-heart-rate`, `daily-heart-rate-variability`, `heart-rate`, `heart-rate-variability`, `steps`,
  `active-minutes`, `active-zone-minutes` and `exercise` all return data from "Fitbit Air".
- **Daily HRV is there**: `averageHeartRateVariabilityMilliseconds` (RMSSD, ms), plus a deep-sleep RMSSD, non-REM heart
  rate and entropy. This settles the "does the Air report HRV" question in open decision #18.
- Sleep lists are capped at 25 per page and come newest first. A date filter that matches nothing returns an empty
  list, not an error.
- Daily numbers arrive as strings (`"72"`); HRV arrives as a number.
- An account can hold nights from years ago. Keep only the 28 days up to the newest night.

## Not done

- The phone app (`/app`): its study timer now takes last night's sleep from a live Fitbit (`HalftimeData.watchNow()`,
  wired into `site/assets/study.js`). Synced today: the number is used and labelled "From your Fitbit Air". Not synced:
  no number is offered and the person types it or leaves it out. No live watch: the sample or typed sleep, as before.
  A real watch reading is never logged (`sleep_h` is null when `sleep_src` is `wearable`). The Demo tab's sample day
  and the History charts still read `demo-data.js`.
- Two rules exist: the study timer's timing rule (`RULE` v0 in `study.js`) and the laptop screen's "sample-day rule".
  The team should pick one.
- A phone and a laptop are still two separate browsers: a session started on a real phone does not appear on the
  laptop page. Inside one browser they are the same session. Across devices needs the backend.
- No landing-page link to `/desktop` yet, and nothing here is deployed.
