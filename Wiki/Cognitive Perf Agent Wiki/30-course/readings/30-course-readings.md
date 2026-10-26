---
title: "Course Readings — BINF 4070 (Fall 2026)"
category: 30-course
tags: [course, reading, moc]
aliases: [Course readings, Reading list, BINF 4070 readings]
sources: ["personal-health-agent.github.io/src/content/weeks/*.md"]
summary: Hub for all 26 assigned BINF 4070 readings, grouped by week, with one-line takeaways and the themes that matter for the Cognitive Performance Agent.
provenance:
  extracted: 0.5
  inferred: 0.5
  ambiguous: 0.0
base_confidence: 0.55
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Course Readings — BINF 4070 (Fall 2026)

Every reading assigned on the course site, grouped by week. Each page covers the core idea, key findings, why the course assigned it, what it means for our project, and an honest **read status** (full text, abstract only, or not accessed). Back to the [[30-course/30-course|course hub]].

> [!info] Scope
> - Week 9's "Project proposal & deliverable guidelines" is a course page, not a paper. It is covered by the [[30-course/30-course|course hub]] and [[30-course/project-requirements|project requirements]].
> - Week 12 (Thanksgiving) has no readings.
> - Optional readings are marked *(optional)*.

## Week 1 — [[30-course/weeks/week-01-personal-health-data-foundations|Personal Health Data Foundations]]

- [[30-course/readings/estrin-2014-small-data-n-of-me|Estrin 2014 — Small data, where N = me]]: our everyday digital traces are personal "n = me" health evidence, but only if services give them back to us.
- [[30-course/readings/topol-2019-deep-medicine-intro|Topol 2019 — Deep Medicine (intro)]]: AI's best use is giving clinicians time to restore the human connection in care. *(not accessed, CourseWorks only)*

## Week 2 — [[30-course/weeks/week-02-clinical-records-and-fhir|Clinical Records and FHIR]]

- [[30-course/readings/mandel-2016-smart-on-fhir|Mandel 2016 — SMART on FHIR]]: FHIR plus profiles plus OAuth2 lets one app run unchanged on many EHRs; syntax alone does not give shared meaning.
- [[30-course/readings/rajkomar-2018-deep-learning-ehr|Rajkomar 2018 — Deep learning with EHRs]]: whole raw records in a FHIR-based format let deep models beat clinical baselines at two hospitals without hand-built features.

## Week 3 — [[30-course/weeks/week-03-wearable-sensors-and-measurements|Wearable Sensors and Measurements]]

- [[30-course/readings/bent-2020-wearable-optical-hr-inaccuracy|Bent 2020 — Wearable optical HR inaccuracy]]: wrist heart rate error depends on device and activity (on average 30% higher during activity), not on skin tone.
- [[30-course/readings/sjoding-2020-racial-bias-pulse-oximetry|Sjoding 2020 — Racial bias in pulse oximetry]]: oximeters missed low oxygen more often in Black patients, so sensor bias can be systematic and harmful. *(text not accessed)*

## Week 4 — [[30-course/weeks/week-04-team-formation-and-project-scoping|Team Formation and Project Scoping]]

- [[30-course/readings/kelly-2019-clinical-impact-ai|Kelly 2019 — Key challenges for clinical impact]]: accuracy is not impact. Watch for dataset shift, confounders, bias, weak metrics and human barriers.
- [[30-course/readings/beede-2020-human-centered-eval-deployed-dl|Beede 2020 — Human-centered evaluation of deployed DL]]: in real clinics, lighting, connectivity and workflow decided whether an accurate model helped.

## Week 5 — [[30-course/weeks/week-05-relational-document-clinical-stores|Relational, Document and Clinical Stores]]

- [[30-course/readings/johnson-2023-mimic-iv|Johnson 2023 — MIMIC-IV]]: a de-identified, modular relational EHR database (hosp, icu, note) built with date shifting and credentialed access.
- [[30-course/readings/mongodb-2023-edenlab-fhir-server|MongoDB 2023 — Edenlab FHIR server]]: nested FHIR resources fit a document store, with search and messaging in separate systems (polyglot persistence at national scale).

## Week 6 — [[30-course/weeks/week-06-embeddings-vector-search-rag|Embeddings, Vector Search and RAG]]

- [[30-course/readings/lewis-2020-rag|Lewis 2020 — RAG]]: pairing a generator with a retriever over an index gives more factual, updatable, citable answers.
- [[30-course/readings/singhal-2023-llms-encode-clinical-knowledge|Singhal 2023 — LLMs encode clinical knowledge]]: exam scores hide long-form harms. Human multi-axis evaluation and deferring when uncertain both matter.
- [[30-course/readings/gao-2024-rag-survey|Gao 2024 — RAG survey]] *(optional)*: covers Naive, Advanced and Modular RAG, and how to tune and evaluate retrieval and generation separately.

## Week 7 — [[30-course/weeks/week-07-time-series-multimodal-features|Time-Series, Multimodal Data and Features]]

- [[30-course/readings/timescale-2024-glooko|Timescale 2024 — Glooko]]: dense continuous-glucose data runs best on time-partitioned Postgres with rollups, compression and retention.
- [[30-course/readings/freedman-2020-time-series-db-comparison|"Freedman 2020" — Time-series DB comparison]]: on a Raspberry Pi with small sensor workloads, plain PostgreSQL beat dedicated time-series databases. *(course citation looks wrong; see page)*

## Week 8 — [[30-course/weeks/week-08-hci-interface-trust-uncertainty|HCI: Interface, Trust and Uncertainty]]

- [[30-course/readings/amershi-2019-human-ai-guidelines|Amershi 2019 — Guidelines for Human-AI Interaction]]: 18 guidelines for AI products, covering timing, dismissal, scoping when in doubt, explaining why, and adapting cautiously.
- [[30-course/readings/bucinca-2021-cognitive-forcing|Buçinca 2021 — Cognitive forcing functions]]: explanations alone don't stop overreliance. Forcing reflection does, but users dislike it.

## Week 9 — [[30-course/weeks/week-09-proposal-presentations|Proposal Presentations]]

- [[30-course/readings/walonoski-2018-synthea|Walonoski 2018 — Synthea]]: simulated patients from state-machine disease modules give realistic, risk-free FHIR data for prototyping.

## Week 10 — [[30-course/weeks/week-10-agents-tool-use-function-calling|Agents I: Tool Use and Function Calling]]

- [[30-course/readings/schick-2023-toolformer|Schick 2023 — Toolformer]]: an LM can teach itself when to call tools, keeping only calls that improve its predictions.
- [[30-course/readings/openai-2024-function-calling|OpenAI 2024 — Function calling guide]]: the model proposes JSON-schema calls and the app executes them. Use few tools, strict schemas and enums, and supply known arguments in code.

## Week 11 — [[30-course/weeks/week-11-agents-planning-memory|Agents II: Planning and Memory]]

- [[30-course/readings/yao-2023-react|Yao 2023 — ReAct]]: interleaving Thought, Action and Observation cuts hallucination and makes agent behaviour readable and debuggable.
- [[30-course/readings/wang-2024-llm-agents-survey|Wang 2024 — LLM agents survey]]: agents are built from profile, memory (short and long term), planning and action modules.

## Week 13 — [[30-course/weeks/week-13-privacy-safety-ethics-integration|Privacy, Safety, Ethics and Integration]]

- [[30-course/readings/obermeyer-2019-racial-bias-population-health|Obermeyer 2019 — Racial bias in a population-health algorithm]]: predicting cost as a proxy for need built racial bias into care decisions. Label choice is an ethical decision.
- [[30-course/readings/greshake-2023-indirect-prompt-injection|Greshake 2023 — Indirect prompt injection]]: anything an LLM retrieves can carry instructions that hijack it.
- [[30-course/readings/owasp-2025-llm-top-10|OWASP 2025 — LLM Top 10]]: the standard checklist of LLM app risks, especially prompt injection, excessive agency, improper output handling and misinformation.

## Week 14 — [[30-course/weeks/week-14-final-showcase|Final Showcase]]

- [[30-course/readings/topol-2019-high-performance-medicine|Topol 2019 — High-performance medicine]] *(optional)*: AI helps clinicians, health systems and patients, but bias, privacy, security and transparency limit it.

## Themes across the readings

1. **Sensor and model outputs are estimates, so design for uncertainty and abstaining.**
   - Bent and Sjoding show measurement error that depends on device, activity and population.
   - Singhal shows that deferring when uncertain makes an LLM more accurate on the questions it does answer.
   - Amershi's G2 and G10 ask systems to say how well they work and to scale back when unsure.
   - For us: this supports the [[04-agent-engine/performance-model|performance model]]'s estimate-plus-uncertainty-or-abstain design, and using [[21-concepts/heart-rate-variability|HRV]] only as daily context. ^[inferred]
2. **Accuracy is not impact.**
   - Rajkomar reports strong AUROCs, but Kelly (the "AI chasm") and Beede (field reality) show what lies between a good model and a useful one.
   - For us: the [[15-research/evaluation-plan|evaluation plan]]'s randomised adaptive-vs-fixed comparison and abstain-rate tracking are the right response. ^[inferred]
3. **Bias enters through sensors, labels and proxies, not just through the data mix.**
   - Sjoding (sensor), Obermeyer (label), Kelly (confounders) and Buçinca (benefit depends on the user).
   - For us: audit outcomes by subgroup at equal scores, and treat the choice of target metric on [[24-synthesis/open-decisions|open decisions]] as an ethical decision. ^[inferred]
4. **Standards and schemas create shared meaning.**
   - Mandel (FHIR profiles), Rajkomar (whole records in one format), MIMIC-IV (modules, stable IDs, date shifting) and Synthea (standard exports).
   - For us: the canonical observation schema in the [[05-data/data-pipeline|data pipeline]] is our "profile". ^[inferred]
5. **Choose storage by data shape and scale, not by hype.**
   - Documents suit nested FHIR (Edenlab), time partitioning suits billions of readings (Glooko), and plain Postgres wins at small scale (the Week 7 benchmark).
   - For us: this supports the PostgreSQL-first choice in [[07-backend/tech-stack|tech stack]], with Timescale and pgvector as later upgrades. ^[inferred]
6. **Ground LLMs in retrieved evidence, but treat retrieved text as untrusted.**
   - Lewis and Gao (RAG gives provenance), Greshake (retrieval is an injection channel) and OWASP (LLM01 and LLM08).
   - For us: the Evidence agent in [[04-agent-engine/multi-agent-decision|multi-agent decision]] must cite sources and never follow them as instructions. ^[inferred]
7. **The model proposes, deterministic code decides.**
   - Toolformer and ReAct give LLMs tools and loops. The OpenAI guide puts execution in the app, and OWASP LLM06 warns against excessive agency.
   - For us: allowlisted, typed actions with a policy veto, narrow read-only tools, and bounded, logged ReAct traces. ^[inferred]
8. **Earn trust through timing, explanation and control, not compliance.**
   - Amershi (timing, dismissal, global controls), Buçinca (avoid blind reliance) and Topol (restore the human connection).
   - For us: suggestions at task boundaries, easy snooze and decline, and an optional "how focused do you feel?" check before showing a suggestion. See [[08-frontend/student-interface-and-feedback|student interface and feedback]]. ^[inferred]

## Reading-status summary

- **Full text read (or substantially skimmed):** 20 readings. These are Estrin, Mandel, Rajkomar, Bent, Kelly, MIMIC-IV, MongoDB/Edenlab, Lewis, Singhal, Gao, Timescale/Glooko, the Week 7 benchmark (Grzesik and Mrozek), Amershi, Buçinca, Synthea, Toolformer, the OpenAI guide, ReAct, Wang and Greshake. For OWASP, we read the index page plus three of the ten risk pages.
- **Abstract only:** Beede 2020, Obermeyer 2019, Topol 2019 (Nature Medicine).
- **Not accessed:** Topol, *Deep Medicine* (CourseWorks-restricted) and Sjoding 2020 (NEJM letter, no abstract, PMC copy behind a browser check).
- **Citation issue:** the Week 7 "Freedman et al., *Sensors* 2020" DOI does not resolve. The matching paper is Grzesik and Mrozek, ICCS 2020. ^[ambiguous]
