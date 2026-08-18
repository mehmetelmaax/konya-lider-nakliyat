import { MetadataRoute } from 'next';
import { SITE, SERVICES, DISTRICTS, ROUTES } from '@/lib/site-config';
import { blogDatabase } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // 1. Ana Sayfa (1.0, weekly)
  const mainPage = {
    url: `${baseUrl}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  // 2. Fiyat Teklifi Al (0.9, monthly)
  const teklifPage = {
    url: `${baseUrl}/teklif-al`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  };

  // 3. Hizmetler (6 adet, 0.9, monthly)
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 4. Bölgeler - Merkez (4 adet, 0.9, monthly)
  const merkezRegionPages = DISTRICTS.filter(d => d.tier === 'merkez' && d.indexable).map((district) => ({
    url: `${baseUrl}/bolgeler/${district.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));



  // 6. İletişim (0.8, monthly)
  const iletisimPage = {
    url: `${baseUrl}/iletisim`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  };

  // 7. Bölgeler - İlçe (11 adet, 0.7, monthly)
  const ilceRegionPages = DISTRICTS.filter(d => d.tier === 'ilce' && d.indexable).map((district) => ({
    url: `${baseUrl}/bolgeler/${district.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 8. Blog List (0.7, weekly)
  const blogPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  // 9. Blog Yazıları (3 adet, 0.6, monthly, lastModified from post date)
  const blogPostPages = Object.values(blogDatabase).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 10. Hakkımızda (0.6, yearly)
  const hakkimizdaPage = {
    url: `${baseUrl}/hakkimizda`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  };

  // 11. Galeri (0.5, monthly)
  const galeriPage = {
    url: `${baseUrl}/galeri`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  };

  // 12. Yasal Sayfalar (2 adet, 0.3, yearly)
  const yasalPages = ['gizlilik', 'kvkk'].map((slug) => ({
    url: `${baseUrl}/yasal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  // 13. Yeni Rehber ve Yardımcı Sayfalar (3 adet, 0.8, monthly)
  const additionalPages = [
    {
      url: `${baseUrl}/konya-nakliyat-fiyatlari`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/konya-nakliyat-firmalari`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tasinma-kontrol-listesi`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // 14. Şehirlerarası Rotalar (8 adet, 0.8, monthly)
  const routePages = ROUTES.map((route) => ({
    url: `${baseUrl}/rotalar/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    mainPage,
    teklifPage,
    ...servicePages,
    ...merkezRegionPages,
    iletisimPage,
    ...ilceRegionPages,
    blogPage,
    ...blogPostPages,
    hakkimizdaPage,
    galeriPage,
    ...yasalPages,
    ...additionalPages,
    ...routePages,
  ];
}
