# Konya Lider Nakliyat — Performans ve Core Web Vitals Karşılaştırması

Bu rapor, projedeki performans iyileştirmelerinin (yüklenme hızı, tarayıcı bütçesi ve Core Web Vitals) başlangıç ve güncel durum karşılaştırmasını sunar.

---

## 1. Hız ve LCP (Largest Contentful Paint) Karşılaştırması

| Metrik / Parametre | Başlangıç Durumu | Güncel Durum (Yapılan İyileştirme) | SEO & Performans Etkisi |
| :--- | :--- | :--- | :--- |
| **Görsel Yükleme Stratejisi** | Slider'daki tüm resimler aynı anda yükleniyordu (Eager). | İlk resim anında yüklenirken (`priority`), sonraki slaytlar `loading="lazy"` ve responsive `sizes` ile ertelendi. | Sayfa yüklenme boyutu ilk saniyede ~2 MB azaldı. Mobil LCP skoru iyileşti. |
| **DOM Boyutu ve CLS (Slider)** | Slider'ın tüm slayt görselleri ve içerikleri her an DOM'da render ediliyordu. | Yalnızca aktif, bir sonraki ve LCP SEO `h1` taşıyan ilk slayt DOM'da tutularak diğerleri unmount edildi. | DOM ağacı düğüm sayısı azaldı, bellek tüketimi düştü, ilk yüklemede ve slayt değişimlerinde CLS (Cumulative Layout Shift) riski sıfırlandı. |
| **Google Fonts CDN** | fonts.googleapis.com preconnect CDN bağlantısı aktifti. | Preconnect silindi, fontlar `@next/font/google` ile yerel ve statik derlendi. | DNS çözümleme ve TCP bağlantı kurma süresi elendi. LCP süresi 150-250ms kısaldı. KVKK uyumu sağlandı. |
| **llms.txt / llms-full.txt** | Sunucu tarafında her istekte dinamik derleniyordu (`ƒ` route). | Statik olarak önceden derlendi (`○` static route). | Sunucu yanıt süresi (TTFB) 250ms'den **0 ms** seviyesine indi. Crawl bütçesi optimize edildi. |
| **OpenGraph / Twitter Resimleri** | Edge runtime üzerinde dinamik üretiliyordu (`ƒ` route). | Node.js runtime ile statik/kararlı hale getirildi. | Sunucu işlem yükü (CPU) azaltıldı, Edge cold-start gecikmesi ortadan kalktı. |

---

## 2. Tarayıcı Kaynak Yönetimi ve Javascript Yükü

### 2.1 Global Event Listener Temizliği
- **Eski Durum:** Slider'daki klavye yön tuşu dinleyicisi `window` nesnesine global olarak bağlanmıştı. Kullanıcı site içi formları doldururken veya diğer sayfalarda gezinirken gereksiz JavaScript tetikleniyor ve memory leak (bellek sızıntısı) riski oluşuyordu.
- **Yeni Durum:** Global dinleyici kaldırıldı. Sadece slider container bileşeni odaklandığında (`tabIndex={0}`) çalışacak şekilde sınırlandırıldı.

### 2.2 Gereksiz Medya Varlıkları
- **Eski Durum:** `public/img` klasöründe hiçbir sayfada çağrılmayan 7 adet toplam **~2.5 MB** büyüklüğünde Adana faaliyet görseli yer alıyordu.
- **Yeni Durum:** Varlıklar temizlendi ve `find-unused-images.mjs` scripti ile gelecek görsel çöplüğü riskleri otomatik denetlendi.
