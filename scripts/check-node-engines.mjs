#!/usr/bin/env node
/**
 * NODE SÜRÜM TABANI DENETİMİ
 *
 * PROBLEM:
 *   Bir Node sürümünü elle seçip sabitlemek sürdürülemez. Bağımlılık
 *   ağacının derinliğindeki herhangi bir paket tabanı yükseltebilir ve
 *   CI 10 saniyede, sebebi belli olmayan bir hatayla düşer.
 *
 *   Gerçek örnek (bu projede 3 kez tekrarlandı):
 *     - vite@8            -> ^20.19.0 || >=22.12.0   (Node 20.18 kırıldı)
 *     - eslint-visitor-keys@5, @napi-rs/wasm-runtime
 *                         -> ^20.19.0 || ^22.13.0    (Node 22.12 kırıldı)
 *
 * ÇÖZÜM:
 *   Sürümü İNSAN seçmez, bu script HESAPLAR. Tüm node_modules ağacını
 *   tarar, her paketin engines.node aralığını toplar ve çalışan Node
 *   sürümünün hepsini karşılayıp karşılamadığını söyler.
 *   Karşılamıyorsa: hangi paket, hangi aralık, ne yapmalı — hepsi yazılır.
 *
 * KULLANIM:
 *   node scripts/check-node-engines.mjs              # çalışan Node'u dener
 *   node scripts/check-node-engines.mjs --target 22.12.0   # farazi sürüm dener
 */

import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

const argTarget = process.argv.indexOf('--target');
const targetVersion =
  argTarget !== -1 && process.argv[argTarget + 1]
    ? process.argv[argTarget + 1]
    : process.version.replace(/^v/, '');

if (!semver.valid(targetVersion)) {
  console.error(`Geçersiz sürüm: ${targetVersion}`);
  process.exit(1);
}

// ---------------------------------------------------------------
// Bağımlılık ağacını tara
// ---------------------------------------------------------------
const constraints = [];

function scan(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith('@')) {
      scan(full);
      continue;
    }
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(full, 'package.json'), 'utf8'));
      const range = pkg.engines?.node;
      if (range) constraints.push({ name: pkg.name, version: pkg.version, range });
    } catch {
      /* package.json yok veya bozuk — atla */
    }
    scan(path.join(full, 'node_modules'));
  }
}

if (!fs.existsSync('node_modules')) {
  console.error('node_modules yok. Önce `npm ci` çalıştır.');
  process.exit(1);
}

scan('node_modules');

// ---------------------------------------------------------------
// Karşılanmayan kısıtları bul
// ---------------------------------------------------------------
const violations = constraints.filter(
  (c) => !semver.satisfies(targetVersion, c.range, { includePrerelease: true })
);

// ---------------------------------------------------------------
// Gerçek taban sürümü hesapla:
// Tüm kısıtları aynı anda karşılayan en düşük gerçekçi sürüm.
// ---------------------------------------------------------------
function findMinimumSatisfying() {
  const major = semver.major(targetVersion);
  const candidates = [];
  // Aynı major içinde her minor'ı dene, sonra bir üst major'a geç
  for (const maj of [major, major + 1, major + 2]) {
    for (let minor = 0; minor <= 40; minor++) {
      candidates.push(`${maj}.${minor}.0`);
    }
  }
  return candidates.find((v) =>
    constraints.every((c) => semver.satisfies(v, c.range, { includePrerelease: true }))
  );
}

// ---------------------------------------------------------------
// Rapor
// ---------------------------------------------------------------
console.log('\n═══ NODE SÜRÜM TABANI DENETİMİ ═══\n');
console.log(`  Denenen sürüm     : ${targetVersion}`);
console.log(`  Taranan paket     : ${constraints.length} adet engines.node kısıtı`);

if (violations.length === 0) {
  const minimum = findMinimumSatisfying();
  console.log(`  Hesaplanan taban  : ${minimum ?? 'hesaplanamadı'}`);
  console.log(`\n  ✓ ${targetVersion} tüm kısıtları karşılıyor.\n`);

  if (minimum && semver.lt(targetVersion, minimum)) {
    console.log('  (Uyarı: hesaplama tutarsız, lütfen bildir.)\n');
  }
  process.exit(0);
}

// Aynı paket adı birden fazla kez çıkabilir — tekilleştir
const unique = [...new Map(violations.map((v) => [`${v.name}@${v.version}`, v])).values()];

console.log(`\n  ✗ ${unique.length} paket bu sürümle UYUMSUZ:\n`);
for (const v of unique) {
  console.log(`      ${v.name}@${v.version}`);
  console.log(`        gerekli: ${v.range}`);
}

const minimum = findMinimumSatisfying();
console.log('\n  ─── NE YAPMALI ───');
if (minimum) {
  console.log(`  Tüm kısıtları karşılayan en düşük sürüm: ${minimum}`);
  console.log(`  1) .nvmrc dosyasını "${semver.major(minimum)}" yap (major sabitle, patch değil)`);
  console.log(`  2) package.json engines.node -> ">=${minimum}"`);
  console.log('  3) nvm install && npm ci && npm run verify');
} else {
  console.log('  Uyumlu sürüm bulunamadı. Kısıtlar çelişkili olabilir;');
  console.log('  yukarıdaki paketleri tek tek inceleyin.');
}
console.log('');

process.exit(1);
