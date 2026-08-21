const fs = require('fs');
const path = require('path');

const htmlPath = path.join(process.cwd(), '.next', 'server', 'app', 'index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('index.html not found at:', htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
console.log('Total HTML size:', html.length, 'bytes');

// Check script tags
const scripts = [];
let scriptMatch;
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let totalScriptLength = 0;
while ((scriptMatch = scriptRegex.exec(html)) !== null) {
  totalScriptLength += scriptMatch[0].length;
  scripts.push({
    tag: scriptMatch[0].substring(0, 100),
    length: scriptMatch[0].length,
    inlineLength: scriptMatch[1].length
  });
}

console.log('\n--- Script Tags ---');
console.log('Total script length:', totalScriptLength, 'bytes');
console.log('Number of scripts:', scripts.length);
scripts.sort((a, b) => b.length - a.length).slice(0, 5).forEach((s, idx) => {
  console.log(`${idx + 1}. Size: ${s.length} bytes, tag: ${s.tag}...`);
});

// Check svg tags
const svgs = [];
let svgMatch;
const svgRegex = /<svg\b[^>]*>([\s\S]*?)<\/svg>/gi;
let totalSvgLength = 0;
while ((svgMatch = svgRegex.exec(html)) !== null) {
  totalSvgLength += svgMatch[0].length;
}
console.log('\n--- Inline SVGs ---');
console.log('Total SVG length:', totalSvgLength, 'bytes');
