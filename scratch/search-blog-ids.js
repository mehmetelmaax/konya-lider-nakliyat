const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'lib', 'blog-data.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes("'konya-nakliyat-fiyatlari':") || line.includes("'konya-tasinma-maliyeti-2026':")) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 30 lines after
    for (let i = idx; i < Math.min(lines.length, idx + 40); i++) {
      console.log(`${i+1}: ${lines[i]}`);
    }
  }
});
