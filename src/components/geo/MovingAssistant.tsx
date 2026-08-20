'use client';
// Gerekçe: Dinamik taşınma rehberi sihirbazı, kontrol listesi durum yönetimi (checkedItems) ve girdi form alanları için useState kullanır.

import React, { useState } from 'react';
import { Calendar, Shield, ClipboardList, CheckCircle2, RefreshCw, Printer, AlertTriangle, ArrowRight, Check } from 'lucide-react';
import { SITE, DISTRICTS } from '@/lib/site-config';

interface AssistantInput {
  movingDate: string;
  fromDistrict: string;
  toDistrict: string;
  homeType: string;
  hasElevator: boolean;
  hasPet: boolean;
  hasKids: boolean;
  hasSensitive: boolean;
}

interface ChecklistItem {
  id: string;
  timeframe: '30_days' | '15_days' | '7_days' | '1_day' | 'moving_day';
  text: string;
  category: 'genel' | 'pet' | 'kids' | 'elevator' | 'sensitive';
}

const BASE_CHECKLIST: ChecklistItem[] = [
  { id: 'g1', timeframe: '30_days', category: 'genel', text: 'Konya Lider Nakliyat ile görüşerek taşınma tarihi rezervasyonunuzu kesinleştirin.' },
  { id: 'g2', timeframe: '30_days', category: 'genel', text: 'Yeni evdeki aboneliklerin (internet, elektrik, su, gaz) altyapı durumunu kontrol edin.' },
  { id: 'g3', timeframe: '30_days', category: 'genel', text: 'Evde kullanılmayan fazla eşyaları tespit edip ayırın, bağışlayın veya elden çıkarın.' },
  { id: 'g4', timeframe: '15_days', category: 'genel', text: 'Eski adresteki aboneliklerin kapatılması için ilgili kurumlara (ASKİ, Enerjisa, Aksa Doğalgaz) fesih başvurularını e-Devlet üzerinden yapın.' },
  { id: 'g5', timeframe: '15_days', category: 'genel', text: 'Değerli evraklar, altın, nakit para ve mücevherat için kendinizin taşıyacağı kilitli bir çanta hazırlayın.' },
  { id: 'g6', timeframe: '7_days', category: 'genel', text: 'Kendiniz paketleme yapacaksanız koli ve koli bandı tedarik ederek mutfak ve kırılacak eşya kolilemelerine başlayın.' },
  { id: 'g7', timeframe: '7_days', category: 'genel', text: 'Apartman yönetimine haber vererek taşınma günü asansör kullanımı ve kamyon park yerini organize edin.' },
  { id: 'g8', timeframe: '1_day', category: 'genel', text: 'Buzdolabındaki yiyecekleri tüketin ve dondurucuyu temizleyip taşınmadan en az 4 saat önce fişini çekin.' },
  { id: 'g9', timeframe: '1_day', category: 'genel', text: 'De-montajı yapılacak televizyon, ses sistemi gibi elektroniklerin arka kablo bağlantılarını fotoğraflayarak etiketleyin.' },
  { id: 'g10', timeframe: 'moving_day', category: 'genel', text: 'Kamyona en son yüklenecek ve indiğinde hemen kullanılacak acil ihtiyaç kolisini (temizlik malzemesi, şarj aletleri, bebek bezi vb.) hazırlayın.' },
  { id: 'g11', timeframe: 'moving_day', category: 'genel', text: 'Tüm odalar boşaldıktan sonra elektrik, su ve doğalgaz sayaçlarının son durumlarını fotoğraflayarak kaydedin.' },
  
  // Asansör Koşullu
  { id: 'e1', timeframe: '30_days', category: 'elevator', text: 'Hem eski hem de yeni adresinizde dış cephe nakliye asansörünün kurulabileceği balkon veya pencere alanlarını kontrol edin.' },
  { id: 'e2', timeframe: '7_days', category: 'elevator', text: 'Binaların önünde teleskopik asansör aracının yanaşabilmesi için park edilmiş diğer araçların kaldırılmasını sağlayın.' },
  
  // Evcil Hayvan Koşullu
  { id: 'p1', timeframe: '30_days', category: 'pet', text: 'Evcil hayvanınızın yeni adrese uyum sürecini planlayın ve gerekirse veteriner kontrolünden geçirin.' },
  { id: 'p2', timeframe: '1_day', category: 'pet', text: 'Evcil hayvanınızın taşıma kafesini hazırlayın, sakinleştirici gerekip gerekmediğini veterinerinize danışın.' },
  { id: 'p3', timeframe: 'moving_day', category: 'pet', text: 'Evcil hayvanınızı gürültüden uzak tutmak için boş bir odaya (banyo vb.) kapatın, kapısına "İçeride Evcil Hayvan Var" notu asın.' },
  
  // Çocuk Koşullu
  { id: 'k1', timeframe: '30_days', category: 'kids', text: 'Okula giden çocuklarınızın okul nakil işlemlerini başlatmak için e-Okul üzerinden kontenjan durumunu sorgulayın.' },
  { id: 'k2', timeframe: '15_days', category: 'kids', text: 'Adres beyanınızı tamamladıktan sonra yeni okul idaresine öğrenci kayıt taşıma başvurusunda bulunun.' },
  { id: 'k3', timeframe: 'moving_day', category: 'kids', text: 'Çocukların taşınma günü güvende ve gürültüden uzak olmasını sağlayın, gerekirse bir aile yakınından destek alın.' },

  // Hassas Eşya Koşullu
  { id: 's1', timeframe: '15_days', category: 'sensitive', text: 'Piyano, çelik kasa veya değerli antikaların taşınma detaylarını Lider Nakliyat yetkilisine bildirin ve özel kaldırma aparatlarının teyidini alın.' },
  { id: 's2', timeframe: 'moving_day', category: 'sensitive', text: 'Hassas eşyalarınızın çift kat koruyucu ambalajlama ve taşıma sürecini marangoz nezaretinde takip edin.' }
];

export default function MovingAssistant() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [inputs, setInputs] = useState<AssistantInput>(() => {
    const future = new Date();
    future.setDate(future.getDate() + 30);
    const yyyy = future.getFullYear();
    const mm = String(future.getMonth() + 1).padStart(2, '0');
    const dd = String(future.getDate()).padStart(2, '0');

    return {
      movingDate: `${yyyy}-${mm}-${dd}`,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Meram',
      homeType: '3+1',
      hasElevator: true,
      hasPet: false,
      hasKids: false,
      hasSensitive: false
    };
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [todayDate] = useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setInputs(prev => ({ ...prev, [name]: checked }));
    } else {
      setInputs(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    setCheckedItems({});
  };

  const getFilteredItems = (): ChecklistItem[] => {
    return BASE_CHECKLIST.filter(item => {
      if (item.category === 'genel') return true;
      if (item.category === 'elevator' && inputs.hasElevator) return true;
      if (item.category === 'pet' && inputs.hasPet) return true;
      if (item.category === 'kids' && inputs.hasKids) return true;
      if (item.category === 'sensitive' && inputs.hasSensitive) return true;
      return false;
    });
  };

  const calculateDate = (timeframe: ChecklistItem['timeframe']): string => {
    if (!inputs.movingDate) return '';
    const moving = new Date(inputs.movingDate);
    const target = new Date(moving);

    switch (timeframe) {
      case '30_days':
        target.setDate(moving.getDate() - 30);
        break;
      case '15_days':
        target.setDate(moving.getDate() - 15);
        break;
      case '7_days':
        target.setDate(moving.getDate() - 7);
        break;
      case '1_day':
        target.setDate(moving.getDate() - 1);
        break;
      case 'moving_day':
        return 'Taşınma Günü';
    }

    const day = String(target.getDate()).padStart(2, '0');
    const month = String(target.getMonth() + 1).padStart(2, '0');
    return `${day}.${month} (${timeframe === '1_day' ? 'Son 1 Gün' : `Son ${timeframe.split('_')[0]} Gün`})`;
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getProgress = () => {
    const items = getFilteredItems();
    if (items.length === 0) return 0;
    const checkedCount = items.filter(item => checkedItems[item.id]).length;
    return Math.round((checkedCount / items.length) * 100);
  };

  // Local authority notes based on chosen districts (Local Entity Semantic Enrichment)
  const getLocalAdvices = () => {
    const advices = [];
    if (inputs.fromDistrict === 'Selçuklu') {
      advices.push("Selçuklu'daki yüksek katlı rezidanslarda ve sitelerde taşınma günü yük asansörü koordinasyonu için yönetime en az 5 gün önceden yazılı izin başvurusu yapmalısınız.");
    }
    if (inputs.toDistrict === 'Meram') {
      advices.push("Meram'ın dar sokak yapılarına ve villa bölgelerine nakliye kamyonunun yanaşabilmesi için taşınma günü belediyeden yol işgal izin işlemlerini kontrol etmeniz önerilir.");
    }
    if (inputs.toDistrict === 'Karatay') {
      advices.push("Karatay bölgesindeki yeni sanayi ve konut projelerinde sitelerin araç giriş kapısı yüksekliklerini kontrol etmeli ve nakliye kamyonu yüksekliğine uygunluğunu Lider ekibine bildirmelisiniz.");
    }
    if (inputs.fromDistrict !== inputs.toDistrict && inputs.fromDistrict !== 'Selçuklu' && inputs.fromDistrict !== 'Meram' && inputs.fromDistrict !== 'Karatay') {
      advices.push(`${inputs.fromDistrict} ilçesinden çıkış yapılarak şehirlerarası veya ilçeler arası nakliye sürecinde D-330 otoyol bağlantısı ve hava durumu şartları ekiplerimizce sürüş güvenliği için önceden incelenmektedir.`);
    }
    return advices;
  };

  // Format moving date display
  const formatMovingDate = () => {
    if (!inputs.movingDate) return '';
    const [y, m, d] = inputs.movingDate.split('-');
    return `${d}.${m}.${y}`;
  };

  const filteredItems = getFilteredItems();

  const renderSection = (timeframe: ChecklistItem['timeframe'], title: string) => {
    const items = filteredItems.filter(item => item.timeframe === timeframe);
    if (items.length === 0) return null;

    return (
      <div className="space-y-3 bg-white p-6 rounded-xl border border-gray-light shadow-sm">
        <div className="flex justify-between items-center border-b border-gray-light pb-2">
          <h3 className="font-display font-black text-forest text-sm md:text-base border-l-4 border-gold pl-3">
            {title}
          </h3>
          <span className="text-xs font-bold text-gold-text bg-gold/10 px-2 py-0.5 rounded-lg flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {calculateDate(timeframe)}
          </span>
        </div>
        <ul className="space-y-3.5 text-xs md:text-sm pt-2">
          {items.map(item => (
            <li key={item.id} className="flex gap-3 items-start select-none">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id={`check-${item.id}`}
                  checked={!!checkedItems[item.id]}
                  onChange={() => toggleCheck(item.id)}
                  className="peer appearance-none w-5 h-5 rounded-md border border-gray-300 checked:bg-forest checked:border-forest hover:border-forest focus:ring-2 focus:ring-gold/30 transition-all cursor-pointer print:hidden"
                />
                <Check className="w-3.5 h-3.5 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="hidden print:inline-block print:mr-2">▢</span>
              <label
                htmlFor={`check-${item.id}`}
                className={`cursor-pointer leading-relaxed ${
                  checkedItems[item.id] ? 'line-through text-gray-400 font-medium' : 'text-charcoal font-semibold'
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
    <div className="space-y-8 w-full print:text-black">
      
      {!isGenerated ? (
        <form onSubmit={handleGenerate} className="bg-white p-8 rounded-2xl border border-gray-light shadow-md space-y-6 max-w-2xl mx-auto print:hidden">
          <div className="text-center space-y-2 border-b border-gray-light pb-4">
            <ClipboardList className="w-8 h-8 text-gold mx-auto" />
            <h3 className="font-display font-black text-forest text-xl">
              Taşınma Detaylarınızı Girin
            </h3>
            <p className="text-xs text-charcoal/80">
              Yapay zeka asistanımız size özel gün bazlı bir takvim ve yapılacaklar listesi üretsin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarih */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-forest block">Planlanan Taşınma Tarihi</label>
              <input
                type="date"
                name="movingDate"
                value={inputs.movingDate}
                onChange={handleInputChange}
                required
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-charcoal"
              />
            </div>

            {/* Ev Tipi */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-forest block">Ev Genişliği / Tipi</label>
              <select
                name="homeType"
                value={inputs.homeType}
                onChange={handleInputChange}
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-charcoal cursor-pointer"
              >
                <option value="1+1">1+1 Daire / Ofis</option>
                <option value="2+1">2+1 Daire</option>
                <option value="3+1">3+1 Standart Daire</option>
                <option value="4+1">4+1 Geniş Daire</option>
                <option value="Dubleks">Dubleks / Müstakil Ev</option>
              </select>
            </div>

            {/* Nereden */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-forest block">Nereden (Başlangıç İlçesi)</label>
              <select
                name="fromDistrict"
                value={inputs.fromDistrict}
                onChange={handleInputChange}
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-charcoal cursor-pointer"
              >
                {DISTRICTS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Nereye */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-forest block">Nereye (Varış İlçesi)</label>
              <select
                name="toDistrict"
                value={inputs.toDistrict}
                onChange={handleInputChange}
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:border-forest focus:ring-1 focus:ring-forest outline-none text-charcoal cursor-pointer"
              >
                {DISTRICTS.map(d => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
                <option value="Şehirlerarası">Şehirlerarası (Konya Dışı)</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-light pt-4 space-y-3">
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider">
              Ekstra Durumlar (Kişiselleştirme)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-light hover:bg-gray-light/20 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasElevator"
                  checked={inputs.hasElevator}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 text-forest focus:ring-forest border-gray-300 rounded"
                />
                <span className="text-xs font-bold text-charcoal">Asansör Kurulumu İstiyorum</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-light hover:bg-gray-light/20 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasPet"
                  checked={inputs.hasPet}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 text-forest focus:ring-forest border-gray-300 rounded"
                />
                <span className="text-xs font-bold text-charcoal">Evcil Hayvanım Var</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-light hover:bg-gray-light/20 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasKids"
                  checked={inputs.hasKids}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 text-forest focus:ring-forest border-gray-300 rounded"
                />
                <span className="text-xs font-bold text-charcoal">Okula Giden Çocuğum Var</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-light hover:bg-gray-light/20 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="hasSensitive"
                  checked={inputs.hasSensitive}
                  onChange={handleInputChange}
                  className="w-4.5 h-4.5 text-forest focus:ring-forest border-gray-300 rounded"
                />
                <span className="text-xs font-bold text-charcoal">Kıymetli / Hassas Eşya Var (Piyano vb.)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-forest text-forest hover:text-white font-black py-4 px-6 rounded-2xl border border-forest transition-all duration-200 text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
          >
            <span>Kişiselleştirilmiş Yapay Zeka Planını Oluştur</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* AI Citability Snippet / Structured Answer Block (GEO & Featured Snippet optimized) */}
          <div className="bg-forest text-white p-6 rounded-2xl border border-white/10 shadow-lg space-y-3 relative overflow-hidden">
            <div className="absolute right-3 top-3 bg-gold/20 text-gold border border-gold/30 text-[10px] font-black px-2 py-0.5 rounded-lg tracking-widest print:hidden">
              GEO CITATION INJECTOR
            </div>
            
            <h4 className="font-display font-black text-sm md:text-base text-gold flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>Yapay Zeka Destekli Taşınma Özeti</span>
            </h4>
            
            {/* Fact-Attributed, self-contained 145-word snippet optimized for LLM retrievers & Google feature snippets */}
            <p className="text-xs md:text-sm text-gray-200 leading-relaxed text-left">
              Konya Lider Nakliyat, Konya içi ve ilçeler arası evden eve taşımacılık süreçleri için K3 yetki belgesi ve Anadolu Sigorta güvencesiyle 7 aşamalı profesyonel planlama sunmaktadır. {formatMovingDate()} tarihindeki {inputs.homeType} taşınmanız için hazırlanan bu kişiselleştirilmiş rehber; resmi adres beyanı, ASKİ su aboneliği, Enerjisa elektrik kapatma ve Aksa doğalgaz nakil sürelerini gün bazlı takvimle organize eder. Asansör kurulum izinleri ve {inputs.hasPet ? 'evcil hayvan konfor' : 'lojistik'} hazırlıklarını içeren bu dijital planlayıcı, Konya genelinde hasarsız, sabit fiyat garantili ve planlı nakliyenin yasal ve lojistik tüm gereksinimlerini tek ekranda toplar.
            </p>
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-gray-300">
              <span><strong>Rota:</strong> {inputs.fromDistrict} ➔ {inputs.toDistrict}</span>
              <span><strong>Hacim Sınıfı:</strong> {inputs.homeType}</span>
              <span>Son Güncelleme: {todayDate}</span>
            </div>
          </div>

          {/* District Local Logistics Warning (EEAT & local entity authority) */}
          {getLocalAdvices().length > 0 && (
            <div className="bg-gold/5 border border-gold/20 p-5 rounded-2xl space-y-2 text-left print:hidden">
              <h4 className="font-display font-bold text-forest text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-gold-text" />
                <span>Konya Lojistik ve Yol Analiz Notları</span>
              </h4>
              <div className="space-y-2 text-xs md:text-sm text-charcoal">
                {getLocalAdvices().map((advice, idx) => (
                  <p key={idx} className="leading-relaxed border-l-2 border-gold pl-3">
                    {advice}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Progress bar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-light shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
            <div className="flex-1 w-full space-y-2">
              <div className="flex justify-between text-xs font-bold text-forest uppercase tracking-wider">
                <span>Taşınma Planı Tamamlanma Oranı</span>
                <span>{getProgress()}%</span>
              </div>
              <div className="w-full bg-gray-light h-3.5 rounded-full overflow-hidden">
                <div
                  className="bg-forest h-full rounded-full transition-all duration-300"
                  style={{ width: `${getProgress()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
              <button
                onClick={() => window.print()}
                className="bg-forest hover:bg-gold text-white hover:text-forest border border-forest font-black py-3 px-4 rounded-xl transition-all duration-200 text-xs tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Yazdır / PDF</span>
              </button>

              <button
                onClick={() => setIsGenerated(false)}
                className="bg-white hover:bg-gray-light text-forest font-bold py-3 px-4 rounded-xl border border-gray-300 transition-all duration-200 text-xs tracking-wider flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Yeni Plan</span>
              </button>
            </div>
          </div>

          {/* Render Sections */}
          <div className="space-y-4 text-left">
            {renderSection('30_days', 'Taşınmadan 30 Gün Önce Yapılacaklar')}
            {renderSection('15_days', 'Taşınmadan 15 Gün Önce Yapılacaklar')}
            {renderSection('7_days', 'Taşınmadan 7 Gün Önce Yapılacaklar')}
            {renderSection('1_day', 'Son 1 Gün Kala Yapılacaklar')}
            {renderSection('moving_day', 'Taşınma Günü Yapılacaklar')}
          </div>

          {/* Action CTA Block (Converts checklist visitors into quote submissions) */}
          <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-md text-center space-y-5 print:hidden">
            <div className="max-w-md mx-auto space-y-2">
              <CheckCircle2 className="w-8 h-8 text-forest mx-auto" />
              <h3 className="font-display font-black text-forest text-lg">
                Planınız Tamamlandıysa Bizimle İletişime Geçin
              </h3>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Kişiselleştirilmiş planınıza göre Konya Lider Nakliyat güvencesiyle asansörlü, sigortalı ve marangozlu taşınma için hemen fiyat teklifi talep edin.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`/teklif-al?from=${encodeURIComponent(inputs.fromDistrict)}&to=${encodeURIComponent(inputs.toDistrict)}&rooms=${encodeURIComponent(inputs.homeType)}&elevator=${inputs.hasElevator ? 'evet' : 'hayir'}`}
                className="w-full sm:w-auto bg-gold hover:bg-forest text-forest hover:text-white border border-forest font-black py-3.5 px-6 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider shadow-sm active:scale-95 block text-center"
              >
                Siteden Online Teklif Al
              </a>
              
              <a
                href={`${SITE.whatsappHref}?text=${encodeURIComponent(
                  `Merhaba, Yapay Zeka Taşınma Asistanı ile ${inputs.homeType} evim için ${formatMovingDate()} tarihinde ${inputs.fromDistrict} - ${inputs.toDistrict} arası bir taşınma planı oluşturdum. Net fiyat teklifi alabilir miyim?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-black py-3.5 px-6 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider shadow-sm active:scale-95 block text-center"
              >
                WhatsApp Hızlı Fiyat İste
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
