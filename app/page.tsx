import type { Metadata } from 'next';
import './home.css';
import HomePage from '../components/home/home-page';

const title = 'Search Engine Xperts | SEO & AI Search Agency';
const description = 'SEO and AI search agency helping businesses rank on Google, win the map pack and get cited in AI answers. See client results and get a free SEO audit.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://searchenginexperts.com/' },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website', url: 'https://searchenginexperts.com/', siteName: 'Search Engine Xperts', title, description,
    images: [{ url: 'https://searchenginexperts.com/images/learn/home.png', width: 1600, height: 900, alt: 'Search Engine Xperts — SEO & AI search agency' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['https://searchenginexperts.com/images/learn/home.png'] },
};

export default function Home() { return <HomePage />; }
