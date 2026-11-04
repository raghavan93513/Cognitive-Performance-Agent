---
title: "Study — Craft, forms, privacy and style"
category: 09-design
tags: [frontend, reference, synthesis, privacy]
sources: ["https://design-system.service.gov.uk/patterns/question-pages/", "https://design-system.service.gov.uk/components/cookie-banner/", "https://design-system.service.gov.uk/components/error-message/", "https://www.gov.uk/service-manual/design/form-structure", "https://signal.org/bigbrother/", "https://signal.org/blog/phone-number-privacy-usernames/", "https://usenix.org/system/files/soups2021-bailey.pdf", "https://linear.app/method/introduction", "https://linear.app/now/how-we-redesigned-the-linear-ui", "https://www.raycast.com/blog/a-fresh-look-and-feel", "https://sspai.com/post/39724", "https://www.macstories.net/?p=48965", "https://browsercompany.substack.com/p/letter-to-arc-members-2025", "https://arc.net/", "https://www.aesop.com/us/", "https://www.ryohin-keikaku.jp/en/about-muji", "https://www.apple.com/airpods-pro/"]
summary: "GOV.UK, Signal, Linear, Raycast, Things 3, Arc, Aesop, Muji and Apple product pages studied for consent, card craft, motion, privacy settings and the Dec 11 showcase page, with a GOV.UK-style consent outline."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T01:00:00Z
updated: 2026-11-05T01:00:00Z
---
# Study — Craft, forms, privacy and style

> Studied by the UIUX seat on 2026-11-05 from public sources (no accounts). "Seen: opened" = the live public page was read; "researched" = docs, interviews and articles.

This page goes deeper on the "Government", "Privacy", "Developer tools" and "Luxury and retail" rows of the [[09-design/steal-library|Steal library]] study list. The consent research already in [[09-design/design-evidence|Design evidence]] §5 (CPPA symmetric choices, the FTC dark-patterns report) and the motion rules in `.claude/skills/emil-design-eng/SKILL.md` are not repeated. Visual specifics marked "computed" were read from the live page's CSS in a logged-out browser on 2026-11-05. They describe marketing websites, not the apps themselves.

## Takeaways for our screens

- **Consent and onboarding: build it as GOV.UK question pages, one data source per page.** GOV.UK asks one thing per page because people focus better, it works better on phones, and errors are easier to recover from ([service manual](https://www.gov.uk/service-manual/design/form-structure)). Radios are never pre-selected ([radios](https://design-system.service.gov.uk/components/radios/)). On gov.uk's own banner, "Accept" and "Reject additional cookies" are the same green button at the same size: computed, 19 px text, 38 px tall ([gov.uk](https://www.gov.uk/)). → Each source (watch, laptop) gets its own Yes / No page with nothing pre-selected, followed by a "Check your answers" page. See the outline below. ^[inferred]
- **Settings and privacy: the best consent screen is the one you don't need.** Signal's website has no cookie banner and loads only first-party scripts (computed, [signal.org](https://signal.org/)). Its transparency page shows that when it was subpoenaed, it could hand over only an account's sign-up date and last connection ([signal.org/bigbrother](https://signal.org/bigbrother/)). → Our web app and showcase page load no third-party scripts, so they need no banner. The privacy screen adds a "What we can't see" list next to "What we collect". ^[inferred]
- **Motion: decide by how often it happens.** Linear's site uses a 0 s hover highlight in, 150 ms out, a 100 ms "quick" and a 250 ms "regular" transition (computed CSS tokens, [linear.app](https://linear.app/)). Things' team cuts any animation that gets tiresome in daily use ([sspai interview](https://sspai.com/post/39724)). Raycast's lack of an open animation is cited as the model for actions repeated hundreds of times a day (`.claude/skills/emil-design-eng/SKILL.md`, not a Raycast source). → The card arrives with one 200 ms fade. Snooze, dismiss and keyboard shortcuts are instant. The only "delight" motion is the first suggestion. ^[inferred]
- **Suggestion card craft: neutral chrome, one accent, theme from three inputs.** Linear cut its themes from 98 variables to three inputs (base colour, accent and contrast) in the LCH colour space, and the contrast input gives high-contrast themes ([Linear redesign](https://linear.app/now/how-we-redesigned-the-linear-ui)). → Generate our light and dark tokens from base, accent and contrast. Expose contrast as an accessibility setting. ^[inferred]
- **Reminders: a prompt people don't understand gets switched off.** In a study of Signal's PIN reminders, 44% of users couldn't explain what the PIN was for, and 24% of PIN users had turned the reminders off ([SOUPS 2021](https://usenix.org/system/files/soups2021-bailey.pdf)). → Every nudge carries its reason in one line. If the reason is unclear, the nudge will be muted. ^[inferred]
- **Ending well: Arc's farewell page is our template for deletion and pilot end.** Arc's homepage now gives a dated timeline (sign-ups closed Oct 22, AI features off Nov 23, shutdown Dec 22, 2026), an export option, and says data is deleted within 30 days ([arc.net](https://arc.net/)). → The pilot's end screen and "Delete my data" give a date, an export option and a plain deletion window. ^[inferred]
- **Novelty has a tax.** In Arc, 5.52% of daily users used more than one Space and 0.4% used a feature the team loved ([letter to members](https://browsercompany.substack.com/p/letter-to-arc-members-2025)). → One card, three choices, familiar iOS patterns. Spend the novelty on how sure it is, and nowhere else. ^[inferred]
- **Showcase page (Dec 11): one claim per section, every video controllable.** Apple's AirPods Pro page alternates a small 21 px label with a 48 px one-line claim, such as "Fitness" then a heart-rate claim. It has 16 videos, each with a labelled play control, and reduced-motion CSS rules (computed, [apple.com](https://www.apple.com/airpods-pro/)). → Five sections, one claim each. The hero shows the card's reason and "how sure" line, and every animation has a pause control. ^[inferred]

## A consent screen, the GOV.UK way

A worked outline for our first-run consent, built from GOV.UK patterns. Copy is a proposal; the CSO locks the wording. ^[inferred]

1. **Start with a question protocol, not a screen.** For each data item, write down why we need it, who must give it, how we check it and how we keep it secure ([form structure](https://www.gov.uk/service-manual/design/form-structure)). Anything without an answer isn't asked. Link the protocol from [[10-trust-safety/privacy-and-consent|Privacy and consent]].
2. **Page 1: what this does (a statement heading).** Three short lines, then **Continue**, left-aligned, never "Next" ([question pages](https://design-system.service.gov.uk/patterns/question-pages/)). No progress bar at first. If testing shows one is needed, use a caption like "Question 2 of 3" ([question pages](https://design-system.service.gov.uk/patterns/question-pages/)).
3. **Page 2: "Can we read sleep and heart rate from your watch?"** The question is the page heading and the radio legend, so screen readers hear it once. Yes / No, nothing pre-selected ([radios](https://design-system.service.gov.uk/components/radios/)). One hint sentence with no links, for example "We read last night's sleep and today's heart rate, nothing else". Choosing No routes to the laptop-only path, which is a complete product (the ICP_4 test).
4. **Page 3: "Can we see which app is open on your laptop?"** The same shape. If they choose Yes, a revealed follow-up is allowed only for one simple question ([radios](https://design-system.service.gov.uk/components/radios/)).
5. **Notifications are not asked here.** They're asked after the first useful suggestion, per [[09-design/design-evidence|Design evidence]] §2.
6. **Check your answers.** A summary list with a **Change** link per row; skipped items show "Not provided". The button names its action, such as "Start with these settings" ([check answers](https://design-system.service.gov.uk/patterns/check-answers/)).
7. **Confirmation.** Model it on the cookie banner's confirmation: say what was chosen and that it can be changed at any time, and move focus to the message ([cookie banner](https://design-system.service.gov.uk/components/cookie-banner/)).
8. **Errors.** Say what to do, reusing the question's words: "Select yes if we can read your watch data". No "please", "sorry", "invalid" or "oops" ([error message](https://design-system.service.gov.uk/components/error-message/)).
9. **Privacy settings = the cookies page pattern.** Each source is its own Yes / No group that shows the saved choice, with one **Save settings** button and a success banner afterwards ([cookies page](https://design-system.service.gov.uk/patterns/cookies-page/)).
10. **Deleting data uses an interruption page.** GOV.UK keeps these for irreversible actions and warns that they lose force if overused ([interruption pages](https://design-system.service.gov.uk/patterns/interruption-pages/)). It's never used for the "talk to someone" state.
11. **Copy rules.** Split any sentence over 25 words. Use the active voice. Use "must" only for real requirements, "need" for steps and "can" for options ([clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/)). Say "you" when the app speaks and "I" when the student does. Don't put personal data in URLs ([writing for UIs](https://www.gov.uk/service-manual/design/writing-for-user-interfaces)).
12. **Never sticky.** GOV.UK's banner isn't fixed-position, so it can't hide the focused element (WCAG 2.2, 2.4.11) ([cookie banner](https://design-system.service.gov.uk/components/cookie-banner/)). Our consent is a page, not an overlay.

## GOV.UK Design System

- **What it is · who · platform · price:** The UK government's open design system of styles, components and patterns for public services. Free and open. The web is mobile-first ([design-system.service.gov.uk](https://design-system.service.gov.uk/patterns/)).
- **Seen:** opened (pattern pages and the gov.uk homepage banner, computed).
- **Principles:** There are 11 government design principles, including "Start with user needs", "Do less", "Do the hard work to make it simple", "This is for everyone" and "Understand context" (phone, library) ([principles](https://www.gov.uk/guidance/government-design-principles)). Plain English is mandatory on GOV.UK ([clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/)). The often-cited "reading age 9" target comes from council guides, not the page we opened `[unverified]` ([Surrey CC](https://www.surreycc.gov.uk/website/writing-guide/reading-levels-for-web-pages)).
- **Key screens and patterns:** question pages (one thing per page), check answers, confirmation, interruption pages, cookie banner and cookies page, error message and summary, and "Exit this page" (Shift pressed three times, for abuse contexts) ([patterns](https://design-system.service.gov.uk/patterns/), [exit a page quickly](https://design-system.service.gov.uk/patterns/exit-a-page-quickly/)).
- **Visual style:** The typeface is GDS Transport, and only services on service.gov.uk may use it ([typeface](https://design-system.service.gov.uk/styles/typeface/)). The type scale has 19 px body at every size. Headings run 48 → 32 px and 36 → 27 px below 640 px. Every line height is a multiple of 5 px, and there's a tabular-figures option ([type scale](https://design-system.service.gov.uk/styles/type-scale/)). Buttons are green rgb(15,122,82), computed on gov.uk.
- **Copy and tone:** Calm, direct, and no apologies in validation. "Please" isn't used as a rule. Avoid negative contractions such as "can't" ([writing for UIs](https://www.gov.uk/service-manual/design/writing-for-user-interfaces)). "Total cost", not "This is the total cost".
- **What people love / criticise:** Widely copied in the public sector `[unverified]`. Its own known issue: revealed questions aren't always announced to screen readers (WCAG 4.1.2) ([radios](https://design-system.service.gov.uk/components/radios/)). The interruption pattern is still being researched ([interruption pages](https://design-system.service.gov.uk/patterns/interruption-pages/)).
- **Steal:** one source per page → the consent flow. Unselected radios → every consent choice. "I do not know" as a valid answer → a self-report like "Not sure how I slept". Error template → the snooze-length and data-pause forms.
- **Avoid:** using GDS Transport or the crown look. We're not a government service.
- **Open questions:** Should our consent run as separate pages on a 375 px iPhone and as one grouped page on a laptop? GOV.UK merges pages only when research supports it.

## Signal

- **What it is · who · platform · price:** An end-to-end encrypted messenger from an independent nonprofit that says it can never be acquired. Free, on iOS, Android and desktop ([signal.org](https://signal.org/)).
- **Seen:** opened (homepage, government requests page, blog) and researched (SOUPS 2021).
- **Principles:** Hold as close to no data as possible, and treat privacy as the default rather than a mode ([bigbrother](https://signal.org/bigbrother/), [signal.org](https://signal.org/)). Profiles are encrypted so the server never sees them ([profiles](https://signal.org/blog/signal-profiles-beta/)).
- **Key screens and patterns:** Since 2024 your phone number is hidden by default. Settings › Privacy › Phone Number holds two separate choices: who can see it and who can find you by it. Usernames end in two or more digits and there's no searchable directory. Every default can be reversed ([usernames](https://signal.org/blog/phone-number-privacy-usernames/)). The PIN reminder uses spaced repetition, and reminders come less often when you enter it correctly ([Signal support](https://support.signal.org/hc/en-us/articles/360007059792)).
- **Visual style:** The website uses Inter, with an 800-weight 40 px headline and 24 px body text (computed). In-app [described].
- **Copy and tone:** Explains privacy by what Signal can't do ("we can't read your messages"), in short, slightly playful lines ([signal.org](https://signal.org/)).
- **What people love / criticise:** People trust its subpoena record ([Malwarebytes](https://www.malwarebytes.com/blog/news/2021/04/signal-app-insists-its-so-private-it-cant-provide-subpoenaed-call-data)). Criticism: it still requires a phone number ([usernames](https://signal.org/blog/phone-number-privacy-usernames/)), and PIN reminders confused casual users ([SOUPS 2021](https://usenix.org/system/files/soups2021-bailey.pdf)).
- **Steal:** proof by absence (what we'd hand over if asked) → a "What we can't see" list on the privacy screen (we never see message content, keystrokes or screen contents). Split controls (see vs. find) → separate "collect" and "show in history" toggles per source. No third-party scripts → no cookie banner on our web app or showcase. ^[inferred]
- **Avoid:** recurring verification nags. Signal-level security language we can't back up (we're not end-to-end encrypted, so we don't imply it).
- **Open questions:** Can the CTO make "what we'd hand over" literally true and short?

## Linear

- **What it is · who · platform · price:** A planning and issue tool for product teams, on web, Mac, Windows and mobile. Price not checked.
- **Seen:** opened (homepage, Method, the redesign article, computed tokens).
- **Principles:** The Method lists eight principles, including "Purpose-built" (not endlessly flexible), "Aim for clarity" (plain standard terms), "Say no to busy work", "Simple first, then powerful" and "Decide and move on" ([Method](https://linear.app/method/introduction)). Its manifesto says software has lost its personality and that speed should serve progress ([readme](https://linear.app/readme)). The CEO asked what a tool that is never slow would look like ([First Round, via search summary](https://rosetta.to/u/firstroundcapital/inside-linear-why-craft-and-focus-still-win-in-product-building-karri-saarinen-c?t=97)).
- **Key screens and patterns:** **⌘K** runs any action or jumps to any page by name ([Linear guide](https://linear.app/enablement/guide/navigating-linear)). There's a searchable shortcuts help screen ([changelog](https://linear.app/changelog/2021-03-25-keyboard-shortcuts-help)). The 2024 redesign aimed to reduce visual noise in the sidebar, tabs and headers. Three designers did it in about 6 weeks, behind a feature flag and then a staged rollout ([redesign](https://linear.app/now/how-we-redesigned-the-linear-ui)).
- **Visual style:** The app uses Inter Display for headings and Inter for body text. Themes come from LCH with three inputs, and text is higher contrast in both modes ([redesign](https://linear.app/now/how-we-redesigned-the-linear-ui)). The marketing site (computed): background #08090a, text #f7f8f8, secondary text #8a8f98, accent #7170ff, Inter Variable at weight 510 with tight negative tracking, and the motion tokens listed in the takeaways.
- **Copy and tone:** Confident, short and manifesto-like. Uses standard terms over jargon.
- **What people love / criticise:** It started the "Linear look" (dark, monochrome, gradients and glass). Critics say SaaS sites now look the same and that dark-only copies skip light mode ([LogRocket](https://blog.logrocket.com/ux-design/linear-design/), [UX Bootcamp](https://bootcamp.uxdesign.cc/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)). The claim that the founder chose dark to suit engineers is `[unverified]`.
- **Steal:** three-input themes with a contrast knob → our tokens and accessibility setting. Instant hover-in with a 150 ms fade-out → card buttons on laptop. ⌘K-style "type an action" → the laptop companion only (W = walk, B = break), never required. ^[inferred]
- **Avoid:** the Linear look itself: near-black, purple accent, glow. The steal library already bans purple "AI wellness" gradients. Density tuned for power users: our users are tired, not power users.
- **Open questions:** Does the laptop surface need shortcuts at all in the pilot?

## Raycast

- **What it is · who · platform · price:** A keyboard launcher for Mac (with iOS and Windows versions). Free for personal use, with paid Pro tiers that include AI. AI can be switched off entirely in Settings ([pricing](https://www.raycast.com/pricing)).
- **Seen:** opened (homepage, pricing, 2022 design post).
- **Principles:** Its three stated design principles are fast, simple and delightful ([a fresh look](https://www.raycast.com/blog/a-fresh-look-and-feel)). The homepage lists Fast, Ergonomic, Keyboard First, Personal and Reliable, with a 99.8% crash-free rate ([raycast.com](https://www.raycast.com/)).
- **Key screens and patterns:** a bigger search bar. An **action bar** at the bottom: on the left the current command and any toasts; on the right the actions with their shortcuts. A Compact Mode. Bolder outline icons ([a fresh look](https://www.raycast.com/blog/a-fresh-look-and-feel)).
- **Visual style:** The site uses Inter at 48 px / 600 on near-black #07080a (computed). The claim that the window has no open/close animation comes from a design engineer's guidance, not Raycast `[unverified]` (`.claude/skills/emil-design-eng/SKILL.md`).
- **Copy and tone:** Frames speed as never wasting time rather than as saving time ([raycast.com](https://www.raycast.com/)).
- **What people love / criticise:** Not researched `[unverified]`.
- **Steal:** a reliability number on the homepage → the showcase states what we can measure (sync success, "not enough data" rate), not hype. The action bar → the card footer shows its two actions, plus shortcuts on laptop. Turning AI off entirely → a switch for "plain explanations only" (template reasons, no LLM) in privacy settings. ^[inferred]
- **Avoid:** making a launcher-style command bar the main interface. Our moment is a pause, not a search.
- **Open questions:** Could the CTO support an LLM-off mode in the pilot?

## Things 3

- **What it is · who · platform · price:** A personal task manager from Cultured Code for Mac, iPhone and Watch, iPad and Vision Pro ([culturedcode.com](https://culturedcode.com/things/)). One-time purchase per platform. At launch in 2017: $9.99 iPhone, $19.99 iPad, $49.99 Mac ([MacStories](https://www.macstories.net/?p=48965)).
- **Seen:** opened (site) and researched (review, interview).
- **Principles:** Put the user's content first, give it a clear structure and remove decoration. Animation should carry information. The team prototypes in After Effects, lives with each animation during development and cuts any that grow tiresome. The redesign took about three and a half years ([sspai interview](https://sspai.com/post/39724)). It won an Apple Design Award at WWDC 2017 and has two ADAs in total ([TapSmart](https://www.tapsmart.com/apps/review-things-3-best-manager-ios/?amp=1), [App Store](https://apps.apple.com/app/things-3/id904237743)).
- **Key screens and patterns:** **Magic Plus**: drag the + button to where the item belongs, such as onto a day in Upcoming to set its start date. Today has a separate **This Evening** section. Headings inside projects ([MacStories](https://www.macstories.net/?p=48965)).
- **Visual style:** Mostly white space with bold type and small splashes of colour, plus a tactile feel with haptics on iPhone ([MacStories](https://www.macstories.net/?p=48965)). The site uses the system font stack on #f2f5f7 (computed).
- **Copy and tone:** Calm and promising, for example getting organised within an hour ([culturedcode.com](https://culturedcode.com/things/)).
- **What people love / criticise:** People love the polish. Criticism: no collaboration, per-device pricing, slow updates, and Apple platforms only ([iMore](https://www.imore.com/apps/things-3-is-the-king-of-productivity-apps-so-do-we-even-need-a-things-4), [TechRepublic](https://www.techrepublic.com/article/things-3-review/)).
- **Steal:** the "tiresome test" → keep each card animation only if it still feels right on day 10 of the pilot. This Evening → a separate late-night tone for the card after 11 pm (the 1 am test). Magic Plus's always-there button in the thumb zone → a manual **Take a break** control, bottom-right, on every screen. ^[inferred]
- **Avoid:** a 3.5-year polish cycle. We have five weeks.
- **Open questions:** Are haptics possible from Safari? Probably not; that would need native iOS `[unverified]`.

## Arc (The Browser Company)

- **What it is · who · platform · price:** A free browser for Mac and Windows with vertical tabs and Spaces, plus Arc Search on mobile. Development stopped in 2025 in favour of Dia, an AI browser ([letter](https://browsercompany.substack.com/p/letter-to-arc-members-2025)). It sunsets on December 22, 2026 ([arc.net](https://arc.net/)).
- **Seen:** opened (farewell homepage, letter to members).
- **Principles (lessons it published):** the "novelty tax" (too much to learn for too little reward), simplicity over novelty, performance as a foundation, and security from the start. They also said they should have stopped a year earlier, when the data first showed the problem ([letter](https://browsercompany.substack.com/p/letter-to-arc-members-2025)).
- **Key screens and patterns:** The farewell page explains the change as a dated timeline, a migration ("Spaces are now Profiles"), an export option, deletion within 30 days and an FAQ ([arc.net](https://arc.net/)). Arc's famous onboarding (personality, theme picking) wasn't seen `[unverified]`.
- **Visual style:** [described] colourful and playful. Not verified.
- **Copy and tone:** Personal and candid ("not an easy sentence to write"), and it states dates and data handling plainly ([arc.net](https://arc.net/)).
- **What people love / criticise:** A loyal core, but usage looked like a niche professional tool. Only a few percent used the signature features ([letter](https://browsercompany.substack.com/p/letter-to-arc-members-2025)). Reports of an acquisition by Atlassian are `[unverified]` here.
- **Steal:** the farewell page structure → our end-of-pilot and "Delete my data" screens: date, what happens, export, deletion window. Usage-share honesty → measure which card parts get opened (the "Why?" tap rate) and cut what nobody uses. ^[inferred]
- **Avoid:** personality as the product, and features that need teaching.
- **Open questions:** What's our real data-deletion window? The CTO sets it.

## Aesop

- **What it is · who · platform · price:** A skin, hair and body brand with stores and a web shop. Premium-priced.
- **Seen:** opened (US homepage, computed at 420 px wide).
- **Principles:** None published that we found. Inferred from the site: restraint, sensory words, warm paper tones. ^[inferred]
- **Key screens and patterns:** A full-bleed hero with one headline and one outlined button. Product tiles described by counting, such as "Three sink-side staples for the hands" ([aesop.com](https://www.aesop.com/us/)).
- **Visual style (computed):** One sans family, Suisse Int'l (regular and medium). 12 px / 18 px base, 14 px / 21 px paragraphs, 36 px h1 at weight 400 (no bold display type). Cream background #FFFEF2 with #333 text, not black on white.
- **Copy and tone:** Elevated and sensory, with words like "redolent" and "sojourn". Reading level is high.
- **Privacy:** The US cookie notice is notice-only. It mentions advertising sharing and session replay, and offers only "Online Preferences" and a close button ([aesop.com](https://www.aesop.com/us/)). This is the US opt-out norm, and it's the opposite of GOV.UK.
- **What people love / criticise:** Not researched `[unverified]`.
- **Steal:** a warm off-white surface and one regular-weight family → a candidate "library at night" palette with off-white text on warm dark. Count-first phrasing → "Two things changed since lunch". ^[inferred]
- **Avoid:** its vocabulary (we stay at grade ≤ 8), its 12 px base text (we respect Dynamic Type), and its consent model.

## Muji

- **What it is · who · platform · price:** Ryohin Keikaku's "no-brand quality goods" retailer, founded in Japan in 1980 with 40 products. It now has more than 1,400 stores ([Ryohin Keikaku](https://www.ryohin-keikaku.jp/en/about-muji)).
- **Seen:** opened (About MUJI). muji.com timed out.
- **Principles:** three manufacturing principles: select materials, streamline processes and simplify packaging (for example, unbleached beige paper). Products are "empty vessels". The aim is the rational satisfaction of "This will do", not "This is what I really want" ([Ryohin Keikaku](https://www.ryohin-keikaku.jp/en/about-muji)). Kenya Hara's role is `[unverified]` here.
- **Visual style:** [described] natural materials, beige and white, little branding.
- **Steal:** "This will do" as a design stance → the card should feel sufficient, not exciting. The metric is completed breaks, not engagement. The absence of a logo → no mascot, no brand flourish on the card. ^[inferred]
- **Avoid:** romanticising emptiness into missing information. The card still needs its reason and sources.

## Apple product pages

- **What it is:** Apple's long-scroll marketing pages. Studied only for the Dec 11 showcase page.
- **Seen:** opened (AirPods Pro, computed at 420 px wide).
- **Patterns (computed):** The page is about 35,000 px tall at that width, with 16 sections and 16 videos. Each video has a play control labelled with what it shows, and there are 12 sticky elements and 6 reduced-motion CSS rules. The rhythm is a 21 px / 600 grey label, then a 48 px / 600 one-line claim, then 14 px feature tiles. Type is SF Pro Display and Text, with #1d1d1f text on white ([apple.com](https://www.apple.com/airpods-pro/)).
- **Copy:** a short declarative claim, then one supporting fact.
- **Steal:** label + claim + proof, five times over: the problem, the card, how sure it is, privacy and results. Every moving piece is pausable and has a static fallback. ^[inferred]
- **Avoid:** a 35,000 px page, auto-playing video on campus Wi-Fi, and SF Pro on a web page (the font's licence limits use to Apple platforms `[unverified]`).

## Sources

GOV.UK: [principles](https://www.gov.uk/guidance/government-design-principles) · [question pages](https://design-system.service.gov.uk/patterns/question-pages/) · [form structure](https://www.gov.uk/service-manual/design/form-structure) · [radios](https://design-system.service.gov.uk/components/radios/) · [error message](https://design-system.service.gov.uk/components/error-message/) · [cookie banner](https://design-system.service.gov.uk/components/cookie-banner/) · [cookies page](https://design-system.service.gov.uk/patterns/cookies-page/) · [check answers](https://design-system.service.gov.uk/patterns/check-answers/) · [interruption pages](https://design-system.service.gov.uk/patterns/interruption-pages/) · [exit a page quickly](https://design-system.service.gov.uk/patterns/exit-a-page-quickly/) · [typeface](https://design-system.service.gov.uk/styles/typeface/) · [type scale](https://design-system.service.gov.uk/styles/type-scale/) · [clear language](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/) · [writing for UIs](https://www.gov.uk/service-manual/design/writing-for-user-interfaces) · [gov.uk banner, live](https://www.gov.uk/) · [Surrey CC reading level](https://www.surreycc.gov.uk/website/writing-guide/reading-levels-for-web-pages)

Signal: [signal.org](https://signal.org/) · [government requests](https://signal.org/bigbrother/) · [usernames](https://signal.org/blog/phone-number-privacy-usernames/) · [profiles](https://signal.org/blog/signal-profiles-beta/) · [PIN support](https://support.signal.org/hc/en-us/articles/360007059792) · [SOUPS 2021](https://usenix.org/system/files/soups2021-bailey.pdf) · [Malwarebytes](https://www.malwarebytes.com/blog/news/2021/04/signal-app-insists-its-so-private-it-cant-provide-subpoenaed-call-data)

Linear: [linear.app](https://linear.app/) · [Method](https://linear.app/method/introduction) · [readme](https://linear.app/readme) · [redesign](https://linear.app/now/how-we-redesigned-the-linear-ui) · [navigating](https://linear.app/enablement/guide/navigating-linear) · [shortcuts changelog](https://linear.app/changelog/2021-03-25-keyboard-shortcuts-help) · [LogRocket](https://blog.logrocket.com/ux-design/linear-design/) · [UX Bootcamp](https://bootcamp.uxdesign.cc/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646) · [First Round clip summary](https://rosetta.to/u/firstroundcapital/inside-linear-why-craft-and-focus-still-win-in-product-building-karri-saarinen-c?t=97)

Raycast: [raycast.com](https://www.raycast.com/) · [pricing](https://www.raycast.com/pricing) · [a fresh look and feel](https://www.raycast.com/blog/a-fresh-look-and-feel)

Things 3: [culturedcode.com](https://culturedcode.com/things/) · [MacStories](https://www.macstories.net/?p=48965) · [sspai interview](https://sspai.com/post/39724) · [TapSmart](https://www.tapsmart.com/apps/review-things-3-best-manager-ios/?amp=1) · [App Store](https://apps.apple.com/app/things-3/id904237743) · [iMore](https://www.imore.com/apps/things-3-is-the-king-of-productivity-apps-so-do-we-even-need-a-things-4) · [TechRepublic](https://www.techrepublic.com/article/things-3-review/)

Arc: [arc.net farewell](https://arc.net/) · [letter to Arc members 2025](https://browsercompany.substack.com/p/letter-to-arc-members-2025)

Style: [aesop.com/us](https://www.aesop.com/us/) · [About MUJI](https://www.ryohin-keikaku.jp/en/about-muji) · [AirPods Pro page](https://www.apple.com/airpods-pro/)

## Related

- [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[10-trust-safety/privacy-and-consent|Privacy and consent]]
- [[09-design/design-stack-and-resources|Design stack and resources]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]]
