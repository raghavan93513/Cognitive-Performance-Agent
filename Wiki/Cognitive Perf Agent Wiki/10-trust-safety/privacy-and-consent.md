---
title: Privacy and Consent
category: 10-trust-safety
tags: [privacy, security, ethics]
aliases: [security, governance, data minimization]
relationships:
  - target: "[[05-data/data-sources]]"
    type: related_to
  - target: "[[06-database/database-and-api]]"
    type: related_to
sources: [System Design/Cognitive_Performance_Architecture.pdf, System Design/Cognitive Performance Agent - System Design - Alexa Kafka.pdf]
summary: Consent, user-only data access, pause/delete, data minimization, LLM data boundaries and wellness (non-medical) framing, which apply across every stage of the system.
provenance:
  extracted: 0.9
  inferred: 0.1
  ambiguous: 0.0
base_confidence: 0.54
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T19:30:00Z
updated: 2026-10-26T19:30:00Z
---

# Privacy and Consent

Raghavan's deck states the rule in one line: **consent + user-only data access + pause/delete apply across the design.** Alexa's doc expands it into concrete controls.

## Collection

- **Least sensitive representation** that still supports the experiment (privacy by design).
- **Default deny:** no keystrokes, screenshots, clipboard, sensitive window titles, URLs or document/message contents. See [[05-data/data-sources|Data sources]].
- Collection is **visible and pausable**, with an explained list of feature categories and a simple uninstall/disable path.
- Aggregate locally when feasible, and send summaries rather than raw traces.

## Consent

- Granular consent **by source and by purpose**, with policy version, timestamp and revocation state stored in a `consents` table.
- Clear explanations of what is collected, what is derived, retention and withdrawal.

## Access and storage

- Every read is restricted to the signed-in user, with deny-by-default authorization.
- Authorization lives in application code, with **PostgreSQL row-level security** as defence in depth. Test RLS with the real role model, because owners and privileged roles can bypass it.
- TLS in transit; managed encryption at rest for DB, object storage, backups and queues.
- Short-lived access tokens, secure refresh-token handling, a secret manager and least-privilege service identities.
- Never put raw health values, provider tokens or detailed activity traces in routine logs.
- Never copy production health data into development.

## Deletion and retention

- Retention schedules and an **auditable deletion workflow** covering raw observations, features, baselines, embeddings, exports and recommendation history (`POST /v1/account/data-deletion`).
- Keep research/analytics datasets separate from operational identifiers, with de-identification appropriate to the protocol.

## LLM boundary

Only minimal derived context reaches the LLM: no raw health history and no activity traces. The LLM cannot alter consent or make access decisions. See [[04-agent-engine/multi-agent-decision|Multi-agent decision]].

## Wellness framing

- This is a decision-support and **wellness** tool, not a medical device. It does not diagnose, treat or claim to prevent any condition.
- It recommends; it never silently changes schedules or device settings.
- Alexa's doc cites the FDA's January 2026 *General Wellness* guidance as a reference for low-risk positioning, noting that claims, intended use and marketing determine regulatory status.

## Sources

- [[31-decks/raghavan-architecture-deck]] — slides 1, 4
- [[31-decks/alexa-kafka-system-design]] — §2.2, §4.3, §8.3, §9.3, §10
