import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const port = 4173;
const base = '/graduate-ai-research-workbench';
const dist = new URL('../dist/', import.meta.url).pathname;
const distRoot = resolve(dist);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (!pathname.startsWith(base)) {
    response.writeHead(302, { Location: `${base}/` });
    response.end();
    return;
  }
  pathname = pathname.slice(base.length).replace(/^\//, '');
  let file = resolve(distRoot, normalize(pathname));
  if (file !== distRoot && !file.startsWith(`${distRoot}${sep}`)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }
  if (!extname(file)) file = join(file, 'index.html');
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(distRoot, '404.html');
  response.writeHead(file.endsWith('404.html') ? 404 : 200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Test server listening on http://127.0.0.1:${port}${base}/`);
});
