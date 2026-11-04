---
name: crit
description: Run a scored UI/UX crit of a Cognitive Performance Agent screen, flow, mockup, storyboard or slide, with an independent blind second review. The designer captures fixed device shots, runs the automatic UI checks, scores the U1–U8 rubric with cited shots, writes "what makes it a 10", grades AI slop A–F and checks the taste log; then a fresh-context reviewer scores the same shots without seeing those scores, and the gap is logged. Use when the user types /crit, or asks to review, critique, audit or rate a screen, a mockup, the suggestion card, onboarding, or the proposal's interface slide.
---

# /crit: a scored UI crit with a blind check

The designer (`.claude/agents/uiux.md`) does the crit; a blind reviewer checks her; you record both. Vault: `Wiki/Cognitive Perf Agent Wiki/` (`W/`). The rubric below is the same one in `W/09-design/ui-ux-quality-bar.md`; if they differ, the wiki page wins and this file gets fixed.

## 1. Frame and capture
- State the subject (a mockup in `design/mockups/<slug>/`, a local build URL, a storyboard image, a slide), what it's for (proposal artifact? a spec sign-off?) and the states it should cover (suggestion, not enough data, snoozed, escalate, consent…).
- **Capture** into `.crits/<YYYY-MM-DD>-<slug>/` (gitignored):
  ```
  node tools/qa/device-walk.mjs --url=<path or http url> --out=.crits/<date>-<slug> --devices=iphone,laptop [--steps=<steps.json>] [--root=<folder to serve>]
  ```
  `walk.md` lists every frame, its visible text and the **automatic UI check results** (bad text like NaN/undefined, sideways overflow, clipped text, tap targets under 44 px, low contrast, images without alt, unnamed buttons, text under 12 px). Add `--devices=iphone-se,iphone-max,laptop-small` for the small and large ends. The tool is Chrome emulating iPhones: for a final check open the page in **Safari on the iOS Simulator** (localhost works) and note anything WebKit shows differently.
- Images or slides with nothing to run: put the files in the crit folder and list them.
- **Fix every ✗ the checks report first** (or list them as findings if it isn't ours to fix). Don't spend the designer's time on what a script catches.

## 2. The designer's crit
Run the designer (subagent `uiux`, or a general-purpose agent whose prompt starts "Read `<repo>/.claude/agents/uiux.md`; its body is your system prompt; follow it exactly"). Ask her to:
- **look at every shot** (Read the image files) and the check results;
- score U1–U8 (below) **with a cited shot for each**, and write her self-score **before anything else**;
- run **the 10 loop**: for each criterion under 5, "what makes it a 5" as concrete changes (a size, a word, a state, a position). The **overall = the lowest criterion**, never the average. Any 1 or 2 is a blocker;
- grade **AI slop** apart, A–F (the full dated list is in `/polish` under *tells*): centred-everything, purple/blue gradients, glow cards, bento grids, 3-icon feature rows, emoji as design, stock brain or heartbeat art, a chat bubble as the whole UI, "Unlock your potential", a lone score in a ring, uniform bubbly radius. Below B is a blocker;
- check the **Taste log** in `W/09-design/design-crit-log.md`: team-stated rows never fade; inferred rows weigh ×0.95 a week and go stale after 12 weeks. If the subject goes against a strong row, flag it ("update the log, or a one-off?");
- list the top 5 fixes ranked by gain per effort, and the one that matters most;
- write the crit to `.crits/<date>-<slug>/crit.md` and return it.

## 3. Blind review (independent)
Start a **fresh** general-purpose agent. It gets only: the subject's purpose (one paragraph, user terms), the rubric table below, the shot paths, and `walk.md`. It does **not** get the designer's scores, reasoning or fixes. It scores U1–U8 with a cited shot each, grades slop, and returns a table. It must not write files.

## 4. Record
- Delta per criterion (designer − blind). A delta > 1 is flagged; 2 flagged crits in the designer's last 5 is a **calibration alarm**: tell the user her self-scores can't be trusted yet.
- Add a row to the **Crit log** table in `W/09-design/design-crit-log.md` (date · subject · designer overall · blind overall · flagged criteria · slop grade · top fix). Save the full crit as `W/25-journal/YYYY-MM-DD-crit-<slug>.md` only if the user wants it kept (shots stay in `.crits/`; copy at most 2 key shots into `W/attachments/` if they're needed in the wiki and contain only synthetic data).
- Show the user the key shot(s) and the top fixes. When the user picks or rejects a direction, add a Taste log row (team-stated).
- One line in `W/log.md`.

## The rubric (1–5, anchored: 1 = would mislead or lose the student · 3 = works but forgettable · 5 = a classmate gets it in five seconds and trusts it)
| | Criterion | 5 looks like |
|---|---|---|
| U1 | **Five-second clarity** | What it's suggesting and what to tap is obvious from the first screen |
| U2 | **Grounded** | The reason is in plain words; the source records are one tap away; data is real or labelled synthetic, never hardcoded behind a "live" look |
| U3 | **Honest uncertainty** | Confidence shown in words or a range; "not enough data" is a designed state; no false precision |
| U4 | **Calm and in control** | Arrives once, at a sensible moment; snooze, decline and pause are obvious; no streaks, guilt or nagging; what's collected is visible |
| U5 | **Wellness, not medicine** | No diagnosis words or verdict colours; the escalate-to-a-person state exists and is kind |
| U6 | **Hierarchy and craft** | One decision per screen; the eye lands on the right thing first; type scale, spacing and alignment are deliberate |
| U7 | **Accessible** | AA contrast, 44 px targets, meaning never by colour alone, labelled controls, reduced motion respected |
| U8 | **Fits every device** | Works on iPhone SE (375×667), iPhone (390×844), Pro Max (430×932), 1440×900 and 1366×768 with no overflow, clipping or hidden essentials; respects the notch and home indicator |

*Adapted from Startup City's /crit and the landing rubric (the 10 loop and slop grade come from gstack, MIT, Garry Tan).*
