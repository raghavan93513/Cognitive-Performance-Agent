---
title: Pre-Build Briefing
category: 13-team
tags: [team, planning, synthesis, decision]
sources: ["13-team/ceo-steal-file.md", "13-team/cto-steal-file.md", "13-team/cmo-steal-file.md", "13-team/cso-steal-file.md", "https://gsas.columbia.edu/sites/default/files/content/docs/StudentresearchPolicy.pdf"]
summary: "What the CEO, CTO, CMO and CSO learned studying the steal library and the whole project in parallel: what we know, what we don't, where they agree and disagree, and dated next steps."
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: core
created: 2026-11-05T05:00:00Z
updated: 2026-11-05T06:00:00Z
---

# Pre-Build Briefing

**Read this before building anything.** On 2026-11-05 the team asked the four advisor seats to "start understanding everything from the steal library … make sure we know literally everything before we start". The CEO, CTO, CMO and CSO worked **in parallel and independently**. Each read the steal library and the whole wiki, researched its own lane live, and wrote a steal file:

- [[13-team/ceo-steal-file|CEO steal file]]: 15 cases and 5 anti-cases on wedge, focus and scope (24 sources)
- [[13-team/cto-steal-file|CTO steal file]]: how each stolen mechanism works technically; 17 cases and 7 anti-cases (52 sources)
- [[13-team/cmo-steal-file|CMO steal file]]: how those products launched and talk; 27 cases and 9 anti-cases (43 sources)
- [[13-team/cso-steal-file|CSO steal file]]: the evidence (and harm) behind each mechanism, plus study design; 20 cases and 7 anti-cases (32 sources)

This page is the clerk's synthesis. Every claim points to a seat file. Where two seats disagree, both views are kept. Two load-bearing claims were re-checked against the primary source (marked ✔). **The seats advise; the team decides.**

## 1. The five things we must know before we start

> **Status 2026-11-05 (see §5):**
> - #1 (IRB) is set aside at Heramb's request.
> - #2 (study task) and #4 (scope) are open team decisions.
> - #3 (wearable route) is resolved in the docs (Testing mode works for ≤ 100 users, 7-day tokens, RMSSD, the Air reports HRV), with a 1-hour spike left.
> - #5 is decided: **students and athletes**.

All four seats independently put some version of these at the top.

| # | What we must know | Why it blocks | Seats | How to find out | By |
|---|---|---|---|---|---|
| 1 | **Does a classmate pilot need IRB review?** (open decision #11) | ✔ Columbia's IRB policy "Students as Researchers" (effective 16 Mar 2012). A course project skips IRB submission only if all four criteria hold: a campus setting; only practising methods; minimal risk; and **anonymous data collection**. Also: "Research conducted over the internet will not be permitted under this category", and exempt projects still go to the IRB "for a determination". A pilot linking wearable data to named classmates over a hosted backend looks like it needs review ^[inferred]. The policy also lets an instructor request one class-wide determination | CSO, CEO, CMO | Email course staff the CSO's 6-question list (§F of the CSO file). Recruit nobody until the answer is in writing | Ask by **Nov 7**; answer by Nov 13–14 |
| 2 | **The study task and its one primary outcome** (#2, #3) | Nothing can be validated without them, and practice effects (d up to 1.19) can swamp any break effect | CEO, CSO, CTO | The CSO's lead option is **PVT-B (3 min)** with 2–3 familiarisation runs. Draft outcome: the within-person difference in PVT-B response speed, adaptive vs fixed. It measures alertness, not studying, so say so. The team picks and pre-registers | Decide **Nov 11**; pre-register before the first session (~Nov 18) |
| 3 | **Does any wearable route work right now?** (#4, #18) | The Fitbit Web API was turned off on Nov 2. Google's pages conflict on whether Testing mode needs review. The HRV metric Google returns is unnamed. Testing-mode tokens reportedly expire after 7 days | CTO, CEO | A 2-hour spike: a GCP project in Testing, 3 team test users, the loaner Fitbit. Pull one night, read the HRV field, and check token refresh on day 8 | Spike by **Nov 9–11**; day-8 check ~Nov 13 |
| 4 | **Scope: lean pilot or production plan?** (#1) | The CEO forecasts P = 0.65 that one suggestion runs end to end by Dec 4 with lean scope, against 0.30 with production scope | CEO, CTO | `/decide` → ADR-002: an iPhone Safari card, a one-OS laptop collector, FastAPI and Postgres, plus Alexa's data rules | **Nov 11** |
| 5 | **Students only for Dec 11?** (#10) | A second persona doubles design and evaluation work. The pilot can't say anything about athletes unless athletes enrol. Coach-privacy stakes are high | CEO, CMO, CSO | Team call; one honest sentence on the slide naming athletes as a future segment | **Nov 6** |

## 2. Where all four seats agree

1. **The bottleneck is the evidence loop, not features.** Build the smallest real path: data → numeric estimate → policy → a card with sources. CEO §C1, CTO §C, CSO §C.
2. **Laptop-only is core, not a fallback.** About half of students may have no tracker, and the wearable route is unproven. CEO, CTO, CMO.
3. **Promise "less tired", never better grades.** Breaks reduce fatigue (d ≈ .35); the effect on demanding cognitive work is null (d = −.09). All four flagged the **Part 3 lightning hook** ("My next quiz score went back up") as an overclaim to replace before the Nov 11 draft. CEO, CMO, CSO.
4. **Code computes, the LLM explains, the policy decides**, with record-bound citations validated before display. Liu 2023: only 51.5% of AI-search sentences were fully supported by their citations. CTO #1–2, CEO #6, CSO.
5. **Silence is the default.** Two-signal triggers (Apple Vitals), one prompt per session window (BeReal), a daily cap, and a measured false-alarm rate (the Epic lesson). CTO #5, CEO #8, CSO #6.
6. **"Keep going" is a hero, not a failure.** In the one sec study (PNAS, n = 280), the easy dismiss was the strongest ingredient. CMO, CTO, CSO.
7. **Escalation is a ladder the student controls**, with Columbia numbers verified and kept in config, and a rehearsed drill. 59% of people with suicidal thoughts hid or underreported them to avoid staff contact (CSO, a 2025 study), so never auto-contact and never screen. CSO #5, CEO #9.
8. **The abstain card is the memorable frame.** "Not enough data: your watch hasn't synced since 09:40. Here's what I can still say." CMO #2; CTO #4 makes every abstain reason a named state.
9. **No trackers, ever.** There's a privacy page before any recruiting. The headline line "It never reads what you type, browse or say" ships only after the CTO confirms it is literally true. CMO #4, CTO #7.

## 3. Where they disagree, or the steal library needs changing

| Topic | Positions | Kind | Resolution |
|---|---|---|---|
| **Hours** | CEO's top 10 ≈ 41 h; CTO's ≈ 100 h; CMO's ≈ 31 h (+6 optional); CSO's ≈ 39 h. That's about 210 h, against an assumed 150–160 h (3 people × ~10 h/week). Some items overlap (citations, false alarms, the privacy page), but the plan is still over budget ^[inferred] | Fact (budget) + value (cuts) | Each person writes their real hours by **Nov 6** (CEO unknown #4). Then cut in this order: CTO's #10 (weekly recap), #9 calibration, #8 push, then CMO's #10 |
| **S-05 Apple Weather phrasing** ("Your focus is likely to dip in the next 30 min. Fairly sure.") | CTO **vetoes**: we have no validated prediction model. Talk about time on task and fatigue instead. CSO: forecast phrasing evidence is only moderate | Fact | Change the card's example copy; confidence words only from calibrated bins, or omitted |
| **S-11 Live Activities** | CEO: cut for Dec 11 (needs a native app). CTO: a web stand-in, an in-page countdown plus one Web Push, which on iOS works only after Add to Home Screen | Prediction | Keep the in-page countdown. Push is a stretch goal, tested on 3–5 classmates' iPhones by Nov 20 |
| **S-12 Wrapped-style recap** | CEO: cut (needs weeks of data). CTO: stretch. CMO: optional, no health values (Wrapped's share count includes screenshots). CSO: turn it into a **pilot debrief** that gives each participant their own data, with "did it make you feel worse?" | Value | Do the CSO's debrief (Dec 8). The shareable recap is after the course |
| **S-09 BeReal once-a-day** | CMO: use it for notification restraint only; BeReal's daily users fell from ~15M to ~6M and it later loosened the scarcity. CSO: once-a-day prompts are weak–moderate evidence, and HeartSteps' effect faded about 2% a day | Fact | Use it as a cap on prompts, not as a growth mechanic |
| **S-01 range bars** | CTO: a personal median and IQR, shown only after 14 valid nights. CSO: harm-anchor evidence is moderate, **but a personal "usual range" can make chronic short sleep look normal** | Value | Pair the personal range with a fixed, sourced reference line (e.g. 7 h) in plain words. A UIUX and CSO call |
| **S-04 inline sources** | CTO and CEO: must-have (it's graded). CSO: contested; citations raised trust even when they were random (Ding 2025) | Fact | Keep them, but every marker opens a real record, and test that people actually open them |
| **Tagline** | CMO's steal file picks *sharp* ("Keep going, walk, or break? It shows why, and says when it isn't sure."); earlier CMO and CEO tests picked *safe* | Value | Run all three variants through the 5-second test with 3 non-team people and `/icp` by **Nov 5** |

## 4. Facts corrected while doing this (already fixed in the wiki)

- **Kaur et al. 2020** ✔: the 77% "well-timed" figure comes from a **three-day** deployment in week four, and the control group ruled out novelty rather than serving as a comparison ("our goal was not to compare the two conditions"). Fixed in [[12-research/science-and-tech-evidence|Science and tech evidence]] §3, the casebook and the seat files. Caught by the CSO.
- **Oura's growth**: the source credits retail (Best Buy 2023 → 4,000+ stores), partnerships and campaigns, not "organic celebrity wear and word of mouth". Fixed in [[24-synthesis/market-map|Market map]] and the casebook. Caught by the CMO.

**Still to fix (needs a team member):**
- The Part 3 lightning hook overclaim in [[30-course/deliverables/part-3-final-showcase|Part 3]].
- `index.md` still shows status as of Oct 26 with the Oct 30 deadline (CEO).
- The roster: the team hub lists a fourth contributor ("Yulee") that `CLAUDE.md` doesn't (CEO).
- All 12 steal-library cards are still `Seen: described`. Open each before it drives a design decision (CEO unknown #15).

## 5. Status of every unknown (updated 2026-11-05, after the follow-up round)

After the first draft, the CTO and CSO went back out to resolve what public sources and simulation could settle, and Heramb answered the team-only questions. ✔ marks a claim the clerk re-checked against the primary source.

**Resolved**

| # | Unknown | Answer | Source |
|---|---|---|---|
| R1 | Can a course pilot use the Google Health API without Google's security review? | **Yes, up to 100 hand-listed test users.** ✔ The setup page: new OAuth clients are "in an unverified state with a cap of 100 users for both testing and production purposes", and "supporting more than 100 users … requires completion of a third party security review". Costs: each participant's email is added by hand, each sees an "unverified app" warning (consent copy must explain it), and each must first link a **personal** Google account in the Google Health app | CTO steal file §H1 |
| R2 | Do Testing-mode tokens expire after 7 days? | **Yes.** ✔ "the refresh tokens issued are time-based and expire after 7 days". A Columbia-only "Internal" app is a dead end, because Google Health can't link to a Workspace (LionMail) account. Design for a weekly reconnect | CTO §H2 |
| R3 | Which HRV metric does Google Health return? | **RMSSD in milliseconds** ✔: the daily average (from the longest sleep over 3 h) plus deep-sleep RMSSD; the samples are RMSSD too. Never pool it with Apple's SDNN | CTO §H3 |
| R4 | Does the loaner Fitbit Air report HRV? | **Yes**, per Google's launch post (7 May 2026). Confirm by pulling one real night | CTO §H4 |
| R5 | iOS Web Push rules | Needs Add to Home Screen and a user gesture. Always visible (no silent push). Works with Focus. Declarative Web Push since iOS 18.4. Real-world delay and install rate need the test below | CTO §H5 |
| R6 | Columbia counselling number | **CPS 212-854-2878, 24/7 phone support**, consistent across four official pages (seen 2026-11-04). CUIMC and Barnard students have their own lines, so the number shown depends on the participant's school. **988** (call or text, 24/7) confirmed | CSO §H |
| R7 | How common short sleep is | Creswell 2023 (PNAS, Fitbit, 634 first-year students): mean 6 h 37 min, ~20% average under 6 h, ~66% under 7 h. The self-reported ACHA figure is 41.9% under 7 h | CSO §H |
| R8 | Escalation false-alarm rate | A seeded simulation of 20,000 synthetic students (reproduced by the clerk). "≥ 9 of 14 nights under 6 h" flags 7.4% of students and 11% of healthy short sleepers, so **sleep alone never escalates**. Recommended **T8: 14-night mean under 5.5 h plus ≥ 2 low check-ins**, which flags about 3–5% per two weeks, ~13–21% of them coping students. It misses about half the target group, so "Talk to someone" stays on every screen. *A simulation, not evidence* | `research/algo/escalation-trigger-sim/`; CSO §H |
| R9 | Roster | **Four people:** Heramb, Raghavan, Alexa, Yulee (Heramb, 2026-11-05) | `CLAUDE.md` |
| R10 | Audience (#10) | **Students and athletes** (Heramb, 2026-11-05; confirm with the team). The seats' "students only" dissent is kept in §3. Implications: enrol athletes, gate athlete HRV logic, no coach view | Open decisions #10 |
| R11 | Team hours | **Not required** (Heramb). The cut order in §3 stays as guidance only | — |
| R12 | The Part 3 overclaim, the stale index | Flagged with a suggested replacement for the team to lock; index refreshed | Part 3 page, `index.md` |

**Team decisions still open (the team, not research, settles these)**

| # | Decision | Seats' recommendation | By |
|---|---|---|---|
| D1 | Scope (#1): lean pilot or production plan. Heramb: "team will decide later" | CEO and CTO: lean (P ≈ 0.65 vs 0.30 of an end-to-end path by Dec 4) | Nov 11 |
| D2 | Study task and primary outcome (#2, #3) | CSO: PVT-B with 2–3 familiarisation runs; outcome = within-person PVT-B response speed, adaptive vs fixed | Nov 11 |
| D3 | LLM provider and tier (#8, #16) | CTO: a paid tier only, derived features only; retention terms go in the consent form | Nov 13 |
| D4 | Randomisation level (#9) | CSO: micro-randomise suggest vs don't, within each person | Nov 14 |
| D5 | Laptop collector OS (#6) | CTO: poll likely participants, then pick one OS | Nov 11 |

**Working defaults (2026-11-05).** Heramb was asked about D1–D5 and had **no preference**. Until the team ratifies or overrides them, the build plans on the seats' recommendations. These are **defaults, not decisions**, and nothing irreversible (no real-participant data, no public claim) rests on them before the team confirms.
- **D1 scope:** lean pilot (an iPhone Safari card, one-OS laptop collector, FastAPI and Postgres, plus Alexa's data rules).
- **D2 study task and outcome:** PVT-B (3 min) with 2–3 familiarisation runs; the primary outcome is the within-person difference in PVT-B response speed (1/RT), adaptive vs fixed.
- **D3 LLM:** a paid API tier that receives derived features only. Anthropic is the seats' first choice (no training, a self-enabled BAA). Pin the model ID.
- **D4 randomisation:** micro-randomise suggest vs don't at eligible moments, within each person.
- **D5 laptop OS:** macOS first, Windows later.

**Physical tests (only doing settles them; each about 1 hour)**

| # | Test | Pass if | Owner | By |
|---|---|---|---|---|
| P1 | Google Health spike: a Testing project, 2 team test users, OAuth Playground, `users.getIdentity`, and one night of `daily-heart-rate-variability` from the loaner Air. Look for `refresh_token_expires_in` | Warning → token → HTTP 200 with an RMSSD value | CTO with Heramb | Nov 9–11 |
| P2 | Day-8 token check (and whether "Publish app" while unverified removes the 7-day expiry) | Refresh fails on day 8 (expected), or the workaround holds | CTO | ~Nov 13 |
| P3 | iOS push test: a one-button PWA on 3–5 classmates' iPhones; 6 high-urgency pushes (locked, Low Power, two Focus settings) | ≥ 80% install; median delay < 60 s | CTO | Nov 20 |
| P4 | Phone-confirm CPS 212-854-2878 and record the date and who answered | Confirmed | One team member | Nov 20 |
| P5 | PVT-B timing on 2–3 team laptops and iPhones (jitter, completion time) | Stable timing | CTO builds, CSO specifies | Nov 11 |
| P6 | Hand-run "Wizard of Oz" card with 3 classmates | They want in-session suggestions at all | UIUX + one team member | Nov 20 |

**Set aside at Heramb's request (2026-11-05):** the IRB question (#11). It stays recorded in §1 and open decisions #11.

**Date note:** Google's Health API page gives 2 Nov 2026 for the Fitbit Web API turn-off ✔, but the legacy Fitbit HRV page says 30 Oct 2026 (CTO). Either way it's off now.

**Fallback if the IRB answer is "submit and wait"** (CSO): run the full pre-registered protocol on **synthetic data** plus any usability sessions course staff approve. The writeup then reports a ready-to-run protocol. That's weaker evidence, but honest and fully gradable. The CEO forecasts P ≈ 0.15 of a real-user pilot with ≥ 10 classmates if formal review is required, against 0.45 if it isn't.

## 6. The calendar this implies (proposed; the team decides)

| Date | What |
|---|---|
| **Nov 5** | Lock the 5-second line (3 variants, 5-second test, `/icp`); the abstain frame as the hero slide |
| **Nov 6** | Proposal. Students only. Real hours and roster. Ask the TA what counts as realistic data |
| **Nov 7** | Email course staff the IRB question list |
| **Nov 9–11** | Google Health spike (one night, the HRV field). Laptop OS poll. **ADR-002 scope** and **ADR-003 study task and outcome** by the Nov 11 written draft. Fix the Part 3 hook |
| **Nov 13–14** | IRB answer. Token day-8 check. LLM provider. Consent form. Randomisation design |
| **Nov 16–20** | Privacy page. Recruiting announcement (only if cleared). Escalation drill and verified numbers. Wizard-of-Oz test. Push test. Pre-register |
| **Nov 27** | Synthetic end-to-end proof gate |
| **Dec 1** | Laptop-only live; analysis script ready |
| **Dec 4** | Integration checkpoint: one wearable route, or cut it |
| **Dec 8–11** | Participant debriefs; showcase with a live demo and a recorded fallback |
| **Dec 16** | Writeup, with the CSO's claims audit |

## 7. Decisions for the team (at most 3; if no answer, nothing changes)

1. **Send the IRB question list to course staff by Nov 7**, and recruit nobody until the answer is in writing.
2. **Decide scope (ADR-002) and the study task and outcome (ADR-003) by Nov 11.** Run `/boardroom` if contested.
3. ~~Students only~~. Decided 2026-11-05 by Heramb: **students and athletes**. Replaced by: **run the Google Health spike (P1) by Nov 11**, so the watch route is known before the build.

## Related

- [[13-team/exec-team|AI exec team]] · [[24-synthesis/open-decisions|Open decisions]] · [[09-design/steal-library|Steal library]] · [[24-synthesis/casebook|Casebook]] · [[12-research/science-and-tech-evidence|Science and tech evidence]] · [[30-course/project-requirements|Project requirements]]
