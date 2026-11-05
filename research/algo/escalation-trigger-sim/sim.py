"""Escalation-trigger false-alarm simulation (U9). SYNTHETIC DATA ONLY.

Simulates 14 nights of sleep for a synthetic student population and reports,
for each candidate escalation trigger, the share of students flagged per
two weeks, overall and by group.

This is a simulation, not evidence. Every population parameter below is an
ASSUMPTION, calibrated where possible to published figures (see SOURCES).
No real person's data is used or needed.

Run:  python3 -I sim.py            (standard library only, no network)
Same seed -> same output.
"""

import math
import random
import statistics

SEED = 3001  # synthetic-data seeds start at 3000 (05-data/synthetic-data-generator.md)
N_STUDENTS = 20000  # large n so the simulated rates are stable to ~0.3 points
NIGHTS = 14
SHORT_H = 6.0  # "short night" cut-off
VERY_SHORT_H = 5.0
MIN_OBSERVED_NIGHTS = 10  # fewer valid nights than this -> abstain, no flag

# ---------------------------------------------------------------- SOURCES --
# S1 Creswell et al. 2023, PNAS, doi:10.1073/pnas.2209123120 (n = 634 first-year
#    students, Fitbit, ~1 month): mean nightly TST 6 h 37 min, between-person
#    SD 51 min; 19-21% averaged < 6 h; 5% averaged >= 8 h.
# S2 Okano et al. 2019, npj Sci Learn, doi:10.1038/s41539-019-0055-z (n = 88,
#    Fitbit Charge HR, 14-week semester, wear 89.4%): mean 7 h 8 min; SD of
#    per-person means 41 min; SD of all nightly samples 1 h 48 min, which
#    implies a within-person night-to-night SD of about
#    sqrt(108^2 - 41^2) ~ 100 min (an UPPER bound: includes device error and
#    any fragmented records).
# S3 ACHA-NCHA III Spring 2025 (self-report): 41.9% of undergraduates sleep
#    < 7 h on weeknights (wiki 24-synthesis/market-map.md section 2).

# ------------------------------------------------------------ ASSUMPTIONS --
# A1 Three latent groups. The split and the group means are ASSUMED, chosen so
#    the mixture reproduces S1 (mean ~6.6 h, between-person SD ~0.85 h,
#    ~20% with a mean < 6 h).
GROUPS = {
    #                  share  mean_h  sd_of_means  within_sd  bad_night_p  low_checkin_p
    "typical":          (0.82, 6.90,   0.70,        1.00,      0.04,        0.08),
    "healthy_short":    (0.10, 5.90,   0.30,        0.75,      0.04,        0.10),
    "persistent_short": (0.08, 5.20,   0.40,        1.10,      0.08,        0.35),
}
# A2 "healthy_short" = habitually short but coping (no excess distress);
#    "persistent_short" = the group an escalation is meant to reach (sustained
#    short sleep with distress). Sleep alone cannot tell them apart; that is
#    the point of testing a second signal.
# A3 Night-to-night noise: AR(1) around the person mean, phi = 0.2,
#    innovation SD set so the marginal within-person SD = within_sd.
#    Base within_sd ~1.0 h (between S2's 41-min person SD and its ~100-min
#    upper bound); sensitivity runs scale it.
AR_PHI = 0.2
# A4 Fri and Sat nights are 0.5 h longer (weekend catch-up); start day random.
WEEKEND_BONUS_H = 0.5
# A5 "Bad night" (deadline / all-nighter): with probability bad_night_p a
#    night loses an extra 2 h.
BAD_NIGHT_LOSS_H = 2.0
# A6 Device: reading = true sleep + 0.15 h bias + N(0, 0.4 h) error
#    (consumer wearables tend to over-estimate sleep; size assumed).
DEVICE_BIAS_H = 0.15
DEVICE_ERR_SD_H = 0.40
# A7 Missing nights: 11% of nights have no valid record (S2 wear 89.4%).
P_MISSING_NIGHT = 0.11
# A8 Second signal = an optional one-tap daily check-in ("How are you
#    holding up?"). Answered on 60% of days; a "low" answer occurs with the
#    group's low_checkin_p, +0.10 after a true night < 5 h. All assumed.
P_CHECKIN_ANSWERED = 0.60
LOW_AFTER_VERY_SHORT_BONUS = 0.10


def simulate_student(rng, group, start_dow, within_scale=1.0, low_override=None):
    share, mu_g, sd_g, within_sd, p_bad, p_low = GROUPS[group]
    if low_override and group in low_override:
        p_low = low_override[group]
    mu = rng.gauss(mu_g, sd_g)
    within_sd *= within_scale
    innov_sd = within_sd * math.sqrt(1 - AR_PHI ** 2)
    dev = rng.gauss(0, within_sd)
    true_nights, measured, low_checkins = [], [], 0
    for n in range(NIGHTS):
        dow = (start_dow + n) % 7  # 0 = Mon night ... 4 = Fri, 5 = Sat
        dev = AR_PHI * dev + rng.gauss(0, innov_sd)
        t = mu + dev + (WEEKEND_BONUS_H if dow in (4, 5) else 0.0)
        if rng.random() < p_bad:
            t -= BAD_NIGHT_LOSS_H
        t = min(12.0, max(0.0, t))
        true_nights.append(t)
        if rng.random() < P_MISSING_NIGHT:
            measured.append(None)
        else:
            measured.append(max(0.0, t + DEVICE_BIAS_H + rng.gauss(0, DEVICE_ERR_SD_H)))
        if rng.random() < P_CHECKIN_ANSWERED:
            p = p_low + (LOW_AFTER_VERY_SHORT_BONUS if t < VERY_SHORT_H else 0.0)
            if rng.random() < p:
                low_checkins += 1
    return mu, true_nights, measured, low_checkins


def features(measured, low_checkins):
    obs = [x for x in measured if x is not None]
    return {
        "n_obs": len(obs),
        "n_short": sum(1 for x in obs if x < SHORT_H),
        "n_very_short": sum(1 for x in obs if x < VERY_SHORT_H),
        "mean": statistics.fmean(obs) if obs else float("nan"),
        "low": low_checkins,
    }


# Each trigger sees only device data + check-ins (never the latent group).
# Counts are over OBSERVED nights; < MIN_OBSERVED_NIGHTS -> abstain.
TRIGGERS = [
    ("T1  >=9 of 14 nights <6 h", lambda f: f["n_short"] >= 9),
    ("T2  >=10 of 14 nights <6 h", lambda f: f["n_short"] >= 10),
    ("T3  14-night mean <5.5 h", lambda f: f["mean"] < 5.5),
    ("T4  T1 AND >=3 nights <5 h", lambda f: f["n_short"] >= 9 and f["n_very_short"] >= 3),
    ("T5  T1 AND >=2 low check-ins", lambda f: f["n_short"] >= 9 and f["low"] >= 2),
    ("T6  T1 AND >=3 low check-ins", lambda f: f["n_short"] >= 9 and f["low"] >= 3),
    ("T7  T2 AND >=2 low check-ins", lambda f: f["n_short"] >= 10 and f["low"] >= 2),
    ("T8  T3 AND >=2 low check-ins", lambda f: f["mean"] < 5.5 and f["low"] >= 2),
    ("T9  >=3 low check-ins alone", lambda f: f["low"] >= 3),
]


def run(seed, within_scale=1.0, label="base", low_override=None):
    rng = random.Random(seed)
    names = list(GROUPS)
    weights = [GROUPS[g][0] for g in names]
    rows = []
    for _ in range(N_STUDENTS):
        g = rng.choices(names, weights)[0]
        mu, true_n, meas, low = simulate_student(rng, g, rng.randrange(7), within_scale, low_override)
        rows.append((g, mu, true_n, meas, features(meas, low)))
    return label, rows


def pct(k, n):
    return f"{100.0 * k / n:5.1f}%" if n else "  n/a"


def report_calibration(rows):
    mus = [r[1] for r in rows]
    eligible = [r for r in rows if r[4]["n_obs"] >= MIN_OBSERVED_NIGHTS]
    meas_means = [r[4]["mean"] for r in eligible]
    # The latent person mean excludes the Fri/Sat bonus, so it is the
    # person's expected weeknight sleep.
    weeknight = [r[1] < 7.0 for r in rows]
    all_true = [x for r in rows for x in r[2]]
    print("## Calibration check (synthetic population vs sources)\n")
    print("| Quantity | Simulated | Source figure |")
    print("|---|---|---|")
    print(f"| Mean of person-level sleep means | {statistics.fmean(mus):.2f} h | 6.62 h (S1) / 7.13 h (S2) |")
    print(f"| SD of person-level means | {statistics.pstdev(mus):.2f} h | 0.85 h (S1) / 0.68 h (S2) |")
    print(f"| Students with 14-night device mean < 6 h | {pct(sum(m < 6 for m in meas_means), len(meas_means))} | 19-21% (S1) |")
    print(f"| Students with latent weekday mean < 7 h | {pct(sum(weeknight), len(rows))} | 41.9% self-report (S3); ~66% by actigraphy bins (S1, derived) |")
    print(f"| Nights (true) under 6 h | {pct(sum(x < 6 for x in all_true), len(all_true))} | not reported |")
    print(f"| Students abstained (< {MIN_OBSERVED_NIGHTS} valid nights) | {pct(len(rows) - len(eligible), len(rows))} | n/a |")
    print()


def report_triggers(label, rows):
    groups = list(GROUPS)
    n_by_g = {g: sum(1 for r in rows if r[0] == g) for g in groups}
    print(f"### Trigger flag rates per 2 weeks: {label} (n = {len(rows):,}; "
          + ", ".join(f"{g} {n_by_g[g]:,}" for g in groups) + ")\n")
    print("| Trigger | Flagged overall | typical | healthy_short | persistent_short (sensitivity) | Share of flags NOT persistent | Expected flags per 20 students | Expected false flags per 20 |")
    print("|---|---|---|---|---|---|---|---|")
    for name, rule in TRIGGERS:
        flagged = {g: 0 for g in groups}
        for g, _mu, _t, _m, f in rows:
            if f["n_obs"] >= MIN_OBSERVED_NIGHTS and rule(f):
                flagged[g] += 1
        tot = sum(flagged.values())
        false = tot - flagged["persistent_short"]
        print(f"| {name} | {pct(tot, len(rows))} | {pct(flagged['typical'], n_by_g['typical'])} | "
              f"{pct(flagged['healthy_short'], n_by_g['healthy_short'])} | "
              f"{pct(flagged['persistent_short'], n_by_g['persistent_short'])} | "
              f"{pct(false, tot)} | {20.0 * tot / len(rows):.2f} | {20.0 * false / len(rows):.2f} |")
    print()


def main():
    print(f"# Escalation trigger simulation output (SYNTHETIC, seed {SEED})\n")
    print(f"Population n = {N_STUDENTS:,} synthetic students x {NIGHTS} nights. "
          f"Short night < {SHORT_H} h (device reading). Abstain if < {MIN_OBSERVED_NIGHTS} valid nights.\n")
    label, rows = run(SEED, 1.0, "base (within-person SD as in A3)")
    report_calibration(rows)
    print("## Base case\n")
    report_triggers(label, rows)
    print("## Sensitivity: night-to-night noise\n")
    for scale, lab in ((0.75, "within-person SD x0.75 (quieter nights)"),
                       (1.5, "within-person SD x1.5 (near S2's ~100-min upper bound)")):
        label, rows = run(SEED + 1, scale, lab)
        report_triggers(label, rows)
    print("## Sensitivity: a weak second signal\n")
    print("A8 assumes low check-ins are 4x more common in the persistent group "
          "(0.35 vs 0.08). Nothing sources that. Here the persistent group's "
          "low-check-in rate drops to 0.15 (under 2x).\n")
    label, rows = run(SEED + 2, 1.0, "weak check-in signal (persistent low_checkin_p = 0.15)",
                      {"persistent_short": 0.15})
    report_triggers(label, rows)


if __name__ == "__main__":
    main()
