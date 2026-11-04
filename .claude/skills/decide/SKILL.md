---
name: decide
description: Turn one open Cognitive Performance Agent question into a decision brief for the team (door type, ≥3 options incl. "do nothing", course bar and deadline fit, outside view, pre-mortem, kill criteria, a calibrated recommendation), then record it as an ADR and update Open Decisions once the team chooses. Use when the user types /decide, asks "should we…?", "help us decide…", "which option…", or names an item from 24-synthesis/open-decisions (scope, study task, watch API, students vs athletes, escalation, LLM provider…).
---

# /decide: a decision brief, then an ADR

You write the brief; **the team decides** (Heramb, Raghavan, Alexa). A brief that shapes the shared design is never final until a person says which option, in chat or in a meeting note. Vault: `Wiki/Cognitive Perf Agent Wiki/` (called `W/` below).

## 1. Frame
- One line: the question, the decision it feeds, and the **deadline** it must beat (Nov 6 proposal · Nov 11 draft · Dec 4 integration · Dec 11 demo).
- Find it in `W/24-synthesis/open-decisions.md` and quote its number (#1–#19…). If it isn't there, it's new: say so.
- Read what it touches: the pages that item links to, `W/30-course/project-requirements.md`, any ADR in `W/20-decisions/`, and both design decks if they disagree (`W/31-decks/`). If the question is ambiguous, ask **one** clarifying question first.

## 2. The brief: front page first
```
D-<open-decisions #> — <one-line question>
ELI10: <2–4 plain sentences a classmate outside the course follows, stakes included>
Stakes if we pick wrong: <what breaks, what the student sees, which deadline slips, which grade criterion suffers>
Door: one-way | two-way — <why; e.g. "watch API is one-way after Nov 13: the emitter is built around it">
Scope mode (if it's a build): Expand · Selective · Hold · Reduce — recommend one; the team picks
Recommendation: <option> because <one line>
Completeness: A=10/10 · B=7/10 · C=3/10   (all edges / happy path / shortcut; or "options differ in kind, not coverage")
A) <option> (recommended)  ✅ ≥ 2 concrete pros  ❌ ≥ 1 honest con
B) …
C) Do nothing / defer
Net: <the real trade-off in one line>
```

## 3. The detail
- **Options (≥ 3):** include "do nothing / defer" and one unconventional option.
- **Course fit** for each option, against the grading bar: end-to-end on realistic data · source visible · honest uncertainty + escalation · non-technical UI · safety and privacy as constraints · *must not:* happy-path only, overclaiming, polished UI over hardcoded data.
- **Outside view:** base rates, analogues, what the course readings or labs say, what Whoop / Oura / Fitbit do (`W/24-synthesis/competitive-landscape.md`). Every fact sourced (wiki page, URL, deck slide) or tagged `[unverified]`.
- **Per option:** effort in **person-days** against the remaining weeks, the weakest assumption, and what it rules out later.
- **Team input:** where the two design decks (Raghavan's lean Electron design vs Alexa's production plan) disagree, show both positions fairly; dissent is preserved, not averaged.
- **Pre-mortem** of the leading option: "It's Dec 11 and this went wrong. Why?"
- **Recommendation:** a probability it achieves its goal by its deadline, plus **kill criteria** set now ("if the Fitbit OAuth helper isn't returning HR by Nov 20, switch to the synthetic path").
- **What would change my mind; the strongest counter-argument.**
- **5+ options or items are never dropped or merged:** split into D-<n>.1, .2 … each marked **Include / Defer / Cut / Hold**, plus D-<n>.final checking the set fits the time left.
- **Shortcut log:** if the team picks an option scored ≤ 7/10 on a lasting scope call, write `shortcut: <what was skipped> · ceiling <what it can't do> · upgrade when <trigger>` into the ADR's Consequences.

## 4. Present
In chat: the front page first, then the detail. End with one question: which option. Never pick it for them.

## 5. Record (only after a person decides)
1. **ADR:** copy `W/_meta/templates/decision-record.md` to `W/20-decisions/adr-NNN-<kebab-title>.md` (next free number; ADR-001 exists). Fill Context (link the open-decisions item), Options considered, Decision, Consequences, Revisit when (= the kill criteria). `status: accepted`, `decided_on`, `deciders:` the people who chose, `sources:`.
2. **Open Decisions:** strike the item through, add "**Decided <date>** → ADR-NNN", and add a row under **Decided**.
3. **Hub:** add the ADR to `W/20-decisions/20-decisions.md` and remove it from "Planned pages" if listed there.
4. Update every page whose content the decision changes (e.g. `W/05-data/data-sources.md`); mark text that is now outdated rather than silently deleting it.
5. One line in `W/log.md` (`DECISION adr=… decider=…`), and refresh `W/hot.md`.

If the team wants time, save the brief as `W/25-journal/YYYY-MM-DD-decision-<topic>.md` (status "awaiting team") and record nothing else.

## Rules
Only people decide. Facts need sources; estimates show their maths. A same-model AI arguing both sides is not a control: the controls are the team, the course bar, the ADRs and the kill criteria. Never send anyone's email or health data to an outside service.

*Method adapted from Startup City's /decide (itself from gstack, MIT, Garry Tan).*
