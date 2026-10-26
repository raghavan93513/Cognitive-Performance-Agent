---
title: How to Use This Vault
category: meta
tags: [meta]
sources: []
summary: Where to start depending on why you opened the wiki, how it is organised, and how to add to it without making a mess.
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: core
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# How to Use This Vault

## Start here, depending on why you came

| You want to… | Go to |
|---|---|
| Understand the product in 5 minutes | `01-foundation/project-overview` |
| Prepare for the next class deliverable | `30-course/30-course` (the "Next up" box) |
| Study for a quiz | `30-course/weeks/` (each page ends with "Likely quiz material") |
| Build something | The domain hub: `04`–`08`, then `14-engineering` |
| Make or look up a decision | `24-synthesis/open-decisions`, then `20-decisions` |
| Find a slide deck we made | `31-decks` |

The links behind each row: [[01-foundation/project-overview|Project overview]] · [[30-course/30-course|Course hub]] · [[24-synthesis/open-decisions|Open decisions]] · [[20-decisions/20-decisions|Decisions]] · [[31-decks/31-decks|Decks]].

## How it's organised

- **`01`–`17` — the company.** One folder per domain, read in order. Each folder's hub page has the same name as the folder (e.g. `05-data/05-data`) and is that domain's front door.
- **`20`–`25` — the knowledge layer.** Decisions, concepts, entities, references, synthesis and the journal. Domains link *into* these instead of repeating them.
- **`30`–`31` — context.** The course we're building this in, and every deck we've made.
- **`attachments/`** holds original files that pages embed. **`_meta/`** holds conventions, the tag list and templates. **`_raw/`, `_staging/`, `_archives/`** are framework working folders.

See [[_meta/conventions|Conventions]] for naming, frontmatter and linking rules, and [[_meta/taxonomy|Tag taxonomy]] for tags.

## Adding to it

- **Quick note?** Drop it in `_raw/`. The next ingest turns it into proper pages.
- **New page?** Copy a template ([[_meta/templates/course-week|course week]] · [[_meta/templates/reading|reading]] · [[_meta/templates/decision-record|decision record]] · [[_meta/templates/meeting-note|meeting note]]), put it in the right domain folder, and link it from that domain's hub.
- **A decision got made?** Write an ADR in `20-decisions/` and move the item to "Decided" in [[24-synthesis/open-decisions|Open decisions]].
- **New deck?** Put the file in `attachments/decks/` and a summary page in `31-decks/`.
- **With the AI agent:** `@cogperf update wiki`, `wiki-query @cogperf <question>`, `@cogperf ingest <file>`. The `@cogperf` prefix routes requests to this vault and not the default one.

## Trust signals on every page

- `^[inferred]` marks synthesis or application, and `^[ambiguous]` marks a point where sources disagree. Unmarked text comes straight from a source.
- `lifecycle: draft` means machine-written and not yet reviewed by a person. Change it to `reviewed` once someone on the team has checked the page.
