---
title: WearLab teardowns and parts
category: 32-wearlab
tags: [wearlab, wearables, physiology, reference]
aliases: [WearLab part trees, WearLab explain cards, WearLab part library, inside views]
relationships:
  - target: "[[32-wearlab/32-wearlab]]"
    type: related_to
  - target: "[[32-wearlab/architecture]]"
    type: related_to
  - target: "[[21-concepts/photoplethysmography]]"
    type: related_to
  - target: "[[30-course/weeks/week-03-wearable-sensors-and-measurements]]"
    type: related_to
sources: ["wearlab/src/data/devices/watch.ts", "wearlab/src/data/devices/others.ts", "wearlab/src/data/library/manifest.ts", "wearlab/src/data/library/content-sense.ts", "wearlab/src/data/library/content-convert-think.ts", "wearlab/src/data/library/content-talk-power.ts", "wearlab/src/data/library/content-show-protect.ts", "wearlab/src/lib/types.ts", "wearlab/src/inside/", "wearlab/src/components/ExplainPanel.tsx", "wearlab/docs/PLAN.md", "https://wearlab-learn.vercel.app/#/devices"]
summary: "WearLab's 5 device part trees, the explain-card format, the 96-kind part library by layer, the 23 inside views, and paraphrased cards for the photodiode, LED, IMU, AFE, barometer and battery."
provenance:
  extracted: 0.84
  inferred: 0.12
  ambiguous: 0.04
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-10-26
tier: supporting
created: 2026-10-26T21:30:00Z
updated: 2026-10-26T21:30:00Z
---

# WearLab teardowns and parts

WearLab's Devices tab takes five kinds of wearable apart in 3D, and every part in them carries the same explain card. This page covers what is in each tree, how the cards are structured, and which "inside" animations exist. How the trees are rendered is on [[32-wearlab/architecture|WearLab architecture]].

## The five device types

The devices are ordered from easy to hard (`DEVICE_ORDER`), and each one anchors a curriculum tier. All counts below were computed from the trees in `src/data/devices/watch.ts` and `others.ts`. A "node" is any part in the tree below the root; a "kind" is a distinct library entry.

| Device (route) | Tier | Tagline (from data) | Era | Modules | Nodes | Kinds | Depth |
|---|---|---|---|---|---|---|---|
| Clip-on pedometer (`#/devices/clip`) | 1 "First Steps" | One sensor, one chip, one number: your steps | around 2009 | 7 | 13 | 12 | 2 |
| Fitness band (`#/devices/band`) | 2 "Light & Blood" | Adds light-based heart rate, a touchscreen and Bluetooth | 2013 → today | 11 | 33 | 32 | 2 |
| Smart ring (`#/devices/ring`) | 3 "Tiny but Mighty" | The same sensors, squeezed into a ring | 2015 → today | 6 | 16 | 15 | 2 |
| Chest strap (`#/devices/strap`) | 4 "Electric Heart" | Reads your heart's electricity, not light | 1982 → today | 6 | 13 | 12 | 2 |
| Smartwatch (`#/devices/watch`) | 5 "Computer on Your Wrist" | A full computer, 11 sensors and 4 radios on your wrist | 2015 → today | 13 | 81 | 74 | 3 |

### Part trees

- **Clip:**
  - Modules: plastic shell, tiny OLED, side button, battery, charging contacts, belt clip.
  - Circuit board: PCB, accelerometer, MCU, low-power radio, crystal, passives.
- **Band:**
  - Modules: cover glass, touch layer, OLED display, battery, haptic engine, case, charging contacts, two straps.
  - Metal side panels, labelled "ECG + EDA".
  - Logic board: PCB, MCU, BLE, GNSS, IMU, barometer, flash, PMIC, NFC, crystal, passives.
  - Health sensor module: sensor window, green LEDs ×2, red LED, infrared LED, photodiodes ×4, light barriers, skin-temperature sensor, AFE, sensor flex.
  - The band's board includes GNSS and a barometer, so it reads as a modern Charge-class band rather than a basic one. ^[inferred]
- **Ring:**
  - Modules: titanium shell, inner resin, curved battery, charging coil (copper).
  - Flexible circuit board: sensor flex, MCU, BLE, IMU, AFE.
  - "Sensor bumps": green, red and infrared LEDs, photodiodes, skin temperature.
- **Chest strap:**
  - Modules: sensor pod, coin cell, snap connectors, elastic strap, textile electrodes ×2.
  - Board: PCB, ECG front-end chip, MCU, BLE, IMU, crystal, passives.
- **Smartwatch:** 13 top-level modules. PLAN C1 and §9 say "14 modules"; the tree in the code has 13.
  - **Display:** polarizer, OLED light layer, LTPO backplane, flex cable, display driver.
  - **Battery:** pouch top and bottom, cathode, separator, anode, protection circuit.
  - **Haptic engine:** housing, moving magnet, drive coils, springs.
  - **Speaker** and **microphone.**
  - **Logic board** (15 components): PCB, SoC, RAM, flash, sensor hub, PMIC, Wi-Fi/BT, GNSS, LTE modem, NFC, IMU, magnetometer, barometer, crystal, passives. Three of them open to a third level:
    - the **SoC** into package lid, silicon die and substrate;
    - the **IMU** into lid, accelerometer die, gyroscope die, ASIC and substrate;
    - the **barometer** into a metal lid with air hole, pressure membrane, ASIC and substrate.
  - **Crown:** knob, ECG electrode, shaft and seal, optical encoder, side button.
  - **Case:** aluminium frame, waterproof seals, antennas, pressure vent.
  - **Charging coil:** ferrite, copper, alignment magnet.
  - **Sensor module:** back crystal, ECG back electrode, Fresnel lenses, green LEDs ×4, red, infrared, photodiodes ×8, light barriers, skin temperature, sensor flex, AFE.
  - **Straps:** two straps and quick-release pins.

The **drill-down** follows PLAN §1:

- **L0 Device → L1 Module → L2 Component.** Each `PartNode` has an `explode` vector, and opening a node pushes its children out along those vectors.
- **L3 inside view.** Opened from a part's card.
- **L4 algorithm lab.** Lives on a topic page.

**X-ray** ghosts everything except the selection. **Slice** cuts the model with a movable clipping plane.

## The explain card

The `Explain` interface in `src/lib/types.ts` sets the shape of every card:

- **What:** the job, "in 8 words or fewer".
- **Simple:** two or three plain sentences. The authoring note in the type says a curious 12-year-old should get it.
- **Like… (analogy):** a daily-life comparison.
- **Deep dive:** two to four short paragraphs on the real mechanism.
- **Typical specs:** `[label, value]` pairs, deliberately labelled as typical rather than brand claims.
- **Fun fact:** one surprising fact.
- **Feeds** (library entries only): `algos`, the labs that use this part's data. It is set on 22 kinds, but **the current UI does not display it**. ^[ambiguous]
- **Topics:** not stored on the card. It is computed by `topicsOfPart()` in `links.ts` and shown as "Part of how it works".

**Coverage:** all 96 kinds have What, Simple, an analogy, a deep dive and specs. 95 have a fun fact and 62 have an "aka" alternate name.

In the teardown, `ExplainPanel.tsx` shows the card with:

- "Open it up · N parts" for parts that have children;
- "See inside it" for parts that have an inside view;
- a numbered list of child parts that mirrors the 3D labels;
- "Typical numbers", the collapsible "Deep dive: how it really works", and the fun fact;
- "Found in", listing the devices that contain the part.

## The part-kind library: 96 kinds

`src/data/library/manifest.ts` lists every kind with its layer (`cat`), its optional inside view and its optional algorithms. The prose lives in four content files keyed by id. The library has 96 kinds; 91 of them are used in the five device trees. The other 5 are brand-only and appear in topics and the Time Machines: `uwb`, `ant-radio`, `solar-cell`, `mip-display` and `flashlight`.

| Content file | Layer | Kinds | Examples |
|---|---|---|---|
| content-sense.ts | Sense | 23 | IMU, accelerometer, gyroscope, magnetometer, barometer, green/red/IR LEDs, photodiodes, Fresnel lenses, skin temp, ECG back electrode, crown electrode, textile electrodes, EDA electrodes, touch layer, microphone, crown parts |
| content-convert-think.ts | Convert | 4 | AFE, ECG front-end chip, display driver, sensor ASIC |
| content-convert-think.ts | Think | 8 | logic board, SoC, MCU, sensor hub, RAM, flash, crystal, silicon die |
| content-talk-power.ts | Talk | 14 | PCB, flex cables, Wi-Fi+BT, BLE, low-power radio, GNSS, UWB, ANT+, NFC, LTE + eSIM, antennas, substrate, snap connectors |
| content-talk-power.ts | Power | 16 | battery and its pouch, cathode, anode and separator, protection circuit, PMIC, passives, charging coil parts, charging pins, coin cell, curved ring battery, solar lens |
| content-show-protect.ts | Show | 12 | OLED display and layers, LTPO backplane, tiny OLED, memory-in-pixel display, flashlight, haptic LRA and its parts, speaker |
| content-show-protect.ts | Protect | 19 | cover glass, case, frame, seals, pressure vent, crown shaft, back crystal, light barriers, chip package, straps, ring shell and resin, clip shell, strap pod |

## Inside views: 23 animations

`src/inside/views/*.tsx` holds 23 narrated animations. Each is an `InsideViewDef` with:

- `id`, `title` and `subtitle`;
- a list of `steps`, each with a title, text and optional analogy;
- a `View` component drawn per step.

`InsidePlayer.tsx` plays the steps automatically, except under reduced motion. 67 of the 96 kinds link to one of these views.

| Inside view | Opened from (kinds) | Subtitle, paraphrased |
|---|---|---|
| mems-accel | imu, accelerometer | A silicon speck on springs that feels motion |
| mems-gyro | gyroscope | A vibrating speck that feels twists |
| magnetometer | magnetometer | Thin metal film plus maths makes a compass |
| barometer | barometer, pressure membrane, pressure vent | A silicon drum skin feeling air weight |
| thermistor | skin-temp | A ceramic bead whose resistance falls as it warms |
| photodiode | photodiodes, health sensor module, Fresnel lenses, light barriers | Returning light becomes current |
| led | green, red and IR LEDs | An energy drop becomes coloured light |
| ecg-circuit | ECG back electrode, crown electrode, textile electrodes, ECG front end | The heart's electrical wave through wrist and fingertip |
| eda | EDA electrodes | How easily a tiny current crosses skin |
| afe | AFE, sensor ASIC | The circuit that turns light flashes into heart-rate numbers |
| soc | logic board, SoC, MCU, sensor hub, die | Districts on one chip that wake only when needed |
| memory | RAM, flash | RAM forgets, flash remembers |
| pmic | PMIC, protection circuit, passives | One battery, the right voltage for every part |
| crystal | crystal | Quartz ringing at one exact rate |
| radio | Wi-Fi+BT, BLE, low-power radio, UWB, ANT+, LTE, antennas | Talking to the phone for days on a tiny battery |
| nfc | NFC | A magnetic handshake over a few centimetres |
| gnss | GNSS | Timing signals from space give position |
| battery-ions | battery, pouch, cathode, anode, separator, ring battery | Lithium ions shuttling between layers |
| wireless-charging | charging coil, copper, ferrite, magnet | Power jumping a gap through a flipping field |
| lra | haptic engine and its parts | A magnet on springs pushed in rhythm |
| oled-pixel | display and its layers, display driver, tiny OLED | Each pixel makes its own light |
| touch-grid | touch layer | An invisible grid feels a finger through glass |
| crown-encoder | crown, knob, encoder | Counting stripes with light to measure turns |

## Example explain cards (paraphrased)

The specs below are WearLab's "typical" values, not measurements of any one product.

**Photodiodes** (Sense; inside view: photodiode; feeds heart, SpO₂, HRV, recovery)
- **What:** catches returning light and turns it into a current.
- **Simple:** small light catchers around the LEDs sample the light that comes back out of the skin many times a second. Its rise and fall tracks the pulse.
- **Analogy:** a solar panel on a day of passing clouds.
- **Deep dive:** a silicon p-n junction where photons free electrons. The nA–µA current goes straight to the AFE. Several photodiodes are combined so the software can pick the best path when the device shifts.
- **Specs:** silicon, sensitive from about 400 to 1,100 nm, often 2–8 per device.

**Green LEDs** (Sense; feeds heart, HRV, recovery)
- **Why green:** at about 520–530 nm, haemoglobin absorbs green strongly, so the pulse ripple is large.
- **Shallow is good:** green reaches only about 1 mm into skin, which keeps it away from tendon and muscle motion.
- **Low power:** pulses last microseconds, 25 to 100+ times a second.
- **Limits:** melanin and dark tattoo ink also absorb green, so the device may raise LED current.
- **Analogy:** ketchup looks almost black under green light.

**Motion sensor (IMU)** (Sense; inside view: mems-accel; feeds steps, falls, sleep, heart)
- **What:** a 3-axis accelerometer (a mass on springs, read by capacitance) and a 3-axis gyroscope (a vibrating mass pushed sideways by the Coriolis effect) in one package with a signal chip.
- **Battery trick:** it samples into a FIFO so the main processor can sleep.
- **Analogy:** the inner ear's balance organ.
- **Specs:** 6 axes, about ±2 to ±16 g, up to ±2000 °/s, under 1 mA.

**Analog front end (AFE)** (Convert; feeds heart, SpO₂)
- **What it does:** times the LED flashes, turns photodiode current into voltage with a transimpedance amplifier, and takes an LED-off reading to subtract room light and sunlight.
- **Output:** digitises with a 16–24-bit ADC into a FIFO.
- **Analogy:** a concert sound engineer cleaning up a faint singer.

**Barometer** (Sense; inside view: barometer; feeds floors)
- **Mechanism:** a silicon membrane over a vacuum cavity bends with air pressure.
- **Sensitivity:** near sea level, pressure falls about 12 Pa (0.12 hPa) per metre, so one flight of about 3 m is easy to spot.
- **Weather problem:** weather can move pressure by several hPa a day, which looks like tens of metres of fake climbing. Watches focus on fast changes and cross-check with GPS.
- **Analogy:** ears popping on a plane.

**Skin temperature sensor** (Sense; inside view: thermistor; feeds sleep, recovery)
- **Mechanism:** an NTC thermistor that loses about 4% of its resistance per °C.
- **Use:** readings are averaged overnight and compared with the wearer's own baseline built over a few nights to a few weeks, to spot shifts of a few tenths of a degree.
- **Caution:** the card says plainly that it is **not a fever test and not core temperature**.

**Battery** (Power; inside view: battery-ions; feeds the battery lab)
- **Construction:** a lithium-ion polymer pouch.
- **Voltage:** about 3.7 V average, 4.2–4.4 V full.
- **Capacity:** roughly 200–600 mAh in a watch.
- **Lifespan:** often about 80% capacity after roughly 500 cycles.
- **Analogy:** a car's fuel tank, which stores energy but does not make it.

## What this means for the Cognitive Performance Agent

^[inferred]
- **Sensor provenance for our signals.** Our HR, HRV and sleep inputs come from the green LED → photodiode → AFE chain plus the IMU. Steps come from the IMU or accelerometer. These cards are a plain-language source we can link when the agent explains why a reading may be unreliable. See [[21-concepts/photoplethysmography|Photoplethysmography]], [[21-concepts/step-counting|Step counting]] and [[21-concepts/wearable-measurement-error|Wearable measurement error]].
- **Same caveats as the course.** The skin-temperature card's warning (a trend against your own baseline, not a fever test) and the barometer's weather drift match the course's message that numbers are estimates ([[30-course/weeks/week-03-wearable-sensors-and-measurements|Week 03]]). I found no conflict. The WearLab cards go deeper on hardware than the course does.
- **Reusable pattern for our explanations.** The What / Simple / Analogy / Deep-dive format is a good template for how the Evidence agent phrases a rationale: one plain line, then depth on demand. See [[04-agent-engine/multi-agent-decision|Multi-agent decision]] and [[08-frontend/student-interface-and-feedback|Student interface and feedback]].
- **Which device we target.** Our watch-first design ([[05-data/data-sources|Data sources]]) maps to WearLab's band and watch trees. The band tree has no ECG back electrode. Its metal side panels are labelled "ECG + EDA" but are modelled as the `eda-electrode` kind. So ECG-grade beat timing should not be assumed from a band.

## Sources

- `wearlab/src/data/devices/watch.ts`, `wearlab/src/data/devices/others.ts`, `wearlab/src/data/devices/index.ts`
- `wearlab/src/data/library/manifest.ts` and `content-{sense,convert-think,talk-power,show-protect}.ts`
- `wearlab/src/lib/types.ts` (`Explain`, `LibraryEntry`, `PartNode`, `INSIDE_IDS`)
- `wearlab/src/inside/kit.tsx`, `wearlab/src/inside/views/*.tsx`, `wearlab/src/components/InsidePlayer.tsx`, `wearlab/src/components/ExplainPanel.tsx`, `wearlab/src/data/links.ts`
- `wearlab/docs/PLAN.md` §1 and §3 (B, C)
- Live: https://wearlab-learn.vercel.app/#/devices and https://wearlab-learn.vercel.app/#/parts
