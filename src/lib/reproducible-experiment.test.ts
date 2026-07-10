import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const experiment = resolve(process.cwd(), 'examples/reproducible-experiment');
const rawPath = resolve(experiment, 'raw/measurements.csv');
const configPath = resolve(experiment, 'config.json');
const analyzePath = resolve(experiment, 'analyze.mjs');
const derivedPath = resolve(experiment, 'derived/summary.json');
const expectedPath = resolve(experiment, 'expected/summary-template.json');
const sha256 = (content: Buffer | string) => createHash('sha256').update(content).digest('hex');
const runAnalysis = () => spawnSync(process.execPath, [analyzePath], { cwd: experiment, encoding: 'utf8' });

const expectRawUnchanged = (rawBefore: Buffer) => {
  const rawAfter = readFileSync(rawPath);
  if (!rawAfter.equals(rawBefore)) writeFileSync(rawPath, rawBefore);
  expect(sha256(rawAfter)).toBe(sha256(rawBefore));
  expect(rawAfter.equals(rawBefore)).toBe(true);
};

describe('reproducible experiment fixture', () => {
  it('recomputes the expected summary without changing raw measurements', () => {
    expect(existsSync(rawPath), 'raw measurements fixture is missing').toBe(true);
    expect(existsSync(analyzePath), 'analysis script is missing').toBe(true);
    expect(existsSync(expectedPath), 'expected summary fixture is missing').toBe(true);

    const rawBefore = readFileSync(rawPath);
    const rawHashBefore = sha256(rawBefore);
    rmSync(resolve(experiment, 'derived'), { recursive: true, force: true });

    const result = runAnalysis();

    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(existsSync(derivedPath), 'analysis did not create derived/summary.json').toBe(true);

    const actual = JSON.parse(readFileSync(derivedPath, 'utf8')) as Record<string, unknown>;
    const expectedTemplate = readFileSync(expectedPath, 'utf8').replace('"$NODE_VERSION"', JSON.stringify(process.version));
    const expected = JSON.parse(expectedTemplate) as Record<string, unknown>;
    expect(actual).toEqual(expected);

    const rawAfter = readFileSync(rawPath);
    expect(sha256(rawAfter)).toBe(rawHashBefore);
    expect(rawAfter.equals(rawBefore)).toBe(true);
  });

  it('uses only Node built-in modules and records a complete manifest', () => {
    rmSync(resolve(experiment, 'derived'), { recursive: true, force: true });
    const result = runAnalysis();
    expect(result.status, result.stderr || result.stdout).toBe(0);
    expect(existsSync(derivedPath), 'analysis did not create derived/summary.json').toBe(true);

    const source = readFileSync(analyzePath, 'utf8');
    const imports = [...source.matchAll(/from ['"]([^'"]+)['"]/g)].map((match) => match[1]);
    expect(imports.length).toBeGreaterThan(0);
    expect(imports.every((specifier) => specifier.startsWith('node:'))).toBe(true);

    const summary = JSON.parse(readFileSync(derivedPath, 'utf8')) as {
      manifest?: Record<string, unknown>;
    };
    expect(summary.manifest).toMatchObject({
      command: 'node analyze.mjs',
      nodeVersion: process.version,
    });
    for (const key of ['inputSha256', 'configSha256']) {
      expect(summary.manifest?.[key]).toMatch(/^[a-f0-9]{64}$/);
    }
    expect(summary.manifest).toHaveProperty('seed');
    expect(summary.manifest).toHaveProperty('timestamp');
  });

  it('rejects an output path that would overwrite raw measurements', () => {
    const rawBefore = readFileSync(rawPath);
    const configBefore = readFileSync(configPath);
    const config = JSON.parse(configBefore.toString('utf8')) as Record<string, unknown>;

    try {
      writeFileSync(configPath, `${JSON.stringify({ ...config, output: 'raw/measurements.csv' }, null, 2)}\n`);
      const result = runAnalysis();
      expect(result.status, 'analysis unexpectedly accepted raw/ as an output location').not.toBe(0);
    } finally {
      writeFileSync(configPath, configBefore);
      expectRawUnchanged(rawBefore);
    }
  });

  it('rejects an output path that escapes the experiment directory', () => {
    const rawBefore = readFileSync(rawPath);
    const configBefore = readFileSync(configPath);
    const outsidePath = resolve(experiment, '../../outside.json');
    const config = JSON.parse(configBefore.toString('utf8')) as Record<string, unknown>;
    expect(existsSync(outsidePath), `${outsidePath} must be absent before this test`).toBe(false);

    try {
      writeFileSync(configPath, `${JSON.stringify({ ...config, output: '../../outside.json' }, null, 2)}\n`);
      const result = runAnalysis();
      expect(result.status, 'analysis unexpectedly accepted an escaping output location').not.toBe(0);
      expect(existsSync(outsidePath), 'analysis wrote outside its derived directory').toBe(false);
    } finally {
      writeFileSync(configPath, configBefore);
      rmSync(outsidePath, { force: true });
      expectRawUnchanged(rawBefore);
    }
  });

  it.skipIf(process.platform !== 'linux')('rejects an output path whose existing ancestor is a symbolic link', () => {
    const rawBefore = readFileSync(rawPath);
    const configBefore = readFileSync(configPath);
    const derivedBefore = existsSync(derivedPath) ? readFileSync(derivedPath) : undefined;
    const outside = mkdtempSync(resolve(tmpdir(), 'reproducible-experiment-'));
    const outsideOutput = resolve(outside, 'summary.json');
    const linkedDirectory = resolve(experiment, 'derived/outside-link');
    const config = JSON.parse(configBefore.toString('utf8')) as Record<string, unknown>;

    try {
      rmSync(resolve(experiment, 'derived'), { recursive: true, force: true });
      mkdirSync(resolve(experiment, 'derived'), { recursive: true });
      symlinkSync(outside, linkedDirectory, 'dir');
      writeFileSync(configPath, `${JSON.stringify({ ...config, output: 'derived/outside-link/summary.json' }, null, 2)}\n`);

      const result = runAnalysis();

      expect(result.status, 'analysis unexpectedly followed a symbolic-link output ancestor').not.toBe(0);
      expect(existsSync(outsideOutput), 'analysis wrote through the symbolic link').toBe(false);
    } finally {
      writeFileSync(configPath, configBefore);
      rmSync(resolve(experiment, 'derived'), { recursive: true, force: true });
      if (derivedBefore) {
        mkdirSync(resolve(experiment, 'derived'), { recursive: true });
        writeFileSync(derivedPath, derivedBefore);
      }
      rmSync(outside, { recursive: true, force: true });
      expectRawUnchanged(rawBefore);
      expect(readFileSync(configPath).equals(configBefore)).toBe(true);
    }
  });
});
