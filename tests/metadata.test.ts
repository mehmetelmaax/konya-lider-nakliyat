import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { DISTRICTS, ROUTES } from '../src/lib/site-config';
import { blogDatabase } from '../src/lib/blog-data';
import { generateMetadata as generateDistrictMetadata } from '../src/app/bolgeler/[slug]/page';
import { generateMetadata as generateRouteMetadata } from '../src/app/rotalar/[slug]/page';
import { generateMetadata as generateBlogMetadata } from '../src/app/blog/[id]/page';

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

describe('SEO Metadata Completeness Tests', () => {
  const projectDir = path.join(__dirname, '..');
  const appDir = path.join(projectDir, 'src/app');
  const staticPages = getPageFiles(appDir).filter(
    // Filter out dynamic files, layouts, api, etc.
    (file) => !file.includes('[slug]') && !file.includes('[id]') && !file.includes('api') && !file.includes('not-found')
  );

  // 1. Static pages metadata validation
  staticPages.forEach((filePath) => {
    const relativePath = path.relative(appDir, filePath).replace(/\\/g, '/');
    it(`should have valid metadata in static page ${relativePath}`, () => {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Match title (checking standard patterns)
      const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/) || content.match(/title:\s*SITE\.\w+/);
      // Match description
      const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/) || content.match(/description:\s*SITE\.\w+/);
      // Match canonical
      const canonicalMatch = content.match(/canonical:\s*['"`]([^'"`]+)['"`]/) || content.match(/canonical:\s*SITE\.\w+/);

      expect(titleMatch, `Title is missing in ${relativePath}`).not.toBeNull();
      expect(descMatch, `Description is missing in ${relativePath}`).not.toBeNull();
      expect(canonicalMatch, `Canonical URL is missing in ${relativePath}`).not.toBeNull();
    });
  });

  // 2. Dynamic district pages metadata validation
  DISTRICTS.forEach((district) => {
    it(`should generate valid metadata for district: ${district.slug}`, async () => {
      const metadata = await generateDistrictMetadata({ params: Promise.resolve({ slug: district.slug }) });
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.alternates?.canonical).toBe(`/bolgeler/${district.slug}`);
      
      expect((metadata.title as string).length).toBeLessThanOrEqual(60);
      expect((metadata.description as string).length).toBeGreaterThanOrEqual(100);
      expect((metadata.description as string).length).toBeLessThanOrEqual(160);
    });
  });

  // 3. Dynamic routes metadata validation
  ROUTES.forEach((route) => {
    it(`should generate valid metadata for route: ${route.slug}`, async () => {
      const metadata = await generateRouteMetadata({ params: Promise.resolve({ slug: route.slug }) });
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.alternates?.canonical).toBe(`/rotalar/${route.slug}`);

      expect((metadata.title as string).length).toBeLessThanOrEqual(60);
      expect((metadata.description as string).length).toBeGreaterThanOrEqual(100);
      expect((metadata.description as string).length).toBeLessThanOrEqual(160);
    });
  });

  // 4. Dynamic blog posts metadata validation
  Object.keys(blogDatabase).forEach((id) => {
    it(`should generate valid metadata for blog post: ${id}`, async () => {
      const metadata = await generateBlogMetadata({ params: Promise.resolve({ id }) });
      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.alternates?.canonical).toBe(`/blog/${id}`);

      expect((metadata.title as string).length).toBeLessThanOrEqual(80);
      expect((metadata.description as string).length).toBeGreaterThanOrEqual(100);
      expect((metadata.description as string).length).toBeLessThanOrEqual(160);
    });
  });
});
