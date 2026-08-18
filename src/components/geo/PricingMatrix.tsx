import React from 'react';
import { FACTS } from '@/lib/facts';

export default function PricingMatrix() {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 overflow-hidden text-charcoal">
      <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
        Konya Ev Taşıma Oda, Mesafe ve Kat Fiyat Matrisi
      </h2>
      <p className="text-xs md:text-sm text-charcoal leading-relaxed">
        Konya genelindeki evden eve nakliyat operasyonlarında tahmini maliyet aralıkları daire büyüklüğüne (oda sayısına), gidilecek yol mesafesine ve kat yüksekliklerine göre belirlenmektedir. Aşağıda, Konya Lider Nakliyat tarafından sunulan 2026 yılı güncel lojistik fiyat aralıkları listelenmiştir:
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <caption>Konya Ev Taşıma Fiyat Tarifeleri Matrisi (2026)</caption>
          <thead>
            <tr className="bg-forest text-white">
              <th scope="col" className="p-3 font-display rounded-tl-lg">Daire Tipi</th>
              <th scope="col" className="p-3 font-display">Şehiriçi (Selçuklu/Meram)</th>
              <th scope="col" className="p-3 font-display">İlçeler Arası (Seydişehir/Akşehir vb.)</th>
              <th scope="col" className="p-3 font-display rounded-tr-lg">Şehirlerarası (300 Km)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-light">
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">1+1 Daire</th>
              <td className="p-3">₺{FACTS.priceMin.toLocaleString('tr-TR')} - ₺15.000</td>
              <td className="p-3">₺15.000 - ₺18.000</td>
              <td className="p-3 font-semibold text-gold-text">₺22.000 - ₺26.000</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">2+1 Daire</th>
              <td className="p-3">₺15.000 - ₺20.000</td>
              <td className="p-3">₺18.000 - ₺23.000</td>
              <td className="p-3 font-semibold text-gold-text">₺27.000 - ₺32.000</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">3+1 Daire</th>
              <td className="p-3">₺18.000 - ₺23.000</td>
              <td className="p-3">₺21.000 - ₺26.000</td>
              <td className="p-3 font-semibold text-gold-text">₺34.000 - ₺40.000</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">4+1 Daire</th>
              <td className="p-3">₺22.000 - ₺{FACTS.priceMax.toLocaleString('tr-TR')}</td>
              <td className="p-3">₺25.000 - ₺31.000</td>
              <td className="p-3 font-semibold text-gold-text">₺42.000 - ₺48.000</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="text-[10px] text-charcoal/70 italic border-l-2 border-gold pl-3">
        * Tablodaki fiyatlar normal eşya yoğunluğuna sahip binalardaki asansör kurulumlarını kapsamaktadır. Giriş kat veya 1. kat taşımalarında asansör kurulmadığı için fiyatlar daha düşük seviyede uygulanır.
      </p>
    </div>
  );
}
