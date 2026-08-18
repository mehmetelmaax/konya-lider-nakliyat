import { FACTS } from './facts';

export interface PriceInput {
  rooms: '1+1' | '2+1' | '3+1' | '4+1+';
  fromFloor: number;
  toFloor: number;
  fromElevator: boolean;
  toElevator: boolean;
  distanceType: 'sehirici' | 'ilceler' | 'sehirlerarasi';
  distanceKm?: number;
  packing: boolean;
  carpentry: boolean;
  storage: boolean;
}

export interface PriceEstimate {
  min: number;
  max: number;
  breakdown: {
    base: number;
    floorSurcharge: number;
    elevatorFee: number;
    packingFee: number;
    distanceFee: number;
    storageFee: number;
  };
  disclaimer: string;
}

/**
 * Konya Lider Nakliyat Fiyat Hesaplama Motoru.
 * Bu fonksiyon, daire oda sayısı, kat bilgileri, asansör durumları ve ek lojistik gereksinimleri
 * baz alarak tamamen yan etkisiz (pure) ve tutarlı bir fiyat aralığı hesaplar.
 */
export function estimatePrice(input: PriceInput): PriceEstimate {
  // Baz fiyatlar oda sayısına göre 12.000 TL - 23.000 TL aralığında belirlenir.
  let baseMin = 12000;
  let baseMax = 15000;
  if (input.rooms === '2+1') {
    baseMin = 15000;
    baseMax = 20000;
  } else if (input.rooms === '3+1') {
    baseMin = 18000;
    baseMax = 23000;
  } else if (input.rooms === '4+1+') {
    baseMin = 22000;
    baseMax = 28000;
  }

  // Kat artış yevmiyesi: Her kat yükseldiğinde personelin iş gücü katlandığı için kat başına 150 TL ek maliyet eklenir.
  const floorSurcharge = (input.fromFloor + input.toFloor) * 150;

  // Dış cephe asansör kurulum ücreti: Asansör kurulumu başına 2.500 TL yansıtılır.
  let elevatorFee = 0;
  if (input.fromElevator) elevatorFee += 2500;
  if (input.toElevator) elevatorFee += 2500;

  // Profesyonel paketleme ve patpat naylon sarım bedeli (oda durumuna göre malzeme sarfiyatı değişir)
  let packingFee = 0;
  if (input.packing) {
    if (input.rooms === '1+1') packingFee = 1500;
    else if (input.rooms === '2+1') packingFee = 2500;
    else if (input.rooms === '3+1') packingFee = 3500;
    else packingFee = 4500;
  }

  // Yol mesafesi katsayıları
  let distanceFee = 0;
  if (input.distanceType === 'ilceler') {
    distanceFee = 4000; // Konya dış ilçeler gidiş-dönüş yakıt farkı
  } else if (input.distanceType === 'sehirlerarasi') {
    // Şehirlerarası km başına 35 TL üzerinden dinamik hesaplanır.
    const km = input.distanceKm || 500; // Mesafe belirtilmediyse varsayılan 500 km
    distanceFee = km * 35;
  }

  // Aylık kiralık eşya depolama opsiyonu
  let storageFee = 0;
  if (input.storage) {
    if (input.rooms === '1+1') storageFee = 3000;
    else if (input.rooms === '2+1') storageFee = 4500;
    else storageFee = 6000;
  }

  const min = baseMin + floorSurcharge + elevatorFee + packingFee + distanceFee + storageFee;
  // Sezon dalgalanması ve bütçe esneklik payı için maksimum aralık %20 daha fazlası olarak ayarlanır.
  const max = baseMax + floorSurcharge + elevatorFee + packingFee + distanceFee + storageFee;

  const disclaimer = 'Bu tahmini bir hesaplamadır, kesin fiyat ücretsiz ekspertiz sonrası verilir.';

  return {
    min,
    max,
    breakdown: {
      base: baseMin,
      floorSurcharge,
      elevatorFee,
      packingFee,
      distanceFee,
      storageFee
    },
    disclaimer
  };
}

/**
 * Form verilerini PriceInput tipine dönüştürerek tek tip tahmini fiyat aralığı hesaplar.
 * Hem istemci tarafındaki QuoteForm hem de sunucu tarafındaki API route bu fonksiyonu ortak kullanır.
 */
export function getEstimateFromForm(
  rooms: string,
  elevator: string,
  fromDistrict: string,
  toDistrict: string
): { min: number; max: number } {
  // Oda sayısının PriceInput tipine eşlenmesi (ofis durumunda 1+1 taban fiyatı kullanılır)
  let roomsMapped: '1+1' | '2+1' | '3+1' | '4+1+' = '1+1';
  if (rooms === '2+1') roomsMapped = '2+1';
  else if (rooms === '3+1') roomsMapped = '3+1';
  else if (rooms === '4+1+') roomsMapped = '4+1+';

  // İstemci formunda toplanmayan detaylar için varsayılan değerler:
  // - Kat bilgisi: 1. kat (çıkış) ve 1. kat (varış) olarak taban hesaplanır (kat farkı zammı eklenmez)
  // - Tek asansör: formdan asansör 'evet' gelirse tek yönlü asansör ücreti (2.500 TL) eklenir
  // - Paketleme/Montaj/Depolama: Temel fiyatta kapalı/seçilmemiş kabul edilir
  const fromElevator = elevator === 'evet';

  // Mesafe tipinin belirlenmesi
  let distanceType: 'sehirici' | 'ilceler' | 'sehirlerarasi' = 'sehirici';

  const isIntercity =
    fromDistrict.includes('Şehirlerarası') ||
    toDistrict.includes('Şehirlerarası') ||
    fromDistrict.includes('İl Dışı') ||
    toDistrict.includes('İl Dışı') ||
    fromDistrict === 'sehirlerarasi-evden-eve-nakliyat' ||
    toDistrict === 'sehirlerarasi-evden-eve-nakliyat';

  if (isIntercity) {
    distanceType = 'sehirlerarasi';
  } else {
    // İlçeler arası gidiş-dönüş yakıt farkı kontrolü
    const fromSlug = fromDistrict.toLowerCase().replace(/\s/g, '-');
    const toSlug = toDistrict.toLowerCase().replace(/\s/g, '-');
    const outerSlugs = ['eregli', 'aksehir', 'seydisehir', 'ilgin', 'cumra', 'kadinhani', 'beysehir', 'sarayonu', 'karapinar', 'kulu', 'cihanbeyli'];
    const isOuter = outerSlugs.some(slug => fromSlug.includes(slug) || toSlug.includes(slug));
    if (isOuter) {
      distanceType = 'ilceler';
    }
  }

  const estimate = estimatePrice({
    rooms: roomsMapped,
    fromFloor: 1,
    toFloor: 1,
    fromElevator,
    toElevator: false,
    distanceType,
    distanceKm: 500, // Varsayılan şehirlerarası km mesafesi
    packing: false,
    carpentry: false,
    storage: false
  });

  return {
    min: estimate.min,
    max: estimate.max
  };
}
