import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import ServiceWorker from '@/components/ServiceWorker';
import RateLimitMonitor from '@/components/RateLimitMonitor';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-merriweather',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://science-1b-website.netlify.app'),
  title: 'Science 1B - St. John\'s Grammar SHS, Achimota',
  description: 'Official website for Science 1B class at St. John\'s Grammar Senior High School, Achimota. Explore our achievements, gallery, articles, and more.',
  keywords: 'Science 1B, St. John\'s Grammar, Achimota, Ghana, Education, High School',
  authors: [{ name: 'Science 1B Class' }],
  openGraph: {
    title: 'Science 1B - St. John\'s Grammar SHS, Achimota',
    description: 'Official website for Science 1B class at St. John\'s Grammar Senior High School, Achimota.',
    type: 'website',
    locale: 'en_GH',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${merriweather.variable} font-sans`}>
        <PerformanceMonitor />
        <ServiceWorker />
        <RateLimitMonitor />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
