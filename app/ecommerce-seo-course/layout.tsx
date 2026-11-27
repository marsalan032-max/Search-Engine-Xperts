import '../local-seo-course/course.css';
import './ecommerce-course.css';
import { Header } from '../../components/interactive';
import { BrandDefinitions, Footer } from '../../components/site';

// Same frame and course styles as the Local SEO Course, plus the ecommerce hero and syllabus additions.
export default function EcommerceCourseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Header base="/" />
    <main id="main" className="lc">{children}</main>
    <Footer />
  </>;
}
