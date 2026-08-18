import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const logoPath = 'C:\\Users\\mehme\\.gemini\\antigravity\\brain\\f804ddc4-efb7-428b-ad71-0131bba85f04\\.user_uploaded\\media__1786264916374.png';
const outputPath = path.join(rootDir, 'src', 'app', 'icon.png');
const appleOutputPath = path.join(rootDir, 'src', 'app', 'apple-icon.png');

async function cropEmblem() {
  try {
    const image = sharp(logoPath);
    const metadata = await image.metadata();
    console.log(`Original image size: ${metadata.width}x${metadata.height}`);

    // The logo emblem is on the left side.
    // Based on visual layout:
    // Left: ~10% to ~38% of the width.
    // Top: ~28% to ~70% of the height.
    // Let's calculate bounds to crop:
    const width = metadata.width;
    const height = metadata.height;

    // Let's crop a square around the emblem
    // Emblem is centered vertically, starting around x = 110, y = 290
    // Visual bounding box for emblem:
    // Left: 110, Top: 290, Width: 400, Height: 400 (roughly)
    // Let's refine based on typical proportions:
    const cropWidth = Math.round(width * 0.28);
    const cropHeight = Math.round(height * 0.42);
    const left = Math.round(width * 0.11);
    const top = Math.round(height * 0.29);

    console.log(`Cropping box: left=${left}, top=${top}, width=${cropWidth}, height=${cropHeight}`);

    // Crop, resize to 512x512, make background transparent or keep transparent
    await sharp(logoPath)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 } // transparent background padding if any
      })
      .png()
      .toFile(outputPath);

    console.log(`Successfully created: ${outputPath}`);

    // Also create apple-icon.png (180x180)
    await sharp(outputPath)
      .resize(180, 180)
      .toFile(appleOutputPath);

    console.log(`Successfully created apple icon: ${appleOutputPath}`);

  } catch (err) {
    console.error('Error during image processing:', err);
  }
}

cropEmblem();
