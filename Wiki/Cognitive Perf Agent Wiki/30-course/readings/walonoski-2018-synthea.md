---
title: "Walonoski 2018 — Synthea Synthetic Patients"
category: 30-course
tags: [course, reading, fhir, data, privacy]
aliases: ["Synthea: An approach, method, and software mechanism for generating synthetic patients and the synthetic electronic health care record", "Synthea"]
sources: ["https://doi.org/10.1093/jamia/ocx079"]
summary: Synthea is open-source software that simulates patient lifetimes with state-machine disease modules and exports realistic FHIR/C-CDA records with no privacy risk. Safe prototype data.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 09
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Walonoski 2018 — Synthea Synthetic Patients

> [!cite] Jason Walonoski, Mark Kramer, Joseph Nichols, Andre Quina, Chris Moesel, Dylan Hall, Carlton Duffett, Kudakwashe Dube, Thomas Gallagher, Scott McLachlan. *Synthea: An approach, method, and software mechanism for generating synthetic patients and the synthetic electronic health care record.* JAMIA 25(3), 2018. https://doi.org/10.1093/jamia/ocx079
> Assigned in [[30-course/weeks/week-09-proposal-presentations|Week 9 — Project Proposal Presentations]] (listed as a tool reading).

## Core idea

- Real health records are hard to share because of legal, privacy, security and intellectual-property limits, and that slows innovation. Synthea aims to be a freely available source of **synthetic EHRs** for industry, research and education.
- It **simulates the lifespans of synthetic patients**, modelling the 10 most frequent reasons for primary-care visits and the 10 chronic conditions with the highest morbidity in the US.
- Disease progression and treatment are built from clinical care maps, clinical practice guidelines and public statistics. They are encoded in a **Generic Module Framework**: **state-transition machines** in an open, documented JSON format, with control states that start, delay and end progression.

## Key findings

- Synthea follows a previously published conceptual framework for realistic synthetic EHRs, scales through open-source deployment, and accepts **community-contributed disease modules**.
- **One million synthetic patient records** were freely available online at publication, in standard formats (**HL7 FHIR** and **C-CDA**), and accessible through an HL7 FHIR API.
- **Realism** comes from regionally prevalent aggregate data, clinician input and clinical guidelines. The authors argue the output is realistic enough to stand in for real EHRs in many secondary uses, especially at the **aggregate population level**, with no re-identification risk.
- The authors note that most synthetic-data work validates only superficially (structure, speed, volume), and that methods without full documentation cannot be validated.
- Caveat: synthetic patients follow the modules' rules, so they cannot show patterns the modules do not encode. ^[inferred]

## Why the course assigned it

- Week 9 is about pitching a proposal with **something concrete**: a prototype, an interface or a system sketch. Synthea lets teams demo end-to-end data flows **without touching real patient data**. ^[inferred]
- It ties back to FHIR (Week 2) and privacy (Week 13): synthetic data is a privacy-preserving way to build and test. ^[inferred]

## What this means for us

- **Synthea itself is not a fit.** It simulates clinical encounters over a lifetime, not minute-level watch signals, laptop behaviour or study-task accuracy. ^[inferred]
- **The idea is a fit: build our own synthetic generator.** A small simulator that produces fake students with modelled sleep, HRV, heart rate, activity and task-accuracy dynamics would let us: ^[inferred]
  - demo the full pipeline at the proposal ([[30-course/deliverables/part-2-proposal-presentation|Part 2 proposal]]) before any real participant data exists; ^[inferred]
  - unit-test the [[05-data/data-pipeline|data pipeline]] (gaps, duplicates, late syncs) and the [[04-agent-engine/multi-agent-decision|decision policy]] with known ground truth; ^[inferred]
  - check that the [[04-agent-engine/performance-model|performance model]] can recover a planted effect before we run the [[15-research/evaluation-plan|evaluation]]. ^[inferred]
- Following Synthea, the simulator's rules (state machines in JSON or Python) should be documented so the team can say exactly what the synthetic data can and cannot show. ^[inferred]
- Developing with synthetic data first reduces how much real student data we handle, which helps [[13-trust-safety/privacy-and-consent|privacy and consent]]. ^[inferred]

## Read status

- **Full text** read from JAMIA (OUP, open access) on 2026-10-26: the structured abstract, plus the sections on the Generic Module Framework, realism and validation. The remainder was skimmed.
