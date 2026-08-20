import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTAs from '@/components/FloatingCTAs';
import Analytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({
  subsets: ['latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Konya Evden Eve Nakliyat | Sabit Fiyatlı Asansörlü Taşımacılık',
    template: '%s',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: 'Nakliyat ve Lojistik',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Konya Evden Eve Nakliyat | Sabit Fiyatlı Asansörlü Taşımacılık',
    description: SITE.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Konya Lider Nakliyat' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konya Evden Eve Nakliyat | Sabit Fiyatlı Asansörlü Taşımacılık',
    description: SITE.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  ...((process.env.NEXT_PUBLIC_GSC_VERIFICATION || process.env.NEXT_PUBLIC_YANDEX_VERIFICATION) ? {
    verification: {
      ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : {}),
      ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ? { other: { 'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION } } : {}),
    }
  } : {}),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#123F42',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-full flex flex-col bg-off-white text-charcoal">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:text-forest focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:text-sm">Ana içeriğe atla</a>
        <Header />
        {children}
        <Footer />
        <FloatingCTAs />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
