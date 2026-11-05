# Lower landing sections as experiences: two directions

- **By:** the UIUX seat, using the `/prompt-motion` method (method only; nothing copied or installed), 2026-11-06.
- **Asked by:** Heramb: "the sections from clear about what it reads and below feel plain… amazing mockups experience based, but in the same card design and same info."
- **Scope:** three blocks of `design/mockups/landing/` v8:
  1. "Clear about what it reads." The two white list cards.
  2. The two black honesty cards: "When it doesn't know, it says so." and "Some things need a person."
  3. The black "Sign-up isn't open yet." joining card.
- **Fixed:** the cards, colours, type and every sentence stay as they are. Motion and small visuals are added, but no claims.

## The six blocks
- **inputs**
  - The page's own words.
  - Sample raw data, labelled "Sample", standing in for what a laptop, watch, phone and calendar produce.
  - Scroll position, or taps.
- **direction**
  - Show the rules happening instead of listing them.
  - One signature moment per block.
  - Calm. Mint means "kept" or "the break"; nothing pulses.
  - Banned:
    - glows, particles, bounce, crossfades, gradients
    - random without a seed
    - anything implying the page reads the visitor's real data
    - new promises such as "deleted within a day" or a counselor's name
- **structure:** D is three scroll takes. E is three tap interactions.
- **build:** one HTML file per direction. D: `seek(p)` per block, `?p=` freezes. Reduced motion shows the end state.
- **gotchas**
  - Item positions come from layout rects, so they're recomputed on resize.
  - Phone cards stack, so the travel paths are vertical.

## D · "The sorter" (scroll)
1. **What it reads.** Eight raw sample items arrive one at a time above the two cards.
   - Each one is cut down to what Halftime keeps, then drops onto its row:
     - "Notes → Safari → Messages" becomes "3 switches · notes, reading, chat".
     - "CHEM 3443 Lab · 4:30 pm · room 309" becomes "next class at 4:30".
   - Items Halftime never reads ("dear prof, could I…", a location, a Readiness score) turn into blank bars and land in "What it never reads".
   - **Signature:** your typed sentence turns into bars at the gate, word by word.
2. **Honesty.**
   - The learning bar fills night by night, from "1 of 7" to "7 of 7".
   - On the person card, a day strip shows the offer passing over the late-night study block and landing at 8:00 am, so it's "never mid-study".
3. **Joining.** The four "joining means" lines tick in as you reach them. "How long it runs" and "Who can join" show as grey dashes (missing values), with the same sentence.

## E · "See what it sees" (tap)
1. **What it reads.** A sample laptop screen with a two-way switch: "What you see" / "What Halftime sees".
   - Flip it, and every word on the screen becomes a grey bar. Window titles become kinds (notes, reading, chat), and a counter shows "3 switches in 20 min · 2 h 40 min".
   - The matching rows in the two cards highlight.
2. **Honesty.**
   - A "nights of data" slider (1–7) drives the learning bar and the confidence word ("Not sure yet" until 7).
   - A "When would it ask?" switch: "12:40 am, mid-study" shows "Stays quiet"; "8:00 am" shows the morning offer.
3. **Joining.** Tap each line to tick it ("OK with this"). After four ticks: "That's everything joining asks." Nothing is sent or saved.

## Honesty notes
- The 7-night learning bar is the page's current wording. The team's proposal is 14 nights (open decision #19). Change both together.
- "Someone to talk to" is still unnamed: Columbia Health hasn't confirmed, and neither direction names a service.

## Built and shot (2026-11-06)
- **Files:**
  - `d-sorter.html`: `seek(p)` per block. `?p1=&p2=&p3=` freeze the three blocks.
  - `e-xray.html`: taps. `?s=1` shows every interaction done.
- **Shots:** `.crits/2026-11-06-lower*/`, iPhone + laptop, frozen frames plus a real scroll of D on iPhone. No console errors.
- **Fixed after the first look:**
  - D could leave a stale word from the previous item, so its item is now rebuilt from `p` every frame.
  - Kept items now land on the row's value line, not on top of its text.
  - The day strip's "10 pm" and "studying" labels overlapped.
- **Comparison page:** artifact https://claude.ai/artifact/NFz2Z55jQuSdUFUWodecuV (private). The team picks D, E or a mix.
- **Not checked:** real-device feel (scroll length, iOS Safari sticky), screen readers on E's switches and slider, and the ICP panel.
