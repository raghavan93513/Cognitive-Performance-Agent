---
title: Casebook
category: 24-synthesis
tags: [synthesis, reference, ethics]
aliases: [case studies, what went right and wrong, competitor cases]
sources: ["desk research 2026-11-04 (sources listed at the bottom)"]
summary: "Case studies, good and bad, from wearables, focus apps, campus wellbeing, digital therapeutics, health privacy and health AI: what happened, why, and the lesson for us."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: core
created: 2026-11-04T23:59:00Z
updated: 2026-11-04T23:59:00Z
---

# Casebook

What happened to the companies closest to our problem, and what it teaches us. Every seat names "the case it rhymes with" in its memos, and this page is where those cases live. Each entry shows what happened (sourced), why (sourced, or `^[inferred]`), and the lesson.

The seat tags say who leans on each case most: **CEO**, **CTO**, **UIUX**. The **CMO** uses every business and trust case tagged CEO (growth, positioning, privacy promises). The **CSO** uses the overclaiming and validation cases (A12–A15, B1, C2, C3, C8–C10). Design-only failures are covered in more depth in [[09-design/design-evidence|Design evidence]] §7.

## A. Business and growth

| # | Case | What happened | Why | Lesson for us | Seats |
|---|---|---|---|---|---|
| A1 | **WHOOP, athlete-first** | A college squash captain built it to avoid overtraining. Conference USA's official wearable (2021); every Penn State athlete through WHOOP Unite (2022), with athlete **opt-in** to the team dashboard. 2.5M+ members, $1.1B bookings run rate, $10.1B valuation (Mar 2026) | A membership with hardware included turned a gadget into recurring revenue. Athletes gave credibility and a reason to wear it 24/7 ^[inferred] | Athlete data belongs to the athlete, shared only by opt-in. An athlete wedge can build credibility for everyone | CEO |
| A2 | **Oura, sleep-first** | FY2025 revenue $907.9M; $1.21B in nine months (+74%); 5.0M paid members; ~85% retention. Grew organically, then through retail. Its S-1 names a class action over sleep-stage accuracy | One daily ritual (the morning score) done well | A daily moment builds the habit. Accuracy is legal risk too, so show uncertainty instead of false precision | CEO, CTO |
| A3 | **Rise Science, athletes → consumers** | Started in Northwestern football, worked with pro teams, then a $60/yr consumer "energy" app. Beta users opened it 14 of 28 days | It sells an outcome (energy), not raw data | **The closest model to us.** Sell "what should I do now, and why", not a dashboard | CEO |
| A4 | **Jawbone** | Valued at ~$3B in 2015, liquidated in July 2017 after repeatedly missing shipping deadlines while Fitbit took the market | Hardware plus execution risk | We build no hardware. Our version of this risk is depending on a platform we don't control (A6) | CEO |
| A5 | **Pebble** | Sold its software assets to Fitbit for under $40M in Dec 2016, "neck-deep in debt" | Kickstarter hype is not unit economics | A loyal community can outlive the company: keep users' data exportable | CEO |
| A6 | **Fitbit and the API turn-off** | Google bought Fitbit for $2.1B (Jan 2021). The Fitbit Web API was **turned off on 2 Nov 2026**; the Google Health API's scopes are all "Restricted" and need a security review | The platform owner changes the rules | **Platform risk is our biggest technical business risk.** Build behind an adapter (Google Health, HealthKit, Health Connect), budget for the review, and keep a no-wearable demo mode | CEO, CTO |
| A7 | **Amazon Halo** | Launched Aug 2020 with always-on voice "tone" analysis and body scans, criticized as invasive. Shutdown announced Apr 2023, refunds for the last 12 months | Creepy sensing; no reason given for the shutdown ^[inferred] | Sensing that feels creepy kills adoption even for a giant. Make "no keystrokes, URLs or screenshots" a headline. Halo's refund-and-delete exit was the right way to leave | CEO, UIUX |
| A8 | **Basis Peak** | Intel bought Basis for $100M+ in 2014. Overheating led to a full recall on 4 Aug 2016; Basis shut down and users had data access only until year end | Physical safety failure | Have a clean exit plan: export and a deletion promise | CEO |
| A9 | **Focus apps** (RescueTime, Rize, Forest, Freedom) | No public efficacy data or audited user counts. Rize says it never takes screenshots or keystrokes but **reads window titles and URLs** `[unverified]` | Category norms allow heavy collection | Our idle time plus app *category* is stricter than the category leaders. Say so. Forest shows a gentle nudge can keep users without physiology | CEO, CTO |
| A10 | **Headspace and Calm** | Turned to B2B. Headspace reaches universities through Uwill (exclusive since Jun 2024). Both had layoffs in 2023 `[unverified]` | Consumer growth in content-only wellness stalled ^[inferred] | Universities are reachable through existing vendors. Plugging in may beat selling to each campus | CEO |
| A11 | **Mindstrong** | Raised $160M to infer mental health from phone use. Laid off 128 and closed in early 2023; SonderMind bought the tech | The funding crash, and passive "digital biomarkers" were hard to turn into value ^[inferred] | Never promise to infer mental state from passive signals | CEO, CTO |
| A12 | **Pear Therapeutics** | Three FDA-authorized apps. Chapter 11 in Apr 2023; the CEO blamed payers who wouldn't pay. Assets sold for ~$6M | Clearance doesn't create a payer | Staying wellness keeps us out of the reimbursement trap. Evidence is not adoption | CEO |
| A13 | **Akili (EndeavorRx)** | FDA-authorized ADHD game. Cut 40% of staff in 2023 and went over-the-counter: **126K downloads, 4.2K active, $341K revenue** in 3 months. Acquired in 2024 | Downloads are not users | Plan around ~3% download-to-active. ADHD students are a real segment, but make no ADHD treatment claims | CEO |
| A14 | **Woebot** | Rule-based CBT chatbot, ~1.5M users. Shut its consumer app in Jun 2025; the founder blamed the cost of FDA authorization and FDA's undecided approach to LLMs | A regulatory gray zone | An LLM wellness agent sits in that gray zone. Stay strictly non-clinical, abstain, and hand off to humans | CEO, CTO |
| A15 | **Brain.fm and Endel** | Brain.fm co-published a peer-reviewed study with Northeastern (2024), with more benefit at higher self-reported ADHD symptoms `[unverified]` | One credible study beats marketing numbers | A small, honest Columbia evaluation is worth more than any claim | CEO, CTO |
| A16 | **Duolingo streaks** | Separating streak from daily goal raised day-14 retention 3.3%. Its optimised reminders raised daily users only 0.5%. Research shows people value the streak over the activity, and a broken streak raises quitting | Streaks work on engagement | Tired students read a broken streak as failure. No streaks; reward chosen rest | CEO, UIUX |
| A17 | **Chegg** | Subscribers −31%, revenue −30% in Q1 2025, then layoffs. Chegg blamed AI Overviews and student AI offerings | General AI ate study content | "Help students study" is being eaten by general AI. Our edge is personal context plus privacy, not content | CEO |
| A18 | **WHOOP 5.0 upgrade** | Charged existing members for an upgrade a web page had promised free. Partly reversed within days; the old promise "should never have been posted" | A broken written promise | Every promise in our onboarding and privacy copy must be one we can keep | CEO, UIUX |

## B. Trust, privacy and regulation

| # | Case | What happened | Lesson for us | Seats |
|---|---|---|---|---|
| B1 | **WHOOP's FDA warning letter** | 14 Jul 2025: FDA said Blood Pressure Insights was an uncleared device. A blood-pressure estimate is "inherently associated" with diagnosis, and the colour gauge and "medical-grade" claims undercut the disclaimers. Closed 17 Jun 2026 after changes to labelling and the dial (details `[unverified]`) | **Wording and UI decide whether you're regulated.** Never say "clinical", "medical-grade" or "diagnose", name a disease, or use threshold colours. "Consider talking to campus counselling or a doctor" is allowed if it names no disease and calls nothing abnormal | All |
| B2 | **FTC v. Flo Health** (2021) | Shared health data with Facebook and Google analytics despite promises. In 2025 a jury found **Meta** liable for what its SDK collected | No ad or analytics SDKs anywhere near health screens | CTO, CEO |
| B3 | **FTC v. BetterHelp** (2023) | Sent emails, IPs and intake answers to ad platforms. $7.8M in refunds; banned from sharing health data for ads | Same as B2. Marketing pixels are a privacy decision | CEO, CTO |
| B4 | **FTC v. GoodRx** (2023) | First Health Breach Notification Rule action, $1.5M. Included a seal falsely implying HIPAA compliance | Never imply HIPAA or clinical status we don't have | CEO |
| B5 | **Crisis Text Line and Loris.ai** (2022) | Shared "anonymized" crisis conversations with a for-profit spin-off to train software. Ended after press and an FCC letter | Even consented, "anonymized" reuse of distress data destroys trust. **No secondary use of logs**, ever | CEO, CTO |
| B6 | **Cerebral** (2024) | Pixels sent data on ~3.2M people to ad platforms; hard cancellation. $7M; easy cancellation ordered | Easy cancel and delete are legal requirements, not just good UX | UIUX, CTO |
| B7 | **FTC Health Breach Notification Rule update** (Apr 2024) | Now explicitly covers non-HIPAA health apps. A "breach" includes unauthorized *disclosure*. An app pulling from several sources is a personal health record | We likely count as a personal-health-record vendor ^[inferred]. Design for it | CTO, CEO |
| B8 | **Washington My Health My Data Act** (2024) | Consumer health data includes data *inferred* from non-health data. Selling needs signed authorization; private right of action | Sleep, HR and HRV are in scope for any Washington user. Consent-first covers it ^[inferred] | CTO |
| B9 | **College-athlete biometric data** | ~80% of athletes say their team uses tracking tech (vendor report). No NCAA rules; state laws vary. Scholars doubt consent is voluntary when playing time is at stake | Default: the athlete owns it; staff see nothing unless the athlete opts in each time; delete on leaving the team; no penalty for opting out | All |
| B10 | **Strava heatmap** (2018) | "Anonymized" aggregate activity revealed military bases | One team on one campus is a small group, so aggregates can identify people. No team or campus aggregates without a minimum group size | CTO, UIUX |
| B11 | **HIPAA vs FERPA** | HIPAA generally doesn't cover a consumer wellness app. Records a university holds may fall under FERPA `[unverified]` | As an independent app we sit under the FTC Act, the breach rule and state law. A campus contract needs counsel | CEO |

## C. Technology and science

Evidence grades and sources are on [[12-research/science-and-tech-evidence|Science and tech evidence]].

| # | Case | What happened | Lesson for us | Seats |
|---|---|---|---|---|
| C1 | **Google Flu Trends** | Overestimated flu in 100 of 108 weeks (2011–13) from input drift and overfitting | Version every data source; re-baseline after any device or firmware change | CTO |
| C2 | **Epic Sepsis Model** | External AUC 0.63; missed 67% of cases while alerting on 18% of patients | Vendor accuracy doesn't transfer. Measure our own false-alarm rate and cap prompts | CTO, UIUX |
| C3 | **cStress and lab stress models** | 89% recall in the lab, 72% accuracy in the field | Lab results don't carry to students' lives. No stress detection claims | CTO |
| C4 | **Garmin Stress Score** | In 95 students it tracked *positive* arousal, not stress (preprint, 2025) | Vendor labels can be wrong. Don't import a vendor's "stress" as truth | CTO, CEO |
| C5 | **ChatGPT Health** | A journalist's cardiac grade swung F ↔ B on repeated asks (Jan 2026) | The LLM never computes or grades. Run a stability check | CTO |
| C6 | **PHIA (Google)** | A code-using agent was still ~16% wrong on numerical questions | Even good agents miscount. Check every number against the model's JSON | CTO |
| C7 | **HeartSteps** | Walking prompts +24% steps at first, then the effect decayed | Expect novelty decay. Cap and vary prompts for clarity, never for pressure | CTO, UIUX |
| C8 | **Kaur et al. (Microsoft, CHI 2020)** | Predicted continue / transition / break at work; 77% of break suggestions rated well-timed | **Closest prior art.** Cite it, and use its timing rating as our benchmark | CTO, CEO |
| C9 | **Babylon Health and IBM Watson** | Benchmark and hypothetical-case wins didn't hold in practice `[secondary]` | No "beats coaches" claims. Label synthetic results | CEO, CTO |
| C10 | **Pulse oximetry bias** | Hidden low oxygen ~3× more common in Black patients; FDA's fix excludes wellness devices | Report by subgroup when n allows. Never claim fairness | CTO |

## D. Design failures

Halo Tone, the Fitbit 2023 redesign, the Fitbit Readiness paywall, WHOOP 5.0, Duolingo guilt, Apple fall-detection 911 calls, the Strava defaults and Headspace deletion are in [[09-design/design-evidence|Design evidence]] §7.

## The patterns behind the cases ^[inferred]

1. **Creepy sensing kills adoption** (Halo, Mindstrong). Our minimal collection is a feature to lead with.
2. **Platform dependence is existential** (Fitbit API, Jawbone's execution, Pebble). Keep an adapter layer and a no-wearable path.
3. **Clinical claims are a trap** (Pear, Akili, Woebot, WHOOP blood pressure). Stay wellness in words and in colours.
4. **Ad and analytics SDKs plus health data equals enforcement** (Flo, BetterHelp, GoodRx, Cerebral).
5. **Broken promises cost more than they earn** (WHOOP 5.0, Crisis Text Line).
6. **Outcome over data** (Rise, Oura). One actionable answer a day beats a dashboard.
7. **Downloads aren't users** (Akili ~3%; mental-health apps 3.3% at 30 days). Plan for retention honestly.
8. **Lab accuracy and benchmarks don't transfer** (cStress, Epic, Babylon, Flu Trends). Validate on our own users and report the spread.
9. **LLMs shouldn't do the arithmetic** (ChatGPT Health, PHIA). Code computes; the LLM explains.

## Sources

All the business and trust sources are listed on [[24-synthesis/market-map|Market map]]. Additional ones, opened 2026-11-04:
- Jawbone: https://fortune.com/2017/07/06/jawbone-liquidates-assets
- Amazon Halo: https://www.macrumors.com/2023/04/26/amazon-discontinuing-halo-wristband/
- Pebble: https://engadget.com/2016/12/07/bloomberg-fitbit-pebble-acquisition
- Basis Peak: https://www.macrumors.com/2016/08/04/intel-recalls-basis-peak-tracker-overheating
- Strava: https://www.kqed.org/news/11646580
- Woebot: https://www.statnews.com/2025/07/02/woebot-mental-health-chatbot-shuts-down-founder-says-ai-moving-faster-than-regulators/
- Mindstrong: https://www.medtechdive.com/news/sondermind-acquires-mindstrong-technology-digital-mental-health/645794/
- Pear: https://pharmaphorum.com/news/pear-tx-files-bankruptcy-will-seek-sell-assets
- WHOOP FDA warning letter: https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/whoop-inc-709755-07142025
- WHOOP 5.0: https://techcrunch.com/2025/05/11/fitness-tracker-whoop-faces-unhappy-customers-over-upgrade-policy
- Duolingo streak: https://blog.duolingo.com/improving-the-streak
- Streak research summary: https://thedecisionlab.com/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification
- FTC Flo: https://www.ftc.gov/news-events/news/press-releases/2021/06/ftc-finalizes-order-flo-health-fertility-tracking-app-shared-sensitive-health-data-facebook-google
- FTC BetterHelp: https://www.ftc.gov/news-events/news/press-releases/2023/07/ftc-gives-final-approval-order-banning-betterhelp-sharing-sensitive-health-data-advertising
- FTC GoodRx: https://www.ftc.gov/news-events/news/press-releases/2023/02/ftc-enforcement-action-bar-goodrx-sharing-consumers-sensitive-health-info-advertising
- FTC breach rule: https://www.ftc.gov/news-events/news/press-releases/2024/04/ftc-finalizes-changes-health-breach-notification-rule
- FTC Cerebral: https://www.ftc.gov/news-events/news/press-releases/2024/04/proposed-ftc-order-will-prohibit-telehealth-firm-cerebral-using-or-disclosing-sensitive-data
- Crisis Text Line: https://www.popsci.com/technology/crisis-text-line-stops-sharing-data-loris-ai/
- Washington MHMDA: https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy
- Athlete privacy: https://www.theregreview.org/2025/08/12/taylor-ncaa-athletes-right-to-privacy-in-the-digital-age/

## Related

- [[24-synthesis/24-synthesis|Synthesis hub]] · [[24-synthesis/market-map|Market map]] · [[24-synthesis/competitive-landscape|Competitive landscape]] · [[13-team/exec-team|AI exec team]] · [[10-trust-safety/privacy-and-consent|Privacy and consent]]
