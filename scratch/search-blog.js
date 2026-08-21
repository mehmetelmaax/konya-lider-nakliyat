const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'lib', 'blog-data.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('sehirlerarasi-tasimada-esya-hasari')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 50 lines before and after
    for (let i = Math.max(0, idx - 10); i < Math.min(lines.length, idx + 50); i++) {
      console.log(`${i+1}: ${lines[i]}`);
    }
  }
});
