import React from 'react';
import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
import JsonLd from '@/components/JsonLd';
import { faqSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Konya Evden Eve Nakliyat Fiyat Hesaplama | Lider Nakliyat',
  description: "Konya'da ev taşıma maliyetlerini ücretsiz hesaplayın. Selçuklu ve Meram ilçeleri için sabit fiyat garantili asansörlü nakliye teklifi alın.",
  alternates: {
    canonical: '/teklif-al',
  },
};

export default function TeklifAlPage() {
  const teklifFaqs = [
    {
      question: 'Konya evden eve nakliyat fiyatları ne kadar?',
      answer: 'Konya evden eve nakliyat fiyatları 2026 yılı itibarıyla taşınacak odaların sayısına, asansör ihtiyacına ve Selçuklu merkezli taşıma mesafesine göre 12.000 TL ile 28.000 TL arasında değişmektedir.'
    },
    {
      question: 'Ev taşıma fiyat teklifi almak ücretli midir?',
      answer: 'Hayır, ev taşıma fiyat teklifi almak tamamen ücretsizdir. Web sitemizdeki formu doldurarak veya telefonla bize ulaşarak anında teklif alabilirsiniz.'
    },
    {
      question: 'Fiyat teklifi sonradan değişir mi?',
      answer: 'Lider Nakliyat olarak sözleşmeli ve sabit fiyat garantili çalışmaktayız. Eşya detayları ve taşınma şartları değişmediği sürece anlaştığımız fiyat taşınma günü asla değişmez.'
    },
    {
      question: 'Asansör kurulumu fiyata dahil midir?',
      answer: 'Dış cephe asansörü kurulumu, yüksek katlı binalarda zorunludur. Teklif alırken kat durumunuzu belirttiğinizde asansör maliyeti teklifimize dahil edilerek sabitlenir.'
    },
    {
      question: 'Paketleme hizmeti fiyatı nasıl etkiler?',
      answer: 'Profesyonel paketleme hizmetimiz, mobilyaların ve kırılacak mutfak eşyalarının güvenle ambalajlanmasını kapsar. Bu hizmet, kullanılacak malzeme ve işçilik nedeniyle fiyata yansıtılmaktadır.'
    }
  ];

  return (
    <>
      <JsonLd data={faqSchema(teklifFaqs)} />
      <main className="pt-24 min-h-screen bg-forest text-white flex flex-col justify-between">
        <Breadcrumb items={[{ name: 'Teklif Al', url: '/teklif-al' }]} className="pt-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full" dark={true} />
        
        {/* Title and Intro */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 space-y-6">
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-white">
            Konya Evden Eve Nakliyat Ücretsiz Fiyat Teklifi
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Konya'da ev taşımak hiç bu kadar kolay olmamıştı! Selçuklu, Meram, Karatay ve Ereğli başta olmak üzere Konya'nın tüm bölgelerinde geçerli, sabit fiyat garantili asansörlü nakliye maliyetlerinizi anında hesaplayın. Aşağıdaki kısa formu doldurarak oda sayısı, kat durumları ve taşınma mesafesi gibi temel parametrelere göre tahmini ev taşıma bütçenizi anında öğrenebilirsiniz. Formu gönderdiğinizde, uzman lojistik temsilcilerimiz sizinle iletişime geçerek detayları netleştirecek ve yazılı sözleşmeli sabit fiyat teklifinizi hazırlayacaktır.
          </p>
        </section>

        {/* Form area */}
        <section className="py-10 max-w-lg mx-auto w-full px-4">
          <div className="bg-white text-charcoal rounded-2xl shadow-2xl p-6 md:p-8 border border-white/10">
            <QuoteForm isInline={true} />
          </div>
        </section>

        {/* Trust block */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full text-center space-y-8">
          <div className="border-t border-white/10 pt-10">
            <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-6">
              Neden Bu Formu Doldurmalısınız?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-2">
                <span className="font-bold text-gold-text text-sm block">✓ Sabit Fiyat Güvencesi</span>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Formda belirttiğiniz şartlar değişmediği sürece, teklif edilen nakliye fiyatı taşınma günü asla değişmez. Ek ücret sürprizleriyle karşılaşmazsınız.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-2">
                <span className="font-bold text-gold-text text-sm block">✓ K3 Belgeli ve Sigortalı</span>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Tüm operasyonlarımız yasal K3 yetki belgemiz kapsamında, eşya hasar sigortası poliçesi düzenlenerek gerçekleştirilir. Eşyalarınız güvence altındadır.
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-2">
                <span className="font-bold text-gold-text text-sm block">✓ Ücretsiz Ön Keşif</span>
                <p className="text-gray-300 text-xs leading-relaxed">
                  Formu doldurduktan sonra dilerseniz ekiplerimiz adresinize gelerek ücretsiz fiziki ekspertiz ve yer incelemesi yapar, raporunu hazırlar.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
