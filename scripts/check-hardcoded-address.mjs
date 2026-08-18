import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, '..');
const srcDir = path.join(projectDir, 'src');

const bannedPatterns = [
  /Nişantaş\s*Mahallesi/i,
  /Fatih\s*Mahallesi/i,
  /Hulusi\s*Baybal/i,
  /73258\s*Sokak/i
];

let hasErrors = false;

function scan(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        scan(fullPath);
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        const fileRel = path.relative(projectDir, fullPath).replace(/\\/g, '/');
        if (fileRel.includes('site-config.ts') || fileRel.includes('schema.ts') || fileRel.includes('check-hardcoded-address.mjs') || fileRel.includes('phase0-inventory')) {
          return;
        }
        const content = fs.readFileSync(fullPath, 'utf8');
        bannedPatterns.forEach(pat => {
          if (pat.test(content)) {
            const line = content.split('\n').findIndex(l => pat.test(l)) + 1;
            console.error(`ERROR: Hardcoded address pattern ${pat} found in ${fileRel} at line ${line}. Please use SITE.address configuration instead.`);
            hasErrors = true;
          }
        });
      }
    }
  });
}

console.log('Scanning codebase for hardcoded addresses...');
scan(srcDir);

if (hasErrors) {
  process.exit(1);
} else {
  console.log('Success: No hardcoded address patterns found outside config files.');
  process.exit(0);
}
