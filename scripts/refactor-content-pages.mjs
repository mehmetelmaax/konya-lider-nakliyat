import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const DISTRICTS = [
  { slug: 'cumra-evden-eve-nakliyat', name: 'Çumra' },
  { slug: 'aksehir-evden-eve-nakliyat', name: 'Akşehir' },
  { slug: 'meram-evden-eve-nakliyat', name: 'Meram' },
  { slug: 'sarayonu-evden-eve-nakliyat', name: 'Sarayönü' },
  { slug: 'karapinar-evden-eve-nakliyat', name: 'Karapınar' },
  { slug: 'karaisali-evden-eve-nakliyat', name: 'Karaisalı' },
  { slug: 'beysehir-evden-eve-nakliyat', name: 'Beyşehir' },
  { slug: 'seydisehir-evden-eve-nakliyat', name: 'Seydişehir' },
  { slug: 'ilgin-evden-eve-nakliyat', name: 'Ilgın' },
  { slug: 'kulu-evden-eve-nakliyat', name: 'Kulu' },
  { slug: 'eregli-evden-eve-nakliyat', name: 'Ereğli' },
  { slug: 'selcuklu-evden-eve-nakliyat', name: 'Selçuklu' },
  { slug: 'cihanbeyli-evden-eve-nakliyat', name: 'Cihanbeyli' },
  { slug: 'kadinhani-evden-eve-nakliyat', name: 'Kadınhanı' },
  { slug: 'karatay-evden-eve-nakliyat', name: 'Karatay' }
];

const SERVICES = [
  { slug: 'asansorlu-evden-eve-nakliyat', name: 'Asansörlü Evden Eve Nakliyat' },
  { slug: 'esya-depolama', name: 'Eşya Depolama' },
  { slug: 'ofis-ve-isyeri-tasimaciligi', name: 'Ofis ve İşyeri Taşımacılığı' },
  { slug: 'parca-esya-tasima', name: 'Parça Eşya Taşıma' },
  { slug: 'piyano-ve-kasa-tasima', name: 'Piyano ve Kasa Taşıma' },
  { slug: 'profesyonel-esya-paketleme', name: 'Profesyonel Eşya Paketleme' },
  { slug: 'sehirici-evden-eve-nakliyat', name: 'Şehiriçi Evden Eve Nakliyat' },
  { slug: 'sehirlerarasi-evden-eve-nakliyat', name: 'Şehirlerarası Evden Eve Nakliyat' },
  { slug: 'ucretsiz-ekspertiz', name: 'Ücretsiz Ekspertiz' }
];

// Helper to clean self-referential pronouns and capitalize them
function cleanPronouns(text) {
  return text
    .replace(/\b(firmamız|şirketimiz|kuruluşumuz)\b/g, 'Konya Lider Nakliyat')
    .replace(/\b(firmamızın|şirketimizin)\b/g, 'Konya Lider Nakliyat’ın')
    .replace(/\b(firmamıza|şirketimize)\b/g, 'Konya Lider Nakliyat’a')
    .replace(/\b(firmamızdan|şirketimizden)\b/g, 'Konya Lider Nakliyat’tan')
    .replace(/\b(biz|ekibimiz|kadromuz)\b/g, 'Konya Lider Nakliyat ekipleri')
    .replace(/\b(hizmet veriyoruz|taşıyoruz|sağlıyoruz)\b/g, 'hizmet vermektedir')
    .replace(/\b(yapıyoruz|sunuyoruz|üretiyoruz)\b/g, 'sunmaktadır');
}

// 1. Process Region Pages
function refactorRegionPages() {
  console.log('--- REFACTORING REGION PAGES ---');
  for (const dist of DISTRICTS) {
    const filePath = path.join(rootDir, 'src', 'app', 'bolgeler', dist.slug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping: ${dist.slug} (not found)`);
      continue;
    }

    let code = fs.readFileSync(filePath, 'utf8');

    // Add imports if not present
    if (!code.includes('import PricingMatrix')) {
      code = code.replace(
        "import QuoteForm from '@/components/QuoteForm';",
        "import QuoteForm from '@/components/QuoteForm';\nimport PricingMatrix from '@/components/geo/PricingMatrix';\nimport BuildingAnalysis from '@/components/geo/BuildingAnalysis';\nimport { FACTS } from '@/lib/facts';"
      );
    }

    // Refactor H2 headings to question format (Aladag, Akşehir, etc.)
    code = code
      .replace(
        /<span>(.*?) Bina Yapısı ve Dağlık Arazi Koşulları<\/span>/g,
        "<span>$1 İlçesindeki Bina Yapısı ve Taşınma Koşulları Nasıldır?</span>"
      )
      .replace(
        /<span>(.*?) Bina Yapısı ve Konut Mimarisi<\/span>/g,
        "<span>$1 İlçesindeki Bina Yapısı ve Taşınma Koşulları Nasıldır?</span>"
      )
      .replace(
        /<span>(.*?) Yol Mesafesi ve İntikal Süresi<\/span>/g,
        "<span>$1 ile Selçuklu Merkez Garajı Arasındaki Mesafe ve İntikal Süresi Ne Kadardır?</span>"
      )
      .replace(
        /<span>(.*?) Evden Eve Nakliyat Fiyatları<\/span>/g,
        "<span>$1 Evden Eve Nakliyat Fiyatları Ne Kadardır?</span>"
      )
      .replace(
        /<span>(.*?)'dan Diğer Bölgelere Taşıma<\/span>/g,
        "<span>$1 İlçesinden Diğer Bölgelere Taşıma Güzergahları Nelerdir?</span>"
      )
      .replace(
        /<span>(.*?) Ev Taşıma Sürecimiz — 4 Adım<\/span>/g,
        "<span>$1 İlçesinde Ev Taşıma Süreci Nasıl Yürütülür?</span>"
      )
      .replace(
        /<span>(.*?) Nakliyat Hakkında Sıkça Sorulanlar<\/span>/g,
        "<span>$1 Nakliyat Süreci Hakkında Sıkça Sorulan Sorular Nelerdir?</span>"
      );

    // Make sure we replace self references
    code = cleanPronouns(code);

    // Injects citation assets right before RelatedLinks
    if (code.includes('<RelatedLinks') && !code.includes('<PricingMatrix')) {
      code = code.replace(
        /<RelatedLinks/g,
        `<PricingMatrix />
          <BuildingAnalysis districtName="${dist.name}" />
          <RelatedLinks`
      );
    }

    fs.writeFileSync(filePath, code, 'utf8');
    console.log(`Successfully refactored region page: ${dist.slug}`);
  }
}

// 2. Process Service Pages
function refactorServicePages() {
  console.log('--- REFACTORING SERVICE PAGES ---');
  for (const s of SERVICES) {
    const filePath = path.join(rootDir, 'src', 'app', 'hizmetler', s.slug, 'page.tsx');
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping: ${s.slug} (not found)`);
      continue;
    }

    let code = fs.readFileSync(filePath, 'utf8');

    // Add imports if not present
    if (!code.includes("import { FACTS }")) {
      code = code.replace(
        "import React from 'react';",
        "import React from 'react';\nimport { FACTS } from '@/lib/facts';\nimport PricingMatrix from '@/components/geo/PricingMatrix';\nimport PackingSpecs from '@/components/geo/PackingSpecs';\nimport K3InfoBlock from '@/components/geo/K3InfoBlock';"
      );
    }

    // Refactor H2 headings to question format for services
    code = code
      .replace(/<h2>Şehiriçi Evden Eve Nakliyat Nedir\?<\/h2>/g, '<h2>Şehiriçi Evden Eve Nakliyat Hizmeti Neleri Kapsar?</h2>')
      .replace(/<h2>Şehirlerarası Ev Taşıma Maliyetleri Nasıl Hesaplanır\?<\/h2>/g, '<h2>Şehirlerarası Ev Taşıma Maliyetleri Nasıl Hesaplanır?</h2>')
      .replace(/<h2>Eşya Depolama Fiyatları ve Koşulları<\/h2>/g, '<h2>Eşya Depolama Fiyatları ve Ödeme Koşulları Nasıl Hesaplanır?</h2>')
      .replace(/<h2>Ofis ve İşyeri Taşımacılığında Paketleme Detayları<\/h2>/g, '<h2>Ofis Taşımacılığında Paketleme Detayları Nelerdir?</h2>')
      .replace(/<h2>Paketleme Malzemesi Teknik Özellikleri<\/h2>/g, '<h2>Paketleme Malzemeleri ve Teknik Özellikleri Nelerdir?</h2>');

    code = cleanPronouns(code);

    // Injects citation assets right before RelatedLinks
    if (code.includes('<RelatedLinks') && !code.includes('<PricingMatrix')) {
      if (s.slug === 'profesyonel-esya-paketleme') {
        code = code.replace(/<RelatedLinks/g, `<PackingSpecs />\n          <RelatedLinks`);
      } else {
        code = code.replace(/<RelatedLinks/g, `<PricingMatrix />\n          <RelatedLinks`);
      }
    }

    fs.writeFileSync(filePath, code, 'utf8');
    console.log(`Successfully refactored service page: ${s.slug}`);
  }
}

refactorRegionPages();
refactorServicePages();
console.log('✨ All content page local GEO migrations complete!');
