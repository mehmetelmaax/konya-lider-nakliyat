import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Lider Nakliyat',
  description: 'Konya Lider Evden Eve Nakliyat Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri işleme faaliyetlerimiz hakkında veri sorumlusu aydınlatma metni.',
  alternates: {
    canonical: '/yasal/kvkk',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KVKKPage() {
  return (
    <main className="min-h-screen bg-off-white text-charcoal py-24 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ name: 'Yasal', url: '/yasal/kvkk' }, { name: 'KVKK Aydınlatma Metni', url: '/yasal/kvkk' }]} className="pt-4 max-w-3xl mx-auto px-0 mb-4" />
      <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-light rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-orange-text font-bold text-sm hover:underline block mb-4">
          &larr; Ana Sayfaya Dön
        </Link>
        <h1 className="font-display font-black text-navy text-2xl md:text-3xl border-b border-gray-light pb-4">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-sm leading-relaxed text-charcoal">
          {SITE.legalName} olarak, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında işleyeceğimizi bildiririz.
        </p>
        <div className="space-y-4 text-sm text-charcoal">
          <h2 className="font-display font-bold text-navy text-lg">1. İşlenen Kişisel Verileriniz</h2>
          <p className="leading-relaxed">
            Teklif formu veya telefon aramaları üzerinden bizimle paylaştığınız adınız, soyadınız, telefon numaranız, taşınma kaynak ve hedef adresleri gibi verileriniz lojistik hizmetin kurulması amacıyla işlenmektedir.
          </p>
          <h2 className="font-display font-bold text-navy text-lg">2. Verilerin İşlenme Amacı</h2>
          <p className="leading-relaxed">
            Kişisel verileriniz, yalnızca evden eve nakliye hizmetleri sözleşmesinin ifa edilmesi, fiyat teklifinin hazırlanması ve taşınma gününün organize edilmesi amacıyla sınırlı olarak işlenmektedir.
          </p>
          <h2 className="font-display font-bold text-navy text-lg">3. Üçüncü Kişilerle Paylaşım</h2>
          <p className="leading-relaxed">
            Eşyalarınızın güvenli nakledilmesi amacıyla yapılan zorunlu sigorta poliçesi düzenleme işlemleri (Anadolu Sigorta vb.) hariç, verileriniz üçüncü şahıslarla asla paylaşılmamakta ve satılmamaktadır.
          </p>
          <h2 className="font-display font-bold text-navy text-lg">4. İletişim ve Hak Talepleri</h2>
          <p className="leading-relaxed">
            Kişisel verilerinizin silinmesini, düzeltilmesini veya güncellenmesini talep etmek için doğrudan veri sorumlusu e-posta adresimiz olan <a href={`mailto:${SITE.email}`} className="text-orange-text hover:underline">{SITE.email}</a> adresi üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
