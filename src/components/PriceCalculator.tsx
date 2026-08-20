'use client';
// Gerekçe: Adım adım hesaplama sihirbazı (step) ve dinamik form girdi durumları (inputs) yönetimi için useState kullanır.

import React, { useState } from 'react';
import { estimatePrice, PriceInput } from '@/lib/pricing';
import { SITE } from '@/lib/site-config';
import { Calculator, MessageCircle, Phone, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function PriceCalculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  // React State only, no localStorage
  const [rooms, setRooms] = useState<PriceInput['rooms']>('2+1');
  const [distanceType, setDistanceType] = useState<PriceInput['distanceType']>('sehirici');
  const [storage, setStorage] = useState<boolean>(false);

  const [fromFloor, setFromFloor] = useState<number>(3);
  const [toFloor, setToFloor] = useState<number>(4);
  const [fromElevator, setFromElevator] = useState<boolean>(true);
  const [toElevator, setToElevator] = useState<boolean>(true);

  const [packing, setPacking] = useState<boolean>(true);
  const [carpentry, setCarpentry] = useState<boolean>(true);

  // Calculate estimate directly during render (derived state)
  const estimate = estimatePrice({
    rooms,
    fromFloor,
    toFloor,
    fromElevator,
    toElevator,
    distanceType,
    packing,
    carpentry,
    storage
  });

  const handleNextStep = () => {
    setStep((prev) => (prev < 3 ? (prev + 1) as 1 | 2 | 3 : prev));
    if (step === 2) {
      // Log event when calculation is finalized (transitioning to step 3)
      trackEvent('fiyat_hesaplandi', {
        rooms,
        mesafeTipi: distanceType,
        cikisKati: fromFloor,
        varisKati: toFloor,
        minFiyat: estimate?.min,
        maxFiyat: estimate?.max
      });
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev > 1 ? (prev - 1) as 1 | 2 | 3 : prev));
  };

  // Generate WhatsApp message content
  const getWhatsAppLink = () => {
    if (!estimate) return '';
    const text = `Merhaba, Konya Lider Nakliyat web sitesindeki Fiyat Hesaplayıcı ile tahmini bütçe çıkardım:
- Ev Boyutu: ${rooms} Daire
- Mesafe Grubu: ${distanceType === 'sehirici' ? 'Selçuklu / Meram Şehiriçi' : distanceType === 'ilceler' ? 'İlçe Sınırları' : 'Şehirlerarası'}
- Kat Durumu: Giriş ${fromFloor}. Kat (${fromElevator ? 'Asansörlü' : 'Asansörsüz'}) -> Varış ${toFloor}. Kat (${toElevator ? 'Asansörlü' : 'Asansörsüz'})
- Ekstra Hizmetler: Paketleme (${packing ? 'Dahil' : 'Hariç'}), Marangozluk (${carpentry ? 'Dahil' : 'Hariç'}), Depolama (${storage ? 'Dahil' : 'Hariç'})
- Tahmini Bütçe: ${estimate.min.toLocaleString('tr-TR')} ₺ - ${estimate.max.toLocaleString('tr-TR')} ₺

Bu tahmini hesaplama üzerinden detayları netleştirmek ve net teklif almak istiyorum.`;
    return `${SITE.whatsappHref}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-light shadow-xl overflow-hidden text-charcoal">
      {/* Top Banner */}
      <div className="bg-forest p-6 text-white text-center space-y-2">
        <h3 className="font-display font-black text-xl flex items-center justify-center gap-2">
          <Calculator className="w-5 h-5 text-gold" />
          <span>Ev Taşıma Fiyat Hesaplama Robotu</span>
        </h3>
        <p className="text-gray-300 text-xs">
          Daire oda durumunu, katları ve lojistik kapsamı seçerek anında tahmini fiyat alın.
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex justify-between items-center bg-off-white px-8 py-3 border-b border-gray-light">
        <span className={`text-xs font-bold ${step >= 1 ? 'text-gold-text' : 'text-gray-400'}`}>1. Ev & Mesafe</span>
        <div className="h-0.5 bg-gray-300 flex-1 mx-4"></div>
        <span className={`text-xs font-bold ${step >= 2 ? 'text-gold-text' : 'text-gray-400'}`}>2. Kat & Asansör</span>
        <div className="h-0.5 bg-gray-300 flex-1 mx-4"></div>
        <span className={`text-xs font-bold ${step >= 3 ? 'text-gold-text' : 'text-gray-400'}`}>3. Sonuç & Teklif</span>
      </div>

      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rooms Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest uppercase block">Daire Tipi (Oda Sayısı)</label>
                <select
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value as PriceInput['rooms'])}
                  className="w-full bg-off-white border border-gray-light rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                >
                  <option value="1+1">1+1 Daire Eşyası</option>
                  <option value="2+1">2+1 Daire Eşyası</option>
                  <option value="3+1">3+1 Daire Eşyası</option>
                  <option value="4+1+">4+1 ve Daha Büyük Ev</option>
                </select>
              </div>

              {/* Distance Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-forest uppercase block">Taşıma Güzergahı</label>
                <select
                  value={distanceType}
                  onChange={(e) => setDistanceType(e.target.value as PriceInput['distanceType'])}
                  className="w-full bg-off-white border border-gray-light rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                >
                  <option value="sehirici">Konya Şehiriçi (Selçuklu/Meram)</option>
                  <option value="ilceler">Konya İlçeler Arası (Akşehir/Seydişehir vb.)</option>
                  <option value="sehirlerarasi">Şehirlerarası (Konya Dışı 81 İl)</option>
                </select>
              </div>
            </div>

            {/* Storage Question */}
            <div className="flex items-start gap-3 bg-off-white p-4 rounded-xl border border-gray-light/60">
              <input
                type="checkbox"
                id="storage"
                checked={storage}
                onChange={(e) => setStorage(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-gold-text focus:ring-gold border-gray-light cursor-pointer"
              />
              <div>
                <label htmlFor="storage" className="text-xs font-bold text-forest block cursor-pointer select-none">
                  Eşyalarınız Bir Süre Depoda Bekleyecek mi?
                </label>
                <span className="text-[10px] text-gray-400 block leading-tight mt-0.5">Taşınma öncesi veya sonrasında kiralık konteyner depolarında saklama hizmeti ekler.</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNextStep}
                className="bg-gold hover:bg-forest text-forest hover:text-white font-black px-6 py-2.5 rounded-xl border border-forest transition-all duration-200 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Devam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin Details */}
              <div className="space-y-4 bg-off-white p-5 rounded-xl border border-gray-light/60">
                <span className="text-xs font-bold text-gold-text tracking-wider block">YÜKLEME ADRESİ (ÇIKIŞ KATİ)</span>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal block">Bulunduğu Kat</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={fromFloor}
                    onChange={(e) => setFromFloor(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-gray-light rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="fromElevator"
                    checked={fromElevator}
                    onChange={(e) => setFromElevator(e.target.checked)}
                    className="w-4 h-4 rounded text-gold-text focus:ring-gold border-gray-light cursor-pointer"
                  />
                  <label htmlFor="fromElevator" className="text-xs font-bold text-forest cursor-pointer select-none">
                    Dış Cephe Mobil Asansör Kurulsun
                  </label>
                </div>
              </div>

              {/* Destination Details */}
              <div className="space-y-4 bg-off-white p-5 rounded-xl border border-gray-light/60">
                <span className="text-xs font-bold text-gold-text tracking-wider block">TESLİMAT ADRESİ (VARIŞ KATİ)</span>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal block">Hedef Kat</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    value={toFloor}
                    onChange={(e) => setToFloor(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-white border border-gray-light rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="toElevator"
                    checked={toElevator}
                    onChange={(e) => setToElevator(e.target.checked)}
                    className="w-4 h-4 rounded text-gold-text focus:ring-gold border-gray-light cursor-pointer"
                  />
                  <label htmlFor="toElevator" className="text-xs font-bold text-forest cursor-pointer select-none">
                    Dış Cephe Mobil Asansör Kurulsun
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-light">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 hover:bg-gray-300 text-charcoal font-black px-6 py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri Dön</span>
              </button>
              
              <button
                onClick={handleNextStep}
                className="bg-gold hover:bg-forest text-forest hover:text-white font-black px-6 py-2.5 rounded-xl border border-forest transition-all duration-200 text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Fiyatı Hesapla</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && estimate && (
          <div className="space-y-6 animate-fade-in">
            {/* Real-time result breakdown box */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Side: Summary range */}
              <div className="md:col-span-5 bg-forest text-white rounded-2xl p-6 flex flex-col justify-center items-center text-center space-y-3">
                <span className="text-[10px] font-black text-gold tracking-widest block">ÖNGÖRÜLEN BÜTÇE ARALIĞI</span>
                <div className="text-2xl md:text-3xl font-display font-black text-white">
                  {estimate.min.toLocaleString('tr-TR')} ₺ - {estimate.max.toLocaleString('tr-TR')} ₺
                </div>
                <span className="text-[10px] text-gray-300 block">* KDV Dahil Değildir.</span>
              </div>

              {/* Right Side: Breakdown items */}
              <div className="md:col-span-7 bg-off-white rounded-2xl p-5 border border-gray-light flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-forest block">MALİYET KALEMLERİ:</span>
                  <div className="space-y-1.5 text-xs text-charcoal">
                    <div className="flex justify-between border-b border-gray-200 pb-1">
                      <span>✓ Ev Eşyası Baz Taşıma Bedeli</span>
                      <span className="font-bold">+{estimate.breakdown.base.toLocaleString('tr-TR')} ₺</span>
                    </div>
                    {(fromFloor > 0 || toFloor > 0) && (
                      <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span>✓ Bina İçi Yükseklik Yevmiyesi</span>
                        <span className="font-bold">+{estimate.breakdown.floorSurcharge.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    )}
                    {estimate.breakdown.elevatorFee > 0 && (
                      <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span>✓ Mobil Eşya Asansörü Kurulumu</span>
                        <span className="font-bold">+{estimate.breakdown.elevatorFee.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    )}
                    {packing && (
                      <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span>✓ Premium Ambalaj Malzemeleri</span>
                        <span className="font-bold">+{estimate.breakdown.packingFee.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    )}
                    {estimate.breakdown.distanceFee > 0 && (
                      <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span>✓ Şehirlerarası/İlçe Yakıt Payı</span>
                        <span className="font-bold">+{estimate.breakdown.distanceFee.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    )}
                    {storage && (
                      <div className="flex justify-between border-b border-gray-200 pb-1">
                        <span>✓ Kiralık Konteyner Depolama (1 Ay)</span>
                        <span className="font-bold">+{estimate.breakdown.storageFee.toLocaleString('tr-TR')} ₺</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* In-house options config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-light pt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="packingAddon"
                  checked={packing}
                  onChange={(e) => setPacking(e.target.checked)}
                  className="w-4 h-4 rounded text-gold-text focus:ring-gold cursor-pointer"
                />
                <label htmlFor="packingAddon" className="text-xs font-bold text-forest cursor-pointer select-none">
                  Anahtar Teslim Ambalajlama (+{rooms === '1+1' ? '1.500' : rooms === '2+1' ? '2.500' : rooms === '3+1' ? '3.500' : '4.500'} ₺)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="carpentryAddon"
                  checked={carpentry}
                  onChange={(e) => setCarpentry(e.target.checked)}
                  className="w-4 h-4 rounded text-gold-text focus:ring-gold cursor-pointer"
                />
                <label htmlFor="carpentryAddon" className="text-xs font-bold text-forest cursor-pointer select-none">
                  Sertifikalı Marangoz Kurulum Desteği (Ücretsiz)
                </label>
              </div>
            </div>

            {/* Disclaimer required by prompt */}
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-gold-text shrink-0 mt-0.5" />
              <p className="text-[11px] text-forest font-bold leading-relaxed">
                Bu tahmini bir hesaplamadır, kesin fiyat ücretsiz ekspertiz sonrası verilir.
              </p>
            </div>

            {/* Final CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 hover:bg-gray-300 text-charcoal font-black px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Düzenle</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_tikla', { konum: 'price_calculator_final', sayfa: window.location.pathname })}
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-3 px-6 rounded-xl border border-forest transition-all duration-200 text-xs flex items-center justify-center gap-2 flex-1 shadow-md active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Teklifi WhatsApp’a Gönder</span>
              </a>

              <a
                href={SITE.phoneHref}
                onClick={() => trackEvent('telefon_tikla', { konum: 'price_calculator_final', sayfa: window.location.pathname })}
                className="bg-forest hover:bg-gold text-white hover:text-forest font-black py-3 px-6 rounded-xl border border-forest transition-all duration-200 text-xs flex items-center justify-center gap-2 flex-1 shadow-md active:scale-95 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Hemen Arayın: {SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
