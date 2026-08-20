import { DISTRICTS } from './site-config';

export interface PriceInput {
  rooms: '1+1' | '2+1' | '3+1' | '4+1+' | 'ofis';
  fromFloor?: number;
  toFloor?: number;
  fromElevator: boolean;
  toElevator: boolean;
  distanceType?: 'sehirici' | 'ilceler' | 'sehirlerarasi';
  distanceKm?: number;
  fromDistrict?: string;
  toDistrict?: string;
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
  
  // ofis ve 1+1 oda tipleri aynı taban fiyattan başlar
  const roomsNorm = input.rooms === 'ofis' ? '1+1' : input.rooms;
  
  if (roomsNorm === '2+1') {
    baseMin = 15000;
    baseMax = 20000;
  } else if (roomsNorm === '3+1') {
    baseMin = 18000;
    baseMax = 23000;
  } else if (roomsNorm === '4+1+') {
    baseMin = 22000;
    baseMax = 28000;
  }

  // Kat artış yevmiyesi (Belirtilmemişse varsayılan 1. kat kabul edilir)
  const fromFloor = input.fromFloor ?? 1;
  const toFloor = input.toFloor ?? 1;
  const floorSurcharge = (fromFloor + toFloor) * 150;

  // Dış cephe asansör kurulum ücreti
  let elevatorFee = 0;
  if (input.fromElevator) elevatorFee += 2500;
  if (input.toElevator) elevatorFee += 2500;

  // Profesyonel paketleme ve patpat naylon sarım bedeli
  let packingFee = 0;
  if (input.packing) {
    if (roomsNorm === '1+1') packingFee = 1500;
    else if (roomsNorm === '2+1') packingFee = 2500;
    else if (roomsNorm === '3+1') packingFee = 3500;
    else packingFee = 4500;
  }

  // Dinamik mesafe ve katsayı hesabı
  let distanceType = input.distanceType || 'sehirici';
  let distanceKm = input.distanceKm || 0;

  if (input.fromDistrict && input.toDistrict) {
    const isIntercity =
      input.fromDistrict.includes('Şehirlerarası') ||
      input.toDistrict.includes('Şehirlerarası') ||
      input.fromDistrict.includes('İl Dışı') ||
      input.toDistrict.includes('İl Dışı') ||
      input.fromDistrict === 'sehirlerarasi-evden-eve-nakliyat' ||
      input.toDistrict === 'sehirlerarasi-evden-eve-nakliyat';

    if (isIntercity) {
      distanceType = 'sehirlerarasi';
      distanceKm = distanceKm || 500; // default
    } else {
      const fromDistObj = DISTRICTS.find(d => d.name === input.fromDistrict);
      const toDistObj = DISTRICTS.find(d => d.name === input.toDistrict);
      
      const fromKm = fromDistObj ? fromDistObj.distanceKm : 0;
      const toKm = toDistObj ? toDistObj.distanceKm : 0;
      
      distanceKm = Math.max(fromKm, toKm);
      if (distanceKm > 0) {
        distanceType = 'ilceler';
      } else {
        distanceType = 'sehirici';
      }
    }
  }

  let distanceFee = 0;
  if (distanceType === 'ilceler') {
    // 150 km'lik bir ilçeye taşınırken şehiriçi fiyatı yansıtılmasını engellemek için km bazlı yakıt gideri
    distanceFee = Math.max(1000, distanceKm * 30);
  } else if (distanceType === 'sehirlerarasi') {
    // Şehirlerarası km başına 35 TL
    distanceFee = distanceKm * 35;
  }

  // Aylık kiralık eşya depolama opsiyonu
  let storageFee = 0;
  if (input.storage) {
    if (roomsNorm === '1+1') storageFee = 3000;
    else if (roomsNorm === '2+1') storageFee = 4500;
    else storageFee = 6000;
  }

  const min = baseMin + floorSurcharge + elevatorFee + packingFee + distanceFee + storageFee;
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
