---
title: "Greshake 2023 — Indirect Prompt Injection"
category: 30-course
tags: [course, reading, security, llm, rag]
aliases: ["Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection", "indirect prompt injection"]
sources: ["https://arxiv.org/abs/2302.12173"]
summary: LLM apps that read retrieved or external content blur data and instructions. Attackers can plant prompts in that data to steal data, commit fraud or hijack tool calls. Week 13 security core.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 13
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Greshake 2023 — Indirect Prompt Injection

> [!cite] Kai Greshake, Sahar Abdelnabi, Shailesh Mishra, Christoph Endres, Thorsten Holz, Mario Fritz. *Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection.* ACM AISec Workshop, 2023. https://arxiv.org/abs/2302.12173
> Assigned in [[30-course/weeks/week-13-privacy-safety-ethics-integration|Week 13 — Privacy, Safety, Ethics and Integration]].

## Core idea

- In ordinary prompt injection, the user attacks the model directly. In LLM-integrated applications, the model also reads **retrieved data**: web pages, emails, documents and tool outputs. **These applications blur the line between data and instructions.**
- **Indirect prompt injection:** an attacker with no direct access plants instructions in content the app is likely to retrieve. When the LLM processes it, the injected text can effectively **act like arbitrary code**: it can change the app's behaviour and control whether and how other APIs are called.

## Key findings

- **Injection methods:**
  - **Passive**, by retrieval: poisoned web pages or documents.
  - **Active**: for example, sending an email the assistant will read.
  - **User-driven**: tricking the user into pasting a prompt.
  - **Hidden**: obfuscated or encoded payloads, or multi-stage ones that fetch further instructions.
- **Threat taxonomy (security view):**
  - **Information gathering**, such as leaking personal data or chat history.
  - **Fraud**, such as phishing links.
  - **Intrusion**, such as hijacking API or tool calls and persistence.
  - **Malware**, including self-spreading "AI worms" through email assistants.
  - **Manipulated content**, such as biased or false summaries.
  - **Availability**, such as denial of service or making the model useless.
- Attacks were shown to work in practice against **Bing Chat (GPT-4)**, code-completion engines and synthetic GPT-4 apps with tools.
- A key message: **retrieval opens new doors for prompt injection.** Citations and source links do not protect users if the cited source carries the attack.
- At publication, **effective mitigations were lacking**.

## Why the course assigned it

- Week 13 asks teams to cover safety rules and then **try to break each other's agents**. Greshake gives the attack playbook for any agent that retrieves content or calls tools, which by Weeks 6, 10 and 11 is every team's system. ^[inferred]
- It pairs with [[30-course/readings/owasp-2025-llm-top-10|OWASP LLM Top 10]]: the paper explains the attack, and OWASP lists the defences. ^[inferred]

## What this means for us

- **Our Evidence agent is the attack surface.** [[04-agent-engine/multi-agent-decision|Multi-agent decision]] already says retrieved text is untrusted input and must never be followed as instructions. This paper explains why that rule is essential. ^[inferred]
  - In Alexa's design, research snippets would be retrieved from an approved corpus. The corpus must be curated and frozen, never live web content. ^[inferred]
  - In Raghavan's design, the agent retrieves students' own notes and preferences. Any free text a student writes, such as decline reasons, is also a potential injection channel and should be passed to the LLM as clearly delimited data. ^[inferred]
- **Limit what a hijacked LLM can do.** Our defences are the deterministic policy and allowlisted actions. The worst a successful injection can do is choose among continue, walk or break, and policy code can still veto that. Keep it so: no LLM tools that send messages, fetch URLs or read other students' data. ^[inferred]
- **Red-team plan for Week 13:** plant instructions in a session note and in a fake evidence snippet, then check that (a) the action stays in the allowlist, (b) no data leaks into the rationale, and (c) the attempt is logged. Add this to the [[15-research/evaluation-plan|evaluation plan]] or safety tests. ^[inferred]
- Ties to [[13-trust-safety/privacy-and-consent|privacy and consent]] (LLM data boundaries) and [[21-concepts/retrieval-augmented-generation|retrieval-augmented generation]]. ^[inferred]

## Read status

- **Full text** (arXiv PDF) read on 2026-10-26: abstract, introduction, the threat taxonomy (section 3) and the attack demonstrations (section 4), which were skimmed.
