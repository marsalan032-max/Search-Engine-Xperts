import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage, articleMetadata, type ArticleSection } from '../../../components/article/article-page';
import { getUpdate, updates } from '../../../components/algo/updates';
import { updatePost } from '../../../components/algo/update-post';

// /google-algorithm-updates/<id>: each update in components/algo/updates.ts as a blog-style article,
// using the same template as /blog/<slug> (components/algo/update-post.tsx builds the article).

type Props = { params: Promise<{ id: string }> };

const section: ArticleSection = { name: 'Google Algorithm Update', path: '/google-algorithm-updates', schemaType: 'BlogPosting' };

export const dynamicParams = false; // unknown ids return 404
export const generateStaticParams = () => updates.map(u => ({ id: u.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const u = getUpdate((await params).id);
  return u ? articleMetadata(section, updatePost(u)) : {};
}

export default async function UpdateArticle({ params }: Props) {
  const u = getUpdate((await params).id);
  if (!u) notFound();
  return <ArticlePage post={updatePost(u)} section={section} />;
}
