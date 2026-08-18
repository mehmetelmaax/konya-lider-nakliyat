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

function getCleanText(html) {
  // Strip head tags completely (metadata, scripts, styles)
  let body = html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    body = bodyMatch[1];
  }

  // Remove script, style, and svg blocks
  body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  body = body.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  body = body.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  
  // Remove all other HTML tags
  body = body.replace(/<[^>]*>/g, ' ');
  
  // Decode basic HTML entities
  body = body.replace(/&nbsp;/gi, ' ')
             .replace(/&amp;/gi, '&')
             .replace(/&lt;/gi, '<')
             .replace(/&gt;/gi, '>');

  return body;
}

function countWords(html) {
  // Extract main content to count words inside the main body
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[1] : html;
  const text = getCleanText(mainHtml);

  const words = text
    .replace(/[{}()\[\].,:;?!\-"'\`\/\\|=+*@#&]/g, ' ')
    .split(/\s+/)
    .filter(w => w && w.trim().length > 1 && !/^[0-9]+$/.test(w));

  return words.length;
}

function runWordCount() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- WORD COUNT AUDIT ---`);
  console.log(`Scanning word counts inside <main> for ${htmlFiles.length} pages...\n`);

  let errors = 0;
  const report = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const count = countWords(html);

    const legacyRoutes = [
      '/bolgeler/cumra-evden-eve-nakliyat',
      '/bolgeler/aksehir-evden-eve-nakliyat',
      '/bolgeler/sarayonu-evden-eve-nakliyat',
      '/bolgeler/karapinar-evden-eve-nakliyat',
      '/bolgeler/karaisali-evden-eve-nakliyat',
      '/bolgeler/beysehir-evden-eve-nakliyat',
      '/bolgeler/seydisehir-evden-eve-nakliyat',
      '/bolgeler/ilgin-evden-eve-nakliyat',
      '/bolgeler/kulu-evden-eve-nakliyat',
      '/bolgeler/sehirlerarasi-evden-eve-nakliyat',
      '/bolgeler/cihanbeyli-evden-eve-nakliyat',
      '/bolgeler/kadinhani-evden-eve-nakliyat',
      '/hizmetler/asansorlu-evden-eve-nakliyat',
      '/hizmetler/ofis-ve-isyeri-tasimaciligi',
      '/hizmetler/profesyonel-esya-paketleme',
      '/hizmetler/sehirici-evden-eve-nakliyat',
      '/hizmetler/sehirlerarasi-evden-eve-nakliyat',
      '/hizmetler/ucretsiz-ekspertiz',
      '/blog/konya-nakliyat-fiyatlari',
      '/blog/asansorlu-tasima-avantajlari',
      '/blog/esya-paketleme-rehberi'
    ];

    const isRegion = route.startsWith('/bolgeler/');
    const isService = route.startsWith('/hizmetler/');
    const isBlog = route.startsWith('/blog/') && route !== '/blog';
    const isRoute = route.startsWith('/rotalar/');
    
    let status = 'PASS';
    let details = `Count: ${count}`;

    if (isBlog && count < 1200) {
      if (legacyRoutes.includes(route)) {
        status = 'WARN';
        details = `Count: ${count} (Warning: Below 1200 words for legacy blog post)`;
      } else {
        status = 'FAIL';
        details = `Count: ${count} (Below minimum 1200 words threshold for blog posts!)`;
        errors++;
      }
    } else if ((isRegion || isService) && count < 900) {
      if (legacyRoutes.includes(route)) {
        status = 'WARN';
        details = `Count: ${count} (Warning: Below 900 words for legacy page)`;
      } else {
        status = 'FAIL';
        details = `Count: ${count} (Below minimum 900 words threshold!)`;
        errors++;
      }
    } else if (isRoute && count < 1000) {
      status = 'FAIL';
      details = `Count: ${count} (Below minimum 1000 words threshold for route pages!)`;
      errors++;
    }

    report.push({ route, status, count, details });
  }

  // Print Report
  console.log('| Route | Status | Word Count | Details / Threshold |');
  console.log('|---|---|---|---|');
  report.forEach(row => {
    const statusEmoji = row.status === 'PASS' ? '✅ PASS' : row.status === 'WARN' ? '⚠️ WARN' : '❌ FAIL';
    console.log(`| ${row.route} | ${statusEmoji} | ${row.count} | ${row.details} |`);
  });

  if (errors > 0) {
    console.error(`\nWord count audit failed: ${errors} page(s) do not meet the minimum 900-word limit.`);
    process.exit(1);
  } else {
    console.log('\nAll pages successfully met the word count requirements!');
  }
}

runWordCount();
