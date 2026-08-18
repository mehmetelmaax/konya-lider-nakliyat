/**
 * Türkçe kelimeler için dil bilgisi yönelme (-a/-e, -ya/-ye) ve bulunma (-da/-de, -ta/-te, -nda/-nde) eklerini üreten yardımcı kütüphane.
 */

// Son sesli harfi bulan yardımcı fonksiyon
function getLastVowel(word: string): string {
  const cleanWord = word.trim().replace(/['"().]/g, '');
  const vowels = 'aıoueiöüAEIOUEİÖÜ';
  for (let i = cleanWord.length - 1; i >= 0; i--) {
    if (vowels.includes(cleanWord[i])) {
      return cleanWord[i];
    }
  }
  return 'a'; // Fallback
}

// Kalın sesli harf kontrolü
function isBackVowel(vowel: string): boolean {
  return 'aıouAIOU'.includes(vowel);
}

// Son harf sesli mi kontrolü
function endsWithVowel(word: string): boolean {
  const cleanWord = word.trim().replace(/['"().]/g, '');
  const vowels = 'aıoueiöüAEIOUEİÖÜ';
  if (cleanWord.length === 0) return false;
  return vowels.includes(cleanWord[cleanWord.length - 1]);
}

// Sert sessiz harfle mi bitiyor kontrolü (Fıstıkçı Şahap)
function endsWithHardConsonant(word: string): boolean {
  const cleanWord = word.trim().replace(/['"().]/g, '');
  const hardConsonants = 'fstkçşhpFSTKÇŞHP';
  if (cleanWord.length === 0) return false;
  return hardConsonants.includes(cleanWord[cleanWord.length - 1]);
}

/**
 * Kelimeye uygun yönelme eki (-a/-e veya -ya/-ye) üretir.
 * Örnekler:
 * - İstanbul -> 'a'
 * - Ankara -> 'ya'
 * - İzmir -> 'e'
 * - Konya -> 'ya'
 */
export function dativeSuffix(word: string): string {
  const lastVowel = getLastVowel(word);
  const back = isBackVowel(lastVowel);
  const vowelEnd = endsWithVowel(word);
  
  if (vowelEnd) {
    return back ? 'ya' : 'ye';
  } else {
    return back ? 'a' : 'e';
  }
}

/**
 * Kelimeye uygun bulunma eki (-da/-de veya -ta/-te, iyelik ekine göre -nda/-nde) üretir.
 * Örnekler:
 * - Sarayönü -> 'nde' (Sarayönü'nde)
 * - Ereğli -> 'de' (Ereğli'de)
 * - Kadınhanı -> 'nda' (Kadınhanı'nda)
 * - Selçuklu -> 'da' (Selçuklu'da)
 */
export function locativeSuffix(word: string): string {
  const cleanWord = word.trim().replace(/['"().]/g, '');
  
  // Türkçe iyelik eki alan kelimelerin bulunma hali istisnaları (Sarayönü, Kadınhanı, Cihanbeyli gibi)
  if (cleanWord.endsWith('önü') || cleanWord.endsWith('Önü')) {
    return 'nde';
  }
  if (cleanWord.endsWith('hanı') || cleanWord.endsWith('Hanı')) {
    return 'nda';
  }
  if (cleanWord.endsWith('beyli') || cleanWord.endsWith('Beyli')) {
    return 'nde';
  }
  
  const lastVowel = getLastVowel(word);
  const back = isBackVowel(lastVowel);
  const hard = endsWithHardConsonant(word);
  
  if (hard) {
    return back ? 'ta' : 'te';
  } else {
    return back ? 'da' : 'de';
  }
}
