# Konya Lider Nakliyat — İçerik Borcu ve Doorway Sayfa Raporu

Google'ın **Helpful Content (Faydalı İçerik)** güncellemesi ve **Doorway Pages (Giriş Sayfaları)** yönergeleri, birbirinin kopyası olan ve yalnızca ilçe adı değiştirilerek üretilen statik sayfaları doğrudan cezalandırmaktadır. 

Bu durum, sitenin arama sonuçlarında gerilemesine neden olan en büyük yapısal SEO riskiydi.

---

## 1. Çözülen Yapısal Kırık: Dinamik Bölge Altyapısı
- **Eski Yapı:** 14 ilçenin tamamı (`src/app/bolgeler/*/page.tsx`) aynı şablonu ve aynı metinleri kullanıyordu.
- **Yeni Yapı:** Statik dosyalar tamamen kaldırıldı ve `/bolgeler/[slug]` dinamik rotasına geçirildi. Artık tüm veriler `src/lib/districts-content.ts` veri tabanından okunmaktadır.

---

## 2. İçerik Borcu Durumu ve noindex Kontrol Listesi

Helpful Content kriterlerini karşılayana kadar, içerik kalitesi düşük/kopya olan ilçe sayfaları Google dizininden gizlenmiş (`noindex`) veya geçici kalıplarla sınırlandırılmıştır.

Firma sahibi `icerik/ILCE-ICERIK-SABLONU.md` dosyasındaki yönergelere göre özgün içerikleri tamamladığında, `src/lib/site-config.ts` dosyasındaki ilgili ilçenin `indexable` bayrağını `true` yaparak yayına almalıdır.

### 2.1 İndeksleme ve İçerik Durum Matrisi

| İlçe Adı (Slug) | İndeks Durumu | İçerik Kalitesi (Karakter/Kelime) | Durum & Yapılacak İş |
| :--- | :--- | :--- | :--- |
| **Selçuklu** | İndeksleniyor | Zengin (Özgünleştirilmiş) | Merkez ilçe. İçerik yeterli. |
| **Meram** | İndeksleniyor | Zengin (Özgünleştirilmiş) | Merkez ilçe. İçerik yeterli. |
| **Karatay** | İndeksleniyor | Zengin (Özgünleştirilmiş) | Merkez ilçe. İçerik yeterli. |
| **Ereğli** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Akşehir** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Seydişehir** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Ilgın** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Beyşehir** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Çumra** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Kadınhanı** | İndeksleniyor | Standart (Geçici) | Özgün yerel referanslar eklenmeli. |
| **Sarayönü** | **DİZİNE KAPALI (noindex)** | Taslak / Boş | `indexable: false`. İçerik girilmeyi bekliyor. |
| **Kulu** | **DİZİNE KAPALI (noindex)** | Taslak / Boş | `indexable: false`. İçerik girilmeyi bekliyor. |
| **Cihanbeyli** | **DİZİNE KAPALI (noindex)** | Taslak / Boş | `indexable: false`. İçerik girilmeyi bekliyor. |
| **Karapınar** | **DİZİne KAPALI (noindex)** | Taslak / Boş | `indexable: false`. İçerik girilmeyi bekliyor. |

---

## 3. Hizmet Sayfaları Benzersizlik Kontrolü
Hizmet sayfaları (`src/app/hizmetler/*/page.tsx`) incelenmiş olup, kopya doorway riski taşımadıkları ve her birinin hizmete özgü en az bir benzersiz bileşen barındırdığı doğrulanmıştır:
1. **Asansörlü Nakliyat:** Kat bazlı asansör katsayı matrisi ve teknik şartname.
2. **Eşya Depolama:** Depolama hacim hesaplama matrisi ve kiralama sözleşmesi kontrol listesi.
3. **Ofis Taşımacılığı:** Kurumsal taşınma proje planı tablosu.
4. **Parça Eşya Taşıma:** Hacim/fiyat oran tablosu.
5. **Piyano ve Kasa Taşıma:** Ağırlık/teknik ekipman listesi ve özel taşıma askı rehberi.
6. **Profesyonel Eşya Paketleme:** Ambalaj malzemesi kaliteleri tablosu.
7. **Şehiriçi Nakliyat:** Şehiriçi mesafe fiyatlandırma tarifesi.
8. **Şehirlerarası Nakliyat:** 81 il transit taşıma süreleri tablosu.
9. **Ücretsiz Ekspertiz:** Ekspertiz rapor örneği ve kontrol maddeleri listesi.
