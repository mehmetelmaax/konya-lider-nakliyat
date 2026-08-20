import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { SITE, DISTRICTS } from '@/lib/site-config';
import HeroSlider from '@/components/HeroSlider';
import TrustStrip from '@/components/TrustStrip';
import ServicesGrid from '@/components/ServicesGrid';
import FAQAccordion from '@/components/FAQAccordion';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import GoogleReviews from '@/components/GoogleReviews';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, faqSchema } from '@/lib/schema';
import { faqs } from '@/lib/faq-data';
import { Star, ShieldAlert, BadgeCheck, Users2, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { FACTS } from '@/lib/facts';

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
        {/* Hero Area */}
        <HeroSlider />

        {/* Local Verified badges */}
        <TrustStrip />

        {/* Neden Lider Section */}
        <section className="py-20 bg-forest text-white" id="neden-lider">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-gold font-bold text-xs tracking-widest">
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
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/20 transition-all duration-300 space-y-4">
                <div className="bg-gold/10 text-gold p-3.5 rounded-lg w-fit">
                  <BadgeCheck className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Sabit Fiyat Sözleşmesi</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Taşıma öncesinde hazırladığımız resmi sözleşme ile anlaşılan fiyatı sabitliyoruz. Taşınma günü veya yol bittiğinde hiçbir ad altında ek ücret talep etmiyoruz.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/20 transition-all duration-300 space-y-4">
                <div className="bg-gold/10 text-gold p-3.5 rounded-lg w-fit">
                  <Users2 className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Eğitimli Kadrolu Personel</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ekiplerimizin tamamı marangozluk ve beyaz eşya tesisatı konularında deneyimli kendi çalışanlarımızdır. Günlük yevmiyeli veya güvencesiz hamal çalıştırmıyoruz.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/20 transition-all duration-300 space-y-4">
                <div className="bg-gold/10 text-gold p-3.5 rounded-lg w-fit">
                  <Building2 className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-bold text-white text-lg">Kendi Mobil Asansör Filomuz</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Dışarıdan kiralık asansör aramak yerine, {FACTS.maxFloor}. kata kadar ulaşan kendi araç filomuzdaki mobil asansör sistemlerini sevk ederek işlerin aksamasını önlüyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Services */}
        <ServicesGrid />

        {/* Operational Steps */}
        <section className="py-20 bg-forest text-white border-t border-white/5" id="surec">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-gold font-bold text-xs tracking-widest">
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
                <span className="font-display font-black text-gold/30 text-5xl md:text-6xl block">01</span>
                <h3 className="font-display font-bold text-white text-lg">Hızlı Keşif ve Fiyatlama</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Oda sayınızı ve eşya miktarınızı analiz edip net, sabit fiyat teklifimizi sözleşmeyle sunarız.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-gold/30 text-5xl md:text-6xl block">02</span>
                <h3 className="font-display font-bold text-white text-lg">Özenli Paketleme</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Eşyalarınızı çift katlı havalı balonlu naylonlar ve kalın Kraft karton kutularla darbeye karşı sararız.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-gold/30 text-5xl md:text-6xl block">03</span>
                <h3 className="font-display font-bold text-white text-lg">Asansörlü Yükleme</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Kendi dış cephe asansörlerimizle eşyaları dar apartman merdivenlerine sokmadan doğrudan araca indiririz.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-gold/30 text-5xl md:text-6xl block">04</span>
                <h3 className="font-display font-bold text-white text-lg">Montaj ve Yerleşim</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Yeni evinizde gardırop marangoz montajını yapar, beyaz eşyaları bağlar ve çalışır halde teslim ederiz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fotoğraflar / Galeri Section */}
        <section className="py-20 bg-off-white border-t border-gray-light" id="fotograflar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-gold-text font-bold text-xs tracking-widest uppercase">
                GERÇEK HİZMET FOTOĞRAFLARI
              </span>
              <h2 className="font-display font-black text-forest text-3xl md:text-4xl tracking-tight leading-tight">
                Operasyonlarımızdan Kareler
              </h2>
              <p className="text-charcoal text-base leading-relaxed">
                Konya Lider Nakliyat olarak tüm taşımalarımızda kendi özmal araçlarımızı, asansörlerimizi ve kadrolu elemanlarımızı kullanıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  src: '/img/arac-filosu.webp',
                  title: 'Geniş Araç Filosu',
                  desc: 'Ev eşyası taşımaya uygun kapalı kasa filomuz.',
                  alt: 'Konya Lider Nakliyat kapalı kasa nakliye kamyonları ve araç filosu'
                },
                {
                  src: '/img/asansor-kurulum.webp',
                  title: 'Dış Cephe Asansörleri',
                  desc: 'Yüksek katlara modüler taşıma asansörleri kurulumu.',
                  alt: 'Dış cephe teleskopik modüler nakliyat asansörü kurulumu'
                },
                {
                  src: '/img/paketleme-detay.webp',
                  title: 'Ambalajlama ve Paketleme',
                  desc: 'Çift katlı koruyucu patpat balonlu sarım.',
                  alt: 'Eşyaların balonlu naylon malzemeyle koruyucu paketlenmesi'
                },
                {
                  src: '/img/marangozluk.webp',
                  title: 'Profesyonel Marangozluk',
                  desc: 'Mobilyaların demontaj ve montaj süreçleri.',
                  alt: 'Usta marangoz tarafından mobilyaların sökülmesi ve kurulumu'
                }
              ].map((img, i) => (
                <div 
                  key={i} 
                  className="group relative overflow-hidden rounded-2xl border border-gray-light bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-video sm:aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-2 bg-white">
                    <h3 className="font-display font-bold text-forest text-lg group-hover:text-gold transition-colors">
                      {img.title}
                    </h3>
                    <p className="text-charcoal/80 text-sm leading-relaxed">
                      {img.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to full gallery page */}
            <div className="text-center">
              <Link
                href="/galeri"
                className="inline-flex items-center gap-2 bg-forest hover:bg-gold text-white hover:text-forest font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Hizmet Galerisinin Tamamını Gör</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Konya'nın Tüm İlçelerinde Hizmetteyiz Section */}
        <section className="py-20 bg-white" id="ilcelerimiz">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-gold-text font-bold text-xs tracking-widest">
                GENİŞ HİZMET AĞI
              </span>
              <h2 className="font-display font-black text-forest text-3xl md:text-4xl tracking-tight leading-tight">
                Konya'nın Tüm İlçelerinde Hizmetteyiz
              </h2>
              <p className="text-charcoal text-base leading-relaxed">
                Konya merkezli araç filomuzla Selçuklu'dan Cihanbeyli'ye kadar {DISTRICTS.length} ilçenin tamamında asansörlü ve sigortalı ev taşıma desteği sağlıyoruz.
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
                  <div key={d.slug} className="bg-off-white p-6 rounded-xl border border-gray-light hover:border-gold/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3">
                    <h3 className="font-display font-bold text-forest text-base">{d.name} Şubesi</h3>
                    <p className="text-charcoal/80 text-xs leading-relaxed">
                      {d.name} ilçesinde yüksek katlı daireler için modüler dış cephe asansörlerimizle sabit fiyatlı ev nakliyat hizmeti vermekteyiz.
                    </p>
                    <Link
                      href={`/bolgeler/${d.slug}`}
                      className="text-gold-text hover:underline text-xs font-bold block"
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
        <section className="py-20 bg-forest text-white border-t border-white/5" id="yorumlar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 space-y-4">
              <span className="text-gold font-bold text-xs tracking-widest">
                MÜŞTERİ DENEYİMLERİ
              </span>
              <h2 className="font-display font-black text-white text-3xl md:text-4xl tracking-tight leading-tight">
                Google Harita Yorumlarımız
              </h2>
              <p className="text-gray-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                Müşterilerimizin taşınma süreçleri sonrasında Google Haritalar üzerinde bıraktığı gerçek yorumları okumak veya işletmemizi değerlendirmek için aşağıdaki bağlantıları kullanabilirsiniz.
              </p>
            </div>

            <div className="mb-12">
              <GoogleReviews />
            </div>

            {/* Direct Google Review action */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-white text-forest font-black px-6 py-3.5 rounded-xl border border-forest transition-all duration-200 text-sm flex items-center gap-2 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current animate-spin-slow" />
                <span>Google'da Yorum Yazın (Değerlendirin)</span>
              </a>
              <a
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gold font-bold text-sm flex items-center gap-1.5 transition-colors py-3"
              >
                <span>Tüm Yorumları Google Haritalar'da Oku</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Call to Action banner */}
        <section className="py-16 bg-gold text-forest text-center space-y-6">
          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl tracking-tight max-w-xl mx-auto text-forest">
            Hemen Sabit Fiyatlı Teklifinizi Alın
          </h2>
          <p className="text-forest/85 text-sm max-w-md mx-auto leading-relaxed font-semibold">
            Dairenizin oda durumunu seçin, asansör ihtiyacınızı belirterek taşınma bedelinizi hemen hesaplayın.
          </p>
          <Link
            href="/teklif-al"
            className="bg-forest hover:bg-white text-white hover:text-forest font-black px-8 py-4 rounded border border-forest transition-all duration-200 inline-block text-base shadow-md cursor-pointer active:scale-95"
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
