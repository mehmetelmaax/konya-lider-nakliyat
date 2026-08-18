import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const snapshotsDir = path.join(__dirname, '..', '.seo-snapshots');

function runDiff() {
  console.log('Comparing SEO Snapshots...');
  
  if (!fs.existsSync(snapshotsDir)) {
    console.error('Snapshots directory not found. Please run a snapshot first.');
    process.exit(1);
  }

  const files = fs.readdirSync(snapshotsDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  if (files.length < 2) {
    console.warn(`Only found ${files.length} snapshot(s). Need at least 2 snapshots to perform comparison.`);
    process.exit(0);
  }

  // Get the two most recent snapshots
  const prevFile = path.join(snapshotsDir, files[files.length - 2]);
  const currentFile = path.join(snapshotsDir, files[files.length - 1]);

  console.log(`Comparing Previous: ${prevFile}`);
  console.log(`Comparing Current: ${currentFile}\n`);

  const prevData = JSON.parse(fs.readFileSync(prevFile, 'utf8'));
  const currentData = JSON.parse(fs.readFileSync(currentFile, 'utf8'));

  const prevMap = new Map(prevData.map(p => [p.url, p]));
  const currentMap = new Map(currentData.map(c => [c.url, c]));

  let hasRegression = false;

  console.log('--- DETECTED REGRESSIONS & CHANGES ---');

  for (const [url, current] of currentMap.entries()) {
    const prev = prevMap.get(url);
    if (!prev) {
      console.log(`[NEW PAGE] ${url} has been added.`);
      continue;
    }

    // 1. Title change
    if (prev.title !== current.title) {
      console.log(`[CHANGE] Title changed for: ${url}`);
      console.log(`  - Old: "${prev.title}"`);
      console.log(`  - New: "${current.title}"`);
    }

    // 2. Description change
    if (prev.description !== current.description) {
      console.log(`[CHANGE] Description changed for: ${url}`);
      console.log(`  - Old: "${prev.description}"`);
      console.log(`  - New: "${current.description}"`);
    }

    // 3. Word count drops (warning if drop is > 5%)
    if (current.wordCount < prev.wordCount) {
      const dropPct = ((prev.wordCount - current.wordCount) / prev.wordCount) * 100;
      if (dropPct > 5) {
        console.warn(`⚠️ [WARNING] Word count dropped significantly for ${url}: ${prev.wordCount} -> ${current.wordCount} (-${dropPct.toFixed(1)}%)`);
        hasRegression = true;
      }
    }

    // 4. Schema lost
    const lostSchemas = prev.schemaTypes.filter(s => !current.schemaTypes.includes(s));
    if (lostSchemas.length > 0) {
      console.error(`❌ [REGRESSION] Schema types lost for ${url}: ${lostSchemas.join(', ')}`);
      hasRegression = true;
    }

    // 5. Indexability changed (new noindex)
    if (!current.robotsDirective.includes('noindex') && prev.robotsDirective.includes('noindex')) {
      console.log(`[INDEXED] ${url} is now indexable (removed noindex directive).`);
    } else if (current.robotsDirective.includes('noindex') && !prev.robotsDirective.includes('noindex')) {
      console.warn(`⚠️ [WARNING] ${url} has been marked NOINDEX!`);
      hasRegression = true;
    }

    // 6. Missing alt attributes count increased
    if (current.imagesWithoutAlt > prev.imagesWithoutAlt) {
      console.warn(`⚠️ [WARNING] Alt text missing for new images on ${url}: ${prev.imagesWithoutAlt} -> ${current.imagesWithoutAlt}`);
      hasRegression = true;
    }
  }

  // Check for deleted pages
  for (const url of prevMap.keys()) {
    if (!currentMap.has(url)) {
      console.warn(`[DELETED PAGE] ${url} was present in the previous snapshot but is missing now.`);
    }
  }

  if (!hasRegression) {
    console.log('\n✅ No major regressions detected between snapshots!');
  } else {
    console.log('\n⚠️ Potential regressions were flagged. Please inspect the logs.');
  }
}

runDiff();
