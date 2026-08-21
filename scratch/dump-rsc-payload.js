const fs = require('fs');
const path = require('path');

const htmlPath = path.join(process.cwd(), '.next', 'server', 'app', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  const content = match[1];
  if (content.includes('self.__next_f.push')) {
    console.log('\n--- NEXT_F PUSH CONTENT (length:', content.length, ') ---');
    console.log(content.substring(0, 1000));
  }
}
