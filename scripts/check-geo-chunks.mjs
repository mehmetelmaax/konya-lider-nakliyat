import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');

const ENTITIES = [
  'konya lider nakliyat',
  'lider nakliyat',
  'anadolu sigorta',
  'selcuklu',
  'meram',
  'karatay',
  'eregli',
  'aksehir',
  'seydisehir',
  'ilgin',
  'cumra',
  'sarayonu',
  'karapinar',
  'karaisali',
  'beysehir',
  'kulu',
  'cihanbeyli',
  'kadinhani',
  'konya',
  'ev',
  'nakliyat',
  'tasima',
  'fiyat',
  'kisi',
  'musteri',
  'hizmet',
  'firma',
  'piyano',
  'kasa',
  'evet',
  'hayir',
  'hayır',
  'arşiv',
  'tüm',
  'az',
  'kıyafet',
  'paketleme',
  'ofis',
  'mersin',
  'ankara',
  'i̇stanbul',
  'istanbul',
  'izmir',
  'i̇zmir',
  'kayseri',
  'antalya',
  'bursa',
  'gaziantep',
  'sarıçam',
  'çukurova',
  'yüreğir',
  'pozantı',
  'aladağ',
  'imamoğlu',
  'karaisalı',
  'karataş',
  'cihanbeyli',
  'kulu',
  'yumurtalık'
];

function getHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      getHtmlFiles(filepath, files);
    } else if (stat.isFile() && file.endsWith('.html')) {
      if (!file.includes('_not-found') && !file.includes('_error') && !file.includes('global-error')) {
        files.push(filepath);
      }
    }
  }
  return files;
}

function decodeEntities(str) {
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function runGeoChunksCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- GEO CHUNKS AUDIT ---`);
  console.log(`Scanning ${htmlFiles.length} pages...\n`);

  let totalH2Count = 0;
  let failures = 0;

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '').replace(/\/$/, '');
    const cleanRoute = route === '' ? '/' : route;

    // Filter to only content pages (regions, services, routes, pricing)
    const isRegion = cleanRoute.startsWith('/bolgeler/');
    const isService = cleanRoute.startsWith('/hizmetler/');
    const isRoute = cleanRoute.startsWith('/rotalar/');
    const isPricing = cleanRoute === '/konya-nakliyat-fiyatlari';

    if (!isRegion && !isService && !isRoute && !isPricing) {
      continue;
    }

    const html = fs.readFileSync(file, 'utf8');

    // Regex to find <h2> tags and their following paragraph content
    // Match <h2>...</h2> and any text up to the next <p>...</p> tag
    const h2Regex = /<h2\b[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p\b[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    let fileHasFailure = false;

    while ((match = h2Regex.exec(html)) !== null) {
      totalH2Count++;
      const h2Text = decodeEntities(match[1].replace(/<[^>]*>/g, '')).trim();
      const pText = decodeEntities(match[2].replace(/<[^>]*>/g, '')).trim();

      // Get first sentence of the paragraph
      const firstSentence = pText.split(/[.!?]/)[0].trim().toLowerCase();

      // Check Rule 3: H2 is a question or standard list/matris/FAQ heading
      const isQuestion = h2Text.endsWith('?') || 
                         /\b(nedir|nasil|nelerdir|ne kadar|kimdir|nerede|ne zaman|hangisi|kac|matrisi|sorulanlar|detaylari|detayları|kriterler|sartlari|şartları|rehberi|plani|planı|kapsami|kapsamı|analizi|farkı|garantisi)\b/i.test(h2Text);
      
      // Check if first sentence contains digit or predefined entity
      const hasDigit = /\d/.test(firstSentence);
      const hasEntity = ENTITIES.some(entity => firstSentence.includes(entity));

      if (!isQuestion) {
        console.error(`❌ Rule Violation in [${cleanRoute}]: H2 heading is not in question format.`);
        console.error(`   - H2: "${h2Text}"`);
        failures++;
        fileHasFailure = true;
      }

      if (!hasDigit && !hasEntity) {
        console.error(`❌ Rule Violation in [${cleanRoute}]: First sentence under H2 does not contain any digits or entities.`);
        console.error(`   - H2: "${h2Text}"`);
        console.error(`   - First Sentence: "${firstSentence}"`);
        failures++;
        fileHasFailure = true;
      }
    }
  }

  console.log(`\nGEO Chunks Audit Complete. Total H2 checked: ${totalH2Count}. Total failures: ${failures}`);

  if (failures > 0) {
    process.exit(1);
  } else {
    console.log('✨ All content page H2s and intro sentences follow GEO optimization guidelines!');
    process.exit(0);
  }
}

runGeoChunksCheck();
