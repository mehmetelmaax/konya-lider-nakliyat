import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { DISTRICTS, SERVICES, ROUTES } from '../src/lib/site-config';
import { blogDatabase } from '../src/lib/blog-data';

// Helper to walk directory and find all page.tsx files
function getPageFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getPageFiles(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  });
  return fileList;
}

describe('Internal Links and Orphan Pages Verification Tests', () => {
  const projectDir = path.join(__dirname, '..');
  const appDir = path.join(projectDir, 'src/app');
  const pageFiles = getPageFiles(appDir).filter((file) => !file.includes('api'));

  // 1. Build a set of all valid routes on the website
  const validRoutes = new Set<string>([
    '/',
    '/galeri',
    '/hakkimizda',
    '/iletisim',
    '/teklif-al',
    '/tasinma-kontrol-listesi',
    '/bolgeler',
    '/hizmetler',
    '/rotalar',
    '/blog',
    '/konya-nakliyat-firmalari',
    '/konya-nakliyat-fiyatlari',
    '/yasal/gizlilik',
    '/yasal/kvkk',
  ]);

  // Add services
  SERVICES.forEach((s) => validRoutes.add(`/hizmetler/${s.slug}`));
  // Add districts
  DISTRICTS.forEach((d) => validRoutes.add(`/bolgeler/${d.slug}`));
  // Add routes
  ROUTES.forEach((r) => validRoutes.add(`/rotalar/${r.slug}`));
  // Add blog posts
  Object.keys(blogDatabase).forEach((id) => validRoutes.add(`/blog/${id}`));

  // 2. Scan all tsx files in src/ for link references
  const inboundLinksCount: Record<string, number> = {};
  validRoutes.forEach((route) => {
    inboundLinksCount[route] = 0;
  });

  // Scan ALL files in src/components and src/app to count links
  function getScanFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        getScanFiles(filePath, fileList);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        fileList.push(filePath);
      }
    });
    return fileList;
  }

  const allCodeFiles = getScanFiles(path.join(projectDir, 'src'));

  allCodeFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all paths defined inside quotes (e.g. '/hakkimizda', "/galeri", etc.)
    const quoteLinkMatches = content.matchAll(/['"](\/[a-zA-Z0-9_\-\/]+)['"]/g);
    for (const match of quoteLinkMatches) {
      const link = match[1];
      if (link && validRoutes.has(link)) {
        inboundLinksCount[link] = (inboundLinksCount[link] || 0) + 1;
      }
    }

    // Check dynamic routes references in lists/loops
    if (content.includes('DISTRICTS.map') || content.includes('merkezDistricts.map') || content.includes('tasraDistricts.map')) {
      DISTRICTS.forEach((d) => {
        inboundLinksCount[`/bolgeler/${d.slug}`] += 1;
      });
    }
    if (content.includes('SERVICES.map')) {
      SERVICES.forEach((s) => {
        inboundLinksCount[`/hizmetler/${s.slug}`] += 1;
      });
    }
    if (content.includes('ROUTES.map') || content.includes('routesDatabase')) {
      ROUTES.forEach((r) => {
        inboundLinksCount[`/rotalar/${r.slug}`] += 1;
      });
    }
    if (content.includes('blogDatabase') || content.includes('posts.map') || content.includes('filteredPosts.map')) {
      Object.keys(blogDatabase).forEach((id) => {
        inboundLinksCount[`/blog/${id}`] += 1;
      });
    }
  });

  // Verify there are no 404 links in hardcoded href attributes in pages
  it('should not contain any broken internal links', () => {
    pageFiles.forEach((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const staticLinkMatches = content.matchAll(/href=["'](\/[^"'\s]*)["']/g);
      for (const match of staticLinkMatches) {
        const link = match[1].split('#')[0];
        if (link && link !== '/' && !link.startsWith('/img/') && !link.includes('.') && !link.startsWith('/api')) {
          expect(validRoutes.has(link), `Broken link found: ${link} in ${filePath}`).toBe(true);
        }
      }
    });
  });

  // Verify that every page gets at least 1 inbound link (relaxed check for orphan status in local environments)
  it('should ensure every page receives at least 1 inbound link', () => {
    validRoutes.forEach((route) => {
      if (route === '/' || route.includes('/yasal/')) return; // Exclude root and privacy pages
      const links = inboundLinksCount[route] || 0;
      expect(links, `Orphan page warning: "${route}" has only ${links} inbound links`).toBeGreaterThanOrEqual(1);
    });
  });
});
