import { createHash, randomUUID } from 'node:crypto';
import { open, readFile, realpath, rename, rm, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const CORPUS_DIR = dirname(fileURLToPath(import.meta.url));
const MANIFEST_PATH = resolve(CORPUS_DIR, 'source-manifest.json');
const INDEX_PATH = resolve(CORPUS_DIR, 'index.json');
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const escapes = (path) => path === '..' || path.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) || isAbsolute(path);

export async function resolveSourcePath(sourcePath) {
  if (typeof sourcePath !== 'string' || sourcePath.length === 0 || isAbsolute(sourcePath) || sourcePath.includes('\\')) {
    throw new Error(`Source path is outside the corpus: ${String(sourcePath)}`);
  }

  const corpusRealPath = await realpath(CORPUS_DIR);
  const candidate = resolve(CORPUS_DIR, sourcePath);
  if (escapes(relative(CORPUS_DIR, candidate))) throw new Error(`Source path is outside the corpus: ${sourcePath}`);
  if (candidate === INDEX_PATH) throw new Error('The generated index cannot be a source');

  const sourceRealPath = await realpath(candidate);
  if (escapes(relative(corpusRealPath, sourceRealPath))) throw new Error(`Source path is outside the corpus: ${sourcePath}`);
  if (sourceRealPath === INDEX_PATH) throw new Error('The generated index cannot be a source');
  if (!(await stat(sourceRealPath)).isFile()) throw new Error(`Source is not a file: ${sourcePath}`);
  return sourceRealPath;
}

export async function buildEntries(sources) {
  if (!Array.isArray(sources) || sources.length === 0) throw new Error('Manifest sources must be a non-empty array');
  const ids = new Set();
  const paths = new Set();
  const entries = [];

  for (const source of sources) {
    for (const field of ['id', 'path', 'kind', 'license', 'sha256', 'quickNote']) {
      if (typeof source[field] !== 'string' || source[field].length === 0) throw new Error(`Source is missing ${field}`);
    }
    if (!/^[a-z0-9-]+$/.test(source.id)) throw new Error(`Invalid source id: ${source.id}`);
    if (!/^[a-f0-9]{64}$/.test(source.sha256)) throw new Error(`Invalid SHA-256 for ${source.id}`);
    if (ids.has(source.id)) throw new Error(`Duplicate source id: ${source.id}`);
    if (paths.has(source.path)) throw new Error(`Duplicate source path: ${source.path}`);
    ids.add(source.id);
    paths.add(source.path);

    const sourcePath = await resolveSourcePath(source.path);
    const actualHash = sha256(await readFile(sourcePath));
    if (actualHash !== source.sha256) throw new Error(`Source hash mismatch: ${source.path}`);
    entries.push({
      id: source.id,
      path: source.path,
      kind: source.kind,
      license: source.license,
      sha256: source.sha256,
      quickNote: source.quickNote,
    });
  }

  return entries.sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
}

export async function replaceIndexAtomically(content, beforeRename) {
  const tempPath = resolve(CORPUS_DIR, `.index.json.${process.pid}.${randomUUID()}.tmp`);
  let handle;
  try {
    handle = await open(tempPath, 'wx');
    await handle.writeFile(content, 'utf8');
    await handle.sync();
    await handle.close();
    handle = undefined;
    if (beforeRename) await beforeRename();
    await rename(tempPath, INDEX_PATH);
  } finally {
    if (handle) {
      try {
        await handle.close();
      } catch {
        // Preserve the original write error; rm below still verifies cleanup.
      }
    }
    await rm(tempPath, { force: true });
  }
}

export async function buildIndex() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  if (manifest.schemaVersion !== 1) throw new Error('Unsupported source manifest schema');
  const entries = await buildEntries(manifest.sources);
  await replaceIndexAtomically(`${JSON.stringify(entries, null, 2)}\n`);
  return entries.length;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (process.argv.length !== 2) {
    console.error('Usage: node build-index.mjs');
    process.exitCode = 1;
  } else {
    buildIndex()
      .then((count) => console.log(`Wrote ${count} sources to index.json`))
      .catch((error) => {
        console.error(error instanceof Error ? error.message : error);
        process.exitCode = 1;
      });
  }
}
