import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(root, 'config.json');
const configBytes = await readFile(configPath);
const config = JSON.parse(configBytes.toString('utf8'));

if (typeof config.input !== 'string' || typeof config.output !== 'string') {
  throw new Error('input and output must be relative path strings');
}

if (!Number.isInteger(config.roundDigits) || config.roundDigits < 0 || config.roundDigits > 10) {
  throw new Error('roundDigits must be an integer from 0 to 10');
}

const rawRoot = resolve(root, 'raw');
const derivedRoot = resolve(root, 'derived');
const inputPath = resolve(root, config.input);
const outputPath = resolve(root, config.output);
const isContainedFile = (directory, path) => {
  const child = relative(directory, path);
  return child !== '' && child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child);
};

if (!isContainedFile(rawRoot, inputPath)) {
  throw new Error('input must be a file contained within raw/');
}
if (!isContainedFile(derivedRoot, outputPath)) {
  throw new Error('output must be a file contained within derived/');
}

const inputBytes = await readFile(inputPath);
const lines = inputBytes.toString('utf8').trim().split(/\r?\n/);

if (lines.shift() !== 'sample_id,measurement') {
  throw new Error('Expected CSV header: sample_id,measurement');
}

const measurements = lines.map((line, index) => {
  const [sampleId, rawMeasurement, extra] = line.split(',');
  const measurement = Number(rawMeasurement);
  if (!sampleId || extra !== undefined || !Number.isFinite(measurement)) {
    throw new Error(`Invalid measurement row ${index + 2}`);
  }
  return measurement;
});

if (measurements.length === 0) throw new Error('At least one measurement is required');

const round = (value) => Number(value.toFixed(config.roundDigits));
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const summary = {
  statistics: {
    count: measurements.length,
    mean: round(measurements.reduce((total, value) => total + value, 0) / measurements.length),
    min: round(Math.min(...measurements)),
    max: round(Math.max(...measurements)),
  },
  manifest: {
    inputSha256: sha256(inputBytes),
    configSha256: sha256(configBytes),
    command: 'node analyze.mjs',
    nodeVersion: process.version,
    seed: config.seed,
    timestamp: config.timestamp,
  },
};

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
console.log(`Wrote ${config.output}`);
