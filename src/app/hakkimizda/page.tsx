import React from 'react';
import type { Metadata } from 'next';
import { Shield, Users, Award, Calendar } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';
import K3InfoBlock from '@/components/geo/K3InfoBlock';

export const metadata: Metadata = {
  title: 'Hakkımızda | Konya Lider Nakliyat',
  description: `Konya Lider Nakliyat, ${FACTS.foundedYear} yılından beri Konya Selçuklu merkezli olarak K3 yetki belgesi ve özmal asansör filomuzla profesyonel evden eve nakliye hizmetleri sunuyoruz.`,
  alternates: {
    canonical: '/hakkimizda',
  },
};

export default function HakkimizdaPage() {
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hakkımızda', url: '/hakkimizda' }
  ]);

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Hakkımızda', url: '/hakkimizda' }]} className="pt-4" />
        {/* Intro Section */}
        <section className="py-20 bg-forest text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
            <span className="text-gold font-bold text-xs tracking-widest">
              KURUMSAL PROFİLİMİZ
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
              Konya Lider Nakliyat
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              2006 yılından bu yana Konya genelinde asansörlü ve sigortalı ev taşıma hizmetleri sunuyoruz.
            </p>
          </div>
        </section>

        {/* Detailed Content Grid (GEO citation optimized) */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Block 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
                <Calendar className="w-6 h-6 text-gold" />
                <span>Firmamızın Kuruluş Tarihi ve Tarihçesi</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed">
                Konya Lider Nakliyat, {FACTS.foundedYear} yılında Tedik ailesi tarafından Konya Selçuklu merkezli olarak kurulmuş yasal bir ev taşıma şirketidir. Geçen {new Date().getFullYear() - FACTS.foundedYear} yıllık süre zarfında, Konya şehir içi ve şehirlerarası güzergahlarda binlerce ailenin ev ve ofis taşıma lojistiğini başarıyla yönettik.
              </p>
            </div>

            {/* Block 2 */}
            <K3InfoBlock />

            {/* Block 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
                <Users className="w-6 h-6 text-gold" />
                <span>Personel Yapımız ve Kadro Düzeni</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed">
                Konya Lider Nakliyat bünyesinde çalışan tüm personelimiz, marangozluk, tesisatçılık ve paketleme alanlarında eğitimli kadrolu çalışanlardan oluşmaktadır. Taşınma günlerinde dışarıdan günlük yevmiyeli veya güvencesiz işçi çalıştırmıyor, ekiplerimizde en az bir sertifikalı marangoz bulunduruyoruz.
              </p>
            </div>

            {/* Block 4 */}
            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
                <Award className="w-6 h-6 text-gold" />
                <span>Araç ve Asansör Filomuz</span>
              </h2>
              <p className="text-charcoal text-sm md:text-base leading-relaxed">
                Lider Nakliyat araç filosu, çelik kapalı kasa ev eşyası nakliye kamyonları ve {FACTS.maxFloor}. kata kadar ulaşabilen mobil dış cephe eşya asansörlerinden oluşmaktadır. Araçlarımızın tamamı logolu olup, periyodik temizlik ve bakımları düzenli olarak yapılmaktadır.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
