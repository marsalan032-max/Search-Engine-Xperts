import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, posts } from '../../../components/blog/posts';
import { ArticlePage, articleMetadata, type ArticleSection } from '../../../components/article/article-page';

type Props = { params: Promise<{ slug: string }> };

const section: ArticleSection = { name: 'SEO Blog', path: '/blog', schemaType: 'BlogPosting' };

export const dynamicParams = false; // unknown slugs return 404
export const generateStaticParams = () => posts.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? articleMetadata(section, post) : {};
}

export default async function BlogPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return <ArticlePage post={post} section={section} />;
}
