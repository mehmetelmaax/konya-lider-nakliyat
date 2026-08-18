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

function runSchemaCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- SCHEMA.ORG JSON-LD SCHEMA AUDIT ---`);
  console.log(`Scanning ${htmlFiles.length} pages...\n`);

  let errors = 0;
  let breadcrumbPageCount = 0;
  const report = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const pageErrors = [];
    const ldJsonMatches = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

    if (ldJsonMatches.length === 0) {
      pageErrors.push('No JSON-LD schemas found');
    }

    let hasBreadcrumb = false;
    let hasFAQ = false;

    for (const match of ldJsonMatches) {
      let schema;
      try {
        schema = JSON.parse(match[1].trim());
      } catch (err) {
        pageErrors.push(`Invalid JSON syntax: ${err.message}`);
        continue;
      }

      // Helper to validate a schema object
      const validateSchemaObj = (obj) => {
        if (!obj['@context']) {
          pageErrors.push('Missing @context');
        }
        if (!obj['@type']) {
          pageErrors.push('Missing @type');
        }

        const type = obj['@type'];
        if (type === 'BreadcrumbList') {
          hasBreadcrumb = true;
        }
        if (type === 'FAQPage') {
          hasFAQ = true;
        }

        // Regression check: no address fields in region pages
        if (route.includes('/bolgeler/')) {
          if (JSON.stringify(obj).toLowerCase().includes('"address"')) {
            pageErrors.push('Regression Alert: Found prohibited "address" field inside region schema');
          }
        }
      };

      // Handle graph array or single object
      if (schema['@graph'] && Array.isArray(schema['@graph'])) {
        schema['@graph'].forEach(obj => validateSchemaObj(obj));
      } else if (Array.isArray(schema)) {
        schema.forEach(obj => validateSchemaObj(obj));
      } else {
        validateSchemaObj(schema);
      }
    }

    // Verify Home Page has FAQPage schema
    if (route === '/' && !hasFAQ) {
      pageErrors.push('Home Page is missing FAQPage schema');
    }

    if (hasBreadcrumb) {
      breadcrumbPageCount++;
    }

    if (pageErrors.length > 0) {
      errors += pageErrors.length;
      report.push({ route, status: 'FAIL', details: pageErrors.join(', ') });
    } else {
      report.push({ route, status: 'PASS', details: `OK (Breadcrumb: ${hasBreadcrumb ? 'Yes' : 'No'}, FAQ: ${hasFAQ ? 'Yes' : 'No'})` });
    }
  }

  // Print Report
  console.log('| Route | Status | Schema Details / Issues |');
  console.log('|---|---|---|');
  report.forEach(row => {
    console.log(`| ${row.route} | ${row.status === 'PASS' ? '✅ PASS' : '❌ FAIL'} | ${row.details} |`);
  });

  console.log(`\nTotal pages with BreadcrumbList schema: ${breadcrumbPageCount} / ${htmlFiles.length}`);

  if (errors > 0) {
    console.error(`\nSchema validation check failed with ${errors} issue(s).`);
    process.exit(1);
  } else {
    console.log('\nAll schemas are syntactically valid and compliant with guidelines!');
  }
}

runSchemaCheck();
