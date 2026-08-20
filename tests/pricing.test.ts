import { describe, it, expect } from 'vitest';
import { estimatePrice } from '../src/lib/pricing';

describe('Pricing Engine Verification Tests', () => {
  it('should estimate price correctly for 1+1 Selcuklu to Meram (Central, inner-city)', () => {
    const result = estimatePrice({
      rooms: '1+1',
      fromElevator: false,
      toElevator: false,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Meram',
      packing: false,
      carpentry: false,
      storage: false
    });
    // 12000 base + 300 floor surcharge (1st + 1st floors)
    expect(result.min).toBe(12300);
    expect(result.max).toBe(15300);
  });

  it('should estimate price correctly for 3+1 Selcuklu to Eregli (Outer district, distance Km = 145)', () => {
    const result = estimatePrice({
      rooms: '3+1',
      fromElevator: true,
      toElevator: false,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Ereğli',
      packing: true,
      carpentry: true,
      storage: false
    });
    // Expected Min = 18000 (base) + 300 (floor) + 2500 (elevator) + 3500 (packing) + 4350 (distance) = 28650
    expect(result.min).toBe(28650);
    expect(result.max).toBe(33650);
  });

  it('should estimate price correctly for 4+1+ Selcuklu to Istanbul (Intercity, default 500 km)', () => {
    const result = estimatePrice({
      rooms: '4+1+',
      fromElevator: true,
      toElevator: true,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Şehirlerarası (İl Dışı)',
      packing: true,
      carpentry: false,
      storage: false
    });
    // Expected Min = 22000 (base) + 300 (floor) + 5000 (elevators) + 4500 (packing) + 17500 (distance) = 49300
    expect(result.min).toBe(49300);
    expect(result.max).toBe(55300);
  });
});
