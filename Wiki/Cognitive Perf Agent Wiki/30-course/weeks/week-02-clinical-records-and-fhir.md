---
title: "Week 02 — Clinical Records and FHIR App Design"
category: 30-course
tags: [course, week, clinical-data, fhir, interoperability]
aliases: [Week 02, Lecture 02, Week 2, Health Data Sources I]
sources: ["binf4070-2026/week-02/slides-02.pdf", "binf4070-2026/week-02/lab-02.ipynb", "personal-health-agent.github.io/src/content/weeks/02-data-sources-clinical.md"]
summary: How EHRs encode care (codes, notes, FHIR resources), how SMART on FHIR grants scoped access, and how to design a bounded app. For us, keep status, time, source, and missing data visible.
provenance:
  extracted: 0.8
  inferred: 0.18
  ambiguous: 0.02
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 2
date: 2026-09-18
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Week 02 — Clinical Records and FHIR App Design

> [!info] Fri 18 Sep 2026 · "Health Data Sources I: Clinical Records and FHIR App Design" · [[22-entities/xuhai-orson-xu|Orson Xu]] and [[22-entities/eugene-wu|Eugene Wu]]
> **Objective (course site):** "Learn how clinical records, wearables, and self-report data are structured, and how FHIR and medical codes let a computer read a patient's record."
> Slides: `binf4070-2026/week-02/slides-02.pdf` (82 pages) · Lab: `binf4070-2026/week-02/lab-02.ipynb`
> Prev: [[30-course/weeks/week-01-personal-health-data-foundations|Week 01]] · Next: [[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03 — Wearable sensors]] · Hub: [[30-course/30-course|Course hub]]
> Deep dives: [[21-concepts/fhir|FHIR and SMART on FHIR]] · [[21-concepts/medical-coding-systems|Medical coding systems]]

Outline (p. 2): a recap of week 1, health data in different modalities and shapes, clinical records preserving workflow and semantics, FHIR exposing data through bounded interfaces, and designing the FHIR connection first.

## Lecture: key ideas

### 0. Logistics recap (pp. 3–12, 41, 78)

- The class moves to **Mudd 1127 from week 3**, at 8:40–11:40 ET (p. 4).
- Grading, the capstone rules and the AI policy are repeated from week 1. See [[30-course/weeks/week-01-personal-health-data-foundations|Week 01]].
- **Fitbit loan** (pp. 11, 41, 78): sign an electronic loan form and upload ID, with devices handed out in week 3. Including Fitbit in the final PHA is "encouraged". Damage may make you responsible for repair or replacement, and synthetic data carry the same grading criteria.
  - The slides disagree on the ID type: p. 41 says government-issued ID, while p. 78 says student ID. ^[ambiguous]

### 1. Health data with different modalities and shapes (pp. 13–18)

- **One question meets different records** (p. 14). Example question: "Why has my fatigue worsened this month?" Each modality contributes differently:
  - **EHR:** a CBC order and result after a visit, giving care context and medical findings.
  - **Sensors:** minute-level HR estimates with gaps, giving repeated timing and change.
  - **Self-report:** a nightly fatigue rating plus a note, giving lived experience.
  - No single row answers the question. Combined, they give a richer picture.
- **Three rhythms over the same period** (p. 16):
  - EHR = **sparse encounters** (visit, then lab, then a long silence)
  - Sensors = **dense but with gaps**
  - Self-report = **irregular**
- **Data shape is more than format** (p. 17). A data source includes *who or what produced it, for what purpose, under which conditions, and after which transformations*. A clinician-entered diagnosis, a vendor-derived pulse estimate and a patient-entered fatigue score are **not interchangeable facts**. Each modality has a typical record shape:

| Modality | Record shape | Key fields |
|---|---|---|
| EHR | FHIR Observation (a result or assertion) | effective[x], issued, status, performer, code, unit |
| Wearable | timestamped sample or interval | measured or derived value, observation time, device, method |
| Self-report | response event | prompt and response time, item, scale, recall window |

- **Missingness has different meanings by source** (p. 18):
  - *No lab:* the test was not ordered, not completed, done elsewhere, or not yet returned.
  - *No wearable value:* off-wrist, poor signal, delayed sync, or no access.
  - *No diary entry:* low burden, high burden, forgetfulness, or symptoms that made responding hard.
  - **Treat each absence as unknown until more evidence arrives.**

### 2. Clinical records preserve workflow and semantics (pp. 19–39)

An EHR records care as **a packet of events, orders, results, codes and narrative** (p. 19).

**History**

| When | Milestone |
|---|---|
| pre-EHR | Paper chart: one local dossier per patient; retrieval and sharing meant moving paper (p. 20) |
| 1968 | **COSTAR** at MGH / Harvard Community Health Plan, a computer-stored ambulatory record (p. 21) |
| late 1960s–70s | **HELP** (Utah), **Regenstrief** (Indiana), **PROMIS** (Vermont): structured records, orders, reminders, decision support, mostly within one institution |
| 1987 | **HL7** formed. "Level Seven" = the *application layer* of the OSI model (p. 22) |
| 1987 / 1989 / 1994 | Columbia's Center for Medical Informatics founded (1987), integrated system live with a clinical data repository, terminology and decision support (1989), becomes DBMI (1994). DBMI is the 2nd-oldest such department in the U.S.; Utah's (1972) is the oldest (p. 23) |
| 2009 | **HITECH Act** funds certified-EHR adoption. Incentive payments from 2011; Medicare required **"meaningful use"** (e.g. e-prescribing) (p. 22) |
| 2008 → 2024 | Hospitals with a basic EHR: fewer than 1 in 10 → nearly all. Office-based physicians: 42% (2008) → **95% any EHR / 91% certified** (2024) (pp. 22, 24) |

- **Adoption alone does not ensure cross-site completeness, aligned meaning or usable exchange** (p. 24).

**What a modern visit produces** (p. 25): a record packet in which the Patient identity links an Encounter → Condition → MedicationRequest → Observation → Procedure, plus a clinical note (symptoms, negation, uncertainty, plan). *Each artifact has its own author, status, timestamp and reason for existing.*

**Coding systems** (pp. 26–35). Clinical systems need stable identifiers because "high blood pressure", "HTN" and local conventions all mean the same thing. Full detail is on [[21-concepts/medical-coding-systems|Medical coding systems]].

| System | Codes for | Lecture example |
|---|---|---|
| ICD-10-CM | diagnosis *classification* (reporting, billing, epidemiology) | E11.9 type 2 diabetes w/o complications; I10 essential hypertension |
| SNOMED CT | clinical *concepts and relationships* (care documentation) | 44054006 type 2 diabetes mellitus; 38341003 hypertensive disorder |
| RxNorm | normalized *medications* (ingredient + strength + dose form) | 861007 metformin HCl 500 mg oral tablet; 197361 amlodipine 5 mg oral tablet |
| LOINC | *tests and observations*, i.e. the question a result answers | 4548-4 HbA1c; 718-7 hemoglobin; 2345-7 glucose |
| CPT | *services and procedures* (AMA) | 99213 established-patient office visit; 93000 12-lead ECG |

- **One diabetes visit fans out to five codes** (p. 34): SNOMED 44054006 (problem), ICD-10-CM E11.9 (diagnosis class), RxNorm 861007 (medication), LOINC 4548-4 (HbA1c test), CPT 99213 (office service). The ICD code needs separate documentation of "without complications", so **the SNOMED code alone does not justify it**.
- **Code identity is `system + code`** (p. 35), e.g. `http://loinc.org | 4548-4`. A display label helps a human reader, and source text keeps local wording. These identify *terminology concepts*, not a patient's record.
- **Notes carry more than codes** (p. 36). Example note: "Reports worsening fatigue for three weeks, denies chest pain, will check TSH and CBC." It holds four claims: a symptom, a duration, a **negation** and a **plan**. One diagnosis field cannot hold all four.
  - **Clinical NLP** extracts structure while keeping time, negation and uncertainty. The slides cite the Meystre et al. 2008 review.
- **Clinical data need more context than codes** (p. 37):
  - A vital sign is entered inside an encounter workflow.
  - A result needs a unit, time, status, method and performer.
  - A problem-list entry may be active, resolved, duplicated or unreconciled.
  - A note can preserve uncertainty that a structured field cannot.
- **Why meaning still diverges** (p. 38):
  - Base FHIR allows optional fields, extensions and several terminology bindings.
  - **Profiles and implementation guides** narrow those choices, but jurisdictions and vendors adopt different ones.
  - Local codes, units, status rules and mappings still vary. `value: 7.0` means nothing without a code and unit, and even with both, two sites may differ on time window or status.
  - **A standard aligns syntax. Shared profiles, terminologies and data-quality rules are needed to align meaning.**
- **Why exchange still struggles** (p. 39). Four problems:
  - **Identity and discovery:** find the endpoint and match the right patient.
  - **Access control:** authenticate and authorize the purpose and the data.
  - **Governance:** consent directives, organizational policy, data-use agreements and law.
  - **Operations:** interfaces, versions, mappings and clinical processes.
  - Usable exchange needs a technical connection, correct identity, permitted access and **operational trust**.

### 3. FHIR exposes data through bounded interfaces (pp. 42–70)

The full notes, with JSON examples, are on [[21-concepts/fhir|FHIR]]. Headlines:

- **FHIR** ("fire") = Fast Healthcare Interoperability Resources, HL7's exchange standard. Without it, every app-to-EHR link would need custom answers about shape, identity, linking, querying and code systems (p. 43).
- **Building blocks** (p. 44):
  - A **resource** is a typed record such as Patient or Observation.
  - An **interaction** is read, search, create or update.
  - An **address** has the form `[base]/[type]/[id]`, e.g. `GET /fhir/Patient/patient-001`. The response is JSON or XML.
- **Scope boundaries** (p. 45). FHIR specifies structures, identifiers, references, terminology hooks, interactions and conformance artifacts (profiles, CapabilityStatement). It leaves *which* resources a server supports, whether data are complete or correct, UI, workflow, identity matching and access decisions to implementations. **A shared contract does not make every implementation or every record the same.**
- **Four properties of a resource** (p. 46): identity (a logical URL), a declared type, a defined structure (elements, types, cardinalities, constraints) and a version identity. **A resource is one exchangeable unit, not a whole chart.**
- **Hierarchy** (pp. 47–48): Resource → DomainResource → Patient, Observation, Condition, MedicationRequest… Bundle, Binary and Parameters derive directly from Resource. All resources carry `id`, `meta`, `implicitRules` and `language`. DomainResource adds `text`, `contained`, `extension` and `modifierExtension`.
- **R4 = Release 4, version 4.0.1 (2019), with 145 resource types** across clinical work and system support (pp. 49–50).
- **Four anchor resources** (pp. 51–56):
  - **Patient:** who the record is about.
  - **Condition:** the asserted problem, not the evidence for it.
  - **MedicationRequest:** what was *ordered*. It is distinct from Dispense (supplied) and Administration (given).
  - **Observation:** a result or assertion. **It is evidence, not a diagnosis.**
- **References** (p. 57): a normal reference points to another resource with its own identity (`subject.reference = "Patient/patient-001"`). A *contained* resource lives inside its parent with a local `#id`.
- **Read vs search** (pp. 58–61). Read returns one resource. **Search always returns a Bundle, even with zero or one match.** A search example: `GET /Observation?patient=patient-001&code=http://loinc.org|2345-7&date=ge2026-01-01&date=le2026-03-31`. The Bundle *type* sets its meaning: `searchset`, `transaction` (atomic) or `history`. **Check `type` and parse `entry.resource` before flattening.**
- **CodeableConcept** (pp. 62–63) is the *carrier*, not the vocabulary. It holds `coding[]` (each with system, code, display) plus `text`. The resource field and profile decide which terminology is allowed.
- **Safe rendering keeps provenance** (p. 64):
  - Too strong: "You have hypertension."
  - Faithful: "Your record lists an active Condition coded as hypertensive disorder, with onset recorded as June 15, 2022."
- **SMART on FHIR** (pp. 65–70). SMART = Substitutable Medical Applications and Reusable Technologies. FHIR alone does not say how to discover OAuth endpoints, get patient context or request bounded permissions, so SMART adds:
  - **Discovery** via `[base]/.well-known/smart-configuration`, with `iss` and `launch` for EHR launch.
  - **OAuth 2.0** authorization code flow with **PKCE**.
  - **Launch context.**
  - **Scopes** like `patient/Observation.rs`.
  - The same protocol serves an app embedded in the EHR, a separate tab or window, or a native phone app (a standalone launch) (p. 69).

### 4. Design the FHIR connection first (pp. 71–77)

Move from a clinical question to a bounded **data, authorization and safety contract** *before* choosing implementation details.

- **Start with one user decision** (p. 72). Scenario: a care manager, before a follow-up visit, reviews recent BP readings next to active antihypertensive orders. Define four things first:
  1. The user and the moment.
  2. The decision supported.
  3. The minimum evidence needed.
  4. The **unsafe shortcut**: here, treating an order as medication use, or one high reading as a diagnosis.
  - *A useful app begins with a workflow decision, not a list of resources the server happens to expose.*
- **Data contract** (p. 73):

| Evidence | Resource | Must preserve |
|---|---|---|
| Person in context | Patient / launch context | patient identifier; never match by display name |
| BP readings | Observation | LOINC code, status, effective time, units, systolic and diastolic components |
| Medication orders | MedicationRequest | RxNorm coding, status, intent, authored time |
| Visit context | Encounter reference | id, time, location, organization |

- **Boundary map** (p. 74): clinician → EHR/portal (passes the FHIR address and launch reference) → app ↔ authorization server (request, code, token) and app ↔ FHIR server (token + query, records).
  - One EHR may provide both servers.
  - The app shows records *with sources* and makes missing data visible.
  - Decide what the app may read, retain, log and display. **Keep tokens and identifiable clinical content out of ordinary logs.**
- **Request access by job, not convenience** (p. 75): read/search Observation and MedicationRequest only, using the launch context rather than searching all patients, and with no write access. The scopes are `patient/Observation.rs` and `patient/MedicationRequest.rs`. **The server may grant less, and the app must honor the returned scope.**
- **Design the unhappy paths first** (p. 76):

| Situation | Safe behaviour |
|---|---|
| Scope not granted | disable the feature and explain the access boundary |
| Search returned nothing | say "no matching record returned", not "normal" |
| Observation preliminary | show the status; don't present it as final |
| Unfamiliar unit or code | keep the source value and label; don't guess a conversion |
| Unresolvable reference | keep the record visibly incomplete; don't join by name |
| Token expired | re-authorize through the approved flow; never expose or paste the token |

- **Testing ladder before real patients** (p. 77):
  1. Design review (task, records, permissions).
  2. Local example files, covering normal and missing records.
  3. A public sandbox FHIR server with synthetic patients.
  4. The partner organization's test environment (local rules, policies, workflow).
  5. Security and governance approval, with monitoring and support.
  - *Each stage tests something the previous one could not. Fix problems with synthetic records before seeking real data.*

## Lab

**"Make a Readable Visit Summary"** (lab-02.ipynb; slides pp. 79–81). One synthetic patient, *Alex Rivera* (`Patient/patient-001`), is used throughout. The lab needs only the standard library: no EHR account, API key or device.

| Part | Task | Skill / lesson |
|---|---|---|
| 1. Read records | Walk a Patient, an Observation (HbA1c, LOINC 4548-4, 6.2 %, `final`) and a MedicationRequest (`active` order) as Python dicts. Follow `observation["code"]["coding"][0]["code"]`. Match the patient by **reference, not name**. TODO `find_rxnorm_coding`: select the RxNorm coding **by `system`, not list position**. A local catalog code with the same digits "861007" must not match. Explain why an active order ≠ taking the drug | `system + code` identity. Code ≠ value (4548-4 vs 6.2). `effectiveDateTime` (when the result relates to) ≠ `issued` (when released). Keep the timezone. The visit packet is a dict, *not* a FHIR Bundle |
| 2. Debug a summary | A teammate's `draft_result_fields` runs but has **three bugs**: `value` defaults to `0` when missing; `unit` is read from the global `observation` instead of `obs`; `time` uses `issued` instead of `effectiveDateTime`. Diagnose one in two sentences, then repair all three | **Plausible-looking output can silently lie.** Check defaults and field sources. Missing must stay `None`; never borrow a unit from another record |
| 3a. Incomplete results | Implement `safe_result_line` with a priority policy: (1) a status other than final or preliminary → "not displayed" + status, no value (highest priority); (2) value `None` → "Result unavailable" + status; (3) no unit → value + "unit unavailable"; (4) otherwise value, unit, status. Tests include `entered-in-error`, `cancelled`, preliminary + missing, and a zero value | **Missing ≠ zero.** Final ≠ normal. Preliminary stays labelled. `dataAbsentReason: unknown` means a record arrived with no value, which differs from no record at all |
| 3b. Narrower grant | Requested `patient/Observation.rs` but granted only `.r`. Decide: read the known `Observation/a1c-001` = allowed; search = not allowed; update (`u`) = not allowed. Write a user message that explains the limit **without implying there are no results** | Honour the returned scope. Degrade gracefully |
| Take-home A | `select_latest_result(records, patient_ref, system, code)` over an unordered queue with distractors (another patient, another test, a **local system reusing code "2345-7"**). Match patient and system+code *in the same coding entry*, then choose the greatest `effectiveDateTime`. **Don't filter by status or value**: the newest may be preliminary or missing and must still win | "Most recent" = measurement time, not list order. Don't hide the latest result by falling back to an older numeric one |
| Take-home B | `snapshot_at(events, cutoff)`: rebuild what the app knew at 09:15 and 10:00 from a shuffled receipt log with repeated ids (3 versions of `glucose-new`, 2 of `a1c-001`) and a late-arriving older measurement. Keep one version per id, the last *received* at or before the cutoff | **Two clocks:** `received_at` (app envelope) vs `effectiveDateTime` (measurement), with `issued` as the source release time. No future leakage. A late arrival is not a newer measurement |
| Reflection | What you learned about keeping context in a FHIR summary; AI use and what you checked yourself | — |

## Readings

- [[30-course/readings/mandel-2016-smart-on-fhir|Mandel et al. 2016 — SMART on FHIR]] (JAMIA)
- [[30-course/readings/rajkomar-2018-deep-learning-ehr|Rajkomar et al. 2018 — Scalable and accurate deep learning with EHRs]] (npj Digital Medicine)

## What this means for us

- **We don't need EHR data.** Our sources are sensors plus self-report ([[05-data/data-sources|Data sources]]), which satisfies the capstone rule. FHIR is still useful as a *shape* to borrow, not an integration target. ^[inferred]
- **Lab 2 ≈ our pipeline.** The `snapshot_at` exercise (`received_at` vs `effectiveDateTime`, no future updates) is the same discipline as our `observed_at` / `received_at` fields and the "only use data that arrived before the recommendation" rule in [[05-data/data-pipeline|Data pipeline]]. We should unit-test our feature windows the same way: shuffled input, repeated ids, a late arrival. ^[inferred]
- **Status on every record.** Our canonical schema has a `quality_status` field but no FHIR-style lifecycle status (preliminary vs final). Watch summaries such as overnight HRV and sleep are often revised after a later sync. Storing a version or status per record, plus replace-by-id semantics, would stop the agent citing a stale value. ^[inferred]
- **Code identity = system + code.** If we name metrics like `resting_heart_rate`, we should namespace them (our own system URI, or LOINC where one exists) so a metric name never collides across sources. That makes later export to FHIR Observation or Open mHealth straightforward. ^[inferred]
- **Unhappy-path table → our UI states.** The table maps directly onto our states:
  - "Scope not granted" = the student denied a data type.
  - "No match" = no data synced. Say "no recent watch data", never "normal".
  - "Preliminary" = a sync is still in progress.
  - This reinforces "Not enough data" in [[08-frontend/student-interface-and-feedback|Student interface and feedback]]. ^[inferred]
- **Faithful rendering.** The p. 64 pattern ("your record lists…") is the style our Evidence/Action agents should use: "Your watch recorded 5 h 48 min of sleep (synced 07:10)", not "You are sleep-deprived". This links to the LLM safeguards in [[04-agent-engine/multi-agent-decision|Multi-agent decision]]. ^[inferred]
- **Scoped access by job.** "Request access by job, not convenience" is the course's version of our data-minimization rule ([[10-trust-safety/privacy-and-consent|Privacy and consent]]). Request only the Google Health / HealthKit data types the model uses, and honour partial grants. ^[inferred]
- **Testing ladder.** Synthetic data → sandbox → pilot with consent mirrors the staged plan in [[02-product/roadmap|Roadmap]] and [[12-research/evaluation-plan|Evaluation plan]]. ^[inferred]
- **Design starts with one user decision.** Ours is "continue / walk / break, right now, for this student". The "unsafe shortcut" to avoid is treating high HR or low HRV as fatigue on its own. ^[inferred]

## Likely quiz material

- **The three rhythms:** EHR sparse, sensors dense with gaps, self-report irregular. *Data shape ≠ format.*
- **Per-source meanings of a missing value**, and the rule "treat absence as unknown".
- **HL7** (1987; "Level Seven" = OSI application layer), **HITECH** (2009; meaningful use; incentives from 2011), and **COSTAR** (1968).
- **The five code systems:** purpose plus one example code each. Know that SNOMED CT and ICD-10-CM complement each other, and that **digits carry no meaning** in SNOMED, RxNorm, LOINC and CPT, while ICD-10-CM's chapter letter and category do.
- **LOINC check digit** (Mod-10 / Luhn) and the **six-part name**: Component, Property, Time, System, Scale, Method.
- **Code identity = system + code.** CodeableConcept is the carrier, not the vocabulary.
- **A standard aligns syntax; profiles, terminologies and data-quality rules align meaning.**
- **The four exchange problems:** identity and discovery, access control, governance, operations.
- **FHIR:** what it specifies vs leaves to implementations. The four properties of a resource. Resource vs DomainResource. R4 = 4.0.1 with 145 types.
- **Patient, Condition, Observation and MedicationRequest semantics.** Observation = evidence, not a diagnosis. Request ≠ Dispense ≠ Administration.
- **Normal vs contained references.**
- **Read vs search.** Search → Bundle even with 0 or 1 match. Bundle types: searchset, transaction, history.
- **SMART:** what it adds to FHIR, the discovery URL, `iss`/`launch`, PKCE (why a stolen code is useless), and scope syntax `patient/Observation.rs`.
- **The design method:** user decision → data contract → boundary map → minimal scopes → unhappy paths → testing ladder.

## Sources

- `binf4070-2026/week-02/slides-02.pdf`:
  - Modalities pp. 13–18
  - EHR history pp. 20–24, record packet p. 25
  - Coding pp. 26–35, notes p. 36, divergence pp. 37–39
  - FHIR pp. 43–64, SMART pp. 65–70
  - App design pp. 72–77, lab pp. 79–81
- `binf4070-2026/week-02/lab-02.ipynb`: all 42 cells read.
- `personal-health-agent.github.io/src/content/weeks/02-data-sources-clinical.md`: date, objective and readings.
- Slide images viewed: pp. 24, 69. All other pages were read via text extraction.
