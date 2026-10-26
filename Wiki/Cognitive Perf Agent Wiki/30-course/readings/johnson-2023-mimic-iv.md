---
title: "Johnson 2023 — MIMIC-IV"
category: 30-course
tags: [course, reading, clinical-data, database, privacy]
aliases: ["MIMIC-IV, a freely accessible electronic health record dataset", "MIMIC-IV"]
sources: ["https://doi.org/10.1038/s41597-022-01899-x"]
summary: MIMIC-IV is a de-identified, credentialed-access EHR database from Beth Israel Deaconess (2008–2019) with hosp, icu and note modules. Assigned as the reference clinical relational store.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 05
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Johnson 2023 — MIMIC-IV

> [!cite] Alistair E. W. Johnson, Lucas Bulgarelli, et al. *MIMIC-IV, a freely accessible electronic health record dataset.* Scientific Data, 2023. https://doi.org/10.1038/s41597-022-01899-x
> Assigned in [[30-course/weeks/week-05-relational-document-clinical-stores|Week 5 — Relational, Document and Clinical Data Stores]].

## Core idea

- Hospitals collect huge amounts of data during routine care, but archival systems are built for storage, not research. MIMIC-IV turns the EHR of **Beth Israel Deaconess Medical Center (BIDMC)** into a public research database.
- It covers patients admitted to the **emergency department or an ICU between 2008 and 2019**, and includes measurements, orders, diagnoses, procedures, treatments and de-identified free-text notes.
- The build is a three-step pipeline: **acquisition** (hospital data warehouse, ICU information system, external sources), **transformation** (SQL scripts merge sources into one schema) and **de-identification** (removing protected health information).

## Key findings

- **Modular relational design:** data are grouped into modules that work like database schemas:
  - **hosp:** admission/discharge/transfer records, labs, microbiology, medication orders and billing-derived data.
  - **icu:** bedside documentation (infusions, outputs, charted observations, procedures).
  - **note:** discharge summaries and radiology reports. Each note type has an entity–attribute–value table that links free text to structured data.
- Modules join on identifiers: `subject_id` (patient), `hadm_id` (hospitalisation) and de-identified dates and times. Lookup tables randomly assigned these identifiers.
- **Date shifting for privacy:** each patient has an `anchor_year` (a shifted year such as 2150), an `anchor_age` and an `anchor_year_group` (the approximate real period). Intervals within a patient's record are preserved, but true dates are hidden.
- Codes appear in both ICD-9 and ICD-10, because coding changed over the decade.
- Out-of-hospital mortality was linked from the Massachusetts state vital-records registry rather than the Social Security Death Master File, because of quality concerns about the latter.
- **Access:** researchers must complete human-research training and sign a data use agreement. The data are free but credentialed, not fully open.
- Patients under 18 at first visit, and those on an enhanced-protection list, were excluded.

## Why the course assigned it

- Week 5's objective is to **build databases that hold clinical records and notes** and to pull structured facts out of messy medical text. MIMIC-IV is the canonical relational clinical dataset, and the Week 1 slides already describe "MIMIC-IV loaded into PostgreSQL" as the relational-DB example (slides-01 p. 53; slides-05 pp. 4, 72).
- Its note module and EAV tables show directly how to pair free text with structured rows, which is the extraction problem of the week. ^[inferred]

## What this means for us

- **Copy the design patterns, not the data.** MIMIC-IV is ICU data and has nothing to do with student performance. But its stable IDs, modules by provenance and time-shifted identifiers are a good template for [[06-database/database-and-api|database and API]]. ^[inferred]
  - Use a pseudonymous `participant_id` separate from login identity, and keep session and observation IDs that join cleanly. ^[inferred]
  - Group tables by provenance (watch, laptop, task, agent) the way MIMIC groups hosp, icu and note. ^[inferred]
- **De-identify for analysis exports:** for research datasets from our pilot, consider MIMIC-style date shifting per participant so time intervals are kept but calendar dates are hidden. This adds to [[13-trust-safety/privacy-and-consent|privacy and consent]]. ^[inferred]
- **Document the transformation:** MIMIC publishes its SQL build scripts. Our [[05-data/data-pipeline|data pipeline]] transforms should be versioned and reproducible the same way. ^[inferred]
- PostgreSQL as the relational core matches our [[07-backend/tech-stack|tech stack]]. ^[inferred]

## Read status

- **Full text** read from Scientific Data (open access) on 2026-10-26: abstract, Background, Methods (acquisition, de-identification, date shifting, mortality linkage) and the module descriptions.
