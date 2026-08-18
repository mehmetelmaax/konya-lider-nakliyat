import { MetadataRoute } from 'next';
import { SITE, SERVICES, DISTRICTS, ROUTES } from '@/lib/site-config';
import { blogDatabase } from '@/lib/blog-data';
import { CONTENT_DATES } from '@/lib/content-dates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  // 1. Ana Sayfa (1.0, weekly)
  const mainPage = {
    url: `${baseUrl}`,
    lastModified: new Date(CONTENT_DATES.main),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  // 2. Fiyat Teklifi Al (0.9, monthly)
  const teklifPage = {
    url: `${baseUrl}/teklif-al`,
    lastModified: new Date(CONTENT_DATES.teklif),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  };

  // 3. Hub Sayfaları (Yeni eklenenler, 0.9, monthly)
  const hubPages = [
    {
      url: `${baseUrl}/bolgeler`,
      lastModified: new Date(CONTENT_DATES.bolgelerHub),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(CONTENT_DATES.hizmetlerHub),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rotalar`,
      lastModified: new Date(CONTENT_DATES.rotalarHub),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }
  ];

  // 4. Hizmetler (SERVICES, 0.9, monthly)
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date(CONTENT_DATES.services),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 5. Bölgeler - Merkez (DISTRICTS tier merkez, 0.9, monthly)
  const merkezRegionPages = DISTRICTS.filter(d => d.tier === 'merkez' && d.indexable).map((district) => ({
    url: `${baseUrl}/bolgeler/${district.slug}`,
    lastModified: new Date(CONTENT_DATES.districts),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // 6. İletişim (0.8, monthly)
  const iletisimPage = {
    url: `${baseUrl}/iletisim`,
    lastModified: new Date(CONTENT_DATES.iletisim),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  };

  // 7. Bölgeler - İlçe (DISTRICTS tier ilce, 0.7, monthly)
  const ilceRegionPages = DISTRICTS.filter(d => d.tier === 'ilce' && d.indexable).map((district) => ({
    url: `${baseUrl}/bolgeler/${district.slug}`,
    lastModified: new Date(CONTENT_DATES.districts),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 8. Blog List (0.7, weekly)
  const blogPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(CONTENT_DATES.blog),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  // 9. Blog Yazıları (0.6, monthly, lastModified from post date)
  const blogPostPages = Object.values(blogDatabase).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 10. Hakkımızda (0.6, yearly)
  const hakkimizdaPage = {
    url: `${baseUrl}/hakkimizda`,
    lastModified: new Date(CONTENT_DATES.hakkimizda),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  };

  // 11. Galeri (0.5, monthly)
  const galeriPage = {
    url: `${baseUrl}/galeri`,
    lastModified: new Date(CONTENT_DATES.galeri),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  };

  // 12. Yasal Sayfalar (2 adet, 0.3, yearly)
  const yasalPages = [
    {
      url: `${baseUrl}/yasal/gizlilik`,
      lastModified: new Date(CONTENT_DATES.yasalGizlilik),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/yasal/kvkk`,
      lastModified: new Date(CONTENT_DATES.yasalKvkk),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    }
  ];

  // 13. Yeni Rehber ve Yardımcı Sayfalar (3 adet, 0.8, monthly)
  const additionalPages = [
    {
      url: `${baseUrl}/konya-nakliyat-fiyatlari`,
      lastModified: new Date(CONTENT_DATES.fiyatlari),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/konya-nakliyat-firmalari`,
      lastModified: new Date(CONTENT_DATES.firmalari),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tasinma-kontrol-listesi`,
      lastModified: new Date(CONTENT_DATES.kontrolListesi),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // 14. Şehirlerarası Rotalar (ROUTES, 0.8, monthly)
  const routePages = ROUTES.map((route) => ({
    url: `${baseUrl}/rotalar/${route.slug}`,
    lastModified: new Date(CONTENT_DATES.routes),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    mainPage,
    teklifPage,
    ...hubPages,
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
