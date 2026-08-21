#!/usr/bin/env node
/**
 * CANLIYA ÇIKIŞ ÖN UÇUŞ KONTROLÜ
 *
 * `npm run preflight` ile çalıştırılır. Build çıktısı ve yapılandırmayı
 * denetler. İki seviye vardır:
 *   HATA  -> canlıya çıkmayı ENGELLER (exit 1)
 *   UYARI -> engellemez ama düzeltilmeli
 *
 * Amaç: "deploy ettim, sonra fark ettim" sınıfı sorunları önlemek.
 */

import fs from 'node:fs';
import path from 'node:path';

const errors = [];
const warnings = [];
const passed = [];

const ok = (m) => passed.push(m);
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const read = (p) => {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------
// 1. BUILD ÇIKTISI
// ---------------------------------------------------------------
if (!fs.existsSync('.next/BUILD_ID')) {
  err('.next/BUILD_ID yok. Önce `npm run build` çalıştır.');
} else {
  ok(`Build mevcut (ID: ${read('.next/BUILD_ID').trim()})`);

  const htmlCount = fs.existsSync('.next/server/app')
    ? fs.readdirSync('.next/server/app', { recursive: true }).filter((f) => String(f).endsWith('.html')).length
    : 0;
  if (htmlCount < 50) {
    err(`Yalnızca ${htmlCount} statik sayfa üretilmiş. Beklenen: 70+`);
  } else {
    ok(`${htmlCount} statik sayfa üretildi`);
  }
}

// ---------------------------------------------------------------
// 2. SAHTE VERİ TARAMASI (en kritik kontrol)
// ---------------------------------------------------------------
const fakeDataPatterns = [
  { re: /user_ratings_total:\s*\d+/, msg: 'Hardcode edilmiş yorum sayısı' },
  { re: /ratingValue['"]?\s*:\s*[0-9.]+\s*[,}]/, msg: 'Hardcode edilmiş puan değeri' },
  { re: /author_name:\s*["'][A-ZÇĞİÖŞÜ]/, msg: 'Hardcode edilmiş yorum yazarı ismi' },
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(full);
  }
  return out;
}

let fakeFound = 0;
for (const file of walk('src')) {
  const content = read(file);
  if (!content) continue;
  for (const { re, msg } of fakeDataPatterns) {
    if (re.test(content)) {
      err(`SAHTE VERİ RİSKİ — ${file}: ${msg}`);
      fakeFound++;
    }
  }
}
if (fakeFound === 0) ok('Sahte yorum/puan taraması temiz');

// ---------------------------------------------------------------
// 3. ORTAM DEĞİŞKENLERİ
// ---------------------------------------------------------------
const criticalEnv = [
  ['NEXT_PUBLIC_GBP_PLACE_ID', 'Google yorumları görünmeyecek'],
  ['GBP_API_KEY', 'Google yorumları görünmeyecek'],
];
const leadEnv = ['RESEND_API_KEY', 'LEAD_WEBHOOK_URL', 'KV_REST_API_URL', 'UPSTASH_REDIS_REST_URL'];
const analyticsEnv = [
  ['NEXT_PUBLIC_GA_ID', 'Trafik ölçülemeyecek'],
  ['NEXT_PUBLIC_GSC_VERIFICATION', 'Search Console doğrulaması yapılamayacak'],
];

for (const [key, impact] of criticalEnv) {
  if (!process.env[key]) warn(`${key} tanımsız — ${impact}`);
  else ok(`${key} tanımlı`);
}

const hasLeadChannel = leadEnv.some((k) => process.env[k]);
if (!hasLeadChannel) {
  err('HİÇBİR lead kanalı yapılandırılmamış. Gelen teklif talepleri KAYBOLUR. En az birini tanımla: ' + leadEnv.join(', '));
} else {
  ok('Lead yakalama kanalı yapılandırılmış');
}

const hasKV = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
if (!hasKV) {
  warn('KV/Upstash yok — rate limit bellek içine düşer, serverless ortamda GÜVENİLMEZ (spam riski)');
}

for (const [key, impact] of analyticsEnv) {
  if (!process.env[key]) warn(`${key} tanımsız — ${impact}`);
}

// ---------------------------------------------------------------
// 4. DOĞRULANMAMIŞ İŞLETME BİLGİLERİ
// ---------------------------------------------------------------
const siteConfig = read('src/lib/site-config.ts');
if (siteConfig) {
  const todoCount = (siteConfig.match(/DOĞRULANACAK/g) || []).length;
  if (todoCount > 0) {
    warn(`site-config.ts içinde ${todoCount} adet DOĞRULANACAK alan var (K3 no, sosyal medya, adres, çalışan sayısı). Bunlar boş olduğu için E-E-A-T şema sinyalleri eksik yayınlanıyor.`);
  } else {
    ok('İşletme bilgilerinin tamamı doğrulanmış');
  }

  if (/social:\s*\{[^}]*facebook:\s*''/.test(siteConfig)) {
    warn("sameAs şeması boş — sosyal medya profilleri Google'a bildirilmiyor");
  }
}

// ---------------------------------------------------------------
// 5. ROBOTS / SITEMAP / CANONICAL
// ---------------------------------------------------------------
const robots = read('src/app/robots.txt/route.ts');
if (robots) {
  if (/Disallow:\s*\/\s*$/m.test(robots.split('User-agent: *')[1]?.split('User-agent')[0] || '')) {
    err('robots.txt tüm siteyi engelliyor! Site Google tarafından taranamaz.');
  } else {
    ok('robots.txt siteyi engellemiyor');
  }
  if (!robots.includes('Sitemap:')) err('robots.txt içinde Sitemap satırı yok');
  else ok('robots.txt sitemap bildiriyor');
}

// ---------------------------------------------------------------
// 6. PERFORMANS EŞİKLERİ
// ---------------------------------------------------------------
const sizeOf = (p) => {
  try {
    return fs.statSync(p).size;
  } catch {
    return 0;
  }
};

const indexHtml = sizeOf('.next/server/app/index.html');
if (indexHtml > 200_000) {
  warn(`Ana sayfa HTML'i ${Math.round(indexHtml / 1024)} KB — 120 KB hedefinin çok üstünde, mobil LCP'yi vurur`);
} else if (indexHtml > 0) {
  ok(`Ana sayfa HTML: ${Math.round(indexHtml / 1024)} KB`);
}

// Aşırı büyük görseller
if (fs.existsSync('public/img')) {
  const heavy = fs
    .readdirSync('public/img')
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .map((f) => ({ f, size: sizeOf(path.join('public/img', f)) }))
    .filter((x) => x.size > 300_000)
    .sort((a, b) => b.size - a.size);

  if (heavy.length) {
    warn(
      `${heavy.length} görsel 300 KB üstünde: ` +
        heavy.slice(0, 5).map((x) => `${x.f} (${Math.round(x.size / 1024)} KB)`).join(', ')
    );
  } else {
    ok('Tüm görseller 300 KB altında');
  }
}

// ---------------------------------------------------------------
// RAPOR
// ---------------------------------------------------------------
console.log('\n═══ CANLIYA ÇIKIŞ ÖN UÇUŞ KONTROLÜ ═══\n');
passed.forEach((m) => console.log(`  ✓ ${m}`));
if (warnings.length) {
  console.log('\n─── UYARILAR (engellemez) ───');
  warnings.forEach((m) => console.log(`  ! ${m}`));
}
if (errors.length) {
  console.log('\n─── HATALAR (canlıya çıkma) ───');
  errors.forEach((m) => console.log(`  ✗ ${m}`));
}

console.log(
  `\nÖzet: ${passed.length} geçti, ${warnings.length} uyarı, ${errors.length} hata\n`
);

process.exit(errors.length > 0 ? 1 : 0);
