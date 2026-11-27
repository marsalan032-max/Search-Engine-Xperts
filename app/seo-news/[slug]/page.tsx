import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage, articleMetadata, type ArticleSection } from '../../../components/article/article-page';
import { getNews, newsPost } from '../../../components/news/articles';
import { newsMeta } from '../../../components/news/news-meta';

// /seo-news/<slug>: one SEO news story, in the same article template as the blog (NewsArticle schema).

type Props = { params: Promise<{ slug: string }> };

const section: ArticleSection = { name: 'SEO News', path: '/seo-news', schemaType: 'NewsArticle' };

export const dynamicParams = false; // unknown slugs return 404
export const generateStaticParams = () => newsMeta.map(m => ({ slug: m.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getNews((await params).slug);
  return m ? articleMetadata(section, newsPost(m)) : {};
}

export default async function NewsStory({ params }: Props) {
  const m = getNews((await params).slug);
  if (!m) notFound();
  return <ArticlePage post={newsPost(m)} section={section} />;
}
