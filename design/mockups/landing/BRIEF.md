# Landing page: brief

- **By:** the UIUX seat (an AI advisor role), 2026-11-05. Copy in the CMO seat's voice A ("calm friend", `../suggestion-card/COPY.md`). **The team locks the words.**
- **Surface mode:** Persuade (`design/PRODUCT.md`): a grader, a classmate or a coach gets the idea in 5 seconds and remembers one frame.
- **Who and when:** a tired student who taps a link in a group chat, on an iPhone, between classes. A course grader on a laptop. Neither will read more than a few lines.
- **The page's one question:** "What is this, and would it help me?"
- **The one finding it leads with:** you can try it right here in two taps, and it answers like a friend, with its reasons.

## The message, in as few steps as possible
1. **What it is** (one line): every long study session needs a halftime.
2. **Try it** (two taps): how long you've studied, how you slept. Halftime answers, with why and how sure.
3. **How it works** (three beats on one line): it notices · it suggests and shows why · you decide.
4. **Why trust it** (two short lists): what it reads, what it never reads. It says "not sure" when it isn't, and points to a person when sleep has been short for weeks.
5. **One ask:** join the class pilot.

## Words first
- Headline: **Every long study session needs a halftime.**
- Sub: Halftime notices when you've been at it a while, suggests a short break when one fits, and always shows you why.
- Buttons: "Try it" · "Join the class pilot" · "See every screen".
- Reading level ≤ grade 8. No hype verbs. No claims that breaks make anyone smarter (the evidence is null; `COPY.md`).

## Contrarian check
1. **Obvious:** phone screenshot hero, "Study smarter", three feature cards, testimonials, a sign-up form.
2. **Inverse:** don't show the product, let them use it: two taps and the island answers. **Kept** (the hero demo).
3. **Wrong genre:** a scoreboard. Halftime isn't quitting, it's part of the game. **Kept** (the headline and the session line drawn as a game clock).
4. **Illogical:** the page times *you* and suggests you leave it. Rejected: it interrupts the one person we want to keep reading.

## Art Direction Card
- **Concept line:** every study session needs a halftime.
- **Signature frame:** the black island answering your two taps live, above your session drawn as a line.
- **Type:** Geist (display 600, tight; text 400) and Geist Mono for numbers and times only.
- **Grid and eye path:** phone, one column: headline → the try-it → the button. Laptop: headline left, the try-it right, then everything below in one column of reading width.
- **Colour:** paper `#F4F3EF`, ink `#141414`, the black island. One accent, mint `#8ED6BC`, means "the break" and nothing else. Red only marks "now".
- **Uncertainty:** in words ("Fairly sure", "Not sure yet"), never a percentage.
- **Motion:** the island springs open once per answer (the app's own spring, ~500 ms); the walk slot fades in on the line. Reduced motion: no spring, instant swap.
- **Banned here:** gradients, glow, phone frames with glare, stock photos, brains, three icon cards, testimonials, invented stats, "unlock".

## Steals used (cards S-13 to S-16 in `Wiki/.../09-design/steal-library.md`)
- Apple product pages: the product's own UI is the hero.
- NYT Wordle: the whole idea in one sentence.
- GOV.UK start pages: "what you'll need" and "what happens" in plain lists.
- DuckDuckGo: say what you don't do, plainly.

## Round 2 words (2026-11-05, after the ICP teach-back). Proposed; the team locks them.
Why: in the teach-back, 5 of 5 testers were guessing at the problem (6.0/10) and couldn't say what joining involves (2.0/10). The old Join was a dead end with a bracket placeholder.
- **Problem line** (bold, first in the lede): "Two hours into studying, it's hard to tell if you need a break or should push on." The lede after it is cut to "Halftime suggests a short break when one fits, and always shows you why." so the demo card's headline stays on the first iPhone screen. No claim that breaks improve anything.
- **Hero button** (laptop): "Join the class pilot" → "What joining involves" (#pilot). **Phones:** a link at the end of the fine print, "Sign-up isn't open yet: see what joining involves."
- **Joining section:** heading "Sign-up isn't open yet." Then: "We're a student team. Our course staff have to OK the study before anyone's real data goes in, so for now everything here is a demo with made-up data." Then "If it opens, joining means:"
  - Installing a small app on your laptop.
  - Connecting a watch, ring or calendar, only if you want to.
  - A slow start: at first it mostly says "not enough data yet" while it learns what's usual for you.
  - No cost, and you can stop whenever you want.

  Then: "How long it runs and who can join: we'll put that here before sign-up opens." The only button is "Try the demo again". The Join button and the "Nov 6 proposal / [Pilot sign-up link: coming]" message are gone.
- **Every line is true today**, following the 2026-11-05 boardroom: sign-up stays closed until course staff answer in writing, and no email is collected. The platform is left as "laptop" because Mac-only is proposed, not yet approved. "Delete everything at any time" is out because of the Dec 6 analysis lock.
- **Still on the page and false, not touched in this round:** "Mac or Windows" (How it works) and "never tells your coach, team or school" (Some things need a person). Both are struck in the boardroom record.

## Round 3 words (2026-11-05, after teach-back round 2). Proposed; the team locks them.
Why: in round 2, all five testers still didn't know where the suggestion appears or what "which kind of app" means; four flagged "See every screen", snooze with no button, and never seeing "not medical advice" on a phone; three misread the timeline. Artifact v3.
- **Where it shows up** (under the demo and in step 2): "This black card is how Halftime shows up: small at the top of your iPhone, opening once when it has something to say." Joining list item 1 becomes "Installing a small app on your laptop, and adding Halftime to your iPhone." **Needs the team:** this follows the Island design the team picked (`design/mockups/suggestion-card-v3/`), but how the iPhone part ships (a web page added to the home screen, or a native app with a Live Activity) is undecided. If it's laptop-only for the pilot, change both lines.
- **Which kind of app** (What it reads): "How often you switch apps, and which kind (like notes, reading, video or chat), not the app's name." **Needs the CTO:** the collector has to map apps to kinds on the laptop and never send names. The category list is a placeholder.
- **"See every screen"** cut from the top bar. The design gallery is still at its own link.
- **Snooze in the demo:** a "Snooze 20 min" link under the two buttons on every card, matching the Island mockup. It replies "Snoozed. I won't ask again until 3:30." (or "before lab" when that's later).
- **"Halftime is a wellness tool, not medical advice."** added to the "Some things need a person" card, so phone readers see it; it stays in the footer too.
- **Timeline:** the start and end times move into the header row ("Started 12:30 pm" / "Chem lab 4:30 pm"), so the line only carries "now" and the walk slot. This fixes the 35-min collision and the "12:30 is the lab" misread.
- **Still on the page and false:** "Mac or Windows" (How it works) and "never tells your coach, team or school". Both are struck in the boardroom record and wait for the team.

## Round 4: "When is it?" moments (2026-11-05). Proposed; the team scopes and locks.
Why: Heramb asked how to get testers past MEH. Clarity was about 8, but Useful (4.6) and Come back (3.4) were low, because the page sold one afternoon walk and each tester's problem happened at a different moment. Artifact v4.
- **A third demo question, "When is it?"**: Afternoon (default) · Late night · After practice. Each moment has its own rules and copy (see the script in `index.html`).
  - **Late night** (10 pm start, "Bed by 1:30 am"): "Stop for tonight? Stopping now leaves you 8 h before your 9:30 class." Buttons: "Stop for tonight" / "20 more min". The "20 more min" reply is "I'll ask once more at 2:00, then stay quiet."
  - **After practice** (6:30 pm start, "Library closes 10:30"): "Sit for 10? You trained today, so this break is a sit, not a walk." Then "Wrap up for today?"
- **Smaller changes:** "Got it" → "Keep going" (COPY.md bans "Got it"). Time chips shortened to "1 h 30 / 2 h 40 / 3 h 40", and phone chips tightened, so the card stays on the iPhone's first screen.
- **Bugs fixed after the ICP test:**
  - "gets you 8 h" → "leaves you 8 h" (it's time in bed, not sleep).
  - The 3 h 40 night card keeps its switch count.
  - "Fairly sure" → "Not sure yet" with no watch.
  - The "your watch or ring" legend chip hides when No watch is picked.
- **Result** (`25-journal/2026-11-05-icp-moments.md`): 1 I'D USE IT (Sam, late nights), 4 MEH, 0 I'D QUIT. Four of five chose Late night; nobody chose Afternoon.
- **Needs the team:** night and practice modes are **not scoped**, so the page now shows features nobody has agreed to build. Decide before anyone outside the team sees v4. Also open:
  - lead with Late night instead of Afternoon (CEO + CMO);
  - anchor the night to tomorrow's first commitment from the calendar;
  - a no-watch card from night one;
  - study apps counted as one task.

## Round 5: a fourth step for wearables (2026-11-05). Proposed; the team locks the words.
Why: Heramb asked for a step that says how we understand data from fitness wearables. Artifact v5.
- **Heading:** "Three steps. That's the whole thing." → "How it works, in four steps." This also cuts the "whole thing" line that 4 testers and the CMO flagged.
- **New step 2, "It reads your watch, carefully."** "Connect a watch or ring, and by default Halftime takes one thing from it: how long you slept. It compares that with your own usual, never with anyone else's, and ignores the watch's own scores. Plain code does the math, not an AI. No watch? It skips this step." Chip: `slept 5 h · your usual 7 h`.
- **Step 1 loses its watch sentence,** and its chip drops "slept 5 h", as Jordan asked.
- **Layout:** four columns on laptops, and mint moves to step 3, the suggestion. On phones the connecting line is plain grey, because the steps vary in height.
- **Why each line is true or proposed:**
  - **"one thing … how long you slept":** HRV is off by default in the Island mockup.
  - **"your own usual":** personal baselines, open decision #19 (proposed).
  - **"ignores the watch's own scores":** already in "What it never reads".
  - **"Plain code does the math, not an AI":** CLAUDE.md ground rule 3.
- **Needs the team:**
  - Which devices actually work: only Google/Fitbit is confirmed (boardroom on privacy).
  - The learning period: the honesty card still says "first week" and "4 of 7 nights", while #19 proposes 14 nights.
  - "Mac or Windows" in step 1 is still false.

## Round 6: "How it works" becomes direction A, "The thread" (2026-11-05). Picked by Heramb ("lets do A").
- **What replaced what:** the static four-step row is now a scroll-played piece (`design/mockups/how-it-works/a-thread.html`, folded in). One line becomes the whole story:
  1. Your study line draws, and the switch marks comb in.
  2. Last night's bar fills against your dashed usual.
  3. The "now" dot opens into the card, with mint lines rising into it from its two sources.
  4. You tap Walk, the card folds into a pill, and the line goes quiet.
- **How it runs:** inside the page its ids and classes are prefixed `hw-`, and its script is wrapped so it can't clash with the demo. `?hw=0.72` freezes a frame. Reduced motion snaps step by step.
- **Captions:** they use the direction's words. Step 1 now says "your laptop", not "Mac or Windows", so one false line is gone from this section (it may still appear elsewhere on the page).
- **Checked:** shots in `.crits/2026-11-05-landing-r9/`, as frozen frames plus a real scroll on iPhone SE, iPhone and both laptops. No console errors after fixing one id lookup.
- **Not checked:** Safari on a real iPhone, and testing with the ICP panel.

## Round 7: hero and demo copy fixes from the hero ICP test (2026-11-05). Proposed; the team locks the words. Artifact v8.
- **Card header says what the time is for:** "50 min to bed at 1:30" and "20 min to library close" (5 of 5 couldn't read "50 min to 1:30" or "80 min to close"). The header wraps cleanly on phones.
- **Demo questions:**
  - "When is it?" → "When are you studying?"
  - "Last night you slept" → "Last night's sleep", with the chip "No watch" → "Not tracked" (4 of 5 read "No watch" as a sleep amount).
- **Joining link:** "Sign-up isn't open yet: see what joining involves." → "It's a class study, not open yet. What joining involves →" (3 of 5).
- **"Sample card · made-up data"** now sits *above* the card, before any "your" (2 of 5).
- **Confidence lines no longer invent history or claim breaks help.** This follows the boardroom's consensus and COPY.md.
  - Gone: "4 of your last 6 afternoons… a walk helped", "went better in 5 of 7", "most practice nights", and "most of your sessions run past an hour".
  - Each line now states the rule's actual inputs, e.g. "A long stretch, a short night, and a walk fits before lab." or "Simple math: the time, your 9:30 class, and last night's sleep."
- **Night card:** app switching is no longer its evidence (boardroom consensus; Maya, Anika and Jordan). With no sleep tracked, it says "No sleep data".
- **Already in v7:** night hours worked out ("8 h 50 min"), the laptop card fits instantly, the hero is top-aligned.
- **Still for the team (from the hero test):**
  - the headline (3 of 5 wrote it as a question, "Push on, or stop?");
  - the bold line naming the laptop, no watch and nights;
  - the device line (Apple Watch, Garmin; only Fitbit is confirmed);
  - a "what the laptop app records / where it goes / AI" line;
  - "your coach never sees it";
  - the demo's default moment.

## Round 8: trust sections as experiences (2026-11-06). Picked by Heramb ("Mix: E then D"). Artifact v9.
- **"Clear about what it reads":** E's switch. A sample laptop screen with "What you see / What Halftime sees". Flipped, every word becomes a grey bar, titles become kinds (notes, reading, chat), the counter "2 h 40 min · 3 switches in 20 min · notes, reading, chat" appears, and the matching rows in both cards light up. UI micro-motion only (CSS, under 300 ms).
- **The honesty cards:** D's scroll take.
  - The learning bar fills night by night to "Learned your usual sleep · 7 of 7 nights".
  - On the person card, a day strip shows the offer moving past the late-night study block to land at 8 am as "Talk to someone?".
- **Joining:** D's ticks. The four "joining means" lines tick in as you scroll past. "How long it runs" and "Who can join" show as grey dashes, with "We'll put these here before sign-up opens."
- **No words changed** in the cards. Reduced motion shows every end state. `?tr2=&tr3=` freeze the two scroll blocks for captures.
- **Checked:** `.crits/2026-11-06-landing-r12*/` on iPhone SE, iPhone and both laptops, with real scroll and a real tap. No console errors.
- **Not checked:** real iPhone Safari, screen readers on the switch, and the ICP panel.
- **Still the team's:** 7 vs 14 learning nights; the counselor's name (Columbia Health).

## Round 9: built for laptops, iPhones and foldables (2026-11-06). Goal set by Heramb. Artifact v10.

**How it was checked.** `tools/qa/device-walk.mjs` gained new presets:
- `iphone-landscape` 844×390
- `phone-320` 320×568 (SE with Display Zoom)
- `fold-cover` 344×882 and `fold-narrow` 280×653 (Galaxy Fold cover screens)
- `fold-open` 882×1104 and `pixel-fold-open` 841×701
- `ipad` 768×1024
- `desktop` 1920×1080

It also gained three abilities:
- a `resize` step, for a fold opening or a phone rotating;
- `--reduce=1`, for reduced motion;
- landscape orientation for wide screens.

Its checker now measures SVG text at its real on-screen size, names it, and skips intentionally invisible or screen-reader-only text. The full-page audit (the demo taps, a whole-page scroll, the laptop switch) ran on all 13 sizes, plus a fold open, close and rotate walk.

**Found and fixed**
- **"How it works" drawing:** its labels rendered at 8–10 px on phones. The drawing now runs edge to edge on phones (≤600 px), with trimmed margins (viewBox 14..386) and text at 14 units. Short phones get a tighter caption so the drawing gets more height.
- **"How it works" layout:** it stacked the drawing over the caption up to 900 px, starving wide, short screens (the open folds, landscape, iPad). It now stays side by side down to 601 px, with tighter spacing on short landscape screens.
- **Day strip:** it scaled up to about 26 px text on single-column tablets and folds. It now has a maximum width of 400 px and has been relaid so labels can't collide: "studying" sits inside the block, the labels are 15 units, the pill is wider and moves to 8 am.
- **Honesty cards:** taller than the screen on short phones and landscape, so the pinned section hid the end of the second card. When they don't fit, they no longer pin and play as they scroll past instead (timed so the bar visibly fills). In short landscape the two cards sit side by side.
- **Laptop switch:** the buttons were 40 px tall and are now 44 px. In Halftime's view the hidden words are hidden from screen readers too (`aria-hidden`), with a spoken summary instead.
- **Browsers without `svh`:** every `svh` height now has a `vh` fallback.
- **The page:** the title is now "Halftime", and there's a meta description.

**Result** (`.crits/2026-11-06-final/`):
- 0 console errors and 0 likely defects on all 13 sizes and in the fold/rotate walk.
- About 0.11 MB, loading in 0.1–0.5 s locally.
- Reduced motion shows every end state.

**Known limits**
- On the 320 px phone, in landscape and on the 2019 Fold's 280 px cover screen, the "How it works" drawing's smallest labels render at about 10–11.6 px, limited by the screen. Everything else is at least 12 px.
- **Not checked in Safari on iOS.** Xcode has no iOS simulator runtime installed (`xcrun simctl list runtimes` is empty). The fix is `xcodebuild -downloadPlatform iOS`, a download of about 8 GB. Code-level WebKit risks were reviewed:
  - no hover styles (so nothing can stick after a tap);
  - `svh` fallbacks;
  - `-webkit-box-decoration-break`;
  - safe-area insets.


## Round 10: small text solved, ready for Vercel (2026-11-06)
Heramb: "we will be hosting it on vercel". From this round on, the shipped page is **`site/index.html`**. This mockup stays as the design record; the two differ only in their head tags.

**Small text, solved rather than listed**
- The "How it works" drawing and the day strip now measure their on-screen scale (`getScreenCTM`). Each label is set to at least 12.3 px on screen, whatever the screen.
- Where a label grows, the layout makes room:
  - the caption under the laptop shortens to "2 h 40 min · 14 switches in 20 min";
  - the legend and the "sleep" note move;
  - the second-step note splits over two lines;
  - the "Fairly sure" chip widens to fit its text;
  - the day strip's pill and "studying" block widen to fit.
- A ResizeObserver re-runs the fit when a fold opens or a phone rotates.
- Result (`.crits/2026-11-06-final3/`): no text under 12 px on any of the 13 sizes, including the 280 px Fold cover screen and the 320 px phone. 0 console errors, 0 defects and 0 warnings, in the fold/rotate walk and with reduced motion too.

**Hosting (`site/`, see `tools/site/README.md`)**
- `vercel.json` sets a strict Content-Security-Policy (only this site and Google Fonts), nosniff, a referrer policy, a permissions policy, HSTS and cache headers.
- Indexing is off until the team approves the claims: `X-Robots-Tag: noindex` and `robots.txt` disallow.
- Favicon, Apple touch icon and a 1200×630 link-preview card (`og.jpg`, made from `tools/site/og-card.html`) for iMessage and group chats. After the first deploy, `og:image` needs the absolute URL.
- `tools/site/serve.mjs` serves `site/` locally with the same headers. Under the CSP: 0 errors, 0 defects, 5 requests on iPhone, laptop and fold cover (`.crits/2026-11-06-site/`).

**Before it goes public (team)**
Claims the boardroom found false or unconfirmed are still on the page:
- the "school" in "never tells your coach, team or school";
- "Works with a Fitbit, Oura or WHOOP";
- the 7-night learning bar;
- the night and after-practice modes.

**Live (2026-11-05):** https://halftime-study.vercel.app/ (Heramb: "host it on vercel", then "Yes, use the CLI").
- Every response carries the security headers and `noindex`.
- `og.jpg`, the icons and `robots.txt` return 200. `vercel.json`, `.env*` and `.vercel/` return 404.
- The live URL audited clean on all 13 sizes (`.crits/2026-11-06-live/`): 0 console errors and 0 defects.
- Walked at phone width in the built-in browser: demo taps, "How it works", the laptop switch, the honesty cards and the joining ticks all work, with no sideways scroll.
- Not yet seen in real iPhone Safari. The iOS 26.5 simulator installed, but Safari stalled on its first launch.

## Round 11: smooth (2026-11-05)
Heramb: "the landing page is too heavy/laggy, make it smooth". Measured with the new `tools/qa/perf-scroll.mjs`, which scrolls the whole page and taps the demo on a CPU slowed 4×, using Chrome's own counters and trace.

**Causes**
- **A forced layout on every scroll frame.** "How it works" wrote about 40 SVG attributes on every frame, whether or not they changed. The trust-section script then read positions straight after, which forced a layout. Both scripts also queued their own animation frames on every scroll event.
- **Every tap reflowed the whole page for 0.5 s.** The demo card animated its height under a large blurred shadow, and each tap also rebuilt every option button.
- **iPhone URL-bar resizes redid all the work.** The bar showing or hiding fires `resize`, which re-ran both drawing fits and the demo fit, even though only the height changed.

**Fixes** (same look, words and motion)
- **One scroll scheduler for every scroll-played section:** at most one frame per scroll, with all reads before any writes.
- **Writes only when something changes:** attributes and text are written only when their rounded value changes. Each section's progress is quantised, so an off-screen section does no work.
- **The card's size animates only on its first opening.** After that, new words fade in on the compositor (WAAPI), with no extra layout. Option buttons are built once; a tap only flips `aria-pressed`.
- **Resizes do work only when needed:** the demo re-fits only when the width changes, and the drawings re-fit only when their on-screen scale changes.
- **Contained layout:** `contain` on the "How it works" stage and on the session track. The card's shadow is a little smaller.

**Result**

| Scrolling the whole page (iPhone size, CPU 4× slower) | Before | After |
|---|---|---|
| Layouts | ~700 | ~104 (−85%) |
| Paints | 1,047 (~350 ms) | 196 (~67 ms) (−81%) |
| Style recalcs | ~700 | ~117 |
| Script time | ~160–270 ms | ~75–130 ms |

- Taps: about 40 ms from touch to paint, with the handler taking about 5 ms (unchanged, already fine).
- Live page in the built-in browser (real GPU, 120 Hz), full scroll: 358 frames, median 8.3 ms, worst 15.1 ms, 0 frames over 20 ms.
- Audit (`.crits/2026-11-06-smooth*`): all 13 sizes, the fold open/close walk and reduced motion all have 0 console errors and 0 defects. iPhone taps were re-checked with the buttons in view.
- Redeployed to https://halftime-study.vercel.app/.

**iPhone Safari** (iOS 26.5 simulator, WebKit)
- Full scroll, three rounds each, timed inside Safari. Time in the page's frame code: old 216 / 334 / 360 ms, new 122 / 105 / 126 ms (−61%). Frame callbacks: ~660 (two per frame) → ~330 (one per frame).
- Frame timing alone doesn't separate the two versions here: the simulator runs on the Mac's processor, and both hold 60 fps.
- Live site with real touch swipes: the address bar collapses and expands, and the pinned "How it works" drawing and the honesty cards play correctly. The demo tap works ("Late night" → "Stop for tonight?").
- **Safari-only bug found and fixed:** the "Talk to someone?" pill was sized on whichever label was showing, so Safari's wider monospace overflowed it. It now fits the longest of its three labels and never lands past the end of the strip. Re-audited on all 13 sizes and in reduced motion: 0 errors, 0 defects.
- Still not done: a physical iPhone.
