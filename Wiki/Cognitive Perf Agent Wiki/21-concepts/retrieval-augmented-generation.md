---
title: Retrieval-Augmented Generation (RAG)
category: 21-concepts
tags: [concept, retrieval, llm, agents]
aliases: [RAG]
relationships:
  - target: "[[04-agent-engine/multi-agent-decision]]"
    type: related_to
  - target: "[[21-concepts/embeddings-and-vector-search]]"
    type: related_to
  - target: "[[30-course/weeks/week-06-embeddings-vector-search-rag]]"
    type: derived_from
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf, binf4070-2026/week-06/slides-06.pdf, personal-health-agent.github.io/public/weeks/06-exercise.ipynb]
summary: Giving an LLM retrieved, source-backed records as context so its answer can cite them. Taught in BINF 4070 Week 6; in this project the Evidence agent does the retrieving.
provenance:
  extracted: 0.72
  inferred: 0.22
  ambiguous: 0.06
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T20:00:00Z
---

# Retrieval-Augmented Generation (RAG)

Retrieve relevant records first, then hand them to the LLM as context so its output is grounded in, and can cite, real sources.

## In the Cognitive Performance Agent

The **Evidence agent** in [[04-agent-engine/multi-agent-decision|Multi-agent decision]] performs RAG:

- **Raghavan's deck:** retrieve the user's own past sessions, preferences and outcomes from PostgreSQL with **plain SQL**. Semantic vector search can wait.
- **Alexa's doc:** retrieve approved research/evidence snippets stored with **pgvector** embeddings. Start with exact search and add HNSW indexing only when latency or volume justify it. ^[ambiguous]

## Rules both designs imply

- Retrieved text is **untrusted input**, never instructions.
- Every claim must cite its provenance, and citations must never be fabricated. If retrieval fails, use a labelled generic message or abstain.
- A separate vector database is unnecessary at pilot scale. ^[inferred]

## What the course teaches (Week 6)

From [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 06 — Embeddings, Vector Search & RAG]]. Retrieval mechanics are in [[21-concepts/embeddings-and-vector-search|Embeddings and vector search]].

### Definition and pipeline

- RAG puts **retrieved passages into the LLM's prompt** and asks it to answer **only from them** (slides p. 25).
- Pipeline: embed the question → find the nearest chunks → build a prompt → the LLM answers with citations.
- The prompt template in both the slides and the lab says: **answer only from the notes given, cite their IDs, and if the notes do not answer the question, say so** (p. 25; lab `ANSWER_PROMPT`).
- The model "(hopefully)" answers from retrieved data instead of its weights. **RAG relies on good retrieval** (p. 25).

### Retrieval quality decides answer quality

- **Scope before ranking.** Filter by patient or date *before* ranking. An HNSW index applies its top-k **before** `WHERE` and can return too few rows (p. 21; lab 3.3–3.4, 5.3).
- **Embeddings blur negation, subject, certainty, time and numbers.** "Denies penicillin allergy" retrieves like an allergy (p. 14). The course's fix is to retrieve with vectors, then let a model decide. The lab asks whether any retrieved note **misled** the answer (lab 5.3).
- **Hybrid retrieval** (BM25 + vector via Reciprocal Rank Fusion) covers exact terms that vectors miss and paraphrases that keywords miss (p. 23).
- **Better queries:** **query expansion** (LLM-generated synonyms) and **HyDE** (embed an LLM-written hypothetical document) raise recall for short questions (lab 5.1–5.2).

### Chunking and context

- Use chunks of a few hundred tokens with 10–20% overlap, split at sentence or section boundaries.
- **Prepend the document type, date and section heading** to each chunk so a fact isn't stranded without context (p. 27; lab 4.1–4.3).
- **Remove repeated boilerplate** before embedding (lab 4.1).

### Evaluate before tuning

- Build **20–50 real questions** with labelled relevant passages **before** choosing the model, chunk size or k (p. 28).
- Score with **precision@k** and **recall@k**.
- Then check answers: is each claim supported by the passage it cites? (lab 5.3)

### Data hygiene

- Embeddings **leak their source text** under inversion attacks, so protect them like the source (p. 29).
- Deleting a document must delete its chunks and vectors.
- Edits require re-embedding, because a stale vector still matches old text.
- Record the embedding model with each vector, and embed queries with the same model (pp. 18, 20).

### Assigned readings

- [[30-course/readings/lewis-2020-rag|Lewis et al. 2020]], the original RAG paper.
- [[30-course/readings/singhal-2023-llms-encode-clinical-knowledge|Singhal et al. 2023]], on LLM clinical knowledge and its limits.
- [[30-course/readings/gao-2024-rag-survey|Gao et al. 2024]], a RAG survey (optional).

### Implications for the Evidence agent

- The course's prompt template matches our "cite provenance, abstain if unsupported" rule. Adopt it nearly verbatim, with evidence-chunk IDs as the citation keys. ^[inferred]
- Choose between Raghavan's plain SQL and Alexa's pgvector by **measuring P@k and R@k on a small labelled question set** rather than by preference. Hybrid (Postgres full-text + pgvector, RRF) is a cheap third option. See [[24-synthesis/open-decisions|Open decisions]]. ^[inferred]
- Add a post-retrieval check (LLM or rules) that rejects snippets whose negation, population or direction doesn't actually support the proposed action. Vector similarity alone can't do this. ^[inferred]
- Always apply the `user_id` filter before ranking, so one student's history can never reach another's prompt. ^[inferred]

## Sources

- [[31-decks/raghavan-architecture-deck]] — slide 7
- [[31-decks/alexa-kafka-system-design]] — §5, §8
- `binf4070-2026/week-06/slides-06.pdf` — pp. 14, 18–25, 27–29
- `personal-health-agent.github.io/public/weeks/06-exercise.ipynb` — sections 3–5
