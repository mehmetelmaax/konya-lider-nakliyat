const TR_MAP: Record<string, string> = {
  'ç':'c','Ç':'c','ğ':'g','Ğ':'g','ı':'i','I':'i','İ':'i','i':'i',
  'ö':'o','Ö':'o','ş':'s','Ş':'s','ü':'u','Ü':'u'
};

/**
 * Türkçe karakterleri güvenli bir şekilde ASCII karşılıklarına çevirerek slug üreten fonksiyon.
 * JS locale farklarından etkilenmeden tutarlı sonuç verir.
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  
  let result = '';
  // Türkçe karakter eşleştirmesi
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += TR_MAP[char] !== undefined ? TR_MAP[char] : char;
  }
  
  return result
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')    // Alfanumerik, boşluk ve tire dışındakileri at
    .replace(/\s+/g, '-')            // Boşlukları tire yap
    .replace(/-+/g, '-')             // Ardışık tireleri teke indir
    .replace(/^-+|-+$/g, '');        // Baş/son tireleri kırp
}
