const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src'));
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('K3')) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('K3')) {
        console.log(`${file}:${idx + 1}: ${line.trim()}`);
      }
    });
  }
});
