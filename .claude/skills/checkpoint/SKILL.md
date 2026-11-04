---
name: checkpoint
description: Write a handover note so a fresh session (yours or a teammate's) can pick up Cognitive Performance Agent work - every fact marked run / read / assumed, every open item starting "Open.", what was tried and failed, decisions waiting on the team. Writes only the note. Use when the user types /checkpoint, says "save where we are", "write a handover", "I'm stopping for today", before a long break, before a risky step, or when the context is getting long.
---

# /checkpoint: a handover that says how it knows

No agents. A checkpoint never changes code or the wiki; it only writes the note.

## Where it goes
`.claude/checkpoints/<YYYYMMDD-HHMM>-<slug>.md` at the repo root (gitignored: checkpoints are per-machine working notes, not team records). The slug is the title cut to `a-z0-9-`, ≤ 50 characters (never paste free text into a shell path).
Append-only: never rewrite or delete an older checkpoint; a newer one supersedes it. **No secrets, tokens, emails or health data** in a checkpoint.

If the work produced something the **team** needs to know (a decision, a finding), that belongs in the wiki (`log.md`, a journal page), not only in the checkpoint. Say so in the note.

## When
- Before ending a session with work open, or handing to a new chat or a teammate.
- Before a risky step (a big refactor, a paid LLM run, a push), so a crash loses nothing.
- When the conversation has grown long.

## The provenance rule (the point of this skill)
Every factual line ends with **one** marker, in these exact words (`/restore` sorts on them):
- `(run: <command> → <what it printed>)`: you ran it **this session** and saw the result. A failure is `(run: … → FAILED: <line>)`.
- `(read: <file>[:line])`: you opened it this session and it says so. Reading a note that says "passed" is `read`, not `run`.
- `(assumed)`: from memory, another session's note, a summary, or anything not checked this session.
No marker = `(assumed)`. "Tests pass", "pushed", "decided" each need to say which.

## The note (fill every heading; "none" is a valid line)
```
## CHECKPOINT 2026-11-04 18:05Z — <title>
Task: <one line: what was asked, in the person's words if short>  (read: <where the ask lives>)
Branch: <git branch> @ <short sha>  (run: git rev-parse --abbrev-ref HEAD; git rev-parse --short HEAD → …)
State: <where it stands in one or two lines>
Done:
- <fact> (run: … → …) | (read: …) | (assumed)
Decisions (and why):
- <decision> — <why> — <who decided: Heramb in chat / team meeting / me> (read: …)
Open (priority order; every item starts "Open."):
- Open. <next step> — <exact command or file> (assumed | read: … | run: … → …)
Tried and failed (don't repeat):
- <what> — <what happened> (run: … → FAILED: …)
Files I changed (uncommitted unless marked):
- <path> — <what> (run: git status --short → …)
Team decisions waiting:
- <question> — options — my recommendation
Deadline pressure: <next course deadline and what this work owes it>
Next session starts with: /restore <this file>
```

## Rules
- Write from what you **saw**, not what you meant to do. Planned work goes under Open, never under Done.
- A claim about a file's content needs a `read` this session; otherwise it's `assumed` or becomes an Open item to verify.
- Keep it short: readable in under 2k tokens. Link to long things, don't paste them.
- Then tell the user in one line where it is and the first Open item.

*Method adapted from Startup City's /checkpoint (itself from gstack, MIT, Garry Tan).*
