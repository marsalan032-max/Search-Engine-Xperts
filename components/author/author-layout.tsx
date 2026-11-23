import './author.css';
import { Header } from '../interactive';
import { BrandDefinitions, Footer } from '../site';

// Frame for every author page: the site's header and footer around the page.
export function AuthorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <BrandDefinitions />
    <Header base="/" />
    <main id="main" className="pf">{children}</main>
    <Footer />
  </>;
}
