---
title: Screen Gallery
category: 09-design
tags: [frontend, reference]
sources: ["tools/qa/device-walk.mjs", "design/screen-journey/README.md"]
summary: "Every screen we built (94), stitched into one student's journey plus every state of the earlier rounds; 89 open live with a step-through viewer; which states are covered and which are missing. Sample data only."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-04T23:00:00Z
updated: 2026-11-06T00:05:00Z
---

# Screen Gallery

**The stitched journey:** https://claude.ai/artifact/YJ7dhaYckaNcexVPUWt3XY. It's private, so share it from its Share menu. The source and capture steps are in `design/screen-journey/`.

It has 41 screens, captured on 2026-11-05 at iPhone size (390×844) plus four laptop views (1440×900), all with sample data. They're laid out as one student's week in seven chapters, with arrows naming the tap that leads to each next screen. Tapping a screen opens that exact state live, in a phone frame. An eighth chapter, "How we got here", holds 53 screens from earlier rounds:
- every state of the three round-1 directions (10 each);
- every state of the three round-2 directions (6 each);
- the "How it works" directions and the trust-section directions.

The team's picks are tagged. That makes 94 screens in all, and 89 open live. "Walk the whole journey" steps through them in order, with ← and → and the tap that leads to each next screen.

## The chapters

1. **Finds Halftime** (landing page): 7 iPhone screens and 4 laptop views. See [[09-design/landing-page]].
2. **Sets it up:** connect, Google's "unverified app" warning, connected (Fitbit, Oura, no wearable).
3. **Studies with it:**
   - the idle pill;
   - "Short walk now?" and its reasons;
   - the walk timer and the opened walk;
   - "OK, keep going."
4. **When it isn't sure:** still learning, sleep out of date (with why), no wearable (with why).
5. **When it gets it wrong:** "What looks wrong?", then its three answers.
6. **When it needs a person:** the morning offer, which nights (an athlete's away games pre-marked), the recount, why, "Not now".
7. **Owns their data:** data sources, disconnect, delete everything, deleted, reconnect every 7 days.
8. **How we got here:**
   - suggestion-card rounds 1–2, every state;
   - the three "How it works" directions;
   - the two trust-section directions.

The product screens come from the Island + Forecast mockup (`design/mockups/suggestion-card-v3/island-forecast.html`, round 3).

## States to cover

| State | Phone (390×844) | Laptop (1440×900) |
|---|---|---|
| First run and consent | Partly (wearable setup) | none |
| Suggestion: continue | Yes (`keep`) | none |
| Suggestion: short walk | Yes (`walk`) | Landing demo only |
| Suggestion: break | Landing demo only | Landing demo only |
| Reason and sources open | Yes (`why`) | none |
| Not enough data | Yes (`nodata`) | none |
| Snoozed / declined | Idle pill (snooze has no state URL) | none |
| Escalate to a person | Yes (`escalate` and 4 more) | none |
| Watch disconnected / laptop-only | Yes (`stale`, `nowear`, `reconnect`) | none |
| History | **Missing** | **Missing** |
| Privacy controls (pause, delete) | Yes (`sources`, disconnect, delete) | none |

**Gaps in the current direction (Island + Forecast):**
- a history view;
- the laptop app's own screens (the collector's consent, pause and status);
- a full first-run consent flow.

Round 1 had a longer break, snoozed and first run; port them over if the team wants them.

## Related

- [[09-design/09-design|Design hub]] · [[09-design/landing-page]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]] · [[08-frontend/student-interface-and-feedback|Student interface]]
