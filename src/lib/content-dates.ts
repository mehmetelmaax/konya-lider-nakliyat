/**
 * Bu dosya Konya Lider Nakliyat sitesindeki sayfaların son güncellenme tarihlerini yönetir.
 * Arama motorlarına doğru lastmod sinyali göndermek ve tarama bütçesini optimize etmek için önemlidir.
 * Bir sayfa üzerinde içerik değişikliği yapıldığında buradaki tarih güncellenmelidir.
 * 
 * CONTRIBUTING: Herhangi bir statik sayfa içeriğini güncellediğinizde lütfen aşağıdaki
 * ilgili alanın tarihini yyyy-mm-dd formatında güncelleyin.
 */
export const CONTENT_DATES = {
  main: '2026-08-18',
  teklif: '2026-08-18',
  hakkimizda: '2026-08-18',
  galeri: '2026-08-18',
  iletisim: '2026-08-18',
  fiyatlari: '2026-08-18',
  firmalari: '2026-08-18',
  kontrolListesi: '2026-08-18',
  yasalGizlilik: '2026-08-18',
  yasalKvkk: '2026-08-18',
  
  // Hub sayfaları (yeni eklenenler)
  bolgelerHub: '2026-08-18',
  hizmetlerHub: '2026-08-18',
  rotalarHub: '2026-08-18',
  
  // Kategori bazlı son güncelleme tarihleri
  services: '2026-08-18',
  districts: '2026-08-18',
  routes: '2026-08-18',
  blog: '2026-08-18',
} as const;
