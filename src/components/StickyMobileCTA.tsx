'use client';
import { SITE } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Accessing scrollY only. Avoid querySelector/scrollHeight calls
      // to eliminate reflow/layout-thrashing on scroll events.
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-30 md:hidden bg-navy/90 backdrop-blur-md border-t border-white/10 px-4 py-3 shadow-xl">
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto pb-[env(safe-area-inset-bottom)]">
        
        {/* Call button */}
        <a
          href={SITE.phoneHref}
          onClick={() => trackEvent('telefon_tikla', { konum: 'sticky', sayfa: window.location.pathname })}
          className="flex items-center justify-center gap-2 bg-orange text-navy font-black py-3 rounded border border-navy shadow-md active:scale-95 text-sm select-none"
        >
          <Phone className="w-4 h-4" />
          <span>Hemen Ara</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={`${SITE.whatsappHref}?text=Merhaba,%20evimi%20taşımak%20istiyorum.%20Fiyat%20teklifi%20alabilir%20miyim?`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_tikla', { konum: 'sticky', sayfa: window.location.pathname })}
          className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded shadow-md active:scale-95 text-sm select-none"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp Yaz</span>
        </a>

      </div>
    </div>
  );
}
