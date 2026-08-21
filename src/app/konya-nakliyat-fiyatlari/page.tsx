import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PriceCalculator from '@/components/PriceCalculator';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { ROUTES } from '@/lib/routes-data';
import { FACTS } from '@/lib/facts';
import { ArrowRight, HelpCircle, ShieldAlert, BadgeInfo, Coins, Scale, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import PricingMatrix from '@/components/geo/PricingMatrix';

export const metadata: Metadata = {
  title: 'Konya Evden Eve Nakliyat Fiyatları 2026 | Lider Nakliyat',
  description: "Konya'da ev taşıma maliyetlerini ücretsiz hesaplayın. Selçuklu, Meram, Karatay oda sayıları ve kat durumlarına göre güncel asansörlü nakliye fiyat listesi.",
  alternates: {
    canonical: '/konya-nakliyat-fiyatlari',
  },
};

export default function FiyatlarPage() {
  const pricingFaqs = [
    {
      question: "Konya'da oda sayısına göre ev taşıma fiyatları nasıl değişir?",
      answer: "Konya Lider Nakliyat bünyesinde oda sayısı arttıkça taşınacak eşya hacmi, kullanılacak koruyucu ambalaj malzemesi miktarı ve çalışacak uzman personel sayısı artar. Örneğin, 1+1 dairelerin nakliyesi ortalama 3 personel gerektirirken, 3+1 veya 4+1 daireler marangoz dahil en az 5-6 kişilik bir nakliye ekibi gerektirdiğinden maliyeti doğrudan etkiler."
    },
    {
      question: "Dış cephe mobil eşya asansörünün kurulması fiyatı ne kadar etkiler?",
      answer: "Kat durumuna göre değişmekle birlikte, dış cephe teleskopik mobil eşya asansörü kurulumu taşıma maliyetine kurulum başına ortalama 2.500 TL ekler. Hem yükleme yerinde hem de boşaltma yerinde asansör kurulması gerekirse bu maliyet ikiyle çarpılır ancak binada yük asansörü varsa bu ücretten tasarruf edilebilir."
    },
    {
      question: "Taşıma fiyatına marangoz montaj işçiliği dahil midir?",
      answer: "Evet, Konya Lider Nakliyat tarafından sunulan tüm standart ev taşıma fiyatlarına gardırop, yatak odası üniteleri, TV üniteleri de-montaj ve montaj işlemleri ile çamaşır ve bulaşık makinesi bağlantıları dahildir. Ekstra marangoz montaj işçilik farkı kesinlikle talep edilmez."
    },
    {
      question: "Konya ilçeler arası nakliyat fiyatları mesafeye göre nasıl hesaplanır?",
      answer: "Selçuklu merkezli ana garajımızdan sevk edilen araçların Ilgın, Seydişehir, Beyşehir, Akşehir veya Çumra gibi çevre ilçelere olan uzaklıkları gidiş-dönüş kilometre hesabı yapılarak akaryakıt giderleri üzerinden tablolandırılır. Mesafe uzadıkça yol yevmiyeleri ve yakıt maliyeti toplam fiyata eklenmektedir."
    },
    {
      question: "Sigortalı evden eve taşımacılık ekstra ücrete tabi midir?",
      answer: "Hayır. Konya Lider Nakliyat olarak yürüttüğümüz her nakliye faaliyeti, eşyalarınızın yoldaki kaza, yangın, devrilme gibi hasar risklerine karşı ücretsiz emtia taşıma sigortası kapsamına alınarak gerçekleştirilir. Sigorta poliçesi taşınma öncesinde adınıza düzenlenmektedir."
    },
    {
      question: "Resmi nakliye sözleşmesi taşınma fiyatını nasıl garanti eder?",
      answer: "Ön keşif veya telefon görüşmesi sonrasında mutabık kalınan fiyat, karşılıklı ıslak imzalı sözleşmeye dökülür. Taşınma gününde veya yol bittiğinde ek ücret talebi kesinlikle yapılmaz. Bu sayede taşınma bütçeniz tamamen güvence altına alınmış olur."
    },
    {
      question: "Şehirlerarası nakliyat fiyatlarında otoban ve köprü ücretleri kim tarafından ödenir?",
      answer: "Şehirlerarası nakliye fiyat tekliflerimizde tüm otoban geçiş, otoyol, köprü ve feribot ücretleri Konya Lider Nakliyat’a aittir. Müşterilerimize sonradan yol masrafı adı altında herhangi bir ek gider yansıtılmamaktadır."
    },
    {
      question: "Eşyaların kolilenmesini kendim yaparsam fiyatta indirim yapılır mı?",
      answer: "Evet. Mutfak kırılacakları, giysiler ve ufak tefek kişisel eşyaların kolilenmesi işlemini kendiniz yaptığınızda, nakliye ekibimizin iş yükü ve ambalaj malzemesi sarfiyatı düşeceği için toplam teklif fiyatından ortalama 1.500 TL ile 3.000 TL arasında indirim uygulanır."
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Konya Evden Eve Nakliyat Fiyatları',
        description: "Konya'da ev taşıma maliyetlerini ücretsiz hesaplayın. Selçuklu, Meram, Karatay oda sayıları ve kat durumlarına göre güncel asansörlü nakliye fiyat listesi.",
        slug: 'konya-nakliyat-fiyatlari',
        areaName: 'Konya'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Fiyat Rehberi', url: '/konya-nakliyat-fiyatlari' }
      ]),
      faqSchema(pricingFaqs),
      {
        '@context': 'https://schema.org',
        '@type': 'Offer',
        'priceCurrency': 'TRY',
        'lowPrice': FACTS.priceMin.toString(),
        'highPrice': FACTS.priceMax.toString(),
        'offerCount': '4',
        'valueAddedTaxIncluded': 'false',
        'url': `${SITE.url}/konya-nakliyat-fiyatlari`
      }
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Fiyat Rehberi', url: '/konya-nakliyat-fiyatlari' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold font-bold text-xs tracking-widest">
            ŞEFFAF FİYAT POLİTİKASI
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Konya Evden Eve Nakliyat Fiyatları
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Konya genelinde ev taşıma maliyetlerini belirleyen tüm operasyonel etkenler ve güncel bütçe tarifeleri bu sayfada listelenmektedir. Konya Lider Nakliyat olarak, tüm taşınma bütçelerinizi şeffaf bir şekilde analiz etmeniz için interaktif hesaplama robotumuzu sunuyoruz.
          </p>
        </section>

        {/* Technical Definitions Section */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-3">
            <span className="font-bold text-forest text-sm block">Ev Taşıma Sektörüne Özgü Teknik Tanımlamalar:</span>
            <ul className="list-disc list-inside text-xs text-charcoal space-y-1.5 pl-2">
              <li><strong>K3 Yetki Belgesi:</strong> Ev ve ofis eşyalarının ticari araçlarla karayolunda taşınması için Ulaştırma Bakanlığı tarafından zorunlu kılınan yasal yetki belgesidir.</li>
              <li><strong>Mobil dış cephe asansörü:</strong> Yüksek katlı binalardaki eşyaların bina içi merdivenlere sokulmadan pencere veya balkondan nakliye aracına transfer edilmesini sağlayan teleskopik platform sistemidir.</li>
              <li><strong>Emtia nakliyat sigortası:</strong> Eşyaların taşıma esnasında karşılaşabileceği kaza, yangın ve hırsızlık gibi riskleri yasal teminat altına alan poliçe türüdür.</li>
              <li><strong>Ekspertiz:</strong> Taşınma öncesinde eşya hacmi, kat durumu ve asansör gereksinimlerinin yerinde incelenerek net bütçenin belirlenmesi sürecidir.</li>
              <li><strong>Demontaj:</strong> Gardırop ve yatak odası takımı gibi büyük mobilyaların taşınabilir parçalara ayrılması işlemidir.</li>
            </ul>
          </div>
        </section>

        {/* Price Calculator Section */}
        <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center mb-8">
            <h2 className="font-display font-black text-forest text-2xl md:text-3xl">
              Dairenizin Taşınma Bütçesi Nasıl Hesaplanır?
            </h2>
            <p className="text-charcoal text-sm max-w-xl mx-auto">
              Konya Lider Nakliyat maliyet hesaplayıcı robotumuz, dairenizin oda durumunu ve asansör gereksinimlerini analiz ederek tahmini bütçeyi anında çıkartır.
            </p>
          </div>
          <PriceCalculator />
        </section>

        {/* Section 1: Konya'da Ev Taşıma Ne Kadar Tutar? */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Konya'da Ev Taşıma Ne Kadar Tutar?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya'da ev taşıma maliyetleri 2026 yılı itibarıyla oda sayısına, asansör durumuna ve mesafeye bağlı olarak ortalama ₺12.000 ile ₺28.000 arasında değişmektedir. Eşyaların hacmi, taşınacak katların yükseklikleri, ambalajlama ve paketleme kalitesi ile marangozluk işçiliği bu bütçe aralığını doğrudan belirleyen temel bileşenlerdir.
            </p>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Daire büyüklüğü, nakliyat sürecinde görev alacak personel sayısını ve kullanılacak araç boyutunu belirler. Örneğin, küçük boyutlu 1+1 daireler genellikle 3 personel ve küçük boy bir kamyonet ile taşınabilirken, 3+1 ve daha büyük dairelerin transferi en az 5-6 kişilik profesyonel nakliye ekibini ve büyük boy çelik kapalı kasa kamyonları gerektirir. Bu durum, operasyon maliyetlerini ve ambalaj malzemesi sarfiyatını doğrudan etkiler.
            </p>
            
            <PricingMatrix />
          </div>
        </section>

        {/* Section 2: Nakliyede Fiyatı Belirleyen 8 Faktör */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Nakliyat Fiyatını Belirleyen 8 Faktör Nelerdir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Evden eve nakliye tekliflerinde yer alan bütçe aralıkları, sekiz ana lojistik kalemin birleşiminden meydana gelmektedir. Bu etkenler, her müşterinin taşınma şartlarına göre ayrı ayrı hesaplanır:</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">1. Oda Sayısı ve Eşya Hacmi (Etki Oranı: %30)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Evdeki oda sayısı arttıkça taşınacak eşyaların kapladığı net metreküp hacmi artar. Bu durum, kullanılacak havalı patpat naylon rulo miktarını, koli sayısını ve çalışacak personel yevmiyelerini belirleyen en temel maliyet etkenidir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">2. Bulunulan Kat Yükseklikleri (Etki Oranı: %15)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Eşyaların taşınacağı çıkış ve varış kat durumları yükseldikçe personelin eşya taşıma süresi ve harcayacağı efor katlanır. Asansörsüz yüksek katlar ek beden işçiliği yevmiyesi gerektirmektedir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">3. Eşya Asansörü Kurulum Talebi (Etki Oranı: %20)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Yüksek katlı modern sitelerde bina yönetimleri bina içi asansörle taşımayı yasakladığı için dış cephe mobil eşya asansörü kurulması operasyonel bir zorunluluktur. Kurulacak asansör sayısı (sadece yüklemede veya hem yükleme hem teslimatta) fiyata yansır.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">4. Güzergah ve Karayolu Mesafesi (Etki Oranı: %15)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Yükleme noktası ile teslimat adresi arasındaki kilometre farkı, kamyon veya tırlarımızın yakıt tüketimini ve amortisman giderlerini belirler. Konya şehiriçi, çevre ilçeler ve şehirlerarası taşımalarda km katsayıları farklıdır.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">5. Ambalajlama ve Kolileme Kapsamı (Etki Oranı: %10)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Mutfak kırılacak eşyalarının, bardakların, porselenlerin ve giysilerin koli içine yerleştirilmesi işini nakliye firmasının yapması durumunda ek işçilik ve sarf malzemesi gideri bütçeye eklenmektedir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">6. Marangozluk ve Tesisat Kurulumları (Etki Oranı: %5)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Yatak odası gardırobunun, raylı dolapların, yatak ünitelerinin sökümü ve montajı ile çamaşır, bulaşık makinesi, kurutma makinesi tesisat bağlantıları için görevlendirilecek sertifikalı marangoz ustası işçiliğidir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">7. Taşınma Sezonu ve Gün Tercihi (Etki Oranı: %5)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Tayin dönemleri, memur atamaları ve düğünlerin yoğun olduğu yaz aylarında (Haziran-Eylül) nakliye talebi aşırı yükselir. Hafta sonu ve ay sonlarında oluşan yoğunluklar fiyatlarda dalgalanma yaratabilir.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-forest text-base">8. Özel Ağır Yüklerin Varlığı (Etki Oranı: Sabit Ek Maliyet)</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Evde yer alan çelik para kasaları, kuyruklu veya duvar piyanoları, dev akvaryumlar, antika mobilyalar gibi özel askı takımı, taşıma lifleri ve ekstra kas gücü gerektiren ağır eşyalar için sabit ek işçilik yansıtılır.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Detailed Questions */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Asansörlü Taşıma Fiyata Ne Kadar Ekler?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat tarafından kullanılan dış cephe mobil teleskopik eşya asansörleri, yüksek katlı binalardaki eşyaların bina içi merdivenlere sokulmadan pencere veya balkondan nakliye aracına transfer edilmesini sağlayan teleskopik platform sistemidir. Konya Lider Nakliyat asansör filosu bünyesindeki araçların tek taraflı kurulum maliyeti 2.500 TL olarak yansıtılmaktadır. Hem yükleme yerinde hem de teslimat yerinde asansör kurulması gerekirse asansör maliyeti 5.000 TL olarak fiyata yansır. Binada yük asansörü olması ve site yönetiminin buna izin vermesi durumunda bu ücretten tasarruf sağlanmaktadır.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Paketleme Hizmeti Fiyatı Nedir?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Profesyonel eşya paketleme ve ambalajlama hizmetlerimiz, mobilya ve beyaz eşyaların kalın havalı ambalaj naylonları ile sarılması ve mutfak kırılacaklarının kolilenmesini kapsar. Paketleme hizmetimiz daire büyüklüğüne göre 1.500 TL ile 4.500 TL arasında bir maliyet oluşturur. Bu bedel, kullanılan Kraft kutu, koli bandı, balonlu patpat naylon rulo maliyeti ve paketleme işçilik yevmiyesini karşılamaktadır. Eşyaların kolilenmesini kendiniz yaptığınızda bu bedelden tasarruf edebilirsiniz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl">
              Şehirlerarası Taşıma Fiyatı Nasıl Hesaplanır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Şehirlerarası ev taşıma fiyatları, Selçuklu merkez garajımızdan çıkış yapacak aracın gideceği hedef şehir arasındaki kilometre bazlı mesafe hesabı yapılarak belirlenmektedir. Hesaplama formülü şu şekildedir:
            </p>
            <div className="bg-forest/5 border border-forest/10 rounded-xl p-5 text-center font-display font-bold text-forest text-xs md:text-sm">
              Mesafe Ücreti = [Gidilecek Yol Mesafesi (Km) × Yakıt Katsayısı (₺12)] + Otoban/Köprü Geçiş Giderleri + Sürücü Harcırahları
            </div>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat tarafından sıkça taşıma yapılan bazı şehirlerarası hatlar ve tahmini taşıma fiyatları tablosu:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <caption>Konya Çıkışlı Şehirlerarası Ev Taşıma Rota ve Fiyat Listesi</caption>
                <thead>
                  <tr className="bg-forest text-white">
                    <th scope="col" className="p-3 font-display rounded-tl-lg">Rota / Güzergah</th>
                    <th scope="col" className="p-3 font-display">Mesafe (Km)</th>
                    <th scope="col" className="p-3 font-display rounded-tr-lg">Ortalama Fiyat Aralığı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light">
                  {ROUTES.map((route) => (
                    <tr key={route.slug} className="hover:bg-off-white/50">
                      <th scope="row" className="p-3 font-bold text-forest">
                        Konya - {route.city} Nakliyat
                      </th>
                      <td className="p-3">{route.distanceKm} km</td>
                      <td className="p-3 font-semibold text-gold-text">
                        ₺{route.priceRangeMin.toLocaleString('tr-TR')} - ₺{route.priceRangeMax.toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Ucuz Nakliyat Teklifi Neden Pahalıya Patlar? */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <ShieldAlert className="w-6.5 h-6.5 text-gold" />
              <span>Ucuz Nakliyat Teklifi Neden Pahalıya Patlar?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              İnternet arama sonuçlarında piyasa rayicinin yarı fiyatına teklif vererek müşteri çekmeye çalışan korsan komisyoncu nakliye siteleri, taşınma gününüzü kabusa çevirebilir. Bu sitelerin yasal K3 yetki belgesi bulunmadığı gibi vergi mükellefiyeti de yoktur. Ucuz nakliyat ilanlarının barındırdığı dört büyük tehlike şunlardır:
            </p>
            <div className="space-y-4 text-xs md:text-sm text-charcoal">
              <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                <span className="font-bold text-forest block">1. Kapora Dolandırıcılığı Tuzağı</span>
                <p className="text-charcoal/90">
                  Sahte profillerle piyasa fiyatının çok altında teklif verip, rezervasyon bahanesiyle yüksek kapora talep eden korsan acenteler, taşınma günü telefonlarını kapatarak kapora bedelini gasp etmekte ve adrese araç göndermemektedir.
                </p>
              </div>
              
              <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                <span className="font-bold text-forest block">2. Yol Ortasında Fiyat Artırma Şantajı</span>
                <p className="text-charcoal/90">
                  Eşyalarınızı kamyona yarı yarıya yükledikten veya araç yola çıktıktan sonra "eşyalarınız fazlaymış, asansör açısı uzaktı" gibi bahanelerle eşyalarınızı rehin tutarlar. Taşınmanın tamamlanması için sizden zorla anlaşılan rakamın iki katı ek ödemeler talep ederler.
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                <span className="font-bold text-forest block">3. Emtia Taşıma Sigortası Eksikliği</span>
                <p className="text-charcoal/90">
                  Korsan firmalar adınıza sigorta poliçesi düzenlemez. Yol esnasında meydana gelebilecek kaza, yangın, devrilme veya hırsızlık durumunda eşyalarınız tamamen yok olsa dahi zararınızı tahsil edebileceğiniz yasal bir muhatap bulamazsınız.
                </p>
              </div>

              <div className="border-l-4 border-rose-500 pl-4 space-y-1">
                <span className="font-bold text-forest block">4. Vasıfsız Günlük İşçiler ve Hasar Riski</span>
                <p className="text-charcoal/90">
                  Ucuza çalışan firmalar kadrolu profesyonel personel yerine dışarıdan günlük yevmiyeli vasıfsız işçiler görevlendirir. Mobilyaların söküm ve montajı doğru aletlerle yapılmadığı için gardıroplarınız ve beyaz eşyalarınız kalıcı hasar görür.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Fiyat Teklifi Alırken Sorulması Gereken 10 Soru */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Scale className="w-6 h-6 text-gold" />
              <span>Fiyat Teklifi Alırken Sorulması Gereken 10 Soru Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Hangi taşıma firmasıyla anlaşırsanız anlaşın, taşınma gününde mağduriyet yaşamamak adına aşağıdaki on soruluk kontrol listesini firmaya yöneltip teyit almanız yasal haklarınızı korumak adına zorunludur:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-charcoal">
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">1.</span>
                <span>Firma adına kayıtlı yasal Karayolu K3 Yetki Belgeniz var mı?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">2.</span>
                <span>Anlaştığımız bu fiyat taşınma günü kesinlikle sabit kalacak mı?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">3.</span>
                <span>Taşıma ekibinde gardırop montajını yapacak sertifikalı marangoz var mı?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">4.</span>
                <span>Eşyaların tamamı için adıma emtia taşıma sigortası düzenlenecek mi?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">5.</span>
                <span>Kullanılacak ambalaj malzemeleri kalın balonlu patpat naylonlardan mı oluşuyor?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">6.</span>
                <span>Fiyat teklifine dış cephe mobil asansör kurulum ücreti dahil midir?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">7.</span>
                <span>Çalışacak personel yevmiyeli işçi mi yoksa kadrolu çalışanınız mı?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">8.</span>
                <span>Yeni evde çamaşır ve bulaşık makinesinin tesisat bağlantılarını yapıyor musunuz?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">9.</span>
                <span>Taşınma öncesinde karşılıklı ıslak imzalı nakliye sözleşmesi imzalayacak mıyız?</span>
              </div>
              <div className="flex gap-2.5 bg-off-white p-3 rounded-lg border border-gray-light/60">
                <span className="text-gold font-bold font-mono">10.</span>
                <span>Taşıma sonrasında resmi irsaliyeli fatura düzenliyor musunuz?</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: FAQ section */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold" />
              <span>Konya Nakliyat Fiyatları Hakkında Sıkça Sorulan Sorular Nelerdir?</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {pricingFaqs.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-forest block mb-1">{item.question}</span>
                  <p className="text-charcoal/95 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal links & Related links */}
        <section className="py-8 max-w-4xl mx-auto px-4">
          <RelatedLinks currentSlug="konya-nakliyat-fiyatlari" type="blog" title="Yararlı Bağlantılar ve Rehberler" />
        </section>
      </main>
    </>
  );
}
