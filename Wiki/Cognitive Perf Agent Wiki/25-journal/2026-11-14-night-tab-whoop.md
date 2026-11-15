---
title: "The Night tab: last night from a WHOOP 4.0, read over Bluetooth"
category: 25-journal
tags: [journal, frontend, wearables, privacy, sleep]
sources: [site/assets/whoop4.js, site/assets/night.js, site/assets/night-tab.js, site/assets/study.js, tools/site/build-app.py, tools/qa/night-test.mjs, design/mockups/night-tab/BRIEF.md, tools/site/README.md]
summary: "A fifth tab shows last night from Heramb's WHOOP 4.0 (no membership): one sentence, what it changes today, the night on a clock, and sleep, resting HR and HRV against his usual."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-14
tier: supporting
created: 2026-11-14T19:30:00Z
updated: 2026-11-14T19:30:00Z
---

# The Night tab: last night from a WHOOP 4.0

**Goal (Heramb Chaudhari, 2026-11-14):** connect his spare WHOOP 4.0 to Halftime without a WHOOP membership, keep the
metrics to a bare minimum ("not cluttery like the other apps"), and show them in a new tab next to Demo that works on
the phone and the laptop. Fitbit Air comes later through the same night record. **What users see and what's collected
are team decisions** (CLAUDE.md); the team hasn't reviewed this yet.

## How we got here (same day)
1. A read-only map of how Halftime's variables connect showed that rule v0 reads only sleep, the clock and the session's
   end, and that HRV, resting HR and a sleep baseline were read on one laptop but never used or logged.
2. Research (CTO-seat agents, notes in the session's shared folder): community projects read a WHOOP 4.0 over Bluetooth
   (whoof-40, whoopsie-protocol, OpenStrap). A test page in Chrome connected to Heramb's band: battery, live heart rate,
   buzz and the clock worked.
3. Metric research across WHOOP, Fitbit, Oura, Polar, Garmin and Apple Watch, then Heramb's call: **three numbers
   only** (sleep, resting HR, HRV), each against your usual, plus a "not enough data" state.
4. Mockups (`design/mockups/night-tab/`): Heramb picked **A "the night, drawn"** with **B's one-line sentences**, after
   the CEO and CMO seats both leaned to A.

## What was built
- **The tab** (`site/assets/night-tab.js`): "Last night", one sentence about sleep against your usual, what it changes
  in today's breaks (rule v0's own numbers; fixed-timer sessions don't change), the night on a clock (heart-rate line,
  lowest point, last night vs your usual), a one-tap "Is this when you slept? Yes / Change", the three rows, and "How
  these are worked out". States: confirm, learning (n of 7 nights), not enough data (with the reason), an earlier night,
  syncing, errors in plain words, a labelled sample night, and phone / no-Bluetooth explanations.
- **The reader** (`site/assets/whoop4.js`): Web Bluetooth in Chrome or Edge on a computer. A stored batch is
  acknowledged to the band only after it's saved.
- **The calculator** (`site/assets/night.js`, method `night-v1`): see [[04-agent-engine/night-calculator|the Algorithm Card]].
- **Connections:** the study setup uses the WHOOP night as "From your WHOOP 4.0" (never logged, like the Fitbit path:
  `sleep_h: null`, `sleep_src: wearable`, `sleep_watch: whoop4`); Delete my data and a new person on the same browser
  wipe it; `/admin` labels such sessions "from a watch · not saved"; `/desktop` and `/preview` allow Bluetooth in their
  frame; analytics get counts and codes only (`night_sync`, `night_confirm`, `night_sample`, `night_wipe`).
- **Privacy:** readings stay in the browser (IndexedDB, 35 days) and are never sent to the server. A phone can't read
  the band; showing the laptop's night on the phone needs the night record on the server, which is a team decision.

## Checks
- `tools/qa/night-test.mjs`: 46 pass, in New York, Los Angeles and Kolkata time.
- Device walks of every state on iPhone SE / 14 / Pro Max and two laptop sizes: 0 console errors, 0 UI-check defects
  (115 frames).
- In the browser: a synthetic night through IndexedDB → recompute → confirm → change (with time checks) → the study
  setup and a started session using it → reload (kept) → delete (gone) → a different person (wiped).
- An independent code review found 6 issues; all fixed. The worst: the owner check ran before the page defined the
  profile and would have wiped the WHOOP data on every reload.

## Quieter pass (same evening)
Heramb asked whether the app had become cluttered. Measured on an iPhone: History was about 4 screens (mostly a sample
week that now repeated the Night tab with made-up numbers), Night about 2.3 screens (times and the lowest point shown
twice or three times), and Now carried three extra cards. Now: History shows real sessions and folds the sample week
behind one link (its sleep and heart charts hidden); Now is Start studying plus one class-test line, with cards only
when they need the person; Night drops the repeats and the footnote (moved into "How these are worked out") and is
about 1.9 phone screens, one laptop screen. Same checks: 0 console errors, 0 UI defects, all tests pass.

## Still open
- **A full history sync and a real night on Heramb's band** haven't been run; the stored-record layout comes from
  community notes. ^[inferred]
- Not validated against a reference device (a Polar H10 check is proposed). Not checked in Safari on the iOS Simulator.
- Team decisions: whether the tab ships to classmates, whether nights may go to the server (phone view), the consent
  wording, and the legal/terms question of reading a WHOOP without WHOOP's app.
- No "talk to someone" line after a run of short nights (PRODUCT.md hard rule 4); Heramb chose to leave it for now (2026-11-14).
- **Deployed** to https://halftime-study.vercel.app on 2026-11-14 (Heramb asked); live files match the local build. **Not committed.**

## Related
- [[04-agent-engine/night-calculator]] · [[25-journal/2026-11-13-real-study-sessions]] · [[05-data/data-sources]] · [[25-journal/25-journal|Journal hub]]
