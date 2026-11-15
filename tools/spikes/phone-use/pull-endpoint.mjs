// Route B spike: a LOCAL stand-in for the endpoint an iOS Shortcuts automation would call.
// Not the live site/api/. Nothing is written to disk; events live in memory until you stop it.
//
//   node tools/spikes/phone-use/pull-endpoint.mjs              # 127.0.0.1:8787, this Mac only
//   HOST=0.0.0.0 node tools/spikes/phone-use/pull-endpoint.mjs # reachable from a phone on the same Wi-Fi (untested)
//
// POST /pull-event   body {"code":"<pairing code>","kind":"open"|"close"}  → 204
//   Any other key (an app name, a URL, a client clock) is refused with 400, so the server
//   cannot store which app even if a shortcut is edited to send it.
// GET  /minutes?code=..&start=<ms>&end=<ms>  → pullMinutes() for that window
// GET  /health

import http from "node:http";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { pullMinutes } from "./minutes.mjs";

const ALLOWED = new Set(["code", "kind"]);
const CODE = /^[a-z0-9]{8,32}$/;
const MAX_BODY = 200;
const events = new Map(); // code -> [{ t, kind }]

// Phone test only: check markers the tester taps on the laptop's /watch page ("starting check 3").
const marks = []; // { t, check }
const RESULTS_DIR = new URL("./results/", import.meta.url);

export function handle(req, res) {
  const url = new URL(req.url, "http://local");
  if (req.method === "GET" && url.pathname === "/health") return send(res, 200, { ok: true });

  if (req.method === "GET" && url.pathname === "/watch") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(WATCH_HTML);
    return;
  }
  if (req.method === "GET" && url.pathname === "/events") {
    const code = url.searchParams.get("code") || "";
    return send(res, 200, { now: Date.now(), events: events.get(code) || [], marks });
  }
  if (req.method === "POST" && url.pathname === "/mark") {
    const check = Number(url.searchParams.get("check"));
    if (!Number.isInteger(check) || check < 0 || check > 20) return send(res, 400, { error: "check" });
    marks.push({ t: Date.now(), check });
    return send(res, 200, { ok: true });
  }
  if (req.method === "POST" && url.pathname === "/save") {
    const code = url.searchParams.get("code") || "";
    if (!CODE.test(code)) return send(res, 400, { error: "code" });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const file = new URL(`run-${stamp}.json`, RESULTS_DIR);
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
    fs.writeFileSync(file, JSON.stringify({ note: "phone test run, open/close pings only, no app names", events: events.get(code) || [], marks }, null, 2));
    return send(res, 200, { saved: file.pathname.split("/").slice(-2).join("/") });
  }

  if (req.method === "GET" && url.pathname === "/minutes") {
    const code = url.searchParams.get("code") || "";
    const start = Number(url.searchParams.get("start")), end = Number(url.searchParams.get("end"));
    if (!CODE.test(code) || !Number.isFinite(start) || !Number.isFinite(end) || end <= start)
      return send(res, 400, { error: "code, start, end" });
    return send(res, 200, pullMinutes(events.get(code) || [], { start, end }));
  }

  if (req.method === "POST" && url.pathname === "/pull-event") {
    let body = "", tooBig = false;
    req.on("data", c => {
      if (tooBig) return;
      body += c;
      if (body.length > MAX_BODY) { tooBig = true; res.writeHead(413, { connection: "close" }).end(); }
    });
    req.on("end", () => {
      if (tooBig) return;
      let j;
      try { j = JSON.parse(body); } catch { return send(res, 400, { error: "json" }); }
      if (!j || typeof j !== "object" || Array.isArray(j)) return send(res, 400, { error: "json" });
      const extra = Object.keys(j).filter(k => !ALLOWED.has(k));
      if (extra.length) return send(res, 400, { error: "only code and kind are accepted" });
      if (!CODE.test(j.code) || (j.kind !== "open" && j.kind !== "close")) return send(res, 400, { error: "code, kind" });
      const list = events.get(j.code) || [];
      list.push({ t: Date.now(), kind: j.kind }); // server clock only
      if (list.length > 5000) list.shift();
      events.set(j.code, list);
      res.writeHead(204).end();
    });
    return;
  }
  if (url.pathname === "/pull-event") return send(res, 405, { error: `got ${req.method}, set Method to POST` });
  send(res, 404, { error: `not found: ${req.method} ${url.pathname}` });
}

const CHECKS = [
  "Open it, use 2 min, swipe up to Home → open + close",
  "Open it, switch to Safari from the app switcher → open + close",
  "Open it, lock with the side button → close? (undocumented)",
  "Open it, pull down Control Center, back to the app → no close",
  "Restart the phone, open the app → open still fires?",
  "Lock 5 min, unlock straight into the app → open",
  "Airplane mode on, open + close, airplane off → lost pings",
  "Any banner or prompt at any point? (note it on paper)",
];
const WATCH_HTML = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Phone test watch</title>
<style>body{font:15px/1.4 -apple-system,system-ui,sans-serif;margin:16px;max-width:760px;background:#fff;color:#111}
button{font:inherit;padding:6px 10px;margin:2px 0;border:1px solid #888;border-radius:6px;background:#f4f4f4;cursor:pointer;text-align:left;width:100%}
table{border-collapse:collapse;width:100%;margin-top:8px}td,th{border-bottom:1px solid #ddd;padding:4px 6px;text-align:left}
.open{color:#0a6}.close{color:#c50}.mark td{background:#eef;font-weight:600}small{color:#666}</style>
<h1 style="font-size:20px">Phone test: live pings</h1>
<p><small>Local spike only. Code <b>phonetest01</b>. Tap a check before you do it on the phone; pings show up below within a second.</small></p>
<div id="checks"></div>
<p><b>Minutes since the first check:</b> <span id="mins">–</span> <button id="save" style="width:auto">Save this run</button> <small id="saved"></small></p>
<table><thead><tr><th>Time</th><th>What</th><th>Gap</th></tr></thead><tbody id="rows"></tbody></table>
<script>
const CHECKS=${JSON.stringify(CHECKS)}, code="phonetest01";
document.getElementById("checks").innerHTML=CHECKS.map((c,i)=>'<button data-c="'+(i+1)+'">Start check '+(i+1)+': '+c+'</button>').join("");
document.getElementById("checks").onclick=e=>{const c=e.target.dataset.c;if(c)fetch("/mark?check="+c,{method:"POST"}).then(load)};
document.getElementById("save").onclick=()=>fetch("/save?code="+code,{method:"POST"}).then(r=>r.json()).then(j=>document.getElementById("saved").textContent="saved "+j.saved);
const hm=t=>new Date(t).toLocaleTimeString();
async function load(){const j=await (await fetch("/events?code="+code)).json();
 const all=[...j.events.map(e=>({...e,type:"ping"})),...j.marks.map(m=>({...m,type:"mark"}))].sort((a,b)=>a.t-b.t);
 let prev=null;const rows=all.map(x=>{if(x.type==="mark")return '<tr class="mark"><td>'+hm(x.t)+'</td><td colspan=2>check '+x.check+' started</td></tr>';
  const gap=prev?Math.round((x.t-prev)/1000)+" s":"";prev=x.t;return '<tr><td>'+hm(x.t)+'</td><td class="'+x.kind+'">'+x.kind+'</td><td>'+gap+'</td></tr>'});
 document.getElementById("rows").innerHTML=rows.reverse().join("");
 if(j.marks.length){const r=await (await fetch("/minutes?code="+code+"&start="+(j.marks[0].t-60000)+"&end="+j.now)).json();
  document.getElementById("mins").textContent=r.minutes+" min, "+r.visits+" visits, "+r.quality+" "+JSON.stringify(r.flags)}}
load();setInterval(load,1000);
</script>`;

function send(res, status, obj) {
  res.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(obj));
}

export function start(port = Number(process.env.PORT) || 8787, host = process.env.HOST || "127.0.0.1") {
  const server = http.createServer(handle);
  return new Promise(r => server.listen(port, host, () => r(server)));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const s = await start();
  const a = s.address();
  console.log(`pull-endpoint (spike, local, in memory) on http://${a.address}:${a.port}`);
}
