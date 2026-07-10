import { createHash } from 'node:crypto';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const experiment = resolve(process.cwd(), 'examples/reproducible-experiment');
const rawPath = resolve(experiment, 'raw/measurements.csv');
const analyzePath = resolve(experiment, 'analyze.mjs');
const derivedPath = resolve(experiment, 'derived/summary.json');
const expectedPath = resolve(experiment, 'expected/summary.json');
const sha256 = (content: Buffer | string) => createHash('sha256').update(content).digest('hex');

describe('reproducible experiment fixture', () => {
  it('recomputes the expected summary without changing raw measurements', () => {
    expect(existsSync(rawPath), 'raw measurements fixture is missing').toBe(true);
    expect(existsSync(analyzePath), 'analysis script is missing').toBe(true);
    expect(existsSync(expectedPath), 'expected summary fixture is missing').toBe(true);

    const rawBefore = readFileSync(rawPath);
    const rawHashBefore = sha256(rawBefore);
    rmSync(resolve(experiment, 'derived'), { recursive: true, force: true });

    const result = spawnSync(process.execPath, [analyzePath], {
      cwd: experiment,
      encoding: 'utf8',
    });

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
});
