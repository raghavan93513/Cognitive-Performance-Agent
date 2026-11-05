---
title: CEO Steal File
category: 13-team
tags: [team, planning, synthesis, decision, students]
sources: ["[[09-design/steal-library]]", "[[24-synthesis/casebook]]", "[[24-synthesis/market-map]]", "[[24-synthesis/open-decisions]]", "[[12-research/science-and-tech-evidence]]", "web research 2026-11-04 (URLs in section G)"]
summary: "The CEO seat's read of the steal library and 20 founder cases: what to steal about wedge, focus, sequencing and saying no, ranked for Dec 11, plus an honest map of what we know and don't."
base_confidence: 0.55
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: core
created: 2026-11-05T04:00:00Z
updated: 2026-11-05T04:00:00Z
---

# CEO Steal File

**From:** the CEO seat · **To:** Heramb, Raghavan, Alexa · **Type:** FYI and proposal · **Date:** 2026-11-04 (wiki clock 2026-11-05)

**TL;DR.** The steal library is mostly about *screens*. From the CEO's seat, the more useful thing to steal is *how* those companies chose a wedge, said no, and sequenced. Across 15 cases and 5 anti-cases, the pattern is plain: winners picked **one audience, one platform and one measurable moment**, proved it, then widened. Losers built the full vision before anyone used it, or claimed an outcome they couldn't show. For us that means: **students only, one iPhone surface plus one laptop collector, one study task with one pre-registered outcome, and a demo that is honest about synthetic data.** Everything else waits until after Dec 11.

**Clock (from today, 2026-11-04):** Nov 6 proposal in **2 days** · Nov 11 written draft in **7** · Dec 4 integration checkpoint in **30** · Dec 11 demo in **37** · Dec 16 writeup in **42** (tentative). Team hours available are **unknown**. My working figure is 3 people × ~10 h/week × 5.3 weeks ≈ **160 team hours** `[assumption]`. Every cost below is measured against that.

How to read this page:
- Unmarked facts come from a source I opened (section G) or from a wiki page linked inline.
- `[unverified]` means I saw it only in a search snippet or a secondary write-up.
- `^[inferred]` marks my judgement. Every probability is mine, not a measurement.
- The CEO's fictional backstory is never used as evidence here.

---

## A. The steal library through the CEO's eyes

The [[09-design/steal-library|steal library]] is the UIUX seat's lane: how a screen behaves. My question is different: **what did the company decide that made that mechanism possible, and what does it cost us before Dec 11?** All 12 cards are still `Seen: described`, so none of them is evidence yet. My verdicts are about scope and timing, not about how the screens look. ^[inferred]

### The 12 cards

| Card | CEO steal (the decision behind the mechanism) | Warning it carries | Dec 11 verdict |
|---|---|---|---|
| S-01 Google Flights range bar | They chose to show a *judgement plus its evidence* instead of a raw number. That's a decision about what the product is for (help me decide), not a widget | A range needs 14–28 nights of baseline. Most pilot users won't have that by Dec 11 | Keep, but on synthetic history only, and labelled synthetic |
| S-02 Apple Vitals | Silence by default is a product decision: the alert is scarce, so it's worth something | Being quiet looks like "broken" in a 5-minute demo. The demo has to show the quiet state on purpose | Keep (cheap; it's policy code) |
| S-03 MyChart | The next step is a person, not more data. It's a scope boundary: the product refuses to be the clinician | The escalation copy is our riskiest text for regulation (FDA wellness line) | Keep. It closes the course's "escalate to a human" gap (open decision #12) |
| S-04 Perplexity sources | They made the source the product's credibility. For us, grounding is literally graded | Citations that point at fake or hardcoded records are worse than none (course must-not) | **Must have.** It's the grading criterion |
| S-05 Apple Weather | Uncertainty phrased as a forecast is normal to people | "Fairly sure" must come from calibrated numbers, not from the LLM's tone (ground rule 3) | Keep, wording only |
| S-06 Garmin factor breakdown | Show what drove the verdict, drop the overall score | The factors have to be the model's real inputs, or it's theatre | Keep |
| S-07 Rise Science | The closest company to us. Its real steal is the *sequence* (one team → many teams → consumers), not the energy curve | It's the strongest proof that "sleep → energy" is already taken | Positioning only; don't build a curve |
| S-08 Gentler Streak | Rest counts. A values decision that also protects retention | None for Dec 11 | Keep (copy and tone, ~0 hours) |
| S-09 BeReal once a day | Scarcity as strategy. A rule you can write down and test | BeReal's own decline (case B1): scarcity alone didn't hold people once copied | Keep as a nag cap in policy code |
| S-10 Citymapper one next step | One confident action, alternatives secondary | Confidence without calibration is overclaiming | Keep |
| S-11 Live Activities | Native iOS is where glanceable lives | Needs a native iOS app. We are Safari-first with no Swift budget. This is the card most likely to eat 40+ hours | **Cut for Dec 11.** Note for after the course |
| S-12 Spotify Wrapped | A yearly ritual that spreads by itself | Needs weeks of real data per person. A pilot of 1–2 weeks can't feed it honestly | **Cut for Dec 11.** Maybe a poster mock labelled "concept" |

The library's "what we could own" line combines S-01, S-04, S-09 and S-11. Three of those four are cheap and graded. The fourth, the Live Activity, is the expensive one and the only one that needs a platform we haven't chosen. **Steal the three; park the fourth.** ^[inferred]

### Study-list products, CEO lens

I only list the ones where *how the company decided* teaches us something. Most of the study list is about tone and layout, which is the UIUX seat's lane.

| Product | CEO steal | Warning |
|---|---|---|
| WHOOP | Started with serious athletes, kept the athlete as data owner, moved to membership | Its later promises (the 5.0 upgrade) cost trust. Don't promise in onboarding what the pilot can't keep |
| Oura | Sleep-first for years before widening to "comprehensive health" | Its S-1 names a class action over sleep-stage accuracy (casebook A2). Precision claims are legal claims |
| Fitbit Daily Readiness | Holding back until a baseline exists is a *product* choice, and it legitimises our "not enough data" | Fitbit's own API is gone (2 Nov 2026). Platform risk is not theoretical |
| Bevel, Athlytic | Small iOS teams can compete by reading data others collect | Not researched; I have no numbers. Don't cite them |
| Duolingo | Picked one North Star (current-user retention) and deprioritised everything else for it | Its streak mechanics raise quitting when broken (casebook A16). Steal the focus, not the guilt |
| Canvas | Sets the floor of tolerance for student software | Students tolerate Canvas because they must. Nobody must use us |
| one sec, Opal, Forest | A gentle pause can retain people without any physiology | That's a warning too: maybe the laptop-only path *is* the product, and the watch is a nice-to-have |
| Strava | Effort compared with your own history; a wedge of one sport and one obsession (climbs) | The 2018 heatmap: aggregates of a small group identify people |
| Citymapper | City by city, each fully localised before the next | Sequencing only works if you finish each city |
| Spotify Wrapped | A once-a-period ritual that took 3 years to find its form | Its viral turn came when sharing was added. Sharing health-adjacent data is where we must be strictest |
| GOV.UK, Apple privacy labels | Plain-language consent as a design system | Consent copy is a promise (casebook A18) |

---

## B. Cases

Format for each: **context → the decision and the options → outcome (sourced) → principle → the steal for us.** "For us" always means 3 people, a Dec 11 course demo, and US college students on iPhones.

### B1. BeReal: one notification a day, then a decline

- **Context.** A French social app built around a single random daily prompt, with two minutes to post.
- **Decision.** Exactly one notification a day, both cameras, no filters. The other options were the standard feed, which every competitor already had. In 2022 it also ran a paid college ambassador program; one report puts its 2022 downloads at 7.67M after that push, and 1.7M in a single July week.
- **Outcome.** About 15M daily users in October 2022, then a 61% fall to under 6M by March 2023 (NYT via Sensor Tower, reported by Engadget). Voodoo bought it for €500M in June 2024 in a cash-and-earnout deal; Voodoo's "40M active users" claim didn't say daily or monthly, so it isn't comparable. Engadget's reasons: Instagram and TikTok copied the idea, and authenticity got boring.
- **Principle.** A constraint can be a wedge, but a mechanic is copyable in months. What's left after copying has to be content or relationship.
- **Steal for us.** Use the scarcity rule (one suggestion per study window, snooze really snoozes) because it is cheap and honest. **Don't** make it the pitch. An incumbent can copy a nag cap overnight; it can't copy a measured study-task outcome from *your* laptop. Also note: BeReal's growth came partly from *paid* campus ambassadors. a16z says ambassadors only work after product-market fit (market map §3). We have no product yet, so no ambassador talk in the proposal.

### B2. Duolingo: one North Star, everything else deprioritised

- **Context.** By mid-2018 Duolingo's DAU was growing at single digits a year. Two attempts failed first: a gamified moves counter (no change) and a referral offer (about +3% new users).
- **Decision.** They built a growth model with user states and simulated which rate moved DAU most. Current-user retention (CURR) had about 5× the impact of the next lever, so they made it the North Star, formed a retention team, and deprioritised new-user acquisition. They also put a gate on push-notification volume to protect the channel.
- **Outcome.** CURR up 21% over four years, daily churn among best users down over 40%, DAU up 4.5× (Lenny's Newsletter, by the PM who led it). The "try a lesson before sign-up" pattern is real and well documented, but the "+20% DAU" figure for it is secondary only `[unverified]`.
- **Principle.** Model the system, find the one rate that matters, and say no to the rest *in writing*.
- **Steal for us.** One primary metric for the pilot, pre-registered, and everything else is secondary. Not downloads, not daily opens (banned as goals). My proposal is the **share of suggestions rated well-timed**, against Kaur et al.'s 77% benchmark, plus the abstention rate and the false-alarm rate as guardrails. It's the CSO's call on the study design; my point is that there must be exactly one. Also steal "protect the channel": a cap on prompts, owned by policy code. And "try before sign-up" fits a demo: the showcase visitor should see a suggestion on synthetic data *before* any consent screen.

### B3. Citymapper: one city, finished, before the next

- **Context.** Started in London in 2011 as Busmapper, buses only, then multimodal.
- **Decision.** Expand city by city, each with its own live data and localisation, rather than launch everywhere with thin data. By April 2014 it was in four cities (London, New York, Berlin, Paris) and raised a $10M Series A to add more. TechCrunch credited the per-city localisation as its edge over rivals.
- **Outcome.** 58 cities by August 2020 (Wikipedia, via search) `[unverified]`; bought by Via in March 2023 `[unverified]`.
- **Principle.** Sequence by *finished units*. A half-working city teaches you nothing and hurts the brand.
- **Steal for us.** Our "cities" are **data sources**. Finish them one at a time: (1) synthetic data end to end, (2) the laptop-only path end to end, (3) *one* wearable route behind an adapter. Don't open the watch "city" until the first two are done. Each one has a completion check (Raghavan's proof-gated order on [[02-product/roadmap|Roadmap]] is already this).

### B4. Spotify Wrapped: a ritual that took three years to find its form

- **Context.** Launched in 2015 as "Year in Music", a website outside the app. Renamed Wrapped in 2016 with a top-songs playlist.
- **Decision.** In 2019 it moved into the app in a Stories format with a share button, which turned private data into a social signal (SlashGear's account).
- **Outcome.** 227M monthly users engaged in 2023, per Spotify's newsroom as quoted by SlashGear. TIME reported 156M for 2022 `[unverified]` (search snippet).
- **Principle.** Rituals compound slowly. The first version was modest and outside the product; it earned its place.
- **Steal for us.** A recap is a *year-two* feature. For Dec 11 the honest version is one "here's what happened in your session" card at the end of the demo, built from the session's own records. A weekly recap on a 1–2-week pilot would be built on too little data to be true. And never add a share button to anything that contains a health value.

### B5. Strava: one sport, one obsession, then the hard lesson about aggregates

- **Context.** Founded 2009 in San Francisco; started mostly with GPS cycling and running.
- **Decision.** Segments and leaderboards came from talking with cyclists about specific climbs. It built automatic climb detection around one obsession of one community.
- **Outcome.** 1 billion activities by 2017; 50M+ users and 3 billion activities by 2020; paid features moved behind the subscription in May 2020. In January 2018 its global heatmap exposed military bases.
- **Principle.** The wedge was a *ritual inside a community* (the climb), not a sensor. And aggregates of small groups identify people.
- **Steal for us.** "Compared with your own history" is our framing too (personal baselines). The Strava warning is the more urgent one: a classmate pilot is a tiny group, so **no cohort aggregates on the poster or in the writeup below a minimum group size**, and no per-person time series in the public repo (ground rule 7).

### B6. Oura: sleep first, for years

- **Context.** Finnish founders with backgrounds at Polar and Nokia.
- **Decision.** Gen1 (March 2015) was positioned on sleep: "Improve Sleep. Perform Better." The Kickstarter hit $100K in about 15 hours, ran 37 days, took ~2,400 pre-orders and ~$650K, with no PR or paid ads (Oura's own history page; self-reported).
- **Outcome.** Over 100,000 Gen2 rings by August 2019; 1M rings by March 2022; in 2024 it described itself as moving to a comprehensive health device. Per the S-1 summary in the [[24-synthesis/market-map|market map]]: FY2025 revenue $907.9M and ~85% 12-month member retention.
- **Principle.** One daily moment, done well, for a long time. It widened only after the moment was a habit.
- **Steal for us.** Our moment is **the start of a study session**, not the morning. Build the whole demo around that moment. Oura's warning is in the casebook: a class action over sleep-stage accuracy. So we don't show sleep stages at all; we show daily totals with their source and freshness.

### B7. WHOOP: an athlete's problem, an athlete wedge, then a business-model pivot

- **Context.** Founded 2012 by Will Ahmed and two others, incubated at Harvard Innovation Labs, built for serious athletes (Wikipedia). The market map cites the squash-captain origin.
- **Decision.** Athletes first, then pros, then the public. Around 2018 it moved to a membership with the hardware included (sources agree on 2018, but the clearest dating is secondary) `[unverified]`.
- **Outcome.** Valued at $1.2B (Oct 2020), $3.6B (Aug 2021), $10.1B after a $575M Series G (2026). 2.5M+ members per the market map. College deals ran through athlete **opt-in** dashboards (Penn State, 2022).
- **Principle.** A narrow, demanding user gives you credibility, and the athlete has to own the data.
- **Steal for us.** This is the strongest argument *for* athletes, and I still recommend **deferring athletes** (open decision #10). WHOOP had years; we have 37 days. Athletes add a second persona, a coach-privacy problem (36% of men said "nobody can know" would help them seek care), and an evaluation we can't power. The steal for now is the ownership rule, written into consent: the athlete owns it, nobody else sees it.

### B8. Rise Science: a student project with one team as its first customer

- **Context.** Northwestern students Jeff Kahn and Leon Sasson cofounded it in 2015 after studying sleep science. The football program's head trainer asked them to build something before August camp (Northwestern McCormick magazine).
- **Decision.** One team, one behaviour (bedtime at each player's biological night), delivered by text messages sent *by hand* at first, then automated in 2013 (Twilio's blog). Then more college and pro teams, then a consumer app.
- **Outcome.** A "54 more minutes of sleep" figure appears in IDEO's write-up as a self-report from 97% of players after a week on the program. It's company-reported, not peer-reviewed. The consumer app launched in 2020–21 (sources disagree); it raised $15.5M.
- **Principle.** One captive, motivated group; one behaviour; a manual service before software.
- **Steal for us.** Three things. (1) **Our captive group is the class.** BINF 4070 classmates are reachable, motivated and allowed by the course ("classmates count"). (2) **Do it by hand first.** A human-run "Wizard of Oz" suggestion, made from a rules sheet, can test timing and wording on 3 classmates before any agent code exists. (3) **Say what's self-reported.** Rise's best number is self-reported; ours will be too, so label it.

### B9. Facebook: one campus, saturated, then the next

- **Context.** Launched 4 Feb 2004 as TheFacebook, Harvard only.
- **Decision.** Saturate one closed community before widening. More than half of Harvard undergraduates registered within the first month; in March 2004 it opened to Stanford, Columbia and Yale, then the Ivies and Boston schools, then most US and Canadian universities (Wikipedia, History of Facebook).
- **Outcome.** 1.5M users by October 2004.
- **Principle.** Density in one closed group beats thin coverage of many. Each new campus was a known, similar unit.
- **Steal for us.** **One cohort, density over reach.** Ten classmates who each run 3+ sessions are worth more than 40 who try it once. The cohort should be one class or one study group, so sessions look alike and the comparison is fair. And note the irony: Facebook's second campus was Columbia. Our first market is the one room that grades us.

### B10. Snapchat: a class project classmates doubted

- **Context.** April 2011, Stanford product design course. Evan Spiegel proposed an ephemeral photo app as his class project; per Wikipedia, classmates ridiculed it. It shipped as Picaboo, was renamed Snapchat, and had 1M daily users by end of 2012.
- **Decision.** He kept building despite the room's reaction, and he left Stanford to focus on it.
- **Outcome.** 1M DAU by end of 2012. A reported $3B acquisition offer declined in 2013 (CNET headline cited on Wikipedia) `[unverified]`.
- **Principle.** A classroom's reaction is information about the pitch, not a verdict on the product. Its users turned out to be different from the people in the room.
- **Steal for us.** On Nov 6 the instructors and TAs hand us written cards. **Listen, sort, don't defend** (the course's own rule). Sort each card into fact (fix it), prediction (test it cheaply) or taste (note it). The warning cuts the other way too: survivorship bias. Most ridiculed class projects stay ridiculed. Snapchat isn't a reason to ignore feedback.

### B11. Instagram: cut Burbn down to the one thing people did, on one platform

- **Context.** Burbn was an HTML5 check-in app with photo sharing; Systrom called it confusing and slow (TNW interview, 2011).
- **Decision.** Users mostly shared photos, so they cut everything else. They launched **iPhone only**. Systrom said there was "no reason to be on two platforms from day one" until the product was proven.
- **Outcome.** 1M downloads in three months; 9M+ registered users by September 2011, all on iOS; bought by Facebook for $1B in 2012 (Business Insider, via search).
- **Principle.** Watch what people actually do, cut to it, and prove it on one platform.
- **Steal for us.** This is the most direct steal in this file. **One phone surface (iPhone Safari) and one laptop OS for the collector.** Alexa's plan has React Native, Next.js and a desktop collector; Raghavan's has one Electron app. The target users are iPhone users, so the card lives in Safari, and the collector runs on *one* laptop OS chosen by what the three of us own (open decision #6). Android, Windows-and-Mac parity, and native iOS all wait.

### B12. Empatica: a lab's broad sensor research narrowed to one clinical use

- **Context.** MIT Media Lab, 2007: Rosalind Picard's group built a wearable measuring electrodermal activity. A study showed it could help detect seizures (Empatica's blog; Picard has described the finding as accidental `[unverified]`).
- **Decision.** Narrow from broad emotion and stress sensing to one use, seizure alerts, and go through FDA.
- **Outcome.** Embrace was cleared by FDA on 26 Jan 2018, announced 5 Feb 2018; studies began in 2014 at several epilepsy centres. One report says the algorithm caught all 40 generalised seizures in a 135-person study `[unverified]`.
- **Principle.** A lab result becomes a product when it's narrowed to one use with one validation.
- **Steal for us.** The narrowing, **not** the clinical route. We narrow to one use (in-session break timing) and stay wellness. The warning: clearance took a decade from the lab. Anything that sounds like detection ("detects stress", "detects fatigue") is a promise we can't validate in 37 days.

### B13. Ginger.io: passive phone sensing became a care company

- **Context.** An MIT Media Lab spin-out (2011) that inferred health risk from how and where people used their phones (iMedicalApps and Xconomy coverage, via search).
- **Decision.** Over time it moved from passive sensing to on-demand behavioural health coaching, therapy and psychiatry.
- **Outcome.** Merged with Headspace in August 2021 in a deal TechCrunch valued at $3B (Global Venturing).
- **Principle.** Passive inference alone was not the business; the human service was. (Mindstrong, casebook A11, is the version that didn't pivot.)
- **Steal for us.** Don't sell the inference. Sell the action and the handoff to a person (S-03). In the pitch, "we infer your mental state from your laptop" is the sentence to never say.

### B14. Apple Watch: listening to what people actually used it for

- **Context.** Launched April 2015 with fashion and communication positioning.
- **Decision.** Series 2 (Sept 2016) was pitched mainly as fitness: GPS, swim-proof, a launch video of almost only athletes. Jeff Williams later said the health focus was organic and started with customer letters about the heart-rate monitor.
- **Outcome.** About 12M watches sold by Sept 2016 (analyst estimate, LA Times). Health then became the Watch's centre, including cleared ECG.
- **Principle.** Even the biggest company refocused on the use people showed it, within 18 months.
- **Steal for us.** Build a cheap way to hear it. Two open questions at the end of each pilot session ("What did it actually do for you?", "When was it wrong?"), read weekly. If classmates say the laptop nudge matters and the watch doesn't, that's our Series 2 moment, and it fits the no-wearable reality (plan for about half of students without a tracker).

### B15. Woebot: rule-based scope that the regulatory gray zone ate

- **Context.** A CBT chatbot used by about 1.5M people.
- **Decision.** It stayed rule-based for years and pursued FDA routes.
- **Outcome.** It shut its core app in the week of 2 July 2025. The founder cited the cost of FDA marketing authorisation and that FDA hasn't worked out how to regulate LLMs (STAT).
- **Principle.** An LLM in a health-adjacent product sits in an unsettled zone. Scope decides which side of the line you're on.
- **Steal for us.** Keep the LLM as the *explainer*, never the decider (ground rule 3), and keep every word wellness. That's not just regulatory hygiene; it's what lets a 3-person team ship at all.

### Anti-cases (scope creep, building before validating, hype)

#### X1. Quibi: built the whole thing, then asked the market

- **What happened.** Raised $1.75B before launch; launched April 2020 at $4.99/month; planned 7M+ subscribers in year one; had about 500K when it announced shutdown in October 2020, six months in (CNBC). Katzenberg owned "the idea being less than perfect" and blamed the pandemic killing on-the-go viewing.
- **The lesson.** Big money and a full catalogue can't substitute for a tested core use. They designed for a context (commuting) that vanished.
- **For us.** Our context has a date: **finals.** Dec 11 sits in exam season; classmates' study sessions will be real, but their time for a pilot will be scarce. Recruit early (week of Nov 16), keep each session under the time they'd study anyway, and don't plan a pilot for Dec 7–10.

#### X2. Humane AI Pin: hype ahead of a working product

- **What happened.** Raised over $230M; launched at $699 (cut to $499 in Oct 2024); returns at one point outpaced sales `[unverified]` (TechCrunch citing The Verge). HP bought most assets for $116M in Feb 2025; the pins stopped working on 28 Feb 2025; only recent buyers got refunds.
- **The lesson.** Demos and launch videos sold a product that didn't do the thing reliably, and the exit left users with dead hardware.
- **For us.** The showcase is our launch video. **Show what actually runs, label synthetic data, keep a recorded fallback.** And keep an exit promise: a participant's data can be exported or deleted, and is deleted after the course unless they opt in.

#### X3. Juicero: an elaborate machine for a job hands could do

- **What happened.** Raised about $120M; the press launched at $700, cut to $400; Bloomberg showed hand-squeezing the packs worked about as well; it shut down in September 2017 with refunds to all buyers (Dezeen).
- **The lesson.** Nobody tested the simplest alternative before building the expensive one.
- **For us.** Our "hand squeeze" is the **fixed-break timer**. If a 25/5 timer gets the same perceived-timing rating as our agent, we've built a Juicero. That's why the fixed-break baseline in [[12-research/evaluation-plan|Evaluation plan]] is not optional, and why we should run it *first*, because it's free.

#### X4. Lumosity: "better at school" without the evidence

- **What happened.** In January 2016 the FTC said Lumos Labs deceived consumers with claims that training improved performance in school, at work and in athletics, and helped conditions including ADHD. It paid $2M; a $50M judgment was suspended; the order requires competent and reliable scientific evidence for future claims (FTC press release).
- **The lesson.** "Helps students perform" is a regulated claim the moment you can't back it.
- **For us.** Our own evidence page says micro-breaks reduce fatigue (d = .35) but show **no** benefit on demanding cognitive tasks (d = −.09) ([[12-research/science-and-tech-evidence|Science and tech evidence]] §1). The draft lightning hook on [[30-course/deliverables/part-3-final-showcase|Part 3]] ends with "my next quiz score went back up". That's a Lumosity sentence. Unless the pilot shows it with a confidence interval, it goes.

#### X5. Yik Yak: a campus wedge with no floor

- **What happened.** Launched 2013 for students near each other on campus; raised $73M; valued at about $400M at one point; schools tried to block it over pranks, rumours and threats; it shut down in May 2017 and sold IP to Square for $1M (phys.org).
- **The lesson.** Campus density is a powerful wedge, and it amplifies harm just as fast. Safety wasn't designed in.
- **For us.** The course grades "safety designed in". The day a classmate types something worrying into a free-text field, or the card meets someone in real distress, we need a written escalation rule (open decision #12). Simplest safe scope: **no free-text input at all for Dec 11**, and a fixed "talk to someone" path (Columbia counselling) on every screen.

Also rhymes, from the [[24-synthesis/casebook|casebook]]: Akili (126K downloads, ~3% active: downloads aren't users), Pear (evidence isn't a business), Halo (creepy sensing). And BeReal's decline (B1) is itself the sixth anti-case: a wedge mechanic without a lasting reason to return.

---

## C. CEO principles for this project

1. **The bottleneck is the evidence loop, not features.** One study task, one outcome, one end-to-end path. A feature that doesn't feed that loop waits. (Rise, Duolingo)
2. **One audience until it works: students.** Athletes after Dec 11. (Facebook, WHOOP's patience we don't have)
3. **One phone surface, one laptop OS.** iPhone Safari plus one collector. (Instagram)
4. **Finish one data source before opening the next.** Synthetic, then laptop-only, then one wearable. (Citymapper)
5. **Test the cheap alternative first.** The fixed-break timer and a hand-run "Wizard of Oz" suggestion come before agent code. (Juicero, Rise)
6. **One North Star for the pilot, pre-registered.** Guardrails beside it; vanity metrics nowhere. (Duolingo)
7. **Claim only what the pilot measures.** "Less fatigued" and "well-timed" are defensible; "smarter" and "better grades" are Lumosity. (Lumosity, Empatica)
8. **Sell the action and the handoff, not the inference.** (Ginger.io, Mindstrong)
9. **The demo is honest or it's a liability.** Real vs synthetic labelled, recorded fallback, nothing hardcoded. (Humane, the course's must-nots)
10. **Scarcity is a rule, not a pitch.** Nag caps are cheap and copyable; the measured outcome is the moat. (BeReal)
11. **Small groups are identifiable.** No aggregates or per-person series in public. (Strava)
12. **Listen to the room, then sort what you hear.** Fact, prediction or taste. (Snapchat)
13. **Plan for the calendar we actually have.** Finals, Thanksgiving week, 160 hours `[assumption]`. (Quibi's lost context)
14. **Write down why.** Every scope call becomes an ADR with who decided. The wiki has 1 ADR and 19 open decisions; that ratio has to flip by Nov 11.

---

## D. Top 10 steals for us, ranked

Ranked by (value to Dec 11 grade + honesty) ÷ team hours. Costs are my estimates `[assumption]`; owners are proposals, and the team assigns.

| # | Steal | From | What we do | Cost (team h) | Serves |
|---|---|---|---|---|---|
| 1 | Cut to one thing people do | Instagram | ADR-002: lean pilot scope; iPhone Safari card + one-OS laptop collector + FastAPI + Postgres. Adopt Alexa's data contract and failure rules, park RN, Next.js, managed queue, pgvector | 3 | Nov 11 draft |
| 2 | One captive cohort | Rise, Facebook | Students only; recruit 10–20 BINF 4070 classmates; athletes deferred (decision #10) | 1 | Nov 6 slide |
| 3 | One task, one outcome | Rise, Duolingo | ADR-003: the study task (the evidence page suggests a 3-min PVT-B) and one pre-registered primary outcome; CSO drafts, team decides | 8 | Nov 11 draft |
| 4 | Test the hand squeeze first | Juicero, Rise | Run the fixed-break timer and a hand-run "Wizard of Oz" card with 3 classmates before agent code | 6 | Nov 20 |
| 5 | Finish one city at a time | Citymapper | Proof gates: synthetic end-to-end (Nov 27), laptop-only live (Dec 1), one wearable route (Dec 4 or cut) | 0 (sequencing) | Dec 4 |
| 6 | Sources next to every claim | Perplexity (S-04) | A trace view: each clause of the reason opens its record (device, time, sync, synthetic badge) | 10 | Dec 4 |
| 7 | Claims register | Lumosity | A table mapping every sentence in slides, poster and writeup to its evidence; CSO audits before each deadline | 3 | Nov 6, Dec 11, Dec 16 |
| 8 | Silence and scarcity as rules | Apple Vitals, BeReal | Nag cap and "speak only when unusual" written in deterministic policy code with tests | 4 | Dec 4 |
| 9 | A path to a person | MyChart (S-03), Yik Yak | Escalation rule and fixed counselling link on every screen; no free text for Dec 11 | 4 | Nov 11 (design), Dec 4 (built) |
| 10 | Hear what it's actually for | Apple Watch | Two open questions after each pilot session, read weekly; a refocus checkpoint on Dec 1 | 2 | Dec 1 |

Total ≈ **41 team hours**, about a quarter of my assumed budget, leaving the rest for the build itself. ^[inferred]

**Forecasts (mine, for calibration later):**
- P = **0.65** that one suggestion runs end to end on synthetic data (ingest → features → numeric estimate → LLM explanation → card with sources) by Dec 4, *if* lean scope is decided by Nov 11. P = **0.30** if the production plan's scope is kept. Objective check: the Dec 4 mock demo shows it without hand-editing data.
- P = **0.45** that ≥ 10 classmates each complete ≥ 3 real sessions by Dec 9, conditional on the human-subject question being answered by Nov 13. If formal IRB review is required, P ≈ **0.15**.
- P = **0.40** that a Google Health route works for ≥ 5 classmates for ≥ 7 days without manual re-authorisation by Dec 4. This is why the laptop-only path is core, not a fallback.

---

## E. Anti-steals and warning signs

**What not to steal, from the CEO's seat:**
- **The full vision first** (Quibi, Humane, Juicero). The production plan's object store, OIDC, Terraform and OpenTelemetry are right for a company, wrong for 37 days.
- **The outcome claim** (Lumosity). No "better grades", "smarter", "improves focus". Fatigue and timing only.
- **The inference pitch** (Ginger.io's start, Mindstrong). Never "we detect stress / fatigue / mental state".
- **Paid growth before a product** (BeReal's ambassadors). No ambassador or launch talk in the proposal.
- **A native iOS feature on a Safari budget** (S-11 Live Activities). Park it.
- **A ritual before there's data** (S-12 Wrapped). Park it.
- **Streak mechanics** (Duolingo's guilt), **lone scores**, **red/green body verdicts** (the library's anti-steals; I agree with all six).
- **The athlete wedge now** (WHOOP). Right idea, wrong year.

**Warning signs that we're drifting, each with a tripwire:**

| Warning sign | Tripwire (state + date) | What we do |
|---|---|---|
| Building screens before the study task exists | No ADR-003 by Nov 11 | Stop UI work; one meeting to pick the task |
| Two client stacks alive at once | Both RN/Next.js and Electron/Safari code by Nov 18 | ADR to drop one |
| The watch route eats the schedule | Google Health still not returning data for a test user by Nov 20 | Wearable becomes synthetic-only for Dec 11; laptop-only is the live demo |
| The pilot slips into finals | Fewer than 5 consented classmates by Nov 25 | Report as a feasibility study with n stated; don't stretch into Dec 7–10 |
| A claim outruns the data | Any slide sentence without a row in the claims register | Cut the sentence |
| Demo depends on a live API | No recorded fallback by Dec 4 | Record it that day |
| Synthetic numbers presented as results | Any accuracy or effect number from synthetic data in the writeup | Remove; ADR-001 forbids it |
| More open decisions than decided ones | Still more than 15 open on Nov 20 | CEO runs a triage memo; at most 3 decisions per meeting |

---

## F. What we know / what we don't know yet

### Known (with links)

**The bar.**
- The course grades end-to-end on realistic data, visible sources, honest uncertainty and escalation, a non-technical UI, and safety designed in. Its must-nots include a happy-path demo with no fallback, overclaiming, and polished UI over hardcoded data. → [[30-course/project-requirements|Project requirements]]
- Nov 6: 5 minutes plus 3 of feedback, with a concrete artifact, ending on 1–2 questions. → [[30-course/deliverables/part-2-proposal-presentation|Part 2]]
- Dec 11: a one-minute lightning pitch, a live demo with a recorded fallback, and a poster; implementation, demo and writeup are graded separately. The writeup is due Dec 16 (tentative). → [[30-course/deliverables/part-3-final-showcase|Part 3]], [[30-course/deliverables/final-writeup|Final writeup]]

**The design.**
- Two designs share the same logic and conflict on clients, watch API, queue and what the evidence agent retrieves. → [[24-synthesis/design-comparison|Design comparison]]
- No build step has started as of the roadmap's last update (2026-10-26). → [[02-product/roadmap|Roadmap]]
- One decision is accepted: reuse WearLab's simulators (ADR-001). The generator's Nov 6 milestone is one sample day with a plot. → [[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data|ADR-001]], [[05-data/synthetic-data-generator|Synthetic data generator]]
- 19 open decisions; the study task (#2) blocks everything. → [[24-synthesis/open-decisions|Open decisions]]

**The world.**
- The Fitbit Web API was turned off on 2 Nov 2026. Google Health scopes are restricted, unverified apps are capped at 100 users, and refresh tokens in Testing reportedly expire after 7 days. → [[12-research/science-and-tech-evidence|Science and tech evidence]] §0 and §6
- Incumbents already sell readiness and stress scores; sensing is a commodity. → [[24-synthesis/competitive-landscape|Competitive landscape]]
- Students are tired (41.9% under 7 h on weeknights; 75.5% tired on 3+ of 7 days), and procrastination hurts more of them academically than sleep difficulty does (48.8% vs 23.6%). → [[24-synthesis/market-map|Market map]] §2
- Breaks reduce fatigue; evidence for better cognitive performance is null; a pilot of 20 detects only large effects. → [[12-research/science-and-tech-evidence|Science and tech evidence]] §1 and §8
- Retention is brutal: median 3.3% at 30 days for mental-health apps. → [[24-synthesis/market-map|Market map]] §4

**Us.**
- Users: US college students and athletes on iPhones, Safari first; laptops are Mac or Windows (`CLAUDE.md`). I recommend students only for Dec 11 (section D, steal 2).
- Five AI advisor seats advise; the team decides. → [[13-team/exec-team|AI exec team]]
- Five synthetic personas exist for rehearsal, never evidence. → [[03-users/personas/icp-personas|ICP personas]]

### Unknown (each with how to find out, a proposed owner, and a date)

Owners are **proposals** based on who has worked on what; the team assigns. Ranked by how much they block.

| # | Unknown | Why it matters | How to find out | Proposed owner | By |
|---|---|---|---|---|---|
| 1 | **The study task and the primary outcome** | Nothing validates without it; the course draft needs it | CSO drafts 2–3 candidates (e.g. PVT-B, a timed quiz) with practice-effect handling; team picks in one meeting | Team; CSO seat drafts | Nov 11 |
| 2 | **Does a classmate pilot need human-subject review?** | If yes, real-user evaluation may not happen before Dec 11 | Ask course staff in writing; if they say yes, ask Columbia's IRB office about exemption | Whoever owns course comms | Nov 9 (ask), Nov 13 (answer) |
| 3 | **Does any wearable route actually work now?** | The Fitbit API is gone; the course's route is unverified | Try the Google Health API in Testing with one team member's device; check token expiry and sync | CTO seat with Heramb | Nov 13 |
| 4 | **How many team hours do we really have?** | Every plan above rests on ~160 `[assumption]` | Each person writes their weekly hours to Dec 11, including finals | Each of the three | Nov 6 |
| 5 | **Who is on the team?** | CLAUDE.md lists three; the team hub lists a fourth contributor, Yulee | Ask; update the roster | Heramb | Nov 6 |
| 6 | **Scope: lean pilot or production plan?** | Drives every hour after Nov 11 | `/boardroom` or `/decide` → ADR-002 | Team (Raghavan and Alexa authored the designs) | Nov 11 |
| 7 | **Students only, or athletes too?** | A second persona doubles design and evaluation work | Team call, recorded as an ADR | Team | Nov 6 |
| 8 | **Which laptop OS for the collector?** | The foreground-app adapter is OS-specific | Count the OSes among the three of us and the first 10 recruits | CTO seat | Nov 11 |
| 9 | **When do we escalate to a human, and to whom?** | A graded criterion with no design yet | CSO drafts triggers and copy; check Columbia counselling's contact path | CSO seat; team approves | Nov 20 |
| 10 | **Which LLM provider, and what data reaches it?** | Privacy promise and consent form depend on it | Compare paid tiers' retention terms (evidence page §7); decide derived-only | CTO seat | Nov 20 |
| 11 | **Do classmates find the suggestion well-timed at all?** | The North Star I proposed | The hand-run "Wizard of Oz" test with 3 classmates | UIUX seat with one team member | Nov 20 |
| 12 | **Does the agent beat a fixed timer on perceived timing?** | If not, we've built a Juicero | The pilot's within-person comparison | CSO seat | Dec 9 |
| 13 | **What did the Part 1 one-pager promise?** | The proposal should be consistent with it | Add it to `attachments/decks/` | Whoever submitted it | Nov 6 |
| 14 | **What will graders count as "realistic" data?** | Synthetic earns full credit per the course, but the demo story should be clear | Ask a TA at the Nov 6 feedback | Presenter | Nov 6 |
| 15 | **Are the steal-library cards accurate?** | All 12 are `described`, not opened | `/teardown` or open each before it drives a design | UIUX seat | Before each design decision |

**Where I disagree with the current pages.**
- The Part 3 hook ("my next quiz score went back up") overclaims against our own evidence page. Replace it with what we can show: the reason, the source, and the abstention.
- [[index|index.md]] still says "Status 2026-10-26" with Oct 30 as the next deadline. It's stale for anyone arriving new.

**What would change my mind.**
- If the course staff say real-user evaluation is optional and synthetic carries the grade, I'd spend fewer hours on recruiting and more on the trace view and failure paths.
- If Google Health works in Testing for a week without re-auth, I'd move the wearable route from "Dec 4 or cut" to "Nov 27".
- If the hand-run test shows classmates don't want in-session suggestions at all, the North Star is wrong, and we should say so on Nov 11 rather than build it.

**Strongest counter-argument to this whole file.** Narrowing this hard might make the demo look small next to teams with flashier apps. My answer, labelled as judgement: the course grades a working system, visible sources and honest uncertainty, and says a rough demo of a real pipeline scores better than it feels. Small and real beats big and hardcoded on this rubric. ^[inferred]

**Decisions for the team (≤ 3, ranked; if no answer, nothing changes):**
1. **Scope (ADR-002):** lean pilot with Alexa's data rules, by Nov 11. Default if no answer: both designs stay alive, which I forecast costs about half the chance of an end-to-end path by Dec 4.
2. **Study task and primary outcome (ADR-003)**, by Nov 11. Default: the evaluation plan stays unfalsifiable.
3. **Students only for Dec 11**, by Nov 6, so the proposal says one user. Default: the slide says "students and athletes" and the feedback cards will ask which.

---

## G. Sources

Opened in this session (2026-11-04):
- Engadget, BeReal acquired by Voodoo: https://engadget.com/bereal-the-buzziest-app-of-2022-has-been-bought-by-a-mobile-game-publisher-175016152.html
- Fortune, BeReal and authentic social apps (ambassador program, downloads): https://fortune.com/2022/08/03/authentic-social-media-apps-bereal-poparazzi/
- Lenny's Newsletter, How Duolingo reignited user growth: https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth
- TechCrunch, Citymapper $10M Series A (2014): https://techcrunch.com/2014/04/17/citymapper-10m/
- SlashGear, the untold story of Spotify Wrapped: https://www.slashgear.com/1731101/spotify-wrapped-history-untold-story-creator-no-credit
- Wikipedia, Strava: https://en.wikipedia.org/wiki/Strava
- Oura, history of Oura: https://ouraring.com/blog/history-of-oura/
- Wikipedia, Whoop (company): https://en.wikipedia.org/wiki/Whoop_(company)
- Northwestern McCormick magazine, Rise and Shine (fall 2021): https://www.mccormick.northwestern.edu/magazine/fall-2021/rise-shine/
- Twilio blog, Rise Science texts athletes to sleep (2016): https://www.twilio.com/en-us/blog/rise-science-texts-nfl-nba-players-to-sleep-html
- IDEO, a game-changing approach to sleep for athletes: https://www.ideo.com/works/a-game-changing-approach-to-sleep-for-athletes
- Wikipedia, History of Facebook: https://en.wikipedia.org/wiki/History_of_Facebook
- Wikipedia, Evan Spiegel: https://en.wikipedia.org/wiki/Evan_Spiegel
- The Next Web, Kevin Systrom interview (2011): https://thenextweb.com/news/kevin-systrom-on-instagrams-meteoric-rise-and-when-is-it-coming-to-android-interview
- Empatica blog, Embrace FDA clearance: https://empatica.com/blog/update-embrace-is-now-an-fda-cleared-medical-device-bf506d991b1c
- Global Venturing, Headspace and Ginger merger: https://globalventuring.com/corporate/headspace-and-ginger-merger/?format=md
- BusinessMirror (LA Times), Apple Watch Series 2 refocus: https://businessmirror.com.ph/with-series-2-apple-admits-its-smartwatch-isnt-for-everyone/
- Cult of Mac, Apple Watch's health focus took Apple by surprise: https://www.cultofmac.com/655744/apple-watchs-health-focus-took-apple-by-surprise/
- STAT, Woebot shuts down: https://www.statnews.com/2025/07/02/woebot-mental-health-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/
- CNBC, Quibi founders explain what went wrong: https://www.cnbc.com/2020/10/22/quibi-co-founders-katzenberg-whitman-explain-what-went-wrong.html
- TechCrunch, Humane's AI Pin is dead as HP buys assets: https://techcrunch.com/2025/02/18/humanes-ai-pin-is-dead-as-hp-buys-startups-assets-for-116m
- Dezeen, Juicero shuts down: https://www.dezeen.com/2017/09/05/yves-behar-fuseproject-hard-pressed-juicero-machine-pulled-from-sale/
- FTC, Lumosity to pay $2 million: https://www.ftc.gov/news-events/press-releases/2016/01/lumosity-pay-2-million-settle-ftc-deceptive-advertising-charges
- phys.org, anonymous app Yik Yak shuts down: https://phys.org/news/2017-05-anonymous-app-yik-yak.html

Tried but not readable (claims from them are marked `[unverified]` or not used): CNN Money on Burbn (503), NPR "How I Built This" transcript (timeout), Xconomy on Ginger.io (certificate error), Axios on Juicero (403), Japan Times Theranos timeline (paywall), Taplytics on Duolingo's delayed sign-up (redirect loop), Sports Business Journal on Rise and Clemson (redirect).

Seen only in search results (`[unverified]` above): Citymapper's 58 cities and Via acquisition; TIME's 156M Wrapped figure; WHOOP's 2018 membership switch; Instagram's $1B sale (Business Insider); Snapchat's declined $3B offer; Empatica's 135-person study; Ginger.io's founding coverage; Duolingo's "+20% DAU" for delayed sign-up.

Wiki pages used: [[09-design/steal-library]], [[24-synthesis/casebook]], [[24-synthesis/market-map]], [[24-synthesis/competitive-landscape]], [[24-synthesis/open-decisions]], [[24-synthesis/design-comparison]], [[02-product/roadmap]], [[30-course/project-requirements]], [[30-course/deliverables/part-2-proposal-presentation]], [[30-course/deliverables/part-3-final-showcase]], [[30-course/deliverables/final-writeup]], [[12-research/science-and-tech-evidence]], [[12-research/evaluation-plan]], [[05-data/synthetic-data-generator]], [[20-decisions/adr-001-reuse-wearlab-simulators-for-synthetic-data]], [[13-team/exec-team]], [[13-team/13-team]], [[03-users/personas/icp-personas]], [[hot]].

## Related

- [[13-team/13-team|Team hub]] · [[13-team/exec-team|AI exec team]] · [[09-design/steal-library|Steal library]] · [[24-synthesis/casebook|Casebook]] · [[24-synthesis/open-decisions|Open decisions]]
