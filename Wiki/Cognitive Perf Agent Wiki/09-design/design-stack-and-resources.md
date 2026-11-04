---
title: Design Stack and Resources
category: 09-design
tags: [frontend, tool, reference, decision]
sources: ["https://gsap.com/licensing/", "https://animejs.com", "https://github.com/educlopez/smoothui", "https://github.com/magicuidesign/magicui", "https://github.com/bklit/bklit-ui", "https://github.com/emilkowalski/skills", "https://github.com/pbakaus/impeccable", "https://github.com/Leonxlnx/taste-skill", "https://mobbin.com/pricing", "https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/", "https://github.com/calesthio/OpenMontage"]
summary: "What we use, maybe use and skip from the design tools Heramb collected: motion libraries, React component kits, AI design skills, inspiration sites, Figma MCP, video tools. Checked 2026-11-04."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-04
tier: core
created: 2026-11-04T23:40:00Z
updated: 2026-11-05T00:10:00Z
---

# Design Stack and Resources

Heramb collected a list of design tools on 2026-11-04. Each was checked for what it is, its licence and price, whether it fits a **calm, accessible wellness tool**, and whether it can go in our **public, free** repo. Versions and prices were current on that date. Re-check before relying on them.

**The bar for adding anything:** it makes the student's experience clearer, calmer or more trustworthy; it respects `prefers-reduced-motion`; it's free and its licence allows a public repo; it feels native in **Safari on an iPhone** (our users are US college students on iPhones) and fine on a laptop. "Looks impressive" is not on the list. ^[inferred]

## Adopted

| What | Licence | How we use it |
|---|---|---|
| **Emil Kowalski's skills** (`/emil-design-eng`, `/review-animations`, `/mobile-native`, `/apple-design`) | MIT | Copied into `.claude/skills/` with the licence and a project note. `mobile-native` fixes iPhone Safari's tells (safe areas, 100vh, input zoom, tap flash, sticky hover); `apple-design` covers Apple's interface principles, springs and gestures (glass only on floating chrome, never as decoration). They set the rules for every UI animation: purpose first, ease-out, under 300 ms, never `scale(0)`, interruptible, GPU-only, reduced motion. |
| **Impeccable** ideas (Paul Bakaus) | Apache-2.0 | **Not installed:** it downloads a binary, sends telemetry and installs a hook. We rewrote its ideas in our words in `/polish` (harden, clarify, quieter, the craft floor), used surface modes in `design/PRODUCT.md`, and took the PRODUCT.md brief file itself. |
| **Taste Skill** ideas (Leonxlnx) | MIT | **Not installed:** it runs scripts and downloads images, and it's built for landing pages. Its dated tells registry and app-screen rules became `/polish tells` and the "one question, one finding" rule. |
| **CSS transitions and WAAPI** | built in | The default for every UI animation. No library needed, and smooth when the main thread is busy. |
| **anime.js** 4.5.0 | MIT | The JS animation library for **CDN mockups** and motion pieces: about 24.5 KB, plain JS. Wrap every use in a reduced-motion check yourself. |

## Maybe (React phase, case by case)

| What | Licence | When |
|---|---|---|
| **Smooth UI** | MIT (React 19, Tailwind v4, Motion) | The only kit here that says it handles reduced motion. A candidate source of primitives (number flow, dialog) once the app is React. |
| **Magic UI** | MIT core, paid Pro | Only the quiet pieces, such as Number Ticker or Animated Circular Progress, checked for reduced motion. Skip the flashy effects. |
| **bklit ui** | MIT charts (Studio is proprietary) | History-view charts in the React app. Shadcn-style, so there's no CDN use. |
| **GSAP** 3.15.1 | Free "standard no charge" licence, **not open source** (owned by Webflow) | Only if we need scroll-driven or text-splitting motion for the showcase page or demo video. It honours reduced motion via `gsap.matchMedia()`. |
| **Kokonut UI** ("coconut ui") | MIT core, paid Pro | Flashy, with no accessibility claims. Use only if one component fits better than Smooth UI. |

All shadcn-registry kits copy source code into the repo. Copy only what's used, check each piece for reduced motion and accessibility, and never depend on a Pro tier. ^[inferred]

## Skip (and why)

| What | Why |
|---|---|
| **Spline** | 3D. Its runtime chunks are about 650 KB and up to 3.4 MB standalone, a slow first load and battery drain on a phone over campus Wi-Fi. Code export needs a paid plan. It clashes with "calm". |
| **Retro UI / NeoBrutalism** | A loud neo-brutalist look is the opposite of our tone. |
| **unlumen UI** ("ulumen ui") | Mostly paid; can't go in a free public repo. |
| **"variant ui"** | No such component library found. The closest match is Variant, an AI design-idea tool, so not a library. |
| **Figma MCP** | The free tier allows 20 tool calls a month. It's only useful with a paid Dev or Full seat, and we don't design in Figma. Revisit if that changes. |
| **OpenMontage** | AGPL-3.0 (never copy into our repo), with heavy dependencies. For the Dec 11 demo, use a screen recording plus `/prompt-motion` pieces and our own narration. |
| **modulify.ai templates, logomaker** | Locked to a builder or paid, with unclear ownership terms. |
| **logotouse, iconly.design** | Third-party logos and app icons are trademark and editorial-only, so they can't be reused. |
| **wonderlist.design** | Paid Figma kit. |
| **closeit.fast** | An e-signature tool, not design. |

## Inspiration (look, never copy; never commit their images)

| Resource | Use it for | Access |
|---|---|---|
| **Mobbin** | Real health and fitness screens (WHOOP, Oura, Strava, Apple Fitness, including its privacy flow) and consent flows | The free tier works in a browser. The MCP connected here needs **Pro**: the account is on the free tier, so `search_screens` returns "requires a paid plan". |
| **Dribbble, Behance** | Moodboards for calm card styles | Browser only. Claude can't fetch them, and their work belongs to the designers. |
| **motionin.design** | Motion ideas, mostly too flashy for the app; maybe for the showcase page | A few free sections |
| **landdding.com** | Landing-page patterns for the showcase page | Free tier |
| **fontinlogo.com** | Finding **open-licence** fonts behind logos we like | Free. Then download the font from its original open source and self-host it; check each font's own licence. |
| **easing.dev, easings.co** | Stronger custom easing curves (recommended by Emil Kowalski) | Free |

Steal Cards from these go in [[09-design/steal-library|Steal library]], and they follow the mechanism-not-material rule.

## Third-party notices

Licences for code and text we copied are in `THIRD_PARTY_NOTICES.md` at the repo root and in each vendored skill's `LICENSE` file.

## Related

- [[09-design/09-design|Design hub]] · [[09-design/ui-ux-quality-bar|UI and UX quality bar]] · [[11-engineering/ai-skills|AI skills toolkit]] · [[07-backend/tech-stack|Tech stack]]
