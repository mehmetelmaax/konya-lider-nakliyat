export interface RouteData {
  slug: string;
  city: string;
  distanceKm: number;
  durationHours: number;
  priceRangeMin: number;
  priceRangeMax: number;
  viaRoute: string;
  notes: string;
  introText: string;
  distanceText: string;
  pricingText: string;
  routeText: string;
  insuranceText: string;
  tipsText: string;
  faq: { question: string; answer: string }[];
}

export const routesDatabase: Record<string, RouteData> = {
  'konya-istanbul-evden-eve-nakliyat': {
    slug: 'konya-istanbul-evden-eve-nakliyat',
    city: 'İstanbul',
    distanceKm: 700,
    durationHours: 8,
    priceRangeMin: 24500,
    priceRangeMax: 34000,
    viaRoute: 'D-300, Ankara-Niğde Otoyolu ve Kuzey Marmara Otoyolu',
    notes: 'İstanbul girişinde nakliye kamyonları için uygulanan Yavuz Sultan Selim Köprüsü zorunluluğu ve şehir içi saat kısıtlamaları dikkate alınmalıdır.',
    introText: "Konya Lider Nakliyat, Konya'dan İstanbul'un tüm ilçelerine (Kadıköy, Beşiktaş, Ümraniye, Başakşehir, Esenyurt dahil) profesyonel, K3 yetki belgeli ve sigortalı şehirlerarası evden eve nakliyat hizmeti vermektedir. Uzun mesafe taşımacılığında uzman kadromuz, eşyalarınızın yol boyunca sarsıntı ve darbelere karşı zarar görmemesi için çift kat pıtpıt naylon ve özel kalın Kraft ambalaj malzemeleriyle koruma sağlar. Sabit fiyat garantimiz ile Konya'dan yola çıkan kamyonumuz, İstanbul'da kapıda ek ücret sürprizi yaşatmadan eşyalarınızı yeni dairenize teslim eder.",
    distanceText: "Konya ile İstanbul arası karayolu mesafesi yaklaşık 700 kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama 1.5 - 2 gündür. Taşıma sürecinde güvenli güzergâhlar üzerinden seyreden kamyonlarımız, şoförlerimizin dinlenme ve sürüş güvenliği kurallarına uygun olarak hareket eder. İlk gün Konya'da eşyaların de-montaj, paketleme ve yükleme işlemleri tamamlanarak kamyonumuz yola çıkar. İkinci gün sabahı İstanbul'deki yeni adresinize ulaşan ekiplerimiz, eşyaları asansör yardımıyla dairenize çıkartır ve mobilyaların montaj işlemlerini gerçekleştirerek taşınmayı tamamlar.",
    pricingText: "Konya ile İstanbul arası nakliyat fiyatları Konya Lider Nakliyat tarafından 24.500 TL'den başlayarak ve şehirlerarası mesafe bazında kilometre başına 35 TL üzerinden hesaplanmaktadır. Fiyat teklifimize K3 belgeli kapalı kasa nakliye kamyonu, profesyonel paketleme malzemeleri, de-montaj and montaj hizmetleri, sigorta poliçesi ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 24.500 TL ile 26.500 TL arasında değişirken; 2+1 daire taşıma 27.500 TL ile 30.000 TL, 3+1 daire taşıma ise 31.000 TL ile 34.000 TL arasında bütçelendirilir.",
    routeText: "Konya'dan İstanbul'a taşıma yaparken tırlarımız ve büyük kamyonlarımız sırasıyla Konya - Kulu - Ankara - Bolu - Düzce - Sakarya - Kocaeli güzergâhını takip eder. İstanbul sınırlarına girildiğinde ağır vasıtalar için zorunlu olan Yavuz Sultan Selim Köprüsü ve Kuzey Marmara Otoyolu bağlantısı kullanılır. Avrupa Yakası'na geçecek araçlarımız için bu güzergâh trafik yoğunluğunu atlatmak ve güvenli sürüş sağlamak açısından son derece önemlidir. Her sevkiyatımız GPS araç takip sistemiyle donatılmış olup müşterilerimize anlık konum bilgisi paylaşılmaktadır.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Konya'dan yüklenen eşyalarınız İstanbul'daki yeni adresinizde teslim edilene kadar oluşabilecek kaza, yangın, doğal afet ve yol sarsıntı hasarlarına karşı sigortalanır. Sigorta poliçesi, taşınma sabahında adınıza düzenlenerek ıslak imzalı sözleşmeyle birlikte tarafınıza teslim edilir. Eşyaların taşınması sırasında oluşabilecek çizik ve sürtünme gibi küçük hasarlar ise firma içi sorumluluk garantimiz kapsamındadır.",
    tipsText: "İstanbul'a taşınırken dikkat edilmesi gereken en kritik husus, şehir içi dar sokaklar ve site yönetimlerinin taşıma saatleri kısıtlamalarıdır. Kadıköy, Beşiktaş, Şişli gibi dar tarihi sokaklara sahip ilçelerde büyük nakliye kamyonlarının yanaşması zor olabilir. Bu durumlarda küçük nakliye kamyonetlerimizle transfer (aktarma) hizmeti organize etmekteyiz. Ayrıca yüksek katlı binalarda asansör kurulum izinlerinin ve site içi park yeri rezervasyonlarının taşınmadan en az 2 gün önce apartman yönetimleriyle görüşülerek alınmış olması, taşınma gününün sorunsuz geçmesini sağlayacaktır.",
    faq: [
      {
        question: "Konya İstanbul nakliye süreci kaç gün sürer?",
        answer: "Eşyaların Konya'da yüklenmesi ve İstanbul'da yeni adrese boşaltılarak kurulması toplamda 1.5 ila 2 iş günü sürmektedir."
      },
      {
        question: "İstanbul'da dar sokaklarda taşıma nasıl yapılıyor?",
        answer: "Kamyonumuzun yanaşamadığı dar sokaklarda küçük aktarma araçları (pikap/kamyonet) kullanarak eşyaları güvenle dairenize taşıyoruz."
      },
      {
        question: "Sigorta poliçesi neleri kapsar, ücreti ne kadardır?",
        answer: "Sigorta poliçemiz yol kazaları, devrilme, yangın ve hırsızlık gibi majör riskleri kapsar. Poliçe bedeli teklif fiyatımıza dahildir, ekstra ücret alınmaz."
      },
      {
        question: "İstanbul'da asansörlü taşıma hizmeti veriyor musunuz?",
        answer: "Evet, İstanbul'daki yeni adresinizde dış cephe nakliye asansörü kurulumuna uygunluk varsa mobil asansör sistemimizi kurarak taşıma yapıyoruz."
      },
      {
        question: "Gardırop ve beyaz eşyaların montajını yapıyor musunuz?",
        answer: "Kadrolu marangozumuz gardıropları kurar, tesisat ustamız ise çamaşır ve bulaşık makinesinin bağlantılarını ücretsiz olarak tamamlar."
      },
      {
        question: "Ödemeyi ne zaman ve nasıl yapıyoruz?",
        answer: "Sözleşme anında küçük bir kapora alınır. Kalan tutarın yarısı Konya'da yükleme bitiminde, kalan yarısı ise İstanbul'da teslimat sonrasında ödenir."
      }
    ]
  },
  'konya-ankara-evden-eve-nakliyat': {
    slug: 'konya-ankara-evden-eve-nakliyat',
    city: 'Ankara',
    distanceKm: 260,
    durationHours: 3.5,
    priceRangeMin: 12000,
    priceRangeMax: 18000,
    viaRoute: 'D-715 (Konya-Ankara Yolu üzerinden doğrudan hat)',
    notes: 'Ankara merkezinde yüksek katlı konutlarda asansörlü taşımacılık yaygın olarak tercih edilmektedir.',
    introText: "Konya Lider Nakliyat, Konya'dan başkent Ankara'nın tüm ilçelerine (Çankaya, Yenimahalle, Keçiören, Etimesgut, Gölbaşı dahil) asansörlü ve marangozlu evden eve nakliyat çözümleri sunmaktadır. İki komşu şehir arasında günlük ve haftalık düzenli seferler düzenleyen firmamız, parça eşyalarınızı veya komple evinizi profesyonel standartlarda taşır. Lider Nakliyat güvencesiyle K3 yetki belgeli araçlarımız ve kadrolu ekibimiz, Konya'daki de-montaj işlemlerinden Ankara'daki anahtar teslim montaj sürecine kadar tüm adımları büyük bir titizlikle yürütmektedir.",
    distanceText: "Konya ile Ankara arası karayolu mesafesi yaklaşık 260 kilometredir ve ev eşyası taşımacılığında teslimat süresi aynı gündür. Sabah saat 08:00'de Konya'daki evinizde başlayan paketleme ve yükleme işlemleri öğle saatlerinde tamamlanır. Kamyonumuz D-715 otoyolu üzerinden hareket ederek yaklaşık 3.5 saatlik sürüşın ardından aynı gün Ankara'daki yeni adresinize ulaşır ve eşyalarınızın kurulumuna başlanır.",
    pricingText: "Konya ile Ankara arası nakliyat fiyatları Konya Lider Nakliyat tarafından 12.000 TL'den başlayarak bütçelendirilir. Fiyat teklifimize K3 belgeli kapalı kasa nakliye kamyonu, profesyonel paketleme malzemeleri, de-montaj ve montaj hizmetleri, sigorta poliçesi ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 12.000 TL ile 14.000 TL arasında değişirken; 2+1 daire taşıma 14.500 TL ile 16.000 TL, 3+1 daire taşıma ise 16.500 TL ile 18.000 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Ankara'ya giden nakliye araçlarımız, tamamen bölünmüş yol konforu sunan D-715 Konya-Ankara karayolunu kullanır. Güzergâh sırasıyla Konya - Cihanbeyli - Kulu - Gölbaşı hattı üzerinden Ankara merkeze ulaşır. Düz yol kalitesi sayesinde eşyalarınız minimum sarsıntıya maruz kalır. Araçlarımızın tümü karayolu taşıma kanunlarına uygun hız sınırlarında ilerler.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Eşyalarınız karayolunda seyir halindeyken yaşanabilecek her türlü kaza, devrilme, yangın riskine karşı tam bedel üzerinden sigortalanır. Sigorta poliçesi poliçe no ve şirket detaylarıyla birlikte taşınma öncesinde size teslim edilir. Eşyalarınızın yükleme esnasında apartman içinde veya asansörde görebileceği hasarlar da firmamızın güvencesi altındadır.",
    tipsText: "Ankara'ya taşınırken dikkat edilmesi gereken en önemli konu, özellikle Çankaya, Eryaman ve Batıkent gibi bölgelerde yoğun olarak yer alan çok katlı rezidans ve yüksek apartman yapılarıdır. Bu binalarda asansör kurulum alanının açık olması ve site yönetiminin yük asansörü kullanım saatlerine izin vermesi gerekir. Ekiplerimiz gerekli izin süreçlerini ve asansör kurulum alanını ön keşifle belirlemektedir.",
    faq: [
      {
        question: "Konya Ankara nakliyat kaç saat sürer?",
        answer: "Yükleme bittikten sonra iki şehir arası sürüş süresi ortalama 3.5 saattir. Genellikle aynı gün akşam veya ertesi sabah kurulum tamamlanır."
      },
      {
        question: "Ankara'da yüksek katlı dairelere asansör kuruluyor mu?",
        answer: "Evet, Ankara'daki yeni daireniz kaçıncı katta olursa olsun 25. kata kadar ulaşabilen teleskopik asansörlerimizle hizmet veriyoruz."
      },
      {
        question: "Paketleme malzemeleriniz kaliteli mi?",
        answer: "Eşyalarınız için kalın havalı ambalaj naylonları, Kraft kağıtlı mukavva koliler ve mobilyalara özel stretch sargılar kullanıyoruz."
      },
      {
        question: "Ekstra ücret çıkma ihtimali var mı?",
        answer: "Hayır. Sözleşmede anlaştığımız ve imzaladığımız sabit fiyat dışında hiçbir koşulda ek ücret talep etmiyoruz."
      },
      {
        question: "Rezervasyon işlemini ne kadar süre önce yapmalıyım?",
        answer: "Özellikle yaz dönemlerinde ve hafta sonlarında yoğunluk yaşandığı için taşınmadan en az 1 hafta önce rezervasyon yaptırmanızı öneririz."
      }
    ]
  },
  'konya-izmir-evden-eve-nakliyat': {
    slug: 'konya-izmir-evden-eve-nakliyat',
    city: 'İzmir',
    distanceKm: 550,
    durationHours: 6.5,
    priceRangeMin: 21500,
    priceRangeMax: 29500,
    viaRoute: 'D-300 Afyonkarahisar - Uşak - Manisa - İzmir hattı',
    notes: 'İzmir merkezindeki dar sokaklar için hidrolik teleskopik asansör araçlarımız hazır tutulur.',
    introText: "Konya Lider Nakliyat, Konya'dan Ege'nin incisi İzmir'in tüm ilçelerine (Karşıyaka, Bornova, Konak, Buca, Çeşme dahil) asansörlü, sigortalı ve profesyonel evden eve nakliyat hizmeti vermektedir. Uzun mesafe taşımacılığındaki köklü tecrübemizle, eşyalarınızın Konya-İzmir yolculuğunu hasarsız tamamlaması için özel sabitleme ve askılama yöntemleri uyguluyoruz. K3 yetki belgeli geniş araç filomuz ve uzman marangozlarımızla Konya'dan İzmir'e taşınma sürecinizi stressiz bir deneyime dönüştürüyoruz.",
    distanceText: "Konya ile İzmir arası karayolu mesafesi yaklaşık 550 kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama 1.5 gündür. İlk gün Konya'daki adresinizde eşyalarınız uzman marangoz ve ambalaj ekiplerimizce de-monte edilir, paketlenir ve kapalı çelik kasa nakliye kamyonumuza yüklenir. Kamyonumuz yola çıkarak ertesi gün sabah saatlerinde İzmir'deki yeni adresinize ulaşır ve hemen asansör kurulumu yapılarak eşyaların daireye taşınması sağlanır.",
    pricingText: "Konya ile İzmir arası nakliyat fiyatları Konya Lider Nakliyat tarafından 21.500 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize K3 belgeli kapalı kasa nakliye kamyonu, profesyonel paketleme malzemeleri, de-montaj ve montaj hizmetleri, sigorta poliçesi ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 21.500 TL ile 23.500 TL arasında değişirken; 2+1 daire taşıma 24.500 TL ile 26.500 TL, 3+1 daire taşıma ise 27.000 TL ile 29.500 TL arasında bütçelendirilir.",
    routeText: "Konya'dan İzmir'e giden nakliye araçlarımız Konya - Akşehir - Afyonkarahisar - Uşak - Kula - Salihli - Manisa - İzmir güzergâhını takip eder. Bu hat şehirlerarası nakliyat için en güvenli karayolu hattıdır. Afyon ve Uşak geçişleri duble yol kalitesindedir. Yol boyunca şoförlerimiz yasal dinlenme sürelerine uyarak sürüş güvenliğini en üst seviyede tutarlar.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Eşyalarınız Konya'dan yüklendiği andan itibaren İzmir'deki yeni evinize teslim edilip kurulana kadar yaşanabilecek tüm kaza, yangın, devrilme ve yol sarsıntı hasarlarına karşı sigortalanır. Poliçe evrakı taşınma günü sabahı adınıza düzenlenerek size takdim edilir.",
    tipsText: "İzmir'e taşınırken dikkat edilmesi gereken husus, özellikle Konak, Karşıyaka ve Buca gibi eski merkez ilçelerdeki dik yokuşlu sokaklar ve dar yerleşim yerleridir. Bu bölgelerde dış cephe nakliye asansörünün kurulabilmesi için sokak yapısının önceden analiz edilmesi önem taşır. Ekiplerimiz kompakt asansörlerimizle dar sokaklarda güvenle hizmet sağlamaktadır.",
    faq: [
      {
        question: "Konya İzmir arası nakliyat kaç gün sürer?",
        answer: "Eşyaların Konya'da yüklenmesi, yolculuk ve İzmir'de kurulup teslim edilmesi toplam 1.5 ila 2 iş günü sürmektedir."
      },
      {
        question: "Çeşme veya Urla gibi ilçelere de gidiyor musunuz?",
        answer: "Evet, İzmir'in Çeşme, Urla, Seferihisar, Aliağa dahil tüm dış ilçelerine nakliyat hizmeti veriyoruz."
      },
      {
        question: "İzmir'de asansör kuruyor musunuz?",
        answer: "Evet, İzmir'deki yeni dairenizin açısı asansör kurulumuna uygunsa mobil teleskopik asansörümüzü kuruyoruz."
      },
      {
        question: "Ödemeyi kredi kartı ile yapabilir miyiz?",
        answer: "Nakit ve banka havalesi birincil ödeme yöntemlerimizdir. Detaylı bilgi için müşteri temsilcimizle görüşebilirsiniz."
      }
    ]
  },
  'konya-antalya-evden-eve-nakliyat': {
    slug: 'konya-antalya-evden-eve-nakliyat',
    city: 'Antalya',
    distanceKm: 300,
    durationHours: 4.5,
    priceRangeMin: 13500,
    priceRangeMax: 19500,
    viaRoute: 'D-696 Seydişehir - Akseki - Manavgat üzerinden Antalya geçişi',
    notes: 'Toros dağ yolları geçişi nedeniyle araçlarımızın fren ve motor kontrolleri her sefer öncesi titizlikle yapılır.',
    introText: "Konya Lider Nakliyat, Konya'dan turizmin başkenti Antalya'nın tüm ilçelerine (Muratpaşa, Konyaaltı, Kepez, Alanya, Manavgat dahil) profesyonel asansörlü evden eve nakliyat hizmeti sunmaktadır. Toros geçişli lojistik hattında deneyimli şoförlerimiz ve kadrolu taşıma ekiplerimizle, eşyalarınızı sıfır hasar ilkesiyle taşıyoruz. Paketlemeden montaja kadar tüm adımlarda sabitleme ve koruma önlemlerini en üst düzeyde uygulayarak Antalya'daki yeni evinize sorunsuzca yerleşmenizi sağlıyoruz.",
    distanceText: "Konya ile Antalya arası karayolu mesafesi yaklaşık 300 kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama 1 gündür. Karayolu sürüş süresi nakliye araçlarımız için yaklaşık 4.5 saattir. Sabah saat 08:00'de Konya'da başlayan yükleme işlemi sonrasında yola çıkan kamyonumuz, öğleden sonra Antalya'daki yeni adresinize ulaşır. Ekiplerimiz aynı gün akşam saatlerine kadar tüm mobilyaları kurarak teslimatı gerçekleştirir.",
    pricingText: "Konya ile Antalya arası nakliyat fiyatları Konya Lider Nakliyat tarafından 13.500 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize K3 belgeli kapalı kasa nakliye kamyonu, profesyonel paketleme malzemeleri, de-montaj ve montaj hizmetleri, sigorta poliçesi ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 13.500 TL ile 15.000 TL arasında değişirken; 2+1 daire taşıma 15.500 TL ile 17.500 TL, 3+1 daire taşıma ise 18.000 TL ile 19.500 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Antalya'ya giden nakliye araçlarımız D-696 Seydişehir-Akseki-Manavgat yolunu kullanır. Güzergâh sırasıyla Konya - Seydişehir - Akseki - Manavgat - Serik - Antalya hattını takip eder. Toros dağları geçişindeki virajlı yollarda ve rampalarda araçlarımızın güvenliği için sürüş hız sınırlarına tam olarak uyulmaktadır.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Konya'da yüklenen eşyalarınız Antalya'daki yeni evinize teslim edilene kadar yol kazaları, doğal afet ve hırsızlık risklerine karşı sigortalanır. Anadolu Sigorta ve diğer lider şirketler güvencesiyle hazırlanan poliçemiz taşınma öncesinde size sunulur.",
    tipsText: "Antalya'ya taşınırken dikkat edilmesi gereken husus, yaz aylarındaki aşırı nem ve sıcaklık nedeniyle beyaz eşyaların ve mobilyaların zarar görmemesi için havalandırmalı özel ambalaj malzemeleri kullanılmasıdır. Ayrıca yüksek katlı sitelerde asansör kurulum alanı bina yönetimiyle görüşülerek önceden rezerve edilmelidir.",
    faq: [
      {
        question: "Konya Antalya nakliyat kaç saat sürer?",
        answer: "İki şehir arası karayolu sürüşü ortalama 4.5 saattir. Yükleme ve boşaltma dahil tüm süreç aynı gün içinde tamamlanır."
      },
      {
        question: "Alanya veya Manavgat ilçelerine taşıma yapıyor musunuz?",
        answer: "Evet, Antalya'nın Manavgat, Alanya, Kemer, Belek, Serik ve diğer tüm ilçelerine günlük nakliyat hizmetimiz mevcuttur."
      },
      {
        question: "Fiyatlarınıza asansör kurulumu dahil mi?",
        answer: "Evet, hem Konya'da hem de Antalya'da asansör kurulumu fiyata dahildir, sonradan ek ücret talep edilmez."
      }
    ]
  },
  'konya-bursa-evden-eve-nakliyat': {
    slug: 'konya-bursa-evden-eve-nakliyat',
    city: 'Bursa',
    distanceKm: 480,
    durationHours: 5.5,
    priceRangeMin: 18500,
    priceRangeMax: 26500,
    viaRoute: 'D-300 ve D-650 Afyonkarahisar - Kütahya - Bozüyük geçişli hat',
    notes: 'Bursa İnegöl mobilya nakliyat trafiği yoğun olduğu için güvenli sürüş kurallarına dikkat edilmektedir.',
    introText: "Konya Lider Nakliyat, Konya'dan Bursa'nın tüm ilçelerine (Nilüfer, Osmangazi, Yıldırım, Mudanya, İnegöl dahil) profesyonel asansörlü ve sigortalı evden eve nakliyat hizmeti vermektedir. 480 kilometrelik Bursa yolculuğunda eşyalarınızın zarar görmemesi için K3 yetki belgeli araç filomuz, tecrübeli şoförlerimiz ve kadrolu marangozlarımızla hizmetinizdeyiz. Sabit fiyat garantisiyle Konya'dan Bursa'ya taşınırken ek ücret sürprizi yaşamazsınız.",
    distanceText: "Konya ile Bursa arası karayolu mesafesi yaklaşık 480 kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama 1 gündür. Nakliye kamyonlarımızın sürüş süresi ortalama 5.5 saattir. Sabah başlanan de-montaj ve yükleme işlemlerinin ardından yola çıkan aracımız aynı gün akşamı veya ertesi gün sabah saatlerinde Bursa'daki yeni adresinize ulaşır ve hemen kurulum işlemlerine başlanır.",
    pricingText: "Konya ile Bursa arası nakliyat fiyatları Konya Lider Nakliyat tarafından 18.500 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize kapalı kasa kamyon, paketleme, de-montaj ve montaj hizmetleri, sigorta poliçesi ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 18.500 TL ile 20.000 TL arasında değişirken; 2+1 daire taşıma 21.000 TL ile 23.000 TL, 3+1 daire taşıma ise 24.000 TL ile 26.500 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Bursa'ya giden nakliye araçlarımız sırasıyla Konya - Akşehir - Afyonkarahisar - Kütahya - Bozüyük - İnegöl - Bursa güzergâhını takip eder. Bu hat şehirlerarası nakliyat için en güvenli karayolu hattıdır. Özellikle İnegöl geçişindeki yoğun mobilya lojistik trafiğinde şoförlerimiz sürüş güvenliği kurallarına tam olarak uymaktadır.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Eşyalarınız Konya'dan yüklendiği andan itibaren Bursa'daki yeni evinize teslim edilip kurulana kadar yaşanabilecek tüm hasarlara karşı sigortalanır. Poliçe evrakı taşınma günü size takdim edilir.",
    tipsText: "Bursa'ya taşınırken dikkat edilmesi gereken husus, özellikle Osmangazi ve Yıldırım gibi eski merkez ilçelerdeki dik yokuşlu sokaklar ve dar yerleşim yerleridir. Bu bölgelerde dış cephe nakliye asansörünün kurulabilmesi için sokak yapısının önceden analiz edilmesi önem taşır. Nilüfer gibi yeni yerleşim bölgelerinde ise site yönetim kurallarına önceden dikkat edilmelidir.",
    faq: [
      {
        question: "Konya Bursa arası nakliyat kaç gün sürer?",
        answer: "Eşyaların yüklenmesi, yolculuk ve Bursa'da yeni adreste kurulup teslim edilmesi toplam 1 iş günü sürmektedir."
      },
      {
        question: "Nilüfer ve Mudanya ilçelerine hizmet veriyor musunuz?",
        answer: "Evet, Nilüfer, Osmangazi, Yıldırım, Mudanya, İnegöl, Gemlik dahil tüm Bursa ilçelerine taşıma yapıyoruz."
      },
      {
        question: "Gardırop montajını kim yapıyor?",
        answer: "Araç ekiplerimizde yer alan kadrolu marangozumuz mobilyalarınızın de-montaj ve montajını ek ücret almadan tamamlar."
      }
    ]
  },
  'konya-adana-evden-eve-nakliyat': {
    slug: 'konya-adana-evden-eve-nakliyat',
    city: 'Adana',
    distanceKm: 350,
    durationHours: 4.5,
    priceRangeMin: 14500,
    priceRangeMax: 21000,
    viaRoute: 'D-330 Konya - Karaman - Ereğli - Adana otoyol bağlantısı',
    notes: 'Adana geçişindeki Toros rampalarında araçlarımızın fren ve motor kontrolleri her sefer öncesi titizlikle yapılır.',
    introText: "Konya Lider Nakliyat, Konya'dan Adana'nın tüm ilçelerine (Çukurova, Seyhan, Yüreğir, Sarıçam dahil) profesyonel asansörlü evden eve nakliyat hizmeti sağlamaktadır. Güvenilir ve uygun fiyatlı taşımacılık ağımız sayesinde eşyalarınızı özenle paketliyor, yüklüyor ve yeni adresinizde montajını tamamlayarak teslim ediyoruz. Lider Nakliyat olarak, Konya-Adana hattındaki günlük seferlerimiz sayesinde müşterilerimize hem ekonomik fiyatlar sunuyor hem de asansörlü taşıma kolaylığı sağlıyoruz.",
    distanceText: "Konya ile Adana arası karayolu mesafesi yaklaşık 350 kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama 1 gündür. Taşınma sabahı saat 08:00'de başlayan yükleme işlemi sonrasında kamyonumuz yola çıkarak yaklaşık 4.5 saatlik sürüşle Adana'ya ulaşır. Adana'daki yeni adresinizde eşyaların indirilmesi ve kurulmasıyla birlikte tüm taşınma süreci aynı gün tamamlanmış olur.",
    pricingText: "Konya ile Adana arası nakliyat fiyatları Konya Lider Nakliyat tarafından 14.500 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize kapalı kasa kamyon, paketleme malzemeleri, de-montaj ve montaj hizmetleri, sigorta poliçesi ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 14.500 TL ile 16.000 TL arasında değişirken; 2+1 daire taşıma 16.500 TL ile 18.500 TL, 3+1 daire taşıma ise 19.000 TL ile 21.000 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Adana'ya giden nakliye araçlarımız D-330 ve varışta Adana otoyolunu kullanır. Konya'dan yola çıkan araçlarımız sırasıyla Karaman - Ereğli - Pozantı güzergâhını geçerek Adana merkeze ulaşır. Pozantı Toros geçişindeki dik rampalarda araçlarımızın güvenliği için hız sınırlarına tam olarak uyulmaktadır.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Eşyalarınız Konya'dan yüklendiği andan itibaren Adana'daki yeni evinize teslim edilip kurulana kadar yaşanabilecek tüm kazalara karşı güvence altındadır.",
    tipsText: "Adana'ya taşınırken dikkat edilmesi gereken husus, yaz aylarındaki aşırı sıcaklık nedeniyle ambalajlama kalitesidir. Ayrıca Çukurova ve Seyhan ilçelerindeki yüksek katlı sitelerde asansör kurulum alanının bina yönetimiyle görüşülerek önceden rezerve edilmesi sürecin aksamasını önler.",
    faq: [
      {
        question: "Konya'dan Adana'ya taşınma kaç saat sürer?",
        answer: "Tüm süreç (paketleme, yükleme, yol ve montaj dahil) ortalama 8 ila 10 saat arasında tamamen bitmektedir."
      },
      {
        question: "Adana'da asansör kuruyor musunuz?",
        answer: "Evet, Adana'daki yeni dairenizde balkon veya pencere açısı asansör kurulumuna uygunsa mobil asansör sistemimizi kuruyoruz."
      },
      {
        question: "Klima söküm ve montajı fiyata dahil mi?",
        answer: "Klima montajı uzmanlık gerektirdiğinden fiyatlarımıza dahil değildir, ancak anlaşmalı klima servisimizle yönlendirme yapabiliriz."
      }
    ]
  },
  'konya-kayseri-evden-eve-nakliyat': {
    slug: 'konya-kayseri-evden-eve-nakliyat',
    city: 'Kayseri',
    distanceKm: 300,
    durationHours: 4,
    priceRangeMin: 12500,
    priceRangeMax: 18500,
    viaRoute: 'D-300 Aksaray - Nevşehir üzerinden Kayseri hattı',
    notes: 'İç Anadolu düz hattında sarsıntısız taşıma için eşyalarınız araç içi sabitleme sistemleriyle korunur.',
    introText: "Konya Lider Nakliyat, Konya'dan İç Anadolu'nun önemli sanayi ve ticaret merkezlerinden Kayseri'nin tüm ilçelerine (Melikgazi, Kocasinan, Talas dahil) profesyonel evden eve nakliyat hizmeti sağlamaktadır. İki şehir arasındaki düz karayolu hattında modern araçlarımız ve kadrolu ekibimizle, eşyalarınızı sıfır hasar ilkesiyle taşıyoruz. Paketlemeden montaja kadar tüm adımlarda Konya Lider Nakliyat güvencesiyle hizmet alırsınız.",
    distanceText: "Konya ile Kayseri arası karayolu mesafesi yaklaşık 300 kilometredir ve teslimat süresi aynı gündür. Sabah başlanan yükleme işleminin ardından yola çıkan aracımız ortalama 4 saatlik bir yolculuk sonrası Kayseri'ye ulaşır. Aynı gün eşyaların yeni adreste kurulumu tamamlanarak teslim edilir.",
    pricingText: "Konya ile Kayseri arası nakliyat fiyatları Konya Lider Nakliyat tarafından 12.500 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize kapalı kasa kamyon, ambalajlama malzemeleri, de-montaj, montaj ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 12.500 TL ile 14.000 TL arasında değişirken; 2+1 daire taşıma 14.500 TL ile 16.000 TL, 3+1 daire taşıma ise 16.500 TL ile 18.500 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Kayseri'ye giden nakliye araçlarımız D-300 Aksaray - Nevşehir karayolunu kullanır. Güzergâh sırasıyla Konya - Aksaray - Nevşehir - Kayseri hattını takip eder. Yol tamamen düz ve bölünmüş yol kalitesinde olduğundan eşyaların sarsılma riski son derece düşüktür.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Sigorta poliçesi, taşınma sabahında adınıza düzenlenerek tarafınıza teslim edilir.",
    tipsText: "Kayseri'ye taşınırken dikkat edilmesi gereken husus, özellikle Melikgazi ve Talas gibi bölgelerde yer alan çok katlı yeni binalarda site yönetimlerinin asansör kurulum alanlarına ve yükleme saatlerine dair kurallarıdır.",
    faq: [
      {
        question: "Konya Kayseri nakliyat kaç saat sürer?",
        answer: "İki şehir arası karayolu sürüşü ortalama 4 saattir. Yükleme ve boşaltma dahil tüm süreç aynı gün içinde tamamlanır."
      },
      {
        question: "Kayseri'de asansörlü taşıma yapıyor musunuz?",
        answer: "Evet, Kayseri'deki yeni dairenizde balkon veya pencere açısı asansör kurulumuna uygunsa mobil asansör sistemimizi kuruyoruz."
      }
    ]
  },
  'konya-eskisehir-evden-eve-nakliyat': {
    slug: 'konya-eskisehir-evden-eve-nakliyat',
    city: 'Eskişehir',
    distanceKm: 330,
    durationHours: 4,
    priceRangeMin: 13000,
    priceRangeMax: 19000,
    viaRoute: 'Yunak - Polatlı veya Afyonkarahisar geçişli kuzey hattı',
    notes: 'Eskişehir Tepebaşı ve Odunpazarı dar sokaklarında küçük nakliye kamyonetlerimizle hizmet sunmaktayız.',
    introText: "Konya Lider Nakliyat, Konya'dan öğrenci kenti Eskişehir'in tüm ilçelerine (Odunpazarı, Tepebaşı dahil) profesyonel asansörlü ve marangozlu evden eve nakliyat hizmeti sunmaktadır. İki şehir arasındaki otoyol ve duble yollar üzerinden K3 belgeli kapalı kasa araçlarımızla, eşyalarınızı sıfır hasar güvencesiyle taşıyoruz.",
    distanceText: "Konya ile Eskişehir arası karayolu mesafesi yaklaşık 330 kilometredir ve teslimat süresi ortalama 1 gündür. Karayolu sürüş süresi nakliye araçlarımız için yaklaşık 4 saattir. Sabah saat 08:00'de Konya'da başlayan yükleme işlemi sonrasında yola çıkan kamyonumuz, öğleden sonra Eskişehir'deki yeni adresinize ulaşır ve montaj işlemlerine başlanır.",
    pricingText: "Konya ile Eskişehir arası nakliyat fiyatları Konya Lider Nakliyat tarafından 13.000 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize kapalı kasa kamyon, paketleme malzemeleri, de-montaj, montaj ve sigorta dahildir. 1+1 daire taşıma fiyatı 13.000 TL ile 14.500 TL arasında değişirken; 2+1 daire taşıma 15.000 TL ile 17.000 TL, 3+1 daire taşıma ise 17.500 TL ile 19.000 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Eskişehir'e giden nakliye araçlarımız Yunak - Polatlı veya Konya - Akşehir - Afyonkarahisar - Seyitgazi - Eskişehir hattını kullanabilir. Yol boyunca şoförlerimiz yasal hız sınırlarına tam olarak uyarak sarsıntısız taşıma sağlar.",
    insuranceText: "Konya Lider Nakliyat şehirlerarası nakliyat seferlerinin tamamını geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Eşyalarınız Konya'dan yüklendiği andan itibaren Eskişehir'deki yeni evinize teslim edilip kurulana kadar sigortalıdır.",
    tipsText: "Eskişehir'e taşınırken dikkat edilmesi gereken husus, Odunpazarı gibi tarihi bölgelerdeki dar sokaklardır. Bu bölgelerde asansör kurulum alanı kısıtlı olabildiğinden taşıma öncesi ekiplerimizce fiziki sokak genişlik kontrolü yapılır.",
    faq: [
      {
        question: "Konya Eskişehir nakliyat kaç saat sürer?",
        answer: "Yükleme ve sürüş dahil tüm süreç ortalama 8 ila 10 saat arasında tamamlanır."
      },
      {
        question: "Eskişehir'de montaj hizmetiniz var mı?",
        answer: "Evet, kadrolu marangozumuz gardıroplarınızı, yatak ve ünitelerinizi Eskişehir'deki yeni adresinizde ücretsiz kurar."
      }
    ]
  },
  'konya-mersin-evden-eve-nakliyat': {
    slug: 'konya-mersin-evden-eve-nakliyat',
    city: 'Mersin',
    distanceKm: 350,
    durationHours: 4.5,
    priceRangeMin: 14500,
    priceRangeMax: 25500,
    viaRoute: 'Karaman - Mut - Silifke (D-715) veya D-330 & O-21',
    notes: 'Sertavul Geçidi veya Pozantı güzergâhı üzerinden yol durumuna göre planlama yapılır.',
    introText: "Konya Lider Nakliyat, Konya'dan Akdeniz'in önemli liman kentlerinden Mersin'in tüm ilçelerine (Mezitli, Yenişehir, Tarsus, Toroslar, Erdemli, Silifke dahil) profesyonel asansörlü, sigortalı ve marangozlu evden eve nakliyat hizmeti sağlamaktadır. Uzun yıllara dayanan deneyimimizle eşyalarınızı Konya'dan Mersin'e sıfır hasar güvencesiyle taşıyoruz.",
    distanceText: "Konya ile Mersin arası karayolu mesafesi tercih edilen güzergâha göre yaklaşık 350 kilometredir. Sabah saatlerinde Konya'daki adresinizde başlayan yükleme işleminin ardından yola çıkan kapalı çelik kasa nakliye aracımız ortalama 5 saatlik sürüşün ardından Mersin'deki yeni adresinize ulaşır ve kurulum işlemlerine başlanır.",
    pricingText: "Konya ile Mersin arası nakliyat fiyatları Konya Lider Nakliyat tarafından 14.500 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize kapalı kasa kamyon, profesyonel paketleme, de-montaj ve montaj, sigorta ve asansör kurulumu dahildir. 1+1 daire taşıma fiyatı 14.500 TL ile 17.500 TL arasında değişirken; 2+1 daire taşıma 18.500 TL ile 21.500 TL, 3+1 daire taşıma ise 22.500 TL ile 25.500 TL arasında bütçelendirilir.",
    routeText: "Konya'dan Mersin'e giden nakliye araçlarımız Karaman-Mut-Silifke (D-715) hattını ya da otoyol konforu sunan D-330 & O-21 (Ereğli-Pozantı-Tarsus) hattını kullanmaktadır. Yol durumları mevsimsel şartlara göre şoförlerimizce analiz edilerek en konforlu rota tercih edilir.",
    insuranceText: "Şehirlerarası nakliyat seferlerimizin tamamı geniş kapsamlı emtia taşıma sigortası kapsamındadır. Eşyalarınız Konya'da kamyona yüklendiği andan itibaren Mersin'deki yeni evinize teslim edilene kadar yaşanabilecek tüm majör risklere karşı sigortalanır.",
    tipsText: "Mersin'e taşınırken dikkat edilmesi gereken husus, özellikle Mezitli ve Yenişehir sahil şeridindeki çok katlı rezidanslarda deniz rüzgârı durumu ve site içi asansör kurulum izinleridir. Taşınma öncesinde bina yönetimiyle asansör kullanım saatlerinin koordine edilmesi önerilir.",
    faq: [
      {
        question: "Konya Mersin nakliyat kaç saat sürer?",
        answer: "Yükleme, yolculuk ve boşaltma dahil tüm süreç ortalama 8 ila 10 saat arasında tamamlanarak aynı gün içinde teslim edilir."
      },
      {
        question: "Yazlık bölgelere (Erdemli, Silifke) taşıma yapıyor musunuz?",
        answer: "Evet, Mersin'in Erdemli, Silifke, Anamur dahil tüm kıyı ve yazlık bölgelerine taşıma hizmetimiz mevcuttur."
      },
      {
        question: "Fiyatlarınıza asansör kurulumu dahil mi?",
        answer: "Evet, her iki adreste de uygunluk durumuna göre dış cephe nakliye asansörünün kurulması teklif fiyatımıza dahildir."
      }
    ]
  },
  'konya-gaziantep-evden-eve-nakliyat': {
    slug: 'konya-gaziantep-evden-eve-nakliyat',
    city: 'Gaziantep',
    distanceKm: 590,
    durationHours: 7.5,
    priceRangeMin: 19500,
    priceRangeMax: 30500,
    viaRoute: 'D-330 & O-21 ve TAG Otoyolu güzergâhı',
    notes: 'TAG Otoyolu otoyol kalitesinde güvenli sürüş sağlar. Nurdağı geçişinde kontrollü hız sınırlarına uyulur.',
    introText: "Konya Lider Nakliyat, Konya'dan bölgenin en büyük sanayi ve yerleşim merkezlerinden Gaziantep'in tüm ilçelerine (Şahinbey, Şehitkamil, Nizip, İslahiye dahil) profesyonel asansörlü ve sigortalı evden eve nakliyat çözümleri sunmaktadır. Geniş araç filomuz ve uzman marangoz kadromuzla taşınmanızı stressiz bir deneyime dönüştürüyoruz.",
    distanceText: "Konya ile Gaziantep arası karayolu mesafesi yaklaşık 590 kilometredir. Sabah Konya'daki dairenizde başlayan de-montaj ve paketleme işlemlerinin ardından yola çıkan nakliye aracımız, ertesi gün sabah saatlerinde Gaziantep'teki yeni adresinize ulaşarak eşyalarınızın asansörle taşınmasını ve kurulumunu gerçekleştirir.",
    pricingText: "Konya ile Gaziantep arası nakliyat fiyatları Konya Lider Nakliyat tarafından 19.500 TL'den başlayarak hesaplanmaktadır. Tekliflerimize kapalı kasa kamyon, profesyonel paketleme malzemeleri, de-montaj, montaj ve sigorta poliçesi dahildir. 1+1 daire taşıma fiyatı 19.500 TL ile 22.000 TL arasında değişirken; 2+1 daire taşıma 23.000 TL ile 26.000 TL, 3+1 daire taşıma ise 27.000 TL ile 30.500 TL arasında bütçelendirilir.",
    routeText: "Gaziantep nakliye araçlarımız Konya - Ereğli - Pozantı - Adana - Osmaniye - Gaziantep güzergâhını takip eder. TAG Otoyolu (O-52) bağlantısı kullanılarak konforlu and sarsıntısız bir karayolu sürüşü hedeflenir.",
    insuranceText: "Şehirlerarası nakliyat operasyonlarımızın tamamı emtia taşıma sigortası ile Anadolu Sigorta güvencesindedir. Eşyalarınız Konya'dan Gaziantep'e ulaşana kadar oluşabilecek kazalara karşı tam bedeli üzerinden teminat altındadır.",
    tipsText: "Gaziantep'in Şahinbey ve Şehitkamil ilçelerindeki bazı yokuşlu ve dar sokaklarda mobil asansör kurulum açısının önceden kontrol edilmesi, taşınma gününün sorunsuz geçmesi açısından önem taşımaktadır.",
    faq: [
      {
        question: "Konya Gaziantep nakliye kaç gün sürer?",
        answer: "Eşyaların yüklenmesi, yolculuk ve Gaziantep'te yeni adrese boşaltılıp monte edilmesi toplamda 2 iş günü sürmektedir."
      },
      {
        question: "Nizip veya İslahiye gibi dış ilçelere de hizmet veriyor musunuz?",
        answer: "Evet, Gaziantep'in Nizip, İslahiye, Nurdağı, Oğuzeli dahil tüm dış ilçelerine nakliyat hizmetimiz mevcuttur."
      },
      {
        question: "Paketleme ve marangozluk işlemlerini kim yapıyor?",
        answer: "Kendi bünyemizde çalışan kadrolu marangozlarımız ve uzman paketleme ekiplerimiz tüm de-montaj ve koruyucu ambalajlama işlemlerini gerçekleştirmektedir."
      }
    ]
  }
};

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

export const ROUTES: readonly RouteConfig[] = Object.values(routesDatabase).map((r) => ({
  slug: r.slug,
  city: r.city,
  distanceKm: r.distanceKm,
  durationHours: r.durationHours,
  priceRangeMin: r.priceRangeMin,
  priceRangeMax: r.priceRangeMax,
  viaRoute: r.viaRoute,
  notes: r.notes
}));

// Rota doğrulama filtresi: Başlangıç şehri (Konya) ile varış şehri aynı olan rotaları engeller
const invalidRoute = ROUTES.find(r => r.city.toLowerCase() === 'konya');
if (invalidRoute) {
  throw new Error(`CRITICAL_CONFIG_ERROR: Intercity route cannot end in starting city 'Konya'! Slug: ${invalidRoute.slug}`);
}

// Rota mesafe ve fiyat aralığı doğrulaması
const invalidRangeRoute = ROUTES.find(
  r => !r.distanceKm || r.distanceKm <= 0 || !r.priceRangeMin || r.priceRangeMin <= 0 || !r.priceRangeMax || r.priceRangeMax <= 0 || r.priceRangeMin >= r.priceRangeMax
);
if (invalidRangeRoute) {
  throw new Error(`CRITICAL_CONFIG_ERROR: Route has invalid distance or price ranges! Slug: ${invalidRangeRoute.slug}`);
}
