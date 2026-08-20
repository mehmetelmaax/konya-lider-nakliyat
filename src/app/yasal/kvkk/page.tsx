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
        <Link href="/" className="text-gold-text font-bold text-sm hover:underline block mb-4">
          &larr; Ana Sayfaya Dön
        </Link>
        <h1 className="font-display font-black text-forest text-2xl md:text-3xl border-b border-gray-light pb-4">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-sm leading-relaxed text-charcoal">
          <strong>{SITE.legalName}</strong> (Veri Sorumlusu; Adres: {SITE.address.street}, {SITE.address.locality} / {SITE.address.region}) olarak, 6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizi aşağıda açıklanan amaçlar kapsamında işleyeceğimizi bildiririz.
        </p>
        <div className="space-y-4 text-sm text-charcoal">
          <h2 className="font-display font-bold text-forest text-lg">1. İşlenen Kişisel Verileriniz</h2>
          <p className="leading-relaxed">
            Sitemizdeki fiyat teklif formu üzerinden bizimle paylaştığınız şu verileriniz işlenmektedir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs font-semibold">
            <li>Ad ve Soyad</li>
            <li>Telefon Numarası</li>
            <li>Çıkış İlçesi (Nereden Taşınacaksınız?)</li>
            <li>Varış İlçesi / İli (Nereye Taşınacaksınız?)</li>
            <li>Ev Boyutu (Oda Sayısı / Ofis)</li>
            <li>Eşya Asansörü Tercihi</li>
          </ul>
          
          <h2 className="font-display font-bold text-forest text-lg">2. Verilerin İşlenme Amacı ve Hukuki Sebebi</h2>
          <p className="leading-relaxed">
            Kişisel verileriniz, Kanun&apos;un 5/2-c maddesinde düzenlenen &ldquo;bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması&rdquo; hukuki sebebine dayanarak, evden eve nakliye hizmetleri sözleşmesinin kurulması, fiyat teklifinin hazırlanması ve taşınma gününün organize edilmesi amacıyla işlenmektedir.
          </p>
          
          <h2 className="font-display font-bold text-forest text-lg">3. Verilerin Saklanma Süresi</h2>
          <p className="leading-relaxed">
            Kişisel verileriniz, taşıma sözleşmesinin kurulması, ifası ve olası uyuşmazlıkların çözümü amacıyla, Türk Borçlar Kanunu ve Türk Ticaret Kanunu uyarınca tabi olduğumuz <strong>10 yıllık genel zamanaşımı süresi</strong> boyunca güvenli bir şekilde saklanacaktır.
          </p>
          
          <h2 className="font-display font-bold text-forest text-lg">4. Üçüncü Kişilerle Paylaşım</h2>
          <p className="leading-relaxed">
            Eşyalarınızın güvenli nakledilmesi amacıyla yapılan zorunlu sigorta poliçesi düzenleme işlemleri (nakliyat emtea sigortası ortak acentelerimiz) hariç, verileriniz üçüncü şahıslarla asla paylaşılmamakta ve ticari amaçla satılmamaktadır.
          </p>
          
          <h2 className="font-display font-bold text-forest text-lg">5. İletişim ve Hak Talepleri</h2>
          <p className="leading-relaxed">
            Kanun&apos;un 11. maddesi kapsamındaki haklarınızı (silme, düzeltme, bilgi alma, güncelleme) kullanmak için doğrudan veri sorumlusu e-posta adresimiz olan <a href={`mailto:${SITE.email}`} className="text-gold hover:underline font-bold">{SITE.email}</a> veya fiziki ofis adresimiz üzerinden yazılı olarak bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
