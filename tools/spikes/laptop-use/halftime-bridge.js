// PROPOSED page-side code for site/assets/study.js (spike only; site/ is not edited).
// The Halftime page talks to the extension with chrome.runtime.sendMessage(EXTENSION_ID, …). Chrome and Edge expose
// chrome.runtime to a page only when an installed extension lists that page's origin in "externally_connectable".
// This is browser messaging, not a network request, so the site's Content-Security-Policy (connect-src 'self') needs no change.
//
// Where it would hook in study.js (2026-11-15 line numbers):
//   begin2(), after `S = {…}` (~line 401):     HalftimeLaptop.ask({ type: "start", id: S.id, maxMin: 360 });
//   endSession(), discard branch (~line 509):  HalftimeLaptop.ask({ type: "discard", id: S.id });
//   endSession(), normal end (~line 515):      HalftimeLaptop.ask({ type: "end", id: S.id }).then((r) => {
//       if (r && r.ok) sev("study_laptop", S.arm, { study: S.id, picked_min: r.picked_min, other_min: r.other_min,
//         outside_min: r.outside_min, away_min: r.away_min }); });   // four whole-minute totals, never which site
//   setup/consent, to show "Laptop minutes: on / not installed":   HalftimeLaptop.ask({ type: "hello" })
(function () {
  const EXTENSION_IDS = ["hgenhjkhjkkoenmjmggocollkdbdlond"]; // load-unpacked ID, fixed by the manifest "key". A Web Store copy would add its ID here.
  function askOne(id, msg, timeoutMs) {
    return new Promise((resolve) => {
      const rt = globalThis.chrome && globalThis.chrome.runtime;
      if (!rt || !rt.sendMessage) return resolve(null); // Safari, Firefox, or no extension installed for this site
      const t = setTimeout(() => resolve(null), timeoutMs);
      try {
        rt.sendMessage(id, msg, (reply) => { clearTimeout(t); void (rt.lastError); resolve(reply || null); });
      } catch { clearTimeout(t); resolve(null); }
    });
  }
  async function ask(msg, timeoutMs = 1500) {
    for (const id of EXTENSION_IDS) { const r = await askOne(id, msg, timeoutMs); if (r) return r; }
    return null; // null = no extension: the session simply has no laptop number ("not measured"), never 0
  }
  globalThis.HalftimeLaptop = { ask };
})();
