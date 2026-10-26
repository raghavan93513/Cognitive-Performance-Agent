---
title: "Week 06 — Embeddings, Vector Search & RAG"
category: 30-course
tags: [course, week, retrieval, embeddings, rag]
aliases: [Week 06, Lecture 06, Data Management II]
sources: ["binf4070-2026/week-06/slides-06.pdf", "personal-health-agent.github.io/public/weeks/06-exercise.ipynb", "personal-health-agent.github.io/src/content/weeks/06-data-management-ii.md"]
summary: Keyword vs vector vs hybrid search over clinical notes in DuckDB, chunking, retrieval evaluation and RAG. Blueprint for our Evidence agent; embeddings miss negation.
provenance:
  extracted: 0.75
  inferred: 0.2
  ambiguous: 0.05
base_confidence: 0.66
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 6
date: 2026-10-16
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 06 — Embeddings, Vector Search & RAG

> [!info] Fri **Oct 16, 2026** · "Data Management II: Embeddings, Vector Search & RAG"
> **Objective (course site):** prompt LLMs for health tasks and see where they go wrong, then index health data for search by meaning and ground LLM answers in it with retrieval (RAG).
> **Slides:** `binf4070-2026/week-06/slides-06.pdf` (31 pp., deck title "Searching Text: Keyword and Vector Search") · **Lab:** `public/weeks/06-exercise.ipynb` (DuckDB + Flock + vss + fts, OpenAI `text-embedding-3-small`).
> Instructors: [[22-entities/xuhai-orson-xu|Xuhai "Orson" Xu]] and [[22-entities/eugene-wu|Eugene Wu]]. Course hub: [[30-course/30-course|BINF 4070]].

The deck has four parts: searching text, how vector search works, vector search in DuckDB, design considerations (slides p. 2). Concept pages distilled from this week: [[21-concepts/embeddings-and-vector-search|Embeddings and vector search]] and [[21-concepts/retrieval-augmented-generation|Retrieval-augmented generation]].

> [!warning] Scope note
> The site objective promises "prompt LLMs for health tasks and see where they go wrong", but the slide deck has no separate prompting section. LLM failure modes show up only through retrieval: embeddings ignoring negation (p. 14), RAG that "hopefully" answers from retrieved data (p. 25), and the lab's "did any retrieved note mislead it?" question. ^[ambiguous]

## Lecture: key ideas

### 1. Searching text (pp. 3–7)

- **Running example:** seven synthetic notes. Question: *"Which notes say the patient is allergic to penicillin?"* (p. 4).
- **Exact match (`ILIKE '%penicillin%'`)** returns N3–N6, but only N3 is a true allergy (p. 6). The word can appear **without the fact**: N4 "Denies penicillin allergy", N5 "Mother has a penicillin allergy", N6 "Rule out penicillin allergy". The fact can also appear **without the word**: N9 "Allergic to PCN".
- **Three ways to search text** (p. 7):

| | Keyword search | Semantic operator | Vector search |
|---|---|---|---|
| Matches via | shared words | a model reads row + question | nearby vectors from a model |
| Model calls | never | every query × every row | once per row at load, once per query |
| Cost per query | low | one model call per row | low, with an index |
| Returns | rows ranked by word overlap | true/false per row | rows ranked by similarity |

- Vector search is **best-effort similarity, not reasoning** (p. 7).

### 2. How vector search works (pp. 8–15)

- **Definition:** represent each item and the query as vectors, then return the *k* items nearest the query (p. 8). In the toy example, the query "penicillin allergy" scores N3 at 0.995 and N9 (PCN) at 0.990, while N8 "annual physical" scores 0.616 (p. 9).
- **Distance functions** (p. 10): cosine similarity, Euclidean distance and inner product. **If all vectors have length 1, they give the same ranking.** Many embedding models, including OpenAI's, output unit-length vectors.
- **Keyword vectors / BM25** (p. 11): sparse, with one dimension per vocabulary word. BM25 weights rare words up and long documents down. It matches exact words only, so N9 scores 0 unless the query is **expanded** with synonyms (PCN → penicillin) from a list or terminology. It is exact, fast and **explainable**.
- **Learned (dense) embeddings** (p. 12): a neural net is trained so that similar meanings get nearby vectors. Example models are all-MiniLM-L6-v2 (384-d), OpenAI small (1,536-d) and **MedCPT** (768-d, trained on PubMed search logs). No single dimension means anything; only distances do. Such a model can place "PCN" near "penicillin" without a synonym list.
- **Geometry of meaning** (p. 13): king − man + woman ≈ queen (word2vec 2013). LLaMA-2 has near-linear concept directions (2024). In biomedical embeddings, drug→target arithmetic is top-1 30% of the time and top-10 65% of the time (2025). Meaning has geometry, **but only approximately**.
- **What embeddings miss** (p. 14): **negation, who it is about, certainty, time, numbers**. N4 "Denies penicillin allergy" still scores 0.938 and N5 (the mother) 0.907. On the NevIR negation benchmark, most retrieval models did **no better than chance**. **Fix:** retrieve with vectors, then let a model decide.
- **Exact vs approximate search** (p. 15): exact search over 1M chunks × 384-d is ≈384M multiply-adds per query. **ANN** with an **HNSW** index (a layered graph of near neighbours) visits a small fraction of rows. **Recall@10** is the share of the exact top 10 that the index returns. `hnsw_ef_search` trades speed for recall: about 0.76 at ef=10, 0.96 at ef≈32 and ≈1.00 at ef≥64 on 50k synthetic vectors in DuckDB.

### 3. Vector search in DuckDB (pp. 17–25)

- **Vector column** (p. 18): `embedding FLOAT[1536]` plus an `embed_model TEXT` column recording which model made each vector.
- **Embedding inside SQL** (p. 19): DuckDB has no built-in embedding function. The options are the experimental `flock` and `quackformers` extensions, or MotherDuck. API keys go in a `SECRET`, never in the query.
- **Query by similarity** (p. 20): `array_cosine_similarity / array_distance / array_inner_product`. Ordinary `WHERE` filters still apply. **The query vector must come from the same model as the stored vectors.**
- **HNSW index** (`vss` extension, p. 21): it serves `ORDER BY <distance> LIMIT k`, and the metric must match the function. **The index runs before `WHERE`.** It returns the global top-k and the filter then drops rows, so a date-filtered top-3 came back with only 2 rows. Three fixes: request more than k, filter first and search exactly, or keep one index per patient.
- **Keyword search** (`fts` extension, p. 22): `PRAGMA create_fts_index` tokenizes, stems and drops stop words, and `match_bm25` scores. Here BM25 ranks N4 (the *denial*) first.
- **Hybrid search with Reciprocal Rank Fusion** (p. 23): score = 1/(60 + keyword rank) + 1/(60 + vector rank). N3 wins at 0.0325. **Ranks are comparable across methods even though BM25 scores and cosines are not** (Cormack et al., SIGIR 2009).
- **Other systems** (p. 24): PostgreSQL + **pgvector** uses `vector(384)` and `ORDER BY embedding <=> $q`. `<=>` is cosine distance, `<->` Euclidean and `<#>` negative inner product. BigQuery uses `VECTOR_SEARCH`, and turbopuffer is a dedicated vector DB. With a dedicated vector DB, **joins with your other tables happen in your code.**
- **RAG** (p. 25): embed the question, retrieve the nearest chunks, and build a prompt that says to *answer only from the notes below, cite note IDs, and say so if they do not answer*. The LLM then answers with citations such as [N3], [N6]. The model **(hopefully)** answers from retrieved data instead of its weights, so RAG **relies on good retrieval**.

### 4. Design considerations (pp. 26–30)

- **Chunking** (p. 27): one vector per long note averages every topic away. Chunks without overlap can split a fact (drug and reaction in different chunks). Common practice:

| Choice | Common practice |
|---|---|
| Size | a few hundred tokens; smaller = more precise, larger keeps context |
| Overlap | 10–20% so a fact cut at a boundary appears whole once |
| Boundaries | sentences, paragraphs, section headings — not mid-word |
| Context | prepend note type, date, section heading to each chunk |

- **Evaluating retrieval** (p. 28): build a labelled set pairing each question with its relevant notes. **Precision@k** is the share of the top-k that is relevant; **Recall@k** is the share of relevant notes found in the top-k. Average over questions, and **build 20–50 real questions before choosing a model, chunk size or k.** On Q1 at k=3, BM25 scored P 0.33 / R 0.50 and vector search P 0.67 / R 1.00.
- **Practical matters** (p. 29):
  - **Vectors leak text.** An inversion attack recovered 92% of 32-token inputs exactly, and 89% of full names in clinical notes (Morris et al., EMNLP 2023). Protect vectors like the source text.
  - **Deletion** of a note must cascade to its chunks and vectors.
  - **Edits** need re-embedding, because a stale vector still matches the old text.
  - DuckDB's **FTS index does not auto-update**, so rebuild it after loading.
- **Summary** (p. 30): text needs its own search methods. Keyword search matches exactly; vector search ranks by similarity. Vector indexes run before `WHERE`, so they can return fewer rows than expected. Query expansion improves recall. RAG retrieves chunks and passes them to an LLM for reasoning.

## Lab (06-exercise.ipynb)

The lab uses 46 synthetic notes for patients P001–P005 (progress, nursing, phone, patient-message and discharge notes). Most progress notes start with a repeated **clinic template**. Five search questions (Q1 trouble sleeping, Q2 low blood sugar episodes, Q3 metformin side effects, Q4 shortness of breath, Q5 chest pain) each have hand-labelled relevant notes. Everything is scored by **precision@5** and **recall@10**. Embeddings and chat completions go through Flock (`llm_embedding`, `llm_complete`).

| Part | What you do | Skill |
|---|---|---|
| 2.1 | Embed one phrase; compute `len` and Euclidean norm | Embeddings are 1,536 numbers with length ≈1 |
| 2.2–2.3 | Embed all notes into `note_vectors` (cast to `FLOAT[1536]`), then the five queries | Batching (64 texts/request, so not 46 calls); same model for queries and docs |
| 2.4 | Compare cosine, inner product and Euclidean on 3 notes | For unit vectors, cosine = inner product and the rankings agree |
| 3.1 | `ILIKE '%sleep%'` vs vector top-10 for Q1 | Keyword misses paraphrases and picks up irrelevant word hits |
| 3.2 | Compute P@5 and R@10 in SQL against `relevant` | Retrieval evaluation as a query |
| 3.3 | Restrict to P002's 2026 notes with `WHERE` | Filter **before** ranking (patient scoping) |
| 3.4 | Build an HNSW index; the filtered top-3 returns fewer rows; rewrite to rank by similarity so DuckDB filters first | Index-then-filter pitfall |
| 4.1 | Strip the template before embedding (`note_vectors_clean`); compare in a search box | Boilerplate dominates vectors |
| 4.2 | Prefix the note type, e.g. "patient message: …" (`note_vectors_typed`) | Adding context to what gets embedded |
| 4.3 | Split into sentences (`chunk_vectors`); a note scores as its best sentence (N36's late mention of low glucose) | Chunking granularity |
| 4.4 | Cosine of "chest pain" vs "denies chest pain", HbA1c 8.2% vs 6.1%/8.3%, SOB vs shortness of breath | Negation, numbers and abbreviations fool similarity |
| 5.1 | `expand_query` (the LLM lists 8 alternative phrases), then embed the expansion | Query expansion |
| 5.2 | `hypothetical_note` (2 made-up clinical sentences), then embed it (**HyDE**) | Matching a document's style beats a 3-word query; the fake facts don't matter |
| 5.3 | P002's top-5 notes → `string_agg` → `answer_with(question, notes)`, whose prompt says to answer only from the notes, cite IDs and say so if unanswered | End-to-end RAG; check that citations support the answer |

Setup detail: DuckDB may run constant-input functions several times during planning. The lab wraps inputs in an `at_run_time()` side-effect function so each model call happens once per row.

## Readings

- [[30-course/readings/lewis-2020-rag|Lewis et al. 2020 — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks]] (NeurIPS)
- [[30-course/readings/singhal-2023-llms-encode-clinical-knowledge|Singhal et al. 2023 — Large language models encode clinical knowledge]] (Nature)
- [[30-course/readings/gao-2024-rag-survey|Gao et al. 2024 — RAG for LLMs: A Survey]] (arXiv, optional)

## What this means for us

The **Evidence agent** in [[04-agent-engine/multi-agent-decision|Multi-agent decision]] is this week's pipeline.

- **Settle the "SQL vs pgvector" question with an eval, not taste.** The course's rule is to build 20–50 real questions with labelled relevant items before choosing a model, chunk size or k. That gives [[24-synthesis/open-decisions|open decision #5]] a concrete test: build a small labelled set (personal-history questions plus research-snippet questions) and score plain SQL, BM25, vector and hybrid (RRF) on P@k and R@k. ^[inferred]
- **pgvector is a first-class course option.** p. 24 shows `vector(384)` with `<=>`, which matches Alexa's `evidence_chunks` design in [[06-database/database-and-api|Database and API]]. Keeping vectors in PostgreSQL also keeps SQL joins and filters, where a separate vector DB would push joins into app code. Pilot scale does not need a separate vector DB, which supports [[07-backend/tech-stack|Tech stack]]. ^[inferred]
- **Filter first, then rank: user scoping is a safety rule.** The HNSW-before-`WHERE` pitfall (p. 21, lab 3.4) means an indexed query scoped to one student can silently return fewer rows. A post-filter is only correct if it removes other users' rows *after* they were ranked. Prefer exact search over a pre-filtered set at pilot scale, which also matches Alexa's "exact search first, HNSW later". ^[inferred]
- **Embeddings ignore negation, subject, certainty, time and numbers.** Our snippets will contain claims like "breaks did **not** improve…" or "in adolescents only". The Evidence agent must re-check retrieved passages (the course's "retrieve with vectors, then let a model decide"), and the [[04-agent-engine/multi-agent-decision|Action agent]] must not treat similarity as support. ^[inferred]
- **Hybrid (BM25 + vector via RRF)** is cheap in Postgres (`tsvector` + pgvector) and covers the vocabulary problem: short user queries vs academic wording, abbreviations like "HRV" and "RMSSD". ^[inferred]
- **HyDE / query expansion** fit our setting. The Signal agent's state ("elevated HR, 50 min continuous typing, low sleep") is a poor literal query for research text. Generating a hypothetical evidence sentence and embedding *that* should retrieve better. Measure it on the eval set. ^[inferred]
- **Embeddings are personal data.** Vectors of personal history (session notes, user feedback) can be inverted to text (p. 29), so they belong under the same consent, retention and deletion rules in [[13-trust-safety/privacy-and-consent|Privacy and consent]]. Deleting a session must cascade to its chunks and vectors, and edits must trigger re-embedding. ^[inferred]
- **Store `embed_model` on every vector** and refuse to compare across models (p. 18, p. 20). The RAG prompt should follow the course template: answer only from the passages, cite IDs, say so when they don't answer. This matches our "cite provenance, never fabricate, abstain if retrieval fails" rule in [[21-concepts/retrieval-augmented-generation|RAG]]. ^[inferred]
- **Chunk with context:** prepend the source title, year, population and section to each evidence chunk (p. 27). That gives the Evidence agent the metadata filters Alexa's design calls for (topic, population, recency). ^[inferred]

## Likely quiz material

- Why `LIKE` both over- and under-matches (word without fact; fact without word).
- Keyword vs semantic operator vs vector search: matching basis, when the model runs, and cost.
- Cosine vs Euclidean vs inner product, and why they rank identically for unit vectors. Compute cosine for q=(0.8,0.6), B=(0.6,0.8): 0.96.
- Sparse (BM25, one dimension per word) vs dense (learned, fixed dimensions, nonzero entries). What BM25 rewards: rare words, short documents.
- What embeddings miss: negation, subject, certainty, time, numbers (NevIR).
- Exact vs ANN (HNSW). Recall@10 of an index. `hnsw_ef_search` trades speed for recall.
- HNSW index applies **before** `WHERE`, so fewer than k rows can come back; the three fixes.
- Reciprocal Rank Fusion formula with k=60; why fuse ranks rather than scores.
- Chunking parameters: size, 10–20% overlap, boundaries, prepended context.
- Precision@k vs Recall@k; compute them from a table.
- Embedding inversion risk; deletion and edit cascades; FTS index not auto-updating.
- RAG prompt structure and why it "relies on good retrieval". HyDE and query expansion from the lab.

## Sources

- `binf4070-2026/week-06/slides-06.pdf`: LIKE example p. 4–6; search comparison p. 7; distances p. 10; BM25 p. 11; embedding models p. 12; geometry p. 13; what embeddings miss p. 14; HNSW/recall p. 15; DuckDB vector column/Flock/similarity/HNSW/FTS p. 18–22; RRF p. 23; pgvector etc. p. 24; RAG p. 25; chunking p. 27; evaluation p. 28; practical matters p. 29; summary p. 30.
- `personal-health-agent.github.io/public/weeks/06-exercise.ipynb`: sections 2–5 and the setup cell (data, labels, prompts for `expand_query`, `hypothetical_note`, `answer_with`).
- `personal-health-agent.github.io/src/content/weeks/06-data-management-ii.md`: date, objective, readings.
