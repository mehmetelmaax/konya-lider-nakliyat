'use client';

import React, { useState, useRef } from 'react';
import { Send, Phone, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import { QuoteFormSchema } from '@/lib/validation';
import { trackEvent, trackConversion } from '@/lib/analytics';
import { getEstimateFromForm } from '@/lib/pricing';

interface QuoteFormProps {
  isInline?: boolean;
  defaultDistrict?: string;
}

export default function QuoteForm({ isInline = false, defaultDistrict = '' }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    fromDistrict: defaultDistrict || '',
    toDistrict: '',
    rooms: '',
    elevator: 'evet',
    website: '', // honeypot
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);
  
  // Track if form started event has been fired
  const formStartedRef = useRef(false);

  const districts = [
    'Selçuklu',
    'Meram',
    'Karatay',
    'Ereğli',
    'Akşehir',
    'Seydişehir',
    'Ilgın',
    'Diğer (İlçe)',
    'Şehirlerarası (İl Dışı)',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Trigger teklif_formu_basladi event once on first user interaction
    if (!formStartedRef.current && name !== 'website') {
      formStartedRef.current = true;
      trackEvent('teklif_formu_basladi');
    }
  };

  const calculateEstimate = () => {
    return getEstimateFromForm(
      formData.rooms,
      formData.elevator,
      formData.fromDistrict,
      formData.toDistrict
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    setErrorMessage('');

    // Zod Client-side Validation
    const validation = QuoteFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      const newErrors: { [key: string]: string } = {};
      
      Object.keys(fieldErrors).forEach((key) => {
        newErrors[key] = (fieldErrors as any)[key]?.[0] || '';
      });

      setErrors(newErrors);
      setStatus('idle');
      
      // Track Form Error Event
      const errorKeys = Object.keys(newErrors);
      trackEvent('teklif_formu_hata', { hataAlani: errorKeys.join(', ') });

      // Focus on the first invalid field
      if (errorKeys.length > 0) {
        document.getElementById(errorKeys[0])?.focus();
      }
      return;
    }

    try {
      const response = await fetch('/api/teklif', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        const priceRange = calculateEstimate();
        setEstimate(priceRange);
        setStatus('success');

        // Track Form Submit Event
        trackEvent('teklif_formu_gonderildi', {
          fromDistrict: formData.fromDistrict,
          toDistrict: formData.toDistrict,
          rooms: formData.rooms,
          tahminiFiyat: `${priceRange.min}-${priceRange.max}`
        });
        trackConversion();

      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Teklif talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        trackEvent('teklif_formu_hata', { hataAlani: 'server_api' });
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Bağlantı hatası. Lütfen internetinizi kontrol edin veya doğrudan bizi arayın.');
      trackEvent('teklif_formu_hata', { hataAlani: 'connection_error' });
    }
  };

  const getWhatsAppLink = () => {
    const text = `Merhaba, siteden teklif talebi oluşturdum.\nAd: ${formData.name}\nNereden: ${formData.fromDistrict}\nNereye: ${formData.toDistrict}\nOda: ${formData.rooms}\nAsansör: ${formData.elevator === 'evet' ? 'Asansörlü' : 'Asansörsüz'}`;
    return `${SITE.whatsappHref}?text=${encodeURIComponent(text)}`;
  };

  const formFieldsHtml = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot Input: Hidden from screen readers & users but filled by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', opacity: 0, top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}
        value={formData.website}
        onChange={handleInputChange}
      />

      {/* Row 1: Name & Tel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label htmlFor="name" className="text-[10px] font-bold text-navy uppercase tracking-wider block">Adınız Soyadınız *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Örn: Ahmet Yılmaz"
            className={`w-full border rounded px-3 py-2 text-xs bg-off-white focus:outline-none ${
              errors.name ? 'border-rose-500 bg-rose-50' : 'border-gray-light'
            }`}
          />
          {errors.name && <span id="err-name" role="alert" className="text-[10px] text-rose-500 font-semibold block">{errors.name}</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="text-[10px] font-bold text-navy uppercase tracking-wider block">Telefon Numaranız *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            inputMode="tel"
            required
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Örn: 532 123 45 67"
            className={`w-full border rounded px-3 py-2 text-xs bg-off-white focus:outline-none ${
              errors.phone ? 'border-rose-500 bg-rose-50' : 'border-gray-light'
            }`}
          />
          {errors.phone && <span id="err-phone" role="alert" className="text-[10px] text-rose-500 font-semibold block">{errors.phone}</span>}
        </div>
      </div>

      {/* Row 2: Nereden & Nereye */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label htmlFor="fromDistrict" className="text-[10px] font-bold text-navy uppercase tracking-wider block">Nereden Taşınacaksınız? *</label>
          <select
            id="fromDistrict"
            name="fromDistrict"
            required
            aria-required="true"
            aria-invalid={!!errors.fromDistrict}
            aria-describedby={errors.fromDistrict ? 'err-fromDistrict' : undefined}
            value={formData.fromDistrict}
            onChange={handleInputChange}
            className={`w-full border rounded px-2.5 py-2 text-xs bg-off-white focus:outline-none ${
              errors.fromDistrict ? 'border-rose-500 bg-rose-50' : 'border-gray-light'
            }`}
          >
            <option value="">İlçe Seçin</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
          {errors.fromDistrict && <span id="err-fromDistrict" role="alert" className="text-[10px] text-rose-500 font-semibold block">{errors.fromDistrict}</span>}
        </div>

        <div className="space-y-1">
          <label htmlFor="toDistrict" className="text-[10px] font-bold text-navy uppercase tracking-wider block">Nereye Taşınacaksınız? *</label>
          <select
            id="toDistrict"
            name="toDistrict"
            required
            aria-required="true"
            aria-invalid={!!errors.toDistrict}
            aria-describedby={errors.toDistrict ? 'err-toDistrict' : undefined}
            value={formData.toDistrict}
            onChange={handleInputChange}
            className={`w-full border rounded px-2.5 py-2 text-xs bg-off-white focus:outline-none ${
              errors.toDistrict ? 'border-rose-500 bg-rose-50' : 'border-gray-light'
            }`}
          >
            <option value="">İlçe / İl Seçin</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
          {errors.toDistrict && <span id="err-toDistrict" role="alert" className="text-[10px] text-rose-500 font-semibold block">{errors.toDistrict}</span>}
        </div>
      </div>

      {/* Row 3: Oda Sayısı & Asansör */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="space-y-1">
          <label htmlFor="rooms" className="text-[10px] font-bold text-navy uppercase tracking-wider block">Ev Boyutu (Oda Sayısı) *</label>
          <select
            id="rooms"
            name="rooms"
            required
            aria-required="true"
            aria-invalid={!!errors.rooms}
            aria-describedby={errors.rooms ? 'err-rooms' : undefined}
            value={formData.rooms}
            onChange={handleInputChange}
            className={`w-full border rounded px-2.5 py-2 text-xs bg-off-white focus:outline-none ${
              errors.rooms ? 'border-rose-500 bg-rose-50' : 'border-gray-light'
            }`}
          >
            <option value="">Boyut Seçin</option>
            <option value="1+1">1+1 Daire</option>
            <option value="2+1">2+1 Daire</option>
            <option value="3+1">3+1 Daire</option>
            <option value="4+1+">4+1 veya Daha Büyük</option>
            <option value="ofis">Ofis / İşyeri</option>
          </select>
          {errors.rooms && <span id="err-rooms" role="alert" className="text-[10px] text-rose-500 font-semibold block">{errors.rooms}</span>}
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold text-navy tracking-wider block">EŞYA ASANSÖRÜ *</span>
          <div className="flex gap-4 pt-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none">
              <input
                type="radio"
                name="elevator"
                value="evet"
                checked={formData.elevator === 'evet'}
                onChange={handleInputChange}
                className="w-3.5 h-3.5 text-orange-text focus:ring-orange"
              />
              <span>Kurulsun</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none">
              <input
                type="radio"
                name="elevator"
                value="hayir"
                checked={formData.elevator === 'hayir'}
                onChange={handleInputChange}
                className="w-3.5 h-3.5 text-orange-text focus:ring-orange"
              />
              <span>İstemiyorum</span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-orange hover:bg-navy text-navy hover:text-white font-black py-3.5 rounded transition-all duration-200 border border-navy shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-orange text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Fiyat Teklifi Al</span>
          </>
        )}
      </button>
    </form>
  );

  const successHtml = (
    <div className="text-center py-4 space-y-4 flex flex-col items-center">
      <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-full">
        <CheckCircle className="w-8 h-8" />
      </div>
      
      <div className="space-y-1">
        <h3 className="font-display font-black text-navy text-xl">Talebiniz Alındı!</h3>
        <p className="text-charcoal text-xs font-semibold">Müşteri temsilcimiz 15 dakika içinde sizi arayacaktır.</p>
        <p className="text-charcoal text-[11px] font-medium pt-1">Tahmini taşınma maliyet aralığınız:</p>
      </div>

      <div className="bg-navy text-white rounded px-6 py-3 font-display font-black text-xl tracking-wide">
        {estimate ? `${estimate.min.toLocaleString('tr-TR')} TL - ${estimate.max.toLocaleString('tr-TR')} TL` : 'Hesaplanıyor...'}
      </div>

      <div className="flex flex-col gap-2.5 w-full pt-4">
        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_tikla', { konum: 'form_basari', sayfa: window.location.pathname })}
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-3 rounded-xl border border-navy transition-all duration-200 shadow-md text-xs flex items-center justify-center gap-2 w-full"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Hızlı WhatsApp Görüşmesi Başlat</span>
        </a>

        {/* Call Button */}
        <a
          href={SITE.phoneHref}
          onClick={() => trackEvent('telefon_tikla', { konum: 'form_basari', sayfa: window.location.pathname })}
          className="bg-orange hover:bg-navy text-navy hover:text-white font-black py-3 rounded-xl border border-navy transition-all duration-200 shadow-md text-xs flex items-center justify-center gap-2 w-full"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Hemen Ara: {SITE.phoneDisplay}</span>
        </a>
      </div>

      <div className="pt-4 border-t border-gray-light w-full">
        <Link href="/tasinma-kontrol-listesi" className="text-navy hover:text-orange-text font-bold text-xs uppercase tracking-wider block">
          Taşınma Kontrol Listesine Göz Atın &rarr;
        </Link>
      </div>
    </div>
  );

  const errorHtml = (
    <div className="text-center py-4 space-y-4 flex flex-col items-center">
      <div className="bg-rose-100 text-rose-600 p-2.5 rounded-full">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="font-display font-black text-navy text-xl">Gönderim Başarısız</h3>
        <p className="text-charcoal text-xs font-semibold">{errorMessage}</p>
      </div>

      <p className="text-xs text-charcoal font-medium">Alternatif olarak doğrudan bize ulaşarak anında fiyat alabilirsiniz:</p>

      <div className="flex flex-col gap-2.5 w-full pt-2">
        <a
          href={SITE.phoneHref}
          onClick={() => trackEvent('telefon_tikla', { konum: 'form_hata_cta', sayfa: window.location.pathname })}
          className="bg-orange hover:bg-navy text-navy hover:text-white font-black py-3 rounded-xl border border-navy transition-all duration-200 shadow-md text-xs flex items-center justify-center gap-2 w-full"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Hemen Arayın: {SITE.phoneDisplay}</span>
        </a>

        <button
          onClick={() => setStatus('idle')}
          className="text-navy hover:underline text-xs font-bold pt-2 cursor-pointer"
        >
          Formu Yeniden Düzenle
        </button>
      </div>
    </div>
  );

  // If inline (rendered inside Hero card), skip the section styling wrapper and headings
  if (isInline) {
    return (
      <div className="text-charcoal text-left">
        {status === 'success' ? successHtml : status === 'error' ? errorHtml : formFieldsHtml}
      </div>
    );
  }

  // Default section wrapper layout
  return (
    <section className="py-20 bg-navy relative text-white" id="iletisim">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-orange-text font-bold text-xs tracking-widest">ANINDA TEKLİF</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-tight">
              Taşınma Maliyetini Hemen Hesaplayın
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Oda sayısını ve kat durumunuzu seçin, Konya içi ve şehirlerarası taşınma fiyat aralığınızı anında görün.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs md:text-sm text-gray-300 font-semibold">
              <div className="flex items-center gap-3">
                <span className="bg-orange/20 text-orange p-2 rounded-full">✓</span>
                <span>Bilgileriniz üçüncü şahıslarla paylaşılmaz.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-orange/20 text-orange p-2 rounded-full">✓</span>
                <span>E-posta adresi istemiyoruz, spam göndermiyoruz.</span>
              </div>
            </div>
          </div>

          {/* Right Form card */}
          <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-white/10 shadow-2xl text-charcoal">
            {status === 'success' ? successHtml : status === 'error' ? errorHtml : formFieldsHtml}
          </div>

        </div>
      </div>
    </section>
  );
}
