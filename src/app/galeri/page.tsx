import React from 'react';
import type { Metadata } from 'next';
import GalleryContent from '@/components/GalleryContent';
import { Camera } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hizmet Faaliyet Galerimiz | Lider Nakliyat',
  description: "Konya Lider Nakliyat asansörlü taşıma araçları, paketleme işlemleri ve ekip çalışmalarına ait gerçek operasyon fotoğrafları ve videoları galerisi.",
  alternates: {
    canonical: '/galeri',
  },
};

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  desc: string;
  alt: string;
  category: 'paketleme' | 'asansor' | 'tasima' | 'ekip';
}

const mediaItems: MediaItem[] = [
  // Videos
  {
    type: 'video',
    src: '/img/galeri/WhatsApp Video 2026-08-19 at 14.54.31.mp4',
    title: 'Şehirlerarası Nakliyat Yükleme Süreci',
    desc: 'Büyük taşıma tırımıza eşyaların profesyonelce istiflenmesi.',
    alt: 'Konya Lider Nakliyat şehirlerarası evden eve nakliyat tırı yükleme videosu',
    category: 'tasima'
  },
  {
    type: 'video',
    src: '/img/galeri/WhatsApp Video 2026-08-19 at 14.54.39.mp4',
    title: 'Asansörlü Eşya İndirme Operasyonu',
    desc: 'Mobil dış cephe asansörümüz ile eşyaların balkondan güvenle indirilmesi.',
    alt: 'Dış cephe asansörüyle mobilya ve beyaz eşyaların indirilme anı videosu',
    category: 'asansor'
  },
  {
    type: 'video',
    src: '/img/galeri/WhatsApp Video 2026-08-19 at 14.55.04.mp4',
    title: 'Mobilya Paketleme ve Koruma',
    desc: 'Eşyaların zarar görmemesi için çift kat balonlu naylonla sarılması.',
    alt: 'Lider nakliyat personelinin koltuk ve mobilyaları paketleme videosu',
    category: 'paketleme'
  },
  {
    type: 'video',
    src: '/img/galeri/WhatsApp Video 2026-08-19 at 14.55.28.mp4',
    title: 'Taşıma Öncesi Hazırlık ve Paketleme',
    desc: 'Eşyaların nakliye aracına taşınmadan önce ambalajlanması.',
    alt: 'Ev eşyası paketleme ve taşıma hazırlık aşaması operasyon videosu',
    category: 'paketleme'
  },
  // Images
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.54.32.jpeg',
    title: 'Eşya Paketleme Hazırlığı',
    desc: 'Tüm mobilyalar taşınmadan önce çift katlı ambalaj malzemeleriyle kaplanır.',
    alt: 'Ambalajlanmış mobilyalar ve ev eşyası paketleme detayı',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.54.32 (1).jpeg',
    title: 'Asansörlü Yükleme Hazırlığı',
    desc: 'Dış cephe asansör sepetine eşyaların güvenli biçimde yerleştirilmesi.',
    alt: 'Mobil asansör sepetinde taşınan ev eşyaları',
    category: 'asansor'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.54.32 (2).jpeg',
    title: 'Profesyonel Ambalajlama',
    desc: 'Kırılma ve çizilme riski yüksek hassas mobilya paketleme işlemi.',
    alt: 'Balonlu naylonla sıkıca sarılmış gardırop kapakları ve çekmeceler',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.55.17.jpeg',
    title: 'Modern Dış Cephe Asansör Kurulumu',
    desc: 'Yüksek katlı binalar için kurulan teleskopik eşya taşıma asansörümüz.',
    alt: 'Bina dış cephesine dayanmış nakliyat asansörü rayları',
    category: 'asansor'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.54.33.jpeg',
    title: 'Araç İçi Eşya İstifleme',
    desc: 'Eşyaların yolculuk esnasında sarsılmaması için kasaya sabitleme işlemi.',
    alt: 'Kapalı kasa nakliyat kamyonu içerisinde düzenle istiflenmiş eşyalar',
    category: 'tasima'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.54.33 (1).jpeg',
    title: 'Korumalı Taşıma Hazırlığı',
    desc: 'Özel kılıflarla sarılmış beyaz eşyalar ve mobilya parçaları.',
    alt: 'Kurumsal nakliyat paketleme ve koruma aşamaları',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.54.32 (3).jpeg',
    title: 'Uzman Kadrolu Taşıma Ekiplerimiz',
    desc: 'Lider Nakliyat üniformalı kadrolu profesyonel taşıma elemanlarımız.',
    alt: 'Lider nakliyat güler yüzlü ve kurumsal üniformalı elemanları',
    category: 'ekip'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.55.17 (1).jpeg',
    title: 'Güvenli Nakliyat Kamyonlarımız',
    desc: 'Konya içi ve şehirlerarası taşımalara uygun geniş hacimli çelik kasa kamyonlar.',
    alt: 'Lider evden eve nakliyat kapalı kasa modern taşıma araçları',
    category: 'tasima'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 14.55.21.jpeg',
    title: 'Hassas Eşya Paketleme Detayı',
    desc: 'Cam, porselen ve elektronik eşyalar kalın patpat naylonlarla sarılır.',
    alt: 'Özenle sarılmış kırılacak mutfak ve elektronik ev eşyaları',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.48.22.jpeg',
    title: 'Asansör Sepetinde Eşya Taşınması',
    desc: 'Eşyalar merdivenlerden taşınmadan doğrudan balkona ulaştırılır.',
    alt: 'Dış cephe asansörü ile balkona çıkarılan eşya ve koliler',
    category: 'asansor'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.48.22 (1).jpeg',
    title: 'Marangozlu De-montaj Süreci',
    desc: 'Yatak odası gardıroplarının uzman marangozumuz tarafından sökülmesi.',
    alt: 'Uzman mobilya ustası gardırop parçalarını sökerken',
    category: 'ekip'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.48.22 (2).jpeg',
    title: 'Sözleşmeli Eşya Teslimatı',
    desc: 'Yeni adrese ulaştırılan eşyaların hasarsızlık kontrolü ve teslimi.',
    alt: 'Eve taşınan koliler ve ambalajlı büyük mobilyalar',
    category: 'tasima'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.48.46.jpeg',
    title: 'Karton Koli Hazırlıkları',
    desc: 'Kıyafet, kitap ve ufak eşyalar için kalın mukavva nakliyat kolileri.',
    alt: 'Lider nakliyat amblemli kalın mukavva taşıma kolileri',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.48.46 (1).jpeg',
    title: 'Elbise Askılı Taşıma Dolapları',
    desc: 'Takım elbise ve hassas kıyafetlerin kırışmadan taşınması için askılı dolaplar.',
    alt: 'Askılı kıyafet nakliye dolabı ile ütülü elbise taşıma',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.50.21.jpeg',
    title: 'Ofis ve İşyeri Taşımacılığı',
    desc: 'Şirket evrakları, bilgisayarlar ve ofis mobilyalarının etiketlenerek taşınması.',
    alt: 'Ofis mobilyaları ve dosyalarının kolilenmiş taşıma görüntüsü',
    category: 'tasima'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 16.50.22.jpeg',
    title: 'Asansörlü Yük İndirme Güvenliği',
    desc: 'Taşıma asansörümüzün ayak sabitleyicileri ile sarsıntısız eşya transferi.',
    alt: 'Asansörlü nakliye kamyonetinin yere sabitlenmiş destek ayakları',
    category: 'asansor'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 18.51.27.jpeg',
    title: 'Çelik Kasa Şehirlerarası Kamyon',
    desc: 'Uzun yol şartlarına uygun, içi mobilya kaplı şehirlerarası taşıma kasası.',
    alt: 'Şehirlerarası nakliye tırının çelik kapalı kasası',
    category: 'tasima'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 18.51.27 (1).jpeg',
    title: 'Koltuk Takımı Paketleme Güvencesi',
    desc: 'Deri ve kumaş koltukların lekelenmemesi ve yırtılmaması için kalın sarım.',
    alt: 'Koltuk takımlarının kalın patpat poşetlerle paketlenmiş hali',
    category: 'paketleme'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 18.51.27 (2).jpeg',
    title: 'Eşya Depolama Hizmeti',
    desc: 'Rutubetsiz, 7/24 güvenlikli depolarımızda eşyaların muhafazası.',
    alt: 'Güvenli nakliyat depolama alanı ve ambalajlı eşya istifi',
    category: 'tasima'
  },
  {
    type: 'image',
    src: '/img/galeri/WhatsApp Image 2026-08-19 at 18.51.27 (3).jpeg',
    title: 'Beyaz Eşya Tesisat Bağlantısı',
    desc: 'Çamaşır ve bulaşık makinesinin tesisat söküm ve yeni adreste montajı.',
    alt: 'Nakliye ustası çamaşır makinesi hortum bağlantılarını yaparken',
    category: 'ekip'
  }
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
        <section 
          className="relative py-16 bg-forest text-white text-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-forest/80 z-0" />
          <div className="relative z-10 space-y-4">
            <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1">
              <Camera className="w-4 h-4 text-gold" />
              <span>Faaliyetlerimiz</span>
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
              Hizmet Galerisi
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Eşya paketleme, asansör kurulumu ve taşıma anlarına ait gerçek operasyon fotoğraflarımız ve videolarımız.
            </p>
          </div>
        </section>

        {/* Gallery Content with Tabs & Video Lightbox */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryContent items={mediaItems} />
        </section>
      </main>
    </>
  );
}
