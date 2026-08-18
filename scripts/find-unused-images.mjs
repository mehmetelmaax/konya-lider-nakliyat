import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectDir = path.resolve(__dirname, '..');
const publicImgDir = path.join(projectDir, 'public', 'img');
const srcDir = path.join(projectDir, 'src');

if (!fs.existsSync(publicImgDir)) {
  console.error('Error: public/img directory does not exist!');
  process.exit(1);
}

// 1. Gather all files in public/img/
const imgFiles = fs.readdirSync(publicImgDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.svg', '.gif'].includes(ext);
});

console.log(`Found ${imgFiles.length} images in public/img/`);

// 2. Gather all code contents from src/
const codeContents = [];
function readCodeFiles(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        readCodeFiles(fullPath);
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (['.ts', '.tsx', '.css', '.js', '.jsx', '.json', '.md'].includes(ext)) {
        codeContents.push({
          file: path.relative(projectDir, fullPath),
          content: fs.readFileSync(fullPath, 'utf8')
        });
      }
    }
  });
}

if (fs.existsSync(srcDir)) {
  readCodeFiles(srcDir);
}

// Include next.config.ts and config files in root
const rootFiles = ['next.config.ts', 'package.json', 'README.md'];
rootFiles.forEach(file => {
  const fullPath = path.join(projectDir, file);
  if (fs.existsSync(fullPath)) {
    codeContents.push({
      file,
      content: fs.readFileSync(fullPath, 'utf8')
    });
  }
});

console.log(`Scanned ${codeContents.length} source code files for image references.\n`);

// 3. Check for each image if it is mentioned in any code file
const unusedImages = [];
const adanaImagesToDelete = [];

imgFiles.forEach(img => {
  // We check if the image base name or full name is referenced
  const baseName = path.basename(img, path.extname(img));
  let isReferenced = false;

  for (const code of codeContents) {
    if (code.content.includes(img) || code.content.includes(baseName)) {
      isReferenced = true;
      break;
    }
  }

  if (!isReferenced) {
    unusedImages.push(img);
    if (img.startsWith('adana-nakliyat-faaliyet')) {
      adanaImagesToDelete.push(img);
    }
  }
});

console.log('--- UNUSED IMAGES REPORT ---');
if (unusedImages.length === 0) {
  console.log('Congratulations! All images are referenced in the codebase.');
} else {
  console.log(`Found ${unusedImages.length} unused images:`);
  unusedImages.forEach(img => {
    const fullPath = path.join(publicImgDir, img);
    const sizeKb = (fs.statSync(fullPath).size / 1024).toFixed(1);
    console.log(` - ${img} (${sizeKb} KB)`);
  });
}

// 4. Automatically delete the Adana remnants
if (adanaImagesToDelete.length > 0) {
  console.log('\nDeleting unused Adana activity images:');
  adanaImagesToDelete.forEach(img => {
    const fullPath = path.join(publicImgDir, img);
    fs.unlinkSync(fullPath);
    console.log(` - Deleted: ${img}`);
  });
}
