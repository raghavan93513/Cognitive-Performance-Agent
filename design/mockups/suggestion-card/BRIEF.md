# Suggestion card: design brief and art direction (UIUX seat, 2026-11-05)

Mockups for the team to pick a direction before the **Nov 6 proposal**. The words come from the CMO seat (`COPY.md`). Everything uses **sample data**. These are proposals; the team decides.

## 1. Brief

- **Screen:** the suggestion card, plus its states, in iPhone Safari (375–430 px wide), one-handed.
- **Person:** a US college student on an iPhone, mid-study at a library desk or between practice and study hall. Tired, focused, doesn't want to be interrupted. Tested against all five ICP personas: Maya (cramming), Diego (athlete), Anika (privacy), Jordan (no watch, iPhone SE), Sam (1 am, a month of bad sleep).
- **Moment:** they've just finished a problem set section (a natural pause), and the card arrives once.
- **One question:** *"What should I do right now, and why?"*
- **One finding:** the concrete reason, e.g. "2 h 40 min straight, and you slept 5 h". It sits next to the buttons it drives.
- **States (all in one file via `?state=`):**
  - `walk`, `keep`, `break`: the three suggestions
  - `why`: the sources sheet open
  - `nodata`: learning period
  - `laptoponly`: no watch
  - `running`: break countdown
  - `snoozed`: snoozed or declined
  - `escalate`: talk to someone
  - `firstrun`: first launch

## 2. Steals used (max 3 per screen; all from the Steal Library and the design studies)

- **S-10 Citymapper:** one suggested action with alternatives at equal weight. "Keep going" is as easy as the break; the one sec study (PNAS 2023) found an easy dismiss was the strongest lever.
- **S-04 Perplexity:** each reason clause carries a small marker that opens its timestamped record.
- **S-01 Google Flights:** "in your usual range" as a neutral bar of the student's *own* range, used in the Why sheet, never on the card face.
- **Background patterns:**
  - Vitals' rule: speak up only when signals agree.
  - Gentler Streak's pause status: Exam week / Sick / Away.
  - BeReal's restraint: once, no countdown, no "late".

**Anti-steals:**
- a lone score ring
- red/green body verdicts
- streaks
- a countdown pressure timer on the suggestion
- gauges on body measures (the FDA's 2025 letter to WHOOP)

## 3. Contrarian check

1. **Obvious:** a dashboard of four signal tiles with a big "Take a break" card on top.
2. **Inverse:** hide every number; one sentence; numbers only if asked.
3. **Wrong genre:** transit/weather. The session as a line you're travelling on, with "now" and the next good stop marked, phrased as a forecast.
4. **Illogical:** the card asks *you* first ("How's it going?") before it suggests. **Rejected:** it adds a step at the worst moment, and asking about feelings strays into inferring emotion.

Kept: a refined version of the obvious (A), the wrong genre (B) and the inverse (C).

## 4. Art Direction Cards

### A. "Clear Card": one card, one decision
- **Concept:** a calm card that shows its work.
- **Signature frame:** the card, with the reason line's source markers and the **dot row of "how sure"** (4 filled of 6).
- **Type:** system UI (SF Pro on iPhone; it respects Dynamic Type habits), tabular figures for numbers. No display face.
- **Eye order:** suggestion headline → reason line → two equal buttons → how sure.
- **Colour:** warm off-white ground, near-black ink. One teal accent that **means "the suggested action"** and nothing else.
- **Uncertainty:** a word plus a count ("Fairly sure · 4 of 6 times"), with frequency dots.
- **Motion:** the card rises 8 px and fades in once (200 ms ease-out), with an opacity-only fallback.
- **Banned:** gradients, glow, icon tiles, score rings, red/green.

### B. "Forecast": your session as a line
- **Concept:** a forecast for the next half hour.
- **Signature frame:** a **session line**, a horizontal track of this session so far with a "now" marker, the suggested break as a gap on the line, and the next class or practice as a known stop.
- **Type:** system UI plus a monospace for times.
- **Eye order:** forecast sentence → session line → buttons → how sure.
- **Colour:** cool off-white ground, ink, one ocean-blue accent that **means "now"**.
- **Uncertainty:** worded as a forecast ("likely to help: fairly sure").
- **Motion:** the "now" marker draws in, once.
- **Banned:** a weather-icon costume, rain metaphors, charts without labels.
- **Note:** "focus is likely to dip" may overclaim what the model predicts. The copy says "a short walk now is likely to help", and the CTO must confirm the model can support even that.

### C. "Quiet": words first, numbers only when asked
- **Concept:** one sentence, said kindly, at 1 am.
- **Signature frame:** a single large sentence on a dark, true-neutral ground, with two plain choices under it. The numbers live one tap away.
- **Type:** a serif display face for the one sentence (Instrument Serif, Google Fonts) plus system UI for everything else.
- **Eye order:** sentence → choices → "why" link.
- **Colour:** true neutral near-black (not navy), soft white, one warm amber accent that **means "the suggestion"**. Dark because the scene is a dim library or a bedroom at night; a light mode would follow.
- **Uncertainty:** a single word in the sentence ("probably"), with the count in the Why sheet.
- **Motion:** none on the card except a fade. Breathing only during a break.
- **Banned:** neon, glow, emoji, numbers on the face.

## 5. What every direction must pass

- The quality bar's U1–U8.
- The signature tests: one-glance, record, thin-data, 1 am, no-watch, coach, thumb, grey.
- `device-walk` checks clean on the iPhone SE, standard iPhone and Pro Max.
- WebKit-only behaviour still has to be checked in Safari on the iOS Simulator.
