---
title: AI Skills Toolkit
category: 11-engineering
tags: [tool, planning, evaluation]
sources: ["CLAUDE.md", ".claude/skills/", ".claude/agents/"]
summary: "The eighteen Claude Code skills (four vendored from Emil Kowalski), six agents and the device-walk QA tool in this repo: what each does, when to use it, where it writes. Adapted from Heramb's Startup City."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: supporting
created: 2026-11-04T22:40:00Z
updated: 2026-11-05T00:10:00Z
---

# AI Skills Toolkit

Claude Code skills live in `.claude/skills/` at the repo root, so every teammate who opens the repo in Claude Code gets them as slash commands. Shared ground rules for AI sessions are in `CLAUDE.md`. All of them are adapted from Heramb's Startup City project and rewritten for this project's course bar, health-data rules and wiki. ^[inferred]

**Throughout: the AI advises and the team decides.** No skill commits, pushes, or changes the shared design by itself.

| Skill | Use it when | Writes to |
|---|---|---|
| `/decide` | An open decision needs settling (scope, watch API, study task…) | ADR in `20-decisions/`, then updates Open decisions |
| `/plan-review` | Before building from a plan, proposal outline or ADR draft | Amendments in the plan, plus a review record |
| `/algo` | Designing the break policy, baselines, abstain or escalate rules | Algorithm Card in `04-agent-engine/`; code in `research/algo/` |
| `/icp` | Rehearsing a review of anything a user sees | Persona ledgers in `03-users/personas/`; sessions in `25-journal/` |
| `/review` | Before committing: secrets, health data, wiki conventions, plan completion | Report only, plus typo-level fixes |
| `/security` | Privacy and security review of the design or the code | Report only; optionally a page in `25-journal/` |
| `/checkpoint` | Stopping for the day or handing over | `.claude/checkpoints/` (gitignored, per machine) |
| `/restore` | Starting a session: "what did we do last time?" | Read-only |
| `/prompt-motion` | Animated charts, the pipeline explainer, proposal clips, the demo video | `research/motion/` |
| `/uiux` | Talking to the product designer persona about flows, the card, consent, uncertainty display | Specs in `09-design/` |
| `/mockup` | Building 2–3 directions as real HTML, shot on every device and self-scored | `design/mockups/`; steals in `09-design/steal-library.md` |
| `/crit` | A scored crit of a screen or mockup with a blind second reviewer | `09-design/design-crit-log.md`; shots in `.crits/` (gitignored) |
| `/teardown` | How a public site does something (needs the REA MCP server; mechanism, never code) | Cards in the wiki; raw output in `.teardowns/` (gitignored) |
| `/polish` | Making a screen production-grade: `harden` (states, worst-case data) · `clarify` (copy) · `quieter` · `tells` (remove what looks generated) · `floor` (craft checks) | Edits the mockup it's pointed at |
| `/emil-design-eng` | Any UI animation or interaction detail (vendored, MIT, Emil Kowalski) | Advice and code |
| `/mobile-native` | Making a web screen feel native in iPhone Safari: safe areas, 100dvh, 16 px inputs, tap flash, sticky hover (vendored, MIT) | Code fixes |
| `/apple-design` | Apple's interface principles: springs, gestures, sheets, type, reduced motion and transparency (vendored, MIT) | Advice and code |
| `/review-animations` | A strict review of motion code, Before/After/Why, ending in block or approve (vendored, MIT; runs only when called) | Report only |

The method comes from Garry Tan's gstack (MIT) for decide, plan-review, checkpoint, restore, review and security, and from prompt-motion.com for prompt-motion.

## Design brief and stack

`design/PRODUCT.md` is the one-page design brief every design skill reads first: what it is, who, surface modes, the one question per screen, tone, hard rules, motion. Tool and library choices (adopted, maybe, skipped, and why) are in [[09-design/design-stack-and-resources|Design stack and resources]]. Licences for copied work are in `THIRD_PARTY_NOTICES.md`.

## Design QA tool

`node tools/qa/device-walk.mjs --url=<path> [--root=<folder>] [--devices=iphone,iphone-se,iphone-max,laptop,laptop-small] [--steps=<json>]` walks a local page per device and saves screenshots plus visible text. It runs automatic UI checks on every shot: bad text (NaN/undefined), sideways overflow, clipped text, tap targets, AA contrast, alt text, unnamed controls and tiny text. On iPhone sizes it also checks the viewport meta, disabled zoom, and inputs under 16 px. It's **Chrome emulating iPhones**, so check WebKit-only behaviour in Safari on the iOS Simulator. It needs Node 22+ and Chrome. See `tools/qa/steps-example.json`. `/crit`, `/mockup` and `/icp test` use it. Tested 2026-11-04 on a page with planted defects (all seven caught) and a clean page (no false alarms). ^[inferred]

## AI advisor seats (CEO, CTO, CMO, CSO, UIUX)

Five advisor seats are defined in `.claude/agents/ceo.md`, `cto.md`, `cmo.md`, `cso.md` and `uiux.md`. They are **roles with no personal names**. Each has a fictional background in which it lived the problem (an exhausted student or athlete) and worked in the industry, which gives it a point of view. Each also has sourced knowledge of the market, allied markets and case studies.

| Seat | Talk to it | Owns | Knowledge base |
|---|---|---|---|
| CEO | `/ceo`, chairs `/boardroom` | Focus to Dec 11, scope and cuts, risk, synthesis, after the course | Market map, casebook |
| CTO | `/cto` | Architecture, data access, model and LLM boundary, measurement, privacy architecture; checks technical claims | Science and tech evidence |
| CMO | `/cmo` | Positioning, the proposal and demo story, writeup framing, recruiting copy, go-to-market | Market map, casebook |
| CSO | `/cso` | Study task and protocol, power, pre-registration, consent, escalation and safety, bias; audits results and claims | Science and tech evidence §1/§3/§8, design evidence §4 |
| UIUX | `/uiux`, `/mockup`, `/crit` | Flows, every screen and state, uncertainty display, escalation, accessibility | Design evidence |

Knowledge bases: [[24-synthesis/market-map|Market map]], [[24-synthesis/casebook|Casebook]], [[12-research/science-and-tech-evidence|Science and tech evidence]], [[09-design/design-evidence|Design evidence]].

`/boardroom` runs a cross-lane question through 2–4 seats: independent memos, one anonymised cross-examination, a red team, and the CEO's synthesis. Protocol: [[13-team/exec-team|AI exec team]]. Tests: [[13-team/exec-evals|Exec seat evals]] and [[09-design/designer-evals|Designer evals]]. Design rubric: [[09-design/ui-ux-quality-bar|UI and UX quality bar]]. Adapted from Startup City's CEO, CTO and CMO, plus a new CSO for the study and safety, all rewritten for this product.

## Persona testers

`/icp` runs five synthetic testers defined in `.claude/agents/icp-1.md` … `icp-5.md`. See [[03-users/personas/icp-personas|ICP Personas]]. Subagents defined mid-session only register in the next session; until then, `/icp` runs them as general-purpose agents told to read the file.

## Related

- [[11-engineering/11-engineering|Engineering hub]] · [[20-decisions/20-decisions|Decisions]] · [[04-agent-engine/algorithm-book|Algorithm Book]] · [[03-users/personas/icp-personas|ICP Personas]]
