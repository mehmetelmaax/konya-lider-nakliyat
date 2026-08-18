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
      // Ignore Next.js internal pages and error pages
      if (!file.includes('_not-found') && !file.includes('_error') && !file.includes('global-error')) {
        files.push(filepath);
      }
    }
  }
  return files;
}

function runMetadataCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- METADATA & OPENGRAPH AUDIT ---`);
  console.log(`Scanning ${htmlFiles.length} pages...\n`);

  let errors = 0;
  const report = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const decodeEntities = (str) => {
      return str
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    };

    // Extracts
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : '';

    const descMatch = html.match(/<meta\s+[^>]*name="description"\s+content="([^"]*)"/i) || 
                      html.match(/<meta\s+[^>]*content="([^"]*)"\s+name="description"/i);
    const description = descMatch ? decodeEntities(descMatch[1].trim()) : '';

    const canonicalMatch = html.match(/<link\s+[^>]*rel="canonical"\s+href="([^"]*)"/i) || 
                          html.match(/<link\s+[^>]*href="([^"]*)"\s+rel="canonical"/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

    const ogTitleMatch = html.match(/<meta\s+[^>]*property="og:title"\s+content="([^"]*)"/i) || 
                         html.match(/<meta\s+[^>]*content="([^"]*)"\s+property="og:title"/i);
    const ogTitle = ogTitleMatch ? decodeEntities(ogTitleMatch[1].trim()) : '';

    const ogDescMatch = html.match(/<meta\s+[^>]*property="og:description"\s+content="([^"]*)"/i) || 
                        html.match(/<meta\s+[^>]*content="([^"]*)"\s+property="og:description"/i);
    const ogDesc = ogDescMatch ? decodeEntities(ogDescMatch[1].trim()) : '';

    const ogImageMatch = html.match(/<meta\s+[^>]*property="og:image"\s+content="([^"]*)"/i) || 
                         html.match(/<meta\s+[^>]*content="([^"]*)"\s+property="og:image"/i);
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : '';

    // Validation checks
    const pageErrors = [];

    if (!title) {
      pageErrors.push('Missing <title>');
    } else if (title.length < 30 || title.length > 60) {
      pageErrors.push(`Title length is ${title.length} (Expected: 30-60 chars)`);
    }

    if (!description) {
      pageErrors.push('Missing meta description');
    } else if (description.length < 120 || description.length > 158) {
      pageErrors.push(`Description length is ${description.length} (Expected: 120-158 chars)`);
    }

    if (!canonical) {
      pageErrors.push('Missing canonical link');
    }

    if (!ogTitle) {
      pageErrors.push('Missing og:title');
    }

    if (!ogDesc) {
      pageErrors.push('Missing og:description');
    }

    if (!ogImage) {
      pageErrors.push('Missing og:image');
    }

    if (pageErrors.length > 0) {
      errors += pageErrors.length;
      report.push({ route, status: 'FAIL', details: pageErrors.join(', ') });
    } else {
      report.push({ route, status: 'PASS', details: 'OK' });
    }
  }

  // Print ASCII Table Report
  console.log('| Route | Status | Issues / Details |');
  console.log('|---|---|---|');
  report.forEach(row => {
    console.log(`| ${row.route} | ${row.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} | ${row.details} |`);
  });

  if (errors > 0) {
    console.error(`\nMetadata check failed with ${errors} issue(s).`);
    process.exit(1);
  } else {
    console.log('\nAll pages passed metadata and OpenGraph validation successfully!');
  }
}

runMetadataCheck();
