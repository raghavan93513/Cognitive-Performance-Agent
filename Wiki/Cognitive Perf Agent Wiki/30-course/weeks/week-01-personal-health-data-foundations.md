---
title: "Week 01 — Personal Health Data Foundations"
category: 30-course
tags: [course, week, health-data, wearables, inspectability]
aliases: [Week 01, Lecture 01, Week 1]
sources: ["binf4070-2026/week-01/slides-01.pdf", "binf4070-2026/week-01/lab-01.ipynb", "personal-health-agent.github.io/src/content/weeks/01-kickoff.md"]
summary: What a PHA is, the three data modalities (EHR, sensors, self-report), and why measurement, missingness and inspectable answers matter. Our agent must show evidence and keep gaps visible.
provenance:
  extracted: 0.8
  inferred: 0.18
  ambiguous: 0.02
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 1
date: 2026-09-11
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 01 — Personal Health Data Foundations

> [!info] Fri 11 Sep 2026 · Instructors [[22-entities/xuhai-orson-xu|Xuhai "Orson" Xu]] and [[22-entities/eugene-wu|Eugene Wu]]
> **Objective (course site):** "Get the big picture of personal health assistants and why health data is so fragmented, set up your course Fitbit, and start working with your own data."
> Slides: `binf4070-2026/week-01/slides-01.pdf` (62 pages) · Lab: `binf4070-2026/week-01/lab-01.ipynb`
> Course hub: [[30-course/30-course|BINF 4070 course hub]] · Next: [[30-course/weeks/week-02-clinical-records-and-fhir|Week 02 — Clinical records and FHIR]]

The lecture had four parts (slides p. 2): the new era of AI for daily health, course structure, everyday health data, and important considerations for health data.

## Lecture: key ideas

### 1. The new era of AI for daily health (pp. 3–16)

- **Agents span the health ecosystem** (p. 5). Four stakeholder groups, each with different jobs:
  - *Patients and consumers:* personal health management, prevention, health information, care navigation, longitudinal monitoring.
  - *Clinicians:* documentation, chart summarization, retrieval, decision support, follow-up.
  - *Hospitals and health systems:* scheduling, admin workflows, coding and billing, care coordination.
  - *Researchers and life sciences:* evidence synthesis, cohort identification, trial workflows.
  - A personal health assistant is only one part of this ecosystem (cites Xu et al., *J Biomed Inform* 2026 survey).
- Deployed examples (p. 6): a clinician medical-information platform with cited evidence, ambient documentation that drafts notes for review, and an "AI co-scientist" for hypothesis generation.
- **Market and reach** (pp. 7–8). Grand View Research projects the AI-in-healthcare market growing from about $36.7B (2025) and $50.7B (2026) to about $505.6B by 2033. U.S. reach: 91.0% of adults own a smartphone (2025), 41.1% used a wearable to track health or activity (2024), and 65.0% were offered online record access and opened it at least once (2024).
- **The course's key question** (p. 9): *How can an agent responsibly turn a person's fragmented, longitudinal health data into useful action?* There are two challenges:
  - **Getting data in.** 59% of U.S. adults had online health data from more than one type of provider in 2024, and each portal or app stores and shares data differently.
  - **Turning it into insight.** *Interpretation*: the same value means different things across people, baselines and situations. *Personalized action*: guidance must fit goals, explain uncertainty and recognize when professional care is needed.
- **Industry examples** (pp. 10–11):
  - *Health in ChatGPT* (OpenAI 2026) connects supported medical records and Apple Health, compares results over time and helps users prepare questions for clinicians.
  - *Google Health Coach* combines goals with Fitbit and other authorized data, and uses conversation for check-ins, plan adjustments and longitudinal summaries. Google frames its role as **general wellness, not diagnosis or treatment**.
- **Four capabilities of a PHA** (p. 12):
  1. **Connected data:** retrieve authorized personal records.
  2. **Longitudinal context:** interpret new observations against a *personal baseline*.
  3. **Dynamic interaction:** invite questions, feedback, corrections and refinement.
  4. **Bounded action:** compute, retrieve, draft or escalate within a defined role and safety boundary.
- **Definition of a PHA** (p. 13): it combines authorized personal health data and computational tools to help a person inspect patterns, ask questions and prepare decisions. **Its claims stay traceable to evidence and bounded by intended use.**
  - The course uses **"assistant" for the user-facing role** and **"agent" for one possible implementation**. Many current PHAs use one generative-AI agent or a team of specialized agents. The PHA vision predates LLMs. Further reading: Heydari et al. 2025, "The Anatomy of a Personal Health Agent".
- **Scenarios** (p. 14): spotting a concerning change early (with a defined escalation rule) and day-to-day diabetes support (glucose, meals, medication, activity). In both, **the assistant supports attention and preparation, while diagnosis and treatment stay with qualified experts.**
- Topol quote (p. 15): AI's biggest opportunity is restoring the human connection between patients and doctors. → [[30-course/readings/topol-2019-deep-medicine-intro|Topol 2019 — Deep Medicine]]
- **Course goal** (p. 16): build a PHA whose outputs are **personalized, dynamic, inspectable, safe, and aligned with users**.

### 2. Course structure (pp. 17–28)

- This is the first offering (Fall 2026), planned to run every fall. There are four arcs (p. 18):
  - Foundations: weeks 1–3
  - Data management and grounding: weeks 5–7
  - Human-centered interactive agents: weeks 8, 10–11
  - Responsibility and integration: weeks 13–14
- **Project milestones:**
  - Week 4: pitch and team formation
  - Week 9: proposal with a low-fidelity prototype
  - Week 14: demo and showcase
  - Writeup due Dec 16 (p. 27)
- **Two closed-book quizzes in weeks 7 and 11.** There are no midterm or final exams.
- **Format** (p. 19): Fridays 8:30–11:30 ET in Mudd 825. The lecture runs about 1.5–2 h and the lab about 1–1.5 h. Submit the lab at the end of class for attendance (incomplete is fine), then resubmit with take-home tasks by the next Wednesday. Week 2 slides list 8:40–11:40 and a move to Mudd 1127 from week 3. ^[ambiguous]
- **Staff** (pp. 20–21): Orson Xu (DBMI; HCI, human-centered AI, everyday sensing) and Eugene Wu (CS; data systems, human-data interaction, reliable AI agents). TAs: Millie Wu (office hours Mon 6–7 PM) and Reya Vir (Wed 10–11 AM), both in the CS Lounge.
- **Course materials** (p. 22): the course website, the GitHub repo (slides and Colab notebooks) and CourseWorks (grades, Ed, copyrighted readings).
- **Fitbit Air** (p. 23): optional device loan from week 3. Taking one commits the team to include Fitbit in the final PHA, and using your own data is "a plus". The device must be returned. Synthetic data give a complete path, and borrowing does not affect grades.
- **AI-use policy** (p. 24): AI use is encouraged. Each student gets a prepaid API key (~20M tokens, week 3). **Disclose AI assistance, verify its outputs, and keep identifiable data protected.**
- **Grading** (p. 25). See [[30-course/project-requirements|Project requirements]] for project details.

| Component | Weight | When |
|---|---|---|
| Weekly labs | 5% in class (10 × 0.5%) + 15% take-home (10 × 1.5%) | 10 of 12–13 required |
| Two quizzes | 20% (2 × 10%) | Weeks 7 and 11 |
| Proposal + presentation | 15% | Week 9 |
| Demo / showcase | 15% | Week 14 |
| Final implementation | 15% | Week 15 |
| Writeup + reflection | 15% | Week 15 |

  - An optional pre-week-4 pitch earns +1% extra credit. The late policy gives three grace days per student or team, then 10% off per day.
- **Capstone rules** (p. 26):
  - Teams of 3–4 people.
  - Pick a specific target user group and question.
  - Use **at least one of (1) clinical/EHR, (2) everyday sensors, (3) self-report**. Multiple modalities are preferred.
  - Build an **LLM, RAG or agent component with a usable interface**, in any format (web, mobile, desktop, CLI…).

### 3. Everyday health data: continuous tracking (pp. 31–43)

- **Quantified Self** (p. 32): practices that use personal data to learn about one's health, behaviour or environment. The term was coined in 2007 (Gary Wolf). **A useful self-tracking practice starts with a question the data can help answer.**
- **Diary vs wearable** (pp. 33–34):
  - A diary records chosen moments in the person's own words ("pain woke me at 3 a.m."). Recall, interpretation and effort shape each entry. Weaknesses: no symptom gets recorded, entries are forgotten, or the person is too unwell to write.
  - Wearables collect measures without manual entry ("mobile" or "passive sensing"): activity, sleep, HR/HRV, SpO₂, and emerging BP and glucose. **Longitudinal data make personal baselines and change visible**, but **charging, motion and sync create gaps**.
- **Medical wearables** (p. 35): CGM (within-day glucose dynamics), insulin pumps and ambulatory ECG. Access depends on cost, indication, comfort, training and health-system support. Each device gives one slice of physiology.
- **Larry Smarr case** (p. 36): he tracked about 100 biomarkers. Persistent inflammatory markers stood out from his personal baseline, and symptoms, specialist judgment and colonoscopy then led to colonic Crohn's disease. **The record prompted clinical investigation; it did not make the diagnosis.**
- **Personal health data ecosystem** (p. 37): the set of records and streams that can describe a person's health. Each source is a partial view shaped by *how and why it was produced*. There are three representative modalities:

| Modality | Produced by | Yields | Shape |
|---|---|---|---|
| Clinical / EHR | care delivery | diagnoses, labs, orders, notes | encounter-centred; silent between visits |
| Everyday sensors | mobile, wearable, connected-device and network traces + algorithms | physiological estimates and behavioural features | dense, with gaps |
| Self-report | a person's entry | symptoms and lived context | irregular, subjective |

  - **Choose and combine sources around the user's question. No single modality captures the whole person.**
- **EHR contents** (p. 38): administration (demographics, insurance, claims), conditions and history (diagnoses, problem lists, allergies, immunizations), treatment (orders, procedures, referrals, care plans), measurements (vitals, labs, imaging, ECG) and narrative (notes, discharge summaries, messages). EHRs are **encounter-centred**.
- **Sensors produce features and estimates** (p. 39). Two pipelines:
  - **Behavioural feature:** GPS → location observations → time away from home → possible routine change.
  - **Physiological estimate:** PPG → reflected-light variation → HR/HRV → health monitoring.
  - Algorithms turn observations into derived metrics. **Sensor data are partially observed and must be paired with other evidence before drawing a conclusion.**
- **Self-report** (p. 40) can be structured (surveys, **EMA**), free text (diaries) or media (food, photo, video logs). It captures subjective appraisals (pain, fatigue, mood, stress) that sensors cannot. **EMA** (ecological momentary assessment) repeatedly collects real-time reports in daily life, and prompting near the moment reduces recall error. Self-report is shaped by recall, interpretation, burden and willingness to disclose.
- **Other sources** (p. 41): genomic and molecular assays, environmental and social conditions, pharmacy claims and home devices. **A well-scoped system names the sources it uses and the relevant context it does not capture.**
- **Data fragmentation** (p. 42): one person's data are separated across organizations, platforms, formats, identifiers and access rules. Three standards help align it:

| Standard | Aligns |
|---|---|
| OMOP Common Data Model | observational data for analysis |
| FHIR | resource-based exchange of healthcare information |
| Open mHealth | schemas for mobile and wearable health data |

  - More on FHIR: [[21-concepts/fhir|FHIR]].
- **Integration** (p. 43) combines technical alignment, institutional agreements and governance, and it *makes gaps visible*. Example: the *All of Us* program combines questionnaires, EHRs, digital health tech and biospecimens. Participation, pipelines and access tiers become explicit system components.

### 4. Important considerations for health data (pp. 44–58)

The slides list seven: **measurement, missingness, error, inspectability, access, privacy, governance** (p. 44).

- **Measurement is an estimate** (pp. 45–47). A sensor records a signal, then software filters artifacts, detects patterns and produces the value the user sees.
  - **Wrist PPG** measures changes in reflected light. Arterial pulsation is the main contributor, but tissue and respiration also shape the signal. HR comes from downstream processing.
  - Signal shape depends on the sensor, body location, contact and physiology.
  - **Motion artifact** is distortion caused by the sensor moving relative to the body. It is a leading cause of uncertainty in wrist PPG pulse rate.
  - **Evaluate accuracy in context.** Ask: *which device, which metric, which population, during which activity, against which reference measure?*
- **Missingness may carry information** (p. 48):
  - *Non-informative:* a technical failure unrelated to the person, such as a hardware glitch or app crash.
  - ***Informative missingness*:** the reason for missing data relates to the person or outcome. Examples: an ill person removes the device, or symptoms prevent a clinic visit or diary entry. It can bias analysis and can also reveal the person's state.
  - Handling missing data is an active research area.
- **Error costs depend on context** (p. 49). Four kinds of error:

| Error | What happens | Cost |
|---|---|---|
| False reassurance (false negative) | misses a real concern | delayed attention or care |
| False alarm (false positive) | flags a concern that isn't there | worry, extra cost, **alert fatigue** |
| Measurement error | inaccurate or imprecise value | distorted trends, thresholds and conclusions |
| Algorithmic bias | systematically different error rates across groups | unequal reliability, harm |

  - Ask *who is affected, in what setting, what action follows, and which error is more costly?* **Choose metrics and thresholds based on consequences, not accuracy alone.**
- **Inspectable answers** (pp. 50–52). An inspectable answer shows *each claim's source, time window, transformation, uncertainty, and what evidence could change it*.
  - Worked question: "Why was I so tired this week?" → (1) retrieve sleep, activity, symptom and medication records, (2) align them in time, (3) compare explanations and mark uncertainty, (4) cite supporting, conflicting and missing evidence, and escalate when warranted.
  - **Four layers** of an answer:

| Layer | Example | Requirement |
|---|---|---|
| Observation | "record ends the sleep interval at 05:42" | cite the record |
| Derived metric | "average duration fell 72 min" | show method and window |
| Inference | "short sleep may have contributed" | mark uncertainty |
| Decision | user picks a next step | based on evidence, values, risk and authority |

  - The model answer (p. 51) gives the number and comparison windows, says "may have contributed… data do not establish a cause", names what it *doesn't* know (illness, stress, medication) and says when to revisit.
  - **Presentation forms** (p. 52): visualization (magnitude, trend, comparison), language (evidence, caveats, unknowns), and haptic or audio cues (no screen, little attention). Combine them, e.g. *a watch buzz notifies, and text or speech explains.*
- **Data access: databases** (p. 53). Weeks 5–7 revisit these patterns.

| Pattern | Organizes data as | Example |
|---|---|---|
| Relational DB | typed rows in tables joined by keys (SQL) | MIMIC-IV in PostgreSQL |
| Time-series DB | timestamped points per stream | HR stream in InfluxDB |
| Document DB | nested self-describing JSON | FHIR Observation JSON in MongoDB |
| Graph DB | nodes and edges | drug–condition links in Neo4j |
| Vector index | embeddings retrieved by similarity | clinical-note search with pgvector |

- **APIs vs MCP** (pp. 54–55):
  - An **API** specifies the requests and responses of one service.
  - **MCP (Model Context Protocol)** is a client-server protocol that AI hosts use to *discover and use* server-exposed **resources, tools and prompts**. It often sits over APIs, databases or files.
  - Example flow: *Request* ("show my last 7 days of sleep") → *Discover* a bounded `get_sleep(start, end)` tool → *Validate and call* (the server checks the request and authorization, then calls the health API) → *Return* typed records plus provenance.
  - **Every action must remain permissioned.** MCP returns in weeks 10–11.
- **API example: Google Health API v4** (p. 56) represents a recorded or computed metric as a **`DataPoint`**. Typed payloads cover steps, HR, sleep, `dailyRestingHeartRate`, `dailyHeartRateVariability`, exercise, weight and more. `dataSource` keeps the device, app, platform and recording method. **Provenance records origin, but proprietary algorithm details may stay unavailable.**
- **Privacy** (p. 57):
  - **PHI (Protected Health Information)** is individually identifiable health data held or sent by a *covered entity* or its *business associates*. It covers past, present or future conditions, treatment and payment, and includes SSNs, MRNs, health-plan numbers and billing data.
  - The **HIPAA Privacy Rule** safeguards PHI.
  - **Consumer health apps may sit outside HIPAA.** There, the company's privacy policy and terms govern the data. Map the other laws, contracts and institutional policies that apply.
- **Governance** (p. 58) assigns accountable roles, policies and technical controls across a system's lifecycle. It turns *intended use* into controls in three areas:
  - Purpose and access: function, users, permitted roles.
  - Data and output quality: validation, provenance, review.
  - Lifecycle: retention, deletion, monitoring, change, corrective action.
  - FDA clinical-decision-support (CDS) guidance shows how intended function, user and independent reviewability affect oversight.

## Lab

**"Colab, Health-Data Streams, and a First API Call"** (lab-01.ipynb; slides pp. 59–61). All data are deterministic and synthetic (seed 4070, 11 Sep 2026, America/New_York). No device, download, map service or GPU is needed. API calls skip cleanly without a key.

| Part | What you do | Skill taught |
|---|---|---|
| 1. Colab basics | Run cells, use variables, rerun a counter cell, restart and "Run all" | **Runtime state ≠ page order.** `NameError` after a restart means a defining cell hasn't run. |
| 2.1 Hourly steps | `loc` filter (≥500 steps), `groupby` by time of day, `agg`, bar plot. TODO: `nlargest(3)` busiest hours + daily total, then describe the pattern **without medical interpretation** | Basic pandas over a longitudinal stream. Values are hourly *estimates*, not raw accelerometer data. |
| 2.2 5-min heart rate | Resample hourly with sample counts. TODO: build the expected 5-min index, `reindex` to expose **6 missing rows (13:30–13:55)**, explain why not to fill with zero, then plot with the gap shaded | **A data gap is not a measured zero.** Causes include charging, removal, failed contact or sync. |
| 2.3 GPS | Plot a synthetic trace on a schematic offline campus map. TODO: cite one transition, then say what location reveals and what it can't (the *why*) | Behavioural features from location; limits of inference |
| 3. LLM API | OpenAI **Responses API** with `instructions=` (system prompt) vs `input=` (user prompt), `store=False`, capped output, key from Colab Secrets. Then summarize a **compact pre-computed JSON** (daily total, peak hour, period totals) with a prompt that forbids medical judgment and requires naming a limitation | System vs user prompt. **Send the LLM the smallest data needed**, pre-computed by code. Never paste or print a key. |
| Take-home | Pick one dataset, ask one question, make one labelled plot, and state one thing it reveals and one it can't. Plus an AI-use reflection | Framing a question first (the Quantified Self principle) |

## Readings

- [[30-course/readings/estrin-2014-small-data-n-of-me|Estrin 2014 — Small data, where N = me]] (CACM)
- [[30-course/readings/topol-2019-deep-medicine-intro|Topol 2019 — Deep Medicine (intro)]] (full PDF on CourseWorks; class-use only)

## What this means for us

- **Our modality mix.** We use *everyday sensors* (watch HR, sleep, overnight HRV, steps) plus laptop behaviour traces (the slides list "network traces" and mobile sensing under sensors) and *self-report* (fatigue check-in). That satisfies the "at least one source" rule. EHR is not needed. See [[05-data/data-sources|Data sources]]. ^[inferred]
- **The Fitbit trade-off.** Borrowing the Fitbit Air commits us to including Fitbit in the final system. That fits our watch-context design, but it ties the watch adapter to Fitbit / Google Health (whose `DataPoint` already carries `dailyRestingHeartRate` and `dailyHeartRateVariability`) rather than HealthKit or Health Connect. This is an input to [[24-synthesis/open-decisions|Open decisions]]. ^[inferred]
- **PPG motion artifact.** Watch HR is least reliable exactly when the student is walking. Our walk-vs-sedentary logic should rely on steps rather than HR spikes, and the [[04-agent-engine/performance-model|performance model]] should treat HR as context. This matches our "HRV is daily context, not a live focus score" rule ([[21-concepts/heart-rate-variability|HRV]]). ^[inferred]
- **Informative missingness.** A student taking the watch off, or skipping a check-in, may itself signal fatigue or disengagement. Our pipeline already keeps missing as missing ([[05-data/data-pipeline|Data pipeline]]). We could also log *reason codes* (charging vs off-wrist vs denied) so the model can test whether missingness predicts outcomes. ^[inferred]
- **Error costs.** For a break nudge, false alarms cause **alert fatigue** and erode trust, while false reassurance costs only a less productive session. That argues for conservative thresholds and the rate limits in [[04-agent-engine/multi-agent-decision|Multi-agent decision]]. ^[inferred]
- **Inspectable answers.** The four-layer pattern (observation → derived metric → inference → user decision) maps directly onto what our interface must show: action, reason, sources and uncertainty ([[08-frontend/student-interface-and-feedback|Student interface and feedback]]). Use the p. 51 answer as a template for our rationale text. ^[inferred]
- **Presentation forms.** A watch buzz or laptop notification for the nudge, with text explaining why, mirrors our "notify, then explain" design. ^[inferred]
- **Minimal data to the LLM.** The lab's compact pre-computed summary is exactly our rule that only minimal derived context reaches the LLM ([[13-trust-safety/privacy-and-consent|Privacy and consent]]). ^[inferred]
- **MCP framing.** Exposing bounded tools like `get_sleep(start, end)` to our [[22-entities/langgraph|LangGraph]] agents is the course-endorsed pattern, and it previews weeks 10–11. ^[inferred]
- **HIPAA scope.** As a consumer wellness tool that isn't a covered entity, we are probably outside HIPAA. The slide's point still applies: our own privacy policy and consent flow define what we may do. This is consistent with our wellness (non-medical) framing. ^[inferred]

## Likely quiz material

- **PHA definition**, and the difference between *assistant* (user-facing role) and *agent* (implementation).
- **Four PHA capabilities:** connected data, longitudinal context, dynamic interaction, bounded action.
- **Five output properties:** personalized, dynamic, inspectable, safe, aligned.
- **Three modalities** with what each contributes and its temporal shape: EHR is sparse and encounter-centred; sensors are dense with gaps; self-report is irregular and subjective.
- **Quantified Self:** coined in 2007, and it starts with a question.
- **EMA:** definition, and why near-moment prompts reduce recall error.
- **Data fragmentation**, plus OMOP CDM vs FHIR vs Open mHealth.
- **A derived metric is an estimate.** PPG basics and motion artifact.
- **The five accuracy-in-context questions:** device, metric, population, activity, reference.
- **Informative vs non-informative missingness**, with an example of each.
- **The four error types** and how to choose thresholds by consequence. Alert fatigue.
- **Four layers of an inspectable answer**, and what each must show.
- **The five database patterns** with an example of each.
- **API vs MCP.** MCP exposes resources, tools and prompts.
- **PHI, covered entity, HIPAA Privacy Rule**, and why consumer apps may fall outside it.
- **Three governance areas:** purpose and access, data and output quality, lifecycle.

## Sources

- `binf4070-2026/week-01/slides-01.pdf`:
  - PHA definition p. 13, capabilities p. 12, course goal p. 16
  - Ecosystem pp. 37–43
  - Measurement pp. 45–47, missingness p. 48, error p. 49
  - Inspectability pp. 50–52, databases p. 53, MCP pp. 54–55, Google Health API p. 56
  - PHI p. 57, governance p. 58
  - Logistics pp. 18–27
- `binf4070-2026/week-01/lab-01.ipynb`: all cells read (Parts 1–3, take-home, troubleshooting, reflection).
- `personal-health-agent.github.io/src/content/weeks/01-kickoff.md`: date, objective and readings.
- Slide images viewed: pp. 7, 54–56. All other pages were read via text extraction.
