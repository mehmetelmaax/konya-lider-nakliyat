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

export const metadata: Metadata = {
  title: 'Konya Asansörlü Ev Taşıma | Lider Nakliyat',
  description: `Konya'da yüksek katlı daireler için ${FACTS.maxFloor}. kata kadar ulaşan mobil dış cephe eşya asansörü kiralama ve güvenli asansörlü evden eve nakliye hizmeti.`,
  alternates: {
    canonical: '/hizmetler/asansorlu-evden-eve-nakliyat',
  },
};

export default function AsansorluPage() {
  const sss = [
    {
      "question": "Dış cephe asansörü her binaya kurulabilir mi?",
      "answer": "Binanın önünde elektrik tellerinin olmaması, ağaç engeli bulunmaması ve kamyonun binaya en az 10-15 metre mesafede güvenli yanaşabileceği bir zemin olması durumunda kurulum yapılabilir."
    },
    {
      "question": "Eşya asansörü kurulumu ekstra ücrete tabi mi?",
      "answer": "Kat durumuna göre değişmekle birlikte, asansör kurulumu keşif aşamasında fiyata dahil edilir ve sözleşmeyle sabitlenir; sonradan asansör kurulum farkı adı altında ek ücret talep edilmez."
    },
    {
      "question": "Hangi katlar arasında asansör kurulabilir?",
      "answer": `Lider Nakliyat olarak 1. kattan başlayarak maksimum ${FACTS.maxFloor}. kata kadar ulaşan mobil dış cephe eşya asansörleriyle hizmet vermekteyiz.`
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Asansörlü Evden Eve Nakliyat',
        description: `Konya'da yüksek katlı daireler için ${FACTS.maxFloor}. kata kadar ulaşan mobil dış cephe eşya asansörü kiralama ve güvenli asansörlü evden eve nakliye hizmeti.`,
        slug: 'hizmetler/asansorlu-evden-eve-nakliyat'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/#hizmetler' },
        { name: 'Asansörlü Evden Eve Nakliyat', url: '/hizmetler/asansorlu-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Lider Hizmetleri', url: '/#hizmetlerimiz' }, { name: 'Asansörlü Nakliyat', url: '/hizmetler/asansorlu-evden-eve-nakliyat' }]} className="pt-4" />
        
        {/* Intro */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            KAT YÜKSEKLİĞİ ÇÖZÜMLERİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Asansörlü Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Selçuklu ve Meram ilçelerindeki yüksek katlı binalar için tasarlanan dış cephe mobil taşıma asansör sistemimiz.
          </p>
        </section>

        {/* Core Content (GEO & SEO Optimized) */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Asansörlü Ev Taşıma Hangi Kat Limitlerine Kadar Ulaşır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat firmasının dış cephe mobil asansörleri maksimum {FACTS.maxFloor}. kat seviyesine kadar olan binalara eşya taşıma hizmeti vermektedir. Mobil dış cephe asansörü, yüksek katlı binalardaki eşyaların bina içi merdivenlere sokulmadan pencere veya balkondan nakliye aracına transfer edilmesini sağlayan teleskopik platform sistemidir. Dış cephe eşya asansörleri balkondan veya pencereden kurulur.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Asansörlü Nakliyat Kurulumu Hangi Avantajları Sağlar?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat asansörlü taşıma platformları, eşyaların bina merdiven boşluklarında darbe almasını, çizilmesini ve kırılmasını engellemektedir. Ayrıca, apartman sakinlerini rahatsız etmeden taşınma süresini ortalama yüzde 40 oranında kısaltarak zamandan tasarruf sağlar.
            </p>
          </div>

          {/* Service Scope Table (Rule 5) */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <span className="font-bold text-forest text-lg block">Asansörlü Evden Eve Nakliyat Hizmet Kapsamı</span>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="p-3 rounded-tl-lg">Hizmet Detayı</th>
                    <th className="p-3">Durum</th>
                    <th className="p-3 rounded-tr-lg">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light text-charcoal">
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-semibold">Teleskopik Asansör Kurulumu</td>
                    <td className="p-3 text-green-600 font-bold">Dahil</td>
                    <td className="p-3">Maksimum {FACTS.maxFloor}. kata kadar dış cephe erişimi</td>
                  </tr>
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-semibold">Emtia Taşıma Sigortası</td>
                    <td className="p-3 text-green-600 font-bold">Dahil</td>
                    <td className="p-3">{FACTS.insurer} güvencesiyle hasar koruması</td>
                  </tr>
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-semibold">Mobil Jeneratör Gücü</td>
                    <td className="p-3 text-green-600 font-bold">Dahil</td>
                    <td className="p-3">Elektrik kesintilerinden bağımsız çalışma kabiliyeti</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <PricingMatrix />
          <RelatedLinks currentSlug="asansorlu-evden-eve-nakliyat" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Asansörlü Nakliyat Hakkında Sıkça Sorulanlar (SSS)?
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {sss.map((item, idx) => (
                <div key={idx} className={item.question ? "border-t border-gray-light/60 pt-3" : ""}>
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
