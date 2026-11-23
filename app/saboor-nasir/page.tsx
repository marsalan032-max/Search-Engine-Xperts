import { AuthorPage, authorMetadata } from '../../components/author/author-page';

export const metadata = authorMetadata('saboor');

export default function Page() {
  return <AuthorPage authorKey="saboor" />;
}
