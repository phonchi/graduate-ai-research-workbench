import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { rehypeAccessibleTaskLists } from './src/lib/rehypeAccessibleTaskLists';

const projectBase = '/graduate-ai-research-workbench';
const withinProject = (path) => {
  const [pathname, fragment] = path.split('#');
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${projectBase}${normalizedPath}${fragment ? `#${fragment}` : ''}`;
};

export default defineConfig({
  site: 'https://phonchi.github.io',
  base: projectBase,
  trailingSlash: 'always',
  redirects: {
    '/learn/01-task-specification': withinProject('/learn/02-ask-before-action'),
    '/learn/02-literature-evidence': withinProject('/learn/03-context-and-indexes'),
    '/learn/03-context-knowledge-base': withinProject('/learn/03-context-and-indexes'),
    '/learn/04-research-outputs': withinProject('/learn/02-ask-before-action'),
    '/learn/05-reproducibility-git': withinProject('/learn/04-checkpoints-and-tools'),
    '/learn/06-verification-review': withinProject('/learn/05-challenge-and-review'),
    '/learn/07-workflow-automation': withinProject('/learn/06-build-your-toolbox'),
    '/skills': withinProject('/tools'),
    '/skills/academic-writing': withinProject('/tasks/#write'),
    '/skills/claim-evidence-mapping': withinProject('/learn/05-challenge-and-review'),
    '/skills/context-management': withinProject('/learn/03-context-and-indexes'),
    '/skills/counterexample-checking': withinProject('/learn/05-challenge-and-review'),
    '/skills/data-provenance': withinProject('/learn/04-checkpoints-and-tools'),
    '/skills/git-version-control': withinProject('/tools/git-github'),
    '/skills/literature-synthesis': withinProject('/learn/03-context-and-indexes'),
    '/skills/reproducible-research': withinProject('/learn/04-checkpoints-and-tools'),
    '/skills/skill-design': withinProject('/tools/skill'),
    '/skills/source-verification': withinProject('/learn/05-challenge-and-review'),
    '/skills/subagent-delegation': withinProject('/tools/subagent'),
    '/skills/task-specification': withinProject('/learn/02-ask-before-action'),
    '/skills/visual-verification': withinProject('/learn/05-challenge-and-review'),
    '/templates/claim-citation-audit': withinProject('/templates/independent-review'),
    '/templates/literature-evidence-matrix': withinProject('/templates/context-cache-index'),
    '/templates/manuscript-review-checklist': withinProject('/templates/independent-review'),
    '/templates/presentation-web-qa': withinProject('/templates/git-checkpoint-release'),
    '/templates/reproducibility-checklist': withinProject('/templates/git-checkpoint-release'),
    '/templates/research-log': withinProject('/templates/usage-review'),
    '/templates/research-task-brief': withinProject('/templates/six-part-brief'),
  },
  markdown: {
    processor: satteri({ hastPlugins: [rehypeAccessibleTaskLists()] }),
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
