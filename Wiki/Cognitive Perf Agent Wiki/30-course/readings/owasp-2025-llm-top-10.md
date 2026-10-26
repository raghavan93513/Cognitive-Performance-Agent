---
title: "OWASP 2025 — Top 10 for LLM Applications"
category: 30-course
tags: [course, reading, security, llm, agents]
aliases: ["OWASP Top 10 for Large Language Model Applications", "OWASP LLM Top 10 2025"]
sources: ["https://owasp.org/www-project-top-10-for-large-language-model-applications/", "https://genai.owasp.org/llm-top-10/"]
summary: Industry list of the 10 most critical LLM app risks (2025), from prompt injection to unbounded consumption, with mitigations. Week 13's checklist for securing and red-teaming agents.
provenance:
  extracted: 0.65
  inferred: 0.35
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 13
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# OWASP 2025 — Top 10 for LLM Applications

> [!cite] OWASP GenAI Security Project. *OWASP Top 10 for Large Language Model Applications* (2025 edition). OWASP, 2025. https://owasp.org/www-project-top-10-for-large-language-model-applications/ (list at https://genai.owasp.org/llm-top-10/)
> Assigned in [[30-course/weeks/week-13-privacy-safety-ethics-integration|Week 13 — Privacy, Safety, Ethics and Integration]].

## Core idea

- OWASP (the Open Worldwide Application Security Project) is known for its web-security Top 10. Its LLM project, now the broader **OWASP GenAI Security Project**, lists the most critical security risks specific to LLM and generative-AI applications, with mitigations for each.

## Key findings

**The 2025 list:**

1. **LLM01 Prompt Injection:** user prompts, or content the model ingests, alter its behaviour.
2. **LLM02 Sensitive Information Disclosure:** leaking personal data, credentials or confidential data through the model or app.
3. **LLM03 Supply Chain:** risks in third-party models, datasets and plugins.
4. **LLM04 Data and Model Poisoning:** tampered pre-training, fine-tuning or **embedding** data.
5. **LLM05 Improper Output Handling:** passing model output downstream without validation or sanitisation.
6. **LLM06 Excessive Agency:** granting an LLM system more functionality, permissions or autonomy than needed.
7. **LLM07 System Prompt Leakage.**
8. **LLM08 Vector and Embedding Weaknesses:** risks in RAG stores and embeddings.
9. **LLM09 Misinformation:** hallucinated or false content that users rely on.
10. **LLM10 Unbounded Consumption:** uncontrolled usage leading to cost or denial of service.

**Selected mitigations, from the individual risk pages:**

- **Prompt injection (LLM01):** OWASP notes that foolproof prevention may not exist. Mitigations:
  - Constrain model behaviour in the system prompt.
  - Define expected output formats and **validate them with deterministic code**.
  - Filter inputs and outputs, including evaluating RAG answers on context relevance, groundedness and question/answer relevance.
  - Enforce **least privilege**, with tools handled in code and not by the model.
  - Require **human approval for high-risk actions**.
  - Segregate external content.
  - Run adversarial testing.
- **Excessive agency (LLM06):**
  - Minimise extensions and extension functionality.
  - **Avoid open-ended tools** such as running a shell command or fetching any URL.
  - Minimise permissions.
  - Execute tools in the user's own security context.
  - Require user approval.
- **Misinformation (LLM09):**
  - Use RAG over verified sources.
  - Cross-verify and keep human oversight.
  - Validate high-stakes outputs automatically.
  - **Communicate risks and limitations** to users.
  - Design UIs that label AI content and its limits. ^[inferred]

## Why the course assigned it

- Week 13 combines safety rules, red-teaming each other's agents and final integration. OWASP is the industry-standard checklist for both attacking and hardening an LLM app, and the practical companion to [[30-course/readings/greshake-2023-indirect-prompt-injection|Greshake 2023]]. ^[inferred]

## What this means for us

A risk-by-risk check of our design ^[inferred]:

| Risk | Our exposure | Our control |
|---|---|---|
| LLM01 Prompt injection | Evidence retrieval; student free text | Treat as data; allowlisted actions; policy veto |
| LLM02 Sensitive info | Watch/health data in prompts | Send minimal features, not raw data; user-only access |
| LLM04/LLM08 Poisoning, vector | Evidence corpus (Alexa's pgvector plan) | Curated, frozen corpus with provenance |
| LLM05 Output handling | Action + rationale shown in UI | Strict schema; server-side validation; escape text |
| LLM06 Excessive agency | Agent tools | ~5 narrow read-only tools; no send/fetch/write |
| LLM09 Misinformation | Health-ish explanations | Wellness framing; cite records; allow abstaining |
| LLM10 Unbounded consumption | LLM calls per session | Rate-limit decisions; budget alerts |

- These controls live in [[04-agent-engine/multi-agent-decision|multi-agent decision]], [[10-trust-safety/privacy-and-consent|privacy and consent]] and [[11-engineering/deployment-and-operations|deployment and operations]]. The table is our self-assessment, not OWASP's. ^[inferred]
- "Validate output with deterministic code" and "least privilege" are already core to our design. OWASP gives us standard names to use in the [[30-course/deliverables/part-3-final-showcase|final showcase]] safety story. ^[inferred]

## Read status

- **Read on 2026-10-26:** the OWASP project landing page, the 2025 Top 10 index page (genai.owasp.org), and the full risk pages for LLM01 (Prompt Injection), LLM06 (Excessive Agency) and LLM09 (Misinformation). The other seven risk pages were **not** read in detail; their entries come from the index-page descriptions.
