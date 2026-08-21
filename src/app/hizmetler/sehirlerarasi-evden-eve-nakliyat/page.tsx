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
import { routesDatabase, ROUTES } from '@/lib/routes-data';

export const metadata: Metadata = {
  title: 'Konya Şehirlerarası Ev Taşıma | Lider Nakliyat',
  description: "Konya'dan Türkiye genelinde 81 ile sigortalı, marangozlu ve sözleşmeli şehirlerarası evden eve nakliyat hizmeti. Sabit fiyat garantisiyle taşının.",
  alternates: {
    canonical: '/hizmetler/sehirlerarasi-evden-eve-nakliyat',
  },
};

export default function SehirlerarasiPage() {
  const schema = serviceSchema({
    name: 'Şehirlerarası Evden Eve Nakliyat',
    description: "Konya'dan Türkiye genelinde 81 ile sigortalı, marangozlu ve sözleşmeli şehirlerarası evden eve nakliyat hizmeti.",
    slug: 'sehirlerarasi-evden-eve-nakliyat'
  });

  const breadcrumb = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmetler', url: '/hizmetler' },
    { name: 'Şehirlerarası Nakliyat', url: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' }
  ]);

  const sss = Object.values(routesDatabase).map(r => ({
    question: `Konya ${r.city} arası nakliyat ne kadar sürer ve fiyatı nedir?`,
    answer: `${r.introText} ${r.pricingText}`
  }));

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      schema,
      breadcrumb,
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb 
          items={[
            { name: 'Hizmetlerimiz', url: '/hizmetler' },
            { name: 'Şehirlerarası Nakliyat', url: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' }
          ]} 
          className="pt-4"
        />

        {/* Intro Banner */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest uppercase">
            UZUN YOL LOJİSTİĞİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Şehirlerarası Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Konya'dan 81 ile emtia nakliyat sigortalı ve marangoz montaj dahil yasal şehirlerarası eşya taşımacılığı.
          </p>
        </section>

        {/* Detailed Content (GEO & SEO Optimized) */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Şehirlerarası Ev Taşıma Sigortası Neleri Kapsar?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat şehirlerarası ev taşıma hizmetlerinde, eşyalarınızın tamamı {FACTS.insurer} emtia nakliyat sigortasıyla yangın, kaza ve doğal afet hasarlarına karşı güvence altına alınmaktadır. Emtia nakliyat sigortası, eşyaların taşıma esnasında karşılaşabileceği kaza, yangın ve hırsızlık gibi riskleri yasal teminat altına alan poliçe türüdür. Bu sigorta poliçesi, kamyonun seyir halindeyken karşılaşabileceği fiziksel hasarları yasal olarak tazmin eder.
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse border border-gray-300">
                <caption>Konya Lider Şehirlerarası Nakliyat Hizmet Kapsamı Tablosu</caption>
                <thead>
                  <tr className="bg-forest text-white">
                    <th scope="col" className="p-3 border border-gray-300 font-semibold">Şehirlerarası Nakliyat Hizmet Kapsamı</th>
                    <th scope="col" className="p-3 border border-gray-300 font-semibold text-center w-32">Durum</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white">
                    <th scope="row" className="p-3 border border-gray-300 font-normal">Şehirlerarası Yolda Emtia Nakliyat Sigortası</th>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-off-white">
                    <th scope="row" className="p-3 border border-gray-300 font-normal">Köprü ve Otoyol Geçiş Ücretleri</th>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-white">
                    <th scope="row" className="p-3 border border-gray-300 font-normal">Mobilya Demontaj ve Yeni Evde Kurulum</th>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-off-white">
                    <th scope="row" className="p-3 border border-gray-300 font-normal">Yeni Eve Avize ve Korniş Montajı</th>
                    <td className="p-3 border border-gray-300 text-center text-red-600 font-bold">Hariç</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Şehirlerarası Nakliye Fiyatları Nasıl Hesaplanır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              K3 Yetki Belgesi, ev ve ofis eşyalarının ticari araçlarla karayolunda taşınması için Ulaştırma Bakanlığı tarafından zorunlu kılınan yasal yetki belgesidir. Şehirlerarası evden eve nakliye 1 fiyatları, yükleme noktası ile teslim noktası arasındaki tam kilometre mesafesine ve taşınacak eşyaların kapladığı hacme göre hesaplanır. Fiyat belirlemede otoban/köprü geçiş ücretleri ile asansör kurulum kat sayıları da maliyet parametrelerine eklenmektedir.
            </p>
          </div>

          {/* SSS Section */}
          
          {/* Section: Şehirlerarası Rotalarımız */}
          <div id="rotalar" className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-gold" />
              <span>Sıkça Hizmet Verdiğimiz Şehirlerarası Nakliyat Rotaları Nelerdir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat merkezli olarak Türkiye genelinde en çok sefer düzenlediğimiz popüler şehirlerarası 81 il nakliyat hatlarımızı aşağıda bulabilirsiniz. İlgili bağlantılara tıklayarak rota detayları, kilometre mesafeleri, sürüş süreleri ve güncel fiyat listelerine erişebilirsiniz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ROUTES.map((route) => (
                <Link
                  key={route.slug}
                  href={`/rotalar/${route.slug}`}
                  className="bg-off-white hover:bg-gold/10 p-4 rounded-lg border border-gray-light/60 font-bold text-forest text-sm flex justify-between items-center transition-colors group"
                >
                  <span>Konya - {route.city} Evden Eve Nakliyat</span>
                  <ArrowRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <PricingMatrix />
          <RelatedLinks currentSlug="sehirlerarasi-evden-eve-nakliyat" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Şehirlerarası Rotalara Göre Sıkça Sorulanlar (İl Bazlı Detaylar)
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {sss.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-3" : ""}>
                  <span className="font-bold text-forest block mb-1">{item.question}</span>
                  <p dangerouslySetInnerHTML={{ __html: item.answer }} />
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
