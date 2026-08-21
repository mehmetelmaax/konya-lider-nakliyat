import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE } from '@/lib/site-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import FloatingCTAs from '@/components/FloatingCTAs';
import CookieConsent from '@/components/CookieConsent';
import ClientOnly from '@/components/ClientOnly';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-400-normal-latin.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-400-normal-latin-ext.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-500-normal-latin.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-500-normal-latin-ext.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-700-normal-latin.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/inter-700-normal-latin-ext.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = localFont({
  src: [
    {
      path: '../../public/fonts/outfit-400-normal-latin.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/outfit-400-normal-latin-ext.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/outfit-500-normal-latin.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/outfit-500-normal-latin-ext.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/outfit-700-normal-latin.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/outfit-700-normal-latin-ext.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
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
  robots: process.env.VERCEL_ENV !== 'production'
    ? { index: false, follow: false }
    : {
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
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      (() => {
        const org = { ...organizationSchema() } as Record<string, unknown>;
        delete org['@context'];
        return org;
      })(),
      (() => {
        const web = { ...websiteSchema() } as Record<string, unknown>;
        delete web['@context'];
        return web;
      })()
    ]
  };

  return (
    <html
      lang="tr"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              var consentVal = 'denied';
              try {
                if (localStorage.getItem('cookie_consent') === 'granted') {
                  consentVal = 'granted';
                }
              } catch (e) {}

              gtag('consent', 'default', {
                'ad_storage': consentVal,
                'ad_user_data': consentVal,
                'ad_personalization': consentVal,
                'analytics_storage': consentVal,
                'wait_for_update': 550
              });
            `
          }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="alternate" type="text/plain" href="/llms.txt" />
        <JsonLd data={globalSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-off-white text-charcoal">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:text-forest focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:text-sm">Ana içeriğe atla</a>
        <Header />
        {children}
        <Footer />
        <ClientOnly>
          <FloatingCTAs />
          <CookieConsent />
        </ClientOnly>
        <Analytics />
      </body>
    </html>
  );
}
