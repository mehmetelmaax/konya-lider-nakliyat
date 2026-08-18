'use client';
import { SITE } from '@/lib/site-config';

import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function FloatingCTAs() {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);

  useEffect(() => {
    // Show popups after a slight delay to trigger user visual attraction
    const timer = setTimeout(() => {
      setShowLocationPopup(true);
      setShowWhatsappPopup(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-4 items-end select-none">
      
      {/* 1. Location / Yol Tarifi Popup Card */}
      {showLocationPopup && (
        <div className="bg-forest border border-white/10 text-white rounded-2xl p-4 shadow-2xl max-w-[260px] relative animate-bounce-subtle">
          <button 
            onClick={() => setShowLocationPopup(false)}
            className="absolute top-2 right-2 text-white/50 hover:text-white cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex gap-3 items-start pr-2">
            <div className="bg-gold/20 text-gold p-2 rounded-lg flex-shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gold tracking-wider block">MERKEZ OFİSİMİZ</span>
              <h4 className="font-display font-bold text-xs leading-snug">Yol Tarifi Alın</h4>
              <p className="text-[10px] text-gray-300 leading-relaxed">{SITE.address.locality} / {SITE.address.region} adresimize Google Haritalar ile ulaşın.</p>
              <a 
                href={SITE.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('harita_tikla', { konum: 'floating', sayfa: window.location.pathname })}
                className="text-gold hover:underline text-[10px] font-bold block pt-1.5"
              >
                Haritada Göster &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. WhatsApp Popup Card */}
      {showWhatsappPopup && (
        <div className="bg-white border border-gray-light text-charcoal rounded-2xl p-4 shadow-2xl max-w-[260px] relative animate-fade-in">
          <button 
            onClick={() => setShowWhatsappPopup(false)}
            className="absolute top-2 right-2 text-charcoal/40 hover:text-charcoal cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex gap-3 items-start pr-2">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg flex-shrink-0 mt-0.5 animate-pulse">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 tracking-wider block">WHATSAPP {SITE.hours.whatsapp}</span>
              <h4 className="font-display font-bold text-forest text-xs leading-snug">WhatsApp Destek</h4>
              <p className="text-[10px] text-charcoal leading-relaxed">Eşya fotoğraflarınızı atıp anında hızlı fiyat teklifi alabilirsiniz.</p>
              <a 
                href={`${SITE.whatsappHref}?text=Merhaba,%20evimi%20taşımak%20istiyorum.%20Fiyat%20teklifi%20alabilir%20miyim?`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_tikla', { konum: 'floating', sayfa: window.location.pathname })}
                className="text-emerald-600 hover:underline text-[10px] font-bold block pt-1.5"
              >
                Şimdi Yaz &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
