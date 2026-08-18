import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');
const snapshotsDir = path.join(__dirname, '..', '.seo-snapshots');

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

function extractSchemas(html) {
  const schemaMatches = html.matchAll(/<script\s+[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  const types = [];
  
  for (const match of schemaMatches) {
    try {
      const json = JSON.parse(match[1].trim());
      const findTypes = (obj) => {
        if (Array.isArray(obj)) {
          obj.forEach(findTypes);
        } else if (obj && typeof obj === 'object') {
          if (obj['@type']) {
            types.push(obj['@type']);
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
  return Array.from(new Set(types));
}

function runSnapshot() {
  console.log('Running SEO Snapshot crawler...');
  
  if (!fs.existsSync(appBuildDir)) {
    console.error('Build directory not found! Run npm run build first.');
    process.exit(1);
  }

  const htmlFiles = getHtmlFiles(appBuildDir);
  const snapshotData = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    let url = '/' + relativePath.replace('.html', '').replace(/\\/g, '/').replace('/index', '');
    if (url === '/index') url = '/';

    const html = fs.readFileSync(file, 'utf8');

    // Title
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : '';

    // Description
    const descMatch = html.match(/<meta\s+[^>]*name="description"\s+content="([^"]*)"/i) || 
                      html.match(/<meta\s+[^>]*content="([^"]*)"\s+name="description"/i);
    const description = descMatch ? decodeEntities(descMatch[1].trim()) : '';

    // Canonical
    const canonicalMatch = html.match(/<link\s+[^>]*rel="canonical"\s+href="([^"]*)"/i) || 
                          html.match(/<link\s+[^>]*href="([^"]*)"\s+rel="canonical"/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

    // H1
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h1 = h1Match ? decodeEntities(h1Match[1].replace(/<[^>]*>/g, '').trim()) : '';

    // H2 Count
    const h2Count = (html.match(/<h2/gi) || []).length;

    // Word Count
    const wordCount = countWords(html);

    // Links
    const linkMatches = Array.from(html.matchAll(/<a\s+[^>]*href="([^"]*)"/gi));
    let internalLinks = 0;
    let externalLinks = 0;
    for (const match of linkMatches) {
      const href = match[1].trim();
      const isInternal = href.startsWith('/') || href.startsWith('https://konyaliderevdeneve.com');
      const isExcluded = href.startsWith('//') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#';
      if (isExcluded) continue;
      if (isInternal) internalLinks++;
      else externalLinks++;
    }

    // Images
    const imgMatches = Array.from(html.matchAll(/<img\s+[^>]*src="([^"]*)"/gi));
    let images = imgMatches.length;
    let imagesWithoutAlt = 0;
    
    // Alt attribute search
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    for (const tag of imgTags) {
      if (!tag.includes('alt=') || tag.includes('alt=""')) {
        imagesWithoutAlt++;
      }
    }

    // Schema
    const schemaTypes = extractSchemas(html);

    // Checks
    const hasTable = html.includes('<table');
    const hasFaq = html.includes('FAQPage') || html.includes('faqSchema') || schemaTypes.includes('FAQPage');
    
    // Robots
    const robotsMatch = html.match(/<meta\s+[^>]*name="robots"\s+content="([^"]*)"/i) || 
                        html.match(/<meta\s+[^>]*content="([^"]*)"\s+name="robots"/i);
    const robotsDirective = robotsMatch ? robotsMatch[1].trim() : 'index, follow';

    snapshotData.push({
      url,
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length,
      canonical,
      h1,
      h2Count,
      wordCount,
      internalLinks,
      externalLinks,
      images,
      imagesWithoutAlt,
      schemaTypes,
      hasTable,
      hasFaq,
      robotsDirective
    });
  }

  if (!fs.existsSync(snapshotsDir)) {
    fs.mkdirSync(snapshotsDir, { recursive: true });
  }

  const dateString = new Date().toISOString().split('T')[0];
  const snapshotPath = path.join(snapshotsDir, `${dateString}.json`);
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshotData, null, 2), 'utf8');

  console.log(`Snapshot saved to: ${snapshotPath}`);
}

runSnapshot();
