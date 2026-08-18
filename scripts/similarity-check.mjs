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
  // Extract main content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const body = mainMatch ? mainMatch[1] : html;

  // Remove script, style, and svg blocks
  let text = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  text = text.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, '');
  
  // Remove RelatedLinks and QuoteForm if they are highly structured and similar
  text = text.replace(/<form[\s\S]*?<\/form>/gi, ' ');
  
  // Remove all other HTML tags
  text = text.replace(/<[^>]*>/g, ' ');
  
  // Decode basic HTML entities
  text = text.replace(/&nbsp;/gi, ' ')
             .replace(/&amp;/gi, '&')
             .replace(/&lt;/gi, '<')
             .replace(/&gt;/gi, '>');

  return text;
}

function tokenize(text) {
  // lowercase and tokenize
  const words = text
    .toLowerCase()
    .replace(/[{}()\[\].,:;?!\-"'\`\/\\|=+*@#&]/g, ' ')
    .split(/\s+/)
    .filter(w => w && w.trim().length > 2 && !/^[0-9]+$/.test(w)); // ignore very short words and numbers

  return new Set(words);
}

function calculateJaccard(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

function runSimilarityCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- CONTENT SIMILARITY AUDIT ---`);
  console.log(`Analyzing pairwise similarity for ${htmlFiles.length} pages...\n`);

  const pages = htmlFiles.map(file => {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');
    const cleanText = getCleanText(html);
    const tokens = tokenize(cleanText);
    return { route, tokens };
  });

  let warningCount = 0;
  const highSimilarityPairs = [];

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const pageA = pages[i];
      const pageB = pages[j];
      
      const similarity = calculateJaccard(pageA.tokens, pageB.tokens);
      const percentage = (similarity * 100).toFixed(1);

      if (similarity > 0.60) {
        warningCount++;
        highSimilarityPairs.push({
          pageA: pageA.route,
          pageB: pageB.route,
          percentage
        });
      }
    }
  }

  if (highSimilarityPairs.length > 0) {
    console.warn(`⚠️  Warning: Found ${warningCount} pairs of pages with similarity > 60%:\n`);
    console.log('| Page A | Page B | Similarity |');
    console.log('|---|---|---|');
    highSimilarityPairs.forEach(pair => {
      console.log(`| ${pair.pageA} | ${pair.pageB} | ${pair.percentage}% |`);
    });
    console.log('\nLexical similarity audit completed with warnings. (Warnings do not fail the build).');
  } else {
    console.log('✅ All pages passed lexical similarity checks successfully! (No page pairs exceed 60% similarity).');
  }

  process.exit(0);
}

runSimilarityCheck();
