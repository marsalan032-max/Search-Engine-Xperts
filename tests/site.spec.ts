import { test, expect } from '@playwright/test';

test('desktop page, assets, audit request and FAQ work', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Get more customers.');
  await page.getByRole('button', { name: 'Get free audit' }).click();
  await expect(page.locator('#audit-error')).toContainText('valid website');
  await page.getByRole('textbox', { name: 'Your website URL' }).fill('example.com');
  await page.getByRole('button', { name: 'Get free audit' }).click();
  await expect(page.getByRole('link', { name: 'Email my audit request' })).toHaveAttribute('href', /mailto:arslantariq082@gmail.com.*example.com/);
  await expect(page.locator('.h-project')).toHaveCount(4);
  await expect(page.locator('#service-2 a[href="/local-seo-services#services"]').first()).toBeVisible();
  const types = await page.locator('script[type="application/ld+json"]').evaluateAll(s => s.flatMap(el => JSON.parse(el.textContent!)['@graph'].map((n: { '@type': string }) => n['@type'])));
  expect(types).toEqual(expect.arrayContaining(['Organization', 'WebSite', 'FAQPage']));
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/searchenginexperts\.com\/?$/);
  const question = page.getByRole('button', { name: "What's included in the free audit?" });
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#answer-2')).toBeVisible();
  await expect(page.locator('#answer-0')).toBeHidden();
  // scroll through the page so every lazy image loads, then check none are broken
  await page.evaluate(() => scrollTo(0, 0));
  for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 600) { await page.mouse.wheel(0, 600); await page.waitForTimeout(40); }
  await expect.poll(() => page.locator('img').evaluateAll(imgs => imgs.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'artifacts/desktop.png', fullPage: true });
});

test('hero headline, audit form and proof row fit above the fold', async ({ page }) => {
  for (const [width, height] of [[1366, 768], [1440, 900], [1280, 720], [390, 844], [375, 667]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    for (const sel of ['.h-hero h1', '.h-hero .audit', '.h-proof']) {
      const box = await page.locator(sel).boundingBox();
      expect(box && box.y + box.height, `${sel} at ${width}x${height}`).toBeLessThanOrEqual(height);
    }
  }
});

test('mobile navigation and layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('button', { name: 'Services', exact: true }).click();
  await page.locator('header').getByRole('link', { name: 'Local SEO', exact: true }).click();
  await expect(page).toHaveURL(/\/local-seo-services$/);
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

test('Ask AI answers from the article without any external service', async ({ page }) => {
  await page.goto('/blog/how-much-does-seo-cost-for-an-agency');
  await page.locator('.ask-fab').click();
  await page.getByRole('button', { name: 'What are the red flags in an SEO proposal?' }).click();
  await expect(page.locator('.ask-msg.assistant').last()).toContainText('Guaranteed #1 rankings');
  await page.getByRole('textbox', { name: /Ask a question/ }).fill('is 500 dollars enough');
  await page.keyboard.press('Enter');
  await expect(page.locator('.ask-msg.assistant').last()).toContainText('Is $500 per month enough for SEO?');
  await expect(page.locator('.ask-source').last()).toHaveAttribute('href', '#faq');
  await page.getByRole('textbox', { name: /Ask a question/ }).fill('best pizza in lahore');
  await page.keyboard.press('Enter');
  await expect(page.locator('.ask-msg.assistant').last()).toContainText("couldn't find that");
});

const guideSlugs = ['local-seo', 'ecommerce-seo', 'mobile-seo', 'shopify-seo', 'technical-seo', 'advanced-seo-strategies', 'link-building', 'ai-seo'];
const toolSlugs = ['keyword-research-tool', 'technical-seo-checker', 'on-page-seo-checker', 'seo-audit-tool'];

test('Learn SEO hub and every guide render with schema and menu links', async ({ page }) => {
  await page.goto('/learn-seo');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Free SEO guides');
  await expect(page.locator('.index-grid .index-card')).toHaveCount(guideSlugs.length);
  await page.getByRole('button', { name: 'Learn SEO' }).click();
  await expect(page.locator('#menu-learn-seo a[href="/learn-seo/shopify-seo"]')).toBeVisible();
  await expect(page.locator('#menu-learn-seo a[href="#"]')).toHaveCount(0);
  for (const slug of guideSlugs) {
    await page.goto(`/learn-seo/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://searchenginexperts.com/learn-seo/${slug}`);
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll(s => s.flatMap(el => JSON.parse(el.textContent!)['@graph'].map((n: { '@type': string }) => n['@type'])));
    expect(types).toEqual(expect.arrayContaining(['Article', 'BreadcrumbList', 'FAQPage']));
    // every table-of-contents entry points at a real section
    const missing = await page.locator('.post-side .toc ol a').evaluateAll(links => links.map(a => a.getAttribute('href')!.slice(1)).filter(id => !document.getElementById(id)));
    expect(missing, slug).toEqual([]);
  }
});

test('SEO tool pages render and the page fetcher refuses private addresses', async ({ page, request }) => {
  await page.goto('/seo-tools');
  await expect(page.locator('.tool-card')).toHaveCount(toolSlugs.length);
  for (const slug of toolSlugs) {
    const res = await page.goto(`/seo-tools/${slug}`);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Free');
  }
  for (const url of ['http://127.0.0.1/', 'http://169.254.169.254/latest/meta-data/', 'http://localhost:3100/', 'http://[::1]/', 'ftp://example.com']) {
    const r = await request.get(`/api/fetch-page?url=${encodeURIComponent(url)}`);
    expect(r.status(), url).toBeGreaterThanOrEqual(400);
    expect((await r.json()).error).toBeTruthy();
  }
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Disallow: /api/');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const s of guideSlugs) expect(sitemap).toContain(`/learn-seo/${s}`);
  for (const s of toolSlugs) expect(sitemap).toContain(`/seo-tools/${s}`);
});

test('keyword tool generates ideas and groups them in the browser', async ({ page }) => {
  await page.goto('/seo-tools/keyword-research-tool');
  await page.getByLabel('Seed keyword').fill('roof repair');
  await page.getByRole('button', { name: 'Find ideas' }).click();
  await expect(page.getByRole('rowheader', { name: 'how much does roof repair cost' })).toBeVisible();
  await page.getByRole('button', { name: /^Transactional/ }).click();
  await expect(page.getByRole('rowheader', { name: 'roof repair price' })).toBeVisible();
  await page.getByRole('tab', { name: 'Group keywords' }).click();
  await page.getByLabel(/Keywords/).fill('roof repair cost\nroof repair price\nflat roof repair\nemergency roof repair\n24 hour emergency roof repair\nroof repair near me');
  await page.getByRole('button', { name: 'Group keywords' }).last().click();
  await expect(page.locator('.kw-groups .panel').filter({ hasText: 'roof repair price' }).filter({ hasText: 'roof repair cost' })).toHaveCount(1);
});
