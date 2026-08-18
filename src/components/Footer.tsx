'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [regionsOpen, setRegionsOpen] = useState(false);

  const mainRegions = [
    { name: 'Selçuklu', href: '/bolgeler/selcuklu-evden-eve-nakliyat' },
    { name: 'Meram', href: '/bolgeler/meram-evden-eve-nakliyat' },
    { name: 'Karatay', href: '/bolgeler/karatay-evden-eve-nakliyat' },
    { name: 'Ereğli', href: '/bolgeler/eregli-evden-eve-nakliyat' },
    { name: 'Akşehir', href: '/bolgeler/aksehir-evden-eve-nakliyat' },
  ];

  const allRegions = [
    { name: 'Selçuklu', href: '/bolgeler/selcuklu-evden-eve-nakliyat' },
    { name: 'Meram', href: '/bolgeler/meram-evden-eve-nakliyat' },
    { name: 'Karatay', href: '/bolgeler/karatay-evden-eve-nakliyat' },
    { name: 'Ereğli', href: '/bolgeler/eregli-evden-eve-nakliyat' },
    { name: 'Akşehir', href: '/bolgeler/aksehir-evden-eve-nakliyat' },
    { name: 'Seydişehir', href: '/bolgeler/seydisehir-evden-eve-nakliyat' },
    { name: 'Çumra', href: '/bolgeler/cumra-evden-eve-nakliyat' },
    { name: 'Sarayönü', href: '/bolgeler/sarayonu-evden-eve-nakliyat' },
    { name: 'Karapınar', href: '/bolgeler/karapinar-evden-eve-nakliyat' },
    { name: 'Beyşehir', href: '/bolgeler/beysehir-evden-eve-nakliyat' },
    { name: 'Ilgın', href: '/bolgeler/ilgin-evden-eve-nakliyat' },
    { name: 'Kulu', href: '/bolgeler/kulu-evden-eve-nakliyat' },
    { name: 'Cihanbeyli', href: '/bolgeler/cihanbeyli-evden-eve-nakliyat' },
    { name: 'Kadınhanı', href: '/bolgeler/kadinhani-evden-eve-nakliyat' },
  ];

  return (
    <footer className="bg-navy text-white border-t border-white/5 pt-16 pb-8" id="iletisim-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & NAP */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-light/20 w-fit">
              <Image
                src="/img/logo.png"
                alt="Konya Lider Evden Eve Nakliyat logosu"
                width={160}
                height={64}
                loading="lazy"
                className="h-16 md:h-22 w-auto object-contain"
              />
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              20 yıldır Konya'da evden eve nakliyat, ofis taşımacılığı ve asansörlü nakliye hizmetleri vermekte olan yerel ve güvenilir taşımacılık ortağınız.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3 space-y-4">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full lg:w-auto flex justify-between items-center lg:pointer-events-none text-left focus:outline-none border-b border-white/5 pb-2 lg:border-none lg:pb-0 cursor-pointer"
            >
              <h4 className="font-display font-bold text-base tracking-wider uppercase border-l-2 border-orange pl-3 text-white">
                Hizmetlerimiz
              </h4>
              <span className="lg:hidden text-white/65">
                {servicesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>
            
            <nav aria-label="Footer Hizmet Linkleri">
              <ul className={`space-y-2 text-xs md:text-sm text-gray-300 font-semibold mt-4 lg:mt-0 ${servicesOpen ? 'block' : 'hidden lg:block'}`}>
                <li>
                  <Link href="/hizmetler/sehirici-evden-eve-nakliyat" className="hover:text-orange transition-colors">1. Şehiriçi Evden Eve Nakliyat</Link>
                </li>
                <li>
                  <Link href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="hover:text-orange transition-colors">2. Şehirlerarası Evden Eve Nakliyat</Link>
                </li>
                <li>
                  <Link href="/hizmetler/asansorlu-evden-eve-nakliyat" className="hover:text-orange transition-colors">3. Asansörlü Evden Eve Nakliyat</Link>
                </li>
                <li>
                  <Link href="/hizmetler/ofis-ve-isyeri-tasimaciligi" className="hover:text-orange transition-colors">4. İşyeri ve Ofis Taşıma</Link>
                </li>
                <li>
                  <Link href="/hizmetler/profesyonel-esya-paketleme" className="hover:text-orange transition-colors">5. Profesyonel Eşya Paketleme</Link>
                </li>
                <li>
                  <Link href="/hizmetler/ucretsiz-ekspertiz" className="hover:text-orange transition-colors">6. Ücretsiz Ekspertiz</Link>
                </li>
                <li>
                  <Link href="/hizmetler/esya-depolama" className="hover:text-orange transition-colors">7. Kiralık Eşya Depolama</Link>
                </li>
                <li>
                  <Link href="/hizmetler/parca-esya-tasima" className="hover:text-orange transition-colors">8. Parça Eşya Taşıma</Link>
                </li>
                <li>
                  <Link href="/hizmetler/piyano-ve-kasa-tasima" className="hover:text-orange transition-colors">9. Piyano ve Ağır Kasa Taşıma</Link>
                </li>
                <li>
                  <Link href="/rotalar" className="text-orange hover:text-white transition-colors font-bold">➔ Şehirlerarası Lojistik Rotalar</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Service Areas */}
          <div className="lg:col-span-3 space-y-4">
            <button
              onClick={() => setRegionsOpen(!regionsOpen)}
              className="w-full lg:w-auto flex justify-between items-center lg:pointer-events-none text-left focus:outline-none border-b border-white/5 pb-2 lg:border-none lg:pb-0 cursor-pointer"
            >
              <h4 className="font-display font-bold text-base tracking-wider uppercase border-l-2 border-orange pl-3 text-white">
                Hizmet Bölgelerimiz
              </h4>
              <span className="lg:hidden text-white/65">
                {regionsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </span>
            </button>

            <nav aria-label="Footer Bölge Linkleri">
              {/* Desktop View: Always shows all 15 districts in 2 columns */}
              <div className="hidden lg:grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300 font-semibold">
                <Link href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="text-orange hover:underline col-span-2 font-bold">→ Şehirlerarası Taşımacılık</Link>
                <Link href="/rotalar" className="text-orange hover:underline col-span-2 border-b border-white/10 pb-1 font-bold">→ Şehirlerarası Lojistik Rotalar</Link>
                {allRegions.map((reg, idx) => (
                  <Link key={idx} href={reg.href} className="hover:text-orange transition-colors">{reg.name}</Link>
                ))}
              </div>

              {/* Mobile View: Controlled by state */}
              <div className={`lg:hidden mt-4 ${regionsOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="space-y-3">
                  <Link href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="text-orange hover:underline block pb-1 font-bold text-xs border-b border-white/5">→ Şehirlerarası Taşımacılık</Link>
                  <Link href="/rotalar" className="text-orange hover:underline block pb-1 font-bold text-xs border-b border-white/5">→ Şehirlerarası Lojistik Rotalar</Link>
                  
                  {/* 5 regions limit initially */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 font-semibold">
                    {mainRegions.map((reg, idx) => (
                      <Link key={idx} href={reg.href} className="hover:text-orange transition-colors">📍 {reg.name}</Link>
                    ))}
                  </div>

                  <Link
                    href="/bolgeler"
                    className="mt-3 text-orange hover:underline text-xs font-bold flex items-center gap-1.5 justify-center bg-white/5 py-2.5 rounded-xl border border-white/10"
                  >
                    <span>Konya Ev Taşıma Bölgelerimiz ➔</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Column 4: Contact details */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-base tracking-wider uppercase border-l-2 border-orange pl-3 text-white border-b border-white/5 pb-2 lg:border-none lg:pb-0">
              İletişim
            </h4>
            <div className="space-y-4 text-xs md:text-sm text-gray-300 pt-2 lg:pt-0">
              <div className="flex gap-2 items-center">
                <Clock className="w-4 h-4 text-orange" />
                <span>{SITE.hours.opens} – {SITE.hours.closes} (Her Gün)</span>
              </div>
              <a 
                href={SITE.phoneHref} 
                onClick={() => trackEvent('telefon_tikla', { konum: 'footer', sayfa: window.location.pathname })}
                className="flex gap-2 items-center hover:text-orange transition-colors font-bold"
              >
                <Phone className="w-4 h-4 text-orange" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex gap-2 items-center hover:text-orange transition-colors">
                <Mail className="w-4 h-4 text-orange" />
                <span>{SITE.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4 text-xs text-gray-400 font-semibold pb-[env(safe-area-inset-bottom)] border-t border-white/5">
          {/* Left: Copyright & K3 */}
          <div className="text-center md:text-left">
            &copy; {currentYear} Konya Lider Nakliyat. Tüm hakları saklıdır. K3 Yetki Belgesi ile Hizmet Vermekteyiz.
          </div>
          
          {/* Center: Growb Agency Credit */}
          <div className="flex justify-center">
            <a
              href="https://growbdijital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors bg-white px-3.5 py-2.5 rounded-xl shadow-md hover:shadow-lg w-fit transition-all duration-200"
            >
              <span className="text-[10px] text-gray-500 font-extrabold tracking-wide">TASARIM & SEO:</span>
              <Image
                src="/img/growb-logo.jpg"
                alt="Growb. Dijital Pazarlama ve SEO Ajansı logosu"
                width={100}
                height={32}
                loading="lazy"
                className="h-6 w-auto object-contain"
              />
            </a>
          </div>

          {/* Right: Legal Links */}
          <nav aria-label="Yasal Bağlantılar" className="flex gap-6 justify-center md:justify-end">
            <Link href="/yasal/kvkk" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
            <Link href="/yasal/gizlilik" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
