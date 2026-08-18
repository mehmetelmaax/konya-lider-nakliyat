import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Navigation, Calendar, ArrowRight } from 'lucide-react';
import { SITE, DISTRICTS } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Konya Evden Eve Nakliyat Bölgeleri | Lider Nakliyat',
  description: "Konya'da Selçuklu, Meram ve Karatay başta olmak üzere 14 ilçenin tamamında sigortalı, asansörlü ve marangozlu evden eve nakliye hizmet bölgelerimiz.",
  alternates: {
    canonical: '/bolgeler',
  },
};

export default function BolgelerPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Bölgelerimiz', url: '/bolgeler' }
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Konya Evden Eve Nakliyat Hizmet Verdiğimiz Bölgeler',
    'numberOfItems': DISTRICTS.length,
    'itemListElement': DISTRICTS.map((district, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'name': `${district.name} Evden Eve Nakliyat`,
      'url': `${SITE.url}/bolgeler/${district.slug}`
    }))
  };

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumb,
      itemListSchema
    ]
  };

  const merkezDistricts = DISTRICTS.filter(d => d.tier === 'merkez');
  const tasraDistricts = DISTRICTS.filter(d => d.tier === 'ilce');

  // Specific text for each district for visual separation
  const districtNotes: Record<string, string> = {
    'Selçuklu': 'Geniş caddeler ve yüksek katlı sitelerde hidrolik asansör sistemlerimizle hızlı kurulum.',
    'Meram': 'Dar ve ağaçlık sokaklardaki müstakil veya alçak katlı villalara uygun özel araç filomuz.',
    'Karatay': 'Sanayi bölgeleri ve yeni gelişen toplu konut alanlarında planlı ve güvenli lojistik.',
    'Ereğli': 'Konya merkeze en uzak bölgede günübirlik eşya taşımacılığı ve düzenli seferler.',
    'Akşehir': 'Tarihi dokuya zarar vermeden dar sokaklarda küçük kasa pratik kamyonet operasyonları.',
    'Seydişehir': 'Toros geçiş hattında yer alan ilçemize zorlu hava koşullarına uygun kapalı kasa tırlar.',
    'Ilgın': 'Termal bölge ve çevresinde evden eve taşınmalarda ambalajlama ve montaj dahil hizmet.',
    'Çumra': 'Tarım ve yerleşik konut alanlarında asansörlü taşımacılık çözümleri.',
    'Kadınhanı': 'Merkez ilçelere yakın konum avantajıyla hızlı eksper ve taşıma koordinasyonu.',
    'Beyşehir': 'Göl çevresi ve engebeli arazi yapısında eşyaların sarsıntısız taşınması için süspansiyonlu araçlar.',
    'Sarayönü': 'Tarım arazileri ve yerleşim yerlerinde eşyaların ambalajlanması ve nakliyesi.',
    'Karapınar': 'Rüzgarlı ve tozlu hava koşullarına uygun, sızdırmaz çift çeperli kapalı kasalarımızla taşıma.',
    'Kulu': 'Yurt dışı gurbetçi nüfusun yoğun olduğu dönemlerde anahtar teslim hızlı taşınma paketleri.',
    'Cihanbeyli': 'Geniş coğrafyaya yayılan yerleşim birimlerinde güvenli mesafe nakliye çözümleri.'
  };

  return (
    <>
      <JsonLd data={graphSchema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/bolgeler' }]} className="pt-4" />
        
        {/* Banner Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 text-orange" />
            <span>Hizmet Ağı</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Konya Evden Eve Nakliyat — Hizmet Verdiğimiz İlçeler
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Konya'nın 14 ilçesinde K3 belgeli araçlarımız ve profesyonel ekiplerimizle kapıdan kapıya taşımacılık sunuyoruz.
          </p>
        </section>

        {/* Detailed 400-word intro for SEO */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-6 text-charcoal leading-relaxed text-sm md:text-base">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              Konya'da Nakliye Lojistiği ve Coğrafi Bölge Yapısı
            </h2>
            <p>
              Türkiye'nin yüz ölçümü bakımından en büyük ili olan Konya, nakliyat lojistiği açısından kendine has dinamiklere sahiptir. Şehrin yerleşim yapısı incelendiğinde, nüfusun ve konut yoğunluğunun büyük bir kısmının <strong>Selçuklu, Meram ve Karatay</strong> gibi merkez ilçelerde toplandığı görülmektedir. Bu bölgelerde son yıllarda inşa edilen 10 kat ve üzeri yüksek binaların oranı artmıştır. Konya Lider Nakliyat olarak bu modern yerleşim planına ayak uydurarak, 25. kata kadar ulaşabilen mobil dış cephe eşya asansörlerimizle hizmet vermekteyiz.
            </p>
            <p>
              Merkez dışındaki taşra ilçelerimizde ise durum daha farklıdır. Örneğin, <strong>Ereğli, Akşehir ve Seydişehir</strong> gibi büyük ilçelerimiz Konya merkeze önemli mesafelerde yer alır. Bu mesafeler nakliye araçlarının yakıt, amortisman ve yol güvenliği planlamalarını doğrudan etkiler. Şehirlerarası standartlarda gerçekleştirdiğimiz ilçe taşımacılığında, araçlarımızın Toroslar ve İç Anadolu düzlüklerindeki engebeli yollarda eşyalara zarar vermemesi amacıyla süspansiyon sistemleri ve araç içi sabitleme mekanizmaları periyodik olarak kontrol edilmektedir.
            </p>
            <p>
              Konya'daki konut stoğu da ilçeden ilçeye değişiklik gösterir. Selçuklu'da geniş caddeler ve site içi asansör kurulum imkanları bulunurken, Akşehir gibi tarihi dokusu korunan ilçelerimizde dar sokaklar ve tarihi binaların mevcudiyeti daha dar manevra kabiliyetine sahip araçların kullanımını zorunlu kılmaktadır. Lider Nakliyat, her ilçenin konut yapısına, sokak genişliğine ve coğrafi koşullarına özel araç ve asansör planlaması yaparak Konya genelinde sıfır hasar prensibiyle taşınma süreçlerini gerçekleştirmektedir.
            </p>
          </div>
        </section>

        {/* Merkez İlçeler Section */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-orange pl-3 mb-8">
            <h2 className="font-display font-black text-navy text-2xl md:text-3xl">
              Merkez İlçeler (Aynı Gün Teslim)
            </h2>
            <p className="text-gray-600 text-sm mt-1">Konya şehir merkezinde yer alan, yoğun hizmet verdiğimiz bölgelerimiz.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {merkezDistricts.map((district) => (
              <div key={district.slug} className="bg-white rounded-2xl p-6 border border-gray-light hover:border-orange/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-orange/10 text-orange font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase">
                      Merkez Bölge
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" /> Merkez
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-navy text-xl">
                    {district.name} Evden Eve Nakliyat
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {districtNotes[district.name] || 'Konya merkez bölgesinde asansörlü ve sigortalı taşımacılık hizmetlerimiz.'}
                  </p>
                </div>
                
                <div className="border-t border-gray-light mt-6 pt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div>Mesafe: <span className="font-bold text-navy">Şehir İçi</span></div>
                    <div>Ort. Süre: <span className="font-bold text-navy">4 - 6 Saat</span></div>
                  </div>
                  <Link 
                    href={`/bolgeler/${district.slug}`}
                    className="text-orange hover:text-navy transition-colors font-bold text-sm flex items-center gap-1.5"
                  >
                    <span>Detaylar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Taşra İlçeleri Section */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-orange pl-3 mb-8">
            <h2 className="font-display font-black text-navy text-2xl md:text-3xl">
              Çevre İlçeler
            </h2>
            <p className="text-gray-600 text-sm mt-1">Konya dışındaki, düzenli seferlerle hizmet ulaştırdığımız ilçelerimiz.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tasraDistricts.map((district) => (
              <div key={district.slug} className="bg-white rounded-2xl p-6 border border-gray-light hover:border-orange/30 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-navy/5 text-navy/70 font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase">
                      Çevre İlçe
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" /> {district.distanceKm} km
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-navy text-xl">
                    {district.name} Evden Eve Nakliyat
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {districtNotes[district.name] || `${district.name} ilçesinde kapalı kasa tırlarımızla güvenli lojistik ve eşya nakliyesi.`}
                  </p>
                </div>
                
                <div className="border-t border-gray-light mt-6 pt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div>Mesafe: <span className="font-bold text-navy">~{district.distanceKm} km</span></div>
                    <div>Ort. Süre: <span className="font-bold text-navy">6 - 8 Saat</span></div>
                  </div>
                  <Link 
                    href={`/bolgeler/${district.slug}`}
                    className="text-orange hover:text-navy transition-colors font-bold text-sm flex items-center gap-1.5"
                  >
                    <span>Detaylar</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
