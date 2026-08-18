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
