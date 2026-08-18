import { generateSlug } from '../src/lib/slug.ts';

const testCases = [
  { input: 'İstanbul', expected: 'istanbul' },
  { input: 'ISTANBUL', expected: 'istanbul' },
  { input: 'Şekerpınar', expected: 'sekerpinar' },
  { input: 'İzmirli Nakliyeciler Çarşısı', expected: 'izmirli-nakliyeciler-carsisi' },
  { input: 'Selçuklu’dan Selçuklu’a', expected: 'selcukludan-selcuklua' },
  { input: '---Konya Evden Eve Nakliyat---', expected: 'konya-evden-eve-nakliyat' }
];

console.log('Running Slug Generator Tests...');
let passed = true;

for (const tc of testCases) {
  const result = generateSlug(tc.input);
  if (result === tc.expected) {
    console.log(`✅ PASS: "${tc.input}" -> "${result}"`);
  } else {
    console.error(`❌ FAIL: "${tc.input}" -> Expected: "${tc.expected}", Got: "${result}"`);
    passed = false;
  }
}

if (passed) {
  console.log('🎉 All slug tests passed successfully!');
} else {
  process.exit(1);
}
