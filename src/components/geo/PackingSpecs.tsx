import React from 'react';

export default function PackingSpecs() {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 text-charcoal">
      <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
        Ev Taşıma Ambalaj Malzemeleri ve Teknik Özellikleri Nedir?
      </h2>
      <p className="text-xs md:text-sm leading-relaxed">
        Konya Lider Nakliyat eşya paketleme işlemlerinde kullanılan koruyucu materyaller, yol hasarlarını sıfıra indirmek için özel üretilmiş katmanlı yapılardan oluşur. Eşyaların taşınması ve istiflenmesi sırasında darbe ve çizikleri engellemek için kullanılan standart malzemeler şunlardır:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <caption>Lider Nakliyat Koruyucu Paketleme Malzemeleri Kataloğu</caption>
          <thead>
            <tr className="bg-forest text-white">
              <th scope="col" className="p-3 font-display rounded-tl-lg">Malzeme Adı</th>
              <th scope="col" className="p-3 font-display">Kullanım Alanı</th>
              <th scope="col" className="p-3 font-display">Katman Yapısı</th>
              <th scope="col" className="p-3 font-display rounded-tr-lg">Sağladığı Koruma Tipi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-light">
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">5 Katmanlı Çift Oluklu Kraft Koli</th>
              <td className="p-3">Mutfak kırılacakları, camlar, kitap ve küçük mutfak aletleri</td>
              <td className="p-3">5 Katman (Double Wall Kraft)</td>
              <td className="p-3 text-green-600 font-semibold">Ezilme ve yırtılma koruması</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">Kalın Balonlu Patpat Naylon</th>
              <td className="p-3">Buzdolabı, çamaşır makinesi, gardırop kapakları ve koltuklar</td>
              <td className="p-3">Çift kat havalı polietilen</td>
              <td className="p-3 text-green-600 font-semibold">Darbe ve çizik koruması</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">Sert Oluklu Köşe Koruyucular</th>
              <td className="p-3">Masa köşeleri, gardırop panelleri ve beyaz eşya kenarları</td>
              <td className="p-3">Sıkıştırılmış mukavva profil</td>
              <td className="p-3 text-green-600 font-semibold">Köşe kırılma ve ezilme koruması</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">Streç Film (Endüstriyel)</th>
              <td className="p-3">Kumaş koltukların toz ve neme karşı sarılması, paketlerin sabitlenmesi</td>
              <td className="p-3">17 mikron esnek film</td>
              <td className="p-3 text-green-600 font-semibold">Toz, kir ve nem koruması</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-forest">Mürekkepsiz Beyaz Ambalaj Kağıdı</th>
              <td className="p-3">Tabak, porselen, cam bardaklar ve fincanlar</td>
              <td className="p-3">Sülfit yumuşak kağıt</td>
              <td className="p-3 text-green-600 font-semibold">Çizik ve mürekkep lekesi koruması</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
