# Cognitive Performance Agent: notes for AI sessions

A wellness agent for students and athletes. It reads watch and laptop signals and answers *"Should I keep going or take a break?"*. It suggests **continue / short walk / break**, always with its reasons, sources and uncertainty, and says "not enough data" when it doesn't know. This is the BINF 4070 final project (Columbia, fall 2026). **Users: US college students and athletes on iPhones** (Safari first; laptops are Mac or Windows).

## Team (they decide; AI sessions advise)
Heramb Chaudhari · Raghavan Vaidhyaraman (repo owner) · Alexa Kafka · Yulee (full name not recorded yet). Whoever asks owns calls in their own lane. Anything that changes the shared design (scope, architecture, data collected, what users see) is a **team** decision: record who decided.

## Where things live
- Wiki (Obsidian vault): `Wiki/Cognitive Perf Agent Wiki/`. Front door: `index.md`. Rules: `_meta/conventions.md`. Recent state: `hot.md`. Change log: `log.md`.
- Open questions: `24-synthesis/open-decisions.md`. Decisions: `20-decisions/` (ADR template in `_meta/templates/decision-record.md`).
- Course bar: `30-course/project-requirements.md`. Deadlines: Nov 6 proposal (15%) · Nov 11 written draft · Dec 4 integration checkpoint · Dec 11 final demo + writeup.
- Design PDFs: `System Design/`.

## Ground rules (the course grades these; skills check them)
1. **Grounded:** every suggestion shows its reason and its source records.
2. **Honest uncertainty:** abstain ("not enough data") rather than guess; escalate to a human when that is the right call.
3. **The LLM never computes the score.** Numeric code makes the estimate; the LLM explains it.
4. **Wellness, not medicine:** no diagnosis language or clinical authority.
5. **Privacy by design:** default-deny collection (no keystrokes, screenshots, URLs, message contents); consent by source and purpose; only minimal derived context reaches a hosted LLM.
6. **No polished UI over hardcoded data.** Synthetic data is always labelled synthetic.
7. **Public repo:** no secrets, no real participant data, no personal emails in committed files.

## Project skills (`.claude/skills/`)
`/decide` decision brief → ADR · `/plan-review` four-lens plan check (product, design, safety, eng) · `/algo` Algorithm Card + seeded simulation · `/icp` five synthetic student/athlete testers · `/review` pre-commit review · `/security` privacy and security review, report only · `/checkpoint` and `/restore` session handover · `/prompt-motion` motion pieces made in code.
AI advisor seats (roles with no personal names; they advise, the team decides): `/ceo` focus, scope, risk · `/cto` architecture, data access, model, technical claims · `/cmo` positioning, pitch and demo story, recruiting copy · `/cso` study design, consent, escalation and safety, claims audit · `/uiux` design · `/boardroom` 2–4 seats debate one cross-lane question. Protocol: `13-team/exec-team.md`. Shared knowledge: `24-synthesis/market-map.md`, `24-synthesis/casebook.md`, `12-research/science-and-tech-evidence.md`, `09-design/design-evidence.md`.
Design (read `design/PRODUCT.md` first): `/uiux` the designer persona · `/mockup` HTML directions shot on every device · `/crit` scored crit with a blind reviewer · `/teardown` how a public site does something (needs REA) · `/polish` harden/clarify/quieter/tells/floor · `/emil-design-eng`, `/review-animations`, `/mobile-native` (iPhone Safari) and `/apple-design` (vendored, MIT). Libraries and resources: `09-design/design-stack-and-resources.md`. Third-party licences: `THIRD_PARTY_NOTICES.md`. Design QA: `node tools/qa/device-walk.mjs` (screenshots + automatic UI checks). Design rubric: `09-design/ui-ux-quality-bar.md`.

## When you finish a task that touched the wiki
Update the pages and their `updated:` field. Add one line to `log.md`. Refresh `hot.md` if the project's state moved. Link new pages from their folder's hub. Follow `_meta/conventions.md` (frontmatter, full-path wikilinks, `^[inferred]` markers).
