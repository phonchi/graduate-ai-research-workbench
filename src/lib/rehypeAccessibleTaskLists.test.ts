import { describe, expect, it } from 'vitest';
import { markdownToHtml } from 'satteri';
import { rehypeAccessibleTaskLists } from './rehypeAccessibleTaskLists';

describe('rehypeAccessibleTaskLists', () => {
  it('labels generated task-list checkboxes with their item text', async () => {
    const { html } = await markdownToHtml('- [ ] 核對核心主張與證據。', {
      hastPlugins: [rehypeAccessibleTaskLists()],
    });

    expect(html).toContain('aria-label="待辦：核對核心主張與證據。"');
  });
});
