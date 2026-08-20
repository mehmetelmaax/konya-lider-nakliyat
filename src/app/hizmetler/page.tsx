import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { SITE, SERVICES } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Profesyonel Nakliyat Hizmetleri | Lider Nakliyat Konya',
  description: "Konya Lider Nakliyat olarak asansörlü evden eve nakliyattan profesyonel paketlemeye, eşya depolamadan piyano nakliyesine kadar sunduğumuz 9 ana lojistik hizmetimiz.",
  alternates: {
    canonical: '/hizmetler',
  },
};

export default function HizmetlerPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmetlerimiz', url: '/hizmetler' }
  ]);

  const offerCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Lider Nakliyat Hizmet Kataloğu',
    'provider': {
      '@id': `${SITE.url}/#organization`
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Lider Nakliyat Hizmetleri',
      'itemListElement': SERVICES.map((service, idx) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': service.name,
          'description': service.description,
          'url': `${SITE.url}/hizmetler/${service.slug}`
        }
      }))
    }
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb,
      offerCatalogSchema
    ]
  };

  // Compare metadata for the table
  const comparisonData = [
    { name: 'Şehiriçi Evden Eve Nakliyat', asansor: 'Opsiyonel', sigorta: 'Zorunlu / Ücretsiz', paketleme: 'Tam Paketleme Dahil', sure: 'Aynı Gün (4-6 saat)' },
    { name: 'Şehirlerarası Evden Eve', asansor: 'İki Taraflı Kurulum', sigorta: 'Tam Kasko Sigortalı', paketleme: 'Çift Kat Patpat Sarım', sure: '1 - 2 Gün' },
    { name: 'Asansörlü Ev Taşıma', asansor: `${FACTS.maxFloor}. Kata Kadar Mobil`, sigorta: 'Kurulum Sigortalı', paketleme: 'Opsiyonel', sure: '1 - 2 Saat' },
    { name: 'Ofis ve İşyeri Taşıma', asansor: 'Gerekliyse Kurulur', sigorta: 'Kurumsal Sigortalı', paketleme: 'Etiketli Koli & Arşiv', sure: 'Planlamaya Göre' },
    { name: 'Eşya Depolama', asansor: 'Opsiyonel', sigorta: 'Depo İçi Yangın/Hırsızlık', paketleme: 'Depolama Tipi Ambalaj', sure: 'Aylık/Yıllık Kiralık' },
    { name: 'Parça Eşya Taşıma', asansor: 'Opsiyonel (Kat durumuna göre)', sigorta: 'Kısmi Nakliye Sigortası', paketleme: 'Opsiyonel (Kısmi)', sure: 'Plana Göre (1-3 gün)' },
    { name: 'Piyano ve Kasa Taşıma', asansor: 'Özel Askı / Liftli Araç', sigorta: 'Özel Değerli Eşya', paketleme: 'Çift Kat Balonlu Sarım', sure: '2 - 3 Saat' }
  ];

  return (
    <>
      <JsonLd data={graphSchema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Hizmetlerimiz', url: '/hizmetler' }]} className="pt-4" />
        
        {/* Banner Section */}
        <section 
          className="relative py-16 bg-forest text-white text-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/img/banner-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-forest/80 z-0" />
          <div className="relative z-10 space-y-4">
            <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1">
              <Truck className="w-4 h-4 text-gold" />
              <span>Neler Yapıyoruz?</span>
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
              Profesyonel Taşımacılık Hizmetlerimiz
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Konya merkezli olarak ev, ofis, parça eşya taşımacılığından asansör kiralama ve eşya depolamaya kadar tüm lojistik ihtiyaçlarınız.
            </p>
          </div>
        </section>

        {/* Grid of 9 services */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.slug} className="bg-white rounded-2xl p-8 border border-gray-light hover:border-gold/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center font-bold">
                    {/* Placeholder icon container */}
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-black text-forest text-xl leading-tight">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="border-t border-gray-light pt-4">
                  <Link 
                    href={`/hizmetler/${service.slug}`}
                    className="text-gold hover:text-forest transition-colors font-bold text-sm flex items-center gap-1.5 w-fit"
                  >
                    <span>Hizmeti İncele</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-12 bg-white border-t border-b border-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display font-black text-forest text-2xl md:text-3xl">
                Hizmet Karşılaştırma Matrisi
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Taşınma planınıza en uygun hizmet tipini belirlemek için teknik özellikleri karşılaştırın.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-light shadow-sm">
              <table className="min-w-full divide-y divide-gray-light text-left text-sm">
                <thead className="bg-forest text-white text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4">Hizmet Türü</th>
                    <th scope="col" className="px-6 py-4">Dış Cephe Asansörü</th>
                    <th scope="col" className="px-6 py-4">Eşya Sigortası</th>
                    <th scope="col" className="px-6 py-4">Paketleme & Marangoz</th>
                    <th scope="col" className="px-6 py-4">Tahmini Operasyon Süresi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light text-charcoal bg-white">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-6 py-4 font-bold text-forest">{row.name}</td>
                      <td className="px-6 py-4 text-xs">{row.asansor}</td>
                      <td className="px-6 py-4 text-xs font-semibold text-green-700">{row.sigorta}</td>
                      <td className="px-6 py-4 text-xs">{row.paketleme}</td>
                      <td className="px-6 py-4 text-xs font-semibold">{row.sure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
