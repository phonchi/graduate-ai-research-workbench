import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

interface SourceEntry {
  id: string;
  path: string;
  kind: string;
  license: string;
  sha256: string;
  quickNote: string;
}

const trackedCorpus = resolve(process.cwd(), 'examples/synthetic-corpus');
const trackedIndex = resolve(trackedCorpus, 'index.json');
const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
let trackedIndexBytes: Buffer;
let trackedIndexMtimeMs: number;

const pathsFor = (corpus: string) => ({
  manifest: resolve(corpus, 'source-manifest.json'),
  builder: resolve(corpus, 'build-index.mjs'),
  index: resolve(corpus, 'index.json'),
  expected: resolve(corpus, 'expected-index.json'),
});

const readManifest = (corpus: string): SourceEntry[] => {
  const { manifest } = pathsFor(corpus);
  expect(existsSync(manifest), 'source-manifest.json must define the authoritative inputs').toBe(true);
  const parsed = JSON.parse(readFileSync(manifest, 'utf8')) as { sources?: SourceEntry[] };
  expect(parsed.sources).toBeInstanceOf(Array);
  return parsed.sources ?? [];
};

const createSandbox = () => {
  const root = mkdtempSync(join(tmpdir(), 'document-cache-'));
  const corpus = resolve(root, 'synthetic-corpus');
  cpSync(trackedCorpus, corpus, { recursive: true });
  return { root, corpus };
};

const temporaryIndexes = (corpus: string) => readdirSync(corpus).filter((name) => /^\.index\.json\..+\.tmp$/.test(name));

beforeAll(() => {
  trackedIndexBytes = readFileSync(trackedIndex);
  trackedIndexMtimeMs = statSync(trackedIndex).mtimeMs;
});

afterAll(() => {
  expect(readFileSync(trackedIndex).equals(trackedIndexBytes), 'tests rewrote the tracked index').toBe(true);
  expect(statSync(trackedIndex).mtimeMs, 'tests changed the tracked index mtime').toBe(trackedIndexMtimeMs);
});

describe('document cache reproducibility', () => {
  it('uses an explicit, hashed source manifest whose paths stay inside the corpus', () => {
    const sources = readManifest(trackedCorpus);
    expect(sources).toHaveLength(4);
    expect(new Set(sources.map(({ id }) => id)).size).toBe(sources.length);

    const corpusRealPath = realpathSync(trackedCorpus);
    for (const source of sources) {
      expect(source.id).toMatch(/^[a-z0-9-]+$/);
      expect(source.kind).not.toBe('');
      expect(source.license).not.toBe('');
      expect(source.quickNote).not.toBe('');
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);

      const sourcePath = realpathSync(resolve(trackedCorpus, source.path));
      const fromCorpus = relative(corpusRealPath, sourcePath);
      expect(isAbsolute(source.path), `${source.path} must be relative`).toBe(false);
      expect(fromCorpus, `${source.path} escapes the corpus`).not.toMatch(/^\.\.(?:[/\\]|$)/);
      expect(sourcePath).not.toBe(trackedIndex);
      expect(sha256(readFileSync(sourcePath)), `${source.path} hash drifted`).toBe(source.sha256);
    }
  });

  it('rebuilds deterministic sandbox bytes matching the committed fixture without changing sources', () => {
    const sandbox = createSandbox();
    try {
      const paths = pathsFor(sandbox.corpus);
      const sources = readManifest(sandbox.corpus);
      const sourceBytes = new Map(sources.map((source) => [source.path, readFileSync(resolve(sandbox.corpus, source.path))]));
      const indexMode = statSync(paths.index).mode & 0o777;

      const firstRun = spawnSync(process.execPath, ['build-index.mjs'], { cwd: sandbox.corpus, encoding: 'utf8' });
      expect(firstRun.status, firstRun.stderr).toBe(0);
      const firstIndex = readFileSync(paths.index);
      expect(firstIndex.equals(readFileSync(paths.expected))).toBe(true);
      expect(statSync(paths.index).mode & 0o777).toBe(indexMode);
      expect(temporaryIndexes(sandbox.corpus)).toEqual([]);

      const secondRun = spawnSync(process.execPath, ['build-index.mjs'], { cwd: sandbox.corpus, encoding: 'utf8' });
      expect(secondRun.status, secondRun.stderr).toBe(0);
      expect(readFileSync(paths.index).equals(firstIndex)).toBe(true);
      expect(statSync(paths.index).mode & 0o777).toBe(indexMode);
      expect(temporaryIndexes(sandbox.corpus)).toEqual([]);
      for (const [path, before] of sourceBytes) {
        expect(readFileSync(resolve(sandbox.corpus, path)).equals(before), `${path} changed`).toBe(true);
      }
    } finally {
      rmSync(sandbox.root, { recursive: true, force: true });
    }
  });

  it('rejects escaping sources, hash drift, and CLI attempts to redirect output in a sandbox', async () => {
    const sandbox = createSandbox();
    try {
      const paths = pathsFor(sandbox.corpus);
      const sources = readManifest(sandbox.corpus);
      const indexBefore = readFileSync(paths.index);
      const sourceBytes = new Map(sources.map((source) => [source.path, readFileSync(resolve(sandbox.corpus, source.path))]));
      const builder = await import(pathToFileURL(paths.builder).href) as {
        resolveSourcePath(path: string): Promise<string>;
        buildEntries(sources: SourceEntry[]): Promise<SourceEntry[]>;
      };

      await expect(builder.resolveSourcePath('../outside.md')).rejects.toThrow(/outside the corpus/i);
      await expect(builder.resolveSourcePath('index.json')).rejects.toThrow(/generated index/i);
      const [source] = sources;
      await expect(builder.buildEntries([{ ...source, sha256: '0'.repeat(64) }])).rejects.toThrow(/hash mismatch/i);

      const redirected = spawnSync(process.execPath, ['build-index.mjs', '../outside.json'], { cwd: sandbox.corpus, encoding: 'utf8' });
      expect(redirected.status).not.toBe(0);
      expect(readFileSync(paths.index).equals(indexBefore)).toBe(true);
      expect(temporaryIndexes(sandbox.corpus)).toEqual([]);
      for (const [path, before] of sourceBytes) {
        expect(readFileSync(resolve(sandbox.corpus, path)).equals(before), `${path} changed`).toBe(true);
      }
    } finally {
      rmSync(sandbox.root, { recursive: true, force: true });
    }
  });

  it('keeps the previous sandbox index and cleans the temp file when replacement is interrupted', async () => {
    const sandbox = createSandbox();
    try {
      const paths = pathsFor(sandbox.corpus);
      const indexBefore = readFileSync(paths.index);
      const builder = await import(pathToFileURL(paths.builder).href) as {
        replaceIndexAtomically(content: string, beforeRename?: () => Promise<void>): Promise<void>;
      };

      await expect(builder.replaceIndexAtomically('replacement\n', async () => {
        expect(temporaryIndexes(sandbox.corpus)).toHaveLength(1);
        throw new Error('simulated interruption');
      })).rejects.toThrow(/simulated interruption/i);
      expect(readFileSync(paths.index).equals(indexBefore)).toBe(true);
      expect(temporaryIndexes(sandbox.corpus)).toEqual([]);
    } finally {
      rmSync(sandbox.root, { recursive: true, force: true });
    }
  });
});
