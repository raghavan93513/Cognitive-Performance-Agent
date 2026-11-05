"""Build the three suggestion-card mockup directions from one template + per-direction style + copy."""
import json, pathlib, sys
HERE = pathlib.Path(__file__).parent
OUT = pathlib.Path(sys.argv[1])
copy = json.loads((HERE / "copy.json").read_text())
tpl = (HERE / "template.html").read_text()

DIRS = {
 "A": dict(file="a-clear-card.html", title="A · Clear Card", theme="#F5F4F0", fonts="",
   vars="--bg:#F5F4F0;--card:#FFFFFF;--ink:#1C1C1E;--ink2:#3F3F44;--muted:#66666B;--line:#E7E5DF;--line2:#D5D3CC;"
        "--accent:#0E6B63;--accent-ink:#0B5E57;--on-accent:#FFFFFF;--accent-soft:#D5ECE8;--sec:#EFEEE9;--chip:#ECEAE4;"
        "--dot-on:#0E6B63;--dot-off:#D9D7D0;--track:#ECEAE4;--band:#C9E3DE;--scrim:rgba(20,20,20,.28);--shadow:0 1px 2px rgba(0,0,0,.04),0 8px 24px rgba(0,0,0,.05);",
   extra=""),
 "B": dict(file="b-forecast.html", title="B · Forecast", theme="#F2F5F7", fonts="",
   vars="--bg:#F2F5F7;--card:#FFFFFF;--ink:#0F1A24;--ink2:#34424F;--muted:#5D6B78;--line:#E1E7EC;--line2:#CBD5DD;"
        "--accent:#1B5E96;--accent-ink:#174F80;--on-accent:#FFFFFF;--accent-soft:#DCE9F5;--sec:#EAF0F4;--chip:#E6EDF2;"
        "--dot-on:#1B5E96;--dot-off:#D3DCE3;--track:#E6EDF2;--band:#B9CFE2;--scrim:rgba(10,20,30,.28);--shadow:0 1px 2px rgba(0,0,0,.04),0 8px 24px rgba(15,26,36,.05);",
   extra="h1{font-size:26px}.reason{font-size:16px}"),
 "C": dict(file="c-quiet.html", title="C · Quiet", theme="#111112",
   fonts='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap" rel="stylesheet">',
   vars="--bg:#111112;--card:#1B1B1D;--ink:#F2F1EE;--ink2:#CFCDC8;--muted:#9C9A95;--line:#2A2A2D;--line2:#3A3A3E;"
        "--accent:#E9B45A;--accent-ink:#F0C27A;--on-accent:#1A1408;--accent-soft:rgba(233,180,90,.18);--sec:#26262A;--chip:#2C2C30;"
        "--dot-on:#E9B45A;--dot-off:#3A3A3E;--track:#2C2C30;--band:#5A4A2A;--scrim:rgba(0,0,0,.5);--shadow:none;",
   extra=".card h1,.firstline{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:40px;line-height:1.08;letter-spacing:-.01em}"
         "@media (max-height:700px){.card h1{font-size:33px}}.firstline{font-size:34px}.card{background:transparent;border:0;box-shadow:none;padding:6px 0 4px}.reason{font-size:18px}.mk{border-color:var(--card)}"
         ".running-c .card{background:var(--card)}.btn{min-height:54px}.timer{font-weight:200}"),
}
for k, d in DIRS.items():
    html = (tpl.replace("{{DIR}}", k).replace("{{TITLE}}", d["title"]).replace("{{THEME}}", d["theme"])
               .replace("{{FONTS}}", d["fonts"]).replace("{{VARS}}", d["vars"]).replace("{{EXTRA_CSS}}", d["extra"])
               .replace("{{COPY}}", json.dumps(copy, ensure_ascii=False, indent=1)))
    (OUT / d["file"]).write_text(html)
    print("wrote", d["file"], len(html))
