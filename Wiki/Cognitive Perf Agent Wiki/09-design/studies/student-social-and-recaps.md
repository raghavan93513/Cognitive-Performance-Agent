---
title: "Study — Student social apps and recaps"
category: 09-design
tags: [frontend, reference, synthesis, students]
sources: ["https://about.fb.com/news/2023/01/instagram-quiet-mode-manage-your-time-and-focus/", "https://about.instagram.com/community/teen-accounts", "https://www.engadget.com/social-media/instagram-tests-new-layout-that-puts-the-spotlight-on-reels-and-dms-215407062.html", "https://help.snapchat.com/hc/en-us/articles/7012394193684-What-are-Snapstreaks-and-how-do-I-keep-them-going", "https://newsroom.snap.com/keep-the-streak-with-restore", "https://www.bitsoffreedom.nl/en/2026/03/10/the-influence-of-snapchats-gamification-features-on-young-people/", "https://en.wikipedia.org/wiki/BeReal", "https://www.dazeddigital.com/life-culture/article/61166/1/why-did-bereal-fail-social-media-instagram-authenticity", "https://voodoo.io/news/voodoo-acquires-bereal", "https://www.musicbusinessworldwide.com/spotify-wrapped-campaign-hit-200m-engaged-users-in-24-hours-a-19-yoy-increase", "https://techcrunch.com/2025/12/03/spotifys-2025-wrapped-becomes-a-multiplayer-experience/", "https://blog.duolingo.com/how-duolingo-streak-builds-habit", "https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/", "https://academic.oup.com/jcr/article/49/6/1095/6589474", "https://apps.apple.com/us/app/canvas-student/id480883488", "https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/"]
summary: "Instagram, Snapchat, BeReal, Spotify Wrapped, Duolingo and Canvas studied from public sources: what our students expect from a phone, what streaks and daily pings cost, and what to steal."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T01:00:00Z
updated: 2026-11-05T01:00:00Z
---
# Study — Student social apps and recaps

> Studied by the UIUX seat on 2026-11-05 from public sources (no accounts). "Seen: researched" = docs, store pages, reviews and articles read, not hands-on.

These are the apps our students already live in. They set the bar for how a phone app should feel, and they show what daily pings, streaks and recaps cost people. The research on scores, nudges, Duolingo's +0.5% reminder result and consent is already in [[09-design/design-evidence|Design evidence]], so it isn't repeated here. Mechanism cards live in the [[09-design/steal-library|Steal library]].

**Who this is about.** About eight in ten US adults aged 18–29 use Instagram, and younger adults stand out on Snapchat and Reddit too ([Pew, Nov 2025](https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/); survey of 5,022 adults, Feb–Jun 2025). Pew's report doesn't give an exact Snapchat figure for 18–29 `[unverified]`.

## Takeaways for our screens

- **Suggestion card: the "pause and catch up" pattern.** Instagram's Sleep mode mutes alerts, tells others you're away, and shows a summary of what you missed when you turn it off ([Meta](https://about.fb.com/news/2023/01/instagram-quiet-mode-manage-your-time-and-focus/)). Our snooze should do the same: "Back at 15:40" while snoozed, and one quiet line on return ("While you were out: nothing new"). Never a pile-up of missed prompts. ^[inferred]
- **Notifications and timing: one ping, no deadline.** BeReal shows that one shared daily moment can become a ritual, and also that a countdown makes people resent it (see the BeReal section). Our suggestion can arrive once per window. It must never expire, show a timer, or mark a late reply as "late". ^[inferred]
- **Notifications: the copy must not be a person who's disappointed in you.** Duolingo picks reminder copy with a bandit and demotes copy you've seen recently because novelty wears off ([Duolingo, 2020](https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/)). Take the rotation, not the guilt: a small pool of calm, factual variants, and the pool never escalates in tone. ^[inferred]
- **Onboarding: show the product before asking for anything.** Duolingo lets people finish a lesson before making an account. A secondhand account credits this with about a 20% rise in daily users `[unverified]`. Our first run should show one worked "Sample data" suggestion card *before* any account or permission screen. ^[inferred]
- **Consent: off by default, and easy to say no.** Bits of Freedom asked 300 people aged 13–21 about Snapstreaks: 42% would remove them if they could choose, and the group recommends making such features opt-in ([Bits of Freedom, 2026](https://www.bitsoffreedom.nl/en/2026/03/10/the-influence-of-snapchats-gamification-features-on-young-people/)). Anything that counts days or compares people stays off unless the student turns it on. We have no streaks at all. ^[inferred]
- **History: show the record without a chain to break.** Broken streaks reduce later engagement, and the drop is worse when people blame themselves ([Silverman et al., JCR 2023](https://academic.oup.com/jcr/article/49/6/1095/6589474)). History shows totals and patterns ("breaks taken this week: 6"), never consecutive days. ^[inferred]
- **Weekly recap: the one bold moment, kept private.** Wrapped's Stories format, its rarity and its "this is you" mirror make people share it. Its 2024 edition was panned when the personal data stories gave way to an AI podcast ([Salon](https://www.salon.com/2024/12/04/why-spotify-users-are-complaining-that-spotify-wrapped-is-sucky-this-year/)). Our recap should be 4–5 tap-through cards built from the student's own records. The share version carries no health values. ^[inferred]
- **The floor is Canvas.** Students tolerate duplicate alerts, due-date times that differ between app and web, and alerts for things that don't apply to them (Canvas section). We clear the floor by showing exact times in the phone's timezone, sending each alert once, and giving every alert a reason. ^[inferred]

## Instagram

- **What it is · who · platform · price.** Meta's photo, video and messaging app. Free with ads, on iOS, Android and the web. It's the default social app for US 18–29s (about 80% use it, per [Pew](https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/)).
- **Seen:** researched (Meta newsroom and help pages, tech press).
- **Key screens and flows.**
  - Five-tab bottom bar.
  - Stories tray at the top of Home.
  - Full-screen Stories and Reels viewers.
  - DMs.
  - Comments and share as bottom sheets *[described]*.
  - In October 2025 Instagram tested a bar ordered Feed, Reels, DMs, Search, Profile, with swiping between tabs. Mosseri's reason was that Reels and DMs drive most use ([Engadget](https://www.engadget.com/social-media/instagram-tests-new-layout-that-puts-the-spotlight-on-reels-and-dms-215407062.html)). One later report says it became permanent in March 2026 `[unverified]` ([Storrito](https://storrito.com/resources/what-instagrams-navigation-redesign-actually-changed/)).
- **Mechanisms.**
  - **Navigation follows use.** The most-used actions sit in the thumb zone of the bottom bar (Engadget, above).
  - **Sleep mode** (launched as Quiet mode in Jan 2023): mutes notifications, sets an away status, auto-replies to DMs, and shows a summary of what you missed afterwards. Teens are prompted to turn it on after late-night use ([Meta](https://about.fb.com/news/2023/01/instagram-quiet-mode-manage-your-time-and-focus/)).
  - **Teen Accounts** (Sept 2024) turn Sleep mode on from 10 PM to 7 AM by default and remind teens to close the app after 60 minutes a day. Teens aged 13–15 need a parent's permission to make the settings less strict ([Instagram](https://about.instagram.com/community/teen-accounts)).
  - **"Pause all" notifications** for 15 minutes to 8 hours, tested on iOS in 2019 ([Siècle Digital](https://siecledigital.fr/2019/03/13/instagram-pause-notification/)).
- **Visual style** *[described]*: content first, a white or black canvas, thin-line icons, colour only in the media and the Stories ring, and full-bleed media in the viewers.
- **Copy and tone.** Sleep mode's auto-reply and away status set expectations for *other people*, so the user doesn't owe anyone a reply ([Meta](https://about.fb.com/news/2023/01/instagram-quiet-mode-manage-your-time-and-focus/)).
- **Notifications and habit mechanics.** Badges and pushes for social events, with time-boxed pauses on top. The well-being features (Sleep mode, the 60-minute reminder) are framed as defaults for teens, with a parent as gatekeeper.
- **What users love / complain about.** The 2025 tab test was optional because, in Mosseri's words, layout changes take time to get used to (Engadget). The deeper lesson comes from Snapchat's 2018 redesign (Snapchat section): moving what people reach for every day costs trust.
- **Steal.**
  - *Pause with an end time* → snooze shows its return time → suggestion card, snoozed state.
  - *Summary on return* → "While you were away" line → card, after snooze.
  - *Most-used action in the thumb zone* → the card's primary action sits low, in one-handed reach → card, and the iPhone SE thumb test.
  - *An away status that speaks for you* → [future] a calendar or Focus hook. Not v1. ^[inferred]
- **Avoid.**
  - A parent or coach as gatekeeper of settings. Our users are adults, and [[09-design/design-evidence|Design evidence]] §6 rules out coach views.
  - Infinite-scroll surfaces.
  - Moving the primary action between releases.
- **Open questions.** Should our snooze map onto the iOS Focus status in a native app later (open decision #4)? Is the bottom-sheet "Why?" drawer reachable with VoiceOver at large text sizes?

## Snapchat

- **What it is · who · platform · price.** A camera-first messaging app. Free, with a paid Snapchat+ tier; iOS and Android. Strong with teens and young adults.
- **Seen:** researched (Snap support and newsroom, an advocacy-group survey, a peer-reviewed survey, tech press).
- **Key screens and flows.**
  - The app opens on the camera.
  - Chat is one swipe to one side and Stories/Discover to the other; the 2018 redesign kept the camera as home with friends and Discover on either side ([TechCrunch](https://techcrunch.com/2018/02/15/snap-ceo-evan-spiegel-says-the-snapchat-redesign-is-here-to-stay/)).
  - The chat list shows the 🔥 streak count and an ⏳ warning ([Snapchat Support](https://help.snapchat.com/hc/en-us/articles/7012394193684-What-are-Snapstreaks-and-how-do-I-keep-them-going)).
- **Mechanisms.**
  - **Snapstreaks.** Both people must send a photo or video Snap every day. In group chats, most members must. An hourglass warns that the streak is about to end, and a fire button shows when it can be restored for a limited time (Snapchat Support).
  - **Streak Restore** (tested March 2023): one free restore, more by in-app purchase, and a Snapchat+ freeze. Snap framed it kindly: a lost streak doesn't mean a friendship has gone cold, and exams and camping trips are named as normal reasons ([Snap newsroom](https://newsroom.snap.com/keep-the-streak-with-restore)). The price of extra restores has been reported as $0.99 `[unverified against Snap]`.
- **Visual style** *[described]*: a full-screen camera, a yellow brand accent, emoji as status (🔥 ⏳), and gestures over buttons.
- **Copy and tone.** Playful and emoji-first. The Restore post is the kindest copy here, yet it sells a paid fix for a problem the product created. ^[inferred]
- **Notifications and habit mechanics.** The streak is the habit engine, and friends themselves become the reminders. Bits of Freedom (300 aged 13–21, March 2026) found:
  - 86% keep streaks going;
  - 25% of them have paid €0.99 at least once to restore one;
  - 51% would feel bad if the other person broke it;
  - 33% say streaks affect their screen time;
  - 42% would remove streaks if they could choose.

  Their interviewees named fear of disappointing friends ([Bits of Freedom](https://www.bitsoffreedom.nl/en/2026/03/10/the-influence-of-snapchats-gamification-features-on-young-people/)). A peer-reviewed survey of 2,483 Belgian early adolescents found streak use weakly linked to problematic smartphone use and FOMO, and girls kept streaks more and longer ([van Essen & Van Ouytsel 2023](https://doaj.org/article/7e7e45c958c74b29ba203607b6f4a840); abstract only).
- **What users love / complain about.**
  - People love the low-effort, ephemeral contact.
  - The 2018 redesign drew a petition reported at 1.2M signatures. Snap later moved friends' Stories back, and Spiegel blamed a Q2 2018 fall in daily users on the redesign's disruption ([MacRumors](https://www.macrumors.com/2018/08/07/snapchat-redesign-millions-of-lost-users/); [iPhone in Canada](https://www.iphoneincanada.ca/2018/05/11/snapchat-redesigned-redesign/)).
  - The stress of keeping streaks and the guilt of breaking them (above).
- **Steal.**
  - *Open straight onto the one action* → the app opens on the current suggestion, never a dashboard → card as home.
  - *Restore framing ("a break isn't a failure")* → the copy for a declined or missed break: "No problem. Nothing's counted." → declined state and history.
  - *Gesture with a visible fallback* → swipe down to snooze, plus a visible Snooze button, since gestures alone fail on discovery and accessibility → card. ^[inferred]
- **Avoid.**
  - Any count that someone else can break.
  - Warning glyphs that create urgency (⏳).
  - Selling relief from pressure you created.
  - Moving the home surface after launch.
- **Open questions.** Snap's 2024–25 navigation tests weren't researched (our search budget ran out). Is "swipe down to snooze" discoverable for ICP_5 (non-technical)? Test it in the pilot.

## BeReal

- **What it is · who · platform · price.** A once-a-day dual-camera photo app. Free; iOS and Android. Bought by Voodoo in June 2024 for a reported €500M ([Voodoo](https://voodoo.io/news/voodoo-acquires-bereal)).
- **Seen:** researched (Wikipedia, the acquirer's press release, Dazed, Fortune, help-centre coverage).
- **Key screens and flows.** The notification opens the dual camera; you post; the friends' feed unlocks; you react with RealMojis (selfie reactions) ([Wikipedia](https://en.wikipedia.org/wiki/BeReal)).
- **Mechanisms.**
  - **One shared moment.** Everyone in the same region gets the prompt at the same moment. BeReal's "time zones" are reported to be four regional groups, not real time zones ([Kapwing](https://www.kapwing.com/resources/when-is-bereal-notification-time/); the help centre returned 403 to us).
  - **Two-minute window.** Late posts are allowed, but the post time is hidden behind a long-press; friends see how many retakes you took and where you were (Wikipedia).
  - **Reciprocity gate.** You can't see friends' posts until you post (Wikipedia; [Dazed](https://www.dazeddigital.com/life-culture/article/61166/1/why-did-bereal-fail-social-media-instagram-authenticity)).
  - **Later additions:**
    - Bonus BeReals: up to 2 extra posts a day in 2023, raised to 5 in July 2024, for people who posted on time;
    - a friends-of-friends feed (Aug 2023);
    - groups, mentions and pinned posts (Wikipedia; Voodoo).
    - Voodoo planned ads `[unverified year]`.
- **Visual style** *[described]*: black UI, white type, an unedited photo with a selfie inset, almost no chrome.
- **Copy and tone.** Terse and imperative ("⚠️ Time to BeReal ⚠️" is widely reported) *[described]*.
- **Notifications and habit mechanics.** One push a day, a countdown, and a locked feed. The lock does the retention work, not the notification. ^[inferred]
- **What users love / complain about.**
  - Loved: authenticity and the shared moment.
  - Complained: the forced timing felt controlling, the two-minute pressure felt like work, posts became dull, and many posted late anyway with no consequence (Dazed, Oct 2023, quoting sociologist Harry Dyer).
  - **Engagement, checked carefully:**
    - Apptopia (via the NYT) estimated daily users fell 61%, from ~15M (Oct 2022) to under 6M (Mar 2023).
    - BeReal disputed this and claimed 20–25M daily users in 2023 (Dazed). Business of Apps reported 23M in January 2024 (via search summary).
    - At the sale, Voodoo claimed "more than 40M active users", with about half opening the app 6+ days a week (Voodoo). Fortune noted that "active users" can mean many things ([Fortune](https://fortune.com/2024/06/14/the-riddle-of-the-bereal-deal/)).
    - Downloads were reported down 60% in 2024 `[unverified]`.
    - **No independent retention data exists.** All post-2023 figures are company-reported.
- **Steal.**
  - *Restraint: one prompt per window* → a suggestion arrives once per session window → the notification rules (S-09).
  - *A late reply that isn't punished*: BeReal still allows late posts, but labels them and reveals retakes. We drop the labelling: late is simply fine → card. ^[inferred]
- **Avoid.**
  - Countdowns.
  - Gating content behind compliance (the feed lock).
  - Showing others how many tries you took.
  - Random timing. We time to seams instead ([[09-design/design-evidence|Design evidence]] §2).
- **Open questions.** Did Voodoo change the notification after 2024? Not found. Does "once a day" still feel like an event when nothing social rides on it? Our suggestion has no friends attached, so the scarcity may matter less. ^[inferred]

## Spotify Wrapped

- **What it is · who · platform · price.** Spotify's annual personalised recap, released in early December. Free and Premium users; in the app.
- **Seen:** researched (trade press quoting Spotify, TechCrunch, Salon, NPR/KPBS).
- **Key screens and flows.**
  - A full-screen, tap-through story sequence with a share button on each card.
  - The Stories format dates from 2019, and its origin is disputed: an ex-intern says she pitched it, and Spotify denies it ([Refinery29](https://www.refinery29.com/en-au/2021/12/10786545/jewel-ham-artist-spotify-wrapped-internship)).
  - 2025 added a Top Song Quiz (guess before the reveal), Listening Age, Wrapped Clubs, and Wrapped Party, a live comparison with up to 9 friends ([TechCrunch](https://techcrunch.com/2025/12/03/spotifys-2025-wrapped-becomes-a-multiplayer-experience/)).
- **Mechanisms.**
  - **Mirror plus distinctiveness.** It meets the need to belong and the need to be different at once, and reflects people back to themselves (Brian Uzzi and Nick Seaver, via [KPBS/NPR](https://www.kpbs.org/news/2023/12/08/why-your-brain-finds-spotify-wrapped-so-irresistible)).
  - **Rarity.** Once a year, so it's anticipated.
  - **Guess, then reveal** (2025 quiz).
  - **Shareable by design**: each card is a Story-sized image.
- **Visual style** *[described]*: a bold yearly identity (2022 was built on "monograms", per [It's Nice That](https://itsnicethat.com/features/spotify-wrapped-campaign-identity-2022-graphic-design-301122)), big type, one number per card, and motion between cards. A 2024 critique said the design had lost its focal point ([UX Collective](https://uxdesign.cc/whats-happened-to-spotify-wrapped-cdfc32bf56a7)).
- **Copy and tone.** Second person, celebratory, a little cheeky. 2025 used an LLM for a storytelling layer, while Spotify said the stats themselves weren't made with AI (TechCrunch).
- **Pacing and reach.** Spotify says Wrapped 2025 reached 200M engaged users in about 24 hours (2024 took about 62 hours). "Engaged" means viewing at least one story. Shares reached about 500M on day one, counting in-app shares, downloads and screenshots ([Music Business Worldwide](https://www.musicbusinessworldwide.com/spotify-wrapped-campaign-hit-200m-engaged-users-in-24-hours-a-19-yoy-increase)).
- **Data privacy in shares.** Each share card shows only what's printed on it (top artists, minutes) *[described]*. Private-session listening is reported to be excluded `[unverified]`. Critics say Wrapped rebrands year-round data collection as a gift, and Seaver calls the concern valid while warning not to underestimate the enjoyment (KPBS). Wrapped Party's data-sharing controls weren't described (TechCrunch).
- **What users love / complain about.**
  - Loved: self-recognition and the sharing ritual.
  - 2024 complaints ([Salon](https://www.salon.com/2024/12/04/why-spotify-users-are-complaining-that-spotify-wrapped-is-sucky-this-year/); [TechCrunch](https://techcrunch.com/2024/12/04/spotify-users-are-disappointed-by-an-underwhelming-wrapped-this-year)):
    - top genres, the "sound town" and listening personality were dropped;
    - an AI podcast was added instead;
    - the look was called the dullest in years.
- **Steal.**
  - *One finding per card, tap-through* → a weekly recap of 4–5 cards ("You took 6 breaks. After walks, you came back to the same tab 5 of 6 times. Only 6 so far.") → the weekly recap. ^[inferred]
  - *Guess, then reveal* → "How many breaks do you think you took?" before the number. This is the NYT "You Draw It" move from the study list → recap. ^[inferred]
  - *A share card scrubbed by design* → the shared card says "I took my breaks this week" with counts only. No sleep, heart rate or times → recap share. ^[inferred]
- **Avoid.**
  - Labels that judge or rank the person ("Listening Age" types). A "focus age" would be a verdict on the body.
  - Multiplayer comparison.
  - Dropping the personal data stories people come for.
  - An LLM writing anything that looks like a stat.
- **Open questions.** Weekly or monthly? Wrapped's power comes from rarity, so a weekly recap risks becoming wallpaper. Pilot it: weekly in-app, with a share card only at the end of a month or semester. ^[inferred]

## Duolingo

- **What it is · who · platform · price.** Gamified language (and maths and music) lessons. Freemium (Super/Max); iOS, Android and the web.
- **Seen:** researched (Duolingo blog, a peer-reviewed study, NPR, UX write-ups).
- **Key screens and flows.**
  - Onboarding: pick a language → goal and level → first lesson → *then* "save your progress" with an account. People describe the prompt arriving after the first lesson ([UX Planet](https://uxplanet.org/duolingo-ux-analysis-9631ff3f4eb1); [Appcues GoodUX](https://goodux.appcues.com/blog/duolingo-user-onboarding)).
  - The learning path, the streak screen, milestone animations.
- **Mechanisms.**
  - **Deferred sign-up.** A former executive, quoted secondhand from a First Round interview, credits moving sign-up later with about a 20% rise in daily users `[unverified; secondhand]`.
  - **Streak research** ([Duolingo blog, Jan 2022](https://blog.duolingo.com/how-duolingo-streak-builds-habit)):
    - a milestone-animation change raised 7-day retention of new learners by 1.7%;
    - letting people equip up to 2 Streak Freezes raised daily active learners by 0.38% (relative);
    - learners with a 7-day streak are 3.6× likelier to finish a course. That's a correlation, and no method is given;
    - the post admits loss aversion grows with the streak's length.
  - **Freeze as insurance.** It must be equipped *before* the missed day; it can't be applied afterwards ([Duolingo Wiki](https://duolingo.fandom.com/wiki/Shop/Streak_freeze); community source).
  - **Reminder copy picked by a bandit**, with recently seen copy demoted to counter novelty decay. It covered about 200M reminders over 34 days ([Duolingo, 2020](https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/)). The +0.5% daily-user effect is in [[09-design/design-evidence|Design evidence]] §2.
- **Visual style** *[described]*: flat, rounded, saturated green, a big-eyed owl, chunky buttons, celebratory motion.
- **Copy and tone.**
  - Passive-aggressive by design. The widely shared final reminder ("These reminders don't seem to be working…") went viral as a meme ([UniversityXP](https://www.universityxp.com/news/2025/7/25/we-havent-seen-you-in-a-while-duolingos-passive-aggressive-strategy-for-keeping-users-hooked)) `[exact wording and trigger unverified]`.
  - Feb 2025: Duolingo "killed" Duo for marketing. The post drew 47M+ views, and the owl's return was tied to users doing lessons ([NPR](https://www.npr.org/2025/02/26/nx-s1-5309785/duolingo-owl-mascot-lives); Similarweb's +25% Android MAU estimate `[unverified]`).
- **Notifications and habit mechanics.** Streak + Freeze + daily reminder + mascot guilt. The peer-reviewed picture: highlighting an intact streak raises continued use; a broken streak lowers it, more so when people blame themselves; being able to repair it softens the drop ([Silverman et al., JCR 2023](https://academic.oup.com/jcr/article/49/6/1095/6589474)).
- **What users love / complain about.** Loved: low friction and short lessons. Complained: guilt copy experienced as bullying (Spectator 2026, already in [[09-design/design-evidence|Design evidence]]); notifications at bad times ([Debugger/Medium](https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0)).
- **Steal.**
  - *Value before account* → a first-run "Sample data" card you can tap through, then "Connect your laptop" → onboarding.
  - *Copy rotation with novelty decay* → 3–5 calm variants per suggestion type, never repeated back to back, never escalating → notification copy. ^[inferred]
  - *Milestone motion, rarely* → one quiet moment at "first week of data" (PRODUCT.md: delight for rare moments) → history/recap.
  - *Freeze logic, inverted* → nothing to protect, so nothing to freeze. "Pause until morning" is a plain control (Stretchly pattern) → snooze.
- **Avoid.**
  - Streaks.
  - Mascot disappointment.
  - Copy that guilt-trips.
  - Death and loss framing.
  - Sign-up prompts that interrupt a moment of value.
- **Open questions.** Is the 20% deferred-sign-up figure documented anywhere first-hand? Not found.

## Canvas LMS student app

- **What it is · who · platform · price.** Instructure's LMS app. Free to students (the school pays); iOS, iPadOS and Android. It's the app nearly every student must use.
- **Seen:** researched (App Store listing, Canvas Community forums, university help pages, student newspapers).
- **Key screens and flows.**
  - Dashboard of course cards; To-do; Calendar; Grades; Inbox; Notifications; widgets.
  - Recent releases added "IgniteAI Study Tools" and an offline Notebook.
  - A redesigned To-do was later reverted ([App Store](https://apps.apple.com/us/app/canvas-student/id480883488)).
  - Rated 4.7 from about 2.8M ratings (App Store, read 2026-11-05).
- **Mechanisms.** Notification preferences exist at the course and account levels, and course settings override account settings ([Canvas Community](https://community.canvaslms.com/t5/Archived-Questions/ARCHIVED-Notifiations/m-p/426972)).
- **Visual style** *[described]*: institutional, with course-coloured cards. Reviewers say courses look alike (App Store).
- **Copy and tone.** System voice: "Assignment graded", "Due 11:59 PM".
- **Notifications and habit mechanics.** Event-driven and high-volume, with these known faults:
  - duplicate pushes (one announcement producing four) caused by duplicated mobile tokens ([U of Idaho](https://webpages.uidaho.edu/cetl/canvas-student-notifications.asp));
  - pushes stopping on iOS;
  - instant grade alerts that keep students checking. A high-school opinion piece links this to stress, so it's weak evidence for our college users ([Wootton Common Sense, 2021](https://woottoncommonsense.com/11061/opinion/expanded-use-of-canvas-negatively-affecting-students-mental-health)).
  - A university blog advises turning on only due-date alerts ([Oregon State](https://blogs.oregonstate.edu/workingwithcanvas/?p=5)).
- **What users love / complain about.**
  - Loved: one place for assignments and modules (App Store).
  - Complained:
    - the to-do list shows only today;
    - completed work isn't dimmed;
    - Groups are missing;
    - too many back-steps (App Store);
    - due times that differ between app and web because the app follows the phone's timezone ([Canvas Community](https://community.canvaslms.com/t5/Canvas-Mobile-Forum/Time-Zone-In-Canvas-App-Not-Working/td-p/630025));
    - a known bug labelling UTC times as local ([Known Issues](https://community.canvaslms.com:443/t5/Known-Issues/OPEN-Page-To-Do-incorrectly-displays-utc-time-that-is-labeled-as/ta-p/648360)).
  - The University of Toronto advises against high-stakes submissions in the app ([U of T](https://teaching.utoronto.ca/tool-guides/mobile-apps/)).
  - Reddit threads weren't reached (search budget).
- **Steal (the floor).**
  - *A due-date-only mode* → our default notification scope is the minimum: only suggestions, nothing promotional → notification settings.
  - *Widgets* → [future] a Home Screen widget showing the current suggestion → native app.
- **Avoid.**
  - Duplicate alerts: de-duplicate per device.
  - Ambiguous times: always show the local zone if it differs.
  - Two settings levels that silently override each other.
  - Alerts with no "why".
- **Open questions.** Could we read Canvas due dates later as a "seam" signal (deadline load)? That's a CTO and privacy question, not v1.

## Steal Card check

| Card | Verdict | Corrected wording | Source |
|---|---|---|---|
| S-09 BeReal | **Corrected** | Mechanism: "sends one shared daily prompt (same moment for everyone in a region) with a 2-minute window; the friends' feed stays locked until you post." Why it works: "a shared, simultaneous moment plus a reciprocity gate made it a ritual; the countdown also made it feel like a chore." Daily users fell sharply from the 2022 peak (Apptopia: ~15M → <6M, Oct 2022 → Mar 2023; disputed by BeReal, which claimed 20–25M). Later figures (40M "active", half on 6+ days a week) are Voodoo's own and undefined. Late posts are allowed, and Bonus BeReals (2023, raised to 5 in 2024) mean it's no longer strictly once a day. Our translation stands: once per window, never repeats, and *no countdown or late label*. | Wikipedia; Dazed (Oct 2023); Voodoo (Jun 2024); Fortune (Jun 2024) |
| S-12 Spotify Wrapped | **Confirmed, with corrections** | Mechanism holds: an annual, full-screen Stories recap with per-card sharing, Stories format since 2019. Add: its pull comes from *rarity* (once a year) and from self-recognition plus distinctiveness. 2025: 200M engaged users in ~24 h and ~500M day-one shares (Spotify's figures, with "engaged" = viewed one story). Caution: the 2024 edition was panned for cutting personal data stories. Our translation: a weekly private recap is our choice, not Wrapped's cadence, so test weekly against monthly. The share card carries no health values. | Music Business Worldwide (Dec 2025); TechCrunch (Dec 2025); Salon (Dec 2024); KPBS/NPR (Dec 2023) |

Both cards can move from `Seen: described` to `Seen: researched`. ^[inferred]

## Sources

All read 2026-11-05 unless noted. Figures from search summaries rather than an opened page are marked `[unverified]` in the text.

- Pew, Americans' Social Media Use 2025: https://www.pewresearch.org/internet/2025/11/20/americans-social-media-use-2025/
- Meta, Instagram Quiet/Sleep mode: https://about.fb.com/news/2023/01/instagram-quiet-mode-manage-your-time-and-focus/
- Instagram Teen Accounts: https://about.instagram.com/community/teen-accounts
- Engadget, Instagram layout test (Oct 2025): https://www.engadget.com/social-media/instagram-tests-new-layout-that-puts-the-spotlight-on-reels-and-dms-215407062.html
- Storrito, Instagram navigation (2026): https://storrito.com/resources/what-instagrams-navigation-redesign-actually-changed/
- Siècle Digital, Instagram pause notifications (2019): https://siecledigital.fr/2019/03/13/instagram-pause-notification/
- Snapchat Support, Snapstreaks: https://help.snapchat.com/hc/en-us/articles/7012394193684-What-are-Snapstreaks-and-how-do-I-keep-them-going
- Snap newsroom, Streak Restore (Mar 2023): https://newsroom.snap.com/keep-the-streak-with-restore
- Bits of Freedom, Snapchat gamification survey (Mar 2026): https://www.bitsoffreedom.nl/en/2026/03/10/the-influence-of-snapchats-gamification-features-on-young-people/
- van Essen & Van Ouytsel 2023, Telematics and Informatics Reports 11:100087: https://doaj.org/article/7e7e45c958c74b29ba203607b6f4a840
- TechCrunch, Snapchat redesign (Feb 2018): https://techcrunch.com/2018/02/15/snap-ceo-evan-spiegel-says-the-snapchat-redesign-is-here-to-stay/
- MacRumors, Snapchat lost users (Aug 2018): https://www.macrumors.com/2018/08/07/snapchat-redesign-millions-of-lost-users/
- iPhone in Canada, redesign rollback (May 2018): https://www.iphoneincanada.ca/2018/05/11/snapchat-redesigned-redesign/
- Wikipedia, BeReal: https://en.wikipedia.org/wiki/BeReal
- Dazed, "The death of BeReal" (Oct 2023): https://www.dazeddigital.com/life-culture/article/61166/1/why-did-bereal-fail-social-media-instagram-authenticity
- Voodoo, acquisition release (Jun 2024): https://voodoo.io/news/voodoo-acquires-bereal
- Fortune, "The riddle of the BeReal deal" (Jun 2024): https://fortune.com/2024/06/14/the-riddle-of-the-bereal-deal/
- Kapwing, BeReal notification time: https://www.kapwing.com/resources/when-is-bereal-notification-time/
- Music Business Worldwide, Wrapped 2025 metrics: https://www.musicbusinessworldwide.com/spotify-wrapped-campaign-hit-200m-engaged-users-in-24-hours-a-19-yoy-increase
- TechCrunch, Wrapped 2025: https://techcrunch.com/2025/12/03/spotifys-2025-wrapped-becomes-a-multiplayer-experience/
- TechCrunch, Wrapped 2024 disappointment: https://techcrunch.com/2024/12/04/spotify-users-are-disappointed-by-an-underwhelming-wrapped-this-year
- Salon, Wrapped 2024 complaints: https://www.salon.com/2024/12/04/why-spotify-users-are-complaining-that-spotify-wrapped-is-sucky-this-year/
- KPBS/NPR, why Wrapped is irresistible (Dec 2023): https://www.kpbs.org/news/2023/12/08/why-your-brain-finds-spotify-wrapped-so-irresistible
- Refinery29, Stories-format credit dispute: https://www.refinery29.com/en-au/2021/12/10786545/jewel-ham-artist-spotify-wrapped-internship
- It's Nice That, Wrapped 2022 identity: https://itsnicethat.com/features/spotify-wrapped-campaign-identity-2022-graphic-design-301122
- UX Collective, Wrapped critique (Dec 2024): https://uxdesign.cc/whats-happened-to-spotify-wrapped-cdfc32bf56a7
- Duolingo blog, streak research (Jan 2022): https://blog.duolingo.com/how-duolingo-streak-builds-habit
- Duolingo blog, notification bandit (Sep 2020): https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/
- Silverman et al. 2023, JCR 49(6):1095–1117: https://academic.oup.com/jcr/article/49/6/1095/6589474
- Duolingo Wiki, Streak Freeze (community): https://duolingo.fandom.com/wiki/Shop/Streak_freeze
- UX Planet, Duolingo UX: https://uxplanet.org/duolingo-ux-analysis-9631ff3f4eb1
- Appcues GoodUX, Duolingo onboarding: https://goodux.appcues.com/blog/duolingo-user-onboarding
- NPR, Duo's "death" (Feb 2025): https://www.npr.org/2025/02/26/nx-s1-5309785/duolingo-owl-mascot-lives
- UniversityXP, Duolingo's passive-aggressive pushes (Jul 2025): https://www.universityxp.com/news/2025/7/25/we-havent-seen-you-in-a-while-duolingos-passive-aggressive-strategy-for-keeping-users-hooked
- Debugger/Medium, "Duolingo needs to chill": https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0
- App Store, Canvas Student: https://apps.apple.com/us/app/canvas-student/id480883488
- Canvas Community, notifications: https://community.canvaslms.com/t5/Archived-Questions/ARCHIVED-Notifiations/m-p/426972
- Canvas Community, timezone in app: https://community.canvaslms.com/t5/Canvas-Mobile-Forum/Time-Zone-In-Canvas-App-Not-Working/td-p/630025
- Canvas Known Issues, UTC To-do: https://community.canvaslms.com:443/t5/Known-Issues/OPEN-Page-To-Do-incorrectly-displays-utc-time-that-is-labeled-as/ta-p/648360
- University of Idaho, Canvas notifications: https://webpages.uidaho.edu/cetl/canvas-student-notifications.asp
- Oregon State, notification annoyances: https://blogs.oregonstate.edu/workingwithcanvas/?p=5
- University of Toronto, mobile apps: https://teaching.utoronto.ca/tool-guides/mobile-apps/
- Wootton Common Sense (high school), Canvas and stress (Oct 2021): https://woottoncommonsense.com/11061/opinion/expanded-use-of-canvas-negatively-affecting-students-mental-health

**Gaps.** The web-search budget ran out before these could be researched: Reddit threads from college students on Snapchat, Duolingo and Canvas; Snapchat's 2024–25 "Simple Snapchat" navigation tests; BeReal's notification changes after 2024; Pew's exact Snapchat share for 18–29s. Nothing was opened hands-on.

## Related

- [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[03-users/personas/icp-personas|ICP Personas]]
