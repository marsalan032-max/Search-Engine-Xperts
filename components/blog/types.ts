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
  // "Ask AI" panel: suggested questions with pre-written answers (plain text; "- " lines become bullets,
  // **bold** works). `section` is the id of the part of the article the answer comes from.
  askSuggestions?: { question: string; answer: string; section?: string }[];
  Body: ComponentType;
};
