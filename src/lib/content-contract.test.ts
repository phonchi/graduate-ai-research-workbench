import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(process.cwd(), 'src/content');
const files = (collection: string) => readdirSync(resolve(root, collection)).filter((file) => file.endsWith('.md'));
const read = (collection: string, file: string) => readFileSync(resolve(root, collection, file), 'utf8');
const frontmatterList = (content: string, key: string) => {
  const match = content.match(new RegExp(`^${key}:\\n((?:  - .+\\n)+)`, 'm'));
  return match ? match[1].trim().split('\n').map((line) => line.replace(/^\s*-\s*/, '').replace(/^['"]|['"]$/g, '')) : [];
};

describe('content contract', () => {
  it('ships the planned collection sizes', () => {
    expect(files('lessons')).toHaveLength(7);
    expect(files('cases')).toHaveLength(6);
    expect(files('skills').length).toBeGreaterThanOrEqual(12);
    expect(files('templates')).toHaveLength(8);
  });

  it('keeps every lesson task-oriented and independently verifiable', () => {
    const headings = ['為什麼需要', '任務', '做法', '工具配方', '人工檢查點', '常見失敗', '驗收清單', '延伸挑戰'];
    for (const file of files('lessons')) {
      const content = read('lessons', file);
      for (const heading of headings) expect(content, `${file} is missing ${heading}`).toContain(`## ${heading}`);
    }
  });

  it('keeps privacy and licensing visible in every case', () => {
    for (const file of files('cases')) {
      const content = read('cases', file);
      expect(content).toContain('privacyReview:');
      expect(content).toContain('sourceLicense:');
      expect(content).toContain('## 隱私與授權');
    }
  });

  it('uses the skill index as the canonical skill taxonomy', () => {
    const skillTitles = new Set(files('skills').map((file) => read('skills', file).match(/^title:\s*["']?(.+?)["']?$/m)?.[1] ?? ''));
    for (const collection of ['lessons', 'cases', 'templates']) {
      for (const file of files(collection)) {
        for (const skill of frontmatterList(read(collection, file), 'skills')) {
          expect(skillTitles, `${collection}/${file} references unknown skill: ${skill}`).toContain(skill);
        }
      }
    }
  });

  it('ships the four-source synthetic corpus claimed by the document-cache case', () => {
    const corpus = resolve(process.cwd(), 'examples/synthetic-corpus');
    const index = JSON.parse(readFileSync(resolve(corpus, 'index.json'), 'utf8')) as Array<{ path: string }>;
    expect(index).toHaveLength(4);
    for (const entry of index) expect(() => readFileSync(resolve(corpus, entry.path))).not.toThrow();
  });
});
