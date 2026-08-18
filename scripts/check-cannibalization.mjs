import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');

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

function normalizeTurkish(str) {
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '')
    .trim();
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

function runCannibalizationCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- CANNIBALIZATION AUDIT ---`);
  console.log(`Scanning ${htmlFiles.length} pages...\n`);

  const titleMap = {};
  const h1Map = {};
  const pagesList = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '').replace(/\/$/, '');
    const cleanRoute = route === '' ? '/' : route;
    const html = fs.readFileSync(file, 'utf8');

    // Extract Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? decodeEntities(titleMatch[1]) : '';

    // Extract H1
    const h1Match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? decodeEntities(h1Match[1].replace(/<[^>]*>/g, '')) : '';

    pagesList.push({ route: cleanRoute, title, h1 });

    if (title) {
      const normTitle = normalizeTurkish(title.split('|')[0]); // check base title before brand separator
      if (!titleMap[normTitle]) titleMap[normTitle] = [];
      titleMap[normTitle].push(cleanRoute);
    }

    if (h1) {
      const normH1 = normalizeTurkish(h1);
      if (!h1Map[normH1]) h1Map[normH1] = [];
      h1Map[normH1].push(cleanRoute);
    }
  }

  let conflicts = 0;

  console.log('Checking for H1 Conflicts (Exact duplicates):');
  for (const [h1, routes] of Object.entries(h1Map)) {
    if (routes.length > 1) {
      console.error(`❌ Conflict: Multiple pages share similar H1 [${h1}]:`, routes);
      conflicts++;
    }
  }

  console.log('\nChecking for Title Conflicts (Exact duplicates):');
  for (const [title, routes] of Object.entries(titleMap)) {
    if (routes.length > 1) {
      console.error(`❌ Conflict: Multiple pages share similar Title [${title}]:`, routes);
      conflicts++;
    }
  }

  // Core keyword overlap check for main service intent
  const coreKeywords = {
    'sehirlerarasi': ['sehirlerarasi', 'sehirlerarasievdenevenakliyat', 'sehirlerarasinakliyat'],
    'sehirici': ['sehirici', 'sehiricievdenevenakliyat', 'sehiricinakliyat'],
    'asansorlu': ['asansorlu', 'asansorluevdenevenakliyat', 'asansorlunakliyat'],
    'esya depolama': ['esyadepolama', 'depolama'],
    'esya paketleme': ['esyapaketleme', 'paketleme'],
    'ofis tasima': ['ofistasima', 'ofisveisyeritasimaciligi']
  };

  console.log('\nChecking for Keyword Overlaps (Potential Cannibalization):');
  const checkedPairs = new Set();
  for (let i = 0; i < pagesList.length; i++) {
    for (let j = i + 1; j < pagesList.length; j++) {
      const pageA = pagesList[i];
      const pageB = pagesList[j];

      const normTitleA = normalizeTurkish(pageA.title);
      const normTitleB = normalizeTurkish(pageB.title);
      const normH1A = normalizeTurkish(pageA.h1);
      const normH1B = normalizeTurkish(pageB.h1);

      for (const [keyword, patterns] of Object.entries(coreKeywords)) {
        const matchesA = patterns.some(p => normTitleA.includes(p) || normH1A.includes(p));
        const matchesB = patterns.some(p => normTitleB.includes(p) || normH1B.includes(p));

        if (matchesA && matchesB) {
          // Special exception: rotalar vs hizmetler is allowed (e.g. konya-istanbul-evden-eve-nakliyat contains sehirlerarasi but it is sub-route)
          // Also bolgeler is allowed to contain "evden eve nakliyat" as long as they don't share the same specific district name or service name
          const isRotaA = pageA.route.startsWith('/rotalar/');
          const isRotaB = pageB.route.startsWith('/rotalar/');
          const isServiceA = pageA.route.startsWith('/hizmetler/');
          const isServiceB = pageB.route.startsWith('/hizmetler/');

          // If one is the main service page and the other is a route page, that's normal hierarchy, not cannibalization!
          if ((isServiceA && isRotaB) || (isServiceB && isRotaA)) continue;

          // If both are route pages, that's fine
          if (isRotaA && isRotaB) continue;

          const pairKey = [pageA.route, pageB.route].sort().join(' <-> ');
          if (!checkedPairs.has(pairKey)) {
            checkedPairs.add(pairKey);
            console.warn(`⚠️  Potential Cannibalization Alert on key [${keyword}]:`);
            console.warn(`   - Page A: ${pageA.route} (H1: "${pageA.h1}", Title: "${pageA.title}")`);
            console.warn(`   - Page B: ${pageB.route} (H1: "${pageB.h1}", Title: "${pageB.title}")`);
          }
        }
      }
    }
  }

  console.log(`\nCannibalization check complete. Total critical duplicate conflicts: ${conflicts}`);
  
  if (conflicts > 0) {
    process.exit(1);
  } else {
    console.log('✨ All H1 and Title tags are uniquely targeted across pages!');
    process.exit(0);
  }
}

runCannibalizationCheck();
