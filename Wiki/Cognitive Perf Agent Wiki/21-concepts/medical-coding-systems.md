---
title: "Medical Coding Systems"
category: 21-concepts
tags: [concept, clinical-data, terminology, interoperability]
aliases: [ICD-10-CM, SNOMED CT, RxNorm, LOINC, CPT, clinical terminologies, code systems]
sources: ["binf4070-2026/week-02/slides-02.pdf", "binf4070-2026/week-02/lab-02.ipynb"]
summary: The five code systems from week 2 (ICD-10-CM, SNOMED CT, RxNorm, LOINC, CPT), what each identifies, how codes are built, and why identity is system + code. Quiz-ready examples.
provenance:
  extracted: 0.88
  inferred: 0.12
  ambiguous: 0.0
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 2
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# Medical Coding Systems

Clinical systems need **stable identifiers**, because the same idea can be written as "high blood pressure", "HTN" or a local convention (week 2 slides p. 26). Code systems give a common language. **Their purposes differ even where their clinical coverage overlaps, and the code system tells you how to interpret an identifier.**

Taught in [[30-course/weeks/week-02-clinical-records-and-fhir|Week 02 — Clinical records and FHIR]]. How codes travel inside records is on [[21-concepts/fhir|FHIR]].

## The five systems at a glance (p. 26)

| System | Full name / owner | Identifies | Purpose | Lecture examples |
|---|---|---|---|---|
| ICD-10-CM | International Classification of Diseases, 10th Rev., Clinical Modification (U.S.; CDC/NCHS) | diagnoses | **classification** for reporting, reimbursement, epidemiology | E11.9 type 2 diabetes w/o complications; I10 essential (primary) hypertension |
| SNOMED CT | Systematized Nomenclature of Medicine — Clinical Terms (SNOMED International) | clinical concepts **and their relationships**: findings, disorders, procedures, body structures… | detailed **clinical terminology** for care documentation | 44054006 type 2 diabetes mellitus; 38341003 hypertensive disorder, systemic arterial |
| RxNorm | U.S. National Library of Medicine normalized drug vocabulary | medication concepts | connect drug names across vocabularies | 861007 metformin hydrochloride 500 mg oral tablet; 197361 amlodipine 5 mg oral tablet |
| LOINC | Logical Observation Identifiers Names and Codes (Regenstrief Institute) | tests and observations: **the question a result answers** | name lab tests and observations | 4548-4 HbA1c; 718-7 hemoglobin; 2345-7 glucose (serum/plasma) |
| CPT | Current Procedural Terminology (American Medical Association) | professional services and procedures | U.S. reporting of services | 99213 established-patient office visit; 93000 routine 12-lead ECG with interpretation |

## ICD-10-CM: diagnosis classification (p. 27)

This is the U.S. diagnostic classification, and **its structure is meaningful**. Reading `E11.9`:

- **E** is the chapter range E00–E89: endocrine, nutritional and metabolic diseases.
- **11** completes category **E11**: type 2 diabetes mellitus.
- **.9** is the subcategory: without complications.

A second example is `I10` = essential (primary) hypertension.

## SNOMED CT: clinical concepts (p. 28)

SNOMED CT is a clinical *terminology*: identifiers, names and relationships that represent clinical meaning. Example code `44054006`:

- Fully specified name: *Diabetes mellitus type 2 (disorder)*.
- U.S. preferred term: *Type 2 diabetes mellitus*.
- Both names describe **one concept with the same numeric identifier**.
- **The digits identify the concept but carry no meaning.** Descriptions and relationships to other concepts are stored separately and cannot be read from the digits.

## SNOMED CT vs ICD-10-CM: complementary (p. 29)

| | SNOMED CT | ICD-10-CM |
|---|---|---|
| Main purpose | represent clinical concepts and their relationships (care documentation) | classify diagnoses for reporting and reimbursement (billing, epidemiology) |
| Example | 44054006 type 2 diabetes mellitus | E11.9 type 2 diabetes mellitus without complications |

- One diabetes visit may need *both*: a clinical problem entry and a diagnosis classification for reporting.
- **`44054006` alone does not establish "without complications".** Mapping SNOMED → ICD-10-CM can need more clinical context and may produce **more than one code** (the NLM SNOMED CT to ICD-10-CM Mapping Project).

## RxNorm: normalized medications (p. 30)

- The name comes from "Rx", from the Latin *recipe* (a prescription or treatment order).
- **Normalized form = ingredient + strength + dose form**, e.g. *metformin hydrochloride 500 mg oral tablet*.
- **RxCUI** (RxNorm Concept Unique Identifier) is the machine-readable code for one normalized drug concept. It lets systems map different source names to the same medication meaning.
- **The digits do not encode ingredient, strength or dose form.** Examples: `861007` = metformin HCl 500 mg oral tablet; `197361` = amlodipine 5 mg oral tablet.
- FHIR system URI (lab 2): `http://www.nlm.nih.gov/research/umls/rxnorm`.
- Lab 2 note: the RxNorm normalized name ("metformin hydrochloride 500 MG Oral Tablet") differs slightly from the clinic's source text ("Metformin 500 mg oral tablet"). Keep both.

## LOINC: tests and observations (pp. 31–32)

LOINC identifies **the question a result answers**. **The measured value is stored separately.** In lab 2, `4548-4` is the test and `6.2 %` is the result.

**Code structure: `4548-4`**

- `4548` is an **opaque serial identifier** (3–8 digits) and does not describe the test.
- `-4` is a **check digit** computed from 4548 with **Mod-10 (Luhn)**. It catches copying errors: mistyping `4549-4` makes the recomputed digit disagree. **It carries no clinical meaning.**

**Six-part Fully-Specified Name.** This is separate from the code and lives in the LOINC database entry. For 4548-4 the name is `Hemoglobin A1c/Hemoglobin.total:MFr:Pt:Bld:Qn:`.

| Part | Value | Meaning |
|---|---|---|
| Component | Hemoglobin A1c/Hemoglobin.total | what is measured (here a ratio) |
| Property | MFr | mass fraction |
| Time | Pt | one point in time |
| System | Bld | blood (specimen) |
| Scale | Qn | quantitative |
| Method | *(blank)* | no particular method specified |

LOINC codes used in the course: **4548-4** HbA1c, **718-7** hemoglobin (p. 54), and **2345-7** glucose [mass/volume] in serum or plasma (p. 59 and the lab). The FHIR system URI is `http://loinc.org`.

## CPT: services and procedures (p. 33)

- The AMA's U.S. language for reporting professional services and procedures.
- **Category I** codes are generally five digits, organized into broad service sections.
- **Do not parse the digits.** In `99213`, the digits `9|9|2|1|3` carry no independent meaning.
- **The code set changes annually, so the code-system version matters.**
- Examples: `99213` = established-patient office or outpatient visit; `93000` = routine 12-lead ECG with interpretation and report.

## Which codes carry meaning in their digits?

| System | Digits meaningful? |
|---|---|
| ICD-10-CM | **Yes**: the chapter letter, category and subcategory are hierarchical |
| SNOMED CT | No: an opaque concept id |
| RxNorm (RxCUI) | No |
| LOINC | No: an opaque serial plus a Luhn check digit (validation only) |
| CPT | No: don't parse individual digits |

## One visit fans out to five codes (p. 34)

Example: a type 2 diabetes visit.

| Purpose in the visit | System | Code |
|---|---|---|
| Clinical problem | SNOMED CT | 44054006 |
| Diagnosis class | ICD-10-CM | E11.9 |
| Medication | RxNorm | 861007 |
| HbA1c test | LOINC | 4548-4 |
| Office service | CPT | 99213 |

Each system supplies an identifier **for a particular purpose** within the visit. The diagnosis here is separately documented as without complications, so **the first code alone does not justify the second**.

## Code identity is system + code (p. 35)

A code becomes computable **only when its code system travels with it**.

- A **display** label helps a human reader.
- Source **text** preserves local wording.

| System + code | Concept |
|---|---|
| `http://loinc.org` + `4548-4` | Hemoglobin A1c in blood |
| `http://snomed.info/sct` + `44054006` | Type 2 diabetes mellitus |

These are **terminology identities, not links to a patient's record**.

Lab 2 drives this home:

- **Pick the coding by `system`, never by list position.** A `coding[]` list can hold a local catalog code, a lab catalog code and the standard code in any order.
- **Same digits, different system = a different concept.** A local catalog entry with code `861007`, or a clinic test code `2345-7`, must *not* match RxNorm 861007 or LOINC 2345-7.
- **Both halves must match in the same coding entry.**

## Where codes go in FHIR (p. 63)

| FHIR element | Terminology | Example concept |
|---|---|---|
| Condition.code | ICD-10-CM | I10 essential hypertension |
| Condition.code | SNOMED CT | 38341003 hypertensive disorder |
| Observation.code | LOINC | 4548-4 hemoglobin A1c |
| MedicationRequest.medication[x] | RxNorm | 861007 metformin 500 mg tablet |
| Procedure.code | CPT | 93000 routine 12-lead ECG |

- **CodeableConcept is the carrier, not the vocabulary.** The resource field and implementation profile decide which terminology is allowed (these pairings are illustrative).
- Units use **UCUM** (`http://unitsofmeasure.org`) in the lab's `valueQuantity`, e.g. `%` and `mg/dL`. The slides don't cover UCUM as a topic. ^[inferred]

## Limits: codes alone are not enough (pp. 36–38)

- **Notes carry more than codes.** "Reports worsening fatigue for three weeks, denies chest pain, will check TSH and CBC" holds a symptom, a duration, a **negation** and a **plan**. One diagnosis field can't keep all four. **Clinical NLP** tries to extract structure while keeping time, negation and uncertainty.
- **Results need context:** unit, time, status, method and performer. A problem-list entry may be active, resolved, duplicated or unreconciled.
- **Standards align syntax; shared profiles, terminologies and data-quality rules align meaning.** Local codes, units, status rules and mappings still vary across sites.

## Relevance to the Cognitive Performance Agent

- **No clinical codes needed for the MVP.** Our data are wearable summaries, laptop behaviour and self-report, so ICD, SNOMED, RxNorm and CPT don't apply. See [[05-data/data-sources|Data sources]]. ^[inferred]
- **Borrow the principle, not the vocabularies:**
  - Every metric in our canonical schema ([[05-data/data-pipeline|Data pipeline]]) should carry an explicit *system* (our own namespace, or the provider's data-type name, e.g. Google Health `dailyHeartRateVariability`) plus a code, a display and a unit.
  - That avoids collisions such as Fitbit "resting HR" vs Apple "resting HR", which are computed differently.
  - LOINC does define vital-sign codes such as heart rate, which we could add later for FHIR / Open mHealth export. ^[inferred]
- **Keep source text next to normalized names.** This is what lab 2 does with RxNorm display vs source text, and it suits our app-category labels and self-report items. ^[inferred]
- **Self-report items** (the fatigue check-in) should record the item wording, scale and recall window, which is the "response event" shape from week 2 p. 17. ^[inferred]

## Sources

- `binf4070-2026/week-02/slides-02.pdf`, pp. 26–38, 54, 59, 62–63.
- `binf4070-2026/week-02/lab-02.ipynb`, Part 1 (`find_rxnorm_coding`) and the take-home (`select_latest_result`).
