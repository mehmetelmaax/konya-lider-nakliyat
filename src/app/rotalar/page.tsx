import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Route, MapPin, Clock, Truck, ArrowRight } from 'lucide-react';
import { SITE, ROUTES } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Şehirlerarası Nakliyat Rotaları | Lider Nakliyat Konya',
  description: "Konya çıkışlı olarak İstanbul, Ankara, İzmir, Antalya ve Bursa başta olmak üzere Türkiye'nin 81 iline sunduğumuz şehirlerarası nakliyat seferleri ve mesafe/fiyat tablosu.",
  alternates: {
    canonical: '/rotalar',
  },
};

export default function RotalarPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Rotalarımız', url: '/rotalar' }
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Konya Çıkışlı Şehirlerarası Evden Eve Nakliyat Rotaları',
    'numberOfItems': ROUTES.length,
    'itemListElement': ROUTES.map((route, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': `Konya - ${route.city} Evden Eve Nakliyat`,
      'url': `${SITE.url}/rotalar/${route.slug}`
    }))
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb,
      itemListSchema
    ]
  };

  return (
    <>
      <JsonLd data={graphSchema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Rotalarımız', url: '/rotalar' }]} className="pt-4" />
        
        {/* Banner Section */}
        <section className="py-16 bg-forest text-white text-center space-y-4">
          <span className="text-gold font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1">
            <Route className="w-4 h-4 text-gold" />
            <span>Şehirlerarası Seferler</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Şehirlerarası Nakliyat Rotalarımız
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Konya merkezli çıkışlarımızla Türkiye geneline planlı, sigortalı ve kaskolu şehirlerarası ev taşıma çözümleri.
          </p>
        </section>

        {/* Route Cards Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROUTES.map((route) => (
              <div key={route.slug} className="bg-white rounded-2xl p-6 border border-gray-light hover:border-gold/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-gold/10 text-gold font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase">
                      Konya → {route.city}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {route.durationHours} Saat
                    </span>
                  </div>
                  
                  <h3 className="font-display font-bold text-forest text-lg">
                    Konya - {route.city} Evden Eve Nakliyat
                  </h3>
                  
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {route.notes}
                  </p>
                </div>

                <div className="border-t border-gray-light mt-6 pt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div>Mesafe: <span className="font-bold text-forest">{route.distanceKm} km</span></div>
                    <div>Güzergah: <span className="font-semibold text-charcoal">{route.viaRoute.split(' ')[0]}...</span></div>
                  </div>
                  
                  <Link 
                    href={`/rotalar/${route.slug}`}
                    className="text-gold hover:text-forest transition-colors font-bold text-sm flex items-center gap-1"
                  >
                    <span>Sefer Detayı</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Distance / Duration / Price range table for SEO */}
        <section className="py-12 bg-white border-t border-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display font-black text-forest text-2xl md:text-3xl">
                Rota Mesafe ve Süre Tablosu
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Konya merkez çıkışlı en popüler güzergahların teknik verileri ve planlama detayları.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-light shadow-sm">
              <table className="min-w-full divide-y divide-gray-light text-left text-sm">
                <thead className="bg-forest text-white text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4">Güzergah</th>
                    <th scope="col" className="px-6 py-4">Mesafe (KM)</th>
                    <th scope="col" className="px-6 py-4">Yaklaşık Sürüş Süresi</th>
                    <th scope="col" className="px-6 py-4">Ana Ulaşım Hattı</th>
                    <th scope="col" className="px-6 py-4">Tahmini Fiyat Aralığı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light text-charcoal bg-white">
                  {ROUTES.map((route, idx) => (
                    <tr key={route.slug} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-6 py-4 font-bold text-forest">Konya - {route.city} Hattı</td>
                      <td className="px-6 py-4 font-semibold">{route.distanceKm} KM</td>
                      <td className="px-6 py-4">{route.durationHours} Saat</td>
                      <td className="px-6 py-4 text-xs">{route.viaRoute}</td>
                      <td className="px-6 py-4 text-xs font-bold text-gold-text">
                        {route.priceRangeMin.toLocaleString('tr-TR')} TL - {route.priceRangeMax.toLocaleString('tr-TR')} TL
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="text-xs text-gray-400 italic text-center">
              * Fiyat aralıkları mevsimsel yoğunluğa, eşya hacmine (oda sayısına) ve asansör gereksinimlerine göre değişebilir. Kesin fiyat ücretsiz ekspertiz sonrası netleştirilir.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
