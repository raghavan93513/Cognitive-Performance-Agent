---
title: "FHIR and SMART on FHIR"
category: 21-concepts
tags: [concept, clinical-data, fhir, interoperability]
aliases: [FHIR, Fast Healthcare Interoperability Resources, SMART on FHIR, FHIR resource, Bundle]
sources: ["binf4070-2026/week-02/slides-02.pdf", "binf4070-2026/week-02/lab-02.ipynb", "binf4070-2026/week-01/slides-01.pdf"]
summary: HL7's resource-based exchange standard (R4) plus SMART's OAuth launch and scopes, as taught in week 2. For us it is a shape to borrow (status, two clocks, system+code), not a data source.
provenance:
  extracted: 0.85
  inferred: 0.15
  ambiguous: 0.0
base_confidence: 0.62
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
week: 2
created: 2026-10-26T20:00:00Z
updated: 2026-10-26T20:00:00Z
---

# FHIR and SMART on FHIR

**FHIR** (pronounced "fire") stands for Fast Healthcare Interoperability Resources. It is HL7's standard for exchanging health information electronically. It gives reusable data models and exchange rules, so that every app-to-EHR connection doesn't start with a new schema (week 2 slides p. 43). Week 1 introduced it as one of three alignment standards, alongside OMOP CDM (analysis) and Open mHealth (mobile/wearable schemas) (week 1 slides p. 42).

Taught in [[30-course/weeks/week-02-clinical-records-and-fhir|Week 02 — Clinical records and FHIR]]. Codes that go inside FHIR fields are covered on [[21-concepts/medical-coding-systems|Medical coding systems]]. Reading: [[30-course/readings/mandel-2016-smart-on-fhir|Mandel et al. 2016 — SMART on FHIR]].

## Building blocks (p. 44)

- **Resource:** a typed record such as `Patient` or `Observation`.
- **Interaction:** a shared operation such as read, search, create or update.
- **Address:** `[base]/[resource type]/[logical id]`, e.g. `GET /fhir/Patient/patient-001` returns one Patient as JSON or XML.

## What FHIR does and doesn't specify (p. 45)

| FHIR specifies | Left to implementations and policy |
|---|---|
| resource structures, identifiers, references, terminology hooks | which resources, fields, profiles and operations a server supports |
| testable exchange interactions and data representations | whether data are complete, current or clinically correct |
| conformance artifacts (profiles, CapabilityStatement) | UI, clinical workflow, identity matching, access decisions |

The slides' takeaway: FHIR makes a shared exchange contract *possible*, but it does not make every implementation or record the same.

## What a resource is

**Four properties** (p. 46):

1. **Identity:** a logical URL from server base + type + id.
2. **Declared type:** e.g. Patient, Observation, Condition.
3. **Defined structure:** named elements, data types, cardinalities and constraints.
4. **Version identity:** the version changes when stored content changes.

A resource is **one exchangeable unit, not an entire patient chart**.

**Two layers of common elements** (p. 47):

- Every `Resource` has `id`, `meta` (version, lastUpdated, profiles, security labels, tags), `implicitRules` and `language`.
- Most clinical and admin types derive from **`DomainResource`**, which adds human-readable `text`, `contained` resources, `extension`, `modifierExtension`, and type-specific elements (e.g. `Patient.name`, `Observation.value[x]`).

**Hierarchy** (p. 48):

```
Resource (abstract)
├── DomainResource (abstract)
│     ├── Patient · Observation · Condition · MedicationRequest · …
├── Bundle
├── Binary
└── Parameters
```

**R4** = Release 4, permanent version **4.0.1 (2019)**, which defines **145 resource types** (pp. 49–50). Representative groups:

| Area | Examples |
|---|---|
| People and organizations | Patient, Practitioner, Organization, Encounter |
| Clinical care | Condition, AllergyIntolerance, Procedure, CarePlan |
| Diagnostics | Observation, DiagnosticReport, Specimen, ImagingStudy |
| Medications | MedicationRequest, MedicationDispense, MedicationAdministration, Immunization |
| Conformance and terminology | CapabilityStatement, StructureDefinition, CodeSystem, ValueSet |
| Security and documents | Provenance, AuditEvent, Consent, Composition |
| Workflow | Task, Appointment, ServiceRequest, Communication |
| Finance, research, reasoning | Coverage, Claim, ResearchStudy, Library, Measure |

## How a record is structured: the four anchor resources

A clinic visit produces a **record packet** (p. 25). The Patient identity links an Encounter → Condition → MedicationRequest → Observation → Procedure, plus a clinical note. Each artifact has its own author, status, timestamp and reason for existing. The lecture's example visit (p. 51):

```
Patient/patient-001
  ├─> Condition/cond-201          (what problem was asserted?)
  ├─> MedicationRequest/med-301   (what medication was ordered?)
  └─> Observation/obs-401         (what result was recorded?)
```

The general reading method: identify the type, inspect its elements, follow references and preserve provenance.

Cardinality notation: `0..1` = optional single, `0..*` = optional repeating, `1..1` = required.

**Patient** (pp. 52–53) answers *who is the record about?*

| Element | Card. | Type | Example |
|---|---|---|---|
| id | 0..1 | id | patient-001 |
| identifier | 0..* | Identifier | MRN-48291 (with its assigning `system`) |
| name | 0..* | HumanName | Maya Lee (repeats: a person may have several names) |
| birthDate | 0..1 | date | 1985-04-12 |
| managingOrganization | 0..1 | Reference | Organization/org-01 |

**Observation** (p. 54) records a result or assertion. **It is evidence, not a diagnosis.**

| Element | Card. | Type | Example |
|---|---|---|---|
| status | **1..1** | code | final |
| code | **1..1** | CodeableConcept | LOINC 718-7 hemoglobin |
| subject | 0..1 | Reference | Patient/patient-001 |
| effective[x] | 0..1 | choice | 2026-09-18T09:10:00-04:00 |
| value[x] | 0..1 | choice | 10.8 g/dL |

- `[x]` marks a **choice type**. In the lab the concrete fields are `effectiveDateTime` and `valueQuantity` (value, unit, UCUM system, code).
- **`effective[x]` = the time the result relates to.** `issued` = when this version was made available. The two can differ.
- A missing value can be explained with **`dataAbsentReason`** (e.g. code `unknown`). This means the record exists but carries no number, which is different from no record at all (lab 2, Part 3).
- Status values seen in the lab: `final`, `preliminary`, `entered-in-error`, `cancelled`. **Final ≠ normal**, and a later correction is still possible.

**Condition** (p. 55) records an **asserted problem**: the clinical claim and its context, *not* the evidence that established it.

| Element | Card. | Example |
|---|---|---|
| clinicalStatus | 0..1 | active |
| verificationStatus | 0..1 | confirmed |
| code | 0..1 | ICD-10-CM I10 hypertension |
| subject | **1..1** | Patient/patient-001 |
| onset[x] | 0..1 | 2022-06-15 |

**Medication: three different events** (p. 56). These can reference one another but are **not interchangeable**. An order can exist without a dispense, and a dispense without an observed administration.

| Resource | Meaning | Example |
|---|---|---|
| MedicationRequest | **intended** (ordered) | "Start metformin 500 mg twice daily" |
| MedicationDispense | **supplied** | "Pharmacy handed over 60 tablets" |
| MedicationAdministration | **given in care** | "Nurse administered 500 mg at 08:04" |

Key MedicationRequest fields (p. 73 and the lab): `status` (e.g. active), `intent` (e.g. order), `medicationCodeableConcept` (RxNorm), `subject`, `authoredOn`. **An active order does not establish that the medication was taken.**

## References (p. 57)

- **Normal reference:** `Condition.subject.reference = "Patient/patient-001"`. Both resources have their own server identity.
- **Contained resource:** `Observation.device.reference = "#device-1"`, where `contained[0]` is that Device. It exists only inside its parent and has only a local `#id`. This is the one exception to resource identity (p. 47).
- In the lab, records are matched to the patient by **reference string, never by display name**.

## CodeableConcept and Coding (pp. 62–63)

```
Condition.code : CodeableConcept          ← named element + data type
  ├── coding[0] : Coding                  ← nested data type
  │     ├── system  = http://snomed.info/sct
  │     ├── code    = "38341003"
  │     └── display = "Hypertensive disorder, systemic arterial (disorder)"
  └── text = "High blood pressure"        ← source-facing wording
```

- Condition and Observation are *resources*. CodeableConcept and Coding are *nested data types*.
- **CodeableConcept is the carrier, not the vocabulary.** The field and the implementation profile decide which code systems are allowed.
- `coding[]` can hold several translations (local catalog, lab catalog, LOINC…), and **the first entry isn't necessarily the preferred one**. Select a coding by `system`, never by position. A local system can reuse the same digits (lab 2: `https://clinic.example.org/tests | 2345-7` is not LOINC 2345-7).

## Read, search and Bundles (pp. 58–61)

| Request | Returns |
|---|---|
| `GET /Patient/patient-001` | one Patient resource (read) |
| `GET /Condition?patient=patient-001` | a **search-set Bundle**, even with zero or one match |
| `GET /Observation?patient=patient-001&code=http://loinc.org\|2345-7&date=ge2026-01-01&date=le2026-03-31` | this patient's LOINC 2345-7 glucose results in Q1 2026 |

- A **Bundle** packages entry resources with metadata about why and how they were grouped:

```json
{"resourceType": "Bundle", "type": "searchset", "total": 1,
 "entry": [{"resource": {"resourceType": "Observation", "id": "obs-401"}}]}
```

- **Bundle type determines meaning:**
  - `searchset`: matches plus search metadata and paging links.
  - `transaction`: operations the server must process atomically.
  - `history`: resource versions.
- Treating every Bundle as a bare list can silently change the operation. **Check `type` and parse `entry.resource` before flattening.**
- The lab's `visit_packet` is a plain Python dict of three resources, *not* a Bundle.

## Why FHIR doesn't guarantee shared meaning (pp. 38–39)

- **Syntax vs meaning.** Base FHIR allows optional fields, extensions and several terminology bindings. **Profiles and implementation guides** narrow these choices, but vendors and jurisdictions adopt different ones. Local units, status rules and mappings still vary.
- **A bare value is uninterpretable.** `value: 7.0` means nothing without a code and unit, and two sites may still differ on time window or status.
- **Exchange obstacles:** identity and discovery (endpoint, patient matching), access control, governance (consent, data-use agreements, law) and operations (interfaces, versions, mappings).

## Safe rendering (p. 64)

| | Example |
|---|---|
| Too strong | "You have hypertension." |
| Faithful | "Your record lists an active Condition coded as hypertensive disorder, with onset recorded as June 15, 2022." |

The faithful version keeps the **source, status and recorded time** visible, and it leaves room for reconciliation and clinical interpretation.

## SMART on FHIR (pp. 65–70)

**SMART** = Substitutable Medical Applications and Reusable Technologies. **SMART App Launch** (v2.2, HL7 2024) lets a third-party app launch inside or alongside an EHR and get authorized access to a FHIR server.

**Why FHIR alone isn't enough.** FHIR defines shapes and interactions, but not how an app discovers OAuth endpoints, receives the current patient context or requests bounded permissions. SMART adds **server discovery, OAuth 2.0 authorization, launch context and FHIR-aware scopes**.

**The flow:**

1. **Launch and discovery** (p. 66). The EHR or portal sends the app **`iss`** (the issuer, i.e. the FHIR base URL, e.g. `https://ehr.example/fhir`) and a **`launch`** reference that identifies this launch and its EHR context. The app reads `[base]/.well-known/smart-configuration` to get the authorization and token URLs. A **standalone** app starts from a known FHIR base URL instead.
2. **Authorization request** (p. 68). The app requests access. The authorization server decides, checking login, user approval and hospital policy. A **scope** names a permission. If approved, a **short-lived authorization code** returns through the browser.
3. **PKCE** (Proof Key for Code Exchange, RFC 7636) (p. 67):
   - The app makes a fresh random secret and sends only its *fingerprint* with the request.
   - It later sends the code plus the original secret.
   - The server recomputes the fingerprint and issues a token only on a match.
   - **A stolen code alone cannot obtain a token.**
4. **Token and data** (p. 70). The app exchanges the code + PKCE secret at the token endpoint for an **access token**. The response includes the granted scope and patient context when available. The app sends the token with each FHIR query. **The FHIR server serves records and enforces access.**

**Where the app appears** (p. 69): embedded in the EHR, in a separate tab or window, or as a native phone app. All three use the same protocol. Opening the phone app directly is a standalone launch, where sign-in runs in a protected browser session and then returns to the app.

**Scopes** (p. 75; lab 2 Part 3b):

- Syntax: `patient/Observation.rs` = for the **patient in context**, **Observation** resources, **r**ead + **s**earch.
- Other letters: `u` = update (and, per the SMART spec, `c` = create and `d` = delete ^[inferred]).
- **The server may grant less than requested, and the app must honour the returned scope.**
- Lab example: requested `.rs`, granted `.r`. Reading the known `Observation/a1c-001` is allowed; search and update are not. The app should disable search and explain the permission limit, *without implying the patient has no results*.

**Boundary map** (p. 74): clinician → EHR/portal → app; app ↔ authorization server; app ↔ FHIR server. One EHR may provide both servers. **Keep tokens and identifiable clinical content out of ordinary application logs.**

## Designing a FHIR app (pp. 72–77)

1. **Start with one user decision.** Define the user and moment, the decision supported, the minimum evidence, and the *unsafe shortcut* (e.g. treating an order as use, or one reading as a diagnosis).
2. **Translate it into a data contract.** For each piece of evidence, name the resource and the fields to preserve: patient id (not name); Observation LOINC code, status, effective time, units, components; MedicationRequest RxNorm, status, intent, authored time; Encounter reference.
3. **Put every actor on a boundary map.**
4. **Request access by job, not convenience.** Use read/search on the needed types only, launch context instead of all-patient search, and no write.
5. **Design the unhappy paths first:**
   - Scope not granted → disable and explain.
   - No match → "no matching record returned", not "normal".
   - Preliminary → show the status.
   - Unfamiliar unit → keep the source value and don't convert.
   - Unresolved reference → show as incomplete and don't join by name.
   - Expired token → re-authorize and never expose it.
6. **Testing ladder:** design review → local example files → public sandbox with synthetic patients → partner test environment → security and governance approval.

## Relevance to the Cognitive Performance Agent

- **Not an integration target.** We do not pull EHR data. Our watch, laptop and self-report sources are allowed under the capstone rules ([[05-data/data-sources|Data sources]]). ^[inferred]
- **Borrow the Observation shape** for our canonical record ([[05-data/data-pipeline|Data pipeline]]):
  - a `code` with `system + code` identity (namespace our metric names);
  - a lifecycle `status` (preliminary or final, for wearable summaries revised after a later sync);
  - **two clocks**: `effective` ≈ our `observed_at`, receipt ≈ our `received_at`;
  - a `dataAbsentReason`-style reason code for missing values. ^[inferred]
- **Snapshot discipline.** Lab 2's `snapshot_at` is exactly our "use only data received before the recommendation" rule, and it is a ready-made test pattern. ^[inferred]
- **SMART's scope model** is a good template for our own consent grants per data type: request by job, honour partial grants and degrade gracefully. See [[13-trust-safety/privacy-and-consent|Privacy and consent]]. ^[inferred]
- **Faithful rendering** should govern the Action agent's rationale text in [[04-agent-engine/multi-agent-decision|Multi-agent decision]]. ^[inferred]
- **The document-DB pattern.** Week 1 named "FHIR Observation JSON in MongoDB" as the document-DB example (week 1 slides p. 53), and week 5 revisits clinical stores. See [[30-course/weeks/week-05-relational-document-clinical-stores|Week 05]]. ^[inferred]

## Sources

- `binf4070-2026/week-02/slides-02.pdf`, pp. 17, 25, 38–39, 43–77.
- `binf4070-2026/week-02/lab-02.ipynb`, Parts 1–3 and take-home.
- `binf4070-2026/week-01/slides-01.pdf`, pp. 42, 53.
