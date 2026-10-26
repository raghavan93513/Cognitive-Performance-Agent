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

**Status (2026-10-26):** Seeded from our design docs, course weeks 1–7 and WearLab.

## Pages

- [[21-concepts/blood-oxygen-spo2|Blood Oxygen (SpO₂)]] — How wearables estimate blood oxygen from red vs infrared PPG (ratio of ratios plus a calibration curve), why motion and fit break it, and why we don't use it.
- [[21-concepts/ecg-and-atrial-fibrillation|ECG and Atrial Fibrillation]] — What a watch ECG measures, how a 30 s single-lead recording becomes an AFib/sinus verdict (WearLab's Apple-style model), and why our agent must never claim ECG-level evidence.
- [[21-concepts/embeddings-and-vector-search|Embeddings and Vector Search]] — Turning text (or images, or signal windows) into vectors and ranking by nearness, as taught in BINF 4070 Week 6, with its pitfalls. Backbone of our Evidence agent's retrieval.
- [[21-concepts/fhir|FHIR and SMART on FHIR]] — HL7's resource-based exchange standard (R4) plus SMART's OAuth launch and scopes, as taught in week 2. For us it is a shape to borrow (status, two clocks, system+code), not a data source.
- [[21-concepts/health-data-stores|Health Data Stores]] — Relational vs document (incl. FHIR resources) vs time-series, image, graph and vector stores for health data, with the trade-offs BINF 4070 Week 5 teaches and why we default to PostgreSQL.
- [[21-concepts/heart-rate-variability|Heart Rate Variability (HRV)]] — Variation in time between heartbeats, usually reported by watches as overnight RMSSD in ms. The project uses it only as daily context, never as a live focus score.
- [[21-concepts/llm-generated-sql-and-semantic-operators|LLM-Generated SQL and Semantic Operators]] — How LLMs write schemas and SQL, and run inside SQL as semantic operators (Flock, ai_filter) or decision models (jev); the failure modes BINF 4070 Week 5 demonstrates and the mitigations.
- [[21-concepts/medical-coding-systems|Medical Coding Systems]] — The five code systems from week 2 (ICD-10-CM, SNOMED CT, RxNorm, LOINC, CPT), what each identifies, how codes are built, and why identity is system + code. Quiz-ready examples.
- [[21-concepts/photoplethysmography|Photoplethysmography (PPG)]] — How a watch turns reflected light into heart rate, HRV and sleep inputs (BINF 4070 Week 3, plus WearLab's simulated pipeline). It is peripheral pulse timing, not ECG, and fragile under motion.
- [[21-concepts/recovery-and-strain|Recovery and strain]] — Strain (0–21 from time in heart-rate zones) and recovery (1–99% from HRV, resting HR, breathing and sleep vs your own normal). WearLab's open stand-in and the personal-baseline lessons for our model.
- [[21-concepts/retrieval-augmented-generation|Retrieval-Augmented Generation (RAG)]] — Giving an LLM retrieved, source-backed records as context so its answer can cite them. Taught in BINF 4070 Week 6; in this project the Evidence agent does the retrieving.
- [[21-concepts/skin-temperature-trends|Skin temperature trends]] — Nightly skin temperature is one robust number per night compared with a learned personal baseline. WearLab's alert at +0.5 °C catches a cold but not a menstrual cycle, a template for our baselines.
- [[21-concepts/sleep-staging|Sleep staging]] — How a wrist device guesses wake/REM/light/deep from movement, heartbeats and breathing in 30-second pages, how accurate that is, and which sleep outputs we should trust.
- [[21-concepts/step-counting|Step counting]] — How a wrist or hip accelerometer becomes a step count (magnitude, gravity removal, smoothing, peaks, rhythm, vertical check), what fools it, and how we should use steps for walk breaks.
- [[21-concepts/time-series-feature-extraction|Time-Series Feature Extraction]] — Turning ordered sensor readings into features via windows, LAG, ASOF joins, event runs, baselines and z-normalization, as taught in BINF 4070 Week 7. Basis of our 5/15-min windows.
- [[21-concepts/wearable-measurement-error|Wearable Measurement Error]] — Why wearable steps, HR, HRV and sleep are estimates. Covers motion, device, fit, skin tone, missingness, source overlap and time handling, plus how the course says to evaluate a claim.

## Related

- [[index|Wiki index]] · [[30-course/30-course|Course hub]]
