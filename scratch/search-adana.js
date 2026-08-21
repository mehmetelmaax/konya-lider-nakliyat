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

const terms = [/çukurova/i, /sarıçam/i, /yüreğir/i, /seyhan/i];

function checkDir(dirName) {
  const files = walk(path.join(process.cwd(), dirName));
  files.forEach(file => {
    if (file.includes('node_modules') || file.includes('.next')) return;
    const content = fs.readFileSync(file, 'utf8');
    terms.forEach(term => {
      if (term.test(content)) {
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (term.test(line)) {
            console.log(`[MATCH] ${file}:${idx + 1}: ${line.trim()}`);
          }
        });
      }
    });
  });
}

console.log('--- SCANNING SCRIPTS ---');
checkDir('scripts');
console.log('--- SCANNING SRC ---');
checkDir('src');
