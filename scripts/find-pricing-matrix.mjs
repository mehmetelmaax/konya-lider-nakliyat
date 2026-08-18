import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const bolgelerDir = path.join(rootDir, 'src', 'app', 'bolgeler');

function analyze() {
  const folders = fs.readdirSync(bolgelerDir);
  folders.forEach(folder => {
    const pagePath = path.join(bolgelerDir, folder, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, 'utf8');
      const hasMatrix = content.includes('PricingMatrix');
      const hasTable = content.includes('<table');
      console.log(`Folder: ${folder} | hasMatrix: ${hasMatrix} | hasTable: ${hasTable}`);
    }
  });
}

analyze();
