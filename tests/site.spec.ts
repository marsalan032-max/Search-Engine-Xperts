import { test, expect } from '@playwright/test';

test('desktop page, assets, audit request and FAQ work', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Keep growing.');
  await page.getByRole('button', { name: 'Get free audit' }).click();
  await expect(page.locator('#audit-error')).toContainText('valid website');
  await page.getByRole('textbox', { name: 'Your website URL' }).fill('example.com');
  await page.getByRole('button', { name: 'Get free audit' }).click();
  await expect(page.getByRole('link', { name: 'Email my audit request' })).toHaveAttribute('href', /mailto:arslantariq082@gmail.com.*example.com/);
  await page.getByRole('button', { name: '7D', exact: true }).click();
  await expect(page.getByText('6.2K', { exact: true })).toBeVisible();
  const question = page.getByRole('button', { name: "What's included in the free audit?" });
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#answer-2')).toBeVisible();
  await expect(page.locator('#answer-0')).toBeHidden();
  await page.locator('#about').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('img').evaluateAll(imgs => imgs.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true });
});

test('mobile navigation and layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.getByRole('button', { name: 'Services', exact: true }).click();
  await page.getByRole('link', { name: 'Local SEO', exact: true }).click();
  await expect(page).toHaveURL(/#service-2$/);
  await expect(page.getByRole('navigation')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/');
  await page.screenshot({ path: 'artifacts/mobile.png', fullPage: true });
});

test('blog post renders with site header, schema and canonical', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/blog/how-much-does-seo-cost-for-an-agency');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How Much Does SEO Cost for an Agency?');
  await expect(page.locator('header .nav-cta')).toHaveAttribute('href', '/#contact');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://searchenginexperts.com/blog/how-much-does-seo-cost-for-an-agency');
  const schema = await page.locator('script[type="application/ld+json"]').textContent();
  expect(schema).toContain('"BlogPosting"');
  expect(schema).toContain('"FAQPage"');
  await page.getByText('Do agencies guarantee rankings?').click();
  await expect(page.getByText('No credible agency guarantees')).toBeVisible();
  expect(errors).toEqual([]);
  expect((await page.request.get('/blog/not-a-post')).status()).toBe(404);
});
