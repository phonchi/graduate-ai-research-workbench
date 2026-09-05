import { describe, expect, it } from 'vitest';
import { matchesSkill, normalizeSearch } from './research-skills';

describe('skill search', () => {
  it('matches Chinese uses, aliases and multiple words without case sensitivity', () => {
    const text = 'handoff 交接 下一次對話 Claude Code';
    expect(matchesSkill(text, ['plan'], '交接')).toBe(true);
    expect(matchesSkill(text, ['plan'], ' HANDOFF  claude ')).toBe(true);
    expect(matchesSkill(text, ['plan'], '交接 簡報')).toBe(false);
    expect(normalizeSearch(' ＣＬＩ ')).toBe('cli');
  });
  it('combines categories with queries and accepts newly added categories', () => {
    const newItem = { text: '訪談逐字稿 transcription', categories: ['interviews', 'read'] };
    expect(matchesSkill(newItem.text, newItem.categories, '訪談', 'interviews')).toBe(true);
    expect(matchesSkill(newItem.text, newItem.categories, '', 'read')).toBe(true);
    expect(matchesSkill(newItem.text, newItem.categories, '訪談', 'write')).toBe(false);
    expect(matchesSkill(newItem.text, newItem.categories, '')).toBe(true);
  });
});
