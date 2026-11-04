---
title: "Study — Apple platform patterns"
category: 09-design
tags: [frontend, reference, synthesis, wearables]
sources: ["https://support.apple.com/en-us/120142", "https://support.apple.com/guide/watch/vitals-apd15aa7ed96/26/watchos", "https://www.apple.com/newsroom/2024/06/watchos-11-brings-powerful-health-and-fitness-insights/", "https://support.apple.com/en-us/105003", "https://developer.apple.com/design/human-interface-guidelines/live-activities", "https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities", "https://developer.apple.com/design/human-interface-guidelines/privacy", "https://support.apple.com/en-us/102420", "https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/", "https://caniuse.com/vibration"]
summary: "Vitals, Health, Fitness, Mindfulness, Live Activities and Apple's consent prompts, studied for our screens, with what a Safari web app can and can't copy. Corrects Steal Cards S-02 and S-11."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T01:00:00Z
updated: 2026-11-05T01:00:00Z
---
# Study — Apple platform patterns

> Studied by the UIUX seat on 2026-11-05 from public sources (no accounts). "Seen: researched" means docs, store pages, reviews and articles were read, not the app used hands-on.

These are the patterns our users already know from their own iPhones and Watches. Earlier findings on Vitals, Apple Sleep Score, HealthKit consent, ATT opt-in and fall-detection 911 calls are in [[09-design/design-evidence|Design evidence]]. They aren't repeated here. Visual details marked `[described]` come from text, not from screenshots we looked at.

## Takeaways for our screens

- **Suggestion card and reason line: show every signal, but only interrupt when two agree.** Vitals shows each overnight metric against *your* typical range in the app. It only sends a notification when at least two are out of range, the next morning, and it names ordinary causes such as alcohol, elevation or illness ([Apple guide](https://support.apple.com/guide/watch/vitals-apd15aa7ed96/26/watchos), [Apple Support](https://support.apple.com/en-us/120142)). → In the "Why?" drawer, each signal sits on the student's own range. A push only happens when session length *and* a second signal agree. Its reason names everyday causes ("a late night, a long problem set"), never a condition. ^[inferred]
- **Not enough data: say how long the learning takes.** Vitals needs 7 nights of sleep with the watch before it has a range ([Apple Support](https://support.apple.com/en-us/120142)). Fitness Trends don't appear until about 180 days of activity ([Apple Support](https://support.apple.com/en-us/105003)). Apple withholds the feature rather than guessing. → The abstain card shows progress in nights ("3 of 7 nights. I'll start suggesting after 7"), not a spinner or a fake score. ^[inferred]
- **Escalate: classify in words, opt in, and attach a next step.** Walking Steadiness says OK, Low or Very Low. Notifications only come for Low or Very Low, only if the person opted in, and they link to exercises ([Apple Newsroom 2021](https://www.apple.com/newsroom/2021/06/apple-advances-personal-health-by-introducing-secure-sharing-and-new-insights/)). The Health app's mood assessments point to local resources and make a PDF to share with a doctor ([Apple Newsroom 2023](https://www.apple.com/newsroom/2023/06/apple-provides-powerful-insights-into-new-areas-of-health/)). → The escalate state names a pattern in words, the student chooses whether it may notify them, and it always ends in a concrete rung (talk now · book · 2-minute exercise), plus a "Save a summary for a doctor" option. ^[inferred]
- **Notifications and the lock screen: no health values.** The HIG says to keep sensitive information out of notifications and Live Activities, because people around you can see them. It also asks apps to provide a neutral placeholder for when previews are hidden ([HIG notifications](https://developer.apple.com/design/human-interface-guidelines/notifications), [HIG Live Activities](https://developer.apple.com/design/human-interface-guidelines/live-activities)). → The push says "A break suggestion is ready", not "5 h sleep". Sleep and heart values only appear inside the app. ^[inferred]
- **Break timer: in Safari, the Dynamic Island isn't available.** Live Activities need an iOS app with a widget extension ([ActivityKit](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities)). iOS Safari has no Vibration API in any version ([caniuse](https://caniuse.com/vibration)). → v1 is an in-page countdown kept awake with Screen Wake Lock, plus one Web Push when the break ends (Home Screen install only). The Live Activity and Watch haptics wait for the native app (open decision #4). ^[inferred]
- **Consent: equal choices, never a fake system alert.** The HIG bans incentives for granting access, screens that imitate the alert, and arrows pointing at Allow ([HIG privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)). ATT's two answers are Allow and "Ask App Not to Track", and the app works fully either way ([Apple Support](https://support.apple.com/en-us/102420)). → Each source card has Allow and Use without it at equal weight, and the laptop-only path is complete. ^[inferred]
- **History and recap: verbal bands, no arrows that read as decline.** Training Load compares your last 7 days with your last 28 and puts the result in five words, from well below to well above ([Apple Newsroom 2024](https://www.apple.com/newsroom/2024/06/watchos-11-brings-powerful-health-and-fitness-insights/)). Fitness Trends use up and down arrows plus a concrete coaching line ([Apple Support](https://support.apple.com/en-us/105003)). → The history view uses a five-word scale of this week against the student's month ("fewer breaks than usual") with no arrow and no colour verdict. ^[inferred]
- **Everywhere: no rings, no streaks.** Apple added Pause Rings in watchOS 11 after years of guilt complaints ([Fortune](https://www.fortune.com/well/2025/01/24/apple-watch-bullied-burn-calories-close-rings-obsession-fitness-trackers-notifications)). The HIG also forbids ring-like graphics for any other data ([HIG Activity rings](https://developer.apple.com/design/human-interface-guidelines/activity-rings)). → Break progress is never a ring. It's a plain count with no streak. ^[inferred]

## Web app vs native on iPhone

Our first build runs in Safari. iOS 26 opens any site added to the Home Screen as a web app by default ([WebKit](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)).

| Pattern | Possible in Safari or PWA? | Needs native? | Source |
|---|---|---|---|
| Push notifications (Lock Screen, Notification Center, Apple Watch, respects Focus) | Yes, iOS 16.4+, only once installed to the Home Screen, and permission must follow a tap | No | webkit.org/blog/13878 |
| Icon badge count | Yes (Badging API, granted with notification permission) | No | webkit.org/blog/13966 |
| Keep a break timer on screen | Yes (Screen Wake Lock, Safari 16.4) | No | webkit.org/blog/13966 |
| Live Activity on the Lock Screen or Dynamic Island | No | Yes: ActivityKit, a widget extension and an Info.plist key | developer.apple.com ActivityKit |
| Haptic breathing pace | No: no Vibration API in iOS Safari | Yes (iPhone or watchOS app) | caniuse.com/vibration |
| Read Vitals, sleep, heart rate or State of Mind from Apple Health | No: HealthKit is a Swift/Objective-C framework | Yes | developer.apple.com/documentation/healthkit |
| Notification interruption levels (Passive, Time Sensitive) and action buttons | `[unverified]` for Web Push | Yes, for full control | HIG managing-notifications |
| App Store privacy label | No (App Store apps only); copy the structure in our own privacy page | Yes, for the real label | developer.apple.com/app-store/app-privacy-details |
| ATT prompt | Not applicable: we don't track | Only if tracking, which we won't do | support.apple.com/102420 |
| Apple Watch Smart Stack | Indirectly: a native Live Activity appears there automatically | Yes | HIG Live Activities |

## Apple Watch Vitals

- **What it is · who · platform · price:** a watchOS app (watchOS 11+) that summarises overnight heart rate, respiratory rate, wrist temperature, blood oxygen and sleep duration. On Series 12 and Ultra 4, HRV replaces sleep duration and a daytime view adds resting heart rate and HRV. Free with the watch ([Apple Support](https://support.apple.com/en-us/120142)). Wrist temperature needs Series 8 or later. Blood oxygen is missing on some US models sold since 18 Jan 2024 ([MacRumors](https://www.macrumors.com/2024/10/07/apple-watch-vitals-detects-illness-before-symptoms)).
- **Seen:** researched (Apple Support and User Guide, Apple Newsroom, TidBITS, MacRumors, SlashGear).
- **Key screens and flows:**
  1. An overnight summary.
  2. Tap the summary for an explanation of what in-range or changed means.
  3. Turn the Digital Crown through each metric, then tap one for what it is and what pushes it up or down.
  4. A calendar button opens the last 7 days.
  5. A link to Training Load.

  In the iPhone Health app: Browse → Vitals, with D/W/M/6M charts. A Metrics view counts outliers per metric, and a States view counts High, Typical or Low days ([User Guide](https://support.apple.com/guide/watch/vitals-apd15aa7ed96/26/watchos), [Apple Support](https://support.apple.com/en-us/120142)).
- **Mechanisms:**
  - A personal typical range, built from 7 nights.
  - An algorithm developed with Apple Heart and Movement Study data ([Newsroom](https://www.apple.com/newsroom/2024/06/watchos-11-brings-powerful-health-and-fitness-insights/)).
  - Notifications are on by default, the next morning, when at least two overnight metrics are outside range, with possible contributing factors ([User Guide](https://support.apple.com/guide/watch/vitals-apd15aa7ed96/26/watchos)).
- **Visual style** `[described]`: dark watch UI, one metric per Crown step, a range band per metric with that night's value marked, and outliers singled out. The exact colours weren't confirmed. `[unverified]`
- **Copy and tone:** plain, explanatory, and focused on "typical for you". It suggests everyday causes rather than conditions.
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - It doesn't use a score.
  - The disclaimer says the measurements aren't intended for medical use and to consult a provider ([Apple Support](https://support.apple.com/en-us/120142)). Apple has elsewhere said it isn't designed to detect illness ([TidBITS](https://tidbits.com/2025/01/21/watchos-11s-vitals-app-may-detect-illness/)).
  - Escalation is a notification only. It never contacts anyone.
- **What users love / complain about:**
  - Reddit users report early warnings of illness, and some saw the effect of drinking. Others had illnesses it missed. Commenters warn of confirmation bias ([MacRumors](https://www.macrumors.com/2024/10/07/apple-watch-vitals-detects-illness-before-symptoms)).
  - TidBITS found it confirmed COVID rather than revealing it early, since the writer already felt ill.
  - Complaints: missing blood oxygen, the 7-night wait, and being overnight-only ([SlashGear](https://www.slashgear.com/1899899/apple-watch-vitals-app-explained-how-works)).
- **Steal:**
  - The two-signals-agree push rule → our notification rule → the suggestion push.
  - A per-signal range with today marked → the "Why?" drawer.
  - Everyday possible causes → the reason line.
  - "Tap to see what pushes it up or down" → the source records.
- **Avoid:** illness implications. Ours never hints at sickness. ^[inferred]
- **Open questions:** do we start the learning period at 7 nights like Vitals, or count study sessions? This is the CTO's call.

## Apple Health (Summary, Highlights, Trends)

- **What it is · who · platform · price:** built into iPhone. Free.
- **Seen:** researched (Apple Support, Apple Newsroom 2021 and 2023, apple.com/health, a newsletter explainer).
- **Key screens and flows:**
  1. Summary tab: Pinned categories (editable).
  2. Highlights, with "Show All Highlights".
  3. Trends, with "Show All Health Trends".
  4. Profile: privacy, apps' read and write access per category, and notifications, including new trends ([Apple Support](https://support.apple.com/en-us/104997)).
- **Mechanisms:**
  - Trend analysis on about 20 data types, flagging meaningful long-term changes, with optional notifications ([Newsroom 2021](https://www.apple.com/newsroom/2021/06/apple-advances-personal-health-by-introducing-secure-sharing-and-new-insights/)).
  - Trends compare the last 90 days with the last 365 ([explainer](https://techtiptuesday.beehiiv.com/p/tech-tip-tuesday-trends-apple-heath-app); this matches Apple's Fitness wording).
  - Sleep score breaks into duration, bedtime consistency, waking and stages, and shows how it was calculated ([apple.com/health](https://www.apple.com/health/)).
- **Visual style** `[described]`: a large title, rounded cards on a grouped background, a colour per category, and small sparkline charts in Highlights. `[unverified]` for exact tokens.
- **Copy and tone:** highlights are short plain sentences about your own recent data. Exact Trends wording wasn't confirmed. `[unverified]`
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - Health data is encrypted on a locked device. iCloud sync is end-to-end with two-factor authentication, and Apple says it can't read it ([apple.com/health](https://www.apple.com/health/), [Newsroom 2023](https://www.apple.com/newsroom/2023/06/apple-provides-powerful-insights-into-new-areas-of-health/)).
  - Sharing is per data type and per person, and revocable.
  - Walking Steadiness classifies as OK, Low or Very Low, with opt-in alerts linked to exercises ([Newsroom 2021](https://www.apple.com/newsroom/2021/06/apple-advances-personal-health-by-introducing-secure-sharing-and-new-insights/)).
- **What users love / complain about:** no primary user-sentiment source was opened. `[unverified]` Status: reports say the iOS 27 Health redesign and AI coach were scaled back or delayed. This comes from search summaries only. `[described]` ^[inferred: Apple hasn't shipped an explaining coach, so the space is open]
- **Steal:**
  - "Show how it was calculated" → the "Why?" drawer.
  - Long-window trends that you opt in to be notified about → the weekly recap.
  - Per-type, per-person sharing → privacy controls (with no coach view in v1).
- **Avoid:** a dashboard of everything. The Summary tab answers "what's my data?", and our card answers "what do I do now?" ^[inferred]
- **Open questions:** the exact Trends sentence pattern. Check it on a team member's phone.

## Apple Fitness (Activity rings, Trends, awards)

- **What it is · who · platform · price:** the Activity app on Watch and the Fitness app on iPhone. Free (Fitness+ is paid and out of scope).
- **Seen:** researched (Apple Support, HIG, 9to5Mac, Macworld, Fortune).
- **Key screens and flows:**
  1. Rings: Move (active calories), Exercise (brisk minutes) and Stand (hours with a minute of standing; Roll for wheelchair users).
  2. Weekly Summary.
  3. Awards for records, streaks and milestones.
  4. Trends on iPhone ([Apple Support](https://support.apple.com/en-us/105003)).
  5. watchOS 11 added Pause Rings and per-weekday goals ([Newsroom 2024](https://www.apple.com/newsroom/2024/06/watchos-11-brings-powerful-health-and-fitness-insights/)).
- **Mechanisms:**
  - Trends compare 90 days with 365, after about 180 days of history. An up arrow means maintaining or improving. A down arrow comes with coaching, for example walking an extra quarter mile a day ([Apple Support](https://support.apple.com/en-us/105003)).
  - Pausing keeps streaks. 9to5Mac says up to 90 days, while Macworld says one month and Watch only ([9to5Mac](https://9to5mac.com/2024/07/16/close-your-ringsbut-in-watchos-11-its-okay-if-you-dont/), [Macworld](https://www.macworld.com/article/2446605/how-to-pause-apple-watch-activity-rings.html)). `[conflict]`
  - Daily Coaching notifications can be switched off.
- **Visual style:** the HIG fixes the ring colours (Move red, Exercise green, Stand blue) on black. It bans repurposing them, ring-like look-alikes, decorative use and rings in notifications ([HIG](https://developer.apple.com/design/human-interface-guidelines/activity-rings)).
- **Copy and tone:** celebratory and goal-driven. Coaching is concrete (a distance, not "do more").
- **Numbers, uncertainty, evidence, privacy, escalation:** goals are numbers you hit or miss, with no uncertainty shown.
- **What users love / complain about:**
  - Users describe walking late at night to close a ring, and stand prompts during class.
  - People say they feel bullied and that rest days aren't restful.
  - A 2023 study found a falsely lowered step count lowered self-esteem ([Fortune](https://www.fortune.com/well/2025/01/24/apple-watch-bullied-burn-calories-close-rings-obsession-fitness-trackers-notifications)).
  - Pause Rings was welcomed as overdue ([Macworld](https://www.macworld.com/article/2446605/how-to-pause-apple-watch-activity-rings.html)).
- **Steal:**
  - Concrete coaching units → button labels with minutes.
  - Withholding trends until there's enough history → the not-enough-data state.
  - Per-day goals → "quiet days" settings (no suggestions on game days). ^[inferred]
- **Avoid:**
  - Streaks, awards, closing anything, and arrows pointing down.
  - The pause feature exists *because* of the guilt. Ours shouldn't need one.
- **Open questions:** should a student's own sport schedule set quiet hours automatically? This crosses into the CTO's lane.

## Apple Mindfulness and Breathe

- **What it is · who · platform · price:** a free app on Watch, iPhone, iPad and Vision Pro. It offers Breathe (paced breathing), Reflect (a written prompt) and State of Mind logging ([App Store](https://apps.apple.com/us/app/mindfulness/id1560383515)).
- **Seen:** researched (Apple User Guide, App Store listing and reviews, Apple Newsroom 2023, iMore).
- **Key screens and flows:**
  - **Breathe:** tap Breathe, inhale as the animation grows and exhale as it shrinks, then see a summary with heart rate. Sessions last 1–5 minutes. Haptics are None, Minimal or Prominent. Breath rate is set in settings ([User Guide](https://support.apple.com/guide/watch/start-a-reflect-or-breathe-session-apd371dfe3d7/watchos)), from 4 to 10 a minute ([App Store](https://apps.apple.com/us/app/mindfulness/id1560383515)).
  - **State of Mind:**
    1. Choose a momentary emotion or a daily mood.
    2. Turn the Crown along a scale from very unpleasant to very pleasant.
    3. Optionally, pick words for the feeling.
    4. Optionally, pick what's having the biggest impact.

    Health later charts it against sleep, exercise, daylight and mindful minutes ([User Guide](https://support.apple.com/guide/watch/apd7de0f5610/watchos), [Newsroom 2023](https://www.apple.com/newsroom/2023/06/apple-provides-powerful-insights-into-new-areas-of-health/)).
- **Mechanisms:**
  - The animation and haptics set the pace, so you don't need to look.
  - Reminders at the start or end of the day, with "Mute for today".
  - A weekly summary toggle.
  - Mood is chosen through abstract shapes rather than a number ([iMore](https://www.imore.com/apple/why-apples-new-mental-health-feature-in-ios-17-and-watchos-10-is-really-important)).
- **Visual style** `[described]`: soft overlapping petals on black that expand and contract. State of Mind uses shapes that get smoother or spikier and change colour with the mood.
- **Copy and tone:** minimal instructions ("inhale as it grows"), no praise and no score.
- **Numbers, uncertainty, evidence, privacy, escalation:** depression and anxiety assessments of the kind used in clinics (not named in the source) estimate a risk level, link to local resources and export a PDF for a doctor ([Newsroom 2023](https://www.apple.com/newsroom/2023/06/apple-provides-powerful-insights-into-new-areas-of-health/)).
- **What users love / complain about:** 3.7★ from 95 US ratings. Reviews from 2021–22 miss the old Breathe, say it takes too many taps to change the length, find the animation unpleasant (one cites trypophobia), and say incoming notifications interrupt sessions ([App Store](https://apps.apple.com/us/app/mindfulness/id1560383515)).
- **Steal:**
  - A 1-minute paced breath as one break option → the break timer.
  - "Mute for today" → "No more suggestions today" on the card.
  - An optional 3-second "How was that?" after a break, with no number → history ("Did the breaks help?"). ^[inferred]
- **Avoid:**
  - Burying the length behind several taps. Remember the last length.
  - Patterns made of clustered holes. Offer a plain circle.
  - Unrequested reminders.
- **Open questions:** without haptics on the web, is a visual-only pace (with reduced-motion text) enough? Test it in the pilot.

## Live Activities and the Dynamic Island

- **What it is · who · platform · price:** iOS 16.1+ glanceable live status on the Lock Screen, Dynamic Island, StandBy, Mac menu bar, Watch Smart Stack and CarPlay ([HIG](https://developer.apple.com/design/human-interface-guidelines/live-activities)). Native apps only.
- **Seen:** researched (HIG, ActivityKit docs).
- **Key screens and flows:**
  1. Start it after a user action, in the foreground or through an App Intent.
  2. Compact view (two sides of the camera).
  3. Minimal view when several are running.
  4. Expanded view on long-press.
  5. Lock Screen banner.
  6. End it, then dismiss it, usually after 15–30 minutes.
- **Mechanisms and limits** ([ActivityKit](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities), [push docs](https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications)):
  - Up to 8 hours active, then up to 4 more on the Lock Screen (12 in total).
  - 4 KB of data.
  - No network access inside the activity.
  - The Lock Screen view is capped at 160 pt tall, and limited-width views fit a 28 pt circle.
  - An hourly budget for priority-10 pushes. Priority 5 doesn't count against it. Frequent updates need opt-in and can be turned off by the user.
  - A stale date marks out-of-date content.
  - People can turn Live Activities off per app.
  - A countdown can be rendered by the system without pushes. `[described]` from Apple sample patterns, not confirmed in the text fetched.
- **Visual style:**
  - The Dynamic Island background is always black.
  - A custom background is allowed only on the Lock Screen.
  - Large, medium-weight text.
  - 14 pt margins.
  - Animations last up to 2 s and don't run on Always-On displays.
  - A logo mark with no container ([HIG](https://developer.apple.com/design/human-interface-guidelines/live-activities)).
- **Copy and tone:** only the most important information. No ads, and no sensitive data on a screen others can see.
- **Numbers, uncertainty, evidence, privacy, escalation:**
  - Prefer a single interactive element.
  - Alerts should be rare, and never duplicated by a push.
  - Give people an in-app way to stop one activity, or they'll turn off the whole feature.
- **What users love / complain about:** no user-sentiment source was opened. `[unverified]`
- **Steal:** the break countdown, the end-of-break summary that stays 15–30 minutes, and one "End break" control → the accepted-break state (native phase).
- **Avoid:**
  - Running a Live Activity for a study session. It's long, not time-bound, and nags. ^[inferred]
  - Any health value in the island.
- **Open questions:** does the minimal view (a bare timer) read as ours without branding? Mock it at 28 pt.

## Apple privacy nutrition labels and the App Tracking Transparency prompt

- **What it is:** the App Store's per-app privacy details, and the system prompt before an app tracks you across other companies' apps.
- **Seen:** researched (Apple developer page, Apple Support, HIG, PoPETs 2022 study).
- **Key screens and flows:**
  - **Labels:** for each data type (Health and Fitness among 16 groups), the developer declares whether it's used to track, whether it's linked to identity, and its purpose (six purposes, from third-party advertising to app functionality) ([Apple](https://developer.apple.com/app-store/app-privacy-details/)).
  - **ATT:** an alert with an app-written reason and two answers. It's managed under Settings → Privacy & Security → Tracking. A master toggle can stop all requests, and it's locked off for under-18s and school-managed accounts ([Apple Support](https://support.apple.com/en-us/102420)).
- **Mechanisms:**
  - Saying no blocks the advertising ID and other tracking, and features keep working.
  - The HIG allows a pre-alert screen with one "Continue"-style button. It bans incentives, imitation alerts, images of the alert and arrows to Allow ([HIG privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)).
  - Purpose strings should be one specific, active sentence.
- **Visual style** `[described]`: a standard system alert. Labels are icon-led grouped lists on the App Store page.
- **Copy and tone:** neutral, and the "no" is phrased as a request ("Ask App Not to Track").
- **Numbers, uncertainty, evidence, privacy, escalation:** labels are self-declared by developers. Accuracy concerns were raised, and members of Congress asked for review ([Zhang et al. 2022](https://petsymposium.org/popets/2022/popets-2022-0106.pdf)).
- **What users love / complain about:** 24 lay iPhone users had a confusing structure, unfamiliar terms ("linked to you", "tracking") and labels disconnected from the settings that control them ([Zhang et al. 2022](https://petsymposium.org/popets/2022/popets-2022-0106.pdf)).
- **Steal:**
  - A label per source with three rows (collected · used for · kept and shared), in our own words, with the **control next to the label** (pause, delete) → data sources and privacy controls. This fixes the gap the study found.
  - One specific purpose sentence per permission → each consent step.
- **Avoid:**
  - The jargon "linked to you".
  - A one-button pre-alert screen for *our own* data consent. The HIG pattern is for system prompts. Our consent is ours, so it uses two equal buttons (see [[10-trust-safety/privacy-and-consent|Privacy and consent]]). ^[inferred]
- **Open questions:** if the native app ships, our App Store label must match the in-app label word for word. Who owns that check: the CTO or the CSO?

## Steal Card check

- **S-02 Apple Watch Vitals: corrected.** It's right about personal ranges and the two-signal rule. Two fixes. First, the app *shows* every outlier, and only *notifications* need two or more overnight metrics. Second, it needs 7 nights first. **Corrected mechanism:** "Shows each overnight measure against your own typical range (after 7 nights). It notifies the next morning only when at least two are out of range, and lists everyday possible causes." Sources: [User Guide](https://support.apple.com/guide/watch/vitals-apd15aa7ed96/26/watchos), [Apple Support](https://support.apple.com/en-us/120142). Upgrade `Seen:` to researched.
- **S-11 Live Activities: corrected.** The mechanism is right, but it needs a native app (ActivityKit and a widget extension). It isn't possible in Safari or a PWA. **Corrected translation:** "Native phase: an accepted break shows a countdown on the Lock Screen and in the Dynamic Island, with no health values, one End-break control and a 15–30-minute end summary. Safari v1: an in-page countdown with Screen Wake Lock and one Web Push at the end (Home Screen install only)." Sources: [HIG](https://developer.apple.com/design/human-interface-guidelines/live-activities), [ActivityKit](https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities), [WebKit](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/). Upgrade `Seen:` to researched. Buildable stays at 2 for v1.

## Sources

Opened 2026-11-05 unless marked:
- Apple Support:
  - Vitals: https://support.apple.com/en-us/120142
  - Vitals User Guide: https://support.apple.com/guide/watch/vitals-apd15aa7ed96/26/watchos
  - Heart rate and Recovery HRV: https://support.apple.com/en-us/120277
  - Health app: https://support.apple.com/en-us/104997
  - Activity: https://support.apple.com/en-us/105003
  - Breathe and Reflect: https://support.apple.com/guide/watch/start-a-reflect-or-breathe-session-apd371dfe3d7/watchos
  - State of Mind: https://support.apple.com/guide/watch/apd7de0f5610/watchos
  - ATT: https://support.apple.com/en-us/102420
- Apple Newsroom:
  - 2021: https://www.apple.com/newsroom/2021/06/apple-advances-personal-health-by-introducing-secure-sharing-and-new-insights/
  - 2023: https://www.apple.com/newsroom/2023/06/apple-provides-powerful-insights-into-new-areas-of-health/
  - 2024: https://www.apple.com/newsroom/2024/06/watchos-11-brings-powerful-health-and-fitness-insights/
- Apple Health: https://www.apple.com/health/
- HIG:
  - Live Activities: https://developer.apple.com/design/human-interface-guidelines/live-activities
  - Notifications: https://developer.apple.com/design/human-interface-guidelines/notifications
  - Managing notifications: https://developer.apple.com/design/human-interface-guidelines/managing-notifications
  - Privacy: https://developer.apple.com/design/human-interface-guidelines/privacy
  - Activity rings: https://developer.apple.com/design/human-interface-guidelines/activity-rings
  - HealthKit: https://developer.apple.com/design/human-interface-guidelines/healthkit
- Developer docs:
  - ActivityKit: https://developer.apple.com/documentation/activitykit/displaying-live-data-with-live-activities
  - ActivityKit push: https://developer.apple.com/documentation/activitykit/starting-and-updating-live-activities-with-activitykit-push-notifications
  - HealthKit: https://developer.apple.com/documentation/healthkit
  - App privacy details: https://developer.apple.com/app-store/app-privacy-details/
- WebKit:
  - Web Push: https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/
  - Safari 16.4: https://webkit.org/blog/13966/webkit-features-in-safari-16-4/
  - Safari 26: https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/
- Vibration API support: https://caniuse.com/vibration
- App Store, Mindfulness: https://apps.apple.com/us/app/mindfulness/id1560383515
- Reviews and press:
  - TidBITS: https://tidbits.com/2025/01/21/watchos-11s-vitals-app-may-detect-illness/
  - MacRumors: https://www.macrumors.com/2024/10/07/apple-watch-vitals-detects-illness-before-symptoms
  - SlashGear: https://www.slashgear.com/1899899/apple-watch-vitals-app-explained-how-works
  - 9to5Mac: https://9to5mac.com/2024/07/16/close-your-ringsbut-in-watchos-11-its-okay-if-you-dont/
  - Macworld: https://www.macworld.com/article/2446605/how-to-pause-apple-watch-activity-rings.html
  - Fortune: https://www.fortune.com/well/2025/01/24/apple-watch-bullied-burn-calories-close-rings-obsession-fitness-trackers-notifications
  - iMore: https://www.imore.com/apple/why-apples-new-mental-health-feature-in-ios-17-and-watchos-10-is-really-important
  - Trends explainer: https://techtiptuesday.beehiiv.com/p/tech-tip-tuesday-trends-apple-heath-app
- Research: Zhang, Feng, Yao, Cranor and Sadeh, "How Usable Are iOS App Privacy Labels?", PoPETs 2022: https://petsymposium.org/popets/2022/popets-2022-0106.pdf
- Described only (search summary, not opened): the iOS 27 Health scale-back, https://www.macrumors.com/2026/02/05/apple-reportedly-scales-back-ios-27-feature/
- Blocked (403, not used): Wareable, PhoneArena, AppleInsider, Washington Post, MacRumors forums.

## Related

- [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]]
- [[10-trust-safety/privacy-and-consent|Privacy and consent]] · [[08-frontend/student-interface-and-feedback|Student interface and feedback]]
