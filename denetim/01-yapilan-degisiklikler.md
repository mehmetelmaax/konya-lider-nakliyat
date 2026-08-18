# Konya Lider Nakliyat — Yapılan Değişiklikler Raporu

Bu rapor, Next.js 16 App Router altyapısı üzerinde gerçekleştirilen tüm teknik, SEO, güvenlik ve performans iyileştirmelerini listeler.

---

## 1. Gelir Kaybını Durdurma ve Güvenlik (Faz 1)
- **Teklif Gönderim Altyapısı (`src/app/api/teklif/route.ts`):** 
  - Dinamik alıcı/gönderici e-posta yapısı `process.env.RESEND_FROM` ve `process.env.NOTIFY_EMAIL` üzerinden yapılandırıldı.
  - Yedek veri kanalı olarak `LEAD_WEBHOOK_URL` Telegram/WhatsApp entegrasyonu yazıldı.
  - Vercel Rest/Upstash KV API Rest ile entegre sıfır bağımlılıklı IP tabanlı rate limit mekanizması (teklif sınırlandırması) yazıldı.
  - KVKK uyumluluğu için müşteri adları ve telefon numaraları loglama esnasında maskelendi.
  - HTML ve script enjeksiyonuna karşı XSS koruması için `escapeHtml` yardımcı fonksiyonu yazıldı.
- **Fiyat Hesaplama Senkronizasyonu (`src/lib/pricing.ts` & `src/components/QuoteForm.tsx`):**
  - İstemci (client) ve sunucu (server) taraflarında farklı fiyatlar çıkmasını engellemek için ortak fiyat hesaplama motoru (`getEstimateFromForm`) yazıldı. Form ve API bu motora bağlandı.
- **Doğrulama Regex Genişletmesi (`src/lib/validation.ts`):**
  - Müşteri ismi doğrulama regex'i Türkçe karakterler (ç, ş, ğ, ü, ö, ı, İ), tire ve kesme işaretlerini destekleyecek şekilde güncellendi.
  - Google Ads dönüşüm takibi tetikleyici fonksiyonu (`trackConversion`) entegre edildi.

## 2. Yapısal SEO Kırıkları (Faz 2)
- **Yeni Hub Sayfaları:**
  - `/bolgeler` (Tüm ilçeler listesi, ItemList şeması ve zengin SEO içeriği).
  - `/hizmetler` (Hizmetler kataloğu, OfferCatalog şeması ve karşılaştırma tablosu).
  - `/rotalar` (Şehirlerarası nakliyat rotaları, mesafe/fiyat matrisi tablosu).
- **Yönlendirme Menüleri:**
  - Masaüstü ve mobil menülerde (`Header.tsx` & `Footer.tsx`) Adana kalıntısı olan "Karaisalı" bağlantıları silindi.
  - "Rotalar" bağlantısı doğrudan `/rotalar` hub sayfasına yönlendirildi.
- **Çift Şema (Double JsonLd) Giderilmesi:**
  - `Breadcrumb.tsx` içindeki `<JsonLd>` etiketleri silinerek BreadcrumbList şemasının mükerrer basılması engellendi.
- **Tarama Optimizasyonu (`src/app/robots.txt/route.ts` & `sitemap.ts`):**
  -robots.txt dosyasında görsellerin Google Görsel Arama'da indekslenmesi için `Allow: /_next/image` eklendi.
  - Sitemap.xml çıktısındaki son değiştirilme tarihleri (`lastModified`) sunucu saatine bağlı dinamik yapıdan kurtarılarak `src/lib/content-dates.ts` içine statikleştirildi.
- **H1 Görünürlüğü (`src/app/page.tsx` & `HeroSlider.tsx`):**
  - Ana sayfadaki `sr-only` (ekran okuyucuya özel gizli) H1 başlığı kaldırıldı.
  - Hero Slider'ın ilk slaytındaki başlık gerçek, görünür bir `<h1>` yapıldı, diğerleri `<p>` olarak bırakılarak tek H1 kuralına uyuldu.

## 3. Doorway Page ve İçerik Yönetimi (Faz 3)
- **Dinamik Bölge Rotası (`src/app/bolgeler/[slug]/page.tsx`):**
  - 14 adet birebir aynı kopyalanmış statik ilçe sayfası silindi.
  - Tek bir dinamik `/bolgeler/[slug]` rotası oluşturuldu.
- **İlçe Veri Tabanı (`src/lib/districts-content.ts`):**
  - Her ilçenin mahalle, bina stoğu, asansör kurulumu, yol durumu, yerel faaliyet detayları ve özel SSS verileri bu veri tabanına taşındı.
  - İçeriklerin eksik olması durumunda derlemenin başarısız olması (`throw new Error`) tetiklenerek boş/zayıf sayfaların yayına çıkması engellendi.
- **İndeksleme Kontrolü (`site-config.ts`):**
  - İlçeler için `indexable` bayrağı tanımlandı. İçeriği henüz tamamlanmamış (noindex olan) 4 ilçe (Sarayönü, Kulu, Cihanbeyli, Karapınar) için Google dizini kapalı tutuldu.

## 4. Yapısal Veri ve E-E-A-T (Faz 4)
- **Organization Şeması Geliştirmesi (`src/lib/schema.ts`):**
  - Logo genişlik/yükseklik ve koordinat verileri string yerine sayı tipine dönüştürüldü.
  - `priceRange` değeri `₺₺` olarak tekleştirildi.
  - GBP profili sameAs bağlantılarına, K3 belgesi ve çalışan sayısı ise dinamik şemaya bağlandı.
- **BlogPosting Şeması Geliştirmesi (`src/app/blog/[id]/page.tsx`):**
  - Sabit `wordCount: 650` değeri kaldırılarak blog makalesinin HTML etiketlerinden arındırılmış gerçek kelime sayısını hesaplayan algoritma entegre edildi.
  - Kurgusal yazar (Person) riskini çözmek için yazar tipi Organization yapıldı ve ana kuruluşa bağlandı.
- **Google Reviews Entegrasyonu (`src/components/GoogleReviews.tsx`):**
  - Google Business Profile API bağlantısı hazırlandı. Place ID ve API anahtarı girildiğinde AggregateRating ve Review şemasını güvenli şekilde üreten mantık entegre edildi.

## 5. Veri Tutarlılığı ve İmla (Faz 5)
- **Kuruluş Yılı Tekilleştirilmesi:**
  - Farklı dosyalardaki 2006 ve 2012 yılları `FACTS.foundedYear` (2006) üzerinden tekilleştirildi.
  - Slider ve Hakkımızda sayfalarındaki "20 Yıllık" ibareleri `new Date().getFullYear() - FACTS.foundedYear` formülüyle dinamikleştirildi.
- **Hatalı Rota Düzeltmesi (Konya-Konya):**
  - `site-config.ts` içindeki hatalı `konya-konya-evden-eve-nakliyat` rotası `konya-adana-evden-eve-nakliyat` (Adana) olarak düzeltildi.
  - Eski URL için `next.config.ts` içerisine 301 kalıcı yönlendirmesi eklendi.
  - Aynı şehre varışlı rotaları engelleyen derleme kontrolü yazıldı.
- **Dil Bilgisi ve Türkçe Karakter İyileştirmeleri:**
  - İlçe isimlerine gelen Türkçe yönelme ve bulunma ekleri düzeltildi (Sarayönü'nde, Kadınhanı'nda, Ereğli'de, Cihanbeyli'de vb.).
- **Görsel Temizlik:**
  - Kullanılmayan 7 adet ağır `adana-nakliyat-faaliyet-*` görseli silindi.
  - `scripts/find-unused-images.mjs` denetim scripti yazıldı.

## 6. Performans ve Core Web Vitals (Faz 6)
- **Slider Görsel Yüklemeleri:**
  - Aktif slayt dışındaki diğer tüm slaytların görsellerine Next.js `loading="lazy"` ve responsive `sizes` parametreleri tanımlandı.
- **Yerel Google Fontları:**
  - Google Fonts CDN preconnect bağlantısı silindi. Fontlar Next.js `@next/font/google` üzerinden yerel statik asset olarak derlendi.
- **Edge Runtime Kaldırılması:**
  - Deprecated olan `runtime = 'edge'` tanımları `manifest.ts`, `opengraph-image.tsx` ve `twitter-image.tsx` dosyalarından kaldırılarak daha kararlı `nodejs` runtime'ına geçildi.
- **SEO AI (llms.txt) Statikleştirilmesi:**
  - `llms.txt` ve `llms-full.txt` rotalarına `force-static` eklenerek static prerender yapılması sağlandı.
- **Global Klavye Dinleyicisi Düzeltmesi:**
  - Slider'ın global `window` dinleyicisi kaldırılarak sadece slider container odaklı duruma getirildi.

## 7. Çerez Onayı ve CSP (Faz 7/8)
- **Çerez Banner Entegrasyonu (`src/components/CookieConsent.tsx`):**
  - Consent Mode v2 uyumlu kabul/ret banner'ı yazıldı ve Google Tag Manager rıza güncelleme entegrasyonu sağlandı.
- **CSP (Content-Security-Policy):**
  - XSS koruması için `next.config.ts`'e sıkı CSP header'ları tanımlandı.
- **KVKK Onay Kutusu:**
  - Teklif formu gönderiminin KVKK onay şartı checkbox'ı işaretlenmeden yapılması engellendi.

## 8. Son Otomasyon ve Teknik Düzeltmeler (Yeni Seans İyileştirmeleri)
- **KVKK Günlük Güvenliği ve İspat Yükümlülüğü (`src/app/api/teklif/route.ts`):**
  - Sunucu Redis ve Webhook veri kayıtlarına rıza onay zaman damgası (`kvkkOnayTimestamp`) ve istemci IP adresi (`ipAddress`) eklenerek ispat yükümlülüğü yerine getirildi.
  - `/yasal/kvkk` sayfası, toplanan ad, telefon, ilçeler, oda sayısı ve asansör verilerini açıkça listeleyen, 10 yıllık saklama süresini belirten ve veri sorumlusu ofis adresini içeren yasal standartlara taşındı.
- **Fiyatlandırma Motoru ve İlçe Listesi Dinamikleştirilmesi (`src/lib/pricing.ts` & `src/components/QuoteForm.tsx`):**
  - Mükerrer hesaplama fonksiyonları tamamen silindi; `estimatePrice()` tek veri ve mantık kaynağına dönüştürüldü.
  - İlçeler arası taşımalarda, `site-config.ts` içinde bulunan `distanceKm` verileri dinamik olarak fiyat motoruna enjekte edilerek dış ilçe fiyat kayıpları engellendi.
  - İki şehir/nokta arasındaki hesaplama çıktısı `tests/pricing.test.ts` entegrasyon testi ile doğrulandı.
  - Formdaki ilçe seçim listesi, statik diziden arındırılarak doğrudan `site-config.ts` içindeki `DISTRICTS` sabitinden dinamik beslenecek hale getirildi.
- **Marka Kimliği ve Renk Paleti Otomasyonu (Forest/Gold):**
  - globals.css marka paleti renk değişken isimleri yeşil-altın kimliğine (forest/gold) uyarlandı; tüm codebase üzerindeki Tailwind renk sınıfları (`navy` -> `forest`, `orange` -> `gold`, `orange-text` -> `gold-text`) otomatik mjs scripti ile 54 dosyada başarıyla güncellendi.
  -globals.css'ten `overflow-x: hidden` body yara bandı temizlendi, viewport `themeColor` ve e-posta rengi yeni yeşil-altın kodlarına bağlandı.
- **Hero Slider DOM ve LCP Performansı:**
  - Slider bileşeninde DOM boyutunu ve LCP süresini düşürmek amacıyla sadece aktif, bir sonraki ve LCP SEO `h1` taşıyan ilk slaytın DOM'da render edilmesi sağlandı.
- **Güvenlik Sıkılaştırması (CSP Frame-src):**
  - `next.config.ts` CSP direktiflerine `frame-src 'self' https://www.google.com https://*.google.com; frame-ancestors 'self';` eklenerek Google Haritalar iframe'inin engellenmesi önlendi.
- **Dry Rota Mimarisi:**
  - `ROUTES` config listesi, `routesDatabase` nesnesinden dinamik olarak türetilerek mükerrer rota tanımları engellendi. Faulty `konya-konya` rotası `konya-adana` olarak tüm alt içerikleriyle birlikte düzeltildi.

