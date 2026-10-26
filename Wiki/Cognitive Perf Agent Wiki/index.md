---
title: Cognitive Performance Agent — Wiki Index
category: meta
tags: [meta, moc]
summary: The front door. What we are building, where the project stands, the next deadline, and a map of every folder.
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T20:00:00Z
---

# Cognitive Performance Agent

> A wellness agent for students and athletes. It reads watch and laptop signals and answers
> *"Should I keep going or take a break?"*. It suggests continue, a short walk, or a break, always with its reasons
> and sources, and says "not enough data" when it doesn't know.

**Status (2026-10-26):** design stage. Two system designs exist, no code yet. Being built as the
final project of Columbia's [[30-course/30-course|BINF 4070]].

> [!important] Next deadline
> **Fri Oct 30** design studio, then **Fri Nov 6** proposal presentation (15%). See the
> [[30-course/deliverables/part-2-proposal-presentation|proposal prep checklist]].

**New here?** Read [[_meta/how-to-use-this-vault|How to use this vault]], then
[[01-foundation/project-overview|Project overview]].

---

## The company

Numbered folders read in order. Each opens with a hub page named after the folder.

| | Domain | What it answers |
|---|---|---|
| 01 | Foundation | Why this exists, what we believe, what we refuse to build |
| 02 | Product | What we're building and how a user moves through it |
| 03 | Users | Who it's for, what they need, what they told us |
| 04 | Agent engine | **The core IP:** signals → model → agents → a trustworthy suggestion |
| 05 | Data | What we collect, how it arrives, how we know it's good |
| 06 | Database | How data is stored, related, retained and deleted |
| 07 | Backend | Services, APIs, workers, the LLM layer |
| 08 | Frontend | What the student sees and touches |
| 09 | Design | How it looks, feels and earns trust |
| 10 | Trust and safety | Privacy, consent, security, safety, fairness |
| 11 | Engineering | How we build, ship and run it |
| 12 | Research | What we believe, how we test it, what we found |
| 13 | Team | Who we are, who owns what, how we decide |

Hubs: [[01-foundation/01-foundation|01]] · [[02-product/02-product|02]] · [[03-users/03-users|03]] ·
[[04-agent-engine/04-agent-engine|04]] · [[05-data/05-data|05]] · [[06-database/06-database|06]] ·
[[07-backend/07-backend|07]] · [[08-frontend/08-frontend|08]] · [[09-design/09-design|09]] · [[10-trust-safety/10-trust-safety|10]] · [[11-engineering/11-engineering|11]] · [[12-research/12-research|12]] ·
[[13-team/13-team|13]]

## The knowledge layer

| | Folder | Holds |
|---|---|---|
| 20 | Decisions | Decision records: what we chose, why, when to revisit |
| 21 | Concepts | HRV, RAG, FHIR, PPG, embeddings, time-series features… |
| 22 | Entities | Team, course staff, tools, providers, competitors |
| 23 | References | External sources that aren't course readings |
| 24 | Synthesis | Design comparison, open decisions |
| 25 | Journal | Dated notes and meeting notes |

Hubs: [[20-decisions/20-decisions|20]] · [[21-concepts/21-concepts|21]] · [[22-entities/22-entities|22]] ·
[[23-references/23-references|23]] · [[24-synthesis/24-synthesis|24]] · [[25-journal/25-journal|25]]

## Context

| | Folder | Holds |
|---|---|---|
| 30 | Course | BINF 4070: schedule, grading, requirements, deliverables, every week, every reading |
| 31 | Decks | Every deck we've made, each with a summary and the original embedded |
| 32 | WearLab | Heramb's 3D wearables-explainer app: product, signal pipelines, brand histories, what we reuse |

Hubs: [[30-course/30-course|30 · Course]] · [[31-decks/31-decks|31 · Decks]] · [[32-wearlab/32-wearlab|32 · WearLab]] ·
[[30-course/readings/30-course-readings|Readings]] · [[30-course/project-requirements|Project requirements]]

## Most important pages right now

- [[01-foundation/project-overview|Project overview]]: what it is and how one session flows
- [[24-synthesis/design-comparison|Design comparison]]: the two designs, where they agree and conflict
- [[24-synthesis/open-decisions|Open decisions]]: what we must decide before building
- [[30-course/project-requirements|Project requirements]]: the course's bar and our gap check
- [[04-agent-engine/multi-agent-decision|Multi-agent decision]]: the core of the agent
- [[32-wearlab/what-we-reuse|What we reuse from WearLab]]: synthetic data, signal pipelines, brand data, design
- [[05-data/synthetic-data-generator|Synthetic data generator]]: the first accepted decision ([[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data|ADR-001]])

## System

[[_meta/how-to-use-this-vault|How to use]] · [[_meta/conventions|Conventions]] · [[_meta/taxonomy|Tag taxonomy]] ·
templates in `_meta/templates/` · [[hot|Hot cache]] · [[log|Log]] · [[Welcome|obsidian-wiki framework README]].
`_raw/` `_staging/` `_archives/` are framework working folders.
