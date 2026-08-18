'use client';

import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  timeframe: '30_days' | '15_days' | '7_days' | '1_day' | 'moving_day';
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: '1', timeframe: '30_days', text: 'Konya Lider Nakliyat ile görüşerek taşınma tarihi rezervasyonunu yapın.' },
  { id: '2', timeframe: '30_days', text: 'Yeni evdeki aboneliklerin (internet, elektrik, su, gaz) altyapı durumunu kontrol edin.' },
  { id: '3', timeframe: '30_days', text: 'Evde kullanılmayan fazla eşyaları tespit edip ayırın veya bağışlayın.' },
  { id: '4', timeframe: '15_days', text: 'Eski adresteki aboneliklerin (ASKİ, Enerjisa, Aksa) kapatılması için başvuruları yapın.' },
  { id: '5', timeframe: '15_days', text: 'Çocukların okul nakil ve kayıt taşıma işlemlerini e-Okul üzerinden başlatın.' },
  { id: '6', timeframe: '15_days', text: 'Değerli eşyalar, tapu, altın ve mücevherat için güvenli çanta hazırlayın.' },
  { id: '7', timeframe: '7_days', text: 'Kendiniz paketleyecekseniz koli ve bant tedarik edip mutfak kolilemelerine başlayın.' },
  { id: '8', timeframe: '7_days', text: 'Apartman yönetimine haber vererek taşınma günü asansör ve kamyon park yerini ayırtın.' },
  { id: '9', timeframe: '7_days', text: 'Abonelik nakil işlemlerinde yeni evin sayaç numaralarını sisteme kaydettirin.' },
  { id: '10', timeframe: '1_day', text: 'Buzdolabındaki yiyecekleri tüketin veya taşıma için termal kutular hazırlayın.' },
  { id: '11', timeframe: '1_day', text: 'Buzdolabını de-frost edin (eritin) ve taşınmadan en az 4 saat önce kapatın.' },
  { id: '12', timeframe: '1_day', text: 'De-montajı yapılacak elektroniklerin ve televizyon arkası kablolarının fotoğrafını çekin.' },
  { id: '13', timeframe: 'moving_day', text: 'Değerli evrak ve cüzdanlarınızı kendi çantanızda güvene alın.' },
  { id: '14', timeframe: 'moving_day', text: 'Kamyona ilk yüklenecek ve en son inecek acil ihtiyaç kolisi hazırlayın.' },
  { id: '15', timeframe: 'moving_day', text: 'Tüm odalar boşaldıktan sonra sayaçların son durumlarını fotoğraflayın.' }
];

export default function MovingChecklist() {
  // State only, no localStorage to avoid hydration issues and comply with guidelines
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getPercentage = () => {
    const total = CHECKLIST_ITEMS.length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / total) * 100);
  };

  const renderSection = (timeframe: ChecklistItem['timeframe'], title: string) => {
    const items = CHECKLIST_ITEMS.filter((item) => item.timeframe === timeframe);
    return (
      <div className="space-y-3">
        <h3 className="font-display font-bold text-navy text-sm md:text-base border-l-4 border-orange pl-3">
          {title}
        </h3>
        <ul className="space-y-2 text-xs md:text-sm pl-2">
          {items.map((item) => (
            <li key={item.id} className="flex gap-2.5 items-start">
              <input
                type="checkbox"
                id={`check-${item.id}`}
                checked={!!checkedItems[item.id]}
                onChange={() => handleToggle(item.id)}
                className="w-4 h-4 mt-0.5 rounded text-orange-text focus:ring-orange border-gray-light cursor-pointer print:hidden"
              />
              <span className="print:before:content-['[__]_'] print:before:font-mono"></span>
              <label
                htmlFor={`check-${item.id}`}
                className={`cursor-pointer select-none leading-relaxed ${
                  checkedItems[item.id] ? 'line-through text-gray-400' : 'text-charcoal'
                }`}
              >
                {item.text}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 text-charcoal print:p-0 print:border-none print:shadow-none">
      
      {/* Header section (styled differently for print media) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-light pb-4 print:border-none">
        <div>
          <h2 className="font-display font-black text-navy text-xl md:text-2xl">
            İnteraktif Ev Taşıma Kontrol Listesi
          </h2>
          <p className="text-xs text-charcoal/80 leading-relaxed mt-1">
            Konya Lider Nakliyat tarafından hazırlanan adım adım taşınma takip çizelgesi.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 print:hidden">
          <div className="bg-navy/5 border border-navy/10 px-4 py-2 rounded-xl text-center flex-1 sm:flex-none">
            <span className="text-[10px] font-black text-navy block">TAMAMLANAN</span>
            <span className="font-display font-black text-navy text-lg">{getPercentage()}%</span>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-orange hover:bg-navy text-navy hover:text-white font-black py-2.5 px-4 rounded-xl border border-navy transition-all duration-200 text-xs uppercase tracking-wider cursor-pointer active:scale-95 shrink-0"
          >
            Yazdır (PDF)
          </button>
        </div>
      </div>

      {/* Main Checklist items */}
      <div className="space-y-6">
        {renderSection('30_days', 'Taşınmadan 30 Gün Önce Yapılacaklar')}
        {renderSection('15_days', 'Taşınmadan 15 Gün Önce Yapılacaklar')}
        {renderSection('7_days', 'Taşınmadan 7 Gün Önce Yapılacaklar')}
        {renderSection('1_day', 'Son 1 Gün Kala Yapılacaklar')}
        {renderSection('moving_day', 'Taşınma Günü Yapılacaklar')}
      </div>

      {/* CSS @media print style */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, footer, .print\\:hidden, #iletisim, nav, .RelatedLinks {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
            background: white !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>

    </div>
  );
}
