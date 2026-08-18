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
  title: 'Konya Ofis ve İşyeri Taşıma | Lider Nakliyat',
  description: "Konya'da kurumsal ofis, arşiv, büro ve işyeri taşıma hizmeti. Numaralı etiketli kutulama, asansörlü taşıma ve sigorta güvencesiyle sıfır kayıp.",
  alternates: {
    canonical: '/hizmetler/ofis-ve-isyeri-tasimaciligi',
  },
};

export default function OfisPage() {
  const sss = [
  {
    "question": "Şirket evrakları ve arşivler nasıl paketleniyor?",
    "answer": "Arşiv dosyaları ve yasal evraklar sırasıyla numaralandırılarak kilitli plastik nakliye kutularına yerleştirilir ve her kutu mühürlenerek sevk edilir."
  },
  {
    "question": "Sunucu (Server) ve bilgisayar taşımaları sigortalı mı?",
    "answer": `Evet. Elektronik cihazların tamamı nakliyat emtia poliçesi haricinde, ${FACTS.insurer} kurumsal taşıma teminat sözleşmesiyle özel hasar teminatı kapsamına alınır.`
  },
  {
    "question": "Taşınma işlemini hafta sonu yapabiliyor musunuz?",
    "answer": "Evet. Şirketlerin mesai kaybı yaşamaması adına, ofis taşıma operasyonları cuma akşamı veya cumartesi - pazar günleri planlanarak yürütülür."
  }
];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Ofis ve İşyeri Taşımacılığı',
        description: "Konya'da kurumsal ofis, arşiv, büro ve işyeri taşıma hizmeti. Numaralı etiketli kutulama, asansörlü taşıma ve sigorta güvencesiyle sıfır kayıp.",
        slug: 'hizmetler/ofis-ve-isyeri-tasimaciligi'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/#hizmetler' },
        { name: 'Ofis ve İşyeri Taşımacılığı', url: '/hizmetler/ofis-ve-isyeri-tasimaciligi' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Taşıma Faaliyetleri', url: '/#hizmetlerimiz' }, { name: 'Ofis Taşıma', url: '/hizmetler/ofis-ve-isyeri-tasimaciligi' }]} className="pt-4" />
        {/* Intro */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            KURUMSAL LOJİSTİK ÇÖZÜMLERİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Ofis ve İşyeri Taşımacılığı
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            İş kesintisi ve veri kaybı riskini ortadan kaldıran, planlı ve etiketli kurumsal taşıma çözümleri.
          </p>
        </section>

        {/* Detailed Content (GEO & SEO Optimized) */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Kurumsal Ofis Taşıma Süreci Nasıl Planlanır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat kurumsal ofis taşımacılığı işlemlerinde, tüm arşiv ve donanımlar numaralandırılmış 1 etiket sistemiyle sınıflandırılarak kolilenmektedir. Bu numaralandırma sistemi sayesinde, yeni ofiste hangi kutunun hangi masaya yerleştirileceği önceden planlanır ve iş gücü kaybı önlenir. Ekspertiz, taşınma öncesinde eşya hacmi, kat durumu ve asansör gereksinimlerinin yerinde incelenerek net bütçenin belirlenmesi sürecidir. 
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="p-3 border border-gray-300 font-semibold">Ofis Taşıma Hizmet Kapsamı</th>
                    <th className="p-3 border border-gray-300 font-semibold text-center w-32">Durum</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white">
                    <td className="p-3 border border-gray-300">Ofis mobilyalarının demontaj ve montajı</td>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-off-white">
                    <td className="p-3 border border-gray-300">Çift katlı balonlu naylon ile paketleme</td>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-gray-300">Arşivlerin numaralı kutulara yerleştirilmesi</td>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-off-white">
                    <td className="p-3 border border-gray-300">Sunucu (Server) kurulumu ve IT yapılandırması</td>
                    <td className="p-3 border border-gray-300 text-center text-red-600 font-bold">Hariç</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Ofis Taşınmalarında Asansör Kullanımı Neden Önemlidir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              K3 Yetki Belgesi, ev ve ofis eşyalarının ticari araçlarla karayolunda taşınması için Ulaştırma Bakanlığı tarafından zorunlu kılınan yasal yetki belgesidir. Konya Lider Nakliyat ofis taşımacılığında dış cephe eşya asansörlerinin kullanılması, hacimli büro mobilyalarının ve ağır dosya dolaplarının dar plaza koridorlarından veya merdivenlerden hasarsız geçirilmesini sağlar. Mobil dış cephe asansörü, yüksek katlı binalardaki eşyaların bina içi merdivenlere sokulmadan pencere veya balkondan nakliye aracına transfer edilmesini sağlayan teleskopik platform sistemidir. Mobil asansörler {FACTS.maxFloor}. kata kadar plazaların ve ticari iş merkezlerinin dış cephesine kurularak doğrudan taşıma kamyonuna yükleme yapar.
            </p>
          </div>

          {/* SSS Section */}
          
          <PricingMatrix />
          <RelatedLinks currentSlug="ofis-ve-isyeri-tasimaciligi" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Ofis Taşıma Hakkında Sıkça Sorulanlar (SSS)
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
