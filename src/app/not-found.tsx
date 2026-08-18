import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight, Home, ShieldAlert } from 'lucide-react';
import { SITE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | Lider Nakliyat',
  description: 'Aradığınız sayfa bulunamadı. Lojistik ve evden eve nakliyat hizmetlerimiz için menüyü veya faydalı bağlantıları kullanabilirsiniz.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const services = [
    { name: 'Şehir İçi Taşımacılık', href: '/hizmetler/sehirici-evden-eve-nakliyat' },
    { name: 'Şehirler Arası Nakliyat', href: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' },
    { name: 'Asansörlü Nakliye', href: '/hizmetler/asansorlu-evden-eve-nakliyat' },
    { name: 'Ofis ve İş Yeri Taşıma', href: '/hizmetler/ofis-ve-isyeri-tasimaciligi' },
    { name: 'Profesyonel Paketleme', href: '/hizmetler/profesyonel-esya-paketleme' },
    { name: 'Ücretsiz Ekspertiz', href: '/hizmetler/ucretsiz-ekspertiz' },
  ];

  const districts = [
    { name: 'Selçuklu Evden Eve', href: '/bolgeler/selcuklu-evden-eve-nakliyat' },
    { name: 'Meram Evden Eve', href: '/bolgeler/meram-evden-eve-nakliyat' },
    { name: 'Karatay Evden Eve', href: '/bolgeler/karatay-evden-eve-nakliyat' },
    { name: 'Ereğli Evden Eve', href: '/bolgeler/eregli-evden-eve-nakliyat' },
  ];

  return (
    <main className="pt-24 bg-off-white min-h-screen flex flex-col justify-between">
      {/* Hero section */}
      <section className="py-16 bg-navy text-white text-center space-y-4">
        <div className="flex justify-center">
          <ShieldAlert className="w-16 h-16 text-orange animate-bounce" />
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
          Aradığınız Sayfa Bulunamadı
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4">
          Gitmek istediğiniz sayfa silinmiş, ismi değiştirilmiş veya geçici olarak kullanım dışı kalmış olabilir.
        </p>
      </section>

      {/* Helpful links mapping */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Quick links & Main actions */}
          <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-lg border-b border-gray-light pb-2">Hızlı Erişim</h2>
            <div className="flex flex-col gap-3 text-sm font-semibold">
              <Link href="/" className="text-navy hover:text-orange flex items-center gap-1.5">
                <Home className="w-4 h-4 text-orange" />
                <span>Ana Sayfa</span>
              </Link>
              <Link href="/teklif-al" className="text-navy hover:text-orange flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-orange" />
                <span>Fiyat Teklifi Al</span>
              </Link>
              <Link href="/blog" className="text-navy hover:text-orange flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-orange" />
                <span>Blog & Lojistik İpuçları</span>
              </Link>
            </div>
          </div>

          {/* Services mapping */}
          <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-lg border-b border-gray-light pb-2">Hizmetlerimiz</h2>
            <div className="flex flex-col gap-2.5 text-sm">
              {services.map((item, idx) => (
                <Link key={idx} href={item.href} className="text-charcoal hover:text-orange block transition-colors">
                  → {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main regions mapping */}
          <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-lg border-b border-gray-light pb-2">Merkez Bölgelerimiz</h2>
            <div className="flex flex-col gap-2.5 text-sm">
              {districts.map((item, idx) => (
                <Link key={idx} href={item.href} className="text-charcoal hover:text-orange block transition-colors">
                  → {item.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-orange/10 p-8 rounded-2xl border border-orange/20 text-center space-y-4">
          <h3 className="font-display font-black text-navy text-xl">Aradığınızı bulamadınız mı?</h3>
          <p className="text-charcoal text-sm max-w-lg mx-auto">
            Hemen telefon numaramızdan veya WhatsApp destek hattımızdan bize ulaşarak ev taşıma fiyatları ve süreçleri hakkında detaylı bilgi alabilirsiniz.
          </p>
          <div className="flex justify-center">
            <a
              href={SITE.phoneHref}
              className="bg-navy hover:bg-orange text-white hover:text-navy font-black px-6 py-3.5 rounded-xl transition-all duration-200 shadow-md flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer bottom cushion padding */}
      <div className="py-6"></div>
    </main>
  );
}
