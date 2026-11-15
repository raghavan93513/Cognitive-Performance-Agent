---
title: "Spike: measuring phone use (route B Shortcuts, route D native app)"
category: 25-journal
tags: [journal, research, privacy, wearables, engineering]
sources: ["24-synthesis/declutter-brief-2026-11-15.md", tools/spikes/phone-use/README.md, tools/spikes/phone-use/minutes.mjs, tools/spikes/phone-use/pull-endpoint.mjs, tools/spikes/phone-use/minutes-test.mjs]
summary: "Route B (Shortcuts app triggers → our endpoint): works with caveats on paper; one phone test decides it by Nov 21. Route D (dev-signed Family Controls app): works for a few testers, at a cost."
base_confidence: 0.55
lifecycle: draft
lifecycle_changed: 2026-11-15
tier: supporting
created: 2026-11-15T21:30:00Z
updated: 2026-11-15T21:30:00Z
relationships:
  - target: "[[24-synthesis/declutter-brief-2026-11-15]]"
    type: related_to
  - target: "[[25-journal/2026-11-15-boardroom-three-problems]]"
    type: related_to
---

# Spike: measuring phone use (routes B and D)

**Asked for:** Heramb's 2026-11-15 call that device use is measured, not only asked ("if screen time is not possible, we'll find a way"). This page covers routes B and D from the [[24-synthesis/declutter-brief-2026-11-15|declutter brief]]. Time box: about 2 days. **Kill rule: about Nov 21.** **Done so far:** documentation and source research, plus a local prototype of the endpoint and the minutes calculation (`tools/spikes/phone-use/`, 11 synthetic tests pass). **Not done:** nothing has run on a real iPhone. This session had no phone, so every "works" below is on paper until the on-device test in the prototype README is run. What gets collected is a **team** decision, and the consent text must change before a real tester's data is collected (CSO).

## Verdicts

| Route | Verdict | One line |
|---|---|---|
| B. Shortcuts app triggers → our endpoint | **Works with caveats** (on paper) | Apple documents App triggers running without asking. "Is closed" is documented for leaving or switching, not for locking. Recent bug reports exist. One phone test settles it |
| D. Dev-signed native app (Family Controls + DeviceActivity) | **Works with caveats** for ≤ a handful of testers | No Apple approval needed for development builds. It needs a paid team ($99/yr), a Mac, each phone plugged in once, and 35–60 h of Swift. TestFlight is blocked until Apple approves |
| D′. Same app reads Apple Watch sleep (HealthKit) | **Works** | Standard HealthKit capability with no approval step. Comes free if D is built |

## Route B: iOS Shortcuts "when a picked app opens / closes"

### What the sources say

1. **Runs without a prompt: yes, documented.** Apple's current (iOS 27) guide lists **App** among the automations that "can be run automatically". The toggle is on the shortcut: Edit → Info → Privacy → Allow Running When Locked, and then "the automation will not notify you" [1]. On iOS 17–26 the same choice was **Run Immediately**, with a separate **Notify When Run** toggle that can be switched off [2][3]. Apple's note "you may also need to set individual actions … to run automatically" applies to Get Contents of URL. The first time it runs, iOS asks whether the shortcut may connect to our domain. One **Always Allow** tap covers later runs, and Privacy → Reset undoes it [4].
   - Real-world proof: the screen-time app one sec has used exactly this trigger for years, with Run Immediately and notifications off [3].
2. **When "Is Closed" fires.** Apple: "Triggers your automation when you close or switch from the selected app" [5].
   - **Swipe up to Home and switching apps:** covered by "close or switch from".
   - **Screen lock: not documented.** No source says whether locking the phone in a picked app fires "is closed". It is the biggest unknown, so the prototype caps an open with no close (default 20 min) and marks that session "check" ^[inferred].
   - **Reported bugs (iOS 26.6, July–Aug 2026):** "is closed" fired when Control Center or Notification Center was pulled down, and "is opened" stopped firing after a restart, with no error shown. Apple has not acknowledged either, and there's no report on iOS 27 yet [6]. A 2021 thread also had "is closed" depending on how you left the app [7]. The prototype absorbs the false close by extending the stretch when a second close arrives with no open between them. A restart that silently kills the trigger can't be fixed by our code ^[inferred].
3. **A shared link can carry the automation on iOS 27, not before.**
   - **Before iOS 27:** personal automations couldn't be shared. You shared a shortcut and each person built the automation by hand [8].
   - **On iOS 27:** automations are now triggers inside a shortcut [1][9]. One iOS 27 beta write-up says iCloud links "can now include the automation triggers" [10]. one sec's iOS 27 setup imports a shortcut and has you turn the automation on in the import flow [11], which agrees.
   - **Not confirmed by Apple:** Apple's own iOS 27 pages don't say whether imported triggers arrive switched on or off. Synced automations arrive off [12], and one sec tells users to switch theirs on ^[inferred: expect off].
   - **The tester re-picks the apps** after import [11]. That is good for privacy: the picks stay on the phone.
   - **iOS 27.2** reportedly lets the App automation hand over the closed app's name [13]. Our shortcut must not use it, and the endpoint refuses any key except `code` and `kind`.
4. **No queue.** If the phone is offline, the ping is lost ^[inferred].

### What the tester does (taps are estimates; count them on a device)

**iOS 27, from a shared link** (~14–18 taps, ~3 min):
1. Open the link from Halftime and tap Add Shortcut (2 taps).
2. Paste the pairing code into the import question (2).
3. On the "Is Opened" trigger: Choose, pick 2 apps, Done (4).
4. Do the same for "Is Closed" (4).
5. Turn both triggers on (1–2).
6. Run it once and tap Always Allow (1–2).

**iOS 17–26, by hand** (~28–34 taps, ~6–8 min, with a written guide):
1. Get the base shortcut from the link and paste the code (4).
2. For each of the two automations: Automation tab → + → App → Choose → pick apps → Done → set Is Opened or Is Closed → Run Immediately → Notify off → Next → Run Shortcut → pick "Halftime pull" → Done (~12 each).
3. Always Allow (1).

The brief's whole first run targets 5 taps, so this has to be an optional "measure my phone" step after the first session, not part of sign-up ^[inferred].

### The prototype (`tools/spikes/phone-use/`, local only)

- **`pull-endpoint.mjs`.** `POST /pull-event` takes `{"code","kind"}` and stores `{code, kind, server time}` in memory. Any extra key (an app name, a URL, the phone's clock) gets **400**. Bodies over 200 bytes get **413**.
- **`minutes.mjs`.** `pullMinutes(events, session)` turns pings into minutes:
  - pairs each open with its close;
  - keeps the first open when two opens arrive in a row;
  - extends a stretch over the reported false close;
  - caps an open that never closes and marks it "check";
  - clips everything to the session.
- **Tests: 11, all synthetic, all pass.** They cover clean visits, direct switches between picked apps, the Control Center false close, the screen lock cap, app already open at session start, events outside the session, and the endpoint refusing an app name.
- **Not built:** a real endpoint in `site/api/`, which another session owns.
- **Not tried:** a phone reaching the laptop over plain HTTP on Wi-Fi.

### The privacy line (proposed, for the team and CSO)

- **The tester picks the apps on their own phone.** Halftime never sees the list.
- **Per ping, the server keeps three things:** pairing code, open or close, and the server's receive time. Never which app, the app's name, or any URL.
- **Per session, it stores one number,** *minutes in your picked apps*, plus a visit count and a "check" flag. Never per-app minutes.
- **Raw pings are deleted once they're added up** (proposed: within 24 h). A day of timestamps alone shows *when* someone was on their pull apps, such as 2 a.m. ^[inferred]
- **Consent says it plainly:** "If you turn this on, your phone tells Halftime when one of the apps you picked opens or closes. It never says which one."

### Team hours (estimates) ^[inferred]

| Step | Hours |
|---|---|
| On-device test on 2 team iPhones (README table, 8 checks) | 2–3 |
| Real endpoint in `site/api/` + table + delete after summing (site owner) | 3–4 |
| Shared shortcut with import question + a one-screen setup guide (iOS 27 and 17–26) | 3 |
| Join with sessions: minutes on the check-in line, the link card's input | 3 |
| Consent text + privacy sheet row (CSO review) | 1–2 |
| **Total** | **12–15** |

## Route D: a development-signed native app

### What the sources say

1. **No approval for development builds.**
   - Apple's docs require the Family Controls distribution request only "before submitting your app to the App Store" [14].
   - The Family Controls (Development) capability works on a **paid** team. A free Personal Team doesn't support it at all [15][16].
   - So the 7-day re-sign of free accounts doesn't apply. A free account can't use Family Controls in the first place.
   - Paid-team development profiles last about a year, though that rests on forum recollection [17].
   - **TestFlight and ad-hoc builds are blocked:** they need the distribution entitlement, so they fail until Apple approves [16][18]. That approval reportedly takes weeks or longer (one request pending since June 2026) [16].
2. **What each tester's phone needs** (from Apple's docs):
   - **iPhone registered** to the team (by UDID).
   - **Plugged into the Mac once,** because Developer Mode only appears in Settings after a phone has been paired with a Mac.
   - **Developer Mode on:** Settings → Privacy & Security → Developer Mode → Restart → Enable → passcode.
   - **Install** from Xcode, or an .ipa through Apple Configurator [19].
   - **Authorize:** `requestAuthorization(for: .individual)` with Face ID. No parent is needed [20].

   In practice, each tester meets a teammate with the Mac once, for about 15 min ^[inferred].
3. **Per-app minutes without app names.**
   - DeviceActivity counts the time an app is frontmost against thresholds [21]. The tester picks apps in Apple's picker, and the app only ever holds opaque tokens ^[inferred from the framework design].
   - A schedule must be at least 15 minutes long [22]. Thresholds every 5 min across a session would give minutes in 5-minute steps ^[inferred].
   - **Getting the numbers out:**
     - The monitor extension gets cut off during network calls [23], and the report extension can't send data at all (CTO, boardroom).
     - So the extension writes to a shared App Group and the main app uploads when it next opens ^[inferred].
   - **Reliability reports:** threshold callbacks firing twice, firing at interval start, or firing while Screen Time shows 0 (a possible iOS 26.2 regression) [24][25].
4. **Apple Watch sleep.** `HKCategoryTypeIdentifier.sleepAnalysis` is a standard HealthKit read with no approval step [26]. It covers Maya's top ask.

### Team hours (estimates) ^[inferred]

| Step | Hours |
|---|---|
| Swift app: authorize, picker, schedule per session, monitor extension → App Group, upload | 25–40 |
| HealthKit sleep read + upload | 5–8 |
| Signing, device registration, 3–5 install meetups | 5–8 |
| Endpoint + consent (shared with B) | 3–5 |
| **Total** | **35–60**, more if nobody on the team has shipped Swift |

**Needs:** a Mac with Xcode, a paid Apple Developer membership ($99/yr) on one teammate, and testers willing to turn on Developer Mode. Developer Mode carries a security warning, which is a recruiting and consent cost (CSO) ^[inferred].

## Recommendation (for the team) ^[inferred]

1. **Run B's on-device test first** (2–3 h, README table) on two team iPhones, one on iOS 27 if possible, by Nov 21.
   - **If checks 1, 2 and 8 pass:** build B (12–15 h). It is the only measured phone route with no Mac, no paid account and no install meetup.
   - **If screen lock never fires "is closed",** B still works with the cap, but sessions with a lock show "check".
2. **D only if** a teammate already has a Mac and a paid account and wants Apple Watch sleep for the demo. Treat it as a 3–5-tester demo, not the pilot.
3. **Either way, A + F stay the floor** (brief).

## Sources

1. Apple, Add automations to Shortcuts on iPhone or iPad (iOS 27 guide). support.apple.com/guide/shortcuts/apdfbdbd7123/ios
2. Matthew Cassinelli, "All Automations Now Run Immediately In Shortcuts (Notifications Required)", 2023-08-01. matthewcassinelli.com/automations-run-immediately-shortcuts-notifications/
3. one sec, Initial setup on iOS 17+ and "How to disable Shortcuts Automation Notifications". feedback.one-sec.app/help/articles/3470183 · one-sec.app/blog/disable-shortcuts-automation-notifications/
4. Apple, Shortcuts privacy settings (Always Allow, Reset Privacy). support.apple.com/guide/shortcuts/apd961a4fc65/ios
5. Apple, event triggers: App (Is Opened / Is Closed). support.apple.com/guide/shortcuts/apde31e9638b/ios (wording quoted via search results; the page body didn't render for us)
6. PC Glance, "iOS 26.6 Broke Shortcuts App Automations", status 2026-08-12. pcglance.com/ios-26-6-shortcuts-automation-broken/
7. Apple Community, "Problem Shortcuts after update 14.5". discussions.apple.com/thread/252713739
8. Apple Community, "Is it possible to send a personal automation to someone". discussions.apple.com/thread/254467149
9. MacRumors, iOS 27 Shortcuts guide. macrumors.com/guide/ios-27-shortcuts/
10. Derek Seaman, "Perfect Shortcut Focus Mode Tracking for iOS 27", 2026-07 (beta). derekseaman.com/2026/07/perfect-shortcut-focus-mode-tracking-for-ios-27-and-ipados-27.html
11. one sec, Initial Shortcuts setup on iOS 27+. tutorials.one-sec.app/en/articles/10309122
12. Apple, Intro to automation shortcuts ("specific to a device … sync … with the automation disabled"). support.apple.com/guide/shortcuts/apd690170742/ios
13. iThinkDiff, iOS 27.2 open/close automation and closed-app name (secondary report). ithinkdiff.com/iphone-duo-open-close-automation-ios-27-2/
14. Apple, Family Controls and the com.apple.developer.family-controls entitlement. developer.apple.com/documentation/familycontrols
15. hsb.horse, "You cannot run Family Controls on a real device with a Personal Team". hsb.horse/en/blog/personal-team-family-controls-limitation/
16. Apple Developer Forums, Family Controls capability threads. developer.apple.com/forums/thread/764682 · developer.apple.com/forums/thread/701874
17. Apple Developer Forums, profile expiry (paid ≈ 1 year; free 7 days). developer.apple.com/forums/thread/70282 · Apple, compare memberships. developer.apple.com/support/compare-memberships/
18. Apple Developer Forums, Family Controls on TestFlight. developer.apple.com/forums/thread/806285
19. Apple, Enabling Developer Mode on a device. developer.apple.com/documentation/xcode/enabling-developer-mode-on-a-device
20. Apple, AuthorizationCenter.requestAuthorization(for:). developer.apple.com/documentation/familycontrols/authorizationcenter/requestauthorization(for:)
21. Apple, DeviceActivityEvent. developer.apple.com/documentation/deviceactivity/deviceactivityevent
22. Apple Developer Forums, 15-minute minimum schedule. developer.apple.com/forums/thread/747557
23. Apple Developer Forums, network requests from DeviceActivityMonitor. developer.apple.com/forums/thread/724649
24. Apple Developer Forums, threshold callbacks fired twice or at interval start. developer.apple.com/forums/thread/741133 · developer.apple.com/forums/thread/727970
25. Apple Developer Forums, iOS 26.2 eventDidReachThreshold regression. developer.apple.com/forums/thread/809410
26. Apple, HKCategoryTypeIdentifier.sleepAnalysis. developer.apple.com/documentation/healthkit/hkcategorytypeidentifier/sleepanalysis

## Related

[[24-synthesis/declutter-brief-2026-11-15|Declutter brief]] · [[25-journal/2026-11-15-boardroom-three-problems|Boardroom: three problems]] · [[25-journal/2026-11-15-icp-three-problems|ICP panel: three problems]] · [[25-journal/2026-11-13-real-study-sessions|Real study sessions]]
