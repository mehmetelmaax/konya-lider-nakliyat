'use client';

import React from 'react';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
import { IMAGE_BLURS } from '@/lib/image-blur';

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
  alt: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, idx) => {
        // Extract key for blur placeholder (e.g. '/img/slayt-1.jpg' -> 'slayt-1')
        const fileKey = item.src.split('/').pop()?.replace('.jpg', '') || '';
        const blurDataURL = IMAGE_BLURS[fileKey];

        return (
          <div 
            key={idx}
            className="bg-white rounded-xl border border-gray-light overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* Image / Placeholder wrapper */}
            <div className="relative aspect-video bg-navy/5 flex items-center justify-center overflow-hidden">
              {/* Graceful CSS Placeholder if image is loading */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-navy/20">
                <ImageIcon className="w-12 h-12" />
                <span className="text-xs font-semibold mt-2">[Görsel: {item.src.split('/').pop()}]</span>
              </div>
              {/* Real Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                placeholder={blurDataURL ? "blur" : undefined}
                blurDataURL={blurDataURL}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
              />
            </div>

            {/* Title & Desc */}
            <div className="p-5 border-t border-gray-light/60 space-y-1 bg-white">
              <h3 className="font-display font-bold text-navy text-sm">
                {item.title}
              </h3>
              <p className="text-charcoal/80 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
