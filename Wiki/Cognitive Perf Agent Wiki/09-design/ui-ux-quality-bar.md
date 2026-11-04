---
title: UI and UX Quality Bar
category: 09-design
tags: [frontend, ethics, evaluation, requirements]
sources: [30-course/project-requirements.md, 08-frontend/student-interface-and-feedback.md, "Startup City: Product/UI/UI and UX Quality Bar"]
summary: "The checklist and U1–U8 rubric every screen, mockup and slide passes: grounded, honest uncertainty, calm, wellness not medicine, accessible, fits phone and laptop."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: core
created: 2026-11-04T23:00:00Z
updated: 2026-11-05T00:10:00Z
---

# UI and UX Quality Bar

Apply this to every screen, mockup, storyboard and interface slide. `/crit` and `/mockup` score against the rubric below. `tools/qa/device-walk.mjs` checks the mechanical items automatically on every screenshot. The bar comes from the course grading criteria in [[30-course/project-requirements|Project requirements]] and the design in [[08-frontend/student-interface-and-feedback|Student interface]]. Its structure is adapted from Heramb's Startup City. ^[inferred]

## The rubric (1–5 per criterion; overall = the lowest; any 1 or 2 blocks)

| | Criterion | 5 looks like |
|---|---|---|
| U1 | Five-second clarity | What it suggests and what to tap is obvious from the first screen |
| U2 | Grounded | The reason is in plain words; the source records are one tap away; data is real or labelled synthetic |
| U3 | Honest uncertainty | Confidence in words or a range; "not enough data" is a designed state; no false precision |
| U4 | Calm and in control | Arrives once at a sensible moment; snooze, decline and pause are obvious; no streaks or guilt; what's collected is visible |
| U5 | Wellness, not medicine | No diagnosis words or verdict colours; a kind escalate-to-a-person state exists |
| U6 | Hierarchy and craft | One decision per screen; the eye lands on the right thing first; a deliberate type scale and spacing |
| U7 | Accessible | AA contrast, 44 px targets, never colour alone, labelled controls, reduced motion respected |
| U8 | Fits every device | Works on iPhone SE (375×667), iPhone (390×844), Pro Max (430×932), 1440×900 and 1366×768 with no overflow, clipping or hidden essentials |

An **AI-slop grade** (A–F) is given separately, and below B blocks. Tells: centred everything, purple/blue gradients, glow cards, bento grids, 3-icon feature rows, emoji as design, stock brain or heartbeat art, a chat bubble as the whole UI, a lone score in a ring, "Unlock your potential".

The one-page brief that every design skill reads first is `design/PRODUCT.md`. The full list of tells (habits that make a UI look generated) is in `/polish tells`. Motion follows Emil Kowalski's rules (`/emil-design-eng`, `/review-animations`). Tools and libraries are in [[09-design/design-stack-and-resources|Design stack and resources]].

## Checklist

### Every suggestion
- [ ] The action (continue / short walk / break) and the **reason** in one plain sentence. ^[inferred]
- [ ] Sources one tap away: which records, from which device, how recent.
- [ ] Confidence shown in words and/or a range, never as a bare percentage with decimals.
- [ ] Accept, snooze and decline are equally easy. Declining is a valid answer, not a failure.
- [ ] Manual break controls still work when the system says "not enough data".

### States (a mockup that shows only the happy path is half a mockup)
- [ ] First run and consent · suggestion · not enough data · snoozed · declined · escalate to a person · watch disconnected / laptop-only · offline · error.

### Wellness framing and safety
- [ ] No diagnosis words ("fatigue disorder", "abnormal", "risk"), and no red/green verdicts on the body.
- [ ] Persistent poor sleep or signs of distress lead to a kind pointer to a person (campus counseling, a doctor), not a break suggestion. Open decision #12 sets the trigger. → [[24-synthesis/open-decisions|Open decisions]]
- [ ] Synthetic data is labelled "Sample data" on screen. No polished UI over hardcoded data (a course must-not).

### Control and privacy
- [ ] What's being collected, from which source, is visible from the main screen, with pause and stop. → [[10-trust-safety/privacy-and-consent|Privacy and consent]]
- [ ] Consent is per source and per purpose, in plain words.

### Mechanical (checked by `device-walk.mjs` on every shot)
- [ ] No `NaN`, `undefined`, `null` or `[object …]` text.
- [ ] No sideways overflow; no clipped text.
- [ ] Tap targets ≥ 44 px on phones (under 24 px is a fail).
- [ ] Text contrast ≥ 4.5:1 (3:1 for large text). The tool only checks solid backgrounds.
- [ ] Images have alt text; every button and link has a name.
- [ ] No visible text under 12 px.
- [ ] iPhone: a mobile viewport meta, zoom never disabled, inputs ≥ 16 px (iOS Safari zooms into smaller ones).

### By hand (the tool can't check these)
- [ ] **In Safari on the iOS Simulator or a real iPhone** (the tool is Chrome): no content under the notch or home indicator (`viewport-fit=cover` + safe-area insets), no `100vh` jump with the URL bar, no sticky hover after a tap, no grey tap flash, and it reads well with a larger iOS text size. See `/mobile-native`.
- [ ] Keyboard: every action reachable with Tab, Enter and Esc; focus is visible.
- [ ] Meaning is never carried by colour alone.
- [ ] `prefers-reduced-motion` gets a still or a simple fade.
- [ ] UI motion: ease-out, under 300 ms, transform and opacity only, never from `scale(0)`, nothing on frequent or keyboard actions, hover gated to `(hover: hover)`.
- [ ] Charts are drawn to scale (lie factor ≈ 1), with axes and units visible.
- [ ] Copy is at reading grade ≤ 8 with no unexplained jargon (HRV is explained in one sentence, or not shown).

### Evidence
- [ ] Update [[09-design/screen-gallery|Screen gallery]] when a screen changes (synthetic data only).

## Related

- [[09-design/09-design|Design hub]] · [[09-design/design-crit-log|Design crit log]] · [[09-design/steal-library|Steal library]] · [[03-users/ux-research-plan|UX research plan]]
