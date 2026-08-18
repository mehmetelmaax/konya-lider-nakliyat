import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.join(__dirname, '..', 'public', 'img');
const libDir = path.join(__dirname, '..', 'src', 'lib');

const photos = [
  'arac-filosu',
  'asansor-kurulum',
  'ekip',
  'marangozluk',
  'paketleme-detay',
  'slayt-1',
  'slayt-2',
  'slayt-3'
];

async function run() {
  console.log('Starting image optimization process...');
  const tableData = [];
  const blurs = {};
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  // Ensure lib directory exists
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  // 1. Optimize logo.png
  const logoPath = path.join(imgDir, 'logo.png');
  if (fs.existsSync(logoPath)) {
    const origSize = fs.statSync(logoPath).size;
    totalOriginalSize += origSize;

    // Save temporary backup
    const tempLogoPath = path.join(imgDir, 'logo_temp.png');
    fs.copyFileSync(logoPath, tempLogoPath);

    // logo.png -> 400px width, palette-based PNG compression
    await sharp(tempLogoPath)
      .resize(400)
      .png({ palette: true, quality: 80 })
      .toFile(logoPath);

    // logo.webp
    const logoWebpPath = path.join(imgDir, 'logo.webp');
    await sharp(tempLogoPath)
      .resize(400)
      .webp({ quality: 80 })
      .toFile(logoWebpPath);

    fs.unlinkSync(tempLogoPath);

    const optimizedSize = fs.statSync(logoPath).size;
    const webpSize = fs.statSync(logoWebpPath).size;
    totalOptimizedSize += optimizedSize + webpSize;

    tableData.push({
      file: 'logo.png',
      before: (origSize / 1024).toFixed(1) + ' KB',
      after: (optimizedSize / 1024).toFixed(1) + ' KB',
      format: 'PNG',
      saving: ((1 - optimizedSize / origSize) * 100).toFixed(0) + '%'
    });

    tableData.push({
      file: 'logo.webp',
      before: (origSize / 1024).toFixed(1) + ' KB',
      after: (webpSize / 1024).toFixed(1) + ' KB',
      format: 'WebP',
      saving: ((1 - webpSize / origSize) * 100).toFixed(0) + '%'
    });
  }

  // 2. Optimize icon.png
  const iconPath = path.join(imgDir, 'icon.png');
  if (fs.existsSync(iconPath)) {
    const origSize = fs.statSync(iconPath).size;
    totalOriginalSize += origSize;

    const tempIconPath = path.join(imgDir, 'icon_temp.png');
    fs.copyFileSync(iconPath, tempIconPath);

    await sharp(tempIconPath)
      .resize(512, 512)
      .png({ palette: true, quality: 85 })
      .toFile(iconPath);

    fs.unlinkSync(tempIconPath);

    const optimizedSize = fs.statSync(iconPath).size;
    totalOptimizedSize += optimizedSize;

    tableData.push({
      file: 'icon.png',
      before: (origSize / 1024).toFixed(1) + ' KB',
      after: (optimizedSize / 1024).toFixed(1) + ' KB',
      format: 'PNG',
      saving: ((1 - optimizedSize / origSize) * 100).toFixed(0) + '%'
    });
  }

  // 3. Optimize Photos
  for (const name of photos) {
    const origJpgPath = path.join(imgDir, `${name}.jpg`);
    if (!fs.existsSync(origJpgPath)) {
      console.warn(`File ${name}.jpg does not exist!`);
      continue;
    }

    const origSize = fs.statSync(origJpgPath).size;
    totalOriginalSize += origSize;

    // Create temporary backup to avoid read-write lock issues in sharp
    const tempJpgPath = path.join(imgDir, `${name}_temp.jpg`);
    fs.copyFileSync(origJpgPath, tempJpgPath);

    // 3a. Generate 20px blur placeholder
    const blurBuffer = await sharp(tempJpgPath)
      .resize(20)
      .webp({ quality: 20 })
      .toBuffer();
    blurs[name] = `data:image/webp;base64,${blurBuffer.toString('base64')}`;

    // 3b. Re-encode original JPG in place with quality 78
    await sharp(tempJpgPath)
      .jpeg({ quality: 78, progressive: true })
      .toFile(origJpgPath);

    const optSize = fs.statSync(origJpgPath).size;
    totalOptimizedSize += optSize;
    tableData.push({
      file: `${name}.jpg`,
      before: (origSize / 1024).toFixed(1) + ' KB',
      after: (optSize / 1024).toFixed(1) + ' KB',
      format: 'JPEG (Orig)',
      saving: ((1 - optSize / origSize) * 100).toFixed(0) + '%'
    });

    // 3c. Generate responsive widths: 640, 1280, 1920
    const widths = [640, 1280, 1920];
    for (const w of widths) {
      // webp (quality 75)
      const webpPath = path.join(imgDir, `${name}-${w}.webp`);
      await sharp(tempJpgPath)
        .resize(w)
        .webp({ quality: 75 })
        .toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size;
      totalOptimizedSize += webpSize;

      // avif (quality 55)
      const avifPath = path.join(imgDir, `${name}-${w}.avif`);
      await sharp(tempJpgPath)
        .resize(w)
        .avif({ quality: 55 })
        .toFile(avifPath);
      const avifSize = fs.statSync(avifPath).size;
      totalOptimizedSize += avifSize;

      // jpeg (quality 78)
      const jpegPath = path.join(imgDir, `${name}-${w}.jpg`);
      await sharp(tempJpgPath)
        .resize(w)
        .jpeg({ quality: 78, progressive: true })
        .toFile(jpegPath);
      const jpegSize = fs.statSync(jpegPath).size;
      totalOptimizedSize += jpegSize;

      tableData.push({
        file: `${name}-${w}.webp`,
        before: 'N/A',
        after: (webpSize / 1024).toFixed(1) + ' KB',
        format: 'WebP',
        saving: 'New Variant'
      });

      tableData.push({
        file: `${name}-${w}.avif`,
        before: 'N/A',
        after: (avifSize / 1024).toFixed(1) + ' KB',
        format: 'AVIF',
        saving: 'New Variant'
      });
    }

    fs.unlinkSync(tempJpgPath);
  }

  // 4. Write image-blur.ts
  const blurFilePath = path.join(libDir, 'image-blur.ts');
  const blurFileContent = `/**
 * IMAGE BLUR PLACEHOLDERS FOR NEXT/IMAGE
 * Automatically generated by scripts/optimize-images.mjs
 */

export const IMAGE_BLURS: Record<string, string> = ${JSON.stringify(blurs, null, 2)};
`;
  fs.writeFileSync(blurFilePath, blurFileContent, 'utf8');
  console.log(`Generated blur placeholders in: ${blurFilePath}`);

  // 5. Output comparison table
  console.log('\n--- IMAGE OPTIMIZATION SUMMARY ---');
  console.table(tableData);

  const gain = totalOriginalSize - totalOptimizedSize;
  console.log(`\nOriginal Assets Total Size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized Assets + Variants Total Size: ${(totalOptimizedSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Space Saved/Gained: ${(gain / (1024 * 1024)).toFixed(2)} MB`);
  console.log('----------------------------------\n');
}

run().catch(err => {
  console.error('Error during image optimization:', err);
  process.exit(1);
});
