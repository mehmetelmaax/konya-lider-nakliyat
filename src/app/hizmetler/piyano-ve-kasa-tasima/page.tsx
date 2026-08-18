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
import { ArrowRight, HelpCircle, Shield, Truck, Coins, CheckCircle2, AlertOctagon, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konya Piyano ve Kasa Taşıma | Lider Nakliyat',
  description: "Konya'da kuyruklu/duvar piyanosu, çelik para kasası ve hassas ağır yük taşımacılığı. Özel liftli araçlar ve askı sistemleriyle hasarsız transfer.",
  alternates: {
    canonical: '/hizmetler/piyano-ve-kasa-tasima',
  },
};

export default function PiyanoVeKasaTasimaPage() {
  const piyanoFaqs = [
    {
      question: 'Kuyruklu veya duvar piyanolarını taşırken nasıl önlemler alıyorsunuz?',
      answer: 'Piyanoları kalın koruyucu kadife keçeler ve çizilmeyi önleyici balonlu naylon ambalaj malzemeleriyle sarıyoruz. Taşımada özel yapım piyano askı takımları, kaydırmaz tekerlekli kızaklar ve merdiven tırmanıcı özel transpalet aparatları kullanıyoruz.'
    },
    {
      question: 'Çelik para kasası taşımacılığı kaç personel ile yapılıyor?',
      answer: 'Para kasasının ağırlığına bağlı olarak (200 kg ile 800 kg arası değişen kasa tipleri için) özel hidrolik transpaletler, liftli araçlarımız ve ağır yük taşıma alanında uzmanlaşmış en az 4 ile 6 kişilik profesyonel taşıma ekibi görevlendirilir.'
    },
    {
      question: 'Dev boyutlu ev akvaryumlarını da taşıyor musunuz?',
      answer: 'Evet. Kalın camlı, ağır tonajlı büyük ev akvaryumlarının de-montajını yapıyor, taşınırken çatlama ve esneme risklerini sıfırlayan vakumlu endüstriyel vantuzlar ve özel ahşap palet destekleri yardımıyla hizmet vermektedir.'
    },
    {
      question: 'Antika mobilya ve sanat eserlerinin ambalajlama standardı nasıldır?',
      answer: 'Antika ve tarihi eserler sıradan patpat ambalajlarla taşınmaz. Asitsiz ipek beyaz kağıt korumasından sonra kalın strafor köpük levhalar ve en dış katmanda darbelere karşı koruyucu ahşap sandıklar (crating) üreterek hizmet vermektedir.'
    },
    {
      question: 'Piyano ve kasa taşıma hizmeti sigorta kapsamında mıdır?',
      answer: 'Evet. Lider Nakliyat bünyesinde taşıdığımız her değerli ve ağır enstrüman/kasayı, taşınma öncesinde eşyanın net beyan edilen güncel piyasa değerine göre özel emtia sigortası kapsamına alarak yola çıkarıyoruz.'
    },
    {
      question: 'Ağır eşya taşıma fiyatları nasıl hesaplanmaktadır?',
      answer: 'Eşyanın net kilogram ağırlığına, taşınacağı katların seviyesine (asansör açısı veya kaç kat merdiven kullanılacağı), adresler arası mesafeye ve kullanılacak vinç/lift gibi ek lojistik ekipman ihtiyaçlarına göre belirlenir.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Konya Piyano ve Kasa Taşıma',
        description: "Konya'da kuyruklu/duvar piyanosu, çelik para kasası ve hassas ağır yük taşımacılığı. Özel liftli araçlar ve askı sistemleriyle hasarsız transfer.",
        slug: 'hizmetler/piyano-ve-kasa-tasima',
        areaName: 'Konya'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetler', url: '/hizmetler/sehirici-evden-eve-nakliyat' },
        { name: 'Piyano ve Kasa Taşıma', url: '/hizmetler/piyano-ve-kasa-tasima' }
      ]),
      faqSchema(piyanoFaqs)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Nakliye Çözümleri', url: '/#hizmetlerimiz' }, { name: 'Piyano ve Kasa Taşıma', url: '/hizmetler/piyano-ve-kasa-tasima' }]} className="pt-4" />
                {/* Intro Section */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            AĞIR YÜK VE DEĞERLİ EŞYA TAŞIMACILIĞI
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Konya Piyano ve Kasa Taşıma
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Kuyruklu piyanolar, ağır çelik para kasaları, dev akvaryumlar, tarihi antika mobilyalar ve değerli sanat eserlerinizi özel donanımlı askı takımları ve transpaletlerle hasarsız hizmet vermektedir.
          </p>
        </section>

        {/* Detailed SEO Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Giriş */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span>Ağır Yük ve Hassas Eşya Taşıma Uzmanlığı Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Ev veya iş yerlerindeki standart mobilyaların dışındaki ağır ve değerli eşyaların taşınması, sıradan nakliye yöntemleriyle kesinlikle yapılmamalıdır. Yüzlerce kilogram ağırlığa sahip çelik kasalar veya hassas mekanik aksamı olan piyanoların taşınması hem ciddi fiziki güç hem de profesyonel ekipman (kızaklar, transpaletler, vinç sistemleri, liftli araçlar) gerektirir. Lider Nakliyat olarak, Konya genelinde kurduğumuz özel ağır yük taşıma ekibimizle, piyanolarınızı ve çelik kasalarınızı milimetrik hesaplamalar ve tam güvenlik tedbirleri altında yeni adresine hasarsız ulaştırıyoruz.
            </p>
          </div>

          {/* Section 2: Eşya Tipleri */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Truck className="w-6 h-6 text-gold" />
              <span>Hizmet Verdiğimiz Özel ve Ağır Eşya Kategorileri Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Özel eğitimli Konya Lider Nakliyat ekipleri ve teknik donanımımızla taşımasını gerçekleştirdiğimiz değerli ve ağır eşya grupları şunlardır:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-charcoal">
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-forest text-sm block">1. Duvar ve Kuyruklu Piyano</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Akort mekanizmasının bozulmaması ve dış cilasının çizilmemesi için özel kadife kılıflarla ambalajlanan, askı takımıyla taşınan piyanolar.</p>
              </div>
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-forest text-sm block">2. Çelik Para Kasaları</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Ağırlıkları 1 tona kadar çıkabilen kuyumcu, banka veya ev kasalarının zeminlere zarar vermeden hidrolik lift ve kaydırmaz kızaklarla taşınması.</p>
              </div>
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-forest text-sm block">3. Tarihi Antika Mobilyalar</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Eski el oyması, vernikli veya tarihi değeri olan mobilyaların, asitsiz beyaz ambalaj kağıtları ve sert köpük kalıplarla korunarak nakledilmesi.</p>
              </div>
              <div className="bg-off-white p-5 rounded-lg border border-gray-light/60 space-y-2">
                <span className="font-bold text-forest text-sm block">4. Dev Akvaryumlar ve Camlar</span>
                <p className="text-xs leading-relaxed text-charcoal/90">Basınç farkı nedeniyle çatlama riski yüksek olan büyük ölçekli akvaryum ünitelerinin, vakumlu ağır hizmet cam vantuzları ve paletlerle taşınması.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Güvenlik ve Riskler */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-gold" />
              <span>Ağır Eşya Taşırken Karşılaşılan Riskler ve Çözümlerimiz Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Ağır ve özel yük taşımacılığında en sık karşılaşılan risk, eşyanın düşürülmesi, merdiven mermerlerinin kırılması, daire kapı kasalarının çizilmesi veya bina asansörünün halat koparmasıdır. Bu riskleri sıfıra indirmek adına bina içi ortak alan asansörlerini kesinlikle ağır yükler için kullanmıyoruz. Bunun yerine bina dış cephesine kurduğumuz 400 kg taşıma kapasiteli mobil teleskopik yük asansörlerimizi veya vinç sistemlerini kullanıyoruz. Eşyanın taşınacağı koridor ve zeminler, tekerlek izi ve çizilmeleri önlemek adına kalın sunta levhalar ve kauçuk koruyucu örtülerle kaplanır. Taşıma öncesinde yaptığımız tüm bu hazırlıklar, operasyonumuzun hasarsız geçmesini garanti eder.
            </p>
          </div>

          {/* Section 4: Fiyatlandırma ve Sigorta */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Coins className="w-6 h-6 text-gold" />
              <span>Ağır Yük Nakliye Fiyatları ve Sigorta Detayları Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Piyano, kasa ve antika gibi değerli eşya taşımacılığı yüksek marjlı ve özel yetkinlik gerektiren bir alandır. Fiyatlar belirlenirken eşyanın tam ağırlığı, de-montaj gereksinimi, kat seviyeleri (asansör açısı veya kaç kat merdiven kullanılacağı) ve sigorta emtia değeri esas alınır. Lider Nakliyat olarak, taşınma öncesinde poliçe detaylarını hazırlayıp eşyanın gerçek değerini teminat altına alan taşıma sigortasını ücretsiz olarak hizmet vermektedir. Müşterilerimize yazılı sözleşmeyle verdiğimiz fiyatlar sabit kalmakta, taşınma sonrasında ek maliyet çıkarılmamaktadır.
            </p>
          </div>

          {/* Section 5: Piyano Taşıma Sonrası Akort */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-gold" />
              <span>Piyano Taşımacılığı Sonrası Akort ve Bakım Süreci Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Piyanolar, son derece hassas ahşap, çelik tel ve keçe mekanizmalarına sahip enstrümanlardır. Taşınma esnasında ne kadar sarsıntısız ve askılı sistemlerle taşınsa dahi, ortamdaki nem oranı, sıcaklık değişimi ve taşınma hareketi piyanoların akort ayarlarının bozulmasına yol açar. Bu nedenle piyanonuz yeni yerine taşındıktan sonra akort ayarının hemen yapılması doğru değildir. Piyanonun yeni odanın nem ve hava koşullarına uyum sağlayabilmesi için en az 10-15 gün beklenmesi ve ardından profesyonel bir akort ustası (tuner) tarafından kalibre edilmesi gerekmektedir.
            </p>
          </div>

          {/* Section 6: Ağır Kasa Taşımada Zemin Koruma */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span>Ağır Kasa Taşımacılığında Zemin Koruma Önlemleri Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              300 kg ile 800 kg arasında değişen çelik kasaların taşınması sırasında en büyük risk bina içi koridor zeminlerinin, mermerlerin ve laminat parkelerin ezilmesi, kırılması veya derin çiziklerle hasar görmesidir. Lider Nakliyat olarak, ağır kasa taşımacılığında zeminleri korumak amacıyla taşıma güzergahının tamamına kalın kauçuk zemin matları ve özel dağıtıcı kontrplak levhalar yerleştiriyoruz. Kasa bu levhalar üzerinde hidrolik transpaletler yardımıyla kaydırılarak taşındığı için bina zeminlerine ve daire içi laminat parkelere sıfır baskı uygulanır ve çizilmelerin önüne kesin olarak geçilir.
            </p>
          </div>

          {/* Section 7: Sanat Eseri ve Sergi Taşımacılığı */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-gold" />
              <span>Sanat Eseri, Sergi ve Galeri Lojistiği Nedir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">Konya Lider Nakliyat, Müzeler, sanat galerileri ve kişisel koleksiyoncular için resim tabloları, heykeller ve antikaların taşınması yüksek hassasiyet gerektirir. Bu tarz eserlerin nakliyesinde iklimlendirmeli (ısı ve nem ayarlı) kapalı kasa araçlar kullanmaktayız. Eserlerin ambalajlanmasında doğrudan asitsiz müzecilik kağıtları ve darbeleri yutan özel şok emici polietilen köpükler tercih edilmektedir. Taşınma süreci baştan sona özel sigorta poliçesiyle korunarak uzman gözetiminde tamamlanır.</p>
          </div>

          {/* Internal Links Navigation Area */}
          <div className="bg-forest/5 border border-forest/10 rounded-xl p-6 space-y-4">
            <span className="font-bold text-forest text-sm block">Yararlı Bağlantılar ve Rehberler</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Link href="/konya-nakliyat-fiyatlari" className="text-gold-text hover:underline font-bold">
                → Konya Evden Eve Nakliyat Fiyatları
              </Link>
              <Link href="/teklif-al" className="text-gold-text hover:underline font-bold">
                → Ücretsiz Nakliye Teklif Formu
              </Link>
              <Link href="/hizmetler/sehirici-evden-eve-nakliyat" className="text-gold-text hover:underline font-bold">
                → Şehiriçi Evden Eve Taşıma Hizmetleri
              </Link>
              <Link href="/hizmetler/parca-esya-tasima" className="text-gold-text hover:underline font-bold">
                → Parça Eşya Taşıma Çözümleri
              </Link>
              <Link href="/bolgeler/selcuklu-evden-eve-nakliyat" className="text-gold-text hover:underline font-bold">
                → Selçuklu Bölgesi Nakliye ve Taşımacılık
              </Link>
              <Link href="/bolgeler/meram-evden-eve-nakliyat" className="text-gold-text hover:underline font-bold">
                → Meram Bölgesi Nakliye ve Taşımacılık
              </Link>
              <Link href="/tasinma-kontrol-listesi" className="text-gold-text hover:underline font-bold">
                → İnteraktif Taşınma Kontrol Çizelgesi
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold" />
              <span>Ağır Eşya Taşımacılığı Hakkında Sıkça Sorulanlar</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {piyanoFaqs.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-forest block mb-1">{item.question}</span>
                  <p className="text-charcoal/95 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-forest text-xl md:text-2xl border-b border-gray-light pb-3">
              Hızlı ve Sabit Fiyat Teklifi Hesaplayın
            </h3>
            <QuoteForm isInline={true} />
          </div>

        </section>
      </main>
    </>
  );
}
