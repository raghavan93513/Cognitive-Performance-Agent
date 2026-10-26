---
title: Roadmap
category: 02-product
tags: [planning, roadmap]
aliases: [build order, development order, implementation plan]
relationships:
  - target: "[[15-research/evaluation-plan]]"
    type: related_to
  - target: "[[24-synthesis/open-decisions]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Build order. Raghavan's 6 proof-gated steps and Alexa's illustrative 12-week plan. As of 2026-10-26 no step has started.
provenance:
  extracted: 0.85
  inferred: 0.15
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Roadmap

**Current status (2026-10-26):** design only. No step below has started. ^[inferred]

## Raghavan's development order

"Complete each proof before adding the next layer."

| # | Build | Work to do | Completion check |
|---|---|---|---|
| 1 | Define the task + prove access | Choose one repeatable study task; confirm watch fields and consent | One task result + one permitted watch record |
| 2 | Collect + save data | Electron capture, FastAPI upload, PostgreSQL storage | Pause, reconnect and duplicate upload work correctly |
| 3 | Clean + summarize | pandas features and a simple fixed/manual-break baseline | No future data; missing sources remain visible |
| 4 | Test the numeric model | Train on task labels; compare laptop-only vs added watch context | Later-session results, calibration and limitations recorded |
| 5 | Connect agents + interface | LangGraph roles, SQL evidence, action rules; show citations | One traceable suggestion and recorded user response |
| 6 | Evaluate + demonstrate | Randomize adaptive vs fixed-break sessions; test failure paths | Outcome estimates, uncertainty, burden and recorded fallback |

## Alexa's illustrative 12-week roadmap

| Phase | Focus | Exit criteria |
|---|---|---|
| Weeks 1–2 | Architecture foundation, canonical observation contract, consent model, outcome definition, infra skeleton | Reviewed schemas, threat model, first deployable API, measurable primary target |
| Weeks 3–5 | Mobile/web foundations, first health integration, source status/quality, desktop collector prototype | End-to-end opt-in ingestion with visible freshness and permission states |
| Weeks 6–8 | Feature pipeline, baseline model, personal baselines, policy engine, task/outcome capture | Versioned predictions, tested abstention/fallback, full event provenance |
| Weeks 9–10 | Evidence ingestion/retrieval, structured LLM layer, rationale display, feedback loop | Grounded recommendations constrained by policy; LLM-outage tests pass |
| Weeks 11–12 | Security/privacy hardening, CI/CD, observability, deletion/retention, pilot readiness | Staging gates pass; runbooks and rollback tested; protocol/consent review complete |
| Pilot and iterate | Randomized comparison, modality ablations, calibration and usability refinement | Evidence supports or rejects the hypothesis; changes versioned and reproducible |

Alexa notes that actual duration depends on team size, provider access, research approvals and the target desktop OS.

## Mapping between the two

Raghavan's steps 1–3 roughly cover Alexa's weeks 1–8 minus the mobile/web apps. Step 5 matches weeks 9–10, and step 6 is the pilot. ^[inferred]

## Sources

- [[31-decks/raghavan-architecture-deck]] — slide 10
- [[31-decks/alexa-kafka-system-design]] — §15
