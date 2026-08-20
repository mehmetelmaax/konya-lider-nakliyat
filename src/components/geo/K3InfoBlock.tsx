import React from 'react';

interface K3InfoBlockProps {
  licenseNumber?: string;
}

export default function K3InfoBlock({ licenseNumber }: K3InfoBlockProps) {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 text-charcoal">
      <h2 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
        K3 Yetki Belgesi Nedir ve Neden Zorunludur?
      </h2>
      <p className="text-xs md:text-sm leading-relaxed">
        K3 Yetki Belgesi, ev ve ofis eşyalarının ticari amaçla karayolunda taşınması için Ulaştırma ve Altyapı Bakanlığı tarafından zorunlu kılınan yasal yetki belgesidir. K3 belgesi bulunmayan kamyon ve tırların eşya nakliyesi yapması yasal olarak engellenmiş olup, denetimlerde bu araçlar bağlanmaktadır.
      </p>

      {licenseNumber && (
        <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 text-xs font-bold text-forest">
          Konya Lider Nakliyat yasal U-NET kayıtlı K3 Yetki Belge Numarası: <span className="text-gold-text underline">{licenseNumber}</span>
        </div>
      )}

      <div className="space-y-3">
        <span className="font-bold text-forest text-sm block">U-NET Sorgulama ve Doğrulama Adımları:</span>
        <ol className="list-decimal list-inside text-xs space-y-1.5 pl-2">
          <li>Türkiye Cumhuriyeti e-Devlet kapısı üzerinden &ldquo;Yetki Belgesi Sorgulama&rdquo; modülünü aratın.</li>
          <li>Ulaştırma ve Altyapı Bakanlığı &ldquo;Karayolu Taşıma Yetki Belgesi Sorgulama&rdquo; sayfasına giriş yapın.</li>
          <li>Taşıma yapacak şirketin tam vergi numarasını veya unvanını sorgulama kutusuna yazın.</li>
          <li>Firma listesinde &ldquo;K3&rdquo; yetki belgesinin aktif ve geçerli olduğunu teyit edin.</li>
        </ol>
      </div>

      <div className="space-y-3">
        <span className="font-bold text-forest text-sm block">Taşımacılık Yetki Belgesi Tipleri Karşılaştırması</span>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <caption>Ulaştırma Bakanlığı Taşıma Yetki Belgesi Farkları</caption>
            <thead>
              <tr className="bg-forest text-white">
                <th scope="col" className="p-2.5 rounded-tl-lg">Belge Türü</th>
                <th scope="col" className="p-2.5">Kapsamı</th>
                <th scope="col" className="p-2.5 rounded-tr-lg">Yasal Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light">
              <tr className="hover:bg-off-white/50">
                <th scope="row" className="p-2.5 font-bold text-forest">K1 Belgesi</th>
                <td className="p-2.5">Yurt içi genel ticari eşya ve yük taşımacılığı</td>
                <td className="p-2.5 text-rose-500 font-bold">Ev eşyası taşıyamaz</td>
              </tr>
              <tr className="hover:bg-off-white/50">
                <th scope="row" className="p-2.5 font-bold text-forest">K2 Belgesi</th>
                <td className="p-2.5">Sadece firmanın kendi öz malı olan eşya taşımacılığı</td>
                <td className="p-2.5 text-rose-500 font-bold">Ev eşyası taşıyamaz</td>
              </tr>
              <tr className="hover:bg-off-white/50">
                <th scope="row" className="p-2.5 font-bold text-forest">K3 Belgesi</th>
                <td className="p-2.5">Yurt içi ticari ev ve ofis eşyası nakliyesi</td>
                <td className="p-2.5 text-green-600 font-bold">Ev/Ofis Taşımaya Yetkilidir</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
