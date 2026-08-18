import QuoteForm from '@/components/QuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import React from 'react';
import { FACTS } from '@/lib/facts';
import PricingMatrix from '@/components/geo/PricingMatrix';
import PackingSpecs from '@/components/geo/PackingSpecs';
import K3InfoBlock from '@/components/geo/K3InfoBlock';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { ArrowRight, HelpCircle, Shield, Truck, Package, CheckCircle2, BadgeAlert, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konya Parça Eşya Taşıma | Lider Nakliyat',
  description: "Konya'da tek parça, az eşya veya öğrenci evi taşımacılığı. Uygun fiyatlı parça eşya nakliye tır ve kamyonetlerimizle hızlı taşıma hizmeti.",
  alternates: {
    canonical: '/hizmetler/parca-esya-tasima',
  },
};

export default function ParcaEsyaTasimaPage() {
  const parcaFaqs = [
    {
      question: 'Parça eşya taşıma fiyatları nasıl belirlenir?',
      answer: 'Parça eşya taşıma fiyatları taşınacak eşyaların kaplayacağı hacme (kasa payına), yükleneceği ve teslim edileceği dairelerin kat durumlarına, asansör ihtiyacına ve adresler arası yol mesafesine göre hesaplanır. Komple ev taşıma maliyetine kıyasla son derece bütçe dostudur.'
    },
    {
      question: 'Öğrenci evi veya bekar evi için asansörlü araç gönderiyor musunuz?',
      answer: 'Evet. Taşınacak parça eşyaların bulunduğu veya teslim edileceği daireler yüksek kattaysa ve bina yönetimi yük taşımaya izin vermiyorsa, parça taşıma işlemleriniz için de mobil dış cephe asansörlerimizi aktif şekilde kuruyoruz.'
    },
    {
      question: 'Tek bir buzdolabı veya çamaşır makinesi için nakliye hizmetiniz var mı?',
      answer: 'Evet. Tek parça beyaz eşya, koltuk takımı, gardırop veya sadece birkaç koli gibi tekil eşyalarınız için küçük kapalı kasa kamyonetlerimizle şehir içi trafikte pratik, güvenli ve son derece hızlı nakliye çözümleri sunmaktadır.'
    },
    {
      question: 'Şehirlerarası parça eşya taşıma yapıyor musunuz?',
      answer: 'Evet. Konya merkezli Selçuklu garajımızdan Ankara, İstanbul, İzmir, Bursa ve diğer tüm şehirlere düzenli olarak sefer yapan parsiyel taşıma tırlarımızla, tekil eşyalarınızı çok uygun ve avantajlı maliyetlerle adrese teslim gönderiyoruz.'
    },
    {
      question: 'Parça eşyaların ambalajlanması ve marangozluğu fiyata dahil midir?',
      answer: 'Evet. Taşıdığımız parça eşyaların yolculuk esnasında çizilmemesi ve hasar görmemesi için balonlu ambalaj patpatlarıyla sarılması ile dolap/ünite gibi de-montaj gerektiren mobilyaların marangoz ustamızca yapılması fiyata dahildir.'
    },
    {
      question: 'Taşıma gününden kaç gün önce rezervasyon yaptırmalıyım?',
      answer: 'Özellikle şehirlerarası parça taşıma ve parsiyel gönderim taleplerinde araç koordinasyonu ve sefer planlaması yapabilmemiz için taşınma tarihinden en az 4-5 gün önce bizimle iletişime geçip yerinizi rezerve etmenizi öneririz.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Konya Parça Eşya Taşıma',
        description: "Konya'da tek parça, az eşya veya öğrenci evi taşımacılığı. Uygun fiyatlı parça eşya nakliye tır ve kamyonetlerimizle hızlı taşıma hizmeti.",
        slug: 'hizmetler/parca-esya-tasima',
        areaName: 'Konya'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetler', url: '/hizmetler/sehirici-evden-eve-nakliyat' },
        { name: 'Parça Eşya Taşıma', url: '/hizmetler/parca-esya-tasima' }
      ]),
      faqSchema(parcaFaqs)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Lojistik Hizmetler', url: '/#hizmetlerimiz' }, { name: 'Parça Eşya Taşıma', url: '/hizmetler/parca-esya-tasima' }]} className="pt-4" />
                {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest">
            HIZLI KAMYONET & PARSİYEL TAŞIMA
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Konya Parça Eşya Taşıma
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Tek bir buzdolabından öğrenci evi eşyalarına, tekli koltuktan az sayıda koliye kadar tüm parça eşyalarınızı kapalı kasa kamyonetlerimizle uygun fiyatlara hizmet vermektedir.
          </p>
        </section>

        {/* Detailed SEO Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Giriş */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange" />
              <span>Ekonomik Parça Eşya Taşıma Çözümleri Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Tüm evi taşımak yerine sadece belirli odaların veya tekil eşyaların nakledilmesi gerektiğinde, komple nakliye kamyonu kiralamak gereksiz yüksek maliyetler yaratır. Lider Nakliyat olarak, Konya genelinde parça eşya taşıma hizmetimizle müşterilerimize bütçe dostu alternatifler sunmaktadır. Kendi filomuzda yer alan küçük şasili 3.5 tonluk panelvan ve kamyonet araçlarımızla, az miktardaki eşyalarınızı şehir içi dar sokaklarda bile trafiğe takılmadan hızlıca hizmet vermektedir. Şehirlerarası parça gönderimlerinizde ise aynı güzergaha giden diğer müşterilerimizin eşyalarıyla birleştirerek (parsiyel taşımacılık) yol maliyetini bölüşmenizi hizmet vermektedir.
            </p>
          </div>

          {/* Section 2: Örnek Senaryolar */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Package className="w-6 h-6 text-orange" />
              <span>Sıkça Karşılaşılan Parça Taşıma Senaryoları Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Firmamız, Konya Selçuklu ve Meram başta olmak üzere her türlü kısmi eşya taşıma ihtiyacınıza özel araç ve ekip sağlamaktadır. En sık hizmet verdiğimiz senaryolar şunlardır:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-charcoal">
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-navy text-sm block">1. Öğrenci ve Bekar Evi Taşıma</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Genellikle 1+1 veya sadece yatak odası, buzdolabı, masa gibi kısıtlı hacme sahip evlerin hızlı ve ekonomik kapalı kasa araçlarla taşınması.</p>
              </div>
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-navy text-sm block">2. Tekil Beyaz Eşya veya Mobilya Alımı</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Mağazadan veya ikinci el platformlarından satın aldığınız buzdolabı, çamaşır makinesi, gardırop gibi tekil eşyaların adresten alınıp kurulması.</p>
              </div>
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-navy text-sm block">3. Tek Koltuk Takımı veya Köşe Takımı</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Evler arası veya hediye olarak gönderilen tekli koltuk, kanepe, oturma grubu gibi hacimli mobilyaların hasarsız ambalajlanıp nakledilmesi.</p>
              </div>
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-navy text-sm block">4. Büro ve Ofis Masası Transferleri</span>
                <p className="text-xs leading-relaxed text-charcoal/90">İş yerlerinde departman değişiklikleri veya şubeler arası gönderilmesi gereken evrak dolapları, ofis masaları ve sandalyelerinin taşınması.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Güvenceler ve Paketleme */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Truck className="w-6 h-6 text-orange" />
              <span>Parça Eşya Taşırken Hasarsızlık Garantisi Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Az sayıda eşyanın taşınması, onların değersiz olduğu anlamına gelmez. Lider Nakliyat olarak, parça taşıma operasyonlarında da komple ev taşıma standartlarımızı harfiyen uyguluyoruz. Taşınacak beyaz eşyanız veya mobilyanız, darbe emici kalın hava kabarcıklı balonlu patpat naylonlarla sarılır, köşeleri koruyucu mukavemet bantlarıyla sabitlenir. Kamyonet kasasına yerleştirilirken diğer eşyalara sürtünmemesi ve yoldaki sarsıntılardan etkilenmemesi için araç içi sabitleme kayışlarıyla (spatula) bağlanır. Tüm transferlerimiz yasal K3 yetki belgemize kayıtlı kapalı kasa araçlarımızla, faturalı ve sigortalı olarak yapılır.
            </p>
          </div>

          {/* Section 4: Fiyatlandırma Kriterleri */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange" />
              <span>Parça Eşya Fiyatlarını Belirleyen Kriterler Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Parça eşya taşıma fiyatları komple taşıma ücretlerine kıyasla çok daha ekonomiktir. Fiyatlar belirlenirken eşyaların net ölçüleri (kaplayacağı metreküp hacmi), yükleneceği kat durumu, asansör ihtiyacı ve iki adres arasındaki toplam kilometre mesafesi dikkate alınır. Örneğin, asansörlü 2. kattan asansörlü 4. kata taşınacak tek bir çamaşır makinesi ile asansörsüz 5. kata taşınacak 10 koli ve koltuk takımının işçilik maliyeti farklı olmaktadır. Ekiplerimiz, eşya durumunuzu gösteren fotoğrafları inceleyerek telefonda anında net ve sabit fiyat teklifi sunmaktadır.
            </p>
          </div>

          {/* Section 5: Şehirlerarası Parsiyel Taşımacılık */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Truck className="w-6 h-6 text-orange" />
              <span>Şehirlerarası Parsiyel Eşya Nakliyatı Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Konya'dan Türkiye'nin diğer illerine az sayıda eşya göndermek istediğinizde parsiyel taşımacılık hizmetimiz devreye girer. Haftalık olarak İstanbul, Ankara, İzmir, Bursa, Antalya gibi büyükşehirlere sefer düzenleyen geniş hacimli nakliyat tırlarımız, aynı güzergah üzerindeki parça eşyaları belirli bir plan çerçevesinde toplar. Eşyalarınız kasada diğer müşterilerin eşyalarıyla karışmaması için ara bölmelerle ayrılır ve teslimat sırasında listeye göre teker teker indirilerek yerinde kurulumu yapılır. Bu sayede tüm yol masrafları (yakıt, köprü geçişleri) bölündüğü için nakliye ücretiniz yarı yarıya düşmektedir.</p>
          </div>

          {/* Section 6: Kamyonet Kiralama vs Lider Nakliyat */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange" />
              <span>Sahibinden Kamyonet Kiralama ile Profesyonel Hizmet Farkı Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat güvencesi olmadan, tüketicilerin bir kısmı parça eşyalarını taşımak için internetten veya sanayi sitelerinden şoförlü kamyonet kiralamayı tercih etmektedir. Ancak bu durum genellikle hasar ve yasal sorunlara yol açar. Kiralık kamyonet şoförleri eşya taşımaya, ambalajlamaya ve de-montaj işlemlerine yardımcı olmazlar, sadece aracı sürerler. Eşyaları merdivenden indirmek, sarmak ve araca yüklemek tamamen size kalır. Oysa Lider Nakliyat parça eşya hizmetinde kendi kadrolu taşıma personeli, marangoz ustası, ambalaj malzemeleri ve mobil dış cephe asansörüyle birlikte gelerek anahtar teslim taşımacılık gerçekleştirir.
            </p>
          </div>

          {/* Section 7: Parça Eşya Sigortası */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange" />
              <span>Kısmi ve Parça Eşya Taşıma Sigorta Şartları Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Az miktarda eşya taşınsa dahi yolda oluşabilecek kaza, devrilme veya yangın gibi risklere karşı güvence altında olmanız gerekir. Lider Nakliyat olarak, parça eşya taşıma işlemlerimizin tamamında nakliye sigortasını standart olarak yapmaktayız. Taşınma öncesinde eşyanızın cinsi ve tahmini piyasa değeri tespit edilerek poliçeye işlenir. Yolculuk esnasında meydana gelebilecek hasarlar sigorta acentemiz tarafından karşılanır. Güvenliğiniz ve memnuniyetiniz bizim için her zaman ön plandadır.
            </p>
          </div>

          {/* Internal Links Navigation Area */}
          <div className="bg-navy/5 border border-navy/10 rounded-xl p-6 space-y-4">
            <span className="font-bold text-navy text-sm block">Yararlı Bağlantılar ve Rehberler</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Link href="/konya-nakliyat-fiyatlari" className="text-orange-text hover:underline font-bold">
                → Konya Evden Eve Nakliyat Fiyatları
              </Link>
              <Link href="/teklif-al" className="text-orange-text hover:underline font-bold">
                → Ücretsiz Nakliye Teklif Formu
              </Link>
              <Link href="/hizmetler/sehirici-evden-eve-nakliyat" className="text-orange-text hover:underline font-bold">
                → Şehiriçi Evden Eve Taşıma Hizmetleri
              </Link>
              <Link href="/hizmetler/esya-depolama" className="text-orange-text hover:underline font-bold">
                → Kiralık Eşya Depolama Hizmetleri
              </Link>
              <Link href="/bolgeler/selcuklu-evden-eve-nakliyat" className="text-orange-text hover:underline font-bold">
                → Selçuklu Bölgesi Nakliye Çözümleri
              </Link>
              <Link href="/bolgeler/meram-evden-eve-nakliyat" className="text-orange-text hover:underline font-bold">
                → Meram Bölgesi Nakliye Çözümleri
              </Link>
              <Link href="/tasinma-kontrol-listesi" className="text-orange-text hover:underline font-bold">
                → İnteraktif Taşınma Kontrol Çizelgesi
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange" />
              <span>Parça Eşya Taşıma Hakkında Sıkça Sorulanlar</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {parcaFaqs.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-navy block mb-1">{item.question}</span>
                  <p className="text-charcoal/95 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-navy text-xl md:text-2xl border-b border-gray-light pb-3">
              Hızlı ve Sabit Fiyat Teklifi Hesaplayın
            </h3>
            <QuoteForm isInline={true} />
          </div>

        </section>
      </main>
    </>
  );
}
