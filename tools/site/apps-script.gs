// Halftime prototype analytics: paste into the Google Sheet's Extensions → Apps Script, set SECRET to the same
// value as the SHEET_SECRET env var in Vercel, then Deploy → New deployment → Web app
// (Execute as: Me · Who has access: Anyone). Copy the web app URL into Vercel as SHEET_WEBHOOK_URL.
// It appends each batch to the first tab ("events"), keeps one row per visitor in "visitors",
// and builds a "summary" tab of live formulas on first run. A script lock serialises writes, so many
// visitors sending at once can't overwrite each other.

const SECRET = "PASTE_THE_SAME_SECRET_AS_VERCEL";

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: "bad json" }); }
  if (!body || body.secret !== SECRET || !Array.isArray(body.rows)) return out({ ok: false, error: "denied" });
  const rows = body.rows.filter((r) => Array.isArray(r) && r.length === 26).slice(0, 200);
  if (!rows.length) return out({ ok: true, stored: 0 });
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const events = ss.getSheets()[0];
    if (events.getName() !== "events") events.setName("events");
    events.getRange(events.getLastRow() + 1, 1, rows.length, 26).setValues(rows);
    updateVisitors(ss, rows);
    ensureSummary(ss);
  } finally {
    lock.releaseLock();
  }
  return out({ ok: true, stored: rows.length });
}

function doGet() { return out({ ok: true, service: "halftime-analytics" }); }

// one row per visitor: first and last seen, name, IP, location, device, sessions and events so far
function updateVisitors(ss, rows) {
  let vs = ss.getSheetByName("visitors");
  if (!vs) {
    vs = ss.insertSheet("visitors");
    vs.appendRow(["visitor_id", "user_name", "first_seen", "last_seen", "ip", "country", "city", "device", "os", "browser", "screen", "events", "sessions", "last_page", "last_screen"]);
    vs.setFrozenRows(1);
  }
  const n = vs.getLastRow();
  const ids = n > 1 ? vs.getRange(2, 1, n - 1, 1).getValues().map((r) => r[0]) : [];
  const index = {}; ids.forEach((id, i) => { index[id] = i + 2; });
  const by = {};
  rows.forEach((r) => { const id = r[5]; if (!id) return; (by[id] = by[id] || []).push(r); });
  Object.keys(by).forEach((id) => {
    const rs = by[id], last = rs[rs.length - 1], sessions = {};
    rs.forEach((r) => { sessions[r[6]] = 1; });
    const name = rs.map((r) => r[7]).filter(String).pop() || "";
    if (index[id]) {
      const row = index[id], cur = vs.getRange(row, 1, 1, 15).getValues()[0];
      vs.getRange(row, 2, 1, 14).setValues([[name || cur[1], cur[2], last[0], last[1], last[2], last[4], last[8], last[9], last[10], last[11],
        Number(cur[11] || 0) + rs.length, Math.max(Number(cur[12] || 0), Object.keys(sessions).length), last[14], last[15]]]);
    } else {
      vs.appendRow([id, name, rs[0][0], last[0], last[1], last[2], last[4], last[8], last[9], last[10], last[11], rs.length, Object.keys(sessions).length, last[14], last[15]]);
      index[id] = vs.getLastRow();
    }
  });
}

// live summary: visitors, sessions, the funnel, time per screen, taps, rage taps, devices, places, errors
function ensureSummary(ss) {
  if (ss.getSheetByName("summary")) return;
  const s = ss.insertSheet("summary");
  const f = [
    ["Halftime prototype analytics", ""],
    ["Unique visitors", "=COUNTUNIQUE(events!F2:F)"],
    ["Sessions (tabs)", "=COUNTUNIQUE(events!G2:G)"],
    ["Named users", "=COUNTUNIQUE(FILTER(events!H2:H, events!H2:H<>\"\"))"],
    ["Events", "=COUNTA(events!N2:N)"],
    ["Rage taps", "=COUNTIF(events!N2:N, \"rage_tap\")"],
    ["Dead taps", "=COUNTIF(events!N2:N, \"dead_tap\")"],
    ["JS errors", "=COUNTIF(events!N2:N, \"js_error\")"],
    ["", ""],
    ["Funnel (visitors who reached each screen)", ""],
    ["Landing", "=COUNTUNIQUE(FILTER(events!F2:F, events!P2:P=\"landing\"))"],
    ["Log in or create account", "=COUNTUNIQUE(FILTER(events!F2:F, REGEXMATCH(events!P2:P, \"^(login|account)\")))"],
    ["Picked a wearable", "=COUNTUNIQUE(FILTER(events!F2:F, events!P2:P=\"wearable\"))"],
    ["Finished setup", "=COUNTUNIQUE(FILTER(events!F2:F, events!P2:P=\"done\"))"],
    ["Opened the app", "=COUNTUNIQUE(FILTER(events!F2:F, events!O2:O=\"/app\"))"],
    ["Saw a suggestion", "=COUNTUNIQUE(FILTER(events!F2:F, events!P2:P=\"walk\"))"],
    ["", ""],
  ];
  s.getRange(1, 1, f.length, 2).setValues(f);
  s.getRange(1, 4).setValue("Avg seconds per screen");
  s.getRange(2, 4).setFormula("=QUERY(events!N2:U, \"select O, avg(U)/1000, count(U) where N = 'screen_leave' group by O order by avg(U) desc label O 'screen', avg(U)/1000 'avg s', count(U) 'views'\", 0)");
  s.getRange(1, 8).setValue("Most-tapped");
  s.getRange(2, 8).setFormula("=QUERY(events!N2:Q, \"select Q, count(N) where N = 'tap' group by Q order by count(N) desc limit 25 label Q 'target', count(N) 'taps'\", 0)");
  s.getRange(1, 11).setValue("Devices");
  s.getRange(2, 11).setFormula("=QUERY(events!F2:K, \"select I, J, K, count(F) group by I, J, K order by count(F) desc label I 'device', J 'os', K 'browser', count(F) 'events'\", 0)");
  s.getRange(20, 1).setValue("Places");
  s.getRange(21, 1).setFormula("=QUERY(events!B2:F, \"select C, E, count(F) where C <> '' group by C, E order by count(F) desc label C 'country', E 'city', count(F) 'events'\", 0)");
  s.getRange(20, 4).setValue("Attention (seconds on screen per section)");
  s.getRange(21, 4).setFormula("=QUERY(events!N2:U, \"select Q, sum(U)/1000 where N = 'attention' group by Q order by sum(U) desc label Q 'section', sum(U)/1000 'seconds'\", 0)");
  s.setColumnWidth(1, 260);
}

function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
