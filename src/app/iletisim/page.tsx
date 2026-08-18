import { SITE } from '@/lib/site-config';
import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { localBusinessSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'İletişim | Konya Lider Nakliyat',
  description: "Konya Lider Nakliyat Selçuklu ofis iletişim bilgileri. Fiyat teklifi almak, rezervasyon yapmak veya bilgi edinmek için bize ulaşın.",
  alternates: {
    canonical: '/iletisim',
  },
};

export default function IletisimPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'İletişim', url: '/iletisim' }]} className="pt-4" />
        {/* Intro */}
        <section className="py-16 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            BİZE ULAŞIN
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            İletişim Bilgilerimiz
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Taşınma planınız için teklif almak veya rezervasyon yapmak üzere bizimle irtibata geçin.
          </p>
        </section>

        {/* Contact Info & Simple form */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
                <h2 className="font-display font-bold text-forest text-xl border-b border-gray-light pb-3">
                  Ofis ve İletişim Detayları
                </h2>
                
                <div className="space-y-4 text-sm text-charcoal">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-forest block mb-0.5">Adres:</span>
                      <p>{SITE.address.street}, {SITE.address.locality} / {SITE.address.region}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-forest block mb-0.5">Telefon / GSM:</span>
                      <a href={SITE.phoneHref} className="hover:text-gold transition-colors font-bold">
                        {SITE.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-forest block mb-0.5">E-Posta:</span>
                      <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-forest block mb-0.5">Çalışma Saatleri:</span>
                      <p>Hafta İçi ve Hafta Sonu: {SITE.hours.opens} – {SITE.hours.closes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Google Maps Location Embed */}
            <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-gray-light shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-forest text-xl border-b border-gray-light pb-3">
                  Google Haritalar Ofis Konumumuz
                </h2>
                <p className="text-charcoal text-xs md:text-sm leading-relaxed font-semibold">
                  Selçuklu merkezli garajımız ve ofisimize ait harita konumu aşağıda yer almaktadır. Yol tarifi almak için haritayı kullanabilir veya alttaki butona tıklayabilirsiniz.
                </p>
              </div>

              {/* Map Iframe */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-light shadow-inner bg-forest/5 relative">
                <iframe
                  title="Konya Lider Nakliyat Google Harita Konumu"
                  src="https://maps.google.com/maps?q=Konya%20Lider%20Evden%20Eve%20Nakliyat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Yol Tarifi Button */}
              <a
                href="https://share.google/YoiHqgk0tx65LVd0H"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-forest text-forest hover:text-white font-black py-3.5 px-6 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md w-full text-center"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Haritalar'da Yol Tarifi Alın</span>
              </a>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
