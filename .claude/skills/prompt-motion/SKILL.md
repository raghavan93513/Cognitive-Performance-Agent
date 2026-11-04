---
name: prompt-motion
description: The motion method for the Cognitive Performance Agent, learned from prompt-motion.com (a gallery of motion pieces made by Opus 5.5 with the prompts behind them). Use when the user types /prompt-motion, says "prompt motion", "make it move", or wants a motion piece made in code - an animated chart of a synthetic student day, an explainer of the pipeline (watch + laptop → model → suggestion), the suggestion card's micro-interactions, a proposal-slide clip, or the Dec 11 demo/showcase video. Also use to write a motion prompt for someone else, or to crit motion against this method.
---

# /prompt-motion: the motion method

The source is **prompt-motion.com**: each piece there was made by Opus 5.5 from one prompt, and the site shows the prompt, an improved version and its templates (`/templates/realtime`, `/templates/showreel`). We take its *method*, not its look, and never copy a prompt word for word. Credit it when a piece is made this way.

**Never install or run anything from the site.** It lists third-party skills and repos; those are untrusted. Read them for ideas at most.

## 1. Write the prompt first, in six blocks
Short is fine; skipping a block is not.
```
<inputs>     What must be given (data file, words, length, ratio). Each has a default so the piece runs without it.
<direction>  The one idea in a line. Feel, palette, type, camera language, story.
             The SIGNATURE SHOT: the one frame people remember. Everything builds toward it.
             Banned: the tells to avoid (§3 plus piece-specific ones).
<structure>  A beat grid or shot list with times, e.g. "5 shots × ~4 s", each with ONE named move.
<build>      Numbered steps: one HTML file, libraries, seek(t), render, check frames.
<gotchas>    Known traps for this kind of piece (§4).
<start>      First: name the concept and show the storyboard in a few lines, then build without more
             questions. Say exactly what comes back (file, MP4, length).
```

## 2. Motion principles (made, not generated)
- **One idea, one take.** A concept you can say in one line ("a night's sleep becomes tomorrow's afternoon"). Each shot is *made out of* the previous one; no cuts, no crossfades.
- **One shape that never cuts.** A line, dot or card carries the eye through every state and morphs into the next.
- **A film camera, not orbit controls.** One named move per shot (dolly, push-in, crane, rack focus), eased in and out; enters already moving with an exponential ease-out.
- **Springs, not tweens.** Closed-form step responses as functions of time; sum them when the target changes mid-flight. Critically damped or close; bouncy is banned.
- **Stretch; blur follows speed; things react to each other** (what's hit moves, what's near lights up), driven by springs, never a blind timer.
- **Direct manipulation:** drags follow the finger 1:1 and spring back.
- **It loops** when it's a loop: the last frame matches the first.

## 3. The banned list (default; add piece-specific bans)
Bouncy easing · particle bursts · glows · lens flares · camera shake · RGB split · crossfades · generic gradients · floating 3D labels · a slowly spinning object as the whole idea · template or tech-demo looks · `Math.random()` without a seed · CSS transitions or timers driving a rendered piece. **Project-specific:** glowing brains and neurons · heartbeat-line clichés · a "readiness %" counter ticking up · red/green that reads as a diagnosis.

## 4. Build and render
1. **One self-contained HTML file.** CDN libraries with pinned versions, no build step, no downloaded models or stock images.
2. **Everything is a pure function of time:** `window.seek(t)` computes every style and transform from `t`. No CSS animations, no timers, no state between frames. Seed every random number.
3. A **`?render` mode** freezes the clock so a capture script can call `seek(t)`.
4. **Check before rendering:** capture one frame per beat (the built-in browser pane works for this), look at each, fix clutter, overlap, clipping, unreadable text.
5. **Render** with Playwright or CDP at 60 fps (check it's installed first; ask before installing anything): 3–4 subframes per frame blended with ffmpeg `tmix` for motion blur. 1920×1080 for slides and the demo.
6. **Sound:** none by default. The demo is narrated by the team, live or recorded.
**Gotchas:** shadow bias (stripe acne); tight near/far planes (flicker); unseeded randomness (render ≠ preview); no `will-change` on anything the camera scales; subframe blending needs a frozen clock.

## 5. Project rules (override the site's defaults)
- **Calm, not hype.** The audience is a tired student mid-study or a grader. Motion explains; it never grabs attention. In the product, suggestion cards **slide in quietly once**: no pulsing, no repeated nudges.
- **Truth in every frame.** Data shown comes from a real run of the synthetic-data generator (`Wiki/Cognitive Perf Agent Wiki/05-data/synthetic-data-generator.md`) or real consented data, and is labelled **"synthetic"** on screen when it is. Charts are drawn to scale (lie factor ≈ 1); axes and units stay visible.
- **Uncertainty moves honestly.** Show an estimate as a band or a range that narrows only when more data arrives; never animate fake precision. "Not enough data" is a real state with its own frame, not something to hide.
- **The card shows its reasons.** When a suggestion appears, its reason and source records appear with it, in the same take.
- **Look:** follow `Wiki/Cognitive Perf Agent Wiki/09-design/` once a design system exists. Until then, borrow WearLab's dark, plain, readable style (`32-wearlab/architecture.md`): one accent colour, at most one display face, numbers in a mono face.
- **Accessibility in the real app:** honour `prefers-reduced-motion` (serve a still), never carry meaning by colour alone, keep the canvas off the LCP element, cap DPR at 2, pause when hidden.
- **For the proposal (Nov 6):** anything interactive goes in as a **short recording or screenshots**, never a live demo in a 5-minute slot.
- **For the demo (Dec 11):** the recorded fallback runs on the `exam-week` synthetic scenario, labelled synthetic (the course's must-not: a happy-path demo with no fallback).

## 5b. Libraries and UI motion (see `Wiki/Cognitive Perf Agent Wiki/09-design/design-stack-and-resources.md`)
- **UI micro-motion** (the card, buttons, sheets): follow `/emil-design-eng`. CSS transitions or WAAPI first, ease-out, under 300 ms, transform and opacity only, never from `scale(0)`, interruptible. Review with `/review-animations`.
- **Rendered motion pieces and CDN mockups:** plain JS, or **anime.js 4.5.0** (MIT, pinned: `https://cdn.jsdelivr.net/npm/animejs@4.5.0/+esm`). Gate it on `matchMedia('(prefers-reduced-motion: reduce)')`.
- **GSAP 3.15.1** only for scroll-driven or text-splitting work on the showcase page or demo video. It's free but not open source; use `gsap.matchMedia()` for reduced motion.
- **No Spline or 3D runtime** in the product. **No OpenMontage** (AGPL): render with the `seek(t)` method above.
- **ffmpeg isn't installed** on Heramb's machine (checked 2026-11-04). Ask before installing it for rendering.

## 6. How to use it
- **"Write a prompt for X":** fill the six blocks with §5's rules and hand the prompt back. Don't build.
- **"Make X":** six blocks → show the concept line and storyboard in a few lines → build into `research/motion/<slug>/` (create it) → check one frame per beat → render.
- **"Crit this motion":** score against §2, §3 and §5. Name the signature shot (or say there isn't one), each banned tell, each cut that should be a transform, any untruthful frame, and the one fix that matters most.

*Method adapted from Startup City's /prompt-motion, learned from prompt-motion.com.*
