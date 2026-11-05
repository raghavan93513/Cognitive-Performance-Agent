# Escalation trigger simulation: results (U9)

**SYNTHETIC DATA ONLY. This is a simulation, not evidence.** No real person's data was used. Written by the CSO seat (AI advisor) on 2026-11-04; the team decides.

- **Script:** `sim.py` (Python standard library only, no network). Run: `python3 -I sim.py`.
- **Seed:** 3001 (base); 3002 (noise sensitivity runs); 3003 (weak-second-signal run). n = 20,000 synthetic students x 14 nights per run.
- **Reproducibility:** run twice on 2026-11-04; byte-identical output.

## Sources used for calibration

| ID | Source | What we take |
|---|---|---|
| S1 | Creswell et al. 2023, PNAS, n = 634 first-year students, Fitbit, about 1 month. https://doi.org/10.1073/pnas.2209123120 (full text via Europe PMC, PMC9974458) | Mean nightly sleep 6 h 37 min, between-person SD 51 min; 19% (Table 4, 107/557) to 21% (Discussion) averaged under 6 h; 5% averaged 8 h or more |
| S2 | Okano et al. 2019, npj Science of Learning, n = 88, Fitbit Charge HR, 14-week semester, 89.4% wear. https://doi.org/10.1038/s41539-019-0055-z (PMC6773696) | Mean 7 h 8 min; SD of person means 41 min; SD of all nightly samples 1 h 48 min, implying a within-person night-to-night SD of about 100 min (CSO calc, upper bound); missing-night rate |
| S3 | ACHA-NCHA III Spring 2025, undergraduates, self-report (wiki `24-synthesis/market-map.md` §2) | 41.9% sleep under 7 h on weeknights |

No source was found that reports the within-person SD of nightly sleep for US students directly, or how many students have 9 or more short nights in 14. Both are modelled.

## Assumptions (every one is an assumption, not a finding)

| # | Assumption | Value | Basis |
|---|---|---|---|
| A1 | Three latent groups: typical / healthy short sleeper / persistent short sleep | 82% / 10% / 8%; person means N(6.9, 0.7), N(5.9, 0.3), N(5.2, 0.4) h | Chosen so the mixture reproduces S1 (checked below). The split itself is invented |
| A2 | "Persistent short sleep" is the group an escalation should reach; "healthy short" sleeps little but copes | n/a | Construct for the simulation. Sleep data alone cannot tell them apart |
| A3 | Night-to-night noise: AR(1), phi 0.2; within-person SD 1.0 / 0.75 / 1.1 h by group | | Between S2's 41-min person SD and its ~100-min upper bound; run at x0.75 and x1.5 |
| A4 | Fri and Sat nights +0.5 h | | Assumed weekend catch-up |
| A5 | "Bad night" (deadline): -2 h with p = 0.04 (0.08 in the persistent group) | | Assumed |
| A6 | Device reading = true sleep + 0.15 h + N(0, 0.4 h) | | Assumed; consumer wearables tend to over-estimate sleep |
| A7 | 11% of nights missing; under 10 valid nights in 14 → abstain, no flag | | S2 wear rate 89.4% |
| A8 | Second signal: optional one-tap daily check-in, answered 60% of days; "low" answer p = 0.08 / 0.10 / 0.35 by group, +0.10 after a true night under 5 h | | **Entirely assumed.** A weak-signal run (0.15 in the persistent group) is included because the second signal's value depends on this |

## Recommendation (simulation, not evidence)

1. **Do not escalate on sleep alone.** T1 (9 or more of 14 nights under 6 h) flags 7.4% of simulated students per two weeks, and about 42% of those flags land on students outside the persistent group, including 11% of healthy short sleepers. In a 20-person pilot that is about 1.5 flags per two weeks, about 0.6 of them false.
2. **Proposed escalation trigger: T8 = 14-night device mean under 5.5 h AND 2 or more low check-ins in the same 14 days**, with at least 10 valid nights (otherwise abstain). Among the triggers that pair sleep with a second signal (T5-T8), it reaches the most of the persistent group in every run, with a share of false flags similar to the others. T6 (9 of 14 nights AND 3 or more low check-ins) is the stricter alternative: far fewer false flags (5-7%), but it reaches only 29-42% of the target (13% if the check-in signal is weak).
   - base: flags **5.0%** of students per two weeks (about **1 per 20 students per two weeks**); 13% of flags are outside the persistent group; reaches 54% of the persistent group;
   - noisier nights (x1.5): 5.2% flagged, 21% outside the target, 53% reached;
   - weak check-in signal: 3.3% flagged, 21% outside the target, 33% reached.
   - Planning figure: **expect roughly 3-5% of participants flagged per two weeks, with about 1 in 8 to 1 in 5 of those flags going to students who are coping.** That is a simulated range, not a measured rate.
3. **The card can still say it in nights.** The trigger uses the mean, but the copy names the observed count ("You've slept under 6 hours on 10 of the last 14 nights"), as the design-evidence wording already does.
4. **It misses about half the target group** even in the base case. So the always-visible "Talk to someone" link and the student's own words (an immediate path, not simulated here) remain the main doors. The trigger is an extra door.
5. **A flag only offers the three-rung ladder to the student.** It never contacts anyone else.
6. **Re-measure on pilot data**, labelled exploratory: the real flag rate, the check-in answer rate and how often students call the flag wrong.

---

# Escalation trigger simulation output (SYNTHETIC, seed 3001)

Population n = 20,000 synthetic students x 14 nights. Short night < 6.0 h (device reading). Abstain if < 10 valid nights.

## Calibration check (synthetic population vs sources)

| Quantity | Simulated | Source figure |
|---|---|---|
| Mean of person-level sleep means | 6.66 h | 6.62 h (S1) / 7.13 h (S2) |
| SD of person-level means | 0.84 h | 0.85 h (S1) / 0.68 h (S2) |
| Students with 14-night device mean < 6 h |  17.6% | 19-21% (S1) |
| Students with latent weekday mean < 7 h |  63.2% | 41.9% self-report (S3); ~66% by actigraphy bins (S1, derived) |
| Nights (true) under 6 h |  29.2% | not reported |
| Students abstained (< 10 valid nights) |   1.3% | n/a |

## Base case

### Trigger flag rates per 2 weeks: base (within-person SD as in A3) (n = 20,000; typical 16,348, healthy_short 2,017, persistent_short 1,635)

| Trigger | Flagged overall | typical | healthy_short | persistent_short (sensitivity) | Share of flags NOT persistent | Expected flags per 20 students | Expected false flags per 20 |
|---|---|---|---|---|---|---|---|
| T1  >=9 of 14 nights <6 h |   7.4% |   2.4% |  11.2% |  52.7% |  41.5% | 1.47 | 0.61 |
| T2  >=10 of 14 nights <6 h |   4.5% |   1.2% |   5.4% |  35.5% |  34.9% | 0.89 | 0.31 |
| T3  14-night mean <5.5 h |   7.5% |   2.1% |   7.3% |  61.1% |  33.0% | 1.49 | 0.49 |
| T4  T1 AND >=3 nights <5 h |   6.7% |   2.0% |   8.0% |  51.7% |  36.7% | 1.34 | 0.49 |
| T5  T1 AND >=2 low check-ins |   4.6% |   0.6% |   2.9% |  46.2% |  17.7% | 0.92 | 0.16 |
| T6  T1 AND >=3 low check-ins |   3.2% |   0.2% |   0.8% |  36.7% |   7.4% | 0.65 | 0.05 |
| T7  T2 AND >=2 low check-ins |   2.9% |   0.3% |   1.2% |  31.1% |  13.4% | 0.59 | 0.08 |
| T8  T3 AND >=2 low check-ins |   5.0% |   0.6% |   1.8% |  53.5% |  13.1% | 1.01 | 0.13 |
| T9  >=3 low check-ins alone |   8.7% |   3.2% |   5.8% |  66.6% |  37.1% | 1.73 | 0.64 |

## Sensitivity: night-to-night noise

### Trigger flag rates per 2 weeks: within-person SD x0.75 (quieter nights) (n = 20,000; typical 16,368, healthy_short 2,066, persistent_short 1,566)

| Trigger | Flagged overall | typical | healthy_short | persistent_short (sensitivity) | Share of flags NOT persistent | Expected flags per 20 students | Expected false flags per 20 |
|---|---|---|---|---|---|---|---|
| T1  >=9 of 14 nights <6 h |   7.7% |   2.4% |  10.7% |  60.0% |  39.4% | 1.55 | 0.61 |
| T2  >=10 of 14 nights <6 h |   5.0% |   1.2% |   5.0% |  44.3% |  30.7% | 1.00 | 0.31 |
| T3  14-night mean <5.5 h |   6.9% |   1.7% |   5.9% |  62.1% |  29.3% | 1.38 | 0.40 |
| T4  T1 AND >=3 nights <5 h |   6.4% |   1.8% |   5.1% |  56.6% |  31.0% | 1.29 | 0.40 |
| T5  T1 AND >=2 low check-ins |   5.0% |   0.6% |   2.2% |  54.3% |  14.5% | 0.99 | 0.14 |
| T6  T1 AND >=3 low check-ins |   3.4% |   0.1% |   0.6% |  42.0% |   4.5% | 0.69 | 0.03 |
| T7  T2 AND >=2 low check-ins |   3.6% |   0.3% |   1.2% |  40.4% |  11.1% | 0.71 | 0.08 |
| T8  T3 AND >=2 low check-ins |   4.9% |   0.4% |   1.5% |  56.5% |  10.4% | 0.99 | 0.10 |
| T9  >=3 low check-ins alone |   8.4% |   3.2% |   5.7% |  66.4% |  37.9% | 1.67 | 0.63 |

### Trigger flag rates per 2 weeks: within-person SD x1.5 (near S2's ~100-min upper bound) (n = 20,000; typical 16,368, healthy_short 2,066, persistent_short 1,566)

| Trigger | Flagged overall | typical | healthy_short | persistent_short (sensitivity) | Share of flags NOT persistent | Expected flags per 20 students | Expected false flags per 20 |
|---|---|---|---|---|---|---|---|
| T1  >=9 of 14 nights <6 h |   6.2% |   2.4% |  10.0% |  41.0% |  48.4% | 1.25 | 0.60 |
| T2  >=10 of 14 nights <6 h |   3.3% |   1.2% |   4.2% |  24.3% |  42.4% | 0.66 | 0.28 |
| T3  14-night mean <5.5 h |   8.2% |   3.2% |  10.4% |  58.1% |  44.8% | 1.65 | 0.74 |
| T4  T1 AND >=3 nights <5 h |   6.0% |   2.3% |   9.0% |  40.7% |  46.9% | 1.20 | 0.56 |
| T5  T1 AND >=2 low check-ins |   3.8% |   0.7% |   2.8% |  37.2% |  22.6% | 0.75 | 0.17 |
| T6  T1 AND >=3 low check-ins |   2.4% |   0.2% |   0.5% |  28.7% |   7.4% | 0.48 | 0.04 |
| T7  T2 AND >=2 low check-ins |   2.2% |   0.4% |   1.1% |  22.3% |  18.8% | 0.43 | 0.08 |
| T8  T3 AND >=2 low check-ins |   5.2% |   1.0% |   3.1% |  52.7% |  21.0% | 1.05 | 0.22 |
| T9  >=3 low check-ins alone |   9.2% |   3.9% |   7.5% |  67.0% |  43.1% | 1.85 | 0.80 |

## Sensitivity: a weak second signal

A8 assumes low check-ins are 4x more common in the persistent group (0.35 vs 0.08). Nothing sources that. Here the persistent group's low-check-in rate drops to 0.15 (under 2x).

### Trigger flag rates per 2 weeks: weak check-in signal (persistent low_checkin_p = 0.15) (n = 20,000; typical 16,428, healthy_short 1,985, persistent_short 1,587)

| Trigger | Flagged overall | typical | healthy_short | persistent_short (sensitivity) | Share of flags NOT persistent | Expected flags per 20 students | Expected false flags per 20 |
|---|---|---|---|---|---|---|---|
| T1  >=9 of 14 nights <6 h |   7.3% |   2.5% |  12.0% |  51.7% |  44.0% | 1.46 | 0.64 |
| T2  >=10 of 14 nights <6 h |   4.3% |   1.2% |   5.9% |  34.7% |  36.3% | 0.86 | 0.31 |
| T3  14-night mean <5.5 h |   7.3% |   2.1% |   7.9% |  60.9% |  33.8% | 1.46 | 0.49 |
| T4  T1 AND >=3 nights <5 h |   6.5% |   2.0% |   8.3% |  50.5% |  38.1% | 1.29 | 0.49 |
| T5  T1 AND >=2 low check-ins |   3.1% |   0.7% |   3.5% |  27.4% |  29.5% | 0.62 | 0.18 |
| T6  T1 AND >=3 low check-ins |   1.3% |   0.2% |   1.1% |  12.9% |  20.0% | 0.26 | 0.05 |
| T7  T2 AND >=2 low check-ins |   2.0% |   0.4% |   2.0% |  18.3% |  26.0% | 0.39 | 0.10 |
| T8  T3 AND >=2 low check-ins |   3.3% |   0.6% |   2.1% |  32.9% |  20.9% | 0.66 | 0.14 |
| T9  >=3 low check-ins alone |   5.3% |   3.4% |   6.6% |  22.4% |  66.3% | 1.05 | 0.70 |

