import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');
const reportOutputPath = path.join(__dirname, '..', 'SEO-GEO-DURUM.md');

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
  if (!str) return '';
  return str
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getCleanText(html) {
  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    body = bodyMatch[1];
  }
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  body = body.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  body = body.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  body = body.replace(/<[^>]*>/g, ' ');
  return body.replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function countWords(html) {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : html;
  const text = getCleanText(mainHtml);
  const words = text
    .replace(/[{}()\[\].,:;?!\-"'\`\/\\|=+*@#&]/g, ' ')
    .split(/\s+/)
    .filter(w => w && w.trim().length > 1 && !/^[0-9]+$/.test(w));
  return words.length;
}

function countInternalLinks(html) {
  const linkMatches = html.matchAll(/<a\s+[^>]*href="([^"]*)"/gi);
  let count = 0;
  for (const match of linkMatches) {
    const href = match[1].trim();
    const isInternal = href.startsWith('/') || href.startsWith('https://konyaliderevdeneve.com');
    const isExcluded = href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#';
    if (isInternal && !isExcluded) {
      count++;
    }
  }
  return count;
}

function extractSchemas(html) {
  const schemaMatches = html.matchAll(/<script\s+[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  const types = new Set();
  
  for (const match of schemaMatches) {
    try {
      const json = JSON.parse(match[1].trim());
      const findTypes = (obj) => {
        if (Array.isArray(obj)) {
          obj.forEach(findTypes);
        } else if (obj && typeof obj === 'object') {
          if (obj['@type']) {
            types.add(obj['@type']);
          }
          if (obj['@graph']) {
            findTypes(obj['@graph']);
          }
          Object.values(obj).forEach(val => {
            if (typeof val === 'object') findTypes(val);
          });
        }
      };
      findTypes(json);
    } catch (e) {
      // ignore
    }
  }
  
  return types.size > 0 ? Array.from(types).join(', ') : 'None';
}

function calculateGeoScore(html, wordCount) {
  let score = 1; // Base score
  
  // 1. H2 question mark check
  const h2Matches = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi));
  const totalH2s = h2Matches.length;
  const questionH2s = h2Matches.filter(m => m[1].includes('?')).length;
  if (totalH2s > 0 && questionH2s / totalH2s >= 0.5) {
    score += 1;
  }
  
  // 2. Table element check
  const hasTable = html.includes('<table');
  if (hasTable) {
    score += 1;
  }
  
  // 3. Word count richness (e.g. > 1000 words adds points for depth)
  if (wordCount > 1000) {
    score += 1;
  }
  
  // 4. Proper brand or entities first sentence structure check
  const firstParagraphMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (firstParagraphMatch) {
    const text = firstParagraphMatch[1].replace(/<[^>]*>/g, '');
    const hasBrand = text.includes('Konya Lider') || text.includes('Lider Nakliyat');
    const hasNumbers = /[0-9]/.test(text);
    if (hasBrand || hasNumbers) {
      score += 1;
    }
  }
  
  return score;
}

function getPageType(route) {
  if (route === '/') return 'Anasayfa';
  if (route.startsWith('/bolgeler')) return 'Bölge Sayfası';
  if (route.startsWith('/hizmetler')) return 'Hizmet Sayfası';
  if (route.startsWith('/rotalar')) return 'Rota Sayfası';
  if (route.startsWith('/blog')) return 'Blog İçeriği';
  return 'Genel Sayfa';
}

function getKeywordsForPage(route) {
  if (route === '/') return 'konya evden eve nakliyat, konya nakliyat';
  if (route.includes('meram')) return 'çukurova evden eve nakliyat, çukurova nakliyat fiyatları';
  if (route.includes('selcuklu')) return 'selcuklu evden eve nakliyat, selcuklu nakliyat';
  if (route.includes('karatay')) return 'yüreğir evden eve nakliyat';
  if (route.includes('eregli')) return 'sarıçam evden eve nakliyat';
  if (route.includes('asansorlu')) return 'konya asansörlü nakliyat, kiralık asansör konya';
  if (route.includes('fiyatlari')) return 'konya nakliyat fiyatları, ev taşıma fiyatları konya';
  if (route.includes('firmalari')) return 'konya nakliyat firmaları, en iyi konya nakliye';
  if (route.includes('sehirlerarasi')) return 'konya şehirlerarası nakliyat, konya şehirler arası ev taşıma';
  return 'konya nakliyat rehberleri';
}

function generateSeoReport() {
  console.log('Generating SEO & GEO Status Report (SEO-GEO-DURUM.md)...');
  
  const htmlFiles = getHtmlFiles(appBuildDir);
  if (htmlFiles.length === 0) {
    console.error('No compiled HTML files found in .next directory! Make sure to run npm run build first.');
    return;
  }

  const rows = [];
  
  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    let route = '/' + relativePath.replace('.html', '').replace(/\\/g, '/').replace('/index', '');
    if (route === '/index') route = '/';
    
    const html = fs.readFileSync(file, 'utf8');
    
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : 'Missing';
    
    const descMatch = html.match(/<meta\s+[^>]*name="description"\s+content="([^"]*)"/i) || 
                      html.match(/<meta\s+[^>]*content="([^"]*)"\s+name="description"/i);
    const description = descMatch ? decodeEntities(descMatch[1].trim()) : 'Missing';
    
    const robotsMatch = html.match(/<meta\s+[^>]*name="robots"\s+content="([^"]*)"/i) || 
                        html.match(/<meta\s+[^>]*content="([^"]*)"\s+name="robots"/i);
    const robotsDirective = robotsMatch ? robotsMatch[1].trim() : 'index, follow';
    const indexable = !robotsDirective.includes('noindex');
    
    const schemas = extractSchemas(html);
    const wordCount = countWords(html);
    const internalLinks = countInternalLinks(html);
    const geoScore = calculateGeoScore(html, wordCount);
    
    rows.push({
      route,
      title,
      description,
      indexable,
      schemas,
      wordCount,
      internalLinks,
      geoScore
    });
  }
  
  // Sort rows alphabetically by route
  rows.sort((a, b) => a.route.localeCompare(b.route));
  
  // Detect Cannibalization
  const cannibalizationAlerts = [];
  const seenTitles = new Map();
  const seenDescs = new Map();

  rows.forEach(r => {
    if (r.indexable) {
      if (seenTitles.has(r.title)) {
        cannibalizationAlerts.push(`⚠️ **Kanibalizasyon Uyarısı (Aynı Başlık):** \`${r.route}\` ve \`${seenTitles.get(r.title)}\` aynı başlığı kullanıyor: "${r.title}"`);
      } else {
        seenTitles.set(r.title, r.route);
      }

      if (seenDescs.has(r.description) && r.description !== 'Missing') {
        cannibalizationAlerts.push(`⚠️ **Kanibalizasyon Uyarısı (Aynı Açıklama):** \`${r.route}\` ve \`${seenDescs.get(r.description)}\` aynı meta açıklamayı paylaşıyor.`);
      } else {
        seenDescs.set(r.description, r.route);
      }
    }
  });
  
  // Generate Markdown
  let md = `# SEO ve GEO Durum Raporu (SEO-GEO-DURUM.md)
  
*Bu rapor Next.js build çıktıları (.next/server/app) taranarak otomatik üretilmiştir.*
*Son Tarama Tarihi: ${new Date().toLocaleDateString('tr-TR')}*

## 1. Sayfa Envanteri ve GEO Hazırlık Skorları

Aşağıdaki tablo, sitedeki tüm canlı rotaların SEO ve GEO (Generative Engine Optimization) metriklerini gösterir. GEO Skoru 1-5 arası derecelendirilir:
- **1-2**: Temel seviye, yapısal veri eksik.
- **3-4**: İyi, soru başlıkları and semantik veri mevcut.
- **5 (Maksimum)**: Kusursuz GEO uyumluluğu (Soru başlığı, tablo varlığı, net rakam/özne içeren ilk cümleler, zengin kelime hacmi).

| Sayfa Yolu | Tip | Başlık (Title) | Kelime | Şema (Schema) | İndekslenebilir | GEO Skoru |
| :--- | :--- | :--- | :---: | :--- | :---: | :---: |
`;

  rows.forEach(r => {
    const status = r.indexable ? '🟢 Evet' : '🔴 Hayır (Noindex)';
    const scoreStars = '⭐'.repeat(r.geoScore);
    md += `| \`${r.route}\` | ${getPageType(r.route)} | ${r.title} | ${r.wordCount} | ${r.schemas.slice(0, 30)}... | ${status} | ${scoreStars} (${r.geoScore}/5) |\n`;
  });

  md += `
## 2. Hedef Anahtar Kelime Haritası

AI Arama motorlarının ve Google botlarının hangi sayfayı hangi arama niyetiyle ilişkilendirmesi gerektiğini gösteren kelime haritası:

| Hedef Anahtar Kelime | Eşleşen Sayfa Rotaları |
| :--- | :--- |
`;

  rows.forEach(r => {
    if (r.indexable) {
      md += `| \`${getKeywordsForPage(r.route)}\` | [\`${r.route}\`](${r.route}) |\n`;
    }
  });

  md += `
## 3. Kanibalizasyon Analizi ve Uyarıları

Aynı arama niyetini (intent) hedefleyen ve birbiriyle yarışan sayfaların denetimi:

${cannibalizationAlerts.length > 0 ? cannibalizationAlerts.join('\n\n') : '✅ **Mükemmel!** Birebir çakışan veya kanibalizasyona yol açan başlık/açıklama bulunamadı.'}

---
Rapor sonu. Her build işleminden sonra bu rapor güncellenmektedir.
`;

  fs.writeFileSync(reportOutputPath, md, 'utf8');
  console.log(`SEO & GEO Status Report successfully written to: ${reportOutputPath}`);
}

generateSeoReport();
