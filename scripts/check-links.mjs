import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');
const siteCanonicalDomain = 'https://konyaliderevdeneve.com';

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

function runLinksCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- INTERNAL LINKS INTEGRITY AUDIT ---`);
  console.log(`Scanning links in ${htmlFiles.length} pages...\n`);

  let errors = 0;
  const report = [];

  // 1. Build a Set of all valid local file paths so we can check against it instantly
  const validFiles = new Set(htmlFiles.map(f => path.normalize(f)));

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const pageErrors = [];
    
    // Match all href attribute values
    const hrefMatches = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/gi)].map(m => m[1].trim());

    let internalLinkCount = 0;

    for (const href of hrefMatches) {
      // Ignore hashes, phone, whatsapp, email, and unrelated external links
      if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
        continue;
      }
      
      // Check if it is a WhatsApp api link or Google maps link
      if (href.includes('wa.me') || href.includes('whatsapp.com') || href.includes('google.com/maps') || href.includes('share.google')) {
        continue;
      }

      let cleanHref = href;

      // Check if it starts with the canonical domain and make it relative
      if (cleanHref.startsWith(siteCanonicalDomain)) {
        cleanHref = cleanHref.substring(siteCanonicalDomain.length);
      }

      // If it starts with another http/https, it is an external link, skip it
      if (cleanHref.startsWith('http://') || cleanHref.startsWith('https://')) {
        continue;
      }

      internalLinkCount++;

      // Strip hash parameter e.g. /hakkimizda#tarihce -> /hakkimizda
      const hashIndex = cleanHref.indexOf('#');
      if (hashIndex !== -1) {
        cleanHref = cleanHref.substring(0, hashIndex);
      }

      // Strip trailing slash
      if (cleanHref.endsWith('/') && cleanHref !== '/') {
        cleanHref = cleanHref.slice(0, -1);
      }

      // Resolve route to file path
      let targetFile;
      if (cleanHref === '' || cleanHref === '/') {
        targetFile = path.join(appBuildDir, 'index.html');
      } else {
        targetFile = path.join(appBuildDir, `${cleanHref}.html`);
      }

      const normalizedTarget = path.normalize(targetFile);

      if (!validFiles.has(normalizedTarget)) {
        pageErrors.push(`Broken link: "${href}" (Resolved file not found in build)`);
      }
    }

    if (pageErrors.length > 0) {
      errors += pageErrors.length;
      report.push({ route, status: 'FAIL', count: internalLinkCount, details: pageErrors.join(', ') });
    } else {
      report.push({ route, status: 'PASS', count: internalLinkCount, details: 'All links valid' });
    }
  }

  // Print Report
  console.log('| Route | Status | Internal Links | Details / Broken Links |');
  console.log('|---|---|---|---|');
  report.forEach(row => {
    console.log(`| ${row.route} | ${row.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} | ${row.count} | ${row.details} |`);
  });

  if (errors > 0) {
    console.error(`\nLink integrity check failed with ${errors} issue(s).`);
    process.exit(1);
  } else {
    console.log('\nAll pages passed link integrity check! No broken internal links found.');
  }
}

runLinksCheck();
