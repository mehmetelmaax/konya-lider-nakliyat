import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const blogPath = path.join(rootDir, 'src', 'lib', 'blog-data.ts');

function check() {
  const content = fs.readFileSync(blogPath, 'utf8');
  const regex = /<p>Firmamız, Karayolu Taşıma Kanunu kapsamında[\s\S]*?<\/p>/g;
  let match;
  let count = 0;
  while ((match = regex.exec(content)) !== null) {
    count++;
    console.log(`Match ${count} at index ${match.index}:`);
    console.log(`  ${match[0].substring(0, 150)}...`);
  }
}

check();
