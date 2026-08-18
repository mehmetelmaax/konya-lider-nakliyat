'use client';

import { SITE } from '@/lib/site-config';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowRight, MapPin, Play, Pause } from 'lucide-react';
import QuoteForm from './QuoteForm';
import Image from 'next/image';
import { IMAGE_BLURS } from '@/lib/image-blur';
import { trackEvent } from '@/lib/analytics';

interface Slide {
  id: number;
  headline: string;
  subheadline: string;
  trustLine: string;
  bgImage: string;
  imageAlt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    headline: 'Konya Evden Eve\nNakliyatta Sabit Fiyat',
    subheadline: 'Taşınma günü ek ücret talep etmiyoruz. Eşyalarınızı asansörlü araçlarımızla hasarsız taşıyoruz.',
    trustLine: 'Sözleşmeli ve sigortalı taşımacılık yapıyoruz.',
    bgImage: '/img/slayt-1.jpg',
    imageAlt: "Konya Lider Evden Eve Nakliyat büyük boy çelik kasa ev taşıma kamyonu yükleme esnasında"
  },
  {
    id: 2,
    headline: 'Selçuklu ve Meram’da\nAsansörlü Taşıma',
    subheadline: "Konya'nın tüm mahallelerinde yüksek katlı dairelere kendi mobil eşya asansörlerimizle ulaşıyoruz.",
    trustLine: '25. kata kadar ulaşan eşya asansörü filosu.',
    bgImage: '/img/slayt-2.jpg',
    imageAlt: "Konya Selçuklu'da çok katlı binalar için 25. kata kadar kurulabilen mobil teleskopik yük ve eşya taşıma asansörü"
  },
  {
    id: 3,
    headline: 'Mobilya ve Beyaz Eşya\nMontajı Dahil',
    subheadline: 'Gardırop montajını ve beyaz eşya bağlantılarını marangoz ekibimiz ücretsiz yapıyor.',
    trustLine: 'Her taşıma ekibinde 1 sertifikalı marangoz bulunur.',
    bgImage: '/img/slayt-3.jpg',
    imageAlt: "Lider Nakliyat marangoz ekibince yatak odası gardırop demontaj ve paketleme işlemi"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleNext = () => {
    setHasInteracted(true);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setHasInteracted(true);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const selectSlide = (index: number) => {
    setHasInteracted(true);
    setCurrent(index);
  };

  // Keyboard navigation left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autoplay functionality - stops/pauses based on state
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const play = () => {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 6000);
    };

    play();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPlaying, prefersReducedMotion]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <section 
      className="relative w-full min-h-[650px] lg:h-[750px] bg-navy flex items-center overflow-hidden pt-20"
      aria-roledescription="carousel"
      aria-label="Konya Lider Nakliyat Hizmet Tanıtımı"
    >
      {/* Offscreen polite live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slayt {current + 1} / {slides.length}
      </div>

      {/* Background slide images (CSS crossfade, no Framer Motion) */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => {
          const fileKey = slide.bgImage.split('/').pop()?.replace('.jpg', '') || '';
          const blurDataURL = IMAGE_BLURS[fileKey];
          const isActive = idx === current;
          
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                // Disable transition completely if user prefers reduced motion,
                // or if it's the very first render/first slide to prevent LCP delay.
                transitionProperty: (prefersReducedMotion || (!hasInteracted && idx === 0)) ? 'none' : 'opacity'
              }}
            >
              <Image
                src={slide.bgImage}
                alt={slide.imageAlt}
                fill
                priority={idx === 0}
                fetchPriority={idx === 0 ? ("high" as any) : undefined}
                sizes="100vw"
                quality={80}
                placeholder={blurDataURL ? "blur" : undefined}
                blurDataURL={blurDataURL}
                className="object-cover"
              />
            </div>
          );
        })}
        {/* Navy Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40 z-10"></div>
      </div>
      
      {/* Background Graphic overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Design elements */}
      <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-orange/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute left-[-5%] bottom-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-10 lg:py-0">
        
        {/* Left Side: Slider content (7 columns) */}
        <div className="lg:col-span-7 flex flex-col justify-center select-none text-left">
          <div className="relative min-h-[260px] flex flex-col justify-center">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <div
                  key={slide.id}
                  className={`transition-all duration-300 ease-out ${
                    isActive 
                      ? 'opacity-100 translate-y-0 relative z-10' 
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                  style={{
                    transitionProperty: (prefersReducedMotion || (!hasInteracted && idx === 0)) ? 'none' : 'all'
                  }}
                >
                  <span className="text-orange font-bold text-xs md:text-sm tracking-widest mb-3 block">
                    {slide.trustLine}
                  </span>
                  
                  {/* The first slide's headline is rendered as a visible H1 for SEO, other slide headlines are paragraphs */}
                  {idx === 0 ? (
                    <h1 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight whitespace-pre-line mb-4">
                      {slide.headline}
                    </h1>
                  ) : (
                    <p className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight whitespace-pre-line mb-4">
                      {slide.headline}
                    </p>
                  )}

                  <p className="text-gray-200 text-base md:text-lg max-w-xl leading-relaxed mb-6">
                    {slide.subheadline}
                  </p>
                </div>
              );
            })}
          </div>

          {/* FIXED NON-ROTATING LAYER - CTAs: WhatsApp, Konum, Fiyat */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <a
              href={`${SITE.whatsappHref}?text=Merhaba,%20evimi%20taşımak%20istiyorum.%20Hızlı%20teklif%20alabilir%20miyim?`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_tikla', { konum: 'hero_slider', sayfa: window.location.pathname })}
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-orange text-sm md:text-base flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Hızlı WhatsApp</span>
            </a>

            <a
              href={SITE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('harita_tikla', { konum: 'hero_slider', sayfa: window.location.pathname })}
              className="bg-orange hover:bg-white text-navy font-black px-6 py-3.5 rounded-xl border border-orange hover:border-white transition-all duration-200 shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-orange text-sm md:text-base flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              <span>Konuma Git</span>
            </a>

            <Link
              href="/teklif-al"
              className="bg-transparent hover:bg-white/5 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-200 text-sm md:text-base flex items-center gap-2 active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
              <span>Fiyat Hesapla</span>
            </Link>
          </div>

          {/* Bottom fixed Trust strip */}
          <div className="border-t border-white/10 mt-8 pt-4 flex flex-wrap gap-4 text-xs md:text-sm text-gray-300 font-semibold">
            <span className="flex items-center gap-1.5">✓ K3 Yetki Belgeli</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">✓ 20 Yıllık Konya Firması</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">✓ Sabit Fiyat Garantisi</span>
          </div>
        </div>

        {/* Right Side: Embedded QuoteForm Calculator (5 columns, visible on large screens) */}
        <div className="hidden lg:col-span-5 lg:flex flex-col justify-center pl-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-white/10 text-charcoal w-full max-w-[420px] ml-auto">
            <div className="mb-4">
              <span className="text-orange-text font-bold text-[10px] tracking-widest block">ÜCRETSİZ HESAPLAMA</span>
              <h2 className="font-display font-black text-navy text-lg mt-0.5">Anında Tahmini Fiyat Al</h2>
            </div>
            <QuoteForm isInline={true} />
          </div>
        </div>
      </div>

      {/* Manual Navigation Controls & Play/Pause */}
      {!prefersReducedMotion && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => selectSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                idx === current ? 'bg-orange w-8' : 'bg-white/40 hover:bg-white'
              }`}
              style={{ minWidth: '12px', minHeight: '12px' }}
              aria-label={`${idx + 1}. slayda git`}
              aria-current={idx === current ? 'true' : 'false'}
            />
          ))}
          {/* Autoplay Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="ml-2 text-white/60 hover:text-white p-1 rounded-full focus:outline-none focus:ring-1 focus:ring-orange cursor-pointer"
            aria-label={isPlaying ? "Slayt geçişini duraklat" : "Slayt geçişini başlat"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Tailwind handles reduced motion via inline condition, adding extra safety */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-all, .transition-opacity, .transition-transform {
            transition-property: none !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
