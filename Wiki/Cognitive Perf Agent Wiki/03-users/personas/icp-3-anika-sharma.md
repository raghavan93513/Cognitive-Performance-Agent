---
title: "ICP_3 — Anika Sharma"
category: 03-users
tags: [users, students, evaluation]
sources: [".claude/agents/icp-3.md"]
summary: "Synthetic tester ICP_3 (Anika Sharma) — profile, review ledger and open asks. Fiction: a rehearsal, never evidence."
base_confidence: 0.3
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: supporting
created: 2026-11-04T22:40:00Z
updated: 2026-11-05T13:00:00Z
---

# ICP_3 — Anika Sharma (she/her)

> [!warning] Synthetic persona
> Fiction written to rehearse reviews before real users see the product. Nothing here is user research, and no quote from it goes into the proposal, the writeup or the demo as a real person's words. See [[03-users/personas/icp-personas|ICP Personas]].

**Profile:** 24, international MS CS student; 3-hour coding stretches; iPhone 15 + Fitbit Charge; Linux ThinkPad; reads privacy policies.

**Pushes on:** What the collector records, the LLM boundary, deletion, calibrated confidence, technical honesty.

**Device in a test:** laptop 1440×900 + iphone 390×844

Full persona and rules: `.claude/agents/icp-3.md`.

## Reviews

The score line from each `/icp` session, newest last. Scale 1–10: Clarity · Trust · Timing · Useful · Control · Feel · Come back.

| Date | What was tested | Verdict | Scores | Overall | Week P · Recommend P · Consent P | One fix |
|---|---|---|---|---|---|---|
| 2026-11-05 | [[25-journal/2026-11-05-icp-island-forecast]] Island + Forecast card, round 3 (laptop + iPhone) | MEH | 7 · 4 · 5 · 4 · 5 · 7 · 3 | 4 | 0.20 · 0.10 · 0.35 | 'Keep going' must not flip the reason or call low sleep 'usual' |
| 2026-11-05 | [[25-journal/2026-11-05-icp-island-forecast-retest]] Island + Forecast re-test after top-four fixes (laptop + iPhone) | MEH | 8 · 5 · 5 · 4 · 5 · 7 · 3 | 5 (+1) | 0.20 · 0.10 · 0.40 | A 'Where this goes' screen: storage, LLM fields, retention, delete |
| 2026-11-05 | [[25-journal/2026-11-05-icp-island-forecast-retest2]] Island + Forecast re-test 2 after next-three fixes (laptop + iPhone) | MEH | 8 · 6 · 5 · 4 · 5 · 7 · 3 | 5 (=) | 0.20 · 0.10 · 0.45 | 'Where this goes' screen: storage, LLM fields, retention, delete |
| 2026-11-05 | [[25-journal/2026-11-05-icp-wearables]] Wearables: setup, sync states, Data sources (Fitbit, laptop + iPhone) | MEH | 8 · 6 · 5 · 4 · 6 · 7 · 3 | 5 (=) | 0.20 · 0.15 · 0.50 | Real Stored + Kept-for answers shown before 'Go to Google' |

## Open asks

Marked at the wearables test (2026-11-05). ✅ fixed · ◐ partly fixed · ⬜ not fixed · ❔ couldn't tell (not in this walk) · 🆕 new.

- ◐ partly fixed: Where data goes, the LLM boundary, deletion (screen exists; storage and retention are placeholders; Delete undefined)
- ◐ partly fixed: Linux collector and Fitbit (Fitbit connects; still 'this MacBook')
- ✅ fixed: Calendar and location as sources, with toggles
- ◐ partly fixed: Calendar scope ('Class only' exists, but 'Class + games' is the default)
- 🆕 new (worse): 'Only you see this' / 'Nothing is shared' contradict the disclosed AI writer and project team
- ⬜ not fixed: Real escalation links
- ✅ fixed: 'This looks wrong' → 'one task', learns
- ❔ couldn't tell: App switching while debugging is work
- ⬜ not fixed: Cut 'Walk, water, window'
- ⬜ not fixed: 'Early read' without-walk comparison
- ⬜ not fixed: Is the escalation flag logged?
- 🆕 new: Show storage, retention and AI provider before OAuth
- 🆕 new: Delete and Disconnect say exactly what happens, with a confirmation
- 🆕 new: Drop HRV until a reason uses it; show Google's exact scope strings
- 🆕 new: Name the real device model (Charge, not Air)

## Related

- [[03-users/personas/icp-personas|ICP Personas]] · [[03-users/03-users|Users hub]]
