import QuoteForm from '@/components/QuoteForm';
import PricingMatrix from '@/components/geo/PricingMatrix';
import BuildingAnalysis from '@/components/geo/BuildingAnalysis';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import React from 'react';
import type { Metadata } from 'next';
import { MapPin, Building, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kadınhanı Evden Eve Nakliyat | Lider Nakliyat',
  description: "Konya Kadınhanı ilçesinde sigortalı, sözleşmeli, marangozlu ev taşıma ve şehirlerarası nakliyat çözümleri.",
  alternates: {
    canonical: '/bolgeler/kadinhani-evden-eve-nakliyat',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KadinhaniPage() {
  const sss = [
    {
      question: "Kadınhanı'da asansörlü nakliye kurulabilir mi?",
      answer: "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
    },
    {
      question: "Kadınhanı ev taşıma fiyatları ne kadardır?",
      answer: "Kadınhanı evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
    },
    {
      question: "Taşınma günü ek ücret talep edilir mi?",
      answer: "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Kadınhanı Evden Eve Nakliyat',
        description: "Konya Kadınhanı ilçesinde sigortalı, sözleşmeli, marangozlu ev taşıma ve şehirlerarası nakliyat çözümleri.",
        slug: 'bolgeler/kadinhani-evden-eve-nakliyat',
        areaName: 'Kadınhanı'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '/bolgeler' },
        { name: 'Kadınhanı', url: '/bolgeler/kadinhani-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  const mahalleler = ["Tepe","İstiklal","Pınarbaşı","Yenimahalle","Karşıyaka","Fatih"];

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/#ilcelerimiz' }, { name: 'Kadınhanı', url: '/bolgeler/kadinhani-evden-eve-nakliyat' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest font-sans">
            KONYA TAŞRA İLÇE SERVİSİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Kadınhanı Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Kadınhanı ilçesinin tüm mahallelerinde K3 belgeli kapalı kasa araçlarımız, marangozlu nakliye ekiplerimiz ve dış cephe asansörlerimizle sabit fiyat garantili profesyonel taşıma çözümleri sunuyoruz.
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Kurumsal Güvence */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange" />
              <span>Güvenilir Kadınhanı Nakliye Çözümleri</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat olarak, Kadınhanı bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.
            </p>
          </div>

          <PricingMatrix />
          <BuildingAnalysis districtName="Kadınhanı" />
          <RelatedLinks currentSlug="kadinhani-evden-eve-nakliyat" type="bolge" />

          {/* Section 2: Mahalleler */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="w-6 h-6 text-orange" />
              <span>Kadınhanı'da Hizmet Verdiğimiz Mahalleler</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Kadınhanı ilçesinin dört bir yanına ayrım yapmaksızın hızlı ve güvenilir nakliye tır ve kamyonetlerimizi sevk ediyoruz. Bölgede yoğun olarak hizmet verdiğimiz mahalleler:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mahalleler.map((mah, idx) => (
                <div key={idx} className="bg-off-white p-4 rounded-lg border border-gray-light/60 text-center font-bold text-navy text-sm">
                  {mah}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Ulaşım ve İntikal */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Building className="w-6 h-6 text-orange" />
              <span>Ulaşım, Mesafe ve İntikal Bilgileri</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Kadınhanı ilçesi, Konya merkez lojistik garajımıza yaklaşık 60 kilometre mesafededir. Nakliye araçlarımızın ilçeye intikal süresi karayolu şartlarına bağlı olarak ortalama 1 ila 1.5 saat arasındadır. Eşyalarınız kapalı kasa taşıma araçlarımızda sarsıntısız transfer edilerek hasarsız bir şekilde teslim edilir.
            </p>
          </div>

          {/* Fast Quote Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl text-center mb-6">
              Hızlı Teklif Al
            </h2>
            <QuoteForm defaultDistrict="Kadınhanı" />
          </div>

        </section>
      </main>
    </>
  );
}
