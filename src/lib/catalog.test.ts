import { describe, expect, it } from 'vitest';
import { filterCatalog, normalizeSearchText, type CatalogItem } from './catalog';

const items: CatalogItem[] = [
  {
    title: '建立可回查的文獻知識庫',
    summary: '使用 NotebookLM 整理論文與引用',
    stage: '探索',
    difficulty: '基礎',
    skills: ['文獻綜整', '來源查核'],
    tools: ['NotebookLM'],
    outputs: ['證據矩陣'],
    href: '/learn/evidence/',
  },
  {
    title: '用 Git 重現研究流程',
    summary: '記錄版本與驗證結果',
    stage: '執行',
    difficulty: '進階',
    skills: ['可重現研究'],
    tools: ['Git', 'CLI'],
    outputs: ['研究紀錄'],
    href: '/learn/reproducibility/',
  },
];

describe('normalizeSearchText', () => {
  it('normalizes case and surrounding whitespace without removing Chinese text', () => {
    expect(normalizeSearchText('  Git 文獻  ')).toBe('git 文獻');
  });
});

describe('filterCatalog', () => {
  it('searches titles, summaries, skills, tools, and outputs', () => {
    expect(filterCatalog(items, { query: '證據矩陣' })).toEqual([items[0]]);
    expect(filterCatalog(items, { query: 'git' })).toEqual([items[1]]);
  });

  it('combines stage, difficulty, skill, tool, and output filters', () => {
    expect(filterCatalog(items, {
      stage: '探索',
      difficulty: '基礎',
      skill: '來源查核',
      tool: 'NotebookLM',
      output: '證據矩陣',
    })).toEqual([items[0]]);
  });

  it('returns all items for empty filters and no items for unmatched filters', () => {
    expect(filterCatalog(items, {})).toHaveLength(2);
    expect(filterCatalog(items, { query: '不存在' })).toEqual([]);
  });
});
