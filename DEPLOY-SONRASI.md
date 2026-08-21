# Canlıya Çıkış Kontrol Listesi & Yayım Sonrası SEO Kılavuzu (DEPLOY-SONRASI.md)

Bu kılavuz, web sitesinin başarıyla canlıya alınmadan önceki son doğrulamalarını ve canlı sunucuya (Vercel) aktarılmasından hemen sonra yapılması gereken **resmi arama motoru tescil, dizin (index) ekleme ve 4 haftalık periyodik kontrol** adımlarını içermektedir.

---

## 🚀 Canlıya Çıkış Öncesi ve Sonrası Kontrol Listesi

### Deploy ÖNCESİ Son Kontroller:
- [ ] **`npm run verify` yeşil:** Yerel derleme, TypeScript ve Vitest testlerinin tamamı sıfır hata ile geçmelidir.
- [ ] **`npm run preflight` sıfır hata:** Ön uçuş denetim scriptindeki bloklayıcı hatalar (lead kanalı vb.) tamamen giderilmiş olmalıdır.
- [ ] **Tüm Env Değişkenleri Tanımlı:** Hosting panelinde (Vercel/Netlify) `RESEND_API_KEY`, `LEAD_WEBHOOK_URL` veya `KV_REST_API_URL` gibi lead kanalları, `GBP_API_KEY` (Google yorumları için) ve `NEXT_PUBLIC_GA_ID` tanımlanmış olmalıdır.
- [ ] **Test Teklifi Doğrulaması:** Canlıya çıkmadan önce test teklifi gönderilip e-posta/webhook veya veritabanına sorunsuz düştüğü doğrulanmalıdır.

### Deploy SONRASI İlk 24 Saat:
- [ ] **`/robots.txt` ve `/sitemap.xml` Kontrolü:** Tarayıcıda bu adresler açılmalı ve Next.js dinamik yönlendirmeleriyle doğru XML/metin çıktısı ürettiği doğrulanmalıdır.
- [ ] **Search Console Sitemap Gönderimi:** Google Search Console'a `sitemap.xml` başarıyla gönderilmeli ve durum teyit edilmelidir.
- [ ] **Rich Results Test Doğrulaması:** Ana sayfa ve en az bir hizmet sayfası Google Zengin Sonuç Testi ile taranıp yapısal verilerin hatasız olduğu onaylanmalıdır.
- [ ] **Google İşletme Profili Güncellemesi:** Google Business Profile üzerindeki web sitesi bağlantısı yeni URL ile güncellenmelidir.
- [ ] **301 Yönlendirme Testleri:** Eski site URL'lerinden (`/7.htm`, `/8.htm` vb.) gelen yönlendirmelerin yeni rotalara kayıpsız 301 döndürdüğü doğrulanmalıdır.
- [ ] **GA4 Canlı Trafik Testi:** Google Analytics 4 panelinde gerçek zamanlı (Real-Time) kullanıcı trafiği akışı teyit edilmelidir.
- [ ] **Mobil İletişim Butonları Testi:** Akıllı telefon üzerinden hem doğrudan telefon arama butonu hem de WhatsApp yönlendirme butonları tıklanarak doğrulanmalıdır.

---

## 1. Google Search Console Kurulumu ve Sitemap Gönderimi

Canlıya alım bittikten sonra sitenin Google botları tarafından hızlıca keşfedilmesi için şu adımları uygulayın:

1. **Google Search Console (GSC)** paneline giriş yapın ([search.google.com](https://search.google.com)).
2. Yeni bir mülk ekleyin ve yöntem olarak **"Alan Adı" (Domain)** doğrulamayı seçin.
3. DNS sağlayıcınıza (örn. Cloudflare, GoDaddy) GSC panelinin verdiği TXT kaydını ekleyerek mülkü doğrulayın. (Alternatif olarak **"URL Öneki"** seçeneğiyle `.env.local` dosyasına eklediğiniz `NEXT_PUBLIC_GSC_VERIFICATION` meta tag doğrulamasını da kullanabilirsiniz).
4. Sol menüden **"Site Haritaları" (Sitemaps)** sayfasına gidin.
5. **"Yeni bir site haritası ekleyin"** kısmına `sitemap.xml` yazın ve **"Gönder"** butonuna basın.
6. Gönderim sonrası durumun **"Başarılı"** olduğunu teyit edin. Haritada tam olarak **58 adet URL** listelenmelidir.

---

## 2. Yandex Webmaster ve Bing Webmaster Tools Kurulumu

Konya yerel nakliyat aramalarında Yandex ve Bing kullanıcılarını çekebilmek için:

1. **Yandex Webmaster** paneline girin ([webmaster.yandex.com](https://webmaster.yandex.com)).
2. Site adresini ekleyin ve doğrulamayı `.env.local` içindeki `NEXT_PUBLIC_YANDEX_VERIFICATION` anahtarıyla meta etiket üzerinden tamamlayın.
3. Yandex sitemap alanına `https://konyaliderevdeneve.com/sitemap.xml` adresini gönderin.
4. **Bing Webmaster Tools** paneline girin ([bing.com/webmasters](https://www.bing.com/webmasters)).
5. Google Search Console verilerinizi tek tıkla Bing paneline aktararak mülk doğrulamasını ve sitemap kayıtlarını otomatik senkronize edin.

---

## 3. İlk İndeks Talepleri (URL Denetimi)

Yeni açılan 12 adet yüksek arama hacimli blog sayfası ve fiyat hesaplama sayfasının Google'da hızlı indeks alabilmesi için Search Console üzerinden manuel istek gönderin:

1. GSC üst arama kutusuna (URL Denetimi) sırayla şu sayfaları girin:
   - `https://konyaliderevdeneve.com/`
   - `https://konyaliderevdeneve.com/konya-nakliyat-fiyatlari`
   - `https://konyaliderevdeneve.com/blog/konya-tasinma-maliyeti-2026`
   - `https://konyaliderevdeneve.com/blog/nakliyat-sigortasi-nedir`
2. **"Dizin Oluşturulmasını Talep Et"** butonuna basarak botların sayfaları acilen taramasını sağlayın.

---

## 4. Yapısal Veri (Schema.org) Doğrulaması

Sitedeki JSON-LD şemalarının Google arama sonuçlarında yıldızlı veya zengin sonuç (Rich Results) üretebilmesi için canlı URL'leri doğrulayın:

1. **Google Rich Results Test** aracını açın ([search.google.com/test/rich-results](https://search.google.com/test/rich-results)).
2. Aşağıdaki URL'leri test edin ve şemaların geçerliliğini onaylayın:
   - Ana sayfa için: **MovingCompany**, **WebSite**, **FAQPage**
   - Fiyat sayfası için: **Service**, **FAQPage**, **BreadcrumbList**
   - Blog detay sayfaları için: **BlogPosting**, **FAQPage**, **BreadcrumbList**

---

## 5. 4 Haftalık Periyodik SEO Kontrol Takvimi

Yayım sonrasında sıralamaları ve site sağlığını korumak adına haftalık kontroller planlayın:

### 1. Hafta Kontrolleri (İndeks Sağlığı)
- GSC panelinde "Sayfa Sayısı / Dizin Oluşturma" raporunu inceleyin. Sayfaların kaç tanesinin indekse girdiğini görün.
- `site:konyaliderevdeneve.com` araması yaparak Google indeks listesini manuel analiz edin.

### 2. Hafta Kontrolleri (Performans & CWV)
- Search Console **"Önemli Web Verileri" (Core Web Vitals)** raporunu kontrol edin. Mobil ve masaüstü CLS/LCP/INP değerlerinde "Kırmızı" (Zayıf) uyarı var mı bakın.
- Mobil Chrome kullanıcılarından toplanan gerçek alan verilerini CrUX üzerinden inceleyin.

### 3. Hafta Kontrolleri (Hatalar & Drift İzleme)
- `npm run audit` komutunu localde tekrar çalıştırarak canlıya giden yeni güncellemelerin link bütünlüğünü veya SEO şemalarını bozup bozmadığını teyit edin.
- GSC **"Tarama Hataları"** sayfasında 404 veren eski `.htm` veya `/251/` gibi yönlendirdiğimiz rotaların 301 yönlendirmelerinin çalıştığını canlı sunucu loglarından (Vercel Analytics) doğrulayın.

### 4. Hafta Kontrolleri (Topical Authority ve Sıralama Analizi)
- "Konya nakliyat fiyatları", "tasıma sigortası nedir" gibi yüksek dönüşümlü kelimelerdeki Google sıra pozisyonlarınızı takip aracınızla kontrol edin.
- Yeni eklediğimiz 12 blog yazısının organik impressions (gösterim) and click (tıklama) almaya başladığını GSC "Performans" raporundan teyit edin.
- Analytics panelinde hedeflenen telefon ve WhatsApp tıklama dönüşüm oranlarını analiz ederek A/B testleri kurgulayın.
