import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const TR_UPPER_MAP = {
  'a': 'A', 'b': 'B', 'c': 'C', 'ç': 'Ç', 'd': 'D', 'e': 'E', 'f': 'F',
  'g': 'G', 'ğ': 'Ğ', 'h': 'H', 'ı': 'I', 'i': 'İ', 'j': 'J', 'k': 'K',
  'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'ö': 'Ö', 'p': 'P', 'r': 'R',
  's': 'S', 'ş': 'Ş', 't': 'T', 'u': 'U', 'ü': 'Ü', 'v': 'V', 'y': 'Y',
  'z': 'Z'
};

function toTrUpperCase(text) {
  let upper = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    upper += TR_UPPER_MAP[char] || char.toUpperCase();
  }
  return upper;
}

// Find all .tsx files in src/app and src/components
function getTsxFiles(dir, files = []) {
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

function fixUppercaseInFiles() {
  const srcDir = path.join(rootDir, 'src');
  const files = getTsxFiles(srcDir);

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Match elements with className containing 'uppercase' and containing simple text
    // E.g., <span className="... uppercase ...">Text</span>
    const regex = /(<span[^>]*className="[^"]*uppercase[^"]*"[^>]*>)([^<]+)(<\/span>)/g;

    content = content.replace(regex, (match, p1, p2, p3) => {
      // Remove 'uppercase' from className
      let newClass = p1.replace(/\buppercase\b/g, '').replace(/\s+/g, ' ').replace(/"\s/g, '"').replace(/\s"/g, '"');
      // Convert text to Turkish uppercase
      let upperText = toTrUpperCase(p2);
      modified = true;
      return `${newClass}${upperText}${p3}`;
    });

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Fixed uppercase in: ${path.relative(rootDir, file)}`);
    }
  }
}

fixUppercaseInFiles();
console.log('✨ Uppercase conversions complete.');
