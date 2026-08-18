import fs from 'fs';
import path from 'path';
import { SITE, SERVICES, DISTRICTS, ROUTES } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import { blogDatabase } from '@/lib/blog-data';

export function GET() {
  const indexableDistricts = DISTRICTS.filter(d => d.indexable);
  const blogs = Object.values(blogDatabase);

  let fullContent = `# ${SITE.name} - Tam İçerik İndeksi (llms-full.txt)

> ${SITE.name}, Konya genelinde K3 yetki belgesiyle 2006 yılından bu yana asansörlü ve sigortalı evden eve nakliyat hizmeti vermektedir.

## 1. Temel Bilgiler
- Kuruluş Yılı: ${FACTS.foundedYear}
- Merkez: ${SITE.address.locality}, ${SITE.address.region}
- Telefon: ${SITE.phoneDisplay}
- Çalışma Saatleri: ${SITE.hours.opens} - ${SITE.hours.closes}
- Hizmet Kapsamı: ${FACTS.districtCount} Adet Konya İlçesi ve 81 İle Şehirlerarası Nakliye
- Asansör Kapasitesi: Maksimum ${FACTS.maxFloor}. Kat Seviyesi
- Şehiriçi Taşıma Süresi: Ortalama ${FACTS.cityMoveHours} Saat
- Şehiriçi Fiyat Aralığı: ₺${FACTS.priceMin} - ₺${FACTS.priceMax}
- Sigorta Firması: ${FACTS.insurer}

---

`;

  // Define routes list to parse
  const routesList = [
    { route: '/', name: 'Ana Sayfa', filePath: 'index.html' },
    { route: '/konya-nakliyat-fiyatlari', name: 'Fiyat Rehberi', filePath: 'konya-nakliyat-fiyatlari.html' },
    ...SERVICES.map(s => ({
      route: `/hizmetler/${s.slug}`,
      name: s.name,
      filePath: path.join('hizmetler', `${s.slug}.html`)
    })),
    ...indexableDistricts.map(d => ({
      route: `/bolgeler/${d.slug}`,
      name: `${d.name} Nakliyat`,
      filePath: path.join('bolgeler', `${d.slug}.html`)
    })),
    ...ROUTES.map(r => ({
      route: `/rotalar/${r.slug}`,
      name: `Konya - ${r.city} Nakliyat`,
      filePath: path.join('rotalar', `${r.slug}.html`)
    })),
    ...blogs.map(b => ({
      route: `/blog/${b.id}`,
      name: b.title,
      filePath: path.join('blog', `${b.id}.html`)
    }))
  ];

  // Attempt to read compiled HTML outputs from build folder
  const appBuildDir = path.join(process.cwd(), '.next', 'server', 'app');

  for (const item of routesList) {
    const fullFilePath = path.join(appBuildDir, item.filePath);
    let pageText = '';

    if (fs.existsSync(fullFilePath)) {
      try {
        const html = fs.readFileSync(fullFilePath, 'utf8');
        
        // Extract <main> section
        const mainMatch = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
        let contentHtml = mainMatch ? mainMatch[1] : html;

        // Strip script/style tags
        contentHtml = contentHtml
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

        // Extract and clean clean text
        pageText = contentHtml
          .replace(/<[^>]*>/g, ' ') // Replace tags with space
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/\s+/g, ' ') // Normalize spaces
          .trim();
      } catch (e) {
        pageText = `İçerik okunamadı: ${item.name} (${item.route})`;
      }
    } else {
      // Fallback description if build html doesn't exist yet (e.g. during initial compilation dev phase)
      pageText = `Lider Nakliyat ${item.name} hizmet detayları. Sabit fiyat garantisiyle ${FACTS.insurer} sigortalı ve marangozlu evden eve nakliye çözümleri. Lütfen ${SITE.url}${item.route} adresini ziyaret edin.`;
    }

    fullContent += `## Rota: ${item.route} (${item.name})
URL: ${SITE.url}${item.route}

${pageText}

---

`;
  }

  return new Response(fullContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
