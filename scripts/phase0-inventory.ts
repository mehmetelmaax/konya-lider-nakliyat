import fs from 'fs';
import path from 'path';

const projectDir = 'C:\\Users\\mehme\\.gemini\\antigravity\\scratch\\konya-lider-nakliyat';
const srcDir = path.join(projectDir, 'src');
const buildAppDir = path.join(projectDir, '.next', 'server', 'app');

console.log('Starting Phase 0 Detailed Inventory and Audit...\n');

// 1. Scan Build Outputs for JSON-LD Schemas
const jsonLdStats: {
  totalPagesScanned: number;
  typesCount: Record<string, number>;
  pageBreadcrumbCount: Record<string, number>;
  movingCompanyPages: string[];
  organizationPages: string[];
  localBusinessPages: string[];
} = {
  totalPagesScanned: 0,
  typesCount: {},
  pageBreadcrumbCount: {},
  movingCompanyPages: [],
  organizationPages: [],
  localBusinessPages: []
};

function scanHtmlFiles(dir: string) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      scanHtmlFiles(fullPath);
    } else if (item.endsWith('.html')) {
      jsonLdStats.totalPagesScanned++;
      const relativePath = path.relative(buildAppDir, fullPath).replace(/\\/g, '/');
      const html = fs.readFileSync(fullPath, 'utf8');
      
      // Extract JSON-LD scripts
      const jsonLdRegex = /<script\b[^>]*type=['"]application\/ld\+json['"][^>]*>([\s\S]*?)<\/script>/gi;
      let match;
      let breadcrumbCount = 0;
      
      while ((match = jsonLdRegex.exec(html)) !== null) {
        try {
          const json = JSON.parse(match[1].trim());
          const processGraphNode = (node: Record<string, unknown>) => {
            const type = node['@type'] as string | undefined;
            if (type) {
              jsonLdStats.typesCount[type] = (jsonLdStats.typesCount[type] || 0) + 1;
              if (type === 'BreadcrumbList') breadcrumbCount++;
              if (type === 'MovingCompany') jsonLdStats.movingCompanyPages.push(relativePath);
              if (type === 'Organization') jsonLdStats.organizationPages.push(relativePath);
              if (type === 'LocalBusiness') jsonLdStats.localBusinessPages.push(relativePath);
            }
          };

          if (json['@graph'] && Array.isArray(json['@graph'])) {
            json['@graph'].forEach(processGraphNode);
          } else {
            processGraphNode(json);
          }
        } catch (e) {
          // ignore parsing error for non-valid json
        }
      }
      
      if (breadcrumbCount > 0) {
        jsonLdStats.pageBreadcrumbCount[relativePath] = breadcrumbCount;
      }
    }
  });
}

scanHtmlFiles(buildAppDir);

// 2. Scan for Codebase Value Clashes
const clashingValues: {
  addresses: { file: string; line: number; value: string }[];
  hours: { file: string; line: number; value: string }[];
  phones: { file: string; line: number; value: string }[];
  colors: { file: string; line: number; value: string }[];
  formRenderings: { file: string; count: number }[];
} = {
  addresses: [],
  hours: [],
  phones: [],
  colors: [],
  formRenderings: []
};

// Patterns to search in code files
const addressPatterns = [/Nişantaş\s*Mahallesi/i, /Fatih\s*Mahallesi/i, /Fatih\s*Mh/i];
const hoursPatterns = [/08:00\s*[–-]\s*22:00/, /07:00\s*[–-]\s*22:00/, /7\/24/i];
const phonePatterns = [/0554\s*640\s*02\s*05/i, /5546400205/];
const colorPatterns = [/#0D3E30/i, /#D4AF37/i, /#102A43/i, /#f7931e/i];

function searchCodeFiles(dir: string) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        searchCodeFiles(fullPath);
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.ts', '.tsx', '.css'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const fileRel = path.relative(projectDir, fullPath).replace(/\\/g, '/');

        // Address checks
        addressPatterns.forEach(pat => {
          if (pat.test(content) && !fileRel.includes('site-config.ts') && !fileRel.includes('schema.ts')) {
            const line = content.split('\n').findIndex(l => pat.test(l)) + 1;
            clashingValues.addresses.push({ file: fileRel, line, value: content.split('\n')[line-1]?.trim() });
          }
        });

        // Hours checks
        hoursPatterns.forEach(pat => {
          if (pat.test(content) && !fileRel.includes('site-config.ts') && !fileRel.includes('schema.ts') && !fileRel.includes('GoogleReviews.tsx')) {
            const line = content.split('\n').findIndex(l => pat.test(l)) + 1;
            clashingValues.hours.push({ file: fileRel, line, value: content.split('\n')[line-1]?.trim() });
          }
        });

        // Phone checks
        phonePatterns.forEach(pat => {
          if (pat.test(content) && !fileRel.includes('site-config.ts')) {
            const line = content.split('\n').findIndex(l => pat.test(l)) + 1;
            clashingValues.phones.push({ file: fileRel, line, value: content.split('\n')[line-1]?.trim() });
          }
        });

        // Color checks
        colorPatterns.forEach(pat => {
          if (pat.test(content) && !fileRel.includes('globals.css') && !fileRel.includes('tailwind') && !fileRel.includes('CookieConsent.tsx')) {
            const line = content.split('\n').findIndex(l => pat.test(l)) + 1;
            clashingValues.colors.push({ file: fileRel, line, value: content.split('\n')[line-1]?.trim() });
          }
        });

        // Multiple form rendering analysis (QuoteForm)
        const quoteFormMatches = content.match(/<QuoteForm/g);
        if (quoteFormMatches && quoteFormMatches.length > 1) {
          clashingValues.formRenderings.push({ file: fileRel, count: quoteFormMatches.length });
        }
      }
    }
  });
}

searchCodeFiles(srcDir);

// 3. Scan for Internal Link Integrity
const internalLinks: { file: string; link: string }[] = [];
const allRoutes = new Set([
  '/',
  '/blog',
  '/bolgeler',
  '/hizmetler',
  '/rotalar',
  '/galeri',
  '/hakkimizda',
  '/iletisim',
  '/konya-nakliyat-firmalari',
  '/konya-nakliyat-fiyatlari',
  '/tasinma-kontrol-listesi',
  '/teklif-al',
  '/yasal/gizlilik',
  '/yasal/kvkk'
]);

// Read SITE_CONFIG to dynamically populate routes
import { SERVICES as configServices, DISTRICTS as configDistricts } from '../src/lib/site-config';
import { ROUTES as configRoutes } from '../src/lib/routes-data';
import { blogDatabase } from '../src/lib/blog-data';

configServices.forEach(s => allRoutes.add(`/hizmetler/${s.slug}`));
configDistricts.forEach(d => allRoutes.add(`/bolgeler/${d.slug}`));
configRoutes.forEach(r => allRoutes.add(`/rotalar/${r.slug}`));
Object.keys(blogDatabase).forEach(id => allRoutes.add(`/blog/${id}`));

function checkLinks(dir: string) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        checkLinks(fullPath);
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.ts', '.tsx'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const fileRel = path.relative(projectDir, fullPath).replace(/\\/g, '/');

        // Regex for href="..." links
        const hrefRegex = /href=['"](\/[^'"]*)['"]/g;
        let match;
        while ((match = hrefRegex.exec(content)) !== null) {
          const urlPath = match[1].split('#')[0]; // strip hash link
          if (urlPath && !allRoutes.has(urlPath) && !urlPath.startsWith('/_next') && !urlPath.includes('tel:') && !urlPath.includes('mailto:')) {
            internalLinks.push({ file: fileRel, link: match[1] });
          }
        }
      }
    }
  });
}

checkLinks(srcDir);

// 4. Generate denetim/00-envanter.md
const reportPath = path.join(projectDir, 'denetim', '00-envanter.md');
const report = `# Faz 0 — Detaylı Envanter ve Audit Raporu

Rapor Oluşturma Tarihi: ${new Date().toISOString().split('T')[0]}

---

## 1. Şema Analizi (JSON-LD)
Prerender edilen HTML sayfalarından çıkarılan JSON-LD analiz sonuçları:

- **Toplam HTML Sayfası:** ${jsonLdStats.totalPagesScanned}
- **@type Dağılımı:**
${Object.entries(jsonLdStats.typesCount).map(([type, count]) => `  - \`${type}\`: ${count} adet`).join('\n')}

### 1.1 Çift BreadcrumbList Tespit Edilen Sayfalar
Sayfa başına render edilen \`BreadcrumbList\` şeması sayıları:
${Object.entries(jsonLdStats.pageBreadcrumbCount).map(([page, count]) => `  - \`${page}\`: ${count} adet ${count > 1 ? '⚠️ (ÇİFT ŞEMA HATA)' : ''}`).join('\n')}

### 1.2 MovingCompany / Organization / LocalBusiness Varlığı
- **MovingCompany tanımlı sayfalar:**
${jsonLdStats.movingCompanyPages.map(p => `  - \`${p}\``).join('\n')}
- **Organization tanımlı sayfalar:**
${jsonLdStats.organizationPages.map(p => `  - \`${p}\``).join('\n')}
- **LocalBusiness tanımlı sayfalar:**
${jsonLdStats.localBusinessPages.map(p => `  - \`${p}\``).join('\n')}

---

## 2. Kırık / Olmayan İç Linkler
Kod tabanında yer alan ancak sitemap veya rotalarda tanımlı olmayan bağlantılar:
${internalLinks.length === 0 ? 'Tebrikler, tüm iç linkler geçerli rotaları işaret ediyor.' : internalLinks.map(l => `  - \`${l.file}\` içinde kırık adres: \`${l.link}\``).join('\n')}

---

## 3. Kod Tabanı İş Verisi Çelişkileri (NAP & Çakışmalar)

### 3.1 Adres Çakışmaları (site-config.ts dışında hardcoded adresler)
${clashingValues.addresses.length === 0 ? 'Çakışan veya hardcoded adres bulunamadı.' : clashingValues.addresses.map(a => `  - \`${a.file}\` Satır ${a.line}: \`${a.value}\``).join('\n')}

### 3.2 Çalışma Saati Çakışmaları
${clashingValues.hours.length === 0 ? 'Çakışan veya hardcoded çalışma saati bulunamadı.' : clashingValues.hours.map(h => `  - \`${h.file}\` Satır ${h.line}: \`${h.value}\``).join('\n')}

### 3.3 Telefon Numarası Çakışmaları
${clashingValues.phones.length === 0 ? 'Hardcoded telefon numarası bulunamadı.' : clashingValues.phones.map(p => `  - \`${p.file}\` Satır ${p.line}: \`${p.value}\``).join('\n')}

### 3.4 Renk Çakışmaları (Eski vs Yeni Marka Paleti Sızıntıları)
${clashingValues.colors.length === 0 ? 'Çakışan renk kodu bulunamadı.' : clashingValues.colors.map(c => `  - \`${c.file}\` Satır ${c.line}: \`${c.value}\``).join('\n')}

---

## 4. DOM ID Çakışması Analizi (Çift Render Edilen Bileşenler)
Bir sayfada birden fazla kez çağrılarak DOM id çakışmasına sebep olan bileşenler:
${clashingValues.formRenderings.length === 0 ? 'DOM ID çakışması yapabilecek çoklu render bulunamadı.' : clashingValues.formRenderings.map(f => `  - \`${f.file}\` içinde QuoteForm \`${f.count}\` kez çağrılıyor (HATA: DOM ID çakışması & odak kayması)`).join('\n')}
`;

fs.writeFileSync(reportPath, report, 'utf8');
console.log('Audit completed and denetim/00-envanter.md written successfully!');
