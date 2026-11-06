// Local preview of site/ with the same response headers Vercel will send (read from site/vercel.json),
// so the Content-Security-Policy is tested before deploying. Never serves outside site/.
// /api/* runs the matching site/api/<name>.js handler (Vercel's Node function shape). With no SHEET_* env vars set,
// /api/collect only logs; set LOG_EVENTS=path.jsonl to also append each received row there for testing.
//   node tools/site/serve.mjs [port]      then open http://127.0.0.1:<port>/
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = normalize(join(fileURLToPath(import.meta.url), '../../../site'));
const PORT = +(process.argv[2] || 3007);
const cfg = JSON.parse(await readFile(join(ROOT, 'vercel.json'), 'utf8'));
const TYPES = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json', '.js': 'text/javascript; charset=utf-8' };
const { appendFile } = await import('node:fs/promises');
async function api(name, req, res) {
  const mod = await import(join(ROOT, 'api', name + '.js'));
  let raw = ''; for await (const c of req) raw += c;
  try { req.body = raw ? JSON.parse(raw) : null; } catch { req.body = raw; }
  req.headers['x-forwarded-for'] ||= req.socket.remoteAddress;
  if (process.env.LOG_EVENTS && req.body && Array.isArray(req.body.events)) await appendFile(process.env.LOG_EVENTS, req.body.events.map((e) => JSON.stringify({ ip: req.headers['x-forwarded-for'], ...e })).join('\n') + '\n');
  const out = { status(c) { res.statusCode = c; return out; }, setHeader: (k, v) => res.setHeader(k, v), json(o) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); } };
  await mod.default(req, out);
}
const toRe = (src) => new RegExp('^' + src.replace(/\(\.\*\)/g, '.*').replace(/\./g, '\\.').replace(/\\\.\*/g, '.*') + '$');
createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  for (const h of cfg.headers || []) if (toRe(h.source).test(path)) for (const { key, value } of h.headers) res.setHeader(key, value);
  if (path.startsWith('/api/')) { try { return await api(path.slice(5).replace(/[^a-z0-9-]/gi, ''), req, res); } catch (e) { console.error(e); res.statusCode = 500; return res.end('api error'); } }
  try {
    let p = normalize(join(ROOT, path)); if (p !== ROOT && !p.startsWith(ROOT + sep)) throw 0;
    if ((await stat(p).catch(() => null))?.isDirectory()) p = join(p, 'index.html');
    else if (!extname(p)) p += '.html'; // cleanUrls
    if (p.endsWith('vercel.json')) throw 0;
    res.setHeader('Content-Type', TYPES[extname(p)] || 'application/octet-stream');
    res.end(await readFile(p));
  } catch { res.statusCode = 404; res.end('not found'); }
}).listen(PORT, '127.0.0.1', () => console.log(`site/ on http://127.0.0.1:${PORT}/ with Vercel headers`));
