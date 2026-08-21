import { SITE, SERVICES, DISTRICTS } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes-data';
import { FACTS } from '@/lib/facts';
import { blogDatabase } from '@/lib/blog-data';

export const dynamic = 'force-static';

export function GET() {
  const indexableDistricts = DISTRICTS.filter(d => d.indexable);
  const blogs = Object.values(blogDatabase);

  const markdown = `# ${SITE.name}

> ${SITE.name}, Konya merkezli K3 yetki belgeli, asansörlü ve marangozlu evden eve nakliyat firmasıdır. Sabit fiyat garantisiyle ${FACTS.insurer} güvencesinde sigortalı eşya taşıma hizmeti vermektedir.

## Temel Bilgiler
- Kuruluş Yılı: ${FACTS.foundedYear}
- Genel Merkez: ${SITE.address.locality}, ${SITE.address.region}
- İletişim Hattı: ${SITE.phoneDisplay}
- Mesai Saatleri: Her gün ${SITE.hours.opens} - ${SITE.hours.closes}
- Hizmet Kapsamı: ${DISTRICTS.length} Adet Konya İlçesi ve 81 İle Şehirlerarası Nakliye
- Asansör Kapasitesi: Maksimum ${FACTS.maxFloor}. Kat Seviyesi
- Şehiriçi Taşıma Süresi: Ortalama ${FACTS.cityMoveHours} Saat
- Şehiriçi Fiyat Aralığı: ₺${FACTS.priceMin} - ₺${FACTS.priceMax}

## Hizmetler
${SERVICES.map(s => `- [${s.name}](${SITE.url}/hizmetler/${s.slug}): ${s.description}`).join('\n')}

## Hizmet Bölgeleri
${indexableDistricts.map(d => `- [${d.name} Evden Eve Nakliyat](${SITE.url}/bolgeler/${d.slug}): ${d.name} ilçesinde asansörlü ve sigortalı ev taşıma hizmetleri.`).join('\n')}

## Şehirlerarası Rotalar
${ROUTES.map(r => `- [Konya - ${r.city} Nakliyat](${SITE.url}/rotalar/${r.slug}): Mesafe yaklaşık ${r.distanceKm} km, ortalama seyahat süresi ${r.durationHours} saattir.`).join('\n')}

## Fiyat Bilgisi
Fiyatlandırma detayları ve anlık maliyet hesaplama robotu için [Konya Evden Eve Nakliyat Fiyatları](${SITE.url}/konya-nakliyat-fiyatlari) sayfamızı ziyaret edin. Sitedeki standart şehiriçi ev taşıma bütçesi ortalama ₺${FACTS.priceMin} ile ₺${FACTS.priceMax} aralığındadır.

## Rehber İçerikler
${blogs.map(b => `- [${b.title}](${SITE.url}/blog/${b.id}): ${b.desc}`).join('\n')}

## İletişim
- Firma Ünvanı: ${SITE.legalName}
- Adres: ${SITE.address.street} ${SITE.address.locality} / ${SITE.address.region}
- Telefon: ${SITE.phoneDisplay}
- E-posta: ${SITE.email}
- Web Sitesi: ${SITE.url}
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
