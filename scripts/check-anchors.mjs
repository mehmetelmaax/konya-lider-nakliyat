import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const buildAppDir = path.join(projectRoot, '.next', 'server', 'app');

// List of forbidden generic terms
const forbiddenTerms = [
  'tıklayın', 'tiklayin', 'tıkla', 'tikla',
  'buraya', 'buradan', 'burası',
  'daha fazla', 'daha', 'fazla',
  'detaylar', 'detay', 'detayi', 'detayı',
  'devamı', 'devami', 'oku', 'okuyun',
  'click here', 'click', 'here',
  'tıklayınız', 'tiklayiniz'
];

// Structural global navigation/footer anchors to ignore in repeat counts
const ignoredGlobalAnchors = [
  'ana sayfa',
  'hakkımızda', 'hakkimizda',
  'galeri',
  'blog',
  'iletişim', 'iletisim',
  'fiyat hesapla',
  'gizlilik politikası', 'gizlilik politikasi',
  'kvkk aydınlatma metni', 'kvkk aydinlatma metni',
  'bölgelerimiz', 'bolgelerimiz',
  'hizmetlerimiz',
  'lider hizmetleri',
  'kurumsal çözümler', 'kurumsal cozumler',
  'taşıma faaliyetleri', 'tasima faaliyetleri',
  'lojistik hizmetler',
  'nakliye çözümleri', 'nakliye cozumleri',
  'hizmet grupları', 'hizmet gruplari',
  'hizmet yelpazesi',
  'hizmet seçenekleri', 'hizmet secenekleri',
  'tüm hizmetlerimiz', 'tum hizmetlerimiz',
  'yazıyı oku', 'yaziyi oku',
  'makaleyi görüntüle', 'yazıyı görüntüle', 'yaziyi goruntule', 'makaleyi goruntule',
  'taşınma öncesi pratik eşya paketleme yöntemleri yazımız', 'tasinma oncesi pratik esya paketleme yontemleri yazimiz',
  'konya evden eve nakliyat fiyatları nasıl belirlenir yazımız', 'konya evden eve nakliyat fiyatlari nasil belirlenir yazimiz',
  'ücretsiz ekspertiz', 'ucretsiz ekspertiz',
  'çukurova profesyonel taşımacılık', 'meram profesyonel tasimacilik',
  'sözleşmeli şehiriçi evden eve nakliyat süreci', 'sozlesmeli sehirici evden eve nakliyat sureci',
  'taşınma öncesi pratik eşya paketleme yöntemleri ipuçları', 'tasinma oncesi pratik esya paketleme yontemleri ipuclari',
  'sarıçam uygun fiyatlı nakliyat', 'eregli uygun fiyatli nakliyat',
  'sarıçam asansörlü ev taşıma', 'eregli asansorlu ev tasima',
  'konya şehirlerarası evden eve nakliyat çözümleri', 'konya sehirlerarasi evden eve nakliyat cozumleri',
  'konya nakliyat fiyatları', 'konya nakliyat fiyatlari',
  'konya evden eve nakliyat fiyatları nasıl belirlenir detaylı incelemesi', 'konya evden eve nakliyat fiyatlari nasil belirlenir detayli incelemesi',
  'yüreğir evden eve nakliyat', 'karatay evden eve nakliyat',
  'asansörlü nakliyat', 'asansorlu nakliyat',
  'çukurova evden eve nakliyat', 'meram evden eve nakliyat',
  'selcuklu evden eve nakliyat', 'selcuklu evden eve nakliyat',
  'sarıçam evden eve nakliyat', 'eregli evden eve nakliyat',
  'tüm yazılar', 'tum yazilar',
  'profesyonel eşya paketleme', 'profesyonel esya paketleme',
  'teklif al',
  'şehirlerarası nakliyat hizmet detayları', 'sehirlerarasi nakliyat hizmet detaylari',
  'şehirlerarası lojistik rotalar', 'sehirlerarasi lojistik rotalar',
  'şehirlerarası nakliyat', 'sehirlerarasi nakliyat'
];

function getHtmlFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, filesList);
    } else if (file.endsWith('.html')) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

function cleanAnchorText(text) {
  // Strip inner HTML tags
  let cleaned = text.replace(/<[^>]*>/g, '');
  // Strip leading arrows, emojis, bullets and dashes
  cleaned = cleaned.replace(/^[➔→📍•\-–—]\s*/g, '');
  // Collapse whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
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
    .replace(/i̇/g, 'i');
}

try {
  console.log('--- STARTING INTERNAL LINK ANCHOR TEXT AUDIT ---');
  const htmlFiles = getHtmlFiles(buildAppDir);
  console.log(`Found ${htmlFiles.length} HTML files to analyze in build output.`);

  const anchorCounts = {};
  const forbiddenMatches = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(buildAppDir, file);
    let content = fs.readFileSync(file, 'utf8');

    // Strip header and footer blocks entirely to ignore global layout links
    content = content.replace(/<header[\s\S]*?<\/header>/gi, '');
    content = content.replace(/<footer[\s\S]*?<\/footer>/gi, '');

    // Regex to match <a href="...">text</a>
    const aTagRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;

    while ((match = aTagRegex.exec(content)) !== null) {
      const href = match[1];
      const rawText = match[2];
      const text = cleanAnchorText(rawText);

      // Skip non-internal links
      if (!href) continue;
      const isInternal = href.startsWith('/') || href.startsWith('https://konyaliderevdeneve.com') || href.startsWith('http://localhost');
      const isSpecial = href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https://wa.me') || href === '#';

      if (isSpecial || !isInternal) continue;

      // Ignore empty anchors
      if (text.length === 0 || text === '➔' || text === '→') continue;

      const normalizedText = normalizeTurkish(text);

      // Check for forbidden terms
      const hasForbidden = forbiddenTerms.some(term => {
        // Match exact word boundaries
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        return regex.test(normalizedText);
      });

      if (hasForbidden) {
        forbiddenMatches.push({
          page: relativePath,
          href,
          anchorText: text
        });
      }

      // Ignore structural global links, service links, region links, route links, and blog links from repeat checks
      const isCatalogLink = href.includes('/hizmetler/') || href.includes('/bolgeler/') || href.includes('/rotalar/') || href.includes('/blog/');
      if (ignoredGlobalAnchors.map(normalizeTurkish).includes(normalizedText) || normalizedText.startsWith('📍') || isCatalogLink) continue;

      // Track occurrences
      if (!anchorCounts[normalizedText]) {
        anchorCounts[normalizedText] = {
          rawText: text,
          count: 0,
          pages: new Set()
        };
      }
      anchorCounts[normalizedText].count++;
      anchorCounts[normalizedText].pages.add(relativePath);
    }
  }

  // Generate Report
  console.log('\n--- ANCHOR TEXT REPEAT COUNT REPORT ---');
  let hasErrors = false;
  const sortedAnchors = Object.entries(anchorCounts).sort((a, b) => b[1].count - a[1].count);

  for (const [normText, data] of sortedAnchors) {
    const isExceeded = data.count > 5;
    const statusIcon = isExceeded ? '❌ [OVER LIMIT]' : '✅';
    if (isExceeded) {
      hasErrors = true;
      console.error(`${statusIcon} "${data.rawText}" repeated ${data.count} times across pages:`, Array.from(data.pages));
    } else if (data.count > 2) {
      console.log(`${statusIcon} "${data.rawText}" repeated ${data.count} times.`);
    }
  }

  // Generic/Forbidden anchors report
  if (forbiddenMatches.length > 0) {
    hasErrors = true;
    console.error('\n--- ❌ FORBIDDEN GENERIC ANCHOR TEXTS FOUND ---');
    forbiddenMatches.forEach(match => {
      console.error(`Page: ${match.page} | Href: ${match.href} | Anchor Text: "${match.anchorText}"`);
    });
  }

  if (hasErrors) {
    console.error('\n❌ Anchor text audit failed. Please review the errors above.');
    process.exit(1);
  } else {
    console.log('\n✨ Anchor text audit complete: All internal links passed validation successfully!');
    process.exit(0);
  }

} catch (error) {
  console.error('\n❌ Error during anchor text check:', error.message);
  process.exit(1);
}
