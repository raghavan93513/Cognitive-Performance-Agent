---
title: "21 · Concepts"
category: 21-concepts
tags: [moc, concept]
summary: "Hub for concepts — ideas that belong to no single domain."
sources: []
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# 21 · Concepts

> **Answers:** Ideas that belong to no single domain.

**Status (2026-10-26):** Seeded from our design docs and course weeks 1–7.

## Pages

- [[21-concepts/embeddings-and-vector-search|Embeddings and vector search]] — Turning text (or images, or signal windows) into vectors and ranking by nearness, as taught in BINF 4070 Week 6, with its pitfalls. Backbone of our Evidence agent's retrieval.
- [[21-concepts/fhir|Fhir]] — HL7's resource-based exchange standard (R4) plus SMART's OAuth launch and scopes, as taught in week 2. For us it is a shape to borrow (status, two clocks, system+code), not a data source.
- [[21-concepts/health-data-stores|Health data stores]] — Relational vs document (incl. FHIR resources) vs time-series, image, graph and vector stores for health data, with the trade-offs BINF 4070 Week 5 teaches and why we default to PostgreSQL.
- [[21-concepts/heart-rate-variability|Heart rate variability]] — Variation in time between heartbeats, usually reported by watches as overnight RMSSD in ms. The project uses it only as daily context, never as a live focus score.
- [[21-concepts/llm-generated-sql-and-semantic-operators|Llm generated sql and semantic operators]] — How LLMs write schemas and SQL, and run inside SQL as semantic operators (Flock, ai_filter) or decision models (jev); the failure modes BINF 4070 Week 5 demonstrates and the mitigations.
- [[21-concepts/medical-coding-systems|Medical coding systems]] — The five code systems from week 2 (ICD-10-CM, SNOMED CT, RxNorm, LOINC, CPT), what each identifies, how codes are built, and why identity is system + code. Quiz-ready examples.
- [[21-concepts/photoplethysmography|Photoplethysmography]] — How a watch turns reflected light into heart rate, HRV and sleep inputs, as taught in BINF 4070 Week 3. It is peripheral pulse timing, not ECG, and it is fragile under motion.
- [[21-concepts/retrieval-augmented-generation|Retrieval augmented generation]] — Giving an LLM retrieved, source-backed records as context so its answer can cite them. Taught in BINF 4070 Week 6; in this project the Evidence agent does the retrieving.
- [[21-concepts/time-series-feature-extraction|Time series feature extraction]] — Turning ordered sensor readings into features via windows, LAG, ASOF joins, event runs, baselines and z-normalization, as taught in BINF 4070 Week 7. Basis of our 5/15-min windows.
- [[21-concepts/wearable-measurement-error|Wearable measurement error]] — Why wearable steps, HR, HRV and sleep are estimates. Covers motion, device, fit, skin tone, missingness, source overlap and time handling, plus how the course says to evaluate a claim.

## Related

- [[index|Wiki index]] · [[30-course/30-course|Course hub]]
