import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(process.cwd(), 'src/content');
const files = (collection: string) => {
  const directory = resolve(root, collection);
  return existsSync(directory) ? readdirSync(directory).filter((file) => file.endsWith('.md')) : [];
};
const read = (collection: string, file: string) => readFileSync(resolve(root, collection, file), 'utf8');
const frontmatterList = (content: string, key: string) => {
  const match = content.match(new RegExp(`^${key}:\\n((?:  - .+\\n)+)`, 'm'));
  return match ? match[1].trim().split('\n').map((line) => line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '')) : [];
};

describe('content contract', () => {
  it('ships the slide-aligned learning path and reference collections', () => {
    expect(files('lessons')).toHaveLength(6);
    expect(files('cases')).toHaveLength(6);
    expect(files('tools')).toHaveLength(13);
    expect(files('templates')).toHaveLength(7);
  });

  it('ties every lesson to the presentation without repeating the old eight-part template', () => {
    const legacyHeadings = ['為什麼需要', '任務', '做法', '工具配方', '人工檢查點', '常見失敗', '驗收清單', '延伸挑戰'];
    for (const file of files('lessons')) {
      const content = read('lessons', file);
      expect(frontmatterList(content, 'slideRefs').length, `${file} needs slide references`).toBeGreaterThan(0);
      expect(frontmatterList(content, 'keyTerms').length, `${file} needs tool or concept terms`).toBeGreaterThan(0);
      const repeated = legacyHeadings.filter((heading) => content.includes(`## ${heading}`));
      expect(repeated, `${file} still uses the old repeated lesson template`).toHaveLength(0);
    }
  });

  it('removes evidence-matrix framing that is not part of the presentation', () => {
    for (const collection of ['lessons', 'tools', 'cases', 'templates']) {
      for (const file of files(collection)) {
        expect(read(collection, file), `${collection}/${file} reintroduces evidence-matrix framing`).not.toContain('證據矩陣');
      }
    }
  });

  it('documents each named tool as a practical lookup entry', () => {
    const required = ['kind', 'level', 'aliases', 'bestFor', 'avoidFor', 'firstStep', 'lastVerified'];
    for (const file of files('tools')) {
      const content = read('tools', file);
      for (const key of required) expect(content, `${file} is missing ${key}`).toMatch(new RegExp(`^${key}:`, 'm'));
    }
  });

  it('keeps privacy and licensing visible in every case', () => {
    for (const file of files('cases')) {
      const content = read('cases', file);
      expect(content).toContain('privacyReview:');
      expect(content).toContain('sourceLicense:');
      expect(frontmatterList(content, 'slideRefs').length, `${file} needs slide references`).toBeGreaterThan(0);
      expect(frontmatterList(content, 'graduateTransfer').length, `${file} needs a graduate-student transfer`).toBeGreaterThan(0);
    }
  });

  it('ships only the seven presentation-backed copyable templates', () => {
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
      expect(read('templates', file)).toMatch(/^slideRefs:\n(?:  - \d+\n)+/m);
    }
  });

  it('ships the four-source synthetic corpus claimed by the document-cache case', () => {
    const corpus = resolve(process.cwd(), 'examples/synthetic-corpus');
    const index = JSON.parse(readFileSync(resolve(corpus, 'index.json'), 'utf8')) as Array<{ path: string }>;
    expect(index).toHaveLength(4);
    for (const entry of index) expect(() => readFileSync(resolve(corpus, entry.path))).not.toThrow();
  });
});
