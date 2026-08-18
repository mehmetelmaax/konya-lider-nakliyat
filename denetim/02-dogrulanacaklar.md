# Konya Lider Nakliyat — Doğrulanacak Bilgiler Listesi

Aşağıdaki veriler, sitenin kurumsal kimliğini tam yansıtması, E-E-A-T (Deneyim, Uzmanlık, Yetkinlik, Güvenilirlik) kurallarına uyması ve canlı API entegrasyonlarının çalışması için **firma sahibi/yöneticisi tarafından doğrulanmalı veya temin edilmelidir.**

Emin olunmayan hiçbir uydurma veri kullanılmamış, eksik alanlar kodda `// DOĞRULANACAK` notuyla işaretlenmiş ve güvenli varsayılanlarla kapatılmıştır.

---

## 1. Kurumsal Kimlik ve E-E-A-T Bilgileri

### 1.1 Kuruluş Yılı
- **Mevcut Kod Durumu:** `FACTS.foundedYear = 2006` olarak ayarlanmış ve yaş hesaplamaları buna bağlanmıştır.
- **Doğrulanacak Soru:** Firmanın resmi kuruluş yılı (Ticaret Sicil Gazetesi veya vergi levhası tescil tarihi) **2006** mıdır yoksa **2012** midir? 
- **Neden Önemli:** Yanlış tarih bildirimleri arama motorlarının marka doğruluğu kontrollerinde güvenilirlik puanını düşürebilir.

### 1.2 K3 Yetki Belgesi Numarası
- **Mevcut Kod Durumu:** `site-config.ts` içinde `k3DocumentNumber: ''` olarak boş bırakılmıştır.
- **Doğrulanacak Bilgi:** Firmanın adına düzenlenmiş olan **K3 Yetki Belgesi Numarası** nedir? (Örn: *KNY.U-NET.K3.XXXXXX*)
- **Neden Önemli:** Yetki belgesi numarası girildiğinde, `hasCredential` yapısal verisiyle Google botlarına lisanslı bir taşıma firması olduğu resmi olarak şematize edilecektir.

### 1.3 Kadrolu Çalışan Sayısı
- **Mevcut Kod Durumu:** `site-config.ts` içinde `numberOfEmployees: undefined` olarak boş bırakılmıştır.
- **Doğrulanacak Bilgi:** Firmada sigortalı çalışan ortalama kadrolu personel sayısı kaçtır?
- **Neden Önemli:** `numberOfEmployees` şeması, markanın kurumsal ölçeğini yansıtır.

### 1.4 Fiziki Ofis Adresi Tutarlılığı
- **Mevcut Kod Durumu:** `site-config.ts` içinde `Nişantaş Mahallesi, Doktor Mehmet Hulusi Baybal Caddesi, No:31/F D:1` olarak ayarlanmıştır.
- **Doğrulanacak Bilgi:** Firmanın tescilli vergi ve resmi ofis adresi bu mudur, yoksa `Fatih Mahallesi 73258 Sk. No:9/1 Selçuklu` adresi midir?
- **Neden Önemli:** NAP (İsim-Adres-Telefon) tutarlılığı, Google Local Pack (Harita 3'lü paket) sıralamalarında en kritik 1. derece sinyaldir.

### 1.5 KVKK Veri Saklama ve Sorumlusu
- **Mevcut Kod Durumu:** `/yasal/kvkk` aydınlatma metninde veri saklama süresi kanuni limit olan 10 yıl, veri sorumlusu bilgileri ise mevcut adres ve unvan olarak listelenmiştir.
- **Doğrulanacak Bilgi:** Hukuk müşaviriniz veya mali müşaviriniz tarafından eklenen 10 yıllık genel zamanaşımı süresi ve veri sorumlusu bilgileri KVKK politikalarınızla uyumlu mudur?

---

## 2. API Entegrasyonları ve Linkler

### 2.1 Google Business Profile (GBP) Detayları
- **Mevcut Kod Durumu:** `GoogleReviews.tsx` iskeleti hazır durumdadır ancak API anahtarları tanımlı değildir.
- **Doğrulanacak Bilgiler:**
  1. Google Haritalar'daki işletmenizin **Place ID** değeri nedir?
  2. Google Places API bağlantısı için **Google Cloud API Key** temin edilmeli ve sunucu çevresine eklenmelidir.
  3. İşletme profilinizin tam adresi (URL).
- **Neden Önemli:** Bu bilgiler girildiğinde çekeceğimiz gerçek yorumlar, Google arama sonuçlarında yıldızlı derecelendirme (AggregateRating) çıkmasını sağlayacaktır.

### 2.2 Sosyal Medya Sayfa Adresleri
- **Mevcut Kod Durumu:** `site-config.ts` altındaki sosyal medya linkleri boş bırakılmıştır.
- **Doğrulanacak Bilgiler:**
  - Facebook Sayfa Linki: ?
  - Instagram Profil Linki: ?
  - YouTube Kanal Linki: ?
- **Neden Önemli:** Sosyal medya hesapları `sameAs` şeması ile markayla ilişkilendirilerek Google Bilgi Paneli'nde (Knowledge Graph) çıkmasını sağlar.

