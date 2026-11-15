---
title: "Written proposal draft (due Nov 11)"
category: 25-journal
tags: [journal, course, evaluation, planning]
sources: ["Team Google Doc 'PHA-Group3_ProjectProposal-Week9' (Tab 1 outline; 'Draft' tab added 2026-11-10)", "[[12-research/evaluation-plan]]", "[[24-synthesis/market-map]]", "[[05-data/synthetic-data-generator]]"]
summary: "Reviewed the team's proposal outline (too vague to submit: wrong pitch, open questions, no roles, no control group) and wrote a full draft in a new 'Draft' tab of the team doc. Roles and dates still need the team."
base_confidence: 0.65
lifecycle: draft
lifecycle_changed: 2026-11-10
tier: supporting
created: 2026-11-10T20:00:00Z
updated: 2026-11-13T12:00:00Z
---

# Written proposal draft (due Nov 11)

**Ask (Heramb, 2026-11-10):** check the team's written proposal, then write the draft in a new tab of the same Google Doc. Keep it simple and in plain words, so it reads as if a person wrote it. The course asks for five sections: problem, user and significance; data and access; technical approach and interface; evaluation plan; feasibility, timeline and roles (Yulee pasted the brief as a comment on the doc). Deadline: Wed Nov 11, 11:59 PM ET, per [[30-course/deliverables/part-2-proposal-presentation|Part 2]].

## What the team's outline (Tab 1) had, and why it wasn't ready

The structure matched the brief, and the right inputs were listed (watch, laptop, calendar, feedback). But:

- **It pitched a different product:** "comprehensive task manager and optimizer", "productivity time windows". What we built and showed on Nov 6 answers one question: keep going or take a break.
- **It asked questions instead of answering them:** "synthetic database generated from?", "(Raghavan?)", "possibly ATC?", "Working?", "what is our control group?".
- **The evaluation had no design.** The success measures were "more tasks completed" and "less phone use". The laptop app can't see the phone, so the second can't be measured. ^[inferred]
- **No roles,** and no Dec 4 integration checkpoint.
- **The data plan rested on Fitbit,** whose Web API was turned off on Nov 2 (see [[24-synthesis/market-map|Market map]] §0).
- **Nothing on safety, uncertainty or privacy,** which the course grades hardest ([[30-course/project-requirements|Project requirements]]).
- **Small:** the course code reads "BINFGU70/COMS4995". It's probably a typo for BINF 4070; the team should check. ^[inferred]

## What the Draft tab says

About 1,300 words, in the doc's font (Geist), with real headings and bullets. Tab 1 was left as it was.

- **Problem, user and significance:** the keep-going-or-break question for US college students and student-athletes on iPhones. Numbers from the market map: ACHA-NCHA Spring 2025 (41.9% sleep under 7 h on weeknights; 23.6% say sleep problems hurt their schoolwork) and NCAA GOALS 2019 (31–42 h a week on sport in season). It states that Halftime is wellness, not medicine.
- **Data and access:**
  - watch or ring data (sleep, HR, resting HR, HRV against your own usual);
  - the Fitbit shutdown, with **Apple Health or user-uploaded exports as the fallback** if a class project can't use the Google Health API;
  - the laptop app (study time and app switches only; no keystrokes, screenshots, URLs or messages);
  - the calendar, read only;
  - in-app feedback;
  - the seeded synthetic generator, labelled synthetic;
  - the four of us testing on ourselves first.
- **Technical approach:** collect → store (Postgres) → decide (Signal, Evidence and Action agents in LangGraph; fixed-rule code makes the final call) → explain (the LLM writes the reason and never computes the number) → show (once, on the iPhone, with sources). It includes abstain ("still learning" in the first week) and escalate (someone to talk to after weeks of short sleep).
- **Interface:** links the live prototype at halftime-study.vercel.app and its Demo moments. It has a placeholder for 2–3 screenshots.
- **Evaluation plan:** see [[12-research/evaluation-plan|Evaluation plan]] § "Proposal draft version". In short:
  - Control is a fixed Pomodoro schedule, test is Halftime, and each person does both in random order.
  - The second question is laptop-only vs laptop plus watch.
  - The main outcome is a short study task, fixed in advance.
  - The surveys are short, asked right after a session, and checked against tap logs.
- **What changed since Nov 6:** the narrower pitch, the control group answer, dropping "less phone use", and adding in-app feedback and tap logs.
- **Safety and privacy:** no diagnosis; each source is its own opt-in; only summaries go to the LLM; it points to a person when needed; it says openly that the prototype logs taps and a rough location from IP, and that this can be turned off.
- **Timeline:**
  - Nov 13: generator makes sleep, steps and HR.
  - Nov 20: laptop and task data, plus the scenarios.
  - **Nov 24: first testers** (new).
  - Dec 1: final build to all testers.
  - Dec 4: integration checkpoint, 28 synthetic days end to end.
  - Dec 7: review the results.
  - Dec 11: demo with a recorded backup on exam-week.

  Nov 13, Nov 20 and Dec 4 come from [[05-data/synthetic-data-generator|Synthetic data generator]].
- **Roles:**
  - Heramb: the iPhone prototype, design, website and analytics.
  - Raghavan: backend, database and agents.
  - Alexa: evaluation and the checks before testing with people.
  - Yulee: writing and recruiting.

  Only Heramb's line rests on work already done. The other three are guesses from the old outline and the wiki, marked "(to confirm)" in the doc.

## Still for the team

- Confirm or fix the three guessed roles.
- Agree the Nov 24 first-tester date, which comes before the team's own Dec 1.
- Paste the screenshots and fix the course code.
- Pick the study task ([[24-synthesis/open-decisions|Open decisions]] #2). The draft only says "a short study task".
- Whether the draft was submitted, and in what form, isn't recorded here.

## Related

- [[30-course/deliverables/part-2-proposal-presentation]] · [[12-research/evaluation-plan]] · [[24-synthesis/open-decisions]] · [[09-design/prototype-demo-script]] · [[25-journal/25-journal|Journal hub]]
