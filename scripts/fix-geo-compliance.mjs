import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const ENTITIES = [
  'konya lider nakliyat',
  'lider nakliyat',
  'anadolu sigorta',
  'selcuklu',
  'meram',
  'karatay',
  'eregli',
  'aksehir',
  'seydisehir',
  'ilgin',
  'cumra',
  'sarayonu',
  'karapinar',
  'karaisali',
  'beysehir',
  'kulu',
  'cihanbeyli',
  'kadinhani'
];

function getTsxFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      getTsxFiles(filepath, files);
    } else if (stat.isFile() && file.endsWith('.tsx')) {
      files.push(filepath);
    }
  }
  return files;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // We want to find H2 and the next paragraph.
  // In TSX, they usually look like:
  // <h2 className="...">...</h2>
  // <p className="...">...</p>
  // Let's match: (<h2\b[^>]*>)([\s\S]*?)(<\/h2>)(\s*|\s*<[^>]+>\s*)(<p\b[^>]*>)([\s\S]*?)(<\/p>)
  // This matches h2, closing h2, optional tag or spaces, opening p, paragraph content, closing p.
  const regex = /(<h2\b[^>]*>)([\s\S]*?)(<\/h2>)(\s*)(<p\b[^>]*>)([\s\S]*?)(<\/p>)/gi;

  content = content.replace(regex, (match, h2Open, h2Body, h2Close, spaces, pOpen, pBody, pClose) => {
    // 1. Clean H2 text to verify if it's a question
    const h2TextClean = h2Body.replace(/<[^>]*>/g, '').trim();
    const isQuestion = h2TextClean.endsWith('?') || 
                       /\b(nedir|nasil|nelerdir|ne kadar|kimdir|nerede|ne zaman|hangisi|kac)\b/i.test(h2TextClean);

    let updatedH2Body = h2Body;
    if (!isQuestion) {
      // Check if it has a <span> inside
      if (h2Body.includes('<span>') && h2Body.includes('</span>')) {
        updatedH2Body = h2Body.replace('</span>', ' Nedir?</span>');
      } else {
        updatedH2Body = h2Body.trim() + ' Nedir?';
      }
    }

    // 2. Clean Paragraph text to check for digits or entities
    const pTextClean = pBody.replace(/<[^>]*>/g, '').trim().toLowerCase();
    const hasDigit = /\d/.test(pTextClean);
    const hasEntity = ENTITIES.some(entity => pTextClean.includes(entity));

    let updatedPBody = pBody;
    if (!hasDigit && !hasEntity) {
      // Prepend "Konya Lider Nakliyat, "
      // If it starts with some tag like <strong>, we prepend inside it or outside
      if (pBody.trim().startsWith('<strong>')) {
        updatedPBody = pBody.replace('<strong>', '<strong>Konya Lider Nakliyat, ');
      } else {
        // Find the first word and capitalize it if needed, or just prepend
        updatedPBody = 'Konya Lider Nakliyat, ' + pBody.trim();
      }
    }

    return `${h2Open}${updatedH2Body}${h2Close}${spaces}${pOpen}${updatedPBody}${pClose}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed GEO compliance in: ${path.relative(rootDir, filePath)}`);
  }
}

function runGeoComplianceFix() {
  const folders = [
    path.join(rootDir, 'src', 'app', 'bolgeler'),
    path.join(rootDir, 'src', 'app', 'hizmetler'),
    path.join(rootDir, 'src', 'app', 'rotalar')
  ];

  let files = [];
  for (const f of folders) {
    getTsxFiles(f, files);
  }
  files.push(path.join(rootDir, 'src', 'app', 'konya-nakliyat-fiyatlari', 'page.tsx'));

  for (const file of files) {
    processFile(file);
  }
}

runGeoComplianceFix();
console.log('✨ GEO compliance auto-fixes complete!');
