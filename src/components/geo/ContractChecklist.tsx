import React from 'react';

export default function ContractChecklist() {
  const items = [
    {
      title: 'Net ve Sabit Fiyat Tespiti',
      reason: 'Taşınma günü "eşya sığmadı, kat uzaktı" gibi bahanelerle ek ücret talep edilmesini engellemek için bütçenin kesinleşmesi gerekir.'
    },
    {
      title: 'Yazılı Tarih ve Saat Taahhüdü',
      reason: 'Ekiplerin gecikmesini veya taşınma gününün ertelenmesini önlemek, zaman kaybı ve yasal uyuşmazlıklarda hakkınızı korumak için şarttır.'
    },
    {
      title: 'Emtia Nakliyat Sigortası Poliçe Detayı',
      reason: 'Yol kazaları, yangın ve hırsızlık durumunda eşyalarınızın sigorta şirketi tarafından tazmin edileceğinin sözleşmeyle tespiti gereklidir.'
    },
    {
      title: 'Marangozluk ve Tesisat İşlerinin Tanımı',
      reason: 'Gardırop söküm-montajı ile çamaşır/bulaşık makinelerinin bağlantı sorumluluklarının hangi tarafta olduğunun belgelenmesi gerekir.'
    },
    {
      title: 'Dış Cephe Asansör Kullanım Şartları',
      reason: 'Asansör kurulum sorumluluğunun ve kat seviyesine uygun platform temininin fiyata dahil olduğunun yazılı teyididir.'
    },
    {
      title: 'Hasar Bildirim ve Tazmin Koşulları',
      reason: 'Taşıma sırasında meydana gelebilecek olası hasarlarda zarar bedelinin nasıl ve ne kadar sürede karşılanacağının yasal kuralıdır.'
    }
  ];

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 text-charcoal">
      <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
        Nakliyat Sözleşmesinde Bulunması Gereken Maddeler Kontrol Listesi
      </h2>
      <p className="text-xs md:text-sm leading-relaxed">
        Konya Lider Nakliyat olarak, tüm taşınma süreçlerimizi resmi nakliyat sözleşmesi düzenleyerek yürütmekteyiz. Güvenli bir nakliye süreci geçirmek adına sözleşmede bulunması gereken altı kritik kontrol maddesi ve gerekçeleri şunlardır:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <caption>Resmi Evden Eve Nakliyat Sözleşmesi Kontrol Kriterleri</caption>
          <thead>
            <tr className="bg-forest text-white">
              <th scope="col" className="p-3 rounded-tl-lg">Sözleşme Maddesi</th>
              <th scope="col" className="p-3 rounded-tr-lg">Neden Gereklidir (Gerekçesi)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-light">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-off-white/50">
                <th scope="row" className="p-3 font-bold text-forest flex items-center gap-2">
                  <span className="bg-gold text-forest text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">{idx + 1}</span>
                  <span>{item.title}</span>
                </th>
                <td className="p-3 leading-relaxed text-charcoal/90">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
