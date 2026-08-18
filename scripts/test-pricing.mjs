import { estimatePrice } from '../src/lib/pricing.ts';

// Since Next.js has alias path imports, we can write a simple test node script
// that imports it relatively. But wait, in ES Modules, we can import from relative path.
// Let's create scenarios:
const scenarios = [
  {
    name: 'Scenario 1: 1+1 Flat, local, ground floor to ground floor, no elevator/packing',
    input: { rooms: '1+1', fromFloor: 0, toFloor: 0, fromElevator: false, toElevator: false, distanceType: 'sehirici', packing: false, carpentry: false, storage: false }
  },
  {
    name: 'Scenario 2: 1+1 Flat, local, 5th floor to 7th floor, elevators on both, packing enabled',
    input: { rooms: '1+1', fromFloor: 5, toFloor: 7, fromElevator: true, toElevator: true, distanceType: 'sehirici', packing: true, carpentry: false, storage: false }
  },
  {
    name: 'Scenario 3: 2+1 Flat, local, 3rd floor to 4th floor, no elevators, packing and carpentry',
    input: { rooms: '2+1', fromFloor: 3, toFloor: 4, fromElevator: false, toElevator: false, distanceType: 'sehirici', packing: true, carpentry: true, storage: false }
  },
  {
    name: 'Scenario 4: 2+1 Flat, outer district, ground floor to 10th floor, elevator at destination',
    input: { rooms: '2+1', fromFloor: 0, toFloor: 10, fromElevator: false, toElevator: true, distanceType: 'ilceler', packing: true, carpentry: true, storage: false }
  },
  {
    name: 'Scenario 5: 3+1 Flat, local, 12th floor to 15th floor, elevators on both, packing/carpentry',
    input: { rooms: '3+1', fromFloor: 12, toFloor: 15, fromElevator: true, toElevator: true, distanceType: 'sehirici', packing: true, carpentry: true, storage: false }
  },
  {
    name: 'Scenario 6: 3+1 Flat, long distance (intercity), 3rd floor to 5th floor, no elevators, packing',
    input: { rooms: '3+1', fromFloor: 3, toFloor: 5, fromElevator: false, toElevator: false, distanceType: 'sehirlerarasi', packing: true, carpentry: true, storage: false }
  },
  {
    name: 'Scenario 7: 4+1+ Flat, local, 10th floor to 12th floor, elevators on both, packing, storage 1 month',
    input: { rooms: '4+1+', fromFloor: 10, toFloor: 12, fromElevator: true, toElevator: true, distanceType: 'sehirici', packing: true, carpentry: true, storage: true }
  },
  {
    name: 'Scenario 8: 3+1 Flat, intercity, 15th floor to 15th floor, elevators on both, packing, storage 1 month',
    input: { rooms: '3+1', fromFloor: 15, toFloor: 15, fromElevator: true, toElevator: true, distanceType: 'sehirlerarasi', packing: true, carpentry: true, storage: true }
  }
];

console.log('| Senaryo | Oda Sayısı | Mesafe Tipi | Katlar (Giriş/Çıkış) | Asansör | Paketleme | Depolama | Min Tahmin | Max Tahmin |');
console.log('| --- | --- | --- | --- | --- | --- | --- | --- | --- |');

for (const s of scenarios) {
  const res = estimatePrice(s.input);
  const floors = `${s.input.fromFloor} → ${s.input.toFloor}`;
  const elevator = `${s.input.fromElevator ? 'Var' : 'Yok'} / ${s.input.toElevator ? 'Var' : 'Yok'}`;
  const packing = s.input.packing ? 'Evet' : 'Hayır';
  const storage = s.input.storage ? 'Evet' : 'Hayır';
  console.log(`| ${s.name.split(':')[0]} | ${s.input.rooms} | ${s.input.distanceType} | ${floors} | ${elevator} | ${packing} | ${storage} | ${res.min.toLocaleString('tr-TR')} ₺ | ${res.max.toLocaleString('tr-TR')} ₺ |`);
}
