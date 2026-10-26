---
title: Raghavan's Architecture Deck
category: references
tags: [reference, architecture, design-doc]
aliases: [Cognitive_Performance_Architecture.pdf, architecture deck]
relationships:
  - target: "[[entities/raghavan-vaidhyaraman]]"
    type: related_to
  - target: "[[projects/cognitive-performance-agent/references/alexa-kafka-system-design]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, git log]
summary: Summary of the 11-slide system design deck (committed 2026-10-15) proposing one Electron app, one FastAPI backend and one PostgreSQL database for a lean pilot.
provenance:
  extracted: 0.95
  inferred: 0.05
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Raghavan's Architecture Deck

- **File:** `System Design/Cognitive_Performance_Architecture.pdf` (11 slides)
- **Committed:** 2026-10-15 by [[entities/raghavan-vaidhyaraman|raghavan93513]], commit message "Raghavan's Design"
- **Footer on every slide:** "Proposed design | Verified sources: October 15, 2026 | No measured improvement claimed"
- **Tagline:** "One desktop app + one Python backend + one PostgreSQL database."

## Slide by slide

1. **System design diagram (5 stages)** → [[projects/cognitive-performance-agent/concepts/system-architecture|System architecture]]
2. **Which data will we use?** → [[projects/cognitive-performance-agent/concepts/data-sources|Data sources]]
3. **Step-by-step flow** (6 steps of one study session) → [[projects/cognitive-performance-agent/concepts/system-architecture|System architecture]]
4. **1. Collect data** → [[projects/cognitive-performance-agent/concepts/data-sources|Data sources]]
5. **2. Prepare and store data** → [[projects/cognitive-performance-agent/concepts/data-pipeline|Data pipeline]]
6. **3. Analyze performance** → [[projects/cognitive-performance-agent/concepts/performance-model|Performance model]]
7. **4. Choose a recommendation** (multi-agent) → [[projects/cognitive-performance-agent/concepts/multi-agent-decision|Multi-agent decision]]
8. **5. Show advice and measure the result** → [[projects/cognitive-performance-agent/concepts/student-interface-and-feedback|Student interface and feedback]]
9. **Recommended stack** → [[projects/cognitive-performance-agent/concepts/tech-stack|Tech stack]]
10. **Development order** (6 steps) → [[projects/cognitive-performance-agent/concepts/roadmap|Roadmap]]
11. **Verified primary sources** (S1–S15) → below

## Key takeaways

- Watch = context, laptop = behaviour, study task = measured performance.
- Rules first, then scikit-learn. The LLM never computes the score.
- Three agents coordinated by LangGraph, with plain code holding the final say.
- Complete each proof before adding the next layer.
- Two separate tests: does watch data improve prediction, and do adaptive breaks improve outcomes?

## Cited sources (S1–S15)

Electron docs (why-electron, power-monitor) · react.dev · Uber Ludwig blog (FastAPI) · GitLab PostgreSQL docs · AWS SDK for pandas · scikit-learn testimonials · LangChain Vodafone case · Google Health developer docs (data types, sleep, vitals, get-started) · pandas time-series guide · FastAPI docs · Apple `NSWorkspace.frontmostApplication`.

The deck notes that Google now provides new-developer setup instructions, which replaces an earlier assumption that onboarding was closed.

## Related

- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design|Alexa Kafka's system design]], the other design doc
- [[projects/cognitive-performance-agent/synthesis/design-comparison|Design comparison]]
- [[projects/cognitive-performance-agent/cognitive-performance-agent|Project hub]]
