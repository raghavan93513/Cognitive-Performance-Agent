---
title: "MongoDB 2023 — Edenlab's Low-Code FHIR Server"
category: 30-course
tags: [course, reading, fhir, database, architecture]
aliases: ["How Edenlab built a high-load, low-code FHIR server to deliver healthcare for 40 million plus patients", "Kodjin"]
sources: ["https://www.mongodb.com/company/blog/innovation/edenlab-built-high-load-low-code-fhir-server-deliver-healthcare-forty-million-patients"]
summary: Vendor case study. Edenlab's Kodjin FHIR server stores nested FHIR resources in MongoDB, search in Elasticsearch and events in Kafka, serving Ukraine's national health system. Polyglot persistence.
provenance:
  extracted: 0.65
  inferred: 0.35
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 05
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# MongoDB 2023 — Edenlab's Low-Code FHIR Server

> [!cite] MongoDB (with Edenlab). *How Edenlab Built a High-Load, Low-Code FHIR Server to Deliver Healthcare for 40 Million Plus Patients.* MongoDB Blog, 31 May 2023 (updated 12 March 2025). https://www.mongodb.com/company/blog/innovation/edenlab-built-high-load-low-code-fhir-server-deliver-healthcare-forty-million-patients
> Assigned in [[30-course/weeks/week-05-relational-document-clinical-stores|Week 5 — Relational, Document and Clinical Data Stores]].

## Core idea

- Edenlab, the Ukrainian company behind **Kodjin**, first built a FHIR system to digitise Ukraine's national health system, serving a population of over 40 million. It turned that work into a FHIR server product.
- The architecture is horizontally scalable microservices in **Rust**, with **MongoDB** as the transactional store, **Elasticsearch** for search, **Kafka** for messaging and **Kubernetes** for orchestration.
- Why a document database: FHIR resources are **hierarchical and deeply nested**, which maps naturally to documents with a flexible schema.

## Key findings

- **Transactions matter for FHIR:** a FHIR transaction bundle must succeed or fail as a whole. MongoDB's multi-document transactions provide that atomicity.
- **Terminology service:** large terminology files (code systems) are stored in MongoDB **GridFS**.
- **Polyglot persistence:** search queries go to Elasticsearch to find resource IDs, and the resources are then fetched from MongoDB.
- **Load-test figures (Locust), as reported by the vendor:** about 1,722 requests/s for GET by ID, about 1,896 requests/s for search, and about 1,406 requests/s for POST (create).
- Kodjin is described as ONC-certified and HIPAA-compliant.
- *Caveat:* this is a **vendor marketing blog**. The benchmarks have no published setup details and no comparison with other stores. ^[inferred]

## Why the course assigned it

- Week 5 contrasts **relational, document and clinical stores**. MIMIC-IV ([[30-course/readings/johnson-2023-mimic-iv|Johnson 2023]]) shows the relational approach, and Edenlab shows the document approach for FHIR at national scale. ^[inferred]
- The lesson is to choose storage by data shape and access pattern: nested resources go in documents, full-text search in a search index, and analytics or joins in relational stores. ^[inferred]

## What this means for us

- **We do not need this stack.** Our data are mostly flat, timestamped observations plus a few relational entities such as sessions, recommendations, outcomes and consents. The PostgreSQL choice in [[07-backend/tech-stack|tech stack]] and [[06-database/database-and-api|database and API]] fits better, and Postgres JSONB can hold any nested payloads (such as raw watch API responses). ^[inferred]
- **Polyglot persistence is a later decision.** Adding a separate search engine or queue early is the over-engineering Raghavan's design warns against (see [[24-synthesis/design-comparison|design comparison]]). This case study shows when it becomes worth it: at very large scale. ^[inferred]
- **Atomicity is still relevant to us:** writing a recommendation and its evidence links should be one transaction, so the logs never contain orphaned recommendations. ^[inferred]

## Read status

- **Full text** of the blog post read on 2026-10-26 (mongodb.com).
