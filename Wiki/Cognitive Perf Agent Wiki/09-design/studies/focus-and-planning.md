---
title: "Study — Focus and planning tools"
category: 09-design
tags: [frontend, reference, synthesis, students]
sources: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409", "https://www.medien.ifi.lmu.de/pubdb/publications/pub/haliburton2024chi/haliburton2024chi.pdf", "https://www.frontiersin.org/articles/10.3389/fncom.2021.760561/full", "https://community.opalapp.com/t/feature-request-give-user-more-valuable-information-in-opal-score-overview-ux-feedback-on-opal-score-page/10906", "https://help.structured.app/en/articles/998530", "https://forestapp.cc", "https://endel.io/", "https://www.notion.com/blog/notion-calendar-helps-you-manage-your-time-more-effectively"]
summary: "Notion, Notion Calendar, Structured, one sec, Opal, Forest and Endel studied for our continue / walk / break moment: how each intervenes, its evidence (one sec PNAS verified, Endel's 7x not found) and what to steal."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T01:00:00Z
updated: 2026-11-05T01:00:00Z
---
# Study — Focus and planning tools

> Studied by the UIUX seat on 2026-11-05 from public sources (no accounts). "Seen: researched" = docs, store pages, reviews and articles read, not hands-on.

This page goes deeper than the one-line entries in [[09-design/design-evidence|Design evidence]] §2 and the study list in [[09-design/steal-library|Steal library]]. It doesn't repeat them. One correction to those pages: the one sec PNAS paper is now **opened**, not described (see below). App Store ratings and prices are as listed on 2026-11-05 and change often.

## Takeaways for our screens

- **Suggestion card: the exit carries the effect, not the words.** In one sec's controlled experiment, offering an easy way out had the strongest effect. A short wait helped on its own but added nothing beyond the exit. The persuasive message alone had no effect ([PNAS 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409)). → The card's job is a calm pause with **Keep going** and **Short walk** at equal weight. Our reason line exists for trust, not to persuade. Don't expect copy to move behaviour. ^[inferred]
- **Timing: ask for the plan up front, then arrive when it ends.** one sec's "Always Ask" mode asks how long you want and only steps in when that time is up ([help](https://feedback.one-sec.app/help/articles/1693386-immediate-vs-delayed-vs-always-ask-which-one-is-the)). Notion Calendar's alert lands just before a meeting, with the one action you need ([Notion blog](https://www.notion.com/blog/notion-calendar-helps-you-manage-your-time-more-effectively)). → An optional "How long are you going for?" at the start of a session, and calendar edges (class in 15 min) as natural seams. ^[inferred]
- **Break timer: a break is something you set, with a return time.** Opal's Breaks ask for an app, an intention and a timer ([App Store](https://apps.apple.com/us/app/opal-screen-time-control/id1497465230)). Forest puts breathing and sound "between sessions" ([forestapp.cc](https://forestapp.cc)). Endel added an interval Focus Timer ([App Store](https://apps.apple.com/us/app/endel-focus-sleep-relax/id1346247457)). → Our break timer shows when it ends, offers one optional calm thing, and never punishes running over. ^[inferred]
- **History: show breaks as refills on a day timeline.** Structured's Energy Monitor marks relaxing tasks as giving energy back, but only mid-day ([help](https://help.structured.app/en/articles/998530)). → History is a timeline of the day with breaks drawn as refills, answering "did the breaks help?". Never a withered tree for a declined suggestion. ^[inferred]
- **Learning period: say on screen that you're using typical values.** Opal's score compares you with your own rolling average, but uses population defaults in week 1. Users only learned this from a staff forum reply, because the screen doesn't say it ([Opal community](https://community.opalapp.com/t/feature-request-give-user-more-valuable-information-in-opal-score-overview-ux-feedback-on-opal-score-page/10906)). → Our learning state says it out loud, for example "Using typical values until we know your days (day 3 of about 7)". ^[inferred]
- **Lapses are normal, so design the way back.** At one sec, people take breaks from the interventions and quickly drift back to old habits ([Haliburton, CHI 2024](https://www.medien.ifi.lmu.de/pubdb/publications/pub/haliburton2024chi/haliburton2024chi.pdf)). → Pausing our app is a normal, guilt-free control. Coming back after a week off gets a plain "Welcome back" with no lost-progress message. ^[inferred]
- **Consent and the coach test: no shared fate, no institution in control.** In Forest, if one person gives up, the whole group's tree dies ([forestapp.cc](https://forestapp.cc)). Opal sells a schools product that blocks apps during school hours ([Opal blog](https://opalapp.com/blog/students-use-opal-app-store-reviews)). → Nothing in our product ties one student's choices to another's, and no school or coach mode exists. ^[inferred]
- **Sources: don't overclaim like the category.** Endel's "up to 7x" focus figure doesn't appear in its peer-reviewed paper, which its own funding supported (see Endel below). → Our sources chips label who funded the evidence, and we never advertise a multiplier. ^[inferred]

## Interrupt vs nudge vs block

| Product | How it intervenes | How hard | How it's dismissed | Break prompt |
|---|---|---|---|---|
| Notion | Doesn't; it's a workspace | None | n/a | None built in |
| Notion Calendar | Alert just before an event, with a join link; countdown in the menu bar | Soft, informational | System notification | None |
| Structured | Alerts at task times; Energy Monitor goes orange or red when the day is overplanned | Soft (planning-time warning) | Reschedule or ignore | Free Pomodoro timer; Pro "Intervals" |
| one sec | Breathing pause (default 10 s in the study) before a chosen app opens; re-intervention after a set time | Medium friction | "Don't open" or continue, every time | None (the pause is the break) |
| Opal | Block screen during sessions, at three levels from easy to "can't leave" | Soft to unbypassable | Wait in a waiting room, then Break or Stop; Deep Focus: one emergency pass a week | Breaks: app + intention + timer |
| Forest | Tree grows while you stay; leaving kills it; Deep Focus blocks other apps | Medium (loss aversion) | Give up (the tree dies and stays in your forest) | Mindful Space between sessions |
| Endel | Doesn't interrupt; background sound | None | Stop playback | Interval Focus Timer (Premium) |

Sources are in each product section below. Ours sits between Notion Calendar and one sec: an informational nudge at a seam, with an exit as easy as the action, and never a block. ^[inferred]

## Notion

- **What it is · who · platform · price:** a block-based workspace for notes, docs and databases. Students and educators with a school email get the Plus plan free, but personal Gmail or Outlook accounts don't qualify ([Notion for Education](https://www.notion.com/help/notion-for-education)). It runs on the web, Mac, Windows, iOS and Android.
- **Seen:** researched (help center, brand blog, reviews).
- **Key screens and flows:** pages built from blocks, database views, templates. Students often build study dashboards there ^[inferred]; I found no source on embedded Pomodoro widgets `[unverified]`.
- **Mechanisms:** no interruption at all. The calm comes from restraint: a monochrome UI, and an original brand illustrated entirely in black and white ([Notion blog](https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign)).
- **Visual style:** near-monochrome, type-led, low chrome `[described]`. A later campaign added bright primary colours to the brand, not to the app ([Notion blog](https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign)).
- **Copy and tone:** plain, instructional and neutral in the help pages.
- **Evidence behind it:** none claimed for focus.
- **What users love / complain about:** flexibility; but the mobile app feels slow on heavy pages, and offline mode (August 2025) is partial, with pages marked per device ([Android Authority](https://www.androidauthority.com/notion-offline-mode-vs-obsidian-3590238), [Capterra](https://www.capterra.com/p/186596/Notion/reviews/?rating=1)).
- **Steal:** a type-led, near-monochrome surface with one accent → the card's quiet hierarchy (suggestion, reason, sources) → suggestion card and visual system. ^[inferred]
- **Avoid:** heavy embeds that make mobile slow; a "build your own system" setup, which is the wrong first run for a tired student. ^[inferred]
- **Open questions:** do our pilot students already keep a study dashboard in Notion? Ask in [[03-users/ux-research-plan|UX research plan]] interviews.

## Notion Calendar

- **What it is · who · platform · price:** formerly Cron. Notion acquired it in June 2022 ([Raphael Schaad profile](https://yespress.io/raphael-schaad)) and relaunched it as Notion Calendar in January 2024 ([efficient.app](https://efficient.app/apps/notion-calendar)). It's free, rated 4.7★ from about 7.8K ratings, and on iPhone it's built around Google Calendar ([App Store](https://apps.apple.com/us/app/notion-calendar/id1607562761)).
- **Seen:** researched (help center, Notion blog, App Store, founder talks).
- **Key screens and flows:** the day and week grid; a menu-bar view of today with a countdown to the next event; the "S" key to share open times; the "?" key lists every shortcut; system-wide shortcuts to join a meeting ([shortcuts help](https://www.notion.com/help/notion-calendar-keyboard-shortcuts), [Notion blog](https://www.notion.com/blog/notion-calendar-helps-you-manage-your-time-more-effectively)).
- **Mechanisms:** an alert just before a meeting carrying the one action you need (join). An event on one calendar marks you busy on the others ([Notion blog](https://www.notion.com/blog/notion-calendar-helps-you-manage-your-time-more-effectively)). Its designer argues that hiding critical information behind hover is an anti-pattern (secondary summary, [Glasp](https://glasp.ai/youtube/2MrNSjJFBBI)).
- **Visual style:** dense but calm grid, precise placement, light and dark modes `[described]`.
- **Copy and tone:** terse and functional.
- **Evidence behind it:** none claimed.
- **What users love / complain about:** loved for the clean, scannable design and fast sync. Complaints include missing or disappearing events on iPhone, no copy-event, and (before 2.0) no month view ([App Store](https://apps.apple.com/us/app/notion-calendar/id1607562761)).
- **Steal:** (1) a menu-bar glance with a countdown → "52 min since your last break" in a laptop corner → the laptop surface. (2) An alert timed to an edge, carrying its one action → card arrives at a seam with **Short walk** ready → timing rule. (3) Nothing critical behind hover → reason and sources visible without hover → suggestion card (there's no hover on iPhone anyway). ^[inferred]
- **Avoid:** keyboard-only discoverability on mobile; sync failures that make people doubt the data. Our "watch not synced" state must be explicit. ^[inferred]
- **Open questions:** could reading a student's calendar (with consent) give us seams such as "class in 15 min"? That's a CTO and privacy question.

## Structured

- **What it is · who · platform · price:** a visual day planner where tasks, events and routines sit on one timeline. It's aimed at ADHD users, professionals and students; free with Pro (monthly, yearly or lifetime); rated 4.8★ from about 168K ratings; Editors' Choice ([App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946)). Runs on iPhone, iPad, Watch, Mac and the web, and claims 15M+ downloads ([structured.app](https://structured.app)).
- **Seen:** researched (App Store, help center, changelog, reviews).
- **Key screens and flows:** the day timeline with drag and drop; an inbox for loose tasks; AI "Replan" to move missed tasks (Pro); a free Pomodoro focus timer; Live Activities and widgets (free) ([App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946)).
- **Mechanisms:** the **Energy Monitor** (off by default). Each task gets a low, medium or high energy level that costs points per 30 minutes. Relaxing tasks (lotus icon) give points back, but only mid-day. The default daily limit is 20, and the help page calls the right limit highly individual. A gauge above the timeline turns green, orange or red ([help](https://help.structured.app/en/articles/998530)). It was built with the Dutch institute Breinstraat, originally for people with brain injuries ([changelog 3.4](https://feedback.structured.app/changelog/stuctured-34-energy-monitor)).
- **Visual style:** colour-coded blocks with icons on a vertical line; a satisfying check-off; a dyslexia-friendly font option `[described]` ([App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946)).
- **Copy and tone:** friendly, lowercase headlines, focused on less overwhelm ([structured.app](https://structured.app)).
- **Evidence behind it:** none published; the Energy Monitor was designed with clinicians, not tested in a trial `[unverified]`.
- **What users love / complain about:** loved because it's ADHD-friendly and "the only planner I stuck to" (paraphrased, Reddit via [Saner review](https://blog.saner.ai/structured-review/)). Complaints are recurring sync issues, key features behind Pro, and wanting fixed events (classes) locked while the rest moves ([Saner review](https://blog.saner.ai/structured-review/), [App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946)).
- **Steal:** (1) recharge blocks → breaks drawn as refills on the day line → history. (2) The timeline as the home of the day → after a break, the card can say "you're back, 25 min until your 3 pm class" → card context. (3) A Live Activity for the running block → the break timer on the Lock Screen → break timer. ^[inferred]
- **Avoid:** a green, orange and red gauge on human energy (a verdict on the body); points that look precise but are admitted to be rough. ^[inferred]
- **Open questions:** one sec already integrates with Structured to block apps while tasks are unfinished ([one sec App Store](https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441)). Do students run these two together, and does that stack feel controlling?

## one sec

- **What it is · who · platform · price:** a "self-nudge" app that puts a pause before chosen apps or sites open. iOS, Android and a desktop browser extension. Free for one app; Pro costs $19.99 a year or $99.99 lifetime; rated 4.8★ from about 24K ratings ([App Store](https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441), [one-sec.app](https://one-sec.app/)).
- **Seen:** researched (paper full text, help center, App Store, site).
- **Key screens and flows:** you choose target apps → opening one triggers a breathing animation (through an iOS Shortcuts automation) → you either don't open it or continue. Optionally it asks your intention. There are three modes: **Immediate**; **Delayed** (a few free minutes, then an intervention); and **Always Ask** (asks how long, then steps in). Re-interventions can kick in after a set time ([help](https://feedback.one-sec.app/help/articles/1693386-immediate-vs-delayed-vs-always-ask-which-one-is-the), [App Store](https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441)).
- **Mechanisms:** friction (a wait), a deliberation message, and a dismiss option. The study app used a **10-second** wait ([PNAS](https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409)). Other interventions include rotate the phone, type text, a math problem, and 4-7-8 breathing ([one-sec.app](https://one-sec.app/)).
- **Visual style:** a soft breathing animation, with a minimal, less colourful variant `[described]`.
- **Copy and tone:** confident marketing ("Gain back 2 hours per day"); playful in-app options such as a "U sure bout that?" prompt ([App Store](https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441)).
- **Evidence behind it (verified, full text opened):**
  - **Study 1** was an exploratory 6-week field study of 280 iOS users who completed it, out of 719 recruited, with **no control group**.
  - 36% of attempts to open a target app were dismissed, and attempts fell 37% from week 1 to week 6. Combined, actual openings fell 57%.
  - **Study 2** was a preregistered online experiment (N = 500, five arms, viral videos rather than real apps). The dismiss option was strongest (d > 0.66 vs control). The wait worked alone but added nothing beyond the option. The message alone didn't work.
  - The app's originator, F. Riedel, is a co-author. The authors themselves flag self-selection and dropouts ([PNAS, PMC9974409](https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409)).
  - A CHI 2024 analysis of 1,039 existing users found fewer, more intentional openings, but also a rebound after people paused the app ([Haliburton 2024](https://www.medien.ifi.lmu.de/pubdb/publications/pub/haliburton2024chi/haliburton2024chi.pdf)).
  - **Strength:** moderate. It's the best evidence in this set, but owner-involved and not a randomised field trial.
- **What users love / complain about:** loved because it makes the habit conscious and the opens-per-day count motivates. Complaints are about price (the developer offers scholarships). Version notes mention fixes to Shortcuts setup and strict-block cheating ([App Store](https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441)).
- **Steal:** (1) a symmetric exit → **Keep going** is a full-size button equal to **Short walk** → suggestion card. (2) "Always Ask" → an optional session length at start, so the card's arrival is expected → timing. (3) A breathing animation as the pause itself → a 1-minute breathe option inside a break → break timer. ^[inferred]
- **Avoid:** re-interventions that repeat (our card arrives once); puzzle-style friction (math, typing) that makes the wellness tool the obstacle. ^[inferred]
- **Open questions:** how long is the calm pause before our card's buttons respond? 0 s is our guess; any delay on our side would feel punitive. ^[inferred]

## Opal

- **What it is · who · platform · price:** a screen-time blocker for iPhone, plus a Chrome extension. Pro costs $19.99 a month or $99.99 a year, with student weekly plans; rated 4.7★ from about 91K ratings; Editors' Choice ([App Store](https://apps.apple.com/us/app/opal-screen-time-control/id1497465230)). It claims 10M users, 70% of them students ([Opal blog](https://opalapp.com/blog/students-use-opal-app-store-reviews)).
- **Seen:** researched (App Store, help center, blog, community forum).
- **Key screens and flows:** the home screen shows screen time, the **Focus Score** (the share of the day not on distracting apps), pickups, and an hourly bar chart with green focus time and red distracting time. You can label each app Productive, Distracting or Neutral ([Opal blog](https://opalapp.com/blog/introducing-the-new-opal-home-screen-track-your-screen-time-and-improve-your-focus)). Sessions have three "breaks allowed" levels, from easy, to wait longer, to "hardcore" with one emergency pass a week. Leaving goes through a waiting-room countdown ([help](https://opalapp.com/help/what-is-timer)). There's also a friends leaderboard and gem milestones ([App Store](https://apps.apple.com/us/app/opal-screen-time-control/id1497465230)).
- **Mechanisms:** graded commitment devices; blocks enforced through Apple's Screen Time API; "mindful block screens" with quotes. The newer Opal Score adds Phone in Bed (inferred from motion sensors), First Hour phone use and Sitting, each rated Great, Ok or Too Much. It compares you with your own rolling history, using population defaults in week 1 ([Opal community](https://community.opalapp.com/t/feature-request-give-user-more-valuable-information-in-opal-score-overview-ux-feedback-on-opal-score-page/10906)).
- **Visual style:** a gem as the central visual, dark and jewel-toned `[described]`, with red and green bars.
- **Copy and tone:** warm, upbeat, emoji; "screen time is the new diet" ([Opal blog](https://opalapp.com/blog/introducing-the-new-opal-home-screen-track-your-screen-time-and-improve-your-focus)).
- **Evidence behind it:** company-reported averages only (4–5 h a day down to under 2 h) ([Opal blog](https://opalapp.com/blog/students-use-opal-app-store-reviews)). I found no peer-reviewed study `[unverified]`.
- **What users love / complain about:** loved for blocks that stick and a clean interface. Complaints:
  - price: a student with ADHD says it's too expensive next to Apple's free Screen Time ([forum](https://community.opalapp.com/t/great-idea-for-an-app-wish-it-wasnt-so-expensive/1018));
  - the weekly emergency-pass cap, and an unblock button that failed in an emergency ([forum results](https://community.opal.so/t/please-come-back-unblock-all-apps-now/7825));
  - score rows nobody explains ([forum](https://community.opalapp.com/t/feature-request-give-user-more-valuable-information-in-opal-score-overview-ux-feedback-on-opal-score-page/10906)).
- **Steal:** (1) a break with an intention and a timer → "Short walk · back at 3:12" → break timer. (2) A personal rolling baseline with honest defaults → shown in words → learning-period state. (3) The student labels what counts → "this tab is study" → data sources and settings. ^[inferred]
- **Avoid:** unbypassable modes; a percentage score; red and green verdicts; sleep-adjacent grades ("Phone in Bed: Too Much"); leaderboards; a schools product. ^[inferred]
- **Open questions:** do students who use Opal want our product to block anything? Our position is no. ^[inferred]

## Forest

- **What it is · who · platform · price:** a focus timer where a virtual tree grows while you stay off your phone. iOS, Android and browser extensions. The core is free, with a Plus subscription at $35.99 a year; it moved from a one-time price to a subscription in December 2025 ([App Store](https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515), [Headway review](https://makeheadway.com/blog/forest-app-review/)). Rated 4.8★ from about 50K ratings.
- **Seen:** researched (official site, App Store, reviews).
- **Key screens and flows:** pick a length and species → plant → the tree grows → your forest and stats (tags, week, month and year views, Apple Health sync). **Plant Together** runs a shared session. **Time Guard** schedules blocks. **Mindful Space** offers breathing and sound between sessions. You can turn off the pause option for stricter focus ([forestapp.cc](https://forestapp.cc), [App Store](https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515)).
- **Mechanisms:** loss aversion: leave and the tree dies, and the dead tree stays in your forest ([Headway review](https://makeheadway.com/blog/forest-app-review/)). In a group session, one person giving up kills everyone's tree. Coins can fund real trees through Trees for the Future: the site claims 2M+ planted, with a cap of five per account ([forestapp.cc](https://forestapp.cc)).
- **Visual style:** soft illustrated trees on a calm field; the forest builds up into a collection `[described]`.
- **Copy and tone:** gentle and non-hustle, framed as "time well spent" ([forestapp.cc](https://forestapp.cc)).
- **Evidence behind it:** no published trial of Forest itself ([Headway review](https://makeheadway.com/blog/forest-app-review/)). I couldn't search further for academic studies (search budget used up) `[unverified]`.
- **What users love / complain about:** loved because the dying tree keeps users with ADHD on plan, the growing forest is satisfying, and real trees feel meaningful. Complaints: inviting friends is clunky, the app has slowed, ads appear outside sessions, the subscription switch, and some want scheduled Pomodoro breaks ([App Store](https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515), [Headway review](https://makeheadway.com/blog/forest-app-review/)).
- **Steal:** (1) the session as something you made → completed breaks add a small mark to the day → history. (2) An action that counts outside the app → maybe a weekly recap line ("3 walks, 41 min outside"), with no charity tie-in. (3) Calm between sessions → break timer. ^[inferred]
- **Avoid:** death and loss framing, a permanent record of failure, and shared fate. All three fail our 1 am test. Nothing dies. ^[inferred]
- **Open questions:** does the "collection" feeling survive without loss aversion? That's testable in the pilot.

## Endel

- **What it is · who · platform · price:** generated soundscapes (Focus, Relax, Sleep, Move, plus Premium modes) that it says adapt in real time to time of day, weather, heart rate, location and walking cadence ([endel.io](https://endel.io/)). iPhone, Watch, Mac, Android, Alexa. The App Store subtitle is now "ADHD Productivity Timer". Free with Premium (about $34.99–$119.99 a year, or $124.99 lifetime); rated 4.6★ from about 34K ratings; Editors' Choice ([App Store](https://apps.apple.com/us/app/endel-focus-sleep-relax/id1346247457)).
- **Seen:** researched (site, blog, App Store, the peer-reviewed paper's full text).
- **Key screens and flows:** pick a mode or let Autoplay pick → a generative visual while it plays → timed Scenarios; Premium adds an interval-based Focus Timer and custom scenarios from text prompts ([App Store](https://apps.apple.com/us/app/endel-focus-sleep-relax/id1346247457)).
- **Mechanisms:** focus tempo tied to resting and active heart rate ([Amazon Science](https://www.amazon.science/latest-news/how-endels-ai-powered-focus-soundscapes-earned-the-backing-of-neuroscience)); circadian framing ([endel.io](https://endel.io/)).
- **Visual style:** abstract generative shapes, dark, a little sculptural `[described]`.
- **Copy and tone:** confident and science-forward ("backed by neuroscience"), with awards and press logos ([endel.io](https://endel.io/)).
- **Evidence behind it (checked critically):**
  - The paper behind its claims is Haruvi et al., *Frontiers in Computational Neuroscience*, 2022.
  - 51 adults analysed; within-subject; four 1-hour home sessions (Endel, Spotify "Focus Flow", Apple "Pure Focus", silence). Focus was decoded from a 4-channel Muse headband by Arctop's own model, trained on self-report sliders.
  - Endel beat silence by **0.09** on a focus coefficient (p = 0.008). The playlists did not beat silence overall.
  - The effect held only in subgroups such as people who were working; people over 36 showed no difference.
  - **Funded by Arctop and Endel; all authors work at Arctop.** The paper contradicts itself on Endel's role in the study design.
  - **No non-personalised soundscape arm was tested**, so the adaptive part (heart rate, weather) is never isolated.
  - I found **no "7x" figure in the paper**. The "up to 7x" and "3.6x less stress" claims appear only on Endel's site and blog ([Frontiers](https://www.frontiersin.org/articles/10.3389/fncom.2021.760561/full), [Endel blog](https://endel.io/blog/the-science-behind-focus)).
  - **Strength:** weak to moderate, and conflicted.
- **What users love / complain about:** loved for the calm, personal sound that helps chores, work and meditation. Complaints are an update that added crackling (later fixed) and a trial that requires setting up a subscription, which felt like a trap ([App Store](https://apps.apple.com/us/app/endel-focus-sleep-relax/id1346247457)).
- **Steal:** (1) context inputs (time and heart rate) used quietly → reason lines that name the context only when it matters → suggestion card. (2) Sound during a break → an optional ambient track in the break timer, user-started and never autoplayed. ^[inferred]
- **Avoid:** multiplier claims; "neuroscience" as a trust badge; implying adaptation helps when it wasn't tested; trial dark patterns. ^[inferred]
- **Open questions:** should our sources chip show funding ("company-funded study")? The CTO and CSO decide.

## Sources

All opened 2026-11-05 unless marked.
- one sec: [PNAS 2023 full text (PMC9974409)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9974409) · [Haliburton CHI 2024](https://www.medien.ifi.lmu.de/pubdb/publications/pub/haliburton2024chi/haliburton2024chi.pdf) (abstract via search) · [site](https://one-sec.app/) · [research page](https://one-sec.app/max-planck-study) · [modes help](https://feedback.one-sec.app/help/articles/1693386-immediate-vs-delayed-vs-always-ask-which-one-is-the) · [App Store](https://apps.apple.com/us/app/one-sec-screen-time-focus/id1532875441)
- Opal: [App Store](https://apps.apple.com/us/app/opal-screen-time-control/id1497465230) · [home screen blog](https://opalapp.com/blog/introducing-the-new-opal-home-screen-track-your-screen-time-and-improve-your-focus) · [students blog](https://opalapp.com/blog/students-use-opal-app-store-reviews) · [session levels help](https://opalapp.com/help/what-is-timer) · [score thread](https://community.opalapp.com/t/feature-request-give-user-more-valuable-information-in-opal-score-overview-ux-feedback-on-opal-score-page/10906) · [price thread](https://community.opalapp.com/t/great-idea-for-an-app-wish-it-wasnt-so-expensive/1018) · [unblock thread](https://community.opal.so/t/please-come-back-unblock-all-apps-now/7825) (search snippet)
- Structured: [App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946) · [site](https://structured.app) · [Energy Monitor help](https://help.structured.app/en/articles/998530) · [3.4 changelog](https://feedback.structured.app/changelog/stuctured-34-energy-monitor) (search snippet) · [Saner review](https://blog.saner.ai/structured-review/) (search snippet)
- Forest: [site](https://forestapp.cc) · [App Store](https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515) · [Headway review](https://makeheadway.com/blog/forest-app-review/)
- Endel: [Frontiers 2022 paper](https://www.frontiersin.org/articles/10.3389/fncom.2021.760561/full) · [site](https://endel.io/) · [science blog](https://endel.io/blog/the-science-behind-focus) · [Amazon Science](https://www.amazon.science/latest-news/how-endels-ai-powered-focus-soundscapes-earned-the-backing-of-neuroscience) · [App Store](https://apps.apple.com/us/app/endel-focus-sleep-relax/id1346247457)
- Notion and Notion Calendar: [education help](https://www.notion.com/help/notion-for-education) (search snippet) · [brand blog](https://www.notion.com/blog/the-thinking-behind-our-latest-brand-campaign) (search snippet) · [Calendar blog](https://www.notion.com/blog/notion-calendar-helps-you-manage-your-time-more-effectively) · [shortcuts help](https://www.notion.com/help/notion-calendar-keyboard-shortcuts) · [App Store](https://apps.apple.com/us/app/notion-calendar/id1607562761) · [efficient.app](https://efficient.app/apps/notion-calendar) (snippet) · [Schaad profile](https://yespress.io/raphael-schaad) (snippet) · [Schaad talk summary](https://glasp.ai/youtube/2MrNSjJFBBI) (snippet) · [Android Authority](https://www.androidauthority.com/notion-offline-mode-vs-obsidian-3590238) (snippet) · [Capterra](https://www.capterra.com/p/186596/Notion/reviews/?rating=1) (snippet)

**Gaps:** I couldn't search Reddit threads directly; student sentiment comes from App Store reviews, vendor forums and review sites. I found no academic study of Forest, Opal or Structured.

## Related
- [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[04-agent-engine/algorithm-book|Algorithm Book]]
