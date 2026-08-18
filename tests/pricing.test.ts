import { estimatePrice } from '../src/lib/pricing';

console.log('Running Pricing Engine Verification Tests...');

const testCases = [
  {
    name: '1+1 Selcuklu to Meram (Central, inner-city)',
    input: {
      rooms: '1+1' as const,
      fromElevator: false,
      toElevator: false,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Meram',
      packing: false,
      carpentry: false,
      storage: false
    },
    expectedMin: 12300, // 12000 base + 300 floor surcharge (1st + 1st floors)
    expectedMax: 15300
  },
  {
    name: '3+1 Selcuklu to Eregli (Outer district, distance Km = 145)',
    input: {
      rooms: '3+1' as const,
      fromElevator: true,
      toElevator: false,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Ereğli',
      packing: true,
      carpentry: true,
      storage: false
    },
    // base: 18000
    // floorSurcharge: (1+1)*150 = 300
    // elevatorFee: 2500 (fromElevator)
    // packingFee: 3500 (3+1)
    // distanceFee: Math.max(1000, 145 * 30) = 4350
    // storageFee: 0
    // Expected Min = 18000 + 300 + 2500 + 3500 + 4350 = 28650
    expectedMin: 28650,
    expectedMax: 33650
  },
  {
    name: '4+1+ Selcuklu to Istanbul (Intercity, default 500 km)',
    input: {
      rooms: '4+1+' as const,
      fromElevator: true,
      toElevator: true,
      fromDistrict: 'Selçuklu',
      toDistrict: 'Şehirlerarası (İl Dışı)',
      packing: true,
      carpentry: false,
      storage: false
    },
    // base: 22000
    // floorSurcharge: (1+1)*150 = 300
    // elevatorFee: 2500 + 2500 = 5000
    // packingFee: 4500 (4+1+)
    // distanceFee: 500 * 35 = 17500
    // Expected Min = 22000 + 300 + 5000 + 4500 + 17500 = 49300
    expectedMin: 49300,
    expectedMax: 55300
  }
];

let failed = false;

testCases.forEach((tc) => {
  const result = estimatePrice(tc.input);
  const minMatches = result.min === tc.expectedMin;
  const maxMatches = result.max === tc.expectedMax;

  if (minMatches && maxMatches) {
    console.log(`[PASS] ${tc.name}`);
  } else {
    console.error(`[FAIL] ${tc.name}`);
    console.error(`  Expected: Min: ${tc.expectedMin}, Max: ${tc.expectedMax}`);
    console.error(`  Got     : Min: ${result.min}, Max: ${result.max}`);
    failed = true;
  }
});

if (failed) {
  console.error('\nVerification tests failed!');
  process.exit(1);
} else {
  console.log('\nAll pricing engine verification tests passed successfully!');
  process.exit(0);
}
