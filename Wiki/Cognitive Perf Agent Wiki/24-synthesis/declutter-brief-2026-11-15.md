---
title: "Declutter brief: one product, body × device use (2026-11-15)"
category: 24-synthesis
tags: [synthesis, decision, product, planning, privacy]
sources: [site/app.html, site/start.html, site/assets/study.js, site/assets/tour.js, site/assets/night-tab.js, "25-journal/2026-11-15-boardroom-three-problems.md", "25-journal/2026-11-15-icp-three-problems.md"]
summary: "Heramb's call: Halftime becomes one product that links last night's body to today's device use. What stays, what's cut, how phone and laptop use get measured, and what the team still decides."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: core
created: 2026-11-15T18:00:00Z
updated: 2026-11-15T22:30:00Z
relationships:
  - target: "[[24-synthesis/open-decisions]]"
    type: related_to
  - target: "[[30-course/project-requirements]]"
    type: related_to
---

# Declutter brief: one product, body × device use

**Status:** Heramb's decisions (2026-11-15) plus a proposal for the team. Scope is a **team** decision: Raghavan, Alexa and Yulee have not seen this yet. Nothing in `site/` has changed.

**Why.** Heramb, 2026-11-15: the app is "way too cluttered", "we are solving too many problems at once", and he wants "the easiest possible way". From landing page to a running timer took about 24 taps and 20+ screens. Most of the app was shown on sample data: the tour, the Demo tab, the sample week, the sample calendar, a pretend laptop pairing and a fake "Allow" screen.

How we got here: an inventory and three declutter options (trim, one screen, timer only). Then Heramb reframed the product around three problems, and four advisor seats plus six ICP testers weighed in. See [[25-journal/2026-11-15-boardroom-three-problems|the boardroom]] and [[25-journal/2026-11-15-icp-three-problems|the ICP panel]].

## Decided by Heramb (2026-11-15)

1. **Problem 3 is the product.** Halftime links how your body was last night (from a wearable, or typed) with how you actually used your laptop and phone today. Problems 1 (see your wearable's numbers without its app or subscription) and 2 (measure device use) are its two inputs, not products of their own.
2. **Device use is measured, not only asked.** In his words: "if screen time is not possible, we'll find a way. For the same laptop tracking, we'll also find a way." The seats had recommended asking instead of tracking. Heramb kept tracking in scope, so finding a route is now a task (below).
3. **Write this brief on the seats' shape.** That shape is the four screens and the cuts below.

## Proposed, for the team to confirm

**Keep / cut / merge**

| Today | Decision |
|---|---|
| Real study session: timer, one suggestion with numbered reasons, "how sure", sources | **Keep.** This is the Session screen |
| Random Halftime vs fixed 25/5 timer (the study's control) | **Keep for now.** The testers' most-named quit point; CSO and team to rework (below) |
| Check-in after a session | **Keep, change:** 3 taps, one of them about phone pull |
| Reaction-task slot, 10-question survey after 3 sessions | **Keep** (study data) |
| Consent, What's collected, Delete my data | **Keep.** Move to a Sources & privacy sheet, shown before any connect step |
| Night tab (WHOOP over Bluetooth) | **Merge** into the left half of Today |
| History | **Merge** into Week |
| 9-step sign-up | **Cut.** Becomes consent + "have a band?" + length |
| 9-card tour | **Cut** |
| Demo tab (sample day) | **Cut from users.** Kept as a presenter-only link, labelled sample, for Dec 11 |
| Pretend laptop pairing, fake "Allow" screen | **Cut** (polished UI over nothing, which the rubric forbids) |
| Sample calendar, sample week | **Cut** |
| `/desktop` (every source on one clock) | **Cut** |
| You tab | **Cut.** Its rows move to the privacy sheet |
| Tap heat maps and finger/mouse paths in analytics | **Team to decide.** Keep sessions and answers; paths are a privacy cost |

**The screens (4 + a sheet).** These are proposals; the UIUX seat called the signature move "The two halves", built on the picked Thread / Forecast / Island directions.
1. **Today.** One line split in two: last night on the left (one sentence plus sleep, resting heart rate and HRV against your usual), today's studying on the right. One button: Start studying. No scores, rings, red/green, streaks or app names.
2. **Session.** The timer and the one suggestion card as they are today, with "Talk to someone" added to the real card.
3. **Check-in, 3 taps.** Finished what you planned? · How much did your phone pull you away? · the task slot. Then a line such as "38 of 50 min kept · away 6 times" (copy for the team to lock).
4. **Week.** Seven pairs of halves, plus the link sentence once there's enough data.

The **Sources & privacy** sheet holds what it reads, what it can't see, how long data is kept, whether an AI sees it, and Delete.

**First run:** 4 screens and 5 taps to a running timer (was about 24 taps). The screens are Today (with a labelled sample) → consent → "have a band?" (WHOOP / Fitbit / none, then type sleep) → pick a length, Start.

**The new metric is a comparison, not a combined score.** Every seat agreed. Numeric code computes it. The LLM only writes the sentence from numbers it is handed, and every number is checked (CLAUDE.md rule 3). It shows how many nights it rests on and says it could be chance. Example (copy for the team to lock): "After your 4 shorter nights you kept 41 of 50 min; after usual nights, 48. 9 nights, could be chance." Until there are enough nights, it shows progress: "Learning you: night 4 of 7." Name to pick: "kept minutes" (CMO), "focus held" (UIUX) or "time on the timer" (CTO).

**Don't say "free WHOOP" in public.** WHOOP's terms bar reverse-engineering its software; whether that covers the band is unclear. The CMO's pitch pick, for the team to lock: "Your watch knows how you slept. Halftime shows what that did to your studying."

## Finding a way: measuring phone and laptop use

What the CTO verified (sources in [[25-journal/2026-11-15-boardroom-three-problems|the boardroom page]]):
- A web page can't read Screen Time.
- Apple's Screen Time report view can't send its numbers out.
- Reading per-app use needs a native app with the Family Controls entitlement, and distributing that needs Apple's approval, which can take weeks.
- A browser can't see other apps on a laptop.

Candidate routes, cheapest first. Each needs a short spike with a kill rule ^[inferred]:

| Route | Phone or laptop | What it gives | Cost and catch |
|---|---|---|---|
| A. Time the Halftime page was hidden during a session (`study.js` already listens) | Both | Minutes away from the timer | ~5 h. Phone: means "picked it up for something else". Laptop: ambiguous, since you may be working in another window |
| B. iOS Shortcuts automation: "when a picked app opens or closes", post a time to our API | Phone | Minutes in the apps the tester picks, during a session | No native app, no Apple approval. CTO to verify it runs without a prompt and that "closed" fires reliably |
| C. A small Chrome/Edge extension that counts minutes on sites the tester picks (e.g. instagram.com) | Laptop (Mac + Windows) | Minutes on picked sites during a session, never URLs | ~10–15 h. Install from an unlisted link. Covers "Instagram is a browser tab" |
| D. Native iOS app with Family Controls threshold events (+ HealthKit for Apple Watch sleep) | Phone | Per-app minutes in steps; Apple Watch sleep | 40–80 h, a Mac, a paid Apple developer account. CTO to verify whether development-signed builds avoid the approval wait |
| E. Local tracker (ActivityWatch) or our own desktop agent | Laptop | App time | 20–30 h per operating system. ActivityWatch records window titles by default |
| F. The tester copies yesterday's Screen Time minutes from Settings | Phone | A daily number | ~2 h. The floor if B and D fail |

**Proposed order:**
- Ship A and F by Nov 24.
- Spike B and C in two days each, by about Nov 21. Kill rule: if a route doesn't work on two team phones or laptops by then, the pilot uses A + F.
- D only if a teammate has a Mac and a paid Apple account. It's also the one route to Apple Watch sleep, Maya's top ask.

**Spike result, route C (2026-11-15, tested on a Mac only):** see [[25-journal/2026-11-15-spike-laptop-use|the route C spike]].
- A Chrome/Edge extension works on a Mac. It uses two permissions (storage, idle) plus access to each site the tester picks, asked one at a time. Each session splits into picked sites, other tabs, other apps and away. Halftime gets the four minute totals through `externally_connectable`, and minutes per site stay on the laptop, so `site/vercel.json` needs no change. Windows, Edge and real sites are still untested, and the kill rule needs them by Nov 21. About 13–18 team-hours to pilot.

**Spike result, routes B and D (2026-11-15, on paper; no phone test yet):** see [[25-journal/2026-11-15-spike-phone-use|the phone-use spike]].
- B works with caveats. App triggers run without a prompt, and "is closed" isn't documented for screen lock.
- On iOS 27 a shared link can carry the trigger; before 27, testers build it by hand (about 30 taps).
- A two-phone test by Nov 21 decides B. Building it after that is about 12–15 h.
- D works for a few testers without Apple's approval, but needs a paid team, a Mac and each phone plugged in once (35–60 h). It also reads Apple Watch sleep.

**Privacy line (proposed).** The tester picks their own "pull" apps or sites. Halftime stores minutes in *your picked apps*, never which app, any URL, or window titles. Four of six testers refused app names leaving the phone. Any new measure needs the consent text updated before it collects from a real tester, which is a one-way door (CSO).

## What it costs against the rubric and deadlines

- **Gains:**
  - It runs end to end on real data (sessions, typed or WHOOP sleep, measured minutes).
  - The missing LLM component arrives as the explainer.
  - Escalation gets onto the real card.
  - No more polished screens over sample data.
- **Risks:**
  - With ~12 nights per person the link card will often say "not enough data". The course rewards honest abstaining, and a labelled synthetic week ([[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data|ADR-001]]) shows what a real pattern looks like.
  - Routes B–E could eat the time before Dec 4, so the kill rule matters.
- **Rough plan (seat estimates, 35–45 team-hours):**
  - **By Nov 24:** declutter to 4 screens, plus route A, F and a consent update.
  - **By Dec 4:** the link card plus its Algorithm Card and seeded simulation, the LLM explainer, and whichever of B/C survived.
  - **By Dec 11:** demo one consented real week plus one synthetic week with a known answer, and a writeup that reports what the pilot actually shows.

## Still for the team or the CSO

1. **Confirm the cuts and the four screens** (Raghavan, Alexa, Yulee).
2. **The 25/5 control arm.** Maya, Ethan and Sam would quit at it. At minimum, say which timer you got; consider 50/10 or a per-day assignment.
3. **When the link may first show:** 5–7 nights and 5–8 sessions, by seat.
4. **Escalation.** "Talk to someone" on the real card, plus a named campus contact when short nights keep coming. Sam has asked eight times.
5. **Start the pilot before Nov 24.** As planned, Thanksgiving falls in the learning window, so the first link sentence lands in finals week.
6. **Later:** a one-tap day type (practice / lift / travel / off) for athletes (Diego, Ethan).

## Related

[[24-synthesis/open-decisions|Open decisions]] · [[30-course/project-requirements|Project requirements]] · [[25-journal/2026-11-14-night-tab-whoop|Night tab]] · [[25-journal/2026-11-13-real-study-sessions|Real study sessions]] · [[03-users/personas/icp-personas|ICP personas]]
