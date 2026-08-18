import QuoteForm from '@/components/QuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import { HelpCircle, Shield, Warehouse, Building, ClipboardCheck, Scale, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konya Eşya Depolama Hizmeti | Lider Depolama',
  description: "Konya'da aylık kiralık eşya depolama çözümleri. Güvenlik kameralı, rutubetsiz ve sigortalı konteyner depolarımızda eşyalarınızı güvenle saklayın.",
  alternates: {
    canonical: '/hizmetler/esya-depolama',
  },
};

export default function EsyaDepolamaPage() {
  const depolamaFaqs = [
    {
      question: 'Kiralık eşya depoları güvenli midir ve nasıl korunur?',
      answer: 'Depolarımız 24 saat kesintisiz olarak aktif yüksek çözünürlüklü güvenlik kameraları (CCTV) ve lisanslı fiziki güvenlik personeli tarafından titizlikle korunmaktadır. Ayrıca tüm alanlarımız emniyet güçleriyle entegre çalışan akıllı yangın, duman ve hırsızlık alarm sistemlerine bağlıdır.'
    },
    {
      question: 'Nem ve rutubete karşı depolarda ne tür önlemler alınıyor?',
      answer: 'Depolama alanlarımız endüstriyel nem alma üniteleri ile sürekli havalandırılmakta ve hava sirkülasyonu sağlanmaktadır. Zeminler ve duvarlar rutubet yalıtımlı özel poliüretan malzemelerle kaplanarak ahşap mobilyalarınızın ve beyaz eşyalarınızın küflenmesi, paslanması kesinlikle engellenmektedir.'
    },
    {
      question: 'Depolama sürecinde haşere ve böcek ilaçlaması yapılıyor mu?',
      answer: 'Evet. Depolama tesislerimizin tamamı her ay periyodik olarak profesyonel çevre sağlığı ekipleri tarafından haşere, böcek, uçan haşereler ve kemirgenlere karşı hijyenik ve çevre dostu ilaçlama yöntemleriyle ilaçlanmaktadır.'
    },
    {
      question: 'Minimum depolama kiralama süresi ne kadardır?',
      answer: 'Minimum kiralama süremiz 1 (bir) aydır. Eşyalarınızı dilediğiniz ay kadar güvenli tesislerimizde depolayabilir, süre uzatımlarını veya depo teslim alma tarihlerinizi 1 hafta öncesinden bildirebilirsiniz.'
    },
    {
      question: 'Depodaki eşyalar için sigorta yapılıyor mu?',
      answer: `Evet. Depoladığımız tüm eşyalar, akredite sigorta şirketlerimiz aracılığıyla düzenlenen poliçe bedeli kapsamında yangın, sel, su baskını, deprem ve hırsızlık risklerine karşı ücretsiz emtia depolama sigortası kapsamına alınmaktadır.`
    },
    {
      question: 'Depoya eşya teslim ederken veya geri alırken prosedür nasıldır?',
      answer: 'Giriş ve çıkışlarda tüm eşyalarınız fotoğraflı ve yazılı olarak barkodlu bir şekilde listelenir, eşyaların genel kondisyonu not edilir ve karşılıklı yasal teslim tutanağı imzalandıktan sonra güvenli depomuza yerleştirilir.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Konya Eşya Depolama Hizmeti',
        description: "Konya'da aylık kiralık eşya depolama çözümleri. Güvenlik kameralı, rutubetsiz ve sigortalı konteyner depolarımızda eşyalarınızı güvenle saklayın.",
        slug: 'hizmetler/esya-depolama',
        areaName: 'Konya'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetler', url: '/hizmetler/sehirici-evden-eve-nakliyat' },
        { name: 'Eşya Depolama', url: '/hizmetler/esya-depolama' }
      ]),
      faqSchema(depolamaFaqs)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Kurumsal Çözümler', url: '/#hizmetlerimiz' }, { name: 'Eşya Depolama', url: '/hizmetler/esya-depolama' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest">
            KİRALIK KONTEYNER DEPOLARI
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Konya Eşya Depolama Hizmeti
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Ev veya iş yeri eşyalarınızı, Konya Selçuklu merkezli güvenlik kameralı, rutubetsiz, sigortalı ve kişiye özel kiralık konteyner depolarımızda güvenle saklıyoruz.
          </p>
        </section>

        {/* Detailed SEO Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Giriş */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange" />
              <span>Konya Eşya Depolama Hizmetinin Yasal ve Fiziki Güvenceleri Nelerdir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat, ev tadilatı, yurt dışı seyahatleri, evlilik öncesi çeyiz saklama veya fazla büro malzemelerinin muhafazası gibi ihtiyaçlara yönelik güvenli depolama çözümleri sunmaktadır. Emtia nakliyat sigortası, eşyaların taşıma ve depolama esnasında karşılaşabileceği kaza, yangın ve hırsızlık gibi riskleri yasal teminat altına alan poliçe türüdür. Ekspertiz süreci, depolanacak eşyaların hacminin yerinde incelenerek bütçe ve konteyner boyutu tespiti yapılması sürecidir. Depolanacak tüm mobilya ve beyaz eşyalarınız, tecrübeli ambalajlama Konya Lider Nakliyat ekipleri tarafından de-monte edildikten sonra neme dayanıklı özel saklama naylonlarıyla paketlenir. Ardından kişiye özel tahsis edilen anahtarlı çelik konteyner depolarımıza yerleştirilir.
            </p>
          </div>

          {/* Section 2: Konteyner Ölçüleri */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Warehouse className="w-6 h-6 text-orange" />
              <span>Farklı Eşya Yoğunlukları İçin Sunulan Konteyner Depo Ölçüleri Nelerdir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat kiralık depo ücretleri, eşyaların toplam hacmine göre mini, orta ve büyük boy konteyner hacimlerine bölünerek fiyatlandırılır. Tesislerimizde yer alan standart konteyner depo seçenekleri ve kapasiteleri şu şekildedir:
            </p>
            
            {/* Semantic Table required by Rule 5 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="p-3 rounded-tl-lg">Depo Tipi</th>
                    <th className="p-3">Boyutlar (En x Boy x Yükseklik)</th>
                    <th className="p-3">Hacim (m³)</th>
                    <th className="p-3 rounded-tr-lg">En Uygun Kullanım Alanı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-light text-charcoal">
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-semibold">Mini Boy Konteyner</td>
                    <td className="p-3">1.5m x 1.5m x 2.2m</td>
                    <td className="p-3">5 m³</td>
                    <td className="p-3">Tek oda eşyası, çeyiz kolileri, arşiv belgeleri</td>
                  </tr>
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-semibold">Orta Boy Konteyner</td>
                    <td className="p-3">3.0m x 2.2m x 2.2m</td>
                    <td className="p-3">15 m³</td>
                    <td className="p-3">1+1 veya standart 2+1 daire eşyalarının tamamı</td>
                  </tr>
                  <tr className="hover:bg-off-white/50">
                    <td className="p-3 font-semibold">Büyük Boy Konteyner</td>
                    <td className="p-3">6.0m x 2.4m x 2.4m</td>
                    <td className="p-3">30 m³</td>
                    <td className="p-3">3+1, 4+1 daire veya büyük ofis arşiv ve mobilyaları</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Nem/Rutubet ve İlaçlama */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Building className="w-6 h-6 text-orange" />
              <span>Kiralık Nakliye Depolarında Nem ve Rutubet Koruması Nasıl Sağlanır?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat depolama tesisleri, Akdeniz ikliminin yüksek nem oranlarına karşı klima ve nem alma üniteleri ile sürekli havalandırılmaktadır. Eşyaların aylarca depoda kapalı kalması durumunda ahşap kısımlarının küflenmemesi ve beyaz eşyaların elektronik kartlarının bozulmaması için sıcaklık ve nem yalıtımı hayati önem taşır. Zeminler ve tavan kısımları ısı yalıtımlı poliüretan kaplamalardan oluşmaktadır. Ayrıca depolarımızda böcek, kemirgen ve diğer haşerelere karşı her ay periyodik ilaçlama yapılmaktadır.
            </p>
          </div>

          {/* Section 4: Giriş Çıkış Prosedürleri */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-orange" />
              <span>Eşya Depolama Sürecinde Giriş ve Çıkış Prosedürleri Nasıl İşler?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat barkodlu depo yönetim sistemi sayesinde, giriş ve çıkış işlemlerinde her aşama yasal tutanaklarla belgelenmektedir. Eşyaların eksiksiz ve güvenle depolanması için giriş ve çıkış işlemlerinde şu yasal adımları uyguluyoruz:
            </p>
            <div className="space-y-4 text-sm text-charcoal">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <p><strong>Adım 1: Barkodlama ve Liste Hazırlama:</strong> Depoya girecek her koli ve mobilya numaralandırılır, listeye işlenir. Eşyaların mevcut fiziki durumları fotoğraflarla belgelenir.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <p><strong>Adım 2: Sigorta ve Sözleşme İmzası:</strong> Depolama sözleşmesi hazırlanır. Depolanan eşyaların tahmini emtia değeri belirlenerek sigorta poliçesi aktif hale getirilir.</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange shrink-0 mt-0.5" />
                <p><strong>Adım 3: Mühürleme ve Anahtar Teslimi:</strong> Eşyalar konteynere yüklendikten sonra kapaklar mühürlenir. Anahtar yalnızca mülk sahibine (müşteriye) teslim edilir.</p>
              </div>
            </div>
          </div>

          {/* Section 5: Fiyatları Etkileyen Faktörler */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange" />
              <span>Konya Eşya Depolama Fiyatları ve Ödeme Koşulları Nasıl Hesaplanır?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat depolama maliyetleri, kiralanan konteyner alanının m³ cinsinden boyutuna ve toplam kiralama süresine bağlı olarak belirlenir. 6 ay ve üzeri uzun süreli kiralamalarda net %15 peşin ödeme indirimi uygulanmaktadır. Depolama bedeline eşyalarınızın depoya taşınması (nakliyat) ve marangoz söküm işçilikleri dahil değildir. Minimum kiralama süresi 1 aydır ve ödemeler her ayın başında otomatik kart çekimi veya havale ile tahsil edilmektedir.
            </p>
          </div>

          {/* Section 6: Kurumsal Depolama */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Building className="w-6 h-6 text-orange" />
              <span>Kurumsal Şirketler İçin Ofis ve Arşiv Depolama Çözümleri Neleri Kapsar?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat kurumsal depolama tesisleri, firmaların arşiv klasörleri, ticari evrakları ve ofis mobilyaları için özel kilitli arşiv bölmeleri içermektedir. Kurumsal müşterilerimiz için hazırladığımız özel güvenlikli arşiv depoları, yasal saklama süreleri boyunca belgelerinizin nem almadan ve kaybolmadan korunmasını sağlar. Barkodlama sistemimiz sayesinde dilediğiniz klasör grubuna dilediğiniz an hızlıca erişim sağlayabilir, yetkilendirdiğiniz personeliniz aracılığıyla teslim alabilirsiniz.
            </p>
          </div>

          {/* Section 7: Yasaklı Eşyalar */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-orange" stroke="red" />
              <span>Kiralık Eşya Depolarında Saklanması Yasak Olan Maddeler Nelerdir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat depolarında saklanması yasak olan maddeler, kimyasal ve yanıcı materyallerin yol açabileceği yangın riskini önlemek için sıkı kurallara tabidir. Tüm müşterilerimizin eşyalarının güvenliğini ve hijyenini en üst seviyede tutmak adına depolarımızda bazı maddelerin saklanması kesinlikle yasaktır: akaryakıt, tiner, boya, tüp, bozulabilir gıdalar ve yasal ruhsatı bulunmayan tüm patlayıcı ve tehlikeli emtialar bu yasak kapsamındadır.
            </p>
          </div>

          {/* Section 8: Depolanan Eşyalara Erişim Koşulları */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-orange" />
              <span>Depolanan Eşyalara Erişim Koşulları ve Ziyaret Saatleri Nasıl Düzenlenir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Konya Lider Nakliyat depolarında saklanan eşyalara erişim yetkilendirilmiş hesap sahibinin kimlik ibrazı ve depo anahtarı eşliğinde gerçekleşmektedir. Güvenlik protokollerimiz gereği, depolara giriş yapabilmeniz için en az 24 saat önceden müşteri temsilcilerimizi arayarak ziyaret randevusu oluşturmanız gerekmektedir. Ziyaret sırasında kimlik ibrazı ve depo anahtarınızın yanınızda olması yasal olarak zorunludur. Randevusuz gelen kişilerin depo alanlarına girmesine izin verilmemektedir.
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
                → Ücretsiz Depolama Teklif Formu
              </Link>
              <Link href="/hizmetler/sehirici-evden-eve-nakliyat" className="text-orange-text hover:underline font-bold">
                → Şehiriçi Evden Eve Taşıma Hizmetleri
              </Link>
              <Link href="/hizmetler/profesyonel-esya-paketleme" className="text-orange-text hover:underline font-bold">
                → Eşya Paketleme ve Paket Seçenekleri
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange" />
              <span>Eşya Depolama Hakkında Sıkça Sorulanlar</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {depolamaFaqs.map((item, idx) => (
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
