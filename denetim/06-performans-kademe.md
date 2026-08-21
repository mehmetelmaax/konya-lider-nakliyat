# Performans ve Bütçe Eşikleri Kayıt Defteri

Bu dosya, Konya Lider Nakliyat web sitesinin Lighthouse CI (LHCI) performans bütçelerinin kademeli olarak sıkılaştırılması süreçlerini kaydeder.

## Aşama 1: Başlangıç Eşikleri (21 Ağustos 2026)
Lighthouse CI'ın paylaşımlı runner'lar üzerindeki gürültülü (noisy) yapısını engellemek ve pipeline'ın kararlılığını sağlamak için başlatılan ilk bütçe seviyesidir. SEO ve Erişilebilirlik deterministik olduğundan hata (`error`) fırlatırken; performans ve yükleme süreleri uyarı (`warn`) düzeyindedir.

### Eşikler (`lighthouserc.json`):
- `categories:seo` → error, minScore 0.95
- `categories:accessibility` → error, minScore 0.90
- `categories:best-practices` → warn, minScore 0.90
- `categories:performance` → warn, minScore 0.75
- `first-contentful-paint` (FCP) → warn, maxNumericValue 2200
- `largest-contentful-paint` (LCP) → warn, maxNumericValue 3000
- `cumulative-layout-shift` (CLS) → warn, maxNumericValue 0.10
- `total-blocking-time` (TBT) → warn, maxNumericValue 400

---

## Sonraki Aşamalar İçin Yol Haritası:
- **Aşama 2 (Hedef):** Performans minScore 0.80, FCP 1800ms, LCP 2500ms, TBT 250ms (Görsel ve bundle optimizasyonları sonrası test edilerek geçilecektir).
- **Aşama 3 (Hedef):** Performans minScore 0.90, FCP 1500ms, LCP 2000ms, TBT 150ms (Tam kararlılık sağlandığında geçilecektir).
