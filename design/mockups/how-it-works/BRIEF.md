# "How it works, in four steps": three experience directions

- **By:** the UIUX seat, using the `/prompt-motion` method (prompt-motion.com: method only, nothing copied or installed), 2026-11-05.
- **Asked by:** Heramb: "different, hatke designs… it should feel like an experience."
- **The section:** 1 It notices · 2 It reads your watch, carefully · 3 It suggests, and shows why · 4 You decide. Copy from `design/mockups/landing/` round 5.
- **Surface mode:** Persuade.
- **The one question:** "How does it actually work?"
- **The one finding:** your own data becomes one card, with its reasons attached, and you decide.

## The prompt, in six blocks (shared by all three)

**inputs**
- Sample data from the landing demo, labelled "Sample data": 2 h 40 min studying, 14 switches in 20 min, slept 5 h vs a usual 7 h, lab at 4:30 (A, B), or a 9:30 class (C).
- Scroll position `p` from 0 to 1. `?p=0.62` freezes a frame for captures.

**direction**
- One idea per file, one take, no cuts: scroll moves the camera through the four steps.
- Calm, paper and ink, one accent (mint = "the break"), Geist + Geist Mono.
- Banned:
  - bouncy easing, glows, particles, crossfades, gradients as decoration, random without a seed
  - CSS transitions or timers driving the piece
  - brains, heartbeat lines, a readiness % ticking up, red/green verdicts
  - "your last 6 nights" (boardroom), and anything that claims breaks make you better

**structure:** 4 beats × 25% of the scroll. Each beat has one named move.

**build**
- One HTML file per direction. `seek(p)` computes every style from `p`.
- Reduced motion snaps to the end of each beat, with no tweening.
- Captions are a 4-step list beside the stage on a laptop. On a phone, only the active caption shows, under the stage.

**gotchas**
- Phone text inside an SVG scales down, so keep it at 13 px or more in viewBox units.
- On phones, a sticky stage needs `100svh`.

**start:** below, then build.

## Contrarian check
1. **Obvious:** four icon cards in a row (the current page, more or less).
2. **Inverse:** don't explain the steps; let one shape *become* each step, so the steps are the story's frames.
3. **Wrong genre:** a stadium split-flap scoreboard. It's literally "halftime".
4. **Illogical:** a room at night where the page's clock runs as you scroll, and the product goes quiet at the end. Kept, because it's also the late-night lead from the boardroom.

## Directions

**A · "The thread"** (the inverse)
- **Concept line:** one line becomes the whole story.
- **Signature shot:** the "now" dot on your session line lifts and opens into the black card, while two mint lines rise into it from where its reasons came from (the switch marks, the sleep bar).
- **Moves:**
  1. The line draws, then the switch marks comb in.
  2. Last night's bar fills against your dashed usual.
  3. The dot morphs into the card, and the reasons rise.
  4. You tap Walk. The card folds back into a pill, a mint slot appears on the line, then a quiet dashed line follows.

**B · "The halftime board"** (wrong genre)
- **Concept line:** the scoreboard calls halftime.
- **Signature shot:** the big row flips letter by letter to "Short walk now?" in mint, with the two reason rows above it bracketed as its sources.
- **Moves:**
  1. The study rows flip in.
  2. The sleep rows flip in, with your usual dimmed.
  3. The call flips in, and the bracket draws.
  4. Choices flip in. Walk is pressed, the call flips to "Enjoy the walk.", and the bottom row flips to "Asks once. Then quiet."

**C · "12:40 am"** (illogical, and the late-night lead)
- **Concept line:** the page's clock runs; the product knows when to go quiet.
- **Signature shot:** in a dark room at 12:40, the camera pushes in on the phone, and its island opens into "Stop for tonight?" with lines tying each reason to the laptop, the ring and the calendar.
- **Moves:**
  1. Time-lapse 10:00 pm → 12:40, while the laptop counter climbs.
  2. The ring's night appears as a bar.
  3. Push-in, and the card opens.
  4. "20 more min" is pressed. The camera pulls back, the clock runs to 1:00, and the island asks once more. The laptop closes, and "Good night. I'll stay quiet until morning."

## Honesty notes
- All three use "your laptop" (not "Mac or Windows", which is false) and sample data.
- **"Top of your iPhone" is a design intent,** not a confirmed delivery (the boardroom on late night: the laptop is the night surface for Dec 11, phone push is a stretch goal). C shows the phone; if the team picks C, it can just as well push in on the laptop.
- **C's night mode isn't scoped** (boardroom 2026-11-05: night only, the team decides).

## Built and shot (2026-11-05)
- **Files:** `a-thread.html`, `b-board.html`, `c-night.html`.
- **How they run:** every frame is `seek(p)` of scroll progress. `?p=0.72` freezes the signature frame.
- **Shots:** `.crits/2026-11-05-hiw/` and `.crits/2026-11-05-hiw2/` (iPhone + laptop, p = .2/.46/.72/.84/1). No console errors.
- **Comparison page:** artifact https://claude.ai/artifact/DG3s5HxgqLt5WzyRFUFhp6 (private).
- **Fixed after the first look:**
  - A: the intro hid the captions in frozen frames; a reason line crossed the "usual" label; a chip touched "slept 5 h"; the inactive captions weren't dimmed.
  - B: the closing line stacked beside the board on laptops.
  - C: the calendar note poked out under the card in step 4.
- **Not checked:** how it feels on a real phone (scroll speed, sticky behaviour in Safari), and screen readers. The stage is `aria-hidden`; the captions carry the words.
- **The team picks.** Once they do: run `/icp` on the pick, then fold it into `design/mockups/landing/index.html`.
