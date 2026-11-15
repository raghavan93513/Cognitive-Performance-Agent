---
title: "Real study sessions, a built-in comparison, and delivery to a locked phone"
category: 25-journal
tags: [journal, frontend, evaluation, privacy, infrastructure]
sources: [tools/site/README.md, site/assets/study.js, site/api/push.js, site/api/_webpush.js, site/api/forget.js, site/sw.js, site/manifest.webmanifest, tools/site/supabase.sql, tools/site/build-app.py, tools/qa/study-rule-test.mjs, tools/qa/webpush-test.mjs]
summary: "The app's Now tab became a real study session: a timer, one suggestion from numeric rule v0, a check-in, a random Halftime-vs-25/5 comparison, consent and delete, and Web Push to a locked iPhone."
base_confidence: 0.7
lifecycle: draft
lifecycle_changed: 2026-11-13
tier: supporting
created: 2026-11-13T14:00:00Z
updated: 2026-11-13T16:35:00Z
---

# Real study sessions, a built-in comparison, and delivery to a locked phone

**Goal (Heramb Chaudhari, 2026-11-13):** turn the phone prototype from a sample-day demo into something a classmate can really use for a study session. It should time the session, speak up once at the real moment with its reasons, reach a locked phone, and log what the evaluation plan needs. It should also be honest about what is real, what is sample and what is saved.

**What is collected is a team decision** (CLAUDE.md). Heramb's choices today are recorded below as his. The team still has to confirm them before any classmate is recruited.

## What was built

The how-to, the URL knobs and the setup steps are in `tools/site/README.md`.

- **The Now tab of `/app` is the person's own real study session** (`site/assets/study.js`). The older sample day is what the Demo tab plays.
- **The first-run tour** still plays over the sample day, then hands over to the real session.
- **`?demo=1`** replays the fast-forward demo. **`?preview=1&state=…`** (the admin heat map) still shows sample moments.
- **The flow:**
  1. **Start studying.**
  2. **Consent**, the first time.
  3. **Setup:**
     - optional plan text, which stays on the phone;
     - the planned length;
     - sleep: the wearable's **sample** number, labelled as sample, or hours the person types, or left out;
     - the next stop: the sample calendar placed on today's clock, or typed, or none.
  4. **A real-time timer.**
  5. **One suggestion at the real moment:** keep going, a 5-minute walk or a 15-minute break. The card shows its reasons, numbered sources, a "How sure" line and "See why". It can be snoozed once for 10 minutes, or flagged with "Looks wrong".
  6. **A break countdown**, with "+5 min" and "End break".
  7. **End session**, then a check-in.
  8. **After 3 sessions:** the 10-question System Usability Scale (SUS).
- **Real:** the timer, the breaks, the taps, typed sleep and the check-in answers.
- **Sample:** the watch's sleep number and the calendar. The screen says so each time they appear.
- **A separate session the same day** wired live Fitbit sleep for one computer. See `tools/site/CONNECTIONS.md` and `site/assets/halftime-data.js`; it is not covered here.

## The rule v0

Numeric code picks the moment (`RULE.decide` in `study.js`). There is no LLM anywhere in that file, which follows CLAUDE.md ground rule 3. ^[inferred]

**It is a starting rule, and the team has not validated it.** It is not learned from anyone and is the same for everyone. The card says so.

| Step | Rule |
|---|---|
| Focus block to start from | 50 min |
| Sleep under 5 h | 15 min sooner |
| Sleep under 6 h | 10 min sooner |
| Sleep 8 h or more | 10 min later |
| Sleep 6 to 8 h, or unknown | no change |
| Late night (the moment falls between 11 pm and 5 am) | 5 min sooner |
| Limits | the block stays between 25 and 60 min |
| What it suggests | a 5-minute walk |
| ... after under 5 h of sleep, or late at night | a 15-minute break, if at least 25 min are left before the end; otherwise a walk |
| ... when the session ends within 10 min of the moment | "Keep going", shown 10 min before the end (the end is the break) |
| ... when the session is under 20 min | nothing (too short to judge) |

"See why" lists every step the rule took for that session.

## Evaluation built in

This builds the comparison proposed in [[12-research/evaluation-plan|Evaluation plan]]. The plan itself is still proposed, not decided by the team.

- **Two arms.** Each session is randomized to `halftime` (rule v0) or `pomodoro` (fixed 25 on, 5 off). The order is random within each pair of sessions, so every person gets both. The app tells the person which one they got.
- **The check-in:**
  1. a study-task slot. It can be swapped, and it is a **placeholder** now;
  2. "Did you finish what you planned?";
  3. "Did the suggestion feel wrong?".
- **Events.** All go through `HT.event` → `/api/collect` → `halftime.events`. Session events carry `extra.study` (the session id) and `extra.arm`. The names: `study_start`, `study_suggest`, `study_response`, `study_break`, `study_end`, `study_checkin`, `study_sus`, `consent_study`, `push_status`, `study_why`, `pwa`.
- **Sent only after "Agree and join".** Two small exceptions are in the code: a "decline" is sent once, just before recording stops, and `pwa` (first open from the Home Screen) follows the general usage recording.
- **Test sessions.** `?speed=N` sessions are marked `extra.qa`. `/admin` hides them unless "Load tests" is ticked.
- **`/admin` has a new "Study" tab** (SQL function `public.halftime_admin_study`). It shows:
  - the two arms side by side;
  - a sessions table;
  - SUS scores;
  - consent counts;
  - the notification state per phone;
  - the notification queue.

## Delivery to a locked phone

- **An installable Home Screen web app:** `site/manifest.webmanifest`, icons and `site/sw.js`.
- **Web Push.** On an iPhone it needs iOS 16.4 or later, and it works only from the Home Screen app.
- **The server signs pushes itself** with `node:crypto`: VAPID (RFC 8292) and aes128gcm (RFC 8291), with no npm package. `tools/qa/webpush-test.mjs` checks it against the RFC 8291 test vector.
- **One secret:** the Vercel env var `VAPID_PRIVATE_KEY`. It is kept outside the repo, in `../halftime-vapid.txt`. The public key is in the code.
- **The lock-screen words are fixed templates.** They carry no sleep or other readings.

**Scheduling:**
1. The phone queues its notification(s) with `/api/push?op=schedule` → `halftime.push_jobs`.
2. Supabase `pg_cron` runs `halftime._push_tick()` every 30 seconds.
3. The tick claims the jobs that are due and POSTs their ids, with a one-time token, to `/api/push?op=send` (through `pg_net`).
4. Vercel fetches the job with that token, sends the push and records the result.

Vercel Hobby cron is daily-only, which is why the timer lives in Supabase.

**No double buzz.** If the suggestion is already on screen, the queued push is cancelled.

**Fallbacks when push is unavailable** (a Safari tab, permission denied, or not sharing data):
- the suggestion shows when the app is next opened;
- "Keep the screen on" (Screen Wake Lock) is offered.

**The Home Screen app starts with empty storage,** separate from Safari's.
- An earlier build tried to carry the Safari setup across in the address (`#hp=…`). In the iOS 26 Simulator the saved icon kept only `/app`, so it never arrived, and that code was removed the same day.
- Instead, on an iPhone in Safari, the landing page and `/start` show a short note (`site/assets/install-tip.js`): add Halftime to the Home Screen first, then set up there. "Not now" hides it for that tab.
- iOS saves the page the person was on, not the manifest's `start_url`. So the landing page, opened as the installed app, sends someone set up to `/app` and someone new to `/start#account`.
- **iOS 26 status bar.** In the Home Screen app, as in Safari on iOS 26, content scrolls under the clock with a soft fade. That is the system's own look (a probe page showed the top safe area reads 0 px there), so the pages leave it alone. An attempt to cover that band was removed the same day.
- The Now tab's install card says the same: the Home Screen app starts fresh.

## Consent, honesty and delete

- **The consent screen lists everything collected:** sessions, typed sleep, check-in and survey answers, usage analytics, device, IP address and rough location, the login name, and a push address. It also lists what is not collected.
- **Two choices:** "Agree and join", or "Use it without sharing". The second turns all analytics off on that phone and disables push.
- **The You tab** has a "Share with the team" switch, "What's collected" and "Delete my data".
- **Delete my data** → `/api/forget` → `public.halftime_forget(visitor)`. It deletes that visitor's events, push address and queue, and leaves one anonymous `data_deleted` marker. Then it clears the phone.
- **Typed text stays out of analytics.** `track.js` no longer puts typed text into tap labels. Text selected or copied inside `[data-private]` areas is counted, not quoted.

This follows CLAUDE.md ground rules 5 and 6. ^[inferred] The consent wording itself has not been reviewed; see "Still open".

## Landing wording

Heramb approved these changes on 2026-11-13. The full list of claims is on [[09-design/landing-page|Landing page]].

| Where | Was | Now |
|---|---|---|
| Honesty card | "It never tells your coach, team or school." | "It never tells your coach or your team." |
| Hero fine print | "Works with a Fitbit, Oura or WHOOP…" | "Built for Fitbit first, or no watch at all. Other watches are planned." |
| Learning bar | counts to 7 nights; "first week" | counts to 14 nights; "first two weeks" |
| Demo modes | "Late night", "After practice" | "Late night (planned)", "After practice (planned)" |
| Footer | usage, device, IP address | adds "and rough location" and "Sessions and answers are saved only if you join the class test in the app." |

**Still open on the landing page:**
- the counselor is unnamed until Columbia Health confirms;
- `noindex` stays on.

## Testing

- **`tools/qa/study-rule-test.mjs`:** 15 checks pass (the rule and the SUS score).
- **`tools/qa/webpush-test.mjs`:** passes.
- **Device walks** of the full session on iphone-se, iphone and iphone-max: 0 console errors and 0 UI-check defects.
- **An independent code review** found 10 problems. All are fixed:
  - typed text leaking through tap labels;
  - the opt-out not carried to the Home Screen app (later moot: the hand-over was removed);
  - push not gated by consent;
  - the admin view breakable by one odd event;
  - no cap on queued notifications;
  - the "still studying?" screen being overwritten;
  - back-navigation from consent and delete;
  - cue timing after a manual break;
  - a wrong "it's late" line;
  - over-counting of notification opens.

**Second round: an independent phone QA pass (43 walks) and a Simulator walkthrough in real Safari.** Fixed:
- a second person on the same phone inherited the first person's session, plan text and consent; the app now starts clean for a new name or account;
- "Still studying?" was lost on a reload, and check-in answers were lost on a reload;
- a suggestion snoozed past the planned end said "a walk fits" with 0 minutes left; it now says to finish up;
- the sharing switch and the consent screen could disagree; they are now one choice;
- an unbroken 60-character plan widened the page past the screen;
- the Data sources screen showed bracketed "[confirm with CTO]" placeholders and said "coach, team or school";
- in the fixed-timer arm, a break window that passed while the app was closed was not counted;
- side screens could open over the reaction task;
- in the Home Screen app, scrolled content showed under the status bar, and a strip of text showed under the pinned buttons;
- the Safari-to-Home-Screen hand-over never arrived (see "Delivery to a locked phone").

**The 50-person load test on the live site:** 9,080 of 9,080 events stored, 0 errors, page p50 203 ms.

**After the fixes, live:** the full session walk passed on iphone-se, iphone and iphone-max with 0 console errors, 0 UI defects and 0 failed steps.

## Decisions and who made them

All three are Heramb Chaudhari's, made on 2026-11-13.

- **Apply the database change and add the push key to Vercel.** That means running `tools/site/supabase.sql` and setting `VAPID_PRIVATE_KEY`.
- **The landing-page wording above.**
- **The check-in's study task stays a placeholder until the team picks one.** A PVT-B style reaction check exists as a trial behind `?task=pvtb`. Which task to use is #2 in [[24-synthesis/open-decisions|Open decisions]].

**Needs the team's confirmation.** The data-collection choices change what data is collected and what users see, which CLAUDE.md treats as a team decision. They are: what the consent screen says, the session events, typed sleep, the push address, and the two-arm comparison.

## Still open

- **Human-subjects (IRB) review is not done.** [[12-research/evaluation-plan|Evaluation plan]] says to settle it before recruiting. It is #11 in [[24-synthesis/open-decisions|Open decisions]].
- **The consent wording needs review** by the team and the instructor. See [[10-trust-safety/privacy-and-consent|Privacy and consent]].
- **Rule v0 is unvalidated.**
- **Nothing reads a real watch or calendar on the deployed site.**
- **The admin password is still short.**
- **`halftime_admin_login` trusts a caller-supplied IP address.** The lockout can be bypassed by calling the database function directly. This is a follow-up.
- **No check on a physical iPhone yet.** So the Home Screen install and a push arriving on a locked iPhone are untested on a real device. ^[inferred]


## The laptop version (Heramb, 2026-11-13, later the same day)

Same app, same study engine (`site/assets/study.js`), same URL: `/app` lays itself out for a laptop when the window
is 1024 px or wider. One engine means a session on a laptop and a session on a phone are the same kind of record, so
the evaluation can compare them. The session's start event carries `computer` and `wide`, so they can be told apart.

- **Layout.** The bottom tab bar becomes a top bar (brand, Now, History, You, Demo, and a link to `/desktop`). The
  Now tab is two columns: the session (big clock, the session line, next stop, Take a break, End session) on the left,
  and the suggestion card on the right when Halftime speaks. While it is quiet, the right column says what it is
  waiting for, how it will reach you, and the keys. Setup is two columns with a floating Start button. Check-in,
  survey, consent and delete are one centred column. History and You become two-column grids.
- **Words.** On a computer the app says "this computer", not "this phone", everywhere.
- **The tab title is the timer:** "0:42 studying · Halftime", "Break 3:12 · Halftime", or the suggestion itself
  ("Short walk now? · Halftime"), so it shows in the tab strip while you work in another tab.
- **Keys** (computer only; never while typing): N start, ↵ start the timer / accept a suggestion / end break,
  K keep going, S snooze, W see why, B break (then 5 or 1 for 5 or 15 min), E end session, Esc back, T mini timer.
  Keyboard presses skip the double-tap guard.
- **Mini timer on top** (Chrome and Edge, Document Picture-in-Picture): a small always-on-top window with the clock,
  the suggestion and its Start walk / Keep going buttons, and the break countdown. Logged as `study_mini`.
- **Notifications on a laptop** need no install: Chrome, Edge, Firefox and Safari on a Mac can all subscribe to Web
  Push from the page (the server's allow-list already covers their push services). When push isn't on but
  permission is granted, the page shows the system notification itself if its tab is in the background.
- **`/desktop`** (built the same day by the session that wired the data sources, see `tools/site/CONNECTIONS.md`) stays as "every source on one clock": the app in a narrow frame
  on the left, and the session drawn against sample laptop activity, the watch and the calendar on the right. Its
  "Phone version" link now says "Open Halftime"; its red "now" label was darkened to pass contrast.

**Checked:** laptop (1440×900), laptop-small (1366×768) and desktop (1920×1080) walks with 0 console errors and 0
UI-check defects, live; the mini timer opens in Chrome and its Start walk button starts the break on the page; the
phone layout re-walked on iPhone SE / Pro Max with no change. **Not checked:** a push notification arriving on a real
laptop, and Safari on a Mac (no Document Picture-in-Picture there, so no mini timer).

## Laptop QA round 2 and a MacBook preview (Heramb, 2026-11-13, about 4 pm)

Heramb asked for the laptop version to be walked as a new user and for "a simulator for the MacBook, like the one
for the iPhone". Full list in `tools/site/README.md` ("Laptop QA, round 2" and "MacBook preview").

**Found and fixed** (deployed): a laptop told to unblock notifications "in Settings" (iPhone wording); source 3 on
the card showed the calendar's next stop while the card's sentence was about the planned end; a suggestion that fires
after the planned end said "Keep going. You're close to done" (now "Time to wrap up"); Snooze offered when the
snoozed suggestion could no longer fit; no keys on the check-in, end screen and survey; S and W listed in fixed-timer
sessions; test-speed sessions unmarked in History; consent said "finger paths" on a computer (it records mouse
paths there); `/start` on a laptop told the person to open a pairing page "on your laptop" and called Halftime "a
small pill at the top".

**MacBook preview** (Heramb chose a preview page over a QA-only tool): `/preview` shows the real `/app` inside a
drawn MacBook Air 13″/15″ or Pro 14″/16″, at each model's real browser-window size (default display size minus the
menu bar and Chrome), with a split-view option, test speed and timer pickers. For the team; noindex and unlinked.
The same sizes were added to `tools/qa/device-walk.mjs`.

**Checked live:** 0 console errors and 0 UI-check defects on four laptop sizes and three iPhone sizes.
**Push on a laptop:** Heramb's first try in his Chrome got nothing, and no subscription reached the server. The server
and the push service were fine (a real Chrome on the same Mac, notifications allowed, got the live push "Short walk
now?" about 13 s after it was due). The likely cause in his try ^[inferred]: the first "Turn on notifications" opens
the consent screen, and after agreeing, notifications stayed off with no hint to click again. Fixed and deployed:
agreeing now goes straight on to the browser's Allow question; a computer is told where to allow notifications if the
browser doesn't ask; a "Send a test notification" button checks that macOS shows them. Checked live in a scripted
real Chrome; not yet re-tried in Heramb's own Chrome. The Claude in Chrome extension did not respond, so this round
used the desktop app's built-in browser and headless Chrome.

## Status when this page was written

As of 2026-11-13, about 3 pm:
- **Live and checked:** the real session, both arms, the check-in, the survey, consent, the approved landing wording, the install tip, and the Home Screen app opening straight into setup or the app (iOS 26 Simulator).
- **Database step done (Heramb ran `tools/site/supabase.sql` in the Supabase SQL editor, about 2:45 pm).** Checked live:
  - every new function answers, and `/api/push?op=config` now reports `configured: true`;
  - the notification pipeline runs: a test job on a fake Apple address was claimed by the 30-second database timer, which called `/api/push?op=send` through `pg_net` (seen in Vercel's request log), and it was retried three times because Apple rejected the fake address;
  - "Delete my data" in the live app removed a test visitor's rows (a second delete call found none left).
- **Push key:** `VAPID_PRIVATE_KEY` is set on Vercel (production).
- **Notifications in the iOS 26 Simulator:** permission was granted, but the push subscription itself failed and no subscribe request reached the server; the fallback (the card shows when the app is opened) worked. It is not known whether the Simulator supports Web Push at all. The app now shows the error on the Notifications card and logs it (`push_status` = `error`), so a failure on a real phone will be visible in `/admin`.
- **Simulator input lag:** in the Simulator, a tap often took effect only when the next touch arrived, and typed names kept only their first letter. Chrome walks of the same screens show neither, so this is treated as a Simulator artifact. ^[inferred]
- **Not tested:** a notification arriving on a locked physical iPhone.

## Related

- [[25-journal/2026-11-06-demo-app-and-analytics]] · [[12-research/evaluation-plan]] · [[09-design/landing-page]] · [[10-trust-safety/privacy-and-consent]] · [[11-engineering/deployment-and-operations]] · [[25-journal/25-journal|Journal hub]]
