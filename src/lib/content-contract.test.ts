import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(process.cwd(), 'src/content');
const pagesRoot = resolve(process.cwd(), 'src/pages');
const projectRoot = process.cwd();
const recursiveFiles = (directory: string, extensions: string[]): string[] => {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return recursiveFiles(path, extensions).map((file) => `${entry.name}/${file}`);
    return extensions.some((extension) => entry.name.endsWith(extension)) ? [entry.name] : [];
  });
};
const files = (collection: string) => recursiveFiles(resolve(root, collection), ['.md', '.mdx']);
const read = (collection: string, file: string) => readFileSync(resolve(root, collection, file), 'utf8');
const readPage = (file: string) => readFileSync(resolve(pagesRoot, file), 'utf8');
const frontmatter = (content: string) => content.match(/^---\n([\s\S]*?)\n---/m)?.[1] ?? '';
const frontmatterValue = (content: string, key: string) => content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '');
const frontmatterList = (content: string, key: string) => {
  const match = content.match(new RegExp(`^${key}:\\n((?:  - .+\\n)+)`, 'm'));
  if (match) return match[1].trim().split('\n').map((line) => line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, ''));
  const inline = content.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm'));
  return inline ? inline[1].split(',').map((value) => value.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) : [];
};
const contentId = (file: string) => file.replace(/\.mdx?$/, '');
const bannedPublicPhrases = ['對照投影片', '投影片主線', '投影片的核心比喻'];
const bannedPublicPatterns: Array<{ label: string; pattern: RegExp }> = [
  { label: 'presentation filename', pattern: /\.(?:ppt|pptx)\b/i },
  { label: 'numbered presentation page', pattern: /第\s*\d+\s*(?:張|頁)\s*投影片/u },
  { label: 'numeric slide reference', pattern: /投影片\s*\d+(?:\s*[、,，]\s*\d+)*/u },
];

describe('content contract', () => {
  it('ships the standalone learning path and reference collections', () => {
    expect(files('lessons')).toHaveLength(7);
    expect(files('cases').length).toBeGreaterThan(0);
    expect(files('cases')).not.toContain('document-cache.md');
    expect(files('cases')).not.toContain('reproducible-experiment.md');
    expect(files('tools')).toContain('hook.md');
    expect(files('templates')).toContain('handoff.md');
    expect(files('research-skills').length).toBeGreaterThan(0);
  });

  it('makes every lesson standalone and backed by a small reference set', () => {
    for (const file of files('lessons')) {
      const content = read('lessons', file);
      const metadata = frontmatter(content);
      expect(content).not.toMatch(/^slideRefs:/m);
      expect(frontmatterList(metadata, 'learningOutcomes'), `${file} needs three learning outcomes`).toHaveLength(3);
      expect(metadata, `${file} needs prerequisites metadata`).toMatch(/^prerequisites:/m);
      const referenceCount = (metadata.match(/^ {2}- title: .+$/gm) ?? []).length;
      expect(referenceCount, `${file} needs at least two references`).toBeGreaterThanOrEqual(2);
      expect(referenceCount, `${file} needs at most four references`).toBeLessThanOrEqual(4);
      expect((metadata.match(/^ {4}url: https?:\/\/.+$/gm) ?? []).length, `${file} needs one URL per reference`).toBe(referenceCount);
      expect((metadata.match(/^ {4}type: (paper|official|standard|policy|case|essay)$/gm) ?? []).length, `${file} needs one valid type per reference`).toBe(referenceCount);
      expect((metadata.match(/^ {4}note: .+$/gm) ?? []).length, `${file} needs one note per reference`).toBe(referenceCount);
      expect(frontmatterList(metadata, 'keyTerms').length, `${file} needs tool or concept terms`).toBeGreaterThan(0);
      for (const phrase of bannedPublicPhrases) expect(content).not.toContain(phrase);
    }
  });

  it('removes slide-dependent and evidence-matrix framing from public content and pages', () => {
    const publicSources: Array<{ path: string; source: string }> = [];
    for (const collection of ['lessons', 'tools', 'cases', 'templates', 'research-skills']) {
      for (const file of files(collection)) {
        const content = read(collection, file);
        publicSources.push({ path: `src/content/${collection}/${file}`, source: content });
      }
    }
    for (const file of recursiveFiles(pagesRoot, ['.astro'])) publicSources.push({ path: `src/pages/${file}`, source: readPage(file) });

    for (const { path, source } of publicSources) {
      expect(source, `${path} still exposes slideRefs`).not.toMatch(/\bslideRefs\b/);
      expect(source, `${path} reintroduces evidence-matrix framing`).not.toContain('證據矩陣');
      for (const phrase of bannedPublicPhrases) expect(source, `${path} contains banned phrase ${phrase}`).not.toContain(phrase);
      for (const { label, pattern } of bannedPublicPatterns) expect(source, `${path} contains ${label}`).not.toMatch(pattern);
    }
  });

  it('documents each named tool with capability facets', () => {
    const required = ['kind', 'level', 'aliases', 'bestFor', 'avoidFor', 'firstStep', 'lastVerified'];
    const capabilities = ['localFiles', 'commands', 'sourceCitations', 'webAccess', 'backgroundTasks', 'humanApproval'];
    for (const file of files('tools')) {
      const content = read('tools', file);
      const metadata = frontmatter(content);
      for (const key of required) expect(metadata, `${file} is missing ${key}`).toMatch(new RegExp(`^${key}:`, 'm'));
      expect(metadata, `${file} is missing capabilities`).toMatch(/^capabilities:/m);
      expect(metadata, `${file} still uses canEditFiles`).not.toMatch(/^canEditFiles:/m);
      for (const capability of capabilities) {
        expect(metadata, `${file} is missing capability ${capability}`).toMatch(new RegExp(`^  ${capability}: (yes|no|depends)$`, 'm'));
      }
    }
  });

  it('keeps classification, reproducibility, privacy, licensing, and covers visible in every case', () => {
    const toolIds = new Set(files('tools').map(contentId));
    for (const file of files('cases')) {
      const content = read('cases', file);
      const metadata = frontmatter(content);
      expect(metadata).toMatch(/^category: (公開成果|可重跑示範|匿名流程重建)$/m);
      expect(metadata).toMatch(/^reproducible: (true|false)$/m);
      expect(metadata).toMatch(/^privacyReview:/m);
      expect(metadata).toMatch(/^sourceLicense:/m);
      expect(frontmatterList(metadata, 'graduateTransfer').length, `${file} needs a graduate-student transfer`).toBeGreaterThan(0);
      for (const tool of frontmatterList(metadata, 'relatedTools')) expect(toolIds.has(tool), `${file} references unknown tool ${tool}`).toBe(true);
      const coverImage = frontmatterValue(metadata, 'coverImage');
      expect(coverImage, `${file} needs a cover image`).toBeTruthy();
      expect(coverImage, `${file} cover image must be relative to the configured project base`).toMatch(/^\/images\/cases\/[a-z0-9-]+\.webp$/);
      const publicPath = coverImage?.replace(/^\//, '') ?? '';
      expect(existsSync(resolve(process.cwd(), 'public', publicPath)), `${file} cover image does not exist`).toBe(true);
    }
  });

  it('keeps every related content slug resolvable', () => {
    const toolIds = new Set(files('tools').map(contentId));
    const lessonIds = new Set(files('lessons').map(contentId));
    const caseIds = new Set(files('cases').map(contentId));
    for (const file of files('lessons')) {
      const metadata = frontmatter(read('lessons', file));
      for (const tool of frontmatterList(metadata, 'relatedTools')) expect(toolIds.has(tool), `lessons/${file} references unknown tool ${tool}`).toBe(true);
      for (const relatedCase of frontmatterList(metadata, 'relatedCases')) expect(caseIds.has(relatedCase), `lessons/${file} references unknown case ${relatedCase}`).toBe(true);
    }
    for (const file of files('tools')) {
      for (const lesson of frontmatterList(frontmatter(read('tools', file)), 'relatedLessons')) {
        expect(lessonIds.has(lesson), `tools/${file} references unknown lesson ${lesson}`).toBe(true);
      }
    }
    for (const collection of ['cases', 'templates']) {
      for (const file of files(collection)) {
        for (const tool of frontmatterList(frontmatter(read(collection, file)), 'relatedTools')) expect(toolIds.has(tool), `${collection}/${file} references unknown tool ${tool}`).toBe(true);
      }
    }
  });

  it('keeps the core copyable templates and maps every template to research tasks', () => {
    const taskIds = new Set(['read', 'write', 'experiment', 'present', 'publish', 'automate']);
    expect(files('templates')).toEqual(expect.arrayContaining([
      'ask-before-action.md',
      'context-cache-index.md',
      'git-checkpoint-release.md',
      'independent-review.md',
      'six-part-brief.md',
      'usage-review.md',
      'workspace-rules.md',
      'handoff.md',
    ]));
    for (const file of files('templates')) {
      const metadata = frontmatter(read('templates', file));
      const applicableTasks = frontmatterList(metadata, 'applicableTasks');
      expect(applicableTasks.length, `${file} needs at least one applicable task`).toBeGreaterThan(0);
      for (const task of applicableTasks) expect(taskIds.has(task), `${file} references unknown task ${task}`).toBe(true);
    }
  });

  it('keeps the project base in one config consumed by build and test infrastructure', () => {
    const configPath = resolve(projectRoot, 'site.config.json');
    expect(existsSync(configPath), 'site.config.json must be the single source of the Pages base').toBe(true);
    if (!existsSync(configPath)) return;

    const config = JSON.parse(readFileSync(configPath, 'utf8')) as { projectBase?: string; site?: string };
    expect(config).toEqual({ projectBase: '/graduate-ai-research-workbench', site: 'https://phonchi.github.io' });

    for (const consumer of ['astro.config.mjs', 'playwright.config.ts', 'scripts/test-server.mjs']) {
      expect(readFileSync(resolve(projectRoot, consumer), 'utf8'), `${consumer} must consume site.config.json`).toContain('site.config.json');
    }
  });

  it('does not hardcode the project base in runtime sources outside the site config', () => {
    const configPath = resolve(projectRoot, 'site.config.json');
    expect(existsSync(configPath), 'site.config.json must define the forbidden duplicate base').toBe(true);
    if (!existsSync(configPath)) return;
    const { projectBase } = JSON.parse(readFileSync(configPath, 'utf8')) as { projectBase: string };
    const runtimeRoots = [
      ...recursiveFiles(resolve(projectRoot, 'src'), ['.astro', '.md', '.mdx', '.ts']).filter((file) => !file.endsWith('.test.ts')).map((file) => `src/${file}`),
      ...recursiveFiles(resolve(projectRoot, 'tests'), ['.ts']).map((file) => `tests/${file}`),
      ...recursiveFiles(resolve(projectRoot, 'scripts'), ['.js', '.mjs', '.ts']).map((file) => `scripts/${file}`),
      'astro.config.mjs',
      'playwright.config.ts',
    ];

    for (const file of runtimeRoots) {
      const absolute = resolve(projectRoot, file);
      const source = readFileSync(absolute, 'utf8').replaceAll('https://github.com/phonchi/graduate-ai-research-workbench', '');
      expect(source, `${absolute} hardcodes the Pages base`).not.toContain(projectBase);
    }
  });
});
