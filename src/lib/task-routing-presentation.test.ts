import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

describe('capability-first task routing presentation', () => {
  it('keeps ChatGPT Web conservative about direct workspace access', () => {
    expect(read('src/content/tools/chatgpt.md')).toMatch(/capabilities:\n {2}localFiles: no\n/);
  });

  it('maps all task capability controls to candidate status labels', () => {
    const page = read('src/pages/tasks/index.astro');
    const capabilityBlock = page.match(/const capabilityLabels = \{([\s\S]*?)\} as const;/)?.[1];
    const capabilities = {
      localFiles: '本機檔案',
      commands: '命令執行',
      sourceCitations: '固定來源引用',
      webAccess: '網路存取',
      backgroundTasks: '背景任務',
    };

    expect(capabilityBlock).toBeDefined();
    for (const [capability, label] of Object.entries(capabilities)) {
      expect(capabilityBlock).toContain(`${capability}: '${label}'`);
      expect(page).toContain(`data-task-capability="${capability}"`);
    }

    const statusTag = page.match(/<li data-task-capability-status=\{capability\}[^>]*>[\s\S]*?<\/li>/)?.[0];
    expect(statusTag).toContain('<span>{label}</span>');
    expect(statusTag).toContain('data-task-status-access={access}');
    expect(statusTag).toContain('{accessLabels[access]}');
    expect(page).toMatch(/const accessLabels = \{ yes: '支援', depends: '視設定', no: '不支援' \} as const;/);
  });

  it('uses one dedicated live status and an alert for sensitive data', () => {
    const page = read('src/pages/tasks/index.astro');
    const resultStatus = page.match(/<p class="task-result-status"[^>]*>/)?.[0];
    const resultsContainer = page.match(/<div class="task-route-results"[^>]*>/)?.[0];
    const sensitiveWarning = page.match(/<div class="sensitive-warning"[^>]*>/)?.[0];

    expect(resultStatus).toContain('role="status"');
    expect(resultStatus).toContain('aria-live="polite"');
    expect(resultsContainer).toBeDefined();
    expect(resultsContainer).not.toContain('aria-live');
    expect(sensitiveWarning).toContain('role="alert"');
  });

  it('shows a safety fallback while hiding only the inert no-JavaScript form', () => {
    const page = read('src/pages/tasks/index.astro');
    const styles = read('src/styles/global.css');
    const noJsNote = page.match(/<div class="no-js-task-note">[\s\S]*?<\/div>/)?.[0];

    expect(noJsNote).toContain('/safety/');
    expect(styles).toMatch(/\.no-js \.task-router-form \{ display: none; \}/);
    expect(styles).toMatch(/\.no-js \.no-js-task-note \{ display: block; \}/);
    expect(styles).toMatch(/\.js \.no-js-task-note \{ display: none; \}/);
    expect(styles).not.toMatch(/\.no-js \.task-route-results \{ display: none; \}/);
  });

  it('collapses the task router before the 801 to 850 pixel range', () => {
    const styles = read('src/styles/global.css');
    expect(styles).toMatch(/@media \(max-width: 900px\)[\s\S]*?\.task-router-form \{ grid-template-columns: 1fr; \}/);
  });
});
