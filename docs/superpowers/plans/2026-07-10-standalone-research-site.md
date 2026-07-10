# Standalone Graduate Research Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current slide-aligned teaching site into a standalone, source-backed graduate research guide with seven lessons, capability-based tool selection, seven categorized cases, seven templates, and a complete research-safety guide.

**Architecture:** Astro content collections remain the source of truth. The content schema replaces `slideRefs` with typed lesson references, lesson outcomes, capability facets, and case categories; page components render these fields without knowing any presentation file. A small runnable experiment under `examples/` provides the seventh reproducible case and is verified by Vitest and Playwright.

**Tech Stack:** Astro 5, TypeScript, Markdown content collections, Vitest, Playwright, Pagefind, lucide-astro, Sharp.

## Global Constraints

- Public pages must not show slide numbers, presentation filenames, “對照投影片”, “投影片主線”, or “投影片的核心比喻”.
- Keep seven lessons, thirteen tools, seven cases, and seven templates.
- Every lesson must show two to four verified references of type `paper`, `official`, `standard`, `policy`, or `case`.
- Prefer primary research, official documentation, standards, and policy sources; community pages cannot support key factual claims.
- Do not publish volatile prices, model limits, token ratios, unsupported percentages, or full chain-of-thought guidance.
- Product-specific claims must have a current official URL and `lastVerified: 2026-07-10` or later.
- Keep all existing legacy redirects inside `/graduate-ai-research-workbench/`.
- Use existing visual language and components; do not rebuild the design system.

---

### Task 1: Replace Slide Metadata With Standalone Content Contracts

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/lib/content-contract.test.ts`

**Interfaces:**
- Produces: `Reference { title, url, type, note }`, `ToolCapabilities`, lesson `learningOutcomes` and `prerequisites`, case `category` and `reproducible`.
- Consumers: all later content tasks and Astro pages.

- [ ] **Step 1: Write failing content-contract tests**

Add assertions that require exact collection counts, reject slide-dependent copy, validate two-to-four lesson references, validate all related slugs, and require seven case covers. Use these field shapes:

```ts
const bannedPublicPhrases = ['對照投影片', '投影片主線', '投影片的核心比喻'];
expect(files('lessons')).toHaveLength(7);
expect(files('cases')).toHaveLength(7);
for (const file of files('lessons')) {
  const content = read('lessons', file);
  expect(content).not.toMatch(/^slideRefs:/m);
  expect(frontmatterList(content, 'learningOutcomes')).toHaveLength(3);
  expect((content.match(/^  - title:/gm) ?? []).length).toBeGreaterThanOrEqual(2);
  expect((content.match(/^  - title:/gm) ?? []).length).toBeLessThanOrEqual(4);
  for (const phrase of bannedPublicPhrases) expect(content).not.toContain(phrase);
}
```

- [ ] **Step 2: Run the contract test and confirm failure**

Run: `npm test -- src/lib/content-contract.test.ts`

Expected: FAIL because there are six lessons/cases, `slideRefs` is present, and `references` is absent.

- [ ] **Step 3: Implement the new schemas**

In `src/content.config.ts`, define and use:

```ts
const reference = z.object({
  title: z.string(),
  url: z.url(),
  type: z.enum(['paper', 'official', 'standard', 'policy', 'case']),
  note: z.string(),
});
const access = z.enum(['yes', 'no', 'depends']);
const capabilities = z.object({
  localFiles: access,
  commands: access,
  sourceCitations: access,
  webAccess: access,
  backgroundTasks: access,
  humanApproval: access,
});
const taskId = z.enum(['read', 'write', 'experiment', 'present', 'publish', 'automate']);
```

Remove `slideRefs` from lessons, cases, and templates. Add `learningOutcomes: z.array(z.string()).length(3)`, `prerequisites: z.array(z.string()).default([])`, and `references: z.array(reference).min(2).max(4)` to lessons. Replace `canEditFiles` with `capabilities` in tools. Add `category: z.enum(['公開成果', '可重跑示範', '匿名流程重建'])` and `reproducible: z.boolean()` to cases.
Add `applicableTasks: z.array(taskId).min(1)` to templates so the task router can recommend concrete templates.

- [ ] **Step 4: Run the contract test to confirm schema failures now point to content**

Run: `npm test -- src/lib/content-contract.test.ts`

Expected: FAIL with missing new frontmatter fields; no TypeScript syntax errors.

- [ ] **Step 5: Commit the contract**

```bash
git add src/content.config.ts src/lib/content-contract.test.ts
git commit -m "test: define standalone research content contract"
```

---

### Task 2: Rewrite Lessons 1–4 as Self-Contained Guides

**Files:**
- Modify: `src/content/lessons/01-from-chat-to-agent.md`
- Modify: `src/content/lessons/02-ask-before-action.md`
- Modify: `src/content/lessons/03-context-and-indexes.md`
- Modify: `src/content/lessons/04-checkpoints-and-tools.md`

**Interfaces:**
- Consumes: lesson schema from Task 1.
- Produces: four self-contained lessons with three outcomes and two-to-four references each.

- [ ] **Step 1: Verify all planned sources before writing**

Use primary/official pages only. Required anchors:

- Lesson 1: Richard Sutton’s “The Bitter Lesson”; an official agent architecture guide; official Codex or Claude Code overview.
- Lesson 2: official Claude Code tools reference for `AskUserQuestion`; official prompting/task guidance from a product represented in the glossary.
- Lesson 3: Liu et al., “Lost in the Middle” at `https://arxiv.org/abs/2307.03172`; official NotebookLM entry; PRISMA or another primary review-record source.
- Lesson 4: official Codex `AGENTS.md` guide, Claude Code memory/settings documentation, and Git documentation.

Record only working canonical URLs and claims directly supported by them.

- [ ] **Step 2: Add the new frontmatter**

Each file must contain:

```yaml
learningOutcomes:
  - 用 quick notes、索引與全文建立三層研究資料入口。
  - 區分 preprint、正式出版版本、勘誤與撤稿狀態。
  - 從 AI 回答回查到原文段落並標記尚未確認的主張。
prerequisites: []
references:
  - title: "Lost in the Middle: How Language Models Use Long Contexts"
    url: https://arxiv.org/abs/2307.03172
    type: paper
    note: 說明長 context 中資訊位置會影響模型取用表現。
```

- [ ] **Step 3: Rewrite the bodies with distinct teaching forms**

- Lesson 1: comparison table plus Centaur/Cyborg decision prompts.
- Lesson 2: wish-to-spec before/after example plus a clarification decision tree.
- Lesson 3: quick-notes/index/full-text tutorial plus source-version checklist.
- Lesson 4: research workspace walkthrough covering rules, checkpoint, progress log, permissions, and verification commands.

Remove all “投影片” and “講者” framing. Product names belong in tool examples, not in universal definitions.

- [ ] **Step 4: Run focused contract and Astro checks**

Run: `npm test -- src/lib/content-contract.test.ts && npm run check`

Expected: contract still fails only for unfinished lessons/cases/tools; Astro reports missing fields only in collections not yet migrated.

- [ ] **Step 5: Commit lessons 1–4**

```bash
git add src/content/lessons/01-from-chat-to-agent.md src/content/lessons/02-ask-before-action.md src/content/lessons/03-context-and-indexes.md src/content/lessons/04-checkpoints-and-tools.md
git commit -m "content: make core research lessons self-contained"
```

---

### Task 3: Rewrite Lessons 5–6 and Add Reproducible Research Lesson 7

**Files:**
- Modify: `src/content/lessons/05-challenge-and-review.md`
- Modify: `src/content/lessons/06-build-your-toolbox.md`
- Create: `src/content/lessons/07-reproducible-research.md`

**Interfaces:**
- Consumes: lesson schema from Task 1.
- Produces: source-backed verification, Skill maintenance, and reproducible-research lessons.

- [ ] **Step 1: Verify lesson sources**

- Lesson 5: OpenAI Evals API reference at `https://platform.openai.com/docs/api-reference/evals` and NIST AI RMF at `https://airc.nist.gov/airmf-resources/airmf/`.
- Lesson 6: Agent Skills specification/repository, official Claude Code Skills documentation, and current official Codex Skills documentation.
- Lesson 7: Wilson et al., “Good Enough Practices in Scientific Computing”; FAIR principles; official evaluation guidance; a primary or standards-based reproducibility source.

- [ ] **Step 2: Rewrite lesson 5 as a failure-diagnosis guide**

Cover silent failure, spec drift, sycophancy, cascade failure, planner/generator/evaluator separation, objective checks, and stop/escalate conditions. Move `/insights` to a small platform-specific example under continuous improvement.

- [ ] **Step 3: Rewrite lesson 6 as a Skill lifecycle**

Use the sequence: run manually twice → collect real failure points → separate instructions/scripts/references → blind-test on a second task → version and review for skill rot. Distinguish Skill, subagent, MCP, plugin, and project rules without turning the lesson into a product map.

- [ ] **Step 4: Add lesson 7 as a runnable research workflow**

Teach: read-only inventory → Git checkpoint → environment lock → immutable raw data → seed/config → command log → derived outputs → manifest → gold tasks → human rubric → failure log. Include a concise experiment manifest example and explicit stopping conditions.

- [ ] **Step 5: Run content checks and commit**

Run: `npm test -- src/lib/content-contract.test.ts && npm run check`

```bash
git add src/content/lessons
git commit -m "content: add reproducible research and evaluation lessons"
```

---

### Task 4: Migrate Tool Capabilities and Build Capability-First Selection

**Files:**
- Modify: `src/content/tools/*.md`
- Modify: `src/components/ToolFilter.astro`
- Modify: `src/pages/tools/index.astro`
- Modify: `src/pages/tools/[...slug].astro`
- Modify: `src/pages/tasks/index.astro`
- Test: `tests/e2e/workbench.spec.ts`

**Interfaces:**
- Consumes: `ToolCapabilities` from Task 1.
- Produces: tool cards/detail pages and task routing based on capability facets.

- [ ] **Step 1: Write failing Playwright tests for capability filters**

Add a test that selects `本機檔案 = yes` and `命令執行 = yes`, expects Codex/Claude Code/Gemini CLI, then selects `固定來源引用 = yes` and expects NotebookLM. Add a task-page test that confirms “執行程式” returns more than one tool and a sensitive-data answer routes to safety guidance.

Run: `npm run test:e2e -- tests/e2e/workbench.spec.ts -g "capability"`

Expected: FAIL because the controls and routing UI do not exist.

- [ ] **Step 2: Migrate all thirteen tool entries**

Replace `canEditFiles` with the six-field `capabilities` object. Keep conservative `depends` values where a capability varies by interface, permissions, connector, or product configuration. Retain `interfaces`, `platformNames`, `officialUrl`, and `lastVerified`.

- [ ] **Step 3: Update ToolFilter**

Render select controls for `localFiles`, `commands`, and `sourceCitations`; expose the remaining facets on cards/details. Store values in `data-local-files`, `data-commands`, and `data-source-citations`. Match exact tri-state values and keep the reset/empty-state behavior.

- [ ] **Step 4: Replace product shortcuts with a capability decision flow**

In `src/pages/tasks/index.astro`, present six research tasks and show capability questions before tools. Each result must list multiple compatible tools or a category link, one recommended lesson, and a safety warning when sensitive data is selected.

- [ ] **Step 5: Run focused tests and commit**

Run: `npm run check && npm run test:e2e -- tests/e2e/workbench.spec.ts -g "capability"`

```bash
git add src/content/tools src/components/ToolFilter.astro src/pages/tools src/pages/tasks/index.astro tests/e2e/workbench.spec.ts
git commit -m "feat: select research tools by capability"
```

---

### Task 5: Categorize Cases, Add a Runnable Experiment, and Expand Research Safety

**Files:**
- Modify: `src/content/cases/*.md`
- Create: `src/content/cases/reproducible-experiment.md`
- Create: `examples/reproducible-experiment/raw/measurements.csv`
- Create: `examples/reproducible-experiment/config.json`
- Create: `examples/reproducible-experiment/analyze.mjs`
- Create: `examples/reproducible-experiment/expected/summary.json`
- Create: `scripts/previews/reproducible-experiment.html`
- Create: `public/images/cases/reproducible-experiment.webp`
- Modify: `scripts/build-case-assets.mjs`
- Modify: `src/content/templates/*.md`
- Modify: `src/pages/safety/index.astro`
- Test: `src/lib/content-contract.test.ts`

**Interfaces:**
- Produces: seven categorized cases and a zero-dependency runnable experiment fixture.

- [ ] **Step 1: Add failing tests for the experiment**

Test that `node examples/reproducible-experiment/analyze.mjs` exits 0, writes a summary matching `expected/summary.json`, and does not modify `raw/measurements.csv`. Require all seven cases to have a valid `category`, `reproducible`, and existing cover.

- [ ] **Step 2: Implement the deterministic experiment**

`analyze.mjs` must use Node built-ins only. Read the CSV and config, compute count/mean/min/max rounded as specified in config, and write `derived/summary.json` with input SHA-256, config SHA-256, command, Node version, seed, and timestamp set from a fixed config value. Never write under `raw/`.

- [ ] **Step 3: Add the seventh case and cover**

Document inputs, environment, command, output, manifest, verification, and one intentionally recorded failure. Generate the 1200×675 cover from a repo-local HTML preview and add it to `build-case-assets.mjs`.

- [ ] **Step 4: Categorize and deepen existing cases**

Set public interactive/site/slide cases to `公開成果`; document cache to `可重跑示範`; manuscript review to `匿名流程重建`. Remove all `slideRefs`. Replace generic graduate-transfer lists with concrete input/action/output/verification details where the case supports them.

- [ ] **Step 5: Remove slide metadata from seven templates**

Keep the template count at seven. Replace `slideRefs` with one or more `applicableTasks` values from `read`, `write`, `experiment`, `present`, `publish`, and `automate`.

- [ ] **Step 6: Expand safety into a research responsibility guide**

Add a data-classification table, least-privilege checklist, prompt-injection section, secrets/package rules, publication confirmation, AI disclosure reminder, and institution/journal policy reminder. Cite current NIST AI RMF, OWASP LLM01 Prompt Injection, and an authoritative publication-ethics source.

- [ ] **Step 7: Verify and commit**

Run: `node scripts/build-case-assets.mjs && npm test && npm run check`

```bash
git add src/content/cases src/content/templates examples/reproducible-experiment scripts public/images/cases src/pages/safety/index.astro src/lib/content-contract.test.ts
git commit -m "feat: add reproducible research case and safety guide"
```

---

### Task 6: Remove Presentation Framing From Every Public Page

**Files:**
- Create: `src/components/ReferenceList.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/learn/index.astro`
- Modify: `src/pages/learn/[...slug].astro`
- Modify: `src/pages/cases/index.astro`
- Modify: `src/pages/cases/[...slug].astro`
- Modify: `src/pages/templates/index.astro`
- Modify: `src/pages/templates/[...slug].astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Modify: `README.md`

**Interfaces:**
- Consumes: lesson references/outcomes, case categories, and tool capability data.
- Produces: presentation-independent public UI.

- [ ] **Step 1: Add ReferenceList**

Render a semantic section with heading “來源與延伸閱讀”, source-type label, linked title, and note. External links must expose a clear accessible name and use the existing external-link icon pattern.

- [ ] **Step 2: Update lesson and home pages**

Replace “投影片主線” with “核心學習路徑”. Lesson cards show time plus the first learning outcome. Lesson headers show time only; sidebars show outcomes/prerequisites/related tools. Append `ReferenceList` after lesson content.

- [ ] **Step 3: Update case and template pages**

Case lists and detail pages display category and reproducibility instead of slide pages. Template pages display category and purpose only. Change “REAL WORK, NOT DEMOS” to wording that accurately includes public work, runnable demos, and reconstructed workflows.

- [ ] **Step 4: Remove residual framing**

Run:

```bash
rg -n "對照投影片|投影片主線|投影片的核心比喻|slideRefs|講者所用" README.md src tests
```

Expected: no user-visible matches; test fixtures may contain banned phrases only in negative assertions.

- [ ] **Step 5: Check layout and commit**

Run: `npm run check && npm test`

```bash
git add src/components/ReferenceList.astro src/pages src/layouts/BaseLayout.astro src/styles/global.css README.md
git commit -m "feat: make the teaching site presentation independent"
```

---

### Task 7: Complete Browser Coverage and Visual QA

**Files:**
- Modify: `tests/e2e/workbench.spec.ts`
- Modify: `tests/e2e/visual.spec.ts`

**Interfaces:**
- Verifies all public behavior from Tasks 1–6.

- [ ] **Step 1: Add final E2E assertions**

Cover: seven lesson cards; no visible slide reference text; lesson reference links; capability filters; capability task routing; seven categorized cases; reproducible experiment case; expanded safety headings; template copy/download; Pagefind; legacy redirects; no-JS navigation/content.

- [ ] **Step 2: Expand visual routes**

Capture desktop/mobile screenshots for `/`, `/learn/07-reproducible-research/`, `/tools/`, `/tasks/`, `/cases/`, and `/safety/`. Assert horizontal overflow ≤1 px and zero broken images.

- [ ] **Step 3: Run the complete verification suite**

Run: `npm run verify`

Expected: lint passes; Vitest reports every test file passed with 0 failures; Astro reports 0 errors/warnings; production build and Pagefind complete; every non-skipped desktop/mobile Playwright test passes.

- [ ] **Step 4: Inspect screenshots manually**

Use `view_image` on homepage, tools, task routing, lesson 7, cases, and safety screenshots at desktop and mobile sizes. Check heading hierarchy, text fit, filter controls, reference wrapping, card density, and nonblank assets. Fix and rerun affected tests until no new issue remains.

- [ ] **Step 5: Commit test coverage**

```bash
git add tests/e2e src/styles/global.css
git commit -m "test: verify standalone research workflows"
```

---

### Task 8: Independent Review, Merge, Deploy, and Live Verification

**Files:**
- Review all changes from `main..feature/standalone-research-site`.

**Interfaces:**
- Produces: reviewed and deployed GitHub Pages site.

- [ ] **Step 1: Request independent content review**

The reviewer must verify source-to-claim fit, seven-lesson coherence, lack of slide dependence, nonrepetitive teaching forms, research safety, and absence of unsupported quantitative claims.

- [ ] **Step 2: Request independent code review**

Review schema consistency, client filtering, no-JS behavior, slug/asset integrity, redirects, accessibility, and test gaps. Fix all Critical and Important findings.

- [ ] **Step 3: Run final verification on the feature branch**

Run: `npm run verify && git diff --check`

Expected: all checks pass and the worktree is clean after committing fixes.

- [ ] **Step 4: Merge and verify main**

Fast-forward `main`, run `npm run verify` again, then push `main`.

- [ ] **Step 5: Watch Pages and inspect the live site**

Wait for the deploy workflow to complete successfully. Confirm live HTTP 200 responses, seven lesson titles, capability tool filters, case categories, lesson references, reproducible experiment cover, and legacy redirects inside the project base.
