---
title: Health Data Stores
category: 21-concepts
tags: [concept, database, data]
aliases: [relational vs document, data models for health data, schema-on-write vs schema-on-read, FHIR store]
relationships:
  - target: "[[30-course/weeks/week-05-relational-document-clinical-stores]]"
    type: derived_from
  - target: "[[06-database/database-and-api]]"
    type: related_to
  - target: "[[05-data/data-pipeline]]"
    type: related_to
  - target: "[[21-concepts/llm-generated-sql-and-semantic-operators]]"
    type: related_to
sources: ["binf4070-2026/week-05/slides-05.pdf", "personal-health-agent.github.io/public/weeks/05-exercise.ipynb"]
summary: Relational vs document (incl. FHIR resources) vs time-series, image, graph and vector stores for health data, with the trade-offs BINF 4070 Week 5 teaches and why we default to PostgreSQL.
provenance:
  extracted: 0.7
  inferred: 0.25
  ambiguous: 0.05
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Health Data Stores

One person's health question touches several **data models**, each with its own store, query language and failure modes. This page condenses how [[30-course/weeks/week-05-relational-document-clinical-stores|Week 5]] compares them.

## Core definitions

- **Data model**: concepts for describing data (structures, relationships, constraints) plus the operations that query and update it. A DBMS implements it (slides p. 12).
- **File format**: how the bytes are laid out. One model can have many formats: a relational table can be CSV, Parquet or a SQLite file, and a FHIR resource can be JSON, XML or RDF Turtle. The format doesn't define entities, keys or constraints (p. 17).
- **Syntax vs semantics.** A data model (including FHIR) enforces structure and types, but not meaning. A mis-mapped HbA1c of "58 %" passes FHIR validation (pp. 13–14). Codes, units and conventions carry the meaning.

## The model zoo (as taught)

| Data model | One unit is | Health example | Where taught |
|---|---|---|---|
| Relational | a row in a table with fixed columns | EHR labs, OMOP tables | Week 5 |
| Document | a self-contained nested JSON object | FHIR resources, portal records | Week 5 |
| Time series | one value per timestamp | watch heart rate, Fitbit person-minutes | Week 7 |
| Image | pixel array + metadata | DICOM retinal photo, chest X-ray | Week 7 |
| Knowledge graph | concepts linked by typed edges | SNOMED CT is-a hierarchy | later |
| Text + vectors | free text plus an embedding | visit notes searched by meaning | Week 6 |
| Variant files | not rows at all | genomes in VCF/BGEN/PLINK/Hail | (All of Us, p. 5) |

Real programmes mix them. MIMIC-IV has hospital/ICU tables, notes, ECG waveforms and CXR images, each with different queries, sizes and update patterns (p. 4). All of Us maps EHR and surveys to OMOP tables, Fitbit to custom per-minute tables, notes to `note`/`note_nlp`, and genomes to files (p. 5).

## Relational stores (e.g. PostgreSQL, DuckDB, SQLite)

**What you get over plain files** (pp. 18–26, 36–37):
- **Atomicity**: a crashed import leaves zero rows, not a partial count.
- **Isolation**: concurrent device writes behave serially, preventing the lost update (5,000 + 800 + 1,200 stored as 6,200).
- **Consistency**: PK, UNIQUE, FK, NOT NULL and CHECK reject bad rows at insert.
- **Durability**: committed data survives a crash.
- **Access control**: `GRANT SELECT` on a *view* (e.g. daily step totals) instead of sharing whole files.
- **Data independence**: indexes (physical) and views (logical) change underneath without breaking app queries (pp. 28–29).
- **Declarative SQL + optimizer**: one query, many possible plans (pp. 30–32).

**What it costs / where it bites:**
- **The schema must be known up front.** A new nested field (e.g. `device` on a BP reading) means a new table and column (p. 65).
- **Grain and fan-out.** Joining two one-to-many tables multiplies rows, so COUNT, SUM and AVG silently go wrong (p. 42; the exercise's metformin average is 7.86 instead of 7.96).
- **Constraints only catch what you declare.** `CHECK (value >= 0)` still accepts an HbA1c of 82 (p. 35).
- **Dialects differ**, especially on advanced features (p. 38).

## Document stores (e.g. MongoDB) and FHIR resources

**Model** (pp. 64–69). A document is a self-contained JSON object with an id, and a collection holds documents that need not share a structure. Nested parts are embedded (BP `component`s) and other entities are referenced (`subject: Patient/P001`).

**Why choose it** (p. 65):
- Different providers send different fields.
- Requirements change.
- Early on, the right structure is unclear.
- It also keeps portal/FHIR records **whole, as received** (p. 15).

**Schema-on-write vs schema-on-read** (p. 66):

| | Schema-on-write (relational, validated collections) | Schema-on-read (raw documents) |
|---|---|---|
| New field arrives | Add table/column first | Store it now |
| Value arrives as text "138" | Rejected at insert | Every reader must handle it |
| Who absorbs variation | The writer, once | Every reader, every time |

**Querying pitfalls**:
- Mongo filters are documents shaped like the data, and dot notation matches if *any* array element matches.
- Without `$elemMatch`, two conditions can be met by **different** elements, e.g. "diastolic > 90" wrongly matching on the systolic value (p. 68).

**Validation** (p. 69). `$jsonSchema` validators map to column types, NOT NULL and CHECK. There is **no foreign key equivalent: references are not checked**.

**FHIR at the analytics layer** (p. 70). FHIR Bulk Data exports NDJSON (one resource per line). DuckDB's `read_json` infers nested STRUCT/list columns queryable with dot notation. Inference happens at read time and may get types wrong (timestamps as VARCHAR, needing a cast).

**Dedicated FHIR servers.** The assigned reading (MongoDB/Edenlab, a low-code FHIR server for 40M patients on MongoDB) is the course's example of a document store behind a FHIR API at national scale. The slides themselves don't compare FHIR servers to other stores, so treat any FHIR-server trade-offs beyond the points above as coming from that reading and [[30-course/weeks/week-02-clinical-records-and-fhir|Week 2]]. ^[ambiguous] See [[30-course/readings/mongodb-2023-edenlab-fhir-server|the Edenlab reading]].

## Choosing (course's position, condensed)

- **Use relational** when entities, keys and constraints are known and correctness of joins, counts and transactions matters, e.g. results, medications, sessions (p. 15).
- **Use documents** when the shape varies by source or is still evolving, or when records should be kept whole as received. "The rules still have to be declared somewhere" (summary, p. 83).
- **Typical combination**:
  1. Ingest raw documents unchanged with source and time.
  2. Extract, normalize and integrate them.
  3. Load only checked rows into a **trusted relational table**, in one transaction, with a review queue for rejects (pp. 74–80).
- **Track provenance across stores**: source, extraction span, rule and model versions, match rule, load check (p. 82).

## What this means for us

- **PostgreSQL is a good fit for our core entities.** Users, consents, sessions, recommendations, policy decisions and outcomes are known, keyed, joined and need transactions and per-user access. That is the relational case, and it matches [[06-database/database-and-api|Database and API]]. ^[inferred]
- **Use a document-style column for raw provider payloads.** Health Connect, HealthKit and wearable APIs return varied, evolving JSON, which is the schema-on-read case. Store the raw payload (e.g. a JSONB column or a raw-ingest table) beside the canonical `observations` row, so normalization can be rerun. Don't make the raw JSON the thing analytics reads. ^[inferred]
- **Probably no FHIR server.** We don't exchange clinical records. FHIR matters only if we import clinical data, and then Bulk-Data NDJSON plus DuckDB-style flattening is the lightweight path the course shows. ^[inferred]
- **Watch out for minute-level signals.** Week 5 classes these as a separate time-series model, so keep an eye on volume and query patterns in plain PostgreSQL. Revisit with [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]]. ^[inferred]
- **Embeddings for evidence chunks** belong to the text + vectors model ([[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6]], [[21-concepts/retrieval-augmented-generation|RAG]]). pgvector could keep them in the same PostgreSQL. ^[inferred]

## Sources

- `binf4070-2026/week-05/slides-05.pdf`: pp. 4–17, 18–42, 63–70, 72–83
- `personal-health-agent.github.io/public/weeks/05-exercise.ipynb`: synthetic schema and fan-out questions 2.4/4.1
