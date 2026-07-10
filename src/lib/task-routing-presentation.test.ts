import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('capability-first task routing presentation', () => {
  it('keeps ChatGPT Web conservative about direct workspace access', () => {
    expect(read('src/content/tools/chatgpt.md')).toMatch(/capabilities:\n {2}localFiles: no\n/);
  });

  it('labels every selected capability on compatible task candidates', () => {
    const page = read('src/pages/tasks/index.astro');
    expect(page).toContain('data-task-capability-status');
    expect(page).toContain('data-task-status-access');
    expect(page).toContain("accessLabels[access]");
  });

  it('provides no-JavaScript guidance and accessible dynamic status', () => {
    const page = read('src/pages/tasks/index.astro');
    expect(page).toMatch(/class="no-js-task-note"[\s\S]*?\/safety\//);
    expect(page).toContain('role="status"');
    expect(page).toContain('aria-live="polite"');
    expect(page).toContain('role="alert"');
  });

  it('collapses the task router before the 801 to 850 pixel range', () => {
    const styles = read('src/styles/global.css');
    expect(styles).toMatch(/@media \(max-width: 900px\)[\s\S]*?\.task-router-form \{ grid-template-columns: 1fr; \}/);
    expect(styles).toContain('.no-js .task-router-form');
  });
});
