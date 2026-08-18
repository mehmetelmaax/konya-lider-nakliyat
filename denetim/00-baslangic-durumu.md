# Başlangıç Durumu Denetim ve Envanter Raporu (Faz 0)

Bu rapor, projenin kaynak kodlarında herhangi bir değişiklik yapılmadan önceki mevcut durumunu belgelemek amacıyla hazırlanmıştır.

---

## 1. Rota Tablosu (Next.js Build Çıktısı)

Aşağıdaki liste, `npm run build` komutunun başarıyla derlenmesi sonucu üretilen route yapısını göstermektedir:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/teklif
├ ○ /apple-icon.png
├ ○ /blog
├   /blog/[id]
│ ├ ● /blog/konya-nakliyat-fiyatlari
│ ├ ● /blog/esya-paketleme-rehberi
│ ├ ● /blog/asansorlu-tasima-avantajlari
│ └ ● [+12 more paths]
├ ○ /bolgeler/aksehir-evden-eve-nakliyat
├ ○ /bolgeler/beysehir-evden-eve-nakliyat
├ ○ /bolgeler/cihanbeyli-evden-eve-nakliyat
├ ○ /bolgeler/cumra-evden-eve-nakliyat
├ ○ /bolgeler/eregli-evden-eve-nakliyat
├ ○ /bolgeler/ilgin-evden-eve-nakliyat
├ ○ /bolgeler/kadinhani-evden-eve-nakliyat
├ ○ /bolgeler/karapinar-evden-eve-nakliyat
├ ○ /bolgeler/karatay-evden-eve-nakliyat
├ ○ /bolgeler/kulu-evden-eve-nakliyat
├ ○ /bolgeler/meram-evden-eve-nakliyat
├ ○ /bolgeler/sarayonu-evden-eve-nakliyat
├ ○ /bolgeler/selcuklu-evden-eve-nakliyat
├ ○ /bolgeler/seydisehir-evden-eve-nakliyat
├ ○ /galeri
├ ○ /hakkimizda
├ ○ /hizmetler/asansorlu-evden-eve-nakliyat
├ ○ /hizmetler/esya-depolama
├ ○ /hizmetler/ofis-ve-isyeri-tasimaciligi
├ ○ /hizmetler/parca-esya-tasima
├ ○ /hizmetler/piyano-ve-kasa-tasima
├ ○ /hizmetler/profesyonel-esya-paketleme
├ ○ /hizmetler/sehirici-evden-eve-nakliyat
├ ○ /hizmetler/sehirlerarasi-evden-eve-nakliyat
├ ○ /hizmetler/ucretsiz-ekspertiz
├ ○ /icon.png
├ ○ /iletisim
├ ○ /konya-nakliyat-firmalari
├ ○ /konya-nakliyat-fiyatlari
├ ƒ /llms-full.txt
├ ƒ /llms.txt
├ ƒ /manifest.webmanifest
├ ƒ /opengraph-image
├ ○ /robots.txt
├   /rotalar/[slug]
│ ├ ● /rotalar/konya-istanbul-evden-eve-nakliyat
│ ├ ● /rotalar/konya-ankara-evden-eve-nakliyat
│ ├ ● /rotalar/konya-izmir-evden-eve-nakliyat
│ └ ● [+5 more paths]
├ ○ /sitemap.xml
├ ○ /tasinma-kontrol-listesi
├ ○ /teklif-al
├ ƒ /twitter-image
├ ○ /yasal/gizlilik
└ ○ /yasal/kvkk
```

---

## 2. Şema Yapısı (JSON-LD) ve Çift Breadcrumb Analizi

Tüm sayfalarda `<JsonLd>` etiketleri taranmış ve aşağıdaki bulgular elde edilmiştir:

- **Çift Breadcrumb Sorunu**: Projede bulunan `Breadcrumb` görsel bileşeni kendi içerisinde `breadcrumbSchema` çağırarak `<JsonLd>` etiketi basmaktadır. Bunun yanı sıra, her sayfa (örneğin bölge ve hizmet sayfaları) kendi `@graph` şeması içinde ayrı bir `breadcrumbSchema` nesnesi barındırmaktadır. Bu durum her sayfada **2 adet bağımsız ve çelişkili BreadcrumbList** oluşmasına yol açmaktadır.
- **Şema Dağılımı**:
  - **Ana Sayfa (`/`)**: 1 adet JsonLd (Organization, WebSite, FAQPage)
  - **İletişim (`/iletisim`)**: 1 adet JsonLd (LocalBusiness)
  - **Teklif Al (`/teklif-al`)**: 1 adet JsonLd (FAQPage)
  - **Diğer Tüm Sayfalar (Bölgeler, Hizmetler, Rotalar, Blog vb.)**: 2 adet BreadcrumbList şeması (biri görsel bileşenden, diğeri `@graph` nesnesinden).

---

## 3. Kırık / Var Olmayan Rota Bağlantıları

`src/app/` altındaki tüm dosyalar taranmış ve site genelinde var olmayan rotalara yönlenen bağlantılar tespit edilmiştir:

1. **`src/app/hizmetler/sehirlerarasi-evden-eve-nakliyat/page.tsx`**:
   - Yönlenen Href: `/rotalar/konya-mersin-evden-eve-nakliyat` (Böyle bir şehirlerarası rota `site-config.ts` içinde tanımlı değildir.)
   - Yönlenen Href: `/rotalar/konya-gaziantep-evden-eve-nakliyat` (Böyle bir şehirlerarası rota `site-config.ts` içinde tanımlı değildir.)
2. **`src/app/layout.tsx`**:
   - Yönlenen Href'ler: `/favicon.ico`, `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png` (Bu dosyalar Next.js metadata API'si ile dinamik olarak yönetilmeli veya statik olarak `public/` altına eklenmelidir).

---

## 4. Veri Tutarsızlıkları ve Çelişkiler

Projedeki farklı dosyalarda yer alan iş ve işletme verileri analiz edilmiş ve şu çelişkiler listelenmiştir:

| Veri Kalemi | site-config.ts (SITE) | facts.ts (FACTS) | schema.ts | page.tsx / hakkimizda / Diğer |
| :--- | :--- | :--- | :--- | :--- |
| **Kuruluş Yılı** | `2012` | `2006` | `2006 yılından bu yana` | `"2006 yılında Tedik ailesi... 20 yıllık"` |
| **Fiyat Aralığı** | `'₺₺'` | `Min: 12000, Max: 28000` | `'$$'` | - |
| **İlçe Sayısı** | `14` (İlçe listesinde 14 ilçe var) | `districtCount: 15` | - | `"16 ilçenin tamamında"` (`page.tsx:204`) |
| **Kat Limiti** | - | `maxFloor: 15` | - | `"25. kata kadar ulaşan"` (`HeroSlider.tsx`) |

*Analiz Notu*: 
- Kuruluş yılı olarak 2006 yılı baz alınacaksa `SITE.foundingYear` güncellenmeli veya tüm kaynaklar `FACTS.foundedYear` değerine bağlanmalıdır.
- Kat limitinde slider görselinde "25. kat" denirken `facts.ts` içinde "15. kat" olarak sınır çizilmiştir.
- İlçe listesinde 14 adet ilçe yer alırken, ana sayfa metinlerinde "16 ilçe" ve `facts.ts` üzerinde "15" yazmaktadır.

---

*Rapor Oluşturma Zamanı: 18 Ağustos 2026*
