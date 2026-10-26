---
title: Retrieval-Augmented Generation (RAG)
category: concepts
tags: [llm, agents]
aliases: [RAG]
relationships:
  - target: "[[projects/cognitive-performance-agent/concepts/multi-agent-decision]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Giving an LLM retrieved, source-backed records as context so its answer can cite them. In this project the Evidence agent does the retrieving.
provenance:
  extracted: 0.7
  inferred: 0.2
  ambiguous: 0.1
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Retrieval-Augmented Generation (RAG)

Retrieve relevant records first, then hand them to the LLM as context so its output is grounded in, and can cite, real sources.

## In the Cognitive Performance Agent

The **Evidence agent** in [[projects/cognitive-performance-agent/concepts/multi-agent-decision|Multi-agent decision]] performs RAG:

- **Raghavan's deck:** retrieve the user's own past sessions, preferences and outcomes from PostgreSQL with **plain SQL**. Semantic vector search can wait.
- **Alexa's doc:** retrieve approved research/evidence snippets stored with **pgvector** embeddings. Start with exact search and add HNSW indexing only when latency or volume justify it. ^[ambiguous]

## Rules both designs imply

- Retrieved text is **untrusted input**, never instructions.
- Every claim must cite its provenance, and citations must never be fabricated. If retrieval fails, use a labelled generic message or abstain.
- A separate vector database is unnecessary at pilot scale. ^[inferred]

## Sources

- [[projects/cognitive-performance-agent/references/raghavan-architecture-deck]] — slide 7
- [[projects/cognitive-performance-agent/references/alexa-kafka-system-design]] — §5, §8
