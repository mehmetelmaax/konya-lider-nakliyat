import QuoteForm from '@/components/QuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
﻿import React from 'react';
import { FACTS } from '@/lib/facts';
import PricingMatrix from '@/components/geo/PricingMatrix';
import PackingSpecs from '@/components/geo/PackingSpecs';
import K3InfoBlock from '@/components/geo/K3InfoBlock';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ücretsiz Ekspertiz Hizmeti | Lider Nakliyat',
  description: "Konya'da taşınma öncesinde eşya hacmini, bina kat durumunu ve asansör kurulum açısını yerinde veya görüntülü inceleyerek sabit fiyat teklifi çıkarma süreci.",
  alternates: {
    canonical: '/hizmetler/ucretsiz-ekspertiz',
  },
};

export default function EkspertizPage() {
  const sss = [
  {
    "question": "Ekspertiz için ücret alıyor musunuz?",
    "answer": "Hayır. Konya genelinde gerçekleştirdiğimiz tüm yerinde ve dijital görüntülü ekspertiz incelemeleri tamamen ücretsizdir."
  },
  {
    "question": "Ekspertiz yaptırmak zorunlu mu?",
    "answer": "Zorunlu değildir ancak taşınma günü kamyon boyutu veya asansör kurulum açısı hatası yaşanmaması adına özellikle 3+1 ve üzeri büyük daireler için yaptırılmasını önemle tavsiye ederiz."
  },
  {
    "question": "Ekspertiz ne kadar sürer?",
    "answer": "Ortalama 15-20 dakika sürmektedir. Bu süre zarfında tüm eşyalarınız incelenip de-montaj gereksinimleri not alınır."
  }
];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Ücretsiz Ekspertiz Hizmeti',
        description: "Konya'da taşınma öncesinde eşya hacmini, bina kat durumunu ve asansör kurulum açısını yerinde veya görüntülü inceleyerek sabit fiyat teklifi çıkarma süreci.",
        slug: 'hizmetler/ucretsiz-ekspertiz'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/#hizmetler' },
        { name: 'Ücretsiz Ekspertiz Hizmeti', url: '/hizmetler/ucretsiz-ekspertiz' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Tüm Hizmetlerimiz', url: '/#hizmetlerimiz' }, { name: 'Ücretsiz Ekspertiz', url: '/hizmetler/ucretsiz-ekspertiz' }]} className="pt-4" />
                {/* Intro */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            DOĞRU MALİYET PLANLAMASI
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Ücretsiz Ekspertiz Hizmeti
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Taşınma gününde sürpriz masraflarla karşılaşmamanız için sunduğumuz yerinde ve dijital keşif analizimiz.
          </p>
        </section>

        {/* Detailed Content */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Nakliye Ekspertiz Raporu Neden Önemlidir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat firmasının ücretsiz ekspertiz hizmeti, taşınma gününde eşyalarınızın kamyona sığmaması veya ek ücret talep edilmesi gibi riskleri ortadan kaldırmaktadır. Ekspertiz sırasında eşya hacmi, gereken ambalaj malzemesi miktarı, çalışacak personel sayısı ve asansör şasisi açısı net olarak raporlanır.
            </p>
            <p className="text-charcoal text-sm leading-relaxed">
              Bu analiz sonrasında hazırladığımız yasal sözleşme ile anlaşılan ücret sabitlenir ve taşınma sürecinde sürpriz maliyet artışları engellenir.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Görüntülü Ekspertiz Nasıl Yapılır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Yerinde keşif imkanı bulunmayan durumlarda, WhatsApp veya benzeri kanallar üzerinden görüntülü ekspertiz hizmeti vermekteyiz. Odalarınızı, gardırop içlerini ve binanızın dış cephe cephesini görüntülü arama ile ekiplerimize göstererek kısa sürede yazılı fiyat teklifi alabilirsiniz.</p>
          </div>

          {/* SSS Section */}
          
          <PricingMatrix />
          <RelatedLinks currentSlug="ucretsiz-ekspertiz" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Ekspertiz Hakkında Sıkça Sorulanlar
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
