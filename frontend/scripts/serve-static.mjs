import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = 3001;
const currentDirectory = dirname(fileURLToPath(import.meta.url));
const root = join(currentDirectory, '..', 'out');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

function resolveRequestPath(url) {
  const pathname = new URL(url ?? '/', `http://localhost:${port}`).pathname;
  const normalizedPath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  const candidatePath = join(root, normalizedPath);

  if (existsSync(candidatePath) && statSync(candidatePath).isDirectory()) {
    return join(candidatePath, 'index.html');
  }

  if (existsSync(candidatePath)) {
    return candidatePath;
  }

  return join(root, 'index.html');
}

const server = createServer((request, response) => {
  const filePath = resolveRequestPath(request.url);

  if (!existsSync(filePath)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const contentType = contentTypes[extname(filePath)] ?? 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port);
