const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = 'C:/Users/mehme/.gemini/antigravity/brain/a2b7b855-5478-42f5-a183-a6cb5a29c58a/.user_uploaded/media_1787242561245.jpg';
const root = path.join(__dirname, '..');

const targets = [
  { path: path.join(root, 'src/app/icon.png'), width: 512, height: 512, format: 'png' },
  { path: path.join(root, 'src/app/apple-icon.png'), width: 180, height: 180, format: 'png' },
  { path: path.join(root, 'public/favicon-32x32.png'), width: 32, height: 32, format: 'png' },
  { path: path.join(root, 'public/favicon-16x16.png'), width: 16, height: 16, format: 'png' },
  { path: path.join(root, 'public/apple-touch-icon.png'), width: 180, height: 180, format: 'png' },
  { path: path.join(root, 'public/icon.png'), width: 512, height: 512, format: 'png' },
  { path: path.join(root, 'public/icon.jpg'), width: 512, height: 512, format: 'jpg' }
];

async function run() {
  console.log('Generating icons...');
  for (const t of targets) {
    const dir = path.dirname(t.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    let pipeline = sharp(sourceImage).resize(t.width, t.height);
    if (t.format === 'png') {
      await pipeline.png({ quality: 90 }).toFile(t.path);
    } else if (t.format === 'jpg') {
      await pipeline.jpeg({ quality: 90 }).toFile(t.path);
    }
    console.log(`Generated: ${t.path}`);
  }

  const faviconIcoPath = path.join(root, 'public/favicon.ico');
  try {
    // Standard sharp doesn't do ICO, so let's directly write it as 32x32 PNG naming it favicon.ico
    // This is modern standard, standard browsers and search engines fully support PNG-based favicons named .ico
    console.log('Writing 32x32 PNG to favicon.ico...');
    await sharp(sourceImage)
      .resize(32, 32)
      .png()
      .toFile(faviconIcoPath);
  } catch (err) {
    console.error('Error writing favicon:', err);
  }
  console.log(`Generated favicon.ico: ${faviconIcoPath}`);

  const appFaviconPath = path.join(root, 'src/app/favicon.ico');
  if (fs.existsSync(faviconIcoPath)) {
    fs.copyFileSync(faviconIcoPath, appFaviconPath);
    console.log(`Copied favicon to: ${appFaviconPath}`);
  }
}

run().catch(console.error);
