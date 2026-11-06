/* Halftime demo data: one source of sample numbers for setup (/start) and the app (/app), so they always agree.
   Everything here is made up. The wearable read covers sleep, heart rate, resting heart rate and overnight HRV
   (Heramb, 2026-11-06), each compared with the person's own usual, never with anyone else. The calendar is a dummy
   connected calendar: a student's day or a student-athlete's day. */
(() => {
  "use strict";
  // 14 sample nights, Thu Oct 22 to Wed Nov 4: sleep (h), resting heart rate (bpm), overnight HRV (RMSSD, ms).
  // Short nights tend to come with a higher resting rate and a lower HRV, as they do in real data.
  // when the laptop last saw a study session each night ("" = no session). This is what a person with no wearable has:
  // the laptop, never sleep. A session still running after midnight counts as a late night.
  const STUDY_END = ["12:50 am", "1:30 am", "", "", "12:20 am", "11:10 pm", "1:00 am", "12:35 am", "12:55 am", "10:40 pm", "", "10:15 pm", "12:45 am", "1:15 am"];
  const NIGHTS = [
    ["Thu 22", 5.2, 60, 41], ["Fri 23", 4.8, 62, 37], ["Sat 24", 4.2, 64, 33], ["Sun 25", 3.9, 65, 31], ["Mon 26", 5.6, 59, 43],
    ["Tue 27", 6.4, 57, 47], ["Wed 28", 5.1, 60, 40], ["Thu 29", 5.5, 59, 42], ["Fri 30", 5.0, 61, 39], ["Sat 31", 5.8, 58, 44],
    ["Sun 1", 4.6, 63, 35], ["Mon 2", 7.1, 55, 51], ["Tue 3", 5.3, 60, 41], ["Wed 4", 5.2, 61, 38],
  ].map(([d, sleep, rhr, hrv], i) => ({ d, sleep, rhr, hrv, studyEnd: STUDY_END[i] }));
  const USUAL = { sleep: 7.0, rhr: 55, hrv: 49 }; // the person's own 28-night usual (sample)

  // what each wearable reports for HRV (they measure it differently, so the label says which)
  const HRV_KIND = { fitbit: "RMSSD", oura: "RMSSD", whoop: "RMSSD", garmin: "RMSSD", apple: "SDNN" };

  // today, Thursday Nov 5 (the sample afternoon: studying 1:05 to 4:30 pm)
  const today = (role) => ({
    lastNight: { sleep: "5 h 10 min", sleepH: 5.2, bed: "1:40 am", wake: "6:50 am", rhr: 61, hrv: 38 },
    hrNow: { bpm: 72, at: "3:33 pm", note: "synced 12 min ago" }, // watch heart rate arrives in batches after a sync, not live
    session: { avgHr: 74, rangeLo: 66, rangeHi: 88 },
    training: role === "athlete" ? { what: "Morning practice", dur: "1 h 20 min", avgHr: 146, maxHr: 182 } : null,
  });

  const CAL = {
    student: [
      { t: "9:30 am", end: "10:45 am", what: "Organic chemistry lecture", where: "Havemeyer 309", state: "done" },
      { t: "12:00 pm", end: "12:45 pm", what: "Lunch with Priya", where: "John Jay", state: "done" },
      { t: "1:05 pm", end: "", what: "Study block: Orgo ch. 7", where: "Butler Library", state: "now" },
      { t: "4:30 pm", end: "6:30 pm", what: "Chem lab", where: "Havemeyer, 5th floor", state: "next", stop: "Chem lab" },
      { t: "7:30 pm", end: "9:00 pm", what: "Study group: problem set 7", where: "Lerner 4th floor", state: "later" },
    ],
    athlete: [
      { t: "6:30 am", end: "7:50 am", what: "Team practice", where: "Baker Field", state: "done", training: true },
      { t: "9:30 am", end: "10:45 am", what: "Organic chemistry lecture", where: "Havemeyer 309", state: "done" },
      { t: "1:05 pm", end: "", what: "Study block: Orgo ch. 7", where: "Butler Library", state: "now" },
      { t: "4:30 pm", end: "5:30 pm", what: "Team lift", where: "Dodge Fitness Center", state: "next", stop: "Team lift" },
      { t: "7:30 pm", end: "8:30 pm", what: "Film session", where: "Campbell Center", state: "later" },
    ],
  };
  const WEEK = {
    student: [["Fri", "Chem quiz 9:30 am"], ["Sat", "No classes"], ["Mon", "Orgo midterm 9:30 am"]],
    athlete: [["Fri", "Travel to Penn, bus 3:00 pm"], ["Sat", "Away game at Penn, 1:00 pm"], ["Mon", "Orgo midterm 9:30 am"]],
  };

  window.HALFTIME_DEMO = {
    NIGHTS, USUAL, HRV_KIND,
    lateNights: () => NIGHTS.filter((n) => / am$/.test(n.studyEnd)).length, // study sessions past midnight, last 14 nights (laptop)
    today, calendar: (role) => CAL[role === "athlete" ? "athlete" : "student"], week: (role) => WEEK[role === "athlete" ? "athlete" : "student"],
    nextStop: (role) => (CAL[role === "athlete" ? "athlete" : "student"].find((e) => e.state === "next") || {}).stop || "Chem lab",
    PROVIDERS: { google: "Google Calendar", apple: "Apple Calendar", outlook: "Outlook" },
  };
})();
