---
title: ICP Personas
category: 03-users
tags: [users, students, evaluation]
sources: [".claude/skills/icp/SKILL.md", ".claude/agents/icp-1.md"]
summary: "Five synthetic student and athlete testers run by /icp to rehearse reviews of the suggestion card, consent and slides before real classmates see them. Fiction, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: supporting
created: 2026-11-04T22:40:00Z
updated: 2026-11-05T00:10:00Z
---

# ICP Personas

Five **synthetic** target users, all US college students on iPhones, that the `/icp` skill runs in parallel to review or test anything a user would see. They give blunt, scored feedback, keep a ledger of past reviews, and check whether their earlier asks were fixed. Adapted from Startup City's persona panel. ^[inferred]

> [!warning] A rehearsal, never evidence
> The course rewards evaluation with **real** users (classmates count). These personas are for catching obvious problems before that. Their words never appear in the proposal, writeup or demo as a real person's, and they don't count toward the [[12-research/evaluation-plan|evaluation plan]].

## The panel

| Tag | Who | Covers |
|---|---|---|
| ICP_1 | Maya Okafor, pre-med sophomore | The core crammer: timing, exam crunch, anxiety from scores |
| ICP_2 | Diego Ramírez, D1 soccer player | The athlete audience: training load vs study fatigue, coach privacy |
| ICP_3 | Anika Sharma, MS CS student | Privacy-first and technical: collection, LLM boundary, calibration |
| ICP_4 | Jordan Lee, transfer student with ADHD | No wearable (laptop-only path), the small iPhone SE screen, no shaming |
| ICP_5 | Sam Whitaker, English senior | Non-technical reading, tone, and the escalation-to-a-human question |

Ledgers: [[03-users/personas/icp-1-maya-okafor|ICP_1]] · [[03-users/personas/icp-2-diego-ramirez|ICP_2]] · [[03-users/personas/icp-3-anika-sharma|ICP_3]] · [[03-users/personas/icp-4-jordan-lee|ICP_4]] · [[03-users/personas/icp-5-sam-whitaker|ICP_5]]

## Score sheet (1–10)

Clarity · Trust · Timing · Useful · Control · Feel · Come back. Anchors: 1–3 would turn it off · 4–5 worse than what I do now · 6–7 about the same · 8–9 clearly better · 10 would tell friends today. Plus three probabilities: still running in a week, would recommend, would consent to the data asked for.

## How to run it

`/icp <thing>` reviews a static file or idea · `/icp test <url>` tests a local build per device · `/icp diary 7 <what>` · `/icp ask <question>` · `/icp 3 <question>` for one persona. Sessions are saved to `25-journal/YYYY-MM-DD-icp-<what>.md`.

## Related

- [[03-users/03-users|Users hub]] · [[08-frontend/student-interface-and-feedback|Student interface]] · [[11-engineering/ai-skills|AI skills toolkit]]
