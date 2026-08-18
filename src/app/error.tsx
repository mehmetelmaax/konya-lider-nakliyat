'use client';

import React, { useEffect } from 'react';
import { SITE } from '@/lib/site-config';
import { Phone, MessageCircle, RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely to console or analytical platforms
    console.error('Application Error captured:', error);
  }, [error]);

  return (
    <main className="pt-24 bg-off-white min-h-screen flex flex-col justify-between">
      {/* Error Hero */}
      <section className="py-16 bg-navy text-white text-center space-y-4">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-orange animate-pulse" />
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
          Bir Hata Oluştu
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4">
          Sayfa yüklenirken beklenmedik bir sistem hatası meydana geldi. Ekibimiz sorun hakkında bilgilendirildi.
        </p>
      </section>

      {/* User Actions */}
      <section className="py-12 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-6">
          <p className="text-charcoal text-sm md:text-base">
            Lütfen aşağıdaki butona tıklayarak sayfayı yeniden yüklemeyi deneyin.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => reset()}
              className="bg-orange hover:bg-navy text-navy hover:text-white font-black px-6 py-3.5 rounded-xl border border-orange hover:border-navy transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Yeniden Dene</span>
            </button>
          </div>
        </div>

        {/* Alternative Support Call */}
        <div className="bg-orange/10 p-6 rounded-xl border border-orange/20 space-y-4">
          <span className="font-bold text-navy block">Sorun Devam Ediyor Mu?</span>
          <p className="text-charcoal text-xs md:text-sm">
            Eğer hata almaya devam ediyorsanız, bizimle doğrudan telefon veya WhatsApp hattımız üzerinden iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={SITE.phoneHref}
              className="bg-navy hover:bg-orange text-white hover:text-navy font-bold px-5 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>{SITE.phoneDisplay}</span>
            </a>
            <a
              href={`${SITE.whatsappHref}?text=Sitede%20hata%20aliyorum.`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-5 py-3 rounded-lg text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Destek</span>
            </a>
          </div>
        </div>
      </section>

      {/* Spacing cushion */}
      <div className="py-6"></div>
    </main>
  );
}
