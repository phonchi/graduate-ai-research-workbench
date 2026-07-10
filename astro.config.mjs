import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { rehypeAccessibleTaskLists } from './src/lib/rehypeAccessibleTaskLists';

export default defineConfig({
  site: 'https://phonchi.github.io',
  base: '/graduate-ai-research-workbench',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({ hastPlugins: [rehypeAccessibleTaskLists()] }),
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
