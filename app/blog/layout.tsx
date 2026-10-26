import './blog.css';
import { Header } from '../../components/interactive';
import { BrandDefinitions, Footer } from '../../components/site';

// Shared frame for /blog and every /blog/<slug> page: the site's own header and footer.
export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Header base="/" />
    <main id="main" className="blog">{children}</main>
    <Footer home="/" />
  </>;
}
