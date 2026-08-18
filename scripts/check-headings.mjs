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

function runHeadingsCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- HEADING HIERARCHY AUDIT ---`);
  console.log(`Scanning ${htmlFiles.length} pages...\n`);

  let errors = 0;
  const report = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const pageErrors = [];

    // Find all headings <h1 ...> ... </h1>
    const headingMatches = [...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)];

    const h1Count = headingMatches.filter(m => m[1].toLowerCase() === 'h1').length;
    if (h1Count !== 1) {
      pageErrors.push(`Found ${h1Count} <h1> tags (Expected exactly 1)`);
    }

    // Check hierarchy and empty content
    let prevLevel = 1; // Base starts with h1
    headingMatches.forEach((match, index) => {
      const tag = match[1].toLowerCase();
      const level = parseInt(tag.substring(1));
      const rawText = match[2];
      const cleanText = rawText.replace(/<[^>]*>/g, '').trim();

      if (!cleanText) {
        pageErrors.push(`Empty heading: <${tag}> tag contains no text`);
      }

      // Check for jumps forward
      // Only enforce jump check relative to previous headings on page, skipping first h1 check
      if (index > 0) {
        if (level - prevLevel > 1) {
          pageErrors.push(`Heading skip: <${tag}> cannot immediately follow <h${prevLevel}>`);
        }
      }
      prevLevel = level;
    });

    if (pageErrors.length > 0) {
      errors += pageErrors.length;
      report.push({ route, status: 'FAIL', details: pageErrors.join(', ') });
    } else {
      report.push({ route, status: 'PASS', details: 'OK' });
    }
  }

  // Print Report
  console.log('| Route | Status | Heading Issues |');
  console.log('|---|---|---|');
  report.forEach(row => {
    console.log(`| ${row.route} | ${row.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} | ${row.details} |`);
  });

  if (errors > 0) {
    console.error(`\nHeading hierarchy check failed with ${errors} issue(s).`);
    process.exit(1);
  } else {
    console.log('\nAll pages passed heading hierarchy and non-emptiness validation successfully!');
  }
}

runHeadingsCheck();
