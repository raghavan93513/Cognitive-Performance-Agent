---
title: Design Evidence
category: 09-design
tags: [design, frontend, synthesis, reference]
sources: ["desk research 2026-11-04 (sources listed at the bottom)"]
summary: "Research on scores, nudges, uncertainty, sources, escalation, consent and athletes' privacy, with 8 design failure cases and 12 rules for our screens. The UIUX seat's knowledge base."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: core
created: 2026-11-04T23:59:00Z
updated: 2026-11-04T23:59:00Z
---

# Design Evidence

The UIUX seat's knowledge base: what other products did, what research found, and what it means for our screens. **Steal the mechanism, never the look.** Desk research on 2026-11-04.

**Labels used on this page:**
- *(opened)*: the source was read.
- *(described)*: known only from secondary coverage, or the primary page wouldn't load.
- `^[inferred]`: our synthesis.

Pair it with the [[09-design/steal-library|Steal library]] (cards per mechanism) and the [[24-synthesis/casebook|Casebook]] (business, tech and trust cases).

## 1. Scores: what incumbents do, and what hurts

| Product | Mechanism | What we take |
|---|---|---|
| Oura Readiness *(opened)* | 9 named contributors, each against personal averages. It takes "up to two weeks" to learn your averages. Bottom band is "Pay Attention", not "poor" | Every suggestion lists its 2–3 contributing records. Onboarding states the learning period, and until then the card abstains |
| Oura Advisor *(opened, Mar 2025)* | The user picks the tone and check-in frequency, can delete "Memories", and is told it "can make mistakes" | Privacy controls include "What the agent remembers"; settings include "How often may I interrupt you?" |
| WHOOP Recovery *(opened)* | 0–100% computed once on waking, then stable for the day. Green/yellow/red bands, with red as "rest is likely what your body needs" | Take the stability (hysteresis, "updated 14:05"). **Reject** the traffic light: red turns a noisy estimate into a verdict and fails colour-blind users |
| Garmin Body Battery and Training Readiness *(described)* | An everyday metaphor (a battery), but two overlapping scores can disagree | One suggestion per moment. No invented quantities like a "focus battery" |
| Fitbit Daily Readiness *(opened)* | Moved out of the Premium paywall in Sept 2024. Formula and bands changed, and some users lost history and saw "No score" with no explanation | Version the logic. Keep old history labelled with its rule version, and show a one-line "What changed" note |
| Apple Watch Vitals *(opened)* | "Typical for you" band. Quiet by default; alerts only when 2+ signals are out of range at once; plain disclaimer ("not designed to detect illness") | Show usual ranges, not scores. Never alert on one deviant metric. Same disclaimer pattern for escalation |
| Apple Sleep Score *(opened, Oct 2025)* | A transparent 50/30/20 points breakdown, but it ignores contradicting signals (a sick night can still score 100) | Show components, and show conflicts instead of averaging them away ("watch says rested, but you've been on one problem set for 2 h") |

**Score anxiety is real.**
- *Orthosomnia* (Baron 2017) describes case patients whose chase of a tracker score worsened their sleep. It's a small case series and not a recognised disorder.
- The strongest causal evidence is **Gavriloff et al. 2018** *(opened)*. Sham negative sleep feedback given to 63 adults with insomnia worsened next-day alertness (d = 0.79) and sleepiness (d = 0.55).
- **Telling someone they slept badly can make them feel worse, whatever the truth.** So sleep is context for a suggestion ("short night, 5 h 12 m by your ring"), never a grade. Offer "hide sleep details".

## 2. Nudges and interruptions

- **Timing beats wording.**
  - Notifications delivered at task breakpoints cut frustration and reaction time (Iqbal & Bailey, CHI 2008, *opened*).
  - But detecting breakpoints is only about 55% accurate, so deferral must always be one tap.
  - Receptivity depends on time, phone use, activity and location (Künzler 2019, 189 people, *opened*).
  - → Hold a suggestion for a likely seam: a window switch, idle time, the end of a typing burst.
- **Stretchly, the open-source break app** *(opened)*. It warns before a break, counts real idle time as a break already taken, respects OS Do Not Disturb, caps postponement and offers timed pauses ("until morning"). → Copy all of this. **Reject strict mode**: coercion contradicts calm-by-default, and our users are adults.
- **Rize** counts only focused time toward a break, but has a full-screen "you have to stop" mode. **Opal** has an unbypassable "Deep Focus" mode (both *opened*). → Take activity-based timing. Reject takeovers and anything you can't bypass.
- **one sec** (PNAS 2023, 280 people, *described*; the founder is a co-author). App opens fell 57%, and the **easy dismiss option was the strongest ingredient**, not the persuasive text. → The card's power is a one-second pause with an equally easy **Keep going**.
- **Duolingo** (Yancey & Settles, KDD 2020, *opened*). Its optimised reminders raised daily active users only **0.5%**, and they rely on novelty. Long-term users describe the guilt copy as bullying (*Spectator*, Jun 2026, *opened*). → Guilt is an engagement tool and the opposite of wellness. No streaks, no mascot disappointment, and "not now" is never punished.
- **Forest** *(described)*: a tree that dies if you leave. → Keep the commitment, drop the loss framing. Nothing dies.
- **Habit research** (Stawarz 2015, *described*): reminders support repetition but hinder habit formation, while event-based cues build automaticity. → In week 3, offer "attach breaks to your own events" ("after each problem set"), with fewer, fading pushes.
- **Notification permission:** Android and Apple both say to ask in context, not at launch. → Ask only after a suggestion the student found useful: "Want these on your phone when your laptop is closed?"

## 3. Uncertainty and sources for non-experts

- **Bare percentages are misread.** "30% chance of rain" means different things to different people (Gigerenzer 2005, *opened*). → Never "72% confidence". Use a reference class: "On days like this (short sleep, long session), a walk helped you refocus 4 of the last 6 times. Only 6 so far."
- **Frequency dots work.** FiveThirtyEight's 2020 dot swarm *(opened)*; quantile dotplots gave less variable estimates (Kay 2016, *described*). → A row of 6 dots in the "Why?" drawer, never on the main card.
- **Dark Sky / Apple Weather** *(opened)*: short-horizon, actionable predictions, silent when there's nothing to say, and the feature is **withheld where the data can't support it**. → We suggest only for the next 10–30 minutes. When a source is missing, drop the claims that needed it.
- **Patient portals** *(opened)*:
  - 96% of 8,139 patients want results immediately; worry rises mainly for abnormal results (Steitz 2023).
  - A labelled "harm anchor" line ("Many doctors are not concerned until here") cut urgent-contact intent for near-normal values to 34.7%, from 48–58% (Zikmund-Fisher 2018).
  - → Separate "a bit below your usual" from "a pattern worth talking to someone about". Escalate on persistence, never on one night.
- **A citation chip is not grounding.** In generative search engines, only 51.5% of sentences were fully supported and only 74.5% of citations backed their sentence (Liu 2023, *opened*). → Every reason line links to a timestamped record ("Oura · sleep · Tue 3 Nov 01:12–06:24"). A sentence with no record isn't shown.
- **Human-AI guidelines** (Amershi 2019; only G18 "Notify users about changes" was confirmed, the rest are from memory). → State limits at onboarding, time by context, make dismissing and correcting one tap, scope down when in doubt, explain why, offer global pause/delete, and tell users when the logic changes.
- **The abstain card is a first-class state** ^[inferred]. It says what's missing ("watch hasn't synced since 09:40"), what can still be said ("70 min on this tab"), and what would fix it ("open the Oura app"). Same calm weight as a suggestion; it is never styled as an error.

## 4. Escalation and crisis

- **Safe-messaging guidance** *(opened)*: no method details, nothing sensational, and hopeful, specific, action-oriented copy. → We never infer "suicidal" from sensors. Distress comes from the student's own words or from persistent signals. Resources are always shown, never made conditional on the student saying more.
- **Gated resources are invisible.** Instagram's 2016 "Can we help?" was reachable only by searching a harmful term *(described)*. → A quiet **"Talk to someone"** link lives on every screen. Escalation cards are an extra door, not the only one.
- **People rarely call.** Of ~19,000 Wysa users in a confirmed crisis, only **2.4%** called a helpline, while about half used a safety plan or grounding exercise *(opened, company report)*. Woebot confirms detected crisis language with the user first *(described)*. → The escalate card is a three-rung ladder:
  1. talk now (the campus 24/7 counselling line, 988 call or text);
  2. book a time (counselling, or TimelyCare if the school offers it);
  3. something for right now (a 2-minute grounding exercise).

  Plus one line: "I'm an app, not a counsellor. If you're in danger, call 911."
- **Columbia's numbers conflict across its own pages**, and the 24/7 counselling line is only described. **Verify with Columbia Health before any pilot, and keep the numbers in config, not code.**
- **Wording.**
  - Not "Warning: abnormal sleep pattern detected". Instead: "You've slept under 6 hours on 9 of the last 14 nights. That's a lot to carry during midterms."
  - Not "Contact a doctor immediately" in a non-emergency. Instead: "If this keeps happening, it's worth mentioning to a doctor at Columbia Health."

## 5. Consent and privacy UX

- **HealthKit and Health Connect** *(described)*: permission per data type, asked at the moment of need. HealthKit hides denial (a denied read looks like empty data) so apps can't pressure users. → Onboard by source (watch or ring → laptop → phone alerts), each with "what I read / what I never read / why". Missing data is normal (abstain), never a nag. Don't build a fake system sheet.
- **App Tracking Transparency:** when asked plainly, most people say no (early US opt-in was reportedly ~4%, *described*). → The product must work on the minimum (laptop-only), and every extra source earns its yes with a visible benefit.
- **Privacy nutrition labels** (CMU IoT label, two layers, *opened*). → Each source card has a 3-row label: collected · used for · kept for and shared with. Details sit behind an expander.
- **Symmetric choices are the legal bar.** California's privacy agency says "dark patterns are about effect, not intent". "Yes / Ask me later" is **not** symmetric; "Yes / No" is; and consent obtained through a dark pattern isn't consent (CPPA advisory 2024-02, *opened*). The FTC's 2022 report lists repeated prompts, confusing settings and a "share" button more prominent than "decline" (*opened*, via summary). → Equal-weight **Allow** and **Use without it**. Turning off takes no more taps than turning on.
- **Leaving must be easy.** Headspace was reported to block deletion while a subscription was active *(opened, user submission)*. → "Delete everything" is two taps from privacy controls, with export first, a plain timeline of when deletion completes, and no retention offer.

## 6. Students and athletes

- **Coach visibility is a power imbalance.** Athletes "may not feel they have a choice" in sharing, and coaches should review data *with* athletes, not privately (Kolovson, University of Washington, *opened*). Some programmes mandate devices, and no federal law or NCAA rule governs this data *(described)*. → **No coach view in v1.** The privacy screen says: "Your coach, team and school can't see anything here." Escalation goes to the student only.
- **ADHD-friendly heuristics** *(described; practitioner guidance, no trials)*:
  - concrete times, not "soon";
  - visible timers;
  - predictable layouts;
  - action buttons, not a lone "OK";
  - sound off by default.

  → Buttons say **Continue · Walk 10 min · Break 15 min**, and snooze shows "back at 15:40".
- **WCAG 2.2** *(opened)*:
  - targets at least 24×24 CSS px (we use about 44 on phones);
  - non-text contrast at least 3:1 and text 4.5:1;
  - never colour alone;
  - honour reduced motion.

  The card fits above the fold at 360×740 and on an iPhone at 390×844. On a 1366×768 laptop it's a small non-modal panel.

## 7. Design failures

| Case | What happened | Lesson for us |
|---|---|---|
| Amazon Halo Tone (2020) | Sampled your voice all day and labelled how you sound to others ("stressed, irritated"); body-fat scans in "tight, minimal clothing". Called creepy at launch *(opened)* | Never infer emotion or character from passive signals and present it as fact. Report only what sensors measure |
| Fitbit app redesign (Sept 2023) | "Cluttered and overwhelming", more taps to basics, no dark mode, poor colour-blind contrast, upsell pushed. Fitbit promised fixes *(opened)* | The suggestion card is home. Never bury the one thing people check |
| Fitbit Readiness paywall and recalculation | Users' own physiological insight was behind Premium; after the change some lost history *(opened, community reports)* | Never paywall a user's own data. Version history; explain changes |
| WHOOP 5.0 upgrade (May 2025) | Charged for an upgrade a web page had promised free. Reversed after Reddit backlash; WHOOP said the post "should never have been posted" *(opened)* | Trust is a ledger. Privacy and product copy must be literally true |
| Duolingo guilt | +0.5% daily users from optimised reminders, experienced by some as bullying *(opened)* | No guilt, no streaks, no loss framing |
| Apple fall and crash detection | Ski falls triggered automatic 911 calls; the cancel window is easy to miss under layers; counties reported 15–30 calls a day *(opened / described)* | Never auto-contact anyone. False alarms teach people to ignore you |
| Strava heatmap (Jan 2018) | Exposed military bases; privacy zones were off by default *(opened)* | Defaults are the policy. "Anonymous" aggregates can identify people. Private and local by default |
| Headspace cancellation | Reported trouble cancelling and deleting *(opened, user submission)* | A wellness brand that's hard to leave loses its premise |

## 8. Twelve rules for our screens ^[inferred]

1. **Reason before number, and the record before the reason.** No composite "focus score".
2. **Abstaining is a designed state**, with its three parts (missing, still known, how to fix). It's the default during the learning period.
3. **Frequencies with a reference class**, with n shown. Dots go in the drawer only.
4. **Interrupt at seams.** Count idle time as a break, respect Focus/DND, and warn first.
5. **"Not now" is first-class and unpunished**, with an exact return time. No takeovers, guilt or streaks.
6. **Never a verdict about the body or mood.** Sleep is context, not a grade.
7. **Colour is never the message.** Neutral per-action hues with text; no red/amber/green.
8. **Stable, versioned logic.** Hysteresis, "updated hh:mm", and a "What changed" note.
9. **Escalation is a ladder the student controls.** "Talk to someone" on every screen; trigger on persistence; three rungs; never auto-contact; never notify coaches.
10. **Consent by source, in the moment, symmetric.** Notification permission comes after the first useful suggestion, and laptop-only works on day 1.
11. **Private by default and easy to leave.** Categories, not titles; no coach view; delete in at most 2 taps; copy that is literally true.
12. **Calm, accessible, explicit.** One decision per screen, above the fold, about 44 px targets, reduced motion, no sound, minutes on the buttons.

## Open gaps

- TrainingPeaks and Catapult athlete views weren't researched.
- Columbia's current after-hours numbers are unverified.
- The Amershi guideline wording beyond G18 is unverified.
- The date Halo was discontinued is unverified here; see the [[24-synthesis/casebook|Casebook]].

## Sources (opened 2026-11-04 unless marked)

- Oura Readiness: https://support.ouraring.com/hc/en-us/articles/360057791533
- Oura Advisor: https://ouraring.com/blog/oura-advisor
- WHOOP 101: https://developer.whoop.com/docs/whoop-101
- Fitbit Readiness change: https://gadgetsandwearables.com/2024/09/12/daily-readiness-score-non-premium/
- Apple Vitals: https://tidbits.com/2025/01/21/watchos-11s-vitals-app-may-detect-illness/
- Apple Sleep Score: https://www.macworld.com/article/2947066/i-dont-trust-my-apple-watchs-sleep-score-and-neither-should-you.html
- Orthosomnia: https://www.sleepfoundation.org/sleep-hygiene/orthosomnia
- Gavriloff 2018: https://www.oxfordhealth.nhs.uk/orka/title/sham-sleep-feedback-delivered-via-actigraphy-biases-daytime-symptom-reports-in-people-with-insomnia-implications-for-insomnia-disorder-and-wearable-devices/
- Künzler 2019: https://www.cs.dartmouth.edu/dfk/research/kunzler-receptivity/kunzler-receptivity.pdf
- Iqbal & Bailey 2008: https://www.interruptions.net/literature/Iqbal-CHI08.pdf
- Stretchly: https://github.com/hovancik/stretchly
- Rize review: https://dhruvirzala.com/rize-review/
- Opal: https://apps.apple.com/us/app/opal-screen-time-for-focus/id1497465230
- Duolingo KDD 2020: https://research.duolingo.com/papers/yancey.kdd20.pdf
- *Spectator* on Duolingo: https://spectator.com/article/im-being-bullied-by-duolingo/
- Android notification permission: https://developer.android.com/develop/ui/views/notifications/notification-permission
- Gigerenzer 2005: https://researchonline.lse.ac.uk/id/eprint/16975
- Apple Weather availability: https://support.apple.com/102594
- FiveThirtyEight 2020 design: https://www.niemanlab.org/2020/07/this-is-how-fivethirtyeight-is-trying-to-build-the-right-amount-of-uncertainty-into-its-2020-election-data-analysis/
- Steitz 2023: https://bidmc.org/news-stories/all-news-stories/news/2023/03/survey-shows-patients-prefer-immediate-access-to-test-results
- Zikmund-Fisher 2018: https://pmc.ncbi.nlm.nih.gov/articles/PMC5891666/
- Liu 2023: https://arxiv.org/abs/2304.09848
- Venkit 2024: https://arxiv.org/abs/2410.22349
- Wysa report: https://blogs.wysa.io/blog/wysa-news/ai-detects-82-of-mental-health-app-users-in-crisis-finds-wysas-global-study-released-on-the-role-of-ai-to-detect-and-manage-distress
- Safe messaging: https://suicidepreventionmessaging.org/safety and https://theactionalliance.org/messaging/public-messaging
- TimelyCare (Skidmore): https://www.skidmore.edu/counseling/timelycare/index.php
- Instagram 2019: https://about.instagram.com/blog/announcements/supporting-and-protecting-vulnerable-people-on-instagram/
- CPPA advisory 2024-02: https://www.cppa.ca.gov/pdf/enfadvisory202402.pdf
- FTC dark patterns (summary): https://www.venable.com/insights/blogs/2022/09/the-ftc-brings-more-light-to-dark-patterns-in-new
- CMU privacy label: https://www.helpnetsecurity.com/2020/06/04/iot-security-label/
- Kolovson on athletes: https://kuow.org/stories/the-pros-and-cons-of-tracking-college-athletes-health
- WCAG 2.2 target size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- WCAG 2.2 non-text contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Fitbit redesign: https://gadgetsandwearables.com/2023/09/30/fitbit-app-redesign-criticism/
- Strava: https://www.theregister.com/2018/01/29/strava_heatmap_military_base_locations/
- Apple 911 calls: https://www.advnture.com/news/apple-watches-calling-911-from-ski-resorts
- WHOOP upgrade: https://techcrunch.com/2025/05/11/fitness-tracker-whoop-faces-unhappy-customers-over-upgrade-policy
- Amazon Halo: https://salon.com/2020/08/28/amazons-body-scanning-conversation-recording-fitness-band-faces-swift-backlash-for-creep-factor
- Headspace: https://www.deceptive.design/articles/headspace-difficulty-canceling-subscriptions-and-deleting-accounts
- Described only:
  - one sec, PNAS 2023 (PubMed 36795756)
  - Kay 2016: https://idl.uw.edu/papers/when-ish-is-my-bus
  - Stawarz 2015
  - Baron 2017 (DOI 10.5664/jcsm.6472)
  - Columbia CPS quick guide (verify before use)

## Related

- [[09-design/09-design|Design hub]] · [[09-design/ui-ux-quality-bar|UI/UX quality bar]] · [[13-team/exec-team|AI exec team]] · [[10-trust-safety/privacy-and-consent|Privacy and consent]]
