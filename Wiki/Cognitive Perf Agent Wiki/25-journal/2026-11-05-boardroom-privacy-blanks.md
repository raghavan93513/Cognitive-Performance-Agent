---
title: "Boardroom: the privacy blanks in the Halftime mockups"
category: 25-journal
tags: [journal, team, privacy, consent, boardroom]
sources: [".claude/skills/boardroom/SKILL.md", "13-team/exec-team.md", "10-trust-safety/privacy-and-consent.md", "13-team/pre-build-briefing.md", "24-synthesis/open-decisions.md", "design/mockups/landing/index.html", "design/mockups/suggestion-card-v3/island-forecast.html"]
summary: "CTO + CSO, chaired by the CEO. Consensus: 'de-identified' and 'never your … school' are false today and come off; data is coded in one US Postgres database, kept to Dec 18 with a Dec 6 analysis lock; the AI gets a fixed allowlist (or nothing personal: a value call for the team); sign-up stays off until course staff answer in writing; Mac-only pilot; ~18 team-hours of tests. Chair recommends Option C (fix words now, build the proof only if a pilot is cleared; kill rule Nov 14 / Dec 4). Three team decisions: IRB email by Nov 7, what the AI sees, 911/988 now. Nothing approved."
base_confidence: 0.5
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T18:00:00Z
updated: 2026-11-05T18:00:00Z
---

# Boardroom: the privacy blanks in the Halftime mockups

**Nothing here is approved. The team (Heramb, Raghavan, Alexa, Yulee) decides.** The seats are AI advisor roles; their fictional backgrounds are never evidence.

## Framing
- **Question:** the five synthetic testers ([[25-journal/2026-11-05-icp-wearables]], [[25-journal/2026-11-05-icp-landing]]) keep stopping at the same privacy blanks. What true, plain answers can replace them?
  1. Where the data is stored.
  2. How long it's kept, and what happens after Dec 11.
  3. Which fields reach the hosted AI writer, and which provider.
  4. Who on the team sees pilot data; can "never your coach, team or school" stand?
  5. What Delete and Disconnect do.
  6. What joining the pilot involves.
  7. The named "Talk to someone" service.
- **Feeds:** the landing page and Data sources copy, and the privacy and consent design behind it (open decisions #11, #12, #16).
- **Who decides:** the team. Anything that changes the data collected is a team decision.
- **Deadlines:** Nov 6 proposal · Nov 11 written draft · Dec 4 integration checkpoint · Dec 11 demo.
- **Seats:** the CTO and the CSO (as Heramb asked), with the CEO chairing the synthesis only. Clerk: the main session.

## Round 1 memos

### CTO
**TL;DR.** None of the CTO blanks can be filled truthfully yet, because the team hasn't chosen a server, a retention rule or an LLM provider. Proposed:
- one US Postgres database;
- everything identifiable deleted by Dec 18;
- Anthropic, in US-only mode, seeing about 6 approved summary numbers.

Two mockup claims are wrong today: "de-identified", and Apple Watch "through Apple Health".

**Recommendation.**
- **Make each line on the card testable.** A line ships only with a test that proves it:
  - what we send the AI matches the approved field list;
  - a delete leaves 0 rows;
  - the access-cancel call returns HTTP 200.
- **Store:** one hosted Postgres database in a US region. Pick the vendor by Nov 13; its backups must clear within 7 days.
- **Keep data until the Dec 16 writeup.** On Dec 18, delete identities, sign-in tokens and every per-person row. Only group results remain.
- **LLM:** Anthropic's paid API, set to US-only (`inference_geo:"us"`), on one fixed model version. The escalation, consent and delete screens stay fixed templates.
- **Identity apart from study data:** email and tokens go in their own table, study rows carry a random code, and one named member holds the link. The copy says "coded", not "de-identified".
- **Apple Watch:** drop it from the pilot (HealthKit has no web API) or label it "file export".
- **Calendar is a new data source, so it's a team call.** The AI gets only "minutes to next class".

Door type: what we collect, the vendor and retention are one-way; the copy is two-way. Cost: about 18 team-hours `[assumption]`.

**Evidence** (opened 2026-11-05):
- Anthropic deletes API inputs and outputs "within 30 days". Flagged content can be kept up to 2 years. No training without permission. US-only processing costs 1.1×. Sources: privacy.claude.com/en/articles/7996866, platform.claude.com/docs/en/manage-claude/api-and-data-retention, …/data-residency.
- Google revokes an app's access via `oauth2.googleapis.com/revoke` (developers.google.com/identity/protocols/oauth2/web-server). Testing-mode tokens expire after 7 days.
- About 95% of people were re-identified from step summaries (evidence §7).
- Not checked: how Oura or WHOOP revoke access.

**Case:** Flo Health (casebook B2): the privacy promise and the code drifted apart.

**Confidence:** MEDIUM-HIGH that it's buildable; LOW that a real-classmate pilot runs before Dec 11.

**Would change my mind:**
- review rules that require longer retention;
- a host that can't clear its backups;
- the AI adding nothing over templates.

**Counter-argument (its own):** send the AI nothing personal, or no AI for real participants.

**Needs:**
- **Team:** approve calendar data and the Dec 18 date.
- **CSO:** ask course staff about retention, and write the wording for results already used.
- **UIUX:** "de-identified" → "coded"; fix Apple Watch; fix "after the Nov 6 proposal".

### CSO
**TL;DR.** Two lines aren't just blank, they're untrue: "the project team sees de-identified study data" and "never your … school". Fix those first. Fill the other blanks only with confirmed or proposed lines. Keep the sign-up link dead until course staff answer the IRB question in writing and a consent form exists.

**Recommendation.**
- **Pseudonymous:** files carry a study code, and one named key holder keeps the list.
- **Replace the coach line** with "never your coach or sports team; course staff see only group totals".
- **"Delete all" erases everything** until a Dec 6 analysis lock. After that, only group totals already in the report remain.
- **Retention:** per-person data deleted by Dec 18, and nothing per-person in the repo.
- **LLM:** a fixed allowlist of derived fields. Escalation text is templated. No free text ever reaches it.
- **Crisis lines:** 911 and 988 shown now. CPS stays a placeholder until the P4 phone check (Nov 20).

Door type: two-way as a mockup, one-way once anyone consents. Cost: about 7 team-hours (later revised to about 18).

**Evidence:**
- Google emails are added by hand (briefing R1), so the data is linked.
- Na 2018: 95% re-identified. Rocher 2019: 99.98% from 15 attributes.
- Columbia 2012 policy: non-anonymous or internet-based projects need IRB review, and exempt projects still go for a determination (briefing §1). IRB staff may see records ^[inferred].
- Anthropic: deletes within 30 days; flagged data up to 2 years; feedback 5 years; no training without permission (opened 2026-11-05).
- CPS 212-854-2878 appears on four Columbia pages; not phoned.

**Case:** Crisis Text Line (B5).

**Confidence:** HIGH on the two false lines; MEDIUM on the dates.

**Would change my mind:** course staff or the IRB naming, in writing, someone outside the team who holds identities.

**Counter-argument:** detailed privacy copy could scare off a small pilot. Answer: recruiting copy must match the consent form word for word.

**Needs:**
- **CTO:** the host, backups, revocation and the exact LLM payload.
- **Team:** approve Dec 6 and Dec 18, and name the key holder.
- **Team:** send the IRB email by Nov 7.

## Round 2 (anonymised cross-examination)

**CSO.**
- **Agrees on:** coded with one key holder; tests per line; templated screens; calendar as a team call; sign-up waits; Apple Watch dropped or "file export".
- **Still drops "school"**, after steelmanning the case for keeping it.
- **Changed:** delete reads "backups within 7 days, once the CTO confirms it". It keeps the Dec 6 lock, because the analysis runs on a frozen dataset.
- **Changed for a new argument:** it now prefers that the AI sees nothing personal for real participants. The team decides.
- **Laptop:** Mac only (D5); the mockups' "Mac and Windows" is untrue.

**CTO.**
- **Agrees on:** coded/pseudonymous, the allowlist, no free text, templated escalation, Dec 18, and sign-up dead until a written answer.
- **Main disagreement:** the cost, 7 vs 18 h, because every line needs a passing test.
- **Changed for new arguments:**
  - drops "school";
  - "within a day" was an overclaim, so it now reads "backups too, within [X] days";
  - adds the Dec 6 lock;
  - 911 and 988 shown now, with CPS as a placeholder, as a team exception;
  - Mac only: "Mac now; Windows later".

**Cost:** the CSO moved to about 18 team-hours, because its 7 left out the tests (argument accepted).

## Red team (the CTO this session)

**The best case against the leading option:**
- careful privacy plumbing for a pilot that may never run (CEO's earlier forecast: P ≈ 0.15 of ≥ 10 real users if IRB approval is needed);
- about 18 h that the end-to-end path needs before Dec 4;
- Mac-only shrinks a 10–30 person pilot;
- "nothing personal" weakens the graded part.

**Pre-mortem: it's Dec 12 and this went badly. The likeliest causes:**
1. No pilot happened.
2. Too little data. Manual test-user emails, 7-day reconnects and a 14-night learning period inside a 2-week pilot left mostly "not enough data".
3. A guessed "[X] days" shipped as a promise.

**Stance:** about 6 derived numbers plus an off switch. Sending nothing personal gains little privacy and loses the graded explanation.

## Synthesis (the CEO, as chair)

**Consensus**
- **Two lines are false and come off now.** "De-identified" becomes "coded". "Never your … school" goes, because Columbia's 2012 policy sends non-anonymous and internet-based projects to review, and review staff may see records ^[inferred].
- **Storage:** one hosted US Postgres database. Email and tokens sit in their own table; study rows carry a random code; one named member holds the link. Nothing per-person in the repo.
- **Retention:** keep to Dec 18, with an analysis lock on Dec 6. "Deleted within a day" is an overclaim while backups take up to 7 days.
- **AI:** a fixed allowlist of derived numbers, never free text. Escalation, consent and delete screens are fixed templates.
- **Sign-up** stays off until course staff answer in writing and a consent form exists.
- **Devices:** Mac-only laptop app. Apple Watch dropped or "file export". Calendar is a team call.
- **Tests:** each page line ships with a test that proves it, about 18 team-hours.
- **Crisis numbers:** 911 and 988 now; CPS a placeholder until the P4 phone check (Nov 20).

**Live disagreements**
1. **What the AI sees for real participants.** The CSO: nothing personal. The CTO: about 6 numbers plus an off switch. **Value.**
2. **Is about 18 h worth it if the pilot may never run?** **Prediction**, settled by the course-staff answer (kill rule below).
3. **The backup window.** **Fact:** pick the vendor by Nov 13 and read its terms. Until then the page says "[X] days".
4. **Showing crisis numbers now** against the standing placeholder rule. **Value.**
5. **A conflict the seats missed:** both want the IRB email by Nov 7, but Heramb set the IRB question aside on Nov 5 (pre-build-briefing §5). **Value.**

**Options**
- **A. Do nothing (0 h).** The false lines stay where testers and graders see them.
- **B. Fix the words only (~3 h).**
- **C. Fix the words now (~3 h), and build the proof only if a pilot is cleared (+~18 h later).** Build the coded tables, the allowlist and the templates now, because the synthetic demo needs them anyway.

**Chair's recommendation (the CEO's, not a decision): C.**
- **Forecast:** P = 0.80 that the Dec 11 demo and writeup carry no false or untested privacy line.
- **Spread:** CTO MEDIUM-HIGH buildable, LOW that a real pilot runs. CSO HIGH on the false lines, MEDIUM on dates. No seat puts a real pilot at even odds or better.
- **Strongest counter:** a late "yes" from course staff leaves no time to build the tests.
- **Kill rule:** no written answer by **Nov 14** → stop the pilot-only work, and the page says "This term's demo uses made-up data. Sign-up is closed." On **Dec 4**, any line without a passing test is cut.

**Decisions for the team** (each defaults to "if no answer, nothing changes"):
1. **Send the IRB question to course staff by Nov 7?** Default: the question stays set aside and sign-up stays off.
2. **For real participants, does the AI see about 6 derived numbers with an off switch, or nothing personal?** Default: working default D3 (a paid tier, derived numbers only).
3. **Show 911 and 988 now, as an exception to the placeholder rule?** Default: all crisis numbers stay placeholders.

**Dissents (unedited)**
- CTO: "no privacy line goes on the page until a test proves it. If the build can't prove a line by Dec 4, cut the line, not the test."
- CSO: "if you overrule me, don't promise 'never your school' or 'de-identified'. If the IRB reviews us, its staff can see our records, and we know who every participant is."

**Clerk's fairness check:** all positions represented: **yes** for the two seats asked. Not covered: how Oura and WHOOP revoke access (no seat checked), so the Disconnect lines cover Google only. UIUX and CMO weren't seated, as asked.

## The page block (landing "Where it goes" + Settings → Data sources)

**Strike now** (false today, per both seats): "the project team sees de-identified study data" · "never your coach, team or school" · "Mac and Windows" · "deleted within a day".

| # | Line | Status |
|---|---|---|
| 1 | "Your data lives in one database on a US server run by [company]." | proposed; the company needs the team (vendor by Nov 13) |
| 1 | "We never put your data in our public code." | proposed (CLAUDE.md rule 7; needs a test) |
| 2 | "We keep your data until Dec 18, 2026." | proposed |
| 2 | "On Dec 18 we delete your name, email, access keys and every row about you." | proposed |
| 2 | "Backups clear within [X] days after that." | needs the team (the host's terms; aim 7) |
| 3 | "An AI service from Anthropic writes the words on your card. It runs on US servers." | proposed (D3; CTO) |
| 3 | "It gets about 6 numbers we pick, like minutes to your next class. It never gets your name, your email or anything you type." | proposed; the calendar example needs the team |
| 3 | "Anthropic deletes what we send within 30 days. It may keep flagged messages up to 2 years. It won't train on them without permission." | confirmed as Anthropic's terms (opened Nov 5); show only if the team picks Anthropic |
| 3 | "We write the safety, consent and delete screens ahead of time. The AI doesn't write them." | proposed |
| 3 alt | "No AI sees your data. Our code fills your numbers into sentences we wrote ahead." | needs the team (the CSO's option) |
| 4 | "The four of us see your numbers under a random code, not your name." | proposed |
| 4 | "One of us, [name], keeps the list that links codes to emails." | needs the team (the name) |
| 4 | "Never your coach or sports team." | proposed |
| 4 | "Course staff see only group totals." | proposed |
| 4 | "If a Columbia review board checks our study, its staff may see records." | needs the team (depends on the course-staff answer) |
| 5 | "Delete erases all your data, including from our study set, until Dec 6." | proposed |
| 5 | "On Dec 6 we lock the study data to analyze it." | proposed; what Delete does after Dec 6 needs the team |
| 5 | "Disconnect ends our access to your Google account. We get no new data from it." | proposed (Google's revoke endpoint) |
| 5 | What happens to data already saved after Disconnect | needs the team |
| 6 | "Sign-up isn't open yet." | confirmed (pre-build briefing) |
| 6 | "We're waiting for a written answer from course staff." | needs the team (only true once the email is sent) |
| 6 | "When sign-up opens, you'll read and sign a consent form. We'll add your Google email to our test list by hand." | proposed |
| 6 | "You'll reconnect your watch account every 7 days. Google's test mode needs it." | confirmed (Testing-mode tokens expire after 7 days) |
| 6 | "For the first 14 nights, it will often say 'not enough data'." | proposed |
| 6 | The study task and the pilot's length | needs the team (D2, Nov 11) |
| 7 | "In an emergency, call 911." | proposed, only as a team exception |
| 7 | "To talk now, call or text 988, any time." | proposed; 988 verified at 988lifeline.org, shown only as a team exception |
| 7 | "Columbia Counseling and Psychological Services: [number]." | needs the team; placeholder until Columbia Health confirms (P4, Nov 20) |
| Laptop | "The laptop app runs on Mac for now. Windows comes later." | proposed (D5; both seats) |
| Rows | Google/Fitbit: "Connected through Google. Reconnect every 7 days." | confirmed |
| Rows | Apple Watch: "Not in this pilot" or "File export only". | needs the team |
| Rows | Calendar: "We'd use only the minutes until your next class." | needs the team |

## Related
- [[13-team/exec-team]] · [[10-trust-safety/privacy-and-consent]] · [[24-synthesis/open-decisions]] · [[13-team/pre-build-briefing]] · [[25-journal/2026-11-05-icp-landing]]
