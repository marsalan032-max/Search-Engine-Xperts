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

The audit form validates a URL and prepares an email request; it does not run an automated audit or send email from a server. Contact details use the supplied email and phone. No email service or credentials are needed. The dashboard date filters show illustrative data, not live analytics. Case-study links request the full case by email. Placeholder video controls have been replaced with a strategy image and text testimonials because no video files were supplied.

Business claims, client names, case-study numbers and reviews come from the supplied HTML; verify them before publishing. Replace them directly in `components/site.tsx`.

Analytics photograph: [Unsplash data analysis collection](https://unsplash.com/s/photos/data-analysis), asset `photo-1599658880436-c61792e70672`, downloaded into `public/images/analytics-workspace.jpg`. Arslan's portrait was extracted from the original embedded image.

## Ask AI on blog posts

Each post can show an "Ask about this article" panel: readers pick a suggested question (`askSuggestions` in the post file) or type their own, and Claude answers using only that article (`app/api/ask/route.ts`, UI in `components/blog/ask-ai.tsx`).

- Turn it on by adding `ANTHROPIC_API_KEY` in Vercel → Project → Settings → Environment Variables, then redeploy. Without the key the panel is hidden.
- Optional: `ANTHROPIC_MODEL` (default `claude-haiku-5-5`).
- Each visitor is limited to 20 questions an hour per server instance; also set a monthly spend limit on the key in the Anthropic Console.

