import { AuthorPage, authorMetadata } from '../../components/author/author-page';

export const metadata = authorMetadata('arslan');

export default function Page() {
  return <AuthorPage authorKey="arslan" />;
}
