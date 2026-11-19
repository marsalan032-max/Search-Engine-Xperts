import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuide, guides } from '../../../components/learn/guides';
import { ArticlePage, articleMetadata, type ArticleSection } from '../../../components/article/article-page';

type Props = { params: Promise<{ slug: string }> };

const section: ArticleSection = { name: 'Learn SEO', path: '/learn-seo', schemaType: 'Article' };

export const dynamicParams = false; // unknown slugs return 404
export const generateStaticParams = () => guides.map(g => ({ slug: g.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return guide ? articleMetadata(section, guide) : {};
}

export default async function LearnGuide({ params }: Props) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <ArticlePage post={guide} section={section} />;
}
