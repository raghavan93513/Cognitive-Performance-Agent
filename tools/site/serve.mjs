// Local preview of site/ with the same response headers Vercel will send (read from site/vercel.json),
// so the Content-Security-Policy is tested before deploying. Static files only; never serves outside site/.
//   node tools/site/serve.mjs [port]      then open http://127.0.0.1:<port>/
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = normalize(join(fileURLToPath(import.meta.url), '../../../site'));
const PORT = +(process.argv[2] || 3007);
const cfg = JSON.parse(await readFile(join(ROOT, 'vercel.json'), 'utf8'));
const TYPES = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' };
const toRe = (src) => new RegExp('^' + src.replace(/\(\.\*\)/g, '.*').replace(/\./g, '\\.').replace(/\\\.\*/g, '.*') + '$');
createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  for (const h of cfg.headers || []) if (toRe(h.source).test(path)) for (const { key, value } of h.headers) res.setHeader(key, value);
  try {
    let p = normalize(join(ROOT, path)); if (p !== ROOT && !p.startsWith(ROOT + sep)) throw 0;
    if ((await stat(p).catch(() => null))?.isDirectory()) p = join(p, 'index.html');
    else if (!extname(p)) p += '.html'; // cleanUrls
    if (p.endsWith('vercel.json')) throw 0;
    res.setHeader('Content-Type', TYPES[extname(p)] || 'application/octet-stream');
    res.end(await readFile(p));
  } catch { res.statusCode = 404; res.end('not found'); }
}).listen(PORT, '127.0.0.1', () => console.log(`site/ on http://127.0.0.1:${PORT}/ with Vercel headers`));
