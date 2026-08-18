'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Grid, Filter } from 'lucide-react';
import type { BlogPostData } from '@/lib/blog-data';

interface BlogClientProps {
  posts: BlogPostData[];
}

function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ''); // strip HTML tags
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // average reading speed
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

const CATEGORIES = ['Tümü', 'Fiyat', 'Rehber', 'Yasal', 'Teknik', 'Bölge'] as const;

type CategoryType = typeof CATEGORIES[number];

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Tümü');
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Filter posts based on selected category
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'Tümü') return true;
    return post.category === selectedCategory;
  });

  // Sort posts by date descending
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Paginated posts
  const paginatedPosts = sortedPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
    setVisibleCount(9); // Reset pagination on filter change
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Fiyat':
        return 'bg-red-50 text-red-700 border-red-200/50';
      case 'Rehber':
        return 'bg-green-50 text-green-700 border-green-200/50';
      case 'Yasal':
        return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'Teknik':
        return 'bg-orange-50 text-orange-text border-orange-200/50';
      case 'Bölge':
        return 'bg-purple-50 text-purple-700 border-purple-200/50';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200/50';
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-gray-light shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-navy font-bold text-sm">
          <Filter className="w-4 h-4 text-orange" />
          <span>Kategori Seçin:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                selectedCategory === category
                  ? 'bg-navy border-navy text-white shadow-md'
                  : 'bg-off-white hover:bg-white border-gray-light text-charcoal hover:text-navy'
              }`}
            >
              {category} {category === 'Tümü' ? `(${posts.length})` : `(${posts.filter(p => p.category === category).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {paginatedPosts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-light p-12 text-center space-y-4">
          <Grid className="w-12 h-12 text-gray-300 mx-auto" />
          <p className="text-gray-500 font-medium">Bu kategoride henüz yazı bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => {
            const readingTime = calculateReadingTime(post.contentHtml);
            const badgeColor = getCategoryColor(post.category);

            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-light hover:border-orange/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Header Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 border-b border-gray-light">
                  <Image
                    src={post.image || '/img/slayt-1.jpg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${badgeColor}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-bold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-orange" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-orange" />
                        {post.author}
                      </span>
                      <span>• {readingTime} dk okuma</span>
                    </div>

                    <h2 className="font-display font-black text-navy text-lg group-hover:text-orange-text transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-charcoal text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-light/60 mt-4">
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-orange-text hover:text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Yazıyı Görüntüle</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {filteredPosts.length > visibleCount && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            className="bg-navy hover:bg-orange text-white hover:text-navy font-bold px-8 py-3.5 rounded-xl border border-navy hover:border-orange transition-all duration-200 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-orange active:scale-95 cursor-pointer text-sm"
          >
            Daha Fazla Yükle
          </button>
        </div>
      )}
    </div>
  );
}
