import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const projectRoot = path.join(__dirname, '..');
const siteConfigPath = path.join(projectRoot, 'src', 'lib', 'site-config.ts');
const blogDataPath = path.join(projectRoot, 'src', 'lib', 'blog-data.ts');
const buildAppDir = path.join(projectRoot, '.next', 'server', 'app');

// Helper to check if file exists
function verifyFile(routePath) {
  const normalizedPath = routePath === '/' ? 'index' : routePath.replace(/^\//, '');
  const htmlFile = path.join(buildAppDir, `${normalizedPath}.html`);
  if (!fs.existsSync(htmlFile)) {
    console.error(`❌ Verification failed: Route "${routePath}" expected build file "${htmlFile}" but it does not exist.`);
    return false;
  }
  console.log(`✅ Verified: Route "${routePath}" -> "${htmlFile}"`);
  return true;
}

try {
  console.log('Starting sitemap verification against Next.js build output...');

  // 1. Parse site-config.ts using regex
  const siteConfigContent = fs.readFileSync(siteConfigPath, 'utf8');
  
  // Extract url
  const urlMatch = siteConfigContent.match(/url:\s*'([^']+)'/);
  if (!urlMatch) {
    throw new Error('Could not find SITE.url in site-config.ts');
  }
  const baseUrl = urlMatch[1];
  console.log(`Base URL parsed: ${baseUrl}`);

  // Extract services slugs
  const serviceRegex = /slug:\s*'([^']+)'/g;
  const SERVICES_SLUGS = [];
  
  // Find SERVICES block first to avoid matching DISTRICTS
  const servicesBlock = siteConfigContent.match(/export const SERVICES = \[([\s\S]+?)\] as const;/);
  if (!servicesBlock) {
    throw new Error('Could not find SERVICES array in site-config.ts');
  }
  let match;
  while ((match = serviceRegex.exec(servicesBlock[1])) !== null) {
    SERVICES_SLUGS.push(match[1]);
  }
  console.log(`Services slugs parsed (${SERVICES_SLUGS.length}):`, SERVICES_SLUGS);

  // Extract districts slugs
  const districtsBlock = siteConfigContent.match(/export const DISTRICTS = \[([\s\S]+?)\] as const;/);
  if (!districtsBlock) {
    throw new Error('Could not find DISTRICTS array in site-config.ts');
  }
  const DISTRICTS_SLUGS = [];
  const districtRegex = /slug:\s*'([^']+)'[\s\S]*?indexable:\s*(true|false)/g;
  while ((match = districtRegex.exec(districtsBlock[1])) !== null) {
    if (match[2] === 'true') {
      DISTRICTS_SLUGS.push(match[1]);
    }
  }
  console.log(`Indexable districts slugs parsed (${DISTRICTS_SLUGS.length}):`, DISTRICTS_SLUGS);
  // Extract routes slugs
  const routesBlock = siteConfigContent.match(/export const ROUTES: readonly RouteConfig\[\] = \[([\s\S]+?)\] as const;/);
  const ROUTES_SLUGS = [];
  if (routesBlock) {
    const routeRegex = /slug:\s*'([^']+)'/g;
    while ((match = routeRegex.exec(routesBlock[1])) !== null) {
      ROUTES_SLUGS.push(match[1]);
    }
  }
  console.log(`Routes slugs parsed (${ROUTES_SLUGS.length}):`, ROUTES_SLUGS);

  // 2. Parse blog-data.ts using regex
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');
  const BLOG_IDS = [];
  const blogRegex = /'([^']+)':\s*\{/g;
  while ((match = blogRegex.exec(blogDataContent)) !== null) {
    if (match[1] !== 'question' && match[1] !== 'answer') {
      BLOG_IDS.push(match[1]);
    }
  }
  console.log(`Blog IDs parsed (${BLOG_IDS.length}):`, BLOG_IDS);

  // 3. Define the exact sitemap URLs
  const sitemapRoutes = [
    '/',
    '/teklif-al',
    ...SERVICES_SLUGS.map(slug => `/hizmetler/${slug}`),
    ...DISTRICTS_SLUGS.map(slug => `/bolgeler/${slug}`),
    '/iletisim',
    '/blog',
    ...BLOG_IDS.map(id => `/blog/${id}`),
    '/hakkimizda',
    '/galeri',
    '/yasal/gizlilik',
    '/yasal/kvkk',
    '/konya-nakliyat-fiyatlari',
    '/konya-nakliyat-firmalari',
    '/tasinma-kontrol-listesi',
    ...ROUTES_SLUGS.map(slug => `/rotalar/${slug}`)
  ];

  console.log(`\nReconstructed sitemap routes (${sitemapRoutes.length} items):`);
  sitemapRoutes.forEach((route, index) => {
    console.log(`${index + 1}. ${baseUrl}${route}`);
  });

  // Verify URL count dynamically
  const expectedCount = 1 + 1 + SERVICES_SLUGS.length + DISTRICTS_SLUGS.length + 1 + 1 + BLOG_IDS.length + 1 + 1 + 2 + 3 + ROUTES_SLUGS.length;
  if (sitemapRoutes.length !== expectedCount) {
    throw new Error(`Sitemap verification failed: Expected exactly ${expectedCount} URLs, but sitemapRoutes contains ${sitemapRoutes.length} items.`);
  }

  // 4. Verify all routes exist in the build output
  let hasErrors = false;
  for (const route of sitemapRoutes) {
    if (!verifyFile(route)) {
      hasErrors = true;
    }
  }

  if (hasErrors) {
    console.error('\n❌ Sitemap verification failed with errors.');
    process.exit(1);
  } else {
    console.log(`\n✨ Sitemap verification complete: All ${expectedCount} routes verified against Next.js build output successfully!`);
    process.exit(0);
  }

} catch (error) {
  console.error('\n❌ Error during sitemap verification:', error.message);
  process.exit(1);
}
