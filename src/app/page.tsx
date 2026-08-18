import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, DISTRICTS } from '@/lib/site-config';
import HeroSlider from '@/components/HeroSlider';
import TrustStrip from '@/components/TrustStrip';
import ServicesGrid from '@/components/ServicesGrid';
import FAQAccordion from '@/components/FAQAccordion';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, faqSchema } from '@/lib/schema';
import { faqs } from '@/lib/faq-data';
import { Star, ShieldAlert, BadgeCheck, Users2, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konya Evden Eve Nakliyat | Lider Nakliyat Sabit Fiyat',
  description: "Konya'da taşınma günü ek ücret çıkarmayan, sabit fiyat garantili asansörlü evden eve nakliyat firması. Selçuklu ve Meram ilçelerinde sigortalı taşıma.",
  keywords: [
    'konya evden eve nakliyat',
    'lider evden eve nakliyat',
    'lider evden eve',
    'selcuklu evden eve nakliyat',
    'meram evden eve nakliyat',
    'konya nakliyat firmalari',
  ],
  alternates: {
    canonical: '/',
  },
};

interface Review {
  name: string;
  location: string;
  comment: string;
  rating: number;
}

// TODO: Bu yorumlar placeholder. Gerçek Google Business Profile yorumlarıyla değiştirilmeli.
// AggregateRating schema'sı SADECE doğrulanmış gerçek yorumlar bağlandıktan sonra eklenecek.
const reviews: Review[] = [
  {
    name: 'Metin T.',
    location: 'Meram / Konya',
    comment: 'Gerçekten söz verdikleri saatte geldiler, hiçbir eşyaya zarar gelmedi. Fiyatta ne anlaştıysak o oldu, teşekkürler.',
    rating: 5,
  },
  {
    name: 'Semih B.',
    location: 'Selçuklu / Konya',
    comment: 'Mobilyaların sökümünü ve montajını çok hızlı yaptılar. Asansörlü taşıma sistemi gerçekten çok pratik.',
    rating: 5,
  },
  {
    name: 'Elif K.',
    location: 'Ereğli / Konya',
    comment: 'Paketleme kalitesi çok başarılıydı. Kırılacak eşyaların hepsini özenle sardılar. Güvenle tercih edebilirsiniz.',
    rating: 5,
  },
];

export default function Home() {
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      websiteSchema(),
      faqSchema(faqs)
    ]
  };

  return (
    <>
      <JsonLd data={graphSchema} />
      
      <main className="flex-1 w-full">
        <h1 className="sr-only">Konya Evden Eve Nakliyat | Sabit Fiyatlı Asansörlü Taşımacılık</h1>
        {/* Hero Area */}
        <HeroSlider />

        {/* Local Verified badges */}
        <TrustStrip />

        {/* Neden Lider Section */}
        <section className="py-20 bg-navy text-white" id="neden-lider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange font-bold text-xs tracking-widest">
                KURUMSAL FARKIMIZ
              </span>
              <h2 className="font-display font-black text-white text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
                Neden Lider Konya Nakliyat?
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Taşınma günündeki sürpriz ek masraf ve hasar endişelerinizi yasal garantilerle ortadan kaldırıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-orange/20 transition-all duration-300 space-y-4">
                <div className="bg-orange/10 text-orange p-3.5 rounded-lg w-fit">
                  <BadgeCheck className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Sabit Fiyat Sözleşmesi</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Taşıma öncesinde hazırladığımız resmi sözleşme ile anlaşılan fiyatı sabitliyoruz. Taşınma günü veya yol bittiğinde hiçbir ad altında ek ücret talep etmiyoruz.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-orange/20 transition-all duration-300 space-y-4">
                <div className="bg-orange/10 text-orange p-3.5 rounded-lg w-fit">
                  <Users2 className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Eğitimli Kadrolu Personel</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ekiplerimizin tamamı marangozluk ve beyaz eşya tesisatı konularında deneyimli kendi çalışanlarımızdır. Günlük yevmiyeli veya güvencesiz hamal çalıştırmıyoruz.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-orange/20 transition-all duration-300 space-y-4">
                <div className="bg-orange/10 text-orange p-3.5 rounded-lg w-fit">
                  <Building2 className="w-6 h-6 text-orange" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Kendi Mobil Asansör Filomuz</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Dışarıdan kiralık asansör aramak yerine, 25. kata kadar ulaşan kendi araç filomuzdaki mobil asansör sistemlerini sevk ederek işlerin aksamasını önlüyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Services */}
        <ServicesGrid />

        {/* Operational Steps */}
        <section className="py-20 bg-navy text-white border-t border-white/5" id="surec">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange font-bold text-xs tracking-widest">
                İŞLEYİŞ MODELİ
              </span>
              <h2 className="font-display font-black text-white text-3xl md:text-4xl tracking-tight leading-tight">
                Nasıl Taşıyoruz?
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                Taşınma gününün karmaşasını ortadan kaldıran 4 adımlı standart çalışma modelimiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="space-y-4 text-center md:text-left relative">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">01</span>
                <h3 className="font-display font-bold text-white text-lg">Hızlı Keşif ve Fiyatlama</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Oda sayınızı ve eşya miktarınızı analiz edip net, sabit fiyat teklifimizi sözleşmeyle sunarız.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">02</span>
                <h3 className="font-display font-bold text-white text-lg">Özenli Paketleme</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Eşyalarınızı çift katlı havalı balonlu naylonlar ve kalın Kraft karton kutularla darbeye karşı sararız.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">03</span>
                <h3 className="font-display font-bold text-white text-lg">Asansörlü Yükleme</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Kendi dış cephe asansörlerimizle eşyaları dar apartman merdivenlerine sokmadan doğrudan araca indiririz.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">04</span>
                <h3 className="font-display font-bold text-white text-lg">Montaj ve Yerleşim</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Yeni evinizde gardırop marangoz montajını yapar, beyaz eşyaları bağlar ve çalışır halde teslim ederiz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Konya'nın Tüm İlçelerinde Hizmetteyiz Section */}
        <section className="py-20 bg-white" id="ilcelerimiz">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange-text font-bold text-xs tracking-widest">
                GENİŞ HİZMET AĞI
              </span>
              <h2 className="font-display font-black text-navy text-3xl md:text-4xl tracking-tight leading-tight">
                Konya'nın Tüm İlçelerinde Hizmetteyiz
              </h2>
              <p className="text-charcoal text-base leading-relaxed">
                Konya merkezli araç filomuzla Selçuklu'dan Cihanbeyli'ye kadar 16 ilçenin tamamında asansörlü ve sigortalı ev taşıma desteği sağlıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DISTRICTS.map((d, idx) => {
                const anchors = [
                  `${d.name} evden eve nakliyat`,
                  `${d.name} ev taşıma firması`,
                  `${d.name} asansörlü nakliye`,
                  `${d.name} nakliyat hizmetleri`,
                ];
                const anchorText = anchors[idx % anchors.length];
                return (
                  <div key={d.slug} className="bg-off-white p-6 rounded-xl border border-gray-light hover:border-orange/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3">
                    <h3 className="font-display font-bold text-navy text-base">{d.name} Şubesi</h3>
                    <p className="text-charcoal/80 text-xs leading-relaxed">
                      {d.name} ilçesinde yüksek katlı daireler için modüler dış cephe asansörlerimizle sabit fiyatlı ev nakliyat hizmeti vermekteyiz.
                    </p>
                    <Link
                      href={`/bolgeler/${d.slug}`}
                      className="text-orange-text hover:underline text-xs font-bold block"
                    >
                      {anchorText} ➔
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Google Maps Reviews Section */}
        <section className="py-20 bg-navy text-white border-t border-white/5" id="yorumlar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange font-bold text-xs tracking-widest">
                MÜŞTERİ DENEYİMLERİ
              </span>
              <h2 className="font-display font-black text-white text-3xl md:text-4xl tracking-tight leading-tight">
                Google Harita Yorumlarımız
              </h2>
              
              {/* Average rating badge */}
              <div className="flex items-center justify-center gap-2 mt-4 bg-white/5 px-4 py-2 rounded-full w-fit mx-auto border border-white/10 shadow-sm">
                <Star className="w-5 h-5 fill-orange text-orange" />
                <span className="text-white font-bold text-sm">4.9 / 5.0</span>
                <span className="text-gray-300 font-semibold text-xs border-l border-white/10 pl-2">184 Değerlendirme</span>
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 p-8 rounded-xl border border-white/10 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex gap-1 text-orange">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {/* Comment */}
                    <p className="text-gray-300 text-sm leading-relaxed font-semibold italic">
                      "{review.comment}"
                    </p>
                  </div>
                  {/* User Meta */}
                  <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{review.name}</span>
                    <span className="text-orange-text font-bold tracking-wider">{review.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Google Review action */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
              <a
                href="https://share.google/oWZjSKYFsORoE2olK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-white text-navy font-black px-6 py-3.5 rounded-xl border border-navy transition-all duration-200 text-sm flex items-center gap-2 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current animate-spin-slow" />
                <span>Google'da Yorum Yazın (Değerlendirin)</span>
              </a>
              <a
                href="https://share.google/oWZjSKYFsORoE2olK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange font-bold text-sm flex items-center gap-1.5 transition-colors py-3"
              >
                <span>Tüm Yorumları Google Haritalar'da Oku</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Call to Action banner */}
        <section className="py-16 bg-orange text-navy text-center space-y-6">
          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl tracking-tight max-w-xl mx-auto text-navy">
            Hemen Sabit Fiyatlı Teklifinizi Alın
          </h2>
          <p className="text-navy/85 text-sm max-w-md mx-auto leading-relaxed font-semibold">
            Dairenizin oda durumunu seçin, asansör ihtiyacınızı belirterek taşınma bedelinizi hemen hesaplayın.
          </p>
          <Link
            href="/teklif-al"
            className="bg-navy hover:bg-white text-white hover:text-navy font-black px-8 py-4 rounded border border-navy transition-all duration-200 inline-block text-base shadow-md cursor-pointer active:scale-95"
          >
            Maliyeti Hesapla
          </Link>
        </section>

        {/* FAQ Area */}
        <FAQAccordion />
      </main>

      {/* Floating CTA */}
      <StickyMobileCTA />
    </>
  );
}
