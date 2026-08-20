'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Video, Film } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  desc: string;
  alt: string;
  category: 'paketleme' | 'asansor' | 'tasima' | 'ekip';
}

interface GalleryContentProps {
  items: MediaItem[];
}

export default function GalleryContent({ items }: GalleryContentProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'image' | 'video'>('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredItems = items.filter(
    (item) => activeTab === 'all' || item.type === activeTab
  );

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex justify-center items-center gap-3 sm:gap-4 border-b border-gray-light pb-6 flex-wrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 cursor-pointer ${
            activeTab === 'all'
              ? 'bg-forest text-white shadow-md'
              : 'bg-white text-forest border border-gray-light hover:bg-gray-100'
          }`}
        >
          Tümü ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'image'
              ? 'bg-forest text-white shadow-md'
              : 'bg-white text-forest border border-gray-light hover:bg-gray-100'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Fotoğraflar ({items.filter((i) => i.type === 'image').length})</span>
        </button>
        <button
          onClick={() => setActiveTab('video')}
          className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'video'
              ? 'bg-forest text-white shadow-md'
              : 'bg-white text-forest border border-gray-light hover:bg-gray-100'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Videolar ({items.filter((i) => i.type === 'video').length})</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-light overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
          >
            {item.type === 'video' ? (
              <div
                className="relative aspect-video bg-black flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(item.src)}
              >
                {/* Inline HTML5 Video Preview */}
                <video
                  src={item.src}
                  muted
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors z-20">
                  <div className="bg-gold text-white p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                    <Film className="w-6 h-6 text-forest fill-current" />
                  </div>
                  <span className="text-white text-xs font-semibold mt-3 tracking-wide drop-shadow-md">Videoyu İzle</span>
                </div>
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content info */}
            <div className="p-5 border-t border-gray-light flex-1 flex flex-col justify-between space-y-2 bg-white">
              <div>
                <span className="text-[10px] font-bold text-gold-text tracking-widest uppercase block mb-1">
                  {item.category === 'paketleme'
                    ? 'Paketleme'
                    : item.category === 'asansor'
                    ? 'Asansör'
                    : item.category === 'tasima'
                    ? 'Taşıma'
                    : 'Ekip Çalışması'}
                </span>
                <h3 className="font-display font-bold text-forest text-base group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-charcoal/80 text-xs leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Popup */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-all text-xs font-black z-10 cursor-pointer"
            >
              ✕ Kapat
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  );
}
