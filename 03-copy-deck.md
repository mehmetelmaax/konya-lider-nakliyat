# Phase 3 — Copy Deck

## 3.1 HERO (S1) — Slider Copy & Mechanics

### FIXED NON-ROTATING LAYER (Appears on all slides)
- **Primary CTA**: [Fiyat Teklifi Al] (Links to Quote Form)
- **Secondary CTA**: [Hızlı WhatsApp] (wa.me link with prefilled text: `"Merhaba, evimi taşımak istiyorum. Fiyat teklifi alabilir miyim?"`)
- **Direct Phone Link**: `+90 554 640 02 05` (Wrapped in `tel:` link)
- **Trust Strip**: [ K3 Yetki Belgeli · 20 Yıllık Konya Firması · Sabit Fiyat Garantisi ]

### SLIDE 1: Primary Value Proposition + Money Keyword (H1)
- **Headline**: Konya Evden Eve Nakliyatta Sabit Fiyat
- **Line Break Specification (at 380px)**:
  `Konya Evden Eve`
  `Nakliyatta Sabit Fiyat`
- **Subheadline**: Taşınma günü ek ücret talep etmiyoruz. Eşyalarınızı asansörlü araçlarımızla hasarsız taşıyoruz.
- **Visual Direction**: A close-up shot of a modern, clean moving truck with the "Lider Evden Eve" branding, parked on an Konya street. Natural sunlight, clean focus. No generic graphics.
- **Turkish Alt Text**: Konya Lider Nakliyat asansörlü ev taşıma aracı sokakta park halinde.
- **Slide-level Trust Line**: Sözleşmeli ve sigortalı taşımacılık yapıyoruz.

### SLIDE 2: Geographic & Route Authority (H2)
- **Headline**: Selçuklu ve Meram’da Asansörlü Taşıma
- **Line Break Specification (at 380px)**:
  `Selçuklu ve Meram’da`
  `Asansörlü Taşıma`
- **Subheadline**: Konya'nın tüm ilçelerinde yüksek katlı binalara kendi mobil eşya asansörlerimizle ulaşıyoruz.
- **Visual Direction**: An exterior view of a modern high-rise building in Meram district. A red-and-white metal ladder elevator is extended up to a 10th-floor balcony, carrying padded furniture packages.
- **Turkish Alt Text**: Selçuklu'da asansörlü nakliyat aracı eşyaları yüksek kata çıkarıyor.
- **Slide-level Trust Line**: 15. kata kadar ulaşan eşya asansörü filosu.

### SLIDE 3: Proof and Effortlessness (H2)
- **Headline**: Mobilya ve Beyaz Eşya Montajı Dahil
- **Line Break Specification (at 380px)**:
  `Mobilya ve Beyaz Eşya`
  `Montajı Dahil`
- **Subheadline**: Gardırop montajını ve beyaz eşya bağlantılarını marangoz ekibimiz ücretsiz yapıyor.
- **Visual Direction**: A professional mover in a branded uniform carefully assembling a wardrobe wooden panel inside a modern bedroom. Natural lighting, focus on hands and tool.
- **Turkish Alt Text**: Lider Nakliyat marangoz personeli yatak odasında dolap kurulumu yapıyor.
- **Slide-level Trust Line**: Her taşıma ekibinde 1 sertifikalı marangoz bulunur.

### Slider Mechanics
- **Autoplay Interval**: 6 seconds (Matches reading speed of 40 words at 150 WPM + transition time).
- **Transition**: CSS crossfade, duration `400ms`, easing `cubic-bezier(0.25, 1, 0.5, 1)`.
- **Interactivity**: 
  - Pause on hover, focus, and touch.
  - Permanent autoplay stop after manual dot/arrow interaction.
  - Disable autoplay when `prefers-reduced-motion: reduce` is active.
- **Pagination**: Large dot navigation indicators at the bottom. Minimum touch target `44x44px`.
- **SEO Rules**: 
  - Only Slide 1 contains the `<h1>`. Slides 2 and 3 use `<h2>`.
  - All slides' text must be rendered in initial server-side HTML (SSR). No client-side JS generation for SEO indexability.
  - Slide 1 image must be the Largest Contentful Paint (LCP) element with `fetchpriority="high"`. Slides 2-3 are lazy-loaded.
- **Mobile Behavior**: The slider collapses to a static Slide 1 layout on viewports `< 768px` to save mobile bandwidth, eliminate layout shift (CLS), and maximize conversion above the fold.

---

## 3.2 TRUST SECTION

### Trust Signals

#### Signal 1 (Financial Risk Removal)
- **Display Figure**: 100.000 TL
- **Label**: Sigorta Güvencesi
- **Support Line**: Şehirlerarası taşımalarda tüm eşyalarınız Anadolu Sigorta poliçesiyle güvence altına alınır.
- **Verification Slip**: Stated on `7.htm` (Sigorta vurgusu) / NEEDS_VERIFICATION / Risk if false: High liability if damage occurs.
- **Objection Killed**: "Eşyalarım taşınırken kırılırsa ne olacak?"

#### Signal 2 (Volume / Longevity)
- **Display Figure**: 20 Yıl
- **Label**: Konya Yerel Tecrübesi
- **Support Line**: 2006 yılından beri Selçuklu merkezli olarak Konya genelinde hizmet veriyoruz.
- **Verification Slip**: Stated on `index.htm` / VERIFIED / Risk if false: Low.
- **Objection Killed**: "Firma korsan mı, yeni mi?"

#### Signal 3 (Operational Capacity)
- **Display Figure**: 15. Kat
- **Label**: Mobil Asansör Erişimi
- **Support Line**: Dış cephe asansörlerimiz en dar sokaklarda bile yüksek katlara güvenli kurulum sağlar.
- **Verification Slip**: Stated on `8.htm` / HIGH_CONFIDENCE / Risk if false: High if customer lives on 14th floor and elevator can't reach.
- **Objection Killed**: "Asansörünüz yüksek kata yetişir mi?"

### Thin-Proof Variant (Honest Operational Commitments)
If proof details are questioned:
1. **Yazılı Sözleşme**: Taşıma öncesi anlaşılan fiyat ve tarih sözleşme ile imza altına alınır.
2. **Kendi Araçlarımız**: Dışarıdan kiralık kamyon kullanmayız; araçlarımızın tamamı logoludur.
3. **Eğitimli Kadro**: Günlük yevmiyeli işçi çalıştırmayız. Kadromuzda marangoz ve tesisatçı sabittir.

### Objection-Killer Line (Hero/Trust divider)
> *"Fiyatımız nettir. Yol bittiğinde, eşya kamyona yüklendiğinde ekstra ücret talep etmeyeceğimizi sözleşmeyle taahhüt ediyoruz."*

### Testimonials
Since no real reviews were on the original site, we use this placeholder:

```markdown
[[PLACEHOLDER — YAYINDAN ÖNCE GERÇEK GOOGLE YORUMLARI İLE DEĞİŞTİR]]
"Lider Nakliyat ile Selçuklu'dan Meram'ya taşındık. Taşıma günü dedikleri saatte geldiler. Gardırobu söküp yeni evde aynen kurdular. Fiyat başta ne konuştursak o oldu, ekstra masraf çıkmadı. Teşekkürler."
- [Mehmet K., Selçuklu → Meram]
```
*Note: Review/AggregateRating Schema remains disabled until real Google Business Profile reviews are collected and verified.*

---

## 3.3 SERVICES SECTION

### Services Weighted Priority Matrix

| Service Name | Revenue Contribution (40%) | Search Volume (30%) | Differentiation (30%) | Total Score | Action / Priority |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Asansörlü Evden Eve Nakliyat** | 9/10 | 9/10 | 8/10 | **8.7** | **Tier 1** (Primary focus) |
| **Şehirlerarası Nakliyat** | 10/10 | 8/10 | 6/10 | **8.4** | **Tier 1** (High value) |
| **Şehiriçi Evden Eve Nakliyat** | 7/10 | 10/10 | 5/10 | **7.3** | **Tier 2** (High volume) |
| **Ofis ve İşyeri Taşımacılığı** | 6/10 | 5/10 | 7/10 | **6.0** | **Tier 2** (B2B niche) |

*What we cut*: Standalone pages for "Paketleme" and "Ekspertiz". These are support features of our core transport services. Displaying them as separate paid services dilutes premium positioning.

### Service Details

#### 1. Asansörlü Nakliyat
- **Searchable Name**: Asansörlü Ev Taşıma
- **Outcome Line**: Merdiven hasarlarını sıfıra indiren, hızlı ve güvenli dış cephe taşıma sistemi.
- **Mechanics**:
  - 15. kata kadar erişim
  - Dar sokaklara uygun mobil araçlar
  - Çift halatlı güvenlik sistemi
- **Best For**: 3. kat ve üzeri yüksek binalarda oturanlar.
- **Price Posture**: Fiyat farkı asansör kurulum katına göre belirlenir.
- **Micro-CTA**: [Asansörlü Teklif Al]
- **Icon Direction**: Outline icon showing a building facade with a ladder lift pointing to a window.
- **Conversion Rationale**: Demonstrates modern equipment, resolving the fear of scratched building walls and damaged furniture.

#### 2. Şehirlerarası Nakliyat
- **Searchable Name**: Şehirlerarası Ev Taşıma
- **Outcome Line**: Konya'dan Türkiye'nin tüm illerine sigortalı ve zamanında teslimat.
- **Mechanics**:
  - Anadolu Sigorta poliçeli
  - Çift şoförlü çelik kasa araçlar
  - Yol durum takibi
- **Best For**: İl dışına atanan memurlar ve taşınan aileler.
- **Price Posture**: Kilometre mesafesine ve eşya hacmine göre hesaplanır.
- **Micro-CTA**: [İllerarası Fiyat Al]
- **Icon Direction**: Outline map icon of Turkey with a cargo truck indicator.
- **Conversion Rationale**: Addresses long-distance anxiety by highlighting double drivers and professional transit cargo insurance.

#### 3. Şehiriçi Nakliyat
- **Searchable Name**: Şehir İçi Ev Taşıma
- **Outcome Line**: Konya merkez ilçeleri arasında aynı gün içinde sorunsuz ev teslimi.
- **Mechanics**:
  - Selçuklu-Meram hızlı servis
  - Aynı gün anahtar teslim
  - Sabit paket fiyat teklifi
- **Best For**: İlçe sınırları içinde hızlı ve pratik taşınmak isteyenler.
- **Price Posture**: Evin oda sayısına (1+1, 2+1, 3+1) göre sabitlenir.
- **Micro-CTA**: [Şehir İçi Teklif Al]
- **Icon Direction**: House icon with a local delivery truck indicator.
- **Conversion Rationale**: Emphasizes speed and locality. The user wants to know they can complete the move within the day.

#### 4. Ofis ve İşyeri Taşımacılığı
- **Searchable Name**: Ofis ve İşyeri Taşıma
- **Outcome Line**: Dosya, arşiv ve elektronik cihazların sınıflandırılarak sıfır kayıpla yeni ofise aktarılması.
- **Mechanics**:
  - Numaralı etiketli paketleme
  - Hassas elektronik taşıma kasaları
  - Sözleşmeli iş teslimi
- **Best For**: İş kesintisi yaşamak istemeyen Konya esnafı ve şirketleri.
- **Price Posture**: Ofis oda sayısı ve parça cihaz adedine göre tekliflendirilir.
- **Micro-CTA**: [Kurumsal Teklif Al]
- **Icon Direction**: Briefcase icon next to a cargo box outline.
- **Conversion Rationale**: B2B clients need organization and security. Labeling and listing electronics handling targets these exact corporate fears.

---

## 3.4 OBJECTION HANDLING + FAQ

### FAQ Block (STATED Only)

#### Q1: Taşınma günü anlaştığımız fiyata sonradan ek ücret eklenecek mi?
- **A1**: Hayır. Keşif veya form üzerinden anlaştığımız fiyat son fiyatımızdır. Taşıma günü ekstra iş veya hamaliye masrafı adı altında ek ücret talep etmiyoruz. Her şey taşıma sözleşmesinde yazılıdır.

#### Q2: Mobilyalarımın montajını siz yapıyor musunuz?
- **A2**: Evet. Gardırop, yemek masası, yatak gibi de-montaj gerektiren mobilyalarınızı marangozumuz sökerek yeni evinizde istediğiniz odada tekrar kurar. Duvara monte edilen TV ve raflar bu hizmete dahil değildir.

#### Q3: Eşyalarım taşıma sırasında sigortalı mı?
- **A3**: Evet. Şehirlerarası nakliyat hizmetlerimizin tamamı Anadolu Sigorta güvencesiyle emtia taşımacılık poliçesi kapsamındadır. Şehir içi taşımalarda ise kendi firma güvencemizle sözleşmeli hasar karşılama taahhüdü veriyoruz.

#### Q4: Asansörlü nakliyat aracı her sokağa sığar mı?
- **A4**: Mobil asansörlü araçlarımız kamyonet boyutlarındadır ve standart Konya sokaklarına rahatça giriş yapabilir. Sadece çok dar sokaklarda park önlemi alınması gerekir. Taşıma öncesi ekiplerimiz sokağın durumunu inceler.

#### Q5: Beyaz eşyalarımın bağlantılarını yapıyor musunuz?
- **A5**: Çamaşır makinesi ve bulaşık makinesinin sökümünü gerçekleştirip yeni evinizde hazır olan tesisat girişlerine bağlantılarını yapıyoruz. Ancak buzdolabı kapak sökümü ve fırın gaz bağlantıları gibi teknik işler yetkili servis sorumluluğundadır.

### Written Guarantee Proposal
> *"Lider Nakliyat olarak taşıdığımız mobilyalarda oluşabilecek darbe veya kırılmaları marangoz ekibimizle yerinde onarır, onarılamayacak hasarları nakit olarak karşılarız."*

---

## 3.5 FINAL CTA

- **Headline**: Taşınma Stresini Bize Bırakın
- **Value Reminder**: K3 belgeli, 20 yıllık yerel deneyim ve sabit fiyat sözleşmesiyle eşyalarınız güvence altında.
- **Primary CTA**: [Ücretsiz Fiyat Teklifi Hesapla] (Links to form, lower commitment than direct call)
- **Secondary CTA**: [WhatsApp'tan Fotoğraf Gönder] (Direct wa.me link with prepended message: `"Merhaba, eşyalarımın fotoğrafını atıp fiyat teklifi almak istiyorum."`)
- **Trust Reminder**: Günlük yevmiyeli işçi çalıştırmayız, tamamı kendi kadromuzdur.
- **Urgency Verification**: *Real Scarcity* — *"Haftalık araç kapasitemiz sınırlıdır. Taşınma tarihinizi garanti altına almak için en az 10 gün önceden rezervasyon yaptırmanızı öneririz."* [ASSUMED: Nakliye sezonunda yoğunluk mevcuttur].

### Friction Audit
1. **Form Fields**: Name, Telephone, Source District, Destination District, Move Type (1+1, 2+1, etc.).
2. **Removed**: No Email field (not needed for moving quotes), no exact street address required on step one, no inventory counts. This keeps conversion rates high.

---

## 3.6 HEADER / FOOTER SPEC

### Header
- **Background**: Transparent on hero slider → solid Navy blue (`#102A43`) upon scrolling past the slider edge.
- **Navigation (Desktop)**: Ana Sayfa · Profilimiz · Hizmetler · Sıkça Sorulanlar · İletişim.
- **CTAs**: Large button `[Teklif Al]` (Orange background, Navy label) and phone link `0554 640 02 05` highlighted.
- **Mobile**: Minimalist hamburger icon on the left, full click-to-call phone icon on the right (`56px` height target). Focus trap enabled on expanded navigation drawer.

### Footer (Navy Background `#102A43`)
- **NAP block**:
  `Konya Lider Nakliyat`
  `Fatih Mahallesi, 73258 Sokak, No:9/1`
  `Selçuklu / Konya`
- **Working Hours**: tr-TR formatting — *Hafta İçi ve Hafta Sonu: 07:00 – 22:00*. (Gece gelen WhatsApp mesajları ertesi sabah 07:30'da cevaplanır ibaresi eklenecektir).
- **Links**: KVKK Aydınlatma Metni, Gizlilik Politikası.
- **Social**: Placeholder icon graphics removed to prevent link-leak; only phone/WhatsApp and direct links kept.
- **Safe Area Inset**: Bottom bar adds standard CSS safe-area-inset padding for iOS home indicator clearing.
