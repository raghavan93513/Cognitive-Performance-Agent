---
title: Steal Library
category: 09-design
tags: [frontend, synthesis, reference]
sources: [".claude/skills/mockup/SKILL.md", ".claude/skills/teardown/SKILL.md"]
summary: "12 Steal Cards checked against public sources (researched), plus the ~50-product study list and anti-steals. Detail lives in the 9 design studies."
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: supporting
created: 2026-11-04T23:00:00Z
updated: 2026-11-05T02:00:00Z
---

# Steal Library

**Steal the mechanism, never the look, code, assets or words.** `/mockup` raids at least four genres, two of them outside health and fitness, and records each find here. `/teardown steal <url>` adds cards backed by evidence. Use at most three steals per screen.

## Card format

```
### S-<nn> <Source> — <mechanism in a few words>
Source:        <name, URL, genre, date seen>
Mechanism:     <one verb-led line: "shows a range, not a number">
Why it works:  <the psychology or craft, one line>
Our translation: <one sentence: how it serves our student>
Where:         <which of our screens and states>
Cost:          S / M / L
Score:         fit 1–5 · surprise 1–5 · buildable 1–5
Seen:          described < researched (docs, store pages, reviews; cited) < gallery < opened (used the live product) < torn down (Evidence id)
```

## Genres to raid ^[inferred]

Patient portals and lab results · sleep and recovery apps · weather forecasts (uncertainty every day) · finance apps for beginners (risk made legible) · transit and wayfinding (one next action) · meditation and focus tools (calm timing) · newspaper data graphics · games (feedback without guilt) · government services (plain-language forms) · consent flows done well.

## Cards

Cards S-01 to S-12 were written from general knowledge on 2026-11-05. The same day, the UIUX seat's nine parallel studies checked them against public sources (docs, store pages, reviews, papers), so every card is now **`Seen: researched`** with its corrections applied. None has been used hands-on yet: open the product before a card drives a final design decision. Full detail, sources and caveats are in the [[09-design/studies/design-studies|design studies]]. ^[inferred]

### S-01 Google Flights — "typical" against the route's history
- **Mechanism:** says whether today's price is low, typical or high against the route's past prices, and shows the insight only when there's enough history.
- **Why it works:** a judgement and its basis in one glance, with no number to decode.
- **Our translation:** "In your usual range": a neutral bar of the student's *own* 28-night range with today as a dot, one labelled "worth a look" line, and no H/L flags or red gradient. Their baseline is the route's history; ours is personal.
- **Where:** signal rows; history. · **Cost:** S · **Score:** fit 5 · surprise 4 · buildable 5 · **Seen:** researched (the bar's exact look is unverified) → [[09-design/studies/uncertainty-and-evidence|Uncertainty study]]

### S-02 Apple Watch Vitals — show all, notify only when two agree
- **Mechanism:** shows each overnight measure against your own typical range once 7 nights exist, and lists everyday possible causes. It notifies only the next morning, and only when two or more measures are out of range.
- **Why it works:** everything is visible, but interruptions are rare, so they carry weight.
- **Our translation:** the card can mention any unusual signal, but a push needs two signals that agree, and no health values ever appear in a push or on the lock screen.
- **Where:** reason line; notification rule; not-enough-data (the 7-night learning period). · **Cost:** M · **Score:** fit 5 · surprise 3 · buildable 4 · **Seen:** researched → [[09-design/studies/apple-platform|Apple platform study]]

### S-03 MyChart — value, reference range, message the care team
- **Mechanism:** shows each result beside its reference range, often with H/L flags; results can arrive before a clinician sees them, and the next step is a message to the care team. The plain-language reassurance comes from health-system help pages, not the result screen.
- **Why it works:** people see their own numbers, and the next step is a person.
- **Our translation:** the escalate state, "Your sleep has been short for 2 weeks. That's worth talking to someone about", with campus counselling or a doctor one tap away. Use a harm-anchor line, not an H/L flag.
- **Where:** escalate (open decision #12). · **Cost:** S · **Score:** fit 5 · surprise 3 · buildable 5 · **Seen:** researched → [[09-design/studies/uncertainty-and-evidence|Uncertainty study]]

### S-04 Perplexity — numbered sources beside the claim
- **Mechanism:** numbered inline citations, one tap to the source. Newer builds reportedly show domain chips with a preview first [described].
- **Why it works:** evidence stays visible but out of the way. Caveat: a citation doesn't guarantee the source supports the claim; AI search was wrong on over 60% of queries in a 2025 Tow Center test.
- **Our translation:** each reason clause carries a marker that opens its timestamped record at three depths (marker → record sheet → full history), with a "This looks wrong" option.
- **Where:** reason line. · **Cost:** S · **Score:** fit 5 · surprise 4 · buildable 5 · **Seen:** researched → [[09-design/studies/uncertainty-and-evidence|Uncertainty study]]

### S-05 Apple Weather — a sentence over a chart, only when it applies
- **Mechanism:** a one-line next-hour statement above an intensity chart, shown only when rain is possible and only where data supports it (5 countries). Its bars are unlabelled, which confuses people.
- **Why it works:** a forecast is a familiar way to accept uncertainty.
- **Our translation:** phrase suggestions as forecasts, with confidence as **a word plus a count** ("Fairly sure: a walk helped in 4 of your last 6 sessions like this"). Don't claim "focus will dip" unless the model predicts that; the CTO checks it against the [[04-agent-engine/performance-model|performance model]].
- **Where:** headline and confidence line. · **Cost:** S · **Score:** fit 4 · surprise 4 · buildable 5 · **Seen:** researched → [[09-design/studies/uncertainty-and-evidence|Uncertainty study]]

### S-06 Garmin Training Readiness — factors with status words, held back until learned
- **Mechanism:** lists six factors behind a 1–100 readiness level (five colour bands), each with its own status word. It holds a factor back ("No Status", about 3 weeks for HRV) until its baseline exists. Weighting is unpublished.
- **Why it works:** a surprising verdict becomes checkable, but hidden weights still leave "why?" open.
- **Our translation:** no score. Three short factor rows (session length, app switching, last night's sleep), each with a word status, its record and "still learning" when not ready, ranked by how much it moved this suggestion.
- **Where:** "Why this suggestion?"; not-enough-data. · **Cost:** S · **Score:** fit 4 · surprise 2 · buildable 5 · **Seen:** researched → [[09-design/studies/wearables-recovery|Wearables study]]

### S-07 Rise Science — the competitor to stay different from
- **Mechanism:** 14-night sleep debt plus a modelled energy curve (grogginess, morning peak, afternoon dip, evening peak, melatonin window), recalculated each morning and pushed as 20+ timed habit reminders. It has a 0–100 Energy Potential score, phase times to the minute and no ranges. It was a 2023 Apple Design Award finalist.
- **Why it works:** it turns last night into a plan for today.
- **Our translation:** don't predict a minute-exact day curve; irregular college schedules break it. React to the current session, show ranges, and say "not enough data" when unsure.
- **Where:** positioning; [[24-synthesis/competitive-landscape|competitive landscape]]. · **Cost:** — · **Score:** fit 3 · surprise 2 · buildable 3 · **Seen:** researched → [[09-design/studies/indie-health-apps|Indie apps study]]

### S-08 Gentler Streak — a moving band and a pause status
- **Mechanism:** an Activity Path band set by recent effort (it lowers after hard days), plus a sick/injured/vacation status that hides the path without breaking the streak. Rest can be the top suggestion. It keeps a streak but redefines it. Awards: 2024 Apple Design Award winner (Social Impact), 2022 Apple Watch App of the Year.
- **Why it works (hypothesis):** removing guilt may sustain use; there's no public retention data.
- **Our translation:** compare this session to "your usual range", and offer an "Exam week / Sick / Away" pause as the gentle step before "talk to someone". We still keep no streaks.
- **Where:** tone; history; a pause control. · **Cost:** S · **Score:** fit 5 · surprise 3 · buildable 5 · **Seen:** researched → [[09-design/studies/indie-health-apps|Indie apps study]]

### S-09 BeReal — one shared moment, not a countdown
- **Mechanism:** one shared daily prompt (the same moment for everyone in a region) with a 2-minute window, and your friends' posts stay locked until you post. Late posts and Bonus BeReals mean it's no longer strictly once a day. Daily users fell sharply after 2022 (Apptopia estimates; BeReal disputes them).
- **Why it works:** a shared moment plus a reciprocity gate made a ritual, and the countdown also made it feel like a chore.
- **Our translation:** once per session window, never repeated, **no countdown, no "late" label**.
- **Where:** notification and timing rules. · **Cost:** S · **Score:** fit 4 · surprise 3 · buildable 5 · **Seen:** researched → [[09-design/studies/student-social-and-recaps|Student apps study]]

### S-10 Citymapper — compared options, then one live step
- **Mechanism:** "Get me home" is a one-tap shortcut that opens *compared routes*. GO then gives one live next step with a lock-screen notification and a single alert type.
- **Why it works:** real choices up front, then one step at a time while moving.
- **Our translation:** the card shows one suggested action with the alternatives at equal weight (an easy "Keep going" works best, per one sec's PNAS 2023 study). Once a break is accepted: one live countdown and one wake-up at the end.
- **Where:** card hierarchy; break timer. · **Cost:** S · **Score:** fit 4 · surprise 2 · buildable 5 · **Seen:** researched → [[09-design/studies/navigation-money-sport|Navigation study]] · [[09-design/studies/focus-and-planning|focus study]]

### S-11 Live Activities — native phase only
- **Mechanism:** a live countdown on the Lock Screen and in the Dynamic Island. It needs a **native app** (ActivityKit), runs up to 8 hours plus 4 more on the Lock Screen, has one control, and allows no health data.
- **Why it works:** native to iPhone and glanceable.
- **Our translation:** **Safari v1:** an in-page countdown with Screen Wake Lock and one Web Push at the end (Web Push only works after the student adds the app to their Home Screen). **Native phase:** a Live Activity with no health values and one "End break" control.
- **Where:** accepted break. · **Cost:** L · **Score:** fit 5 · surprise 5 · buildable 2 (v1) · **Seen:** researched → [[09-design/studies/apple-platform|Apple platform study]]

### S-12 Spotify Wrapped — the shareable recap
- **Mechanism:** a once-a-year, full-screen story recap with per-card sharing. Its pull comes from rarity and self-recognition: Spotify reported about 200M engaged users in roughly 24 hours in 2025. The 2024 edition was panned for cutting personal stories.
- **Why it works:** people see themselves, and it spreads by itself.
- **Our translation:** a private recap built only from the student's own records; test weekly against monthly, since rarity is part of the pull. The share version carries no health values (Wordle-style: share the pattern, not the data).
- **Where:** recap; showcase demo. · **Cost:** M · **Score:** fit 4 · surprise 4 · buildable 4 · **Seen:** researched → [[09-design/studies/student-social-and-recaps|Student apps study]] · [[09-design/studies/calm-mind-and-games|calm study]]

## Study list (2026-11-05)

Every product below was studied in depth on 2026-11-05. See the [[09-design/studies/design-studies|design studies]] for screens, mechanisms, style, tone, user sentiment, what to steal and what to avoid, with sources. Promote the ones that earn it to cards. ^[inferred]

**Direct space: wearables and health (study them to stand apart)**
- **WHOOP:** recovery with its contributors. Avoid the lone score ring.
- **Oura:** contributors under each score, and a premium calm tone. Avoid morning-score dread.
- **Fitbit Daily Readiness:** holds back until it has learned your baseline (our "not enough data").
- **Bevel, Athlytic:** small iOS teams making strain and recovery feel native.
- **Apple Health and Fitness:** highlights written as plain sentences. Avoid ring-closing guilt.
- **Pokémon Sleep:** a sleep tracker students come back to. Don't make ours a game.

**Our audience's world: US college students on iPhones**
- **Instagram, Snapchat:** thumb-reach layouts, swipe-to-dismiss, bottom sheets.
- **Notion, Notion Calendar, Structured:** a calm day timeline with tasks as blocks.
- **Duolingo:** try it before signing up. Avoid its streak guilt.
- **Canvas:** the tool they all tolerate. Clearing it is the floor.
- **one sec, Opal:** a gentle pause before you open something, not a block.
- **Forest:** a focus session that feels like something you made.
- **Endel:** ambient sound that adapts to time and heart rate.

**Calm and mental health (tone)**
- **How We Feel:** a mood grid with precise words; a 3-second check-in.
- **Finch:** gentle, shame-free self-care. Avoid the cartoon pet.
- **Headspace, Calm:** breathing animations and kind microcopy. Avoid illustration-heavy branding.
- **Apple Mindfulness (Watch):** a breathing animation timed with haptics, for a 1-minute break.

**Other sectors**

| Sector | Study | Borrow |
|---|---|---|
| Personal finance | Copilot Money, Apple Card, Monzo | "On track" pacing against your own plan, judgement-free |
| Travel | Google Flights, Hopper | Range bars and honest predictions |
| Navigation | Citymapper, Transit, Google Maps | ETA ranges and one next step |
| Weather | Apple Weather, CARROT Weather | Everyday uncertainty; personality only when the person opts in |
| Data journalism | NYT "You Draw It", The Pudding | Guess first, then reveal (for the weekly recap) |
| Data publishing | Our World in Data | A Sources tab on every chart |
| AI answers | Perplexity, ChatGPT search | Inline citations |
| Government | GOV.UK Design System | Plain-language forms, the model for consent |
| Privacy | Apple privacy labels, App Tracking Transparency prompt, Signal | Consent understood at a glance, no pressure |
| Developer tools | Linear, Raycast, Things 3, Arc | Restraint, speed, motion with a purpose |
| Calm games | Alto's Odyssey (Zen mode), Monument Valley, Wordle | No-score mode; once a day and done; a share that leaks no data |
| Sports | Strava, TrainingPeaks | Effort compared with your own history |
| Luxury and retail | Aesop, Muji, Apple product pages | Calm type and space; scroll storytelling for the showcase page |

**Where to look:** Mobbin (free tier, in a browser), Apple Design Award winners, App Store screenshots and **one-star reviews** of WHOOP and Oura (a list of what not to do), and Dribbble and Behance for inspiration only, never committed.

**What we could own:** Google Flights' "your usual range" plus Perplexity's visible sources plus BeReal's once-a-day restraint, delivered as an iPhone Live Activity. For example: *"Short walk? You've been going 2 h 40 min on 5 h sleep. Fairly sure."*, with the sources one tap away. ^[inferred]

## Anti-steals (what everyone copies that we must not)

- **The lone readiness ring:** a single 0–100 score with no defined outcome. Our model doesn't produce one, and a score can make a tired student feel worse. → [[04-agent-engine/performance-model|Performance model]] ^[inferred]
- **Red/green verdicts on the body:** they read as a diagnosis. ^[inferred]
- **Streak flames and badges:** a broken streak is how people quit; it's guilt, not help. ^[inferred]
- **Notification spam:** a prompt that repeats until you obey. ^[inferred]
- **Cartoon mascots at serious moments:** consent, deletion and "talk to someone" stay plain and kind. ^[inferred]
- **Purple gradient "AI wellness" branding:** the category's default look. ^[inferred]

## Related

- [[09-design/09-design|Design hub]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]] · [[24-synthesis/competitive-landscape|Competitive landscape]]
