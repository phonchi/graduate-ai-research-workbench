import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stage = z.enum(['起步', '探索', '執行', '驗證', '封裝']);
const difficulty = z.enum(['基礎', '進階', '技術']);
const tool = z.enum(['網頁 AI', 'NotebookLM', '檔案型 Agent', 'Git', 'CLI', 'MCP']);

const common = z.object({
  title: z.string(),
  summary: z.string(),
  order: z.number().int().nonnegative(),
  stage,
  difficulty,
  estimatedMinutes: z.number().int().positive().optional(),
  skills: z.array(z.string()).min(1),
  tools: z.array(tool).default([]),
  outputs: z.array(z.string()).default([]),
  lastVerified: z.coerce.date(),
  draft: z.boolean().default(false),
});

const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.{md,mdx}' }),
  schema: common.extend({
    learningOutcomes: z.array(z.string()).min(2),
    featured: z.boolean().default(false),
  }),
});

const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.{md,mdx}' }),
  schema: common.extend({
    sourceUrl: z.url().optional(),
    sourceLicense: z.string(),
    privacyReview: z.string(),
    coverImage: z.string(),
    evidence: z.array(z.string()).min(1),
  }),
});

const skills = defineCollection({
  loader: glob({ base: './src/content/skills', pattern: '**/*.{md,mdx}' }),
  schema: common.extend({
    aliases: z.array(z.string()).default([]),
    prerequisites: z.array(z.string()).default([]),
    relatedLessons: z.array(z.string()).default([]),
  }),
});

const templates = defineCollection({
  loader: glob({ base: './src/content/templates', pattern: '**/*.{md,mdx}' }),
  schema: common.extend({
    category: z.enum(['規劃', '文獻', '執行', '驗證', '溝通']),
    templateBody: z.string(),
  }),
});

export const collections = { lessons, cases, skills, templates };
