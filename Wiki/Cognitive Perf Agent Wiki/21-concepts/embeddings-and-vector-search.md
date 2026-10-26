---
title: Embeddings and Vector Search
category: 21-concepts
tags: [concept, retrieval, embeddings]
aliases: [vector search, semantic search, embeddings, ANN, HNSW, hybrid search, BM25]
relationships:
  - target: "[[21-concepts/retrieval-augmented-generation]]"
    type: related_to
  - target: "[[30-course/weeks/week-06-embeddings-vector-search-rag]]"
    type: derived_from
  - target: "[[04-agent-engine/multi-agent-decision]]"
    type: related_to
sources: ["binf4070-2026/week-06/slides-06.pdf", "personal-health-agent.github.io/public/weeks/06-exercise.ipynb", "binf4070-2026/week-07/slides-07.pdf"]
summary: Turning text (or images, or signal windows) into vectors and ranking by nearness, as taught in BINF 4070 Week 6, with its pitfalls. Backbone of our Evidence agent's retrieval.
provenance:
  extracted: 0.75
  inferred: 0.25
  ambiguous: 0.0
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Embeddings and Vector Search

**Vector search** represents each item and the query as vectors of numbers and returns the *k* items whose vectors are nearest the query's (Week 6 slides p. 8). An **embedding model** is a neural network trained so that items with similar meaning get nearby vectors (p. 12). As taught in [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6]], with extensions in [[30-course/weeks/week-07-time-series-multimodal-features|Week 7]].

## Three ways to search text

| | Keyword (BM25 / LIKE) | Semantic operator | Vector search |
|---|---|---|---|
| Matches via | shared words | a model reads each row with the question | nearby vectors |
| Model calls | none | one per row per query | once per row at load, once per query |
| Output | ranked by word overlap | true/false per row | ranked by similarity |
| Strength | exact, fast, explainable | can reason (negation etc.) | finds paraphrases and synonyms |

Vector search is best-effort *similarity*, not reasoning (p. 7).

## Sparse vs dense

- **Sparse / keyword vectors:** one dimension per vocabulary word, almost all zero. **BM25** scores by matched query words, weighting rare words up and long documents down. It misses synonyms ("PCN" vs "penicillin") unless the query is expanded from a synonym list or terminology (p. 11).
- **Dense / learned embeddings:** a fixed dimension count set by the model, with every entry nonzero. Examples: all-MiniLM-L6-v2 (384-d), OpenAI `text-embedding-3-small` (1,536-d), MedCPT (768-d, PubMed logs). Single dimensions mean nothing; only distances do (p. 12).
- Embedding space has approximate geometry: king − man + woman ≈ queen, and drug→target directions in biomedical embeddings work 30% top-1 (p. 13).

## Distance functions

- **Cosine similarity**, **Euclidean distance** and **inner product**. For **unit-length vectors** (OpenAI's are) all three give the **same ranking** (p. 10; lab 2.1, 2.4).
- In DuckDB: `array_cosine_similarity`, `array_cosine_distance`, `array_distance`, `array_inner_product`.
- In pgvector: `<=>` cosine distance, `<->` Euclidean, `<#>` negative inner product (p. 24).
- **The query must be embedded with the same model as the stored vectors.** Store `embed_model` with each vector (pp. 18, 20).

## Exact vs approximate (ANN) search

- **Exact:** distance to every row. 1M × 384-d ≈ 384M multiply-adds per query (p. 15).
- **ANN with HNSW**, a layered graph of near neighbours, visits a small fraction of rows. Quality is measured as **recall@k against the exact top-k**. `hnsw_ef_search` trades speed for recall: ≈0.76 at 10, ≈0.96 at 32 and ≈1.0 at 64+ on 50k vectors (p. 15).
- **Pitfall: index before filter.** An HNSW index serves `ORDER BY distance LIMIT k` and runs **before `WHERE`**, so filtered queries can return fewer than k rows. Fixes: request more than k, filter first and search exactly, or use per-partition indexes (p. 21; lab 3.4).

## Hybrid search

**Reciprocal Rank Fusion:** score = Σ 1/(60 + rank) over the keyword and vector rankings. You fuse **ranks** because BM25 scores and cosines aren't comparable (p. 23).

## What embeddings miss

Embeddings miss **negation, who a statement is about, certainty, time and numbers**. "Denies penicillin allergy" scores 0.938 against "penicillin allergy", and most retrievers do no better than chance on the NevIR negation benchmark (p. 14). In the lab, "chest pain" vs "denies chest pain" and "HbA1c 8.2%" vs "6.1%" score as similar (lab 4.4). **Retrieve with vectors, then let a model decide.**

## Controlling what gets embedded (lab section 4–5)

- **Strip boilerplate:** repeated templates dominate vectors (lab 4.1).
- **Prefix context**, such as note type, date or section heading (lab 4.2; p. 27).
- **Chunking:** a few hundred tokens, 10–20% overlap, split at sentence/paragraph/heading boundaries. A document scores as its best chunk (p. 27; lab 4.3).
- **Query expansion:** an LLM lists alternative phrasings before embedding (lab 5.1).
- **HyDE:** embed an LLM-written *hypothetical document* instead of the short question, because its style matches the corpus (lab 5.2).

## Evaluating retrieval

Build a labelled set of **20–50 real questions** with their relevant items **before** choosing a model, chunk size or k. Measure **precision@k** (share of top-k relevant) and **recall@k** (share of relevant items in top-k) (p. 28; lab 3.2).

## Beyond text (Week 7)

- **Images:** CLIP-style models put images and captions in one space. Alternatively, caption with a VLM and embed the caption, which compares **captions, not pixels** (Week 7 pp. 23–24; lab 3.1–3.3).
- **Time-series windows:** a z-normalized window is a vector, so "find similar patterns" is vector search (Week 7 p. 16). See [[21-concepts/time-series-feature-extraction|Time-series feature extraction]].

## Operational and privacy rules

- **Vectors leak text.** Inversion recovered 92% of 32-token inputs and 89% of names in clinical notes, so protect vectors like the source (p. 29).
- Deleting a source must delete its chunks and vectors, and edits require re-embedding (p. 29).
- Keyword indexes such as DuckDB FTS may need manual rebuilds (p. 29).

## In the Cognitive Performance Agent

- The **Evidence agent** ([[04-agent-engine/multi-agent-decision|Multi-agent decision]]) is the consumer. Alexa's design (`evidence_chunks` + pgvector, exact search first, HNSW later) matches the course's PostgreSQL option. Raghavan's plain-SQL design is the "keyword/structured" end of the same spectrum. See [[24-synthesis/open-decisions|Open decisions]]. ^[inferred]
- Personal-history embeddings fall under [[10-trust-safety/privacy-and-consent|Privacy and consent]] (inversion risk, deletion cascade). ^[inferred]
- Always scope by `user_id` **before** ranking; never rely on an ANN index plus post-filter for user isolation. ^[inferred]
- Our research snippets will contain negations and population qualifiers that embeddings blur, so a model check after retrieval is required before the Action agent uses a snippet. ^[inferred]

## Sources

- [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 06 — Embeddings, Vector Search & RAG]]: `binf4070-2026/week-06/slides-06.pdf` pp. 7–29; `public/weeks/06-exercise.ipynb`.
- [[30-course/weeks/week-07-time-series-multimodal-features|Week 07]]: `binf4070-2026/week-07/slides-07.pdf` pp. 16, 23–24; `public/weeks/07-exercise.ipynb` section 3.
