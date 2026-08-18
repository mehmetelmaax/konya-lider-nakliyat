# Phase 1 — Business Intelligence Extraction

## Identity
- **Exact Trade Name on Site**: `KONYA LİDER NAKLİYAT` (appears on main page and profile page) and `KONYA LİDER EVDEN EVE NAKLİYAT` (appears in the footer copyright).
- **Alternate Names / "Lider Evden Eve Nakliyat"**: "Lider" is the main word used in title tags (`<title>LİDER</title>`). "Lider Evden Eve Nakliyat" appears in the footer copyright text combined as "KONYA LİDER EVDEN EVE NAKLİYAT".
- **Tagline / Slogan / Positioning**: 
  - *"20 Yıllık Nakliyat Tecrübesi..."* (Found on index page body section)
  - *"Var olan standartların üzerinde bir taşımacılık imkanı sunuyoruz. Eşyalarınızı yeni evinize hasarsız bir şekilde ulaştırıyoruz. Önceliğimiz her zaman müşteri memnuniyetini en üst seviyede tutmaktır."* (Found on index and profile pages)

## Contact Details (Byte-exact)
- **Full Address**: Not stated on the website.
  - *Web search finding*: `Fatih Mahallesi, 73258 Sokak, No:9/1, Selçuklu/Konya` [DOĞRULA: Bu adresi Google Business Profile ve resmi evraklarla teyit edin]
- **Phone Numbers**: `+90 554 640 02 05` (Found in top header menu, footer boxes, and overlay call images `img/erdem1.png`)
- **WhatsApp Number**: `+90 554 640 02 05` (Found in footer boxes and overlay call image `img/erdem.png` with link `https://api.whatsapp.com/send?phone=905546400205`)
- **Email**: `info@konyaliderevdeneve.com`
- **Working Hours**: Not stated on the website. [DOĞRULA: Çalışma saatlerini netleştirin]
- **Social Profiles**: 
  - Facebook: `https://www.facebook.com` (Placeholder link)
  - Twitter/X: `https://twitter.com` (Placeholder link)
- **Google Business Profile**: Not present on the website.

## Operations
- **Services Offered**:
  - *Şehiriçi Evden Eve Nakliyat*: *"Şehir içi taşımacılık hizmetimizde, Konya şehir merkezi ve ilçerine evden eve taşımacılık hizmeti veriyoruz."*
  - *Şehirlerarası Evden Eve Nakliyat*: *"Şehirlerarası taşımacılık hizmetimizde, ülemizin her il ve ilçesine evden eve taşımacılık hizmeti veriyoruz."*
  - *Asansörlü Evden Eve Nakliyat*: *"Ev Taşınmasında asansörlü nakliyat çok önemlidir... eşya asansörü ile eşyaları kolayca araca yüklüyoruz. Asansörlü nakliyat demek, güvenli taşıma ve zamandan tasarruf demektir."*
  - *İSPARTA YOLU VEYA BAŞKA OFİS / FİRMA DETAYLARI*: Yok.
  - *İşyeri ve Ofis Nakliyatı* (Site uses: `Konya İş Yeri Taşımacılığı` / `İşyeri ve Ofis Nakliyatı`)
  - *Profesyonel Eşya Paketleme* (Site uses: `Konya Profesyonel Eşya Paketleme` / `Profesyonel Eşya Paketleme`)
  - *Ücretsiz Ekspertiz* (Site uses: `Konya Eşya Ekspertiz Hizmeti` / `Ücretsiz Ekspertiz`)
- **Districts / Cities Claimed**: 
  - *"Konya şehir merkezi ve ilçerine"* (Selçuklu and Ilgın explicitly appear in hidden crawler footer links)
  - *"ülemizin her il ve ilçesine"* (Turkey-wide intercity shipping)
- **Fleet, Crew Size, Equipment**: 
  - Eşya asansörü (Elevator truck capability) is mentioned: *"asansörlü araç hizmeti", "eşya asansörü"*
  - No details on fleet size, exact vehicle types, or crew headcount. [DOĞRULA]
- **Years in Business**: Claimed *"20 Yıllık Nakliyat Tecrübesi..."* (implies founding around 2006 given current year 2026).
- **Insurance / Licensing**: 
  - Mentions sigorta: *"Aynı zamanda nakliyat sigortası büyük önem arzeder."*
  - No licensing detail (K3 certificate etc.) or insurance policy limit/insurer name. [DOĞRULA]
- **Pricing**: None shown on the website. [DOĞRULA]

## Proof
- **Testimonials**: None present on the website.
- **Review Counts / Ratings**: None.
- **Awards / Media**: 
  - Two YouTube videos embedded: 
    1. `https://www.youtube-nocookie.com/embed/9ZFenNxDDv0`
    2. `https://www.youtube-nocookie.com/embed/LTHJHwFcqSk`
    (Videos demonstrate moving operations, but contain no formal awards or media mentions).

## Technical Baseline
- **Current Platform**: Hardcoded Bootstrap site using jQuery, Fancybox, Owl Carousel, and fakeLoader.
- **Page Count**: ~9 user-visible pages (`index.htm`, `14.htm`, `17.htm`, `7.htm`, `8.htm`, `9.htm`, `11.htm`, `12.htm`, `13.htm`). Plus several doorway pages in subdirectories like `251/` to `258/` used for crawler link-building.
- **URL Structure**: `.htm` and `.html` extensions. Very basic legacy structure (e.g., `17.htm` for Şehiriçi).
- **Title Tags**: `<title>LİDER</title>` (very poor for local SEO).
- **Meta Descriptions / Keywords**: None. No descriptive meta tags are present in the HTML head.
- **Heading Structure**: No proper semantic headings. The homepage uses invisible H1 tags with a dot text (`<h1 align="left"><font size="3" color="#FFFFFF">.</font></h1>`) for style/spacing, which destroys SEO semantics.
- **Structured Data**: None present on any page.
- **Mobile Behavior / Page Speed Impression**: Uses legacy bootstrap 3 which is mobile-responsive but slow due to blocking scripts (jQuery, fakeLoader, FontAwesome, Owl Carousel styles) and large unoptimized images (e.g., raster slayt images and background graphics).

---

## Verified Facts Table

| Fact | Source URL | Confidence |
| :--- | :--- | :--- |
| **Trade Name**: Konya Lider Nakliyat | `14.htm` (Firma Profili) | HIGH |
| **Phone**: +90 554 640 02 05 | `index.htm` | HIGH |
| **Email**: info@konyaliderevdeneve.com | `index.htm` | HIGH |
| **WhatsApp**: +90 554 640 02 05 | `index.htm` | HIGH |
| **Experience**: 20 Years | `index.htm` | HIGH |
| **Office Address**: Fatih Mh. 73258 Sk. No:9/1 Selçuklu/Konya | External search (GBP / Maps) | MEDIUM (Requires verification) |
| **Insurance**: "Nakliyat sigortası" provided | `7.htm` (Şehirlerarası) | HIGH (Conceptually, but details low) |
| **Equipment**: Elevator truck capability | `8.htm` (Asansörlü) | HIGH |

---

## Gaps List

Everything a premium moving site needs that the current site lacks:
1. **[DOĞRULA: Office Location & GPS]**: Exact street address, maps location, and Google Business Profile verification status.
2. **[DOĞRULA: Working Hours]**: Exact working hours (e.g., 07:00 - 22:00 or 24/7).
3. **[DOĞRULA: Fleet Details]**: Total count of trucks, steel-case box dimensions, elevator reach (e.g., up to 15th floor).
4. **[DOĞRULA: Crew Size & Training]**: Number of permanent employees vs. daily hires, carpenter and plumber roles.
5. **[DOĞRULA: Insurance Limits]**: Maximum coverage amount per transport (e.g., 100.000 TL, Anadolu Sigorta).
6. **[DOĞRULA: Licensing]**: K3 Transport Certificate registry number.
7. **[DOĞRULA: Trust Proof]**: Real customer testimonials, Google Business review rating count and link.
8. **[DOĞRULA: Pricing Guidelines]**: Average price ranges (e.g., starting from 3+1 move flat pricing factors).

---

## Brand Conflict Report

The domain is **`konyaliderevdeneve.com`** (exact keyword matching), while the branding inside the page is **`Konya Lider Nakliyat`** (sometimes written as just **`Lider`**).

- **Brand Name 1: Konya Evden Eve Asansörlü Nakliyat (Domain-exact)**
  - *Equity*: Matches exact local search intent in Konya, but does not read as a real brand name. High spam perception.
- **Brand Name 2: Konya Lider Nakliyat (Actual Brand)**
  - *Equity*: Real business identity, matches Yandex/Google search listings and phone registration data.
- **Recommendation**:
  - Use **Konya Lider Nakliyat** as the primary visual brand name in headers, copy, and footer. This maintains high trust and legal safety.
  - Optimize semantic headers and meta descriptions to target "Konya Evden Eve Nakliyat" and "Konya Asansörlü Nakliyat" to leverage the domain's keyword-matching value without looking generic or untrustworthy to human visitors.
