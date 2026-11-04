---
name: review
description: Pre-commit review of this session's own changes in the Cognitive Performance Agent repo (code, skills, wiki pages). Binds scope to the files this session touched, checks only-my-files (teammates share the repo), scans for secrets and for health or personal data (the repo is public), checks wiki conventions, rates every finding 1–10 (capped at 4–5 unless it quotes the line), and audits plan completion (DONE / PARTIAL / NOT DONE / CHANGED / UNVERIFIABLE). Applies only typos and mechanical fixes; everything else is one batched question. Use when the user types /review, says "review before commit", "check my diff", or before committing or pushing.
---

# /review: the pre-commit review

You review the work **this session** did, before anyone commits it. No agents. You report and ask; the user decides. Repo root: the folder holding `CLAUDE.md`. Vault: `Wiki/Cognitive Perf Agent Wiki/` (`W/`).

## 1. Bind the scope (never guess it)
1. **My files:** every file this session wrote or edited (from your own Write / Edit / Bash calls in this conversation). That list is the scope.
2. **The tree:** `git status --short` and `git diff --stat`. Teammates (and other sessions) may have changed files too.
3. **The plan:** what this work was built from (the user's ask, a task list, an ADR, a checklist). Two candidates → ask which.
4. Write: `SCOPE: <n> files mine · <m> other changed files not mine (not reviewed) · plan = <source> · branch = <name>`.

## 2. Only-my-files check
- Any changed file **not** on my list is someone else's: list it under "Not mine, leave out of the commit". Never stage, revert, stash or tidy it.
- A file on my list with hunks I didn't write: flag **SHARED FILE**, show my hunks, and say the commit must take only those (`git add -p`), or ask.
- `.obsidian/workspace*.json` and `.DS_Store` never go in a commit.

## 3. Secret, personal-data and health-data scan (the repo is public)
On **my files only** (the diff, plus untracked files read whole):
```
RX='((api[_-]?key|secret|token|passw(or)?d|client[_-]?secret)["'"'"' ]*[:=]|service_role|sk_live|sk-[A-Za-z0-9]{20}|sk-ant-[A-Za-z0-9_-]{20}|eyJ[A-Za-z0-9_-]{30,}|ya29\.|AIza[0-9A-Za-z_-]{30}|BEGIN (RSA|OPENSSH|PRIVATE))'
git diff -- <my files> | grep -nEi "$RX"         # and: grep -nEi "$RX" <my untracked files>
grep -nE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}' <my files>
```
- A key, token, OAuth client secret, `.env` value or private key = **CRITICAL**, blocks the commit. If it was ever pushed, it must be rotated, not just deleted.
- **Health data:** any real person's HR, HRV, sleep, steps, laptop activity or task results (CSV, JSON, screenshots, notebook outputs) = **CRITICAL**. Synthetic data is fine only if it is clearly labelled synthetic and seeded.
- Personal emails: team members' addresses only where they already appear by choice (e.g. git authorship); never in code, configs or requests.
- Line: `SECRETS/PII: none found in <n> files` or `<n> CRITICAL` (file:line, value masked to the last 4).

## 4. Read the diff, then the findings
Read each of my hunks, not just the stat. Two passes:
- **CRITICAL:** data loss; a secret or health data; a broken ground rule from `CLAUDE.md` (the LLM computing the score, diagnosis language, collecting something default-deny forbids, unlabelled synthetic data, hardcoded data behind a "live" UI); a removed abstain / escalate path; a trust boundary (auth, row-level security, what goes to a hosted LLM); shell injection in scripts.
- **INFORMATIONAL:** wiki pages missing frontmatter fields (`title`, `category`, `tags`, `sources`, `summary`, `updated`…), `updated:` not bumped, a short-path or broken `[[link]]`, an aliased link inside a table cell, a new page not linked from its hub, missing `^[inferred]` on our own synthesis, stale facts, dead code.

**Sideways sweep:** a finding is a defect class. `grep` my files for its siblings and rate the worst one.

**Gate integrity (always ASK):** a removed or weakened check, a threshold relaxed (abstain threshold, HR quality gate, a test), an exception swallowed, a test made to pass by editing the spec. Does it silence the failure it guarded?

**Confidence (every finding):** 9–10 verified (ran it, or the line plainly shows it) · 7–8 shown by the quoted line · 5–6 likely, say what would verify it · 3–4 a hunch, appendix only.
**The quote rule:** a finding that doesn't quote its `file:line` and the line itself is capped at 4–5.
Format: `[CRITICAL] (8/10) path/file.md:42 — "<quoted line>" — what's wrong — the fix.` Zero findings is a valid result.

## 5. Plan-completion audit
Up to 30 deliverables from the plan. Each: **DONE** (the diff or a run shows it; be conservative) · **PARTIAL** (what's missing) · **NOT DONE** · **CHANGED** (how, and whether the user agreed) · **UNVERIFIABLE** (needs outside state: a device, the course server, GitHub; name the manual check).
"Code that handles a deliverable is not the deliverable." A wiki note saying it's done is not proof.
Line: `COMPLETION: <d>/<n> DONE · <p> PARTIAL · <x> NOT DONE · <c> CHANGED · <u> UNVERIFIABLE`, with one cause per gap.

## 6. Fix-first
- **AUTO-FIX (only these, only in my files):** typos, a broken `[[link]]` whose target obviously exists, a missing `updated:` bump, trailing whitespace, a stale comment, a path that plainly points at the right file. List each.
- **ASK (everything else):** anything a user would see, code behaviour, a fact, a design call, a gate, removing anything, any fix over ~20 lines, any file not mine. If a reasonable person could disagree, it's ASK.
- All ASK items in **one** AskUserQuestion (≤ 4 questions, the rest grouped), each with a recommendation. At most 3 fix rounds, then `converged: no`.

## 7. Report
```
REVIEW: <clean | issues open> · reviewed <n> files (mine) at <time>
SCOPE: …
SECRETS/PII: …
COMPLETION: …
FINDINGS: <c> critical · <i> informational · <a> auto-fixed · <q> asked
```
Then the findings (critical first), the "Not mine" list, the question.
**A review counts only for the content it saw.** If a reviewed file changes afterwards, review it again before committing.

## Never
Commit, push, stage, revert or stash (the user asks for those separately); touch a teammate's file; spawn agents unless asked; print an unmasked secret.

*Method adapted from Startup City's /review (itself from gstack, MIT, Garry Tan).*
