import './course.css';
import { Header } from '../../components/interactive';
import { BrandDefinitions, Footer } from '../../components/site';

// Same frame as the blog and author pages: the site's header and footer around the page.
export default function CourseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Header base="/" />
    <main id="main" className="lc">{children}</main>
    <Footer />
  </>;
}
