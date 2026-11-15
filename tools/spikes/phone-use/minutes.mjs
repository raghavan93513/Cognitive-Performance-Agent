// Route B spike: turn "a picked app opened / closed" pings into minutes during a study session.
// Pure function, no I/O. The events never say WHICH app; only that one of the tester's picked apps
// opened or closed. See README.md in this folder and the spike note in the wiki (25-journal).
//
// events:  [{ t: epoch ms (server receive time), kind: "open" | "close" }]
// session: { start: epoch ms, end: epoch ms }
// opts.capMs: longest an open with no matching close is allowed to count (default 20 min).
//
// Rules (each one is there because of a documented or reported trigger behaviour):
// 1. open → close makes one stretch.
// 2. open while already open: keep the first open (direct switch between two picked apps,
//    or the two pings arriving out of order).
// 3. close with nothing open: if the last stretch ended within capMs and no open came since,
//    move its end to this close. Reported on iOS 26.6: "is closed" fires when Control Center
//    or Notification Center is pulled down while the app stays open, then fires again when
//    the person really leaves. Otherwise the close is ignored and counted as an orphan.
// 4. open with no close by the end: count up to min(session end, open + capMs) and flag it.
//    This is the screen-lock case: whether locking fires "is closed" is not documented.
// 5. Every stretch is clipped to the session window. Pass events from before the session
//    start too, so an app already open at the start is counted from the start.

export function pullMinutes(events, session, opts = {}) {
  const capMs = opts.capMs ?? 20 * 60 * 1000;
  const ev = [...events].filter(e => e && (e.kind === "open" || e.kind === "close") && Number.isFinite(e.t))
    .sort((a, b) => a.t - b.t);
  const flags = { unmatchedOpen: 0, orphanClose: 0, extended: 0, doubleOpen: 0 };
  const stretches = [];
  let openAt = null;
  let openSinceLast = false;

  for (const e of ev) {
    if (e.kind === "open") {
      if (openAt !== null) { flags.doubleOpen++; continue; }
      openAt = e.t; openSinceLast = true;
    } else {
      if (openAt !== null) {
        stretches.push({ from: openAt, to: e.t, capped: false });
        openAt = null; openSinceLast = false;
      } else {
        const last = stretches[stretches.length - 1];
        if (last && !openSinceLast && e.t - last.to <= capMs) { last.to = e.t; flags.extended++; }
        else flags.orphanClose++;
      }
    }
  }
  if (openAt !== null) {
    const to = Math.min(openAt + capMs, Math.max(openAt, session.end));
    stretches.push({ from: openAt, to, capped: true });
    flags.unmatchedOpen++;
  }

  let ms = 0, visits = 0, cappedInSession = 0;
  for (const s of stretches) {
    const from = Math.max(s.from, session.start), to = Math.min(s.to, session.end);
    if (to <= from) continue;
    ms += to - from; visits++;
    if (s.capped) cappedInSession++;
  }
  const sessionMin = Math.max(0, (session.end - session.start) / 60000);
  const minutes = Math.min(Math.round(ms / 60000), Math.round(sessionMin));
  // "check" means a number we would show with a caveat ("may be high: your phone locked
  // while one of your apps was open"), never silently.
  const quality = cappedInSession > 0 ? "check" : "ok";
  return { minutes, visits, quality, flags, sessionMinutes: Math.round(sessionMin) };
}
