import '../blog/blog.css';
import '../hub.css';
import '../blog/blog-index.css';
import './news.css';
import { Header } from '../../components/interactive';
import { BrandDefinitions, Footer } from '../../components/site';

// Same frame as the blog: the site's header and footer around /seo-news and every /seo-news/<slug> story.
export default function NewsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Header base="/" />
    <main id="main" className="blog">{children}</main>
    <Footer />
  </>;
}
