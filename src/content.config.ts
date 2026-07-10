import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const difficulty = z.enum(['入門', '實作', '進階']);
const toolKind = z.enum(['網頁', '桌面 App', 'CLI', '檔案', '功能', '協定', '工作方式']);
const reference = z.object({
  title: z.string(),
  url: z.url(),
  type: z.enum(['paper', 'official', 'standard', 'policy', 'case', 'essay']),
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
const base = z.object({
  title: z.string(),
  summary: z.string(),
  order: z.number().int().nonnegative(),
  lastVerified: z.coerce.date(),
  draft: z.boolean().default(false),
});

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    part: z.enum(['觀念', '交辦', 'Context', '實作', '把關', '封裝']),
    difficulty,
    estimatedMinutes: z.number().int().positive(),
    learningOutcomes: z.array(z.string()).length(3),
    prerequisites: z.array(z.string()).default([]),
    references: z.array(reference).min(2).max(4),
    keyTerms: z.array(z.string()).min(1),
    relatedTools: z.array(z.string()).default([]),
    relatedCases: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    kind: toolKind,
    interfaces: z.array(toolKind).default([]),
    level: z.enum(['零門檻', '入門', '進階']),
    aliases: z.array(z.string()).default([]),
    capabilities,
    bestFor: z.array(z.string()).min(1),
    avoidFor: z.array(z.string()).min(1),
    firstStep: z.string(),
    platformNames: z.array(z.string()).default([]),
    officialUrl: z.url().optional(),
    relatedLessons: z.array(z.string()).default([]),
  }),
});

const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    part: z.enum(['實作', '把關', '封裝']),
    difficulty,
    category: z.enum(['公開成果', '可重跑示範', '匿名流程重建']),
    reproducible: z.boolean(),
    relatedTools: z.array(z.string()).default([]),
    graduateTransfer: z.array(z.string()).min(2),
    sourceUrl: z.url().optional(),
    sourceLicense: z.string(),
    privacyReview: z.string(),
    coverImage: z.string(),
  }),
});

const templates = defineCollection({
  loader: glob({ base: './src/content/templates', pattern: '**/*.{md,mdx}' }),
  schema: base.extend({
    category: z.enum(['交辦', 'Context', '規矩', '驗證', '版本控制', '回顧']),
    applicableTasks: z.array(taskId).min(1),
    relatedTools: z.array(z.string()).default([]),
    templateBody: z.string(),
  }),
});

export const collections = { lessons, tools, cases, templates };
