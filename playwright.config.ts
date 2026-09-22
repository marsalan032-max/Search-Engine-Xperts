import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:3100', browserName: 'chromium', channel: 'chrome' },
  webServer: { command: 'npm run start -- --port 3100', url: 'http://localhost:3100', reuseExistingServer: true },
});
