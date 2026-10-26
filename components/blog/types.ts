import type { ComponentType } from 'react';

export type Post = {
  slug: string;          // URL: /blog/<slug>
  title: string;         // H1
  metaTitle: string;     // <title> (the site name is appended)
  description: string;   // meta description
  dek: string;           // standfirst under the H1
  eyebrow: string;
  category: string;      // breadcrumb label and blog-index tag
  published: string;     // YYYY-MM-DD
  modified: string;      // YYYY-MM-DD — update when the article changes
  readTime: string;
  image: { src: string; alt: string; width: number; height: number; caption?: string };
  takeaways: string[];
  toc: { id: string; label: string }[];
  faqs: { question: string; answer: string }[];
  Body: ComponentType;
};
