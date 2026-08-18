# Konya Lider Nakliyat - Kurumsal Web Sitesi

Bu proje, Konya Lider Evden Eve Nakliyat firması için özel olarak geliştirilmiş; **SEO Otoritesi (Topical Authority), Core Web Vitals (Hız & Performans), Erişilebilirlik (WCAG AA), Dönüşüm Optimizasyonu ve Güvenli Kurumsal Altyapı** odaklı modern bir Next.js 16 uygulamasıdır.

---

## 1. Teknoloji Yığını (Tech Stack)

- **Framework:** Next.js 16.3.0 (App Router, React 19)
- **Stil (CSS):** Vanilla CSS ve Tailwind CSS v4 entegrasyonu (hız ve LCP odaklı)
- **İkon Kütüphanesi:** Lucide React
- **Resim İşleme:** Sharp (Responsive AVIF/WebP görsel üretimi ve blur placeholder oluşturma)
- **Form Doğrulama:** Zod (Server-side veri bütünlüğü ve spam honeypot koruması)
- **E-Posta Servisi:** Resend API (Teklif formlarını anlık e-posta olarak iletme)
- **Web Analiz:** Google Analytics 4 (GA4) & Microsoft Clarity (Click/Scroll/Conversion takipleri)

---

## 2. Kurulum ve Başlangıç

Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Yerel geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak kontrol edin.

---

## 3. Çevre Değişkenleri (Environment Variables)

Geliştirme veya canlı ortama geçişte kök dizinde bir `.env.local` dosyası oluşturarak aşağıdaki değişkenleri tanımlamanız gerekir:

| Değişken Adı | Açıklama | Nereden Alınır? |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Form bildirim e-postalarını göndermek için kullanılan Resend şifresi. | [resend.com](https://resend.com) panelinden ücretsiz API anahtarı olarak oluşturulur. |
| `NOTIFY_EMAIL` | Teklifler geldiğinde bildirim gönderilecek yönetici adresi. | firmanın resmi e-postası (örn: `info@konyaliderevdeneve.com`). |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Ölçüm Kimliği. | [analytics.google.com](https://analytics.google.com) adresinden mülk kurulumunda verilen `G-XXXXXXXXXX` kodu. |
| `NEXT_PUBLIC_CLARITY_ID`| Microsoft Clarity Proje Kimliği. | [clarity.microsoft.com](https://clarity.microsoft.com) panelinden alınan 10 haneli proje kodu. |
| `NEXT_PUBLIC_GSC_VERIFICATION`| Google Search Console doğrulama kodu. | Search Console mülk doğrulama adımındaki `<meta>` etiketinin `content` değeri. |
| `NEXT_PUBLIC_YANDEX_VERIFICATION`| Yandex Webmaster doğrulama kodu. | Yandex Webmaster panelindeki doğrulama meta etiketi içeriği. |

*Örnek şablon için [.env.example](file:///.env.example) dosyasını inceleyin.*

---

## 4. Kullanılabilir NPM Komutları (Scripts)

| Komut | Açıklama |
| :--- | :--- |
| `npm run dev` | Yerel geliştirme sunucusunu (`localhost:3000`) çalıştırır. |
| `npm run build` | Next.js üretim derlemesini (production build) alır. Statik sayfaları prerender eder. |
| `npm run start` | Derlenmiş üretim sürümünü sunucuda ayağa kaldırır. |
| `npm run lint` | Eslint kuralları doğrultusunda kod kalitesi ve syntax kontrolleri yapar. |
| `npm run audit` | **SEO, Heading, Şema, Kırık Link, Resim Boyutları ve Kelime Sayısı** denetimlerini ardışık çalıştırır. |
| `node scripts/optimize-images.mjs` | `public/img/` klasöründeki görselleri optimize eder, responsive WebP/AVIF türevlerini üretir ve blur kodlarını kaydeder. |
| `node scripts/generate-seo-report.mjs` | Derleme çıktılarını analiz ederek `SEO-DURUM.md` tablosunu otomatik günceller. |

---

## 5. Yeni İçerik Ekleme Kılavuzu

Sitenin dinamik ve ölçeklenebilir yapısı gereği, yeni rotalar (hizmetler, bölgeler, bloglar) kod yazmaya gerek kalmadan config dosyaları üzerinden yönetilir:

### A. Yeni Hizmet Sayfası Ekleme
1. `src/lib/site-config.ts` dosyasını açın.
2. `SERVICES` dizisine yeni bir nesne ekleyin:
   ```typescript
   {
     slug: 'yeni-hizmet-slug',
     name: 'Yeni Hizmet Başlığı',
     desc: 'Arama sonuçlarında görünecek 120-158 karakterlik meta açıklama.',
     keywords: ['anahtar', 'kelimeler'],
     canonical: '/hizmetler/yeni-hizmet-slug'
   }
   ```
3. `src/app/hizmetler/[slug]/` altındaki dinamik sayfa yapısı bu veriyi otomatik okuyarak static sayfayı, JsonLd şemalarını ve Breadcrumb yapısını derleme anında oluşturacaktır.

### B. Yeni İlçe / Bölge Sayfası Ekleme
1. `src/lib/site-config.ts` dosyasını açın.
2. `DISTRICTS` dizisine yeni bölgeyi ekleyin:
   ```typescript
   {
     slug: 'ilce-adi-evden-eve-nakliyat',
     name: 'İlçe Adı',
     tier: 'ilce', // 'merkez' veya 'ozel'
     neighbors: ['Komşu1', 'Komşu2'] // RelatedLinks için en az 3 komşu
   }
   ```
3. İlgili ilçenin gerçek mahalle listesini `src/lib/neighborhoods.ts` dosyasına ekleyin.

### C. Yeni Blog Yazısı Ekleme
1. `src/lib/blog-data.ts` dosyasını açın.
2. `blogDatabase` nesnesine yeni yazıyı ekleyin:
   ```typescript
   'yeni-yazi-slug': {
     id: 'yeni-yazi-slug',
     title: 'Yazı Başlığı (30-60 karakter)',
     desc: 'Kullanıcıyı çekecek meta açıklama (120-158 karakter).',
     excerpt: 'Kısa önizleme metni.',
     date: '2026-08-09',
     author: 'Yazar Adı',
     image: '/img/slayt-1.jpg',
     category: 'Rehber', // 'Fiyat' | 'Rehber' | 'Yasal' | 'Teknik' | 'Bölge'
     faqs: [
       { question: 'Soru 1', answer: 'Cevap 1' },
       // Toplam 5 SSS zorunludur
     ],
     contentHtml: `<p>1200+ kelimelik detaylı HTML içerik blog metni...</p>`
   }
   ```
3. Blog sistemi yeni yazıyı anında `/blog` listesine, kategori filtrelerine ekleyecek, sitemap.xml içerisine dahil edecek ve dinamik SEO şemalarını (BlogPosting) oluşturacaktır.

---

## 6. Canlıya Alım (Deploy) Kontrol Listesi

Siteyi Vercel veya başka bir sunucuya yüklemeden önce son kontrolleri yapın:

1. **Çevre Değişkenleri:** Canlı sunucu panelinde `RESEND_API_KEY`, `NEXT_PUBLIC_GA_ID` ve `NEXT_PUBLIC_CLARITY_ID` değerlerinin girildiğini doğrulayın.
2. **Kriter Denetimi:** Yerelde `npm run audit` komutunu çalıştırarak tüm SEO, OpenGraph ve görsel optimizasyon denetimlerinin başarıyla geçtiğinden emin olun.
3. **Resim Boyutları:** `node scripts/optimize-images.mjs` komutunu çalıştırarak tüm responsive görsellerin üretildiğini ve 200 KB alt sınırını koruduğunu teyit edin.
4. **Kod Derleme ve Tip Kontrolü:** `npx tsc --noEmit` ve `npm run build` komutlarının hatasız bittiğini görün.
5. **SEO Rapor Üretimi:** `npm run build` sonrasında `node scripts/generate-seo-report.mjs` komutunu çalıştırarak güncel `SEO-DURUM.md` dosyasını oluşturun ve commit edin.
