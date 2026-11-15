---
title: Evaluation Plan
category: 12-research
tags: [evaluation, research, ml]
aliases: [experiment design, release gates, how we know it works]
relationships:
  - target: "[[04-agent-engine/performance-model]]"
    type: related_to
  - target: "[[08-frontend/student-interface-and-feedback]]"
    type: uses
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: How the team will test the two core claims, that watch data improves prediction and that adaptive breaks beat fixed breaks, using randomized sessions, pre-registration and release gates.
provenance:
  extracted: 0.9
  inferred: 0.1
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-11-13T14:00:00Z
---

# Evaluation Plan

The project is built to **test a hypothesis**, not to assume it. Both designs footer every claim with "no measured improvement claimed".

## The two separate questions

1. **Prediction:** does watch data improve prediction of task performance beyond laptop-only data?
2. **Intervention:** do adaptive breaks improve task outcomes compared with a **fixed-break baseline**?

These are different tests. A model can predict well while its suggested breaks don't help, and the reverse can also happen. A negative result should **simplify the product**, for example by dropping the wearable.

## Design

- **Pre-register** the primary outcome and analysis plan before looking at intervention effects.
- **Randomize** adaptive vs fixed-break schedules by session/block or by participant. Pick the level by thinking about carryover and contamination, and document why.
- **Freeze the evaluated policy** during a trial. Update models offline only after reviewing results.
- Track task accuracy, task duration, recovery time, intervention completion, adverse or uncomfortable experiences, missing outcomes and usability.
- Run **modality ablations** to measure the extra value of wearable, laptop/phone activity and optional CGM signals.
- Report uncertainty, confidence intervals, exclusions, missingness and subgroup limits. Don't overstate small or exploratory results.

## Proposal draft version (2026-11-10)

This is how the written proposal's draft puts the plan in plain terms (see [[25-journal/2026-11-10-written-proposal-draft|Written proposal draft]]). It answers the "what's the control group?" feedback from Nov 6. It is **proposed, not decided by the team.** ^[inferred]

- **Intervention question:**
  - Control: a fixed Pomodoro schedule (25 minutes on, 5 off).
  - Test: Halftime's suggested breaks.
  - Each person does sessions both ways in a random order (within-person, randomized by session). This leans towards the "session/block" option in #9 of [[24-synthesis/open-decisions|Open decisions]].
- **Prediction question:** suggestions from laptop data alone vs laptop plus watch, the modality ablation above. If the watch adds nothing, drop it.
- **Main outcome:** the score on a short study task at the end of each session, the same kind every time, fixed before looking at results. Which task is still open decision #2.
- **Secondary measures:**
  - session length and whether people finished what they planned;
  - how often people took the suggested break, and how often they said a suggestion looked wrong;
  - the 10-question System Usability Scale.
- **Survey trust:** keep surveys short, ask in the app right after a session, and check the answers against the tap logs.
- **Dropped:** "less unintended phone use", because the laptop app can't see the phone.

### Built into the prototype (2026-11-13)

The phone prototype now logs most of these measures for each real session. Heramb asked for the build; the details are in [[25-journal/2026-11-13-real-study-sessions|Real study sessions]]. What is collected still needs the team's confirmation, and nobody has been recruited. ^[inferred]

- **Control and test:** each session is randomized to `halftime` (numeric rule v0) or `pomodoro` (fixed 25 on, 5 off). The order is random within each pair of sessions, so each person gets both. Logged as `extra.arm` on every session event.
- **Main outcome:** the check-in has a slot for the study task, and its score is logged with `study_checkin`. The task is **not chosen**, so the slot is a placeholder and no score is recorded. A PVT-B style reaction check exists as a trial behind `?task=pvtb`. Still open decision #2.
- **Session length:** planned and actual study minutes and break minutes (`study_start`, `study_end`).
- **Finished what they planned:** yes, mostly or no (`study_checkin`).
- **Took the suggested break:** `study_suggest` and `study_response` (take, keep, snooze), plus breaks started by hand (`study_break`).
- **Said a suggestion looked wrong:** a "Looks wrong" tap on the card (`study_response`), and "Did the suggestion feel wrong?" in the check-in.
- **System Usability Scale:** offered after a person's third session (`study_sus`: the score and the ten answers).
- **Survey trust:** the check-in runs in the app right after the session, and the tap logs sit beside it in the same table.
- **Where to read it:** the `/admin` Study tab shows the two arms side by side.

**What it does not do:**
- **No laptop-vs-watch ablation.** The prediction question isn't tested. There is no laptop app, and the deployed site reads no real watch: sleep is typed, a labelled sample, or left out.
- **The task isn't chosen,** so there is no main outcome yet.
- **Rule v0 is a starting rule the team has not validated.** It isn't the performance model.
- **Nothing is pre-registered,** and human-subjects review isn't done (see "Research ethics" below).

## Causal caution

Recommendation **acceptance is a process measure, not proof of benefit**. Someone may accept advice without improving, or ignore good advice. Measure outcomes independently and keep prediction quality separate from intervention effectiveness.

## Release gates (Alexa)

| Gate | Evidence required before advancing |
|---|---|
| Data readiness | Source permissions work; timestamps/units validated; freshness and missingness visible; dedup tested |
| Model readiness | Participant/time-aware holdout evaluation; calibration and uncertainty assessed; fallback tested |
| Policy readiness | Allowlist, consent, quiet hours, stale-data, rate-limit and failure-path tests pass |
| Pilot readiness | Consent materials, support/contact process, incident response, protocol review complete |
| Scale-up readiness | No material safety/privacy regressions; primary outcome and operational metrics reviewed; versions reproducible |

## Research ethics

If the project involves human-subject research, work out the institutional review, consent, privacy and data-management requirements **before recruiting participants**. See [[10-trust-safety/privacy-and-consent|Privacy and consent]].

## Sources

- [[31-decks/raghavan-architecture-deck]] — slides 8, 10
- [[31-decks/alexa-kafka-system-design]] — §10.2, §11
