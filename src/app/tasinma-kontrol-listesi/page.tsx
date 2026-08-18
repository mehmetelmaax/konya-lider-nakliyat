import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import MovingChecklist from '@/components/geo/MovingChecklist';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { ArrowRight, HelpCircle, Shield, FileText, ClipboardList, Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'İnteraktif Taşınma Kontrol Listesi ve Planlayıcı | Lider',
  description: "Konya'da sorunsuz taşınmak için 30 günlük interaktif kontrol listesi. Adres değişikliği, internet, elektrik ve su abonelik nakil prosedürleri rehberi.",
  alternates: {
    canonical: '/tasinma-kontrol-listesi',
  },
};

export default function TasinmaListesiPage() {
  const checklistFaqs = [
    {
      question: 'Aboneliklerin (elektrik, su, doğalgaz) iptali ve nakil işlemleri kaç gün sürer?',
      answer: 'Abonelik feshi ve yeni aboneliğin açılması işlemleri, ilgili kurumların (ASKİ, Enerjisa, Aksa Doğalgaz) yoğunluğuna göre değişse de genellikle başvuru gününden sonraki 2 ila 4 iş günü içerisinde tamamlanmaktadır. Taşınma gününde mağdur olmamak adına en az 10 gün önceden başvuruların yapılması önerilir.'
    },
    {
      question: 'Yeni eve internet nakil işlemi nasıl gerçekleştirilir?',
      answer: 'İnternet servis sağlayıcınızı (Türk Telekom, Turkcell Superonline, Vodafone vb.) arayarak yeni adresinizde altyapı hız sorgulaması yaptırmalısınız. Altyapı uygunsa nakil randevusu oluşturmalısınız. Teknik ekiplerin eve gelip kurulumu tamamlaması ortalama 3 ile 7 iş günü arasında sürmektedir.'
    },
    {
      question: 'e-Devlet üzerinden resmi ikametgah ve adres bildirimi ne zaman yapılmalıdır?',
      answer: 'Taşınma tarihinizden itibaren 5490 Sayılı Nüfus Hizmetleri Kanunu uyarınca en geç 20 iş günü içerisinde e-Devlet kapısı mobil imza doğrulaması ile veya nüfus müdürlüklerine şahsen başvurarak yeni ikametgah adres bildiriminizi yapmanız yasal zorunluluktur. Aksi halde gecikme cezası uygulanır.'
    },
    {
      question: 'Eski adresteki abonelik kapatıldığında güvence bedeli iadesi nasıl alınır?',
      answer: 'Eski evinizdeki elektrik, su veya gaz aboneliğinizi feshettiğinizde, kurum personeli sayacı gelip okur. Varsa son dönem borcunuz depozitonuzdan düşülür. Kalan güvence bedeli bakiyesi, verdiğiniz IBAN numaranıza en geç 5 ile 10 iş günü içerisinde iade edilmektedir.'
    },
    {
      question: 'Taşınma gününde apartman yönetimine ne zaman haber verilmelidir?',
      answer: 'Taşınmadan en az 7 gün önce hem eski hem de yeni bina yönetimine bilgi verilerek asansörün eşya taşıma amaçlı bloke edilmesi ve bina önünde kamyon park alanı ayrılması sağlanmalıdır.'
    },
    {
      question: 'Kendim paketleme yaparken kolilerin üzerine ne yazmalıyım?',
      answer: 'Kolilerin üzerine hangi odaya (Mutfak, Yatak Odası vb.) ait olduğunu yazmalı, kırılacak eşya barındıran kolilerin üzerine ise büyük harflerle "KIRILACAK" ibaresini eklemelisiniz.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'İnteraktif Taşınma Kontrol Listesi',
        description: "Konya'da sorunsuz taşınmak için 30 günlük interaktif kontrol listesi. Adres değişikliği, internet, elektrik ve su abonelik nakil prosedürleri rehberi.",
        slug: 'tasinma-kontrol-listesi',
        areaName: 'Konya'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Taşınma Listesi', url: '/tasinma-kontrol-listesi' }
      ]),
      faqSchema(checklistFaqs)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Taşınma Listesi', url: '/tasinma-kontrol-listesi' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-forest text-white text-center space-y-4 print:hidden">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            ADIM ADIM PLANLAMA REHBERİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            İnteraktif Taşınma Kontrol Listesi
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Ev veya ofis taşırken hiçbir detayı unutmamanız için hazırladığımız 30 günlük zaman çizelgesi. Maddeleri işaretleyin, PDF olarak yazdırın veya bilgisayarınıza kaydedin.
          </p>
        </section>

        {/* Detailed SEO Content Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Giriş Yazısı */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4 print:hidden">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span>Taşınma Sürecini Planlamanın Önemi</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Taşınma süreci, hayatımızın en stresli dönemlerinden biri olabilir. Eşyaların tasnif edilmesi, doğru nakliyat firmasının bulunması, resmi kurumlarla olan abonelik işlemleri derken birçok detay gözden kaçabilmektedir. Süreci kaosa dönüştürmeden, sakin ve planlı bir şekilde tamamlamanın en kesin yolu profesyonel bir kontrol listesi (checklist) kullanmaktır. Lider Nakliyat olarak, müşterilerimizin taşınma stresini yarıya indirecek bu interaktif planlayıcıyı hazırladık. Aşağıdaki maddeleri uygulayarak taşınma gününe tamamen hazır ve huzurlu bir şekilde girebilirsiniz.
            </p>
          </div>

          {/* Checklist Widget */}
          <section className="print:m-0">
            <MovingChecklist />
          </section>

          {/* Section 3: Abonelik İptal ve Nakil Süreçleri */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 print:page-break-before">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-gold" />
              <span>Abonelik Kapatma, Nakil ve İptal Süreçleri</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Taşındıktan sonra eski evinizde sizin adınıza fatura kesilmeye devam etmemesi ve yeni evinizde taşındığınız gün karanlıkta kalmamanız için resmi abonelik süreçlerini şu adımlarla yönetmelisiniz:
            </p>
            
            <div className="space-y-6 text-sm text-charcoal">
              <div className="border-l-4 border-gold pl-4 space-y-2">
                <span className="font-bold text-forest text-base block">1. Elektrik Aboneliği (Enerjisa / Toroslar EPSAŞ)</span>
                <p className="leading-relaxed text-charcoal/90">
                  Eski eviniz için taşınmadan 3 gün önce Enerjisa müşteri işlem merkezlerinden veya e-Devlet kapısı üzerinden sözleşme fesih başvurusunda bulunun. Başvuru esnasında sayaç üzerindeki son endeks fotoğrafını çekerek kaydetmeniz faydalı olacaktır. Yeni eviniz için ise taşınma gününden en az 2 gün önce aynı kanallar üzerinden yeni sözleşme imzalayarak elektriğinizin açılmasını sağlayın.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-4 space-y-2">
                <span className="font-bold text-forest text-base block">2. Su Aboneliği (Konya ASKİ Genel Müdürlüğü)</span>
                <p className="leading-relaxed text-charcoal/90">
                  ASKİ şubelerine giderek veya e-Devlet ASKİ hizmetleri sekmesinden eski su aboneliğinizin kapatılmasını ve depozito iade talebinizi iletin. Yeni evinizin su sayacının açılması ve üzerinize kaydedilmesi için tapu veya kira kontratı örneği ile ASKİ şubelerine başvurarak yeni sözleşme bedelini yatırın.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-4 space-y-2">
                <span className="font-bold text-forest text-base block">3. Doğalgaz Aboneliği (Aksa Doğalgaz)</span>
                <p className="leading-relaxed text-charcoal/90">
                  Aksa Doğalgaz bürolarına giderek veya online işlemler kanalıyla gaz kesim ve güvence bedeli iadesi talebinde bulunun. Yeni evde doğalgazın aktif edilebilmesi için gaz açma randevusu alınması gerekmektedir. Ekipler gelene kadar tesisatta sızıntı veya onay belgesi eksikliği olmadığından emin olun.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-4 space-y-2">
                <span className="font-bold text-forest text-base block">4. İnternet ve Sabit Hat Nakli</span>
                <p className="leading-relaxed text-charcoal/90">
                  Kullandığınız servis sağlayıcısının (Superonline, Türk Telekom, Kablonet vb.) müşteri hizmetlerini arayarak yeni adresinizdeki fiber veya ADSL altyapı hızını sorgulatın. Eğer yeni adreste altyapı bulunmuyorsa, yasal olarak taahhüt cezası ödemeden sözleşmenizi iptal etme hakkınız mevcuttur. Altyapı varsa, taşınmadan en az 7 gün önce nakil randevusu oluşturun.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-4 space-y-2">
                <span className="font-bold text-forest text-base block">5. Resmi İkametgah Adres Beyanı (Nüfus Müdürlüğü)</span>
                <p className="leading-relaxed text-charcoal/90">
                  5490 sayılı Nüfus Hizmetleri Kanunu uyarınca, yeni adresinize taşındıktan sonra en geç 20 iş günü içerisinde adres beyanında bulunmanız yasal zorunluluktur. Bu işlemi e-Devlet kapısı üzerinden mobil imza veya SMS doğrulaması ile saniyeler içinde yapabilir ya da ilçe nüfus müdürlüklerinden randevu alarak şahsen tamamlayabilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Paketleme İpuçları */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4 print:hidden">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Info className="w-6 h-6 text-gold" />
              <span>Hasarsız Taşınma İçin 3 Kritik Paketleme İpucu</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Eşyalarınızı kendiniz paketliyorsanız, aşağıdaki 3 altın kuralı uygulayarak eşyalarınızın yolda zarar görmesini engelleyebilirsiniz:
            </p>
            <div className="space-y-3.5 text-sm text-charcoal pl-2">
              <p>
                <strong>• Ağır Eşyaları Küçük Kolilere Koyun:</strong> Kitaplar, tabaklar ve kavanozlar gibi ağır eşyaları büyük kolilere doldurursanız kolinin tabanı yırtılabilir ve taşıması imkansız hale gelir. Ağır eşyaları küçük kolilere, nevresim ve kıyafet gibi hafif yükleri büyük kolilere yerleştirin.
              </p>
              <p>
                <strong>• Kolilerde Boşluk Bırakmayın:</strong> Kolilerin içine eşyaları yerleştirdikten sonra kalan boşlukları kırışık gazete kağıtları veya balonlu naylon parçalarıyla doldurun. Boşluk kalan koliler üst üste istiflendiğinde ezilir ve içindeki eşyalar kırılır.
              </p>
              <p>
                <strong>• Kabloları ve Vidaları Etiketleyin:</strong> Televizyon, bilgisayar kablolarını sökmeden önce fotoğraflarını çekin. Sökülen gardırop ve yatak vidalarını küçük kilitli poşetlere koyarak doğrudan o mobilyanın ana gövdesine bantlayın.
              </p>
            </div>
          </div>
          {/* Section 5: Okul Nakil Süreci */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4 print:hidden">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Info className="w-6 h-6 text-gold" />
              <span>Okul Nakil ve Öğrenci Kayıt Taşıma Adımları</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Çocuklu aileler için okul değişikliği planlaması en kritik aşamalardan biridir. Taşınma gününden en az 30 gün önce e-Okul sistemi üzerinden veya hedef okul idaresine giderek boş kontenjan sorgulaması yapmalısınız. Resmi adres bildiriminizi e-Devlet üzerinden taşındıktan sonraki 20 gün içinde yaptıktan sonra, yeni adrese en yakın devlet okuluna e-Kayıt yoluyla geçiş hakkınız otomatik olarak açılacaktır. Özel okullar için nakil işlemleri ise doğrudan veli muvafakatiyle okul idareleri arasında gerçekleştirilir.
            </p>
          </div>

          {/* Section 6: Evcil Hayvan Taşınma Yönetimi */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4 print:hidden">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Info className="w-6 h-6 text-gold" />
              <span>Evcil Hayvanların Taşınma Günü Stres Yönetimi</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Kedi, köpek veya kuş gibi evcil hayvanlar taşınma sırasındaki yabancı kalabalıktan, gürültüden ve eşyaların hareketinden aşırı derecede strese girer ve kaçma eğilimi gösterebilirler. Taşınma gününde evcil dostunuzu içi boşaltılmış, kapısı kapalı sakin bir odaya (örneğin banyoya) taşıma çantası, maması ve suyu ile birlikte kapatın. Odanın kapısına "Evcil Hayvan Var, Açmayın" notu yapıştırın. Tüm eşyalar kamyona yüklendikten sonra dostunuzu kendi özel aracınızla yeni eve nakledin.
            </p>
          </div>

          {/* Internal Links Navigation Area */}
          <RelatedLinks currentSlug="tasinma-kontrol-listesi" type="blog" title="Yararlı Bağlantılar ve Rehberler" />

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 print:hidden">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold" />
              <span>Taşınma Süreci Hakkında Sıkça Sorulanlar</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {checklistFaqs.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-forest block mb-1">{item.question}</span>
                  <p className="text-charcoal/95 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-forest rounded-xl p-8 text-center text-white space-y-6 print:hidden">
            <h3 className="font-display font-bold text-xl md:text-2xl">
              Planlı ve Güvenli Taşınma Teklifi Alın
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/teklif-al" className="bg-gold hover:bg-white text-forest font-black px-6 py-3 rounded border border-forest transition-all duration-200 text-sm flex items-center gap-2 active:scale-95 cursor-pointer">
                <span>Fiyat Hesapla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
