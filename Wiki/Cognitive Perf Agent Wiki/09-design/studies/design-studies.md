---
title: Design Studies
category: 09-design
tags: [frontend, reference, synthesis, moc]
sources: ["09-design/steal-library.md"]
summary: "Index of the UIUX seat's 9 deep studies of ~60 products from the Steal Library (2026-11-05), plus the rules they agree on, screen by screen. Read before designing."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: core
created: 2026-11-05T02:10:00Z
updated: 2026-11-05T02:10:00Z
---

# Design Studies

On 2026-11-05 the UIUX seat studied every product in the [[09-design/steal-library|Steal Library]] in depth, using nine parallel research passes. Each study covers:
- what the product is and who uses it
- its key screens and flows
- the mechanisms behind it
- visual style, copy and tone
- how it handles numbers, uncertainty, evidence, privacy and escalation
- what users love and complain about
- what we steal and what we avoid

Every claim is cited. The studies also corrected all 12 Steal Cards, which are now marked `Seen: researched`.

> [!warning] What "researched" means
> Official docs, help centres, App Store pages, design write-ups, papers, journalism and some live public web pages were read. **Nothing was used hands-on, and no accounts were made.** Several sites blocked fetching and the shared web-search budget ran out near the end, so Reddit sentiment is thin and some details are marked `[unverified]` in each study. Before a detail drives a final design, open the real product. ^[inferred]

## The nine studies

| Study | Products | Sources |
|---|---|---|
| Wearables and recovery scores | WHOOP, Oura, Fitbit Daily Readiness, Garmin | 38 |
| Apple platform patterns | Vitals, Health, Fitness, Mindfulness, Live Activities, privacy labels and ATT, plus web vs native on iPhone | 37 |
| Independent health apps | Rise, Gentler Streak, Bevel, Athlytic, Pokémon Sleep | 42 |
| Student social apps and recaps | Instagram, Snapchat, BeReal, Spotify Wrapped, Duolingo, Canvas | 43 |
| Focus and planning tools | Notion, Notion Calendar, Structured, one sec, Opal, Forest, Endel | 36 |
| Calm apps and calm games | How We Feel, Finch, Headspace, Calm, Alto's Odyssey, Monument Valley, Wordle | 51 |
| Showing uncertainty and evidence | Google Flights, Hopper, Apple Weather, CARROT, MyChart, Perplexity, ChatGPT search, Our World in Data, NYT "You Draw It", The Pudding | 42 |
| Navigation, money and sport | Citymapper, Transit, Google Maps, Copilot Money, Apple Card, Monzo, Strava, TrainingPeaks | 68 |
| Craft, forms, privacy and style | GOV.UK Design System, Signal, Linear, Raycast, Things 3, Arc, Aesop, Muji, Apple product pages | 48 |

Open them: [[09-design/studies/wearables-recovery|Wearables]] · [[09-design/studies/apple-platform|Apple platform]] · [[09-design/studies/indie-health-apps|Independent health apps]] · [[09-design/studies/student-social-and-recaps|Student social and recaps]] · [[09-design/studies/focus-and-planning|Focus and planning]] · [[09-design/studies/calm-mind-and-games|Calm apps and games]] · [[09-design/studies/uncertainty-and-evidence|Uncertainty and evidence]] · [[09-design/studies/navigation-money-sport|Navigation, money and sport]] · [[09-design/studies/craft-forms-privacy-style|Craft, forms, privacy and style]]

## What the studies agree on, screen by screen ^[inferred]

Rules that appear in two or more studies. Each links to where the evidence lives.

### The suggestion card
- **Make "keep going" as easy as the break.** In one sec's controlled study (PNAS 2023), an easy dismiss option had the strongest effect, and the persuasive message alone had none. Our reason line earns trust; it doesn't persuade. → [[09-design/studies/focus-and-planning|Focus]]
- **One suggested action, alternatives at equal weight.** Citymapper opens compared routes and GO gives one live step. → [[09-design/studies/navigation-money-sport|Navigation]]
- **Arrive at a seam, once.** Use the student's own stated plan and calendar edges, never a repeat, no countdown, no "late" label (BeReal's countdown made it feel like a chore). → [[09-design/studies/student-social-and-recaps|Student apps]] · [[09-design/studies/focus-and-planning|Focus]]

### Reason and sources
- **Every factor links to its record.** WHOOP, Oura, Fitbit and Garmin all list factors, but none links a factor to its source or says how much it counted. Rank ours by how much each moved this suggestion; each opens a timestamped record at three depths, with "This looks wrong". → [[09-design/studies/wearables-recovery|Wearables]] · [[09-design/studies/uncertainty-and-evidence|Uncertainty]]
- **A citation isn't proof.** AI search tools were wrong on over 60% of test queries (Tow Center 2025), so show the record itself, not just a link. → [[09-design/studies/uncertainty-and-evidence|Uncertainty]]
- **Specific, never grading.** Athletes rejected AI summaries that judged single workouts by numbers in one fixed tone (a 2026 study of r/Strava threads). → [[09-design/studies/navigation-money-sport|Navigation]]

### Uncertainty and "your usual range"
- **Confidence is a word plus a count:** "Fairly sure: a walk helped in 4 of your last 6 sessions like this." Advice paired with an uncertainty estimate beat advice alone. → [[09-design/studies/uncertainty-and-evidence|Uncertainty]]
- **A band, not a score.** Use a neutral bar of the student's *own* range with today as a dot and one labelled "worth a look" line. No H/L flags, red gradients or green/orange/red bands. Strava, Copilot, Gentler Streak and Vitals all compare against your own recent history. → [[09-design/studies/uncertainty-and-evidence|Uncertainty]] · [[09-design/studies/navigation-money-sport|Navigation]] · [[09-design/studies/indie-health-apps|Independent apps]]
- **The wellness line is drawn by design, not a disclaimer.** The FDA's July 2025 warning letter to WHOOP cited a colour-coded target-range gauge as evidence of a diagnostic device, disclaimer or not. Never put gauges on body measures. → [[09-design/studies/wearables-recovery|Wearables]]

### Not enough data (the learning period)
- **Say it plainly and count down.** Fitbit takes 7 nights, Vitals 7 nights, Oura up to 2 weeks, Garmin HRV about 3 weeks. Name what's missing and what's still known. Never show an unexplained "No score", and never use typical values without saying so (Opal's mistake). → [[09-design/studies/wearables-recovery|Wearables]] · [[09-design/studies/apple-platform|Apple]] · [[09-design/studies/focus-and-planning|Focus]]

### Escalate and pause
- **Persistence before escalation.** Oura's Symptom Radar needs 7 of 14 nights and several signals moving together. Vitals notifies only when two or more agree. → [[09-design/studies/wearables-recovery|Wearables]] · [[09-design/studies/apple-platform|Apple]]
- **A ladder, not a cliff:** first a pause ("Exam week / Sick / Away", as in Gentler Streak's status and Oura's Rest Mode), then "talk to someone". That option is always reachable and never ends the session (Headspace's AI ends it, which feels like being shown out). → [[09-design/studies/indie-health-apps|Independent apps]] · [[09-design/studies/calm-mind-and-games|Calm]]

### Break timer
- **Safari v1:** an in-page countdown with Screen Wake Lock, plus one Web Push at the end (only after the student adds the app to their Home Screen). iOS Safari has no vibration API.
- **Native phase:** a Transit GO-style Live Activity. It's silent while running, wakes the phone once at the end, ends itself, and shows no health values.
- → [[09-design/studies/apple-platform|Apple]] · [[09-design/studies/navigation-money-sport|Navigation]]

### Consent, privacy and onboarding
- **Value before asking.** Show a "Sample data" card before any account or permission screen (Duolingo's try-first). → [[09-design/studies/student-social-and-recaps|Student apps]]
- **Consent built like GOV.UK question pages:**
  - one Yes / No page per source, nothing pre-selected
  - a "Check your answers" page
  - accept and reject buttons of equal size and weight
  - settings modelled on GOV.UK's cookies page

  → [[09-design/studies/craft-forms-privacy-style|Craft and privacy]]
- **Privacy by absence:** no third-party scripts, so no cookie banner, plus a "What we can't see" list. Athlytic's App Store label says "Data Not Collected", while Rise, Bevel and Pokémon Sleep list tracking identifiers. → [[09-design/studies/craft-forms-privacy-style|Craft and privacy]] · [[09-design/studies/indie-health-apps|Independent apps]]
- **Athletes:** no location data, no social feed, no aggregate map and no coach view. Strava's heatmap exposed homes and leaders' locations. → [[09-design/studies/navigation-money-sport|Navigation]]

### History and recap
- **Totals, not chains.** A broken streak lowers later use, and the drop is worse when people blame themselves (Silverman, JCR 2023). Breaks show as refills on a day timeline (Structured), never as losses (Forest's dying tree). → [[09-design/studies/student-social-and-recaps|Student apps]] · [[09-design/studies/focus-and-planning|Focus]]
- **A recap people want to share:**
  - Wrapped-style tap-through cards built only from the student's own records
  - the shared version is Wordle-style: the pattern of breaks, never health values
  - test weekly against monthly, since rarity drives Wrapped's pull

  → [[09-design/studies/student-social-and-recaps|Student apps]] · [[09-design/studies/calm-mind-and-games|Calm]]
- **A "quiet card" option:** suggestion and reason in words, numbers one tap away. Alto's Zen Mode came from players using the game to cope with anxiety. → [[09-design/studies/calm-mind-and-games|Calm]]

### Motion and endings
- **Restraint:** Linear's site uses 0 s hover-in and 100–250 ms transitions, and Things cuts any animation that gets tiresome. This matches `/emil-design-eng`. → [[09-design/studies/craft-forms-privacy-style|Craft]]
- **Graceful endings:** Arc's farewell page (a dated timeline, export, deletion within 30 days) is a template for our end-of-pilot and "Delete my data" screens. → [[09-design/studies/craft-forms-privacy-style|Craft]]

### Positioning
- **We are not Rise.** Rise predicts a minute-exact daily energy curve with no ranges, which irregular college schedules break. We read the current session, show ranges, and say when we don't know. → [[09-design/studies/indie-health-apps|Independent apps]]

## Open gaps (to close hands-on)

- Visual details (colours, layouts) for most apps came from descriptions; they need screenshots or hands-on use.
- Thin Reddit and college-student sentiment, because the search budget ran out.
- Can we honestly claim "Data Not Collected" on our App Store and consent screens? That's for the CTO.
- Does the model actually predict a near-term dip, or only a suggestion? That limits how S-05's forecast phrasing can be used. → [[04-agent-engine/performance-model|Performance model]]
- Does web push on iPhone support action buttons? This affects the break-end push.

## Related

- [[09-design/09-design|Design hub]] · [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]]
