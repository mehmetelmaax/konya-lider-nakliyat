import QuoteForm from '@/components/QuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import { routesDatabase } from '@/lib/routes-data';
import { notFound } from 'next/navigation';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Shield, ClipboardList, Coins, HelpCircle } from 'lucide-react';
import { dativeSuffix } from '@/lib/turkish';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(routesDatabase).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = routesDatabase[slug];
  if (!route) return {};

  return {
    title: `Konya ${route.city} Evden Eve Nakliyat | Lider Nakliyat`,
    description: `Konya'dan ${route.city}'${dativeSuffix(route.city)} sigortalı, marangozlu ve K3 belgeli şehirlerarası evden eve nakliyat. Sabit fiyat garantisiyle güvenle taşının.`,
    alternates: {
      canonical: `/rotalar/${route.slug}`,
    },
  };
}

export default async function RoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = routesDatabase[slug];

  if (!route) {
    notFound();
  }

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'serviceType': 'Moving Services',
        'name': `Konya ${route.city} Evden Eve Nakliyat`,
        'description': `Konya'dan ${route.city}'${dativeSuffix(route.city)} sigortalı, marangozlu ve K3 belgeli şehirlerarası evden eve nakliyat. Sabit fiyat garantisiyle güvenle taşının.`,
        'provider': {
          '@id': `${SITE.url}/#organization`
        },
        'areaServed': [
          {
            '@type': 'AdministrativeArea',
            'name': 'Konya'
          },
          {
            '@type': 'AdministrativeArea',
            'name': route.city
          }
        ],
        'url': `${SITE.url}/rotalar/${route.slug}`
      },
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Şehirlerarası Rotalar', url: '/rotalar' },
        { name: `Konya - ${route.city}`, url: `/rotalar/${route.slug}` }
      ]),
      faqSchema(route.faq)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />

      <main className="pt-24 bg-off-white">
        <Breadcrumb
          items={[
            { name: 'Şehirlerarası Rotalar', url: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' },
            { name: `Konya - ${route.city}`, url: `/rotalar/${route.slug}` }
          ]}
          className="pt-4"
        />

        {/* Intro Section */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest font-sans">
            ŞEHİRLERARASI ROTA LOJİSTİĞİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Konya {route.city} Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            {route.introText}
          </p>
          <div className="pt-2">
            <Link
              href="/hizmetler/sehirlerarasi-evden-eve-nakliyat"
              className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-white font-bold uppercase tracking-wider transition-colors"
            >
              <span>Şehirlerarası Nakliyat Hizmet Detayları</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Detailed Content */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section 1: Distance and Time */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              <span>Konya ve {route.city} Arası Mesafe ve Ev Taşıma Süresi Ne Kadardır?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold text-forest">
              Konya ile {route.city} arası karayolu mesafesi yaklaşık {route.distanceKm} kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama {route.distanceKm > 300 ? '2' : '1'} gündür.
            </p>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              {route.distanceText} Uzun mesafe yolculuklarında şoförlerimizin sürüş güvenliği, araçlarımızın hız limitleri ve yol kontrolleri tamamen yasal mevzuatlara uygun şekilde planlanır. Eşyaların Konya'daki yüklenme saatinden itibaren varış noktasındaki boşaltma planına kadar her detay müşterilerimizle koordineli şekilde yürütülür.
            </p>
            <p className="text-charcoal text-sm md:text-base leading-relaxed mt-3 pt-3 border-t border-gray-light/60">
              Şehirlerarası nakliyede yolculuk süresi sadece km mesafesine değil, aynı zamanda karayollarındaki trafik denetimlerine, dinlenme tesislerindeki mola sürelerine ve mevsimsel hava şartlarına da bağlıdır. Sürücülerimizin can ve mal güvenliği için her 4.5 saatlik sürüşün ardından zorunlu 45 dakikalık takograf molası verilmektedir. Bu yasal mola ve dinlenme süreleri, eşyalarınızın güvenli bir şekilde sarsıntısız taşınması için hayati önem taşır.
            </p>
          </div>

          {/* Section 2: Pricing Table */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Coins className="w-6 h-6 text-gold" />
              <span>Konya ile {route.city} Arası Nakliyat Fiyatları Ne Kadardır?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, {route.pricingText} Aşağıdaki tabloda, iki şehir arasında farklı daire tipleri için öngörülen ortalama fiyat aralıkları listelenmiştir:</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-forest text-white">
                    <th className="p-3 font-display rounded-tl-lg">Daire Tipi</th>
                    <th className="p-3 font-display">Mesafe ve Lojistik Kapsamı</th>
                    <th className="p-3 font-display rounded-tr-lg">Ortalama Fiyat Aralığı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light text-charcoal">
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-bold">1+1 Ev Taşıma</td>
                    <td className="p-3">Hafif Eşya Hacmi (3 Personel + Sigorta)</td>
                    <td className="p-3 font-bold text-gold-text">
                      {route.priceRangeMin.toLocaleString('tr-TR')} TL - {(route.priceRangeMin + 3000).toLocaleString('tr-TR')} TL
                    </td>
                  </tr>
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-bold">2+1 Ev Taşıma</td>
                    <td className="p-3">Standart Eşya Hacmi (4 Personel + Asansör + Sigorta)</td>
                    <td className="p-3 font-bold text-gold-text">
                      {(route.priceRangeMin + 3000).toLocaleString('tr-TR')} TL - {(route.priceRangeMin + 8000).toLocaleString('tr-TR')} TL
                    </td>
                  </tr>
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-bold">3+1 Ev Taşıma</td>
                    <td className="p-3">Geniş Eşya Hacmi (5 Personel + Çift Asansör + Sigorta)</td>
                    <td className="p-3 font-bold text-gold-text">
                      {(route.priceRangeMin + 8000).toLocaleString('tr-TR')} TL - {route.priceRangeMax.toLocaleString('tr-TR')} TL
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Semantic Route Table Required by Rule 5 */}
            <div className="space-y-2 pt-4">
              <span className="font-bold text-forest text-sm block">Rota Lojistik Parametreleri Tablosu:</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-forest/10 text-forest">
                      <th className="p-3 rounded-tl-lg">Mesafe (Km)</th>
                      <th className="p-3">Taşıma Süresi</th>
                      <th className="p-3">Sigorta Türü</th>
                      <th className="p-3 rounded-tr-lg">En Düşük Bütçe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-light text-charcoal">
                    <tr className="hover:bg-off-white/50">
                      <td className="p-3 font-semibold">{route.distanceKm} km</td>
                      <td className="p-3">{route.distanceKm > 300 ? '2 Gün' : '1 Gün'}</td>
                      <td className="p-3">{FACTS.insurer} Korumalı</td>
                      <td className="p-3 font-bold text-gold-text">{route.priceRangeMin.toLocaleString('tr-TR')} TL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-xs text-charcoal/70 italic border-l-2 border-gold pl-3">
              Önemli Not: Belirtilen fiyatlar mevsimsel yakıt maliyetleri ve bina kat durumlarına göre küçük değişiklikler gösterebilir. Net ve sabit fiyat garantili teklif almak için lütfen teklif formumuzu doldurun.
            </p>
          </div>

          {/* Section 3: Güzergâh */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              <span>Konya ve {route.city} Arası Nakliye Güzergâhı ve Taşıma Planı Nasıldır?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Konya ile {route.city} arasındaki nakliye rotasında araçlarımızın kullandığı ana yol hattı: <strong className="text-forest">{route.viaRoute}</strong> güzergâhıdır. {route.routeText} Bu planlı güzergâhlar sayesinde, hem transit geçiş süreleri kısalır hem de otoban kalitesi sayesinde eşyalarınız minimum düzeyde sarsıntıya maruz kalır.</p>
            <p className="text-charcoal text-sm md:text-base leading-relaxed mt-3 pt-3 border-t border-gray-light/60">
              Sevkiyat öncesinde operasyon merkezimiz karayolları genel müdürlüğünün güncel yol durumu bültenlerini, kapalı yol ve yol yapım çalışması raporlarını inceleyerek güzergâhı günceller. Kamyonlarımızda yer alan araç takip sistemleri sayesinde Konya'dan çıkış yapan eşyalarınızın her kilometrede nerede olduğunu canlı olarak görebilirsiniz.
            </p>
          </div>

          {/* Section 4: Sigorta */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span>Konya ve {route.city} Arası Eşya Taşımacılığında Sigorta Kapsamı Neleri İçerir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              {route.insuranceText} Şehirlerarası eşya taşımacılığı yasal olarak da emtia sigortası gerektiren bir süreçtir. Konya Lider Nakliyat, K3 yetki belgesinin zorunlu kıldığı tüm sigortacılık şartlarını eksiksiz yerine getirmektedir. Eşyalarınız araca yüklendiği andan itibaren sevk irsaliyesi ve sigorta poliçesiyle tam güvence altındadır.
            </p>
            <p className="text-charcoal text-sm md:text-base leading-relaxed mt-3 pt-3 border-t border-gray-light/60">
              Emtia nakliyat sigortası, eşyaların taşıma esnasında karşılaşabileceği kaza, yangın ve hırsızlık gibi riskleri yasal teminat altına alan poliçe türüdür. Taşınma gününün sabahında adınıza düzenlenen resmi poliçe evrakını kontrol ederek teslim alabilirsiniz.
            </p>
          </div>

          {/* Section 5: City Specific Tips */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-gold" />
              <span>{route.city} Kentine Taşınırken Dikkat Edilmesi Gereken Önemli Noktalar Nelerdir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, {route.notes} {route.tipsText} Uzun mesafe evden eve nakliye süreçlerinde adreslerin önceden netleştirilmesi ve taşınma sabahında nakliye kamyonunun yanaşacağı otopark alanının ayrılması hayati önem taşır.</p>
            <p className="text-charcoal text-sm md:text-base leading-relaxed mt-3 pt-3 border-t border-gray-light/60">
              Ekspertiz süreci, taşınma öncesinde eşya hacmi, kat durumu ve asansör gereksinimlerinin yerinde incelenerek net bütçenin belirlenmesi sürecidir. Taşınma günü yeni dairenizde aboneliklerin açık olması yerleşim kolaylığı sağlayacaktır. Ayrıca taşınma sonrasında e-devlet üzerinden nüfus müdürlüğüne adres bildiriminde bulunmanız yasal bir zorunluluktur.
            </p>
          </div>

          {/* Section 6: FAQs */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold" />
              <span>Konya ile {route.city} Arası Nakliyat Süreci Hakkında Sıkça Sorulan Sorular Nelerdir?</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {route.faq.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-forest block mb-1">{item.question}</span>
                  <p className="text-charcoal/95 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <RelatedLinks currentSlug={route.slug} type="hizmet" />

          {/* CTA Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Konya {route.city} Nakliye Teklifi Alın
            </h3>
            <QuoteForm isInline={true} />
          </div>
        </section>
      </main>
    </>
  );
}
