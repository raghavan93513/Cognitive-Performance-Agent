# Halftime landing page: hosting on Vercel

The shipped page lives in **`site/`**:
- `index.html`: the page
- `favicon.svg` and `apple-touch-icon.png`
- `og.jpg`: the link preview for group chats
- `robots.txt`
- `vercel.json`: response headers and clean URLs

The design history and every round of changes are in `design/mockups/landing/` (see its BRIEF.md). From round 10 on, edit `site/index.html`.

## Live
**https://halftime-study.vercel.app/** is the Vercel project `halftime-study`, under the team `htcs-projects-98674d83`. It was first deployed 2026-11-05 with the Vercel CLI.

## Deploy
Redeploy from the CLI:
```bash
cd site && npx vercel@latest deploy --prod --yes --scope htcs-projects-98674d83
```
`site/.vercelignore` keeps `.env*` and `.vercel` out of the upload. If `vercel link` writes a `.env.local` token, delete it: a static page doesn't need it.

Or connect GitHub instead: in Vercel, import the repo and set **Root Directory** to `site`, with framework preset **Other** and no build command.

## Before it goes public
- **Indexing is off.** `vercel.json` sends `X-Robots-Tag: noindex, nofollow`, and `robots.txt` disallows everything. Remove both only once the team has approved the page's claims.
- **Claims the boardroom found false or unconfirmed** (`Wiki/.../25-journal/2026-11-05-boardroom-privacy-blanks.md`). The wording was changed on 2026-11-13 (approved by Heramb; the team still has to lock it):
  - Fixed: "It never tells your coach or your team." It used to say "coach, team or school", and the school part was false.
  - Fixed: "Built for Fitbit first, or no watch at all. Other watches are planned." It used to say "Works with a Fitbit, Oura or WHOOP".
  - Fixed: the learning bar counts to 14 nights (it was 7), and the card says "first two weeks".
  - Fixed: the demo modes read "Late night (planned)" and "After practice (planned)".
  - Fixed: the footer adds "and rough location" and "Sessions and answers are saved only if you join the class test in the app."
  - Still open: the counselor is unnamed until Columbia Health confirms.
  - Still open: `noindex` stays on until the team approves the page's claims.
- **Link previews:** `og:image` points to `https://halftime-study.vercel.app/og.jpg`. If the domain changes, update it.

## Check locally with the same headers
```bash
node tools/site/serve.mjs 3007
```
Then open http://127.0.0.1:3007/. It applies `site/vercel.json`'s headers, including the Content-Security-Policy.

Audit on every screen size:
```bash
node tools/qa/device-walk.mjs --url=http://127.0.0.1:3007/ --devices=phone-320,iphone-se,iphone,iphone-max,iphone-landscape,fold-narrow,fold-cover,fold-open,pixel-fold-open,ipad,laptop-small,laptop,desktop
```

## Check smoothness
```bash
node tools/qa/perf-scroll.mjs --url=/index.html --root=site --device=iphone --runs=2
```
It scrolls the whole page and taps the demo on a CPU slowed 4×, then prints frame times, layouts, paints and tap latency. Compare the numbers before and after a change.

## Regenerate the link preview
Edit `tools/site/og-card.html`, then render it with:
```bash
node tools/qa/device-walk.mjs --root=tools/site --url=/og-card.html --devices=og
```
Save the frame as `site/og.jpg` (1200×630).

## The demo app and its analytics (added 2026-11-06)

The site is a working phone prototype. Since 2026-11-13 the app's Now tab runs the person's own real study session (see "Real study sessions, install and push" below). Everything else is sample data: the landing page, setup, the watch and calendar numbers, History's sample week and the Demo tab.
- `/`: the landing page, with **Log in** and **Create a demo account**, and a comparison of wearables, productivity apps and Halftime.
- `/start`: log in, which asks only for a name, or create an account. The setup steps are: about you, what it reads, pairing the laptop app, any wearable or none, the wearable's permission screen, syncing, your data (sample sleep even with no wearable), your next commitment, and done.
- `/app`: the app, built from the round-3 Island + Forecast mockup by `python3 tools/site/build-app.py`. Home shows "Body today" (sleep, heart rate, resting heart rate, HRV, each against your usual) and "Today" (a dummy calendar: a student's day or an athlete's day). History adds 14-night heart charts. The sample numbers live in `site/assets/demo-data.js`, shared with `/start`.
- **The tour** (`site/assets/tour.js`): a welcome card, then 8 spotlight steps. The welcome card has the tagline and the person's wearable vs study apps vs Halftime. It runs right after every new setup, because "Open Halftime" clears localStorage `ht-tour-done`. Logging back in by name doesn't run it. Replay it from the You tab or the Demo sheet. Re-run that script after changing the mockup. The app has tabs for Now, History, You and Demo. Now is the person's own session (since 2026-11-13). The Demo tab plays the sample day and jumps to any moment: a walk fits, the first week, a wearable that didn't sync, something looks wrong, or Thursday morning.

### What's recorded
`site/assets/track.js` runs on every page and records:
- screens, and the time spent on each;
- taps (position, target, rage taps, taps on things that don't respond);
- scroll depth and speed;
- **attention**: how long each marked section (`data-attn`) was at least half on screen;
- pointer or finger movement, sampled every 300 ms;
- idle time, tab switches, orientation and resize;
- text selection and copy (inside a `[data-private]` area, such as the person's own session, only the length is recorded, never the words);
- the name typed at login, but only lengths for other fields. A tap on a field is labelled by the field's name, never by what was typed into it;
- device, OS, browser, screen size, language and time zone;
- load speed, LCP, CLS, slow interactions and JS errors.

Each browser gets a visitor id and each tab a session id, so many people at once stay separate. Usage recording is **on by default**, with no pop-up on the landing page or in setup (Heramb, 2026-11-06). Setup doesn't show an analytics switch (Heramb, 2026-11-06). The landing page footer says usage is recorded.

Since 2026-11-13 the app has a consent step. The first tap on **Start studying** opens "Before your first session", which lists everything saved. **Agree and join** keeps recording on and lets session events be sent. **Use it without sharing** turns all recording off on that phone, the same as the You tab's "Share with the team" switch. That switch stops all sending from the device; turning it off first sends what was already recorded, plus an `opt_out` row. "Delete my data" on the You tab removes that phone's rows from the server.

### Where it goes, and the admin page
- **Storage.** `site/api/collect.js` adds the IP address and approximate place (from Vercel's headers). It stores each batch with one call to the Supabase project **Heramb Stylist proj**. Everything sits in its own `halftime` schema: `tools/site/supabase.sql` holds the tables and functions, and it can be re-run safely.
- **Locked down.** The tables use row-level security and have no policies, and the schema isn't exposed. The site's key is the project's publishable key (`site/api/_db.js`), so all it can do is call the `halftime_*` functions.
- **Admin page.** **https://halftime-study.vercel.app/admin** is password-protected, in the style of Startup City's admin. Sign-in is checked in the database (bcrypt), and 8 wrong tries lock out that IP for 15 minutes. The session is an HttpOnly cookie that lasts 7 days.
- **Time ranges.** Live 30 min, today, 24 h, 7 days or all. Load-test rows are hidden unless you tick them.
- **Its tabs:**
  - **Pulse:** who's on the site right now and their screen, totals, an activity chart and a feed of milestones.
  - **Study** (added 2026-11-13): real sessions, the two arms side by side. See "The admin Study tab" below.
  - **Funnel:** landing → set up → name → finished setup → app → tour → saw "Short walk now?" → took the walk, plus the student/athlete and wearable split.
  - **Screens:** time per screen, where sessions ended, landing attention and scroll depth.
  - **Tour:** how many reached each step, and where people skipped.
  - **Taps & heat map:** top taps, rage and dead taps, and a heat map of taps drawn over the real screen (`?preview=1` shows a screen with a sample profile and records nothing).
  - **Visitors:** one row per person; click a row for their full timeline.
  - **Devices & places:** devices, places, QR vs direct, and preferences.
  - **Health:** load speed (LCP, CLS), slow taps and JS errors.
  - **Export CSV.**
- **Admins.** Add or reset one in the Supabase SQL editor with `select public.halftime_admin_create('name', 'a long password');`. The website can't call that function. Change your own password on the admin page (Password).
- **At 50 people at once:** each phone sends one small batch about every 15 s (about 3 requests a second in all), and each batch is a single database insert. A failed send stays on the phone and is retried after 30, 60, then 120 s. When a page closes, everything not yet saved goes out with `sendBeacon`, including a batch still on its way. The database stores each event once (unique on session + seq), so a double send is harmless. Load-test rows land with `test = true`. Run the load test with:
  ```bash
  node tools/qa/load-test.mjs --url=https://halftime-study.vercel.app --users=50 --minutes=3
  ```

### Testing locally
```bash
LOG_EVENTS=/tmp/events.jsonl node tools/site/serve.mjs 3007
```
This runs the API too and appends every received event to the file you name. Locally nothing reaches the team's database (since 2026-11-15 the local server turns off the built-in live key). Add `SUPABASE_URL=<project url> SUPABASE_KEY=<publishable key> ADMIN_INSECURE_COOKIE=1` to use the real database on purpose and sign in to `/admin` over plain http.

To test as a returning visitor (the tour already seen), add `{"eval": "localStorage.setItem('ht-tour-done','1'); true"}` to a walk's steps before it opens `/app`.

## Real study sessions, install and push (added 2026-11-13)

Asked for by Heramb Chaudhari, 2026-11-13. What is collected is a team decision: the team still has to confirm it, and human-subjects review is not done (see "Not done yet" at the end).

### What it is
- **The Now tab of `/app` is the person's own study session.** The code is `site/assets/study.js`. The older sample day is what the Demo tab plays.
- **The first-run tour** still plays over the sample day, then hands over to the real session.
- **The flow:**
  1. **Start studying.**
  2. **Consent**, the first time ("Before your first session").
  3. **Setup:**
     - what you're working on (optional; the text stays on the phone);
     - the planned length (30 min to 3 h);
     - sleep: the wearable's **sample** number, labelled as sample, or hours the person types, or left out;
     - the next stop: the sample calendar placed on today's clock, or typed, or none.
  4. **A real-time timer.**
  5. **One suggestion at the real moment:** keep going, a 5-minute walk or a 15-minute break. The card shows its reasons, numbered sources, a "How sure" line and "See why". It also has "Snooze 10 min" (once) and "Looks wrong".
  6. **A break countdown**, with "+5 min" and "End break".
  7. **End session**, then a three-step check-in.
  8. **After 3 sessions:** the 10-question System Usability Scale (SUS), offered on the "saved" screen.
- **What is real:** the timer, the breaks, the taps, typed sleep and the check-in answers.
- **What is sample:** the watch's sleep number and the calendar. Nothing reads a real watch or calendar on the deployed site.
- **Live Fitbit sleep on one computer** was wired by another session the same day. It is documented in `tools/site/CONNECTIONS.md` (code: `site/assets/halftime-data.js`), not here.

### The timing rule, v0
Numeric code picks the moment (`RULE.decide` in `study.js`). No language model is involved. **It is a starting rule the team has not validated.** It is the same for everyone, and the card says so.

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
| ... when the session ends within 10 min of the moment | "Keep going", shown 10 min before the end |
| ... when the session is under 20 min | nothing (too short to judge) |

### The evaluation built in
- **Two arms.** Each session is `halftime` (the rule above) or `pomodoro` (fixed 25 on, 5 off). The order is random within each pair of sessions, so every person gets both. The app tells the person which one they got.
- **The check-in** has three steps:
  1. a study-task slot. It is a **placeholder** until the team picks the task (Heramb, 2026-11-13). A PVT-B style reaction check exists as a trial behind `?task=pvtb`;
  2. "Did you finish what you planned?" (yes, mostly, no);
  3. "Did the suggestion feel wrong?" (no, the timing, the reason).
- **Events.** They go through `HT.event` → `/api/collect` → `halftime.events`. Session events carry `extra.study` (the session id) and `extra.arm`.
  - `consent_study`: the choice on the consent screen;
  - `study_start`, `study_suggest`, `study_response`, `study_break`, `study_end`, `study_checkin`: one session;
  - `study_why`: "See why" opened or closed;
  - `study_sus`: the survey score and its ten answers;
  - `push_status`: the notification state on that phone;
  - `pwa`: the first open from the Home Screen.
- **Consent gate.** Session events are sent only after "Agree and join". Two small exceptions: a "decline" is sent once, just before recording stops, and `pwa` follows the general usage recording, not the session gate.
- **Not logged:** the plan text and the next stop's name. Only the plan's length is sent.

### Run a test session fast
```bash
node tools/site/serve.mjs 3007
```
Open http://127.0.0.1:3007/start, finish setup, then open http://127.0.0.1:3007/app?speed=60&arm=halftime. One real second is one session minute, so the suggestion comes within about a minute.

| Knob | What it does |
|---|---|
| `?speed=N` | Runs the session N times faster (1 to 600). It lasts for that browser tab. Sessions are marked `extra.qa`, and `/admin` hides them unless "Load tests" is ticked. |
| `?arm=halftime` or `?arm=pomodoro` | Forces the arm for a session started while it is in the address. |
| `?task=pvtb` | Uses the trial reaction check in the check-in. It is remembered on that phone; `?task=placeholder` sets it back. |
| `?demo=1` | Replays the fast-forward demo of the sample day (also "Replay the demo day" on the You tab). |
| `?preview=1&state=…` | The admin heat map's view: a sample moment with a sample profile. Nothing is saved or recorded. `state=study_setup` and `state=study_consent` show those study screens. |

Events from 127.0.0.1 are stored with `test = true`, as before.

### Install and push: how a suggestion reaches a locked iPhone
- **An installable web app.** `site/manifest.webmanifest`, `site/icon-192.png`, `site/icon-512.png` and `site/sw.js` make Halftime a Home Screen app. The service worker always fetches fresh files first and uses its saved copy only when the network fails.
- **Web Push.** On an iPhone it needs iOS 16.4 or later and works **only from the Home Screen app**, not from a Safari tab.
- **The server signs pushes itself.** `site/api/_webpush.js` does VAPID (RFC 8292) and the aes128gcm encryption (RFC 8291) on `node:crypto`. There is no npm package.
- **Only real push services.** A push address must be on Apple's, Google's, Mozilla's or Microsoft's push hosts. The API and the database both check this.
- **The lock-screen words are fixed templates,** chosen by kind (`TEMPLATES` in `site/api/push.js`). They never include sleep or any other reading. A caller can't make the server send free text.

**Scheduling, step by step:**
1. The phone queues its notification(s): `POST /api/push?op=schedule` → `halftime.push_jobs`.
2. Supabase `pg_cron` runs `halftime._push_tick()` every 30 seconds.
3. The tick claims the jobs that are due. It POSTs their ids, each with a one-time token, to `/api/push?op=send` (through `pg_net`).
4. Vercel fetches each job with its token, sends the push and records the result.

Vercel Hobby cron runs once a day at most, which is why the timer lives in Supabase.

**Limits:** 24 notifications per request, 30 waiting per phone, 400 queued per phone per day, each within the next 12 hours. A job more than 10 minutes late expires. A send is tried 3 times. Job rows are deleted after 14 days.

**No double buzz.** If the suggestion is already on screen, the queued push is cancelled.

**When push is unavailable** (a Safari tab, permission denied, or the person is not sharing data):
- the suggestion shows when the app is next opened;
- the session screen offers "Keep the screen on" (Screen Wake Lock).

**The Home Screen app starts with empty storage,** separate from Safari's.
- An earlier build tried to carry the Safari setup across in the address (`#hp=…`). In the iOS 26 Simulator the saved icon kept only `/app`, so it never arrived, and that code was removed the same day.
- Instead, on an iPhone in Safari, the landing page and `/start` show a short note (`site/assets/install-tip.js`): add Halftime to the Home Screen first, then set up there. "Not now" hides it for that tab.
- iOS saves the page the person was on, not the manifest's `start_url`. So the landing page, opened as the installed app, sends someone set up to `/app` and someone new to `/start#account`.
- **iOS 26 status bar.** In the Home Screen app, as in Safari on iOS 26, content scrolls under the clock with a soft fade. That is the system's own look (a probe page showed the top safe area reads 0 px there), so the pages leave it alone. An attempt to cover that band was removed the same day.
- The Now tab's install card says the same: the Home Screen app starts fresh.

### What Vercel needs
- **One secret: the env var `VAPID_PRIVATE_KEY`.** It is kept outside the repo, in `../halftime-vapid.txt` next to it. Redeploy after setting it.
- The public key is in the code (`VAPID_PUBLIC` in `site/api/_webpush.js`). It is public by design: the browser needs it to subscribe.
- Optional: `VAPID_PUBLIC_KEY` overrides the public key in the code, and `VAPID_SUBJECT` overrides the contact address in the signature.
- With no private key, nothing is sent. The app says notifications aren't switched on and falls back to showing the suggestion in the app.

### What Supabase needs
- **Run `tools/site/supabase.sql`** in the SQL editor. It can be re-run. The part added on 2026-11-13:
  - creates `halftime.push_subs` (one push address per visitor) and `halftime.push_jobs` (the queue), with row-level security and no policies;
  - adds the `halftime_push_*` functions, `halftime_forget` and `halftime_admin_study`;
  - turns on the `pg_cron` and `pg_net` extensions;
  - schedules `halftime-push` (every 30 seconds) and `halftime-cron-clean` (daily).
- **The site's address is written into `halftime._push_tick()`.** If the domain changes, edit it there and re-run the file.

**Check it:**
```bash
curl -s "https://halftime-study.vercel.app/api/push?op=config"
```
`"configured": true` means the private key is set and the database functions are installed.

### Rotate the VAPID key
1. Make a new P-256 key pair:
   ```bash
   node -e "const {generateKeyPairSync}=require('crypto');const j=generateKeyPairSync('ec',{namedCurve:'P-256'}).privateKey.export({format:'jwk'});console.log('private',j.d);console.log('public',Buffer.concat([Buffer.from([4]),Buffer.from(j.x,'base64url'),Buffer.from(j.y,'base64url')]).toString('base64url'))"
   ```
2. Set `VAPID_PRIVATE_KEY` in Vercel to the new private value. Save the pair in `../halftime-vapid.txt`. Never commit the private value.
3. Replace `VAPID_PUBLIC` in `site/api/_webpush.js` with the new public value (or set `VAPID_PUBLIC_KEY` in Vercel).
4. Redeploy.
5. Ask each tester to turn Notifications off and on again in the You tab. A phone's push address is tied to the key it subscribed with, so pushes to old addresses are rejected until it re-subscribes. (This step follows from how Web Push works. It has not been tried on this project.)

### Consent, honesty and delete
- **The consent screen** lists everything saved: sessions, typed sleep, check-in and survey answers, usage analytics, device, IP address and rough location, the login name, and a push address if notifications are on. It also lists what is not saved.
- **Agree and join** or **Use it without sharing.** The second turns all analytics off on that phone and disables push, because push needs the server to keep an address.
- **The You tab** has a "Share with the team" switch, "What's collected" and "Delete my data".
- **Delete my data** → `/api/forget` → `public.halftime_forget(visitor)`. It deletes that visitor's events, push address and queue, leaves one anonymous `data_deleted` marker, then clears the phone.
- **Typed text stays out of analytics.** `track.js` no longer puts typed text into tap labels. Text selected or copied inside `[data-private]` areas is counted, not quoted.

### Tests to run
```bash
node tools/qa/study-rule-test.mjs    # the timing rule and the SUS score: 15 checks
node tools/qa/webpush-test.mjs       # the encryption against the RFC 8291 example, and the push-host list
```
Then walk a full session on phone sizes at test speed. Start the local server first, and write a steps file in the format of `tools/qa/steps-example.json`:
```bash
node tools/qa/device-walk.mjs --url="http://127.0.0.1:3007/app?speed=60&arm=halftime" --devices=iphone-se,iphone,iphone-max --steps=<your-steps.json>
```
After changing the mockup or `tools/site/build-app.py`, rebuild `site/app.html` with `python3 tools/site/build-app.py`.

### The admin Study tab
`/admin` → **Study** reads `public.halftime_admin_study`. It shows:
- the two arms side by side: sessions, people, study time, suggestions shown, breaks taken, "finished what they planned", "felt wrong" and the study-task score;
- a sessions table, newest first;
- SUS scores;
- consent counts, and how many people used "Delete my data";
- the notification state on each phone;
- the notification queue: sent, waiting, cancelled, failed, too late.

Sessions run at test speed are left out unless "Load tests" is ticked. With few sessions, read the table as a check that logging works, not as a result.

### Not done yet
- Human-subjects (IRB) review is not done, and the consent wording needs the team's and the instructor's review. Settle both before recruiting.
- Rule v0 is not validated.
- Nothing reads a real watch or calendar on the deployed site.
- The admin password is still short.
- `halftime_admin_login` trusts an IP address supplied by the caller, so the lockout can be bypassed by calling the database function directly. This is a follow-up.
- Not checked on a physical iPhone yet.

The full record is in `Wiki/Cognitive Perf Agent Wiki/25-journal/2026-11-13-real-study-sessions.md`.

## The laptop version (added 2026-11-13)

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
- **`/desktop`** (built by the connections session) stays as "every source on one clock": the app in a narrow frame
  on the left, and the session drawn against sample laptop activity, the watch and the calendar on the right. Its
  "Phone version" link now says "Open Halftime"; its red "now" label was darkened to pass contrast.

**Checked:** laptop (1440×900), laptop-small (1366×768) and desktop (1920×1080) walks with 0 console errors and 0
UI-check defects, live; the mini timer opens in Chrome and its Start walk button starts the break on the page; the
phone layout re-walked on iPhone SE / Pro Max with no change. **Not checked:** a push notification arriving on a real
laptop, and Safari on a Mac (no Document Picture-in-Picture there, so no mini timer).

### Laptop QA, round 2 (2026-11-13, afternoon)

A new laptop user walked the live site (landing → `/start` → tour → consent → setup → both timers at test speed →
suggestion, See why, Snooze, Looks wrong → break → reload mid-break → check-in → History, You, Demo, `/desktop`),
then scripted walks at the MacBook sizes. Fixed in `site/assets/study.js`, `tools/site/build-app.py` and
`site/start.html`:
- **Blocked notifications** told a laptop to look "in Settings" (iPhone wording). On a computer it now says the
  browser blocks them for this site (Now tab, setup, side panel, the You row, the toast).
- **Source 3 contradicted the card.** When the calendar's next stop comes after the planned end, the card says
  "your planned end is in 20 min (3)" but source 3 showed the next stop. Source 3 now shows whatever ends the session,
  and names the next stop after it.
- **A suggestion that fires after the planned end** (snoozed, or the app was closed) said "Keep going. You're close
  to done." It now says "Time to wrap up. You're at your planned end. Stopping now is your break.", in the card,
  the tab title and the mini timer. A walk card left open past the end no longer says "you've reached your planned
  end, so a walk fits".
- **Snooze** is offered only when the snoozed suggestion would still fit before the end.
- **Keys** now also work on the check-in (↵ continue, 1–3 pick an answer), the end screen (↵) and the survey (1–5).
  The side panel no longer lists S and W in a fixed-timer session, where they do nothing.
- **History** marks test-speed sessions "test speed".
- **Consent** says "clicks … rough mouse paths" on a computer (track.js records pointer paths there).
- **`/start` on a computer:** the laptop step no longer tells someone already on a laptop to "open
  halftime.app/pair on your laptop"; the last step says Halftime is one browser tab, not "a small pill at the top".
  The wearable buttons lost `role="listitem"`, which hid that they are buttons.

## MacBook preview (`/preview`, added 2026-11-13)

The iPhone version is checked in the iOS Simulator; there is no simulator for a Mac. `site/preview.html` draws one:
the real `/app` of the site in an iframe, at the exact size of a browser window on each MacBook, inside a drawn
MacBook (bezel, notch, menu bar, a browser's tab strip and address bar). The drawn tab shows the page's real title,
so the timer in the tab title shows too. For the team, not students: noindex, and nothing links to it.

- **Macs** (each model's default "looks like" size, minus the 37 pt menu bar and 86 pt of Chrome): Air 13″ 1470×956
  → 1470×833 · Air 15″ 1710×1107 → 1710×984 · Pro 14″ 1512×982 → 1512×859 · Pro 16″ 1728×1117 → 1728×994.
  "Half (split view)" halves the window width (735 px on the Air 13″, which gets the phone layout).
- **Controls:** page (Now, Set-up, Landing, One clock), speed (1×, 60×, 300×), timer (random, Halftime, fixed 25/5),
  zoom (fit or actual size), "Use a sample profile" (only when this browser has no profile; it never replaces one).
  The settings are in the URL, e.g. `/preview?mac=pro14&speed=60&arm=halftime`.
- It runs the real app in the viewer's browser: what happens in the frame is saved in that browser, like opening
  `/app`. Keys work after clicking inside the drawn screen.
- The same sizes are in `tools/qa/device-walk.mjs`: `macbook-air-13`, `macbook-air-15`, `macbook-pro-14`,
  `macbook-pro-16`, `macbook-half`.

**Checked after deploy (live):** MacBook Air 13″, 1366×768, 1920×1080 and half-screen walks, 112 frames, 0 console
errors, 0 UI-check defects; iPhone SE / 14 / Pro Max, 57 frames, 0 and 0; `node tools/qa/study-rule-test.mjs` passes.
**Push on a laptop, debugged the same afternoon.** Heramb's first try in his Chrome got no notification, and no
subscription had reached the server. The server was fine (a direct `op=subscribe` saved; a real Chrome on this Mac
with notifications allowed subscribed, and the live server's push arrived as "Short walk now? · 40 min in" about
13 s after it was due, FCM status 201). The trap was in the page: the first "Turn on notifications" opens the
consent screen, and after "Agree and join" notifications stayed off with no hint that a second click was needed.
Fixed in `study.js`:
- agreeing on that consent screen (from the Now card or the You tab) goes straight on to the browser's Allow question;
- when the browser doesn't turn them on (prompt closed, or Chrome's quiet bell in the address bar), a computer is
  told where to allow them, instead of a bare "weren't turned on";
- "Send a test notification" on the "Notifications are on" card shows one at once, without the server, so the
  last step (macOS letting the browser show it: System Settings → Notifications → the browser, Focus off) can be
  checked. Logged as `push_status` = `test`.
Checked live after deploy in a real Chrome (throwaway profile, permission granted by the script, not by a click):
the consent path subscribes, the session schedules, the push arrives. **Not checked:** Heramb's own Chrome after
the fix, the Allow prompt clicked by a person, and Safari on a Mac. The Claude in Chrome extension did not respond
all session; the walks used the desktop app's built-in browser and headless Chrome, where the mini timer could not
be opened (Electron).

## The Night tab: last night from a WHOOP 4.0 (added 2026-11-14)

Heramb's request: a fifth tab, next to Demo, that shows last night from his own WHOOP 4.0 in a bare minimum: one
sentence, what it changes in today's breaks, the night on a clock, and three numbers (sleep, resting heart rate, HRV)
against his own usual. Design: `design/mockups/night-tab/` (direction A plus B's sentences). Method:
`Wiki/Cognitive Perf Agent Wiki/04-agent-engine/night-calculator.md`.

### Files
- `site/assets/whoop4.js`: reads the band over Web Bluetooth (Chrome or Edge on a computer). Unofficial protocol from
  community notes; only read, history, clock and buzz commands. A history batch is acknowledged to the band only
  after it has been saved, so nothing is lost if the connection drops.
- `site/assets/night.js`: the night calculator (`night-v1`) and this browser's storage: IndexedDB `halftime-whoop`
  (the readings, 35 days) and localStorage `ht-night-nights` / `ht-night-meta`. Nothing is sent to the server.
- `site/assets/night-tab.js`: the view and the sync. `tools/site/build-app.py` adds the tab, its CSS and the scripts.

### Where it connects
- **Study setup:** when this browser has last night from the WHOOP, the session's sleep says "From your WHOOP 4.0"
  and rule v0 uses it (`study.js`, `liveWatch()`). Like the Fitbit path, the number is never logged: `study_start`
  carries `sleep_src: "wearable"`, `sleep_h: null` and `sleep_watch: "whoop4"`. `/admin` shows "from a watch · not saved".
- **Delete my data** and **a different person signing in** wipe the WHOOP readings and nights too.
- **Analytics** (only when sharing is on): `night_sync` (start / done / fail, with batch and night counts or an error
  code), `night_confirm`, `night_sample`, `night_wipe`, and the screen `tab_night`. Never a health value.
- `/desktop` and `/preview` frame `/app` with `allow="bluetooth"` so Sync works inside them too.

### On a phone
A phone browser can't use Bluetooth, so the tab says to sync on a laptop, offers "Type last night's sleep instead"
and a labelled sample night. Showing the laptop's night on the phone needs the night record on the server: a team
decision (it changes what's collected and the consent text).

### Test
```bash
TZ=America/New_York node tools/qa/night-test.mjs
```
43 checks: framing against 5 frames recorded from WHOOP's app, decoding, a fake band (full sync, a dropped connection,
a failed save, a reset clock), synthetic nights with a known answer, not-enough-data reasons, the usual, and what the
study setup reads. QA states with sample data: `/app?night=ok|usual|confirm|learning|nodata|error|syncing|connect|nobt|phone`;
`/app?tab=night` opens the real tab.

### Not done
- Checked on the real band only for the connect / battery / live / clock path (the test page, 2026-11-14). A full
  history sync and a real night still need checking on Heramb's band.
- Not validated against a reference (a Polar H10 check is proposed). Not checked in Safari on the iOS Simulator.
