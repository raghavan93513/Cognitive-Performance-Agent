---
title: Project Requirements and Grading Criteria
category: 30-course
tags: [course, requirements, evaluation]
aliases: [course requirements, grading criteria, what the project must do]
relationships:
  - target: "[[01-foundation/project-overview]]"
    type: related_to
sources: ["https://personal-health-agent.github.io/", "https://personal-health-agent.github.io/project-details/"]
summary: What the course requires of our final project, how it is graded, and the "must not have" list — with a gap check against our current design.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Project Requirements and Grading Criteria

What the course says our project must be. This is the bar for [[01-foundation/project-overview|the Cognitive Performance Agent]] this term.

## The brief

A team of 3–4 builds a **working Personal Health Assistant** that:

1. **Pulls in data** from at least one wearable, self-report or behavioural source. A synthetic clinical record is optional.
2. **Stores and retrieves** it.
3. **Reasons over it** through an LLM, RAG or agent component.
4. **Shows the result** through a simple interface a non-technical person could actually use.
5. Has **safety, privacy and evaluation designed in** from the start, not bolted on at the end.

## Three deliverables

| Part | When | Weight |
|---|---|---|
| Part 1 — Project idea one-pager | Week 4 · Oct 2 (done) | — |
| Part 2 — Proposal presentation | Week 9 · Nov 6 | 15% |
| Part 3 — Final demo | Week 14 · Dec 11 | 15% implementation + 15% demo + 15% writeup |

Details: [[30-course/deliverables/part-1-project-idea-one-pager|Part 1]] · [[30-course/deliverables/part-2-proposal-presentation|Part 2]] · [[30-course/deliverables/part-3-final-showcase|Part 3]] · [[30-course/deliverables/final-writeup|Writeup]].

Between the parts, labs carry the project forward. Week 7 has a project-direction discussion, week 8's design studio produces the proposal artifacts, and week 13 is an integration checkpoint with a mock demo.

## Grading criteria (all three parts)

**Looking for:**
- A system that runs **end-to-end on real or realistic health data**.
- Answers **grounded in that data, with the source visible** to the user.
- **Honest uncertainty**: it knows when to say "I don't know" and when to escalate to a human.
- An interface a **non-technical person** could actually use.
- Safety and privacy treated as **design constraints, not disclaimers**.

**Would love to see:**
- A novel interaction, retrieval or agent design.
- Evaluation with real users (classmates count).
- Graceful degradation when a model, API or data source fails.

**Must not have:**
- A happy-path demo with no fallback.
- Overclaiming: diagnosis language or clinical authority the system doesn't have.
- Unsafe outputs where refusal or escalation was the right call.
- A polished interface over hardcoded data.
- A writeup that inflates results the demo can't back up.

## Gap check against our current design ^[inferred]

| Requirement | Our design today | Status |
|---|---|---|
| Wearable / behavioural data | Watch (HR, HRV, sleep, steps) + laptop activity + study-task results | Covered |
| Store and retrieve | PostgreSQL + SQL history retrieval | Covered on paper |
| LLM / RAG / agent | Signal, Evidence and Action agents with LangGraph | Covered on paper |
| Simple interface | Desktop suggestion card with accept / snooze / decline | Needs a storyboard and low-fi prototype by Oct 30 |
| Source visible to the user | Reason + cited records on every suggestion | Covered |
| Honest uncertainty, say "I don't know" | Abstain with "Not enough data" | Covered |
| **Escalate to a human** | Not designed yet | **Gap.** When should a wellness tool point someone to a person (e.g. persistent poor sleep or distress)? |
| Graceful degradation | LLM-outage template, laptop-only fallback | Covered |
| Evaluation with real users | Randomized adaptive vs fixed breaks | Covered. A classmate pilot fits the course. |
| No diagnosis language | Wellness framing | Covered |

Track the gaps in [[24-synthesis/open-decisions|Open decisions]].

## Sources

- Course website: home page "Final project" section and the project-details page (read 2026-10-26)
