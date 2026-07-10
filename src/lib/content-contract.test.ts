import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(process.cwd(), 'src/content');
const files = (collection: string) => {
  const directory = resolve(root, collection);
  return existsSync(directory) ? readdirSync(directory).filter((file) => file.endsWith('.md')) : [];
};
const read = (collection: string, file: string) => readFileSync(resolve(root, collection, file), 'utf8');
const frontmatter = (content: string) => content.match(/^---\n([\s\S]*?)\n---/m)?.[1] ?? '';
const frontmatterValue = (content: string, key: string) => content.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '');
const frontmatterList = (content: string, key: string) => {
  const match = content.match(new RegExp(`^${key}:\\n((?:  - .+\\n)+)`, 'm'));
  if (match) return match[1].trim().split('\n').map((line) => line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, ''));
  const inline = content.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm'));
  return inline ? inline[1].split(',').map((value) => value.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) : [];
};

describe('content contract', () => {
  it('ships the standalone learning path and reference collections', () => {
    expect(files('lessons')).toHaveLength(7);
    expect(files('cases')).toHaveLength(7);
    expect(files('tools')).toHaveLength(13);
    expect(files('templates')).toHaveLength(7);
  });

  it('makes every lesson standalone and backed by a small reference set', () => {
    const bannedPublicPhrases = ['對照投影片', '投影片主線', '投影片的核心比喻'];
    for (const file of files('lessons')) {
      const content = read('lessons', file);
      expect(content).not.toMatch(/^slideRefs:/m);
      expect(frontmatterList(content, 'learningOutcomes'), `${file} needs three learning outcomes`).toHaveLength(3);
      expect(content, `${file} needs prerequisites metadata`).toMatch(/^prerequisites:/m);
      const metadata = frontmatter(content);
      const referenceCount = (metadata.match(/^ {2}- title: .+$/gm) ?? []).length;
      expect(referenceCount, `${file} needs at least two references`).toBeGreaterThanOrEqual(2);
      expect(referenceCount, `${file} needs at most four references`).toBeLessThanOrEqual(4);
      expect((metadata.match(/^ {4}url: https?:\/\/.+$/gm) ?? []).length, `${file} needs one URL per reference`).toBe(referenceCount);
      expect((metadata.match(/^ {4}type: (paper|official|standard|policy|case)$/gm) ?? []).length, `${file} needs one valid type per reference`).toBe(referenceCount);
      expect((metadata.match(/^ {4}note: .+$/gm) ?? []).length, `${file} needs one note per reference`).toBe(referenceCount);
      expect(frontmatterList(content, 'keyTerms').length, `${file} needs tool or concept terms`).toBeGreaterThan(0);
      for (const phrase of bannedPublicPhrases) expect(content).not.toContain(phrase);
    }
  });

  it('removes slide-dependent and evidence-matrix framing from public content', () => {
    const bannedPublicPhrases = ['對照投影片', '投影片主線', '投影片的核心比喻'];
    for (const collection of ['lessons', 'tools', 'cases', 'templates']) {
      for (const file of files(collection)) {
        const content = read(collection, file);
        expect(content, `${collection}/${file} still has slide metadata`).not.toMatch(/^slideRefs:/m);
        expect(content, `${collection}/${file} reintroduces evidence-matrix framing`).not.toContain('證據矩陣');
        for (const phrase of bannedPublicPhrases) expect(content).not.toContain(phrase);
      }
    }
  });

  it('documents each named tool with capability facets', () => {
    const required = ['kind', 'level', 'aliases', 'bestFor', 'avoidFor', 'firstStep', 'lastVerified'];
    const capabilities = ['localFiles', 'commands', 'sourceCitations', 'webAccess', 'backgroundTasks', 'humanApproval'];
    for (const file of files('tools')) {
      const content = read('tools', file);
      for (const key of required) expect(content, `${file} is missing ${key}`).toMatch(new RegExp(`^${key}:`, 'm'));
      expect(content, `${file} is missing capabilities`).toMatch(/^capabilities:/m);
      expect(content, `${file} still uses canEditFiles`).not.toMatch(/^canEditFiles:/m);
      for (const capability of capabilities) {
        expect(content, `${file} is missing capability ${capability}`).toMatch(new RegExp(`^  ${capability}: (yes|no|depends)$`, 'm'));
      }
    }
  });

  it('keeps classification, reproducibility, privacy, licensing, and covers visible in every case', () => {
    const toolIds = new Set(files('tools').map((file) => file.replace(/\.md$/, '')));
    for (const file of files('cases')) {
      const content = read('cases', file);
      expect(content).toMatch(/^category: (公開成果|可重跑示範|匿名流程重建)$/m);
      expect(content).toMatch(/^reproducible: (true|false)$/m);
      expect(content).toContain('privacyReview:');
      expect(content).toContain('sourceLicense:');
      expect(frontmatterList(content, 'graduateTransfer').length, `${file} needs a graduate-student transfer`).toBeGreaterThan(0);
      for (const tool of frontmatterList(content, 'relatedTools')) expect(toolIds.has(tool), `${file} references unknown tool ${tool}`).toBe(true);
      const coverImage = frontmatterValue(content, 'coverImage');
      expect(coverImage, `${file} needs a cover image`).toBeTruthy();
      const publicPath = coverImage?.replace(/^\/graduate-ai-research-workbench\//, '') ?? '';
      expect(existsSync(resolve(process.cwd(), 'public', publicPath)), `${file} cover image does not exist`).toBe(true);
    }
  });

  it('keeps every related content slug resolvable', () => {
    const toolIds = new Set(files('tools').map((file) => file.replace(/\.md$/, '')));
    const lessonIds = new Set(files('lessons').map((file) => file.replace(/\.md$/, '')));
    const caseIds = new Set(files('cases').map((file) => file.replace(/\.md$/, '')));
    for (const file of files('lessons')) {
      const content = read('lessons', file);
      for (const tool of frontmatterList(content, 'relatedTools')) expect(toolIds.has(tool), `lessons/${file} references unknown tool ${tool}`).toBe(true);
      for (const relatedCase of frontmatterList(content, 'relatedCases')) expect(caseIds.has(relatedCase), `lessons/${file} references unknown case ${relatedCase}`).toBe(true);
    }
    for (const file of files('tools')) {
      for (const lesson of frontmatterList(read('tools', file), 'relatedLessons')) {
        expect(lessonIds.has(lesson), `tools/${file} references unknown lesson ${lesson}`).toBe(true);
      }
    }
    for (const collection of ['cases', 'templates']) {
      for (const file of files(collection)) {
        for (const tool of frontmatterList(read(collection, file), 'relatedTools')) expect(toolIds.has(tool), `${collection}/${file} references unknown tool ${tool}`).toBe(true);
      }
    }
  });

  it('ships only the seven copyable templates and maps each one to research tasks', () => {
    const taskIds = new Set(['read', 'write', 'experiment', 'present', 'publish', 'automate']);
    expect(files('templates').sort()).toEqual([
      'ask-before-action.md',
      'context-cache-index.md',
      'git-checkpoint-release.md',
      'independent-review.md',
      'six-part-brief.md',
      'usage-review.md',
      'workspace-rules.md',
    ]);
    for (const file of files('templates')) {
      const content = read('templates', file);
      const applicableTasks = frontmatterList(content, 'applicableTasks');
      expect(applicableTasks.length, `${file} needs at least one applicable task`).toBeGreaterThan(0);
      for (const task of applicableTasks) expect(taskIds.has(task), `${file} references unknown task ${task}`).toBe(true);
    }
  });

  it('ships the four-source synthetic corpus claimed by the document-cache case', () => {
    const corpus = resolve(process.cwd(), 'examples/synthetic-corpus');
    const index = JSON.parse(readFileSync(resolve(corpus, 'index.json'), 'utf8')) as Array<{ path: string }>;
    expect(index).toHaveLength(4);
    for (const entry of index) expect(() => readFileSync(resolve(corpus, entry.path))).not.toThrow();
  });
});
