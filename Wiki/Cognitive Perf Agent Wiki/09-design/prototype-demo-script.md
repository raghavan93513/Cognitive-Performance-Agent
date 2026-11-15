---
title: "Prototype demo script (90 seconds)"
category: 09-design
tags: [design, frontend, course]
sources: ["tools/site/build-app.py (Demo sheet moments, button labels)", "site/assets/tour.js (welcome card copy)", "site/index.html (comparison table)"]
summary: "How to show the live prototype on a screen in about 90 seconds, then hand the room the QR code: one main moment, one honesty beat, nothing typed live. Also the setup checklist and what to leave out."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-06
tier: supporting
created: 2026-11-06T12:00:00Z
updated: 2026-11-13T12:00:00Z
---

# Prototype demo script (90 seconds)

Written for Heramb on 2026-11-06, for showing the prototype on a projector and then letting people scan the QR code. It works for any short slot, including a mock demo at the Dec 4 checkpoint. Every step uses a real control in the app ([[09-design/landing-page|Landing page]], `/app`). The shape follows a common founder-demo pattern: open with a moment the room has lived, show one main path live, talk about the person rather than the buttons, and end with the ask. ^[inferred]

## The script

| Time | Screen | What to do and say |
|---|---|---|
| 0:00–0:15 | None, or the landing headline | Hook: it's 1 am, you're almost three hours into studying on five hours of sleep. Your watch knows you slept badly; your study timer only knows 25 minutes went by. Nothing puts them together. That's Halftime. |
| 0:15–0:25 | Landing, the comparison table | One sentence: watches know your body, study apps know your hours, Halftime connects them to your day. |
| 0:25–1:05 | `/app` | Tap **Demo**, then **"2 h 40 min in: a walk fits"**: "It speaks once, only when a break fits before your next thing." Tap **See why**: "Every reason is numbered, with its source and how sure it is. Plain code does the math; the AI only explains it." Tap **Walk now**: the pill becomes a countdown. "You decide. It asks once, then stays quiet." |
| 1:05–1:20 | `/app` | One honesty beat. Either **Demo → "Your first week"** ("when it doesn't know, it says so") or **Demo → "Thursday morning, after weeks of short sleep"** ("when it's more than tiredness, it offers someone to talk to"). |
| 1:20–1:30 | QR poster | "Scan this, pick student or athlete, and you're in within a minute. The tour shows the rest." Leave the QR up through questions. |

If it runs long, cut the honesty beat before cutting **See why**: "plain code computes, the AI explains" answers the question "is this just ChatGPT?" ^[inferred]

## Setup before presenting

- **Set up the app beforehand.** Do the setup once on the presenting laptop and finish the tour, so `/app` opens on the home screen. Never show setup live.
- **Open three tabs, in order:**
  - the landing page, scrolled to the comparison table;
  - `/app`;
  - the QR poster (`design/qr/halftime-qr-poster.png`).
- **Turn analytics off on the presenting browser** (You tab), so rehearsals don't count as real visitors in `/admin`.
- **Display:** browser zoom 125–150%. Turn on Do Not Disturb. Have a phone hotspot ready.
- **Backup:** record the run once with QuickTime and play it if the live demo stalls. The course's must-not list includes a happy-path demo with no fallback ([[30-course/project-requirements|Project requirements]]).
- **Rehearse twice** with a timer.

## Leave out

Setup, History, the You tab, `/admin` and architecture diagrams. If someone asks how it works: plain code computes, the AI explains, and the laptop sends only a few summary numbers.

## If asked "who are the competitors?"

Three groups, from [[24-synthesis/competitive-landscape|Competitive landscape]] and [[24-synthesis/market-map|Market map]]:

- **Wearables** (WHOOP, Oura, Apple Watch, Garmin, Fitbit) give a morning readiness or stress score but don't see the laptop or the calendar.
- **Study and focus apps** (Pomodoro timers, Forest, Freedom, screen-time tools) use a fixed timer and know nothing about sleep.
- **Adjacent products:** Rise Science (energy from sleep timing), the wearables' own AI coaches, campus mental-health services (TimelyCare, Uwill) and athletics platforms (Catapult, Teamworks).

Our one line: "Watches know your body. Study apps know your hours. Nobody connects them to your day."

Be careful with two things:
- **Study apps and Rise haven't been researched properly yet**, so quote nothing specific about them.
- **"How do you get Fitbit data?"** The honest answer is "we're checking access". The Fitbit Web API was turned off on Nov 2.

## Related

- [[09-design/09-design|Design hub]] · [[09-design/landing-page]] · [[25-journal/2026-11-06-demo-app-and-analytics]] · [[30-course/deliverables/part-3-final-showcase]]
