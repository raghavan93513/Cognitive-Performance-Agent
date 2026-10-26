---
title: "Lewis 2020 — Retrieval-Augmented Generation (RAG)"
category: 30-course
tags: [course, reading, rag, llm, retrieval]
aliases: ["Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", "RAG paper"]
sources: ["https://arxiv.org/abs/2005.11401"]
summary: The original RAG paper pairs a seq2seq generator with a dense retriever over a Wikipedia index, giving answers that are more factual, updatable and traceable to sources. Foundation of RAG.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 06
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Lewis 2020 — Retrieval-Augmented Generation (RAG)

> [!cite] Patrick Lewis, Ethan Perez, Aleksandra Piktus, et al. *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS 2020. https://arxiv.org/abs/2005.11401
> Assigned in [[30-course/weeks/week-06-embeddings-vector-search-rag|Week 6 — Embeddings, Vector Search and RAG]].

## Core idea

- Pretrained language models store facts in their weights (**parametric memory**), but they cannot easily look up or update knowledge precisely, and they cannot show **provenance** for what they say.
- **RAG** adds a **non-parametric memory**: a dense vector index of Wikipedia, searched by a neural retriever. The generator conditions on the retrieved passages.
- Components:
  - The retriever is **DPR** (Dense Passage Retriever), a bi-encoder that embeds the query and the passages.
  - The generator is **BART-large** (400M parameters), a seq2seq model.
  - Retriever and generator are fine-tuned **end to end**, with the retrieved document treated as a latent variable.
- There are two variants:
  - **RAG-Sequence** uses the same retrieved document for the whole output.
  - **RAG-Token** can draw on a different document for each generated token.

## Key findings

- RAG set the state of the art on three open-domain QA tasks, beating parametric-only seq2seq models and task-specific retrieve-and-extract systems.
- On generation tasks (MS-MARCO, Jeopardy question generation), RAG's output was **more specific, diverse and factual** than a BART baseline.
- Knowledge can be **updated by swapping the index**, with no retraining. ^[inferred]
- RAG is a general fine-tuning recipe: classification works too, with the class treated as a one-token target.

## Why the course assigned it

- Week 6's objective is to index health data for search by meaning and to **ground LLM answers in it with retrieval (RAG)**. This is the paper that named and defined the approach. ^[inferred]
- The course reads it as the conceptual root: separate *what the model knows* from *what it can look up and cite*. Modern RAG pipelines are usually not trained end to end; they combine a frozen LLM, an embedding model and a vector store. See [[30-course/readings/gao-2024-rag-survey|Gao 2024]]. ^[inferred]

## What this means for us

- Our Evidence agent is a RAG step (see [[21-concepts/retrieval-augmented-generation|retrieval-augmented generation]] and [[04-agent-engine/multi-agent-decision|multi-agent decision]]). Lewis's key benefit, **provenance**, is exactly why the Evidence agent must cite which records or snippets it used. ^[inferred]
- **Updatable memory without retraining** fits our setting well. Each student's own past sessions and outcomes are an index that grows daily, while the LLM stays fixed. ^[inferred]
- Retrieval quality limits answer quality. Before arguing about pgvector vs plain SQL ([[07-backend/tech-stack|tech stack]]), we should check whether simple filters (same student, same task type, last N sessions) already retrieve the right evidence. ^[inferred]

## Read status

- **Full text** (ar5iv HTML) fetched on 2026-10-26. Read the abstract, introduction and the model sections (RAG-Sequence/Token, DPR, BART). The experiment tables were skimmed.
