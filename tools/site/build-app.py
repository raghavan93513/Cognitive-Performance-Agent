#!/usr/bin/env python3
"""Build site/app.html (the working phone app) from the round-3 design mockup.

    python3 tools/site/build-app.py

Takes design/mockups/suggestion-card-v3/island-forecast.html (the Island + Forecast the team picked) and adds:
the signed-in profile from setup (name, wearable, athlete), tabs (Now, History, You), a Demo sheet to jump to
any moment, wiring for the buttons that did nothing in the mockup, and analytics (assets/track.js).
Since 2026-11-13 the Now tab is the person's own study session (assets/study.js: a real timer, one suggestion at the
real moment, a check-in), and the mockup's sample day is what the Demo tab plays.
Every patch must match exactly once, so a change to the mockup fails loudly instead of silently.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "design/mockups/suggestion-card-v3/island-forecast.html"
OUT = ROOT / "site/app.html"
s = SRC.read_text()


def rep(a, b, count=1):
    global s
    n = s.count(a)
    if n != count:
        raise SystemExit(f"patch expected {count}, found {n}: {a[:90]!r}")
    s = s.replace(a, b)


# ---------- head
rep("<title>Halftime · Island + Forecast</title>",
    '<title>Halftime</title>\n<meta name="robots" content="noindex">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n<link rel="manifest" href="/manifest.webmanifest">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Halftime">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">')
rep(".island{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 76px)}",
    ".island{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 150px)}")

CSS = r"""
/* ---- app shell (site build): tabs, history, you, demo sheet, toast ---- */
.page,.settings,.tabview{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 92px)!important}
.tabbar{position:fixed;left:0;right:0;bottom:0;z-index:4;background:var(--paper);border-top:1px solid var(--line);display:flex;justify-content:center;padding:6px max(10px, env(safe-area-inset-right,0px)) calc(env(safe-area-inset-bottom,0px) + 6px) max(10px, env(safe-area-inset-left,0px))}
.tabbar .in{display:grid;grid-template-columns:repeat(4,1fr);width:100%;max-width:520px}
.tabbar button{min-height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font:500 .75rem/1 var(--ui);color:var(--muted)}
.tabbar button[aria-current="page"]{color:var(--ink)}
.tabbar svg{width:24px;height:24px}
.tabview{max-width:520px;margin:0 auto;min-height:100dvh;padding:calc(env(safe-area-inset-top,0px) + 18px) 20px 0;background:var(--paper)}
.tabview h1{font:650 2rem/1.05 var(--ui);letter-spacing:-.035em}
.tabview .sub2{color:var(--ink2);margin-top:6px}
.hc{background:#fff;border-radius:22px;padding:16px 18px;margin-top:14px}
.hc h2{font:600 1rem/1.2 var(--ui);display:flex;align-items:center;gap:8px}
.hc .smp{margin-left:auto}
.stats3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px}
.stats3 div{background:var(--paper);border-radius:14px;padding:10px 12px}
.stats3 b{display:block;font:600 1.375rem/1.1 var(--ui);letter-spacing:-.02em}
.stats3 span{font-size:.75rem;color:var(--muted)}
.bars{position:relative;display:flex;align-items:flex-end;gap:4px;height:140px;margin-top:14px}
.bars .b{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:5px;height:100%}
.bars .b i{display:block;width:100%;border-radius:4px;background:var(--ink)}
.bars .b i.lo{background:#8B8983}
.bars .b small{font:500 .75rem/1 var(--mono);color:var(--muted);height:12px;white-space:nowrap}
.bars .usual{position:absolute;left:0;right:0;border-top:2px dashed var(--refill-ink)}
.bars .usual em{position:absolute;right:0;top:-19px;font:500 .75rem/1 var(--mono);font-style:normal;color:var(--refill-ink);background:#fff;padding:2px 4px}
.legend2{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;font-size:.8125rem;color:var(--ink2)}
.legend2 span{display:inline-flex;align-items:center;gap:6px}
.legend2 i{display:inline-block;width:12px;height:12px;border-radius:3px;background:var(--ink)}
.log{list-style:none;margin-top:8px}
.log li{display:grid;grid-template-columns:auto 1fr auto;gap:2px 12px;padding:11px 0;border-top:1px solid var(--line);align-items:baseline}
.log li:first-child{border-top:0}
.log .when{font:500 .75rem/1.2 var(--mono);color:var(--muted);grid-row:span 2;min-width:62px}
.log b{font-weight:600;font-size:.9375rem}
.log .what{grid-column:2;font-size:.8125rem;color:var(--ink2)}
.log .res{grid-row:1;grid-column:3;font:500 .75rem/1 var(--mono);border-radius:6px;padding:4px 6px;background:var(--paper)}
.log .res.took{background:rgba(142,214,188,.35);color:var(--refill-ink)}
.acct{display:flex;gap:14px;align-items:center}
.acct .av{width:52px;height:52px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font:600 1.25rem/1 var(--ui)}
.rowbtn{display:flex;align-items:center;justify-content:space-between;width:100%;min-height:52px;text-align:left;border-top:1px solid var(--line);font-weight:500}
.rowbtn:first-of-type{border-top:0}
.rowbtn span{color:var(--muted);font-size:.875rem}
.rowbtn.danger{color:#B42318}
.swt{flex:none;width:50px;height:30px;border-radius:15px;background:var(--line);position:relative;transition:background .2s ease}
.swt::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .2s var(--ease)}
[aria-checked="true"] .swt{background:var(--refill-ink)}
[aria-checked="true"] .swt::after{transform:translateX(20px)}
.demobtn{position:fixed;left:max(12px, env(safe-area-inset-left,0px));top:calc(env(safe-area-inset-top,0px) + 10px);z-index:4;min-height:44px;padding:0 16px;border-radius:22px;background:var(--ink);color:var(--paper);font:600 .875rem/1 var(--ui);display:inline-flex;align-items:center;gap:8px;box-shadow:0 8px 20px rgba(0,0,0,.18)}
.demobtn::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--refill)}
.scrim{position:fixed;inset:0;z-index:19;background:rgba(20,20,20,.38);opacity:0;pointer-events:none;transition:opacity .2s ease}
.scrim.on{opacity:1;pointer-events:auto}
.dsheet{position:fixed;left:0;right:0;bottom:0;z-index:20;background:var(--paper);border-radius:26px 26px 0 0;max-width:560px;margin:0 auto;max-height:82dvh;overflow:auto;padding:10px 18px calc(env(safe-area-inset-bottom,0px) + 18px);transform:translateY(105%);transition:transform .32s var(--spring)}
.dsheet.on{transform:none}
.dsheet .grab{width:40px;height:5px;border-radius:3px;background:var(--line);margin:4px auto 12px}
.dsheet h2{font:650 1.375rem/1.1 var(--ui);letter-spacing:-.02em}
.dsheet p.s{color:var(--ink2);font-size:.9375rem;margin-top:4px}
.dlist{display:grid;gap:8px;margin-top:14px}
.dlist button{display:flex;flex-direction:column;align-items:flex-start;gap:3px;text-align:left;min-height:56px;padding:12px 14px;border-radius:16px;background:#fff;width:100%}
.dlist b{font-weight:600}
.dlist span{font-size:.8125rem;color:var(--muted)}
.dclose{min-height:48px;width:100%;margin-top:10px;font-weight:600;color:var(--ink2)}
.htoast{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 80px);transform:translate(-50%,8px);z-index:30;background:var(--ink);color:var(--paper);border-radius:16px;padding:11px 15px;font-size:.9375rem;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s var(--ease);max-width:calc(100% - 32px);text-align:center}
.htoast.on{opacity:1;transform:translate(-50%,0)}
.hello{font:500 .875rem/1 var(--ui);color:var(--muted);margin-bottom:10px}
.paused .slot,.paused .t-slot{opacity:.25}
.quiet{font:300 4rem/1 var(--ui);letter-spacing:-.05em;color:var(--refill);margin-top:8px}
@media (prefers-reduced-motion:reduce){.dsheet,.scrim,.htoast{transition:none}}
/* phone QA pass 2: the moved session line takes its room with it; second-line labels stay on screen; footer gaps;
   a narrower walk pill; the unpaired-laptop line; a chip tap in See why flashes its row */
.stack{transition:transform .5s var(--spring),margin-bottom .5s var(--spring)}
.ticks .t-slot{left:min(81%, calc(100% - 62px))!important}
.ticks .t-check{left:min(87%, calc(100% - 58px))!important}
.foot{column-gap:12px}
.foot button{line-height:1.2}
.foot button:first-child{text-align:left}
.foot button:last-child{text-align:right}
.island.live{width:min(260px,calc(100vw - 24px))}
.unpaired{display:flex;align-items:center;min-height:44px;margin-top:4px;font:500 .875rem/1.3 var(--ui);color:var(--refill-ink);text-decoration:none}
.morning .unpaired{display:none}
.ev .row{border-radius:8px}
.ev .row.hl{animation:hl 2.2s ease-out}
@keyframes hl{0%,45%{background:rgba(142,214,188,.3)}100%{background:transparent}}
.hc h2 .smp{font:500 .75rem/1.3 var(--mono);color:var(--muted);text-align:right}
.sparkx{display:flex;justify-content:space-between;gap:8px;font:500 .75rem/1 var(--mono);color:var(--muted);margin-top:6px}
.sparkx .u{color:var(--refill-ink)}
@media (prefers-reduced-motion:reduce){.stack{transition:none}.ev .row.hl{animation:none;background:rgba(142,214,188,.3)}}
.htoast{box-shadow:0 0 0 1px rgba(255,255,255,.28),0 10px 24px rgba(0,0,0,.28)}
.hc h2 + .rowbtn{margin-top:6px}
/* ---- your own session (assets/study.js) */
#study{overflow-wrap:anywhere}
#study .subject{gap:12px}
#study .subject span{min-width:0}
#study .subject span:last-child{flex:none}
#study .next > div{min-width:0}
#study{display:flex;flex-direction:column}
#study[hidden]{display:none}
#study h1{text-wrap:balance}
.slead{color:var(--ink2);margin-top:6px;text-wrap:pretty}
.slead b{font-weight:600;color:var(--ink)}
#study .log li{grid-template-columns:auto 1fr}
#study .log .what{grid-column:2}
.scard .status{gap:10px}
.scard .status span:last-child{text-align:right}
.scard .ev .row{display:block}
.scard .ev .val{display:block;font:600 1rem/1.3 var(--ui);color:var(--on);margin-top:2px}
.scard .ev .m{display:block;margin-top:2px}
.sbtn{display:flex;align-items:center;justify-content:center;min-height:52px;padding:0 20px;border-radius:26px;background:var(--ink);color:var(--paper);font:600 1rem/1.15 var(--ui);text-align:center;text-decoration:none;transition:transform .12s var(--ease)}
.sbtn:active{transform:scale(.97)}
.sbtn.big{min-height:58px;border-radius:29px;font-size:1.0625rem;width:100%;margin-top:18px}
.sbtn.ghost{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
.sbtn.sm{min-height:44px;border-radius:22px;font-size:.875rem;padding:0 16px}
.sbtn.pick{background:#fff;color:var(--ink);min-height:60px;border-radius:20px;justify-content:flex-start;font-size:1.0625rem;width:100%}
.sbtn.danger{background:#B42318;color:#fff}
.sbtn[disabled]{opacity:.5}
.slink{min-height:44px;font:500 .875rem/1 var(--ui);color:var(--muted);margin:6px auto 0;display:block}
.srow{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.srow.two{display:grid;grid-template-columns:1fr 1fr;margin-top:0}
.scol{display:grid;gap:10px;margin-top:20px}
.scol .sbtn.big{margin-top:0}
.schip{min-height:44px;padding:0 16px;border-radius:22px;background:var(--paper);font:500 .9375rem/1 var(--ui);color:var(--ink2)}
.schip[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.sfine{font-size:.8125rem;line-height:1.45;color:var(--muted);margin-top:8px}
.sfine b{color:var(--ink2);font-weight:600}
.sfine.qa{color:#B42318}
.sfine.deliv{margin-top:14px;text-align:center}
.sfoot{display:block;text-align:center;margin-top:16px;line-height:1.4}
.snote .sbtn{margin-top:10px}
.sval{font:650 1.75rem/1.1 var(--ui);letter-spacing:-.03em;margin-top:10px}
.sval.sm{font-size:1.125rem;letter-spacing:-.01em;margin-top:12px}
.stepper{display:grid;grid-template-columns:52px 1fr 52px;align-items:center;gap:8px;margin-top:10px;text-align:center}
.stepper .sval{margin-top:0}
.stepper button{width:52px;height:52px;border-radius:50%;background:var(--paper);font:500 1.5rem/1 var(--ui)}
.sinput,.sfields input{width:100%;min-height:48px;border-radius:14px;border:1px solid var(--line);background:var(--paper);padding:0 14px;font:400 1rem/1.2 var(--ui);color:var(--ink);margin-top:10px;-webkit-appearance:none;appearance:none}
.sfields{display:grid;grid-template-columns:1.4fr 1fr;gap:10px;margin-top:4px}
.sfields label{font:500 .8125rem/1 var(--ui);color:var(--ink2);margin-top:10px;min-width:0}
.sfields input{margin-top:6px}
.sticky{position:sticky;bottom:calc(env(safe-area-inset-bottom,0px) + 66px);z-index:2;margin-top:6px;padding:14px 0 8px;background:linear-gradient(transparent,var(--paper) 26%)}
.sticky::after{content:"";position:absolute;left:0;right:0;top:100%;height:60px;background:var(--paper)}
.sticky .sbtn.big{margin-top:6px}
.sticky.col{display:grid;gap:8px}
.steps{margin:10px 0 0 18px;font-size:.9375rem;color:var(--ink2);display:grid;gap:6px}
.clist{list-style:none;margin-top:8px;display:grid;gap:9px;font-size:.9375rem;line-height:1.4;color:var(--ink2)}
.clist b{color:var(--ink);font-weight:600}
#study .sh{margin-bottom:4px}
#study .hero{margin-top:6px}
#study .hero.dim{opacity:.3}
#study .hero.dim2{opacity:.45;margin-top:22px}
#study .clock{font-size:clamp(4rem,23vw,6rem)}
#study .clock small{margin-left:2px}
#study .clock .secs{font:300 1.75rem/1 var(--ui);letter-spacing:-.02em;color:var(--muted);margin-right:8px}
.quietline{margin-top:6px}
.sline{margin-top:26px}
.sline .slot.on{opacity:1;transform:none;transition:none}
.sline .fill.on{width:auto;background:var(--refill);transition:none}
.sticks{display:flex;justify-content:space-between;height:auto}
.sticks span{position:static}
#study .next{margin-top:18px}
.sact{margin-top:12px}
.scard{background:var(--island);color:var(--on);border-radius:32px;padding:20px 22px 16px;margin-bottom:18px;box-shadow:0 12px 32px rgba(0,0,0,.2);animation:scard .45s var(--spring)}
.scard :focus-visible{outline-color:var(--refill)}
.scard.brk{padding-bottom:22px}
@keyframes scard{from{opacity:0;transform:translateY(-10px) scale(.98)}}
.scard .links{flex-wrap:wrap;margin-top:8px}
.scard .rungs{display:grid;gap:8px;margin-top:14px}
.scard .rung{display:flex;flex-direction:column;gap:3px;text-align:left;background:var(--well);border-radius:16px;padding:12px 14px;min-height:60px;color:var(--on);width:100%}
.scard .rung b{font-weight:600}.scard .rung span{font-size:.875rem;color:var(--on2)}
.bleft{font:300 5rem/1 var(--ui);letter-spacing:-.05em;color:var(--refill);margin-top:10px}
.pvt{display:grid;place-items:center;width:100%;height:220px;border-radius:24px;background:var(--ink);color:var(--paper);font:500 2.5rem/1 var(--mono);margin-top:16px;touch-action:manipulation}
.pvt.go{color:#FFD60A}
.susq{font-size:1.5rem!important;line-height:1.2!important;min-height:5.4em}
.sus{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:8px}
.sus button{min-height:60px;border-radius:18px;background:#fff;font:600 1.25rem/1 var(--ui)}
.susl{display:flex;justify-content:space-between;font-size:.8125rem;color:var(--muted);margin-top:8px}
@media (prefers-reduced-motion:reduce){.scard{animation:none}.sbtn{transition:none}}
/* ---- the laptop: the same app, laid out for a wide screen (1024 px and up). One study engine on every screen. */
#study .cols,#study .c1,#study .c2{display:contents}
#study .scard{order:-1}
.tbrand,.tsrc{display:none}
kbd{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 5px;margin-left:10px;border-radius:5px;border:1px solid currentColor;opacity:.6;font:500 .75rem/1 var(--mono);letter-spacing:0;vertical-align:1px}
.hc.side h2{font-size:1.0625rem}
.keys{display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;margin-top:16px;padding-top:14px;border-top:1px solid var(--line)}
.keys div{display:flex;align-items:center;gap:8px;font-size:.8125rem;color:var(--ink2)}
.keys kbd{margin-left:0;opacity:.8}
.lapnote{margin-top:14px}
a.rowbtn{color:inherit;text-decoration:none}
@media (min-width:1024px){
  .tabbar{top:0;bottom:auto;border-top:0;border-bottom:1px solid var(--line);padding:0 28px;height:60px;align-items:center}
  .tabbar .in{display:flex;align-items:center;gap:4px;max-width:1120px}
  .tbrand{display:inline-flex;align-items:center;gap:10px;margin-right:auto;min-height:44px;font:600 1.0625rem/1 var(--ui);letter-spacing:-.01em;color:var(--ink);text-decoration:none}
  .tbrand i{position:relative;width:30px;height:12px;border-radius:6px;background:var(--ink)}
  .tbrand i::after{content:"";position:absolute;left:4px;top:3px;width:6px;height:6px;border-radius:50%;background:var(--refill)}
  .tabbar button{flex-direction:row;min-height:40px;padding:0 14px;border-radius:10px;gap:8px;font-size:.875rem;color:var(--ink2)}
  .tabbar button:hover{color:var(--ink)}
  .tabbar button[aria-current="page"]{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
  .tabbar svg{width:18px;height:18px}
  .tsrc{display:inline-flex;align-items:center;min-height:40px;margin-left:10px;padding:0 0 0 14px;border-left:1px solid var(--line);font:500 .8125rem/1 var(--ui);color:var(--muted);text-decoration:none}
  .tsrc:hover{color:var(--ink);text-decoration:underline;text-underline-offset:3px}
  .page,.settings,.tabview{padding-bottom:56px!important}
  .tabview{max-width:1120px;padding:92px 28px 0}
  .page{padding-top:136px}.settings{padding-top:84px}
  .island{top:72px}
  .htoast{bottom:32px}
  #study .cols{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:32px;align-items:start}
  #study .c1,#study .c2{display:block;min-width:0}
  #study .c2{position:sticky;top:80px}
  #study .c2>.hc:first-child,#study .c2>.scard:first-child{margin-top:0}
  #study[data-view="idle"] .lead1{padding:56px 0 0}
  #study[data-view="idle"] h1{font-size:3.25rem;line-height:1}
  #study[data-view="idle"] .slead{font-size:1.125rem;max-width:30em;margin-top:12px}
  #study[data-view="idle"] .lead1 .sbtn.big{display:inline-flex;width:auto;padding:0 36px;margin-top:28px}
  #study[data-view="idle"] .c2{top:92px}
  #study[data-view="setup"] h1{margin-bottom:6px}
  #study .sticky{bottom:24px;display:flex;justify-content:flex-end;background:none;padding:0;pointer-events:none}
  #study .sticky::after{display:none}
  #study .sticky .sbtn{pointer-events:auto}
  #study .sticky .sbtn.big{width:auto;padding:0 40px;box-shadow:0 10px 28px rgba(20,20,20,.18)}
  #study .sticky.col{flex-direction:row;gap:10px}
  #study .sfine.deliv{text-align:right}
  #study[data-view="live"] .hero.dim{opacity:1;filter:none}
  #study[data-view="live"] .hero,#study[data-view="break"] .hero{margin-top:18px}
  #study .clock{font-size:8rem}
  #study[data-view="break"] .hero.dim2{opacity:.55}
  #study .scard{margin:0;animation-name:scardside}
  #study .sline{margin-top:30px}
  #study .sact{margin-top:16px}
  #study:is([data-view="checkin"],[data-view="done"],[data-view="sus"],[data-view="stale"],[data-view="delete"],[data-view="consent"]){max-width:720px}
  #study[data-view="consent"] .hc{margin-top:14px}
  #history,#you{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:20px;align-content:start}
  #history>:not(section),#you>:not(section),#h-real,#you>.acct{grid-column:1/-1}
  #history>section,#you>section{min-width:0}
  .dsheet{bottom:24px;border-radius:26px;max-height:76vh}
}
@keyframes scardside{from{opacity:0;transform:translateX(12px)}}
@media (prefers-reduced-motion:reduce){#study .scard{animation:none}}

"""
rep("</style>", CSS + "</style>")

# ---------- buttons that did nothing in the mockup
rep('<nav class="foot"><button>Talk to someone</button><span class="smp">Sample data</span><button>Pause suggestions</button></nav>',
    '<nav class="foot"><button data-act="talk">Talk to someone</button><span class="smp">Sample data</span><button data-act="pause" class="pausebtn">Pause suggestions</button></nav>')
rep('<nav class="foot" style="margin-top:18px"><button>Talk to someone</button><span class="smp">Sample data</span><button>Pause suggestions</button></nav>',
    '<nav class="foot" style="margin-top:18px"><button data-act="talk">Talk to someone</button><span class="smp">Sample data</span><button data-act="pause" class="pausebtn">Pause suggestions</button></nav>')
rep('<button class="a no">+5 min</button>', '<button class="a no" data-act="plus5">+5 min</button>')
rep('<button class="rung first"><b>Book a time to talk</b>', '<button class="rung first" data-go="escbook"><b>Book a time to talk</b>')
rep('<button class="rung"><b>Talk to someone now</b>', '<button class="rung" data-go="escnow"><b>Talk to someone now</b>')
rep('<button class="rung"><b>Something for right now</b>', '<button class="rung" data-go="escquiet"><b>Something for right now</b>')
rep('const chip = (k, l) => `<button class="chip" aria-label="Source ${k}: ${l}">${k}</button>`;',
    'const chip = (k, l) => `<button class="chip" data-go="why" aria-label="Source ${k}: ${l}. See why">${k}</button>`;')

# ---------- attention areas (what was on screen, for how long)
rep('<section class="hero" aria-label="This session">', '<section class="hero" aria-label="This session" data-attn="now-clock">')
rep('<section class="forecast" aria-label=', '<section class="forecast" data-attn="now-forecast" aria-label=')
rep('<div class="next"><span class="sq"', '<div class="next" data-attn="now-next"><span class="sq"')
rep('<div class="full" id="full"></div>', '<div class="full" id="full" data-attn="island-card"></div>')

# ---------- the signed-in profile from setup (name, wearable, athlete)
rep('const Q = new URLSearchParams(location.search);',
    'const Q = new URLSearchParams(location.search);\n'
    '// ?preview=1: the admin heat map shows a screen with a sample profile; nothing is saved or recorded\n'
    'const PREVIEW = Q.get("preview") === "1";\n'
    'const PROFILE = PREVIEW ? { name: "Maya", done: true, signedIn: true, role: "student", device: "oura", cal: true, calProvider: "google", next: "Chem lab", paired: true }\n'
    '  : (() => { try { return JSON.parse(localStorage.getItem("ht-profile") || "{}"); } catch { return {}; } })();\n'
    '// the laptop is the one required source; until it is paired (setup: "Do this later"), the study session is sample data\n'
    'const PAIRED = PROFILE.paired === true;\n'
    'const SUBJ0 = document.getElementById("subj").innerHTML;')
rep('  apple: { name: "Apple Watch", short: "Apple Watch", glyph: "watch", via: "through Apple Health", app: "Health", acct: "Apple Health" },',
    '  apple: { name: "Apple Watch", short: "Apple Watch", glyph: "watch", via: "through Apple Health", app: "Health", acct: "Apple Health" },\n'
    '  garmin: { name: "Garmin Forerunner", short: "Garmin", glyph: "band", via: "through Garmin Connect", app: "Garmin Connect", acct: "your Garmin account" },')
rep('const TEAM = Q.get("team") === "1";', 'const TEAM = Q.get("team") === "1" || PROFILE.role === "athlete";')
rep('let devKey = Q.get("device") || "fitbit";', 'let devKey = Q.get("device") || PROFILE.device || "fitbit";')
rep('const morning = /^(esc|connect|reconnect)/.test(Q.get("state") || "");', 'let morning = /^(esc|connect|reconnect)/.test(Q.get("state") || "");')
rep('  document.getElementById("clock").innerHTML = walking ?',
    '  document.getElementById("subj").innerHTML = SUBJ0; document.getElementById("ctime").textContent = "2:40";\n'
    '  document.getElementById("clock").innerHTML = walking ?')

# ---------- three new card states for the talk-to-someone ladder (sample words; real services to be confirmed)
rep("const V = {", r"""const V = {
  escbook: () => `<div class="status"><span>Halftime · morning</span><span>you choose</span></div>
    <h1 class="q q2">Book a time to talk</h1>
    <p class="why">In the real app this opens your campus counseling booking page. <b>Demo:</b> the service and link are still to be confirmed with Columbia Health.</p>
    <div class="acts"><button class="a yes" data-go="escdone2">Pick a time (demo)</button><button class="a no" data-go="escalate">Back</button></div>`,
  escdone2: () => `<div class="status"><span>Halftime · morning</span><span>booked (demo)</span></div>
    <h1 class="q q2">Thursday, 2:00 pm. You're booked.</h1>
    <p class="why">Sample booking. Halftime won't ${dev() ? "mention sleep" : "bring this up"} again before then. You can cancel any time.</p>
    <div class="acts"><button class="a yes" data-go="idle">Done</button><button class="a no" data-go="escalate">Back</button></div>`,
  escnow: () => `<div class="status"><span>Halftime · morning</span><span>you choose</span></div>
    <h1 class="q q2">Talk to someone now</h1>
    <p class="why">In the real app this connects you to campus counseling, any time of day. <b>Demo:</b> the number is still to be confirmed with Columbia Health. In an emergency, call 911.</p>
    <div class="acts"><button class="a no" data-go="escalate">Back</button><button class="a no" data-go="idle">Close</button></div>`,
  escquiet: () => `<div class="status"><span>Halftime · two quiet minutes</span><span>breathe slowly</span></div>
    <p class="quiet" id="qt">2:00</p>
    <p class="why">Breathe in for 4, out for 6. Nothing to do but this.</p>
    <div class="acts"><button class="a yes" data-go="idle">Done</button><button class="a no" data-go="escalate">Back</button></div>`,""")

# ---------- every state change goes through here: header mode, tab, analytics
rep('const start = Q.get("state") || "walk";', r"""const _go = go;
go = function (s) {
  morning = /^(esc|connect|reconnect)/.test(s);
  if (window.APP) APP.beforeGo(s);
  _go(s);
  if (window.APP) APP.afterGo(s);
  if (window.HT) HT.screen(s, { device: devKey });
};
const start = Q.get("state") || "idle";""")

# ---------- QA fixes (2026-11-06)
# 1. the card's scroll area matched the old island height, so its bottom buttons were cut off
rep(".island.open .full{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 76px);",
    ".island.open .full{max-height:calc(100dvh - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px) - 150px);")
# 2. "Change source" had no way back; 4. every wearable setup offers is connectable here too
rep("Halftime never sends them anything.</p>`,", "Halftime never sends them anything.</p>\n    <div class=\"links\"><button data-go=\"sources\">Back</button></div>`,")
rep('<div class="src off" aria-disabled="true">${glyph("watch")}<span><b>Apple Watch</b><span>Needs the Halftime iPhone app · coming later</span></span><i>Later</i></div>',
    '<button class="src" data-dev="apple" data-go="connected">${glyph("watch")}<span><b>Apple Watch</b><span>Through Apple Health on this iPhone</span></span><i>Connect</i></button>')
rep('<div class="src off" aria-disabled="true">${glyph("watch")}<span><b>Garmin</b><span>Not in the class pilot yet</span></span><i>Not yet</i></div>',
    '<button class="src" data-dev="garmin" data-go="connected">${glyph("band")}<span><b>Garmin</b><span>Through Garmin Connect</span></span><i>Connect</i></button>')
rep("using just your laptop (Mac or Windows) and calendar.", "using just your laptop and your next class.")
# 5. a device change in the app is saved, and reconnect remembers the last device
rep('const dv = e.target.closest("[data-dev]"); if (dv) devKey = dv.dataset.dev;',
    'const dv = e.target.closest("[data-dev]"); if (dv) { devKey = dv.dataset.dev; if (window.APP) APP.setDevice(devKey); }')
rep('reconnect: () => { const D = dev() || DEVICES.fitbit;', 'reconnect: () => { const D = dev() || DEVICES[PROFILE.lastDevice] || DEVICES.fitbit;')
rep('<div class="acts"><button class="a yes" data-go="connected">Reconnect</button>',
    '<div class="acts"><button class="a yes" data-dev="${Object.keys(DEVICES).find((k) => DEVICES[k] === D)}" data-go="connected">Reconnect</button>')
# 12. no wearable: no sleep answer to "what looks wrong", and honest copy
rep('<button class="rung" data-go="wrongsleep"><b>My sleep number is off</b><span>${dev() ? `It came from your ${dev().name}` : "No sleep source is connected"}</span></button>',
    '${dev() ? `<button class="rung" data-go="wrongsleep"><b>My sleep number is off</b><span>It came from your ${dev().name}</span></button>` : ""}')
rep('wrongtask: () => wrongOk("The apps you were switching between now count as one task. Reason 2 is gone for this session, so this suggestion rests on your time and sleep only. It\'ll learn from this next time too."),',
    'wrongtask: () => wrongOk(`The apps you were switching between now count as one task. Reason 2 is gone for this session, so this suggestion rests on your ${dev() ? "time and sleep" : "study time and next class"} only. It\'ll learn from this next time too.`),')
# pause also holds the pill
rep('document.getElementById("compact").addEventListener("click", () => go("walk"));',
    'document.getElementById("compact").addEventListener("click", () => { if (window.APP && APP.paused()) { APP.toast("Suggestions are paused. Tap Resume suggestions to turn them back on."); return; } go("walk"); });')

# ---------- QA fixes, phone pass 2 (2026-11-07)
# 1. no wearable: the morning check-in never quotes sleep. It rests on what Halftime has, the laptop's late study
#    sessions (sample nights in demo-data.js), and says that is all it is based on.
rep("const V = {", r"""const lapSrc = () => (PAIRED ? "laptop · 1 min ago" : "sample · laptop not paired yet");
const lateChip = () => chip(1, "late study sessions, laptop" + (PAIRED ? "" : ", sample"));
const lateN = () => ({ late: window.HALFTIME_DEMO.lateNights(), of: window.HALFTIME_DEMO.NIGHTS.length });
const lateWhy = () => { const { late, of } = lateN(); return `${PAIRED ? "Your laptop shows" : "In this sample, your laptop shows"} study sessions still running after midnight on ${late} of the last ${of} nights<span class="nw">${lateChip()}.</span> With no watch or ring, Halftime can't see your sleep, so that's all this is based on.`; };
const lateRow = () => { const { late, of } = lateN(); return `<div class="ev"><div class="row"><span class="k">1 · Late study sessions, last ${of} nights</span><span class="val">${late} of ${of} past midnight</span><span class="m">${PAIRED ? "laptop" : "sample · laptop not paired yet"} · study time only, never what you were doing · no wearable, so no sleep data</span></div></div>`; };
const V = {""")
rep("<h1 class=\"q q2\">Sleep's been short for a while. Want to talk it over with someone?</h1>",
    "<h1 class=\"q q2\">${dev() ? \"Sleep's been short for a while.\" : \"Lots of late study nights lately.\"} Want to talk it over with someone?</h1>")
rep(r"""<p class="why">${AWAY ? `Leaving out the ${AWAY} away-game nights on your calendar, ${short} of your last ${left.length}` : `${short} of your last ${left.length}`} nights were under 6 hours<span class="nw">${sleepChip()}.</span> You choose""",
    r"""<p class="why">${dev() ? `${AWAY ? `Leaving out the ${AWAY} away-game nights on your calendar, ${short} of your last ${left.length}` : `${short} of your last ${left.length}`} nights were under 6 hours<span class="nw">${sleepChip()}.</span>` : lateWhy()} You choose""")
rep('<button class="ctx" data-go="escctx">Some were travel, games, shifts or exams?</button>',
    '${dev() ? `<button class="ctx" data-go="escctx">Some were travel, games, shifts or exams?</button>` : ""}')
rep(r"""    <div class="ev"><div class="row"><span class="k">3 · Sleep, last 14 nights</span><span class="val">${short} of ${left.length} under 6 h</span><span class="m">${dev() ? dev().name : "sleep source"} · usual about 7 h${AWAY ? ` · ${AWAY} away-game nights left out` : ""}</span></div></div>""",
    r"""    ${dev() ? `<div class="ev"><div class="row"><span class="k">3 · Sleep, last 14 nights</span><span class="val">${short} of ${left.length} under 6 h</span><span class="m">${dev().name} · usual about 7 h${AWAY ? ` · ${AWAY} away-game nights left out` : ""}</span></div></div>` : lateRow()}""")
rep("We bring this up after two weeks of mostly short nights,", "We bring this up after two weeks of mostly ${dev() ? \"short\" : \"late\"} nights,")
# 2. the pushed session line reserves the room it moved into, so the cards and footer flow below it instead of
#    under it (it used to land on the footer links on small phones); the second-line labels stay inside the screen
rep('  if (!on) { stack.style.transform = ""; document.querySelector(".next").classList.remove("tuck"); return; }',
    '  if (!on) { stack.style.transform = ""; stack.style.marginBottom = ""; document.querySelector(".next").classList.remove("tuck"); return; }')
rep("""  stack.style.transform = `translateY(${dy}px)`;
  // short screens: if the pushed line would land on the next-class card, hide the card (the island already says "45 min to Chem lab")
  const nx = document.querySelector(".next"), fb = f.getBoundingClientRect().bottom - (new DOMMatrix(getComputedStyle(stack).transform).m42 || 0) + dy;
  nx.classList.toggle("tuck", fb + 8 > nx.getBoundingClientRect().top);""",
    """  stack.style.transform = `translateY(${dy}px)`;
  stack.style.marginBottom = dy + "px"; // (site build) the next-class card, home cards and footer flow below the moved line""")
# 4. End break returns to a calm idle with a short welcome-back toast (the "OK, keep going" card is for someone who declined)
rep('<button class="a no" data-go="keep">End break</button>', '<button class="a no" data-act="endbreak">End break</button>')
# 5. laptop not paired: the session is labelled sample, and Data sources offers pairing
rep('<span class="m">laptop · 1 min ago · usual', '<span class="m">${lapSrc()} · usual', 2)
rep("""card("laptop", "Laptop", `on · ${OS}`, "Session time, idle time, and which kind of app you're in. Never what you type, read or browse. Mac and Windows; not Linux yet.", sw(true, "Laptop"))""",
    """(PAIRED ? card("laptop", "Laptop", `on · ${OS}`, "Session time, idle time, and which kind of app you're in. Never what you type, read or browse. Mac and Windows; not Linux yet.", sw(true, "Laptop"))
      : card("laptop", "Laptop", "not paired yet", "Halftime needs your laptop for study time and app switches. Until you pair it, Halftime only knows the sessions you time in the Now tab. It never sees what you type, read or browse.", "", `<button class="pill" data-act="pair">Pair your laptop</button>`))""")
# 11. calendar off: no "Class only / Class + games" choice; Apple Health has no sign-in to expire
rep("""`<button class="pill" aria-pressed="${!TEAM}" data-seg="cal">Class only</button><button class="pill" aria-pressed="${TEAM}" data-seg="cal">Class + games</button>`)""",
    """PROFILE.cal === false ? "" : `<button class="pill" aria-pressed="${!TEAM}" data-seg="cal">Class only</button><button class="pill" aria-pressed="${TEAM}" data-seg="cal">Class + games</button>`)""")
rep("""${devKey === "fitbit" ? "Google asks every 7 days." : `${D.short} asked you to sign in again.`}""",
    """${D === DEVICES.fitbit ? "Google asks every 7 days." : D === DEVICES.apple ? "Apple Health access was turned off. Turn it back on in Settings → Health → Data Access." : `${D.short} asked you to sign in again.`}""")
# 11. one set of sample nights: the card, the escalation and History all read demo-data.js (away games: Sat 24, Sun 25, Sun 1)
rep("""const NIGHTS = [["Th 22",5.2],["Fr 23",4.8],["Sa 24",4.2,"away game"],["Su 25",3.9,"away game"],["Mo 26",5.6],["Tu 27",6.4],["We 28",5.1],
  ["Th 29",5.5],["Fr 30",5.0],["Sa 31",5.8],["Su 1",4.6,"away game"],["Mo 2",7.1],["Tu 3",5.3],["We 4",5.1]]""",
    """const NIGHTS = window.HALFTIME_DEMO.NIGHTS.map((n, i) => [n.d.slice(0, 2) + n.d.slice(3), n.sleep, [2, 3, 10].includes(i) ? "away game" : undefined])""")

SHELL = r"""
<main class="tabview" id="study" hidden aria-label="Your session" data-private></main>

<main class="tabview" id="history" hidden aria-label="History">
  <p class="hello" id="h-hello"></p>
  <h1>History</h1>
  <section class="hc" id="h-real" data-attn="history-real" data-private></section>
  <h2 style="font:650 1.375rem/1.1 var(--ui);letter-spacing:-.02em;margin-top:26px">A sample week</h2>
  <p class="sub2">Sample data, as Halftime would show it after a week with a watch and your laptop.</p>
  <section class="hc" data-attn="history-stats"><div class="stats3"><div><b>9</b><span>study sessions</span></div><div><b>21 h</b><span>studying</span></div><div><b>6 of 8</b><span>breaks taken</span></div></div></section>
  <section class="hc" data-attn="history-sleep"><h2 id="h-sleep-title">Sleep vs your usual</h2><div class="bars" id="h-bars" role="img"></div>
    <div class="legend2"><span><i></i>6 h or more</span><span><i style="background:#8B8983"></i>under 6 h</span><span><i style="background:none;border-top:2px dashed var(--refill-ink);border-radius:0;height:0;width:14px"></i>your usual</span></div></section>
  <section class="hc" id="h-heart" data-attn="history-heart"></section>
  <section class="hc" data-attn="history-log"><h2>Suggestions <span class="smp">Sample data</span></h2><ul class="log" id="h-log"></ul></section>
  <section class="hc" data-attn="history-sessions"><h2>Study sessions</h2><ul class="log" id="h-sessions"></ul></section>
</main>

<main class="tabview" id="you" hidden aria-label="You">
  <section class="hc acct" data-attn="you-account" style="margin-top:0"><span class="av" id="y-av">?</span><div><h1 id="y-name" style="font-size:1.5rem">You</h1><p class="sub2" id="y-meta" style="margin-top:2px"></p></div></section>
  <section class="hc" data-attn="you-sources"><h2>Your data</h2>
    <button class="rowbtn" data-act="sources-from-you">Data sources <span id="y-src">›</span></button>
    <button class="rowbtn" data-act="setup">Change setup <span>wearable, next class ›</span></button>
    <button class="rowbtn" data-act="notif">Notifications <span id="y-push">›</span></button></section>
  <section class="hc" data-attn="you-privacy"><h2>This prototype</h2>
    <button class="rowbtn" role="switch" id="y-rec" aria-checked="true" data-act="rec"><div>Share with the team<br><span>Sessions, answers, screens, taps, device, IP address</span></div><i class="swt"></i></button>
    <button class="rowbtn" data-act="collected">What's collected <span id="y-consent">›</span></button>
    <button class="rowbtn" data-act="tour">Replay the tour <span>›</span></button>
    <button class="rowbtn" data-act="replay">Replay the demo day <span>›</span></button>
    <button class="rowbtn" data-act="signout">Sign out</button>
    <button class="rowbtn danger" data-act="delete">Delete my data</button></section>
  <p class="smp" style="text-align:center;margin-top:16px;line-height:1.4">Halftime is a wellness tool, not medical advice. Your sessions are real; the watch, calendar and sample week are sample data.</p>
</main>

<div class="scrim" id="scrim"></div>
<section class="dsheet" id="dsheet" role="dialog" aria-modal="true" aria-label="Demo moments" aria-hidden="true">
  <div class="grab" aria-hidden="true"></div>
  <h2>Jump to a moment</h2>
  <p class="s">A sample day, so you can see every moment without waiting hours. Your own session is on the Now tab.</p>
  <div class="dlist" id="dlist"></div>
  <button class="dclose" type="button" id="dclose">Close</button>
</section>
<div class="htoast" id="htoast" role="status" aria-live="polite"></div>

<nav class="tabbar" aria-label="Halftime"><div class="in">
  <a class="tbrand" href="/app" aria-label="Halftime, your session"><i aria-hidden="true"></i>Halftime</a>
  <button type="button" data-tab="now" aria-current="page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="9" width="16" height="6" rx="3"/><path d="M8 19h8"/></svg>Now</button>
  <button type="button" data-tab="history"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 19V11M10 19V6M15 19v-9M20 19v-5"/></svg>History</button>
  <button type="button" data-tab="you"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5"/></svg>You</button>
  <button type="button" id="demobtn" aria-haspopup="dialog" aria-controls="dsheet"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4l9 8-9 8zM15 4l5 8-5 8"/></svg>Demo</button>
  <a class="tsrc" href="/desktop">Every source on one clock</a>
</div></nav>
<script src="/assets/track.js"></script>
"""
rep("\n<script>\n// Sample data only.", SHELL + "\n<script>\n// Sample data only.")

APP = r"""
<script>
// App shell for the site: tabs, history, you, the demo sheet, toasts, and the buttons the mockup left empty.
(() => {
  if (!PREVIEW && (!PROFILE.name || !PROFILE.done)) { location.replace(PROFILE.name ? "/start#about" : "/start#account"); return; }
  if (PROFILE.signedIn === false) { location.replace("/start#login"); return; }
  const $ = (id) => document.getElementById(id);
  const first = String(PROFILE.name).split(" ")[0];
  const esc = (x) => String(x || "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  let toastT, pauseT, paused = false, tab = "demo", quietT, lastState = Q.get("state") || "idle", srcFrom = "", plus = 0, walked = false;
  // "+5 min" during a walk shifts the countdown, the back-by time and the minutes left before the next stop (4:30 − back).
  // It belongs to one walk: ending the walk, or starting a new one, puts every place it shows back to 3:50 / 4:12 / 40 min.
  const backT = (p) => `3:${String(50 + p).padStart(2, "0")}`, leftT = (p) => `${4 + p}:12`, stillT = (p) => `still ${40 - p} min`;
  function shiftPlus(root, from, to) {
    if (from === to || !root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { const t = n.nodeValue.split(backT(from)).join(backT(to)).split(leftT(from)).join(leftT(to)).split(stillT(from)).join(stillT(to)); if (t !== n.nodeValue) n.nodeValue = t; }
  }
  function syncWalk() { // the parts of the page that are never redrawn: the forecast's walk label and the live pill
    const ts = document.querySelector(".ticks .t-slot"), lv = $("liveview");
    if (ts) ts.textContent = "walk · back " + backT(plus);
    if (lv) { lv.querySelector(".t").textContent = leftT(plus); lv.setAttribute("aria-label", `Walk break, ${4 + plus} minutes 12 seconds left. Open.`); }
  }
  const saveProfile = () => { if (PREVIEW) return; try { localStorage.setItem("ht-profile", JSON.stringify(PROFILE)); } catch {} };
  // the next commitment people chose in setup names the sample day's 4:30 stop (the sample afternoon keeps its times)
  const NEXT = String(PROFILE.next || "Chem lab").replace(/\s+(at\s+)?\d{1,2}(:\d{2})?\s*(am|pm)?$/i, "").trim() || "Chem lab";
  const nextShort = NEXT === "Chem lab" ? "lab" : NEXT.toLowerCase();
  const RENAME = [[/Chem lab/g, NEXT], [/\blab\b/g, nextShort], ...(PROFILE.cal === false ? [[/from your calendar/g, "you added this"], [/calendar · you turned this on/g, "you added this"]] : [])];
  function rename(root) {
    if (NEXT === "Chem lab" && PROFILE.cal !== false) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { let t = n.nodeValue, o = t; for (const [re, to] of RENAME) t = t.replace(re, to); if (t !== o) n.nodeValue = t; }
    root.querySelectorAll("[aria-label]").forEach((el) => { let t = el.getAttribute("aria-label"), o = t; for (const [re, to] of RENAME) t = t.replace(re, to); if (t !== o) el.setAttribute("aria-label", t); });
  }
  function toast(m) { const t = $("htoast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2400); }
  // tabs: "now" is the person's own session (assets/study.js); "demo" is the mockup's sample day, reached from the Demo sheet
  const views = { history: $("history"), you: $("you"), now: $("study") };
  const mark = (t) => document.querySelectorAll(".tabbar button").forEach((b) => (b.dataset.tab || "demo") === t ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
  function setTab(t, fromGo) {
    if (tab === "now" && t !== "now" && window.STUDY) STUDY.leaveSubview();
    tab = t; clearInterval(quietT); mark(t);
    for (const k in views) views[k].hidden = k !== t;
    if (t !== "demo") { page.hidden = true; settings.hidden = true; island.style.display = "none"; }
    if (t === "history" && window.STUDY) STUDY.drawHistory($("h-real"));
    if (t === "you") drawYou();
    if (!fromGo) { scrollTo(0, 0); if (t === "now" && window.STUDY) STUDY.onShow(); else if (window.HT) HT.screen("tab_" + t); }
  }
  function drawYou() {
    $("y-rec").setAttribute("aria-checked", window.HT ? HT.isRecording() : false);
    if (!window.STUDY) return; const y = STUDY.youRows();
    $("y-push").textContent = ({ on: "on ›", ask: "off ›", denied: window.STUDY && STUDY.computer ? "blocked in this browser" : "blocked in Settings", install: "needs the Home Screen app ›", unsupported: "not on this browser", server_off: "not switched on yet", not_shared: "needs sharing on", checking: "…" })[y.push] || "›";
    $("y-consent").textContent = y.joined ? "you joined ›" : y.consent ? "not sharing ›" : "›";
  }
  window.APP = {
    beforeGo(s) { if (window.STUDY) STUDY.leaveSubview(); for (const k in views) views[k].hidden = true; clearInterval(quietT); },
    isReal: () => tab === "now", showReal: () => setTab("now"), setTab: (t) => setTab(t), drawYou: () => drawYou(),
    openDemo: () => openSheet(true),
    paused: () => paused,
    toast: (m) => toast(m),
    setDevice(k) { if (k === "none" && PROFILE.device && PROFILE.device !== "none") PROFILE.lastDevice = PROFILE.device; PROFILE.device = k; if (k !== "none" && PROFILE.sleep === false) delete PROFILE.sleep; saveProfile(); drawShell(); }, // a watch picked: sleep data on again (the tour reads it)
    afterGo(s) {
      rename(full); rename(page);
      const walking = s === "running" || s === "runopen", wasWalking = lastState === "running" || lastState === "runopen";
      if (!(walking && wasWalking)) plus = 0; // a new walk, or the walk is over
      syncWalk(); if (walking) { shiftPlus(full, 0, plus); shiftPlus($("since"), 0, plus); }
      if (!walking && walked && s === "idle") $("since").textContent = "One break so far this session.";
      if (s === "snooze") toast("Snoozed. I'll stay quiet until 4:05.");
      // the Now tab comes back to the screen, not to a one-off setup or snooze moment
      if (!s.startsWith("sources")) lastState = /^connect|^snooze$/.test(s) ? "idle" : s;
      if (s === "idle" && srcFrom === "you") { srcFrom = ""; setTab("you"); return; }
      tab = s.startsWith("sources") ? "you" : "demo"; mark(tab);
      if (s === "escquiet") { let left = 120; const q = () => { const el = $("qt"); if (!el) return clearInterval(quietT); el.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; if (left-- <= 0) { clearInterval(quietT); toast("Two minutes. Nice."); } }; q(); quietT = setInterval(q, 1000); }
    },
  };
  document.querySelector(".tabbar").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]"); if (!b) return; // the Demo button has its own handler
    const t = b.dataset.tab;
    srcFrom = ""; setTab(t);
  });

  const DEMO = window.HALFTIME_DEMO;
  const role = PROFILE.role === "athlete" ? "athlete" : "student";
  const calOn = PROFILE.cal !== false;
  const calName = calOn ? (DEMO.PROVIDERS[PROFILE.calProvider] || "Google Calendar") : "";
  function spark(vals, usual, unit, label) { // one series, drawn to scale, with your usual as a dashed line
    const W = 300, H = 64, lo = Math.min(...vals, usual) - 3, hi = Math.max(...vals, usual) + 3, x = (i) => 6 + i * ((W - 12) / (vals.length - 1)), y = (v) => H - 8 - ((v - lo) / (hi - lo)) * (H - 20);
    const pts = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}, last 14 nights: ${vals.join(", ")} ${unit}. Your usual: ${usual} ${unit}.">
      <line x1="6" x2="${W - 6}" y1="${y(usual).toFixed(1)}" y2="${y(usual).toFixed(1)}" stroke="#0F5E46" stroke-width="1.5" stroke-dasharray="4 4"/>
      <polyline points="${pts}" fill="none" stroke="#141414" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${x(vals.length - 1).toFixed(1)}" cy="${y(vals[vals.length - 1]).toFixed(1)}" r="3.5" fill="#141414"/></svg>
      <p class="sparkx" aria-hidden="true"><span>${DEMO.NIGHTS[0].d}</span><span class="u">- - usual ${usual} ${unit}</span><span>${DEMO.NIGHTS[DEMO.NIGHTS.length - 1].d}</span></p>`;
  }
  function drawHome() {
    const D = dev(), T = DEMO.today(role), U = DEMO.USUAL, kind = DEMO.HRV_KIND[devKey] || "RMSSD";
    const tile = (l, v, unit, u) => `<div><span class="l">${l}</span><b>${v}<small>${unit}</small></b><span class="u">${u}</span></div>`;
    $("home-body").innerHTML = `<h2>Body today <span class="src2">${D ? esc(D.name) + " · sample" : "Sample · no wearable"}</span></h2>
      <div class="vit">${tile("Sleep last night", "5 h 10", "min", "usual about 7 h")}${tile("Heart rate now", T.hrNow.bpm, "bpm", T.hrNow.note)}${tile("Resting heart rate", T.lastNight.rhr, "bpm", "usual " + U.rhr + " bpm")}${tile("HRV, overnight", T.lastNight.hrv, "ms", kind + " · usual " + U.hrv + " ms")}</div>
      ${T.training ? `<p class="fine2">${esc(T.training.what)} today: ${T.training.dur}, average heart rate ${T.training.avgHr} bpm.</p>` : ""}
      <p class="fine2">${D ? "After short sleep, resting heart rate often runs higher and HRV lower. Shown for context, never as a diagnosis." : "Connect a watch or ring in Data sources to see your own. These are sample numbers."}</p>`;
    const ev = DEMO.calendar(role);
    $("home-cal").innerHTML = calOn
      ? `<h2>Today <span class="src2">${esc(calName)} · sample</span></h2><ol class="ag">${ev.map((e) => `<li class="ev-${e.state}"><span class="at">${e.t}</span><div><b>${esc(e.state === "next" ? NEXT_LABEL(e) : e.what)}${e.state === "next" ? '<span class="tg">next stop</span>' : e.state === "now" ? '<span class="tg">now</span>' : ""}</b><span class="w">${esc(e.where)}</span></div></li>`).join("")}</ol>
        <p class="fine2">${DEMO.week(role).map(([d, w]) => `${d}: ${esc(w)}`).join(" · ")}</p>`
      : `<h2>Today <span class="src2">calendar off</span></h2><p class="fine2" style="margin-top:6px">Next stop: <b>${esc(NEXT)}</b> at 4:30 pm (you typed this). Turn the calendar on in Change setup to see your whole day.</p>`;
  }
  const NEXT_LABEL = (e) => (PROFILE.next && PROFILE.next !== e.stop ? NEXT : e.what);
  function drawShell() {
  const D = dev(), none = !D; drawHome();
  // heart history
  $("h-heart").innerHTML = `<h2>Resting heart rate <span class="smp">${none ? "Sample · no wearable" : esc(D.name) + " · sample"}</span></h2>${spark(DEMO.NIGHTS.map((n) => n.rhr), DEMO.USUAL.rhr, "bpm", "Resting heart rate")}
    <h2 style="margin-top:14px">HRV, overnight <span class="smp">${DEMO.HRV_KIND[devKey] || "RMSSD"}, ms</span></h2>${spark(DEMO.NIGHTS.map((n) => n.hrv), DEMO.USUAL.hrv, "ms", "Overnight HRV")}
    <p class="fine2" style="font-size:.8125rem;color:var(--muted);margin-top:8px">Higher resting heart rate and lower HRV tend to follow your short nights. Context only.</p>`;
  $("h-hello").textContent = `${first}'s week`;
  $("h-sleep-title").innerHTML = none ? `Sleep vs your usual <span class="smp">Sample · no wearable</span>` : `Sleep vs your usual <span class="smp">${esc(D.name)} · sample</span>`;
  const mx = 9, H = 140 - 17;
  $("h-bars").innerHTML = DEMO.NIGHTS.map((n, i) => `<div class="b"><i class="${n.sleep < 6 ? "lo" : ""}" style="height:${Math.round((n.sleep / mx) * H)}px" title="${n.d}: ${n.sleep} h"></i><small>${i % 2 ? "" : n.d.split(" ")[1]}</small></div>`).join("")
    + `<span class="usual" style="bottom:${Math.round(17 + (7 / mx) * H)}px"><em>usual 7 h</em></span>`;
  $("h-bars").setAttribute("aria-label", "Sleep, last 14 nights: " + DEMO.NIGHTS.map((n) => `${n.d} ${n.sleep} hours`).join(", ") + ". Usual about 7 hours.");
  const LOG = [["Today 3:45", "Short walk now?", "2 h 40 min in, 14 switches", "took it", 1], ["Wed 11:50 pm", "Stop for tonight?", "Class at 9:30 am", "20 more min", 0],
    ["Wed 4:10", "Keep going.", "Steady switching", "kept going", 0], ["Tue 2:30", "Short walk now?", "2 h 10 min in", "took it", 1], ["Mon 9:40 pm", "Take a 15-minute break?", "3 h 20 min in", "snoozed", 0],
    ["Mon 3:05", "Still learning your usual sleep.", "Night 6 of 7", "noted", 0]];
  $("h-log").innerHTML = LOG.map(([w, q, why, r, ok]) => `<li><span class="when">${w}</span><b>${q}</b><span class="res${ok ? " took" : ""}">${r}</span><span class="what">${why}</span></li>`).join("");
  const SES = [["Today", "Organic chemistry", "2 h 40 min · 1 break"], ["Wed", "Problem set 7", "3 h 05 min · 2 breaks"], ["Tue", "Organic chemistry", "2 h 15 min · 1 break"], ["Mon", "Bio reading", "3 h 20 min · 1 break"], ["Sun", "Essay draft", "2 h 30 min · 1 break"]];
  $("h-sessions").innerHTML = SES.map(([w, t, d]) => `<li><span class="when">${w}</span><b>${t}</b><span class="what">${d}</span></li>`).join("");

  // ---- you
  $("y-av").textContent = first.slice(0, 1).toUpperCase();
  $("y-name").textContent = PROFILE.name;
  $("y-meta").textContent = [PROFILE.role === "athlete" ? "Student-athlete" : "Student", PROFILE.school, PAIRED ? "" : "Laptop not paired", none ? "No wearable" : D.name, calOn ? calName : "Calendar off"].filter(Boolean).join(" · ");
  drawYou();
  $("dlist").innerHTML = moments(D, none).map(([s, t, d]) => `<button type="button" data-moment="${s}"><b>${esc(t)}</b><span>${esc(d)}</span></button>`).join("");
  }

  const moments = (D, none) => [
    ["walk", "2 h 40 min in: a walk fits", "Halftime speaks once, with its reasons"],
    ["keep", "You keep going", "It checks in once more, later"],
    ["running", "On a 5-minute walk", "The pill becomes a countdown"],
    ["nodata", "Your first week", "It says it's still learning instead of guessing"],
    ...(none ? [["nowear", "No wearable", "Laptop and next class only"]] : [["stale", "Your " + D.short + " didn't sync", "Sleep is left out, and it says so"]]),
    ["wrong", "Something looks wrong", "Tell it what was off"],
    ["escalate", "Thursday morning, after weeks of short sleep", "It offers someone to talk to"],
    ...(none ? [] : [["reconnect", "Reconnect your " + D.short, "Every 7 days"]]),
    ["idle", "Back to the quiet pill", "Nothing to read"],
    ["tour", "Take the tour again", "What each part of the screen does"],
  ];
  drawShell(); rename(page);
  // ---- greeting on the Now screen
  const sj = $("subj"); if (sj) { const hi = document.createElement("p"); hi.className = "hello"; hi.textContent = `Hi ${first}`; document.querySelector(".hero").prepend(hi); }
  // laptop skipped in setup: the session on screen is the sample one, and says so
  if (!PAIRED && sj) { const a = document.createElement("a"); a.className = "unpaired"; a.href = "/start#laptop"; a.textContent = "Sample session: pair your laptop to see your own ›"; document.querySelector(".hero").append(a); }
  // a source chip: on a suggestion it opens See why; inside See why it brings its row into view; on the morning card, why it's showing
  full.addEventListener("click", (e) => {
    const c = e.target.closest(".chip"); if (!c) return;
    if (/^esc/.test(lastState)) { e.stopPropagation(); go("escwhy"); return; }
    if (!/why$/.test(lastState)) return;
    e.stopPropagation();
    const n = c.textContent.trim(), row = [...full.querySelectorAll(".ev .row")].find((r) => ((r.querySelector(".k") || {}).textContent || "").startsWith(n + " ·"));
    if (!row) return;
    row.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    row.classList.remove("hl"); void row.offsetWidth; row.classList.add("hl");
  }, true);

  // ---- demo moments
  const sheet = $("dsheet"), scrim = $("scrim"); sheet.inert = true;
  const openSheet = (on) => { sheet.classList.toggle("on", on); scrim.classList.toggle("on", on); sheet.setAttribute("aria-hidden", !on); sheet.inert = !on; if (on) { sheet.querySelector("button").focus(); if (window.HT) HT.event("demo_sheet", { value: "open" }); } else $("demobtn").focus(); };
  $("demobtn").addEventListener("click", () => openSheet(true));
  $("dclose").addEventListener("click", () => openSheet(false));
  scrim.addEventListener("click", () => openSheet(false));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet.classList.contains("on")) openSheet(false); });
  $("dlist").addEventListener("click", (e) => { const b = e.target.closest("[data-moment]"); if (!b) return; openSheet(false); if (window.HT) HT.event("demo_jump", { value: b.dataset.moment });
    if (b.dataset.moment === "tour") { runTour(350); return; }
    plus = 0; walked = false; go(b.dataset.moment); if (!sampleSaid) { sampleSaid = true; setTimeout(() => toast("Sample day. Your own session is on the Now tab."), 500); } });
  let sampleSaid = false;
  function runTour(delay) { if (!window.HTTour) return; go("idle"); setTimeout(() => { const r = HTTour.start(); if (r && r.then) r.then((k) => { if (tab === "demo") setTab("now"); if (k === "done" && window.STUDY && STUDY.startSetup) STUDY.startSetup(); }); }, delay); } // the last button says Start studying, so it opens the session setup

  // ---- buttons the mockup left empty, and the you tab
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-act]"); if (!a) return;
    const k = a.dataset.act;
    if (k === "talk") go("escalate");
    else if (k === "pause") { paused = !paused; page.classList.toggle("paused", paused); document.querySelectorAll(".pausebtn").forEach((b) => b.textContent = paused ? "Resume suggestions" : "Pause suggestions"); toast(paused ? "Sample day paused for 1 hour. Your own sessions aren't affected." : "Suggestions back on"); clearTimeout(pauseT); if (paused) { go("idle"); pauseT = setTimeout(() => { const pb = document.querySelector(".pausebtn"); if (paused && pb) pb.click(); }, 36e5); } }
    else if (k === "plus5") { if (plus >= 9) { toast("That's the longest this walk can go."); return; } const before = plus; plus = Math.min(9, plus + 5);
      shiftPlus(full, before, plus); shiftPlus(page, before, plus); syncWalk();
      toast(`Added ${plus - before} minutes. Back by ${backT(plus)} pm.`); }
    else if (k === "setup") location.href = "/start#wearable";
    else if (k === "tour") runTour(350);
    else if (k === "endbreak") { walked = true; go("idle"); toast("Welcome back. Next check around 4:05."); }
    else if (k === "pair") location.href = "/start#laptop";
    else if (k === "replay") { location.href = "/app?demo=1"; }
    else if (k === "notif") { if (window.STUDY) STUDY.youPush(); }
    else if (k === "collected") { if (window.STUDY) { setTab("now", true); STUDY.openConsent(); } }
    else if (k === "delete") { if (window.STUDY) { setTab("now", true); STUDY.openDelete(); } }
    else if (k === "rec") { // the same choice as the consent screen: turning it on shows what is collected first
      const on = a.getAttribute("aria-checked") !== "true";
      if (on && window.STUDY) { setTab("now", true); STUDY.openConsent(); }
      else if (window.STUDY) { STUDY.setSharing(false); toast(`Sharing off on ${STUDY.computer ? "this computer" : "this phone"}. Halftime still works.`); }
      else if (window.HT) { on ? HT.optIn() : HT.optOut(); drawYou(); } }
    else if (k === "signout") { if (window.HT) { HT.event("sign_out"); HT.flush(); } PROFILE.signedIn = false; saveProfile(); location.href = "/"; }
    else if (k === "sources-from-you") { srcFrom = "you"; go("sources"); }
  });

  // ---- what opens first
  //   first visit after setup: the tour, over the sample day, then the person's own session
  //   ?state=… or ?preview=1 (the admin heat map, QA): that sample moment, or a study screen for ?state=study_…
  //   ?demo=1 ("Replay the demo day"): the quiet pill, then a fast-forward to the moment Halftime speaks
  //   otherwise: the Now tab, the person's own session
  if (window.STUDY) STUDY.init();
  const touring = () => !!(window.HTTour && HTTour.isRunning());
  const st0 = Q.get("state") || "";
  if (/^study_/.test(st0)) setTab("now");
  else if (PREVIEW || st0) { /* the sample moment go(start) already drew */ }
  else if (window.HTTour && !HTTour.isDone() && !(window.STUDY && STUDY.active())) runTour(500);
  else if (Q.get("demo") === "1") {
    let touched = false; addEventListener("pointerdown", () => { touched = true; }, { once: true });
    setTimeout(() => { if (!touched && !touring() && tab === "demo") toast("Fast-forward: 2 h 40 min into Organic chemistry"); }, 1300);
    setTimeout(() => { if (!touched && !touring() && !paused && tab === "demo" && !island.classList.contains("open")) go("walk"); }, 2900);
  }
  else setTab("now");
  if (tab === "demo") mark("demo"); // the sample day drawn at load, before this shell existed to mark it
})();
</script>
"""
# ---------- heart data, calendar and a richer home (Heramb, 2026-11-06)
rep('<script src="/assets/track.js"></script>\n', '<script src="/assets/track.js"></script>\n<script src="/assets/demo-data.js"></script>\n<script src="/assets/halftime-data.js"></script>\n<script src="/assets/tour.js"></script>\n<script src="/assets/study.js"></script>\n')
# the home screen: body today and today's calendar, under the next-stop card
rep('<div class="next" data-attn="now-next">', '<div class="next" data-attn="now-next" id="home-next">')
rep('  <nav class="foot"><button data-act="talk">Talk to someone</button>',
    '  <section class="hcard" id="home-body" data-attn="home-body"></section>\n  <section class="hcard" id="home-cal" data-attn="home-cal"></section>\n  <nav class="foot"><button data-act="talk">Talk to someone</button>')
rep(".paused .slot,.paused .t-slot{opacity:.25}", r""".paused .slot,.paused .t-slot{opacity:.25}
.hcard{background:#fff;border-radius:18px;padding:14px 16px;margin-top:10px}
.hcard h2{display:flex;align-items:center;gap:8px;font:600 .9375rem/1.2 var(--ui)}
.hcard h2 .src2{margin-left:auto;font:500 .75rem/1 var(--mono);color:var(--muted)}
.vit{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:10px}
.vit div{background:var(--paper);border-radius:12px;padding:10px 12px;min-width:0}
.vit .l{display:block;font:500 .75rem/1.2 var(--ui);color:var(--ink2)}
.vit b{display:block;font:650 1.375rem/1.15 var(--ui);letter-spacing:-.02em;margin-top:2px}
.vit b small{font:500 .8125rem/1 var(--ui);color:var(--ink2);margin-left:2px}
.vit .u{display:block;font:500 .75rem/1.3 var(--mono);color:var(--muted);margin-top:2px}
.hcard .fine2{font-size:.8125rem;color:var(--muted);margin-top:8px}
.ag{list-style:none;margin-top:8px}
.ag li{display:grid;grid-template-columns:64px 1fr;gap:8px;padding:8px 0;border-top:1px solid var(--line)}
.ag li:first-child{border-top:0}
.ag .at{font:500 .75rem/1.4 var(--mono);color:var(--muted)}
.ag b{display:block;font-weight:600;font-size:.875rem}
.ag span.w{font-size:.75rem;color:var(--muted)}
.ag li.ev-done b{color:var(--muted);font-weight:500}
.ag li.ev-now{background:rgba(142,214,188,.25);border-radius:10px;padding:8px 6px;margin:0 -6px}
.ag .tg{font:600 .75rem/1 var(--mono);color:var(--refill-ink);margin-left:4px}
.speaking .hcard{opacity:.12;filter:blur(3px);transition:opacity .35s ease,filter .35s ease}
.morning .hcard{visibility:hidden}
.spark{display:block;width:100%;height:auto;margin-top:8px;overflow:visible}""")
# data sources: heart data is part of the wearable read now, on by default
rep('<b>Overnight HRV</b><small>Off · not used in suggestions yet</small></span>${sw(false, "Overnight HRV")}</span><span class="cd2">How much the time between heartbeats varies while you sleep. It often dips after short or stressful nights.</span>',
    '<b>Heart rate, resting heart rate, HRV</b><small>On · shown as context, not used in suggestions yet</small></span>${sw(true, "Heart data")}</span><span class="cd2">Heart rate through the day, your resting rate, and overnight HRV (how much the time between heartbeats varies). Each is compared with your own usual. Never a diagnosis.</span>')
rep('card(D.glyph, `Sleep · ${D.name}`,', 'card(D.glyph, `Sleep and heart · ${D.name}`,')
rep("`How long and when you slept, read only. Never the device's own scores. ${hrv}`", "`Sleep, heart rate, resting heart rate and overnight HRV, read only. Never the device's own scores. ${hrv}`")
# "See why": heart data shows as context, honestly marked as not used in this suggestion
rep('  const D = dev(), calN = mode === "none" ? 3 : 4;',
    '  const D = dev(), calN = mode === "none" ? 3 : 4;\n  const heartRow = D && mode === "ok" ? `<div class="row"><span class="k">Heart, last night</span><span class="val">61 bpm · 38 ms</span><span class="m">resting heart rate and HRV (${D.short}) · usual 55 bpm and 49 ms · context only, not used in this suggestion</span></div>` : "";')
rep('    ${mode === "none" ? "" : sleepRow}\n', '    ${mode === "none" ? "" : sleepRow}${heartRow}\n')

# data sources, "Where your data goes": the mockup's bracketed placeholders become what is true of this prototype
rep('<div><dt>Stored</dt><dd>[Server and region: confirm with CTO]</dd></div>',
    '<div><dt>Stored</dt><dd>In this prototype: a private database (Supabase), reached through the site\'s host (Vercel). The real app\'s server isn\'t chosen yet.</dd></div>')
rep('<div><dt>The AI writer sees</dt><dd>Short summaries only, like "slept 5 h 10 min, usual 7 h". Never raw data or app names.</dd></div>',
    '<div><dt>The AI writer sees</dt><dd>Nothing yet: this prototype has no AI writer, and its suggestions come from fixed rules. The plan is short summaries only, never raw data or app names.</dd></div>')
rep('<div><dt>Kept for</dt><dd>[How long: confirm with CTO]</dd></div>',
    '<div><dt>Kept for</dt><dd>Not decided yet. You can remove yours any time with Delete my data.</dd></div>')
rep('<div><dt>Who else sees it</dt><dd>Never your coach, team or school. The project team sees de-identified study data [confirm with CSO].</dd></div>',
    '<div><dt>Who else sees it</dt><dd>Never your coach or your team. The four students on the project team see what this prototype saves.</dd></div>')
rep('<button class="danger" data-go="sourcesdel">Delete all my data…</button>', '<button class="danger" data-act="delete">Delete my data…</button>')

# data sources: the calendar card follows setup (on with a provider, or off)
rep('card("calendar", "Calendar", "on", TEAM ? "Your next class, plus away games from the last 14 days so travel nights can be left out." : "Your next class only. On a team? Add games, and nights away can be left out of your sleep.", sw(true, "Calendar"),',
    'card("calendar", "Calendar", PROFILE.cal === false ? "off · you type your next stop" : `on · ${({ google: "Google Calendar", apple: "Apple Calendar", outlook: "Outlook" })[PROFILE.calProvider] || "Google Calendar"}`, PROFILE.cal === false ? "Turn it on in Change setup to see your whole day and let breaks fit around it." : TEAM ? "Event times and titles for today and this week, plus away games so travel nights can be left out of your sleep." : "Event times and titles for today and this week. On a team? Add games, and nights away can be left out of your sleep.", sw(PROFILE.cal !== false, "Calendar"),')

rep("</body>", APP + "</body>")

# ---------- the Night tab (2026-11-14, Heramb): last night from a WHOOP 4.0, three numbers against your usual
# Design: design/mockups/night-tab/ (A "the night, drawn" + B's sentences). Code: assets/whoop4.js (Bluetooth),
# assets/night.js (the night calculator and this browser's storage), assets/night-tab.js (the view).
NIGHT_CSS = r"""
/* ---- Night tab ---- */
#night{--usual:#D9D6CE}
#night .nt-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
#night h1{font:650 2rem/1.05 var(--ui);letter-spacing:-.035em}
#night .nt-meta{margin-top:6px;font-size:.8125rem;color:var(--muted);display:flex;flex-wrap:wrap;gap:4px 10px}
#night .nt-meta b{font-weight:500;color:var(--ink2)}
#night .nt-sample{flex:none;font:500 .75rem/1 var(--ui);color:var(--ink2);background:#fff;box-shadow:inset 0 0 0 1px var(--line);border-radius:999px;padding:7px 10px;margin-top:4px}
#night .nt-find{margin-top:22px;font:500 1.5rem/1.25 var(--ui);letter-spacing:-.015em;text-wrap:pretty}
#night .nt-find .soft{color:var(--muted)}
#night .nt-sub{margin-top:8px;color:var(--ink2);text-wrap:pretty}
#night .nt-voice{margin-top:14px;display:flex;gap:12px;align-items:center;background:var(--island);color:var(--on);border-radius:22px;padding:14px 16px}
#night .nt-voice i{flex:none;width:26px;height:10px;border-radius:5px;background:var(--refill)}
#night .nt-voice p{font-size:.9375rem;line-height:1.35}
#night .nt-voice p span{color:var(--on2)}
#night .nt-voice.nt-quiet{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
#night .nt-voice.nt-quiet i{background:var(--usual)}
#night .nt-voice.nt-quiet p span{color:var(--muted)}
#night .nt-card,#night .nt-rows,#night .nt-sync,#night .nt-how{margin-top:14px;background:#fff;border-radius:22px;box-shadow:inset 0 0 0 1px var(--line)}
#night .nt-card{padding:16px}
#night .nt-cardh{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:.8125rem;color:var(--muted)}
#night .nt-cardh b{font:500 .9375rem/1.2 var(--ui);color:var(--ink)}
#night .nt-night{margin-top:12px}
#night .nt-lane{display:grid;grid-template-columns:70px minmax(0,1fr);align-items:center;gap:8px;margin-top:8px;font-size:.75rem;color:var(--muted)}
#night .nt-chart{margin-top:0;align-items:end}
#night .nt-plot{position:relative;height:64px;color:var(--ink)}
#night .nt-plot svg{display:block;width:100%;height:64px;overflow:visible}
#night .nt-lowdot{position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;background:var(--refill-ink);box-shadow:0 0 0 2px #fff}
#night .nt-lowlab{position:relative;height:16px}
#night .nt-lowlab span{position:absolute;transform:translateX(-50%);white-space:nowrap;color:var(--ink);font-weight:500}
#night .nt-bar{position:relative;height:14px}
#night .nt-bar span{position:absolute;top:0;bottom:0;border-radius:7px;min-width:6px}
#night .nt-bar .l{background:var(--ink)}
#night .nt-bar .u{background:var(--usual)}
#night .nt-axis div{display:flex;justify-content:space-between;font:400 .6875rem/1 var(--mono);color:var(--muted)}
#night .nt-ask{margin-top:14px;padding-top:14px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
#night .nt-ask p{font-size:.875rem;color:var(--ink2)}
#night .nt-ask p b{font-weight:600;color:var(--ink)}
#night .nt-ok{font-size:.8125rem;color:var(--muted)}
#night .nt-btns{display:flex;gap:8px;flex-wrap:wrap}
#night .nt-btn{min-height:44px;padding:0 18px;border-radius:22px;background:var(--ink);color:var(--paper);font:600 .9375rem/1 var(--ui);display:inline-flex;align-items:center;justify-content:center;transition:transform .12s var(--ease)}
#night .nt-btn:active{transform:scale(.98)}
#night .nt-btn.ghost{background:#fff;color:var(--ink);box-shadow:inset 0 0 0 1px var(--line)}
#night .nt-btn.wide{display:flex;width:100%;min-height:52px;border-radius:26px}
#night .nt-btn[disabled]{opacity:.55}
#night .nt-link{min-height:44px;color:var(--ink);font:500 .875rem/1 var(--ui);text-decoration:underline;text-underline-offset:3px}
#night .nt-link.danger{color:#9B2C2C}
#night .nt-edit{margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}
#night .nt-edit>p{font-size:.875rem;color:var(--ink2)}
#night .nt-fields{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0 12px}
#night .nt-fields label{font:500 .8125rem/1 var(--ui);color:var(--ink2);min-width:0}
#night .nt-fields input{display:block;width:100%;min-height:48px;margin-top:8px;border-radius:14px;border:1px solid var(--line);background:var(--paper);padding:0 12px;font:400 1rem/1.2 var(--ui);color:var(--ink);-webkit-appearance:none;appearance:none}
#night .nt-err{color:#9B2C2C;font-size:.875rem;margin-bottom:10px}
#night .nt-rows{padding:4px 16px}
#night .nt-row{padding:16px 0;border-top:1px solid var(--line)}
#night .nt-row:first-child{border-top:0}
#night .nt-rh{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
#night .nt-rn{font-size:.875rem;color:var(--ink2)}
#night .nt-rv{font:500 1.625rem/1 var(--ui);letter-spacing:-.015em;white-space:nowrap}
#night .nt-rv small{font-size:.875rem;color:var(--muted);font-weight:400;margin-left:2px}
#night .nt-rv.nt-none{color:var(--muted)}
#night .nt-rs{margin-top:6px;font-size:.9375rem;color:var(--ink2);text-wrap:pretty}
#night .nt-rw{margin-top:8px;display:flex;justify-content:space-between;gap:10px;font-size:.8125rem;color:var(--muted)}
#night .nt-rw b{font-weight:600;color:var(--ink)}
#night .nt-band{position:relative;height:16px;margin-top:8px}
#night .nt-band::before{content:"";position:absolute;left:0;right:0;top:7px;height:2px;border-radius:1px;background:var(--track)}
#night .nt-band .u{position:absolute;top:3px;height:10px;border-radius:5px;background:var(--usual)}
#night .nt-band .d{position:absolute;top:1px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 3px #fff}
#night .nt-dots{display:flex;gap:6px;margin-top:10px}
#night .nt-dots i{width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 1.5px var(--muted)}
#night .nt-dots i.on{background:var(--ink);box-shadow:none}
#night .nt-dim{opacity:.55}
#night .nt-sync{padding:16px;display:grid;gap:10px}
#night .nt-small{font-size:.8125rem;color:var(--muted);text-wrap:pretty}
#night .nt-small b{color:var(--ink2)}
#night .nt-note{margin-top:14px;border-radius:16px;padding:12px 14px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);font-size:.9375rem;color:var(--ink2)}
#night .nt-note.err{box-shadow:inset 0 0 0 1.5px #C9A227;background:#FFFCF2}
#night .nt-how{padding:4px 16px}
#night .nt-how summary{min-height:48px;display:flex;align-items:center;font-weight:500;cursor:pointer;list-style:none}
#night .nt-how summary::-webkit-details-marker{display:none}
#night .nt-how summary::after{content:"›";margin-left:auto;color:var(--muted);transition:transform .2s var(--ease)}
#night .nt-how[open] summary::after{transform:rotate(90deg)}
#night .nt-how ul{margin:0 0 10px 18px;display:grid;gap:8px;font-size:.875rem;color:var(--ink2)}
#night .nt-how p{font-size:.8125rem;color:var(--muted);margin-bottom:6px}
#night .nt-foot{margin-top:16px;font-size:.8125rem;color:var(--muted);text-wrap:pretty}
#night .nt-col{display:grid;gap:4px;margin-top:14px;justify-items:center}
#night .nt-steps{margin-left:20px;display:grid;gap:10px;font-size:.9375rem;color:var(--ink2)}
#night .nt-steps b{color:var(--ink);font-weight:600}
#night .nt-syncing{display:grid;gap:12px;justify-items:start;margin-top:22px}
#night .nt-big{font:500 1.25rem/1.3 var(--ui)}
#night .nt-spin{width:28px;height:28px;border-radius:50%;border:3px solid var(--track);border-top-color:var(--ink);animation:ntspin 1s linear infinite}
@keyframes ntspin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){#night .nt-spin{animation:none;border-top-color:var(--muted)}#night .nt-btn{transition:none}}
#night .nt-cols,#night .nt-c1,#night .nt-c2{display:contents}
@media (min-width:1024px){
  #night .nt-cols{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:28px;align-items:start}
  #night .nt-c1,#night .nt-c2{display:block;min-width:0}
  #night .nt-c2{position:sticky;top:80px}
  #night .nt-c2>:first-child{margin-top:22px}
  #night h1{font-size:2.5rem}
  #night .nt-find{font-size:1.875rem;max-width:22em}
  #night .nt-col{justify-items:start;max-width:420px}
}
"""
rep(".tabbar .in{display:grid;grid-template-columns:repeat(4,1fr);", ".tabbar .in{display:grid;grid-template-columns:repeat(5,1fr);")
rep("</style>", NIGHT_CSS + "</style>")
rep('<div class="scrim" id="scrim"></div>', '<main class="tabview" id="night" hidden aria-label="Last night" data-private></main>\n\n<div class="scrim" id="scrim"></div>')
rep('  <button type="button" id="demobtn" aria-haspopup="dialog" aria-controls="dsheet">',
    '  <button type="button" data-tab="night"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 4.5a7 7 0 1 0 4 11.6A6 6 0 0 1 15.5 4.5z"/><path d="M4 21h16"/></svg>Night</button>\n  <button type="button" id="demobtn" aria-haspopup="dialog" aria-controls="dsheet">')
rep('const views = { history: $("history"), you: $("you"), now: $("study") };', 'const views = { history: $("history"), you: $("you"), now: $("study"), night: $("night") };')
rep('    if (t === "you") drawYou();\n', '    if (t === "you") drawYou();\n    if (window.NIGHTTAB) { if (t === "night") NIGHTTAB.show(); else NIGHTTAB.hide(); }\n')
rep('<script src="/assets/study.js"></script>\n', '<script src="/assets/whoop4.js"></script>\n<script src="/assets/night.js"></script>\n<script src="/assets/study.js"></script>\n<script src="/assets/night-tab.js"></script>\n')
# ---------- quieter pass (2026-11-14, Heramb: "the app is too cluttery")
# History: the person's real sessions first; the sample week folds behind one link, and its sleep and heart charts are
# hidden (the Night tab shows real nights now). The elements stay, so the code that fills them is unchanged.
rep('  <h2 style="font:650 1.375rem/1.1 var(--ui);letter-spacing:-.02em;margin-top:26px">A sample week</h2>\n  <p class="sub2">Sample data, as Halftime would show it after a week with a watch and your laptop.</p>\n',
    '  <details class="hsample" data-attn="history-sample"><summary>See a sample week <span class="smp">Sample data</span></summary>\n  <p class="sub2">As Halftime would show it after a week with a watch and your laptop.</p>\n')
rep('<section class="hc" data-attn="history-sleep">', '<section class="hc" data-attn="history-sleep" hidden>')
rep('<section class="hc" id="h-heart" data-attn="history-heart">', '<section class="hc" id="h-heart" data-attn="history-heart" hidden>')
rep('<section class="hc" data-attn="history-sessions"><h2>Study sessions</h2><ul class="log" id="h-sessions"></ul></section>\n',
    '<section class="hc" data-attn="history-sessions"><h2>Study sessions</h2><ul class="log" id="h-sessions"></ul></section>\n  </details>\n')
QUIET_CSS = r"""
/* ---- quieter pass ---- */
.hsample{margin-top:22px}
.hsample>summary{min-height:52px;display:flex;align-items:center;gap:10px;padding:0 16px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);font:500 1rem/1.2 var(--ui);cursor:pointer;list-style:none}
.hsample>summary::-webkit-details-marker{display:none}
.hsample>summary::after{content:"›";margin-left:auto;color:var(--muted);transition:transform .2s var(--ease)}
.hsample[open]>summary::after{transform:rotate(90deg)}
.hsample>.sub2{margin-top:12px}
.sline2{margin-top:14px;text-wrap:pretty}
.sline2 .slink{min-height:44px;padding:0;color:var(--ink);font-size:inherit;font-weight:500;text-decoration:underline;text-underline-offset:3px}
#night .nt-close{display:inline-flex;margin-top:4px}
@media (min-width:1024px){ #history>details{grid-column:1/-1} #study .c2>.sline2:first-child{margin-top:0} }
/* ICP testing 1 fixes: room under the consent screen's floating buttons; the timer this session uses; the phone's lead */
#study[data-view="consent"]{padding-bottom:calc(env(safe-area-inset-bottom,0px) + 200px)!important}
#study .sarm{margin-top:14px;text-wrap:pretty}
#study .sarm b{color:var(--ink);font-weight:600}
#night .nt-lead{margin-top:16px}
#night .nt-lead+.nt-btn{margin-top:12px}
@media (min-width:1024px){ #study[data-view="consent"]{padding-bottom:160px!important} #study .sarm{text-align:right;max-width:none} }
"""
rep("/* ---- Night tab ---- */", QUIET_CSS + "/* ---- Night tab ---- */")
rep('<a class="tsrc" href="/desktop">Every source on one clock</a>', '<a class="tsrc" href="/desktop">Sample: every source on one clock</a>')
rep('  if (/^study_/.test(st0)) setTab("now");\n', '  if (/^study_/.test(st0)) setTab("now");\n  else if (Q.get("night") || Q.get("tab") === "night") setTab("night");\n')
# ---------- bug hunt fixes (2026-11-15)
rep('if (start === "running" || start === "idle" || start.startsWith("sources")) go(start); else setTimeout(() => go(V[start] ? start : "walk"), reduce ? 0 : 450);',
    'if (/^study_/.test(start)) { /* a study screen: the app shell below opens the Now tab */ } else if (start === "running" || start === "idle" || start.startsWith("sources")) go(start); else setTimeout(() => go(V[start] ? start : "walk"), reduce ? 0 : 450);')
OUT.write_text(s)
print(f"wrote {OUT.relative_to(ROOT)} ({len(s) // 1024} KB)")
