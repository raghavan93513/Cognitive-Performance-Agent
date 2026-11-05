---
title: "Boardroom: lead with late night, and the Dec 11 moments scope"
category: 25-journal
tags: [journal, team, decision, boardroom]
sources: ["13-team/exec-team.md", "25-journal/2026-11-05-icp-moments.md", "13-team/pre-build-briefing.md", "13-team/cso-steal-file.md", "design/mockups/landing/BRIEF.md"]
summary: "CEO, CMO, CTO and CSO all recommend leading with late night. The reason is the evidence (sleep loss harms attention, rated strong; breaks don't help cognitive work, d = −.09), not the persona votes. They agree on: a typed first commitment with no calendar OAuth; a no-watch card from night one; app switching dropped as night evidence; T8 escalation to a named service; the pilot outcome re-aimed to minutes until the session ends. Still open: how prominent the 1 am link is (a value call); when to build After practice; whether late night is real users' moment (a fact to test). Chair recommends Option 1 (night only, ~35–40 h; P = 0.70 by Dec 4), After practice gated on Dec 1, and the red team's three tests by Nov 20. Three decisions for the team."
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T23:00:00Z
updated: 2026-11-05T23:00:00Z
---

# Boardroom: lead with late night, and the Dec 11 moments scope

**Seats:** CEO (chair), CMO, CTO, CSO. **Clerk:** the session's AI. **Asked by:** Heramb, 2026-11-05 ("Run a boardroom"). **The seats advise; the team decides.**

## Framing (step 0)

- **Question:** should Halftime lead with the late-night moment ("Stop for tonight?") instead of the afternoon walk, and which of the moments demo's proposed modes (late night, after practice) do we build for Dec 11? The related asks:
  - **(a)** Anchor the night to tomorrow's first commitment.
  - **(b)** A no-watch card from night one.
  - **(c)** Study apps counted as one task.
  - **(d)** A named counselor.
- **The decision it feeds:**
  - the primary moment and the demo story;
  - the Dec 4 / Dec 11 build scope;
  - the Nov 6 proposal's example.
- **Who decides:** the team (Heramb, Raghavan, Alexa, Yulee).
- **Deadlines:** Nov 6 proposal · Nov 7 IRB email (boardroom on privacy) · Nov 11 written draft · Dec 4 checkpoint · Dec 11 demo.
- **Pages:**
  - [[25-journal/2026-11-05-icp-moments]]
  - [[25-journal/2026-11-05-icp-cmo-three-steps]]
  - [[25-journal/2026-11-05-boardroom-privacy-blanks]]
  - `design/mockups/landing/BRIEF.md` r4
  - [[12-research/science-and-tech-evidence]]
  - [[13-team/pre-build-briefing]] R8
- **Caveat given to every seat:** the personas' backstories include late-night study, so their picks may reflect how they were written.

## Round 1: independent memos

Memo A = CEO · Memo B = CMO · Memo C = CTO · Memo D = CSO. These are the texts as sent anonymised to round 2, with only identity references neutralised. Each memo's header line is in the clerk's notes.

### Memo A: CEO

**TL;DR.** Lead with late night. The sources back it; the persona votes don't. Build one moment end to end for Dec 11: late night, including a no-watch path that works from night one. After practice stays a proposed mode and doesn't get built. For tomorrow's proposal, change the lead scenario but keep the architecture.

**Context.** Pages read: the frame, hot.md, open-decisions, exec-team, the icp-moments, privacy-blanks and three-steps journals, PRODUCT.md, landing BRIEF round 4, science-and-tech-evidence §1 and §8, casebook A3/C8, project-requirements.

**Recommendation.** Two-way door. Cost about 25–35 team-hours `[assumption]`.
1. **Late night becomes the lead moment and the demo story.** "Stop for tonight" is the existing *break* action at night, so the action set and the model stay the same (CTO to confirm).
2. **Only late night gets built end to end by Dec 4**, on labelled synthetic data and with the watch-off fallback. After practice gets one slide and one mockup card. It gets built only if the Dec 4 checkpoint passes with a week to spare. Afternoon stays the engine's default break during a session, but it stops being the story.
3. **Nov 6 proposal:** change the scenario slide only. No ICP numbers go on any slide.

**Rulings:**
- **(a) Yes, but the student types it in; no calendar connection.** The student enters tomorrow's first commitment (a time and a label). A calendar connection is a new data source, which makes it a team call under the privacy boardroom, and it costs hours we don't have. About 3 h.
- **(b) Yes, and it's core, not an extra.** Working out bedtime from the typed commitment needs no learning period. We're planning for about half of students having no tracker. The card says "Not sure yet", because this is arithmetic, not a prediction.
- **(c) My view:** the student marks which apps are study apps, and switching between them never counts as night evidence on its own. Nothing in our sources links app switching to fatigue.
- **(d) My view:** yes to the escalation card, because escalation is listed as "Not designed yet" on the graded criteria. Name a service, not a person. Keep the name a placeholder until Columbia Health confirms it (Nov 20), and show 988. Use FDA wellness wording (Jan 2026): no thresholds, no disease names.

**Evidence:**
- **Sleep:** sleep loss harms attention, the harm builds up, and people stop noticing it. Rated strong (Lim & Dinges 2010; Van Dongen 2003). Evidence that breaks improve demanding cognitive work is null (Albulescu 2022, cognitive d = −.09). So late night is our most honest claim, and the afternoon walk is our weakest (science §1).
- **ACHA 2025:** 41.9% of undergraduates sleep under 7 h on weeknights.
- **Study task:** PVT-B, our lead study task, stays sensitive to sleep loss (§8). The story and the measurement loop line up ^[inferred].
- **ICP votes:** 4 of 5 picked late night, and the first I'D USE IT came from that moment. These are synthetic testers whose backstories include late-night study. Judgement: zero weight as evidence, some weight as a hypothesis.

**Case it rhymes with.** Rise Science (A3) sold one outcome tied to sleep, not a dashboard. What's different: we have no proven sleep outcome and five weeks. Also, Kaur 2020's 77% figure is about daytime break timing, so it doesn't work as our benchmark at night.

**Confidence:**
- P = 0.65 that the late-night path (watch, no-watch and escalation card) runs end to end on synthetic data by Dec 4.
- P = 0.35 if we also build After practice.

**What would change my mind:**
- Fewer than 3 of 5 real classmates interviewed by Nov 20 say they study past midnight at least weekly.
- Course staff ruling out evening data collection.

**Strongest counter-argument.** Late night pulls us toward sleep advice, which sits closer to the wellness line. The demo would also need a simulated 1 am clock. The afternoon break is the safer and more measurable pilot moment: classmates will do a PVT at 2 pm, not at 1 am.

**Pre-mortem and kill rule.** Pre-mortem: it's Dec 12 and we built three moments, none of them end to end. Kill rule: if late night isn't running on synthetic data by Dec 1, we demo only the in-session break.

**Decisions for the team.** If there's no answer, nothing changes and afternoon stays the lead.
1. Make late night the lead in the Nov 6 proposal.
2. Build only late night by Dec 4 and defer After practice.
3. Use a typed first commitment instead of a calendar connection.

### Memo B: CMO

**TL;DR.** Yes, lead with late night. The reason is the real evidence (sleep is the strong lever, and breaks don't help cognitive work), not four synthetic picks. Build and demo one moment fully: late night. After practice stays out of anything public until it's scoped. On (a) to (d): yes, with the conditions below.

**Context.** I read the framing, hot.md, open-decisions, icp-moments, icp-cmo-three-steps, privacy-blanks, the landing BRIEF and demo script, PRODUCT.md, COPY.md, science evidence §1 and §3, and the casebook.

**Recommendation** (all two-way doors):
- **Nov 6 (about 2 h):** keep the pitch general and make the late-night card its example.
  - Pitch: "Halftime tells you when to keep going and when to stop for tonight. It shows why, and says when it doesn't know."
  - Audience: "students who study at a laptop past 10 pm, with or without a tracker."
- **The Dec 11 demo, in order:**
  1. "Keep going for now."
  2. "Stop for tonight? Leaves you 8 h before your 9:30 class."
  3. The student taps "20 more min" and it replies "I'll ask once more at 2:00, then stay quiet."
  4. A no-watch night, where it says "Not sure yet."
  5. After 12 of 14 short nights, it offers a named person.
  6. The honest limits.
- **Landing page (about 2 h, after the team scopes it):** make Late night the default. Remove the red "past 1:30" and the imposed "Bed by 1:30".
- **(a) Anchor to tomorrow's first commitment: yes.** It's the line that landed, and it's arithmetic, not physiology. Read only the event's start time and kind (class, practice or shift), never its title.
- **(b) A no-watch card from night one: yes.** It makes "works without a watch" true, and it fixes the joining line where a tester quit.
- **(c) Study apps counted as one task: yes.** Three testers read app switching, the night card's only evidence, as their actual work. Lead the reason with time and calendar today.
- **(d) A named counselor: yes.** It's the "escalates to a human" moment the graders look for. It triggers only after many short nights, never one. The name stays a placeholder until it's confirmed.

**Evidence:**
- Sleep loss harms attention cumulatively, and people stop noticing (Lim & Dinges 2010; Van Dongen 2003). Graded strong.
- Micro-breaks don't help cognitive tasks (d = −.09; Albulescu 2022).
- ACHA 2025 (n = 47,194): 41.9% of undergraduates sleep under 7 h on weeknights.
- Okano 2019: the night before didn't predict grades. So we make no "protects your exam" claims.
- *Judgement:* the testers' backstories include late-night study, which biases the 4 of 5. Treat it as a hypothesis.

**Case it rhymes with.** Rise Science (A3) sold an outcome tied to sleep, not data. One nightly decision can be our daily moment, as the morning score is Oura's (A2). The difference is that ours interrupts. That makes "then stay quiet" the brand, and Duolingo-style guilt (A16) the risk.

**Confidence:**
- MEDIUM (0.6) that late night is the better pitch frame.
- LOW to MEDIUM (0.45) that it's the true primary moment.

**What would change my mind:**
- Mom Test interviews with 6–8 classmates. If fewer than 3 studied past midnight last week, night stops being the lead.
- Night mode plus the calendar can't ship by Dec 4.

**Strongest counter-argument.** The line that landed is calendar arithmetic, not our model, so graders may read the model as decorative. And a 1 am prompt comes close to a late-night ping.

**Decisions:**
1. Team: change the Nov 6 example tonight?
2. Hours to ship, by Dec 4, night mode, the start-time-only calendar and app grouping.
3. The counselor step, and whether "leaves you 8 h" still counts as wellness wording.

### Memo C: CTO

**1. TL;DR.** Yes, lead with late night, and build it as one mode: an "end of session" card tied to the next commitment. It's the easiest card to build honestly, because the math is clock plus calendar and needs no learning period. The weak part is the evidence it uses: app switching is not a fatigue signal. Build After practice as a variant of the same mode, not a separate one. Rulings: (a) yes, as one typed time, (b) yes, (c) yes, (d) the link yes, the trigger no.

**2. Context.** I read:
- `CLAUDE.md`, `exec-team.md`, `hot.md`, `open-decisions.md`
- the ICP moments test and the privacy-blanks boardroom
- the landing demo `<script>`, `BRIEF.md` r4, `PRODUCT.md`, `COPY.md` §9
- evidence §0, §1, §3, §6; pre-build briefing R8 and §6; casebook C

**3. Recommendation.**
- **Night rule (Algorithm Card via `/algo`):**
  - Inputs: session minutes from the laptop, the time now, and hours left before the next commitment.
  - It asks at most twice a night: the first ask, then "once more", then quiet.
  - The second ask comes at the next laptop idle of 30 s or more, and no later than the stated time. That's breakpoint delivery, and it answers a tester's ask.
  - About 8 h, including a labelled demo clock so it can be shown in daytime.
- **(a)** For Dec 11, the user types tomorrow's first commitment, or we import one .ics file. No calendar OAuth. Only "minutes to the first commitment" is stored. About 4 h. Collecting calendar data from real people is one-way and a team call.
- **(b)** The night-one card uses only facts: the clock, the commitment and session time. The confidence word tracks which inputs exist. No "your usual" until there are 14 nights. About 2 h.
- **(c)** Count switches only between categories, and let the user mark a set of study apps that count as one task. Do this on the device, with titles dropped. Until it's validated, drop switching as the night card's evidence. About 4 h.
- **(d)** "Talk to someone" is a static link on every night card, with the name kept in config. It stays a placeholder until the P4 check (Nov 20). No trigger: a no-watch user can never meet T8, and sleep alone never escalates (R8). About 1 h.
- **After practice:** a calendar tag on the same rule. It changes the break type ("sit") and the anchor (tomorrow's 6 am practice). About 3 h.
- **Delivery:** at 1 am the laptop is where the user is, so the card goes there. Phone push is a stretch goal (about 8 h). The Island and Live Activity need a native app, so don't show them as Safari features.
- **Total:** about 22 core hours, plus about 8 for phone push `[assumption]`.
- **Doors:** changing the page's lead is two-way. The demo build is two-way.

**4. Evidence.**
- Sleep loss harms attention, and people stop noticing (Lim & Dinges 2010; Van Dongen 2003): strong.
- Breaks don't improve demanding cognitive work (d = −.09, Albulescu 2022), so the afternoon walk is our weakest claim.
- Okano 2019 found the night before didn't predict grades. So say "leaves you 8 h", never "better tomorrow".
- Breakpoint delivery cuts frustration (Iqbal & Bailey 2008).
- Judgement: "4 of your last 6 late nights" can't exist in a 2-week pilot with a 14-night learning period. Strike it until the data exists. iOS web push on a home-screen app is unverified ^[inferred].

**5. Case it rhymes with.** C4, Garmin Stress: a proxy tracked the wrong thing. Our app switching tracks the work, not fatigue. What's different: the night card doesn't need the proxy, so we can drop it.

**6. Confidence.**
- **0.8** that the night card runs end to end on synthetic data plus the Mac collector by Dec 4.
- **0.3** that phone delivery works by Dec 11.
- **MEDIUM** that late night is really the users' moment, because the personas were written with late nights in their stories.

**7. What would change my mind.**
- Course staff rule out commitment data.
- The Mac collector slips past Dec 1.
- Real classmates in a 5-second test pick Afternoon.

**8. Strongest counter-argument.** It's bedtime arithmetic that iOS Sleep Schedule already does, and graders may read it as "no model". My answer: rules come before ML by our own ground rule. The model and abstain logic show in the confidence tiers and the honest no-watch state. A second counter: late-night sessions give few decision points per person, which weakens a within-person study.

**9. Needs from others / decisions for the team.**
1. **Team:** approve commitment data as one typed time or one .ics import, with no calendar OAuth.
2. Are 2 weeks of late-night sessions enough decision points for the protocol? And the counselor name (P4).
3. Make the laptop the primary night surface. Strike "last 6 late nights" and the Island-on-Safari claims.

### Memo D: CSO

**1. TL;DR.** Yes, lead with late night. It rests on our strongest evidence (sleep), while the afternoon walk rests on our weakest (breaks don't improve demanding cognitive work). The persona result isn't evidence, and switching the lead changes the pilot's primary outcome. Build late night. Build After practice only as a calendar-only variant, with no athlete claims. (a)–(d): yes, with conditions.

**2. Context.** hot, open-decisions, icp-moments, privacy-blanks boardroom, science-and-tech-evidence §1/§3/§8, design-evidence §4, casebook, COPY.md §9, the landing demo's script.

**3. Recommendation.**
- **Proposal claims:** keep "leaves you 8 h before your 9:30 class" (it's arithmetic about time in bed). Keep "sleep loss harms attention, and people stop noticing" (sourced). Cut "better grades tomorrow" and "improves performance".
- **Re-aim the pilot (#3):** micro-randomise card vs no card at each late-night decision point. The proximal outcome is the minutes until the laptop session ends, which needs no watch. Sleep onset and morning PVT-B are exploratory. Escalation resources are never randomised. This stays a two-way door until we pre-register.
- **(a)** Yes, if the team approves calendar data limited to "minutes to tomorrow's first commitment". Practice events reach no staff (B9).
- **(b)** Yes. Clock plus calendar needs no learning period. Label it a simple rule, show "Not sure yet", and drop "your last 6 nights" until that history exists.
- **(c)** Yes, and go further: app switching has never been validated as a fatigue signal. Stop citing it as "Fairly sure" evidence until it's tested against the study task. ADHD students are the likely false-alarm subgroup.
- **(d)** Yes, as a named *service* (campus counseling), not a person. It appears only after persistence, e.g. under 6 h on ≥ 9 of 14 nights `[assumption]`, and the student can move when it shows. It can't fire without a watch, because late laptop use isn't sleep. Phone numbers stay placeholders until Columbia Health confirms them.
- **Cost:** about 10 team-hours `[assumption]`: protocol 3, a false-alarm test of the escalation on synthetic nights 5, claims audit 2.

**4. Evidence.**
- Breaks on cognitive tasks: d = −.09 (Albulescu 2022).
- Sleep loss: lapses g = −.78 (Lim & Dinges 2010), and people stop noticing it (Van Dongen 2003).
- Sleep across the month tracked grades, but the night before didn't (Okano 2019, n = 88). So we make no claim about tomorrow's exam.
- Only 2.4% of Wysa users in crisis called a helpline. So the card offers a ladder of options, not a single number.
- ^[inferred] The night card is arithmetic anyone can check. The afternoon card is a prediction we haven't validated.

**5. Case it rhymes with.** C2 Epic Sepsis: alerts that fire on noise get ignored, so measure our false-alarm rate first. C7 HeartSteps: prompts lose effect over time, and "ask once more, then stay quiet" is the right cap.

**6. Confidence.** P = 0.7 that late night is the more defensible lead. P = 0.35 that real classmates prefer it as strongly, because the personas were written with late-night backstories.

**7. What would change my mind.**
- Real classmates, asked before they see the demo, don't pick late night.
- The escalation trigger shows a high false-alarm rate on synthetic nights.
- The IRB requires night-time monitoring we can't staff.

**8. Strongest counter.** Night is the hardest time to measure. Nobody will do a PVT-B at 1 am, there's no sleep outcome without a watch, and each person has few late nights in a two-week pilot.

**9. Decisions for the team.**
1. Approve calendar data (minutes to tomorrow's first commitment only).
2. Re-aim the primary outcome before Nov 11.
3. The IRB email (due Nov 7) names the night-time prompts and says nobody monitors in real time.

## Round 2: anonymised cross-examination (names restored here)
### CEO, round 2
**(1) Where I agree.** We lead with late night because of the sleep and break evidence, and the persona votes count as a hypothesis only. We use one typed commitment time with no calendar OAuth, and the no-watch card works from night one. App switching comes out of the night card's evidence. Escalation names a service, not a person. "Your last 6 nights" goes until that history exists.
**(2) Where I most disagree: Memo C's (d), "a static link, no trigger".** The best case for it: a no-watch user can never trip a trigger, sleep alone shouldn't escalate (R8), and a link that's always there is cheap and safe. My objection is that the course grades whether the agent "knows when to escalate to a human". A link that is always on doesn't show the agent knowing anything. So keep the link, and also add a trigger that fires only after many short nights, for watch users only. Memo D's false-alarm test on synthetic nights has to pass before we demo it.
**(3) Changed? Partly, for two new arguments:**
- **From Memo D:** moving the lead to late night also changes the pilot's primary outcome. Minutes until the laptop session ends needs no watch, and a 1 am PVT-B won't happen. I'm adding this as a team decision before Nov 11, and it replaces my calendar-vs-typed item, which all four memos agree on.
- **From Memo C:** After practice is roughly a 3-hour calendar-tag variant of the same night rule, not a separate mode. It still waits behind the night card, but the gate is now "the night card runs by Dec 1", not "a week to spare". No athlete claims.

My P stays at 0.65 for the night path by Dec 4.

### CMO, round 2
**(1) Where I agree.** All four seats lead with late night because of the sleep evidence, not the persona votes (Albulescu d = −.09; Lim & Dinges; Okano rules out "tomorrow's exam" claims). We also agree to build one moment end to end, and that a no-watch card on night one is core. App switching stops being the night card's evidence (Memos C and D: never validated; C4 Garmin is the case it rhymes with). On (d), it's a named *service*, not a person.
**(2) Where I disagree most: Memo C puts a "Talk to someone" link on every night card, with no trigger.** The steelman: a link can't false-alarm, it works without a watch, and sleep alone never escalates (R8). But the course grades whether the assistant *knows when* to escalate. A link that is always there is a footer, not escalation. And a counseling link on every 1 am card tells a tired student they look like a problem. It fails the 1 am test. Keep the link in the menu, and show the card only when short nights persist (Memo D's version).
**(3) Did my recommendation change?** Yes, on two points, each because of a new argument:
- **(a):** I now back a typed first commitment (or one .ics import) instead of connecting a calendar account. Memos A and C point out that a calendar connection is a new data source, which is one-way and a team call. The line that landed is the arithmetic, and a typed time keeps it.
- **"4 of your last 6 late nights" goes.** It can't exist in a two-week pilot with a 14-night learning period (Memo C).

The lead itself is unchanged.

### CTO, round 2
**1. Where I agree.**
- Lead with late night, because sleep is our strongest evidence and the walk is our weakest.
- The commitment is one typed or start-time-only value. No calendar OAuth, and never the event title.
- Drop app switching as evidence on the night card.
- The no-watch card works from night one and says "Not sure yet".
- Name a counseling service, not a person, kept as a placeholder until Columbia Health confirms it.
- Strike "your last 6 late nights".

**2. My main disagreement: B's "after 12 of 14 short nights" and D's "≥ 9 of 14 under 6 h" triggers.**
- **Steelman:** graders look for escalation, and a sleep-only rule is simple and easy to demo.
- **My objection:** our seeded simulation (R8) found that "≥ 9 of 14 under 6 h" flags 7.4% of students, and 11% of healthy short sleepers.
- **What to do instead:** sleep alone never escalates. Use T8 (a 14-night mean under 5.5 h plus at least 2 low check-ins), and keep "Talk to someone" on every card.
- **For the demo:** fire it on a labelled synthetic student.

**3. Did my recommendation change?** Yes, slightly, for a new argument.
- **The argument (D):** make the primary outcome the minutes until the laptop session ends, micro-randomised at each late-night decision point. This needs no watch and no PVT at 1 am. It answers the power counter-argument I raised in round 1.
- **The change:** I add a randomisation log and a session-end timestamp per decision point, about 3 h. The total is now about 25 h.
- **What stays:** After practice as a calendar-tag variant of the same rule. A's warning about building three separate modes doesn't apply to a tag.

### CSO, round 2
**(1) Where I agree.** All three memos match me on four points:
- Lead with late night because of the sleep evidence, not the persona votes.
- Make no "better tomorrow" claims (Okano 2019).
- (b) is arithmetic, so the card says "Not sure yet".
- Drop app switching as night evidence until it's validated.

I also accept the typed first commitment, or a single .ics import, instead of calendar OAuth (A, C). It collects less data, and that suits consent better.

**(2) Main disagreement: Memo C's "(d) link yes, trigger no".** The steelman:
- Sleep alone over-flags people.
- A no-watch user can never meet the trigger.
- A static "Talk to someone" link costs about 1 h and can't misfire.

But the course grades whether the assistant *knows when* to escalate. A static link is a door, not a decision. Convergence answers the false-alarm worry better than dropping the trigger. Keep the link on every screen, and also fire T8: a 14-night mean under 5.5 h plus at least 2 low check-ins in the student's own words. A no-watch user can still reach a person through their check-ins plus the link.

**(3) Changed: yes, on a new fact.** Pre-build briefing R8 is a seeded simulation (not evidence). It shows that my example trigger, "≥ 9 of 14 nights under 6 h", flags 11% of healthy short sleepers. I withdraw that sleep-only threshold and adopt T8. Memo B's "named person" should become a named service.

Clerk check: R8 is confirmed in `13-team/pre-build-briefing.md`, line 95 ("≥ 9 of 14 nights under 6 h" flags 7.4% of students and 11% of healthy short sleepers; T8 recommended).

## Red team (step 2b) (CMO): against "lead with late night, build only late night"
**Pre-mortem: it's Dec 12 and this went badly. The three most likely reasons:**
1. **Graders saw a bedtime calculator.** The memorable line is clock arithmetic that iOS Sleep Schedule already does (Memo C). The model and abstain logic disappeared behind it, and the course penalises a system that doesn't visibly run end to end.
   - *Warning sign by Nov 20:* feedback on the Nov 11 draft, or classmates' descriptions, never mention "why" or "how sure".
   - *Test:* a 5-second test with 8 classmates outside the team, using the night card.
   - *Kill rule:* if 4 or more describe it as an alarm or reminder, the in-session break card goes back in as the demo's first beat.
2. **We couldn't measure night, so Dec 11 had only synthetic data.** There were few late-night decision points per person, nobody does a PVT-B at 1 am, and night-time prompts slowed the IRB answer (Memos A and D).
   - *Warning sign:* course staff haven't answered by Nov 14, or they raise questions about night-time monitoring.
   - *Test:* a one-week diary with no app, where 6–8 classmates log when their sessions end.
   - *Kill rule:* if the median is under 2 sessions past 11 pm per person per week, the pilot's primary outcome goes back to daytime sessions.
3. **Wrong moment for real users, and athletes were left out.** Real students tapped "20 more min" every time, as prompt effects fade (HeartSteps, C7). Athletes, who are in scope (decision #10), got nothing built for them.
   - *Warning sign:* Mom Test interviews show past-midnight study is rare, or that athletes' nights end early.
   - *Test:* 8 interviews by Nov 20, at least 3 of them with athletes.
   - *Kill rule:* if fewer than 3 of 8 study past midnight weekly, night stops being the lead, and After practice gets built as a calendar variant of the same rule.

## Clerk's classification of the remaining disagreements
1. **Escalation (d).**
   - CTO: a static link on every card, no trigger.
   - CEO, CSO: the link plus a T8 trigger that fires only after persistence.
   - CMO: the link in the menu only, plus the T8 card.
   - **Prediction** (the false-alarm rate of T8 on synthetic nights): test it with a kill rule.
   - **Value** (how prominent the link is at 1 am).
2. **Build After practice by Dec 11?**
   - CTO, CSO: build it as a calendar-tag variant (~3 h, no athlete claims).
   - CEO: only if the night card runs by Dec 1.
   - CMO: kept out of anything public until it's scoped.
   - **Value** (athletes are in scope, per Heramb) plus **prediction** (the hours).
3. **Is late night the real users' moment?** Seats' P ranges from 0.35 (CSO) to 0.45 (CMO) to MEDIUM. **Fact:** interviews and a diary study.
4. **Will graders read it as a bedtime calculator?** **Prediction:** the 5-second test with its kill rule.

Consensus, no longer disputed:
- lead with late night;
- one typed commitment or one .ics import, no OAuth;
- a no-watch card from night one;
- app switching out as night evidence;
- a named service, not a person, as a placeholder;
- strike "last 6 nights";
- the primary outcome is minutes until the session ends (CTO and CEO adopted it).

## Synthesis (step 3, by the CEO as chair)

**A correction before anything else.** The clerk lists the CTO as holding "a static link, no trigger". In round 2 the CTO adopted T8 and kept the link on every card, so escalation is now mostly agreed. I checked R8/T8 against `13-team/pre-build-briefing.md` line 95. It's a seeded simulation, not evidence.

**Consensus (all four seats)**
- **Lead with late night.** The reason is the evidence: sleep loss harms attention (Lim & Dinges 2010, rated strong), and breaks don't help cognitive tasks (Albulescu 2022, d = −.09). The persona votes don't count, and no "better tomorrow" claims (Okano 2019).
- **(a)** One typed first commitment, or one .ics import. Store only the minutes until it. No calendar OAuth, and never the event title.
- **(b)** A no-watch card from night one that says "Not sure yet".
- **(c)** App switching stops counting as night evidence until it's validated.
- **(d)** Escalation names a service, not a person, as a placeholder until Columbia Health confirms it. It uses T8 (14-night mean under 5.5 h plus 2 or more low check-ins). Sleep alone never escalates.
- **"Your last 6 nights" goes.**
- **The pilot's primary outcome** becomes minutes until the laptop session ends, micro-randomised at each late-night decision point (CSO's proposal, adopted by the CTO and CEO).

**Live disagreements**
1. **How prominent "Talk to someone" is at 1 am.**
   - CTO and CSO: on every card, because T8 misses about half the target group (R8).
   - CMO: in the menu only, because on every 1 am card it says "you look like a problem".
   - **Value.**
2. **Building After practice by Dec 11.**
   - CTO and CSO: build it now as a calendar-tag variant, about 3 h, with no athlete claims.
   - CEO: build it only if the night card runs by Dec 1.
   - CMO: keep it out of anything public until it's scoped.
   - **Value** (athletes are in scope) plus **prediction** (hours).
3. **Is late night the real users' moment?** P ranges from 0.35 (CSO) to 0.45 (CMO). **Fact:** interviews and a diary will settle it.
4. **Will graders see only a bedtime calculator?** **Prediction:** a 5-second test.

**Options**

| Option | What | Cost in team-hours `[assumption]` |
|---|---|---|
| 0. Do nothing | The afternoon walk stays the lead. It rests on our weakest claim | 0 extra |
| 1. Night only | The night rule, no-watch card, T8 escalation, randomisation log, claims audit | ~35–40 h (CTO 25, CSO 10, CMO about 4) |
| 2. Night + practice tag now | Option 1 plus After practice as a calendar tag | ~40–45 h |

**Chair's recommendation (the CEO's view, not a decision)**
- **What:** Option 1, with After practice added only if the night card runs end to end by Dec 1.
- **Nov 6 proposal:** use the CMO's framing. The pitch stays general, and the night card is its example.
- **Forecast:** P = 0.70 that the night path (watch, no-watch, T8 on a labelled synthetic student) runs end to end by Dec 4. The seats range from 0.65 (CEO) to 0.80 (CTO).
- **Red team's tests:** I adopt all three, at about 8 h total.
  - A 5-second test with 8 classmates outside the team. If 4 or more call it an alarm or reminder, the in-session card goes back in as the demo's first beat.
  - A one-week diary with no app. If the median is under 2 sessions past 11 pm per person per week, the primary outcome goes back to daytime sessions.
  - 8 interviews by Nov 20, at least 3 of them with athletes. If fewer than 3 of 8 study past midnight weekly, night stops being the lead, and After practice gets built as the same rule's variant.
- **My kill rule:** if the night card isn't running on synthetic data by Dec 1, the demo shows only the in-session break.
- **Strongest counter (CTO):** iOS Sleep Schedule already does this arithmetic, so the model can disappear behind it. The 5-second test is the check.

**Decisions for the team.** If no answer, nothing changes.
1. **Lead the Nov 6 proposal with the night card as its example.** Default: the afternoon stays.
2. **Re-aim the primary outcome and approve the one data field.** The outcome becomes minutes until the session ends. The data field is one typed commitment time. Decide before the Nov 7 IRB email, which should name night prompts and say nobody monitors in real time. Default: PVT-B outcome, no commitment data.
3. **Gate for After practice:** "night card runs by Dec 1" (CEO) or "build now" (CTO and CSO). Default: not built.

Link prominence is a value call for the CSO with UIUX. Default: the R8 recommendation, the link on every screen.

## Dissents (one line each, unedited)

- **CEO:** "Three half-built moments lose Dec 11. One night that runs end to end, with an honest 'Not sure yet', beats them."
- **CMO:** "If you keep the afternoon walk as the lead, you're pitching our weakest claim (breaks don't measurably help demanding study work, d = −.09) over our strongest (sleep loss harms attention, and people stop noticing), and a 1 am card only earns trust if it reads a typed first commitment, never cites app switching, and asks "once more, then stays quiet" every single time."
- **CTO:** "If you overrule me, still never let sleep alone fire the counselor card or app switching stand as "Fairly sure" evidence, and don't show any history line ("your last 6 late nights") the data can't yet produce: a card that runs on clock and calendar math is honest, while one that runs on proxies we haven't checked is our own Garmin-stress mistake."
- **CSO:** "If you keep the afternoon walk as the lead or ship the night card without the T8 trigger, then don't claim that breaks improve performance or that the assistant knows when to escalate: our evidence for the first is null (d = −.09), and a static link on its own isn't the second."

## Clerk's fairness check

- **All positions represented: yes, for the four seats in the room.**
- **Missing:**
  - The UIUX seat wasn't in the room. Link prominence and the landing page's default moment are partly its lane.
  - No real-user voice. All the user evidence is synthetic personas, which every seat discounted.
- **Clerk error, corrected by the chair:** my classification listed the CTO as "static link, no trigger". By round 2 the CTO had adopted T8 plus the link on every card.
- **Facts checked:**
  - **R8 (11% of healthy short sleepers flagged by a sleep-only trigger):** confirmed in `13-team/pre-build-briefing.md` line 95.
  - **T8 reaches 53.5% of the persistent group, i.e. it misses about half:** confirmed in `13-team/cso-steal-file.md` line 408.
  - Both are seeded simulations, not evidence.
- **No position was settled by vote.**

## Related

- [[25-journal/2026-11-05-icp-moments|ICP: moments demo]] · [[25-journal/2026-11-05-boardroom-privacy-blanks|Boardroom: privacy blanks]] · [[13-team/exec-team|AI exec team]] · [[24-synthesis/open-decisions|Open decisions]] · [[25-journal/25-journal|Journal hub]]
