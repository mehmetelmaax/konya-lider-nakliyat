# Konya Lider Nakliyat — Sahte ve Doğrulanmamış Veri Denetim Raporu

Aşağıdaki liste, Google Spam Politikaları ("fake reviews" ve "misleading structured data") ile 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında risk oluşturan ve doğrulanmamış sahte/yapay verilerin yerlerini ve önerilen düzeltme aksiyonlarını içerir.

| Dosya ve Satır | Mevcut Değer | Risk Derecesi | Önerilen Aksiyon |
| :--- | :--- | :--- | :--- |
| [`src/app/api/reviews/route.ts:13-42`](file:///C:/Users/mehme/.gemini/antigravity/scratch/konya-lider-nakliyat/src/app/api/reviews/route.ts#L13-L42) | Ahmet Yılmaz, Elif Demir, Mehmet Kaya adına 5 yıldızlı uydurma yorumlar; rating: 4.9, user_ratings_total: 124 | 🔴 **Kritik** (Google zengin sonuç cezası, tüketiciyi aldatma idari para cezası) | API anahtarı girilmediğinde sahte veri döndürmek yerine boş dizi döndürülecek. Yalnızca GBP API'den gelen gerçek veriler sunulacak. |
| [`src/components/GoogleReviews.tsx:20-21`](file:///C:/Users/mehme/.gemini/antigravity/scratch/konya-lider-nakliyat/src/components/GoogleReviews.tsx#L20-L21) | `useState(4.9)` ve `useState(120)` başlangıç değerleri | 🟠 **Yüksek** (API bağlantısı kopsa veya boş dönse dahi sahte AggregateRating şeması basılması riski) | Başlangıç değerleri `null` veya `0` yapılacak, şema yalnızca gerçek API verisi varsa oluşturulacak. |

---

## Düzeltme Aksiyonu Planı
1. `src/app/api/reviews/route.ts` dosyasında, `apiKey` veya `placeId` tanımlı değilse sahte veriler yerine boş veri döndürülecek.
2. `src/components/GoogleReviews.tsx` dosyasında başlangıç verileri sıfırlanacak, eğer veri yüklenemezse veya boş dönerse `reviewsSchema` içerisine `aggregateRating` eklenmeyecek ve bölüm ekranda sahte veri göstermeyecek.
