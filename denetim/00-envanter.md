# Faz 0 — Detaylı Envanter ve Audit Raporu

Rapor Oluşturma Tarihi: 2026-08-18

---

## 1. Şema Analizi (JSON-LD)
Prerender edilen HTML sayfalarından çıkarılan JSON-LD analiz sonuçları:

- **Toplam HTML Sayfası:** 62
- **@type Dağılımı:**
  - `BlogPosting`: 15 adet
  - `FAQPage`: 51 adet
  - `BreadcrumbList`: 54 adet
  - `Service`: 35 adet
  - `ItemList`: 2 adet
  - `ContactPage`: 1 adet
  - `MovingCompany`: 1 adet
  - `WebSite`: 1 adet
  - `Offer`: 1 adet

### 1.1 Çift BreadcrumbList Tespit Edilen Sayfalar
Sayfa başına render edilen `BreadcrumbList` şeması sayıları:
  - `blog/asansorlu-nakliyat-mi-merdivenle-mi.html`: 1 adet 
  - `blog/asansorlu-tasima-avantajlari.html`: 1 adet 
  - `blog/beyaz-esya-tasima-rehberi.html`: 1 adet 
  - `blog/esya-paketleme-rehberi.html`: 1 adet 
  - `blog/k3-yetki-belgesi-nedir.html`: 1 adet 
  - `blog/kapora-tuzagi-ucuz-nakliyat.html`: 1 adet 
  - `blog/konya-nakliyat-fiyatlari.html`: 1 adet 
  - `blog/konya-semt-rehberi.html`: 1 adet 
  - `blog/konya-tasinma-maliyeti-2026.html`: 1 adet 
  - `blog/konyada-tasinmak-icin-en-uygun-zaman.html`: 1 adet 
  - `blog/nakliyat-sigortasi-nedir.html`: 1 adet 
  - `blog/ofis-tasima-plani.html`: 1 adet 
  - `blog/sehirlerarasi-tasimada-esya-hasari.html`: 1 adet 
  - `blog/tasinirken-yapilan-yasal-hatalar.html`: 1 adet 
  - `blog/tasinmadan-30-gun-once-hazirlik.html`: 1 adet 
  - `bolgeler/aksehir-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/beysehir-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/cihanbeyli-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/cumra-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/eregli-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/ilgin-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/kadinhani-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/karapinar-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/karatay-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/kulu-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/meram-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/sarayonu-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/selcuklu-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler/seydisehir-evden-eve-nakliyat.html`: 1 adet 
  - `bolgeler.html`: 1 adet 
  - `galeri.html`: 1 adet 
  - `hakkimizda.html`: 1 adet 
  - `hizmetler/asansorlu-evden-eve-nakliyat.html`: 1 adet 
  - `hizmetler/esya-depolama.html`: 1 adet 
  - `hizmetler/ofis-ve-isyeri-tasimaciligi.html`: 1 adet 
  - `hizmetler/parca-esya-tasima.html`: 1 adet 
  - `hizmetler/piyano-ve-kasa-tasima.html`: 1 adet 
  - `hizmetler/profesyonel-esya-paketleme.html`: 1 adet 
  - `hizmetler/sehirici-evden-eve-nakliyat.html`: 1 adet 
  - `hizmetler/sehirlerarasi-evden-eve-nakliyat.html`: 1 adet 
  - `hizmetler/ucretsiz-ekspertiz.html`: 1 adet 
  - `hizmetler.html`: 1 adet 
  - `konya-nakliyat-firmalari.html`: 1 adet 
  - `konya-nakliyat-fiyatlari.html`: 1 adet 
  - `rotalar/konya-ankara-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-antalya-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-bursa-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-eskisehir-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-istanbul-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-izmir-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-kayseri-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar/konya-konya-evden-eve-nakliyat.html`: 1 adet 
  - `rotalar.html`: 1 adet 
  - `tasinma-kontrol-listesi.html`: 1 adet 

### 1.2 MovingCompany / Organization / LocalBusiness Varlığı
- **MovingCompany tanımlı sayfalar:**
  - `index.html`
- **Organization tanımlı sayfalar:**

- **LocalBusiness tanımlı sayfalar:**


---

## 2. Kırık / Olmayan İç Linkler
Kod tabanında yer alan ancak sitemap veya rotalarda tanımlı olmayan bağlantılar:
  - `src/app/hizmetler/sehirlerarasi-evden-eve-nakliyat/page.tsx` içinde kırık adres: `/rotalar/konya-mersin-evden-eve-nakliyat`
  - `src/app/hizmetler/sehirlerarasi-evden-eve-nakliyat/page.tsx` içinde kırık adres: `/rotalar/konya-gaziantep-evden-eve-nakliyat`
  - `src/app/layout.tsx` içinde kırık adres: `/favicon.ico`
  - `src/app/layout.tsx` içinde kırık adres: `/favicon-32x32.png`
  - `src/app/layout.tsx` içinde kırık adres: `/favicon-16x16.png`
  - `src/app/layout.tsx` içinde kırık adres: `/apple-touch-icon.png`

---

## 3. Kod Tabanı İş Verisi Çelişkileri (NAP & Çakışmalar)

### 3.1 Adres Çakışmaları (site-config.ts dışında hardcoded adresler)
  - `src/app/iletisim/page.tsx` Satır 53: `<p>Fatih Mahallesi, 73258 Sokak, No:9/1, Selçuklu / Konya</p>`
  - `src/components/FloatingCTAs.tsx` Satır 42: `<p className="text-[10px] text-gray-300 leading-relaxed">Fatih Mh. Selçuklu/Konya adresimize Google Haritalar ile ulaşın.</p>`

### 3.2 Çalışma Saati Çakışmaları
  - `src/app/iletisim/page.tsx` Satır 81: `<p>Hafta İçi ve Hafta Sonu: 07:00 – 22:00</p>`
  - `src/components/FloatingCTAs.tsx` Satır 73: `<span className="text-[10px] font-bold text-emerald-600 tracking-wider block">7/24 AKTİF HAT</span>`
  - `src/components/Footer.tsx` Satır 169: `<span>07:00 – 22:00 (Her Gün)</span>`

### 3.3 Telefon Numarası Çakışmaları
  - `src/app/iletisim/page.tsx` Satır 62: `0554 640 02 05`
  - `src/app/opengraph-image.tsx` Satır 109: `<span style={{ color: '#0D3E30' }}>0554 640 02 05</span>`
  - `src/app/twitter-image.tsx` Satır 109: `<span style={{ color: '#0D3E30' }}>0554 640 02 05</span>`

### 3.4 Renk Çakışmaları (Eski vs Yeni Marka Paleti Sızıntıları)
  - `src/app/api/teklif/route.ts` Satır 231: `<h2 style="color: #102a43; border-bottom: 2px solid #f7931e; padding-bottom: 10px;">Yeni Teklif Talebi Alındı</h2>`
  - `src/app/api/teklif/route.ts` Satır 231: `<h2 style="color: #102a43; border-bottom: 2px solid #f7931e; padding-bottom: 10px;">Yeni Teklif Talebi Alındı</h2>`
  - `src/app/global-error.tsx` Satır 23: `color: '#102A43',`
  - `src/app/global-error.tsx` Satır 61: `backgroundColor: '#F7931E',`
  - `src/app/layout.tsx` Satır 82: `themeColor: '#102A43',`
  - `src/app/manifest.ts` Satır 12: `theme_color: '#102A43',`
  - `src/app/opengraph-image.tsx` Satır 18: `background: '#0D3E30',`
  - `src/app/opengraph-image.tsx` Satır 38: `backgroundColor: '#D4AF37',`
  - `src/app/twitter-image.tsx` Satır 18: `background: '#0D3E30',`
  - `src/app/twitter-image.tsx` Satır 38: `backgroundColor: '#D4AF37',`

---

## 4. DOM ID Çakışması Analizi (Çift Render Edilen Bileşenler)
Bir sayfada birden fazla kez çağrılarak DOM id çakışmasına sebep olan bileşenler:
DOM ID çakışması yapabilecek çoklu render bulunamadı.
