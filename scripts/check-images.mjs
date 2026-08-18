import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');
const publicImgDir = path.join(__dirname, '..', 'public', 'img');

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

function getImgFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      getImgFiles(filepath, files);
    } else if (stat.isFile()) {
      // Check for image extensions
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg'].includes(ext)) {
        files.push(filepath);
      }
    }
  }
  return files;
}

function runImagesCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- IMAGE ALT & SIZE AUDIT ---`);
  console.log(`Scanning HTML files for img tags...`);

  let errors = 0;
  const report = [];

  const genericAlts = ['logo', 'image', 'resim', 'foto', 'görsel', 'img', 'photo', 'icon', 'ikon', 'pic', 'banner', 'resmi'];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const pageErrors = [];
    const imgMatches = [...html.matchAll(/<img\b[^>]*>/gi)];

    imgMatches.forEach(match => {
      const imgTag = match[0];
      
      // Parse alt attribute
      const altMatch = imgTag.match(/alt="([^"]*)"/i);
      const srcMatch = imgTag.match(/src="([^"]*)"/i);
      const src = srcMatch ? srcMatch[1] : 'unknown';

      if (!altMatch) {
        pageErrors.push(`Missing alt attribute on image (src: ${src})`);
      } else {
        const altText = altMatch[1].trim();
        const altLower = altText.toLowerCase();

        if (altText.length === 0) {
          pageErrors.push(`Empty alt text on image (src: ${src})`);
        } else if (genericAlts.includes(altLower)) {
          pageErrors.push(`Generic alt text "${altText}" on image (src: ${src})`);
        }
      }
    });

    if (pageErrors.length > 0) {
      errors += pageErrors.length;
      report.push({ route, status: 'FAIL', details: pageErrors.join(', ') });
    } else {
      report.push({ route, status: 'PASS', details: `OK (${imgMatches.length} images checked)` });
    }
  }

  // Print HTML Scan Report
  console.log('| Route | Status | Image Issues / Count |');
  console.log('|---|---|---|');
  report.forEach(row => {
    console.log(`| ${row.route} | ${row.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} | ${row.details} |`);
  });

  // Size Checks on public/img/
  console.log(`\nChecking files in public/img/ for sizes > 200 KB...`);
  const imageFiles = getImgFiles(publicImgDir);
  let largeImageCount = 0;

  imageFiles.forEach(file => {
    const relImgPath = path.relative(path.join(__dirname, '..'), file);
    const sizeBytes = fs.statSync(file).size;
    const sizeKB = sizeBytes / 1024;

    if (sizeKB > 200) {
      console.error(`❌ Large Image Alert: ${relImgPath} is ${sizeKB.toFixed(1)} KB (Max allowed: 200 KB)`);
      largeImageCount++;
      errors++;
    }
  });

  if (largeImageCount === 0) {
    console.log('✅ All images in public/img/ are under 200 KB!');
  }

  if (errors > 0) {
    console.error(`\nImage audit failed with ${errors} issue(s).`);
    process.exit(1);
  } else {
    console.log('\nAll images passed alt tags and file size checks successfully!');
  }
}

runImagesCheck();
