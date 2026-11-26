# Search Engine Xperts

The supplied HTML converted to a Next.js App Router site with React and TypeScript. All original content sections and Arslan's supplied portrait are retained, with updated responsive styling, an accessible mobile menu, interactive illustrative dashboard, FAQ accordion and a validated audit request flow.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` then `npm start`. Run `npm run typecheck` to check TypeScript.

Browser checks: `npx playwright test` (requires installed Google Chrome and a production build). Screenshots are saved under `artifacts/`.

## Editing

- `components/site.tsx`: page content and static section components.
- `components/interactive.tsx`: navigation, audit form, dashboard and FAQ interactions.
- `components/faq-data.json`: FAQ content.
- `app/globals.css`: original design styles.
- `app/refinements.css`: design improvements and responsive styles.
- `app/layout.tsx`: page title and SEO metadata.
- `public/images`: locally served assets.
- `public/ai-seo-services.html`: the AI SEO Services page, served at `/ai-seo-services` by the rewrite in `next.config.ts`. Its case-study screenshots live in `public/images/case-studies`.
- `app/sitemap.ts` and `app/robots.ts`: sitemap and robots.txt. Add each new page URL to the sitemap.
- `components/blog/posts/*.tsx`: one file per blog post (copy, takeaways, table of contents, FAQs, image). List each post in `components/blog/posts.ts`; it is then published at `/blog/<slug>`, shown on `/blog` and added to the sitemap automatically. The author box and schema read from `author` in the same file.
- `app/blog/`: the blog index, the article template (`[slug]/page.tsx`, including BlogPosting, Breadcrumb and FAQ schema) and `blog.css`. Blog pages reuse the homepage header and footer; `Header base="/"` turns in-page links like `#contact` into `/#contact`.
- `components/services.tsx`: give a service an `href` once it has its own page; the homepage card and Services menu then link to it.
- Service pages: `public/ai-seo-services.html` is the master design. The other five (`local-seo-services`, `gmb-optimization-services`, `ecommerce-seo-services`, `backlinks-digital-pr-services`, `seo-content-writing-services`) are generated from it with `python3 scripts/service_pages/build.py`. Edit their copy in `scripts/service_pages/content.py`, shared section markup in `kit.py`, and re-run the script; don't edit the generated HTML directly. Styling changes made in the AI SEO page's `<style>` (including the above-the-fold hero rules) carry over on the next build. New pages need a slug in `next.config.ts` and `app/sitemap.ts`.

The audit form validates a URL and prepares an email request; it does not run an automated audit or send email from a server. Contact details use the supplied email and phone. No email service or credentials are needed. The dashboard date filters show illustrative data, not live analytics. Case-study links request the full case by email. Placeholder video controls have been replaced with a strategy image and text testimonials because no video files were supplied.

Business claims, client names, case-study numbers and reviews come from the supplied HTML; verify them before publishing. Replace them directly in `components/site.tsx`.

Analytics photograph: [Unsplash data analysis collection](https://unsplash.com/s/photos/data-analysis), asset `photo-1599658880436-c61792e70672`, downloaded into `public/images/analytics-workspace.jpg`. Arslan's portrait was extracted from the original embedded image.

## Learn SEO guides (/learn-seo)

- `components/learn/guides/*.tsx`: one file per guide (copy, takeaways, table of contents, FAQs, Ask AI suggestions, closing call to action and "Keep exploring" cards). Same `Post` shape as blog posts.
- `components/learn/guides.ts`: the list of guides; its order is the order on the hub. Each guide is published at `/learn-seo/<slug>` and added to the sitemap automatically.
- `app/learn-seo/page.tsx`: the hub (CollectionPage + ItemList schema, learning path, tools).
- Blog posts and guides share one article template: `components/article/article-page.tsx` (Article/BlogPosting, Breadcrumb and FAQ schema). A post can override the closing CTA with `cta` and the bottom cards with `next`.
- Guides target informational searches ("what is local SEO"); the service pages target commercial ones ("local SEO services"). Each guide links to its service page so they support rather than compete with each other.
- Cover images: `python3 scripts/covers/build_covers.py` writes the 1600×900 PNGs in `public/images/learn/` (needs Pillow and the Poppins font). Edit titles in the script's `COVERS` list.

## Free SEO tools (/seo-tools)

- Keyword Research, Technical SEO checker, On-Page checker and SEO Audit, each at `/seo-tools/<slug>`. Page copy, FAQs and related links live in `components/tools/tool-list.ts`; the page frame and WebApplication schema in `components/tools/tool-page.tsx`.
- `app/api/fetch-page/route.ts` fetches a page (with its redirect chain, robots.txt and sitemap) on the server, because browsers can't fetch other sites directly. It only allows public http(s) URLs on ports 80/443, re-checks every redirect hop against private and internal addresses, times out after 10 s, caps responses at 2 MB and rate-limits each IP to 20 checks a minute. Nothing is stored. It needs a Node server (`npm start` or a Node host such as Vercel), not a static export.
- `components/tools/analyze.ts` runs all checks in the browser and scores them (weights 1–3). Add or change checks there.
- `components/tools/keyword-tool.tsx` runs entirely in the browser (no API, no search volumes; it links each idea to Google Trends).
- Local testing of the URL tools against `localhost`: start the server with `SEO_TOOLS_ALLOW_PRIVATE=1 npm start`. Never set this in production.
- `/api/` is disallowed in robots.txt.

## Menu

`components/menu.ts`: SEO Tools and Learn SEO now link to their pages (plus an "All…" link to each hub). News and Resources (except Blogs) still use `#` placeholders.

## Ask AI on blog posts

Each post can show an "Ask about this article" panel (`components/blog/ask-ai.tsx`). It runs entirely in the browser, with no AI service, API key or cost:

- Suggested questions show the pre-written answers in the post file (`askSuggestions`: question, answer, and the section it links to).
- Typed questions are matched against the article's passages, takeaways and FAQs (`components/blog/chunks.ts` splits the article; `components/blog/answer.ts` ranks passages, with a synonym list you can extend). The reply links to the matching section. If nothing matches, it suggests the free audit.
- Add `askSuggestions` to a new post to give it the panel.

## SEO Suite (/seo-suite)

A full-screen, dark "SEO platform" page (interface modelled on the MIT-licensed [OpenSEO](https://github.com/every-app/open-seo)): Keyword Research (ideas table, filters, saved keywords, CSV export, 12-month trend, live SERP), Domain Overview, Backlinks, Site Audit and Saved Keywords, followed by explainer copy, FAQs and a CTA. Linked from the SEO Tools menu, the `/seo-tools` hub and the sitemap.

- `app/seo-suite/page.tsx` (page, metadata, schema, landing copy) and `suite.css` (all styles, scoped to `.ss-page`).
- `components/seo-suite/`: `suite-app.tsx` (sidebar shell, `?view=` routing), `keyword-view.tsx`, `other-views.tsx`, `ui.tsx`, `shared.ts` (countries, types, intent rules).
- `app/api/seo-suite/*`: `keywords`, `serp`, `domain`, `backlinks`, `status`. Helpers, caching and limits in `_lib/server.ts`.
- **Without a data key** (default): keyword ideas come from Google Autocomplete (no volumes; intent from the wording, Trends/Google links per idea); Site Audit uses `/api/fetch-page`; Domain Overview and Backlinks show a "needs live data" panel.
- **With live data**: set `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` (DataForSEO API credentials) in Vercel → Settings → Environment Variables, then redeploy. This adds volume, CPC, competition, difficulty, intent, 12-month trend, live top 10, domain overview and backlinks. The Backlinks view needs DataForSEO's Backlinks API subscription.
- Cost guards: results cached 12 h per server instance; each visitor gets `SEO_SUITE_HOURLY_PER_IP` paid lookups per hour (default 15); `SEO_SUITE_DAILY_LIMIT` paid calls per instance per day (default 300). Limits are in memory, so treat them as a brake, not a hard budget; set a spending cap in DataForSEO too.
- Recent searches and saved keywords are kept in the visitor's browser (localStorage) only.
