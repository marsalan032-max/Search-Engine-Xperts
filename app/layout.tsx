import type { Metadata } from 'next';
import './globals.css';
import './refinements.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://searchenginexperts.com'),
  title: 'Arslan Tariq | SEO & Digital Growth Specialist',
  description: 'Grow your business with Arslan Tariq. Technical SEO, local SEO, ecommerce, content and digital PR backed by 7+ years of hands-on experience.',
  openGraph: { title: 'Search Engine Xperts — Turn searches into growth', description: 'SEO strategies built around your business. Book a free website audit.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
