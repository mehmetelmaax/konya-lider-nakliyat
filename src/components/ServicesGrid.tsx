import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Truck, Repeat, ArrowRight, Briefcase, Package, FileText } from 'lucide-react';
import QuoteForm from './QuoteForm';

interface ServiceItem {
  id: string;
  name: string;
  searchableName: string;
  outcomeLine: string;
  mechanics: string[];
  bestFor: string;
  pricePosture: string;
  microCTA: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const services: ServiceItem[] = [
  {
    id: 'sehirici',
    name: '1. Şehiriçi Evden Eve Nakliyat',
    searchableName: 'Şehir İçi Ev Taşıma',
    outcomeLine: 'Konya merkez ilçeleri arasında aynı gün içinde sorunsuz ev teslimi.',
    mechanics: [
      'Selçuklu-Meram hızlı servis',
      'Aynı gün anahtar teslim',
      'Sabit paket fiyat teklifi',
    ],
    bestFor: 'İlçe sınırları içinde hızlı ve pratik taşınmak isteyenler.',
    pricePosture: 'Evin oda sayısına (1+1, 2+1, 3+1) göre sabitlenir.',
    microCTA: 'Şehiriçi Taşıma Çözümleri',
    icon: Repeat,
    route: '/hizmetler/sehirici-evden-eve-nakliyat',
  },
  {
    id: 'sehirlerarasi',
    name: '2. Şehirlerarası Evden Eve Nakliyat',
    searchableName: 'Şehirlerarası Ev Taşıma',
    outcomeLine: "Konya'dan Türkiye'nin tüm illerine sigortalı ve zamanında teslimat.",
    mechanics: [
      'Anadolu Sigorta poliçeli',
      'Çift şoförlü çelik kasa araçlar',
      'Yol durum takibi',
    ],
    bestFor: 'İl dışına atanan memurlar ve taşınan aileler.',
    pricePosture: 'Kilometre mesafesine ve eşya hacmine göre hesaplanır.',
    microCTA: 'Şehirlerarası Taşıma Süreci',
    icon: Truck,
    route: '/hizmetler/sehirlerarasi-evden-eve-nakliyat',
  },
  {
    id: 'asansorlu',
    name: '3. Asansörlü Evden Eve Nakliyat',
    searchableName: 'Asansörlü Ev Taşıma',
    outcomeLine: 'Merdiven hasarlarını sıfıra indiren, hızlı ve güvenli dış cephe taşıma sistemi.',
    mechanics: [
      '25. kata kadar erişim',
      'Dar sokaklara uygun mobil araçlar',
      'Çift halatlı güvenlik sistemi',
    ],
    bestFor: '3. kat ve üzeri yüksek binalarda oturanlar.',
    pricePosture: 'Fiyat farkı asansör kurulum katına göre belirlenir.',
    microCTA: 'Asansörlü Nakliyat Avantajları',
    icon: ArrowUpRight,
    route: '/hizmetler/asansorlu-evden-eve-nakliyat',
  },
  {
    id: 'ofis',
    name: '4. İşyeri ve Ofis Taşıma',
    searchableName: 'Ofis ve İşyeri Taşıma',
    outcomeLine: 'Dosya, arşiv ve elektronik cihazların sınıflandırılarak sıfır kayıpla yeni ofise aktarılması.',
    mechanics: [
      'Numaralı etiketli paketleme',
      'Hassas elektronik taşıma kasaları',
      'Sözleşmeli iş teslimi',
    ],
    bestFor: 'İş kesintisi yaşamak istemeyen Konya esnafı ve şirketleri.',
    pricePosture: 'Ofis oda sayısı ve parça cihaz adedine göre tekliflendirilir.',
    microCTA: 'Ofis Nakliye İpuçları',
    icon: Briefcase,
    route: '/hizmetler/ofis-ve-isyeri-tasimaciligi',
  },
  {
    id: 'paketleme',
    name: '5. Profesyonel Eşya Paketleme',
    searchableName: 'Eşya Ambalajlama Standartları',
    outcomeLine: 'Beyaz eşya ve çizilebilir ahşap yüzeylerin kalın Kraft patpatlar ile sarılarak korunması.',
    mechanics: [
      'Çift kat balonlu naylon şeritler',
      'Köşe korumalı profil ambalaj',
      'Askılı portatif elbise dolapları',
    ],
    bestFor: 'Hassas mobilya ve lüks eşya sahipleri.',
    pricePosture: 'Kullanılan malzeme hacmine göre ücrete dahil edilir.',
    microCTA: 'Eşya Paketleme Seçenekleri',
    icon: Package,
    route: '/hizmetler/profesyonel-esya-paketleme',
  },
  {
    id: 'ekspertiz',
    name: '6. Ücretsiz Ekspertiz',
    searchableName: 'Yerinde ve Dijital Keşif',
    outcomeLine: 'Taşınma günü sürpriz fiyat artışlarını önleyen yerinde oda envanteri ve asansör açısı ölçümü.',
    mechanics: [
      'Görüntülü veya fiziki oda keşfi',
      'Erişim/sokak asansör testi',
      'Resmi sabit fiyat teminatı',
    ],
    bestFor: 'Taşınma maliyetini önceden netleştirmek isteyenler.',
    pricePosture: 'Tamamen ücretsiz ve bağlayıcılığı olmayan keşif analizi.',
    microCTA: 'Ücretsiz Ekspertiz Başvurusu',
    icon: FileText,
    route: '/hizmetler/ucretsiz-ekspertiz',
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-gray-light/30" id="hizmetler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest">
            FAALİYET ALANLARIMIZ
          </span>
          <h2 className="font-display font-black text-navy text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
            Profesyonel Taşımacılık Hizmetleri
          </h2>
          <p className="text-charcoal text-base md:text-lg leading-relaxed">
            20 yıllık Konya deneyimimizle sunduğumuz, tüm lojistik ihtiyaçlarınızı karşılayan odaklanmış çözümlerimiz.
          </p>
        </div>

        {/* Outer Split layout: Left (calculator), Right (services) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Embedded Sticky Quote Calculator Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 bg-white rounded-2xl shadow-xl p-6 border border-gray-light">
            <div className="mb-4">
              <span className="text-orange-text font-bold text-[10px] tracking-widest block">ÜCRETSİZ EKSPERTİZ</span>
              <h3 className="font-display font-black text-navy text-xl mt-0.5">Taşınma Maliyeti Al</h3>
            </div>
            <QuoteForm isInline={true} />
          </div>

          {/* Right Column: Grid of Services */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl p-6 md:p-8 border border-gray-light hover:border-orange/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-light/10 rounded-bl-full transition-colors group-hover:bg-orange/5"></div>
                  
                  <div>
                    {/* Card Header (Icon & Names) */}
                    <div className="flex gap-4 items-center mb-6">
                      <div className="bg-navy/5 text-navy p-3 rounded-lg group-hover:bg-orange group-hover:text-navy transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-navy text-sm group-hover:text-orange-text transition-colors leading-tight">
                          {service.name}
                        </h3>
                        <span className="text-gray-400 text-[10px] font-semibold tracking-wider block mt-1">
                          {service.searchableName}
                        </span>
                      </div>
                    </div>

                    {/* Outcome line */}
                    <p className="text-charcoal font-bold text-xs md:text-sm leading-relaxed mb-6">
                      {service.outcomeLine}
                    </p>

                    {/* Mechanics (Bullets) */}
                    <ul className="space-y-3 mb-6 border-t border-b border-gray-light/60 py-4">
                      {service.mechanics.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-charcoal font-semibold">
                          <span className="w-1.5 h-1.5 bg-orange rounded-full"></span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Details block */}
                    <div className="space-y-2 mb-8 text-[11px]">
                      <div>
                        <span className="text-gray-400 font-bold">Önerilen Durum: </span>
                        <span className="text-charcoal font-semibold">{service.bestFor}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-bold">Fiyatlama: </span>
                        <span className="text-charcoal font-semibold">{service.pricePosture}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card CTA */}
                  <Link
                    href={service.route}
                    className="bg-navy hover:bg-orange text-white hover:text-navy font-bold py-2.5 px-4 rounded transition-all duration-200 text-center text-xs flex items-center justify-center gap-2 group-hover:shadow-md active:scale-98"
                  >
                    <span>{service.microCTA}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
