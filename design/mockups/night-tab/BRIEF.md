# Night tab: brief (2026-11-14)

Asked for by Heramb: a new bottom-bar tab, next to Demo, that shows what Halftime knows about last night from his
decoded WHOOP 4.0. Bare minimum, nothing like WHOOP's or Oura's dashboards. Phone first; it must also sit right on the
laptop layout of `/app`. Fitbit Air comes later through the same night record. **Mockup only; nothing in the app changes.**
All numbers in the mockup are **sample data**.

## The screen's one question and one finding
- **Question:** "How did last night leave me, compared with my usual, and does it change today's breaks?"
- **Finding (largest text):** one sentence about sleep against the person's usual, followed by the action it drives
  ("So today Halftime will suggest your first break 10 minutes sooner"). The finding sits next to that action.

## What we keep (and how)
| Keep | Shown as | Why |
|---|---|---|
| Sleep last night | hours, a word against your usual, your usual range | the only signal with student evidence (Creswell 2023); the only one rule v0 uses |
| Resting heart rate | bpm, a word, your usual range | well validated; context only |
| HRV | ms, a word, your usual range | context only; never a break trigger |
| When you slept | bed → wake on a time line, with a one-tap "Is this right?" | Halftime guesses the window from heart rate; a tap keeps it honest |
| Where it came from | "WHOOP 4.0 · synced 7:42 am" + "How these are worked out" | sources visible (rule 1) |
| "Not enough data" | a calm state with the reason and what still works | a designed state (rule 2) |

Words beside each number: **usual · shorter / longer than usual · lower / higher than usual · learning (3 of 7 nights) ·
not enough data**. No colours as verdicts, no scores, no rings.

## What we cut
Scores (readiness, sleep score, strain), stages, stress, SpO2, calories, temperature, breathing rate (kept silent, later),
steps (after the motion decode), streaks, trends charts. History of nights stays in the History tab later, not here.

## The three seats
- **UIUX:** one sentence, three rows, one picture of the night. Lead with words; the picture is the signature, the rows are
  the evidence. Every state looks calm and equal; "not enough data" is never styled as an error. Tab name: **Night**
  (plain, says what it holds; "Body" is vaguer, "Recovery" is WHOOP's word).
- **CTO:** the WHOOP is read by Chrome on the laptop (iPhone Safari has no Bluetooth). For the phone to show last night,
  the laptop must send the **nine-field night record** (not raw beats) to our server under the person's account. That
  is a data-collection change: until the team agrees, the phone shows the "sync on your laptop" state and the laptop
  shows the full tab. Values come from one night calculator with a method version.
- **CSO:** show uncertainty in words; no comparison words before 7 valid nights; never one-night alarms; heart numbers
  explicitly "don't change your breaks"; consent text must name the night record before it ever leaves the laptop.

## States (one file, `?state=`)
`ok` (short night, the common case) · `usual` (nothing off) · `confirm` (first morning: "Is this when you slept?") ·
`learning` (3 of 7 nights) · `nodata` (worn 2 h 10 min) · `phone` (phone, not yet synced from the laptop).

## Steals (mechanism only)
- Apple Watch Vitals: a "typical for you" band; quiet unless more than one thing is off. *(opened, design-evidence.md)*
- Oura Readiness: states the learning period and abstains until then. *(opened, design-evidence.md)*
- Weather apps: today's value drawn against the "normal" range for the date. *(described)*
- Patient portals (Zikmund-Fisher 2018): a range with a labelled anchor calms worry about near-normal results. *(opened)*
- Transit apps: one next action next to the status. *(described)*
Anti-steals: WHOOP's green/yellow/red recovery, Oura's 0–100 scores, rings, streaks.

## Directions
- **A · "The night, drawn"**: the finding, then the night itself (last night's sleep bar under your usual sleep bar on
  one clock, with the heart-rate line across it and the lowest point marked), then the three rows.
- **B · "Three lines"**: the finding, then three rows, each a sentence plus a small "your usual" band with a dot. No chart.

## Decision and build (2026-11-14)
Heramb picked **A with B's sentences** (CEO and CMO both leaned to A). Built into `/app` the same day:
`site/assets/night-tab.js`, `site/assets/night.js`, `site/assets/whoop4.js`; see `tools/site/README.md` ("The Night tab").
