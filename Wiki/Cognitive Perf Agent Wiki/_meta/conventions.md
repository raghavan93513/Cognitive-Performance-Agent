---
title: Conventions
category: meta
tags: [meta]
sources: []
summary: Naming, frontmatter, linking, provenance and folder rules for every page in this vault.
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Conventions

## Files and folders

- File names are `kebab-case.md`. Titles in frontmatter can be human-readable.
- Every numbered folder has a hub named after itself (`07-backend/07-backend.md`). Never use `_index.md` or `README.md`, because Obsidian's graph labels nodes by file name.
- New numbered domains take the next free number in their band: `01–19` company, `20–29` knowledge layer, `30–39` context.
- Course readings are `author-year-short-title`. Decision records are `adr-NNN-short-title`. Journal entries are `YYYY-MM-DD-topic`.

## Frontmatter (required on every page)

`title`, `category` (the folder), `tags` (≤5, from [[_meta/taxonomy|the taxonomy]]), `sources`, `summary` (≤200 chars), `base_confidence`, `lifecycle`, `lifecycle_changed`, `tier`, `created`, `updated`. Optional: `aliases`, `relationships`, `provenance`.

## Links

- Use wikilinks with the full vault path and no extension: `[[05-data/data-sources|Data sources]]`.
- Never put an aliased link (a double-bracket link with a `|` display name) inside a table cell, because the pipe breaks the table. Link in the prose next to the table instead.
- Link at least two related pages from every new page, and link the page from its domain hub.

## Provenance

- Unmarked text comes straight from a cited source.
- `^[inferred]` marks our synthesis or application. `^[ambiguous]` marks a point where sources disagree.
- Never fabricate figures, citations or dates.

## Course material

- Link to the course repo or website; don't copy slides or notebooks into our (public) repo.
- Our own decks are copied into `attachments/decks/`.
