import React from 'react';
import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { Camera } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hizmet Faaliyet Galerimiz | Lider Nakliyat',
  description: "Konya Lider Nakliyat asansörlü taşıma araçları, paketleme işlemleri ve ekip çalışmalarına ait gerçek operasyon fotoğrafları galerisi.",
  alternates: {
    canonical: '/galeri',
  },
};

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: '/img/slayt-1.jpg',
    title: 'Şehirlerarası Nakliyat Tırımız',
    desc: 'Büyük boy çelik kasa ev eşyası taşıma kamyonumuz yükleme esnasında.',
    alt: "Konya'dan Türkiye geneline K3 belgeli araçlarla şehirlerarası evden eve nakliyat taşıması yapan büyük nakliye tırı",
  },
  {
    src: '/img/slayt-2.jpg',
    title: 'Dış Cephe Asansör Kurulumu',
    desc: 'Rezidans tipi binalarda balkondan eşya transferi yapan teleskopik asansörümüz.',
    alt: "Konya Selçuklu'da yüksek katlı bir rezidansın dış cephesine kurulmuş teleskopik yük ve eşya taşıma asansörü",
  },
  {
    src: '/img/slayt-3.jpg',
    title: 'Asansörlü Nakliye Aracımız',
    desc: 'Mobil asansör kasalı taşıma kamyonetimiz dar sokakta operasyonda.',
    alt: "Konya Meram'da dar sokaklarda pratik ve hızlı asansörlü nakliyat hizmeti veren mobil asansörlü nakliye aracı",
  },
  {
    src: '/img/paketleme-detay.jpg',
    title: 'Özenli Eşya Ambalajlama',
    desc: 'Kraft kağıt ve patpat naylonlarla korumaya alınmış mobilyalar.',
    alt: "Lider Nakliyat marangozlarınca balonlu patpat ambalaj malzemeleri ile paketlenerek korumaya alınmış gardırop ve mobilyalar",
  },
  {
    src: '/img/ekip.jpg',
    title: 'Profesyonel Nakliye Ekibimiz',
    desc: 'Lider logolu kurumsal kıyafetli kadrolu taşıma personellerimiz.',
    alt: "Konya Lider Evden Eve Nakliyat kurumsal logolu iş elbiseleriyle uzman ve sigortalı profesyonel taşıma ekibimiz",
  },
];

export default function GalleryPage() {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Galeri', url: '/galeri' }
  ]);

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        {/* Intro */}
        <section className="py-16 bg-forest text-white text-center space-y-4">
          <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1">
            <Camera className="w-4 h-4 text-gold" />
            <span>Faaliyetlerimiz</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Hizmet Galerisi
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Eşya paketleme, asansör kurulumu ve taşıma anlarına ait gerçek operasyon fotoğraflarımız.
          </p>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid items={galleryItems} />
        </section>
      </main>
    </>
  );
}
