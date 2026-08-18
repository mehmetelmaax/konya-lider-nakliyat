export const SITE = {
  name: 'Konya Lider Nakliyat',
  legalName: 'Konya Lider Evden Eve Nakliyat',
  shortName: 'Lider Nakliyat',
  url: 'https://www.konyaliderevdeneve.com',
  locale: 'tr_TR',
  description: "Konya'da sabit fiyat garantili, K3 yetki belgeli, asansörlü ve sigortalı evden eve nakliyat.",
  phone: '+905546400205',
  phoneDisplay: '0554 640 02 05',
  phoneHref: 'tel:+905546400205',
  whatsapp: '905546400205',
  whatsappHref: 'https://wa.me/905546400205',
  email: 'info@konyaliderevdeneve.com',
  address: {
    street: 'Nişantaş Mahallesi, Doktor Mehmet Hulusi Baybal Caddesi, No:31/F D:1',
    locality: 'Selçuklu',
    region: 'Konya',
    postalCode: '42060',
    country: 'TR',
  },
  geo: { lat: 37.8837, lng: 32.4896 },
  hours: { opens: '08:00', closes: '22:00' },
  foundingYear: 2012, // DOĞRULANACAK: Kuruluş yılı 2006 mı 2012 mi? (facts.ts ile çelişiyor)
  priceRange: '₺₺',
  googleMapsUrl: 'https://share.google/YoiHqgk0tx65LVd0H', // HeroSlider.tsx içerisinden taşındı
  social: {
    facebook: '', // DOĞRULANACAK: Facebook sayfa adresi
    instagram: '', // DOĞRULANACAK: Instagram profil adresi
    youtube: '',
    googleBusinessProfile: '', // DOĞRULANACAK: Google Business Profile URL'i (sameAs için)
  },
  k3DocumentNumber: '', // DOĞRULANACAK: K3 Yetki Belge Numarası
  numberOfEmployees: undefined, // DOĞRULANACAK: Gerçek kadrolu çalışan sayısı
} as const;

export const SERVICES = [
  {
    slug: 'sehirici-evden-eve-nakliyat',
    name: 'Şehiriçi Evden Eve Nakliyat',
    shortName: 'Şehiriçi Nakliyat',
    title: 'Konya Şehir İçi Ev Taşıma | Lider Nakliyat',
    description: "Konya merkez ilçelerinde aynı gün içinde asansörlü, sigortalı ve marangoz montaj dahil şehir içi evden eve nakliyat hizmeti. Hemen sabit fiyat alın.",
    icon: 'Truck'
  },
  {
    slug: 'sehirlerarasi-evden-eve-nakliyat',
    name: 'Şehirlerarası Evden Eve Nakliyat',
    shortName: 'Şehirlerarası Nakliyat',
    title: 'Konya Şehirlerarası Ev Taşıma | Lider Nakliyat',
    description: "Konya'dan Türkiye genelinde 81 ile sigortalı, marangozlu ve sözleşmeli şehirlerarası evden eve nakliyat hizmeti. Sabit fiyat garantisiyle taşının.",
    icon: 'Globe'
  },
  {
    slug: 'asansorlu-evden-eve-nakliyat',
    name: 'Asansörlü Evden Eve Nakliyat',
    shortName: 'Asansörlü Nakliyat',
    title: 'Konya Asansörlü Ev Taşıma | Lider Nakliyat',
    description: "Konya'da yüksek katlı daireler için 25. kata kadar ulaşan mobil dış cephe eşya asansörü kiralama ve güvenli asansörlü evden eve nakliye hizmeti.",
    icon: 'ArrowUpRight'
  },
  {
    slug: 'ofis-ve-isyeri-tasimaciligi',
    name: 'Ofis ve İşyeri Taşımacılığı',
    shortName: 'Ofis Taşıma',
    title: 'Konya Ofis ve İşyeri Taşıma | Lider Nakliyat',
    description: "Konya'da kurumsal ofis, arşiv, büro ve işyeri taşıma hizmeti. Numaralı etiketli kutulama, asansörlü taşıma ve sigorta güvencesiyle sıfır kayıp.",
    icon: 'Building2'
  },
  {
    slug: 'profesyonel-esya-paketleme',
    name: 'Profesyonel Eşya Paketleme',
    shortName: 'Eşya Paketleme',
    title: 'Profesyonel Eşya Paketleme Hizmeti | Lider Nakliyat',
    description: "Konya'da ev taşırken mobilya, beyaz eşya ve kırılacak cam eşyaların çift kat balonlu naylon, Kraft kağıt ve koruma kutularıyla ambalajlanması.",
    icon: 'ShieldCheck'
  },
  {
    slug: 'ucretsiz-ekspertiz',
    name: 'Ücretsiz Ekspertiz',
    shortName: 'Ücretsiz Ekspertiz',
    title: 'Ücretsiz Ekspertiz Hizmeti | Lider Nakliyat',
    description: "Konya'da taşınma öncesinde eşya hacmini, bina kat durumunu ve asansör kurulum açısını yerinde veya görüntülü inceleyerek sabit fiyat teklifi çıkarma süreci.",
    icon: 'FileText'
  },
  {
    slug: 'esya-depolama',
    name: 'Eşya Depolama',
    shortName: 'Eşya Depolama',
    title: 'Konya Eşya Depolama Hizmeti | Lider Nakliyat',
    description: "Konya'da aylık kiralık eşya depolama çözümleri. Güvenlik kameralı, rutubetsiz ve sigortalı konteyner depolarımızda eşyalarınızı güvenle saklayın.",
    icon: 'Warehouse'
  },
  {
    slug: 'parca-esya-tasima',
    name: 'Parça Eşya Taşıma',
    shortName: 'Parça Eşya Taşıma',
    title: 'Konya Parça Eşya Taşıma | Lider Nakliyat',
    description: "Konya'da tek parça, az eşya veya öğrenci evi taşımacılığı. Uygun fiyatlı parça eşya nakliye tır ve kamyonetlerimizle hızlı taşıma hizmeti.",
    icon: 'Package'
  },
  {
    slug: 'piyano-ve-kasa-tasima',
    name: 'Piyano ve Kasa Taşıma',
    shortName: 'Piyano ve Kasa Taşıma',
    title: 'Konya Piyano ve Ağır Kasa Taşıma | Lider Nakliyat',
    description: "Konya'da kuyruklu/duvar piyanosu, çelik para kasası ve hassas ağır yük taşımacılığı. Özel liftli araçlar ve askı sistemleriyle hasarsız transfer.",
    icon: 'Boxes'
  }
] as const;

export const DISTRICTS = [
  {
    slug: 'selcuklu-evden-eve-nakliyat',
    name: 'Selçuklu',
    tier: 'merkez',
    neighbors: ['meram', 'karatay', 'sarayonu', 'derbent'],
    distanceKm: 0,
    indexable: true
  },
  {
    slug: 'meram-evden-eve-nakliyat',
    name: 'Meram',
    tier: 'merkez',
    neighbors: ['selcuklu', 'karatay', 'seydisehir', 'akoren'],
    distanceKm: 0,
    indexable: true
  },
  {
    slug: 'karatay-evden-eve-nakliyat',
    name: 'Karatay',
    tier: 'merkez',
    neighbors: ['selcuklu', 'meram', 'cumra'],
    distanceKm: 0,
    indexable: true
  },
  {
    slug: 'eregli-evden-eve-nakliyat',
    name: 'Ereğli',
    tier: 'ilce',
    neighbors: ['karapinar', 'halkapinar'],
    distanceKm: 145,
    indexable: true
  },
  {
    slug: 'aksehir-evden-eve-nakliyat',
    name: 'Akşehir',
    tier: 'ilce',
    neighbors: ['ilgin', 'tuzlukcu', 'doganhisar'],
    distanceKm: 135,
    indexable: true
  },
  {
    slug: 'seydisehir-evden-eve-nakliyat',
    name: 'Seydişehir',
    tier: 'ilce',
    neighbors: ['beysehir', 'meram', 'yaliuyuk'],
    distanceKm: 85,
    indexable: true
  },
  {
    slug: 'ilgin-evden-eve-nakliyat',
    name: 'Ilgın',
    tier: 'ilce',
    neighbors: ['aksehir', 'kadinhani', 'sarayonu'],
    distanceKm: 90,
    indexable: true
  },
  {
    slug: 'cumra-evden-eve-nakliyat',
    name: 'Çumra',
    tier: 'ilce',
    neighbors: ['karatay', 'meram', 'karapinar'],
    distanceKm: 45,
    indexable: true
  },
  {
    slug: 'kadinhani-evden-eve-nakliyat',
    name: 'Kadınhanı',
    tier: 'ilce',
    neighbors: ['selcuklu', 'ilgin', 'sarayonu'],
    distanceKm: 60,
    indexable: true
  },
  {
    slug: 'beysehir-evden-eve-nakliyat',
    name: 'Beyşehir',
    tier: 'ilce',
    neighbors: ['seydisehir', 'huyuk', 'derebucak'],
    distanceKm: 90,
    indexable: true
  },
  {
    slug: 'sarayonu-evden-eve-nakliyat',
    name: 'Sarayönü',
    tier: 'ilce',
    neighbors: ['selcuklu', 'kadinhani', 'kulu'],
    distanceKm: 50,
    indexable: false
  },
  {
    slug: 'karapinar-evden-eve-nakliyat',
    name: 'Karapınar',
    tier: 'ilce',
    neighbors: ['karatay', 'cumra', 'eregli'],
    distanceKm: 95,
    indexable: false
  },
  {
    slug: 'kulu-evden-eve-nakliyat',
    name: 'Kulu',
    tier: 'ilce',
    neighbors: ['cihanbeyli', 'sarayonu'],
    distanceKm: 150,
    indexable: false
  },
  {
    slug: 'cihanbeyli-evden-eve-nakliyat',
    name: 'Cihanbeyli',
    tier: 'ilce',
    neighbors: ['kulu', 'sarayonu', 'altinekin'],
    distanceKm: 100,
    indexable: false
  }
] as const;

export interface RouteConfig {
  slug: string;
  city: string;
  distanceKm: number;
  durationHours: number;
  priceRangeMin: number;
  priceRangeMax: number;
  viaRoute: string;
  notes: string;
}

export const ROUTES: readonly RouteConfig[] = [
  {
    slug: 'konya-istanbul-evden-eve-nakliyat',
    city: 'İstanbul',
    distanceKm: 700,
    durationHours: 8,
    priceRangeMin: 24500,
    priceRangeMax: 34000,
    viaRoute: 'D-300, Ankara-Niğde Otoyolu ve Kuzey Marmara Otoyolu',
    notes: 'İstanbul girişinde nakliye kamyonları için uygulanan Yavuz Sultan Selim Köprüsü zorunluluğu ve şehir içi saat kısıtlamaları dikkate alınmalıdır.'
  },
  {
    slug: 'konya-ankara-evden-eve-nakliyat',
    city: 'Ankara',
    distanceKm: 260,
    durationHours: 3.5,
    priceRangeMin: 12000,
    priceRangeMax: 18000,
    viaRoute: 'D-715 (Konya-Ankara Yolu üzerinden doğrudan hat)',
    notes: 'Ankara merkezinde yüksek katlı konutlarda asansörlü taşımacılık yaygın olarak tercih edilmektedir.'
  },
  {
    slug: 'konya-izmir-evden-eve-nakliyat',
    city: 'İzmir',
    distanceKm: 550,
    durationHours: 6.5,
    priceRangeMin: 21500,
    priceRangeMax: 29500,
    viaRoute: 'D-300 Afyonkarahisar - Uşak - Manisa - İzmir hattı',
    notes: 'İzmir merkezindeki dar sokaklar için hidrolik teleskopik asansör araçlarımız hazır tutulur.'
  },
  {
    slug: 'konya-antalya-evden-eve-nakliyat',
    city: 'Antalya',
    distanceKm: 300,
    durationHours: 4.5,
    priceRangeMin: 13500,
    priceRangeMax: 19500,
    viaRoute: 'D-696 Seydişehir - Akseki - Manavgat üzerinden Antalya geçişi',
    notes: 'Toros dağ yolları geçişi nedeniyle araçlarımızın fren ve motor kontrolleri her sefer öncesi titizlikle yapılır.'
  },
  {
    slug: 'konya-bursa-evden-eve-nakliyat',
    city: 'Bursa',
    distanceKm: 480,
    durationHours: 5.5,
    priceRangeMin: 18500,
    priceRangeMax: 26500,
    viaRoute: 'D-300 ve D-650 Afyonkarahisar - Kütahya - Bozüyük geçişli hat',
    notes: 'Bursa İnegöl mobilya nakliyat trafiği yoğun olduğu için güvenli sürüş kurallarına dikkat edilmektedir.'
  },
  {
    slug: 'konya-konya-evden-eve-nakliyat',
    city: 'Konya',
    distanceKm: 350,
    durationHours: 4.5,
    priceRangeMin: 14500,
    priceRangeMax: 21000,
    viaRoute: 'D-330 Konya - Karaman - Ereğli - Ilgın otoyol bağlantısı',
    notes: 'Ilgın geçişindeki dik Toros rampalarında kontrollü sürüş sağlanmaktadır.'
  },
  {
    slug: 'konya-kayseri-evden-eve-nakliyat',
    city: 'Kayseri',
    distanceKm: 300,
    durationHours: 4,
    priceRangeMin: 12500,
    priceRangeMax: 18500,
    viaRoute: 'D-300 Aksaray - Nevşehir üzerinden Kayseri hattı',
    notes: 'İç Anadolu düz hattında sarsıntısız taşıma için eşyalarınız araç içi sabitleme sistemleriyle korunur.'
  },
  {
    slug: 'konya-eskisehir-evden-eve-nakliyat',
    city: 'Eskişehir',
    distanceKm: 330,
    durationHours: 4,
    priceRangeMin: 13000,
    priceRangeMax: 19000,
    viaRoute: 'Yunak - Polatlı veya Afyonkarahisar geçişli kuzey hattı',
    notes: 'Eskişehir Tepebaşı ve Odunpazarı dar sokaklarında küçük nakliye kamyonetlerimizle hizmet sunmaktayız.'
  }
] as const;
