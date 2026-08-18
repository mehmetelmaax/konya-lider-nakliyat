import React from 'react';

interface BuildingAnalysisProps {
  districtName: string;
}

interface DistrictBuildingData {
  buildingType: string;
  typicalFloors: string;
  elevatorRequirement: string;
  streetWidth: string;
  specialCondition: string;
}

const DISTRICT_BUILDING_MAP: Record<string, DistrictBuildingData> = {
  'Selçuklu': {
    buildingType: 'Yoğun Çok Katlı Rezidanslar ve Modern Apartmanlar',
    typicalFloors: '5 - 15 Kat',
    elevatorRequirement: 'Çok Yüksek (%85 dış cephe modüler asansör kurulumu)',
    streetWidth: 'Geniş Caddeler ve Yoğun Park Yapılan Ara sokaklar',
    specialCondition: 'Gelişmiş şehir planı sayesinde asansör kurulum alanı rahattır ancak park etmiş araçlar için önceden güvenlik şeridi çekilir.'
  },
  'Meram': {
    buildingType: 'Müstakil Villalar, Bahçeli Konutlar ve Alçak Katlı Apartmanlar',
    typicalFloors: '2 - 6 Kat',
    elevatorRequirement: 'Düşük-Orta (%30 dış cephe asansör kullanımı)',
    streetWidth: 'Geniş Bulvarlar, Bahçe Yolları ve Ağaçlık Sokaklar',
    specialCondition: 'Ağaçlık alanlarda asansör teleskopik bomunun dallara zarar vermemesi için kurulum açısı milimetrik hesaplanır.'
  },
  'Karatay': {
    buildingType: 'Tarihi Yerleşimler, Bitişik Nizam Apartmanlar ve Yeni Toplu Konutlar',
    typicalFloors: '3 - 8 Kat',
    elevatorRequirement: 'Orta-Yüksek (%65 oranında asansör ihtiyacı)',
    streetWidth: 'Dar, Bitişik ve Yoğun Sokaklar',
    specialCondition: 'Eski mahallelerdeki dar sokaklarda küçük hacimli nakliyat kamyonlarımız tercih edilir.'
  },
  'Ereğli': {
    buildingType: 'Yeni TOKİ Konutları, Çok Katlı Modern Bloklar ve Müstakil Evler',
    typicalFloors: '4 - 12 Kat',
    elevatorRequirement: 'Yüksek (%80 dış cephe asansörü kurulumu)',
    streetWidth: 'Geniş ve Planlı Şehir Caddeleri',
    specialCondition: 'Geniş caddelerde asansör kurulumu son derece hızlıdır; uzun yol lojistiği için eşyalar çift kat ambalajlanır.'
  },
  'Akşehir': {
    buildingType: 'Tarihi Akşehir Evleri ve Yeni Çok Katlı Apartmanlar',
    typicalFloors: '3 - 8 Kat',
    elevatorRequirement: 'Orta (%60 mobil asansör kurulum oranı)',
    streetWidth: 'Dar Tarihi Sokaklar ve Yeni Geniş Caddeler',
    specialCondition: 'Tarihi bölgelerde dar sokak geçiş izinleri nakliye gününden önce koordine edilir.'
  },
  'Seydişehir': {
    buildingType: 'Alüminyum Tesisleri Çevresi Konutlar ve Apartmanlar',
    typicalFloors: '3 - 6 Kat',
    elevatorRequirement: 'Orta (%45 dış cephe asansörü kullanımı)',
    streetWidth: 'Planlı Caddeler ve Eski Mahalle Yolları',
    specialCondition: 'Yol yevmiyesi gidiş-dönüş yakıt tarifesi üzerinden netleştirilip sözleşmeye eklenir.'
  },
  'Ilgın': {
    buildingType: 'Kaplıca Çevresi Konutlar, Müstakil Evler ve Apartmanlar',
    typicalFloors: '2 - 5 Kat',
    elevatorRequirement: 'Düşük-Orta (%30 asansör ihtiyacı)',
    streetWidth: 'Düz Ova Sokakları ve Termal Bölge Yolları',
    specialCondition: 'Eğimsiz düz zeminler sayesinde asansör kurulum ayakları (outriggers) kolayca sabitlenir.'
  },
  'Beyşehir': {
    buildingType: 'Göl Manzaralı Yazlık Siteler ve Müstakil Konutlar',
    typicalFloors: '2 - 4 Kat',
    elevatorRequirement: 'Düşük (%15 dış cephe asansör kurulumu)',
    streetWidth: 'Geniş Sahil Yolları ve Orta Sokaklar',
    specialCondition: 'Beyşehir Gölü nemli hava şartlarına karşı elektronik eşyalar nem önleyici balonlu naylonla sarılır.'
  },
  'Çumra': {
    buildingType: 'Tarım Konutları, Müstakil Evler ve Alçak Apartmanlar',
    typicalFloors: '2 - 4 Kat',
    elevatorRequirement: 'Düşük (%10 oranında ihtiyaç duyulur)',
    streetWidth: 'Geniş Ova Yolları ve Tarla Sınır Caddeleri',
    specialCondition: 'Düz tarım arazisi coğrafyası sayesinde rüzgar hızı ölçülerek güvenli modüler kurulum yapılır.'
  },
  'Kadınhanı': {
    buildingType: 'Müstakil Tarım Evleri ve Alçak Katlı Apartmanlar',
    typicalFloors: '1 - 4 Kat',
    elevatorRequirement: 'Düşük (%10 asansör ihtiyacı)',
    streetWidth: 'Düz Ova Sokakları ve Çiftlik Yolları',
    specialCondition: 'Zemin kat veya 1. kat ağırlıklı taşınmalarda yatay taşıma planlaması yapılır.'
  },
  'Sarayönü': {
    buildingType: 'Müstakil Tarım Konutları ve Yayla Evleri',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Geniş ve Eğimsiz Ova Yolları',
    specialCondition: 'Giriş katı taşınmalarda asansör kurmak yerine taşıma personeli sayısı artırılır.'
  },
  'Karapınar': {
    buildingType: 'Eski Müstakil Evler ve Yeni Düşük Katlı Apartmanlar',
    typicalFloors: '2 - 5 Kat',
    elevatorRequirement: 'Düşük (%20 asansör ihtiyacı)',
    streetWidth: 'Geniş Ova Yolları ve Toprak Bağlantılı Sokaklar',
    specialCondition: 'Rüzgarlı bozkır havası nedeniyle eşyaların tozlanmasını önleyici streç film kaplaması çift kat uygulanır.'
  },
  'Kulu': {
    buildingType: 'Gurbetçi Vatandaşların Müstakil Villaları ve Geniş Konutlar',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Geniş Bulvarlar ve Ferah Sokaklar',
    specialCondition: 'Yurt dışı gurbetçi taşınmalarında eşyaların uzun süreli depolama durumları için özel paketleme yapılır.'
  },
  'Cihanbeyli': {
    buildingType: 'Geniş Müstakil Evler ve Çiftlik Konutları',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Geniş Ova Yolları ve Tuz Gölü Çevresi Sokaklar',
    specialCondition: 'Geniş arazilerde rüzgar direnci ve tozlanmaya karşı kapalı çelik kasa araçlarımız kullanılır.'
  }
};

export default function BuildingAnalysis({ districtName }: BuildingAnalysisProps) {
  const cleanName = districtName.trim();
  const info = DISTRICT_BUILDING_MAP[cleanName];

  if (!info) return null;

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 text-charcoal">
      <h3 className="font-display font-bold text-navy text-lg md:text-xl border-b border-gray-light pb-2">
        {cleanName} İlçesi Bina Yapısı ve Nakliye Analiz Tablosu
      </h3>
      <p className="text-xs md:text-sm leading-relaxed text-charcoal/90">
        Konya Lider Nakliyat tarafından {cleanName} ilçesinde gerçekleştirilen ev taşıma süreçlerinde, ilçenin yerleşim mimarisi ve bina yapı durumlarına göre belirlenen lojistik analiz tablosu şu şekildedir:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <caption className="sr-only">{cleanName} Bölgesi Konut Mimarisi ve Asansör İhtiyaç Analizi</caption>
          <thead>
            <tr className="bg-navy text-white">
              <th scope="col" className="p-3 rounded-tl-lg">Kriter</th>
              <th scope="col" className="p-3 rounded-tr-lg">Analiz ve Tespit Sonucu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-light">
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Mecra / Yapı Tipi</th>
              <td className="p-3">{info.buildingType}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Ortalama Kat Seviyeleri</th>
              <td className="p-3">{info.typicalFloors}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Dış Cephe Asansör İhtiyacı</th>
              <td className="p-3 text-green-600 font-bold">{info.elevatorRequirement}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Sokak ve Ulaşım Durumu</th>
              <td className="p-3">{info.streetWidth}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Özel Lojistik Tedbirleri</th>
              <td className="p-3 font-medium text-orange-text">{info.specialCondition}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
