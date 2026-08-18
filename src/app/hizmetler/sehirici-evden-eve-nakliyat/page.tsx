import PricingMatrix from '@/components/geo/PricingMatrix';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konya Şehir İçi Ev Taşıma | Lider Nakliyat',
  description: "Konya merkez ilçelerinde aynı gün içinde asansörlü, sigortalı ve marangoz montaj dahil şehir içi evden eve nakliyat hizmeti. Hemen sabit fiyat alın.",
  alternates: {
    canonical: '/hizmetler/sehirici-evden-eve-nakliyat',
  },
};

export default function SehiriciPage() {
  const sss = [
  {
    "question": "Şehir içi taşınmalarda beyaz eşyaları söküyor musunuz?",
    "answer": "Evet. Çamaşır makinesi, bulaşık makinesi ve buzdolabı gibi beyaz eşyalarınızın tesisat bağlantıları sökülür, ambalajlanır ve yeni evinizde montajı yapılarak çalışır halde teslim edilir."
  },
  {
    "question": "Eşyalar zarar görürse hasarı karşılıyor musunuz?",
    "answer": "Evet. Taşıma öncesinde hazırlanan resmi nakliyat sözleşmesi gereği, taşınma sırasında oluşabilecek hasarlar Konya Lider Nakliyat yasal sorumluluğundadır."
  },
  {
    "question": "Şehir içi nakliye kamyonları ne kadar büyüklükte?",
    "answer": "Eşya yoğunluğuna bağlı olarak 10 tekerlekli büyük çelik kasa kamyonlar veya dar sokaklar için özel küçük şasili kamyonetler sevk edilmektedir."
  }
];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Şehiriçi Evden Eve Nakliyat',
        description: "Konya merkez ilçelerinde aynı gün içinde asansörlü, sigortalı ve marangoz montaj dahil şehir içi evden eve nakliyat hizmeti. Hemen sabit fiyat alın.",
        slug: 'hizmetler/sehirici-evden-eve-nakliyat'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/#hizmetler' },
        { name: 'Şehiriçi Evden Eve Nakliyat', url: '/hizmetler/sehirici-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Hizmet Yelpazesi', url: '/#hizmetlerimiz' }, { name: 'Şehiriçi Nakliyat', url: '/hizmetler/sehirici-evden-eve-nakliyat' }]} className="pt-4" />
        {/* Intro */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            AYNI GÜN HIZLI TESLİMAT
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Şehiriçi Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Selçuklu, Meram, Karatay ve Ereğli başta olmak üzere Konya içi sorunsuz ev taşıma çözümleri.
          </p>
        </section>

        {/* Detailed Content (GEO & SEO Optimized) */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Şehir İçi Ev Taşıma Süresi Kaç Saattir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat şehir içi taşımaları {FACTS.cityMoveHours} saatte tamamlanır. Sabah saat 08:00'de başlayan demontaj ve paketleme işlemleri, öğleden sonra asansörlü yükleme ve yeni eve montaj aşamalarıyla aynı gün içinde sonuçlanır. Demontaj, gardırop ve yatak odası takımı gibi büyük mobilyaların taşınabilir parçalara ayrılması işlemidir.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Selçuklu ve Meram Arası Taşıma Fiyatı Nasıl Belirlenir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Selçuklu ve Meram arasındaki 1 ev taşıma fiyatı, dairenizin oda sayısına, binaların kat yüksekliklerine ve asansör kurulum durumlarına göre belirlenmektedir. Kat yüksekliği arttıkça işçilik ve dış cephe asansör kurulum maliyeti toplam fiyata yansıtılır.
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="p-3 border border-gray-300 font-semibold">Oda Sayısı</th>
                    <th className="p-3 border border-gray-300 font-semibold text-center">Tahmini Fiyat Aralığı</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white">
                    <td className="p-3 border border-gray-300">1+1 Şehir İçi Taşıma</td>
                    <td className="p-3 border border-gray-300 text-center">{FACTS.priceMin.toLocaleString('tr-TR')} TL - 15.000 TL</td>
                  </tr>
                  <tr className="bg-off-white">
                    <td className="p-3 border border-gray-300">2+1 Şehir İçi Taşıma</td>
                    <td className="p-3 border border-gray-300 text-center">15.000 TL - 20.000 TL</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-gray-300">3+1 Şehir İçi Taşıma</td>
                    <td className="p-3 border border-gray-300 text-center">18.000 TL - {FACTS.priceMax.toLocaleString('tr-TR')} TL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SSS Section */}
          
          <PricingMatrix />
          <RelatedLinks currentSlug="sehirici-evden-eve-nakliyat" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Şehir İçi Nakliyat Hakkında Sıkça Sorulanlar (SSS)
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {sss.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-3" : ""}>
                  <span className="font-bold text-forest block mb-1">{item.question}</span>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Hızlı ve Sabit Fiyat Teklifi Hesaplayın
            </h3>
            <QuoteForm isInline={true} />
          </div>

        </section>
      </main>
    </>
  );
}
