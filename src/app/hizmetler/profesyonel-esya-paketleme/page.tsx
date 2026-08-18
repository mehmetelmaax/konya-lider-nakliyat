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
  title: 'Profesyonel Eşya Paketleme Hizmeti | Lider Nakliyat',
  description: "Konya'da ev taşırken mobilya, beyaz eşya ve kırılacak cam eşyaların çift kat balonlu naylon, Kraft kağıt ve koruma kutularıyla ambalajlanması.",
  alternates: {
    canonical: '/hizmetler/profesyonel-esya-paketleme',
  },
};

export default function PaketlemePage() {
  const sss = [
  {
    "question": "Kırılacak mutfak eşyalarını benim mi paketlemem gerekir?",
    "answer": "Hayır. Fiyat teklifimize tüm paketleme işlemleri dahildir. Mutfak gereçleri, bardak ve tabaklar ekiplerimiz tarafından tek tek sarılarak kolilenmektedir."
  },
  {
    "question": "Mobilyaları sarmadan önce söküyor musunuz?",
    "answer": "Evet. Gardırop ve yatak gibi büyük mobilyalar önce marangozumuz tarafından demonte edilir, ardından her bir parça balonlu naylonla sarılarak asansöre yüklenir."
  },
  {
    "question": "Paketleme malzemeleri hijyenik mi?",
    "answer": "Evet. Özellikle yatak ve kumaş koltuklarınız için her taşımada ilk kez açılan sıfır plastik koruma kılıfları kullanmaktayız."
  }
];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Profesyonel Eşya Paketleme',
        description: "Konya'da ev taşırken mobilya, beyaz eşya ve kırılacak cam eşyaların çift kat balonlu naylon, Kraft kağıt ve koruma kutularıyla ambalajlanması.",
        slug: 'hizmetler/profesyonel-esya-paketleme'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/#hizmetler' },
        { name: 'Profesyonel Eşya Paketleme', url: '/hizmetler/profesyonel-esya-paketleme' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Hizmet Grupları', url: '/#hizmetlerimiz' }, { name: 'Eşya Paketleme', url: '/hizmetler/profesyonel-esya-paketleme' }]} className="pt-4" />
                {/* Intro */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            SIFIR HASAR HEDEFİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Profesyonel Eşya Paketleme
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Eşyalarınızın yolda darbe almasını engelleyen, Kraft karton ve hava kabarcıklı ambalajlama standartlarımız.
          </p>
        </section>

        {/* Detailed Content */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Ev Taşırken Paketlemede Hangi Ambalaj Malzemeleri Kullanılır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat ambalajlama işlemlerinde kalın patpat olarak adlandırılan çift katlı balonlu naylonlar, Kraft koruma kağıtları ve 5 katmanlı oluklu mukavva koliler kullanmaktadır. Bu özel malzemeler, beyaz eşya saclarının çizilmesini ve ahşap mobilya köşelerinin ezilmesini engeller.
            </p>
            <p className="text-charcoal text-sm leading-relaxed">
              Mutfaktaki cam, porselen ve kristal eşyalarınız ise doğrudan gazete kağıdı yerine, mürekkep izi bırakmayan beyaz ambalaj kağıtlarına tek tek sarılarak koli içine dikey olarak yerleştirilir.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Elbise ve Kıyafetlerin Taşınma Standardı Nedir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Kıyafetlerin kırışmadan taşınması amacıyla nakliye ekiplerimiz adresinize portatif askılı koli dolaplar getirmektedir. Takım elbise, abiye ve ceket gibi hassas kıyafetleriniz kendi askılarıyla birlikte bu kilitli dolapların içine asılarak ütüsü bozulmadan taşınır.</p>
            <p className="text-charcoal text-sm leading-relaxed">
              Diğer katlanabilir tekstil ürünleri ve yatak takımları ise toz ve neme karşı koruma sağlayan sıfır poşetli hijyenik şeffaf kılıflara konularak kolilenir.
            </p>
          </div>

          {/* SSS Section */}
          
          <PackingSpecs />
          <RelatedLinks currentSlug="profesyonel-esya-paketleme" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Paketleme Hakkında Sıkça Sorulanlar
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
