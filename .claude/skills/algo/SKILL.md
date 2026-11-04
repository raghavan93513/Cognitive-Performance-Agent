---
name: algo
description: Design, review or explain one algorithm in the Cognitive Performance Agent and produce an Algorithm Card (the decision it makes, inputs and data quality gates, v0 rules that work with zero labels, abstain and escalate rules, upgrade path, offline simulation on synthetic data, online test, harms, kill switch, prior art), plus a seeded prototype and simulation when numbers would change the recommendation. Use when the user types /algo, or asks to design or improve the break-suggestion policy, the performance model, personal baselines, the HR quality gate, the data check / abstention rule, escalation triggers, snooze/nag limits, the Evidence agent's retrieval, or "how does Whoop / Oura / Garmin's readiness score work".
---

# /algo: one algorithm, designed properly

Vault: `Wiki/Cognitive Perf Agent Wiki/` (`W/` below). Read first: `W/04-agent-engine/performance-model.md`, `W/04-agent-engine/multi-agent-decision.md`, `W/05-data/synthetic-data-generator.md`, `W/04-agent-engine/algorithm-book.md` (existing cards).

## 1. Frame
One line each: the **decision** the algorithm makes, **for whom** (student / athlete), **where** it runs (laptop collector, backend, agent step) and **what the student sees** because of it. Explaining someone else's system? Frame it as "public facts vs our inference, and what we take".

## 2. Write the Algorithm Card (every heading filled; "none" is a valid line)
```
ALG-<nn> — <name>  · status: proposed · owner: <person> · <date>
Decision:      what it outputs (continue / short walk / break / abstain / escalate…), how often
Inputs:        each signal, its source, cadence and known error (cite W/21-concepts/wearable-measurement-error etc.)
Quality gates: when an input counts as missing (e.g. HR when steps > 0, beat-interval CV ≥ 0.20, |HR − cadence| < 5);
               gaps are unknown, never 0; bucket by the student's local day
v0 rules:      transparent rules that work with ZERO labels and ZERO history (cold start), in natural units
Baselines:     personal vs population; look-back and learning period (default proposal: 28 nights / 14-night learning)
Abstain when:  not enough recent valid data, out of distribution, confidence below threshold → "Not enough data"
Escalate when: the conditions that point the student to a person instead of a suggestion (or "n/a: why")
Explain:       the reason + source records the card shows; the LLM explains, it never computes the number
Upgrade path:  v1 (regularized logistic regression once labels exist) → v2…, each with the data it needs first
Offline sim:   synthetic scenarios run (normal-week, exam-week, null world, laptop-only…), seeds, metric, result
Online test:   how the pilot measures it (adaptive vs fixed breaks; participant-level, time-aware splits)
Metrics:       discrimination AND calibration; acceptance alone is not evidence it helps
Harms:         nagging, false reassurance, anxiety from numbers, bias by device/skin tone (PPG), athletes vs students
Kill switch:   the signal that turns it off or reverts to v0, and who flips it
Prior art:     what Whoop / Oura / Garmin / Fitbit / papers do — sourced, or labelled inference
```

## 3. Prototype and simulate (only if the numbers would change the recommendation)
- Code goes in `research/algo/ALG-<nn>-<slug>/` (create it): one script, a fixed seed, no network, inputs from the synthetic-data generator (or a small hand-made fixture if the generator isn't built yet; say so).
- Report the **script's printed numbers**, not estimates. Same seed → same output; run it twice to check.
- Never use real participant data in this folder; it's a public repo.

## 4. Check
- The card is complete: no blank Harms, Abstain, Escalate or Kill switch.
- Every number came from a script run you saw, or is labelled an estimate with its maths.
- Claims about other companies are sourced or labelled `[unverified]` / `^[inferred]`.
- Nothing outside `research/algo/` and the wiki was changed.

## 5. Record
- Save the card as `W/04-agent-engine/alg-<nn>-<kebab-name>.md` (wiki frontmatter per `W/_meta/conventions.md`, `lifecycle: draft`) and add it to `W/04-agent-engine/algorithm-book.md` with status `proposed`.
- Anything that changes what students see, what data is collected, or the evaluation plan goes to the team as a `/decide` item, never straight into the design.
- One line in `W/log.md`.

*Method adapted from Startup City's /algo.*
