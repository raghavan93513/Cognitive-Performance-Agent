---
title: "Gao 2024 — RAG for LLMs: A Survey"
category: 30-course
tags: [course, reading, rag, retrieval, llm]
aliases: ["Retrieval-Augmented Generation for Large Language Models: A Survey"]
sources: ["https://arxiv.org/abs/2312.10997"]
summary: Optional survey that organises RAG into Naive, Advanced and Modular paradigms and covers retrieval, augmentation, generation and evaluation. A practical map for building and testing a RAG pipeline.
provenance:
  extracted: 0.6
  inferred: 0.4
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 06
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Gao 2024 — RAG for LLMs: A Survey

> [!cite] Yunfan Gao, Yun Xiong, Xinyu Gao, et al. *Retrieval-Augmented Generation for Large Language Models: A Survey.* arXiv:2312.10997, 2024 (optional reading). https://arxiv.org/abs/2312.10997
> Assigned (optional) in [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6 — Embeddings, Vector Search and RAG]].

## Core idea

- LLMs hallucinate, have outdated knowledge and reason in ways that cannot be traced. RAG addresses this by pulling in external knowledge, which improves accuracy and credibility and allows continuous updates and domain-specific data.
- The survey traces three paradigms:
  - **Naive RAG:** index, then retrieve, then generate.
  - **Advanced RAG:** adds pre-retrieval steps (query rewriting, routing) and post-retrieval steps (reranking, context compression).
  - **Modular RAG:** swappable modules and patterns such as iterative, recursive and adaptive retrieval.
- It breaks a RAG system into **retrieval**, **augmentation** and **generation**, then covers evaluation and open challenges.

## Key findings

- **Retrieval-side techniques covered:**
  - **Query rewrite**, for example Rewrite-Retrieve-Read.
  - **Routing** (semantic, metadata-based or hybrid).
  - **Mixed or hybrid retrieval** (sparse plus dense).
- **Post-retrieval:** **reranking** puts the most relevant chunks first and shrinks the context, because redundant or overly long context hurts generation. This is the "**lost in the middle**" effect, where LLMs attend mostly to the start and end of the context.
- **RAG vs fine-tuning:** RAG suits dynamic, source-attributable knowledge, while fine-tuning shapes behaviour and format. The two can be combined. ^[inferred]
- **Evaluation:** the survey reviews targets and benchmarks for RAG, including retrieval quality (context relevance) and generation quality (faithfulness to the retrieved context, answer relevance), plus robustness abilities such as handling noise and rejecting a question when the context lacks the answer. ^[inferred]

## Why the course assigned it

- It is optional depth for Week 6's RAG objective: a catalogue of the knobs to tune once a basic pipeline works. ^[inferred]
- It bridges the 2020 end-to-end RAG of [[30-course/readings/lewis-2020-rag|Lewis 2020]] and the modular, frozen-LLM pipelines students actually build in the lab. ^[inferred]

## What this means for us

- **Start naive, measure, then add.** The Evidence agent in [[04-agent-engine/multi-agent-decision|multi-agent decision]] can begin as Naive RAG over SQL-filtered history (Raghavan's design). Advanced steps (reranking, pgvector, as in Alexa's design) come in only if retrieval metrics show the need. This is one way to settle that disagreement on [[24-synthesis/design-comparison|design comparison]]. ^[inferred]
- **Metadata routing over pure embeddings.** Our records are structured (student, task type, time, outcome), so metadata filters are likely to beat semantic search for "what happened last time I did this task tired?". ^[inferred]
- **Keep context short.** Because of "lost in the middle", pass the LLM a few high-value records, not a long dump of sessions. ^[inferred]
- **Evaluate retrieval separately from generation** in the [[15-research/evaluation-plan|evaluation plan]]: did we fetch the right sessions, and did the explanation stay faithful to them? ^[inferred]
- See also [[21-concepts/retrieval-augmented-generation|retrieval-augmented generation]].

## Read status

- **Full text** (arXiv HTML) fetched on 2026-10-26. Read the abstract, table of contents and the sections on query rewriting, hybrid retrieval and reranking. The evaluation section was skimmed, so the evaluation bullet is marked inferred. This is a long survey, so most of it was not read in detail.
