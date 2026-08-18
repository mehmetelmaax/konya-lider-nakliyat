import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const DISTRICTS = [
  'cumra-evden-eve-nakliyat', 'aksehir-evden-eve-nakliyat', 'meram-evden-eve-nakliyat',
  'sarayonu-evden-eve-nakliyat', 'karapinar-evden-eve-nakliyat', 'karaisali-evden-eve-nakliyat',
  'beysehir-evden-eve-nakliyat', 'seydisehir-evden-eve-nakliyat', 'ilgin-evden-eve-nakliyat',
  'kulu-evden-eve-nakliyat', 'eregli-evden-eve-nakliyat', 'selcuklu-evden-eve-nakliyat',
  'cihanbeyli-evden-eve-nakliyat', 'kadinhani-evden-eve-nakliyat', 'karatay-evden-eve-nakliyat'
];

const SERVICES = [
  'asansorlu-evden-eve-nakliyat', 'esya-depolama', 'ofis-ve-isyeri-tasimaciligi',
  'parca-esya-tasima', 'piyano-ve-kasa-tasima', 'profesyonel-esya-paketleme',
  'sehirici-evden-eve-nakliyat', 'sehirlerarasi-evden-eve-nakliyat', 'ucretsiz-ekspertiz'
];

function fixPageImports(filePath) {
  if (!fs.existsSync(filePath)) return;

  let code = fs.readFileSync(filePath, 'utf8');
  let originalCode = code;

  // Add missing imports based on tags present in the JSX
  if (code.includes('<PricingMatrix') && !code.includes('import PricingMatrix')) {
    code = "import PricingMatrix from '@/components/geo/PricingMatrix';\n" + code;
  }
  if (code.includes('<BuildingAnalysis') && !code.includes('import BuildingAnalysis')) {
    code = "import BuildingAnalysis from '@/components/geo/BuildingAnalysis';\n" + code;
  }
  if (code.includes('<PackingSpecs') && !code.includes('import PackingSpecs')) {
    code = "import PackingSpecs from '@/components/geo/PackingSpecs';\n" + code;
  }
  if (code.includes('<K3InfoBlock') && !code.includes('import K3InfoBlock')) {
    code = "import K3InfoBlock from '@/components/geo/K3InfoBlock';\n" + code;
  }
  if (code.includes('FACTS.') && !code.includes('import { FACTS }')) {
    code = "import { FACTS } from '@/lib/facts';\n" + code;
  }

  if (code !== originalCode) {
    fs.writeFileSync(filePath, code, 'utf8');
    console.log(`Injected missing imports in: ${path.relative(rootDir, filePath)}`);
  }
}

// 1. Process all region pages
for (const slug of DISTRICTS) {
  const filePath = path.join(rootDir, 'src', 'app', 'bolgeler', slug, 'page.tsx');
  fixPageImports(filePath);
}

// 2. Process all service pages
for (const slug of SERVICES) {
  const filePath = path.join(rootDir, 'src', 'app', 'hizmetler', slug, 'page.tsx');
  fixPageImports(filePath);
}

console.log('✨ All page imports fixed successfully.');
