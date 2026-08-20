# Konya Lider Nakliyat — Doğrulanacak Bilgiler Formu

Aşağıdaki bilgiler, sitenizin kurumsal kimliğini tam yansıtması, Google Arama Motoru Optimizasyonu (SEO), Güvenilirlik/E-E-A-T sinyalleri ve canlı API entegrasyonlarının çalışması için **firma sahibi tarafından doldurulmalı veya tescil belgesinden teyit edilmelidir.**

Lütfen her alan için cevabınızı belirterek bu dosyayı güncelleyin veya geliştiriciye iletin.

---

## 1. K3 Yetki Belge Numarası
- **Soru:** Firmanıza ait resmi K3 Karayolu Taşımacılık Yetki Belgesi Numarası nedir? (Örn: *KNY.U-NET.K3.12345*)
- **Neden Gerekli:** Yasal evden eve nakliyat hizmeti verdiğinizi arama motorlarına ve müşterilere kanıtlamak için.
- **Hangi Şema Alanını Besliyor:** `MovingCompany` şeması içindeki `hasCredential` (Lisans/Sertifika) alanını besler.
- **Doldurulmazsa Ne Kaybediliyor:** Sitenin yasal bir nakliye firmasına ait olduğu şematik olarak doğrulanamaz; korsan firmalardan ayırt edilmeniz zorlaşır.
- **Cevabınız:** [Buraya Yazınız]

---

## 2. Kadrolu Çalışan Sayısı
- **Soru:** Firmanızda sigortalı olarak çalışan ortalama kadrolu personel sayısı kaçtır?
- **Neden Gerekli:** Şirketin operasyonel hacmini ve kurumsal ciddiyetini arama motorlarına bildirmek için.
- **Hangi Şema Alanını Besliyor:** `MovingCompany` şeması içindeki `numberOfEmployees` alanını besler.
- **Doldurulmazsa Ne Kaybediliyor:** Google botları firmanın ölçeğini (butik mi, büyük ölçekli mi) tam analiz edemez, kurumsallık puanı eksik kalır.
- **Cevabınız:** [Buraya Yazınız]

---

## 3. Resmi Ofis Adresi
- **Soru:** Resmi tescilli ofis adresiniz hangisidir? 
  * Seçenek A: *Nişantaş Mahallesi, Doktor Mehmet Hulusi Baybal Caddesi, No:31/F D:1 Selçuklu/Konya*
  * Seçenek B: *Fatih Mahallesi 73258 Sk. No:9/1 Selçuklu/Konya*
- **Neden Gerekli:** NAP (İsim-Adres-Telefon) tutarlılığı sağlamak için. Haritadaki adres ile sitedeki adres birebir eşleşmelidir.
- **Hangi Şema Alanını Besliyor:** `PostalAddress` ve `LocalBusiness` konum şemasını besler.
- **Doldurulmazsa Ne Kaybediliyor:** Google Haritalar (Local Pack - ilk 3 harita sonucu) sıralamanızda ciddi güven kaybı ve görünürlük kaybı yaşanır.
- **Cevabınız:** [Buraya Yazınız]

---

## 4. Mesai ve Açılış/Kapanış Saatleri
- **Soru:** Ofisinizin ve telefon desteğinizin aktif olduğu saatler nedir? (Mevcut: *08:00 – 22:00*)
- **Neden Gerekli:** Kullanıcıların size hangi saatlerde ulaşabileceğini Google arama sonuçlarında (Açık/Kapalı ibaresi) doğru göstermek için.
- **Hangi Şema Alanını Besliyor:** `OpeningHoursSpecification` şemasını besler.
- **Doldurulmazsa Ne Kaybediliyor:** Yanlış saatler nedeniyle arama sonuçlarından gelen müşteriler kapalı saate denk gelerek siteden hemen çıkabilir.
- **Cevabınız:** [Buraya Yazınız]

---

## 5. WhatsApp İletişim Saatleri
- **Soru:** WhatsApp hattınız üzerinden gerçekten 7/24 kesintisiz destek veriliyor mu yoksa o da mesai saatlerine mi bağlı? (Mevcut: *7/24*)
- **Neden Gerekli:** Gece geç saatlerde taşınma teklifi almak isteyen müşterilerin beklentisini doğru yönetmek için.
- **Hangi Şema Alanını Besliyor:** İletişim eylem butonları ve şema detaylarını besler.
- **Doldurulmazsa Ne Kaybediliyor:** Kullanıcı 7/24 yazıp cevap alamazsa müşteri memnuniyetsizliği oluşur.
- **Cevabınız:** [Buraya Yazınız]

---

## 6. Sosyal Medya Sayfa Adresleri
- **Soru:** Firmanıza ait resmi sosyal medya (Facebook, Instagram, YouTube) linkleriniz nelerdir?
- **Neden Gerekli:** Google'ın sosyal medya profilleriniz ile web sitenizi birbirine bağlaması ve marka bilinirliğini doğrulaması için.
- **Hangi Şema Alanını Besliyor:** `sameAs` (Aynı Kişi/Kuruluş) şema etiketlerini besler.
- **Doldurulmazsa Ne Kaybediliyor:** Google Bilgi Paneli'nde (sağ taraftaki marka kartı) sosyal medya hesaplarınız listelenmez, marka otoriteniz zayıf kalır.
- **Cevabınız:** [Buraya Yazınız]

---

## 7. Google Business Profile (GBP) Detayları
- **Soru:** Google Haritalar'daki resmi işletme profilinizin linki ve Place ID'si nedir? (Mevcut: * share.google/YoiHqgk0tx65LVd0H*)
- **Neden Gerekli:** Gerçek Google yorumlarınızı siteye entegre etmek ve doğrudan yorum yazma linkleri oluşturmak için.
- **Hangi Şema Alanını Besliyor:** `hasMap` ve `aggregateRating` (Google yorum puanı şeması) yapılarını besler.
- **Doldurulmazsa Ne Kaybediliyor:** Gerçek Google yorum yıldızlarınız arama motoru sonuç sayfalarında (SERP) sitenizin altında yıldız olarak çıkmaz (Tıklama oranını %30 artıran zengin sonuçlar kaybedilir).
- **Cevabınız:** [Buraya Yazınız]

---

## 8. Kuruluş Yılı Doğrulaması
- **Soru:** Firmanın tescil edildiği veya faaliyete başladığı resmi yıl nedir? (Mevcut: *2006*)
- **Neden Gerekli:** E-E-A-T (Tecrübe ve Uzmanlık) kriterlerinde kaç yıllık bir firma olduğunuzu kanıtlamak için.
- **Hangi Şema Alanını Besliyor:** Hakkımızda metinleri ve `LocalBusiness` kuruluş yılı verilerini besler.
- **Doldurulmazsa Ne Kaybediliyor:** Arama motorları resmi kayıtlar ile sitedeki tecrübe beyanını eşleştiremezse sitenin güvenilirlik puanını düşürür.
- **Cevabınız:** [Buraya Yazınız]
