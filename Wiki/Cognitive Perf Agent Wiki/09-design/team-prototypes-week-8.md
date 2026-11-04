---
title: Team Prototypes — Week 8 Lab
category: 09-design
tags: [frontend, team, course]
sources: ["https://canva.link/p3cxbupqr3e23ag", "https://www.figma.com/design/nkGlfGC8HHiOHsthIFxZod/Cognitive-Performance-Agent---Alexa-Kafka?node-id=0-1", "https://www.figma.com/design/g28nVEZHep6aC3kQAMLKDs/Class-14---Information-Design-Workshop--Copy---Copy-?node-id=6006-2"]
summary: "Archive of the three prototypes teammates made for the week 8 lab (Raghavan in Canva, Alexa and Yulee in Figma): what each one shows. Kept for the record; not a design reference."
base_confidence: 0.7
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T00:30:00Z
updated: 2026-11-05T00:30:00Z
---

# Team Prototypes — Week 8 Lab

> [!note] Archive only, not a reference
> These are the prototypes the team made for the week 8 lab ([[30-course/weeks/week-08-hci-interface-trust-uncertainty|week 8: HCI, interface, trust and uncertainty]]). Heramb asked on 2026-11-05 to **keep them, not use them as a reference**. Design work (`/uiux`, `/mockup`, `/crit`) starts from `design/PRODUCT.md`, not from these. They're described here as they were on 2026-11-05. The source files may change, so the screenshots are snapshots.

All three use illustrative data, and all three answer the same question: *should I keep going or take a break?* Each was opened logged out in a browser and read from the rendered screen (Figma draws on a canvas, so small text was read from zoomed screenshots, and a few tiny labels were unreadable).

## 1. Raghavan: "Your next study block" (Canva)

- **Link:** [canva.link/p3cxbupqr3e23ag](https://canva.link/p3cxbupqr3e23ag) (opens as `Lab08_Canva_Raghavan.pdf`, one page at 2133×1333)
- **Form:** one **desktop** screen, a single-page mockup.
- **Layout:** a top nav (Session · Past sessions · Connected data) and a "Your next study block" title, with three columns:
  - **Left, a dark "Current session" card:** "Reading practice", a large ring showing **53** (minutes studying), "Session in progress", then Last break (53 min ago), Idle time (6%), Data collection (On), and a **Pause collection** button.
  - **Centre, the suggestion:** a "Suggested next" tag, then **"Take a 5-minute break"** ("Step away from your screen before the next study block"), and "Limited evidence · You decide whether to pause." A primary **Start 5-minute break** button, then **Snooze 10 minutes** and **Keep studying**. A note: "Nothing starts until you choose."
  - **Below it, "Why this suggestion?":** 53 minutes of continuous study; 9 app switches in the last 15 minutes; sleep and HRV give overnight context.
  - **Right, "Session context: your signals, with their source":** last night's sleep 6 h 10 min (usual 7 h 20 min, wearable); overnight HRV (RMSSD) 32 ms (usual range 38–44 ms); laptop activity 9 switches / 15 min (foreground-app changes, current session); sync stamps ("Watch synced 8 min ago · Laptop updated just now").
- **Bottom strip, "Session flow":** 53 min studying → Choose what is next → Optional 5-minute break.
- **Footer:** "Illustrative data · Your connected sources remain under your control" and "Manage source permissions". Signed in as "Raghavan".
- **Notable choices:** the evidence strength is said in words ("Limited evidence"), every signal is labelled with its source and freshness, the user has to act before anything starts, and data collection can be paused from the main screen.

![[attachments/prototypes/2026-11-raghavan-lab08-canva.png]]

## 2. Alexa: "Your Performance Right Now" (Figma)

- **Link:** [Figma: Cognitive Performance Agent – Alexa Kafka](https://www.figma.com/design/nkGlfGC8HHiOHsthIFxZod/Cognitive-Performance-Agent---Alexa-Kafka?node-id=0-1)
- **Form:** one **desktop** frame, "Main Dashboard". Light theme with a dark-green accent.
- **Left sidebar:** Dashboard, Performance History, Data Sources, Settings & Privacy. A "Your data. Your choice." card ("pause or disconnect any source", Manage permissions), and the user (Alexa Kafka, personal workspace).
- **Header:** "Good morning, Alexa" · **"Your Performance Right Now"** · "Personalized insights to help you work and recover effectively." The date (Friday, October 30, 2026) and last-synced time sit top right.
- **Suggestion card:**
  - Tags: "Suggested next step" and "Awaiting your choice".
  - **"Take a short walk."** ("A short reset may help you maintain your performance."), with a line explaining that recent app switching, sleep and wearable signals suggest a brief break.
  - Buttons: **Accept recommendation**, **Snooze**, **Decline**.
  - An illustration of a path, labelled "15-minute walk · Easy pace".
  - Notes: after accepting, "Walk started… Undo available"; "No schedule or device changes. Always your choice."
- **"What's influencing this recommendation?"** ("observed signals, considered together; no single metric determines the suggestion"), compared with the user's last 30 days, as four tiles:
  - **Sleep:** 6.2 hours (1 h below the usual 7.2 h), wearable, last night.
  - **HRV:** 42 ms (near the usual 38–46 ms), wearable overnight average, with a small line chart.
  - **Laptop activity:** "Frequent app switching", 18 switches/hr against a usual 9/hr, with a bar chart.
  - **Idle time:** 8% (below the usual 12%), laptop, past 60 minutes.
- **Two footer cards:**
  - **"Confidence: Moderate"**, tagged "An estimate, not a certainty". It says these patterns suggest a break may help, but it can't tell exactly how you feel.
  - **"Data availability: Wearable and laptop data available"**, last synced 5 minutes ago, with Manage sources.
- **Page footer:** "For everyday wellness and productivity. Not a medical assessment."
- **Notable choices:** explicit Accept, Snooze and Decline with an undo; the confidence level shown as a labelled card; each signal compared with the person's own baseline; a wellness disclaimer.

![[attachments/prototypes/2026-11-alexa-main-dashboard-figma.jpg]]

## 3. Yulee: energy outlook (Figma, class workshop file)

- **Link:** [Figma: Class 14 – Information Design Workshop (copy), frame "Basics"](https://www.figma.com/design/g28nVEZHep6aC3kQAMLKDs/Class-14---Information-Design-Workshop--Copy---Copy-?node-id=6006-2)
- **Form:**
  - One **iPhone** screen (9:41 status bar, Dynamic Island), built inside a copy of the course's Class 14 information-design workshop file. The section is labelled "PHA DESIGN WEEK 8".
  - The frame is the workshop's "Basics" kit ("the parts every screen starts with: status bar, title bar, search, tabs, buttons and the mockup card"). Its right-hand column holds the kit's sample parts (avatar, avatar group, progress bar, location and bookmark icons, Join and Details buttons).
  - The other frames on that page ("Meal Pals") are the workshop's own examples, not part of our project.
- **The screen:**
  - **Title bar:** back and more buttons around "FRIDAY · October 30, 2026", then a "Search your data" field with a filter button.
  - **Tabs:** **Outlook** (selected) · Sleep · Productivity.
  - **Energy card:** "Current energy level: High (Now – 4pm)", with **recommended tasks** for that window: Advanced Programming Project Notes, Advanced Programming Homework 1, Personal Health Agent – Take Home 8.
  - **Day ring:** a large **donut chart of the day**, split into time segments around a centre label **"NOW | High energy"** (smaller text under it was unreadable). The outside labels read as times and states such as "High productivity, low physical energy" and "Low productivity, high physical energy"; some were too small to read for certain.
  - **Bottom tab bar:** Home, Following, Messages, Profile and a "+" button. These names come from the workshop template.
- **Notable choices:** the only phone-first prototype; it plans the day by **energy windows** and matches tasks to them, rather than reacting to one study session; a whole-day ring with a "now" marker.

![[attachments/prototypes/2026-11-yulee-energy-outlook-figma.jpg]]

## What differs between them (descriptive only)

| | Raghavan | Alexa | Yulee |
|---|---|---|---|
| Device | Desktop | Desktop | iPhone |
| Time frame | This study session | Right now | The whole day |
| Main action | Start a 5-min break / snooze / keep studying | Accept a 15-min walk / snooze / decline | Pick a task that fits the current energy window |
| Evidence shown | Session minutes, app switches, sleep, HRV, each with its source | Sleep, HRV, app switching, idle time against personal baselines | Energy level by time of day |
| Uncertainty | "Limited evidence" | "Confidence: Moderate, an estimate, not a certainty" | Not shown |

## Related

- [[09-design/09-design|Design hub]] · [[13-team/13-team|Team]] · [[08-frontend/student-interface-and-feedback|Student interface]] · [[30-course/weeks/week-08-hci-interface-trust-uncertainty|Week 8]]
