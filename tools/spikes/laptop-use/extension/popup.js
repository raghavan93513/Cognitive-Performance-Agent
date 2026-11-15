import { SITES } from "./sites.js";

const $ = (id) => document.getElementById(id);
$("pick").addEventListener("click", () => chrome.runtime.openOptionsPage());

const { picks = [] } = await chrome.storage.local.get("picks");
const labelOf = (d) => (SITES.find((s) => s.domains.includes(d)) || { label: d }).label;
const names = [...new Set(picks.map(labelOf))];
$("picks").textContent = names.length ? `Your sites: ${names.join(", ")}` : "No sites picked yet, so nothing counts as a picked site.";

const st = await chrome.runtime.sendMessage({ type: "status" });
const n = (ms) => Math.round(ms / st.unitMs);

// Minutes per picked site, merged by label (x.com + twitter.com = X). Shown here only; Halftime never gets it.
function perSite(sites, toMin) {
  const by = {};
  for (const [d, v] of Object.entries(sites || {})) by[labelOf(d)] = (by[labelOf(d)] || 0) + toMin(v);
  return Object.entries(by).filter(([, m]) => m > 0).sort((a, b) => b[1] - a[1]);
}
function draw(title, b, sites) {
  const rows = [["Your picked sites", b.picked], ["Other tabs", b.other], ["Outside the browser", b.outside], ["Away (screen locked)", b.away]];
  $("title").textContent = title;
  $("buckets").innerHTML = rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v} min</td></tr>`).join("");
  $("sites").innerHTML = sites.length ? sites.map(([k, v]) => `<li>${k} <span>${v} min</span></li>`).join("") : "";
  $("sitesNote").hidden = !sites.length;
  $("report").hidden = false;
}

if (st.running) {
  const { ms, sites } = st.now;
  draw("This session so far", { picked: n(ms.picked), other: n(ms.other), outside: n(ms.outside), away: n(ms.away) }, perSite(sites, n));
} else if (st.last) {
  const L = st.last;
  draw("Last session", { picked: L.picked_min, other: L.other_min, outside: L.outside_min, away: L.away_min }, perSite(L.sites, (m) => m));
  $("state").textContent = "No session running.";
} else $("state").textContent = "No session running. Counting starts when you press Start in Halftime.";
