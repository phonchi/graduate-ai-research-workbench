import { createHash } from 'node:crypto';
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

interface SourceEntry {
  id: string;
  path: string;
  kind: string;
  license: string;
  sha256: string;
  quickNote: string;
}

const corpus = resolve(process.cwd(), 'examples/synthetic-corpus');
const manifestPath = resolve(corpus, 'source-manifest.json');
const builderPath = resolve(corpus, 'build-index.mjs');
const indexPath = resolve(corpus, 'index.json');
const expectedPath = resolve(corpus, 'expected-index.json');
const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

const readManifest = (): SourceEntry[] => {
  expect(existsSync(manifestPath), 'source-manifest.json must define the authoritative inputs').toBe(true);
  const parsed = JSON.parse(readFileSync(manifestPath, 'utf8')) as { sources?: SourceEntry[] };
  expect(parsed.sources).toBeInstanceOf(Array);
  return parsed.sources ?? [];
};

describe('document cache reproducibility', () => {
  it('uses an explicit, hashed source manifest whose paths stay inside the corpus', () => {
    const sources = readManifest();
    expect(sources).toHaveLength(4);
    expect(new Set(sources.map(({ id }) => id)).size).toBe(sources.length);

    const corpusRealPath = realpathSync(corpus);
    for (const source of sources) {
      expect(source.id).toMatch(/^[a-z0-9-]+$/);
      expect(source.kind).not.toBe('');
      expect(source.license).not.toBe('');
      expect(source.quickNote).not.toBe('');
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);

      const sourcePath = realpathSync(resolve(corpus, source.path));
      const fromCorpus = relative(corpusRealPath, sourcePath);
      expect(isAbsolute(source.path), `${source.path} must be relative`).toBe(false);
      expect(fromCorpus, `${source.path} escapes the corpus`).not.toMatch(/^\.\.(?:[/\\]|$)/);
      expect(sourcePath).not.toBe(indexPath);
      expect(sha256(readFileSync(sourcePath)), `${source.path} hash drifted`).toBe(source.sha256);
    }
  });

  it('rebuilds deterministic index bytes matching the committed fixture without changing sources', () => {
    const sources = readManifest();
    expect(existsSync(builderPath), 'build-index.mjs must provide the documented Node command').toBe(true);
    expect(existsSync(expectedPath), 'expected-index.json must be the committed expected fixture').toBe(true);
    const sourceBytes = new Map(sources.map((source) => [source.path, readFileSync(resolve(corpus, source.path))]));

    const firstRun = spawnSync(process.execPath, ['build-index.mjs'], { cwd: corpus, encoding: 'utf8' });
    expect(firstRun.status, firstRun.stderr).toBe(0);
    const firstIndex = readFileSync(indexPath);
    expect(firstIndex.equals(readFileSync(expectedPath))).toBe(true);

    const secondRun = spawnSync(process.execPath, ['build-index.mjs'], { cwd: corpus, encoding: 'utf8' });
    expect(secondRun.status, secondRun.stderr).toBe(0);
    expect(readFileSync(indexPath).equals(firstIndex)).toBe(true);
    for (const [path, before] of sourceBytes) expect(readFileSync(resolve(corpus, path)).equals(before), `${path} changed`).toBe(true);
  });

  it('rejects escaping sources and CLI attempts to redirect output', async () => {
    expect(existsSync(builderPath), 'build-index.mjs must enforce corpus boundaries').toBe(true);
    const sources = readManifest();
    const indexBefore = readFileSync(indexPath);
    const sourceBytes = new Map(sources.map((source) => [source.path, readFileSync(resolve(corpus, source.path))]));
    const builder = await import(pathToFileURL(builderPath).href) as {
      resolveSourcePath(path: string): Promise<string>;
      buildEntries(sources: SourceEntry[]): Promise<SourceEntry[]>;
    };

    await expect(builder.resolveSourcePath('../outside.md')).rejects.toThrow(/outside the corpus/i);
    await expect(builder.resolveSourcePath('index.json')).rejects.toThrow(/generated index/i);
    const [source] = sources;
    await expect(builder.buildEntries([{ ...source, sha256: '0'.repeat(64) }])).rejects.toThrow(/hash mismatch/i);

    const redirected = spawnSync(process.execPath, ['build-index.mjs', '../outside.json'], { cwd: corpus, encoding: 'utf8' });
    expect(redirected.status).not.toBe(0);
    expect(readFileSync(indexPath).equals(indexBefore)).toBe(true);
    for (const [path, before] of sourceBytes) expect(readFileSync(resolve(corpus, path)).equals(before), `${path} changed`).toBe(true);
  });
});
