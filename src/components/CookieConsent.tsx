'use client';
// Gerekçe: Kullanıcının çerez izni durumunu tarayıcı depolamasında (localStorage) okumak, yazmak ve göstermek için useState/useEffect kullanır.

import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given/denied
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Set default denied consent state on load (Consent Mode v2)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied',
        });
      }
      // Defer state update to avoid synchronous cascading renders
      setTimeout(() => setIsVisible(true), 0);
    }
  }, []);

  const handleConsent = (status: 'granted' | 'denied') => {
    localStorage.setItem('cookie_consent', status);
    setIsVisible(false);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
        'analytics_storage': status,
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-forest text-white p-6 rounded-2xl border border-white/10 shadow-2xl z-50 transition-all duration-300 animate-slide-up flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="bg-gold/10 p-2 rounded-lg text-gold shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-bold text-sm tracking-tight">Çerez Tercihleriniz</h4>
          <p className="text-gray-300 text-xs leading-relaxed">
            Size en iyi hizmeti sunabilmek, site trafiğimizi analiz etmek ve reklamlarımızı kişiselleştirmek için çerezleri kullanıyoruz.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 justify-end text-xs font-bold pt-2">
        <button
          onClick={() => handleConsent('denied')}
          className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg cursor-pointer"
        >
          Reddet
        </button>
        <button
          onClick={() => handleConsent('granted')}
          className="bg-gold hover:bg-white text-forest px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
