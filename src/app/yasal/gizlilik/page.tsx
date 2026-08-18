import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Lider Nakliyat',
  description: `${SITE.legalName} evden eve taşımacılık gizlilik ve güvenlik politikaları hakkında bilgilendirme sayfası.`,
  alternates: {
    canonical: '/yasal/gizlilik',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-off-white text-charcoal py-24 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ name: 'Yasal', url: '/yasal/gizlilik' }, { name: 'Gizlilik Politikası', url: '/yasal/gizlilik' }]} className="pt-4 max-w-3xl mx-auto px-0 mb-4" />
      <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-light rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-orange-text font-bold text-sm hover:underline block mb-4">
          &larr; Ana Sayfaya Dön
        </Link>
        <h1 className="font-display font-black text-navy text-2xl md:text-3xl border-b border-gray-light pb-4">
          Gizlilik Politikası
        </h1>
        <p className="text-sm leading-relaxed text-charcoal">
          {SITE.legalName} olarak gizliliğinize büyük önem veriyoruz. Bu gizlilik politikası, sitemizde bulunan teklif hesaplama araçlarını kullanırken paylaştığınız verilerin nasıl korunduğunu açıklamaktadır.
        </p>
        <div className="space-y-4 text-sm text-charcoal">
          <h2 className="font-display font-bold text-navy text-lg">1. Güvenlik ve Veri Saklama</h2>
          <p className="leading-relaxed">
            Sitemizdeki formlarda girilen veriler doğrudan WhatsApp API parametreleri üzerinden şifreli olarak firmamıza iletilir. Veritabanımızda hiçbir hassas kişisel veya iletişim bilgisini saklamayız. İletişim bilgileriniz yalnızca taşımacılık hizmetimizin ifa edilebilmesi amacıyla kullanılır.
          </p>
          <h2 className="font-display font-bold text-navy text-lg">2. Çerez Kullanımı</h2>
          <p className="leading-relaxed">
            Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla yalnızca temel fonksiyon çerezleri kullanır. Analitik veya üçüncü taraf reklam takip çerezleri kullanılmamaktadır.
          </p>
          <h2 className="font-display font-bold text-navy text-lg">3. İletişim Bilgileri</h2>
          <p className="leading-relaxed">
            Gizlilik politikalarımız hakkında daha fazla bilgi almak veya verilerinizin silinmesini talep etmek için doğrudan <a href={`mailto:${SITE.email}`} className="text-orange-text hover:underline">{SITE.email}</a> e-posta adresi üzerinden veri sorumlusu ile iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
