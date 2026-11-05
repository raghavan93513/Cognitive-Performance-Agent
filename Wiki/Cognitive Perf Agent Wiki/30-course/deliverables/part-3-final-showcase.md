---
title: "Part 3 — Final Demo and Showcase (Dec 11)"
category: 30-course
tags: [course, deliverable]
aliases: [final demo, showcase, poster]
sources: ["https://personal-health-agent.github.io/project-details/"]
summary: Week 14 poster-and-demo showcase — a 1-min lightning pitch, a live demo with a recorded fallback, and a poster. Implementation, demo and writeup are each 15%.
provenance:
  extracted: 0.85
  inferred: 0.15
  ambiguous: 0.0
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Part 3 — Final Demo and Showcase

**When:** Friday **Dec 11** (week 14) · Rehearsed at the **week 13 integration checkpoint and mock demo** (Dec 4) · Guests from industry, academia and health AI are planned.

## Format

1. **One-minute lightning pitch.** Its one goal is to make people walk to your station: the problem, the user, and the single most compelling thing the assistant does. Rehearse it out loud.
2. **Rotating poster and demo stations.**

## Checklist and weights

- [ ] A working system behind the demo — **implementation, 15%**
- [ ] A live demo **with a recorded fallback** — **demo, 15%**
- [ ] A poster or visual summary, including the architecture diagram
- [ ] A short technical writeup — **15%**. Due Wed Dec 16 (tentative). → [[30-course/deliverables/final-writeup|Writeup]]

## Demo honestly

- Show what the system **actually does**. Label **real data vs mocked**. Claim no clinical authority the system doesn't have.
- Live demos fail at showcases. A team with a recorded fallback loses 30 seconds; a team without one loses the demo.
- Demo and implementation are graded **separately**. A slick walkthrough over hardcoded data won't carry a missing system, and a rough demo of a genuinely working pipeline scores better than it feels.

## For us ^[inferred]

- Lightning-pitch hook candidate: "It noticed I'd been switching apps every 40 seconds for 20 minutes after a 5-hour night, and suggested a walk. My next quiz score went back up."
  - **⚠ Overclaim, flagged 2026-11-05 by the CEO, CMO and CSO seats.** "Score went back up" implies a performance gain. Our evidence shows breaks reduce fatigue, but the effect on demanding cognitive tasks is null (d = −.09; [[12-research/science-and-tech-evidence|Science and tech evidence]] §1), and a pilot can't show it. Suggested replacement, for the team to lock: "It noticed I'd been switching apps every 40 seconds for 20 minutes after a 5-hour night, and suggested a walk, with its reasons and how sure it was. When it didn't have enough data, it said so." Results are quoted only with their n, after the CSO's claims audit.
- Demo path: a live study session, then a suggestion with its reason and sources, then a follow-up task. Fallback: a screen recording of the same path on synthetic data.
- Poster: the 5-stage diagram from [[07-backend/system-architecture|System architecture]] and the results from the [[12-research/evaluation-plan|evaluation plan]].

## Related

- [[30-course/project-requirements|Project requirements]] · [[30-course/weeks/week-14-final-showcase|Week 14]] · [[30-course/weeks/week-13-privacy-safety-ethics-integration|Week 13]]
