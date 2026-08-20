const fs = require('fs');
const path = require('path');
const https = require('https');

const fontsDir = path.join(__dirname, '..', 'public', 'fonts');

// Ensure public/fonts exists
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// User-Agent that forces google fonts to return woff2 formats
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': USER_AGENT
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Fetching Google Fonts CSS metadata...');
  
  // Fetch CSS for Inter and Outfit
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Outfit:wght@400;500;700&display=swap';
  const cssContent = await fetchUrl(cssUrl);
  
  // Parse blocks of font-face
  // Look for font-face blocks with subset comments like /* latin-ext */ or /* latin */
  const blocks = cssContent.split('}');
  
  let fontCount = 0;
  for (const block of blocks) {
    if (!block.trim()) continue;
    
    // Check if it's latin-ext or latin subset
    const isLatinExt = block.includes('/* latin-ext */');
    const isLatin = block.includes('/* latin */');
    
    if (!isLatinExt && !isLatin) continue;
    
    const fontFamilyMatch = block.match(/font-family:\s*'([^']+)'/);
    const fontWeightMatch = block.match(/font-weight:\s*(\d+)/);
    const fontStyleMatch = block.match(/font-style:\s*(\w+)/) || ['normal', 'normal'];
    const urlMatch = block.match(/url\((https:\/\/[^)]+)\)/);
    
    if (fontFamilyMatch && fontWeightMatch && urlMatch) {
      const family = fontFamilyMatch[1].toLowerCase();
      const weight = fontWeightMatch[1];
      const style = fontStyleMatch[1] || 'normal';
      const subset = isLatinExt ? 'latin-ext' : 'latin';
      const url = urlMatch[1];
      
      const fileName = `${family}-${weight}-${style}-${subset}.woff2`;
      const destPath = path.join(fontsDir, fileName);
      
      console.log(`Downloading ${family} (weight: ${weight}, style: ${style}, subset: ${subset})...`);
      await downloadFile(url, destPath);
      fontCount++;
    }
  }
  
  console.log(`Successfully downloaded ${fontCount} font files to ${fontsDir}`);
}

main().catch(err => {
  console.error('Error downloading fonts:', err);
  process.exit(1);
});
