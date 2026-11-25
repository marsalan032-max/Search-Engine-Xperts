import type { Metadata } from 'next';
import { preload } from 'react-dom';
import './fonts.css';
import './globals.css';
import './refinements.css';
import './footer.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://searchenginexperts.com'),
  title: 'Search Engine Xperts | SEO & AI Search Agency',
  description: 'Search Engine Xperts is an SEO and AI search agency helping businesses rank on Google, win the map pack and get cited in AI answers.',
  applicationName: 'Search Engine Xperts',
  openGraph: { siteName: 'Search Engine Xperts', type: 'website', locale: 'en_US' },
  verification: { google: 'Xap__Njk4UScoTNQMRZdxTDiBuar0pmWCkafx6RnAic' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // The two weights used above the fold (body text and headings) start downloading immediately.
  preload('/fonts/poppins-latin-400-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/poppins-latin-600-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return <html lang="en"><body>{children}</body></html>;
}
