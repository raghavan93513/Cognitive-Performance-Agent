---
title: "OpenAI 2024 — Function Calling Guide"
category: 30-course
tags: [course, reading, agents, llm, api]
aliases: ["Function calling guide", "OpenAI tool calling"]
sources: ["https://platform.openai.com/docs/guides/function-calling"]
summary: OpenAI's docs on tool calling. Tools are JSON-schema functions, the app executes them, and outputs go back in a loop. Advises strict schemas, few clear functions and keeping known arguments in code.
provenance:
  extracted: 0.7
  inferred: 0.3
  ambiguous: 0.0
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 10
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# OpenAI 2024 — Function Calling Guide

> [!cite] OpenAI. *Function calling* (guide). OpenAI Platform Docs, 2024 (living document). https://platform.openai.com/docs/guides/function-calling
> Assigned in [[30-course/weeks/week-10-agents-tool-use-function-calling|Week 10 — Agents: Tool Use and Function Calling]].

> [!note] Version
> This is a living docs page. We read the version live on 2026-10-26, which has changed since the 2024 version the course lists (for example, it now mentions tool search and newer models). The core concepts below have stayed stable. ^[ambiguous]

## Core idea

- **Function (tool) calling** lets a model interface with external systems and data outside its training data.
- A **function** is a tool defined by a **JSON schema**: a name, a description and typed parameters. **Custom tools** take free-text input instead, and **built-in tools** include web search, code execution and remote MCP servers.
- Tool calling is a multi-step loop between the app and the model:
  1. Send a request with the tools the model may call.
  2. Receive a tool call from the model.
  3. **The application executes the code.**
  4. Send the tool output back to the model.
  5. Receive a final answer, or further tool calls.

## Key findings

The guide's best practices for defining functions:

- **Be explicit:** write clear names and parameter descriptions (including formats) and say what the output means. Use the system prompt to say when to use each function and when not to. Include examples and edge cases, though the guide notes examples may hurt reasoning models.
- **Apply software-engineering practice:**
  - Make functions predictable (principle of least surprise).
  - **Use enums and object structure to make invalid states impossible.**
  - Pass the "**intern test**": could a person use the function correctly from the description alone?
- **Offload work from the model:** do not make the model fill arguments the code already knows. For example, pass the order ID in code rather than as a parameter. Merge functions that are always called in sequence.
- **Keep the tool set small:** the guide suggests aiming for **fewer than 20 functions** available at the start of a turn as a soft limit, and deferring rarely used tools.
- **Strict mode** (`strict: true` with `additionalProperties: false`) makes outputs follow the schema reliably.
- Function definitions are injected into the context, so they **count against context and input tokens**.

## Why the course assigned it

- Week 10's objective is to turn a chatbot into an agent that **can call tools, query your data and act, while keeping it safe**, with "API boundaries" in the week title. This is the practical how-to for that boundary: the model *proposes* a call and the application *decides and executes*. ^[inferred]
- It complements [[30-course/readings/schick-2023-toolformer|Toolformer]]: research shows models can learn tool use, and the docs show how to expose tools safely in production. ^[inferred]

## What this means for us

This guide maps almost one to one onto our [[04-agent-engine/multi-agent-decision|multi-agent decision]] design ^[inferred]:

- **"The application executes" = policy code has the final say.** The LLM's Action agent only *proposes* a typed action, and deterministic code validates and executes it. ^[inferred]
- **Enums prevent invalid states.** The action should be `enum: [continue, short_walk, quiet_break]` plus a bounded duration, with strict mode on and all fields re-validated server-side. ^[inferred]
- **Don't make the model fill known arguments.** `participant_id` and `session_id` come from the authenticated context in code, never from the LLM. This is also an injection defence, because the model cannot query another student's data. ^[inferred]
- **Few tools.** Our whole tool surface could be about five tools (get features, score, retrieve evidence, propose action, log rationale). ^[inferred]
- Token cost matters for [[14-engineering/deployment-and-operations|deployment and operations]] budgets. ^[inferred]
- Our designs name a generic "LLM layer" ([[07-backend/tech-stack|tech stack]]). The same patterns apply with any provider's tool-calling API. ^[inferred]

## Read status

- **Full text** of the live docs page read on 2026-10-26: the overview, the tool-calling flow, best practices for defining functions, strict mode and token usage. Language-specific code samples were skipped.
