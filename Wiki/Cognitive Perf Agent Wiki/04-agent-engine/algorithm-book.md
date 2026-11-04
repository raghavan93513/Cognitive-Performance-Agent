---
title: Algorithm Book
category: 04-agent-engine
tags: [ml, agents, planning]
sources: [".claude/skills/algo/SKILL.md"]
summary: "Index of Algorithm Cards written with /algo (break policy, baselines, quality gates, abstain and escalate rules), each with status and owner."
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: supporting
created: 2026-11-04T22:40:00Z
updated: 2026-11-04T22:40:00Z
---

# Algorithm Book

Every algorithm that decides something a student sees gets an **Algorithm Card**, written with `/algo`. A card states the decision, the inputs and their quality gates, v0 rules that work with zero labels, when to abstain and when to escalate, the upgrade path, an offline simulation on synthetic data, harms and a kill switch. Cards start as `proposed`. Anything that changes what students see goes to the team through `/decide` before it's adopted. ^[inferred]

## Cards

| Card | Decides | Status | Owner |
|---|---|---|---|
| *none yet* | | | |

## Candidates

These were suggested by the current design and haven't been written yet: ^[inferred]

- **Break-suggestion policy:** continue / short walk / break from laptop activity, task accuracy and session length. See [[04-agent-engine/performance-model|Performance model]].
- **Data check and abstention:** when to say "Not enough data".
- **Personal baselines:** a 28-night look-back with a 14-night learning period (open decision #19).
- **HR quality gate:** HR counts as missing when steps > 0, cadence lock, or beat-interval CV ≥ 0.20.
- **Escalation triggers:** when to point to a person instead of a suggestion (open decision #12).
- **Snooze and nag limits:** how often a declined suggestion may come back.

## Related

- [[04-agent-engine/04-agent-engine|Agent engine hub]] · [[04-agent-engine/multi-agent-decision|Multi-agent decision]] · [[05-data/synthetic-data-generator|Synthetic data generator]] · [[24-synthesis/open-decisions|Open decisions]]
