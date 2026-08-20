import React from 'react';
import type { Metadata } from 'next';
import { blogDatabase } from '@/lib/blog-data';
import Breadcrumb from '@/components/Breadcrumb';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Lojistik İpuçları ve Blog | Lider Nakliyat',
  description: "Konya'da ev taşırken dikkat edilmesi gerekenler, nakliye fiyatları, paketleme rehberleri ve asansörlü taşıma hakkında lojistik tavsiyeleri.",
  alternates: {
    canonical: '/blog',
  },
};

import type { BlogPostLite } from '@/lib/blog-data';

const posts: BlogPostLite[] = Object.values(blogDatabase).map((post) => {
  const text = post.contentHtml.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return {
    i: post.id,
    t: post.title,
    e: post.excerpt.length > 50 ? post.excerpt.slice(0, 47) + '...' : post.excerpt,
    d: post.date,
    m: post.image,
    c: post.category,
    r: readingTime,
  };
});

export default function BlogPage() {
  return (
    <>
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Blog', url: '/blog' }]} className="pt-4" />
        {/* Intro */}
        <section 
          className="relative py-16 bg-forest text-white text-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-forest/80 z-0" />
          <div className="relative z-10 space-y-4">
            <span className="text-gold font-bold text-xs tracking-widest font-sans">
              FAYDALI BİLGİLER
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
              Lojistik & Nakliye Blogu
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto">
              Taşınma sürecinizi kolaylaştıracak pratik ipuçları ve güncel maliyet incelemeleri.
            </p>
          </div>
        </section>

        {/* Blog Listing with Client Filters & Pagination */}
        <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogClient posts={posts} />
        </section>
      </main>
    </>
  );
}
