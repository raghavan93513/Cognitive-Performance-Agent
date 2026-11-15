---
title: "Boardroom: reframing Halftime around three problems"
category: 25-journal
tags: [journal, team, product, planning]
sources: [".claude/skills/boardroom/SKILL.md", "site/assets/study.js", "site/assets/whoop4.js", "site/api/health.js"]
summary: "CEO, CTO, CMO and UIUX on Heramb's three-problem reframe: all four make problem 3 the product, with no combined score; Screen Time and laptop tracking aren't reachable from the web."
base_confidence: 0.55
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: supporting
created: 2026-11-15T18:00:00Z
updated: 2026-11-15T18:00:00Z
---

# Boardroom: reframing Halftime around three problems (2026-11-15)

Outcome: [[24-synthesis/declutter-brief-2026-11-15|Declutter brief]]. Testers: [[25-journal/2026-11-15-icp-three-problems|ICP panel, same day]].

## Framing

- **Question.** Heramb proposed three problems:
  1. Connect a wearable without its subscription and see bare-minimum metrics.
  2. Measure productivity on the laptop and phone (e.g. iPhone Screen Time, Instagram while studying).
  3. The most important: connect 1 and 2 into a new metric.

  He asked the CEO, CTO, CMO and UIUX what to build, how, which screens, and how to keep people using it to the last day.
- **Decision it feeds.** Scope and screens for the pilot (~Nov 24), the Dec 4 checkpoint and the Dec 11 demo. A team decision; Heramb asking.
- **Seats.** CEO, CTO, CMO, UIUX (as Heramb named them). The CSO was not run; its lane (consent, thresholds, the control arm, escalation) is listed as open in the brief.
- **Process note.** Round 1 ran as four independent memos in parallel. Round 2 (anonymised cross-examination) and the red team were **not run**: the memos converged, and Heramb moved straight to the brief. The CEO did not write a separate synthesis; the clerk's count of agreements is in the brief and below.

## Round 1 memos (as returned, lightly trimmed for length)

### CEO
- **Recommendation.** Make problem 3 the product. Problems 1 and 2 are inputs in their cheapest honest form. Don't headline a free wearable dashboard, and don't read iPhone Screen Time before Dec 11.
- **Disagreement with Heramb.** Don't define a new combined metric. Show two measured numbers side by side (last night's sleep, today's focused minutes) and say "not enough data" until there are enough nights.
- **Door type.** Screens are a two-way door. A native app or a new claimed score is one-way.
- **Plan (~35–45 team-hours):**
  - By Nov 24: the four-screen declutter. Cut the pretend pairing, the fake Allow screen, the tour and the Demo tab. Add the check-in question "How much did your phone pull you away? none / some / a lot", plus an optional typed Screen Time total.
  - By Dec 4: a Sleep & study card. Code pairs each night with the next day's minutes; the LLM explains; it runs on labelled synthetic weeks for the mock demo.
  - By Dec 11: one consented real week plus one synthetic week.
- **Evidence.**
  - Screen Time needs a native app with FamilyControls (CTO steal file B14).
  - The phone can't read the WHOOP band.
  - About half of students have no tracker.
  - The browser only sees its own tab.
- **Rhymes with.** Mindstrong (inferred state from passive phone use, $160M, closed) vs Rise (sells one answer).
- **Confidence.** P = 0.75 that the loop runs end to end by Dec 4. P = 0.10 that a native Screen Time read reaches testers by Dec 11.
- **Would change my mind.** A way to get phone app totals without a native app, set up in under 10 minutes; or at least 5 testers with lapsed WHOOP/Oura memberships.
- **Counter-argument.** Most cards will say "not enough data", so the demo could fall flat.
- **Retention.**
  - The timer is the daily habit.
  - "3 of 5 nights" progress, no streaks.
  - One opt-in evening reminder.
  - A recap unlocks on Dec 10.
  - Under 30 seconds of input a day.
- **Decisions for the team.** Problem 3 is the product and phone use is typed, not tracked; cut the pretend pairing and fake Allow screen; no combined score.

### CTO
- **Recommendation.**
  - Problem 1: works today on a laptop only.
  - Problem 2 as described: not doable for this pilot.
  - Build problem 3 on time-on-the-timer (page-hidden seconds during a session; `study.js` already listens for visibility) plus last night's sleep. Code computes, the LLM explains.
- **Plan:**
  - By Nov 24: hidden-time measure (~5 h); an optional "copy yesterday's Instagram minutes from Settings → Screen Time" field (~2 h); sleep from WHOOP (laptop) or typed.
  - By Dec 4: a "Sleep vs focus" card that abstains until 7 valid nights and 8 sessions (~10 h + Algorithm Card and seeded simulation ~6 h); an LLM explainer whose numbers are checked against inputs, with a template fallback (~12 h). The live app has no LLM today.
  - By Dec 11: study export and a writeup of what 2.5 weeks can and can't show.
- **Cut.** A native Screen Time app (40–80 h plus weeks of Apple approval); a laptop tracker (20–30 h per OS plus installs); public Fitbit/Oura connections.
- **One-way door.** Consent text for new measures (CSO) before Nov 24.
- **Sourced facts:**
  - The Screen Time report extension can't save or send data [1].
  - Family Controls distribution needs Apple approval, reportedly weeks [2].
  - DeviceActivityEvent threshold callbacks exist, but moving data out is a workaround [1][3].
  - Web Bluetooth is not in Safari or any iPhone browser [4].
  - The Oura API gives Gen3/Ring 4 owners nothing without membership [5].
  - Google "Testing" refresh tokens expire after 7 days [6], with a 100-user cap [7].
  - WHOOP's terms bar reverse-engineering its Services including Software; whether that covers band firmware is unclear, not legal advice [8].
  - HealthKit needs a native app; TestFlight allows 100 internal testers without review [9].
  - ActivityWatch records window titles [10].
- **Inference.** With ~10 sessions, r = 0.3 has a 95% interval of about −0.4 to 0.8, so describe, don't predict. On a laptop, hidden time is ambiguous.
- **Rhymes with.** Google Flu Trends (stitched proxies drift).
- **Confidence.** 0.85 on facts, 0.55 on retention.
- **Would change my mind.** A supported export route from Apple, or a teammate with a paid account, a Mac and an approved entitlement.
- **Retention (technical):**
  - Require Add to Home Screen (web push and storage) [11][12].
  - Add a recovery code for the id in localStorage.
  - Weekly Fitbit reconnect.
  - A laptop WHOOP sync every 2–3 days.
  - Label method versions.
  - Settle the 7- vs 14-night "usual".

Sources:
1. developer.apple.com/forums/thread/818297, /thread/809823
2. developer.apple.com/forums/thread/818452, /thread/824665
3. developer.apple.com/documentation/deviceactivity/deviceactivityevent
4. developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API; bugs.webkit.org/show_bug.cgi?id=101034
5. support.ouraring.com/hc/en-us/articles/4415266939155
6. developers.google.com/identity/protocols/oauth2
7. developers.google.com/health/support
8. conductatlas.com (secondary; whoop.com returned 403)
9. developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview
10. ActivityWatch aw-watcher-window README
11. webkit.org/blog/13878
12. webkit.org/blog/11338

### CMO
- **Recommendation.** One product, not three. Problem 3 is the product. Don't say "free WHOOP without the subscription" in public (WHOOP says the 4.0 band needs a membership; the terms question is open).
- **The number.** "Kept minutes": of the minutes you planned, how many you kept, shown next to last night's sleep. Phone use is asked, not sensed.
- **Explaining it to a friend.** "I planned 50 and kept 38. After nights under 6 hours I keep about 10 fewer."
- **Pitch (for the team to lock):**
  - Safe: "Halftime shows how last night's sleep changes the study time you actually keep."
  - **Sharp (pick):** "Your watch knows how you slept. Halftime shows what that did to your studying."
  - Bold: "Slept five hours? See what it does to tonight's study time before you blame yourself."
- **Demo.** Two real nights side by side, then the honesty beat: "Only 3 nights so far, so not enough data."
- **Signature tests.** Pass on 5-second, cringe, 1 am and pixel. Receipts and "tomorrow" fail today and are fixed by this memo.
- **Evidence.**
  - Median mental-health app 30-day retention is 3.3% (Baumel 2019).
  - The Fitbit basic app is already free ^[inferred].
- **Confidence.** P = 0.65 that this framing scores better than the three-problem pitch.
- **Retention.**
  - A morning one-liner and self-set reminders, never after 11 pm.
  - "Learning: 3 of 5 sessions".
  - Recruit one study group or team together.
  - A Dec 10 "your three weeks" page.
- **Kill rule.** Under 30% logging a session on days 5–7 → cut and interview.

### UIUX
- **Recommendation.** Build problem 3 only. The signature move is **"The two halves"**: last night on the left, today's studying on the right, waking up as halftime in the middle. "Productivity" means measured minutes plus one answered question, never Screen Time.
- **Screens:**
  1. Today: the two-halves card plus Start; no scores, rings, red/green, app names or streaks.
  2. Session: timer, one card, the Island pill; away time counted silently.
  3. Check-in in 3 taps, ending "Focus held: 38 of 50 min · away 6 times".
  4. Week: seven pairs of halves and the link sentence.
  - A Sources & privacy sheet.
- **Cut.** Sign-up, tour, the Demo tab (becomes `?sample`), pretend pairing, fake Allow, sample calendar, and Night as a tab.
- **First run.** 4 screens, 5 taps.
- **Link states.** Days 1–6 show "Learning you: 2 of 7 nights, 1 of 5 sessions. Nothing to say yet." After that: "After your 4 shorter nights you held 41 min an hour; after usual nights, 48. Fairly sure, 9 nights."
- **Retention.**
  - Day 1: the right half fills.
  - Day 7: the dots complete.
  - An optional morning push, off by default.
  - A "Your season" three-card recap with export and delete.
- **Precedent.**
  - Oura and Apple Vitals: learning period and typical band.
  - Structured: segments on a day line.
  - one sec: an easy dismiss.
  - Spotify Wrapped and Arc's farewell page: a rare recap and ending well.
  - Avoid: Opal's red/green score, Rise's energy curve, Forest's dying tree.
- **Evidence.** Sham negative sleep feedback worsened next-day alertness, d = 0.79 (Gavriloff 2018). Broken streaks lower later use (Silverman 2023).
- **Confidence.** ~0.6 on the screen list; ~0.4 on week-2 return.
- **Would change my mind.** If iOS Safari can't tell a screen lock from an app switch, the "away" count only works with keep-awake or on a laptop.
- **Counter-argument.** Even the honest problem 2 is thin, and "productivity" risks overclaiming.

## Where the seats agree (clerk's count)

All four seats agree on these points:
1. Problem 3 is the product.
2. No combined score; show a comparison with its n.
3. Typed sleep is a full path.
4. Code computes, the LLM explains.
5. "Not enough data" is shown as progress.
6. Cut the sign-up, the tour, the Demo tab and the fake screens.
7. No streaks; an end recap.

Three of four (CEO, CMO, CTO) say not to claim "free WHOOP" in public.

**Disagreements, all minor:**
- The name of the measure.
- The form of the phone question.
- The link threshold (5–7 nights, 5–8 sessions).

**Heramb's response.** Yes to the brief, but device use is to be measured: "if screen time is not possible, we'll find a way. For the same laptop tracking, we'll also find a way." That overrides the seats' cut of tracking; route options are in the brief.

**Fairness check.** All positions represented: no. The CSO was not run, and the round-2 cross-examination and red team were skipped.
