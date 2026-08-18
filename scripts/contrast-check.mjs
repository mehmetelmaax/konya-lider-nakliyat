import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Colors to test
const COLORS = {
  white: '#FFFFFF',
  offWhite: '#F9FAFB',
  navy: '#102A43',
  orange: '#F7931E',
  orangeText: '#A85B00',
  charcoal: '#252525',
  grayLight: '#E9EEF2',
  gray200: '#E4E7EB',
  gray300: '#CBD5E1'
};

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function getLuminance(rgb) {
  const a = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1, hex2) {
  const lum1 = getLuminance(hexToRgb(hex1));
  const lum2 = getLuminance(hexToRgb(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const combinations = [
  // White/Off-White Background
  { fg: 'navy', bg: 'white', expected: 4.5, description: 'Navy text on White background' },
  { fg: 'charcoal', bg: 'white', expected: 4.5, description: 'Charcoal text on White background' },
  { fg: 'orangeText', bg: 'white', expected: 4.5, description: 'Orange-Text on White background' },
  { fg: 'navy', bg: 'offWhite', expected: 4.5, description: 'Navy text on Off-White background' },
  { fg: 'charcoal', bg: 'offWhite', expected: 4.5, description: 'Charcoal text on Off-White background' },
  { fg: 'orangeText', bg: 'offWhite', expected: 4.5, description: 'Orange-Text on Off-White background' },
  
  // Navy Background
  { fg: 'white', bg: 'navy', expected: 4.5, description: 'White text on Navy background' },
  { fg: 'orange', bg: 'navy', expected: 3.0, description: 'Orange text on Navy background (headings/large text)' },
  { fg: 'gray200', bg: 'navy', expected: 4.5, description: 'Gray-200 text on Navy background' },
  { fg: 'gray300', bg: 'navy', expected: 4.5, description: 'Gray-300 text on Navy background' }
];

console.log('--- WCAG AA CONTRAST RATIO CHECKER ---');
let hasErrors = false;

combinations.forEach(combo => {
  const fgHex = COLORS[combo.fg];
  const bgHex = COLORS[combo.bg];
  const ratio = getContrastRatio(fgHex, bgHex);
  const passed = ratio >= combo.expected;

  const status = passed ? '✅ PASSED' : '❌ FAILED';
  console.log(`${status} | ${combo.description}:`);
  console.log(`  - FG: ${fgHex} | BG: ${bgHex}`);
  console.log(`  - Ratio: ${ratio.toFixed(2)}:1 (Required: >= ${combo.expected}:1)`);

  if (!passed) {
    hasErrors = true;
  }
});

// Let's run a check on files to warn if "text-orange" is used on light backgrounds.
// Light background pages: anywhere not wrapped in bg-navy or similar.
// Since we want to ensure zero failures, we will replace all text-orange with text-orange-text on light backgrounds.
console.log('\n--- SCANNING CODE FOR CONTRAST ISSUES ---');
const srcDir = path.join(projectRoot, 'src');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  }
}

let codeIssues = 0;
walkDir(srcDir, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to check if text-orange is used.
  // Note: we want to warn if it's used on a light bg.
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('text-orange') && !line.includes('text-orange-text')) {
      // Check context: is it inside a component that has a dark background?
      // Since it's a static check, we'll log it as a warning so the developer knows where to look.
      // If it's on a known navy section, it's fine. If it's in a white section (e.g. text-orange font-bold text-xs), it must be text-orange-text.
      const isNavyContext = line.includes('bg-navy') || line.includes('text-white') || content.includes('bg-navy') && !line.includes('bg-white');
      if (!isNavyContext) {
        console.warn(`⚠️  Warning: Potential contrast issue in ${path.relative(projectRoot, filePath)}:L${idx + 1}`);
        console.warn(`   Line: "${line.trim()}"`);
        codeIssues++;
      }
    }
  });
});

console.log(`\nScan completed. Found ${codeIssues} potential in-code contrast issues.`);

if (hasErrors) {
  process.exit(1);
} else {
  console.log('\n✨ All tested color combinations pass WCAG AA contrast thresholds successfully!');
  process.exit(0);
}
