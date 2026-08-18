# Yayım Sonrası SEO ve Arama Motoru İşlemleri Kılavuzu (DEPLOY-SONRASI.md)

Bu kılavuz, web sitesinin başarıyla canlı sunucuya (Vercel) aktarılmasından hemen sonra yapılması gereken **resmi arama motoru tescil, dizin (index) ekleme ve 4 haftalık periyodik kontrol** adımlarını içermektedir.

---

## 1. Google Search Console Kurulumu ve Sitemap Gönderimi

Canlıya alım bittikten sonra sitenin Google botları tarafından hızlıca keşfedilmesi için şu adımları uygulayın:

1. **Google Search Console (GSC)** paneline giriş yapın ([search.google.com](https://search.google.com)).
2. Yeni bir mülk ekleyin ve yöntem olarak **"Alan Adı" (Domain)** doğrulamayı seçin.
3. DNS sağlayıcınıza (örn. Cloudflare, GoDaddy) GSC panelinin verdiği TXT kaydını ekleyerek mülkü doğrulayın. (Alternatif olarak **"URL Öneki"** seçeneğiyle `.env.local` dosyasına eklediğiniz `NEXT_PUBLIC_GSC_VERIFICATION` meta tag doğrulamasını da kullanabilirsiniz).
4. Sol menüden **"Site Haritaları" (Sitemaps)** sayfasına gidin.
5. **"Yeni bir site haritası ekleyin"** kısmına `sitemap.xml` yazın ve **"Gönder"** butonuna basın.
6. Gönderim sonrası durumun **"Başarılı"** olduğunu teyit edin. Haritada tam olarak **50 adet URL** listelenmelidir.

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
