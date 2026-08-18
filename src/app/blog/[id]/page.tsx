import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, ShieldCheck } from 'lucide-react';
import { blogDatabase } from '@/lib/blog-data';
import { SITE } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { IMAGE_BLURS } from '@/lib/image-blur';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import ScrollDepth from '@/components/ScrollDepth';

export function generateStaticParams() {
  return Object.keys(blogDatabase).map((id) => ({ id }));
}

type Props = {
  params: Promise<{ id: string }> | { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogDatabase[resolvedParams.id];
  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
      robots: { index: false, follow: false }
    };
  }

  // Ensure description is <= 155 chars
  let description = post.desc;
  if (description.length > 155) {
    description = description.slice(0, 152) + '...';
  }

  const postUrl = `${SITE.url}/blog/${post.id}`;

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: `/blog/${post.id}`,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: description,
      images: [{ url: `${SITE.url}${post.image}` }],
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [SITE.name],
      section: 'Nakliyat ve Lojistik',
      tags: ['Konya Evden Eve Nakliyat', 'Asansörlü Taşımacılık', 'Ev Taşıma Fiyatları']
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [`${SITE.url}${post.image}`]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogDatabase[resolvedParams.id];

  if (!post) {
    notFound();
  }

  const blogPostUrl = `${SITE.url}/blog/${post.id}`;
  const fileKey = post.image.split('/').pop()?.replace('.jpg', '') || '';
  const blurDataURL = IMAGE_BLURS[fileKey];

  const relatedLinks: Record<string, {
    blogs: { title: string; href: string }[];
    services: { title: string; href: string }[];
    districts: { title: string; href: string }[];
  }> = {
    'konya-nakliyat-fiyatlari': {
      blogs: [
        { title: 'Pratik Eşya Paketleme Yöntemleri Rehberi', href: '/blog/esya-paketleme-rehberi' },
        { title: 'Mobil Asansörlü Taşımacılık Avantajları', href: '/blog/asansorlu-tasima-avantajlari' }
      ],
      services: [
        { title: 'Konya Ücretsiz Ekspertiz Hizmeti', href: '/hizmetler/ucretsiz-ekspertiz' },
        { title: 'Ev Taşıma Fiyatı Hesaplama Formu', href: '/teklif-al' }
      ],
      districts: [
        { title: 'Selçuklu Evden Eve Nakliyat Hizmetleri', href: '/bolgeler/selcuklu-evden-eve-nakliyat' },
        { title: 'Meram Evden Eve Nakliyat Hizmetleri', href: '/bolgeler/meram-evden-eve-nakliyat' }
      ]
    },
    'esya-paketleme-rehberi': {
      blogs: [
        { title: 'Konya Evden Eve Nakliyat Fiyatları Nasıl Belirlenir?', href: '/blog/konya-nakliyat-fiyatlari' },
        { title: 'Mobil Asansörlü Taşımacılık Avantajları', href: '/blog/asansorlu-tasima-avantajlari' }
      ],
      services: [
        { title: 'Profesyonel Eşya Paketleme Hizmeti', href: '/hizmetler/profesyonel-esya-paketleme' },
        { title: 'Konya Şehir İçi Ev Taşıma Çözümleri', href: '/hizmetler/sehirici-evden-eve-nakliyat' }
      ],
      districts: [
        { title: 'Ereğli Evden Eve Nakliyat Hizmetleri', href: '/bolgeler/eregli-evden-eve-nakliyat' },
        { title: 'Karatay Evden Eve Nakliyat Hizmetleri', href: '/bolgeler/karatay-evden-eve-nakliyat' }
      ]
    },
    'asansorlu-tasima-avantajlari': {
      blogs: [
        { title: 'Konya Evden Eve Nakliyat Fiyatları Nasıl Belirlenir?', href: '/blog/konya-nakliyat-fiyatlari' },
        { title: 'Pratik Eşya Paketleme Yöntemleri Rehberi', href: '/blog/esya-paketleme-rehberi' }
      ],
      services: [
        { title: 'Asansörlü Evden Eve Nakliyat Hizmeti', href: '/hizmetler/asansorlu-evden-eve-nakliyat' },
        { title: 'Şehirlerarası Evden Eve Taşımacılık', href: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' }
      ],
      districts: [
        { title: 'Meram Evden Eve Nakliyat Hizmetleri', href: '/bolgeler/meram-evden-eve-nakliyat' },
        { title: 'Selçuklu Evden Eve Nakliyat Hizmetleri', href: '/bolgeler/selcuklu-evden-eve-nakliyat' }
      ]
    }
  };

  const related = relatedLinks[post.id] || { blogs: [], services: [], districts: [] };

  const wordCount = post.contentHtml.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const dateModified = post.updatedAt || post.date;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.desc,
    'image': `${SITE.url}${post.image}`,
    'datePublished': post.date,
    'dateModified': dateModified,
    'wordCount': wordCount,
    'articleSection': 'Evden Eve Nakliyat',
    'inLanguage': 'tr-TR',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': blogPostUrl
    },
    'author': {
      '@type': 'Organization',
      'name': SITE.name,
      'url': SITE.url,
      '@id': `${SITE.url}/#organization`
    },
    'publisher': {
      '@id': `${SITE.url}/#organization`
    }
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      articleSchema,
      faqSchema(post.faqs),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.id}` }
      ])
    ]
  };

  return (
    <>
      <JsonLd data={graphSchema} />
      <ScrollDepth />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Blog', url: '/blog' }, { name: post.title, url: `/blog/${post.id}` }]} className="pt-4" />
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Back to Blog index link */}
          <Link
            href="/blog"
            className="text-navy hover:text-orange font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mb-8 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tüm Yazılar</span>
          </Link>

          <div className="bg-white rounded-2xl border border-gray-light overflow-hidden shadow-sm p-6 md:p-10 space-y-8">
            {/* Meta Tags */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-orange" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-orange" />
                  {post.author}
                </span>
              </div>
              <h1 className="font-display font-black text-navy text-2xl md:text-4xl tracking-tight leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video w-full rounded-xl bg-navy/5 overflow-hidden border border-gray-light flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-navy/20">
                <ImageIcon className="w-16 h-16" />
                <span className="text-xs font-semibold mt-2">[Blog Görseli: {post.image.split('/').pop()}]</span>
              </div>
              <Image
                src={post.image}
                alt={`Konya Lider Evden Eve Nakliyat blog makalesi kapak resmi: ${post.title}`}
                width={1200}
                height={630}
                priority
                placeholder={blurDataURL ? "blur" : undefined}
                blurDataURL={blurDataURL}
                className="absolute inset-0 w-full h-full object-cover z-10"
              />
            </div>

            {/* Post Content */}
            <div 
              className="text-charcoal text-sm md:text-base leading-relaxed space-y-6 prose prose-navy"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Customized Blog FAQ */}
            <div className="border-t border-gray-light pt-8 space-y-6">
              <h2 className="font-display font-bold text-navy text-lg md:text-xl flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange" />
                <span>Bu Konuda Sıkça Sorulanlar (SSS)</span>
              </h2>
              <div className="space-y-4 text-sm text-charcoal">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-off-white p-5 rounded-lg border border-gray-light/60">
                    <span className="font-bold text-navy block mb-1">{faq.question}</span>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Content (İlgili İçerikler) */}
            <div className="border-t border-gray-light pt-8">
              <RelatedLinks currentSlug={post.id} type="blog" title="İlgili İçerikler ve Faydalı Bağlantılar" />
            </div>

          </div>
        </article>
      </main>
    </>
  );
}

// Graceful element placeholder helper
function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.8 2.828 0L6 21" />
    </svg>
  );
}
