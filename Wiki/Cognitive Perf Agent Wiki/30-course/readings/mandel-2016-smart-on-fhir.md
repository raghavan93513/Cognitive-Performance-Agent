---
title: "Mandel 2016 — SMART on FHIR"
category: 30-course
tags: [course, reading, fhir, clinical-data]
aliases: ["SMART on FHIR: a standards-based, interoperable apps platform for electronic health records"]
sources: ["https://doi.org/10.1093/jamia/ocv189"]
summary: SMART on FHIR combines FHIR resources and profiles with OAuth2/OpenID Connect so one health app can run unchanged on many EHRs. Assigned to show how standards make clinical records readable by apps.
provenance:
  extracted: 0.65
  inferred: 0.35
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 02
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Mandel 2016 — SMART on FHIR

> [!cite] Joshua C. Mandel, David A. Kreda, Kenneth D. Mandl, Isaac S. Kohane, Rachel B. Ramoni. *SMART on FHIR: a standards-based, interoperable apps platform for electronic health records.* JAMIA, 2016. https://doi.org/10.1093/jamia/ocv189
> Assigned in [[30-course/weeks/week-02-clinical-records-and-fhir|Week 2 — Clinical Records and FHIR]].

## Core idea

- **SMART** (Substitutable Medical Applications and Reusable Technologies) started in 2010 at Harvard Medical School and Boston Children's Hospital, with ONC funding. The goal was medical apps that are **written once and run unmodified** on any health IT system, the way phone apps run on any phone.
- The first version, "SMART Classic", defined its own small open clinical data models, because no 2010-era standard offered a practical answer.
- In late 2013 the team moved onto HL7's new **FHIR** (Fast Healthcare Interoperability Resources) draft standard, which gave them both data models and a REST API. The result was **SMART on FHIR**.
- The platform pairs FHIR resources with web standards: **OAuth2** for authorisation, **OpenID Connect** for authentication, and HTML/JavaScript for the app UI, plus standard terminologies for coded data.

## Key findings

- **FHIR alone is not enough for interoperability.** Base FHIR fixes the *syntax*, but meaning depends on **FHIR profiles**, which constrain and extend resources by locking required elements, prescribing code systems and fixing representation conventions. For example, SMART defined one profile for quantitative lab results instead of one profile per analyte.
- A demonstration at HIMSS in February 2014, with several commercial EHR vendors and app developers, showed SMART on FHIR was feasible. It also showed that the community needed agreed pragmatic constraints on base FHIR.
- The paper describes the difficulty of moving from early prototypes to industry-wide production use. ^[inferred]
- SMART's lasting contribution is the app **launch and authorisation** pattern: an app gets a scoped token for one patient's data in one EHR. ^[inferred]

## Why the course assigned it

- Week 2's objective is to learn how clinical records are structured and how **FHIR and medical codes let a computer read a patient's record**. Mandel is the origin story and design rationale for the standard apps use today. ^[inferred]
- The Week 2 slides show the paper's main lesson in practice: two lab reports can both pass FHIR validation and still disagree on meaning because of units and conventions. A data model fixes the syntax, while meaning depends on codes, units and conventions. ^[inferred]

## What this means for us

- We are not building an EHR app, so SMART on FHIR is **out of scope** for the pilot. Its lessons still apply to our data: ^[inferred]
  - **Profiles = our canonical observation schema.** The [[05-data/data-pipeline|data pipeline]] canonical schema (fixed units, timestamps, source and quality flags) does the same job FHIR profiles do. Without it, watch and laptop records from different devices are syntactically valid but not comparable. ^[inferred]
  - **Scoped, consented access** (OAuth2-style) is the right model for any wearable API we connect to, and it fits the user-only access rule in [[13-trust-safety/privacy-and-consent|privacy and consent]]. ^[inferred]
- If the team ever wants to send summaries to a clinician, expressing observations as FHIR `Observation` resources with LOINC codes would be the interoperable route. That belongs on [[24-synthesis/open-decisions|open decisions]], not the pilot. ^[inferred]

## Read status

- **Full text** fetched from Europe PMC (PMC4997036) on 2026-10-26. Read the abstract and the sections on SMART history, FHIR profiles and the technology components (Box 2). Vendor-experience sections were skimmed only.
