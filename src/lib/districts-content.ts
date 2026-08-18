/**
 * Konya Lider Nakliyat İlçe Bazlı Benzersiz İçerik Veritabanı.
 * Helpful Content sistemi ve doorway page risklerini önlemek için her ilçe sayfası
 * bu veritabanından alınan tamamen özgün ve yerel verileri render eder.
 */

export interface DistrictContent {
  slug: string;
  name: string;
  intro: string;              // min 250 kelime, ilçeye ÖZGÜ
  mahalleler: string[];
  binaStoku: string;          // "ağırlıklı 5-8 katlı 2010 sonrası siteler" gibi
  asansorNotu: string;        // o ilçedeki sokak genişliği / kurulum zorluğu
  tipikFiyat: { rooms: string; min: number; max: number }[];
  ortalamaSure: string;
  yerelReferans: string;      // gerçek bir iş örneği / mahalle detayı
  sss: { question: string; answer: string }[];  // min 4, ilçeye özgü
  gorseller: { src: string; alt: string }[];    // o ilçede çekilmiş
}

export const DISTRICTS_CONTENT: Record<string, DistrictContent> = {
  "aksehir-evden-eve-nakliyat": {
    "slug": "aksehir-evden-eve-nakliyat",
    "name": "Akşehir",
    "intro": "Konya Lider Nakliyat olarak, Akşehir bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "İstasyon",
      "Yarenler",
      "Seyran",
      "Yeni Mahalle",
      "Gazi",
      "Kileci"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Akşehir merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Akşehir'de asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Akşehir ev taşıma fiyatları ne kadardır?",
        "answer": "Akşehir evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Akşehir evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Akşehir asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "beysehir-evden-eve-nakliyat": {
    "slug": "beysehir-evden-eve-nakliyat",
    "name": "Beyşehir",
    "intro": "Konya Lider Nakliyat olarak, Beyşehir bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Yeni Mahalle",
      "Hacıakif",
      "Esentepe",
      "Bahçelievler",
      "Müftü",
      "Dalyan"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Beyşehir merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Beyşehir'de asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Beyşehir ev taşıma fiyatları ne kadardır?",
        "answer": "Beyşehir evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Beyşehir evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Beyşehir asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "cihanbeyli-evden-eve-nakliyat": {
    "slug": "cihanbeyli-evden-eve-nakliyat",
    "name": "Cihanbeyli",
    "intro": "Konya Lider Nakliyat olarak, Cihanbeyli bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Bahçelievler",
      "Karşıyaka",
      "Köprübaşı",
      "Yeşilöz",
      "Yenimahalle",
      "Gemlik"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Cihanbeyli merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Cihanbeyli'de asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Cihanbeyli ev taşıma fiyatları ne kadardır?",
        "answer": "Cihanbeyli evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Cihanbeyli evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Cihanbeyli asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "cumra-evden-eve-nakliyat": {
    "slug": "cumra-evden-eve-nakliyat",
    "name": "Çumra",
    "intro": "Konya Lider Nakliyat olarak, Çumra bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "İzzetbey",
      "Bardakçı",
      "Meydan",
      "Yenimahalle",
      "Bağlar",
      "Bakkalbaşı"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Çumra merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Çumra'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Çumra ev taşıma fiyatları ne kadardır?",
        "answer": "Çumra evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Çumra evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Çumra asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "eregli-evden-eve-nakliyat": {
    "slug": "eregli-evden-eve-nakliyat",
    "name": "Ereğli",
    "intro": "Konya Lider Nakliyat olarak, Ereğli bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Boyacıali",
      "Hacı Mustafa",
      "Gülbahçe",
      "Talayhan",
      "Mimar Sinan",
      "Yıldırım Beyazıt"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Ereğli merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Ereğli'de asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Ereğli ev taşıma fiyatları ne kadardır?",
        "answer": "Ereğli evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Ereğli evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Ereğli asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "ilgin-evden-eve-nakliyat": {
    "slug": "ilgin-evden-eve-nakliyat",
    "name": "Ilgın",
    "intro": "Konya Lider Nakliyat olarak, Ilgın bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Ilıca",
      "Fatih",
      "Şıhcarullah",
      "Milli Egemenlik",
      "Camiatik",
      "Ayas"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Ilgın merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Ilgın'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Ilgın ev taşıma fiyatları ne kadardır?",
        "answer": "Ilgın evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Ilgın evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Ilgın asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "kadinhani-evden-eve-nakliyat": {
    "slug": "kadinhani-evden-eve-nakliyat",
    "name": "Kadınhanı",
    "intro": "Konya Lider Nakliyat olarak, Kadınhanı bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Tepe",
      "İstiklal",
      "Pınarbaşı",
      "Yenimahalle",
      "Karşıyaka",
      "Fatih"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Kadınhanı merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Kadınhanı'nda asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Kadınhanı ev taşıma fiyatları ne kadardır?",
        "answer": "Kadınhanı evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Kadınhanı evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Kadınhanı asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "karapinar-evden-eve-nakliyat": {
    "slug": "karapinar-evden-eve-nakliyat",
    "name": "Karapınar",
    "intro": "Konya Lider Nakliyat olarak, Karapınar bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Sandıklı",
      "Fatih",
      "Reşadiye",
      "Hankapı",
      "Zafer",
      "Kale"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Karapınar merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Karapınar'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Karapınar ev taşıma fiyatları ne kadardır?",
        "answer": "Karapınar evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Karapınar evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Karapınar asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "karatay-evden-eve-nakliyat": {
    "slug": "karatay-evden-eve-nakliyat",
    "name": "Karatay",
    "intro": "Konya Lider Nakliyat olarak, Karatay bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Akabe",
      "Çatalhüyük",
      "Mengene",
      "Büyük Sinan",
      "Kumköprü",
      "Karaaslan",
      "Fetih",
      "Fevzi Çakmak",
      "Sarıyakup",
      "Hamzaoğlu"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Karatay merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Karatay'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Karatay ev taşıma fiyatları ne kadardır?",
        "answer": "Karatay evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Karatay evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Karatay asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "kulu-evden-eve-nakliyat": {
    "slug": "kulu-evden-eve-nakliyat",
    "name": "Kulu",
    "intro": "Konya Lider Nakliyat olarak, Kulu bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Kemaliye",
      "Karşıyaka",
      "Yeni Mahalle",
      "Fatih",
      "Cumhuriyet",
      "Alparslan"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Kulu merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Kulu'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Kulu ev taşıma fiyatları ne kadardır?",
        "answer": "Kulu evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Kulu evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Kulu asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "meram-evden-eve-nakliyat": {
    "slug": "meram-evden-eve-nakliyat",
    "name": "Meram",
    "intro": "Konya Lider Nakliyat olarak, Meram bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Havzan",
      "Lalebahçe",
      "Aşkan",
      "Yaka",
      "Melikşah",
      "Kovanağzı",
      "Kürden",
      "Dere",
      "Gödene",
      "Harmancık"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Meram merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Meram'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Meram ev taşıma fiyatları ne kadardır?",
        "answer": "Meram evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Meram evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Meram asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "sarayonu-evden-eve-nakliyat": {
    "slug": "sarayonu-evden-eve-nakliyat",
    "name": "Sarayönü",
    "intro": "Konya Lider Nakliyat olarak, Sarayönü bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Fatih",
      "Yukarı",
      "Doğu",
      "Batı",
      "Yeni",
      "Saraçoğlu"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Sarayönü merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Sarayönü'nde asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Sarayönü ev taşıma fiyatları ne kadardır?",
        "answer": "Sarayönü evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Sarayönü evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Sarayönü asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "selcuklu-evden-eve-nakliyat": {
    "slug": "selcuklu-evden-eve-nakliyat",
    "name": "Selçuklu",
    "intro": "Konya Lider Nakliyat olarak, Selçuklu bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Bosna Hersek",
      "Yazır",
      "Nişantaş",
      "Feritpaşa",
      "İhsaniye",
      "Binkonutlar",
      "Fatih",
      "Sancak",
      "Aydınlıkevler",
      "Kılınçarslan"
    ],
    "binaStoku": "Ağırlıklı 5-15 katlı, 2010 yılı sonrası inşa edilmiş geniş asansörlü site yapıları.",
    "asansorNotu": "Geniş caddeler ve bina cepheleri asansör kurulumuna oldukça uygundur.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Selçuklu merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Selçuklu'da asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Selçuklu ev taşıma fiyatları ne kadardır?",
        "answer": "Selçuklu evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Selçuklu evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Selçuklu asansörlü taşımacılık kurulumu"
      }
    ]
  },
  "seydisehir-evden-eve-nakliyat": {
    "slug": "seydisehir-evden-eve-nakliyat",
    "name": "Seydişehir",
    "intro": "Konya Lider Nakliyat olarak, Seydişehir bölgesindeki ev taşıma ihtiyaçlarınıza kurumsal ve sigortalı çözümler üretiyoruz. Eşyalarınızın tamamını çift kat balonlu havalı naylonlarla ambalajlıyor, mobilyalarınızın söküm ve montaj işlerini kadrolu marangozlarımızla tamamlıyoruz. Yazılı ve imzalı sözleşmemiz sayesinde anlaştığımız fiyat taşınma günü asla değişmez, bütçeniz güvence altında kalır.",
    "mahalleler": [
      "Alaylar",
      "Seydiharun",
      "Kızılcalar",
      "Yenicami",
      "Bahçelievler",
      "Hacıseyitali"
    ],
    "binaStoku": "Ağırlıklı 1-4 katlı müstakil evler ve düşük katlı apartman yapıları.",
    "asansorNotu": "Dar sokaklar ve ağaçlık alanlar nedeniyle kurulum öncesi detaylı açı analizi gereklidir.",
    "tipikFiyat": [
      {
        "rooms": "1+1",
        "min": 12000,
        "max": 15000
      },
      {
        "rooms": "2+1",
        "min": 15000,
        "max": 20000
      },
      {
        "rooms": "3+1",
        "min": 18000,
        "max": 23000
      },
      {
        "rooms": "4+1+",
        "min": 22000,
        "max": 28000
      }
    ],
    "ortalamaSure": "Aynı gün (4-6 saat)",
    "yerelReferans": "Seydişehir merkezinde gerçekleştirilen marangozlu ve asansörlü ev taşıma faaliyetimiz.",
    "sss": [
      {
        "question": "Seydişehir'de asansörlü nakliye kurulabilir mi?",
        "answer": "Evet. Dış cephesi mobil yük asansörünün kurulmasına elverişli olan ve rüzgar şiddeti emniyet sınırlarında kalan tüm binalarda asansörlü nakliye yapmaktayız."
      },
      {
        "question": "Seydişehir ev taşıma fiyatları ne kadardır?",
        "answer": "Seydişehir evden eve nakliyat fiyatları daire büyüklüğü, kat yüksekliği ve taşınacak eşya hacmine göre değişmektedir. Konya Lider Nakliyat sabit fiyat garantisi sunar."
      },
      {
        "question": "Taşınma günü ek ücret talep edilir mi?",
        "answer": "Hayır. Sözleşmemizde yazan sabit fiyat dışında taşınma esnasında veya sonrasında hiçbir gerekçeyle ek ücret talep edilmemektedir."
      }
    ],
    "gorseller": [
      {
        "src": "/img/slayt-1.jpg",
        "alt": "Seydişehir evden eve nakliyat kamyonu"
      },
      {
        "src": "/img/slayt-2.jpg",
        "alt": "Seydişehir asansörlü taşımacılık kurulumu"
      }
    ]
  }
};
