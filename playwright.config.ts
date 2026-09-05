import { defineConfig, devices } from '@playwright/test';
import siteConfig from './site.config.json' with { type: 'json' };

const serverOrigin = 'http://127.0.0.1:4173';
const projectURL = `${serverOrigin}${siteConfig.projectBase}/`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: projectURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'ASTRO_TELEMETRY_DISABLED=1 npm run build && node scripts/test-server.mjs',
    url: projectURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
});
