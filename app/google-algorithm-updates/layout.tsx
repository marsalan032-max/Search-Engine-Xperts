import '../blog/blog.css';
import '../hub.css';
import './updates.css';
import { Header } from '../../components/interactive';
import { BrandDefinitions, Footer } from '../../components/site';

// Same frame as the blog and Learn SEO pages: the site's header and footer around the page.
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Header base="/" />
    <main id="main" className="blog">{children}</main>
    <Footer />
  </>;
}
