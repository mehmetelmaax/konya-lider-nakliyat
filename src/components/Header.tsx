'use client';
// Gerekçe: Mobil gezinme menüsü durumları, dropdown durumları, scroll olayları ve usePathname kancası (hook) kullanımı için Client Component'tir.

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, Calculator, ChevronDown } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileDistrictsOpen, setMobileDistrictsOpen] = useState(false);

  // Accessible Dropdowns state
  const [servicesOpen, setServicesOpen] = useState(false);
  const [districtsOpen, setDistrictsOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const districtsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & outside click handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setDistrictsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (servicesRef.current && !servicesRef.current.contains(target)) {
        setServicesOpen(false);
      }
      if (districtsRef.current && !districtsRef.current.contains(target)) {
        setDistrictsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownKeyDown = (e: React.KeyboardEvent, type: 'services' | 'districts') => {
    const ref = type === 'services' ? servicesRef : districtsRef;
    if (!ref.current) return;

    const links = Array.from(ref.current.querySelectorAll('a')) as HTMLAnchorElement[];
    if (links.length === 0) return;

    const activeEl = document.activeElement as HTMLAnchorElement;
    const index = links.indexOf(activeEl);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % links.length;
      links[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + links.length) % links.length;
      links[prevIndex].focus();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHome = pathname === '/';
  const showSolidHeader = !isHome || isScrolled || isOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          showSolidHeader
            ? 'bg-forest shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-gold bg-white px-5 py-3 rounded-2xl shadow-xl border border-gray-light/20">
            <Image
              src="/img/logo.png"
              alt="Konya Lider Evden Eve Nakliyat logosu"
              width={180}
              height={72}
              priority
              className="h-18 md:h-24 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Ana Menü">
            <Link href="/" className="text-white hover:text-gold font-medium transition-colors text-sm focus-visible:ring-1 focus-visible:ring-gold rounded">Ana Sayfa</Link>
            <Link href="/hakkimizda" className="text-white hover:text-gold font-medium transition-colors text-sm focus-visible:ring-1 focus-visible:ring-gold rounded">Hakkımızda</Link>
            
            {/* Services Dropdown */}
            <div 
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                aria-controls="services-menu"
                className="text-white hover:text-gold font-medium transition-colors text-sm py-2 flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-gold rounded bg-transparent border-none cursor-pointer"
              >
                <span>Hizmetlerimiz</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div 
                id="services-menu"
                role="menu"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'services')}
                className={`absolute top-full left-0 mt-2 w-64 bg-forest border border-white/10 rounded-lg shadow-xl p-2 space-y-1 transition-all duration-200 ${
                  servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link role="menuitem" href="/hizmetler" className="text-gold-text hover:bg-white/5 block px-3 py-2 rounded text-xs font-bold border-b border-white/10 focus:outline-none focus:bg-white/5">→ Tüm Hizmetlerimiz</Link>
                <Link role="menuitem" href="/hizmetler/sehirici-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">1. Şehiriçi Evden Eve Nakliyat</Link>
                <Link role="menuitem" href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">2. Şehirlerarası Evden Eve Nakliyat</Link>
                <Link role="menuitem" href="/hizmetler/asansorlu-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">3. Asansörlü Evden Eve Nakliyat</Link>
                <Link role="menuitem" href="/hizmetler/ofis-ve-isyeri-tasimaciligi" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">4. İşyeri ve Ofis Taşıma</Link>
                <Link role="menuitem" href="/hizmetler/profesyonel-esya-paketleme" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">5. Profesyonel Eşya Paketleme</Link>
                <Link role="menuitem" href="/hizmetler/ucretsiz-ekspertiz" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">6. Ücretsiz Ekspertiz</Link>
                <Link role="menuitem" href="/hizmetler/esya-depolama" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">7. Kiralık Eşya Depolama</Link>
                <Link role="menuitem" href="/hizmetler/parca-esya-tasima" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">8. Parça Eşya Taşıma</Link>
                <Link role="menuitem" href="/hizmetler/piyano-ve-kasa-tasima" className="text-white hover:bg-white/5 hover:text-gold block px-3 py-2 rounded text-xs font-semibold focus:outline-none focus:bg-white/5">9. Piyano ve Ağır Kasa Taşıma</Link>
              </div>
            </div>

            {/* Districts Dropdown */}
            <div 
              ref={districtsRef}
              className="relative"
              onMouseEnter={() => setDistrictsOpen(true)}
              onMouseLeave={() => setDistrictsOpen(false)}
            >
              <button 
                onClick={() => setDistrictsOpen(!districtsOpen)}
                aria-expanded={districtsOpen}
                aria-haspopup="true"
                aria-controls="districts-menu"
                className="text-white hover:text-gold font-medium transition-colors text-sm py-2 flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-gold rounded bg-transparent border-none cursor-pointer"
              >
                <span>Bölgelerimiz</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${districtsOpen ? 'rotate-180' : ''}`} />
              </button>
              <div 
                id="districts-menu"
                role="menu"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'districts')}
                className={`absolute top-full left-0 mt-2 w-72 bg-forest border border-white/10 rounded-lg shadow-xl p-2 grid grid-cols-2 gap-1 transition-all duration-200 ${
                  districtsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link role="menuitem" href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="text-gold-text hover:bg-white/5 block px-2.5 py-1.5 rounded text-[11px] font-bold col-span-2 border-b border-white/10 focus:outline-none focus:bg-white/5">→ Şehirlerarası Taşımacılık</Link>
                <Link role="menuitem" href="/bolgeler/selcuklu-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Selçuklu</Link>
                <Link role="menuitem" href="/bolgeler/meram-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Meram</Link>
                <Link role="menuitem" href="/bolgeler/karatay-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Karatay</Link>
                <Link role="menuitem" href="/bolgeler/eregli-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Ereğli</Link>
                <Link role="menuitem" href="/bolgeler/aksehir-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Akşehir</Link>
                <Link role="menuitem" href="/bolgeler/seydisehir-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Seydişehir</Link>
                <Link role="menuitem" href="/bolgeler/ilgin-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Ilgın</Link>
                <Link role="menuitem" href="/bolgeler/beysehir-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Beyşehir</Link>
                <Link role="menuitem" href="/bolgeler/cumra-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Çumra</Link>
                <Link role="menuitem" href="/bolgeler/kadinhani-evden-eve-nakliyat" className="text-white hover:bg-white/5 hover:text-gold block px-2.5 py-1.5 rounded text-[11px] font-semibold focus:outline-none focus:bg-white/5">Kadınhanı</Link>
                <Link role="menuitem" href="/bolgeler" className="text-gold-text hover:bg-white/5 block px-2.5 py-1.5 rounded text-[11px] font-bold focus:outline-none focus:bg-white/5 col-span-2 text-center border-t border-white/10 pt-2 mt-1">→ Tüm Bölgeler</Link>
              </div>
            </div>

            <Link href="/rotalar" className="text-white hover:text-gold font-medium transition-colors text-sm focus-visible:ring-1 focus-visible:ring-gold rounded">Rotalar</Link>
            <Link href="/blog" className="text-white hover:text-gold font-medium transition-colors text-sm focus-visible:ring-1 focus-visible:ring-gold rounded">Blog</Link>
            <Link href="/galeri" className="text-white hover:text-gold font-medium transition-colors text-sm focus-visible:ring-1 focus-visible:ring-gold rounded">Galeri</Link>
            <Link href="/iletisim" className="text-white hover:text-gold font-medium transition-colors text-sm focus-visible:ring-1 focus-visible:ring-gold rounded">İletişim</Link>
          </nav>

          {/* Desktop Right Panel */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={SITE.phoneHref}
              onClick={() => trackEvent('telefon_tikla', { konum: 'header', sayfa: pathname })}
              className="flex items-center gap-2 text-white hover:text-gold font-bold transition-colors focus-visible:ring-1 focus-visible:ring-gold rounded px-2 py-1"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-sm">{SITE.phoneDisplay}</span>
            </a>
            
            <Link
              href="/konya-nakliyat-fiyatlari"
              className="bg-gold hover:bg-white text-forest font-bold px-4 py-2.5 rounded border border-forest transition-all duration-200 shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold text-xs uppercase tracking-wider flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>Fiyat Hesapla</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-gold focus:outline-none p-1 focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label="Menüyü aç/kapat"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-30 bg-forest/95 lg:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-start items-center gap-5 px-6 overflow-y-auto pt-24 pb-10">
          <Link onClick={toggleMenu} href="/" className="text-white text-base font-bold hover:text-gold transition-colors">Ana Sayfa</Link>
          <Link onClick={toggleMenu} href="/hakkimizda" className="text-white text-base font-bold hover:text-gold transition-colors">Hakkımızda</Link>
          <Link onClick={toggleMenu} href="/galeri" className="text-white text-base font-bold hover:text-gold transition-colors">Galeri</Link>
          
          {/* Hizmetlerimiz Mobile Dropdown */}
          <div className="w-full max-w-xs text-center border-t border-b border-white/10 py-3.5 space-y-2">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer"
            >
              <span>Hizmetlerimiz</span>
              <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileServicesOpen && (
              <div className="grid grid-cols-2 gap-1.5 pt-2">
                <Link onClick={toggleMenu} href="/hizmetler/sehirici-evden-eve-nakliyat" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1">Şehiriçi</Link>
                <Link onClick={toggleMenu} href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1">Şehirlerarası</Link>
                <Link onClick={toggleMenu} href="/hizmetler/asansorlu-evden-eve-nakliyat" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1">Asansörlü</Link>
                <Link onClick={toggleMenu} href="/hizmetler/ofis-ve-isyeri-tasimaciligi" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1">Ofis / İşyeri</Link>
                <Link onClick={toggleMenu} href="/hizmetler/profesyonel-esya-paketleme" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1 col-span-2">Paketleme</Link>
                <Link onClick={toggleMenu} href="/hizmetler/ucretsiz-ekspertiz" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1 col-span-2">Ekspertiz</Link>
                <Link onClick={toggleMenu} href="/hizmetler/esya-depolama" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1">Depolama</Link>
                <Link onClick={toggleMenu} href="/hizmetler/parca-esya-tasima" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1">Parça Eşya</Link>
                <Link onClick={toggleMenu} href="/hizmetler/piyano-ve-kasa-tasima" className="text-white hover:text-gold text-[10px] font-semibold border border-white/10 rounded px-2 py-1 col-span-2">Piyano & Kasa</Link>
              </div>
            )}
          </div>

          {/* Hizmet Bölgelerimiz Mobile Dropdown */}
          <div className="w-full max-w-xs text-center border-b border-white/10 pb-3.5 space-y-2">
            <button
              onClick={() => setMobileDistrictsOpen(!mobileDistrictsOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all focus:outline-none cursor-pointer"
            >
              <span>Hizmet Bölgelerimiz</span>
              <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-200 ${mobileDistrictsOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileDistrictsOpen && (
              <div className="grid grid-cols-2 gap-1.5 pt-2">
                <Link onClick={toggleMenu} href="/hizmetler/sehirlerarasi-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1 col-span-2">Şehirlerarası</Link>
                <Link onClick={toggleMenu} href="/bolgeler/selcuklu-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Selçuklu</Link>
                <Link onClick={toggleMenu} href="/bolgeler/meram-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Meram</Link>
                <Link onClick={toggleMenu} href="/bolgeler/karatay-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Karatay</Link>
                <Link onClick={toggleMenu} href="/bolgeler/eregli-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Ereğli</Link>
                <Link onClick={toggleMenu} href="/bolgeler/aksehir-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Akşehir</Link>
                <Link onClick={toggleMenu} href="/bolgeler/seydisehir-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Seydişehir</Link>
                <Link onClick={toggleMenu} href="/bolgeler/ilgin-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Ilgın</Link>
                <Link onClick={toggleMenu} href="/bolgeler/beysehir-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Beyşehir</Link>
                <Link onClick={toggleMenu} href="/bolgeler/cumra-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Çumra</Link>
                <Link onClick={toggleMenu} href="/bolgeler/kadinhani-evden-eve-nakliyat" className="text-white hover:text-gold text-[9px] font-semibold border border-white/10 rounded py-1">Kadınhanı</Link>
                <Link onClick={toggleMenu} href="/bolgeler" className="text-gold-text hover:text-gold text-[9px] font-bold border border-white/10 rounded py-1 col-span-2">→ Tüm Bölgeler</Link>
              </div>
            )}
          </div>

          <Link onClick={toggleMenu} href="/rotalar" className="text-white text-base font-bold hover:text-gold transition-colors">Rotalar</Link>
          <Link onClick={toggleMenu} href="/blog" className="text-white text-base font-bold hover:text-gold transition-colors">Blog</Link>
          <Link onClick={toggleMenu} href="/iletisim" className="text-white text-base font-bold hover:text-gold transition-colors">İletişim</Link>

          <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-xs">
            <a
              href={SITE.phoneHref}
              onClick={() => trackEvent('telefon_tikla', { konum: 'header', sayfa: pathname })}
              className="flex items-center justify-center gap-2 bg-forest border border-white text-white font-bold py-2.5 w-full rounded hover:text-gold transition-colors text-xs"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <Link
              onClick={toggleMenu}
              href="/konya-nakliyat-fiyatlari"
              className="flex items-center justify-center gap-2 bg-gold text-forest font-bold py-2.5 w-full rounded hover:bg-white transition-colors text-xs border border-forest"
            >
              <Calculator className="w-4 h-4" />
              <span>Fiyat Hesapla</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
