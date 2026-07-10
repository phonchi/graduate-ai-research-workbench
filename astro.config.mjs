import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://phonchi.github.io',
  base: '/graduate-ai-research-workbench',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
