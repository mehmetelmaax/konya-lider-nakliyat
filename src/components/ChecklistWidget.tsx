import React from 'react';
import { Printer, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  task: string;
}

interface ChecklistGroup {
  title: string;
  items: ChecklistItem[];
}

export default function ChecklistWidget() {
  const groups: ChecklistGroup[] = [
    {
      title: 'Taşınmaya 30 Gün Kala (Hazırlık Aşaması)',
      items: [
        { id: '1', task: 'Yeni taşınacağınız ev veya ofis adresinin kat ve sokak durumlarını analiz edin.' },
        { id: '2', task: 'Gereksiz, kullanmadığınız ve eskiyen eşyaları ayıklayın; satabileceğiniz veya bağışlayacağınız eşyaları belirleyin.' },
        { id: '3', task: "Lider Nakliyat'tan ücretsiz ön keşif (ekspertiz) talep edin ve sabit fiyat teklifinizi alın." },
        { id: '4', task: "Resmi nakliyat sözleşmenizi imzalayarak taşınma tarihini ve saatini netleştirip rezerve edin." },
        { id: '5', task: 'Önemli evrakları, değerli mücevherleri ve tapu/kimlik gibi belgeleri saklayacağınız özel bir çanta hazırlayın.' },
        { id: '6', task: 'Okul çağında çocuğunuz varsa yeni adresteki okullara nakil işlemleri için başvuruları başlatın.' },
      ]
    },
    {
      title: 'Taşınmaya 15 Gün Kala (Resmi ve Teknik İşlemler)',
      items: [
        { id: '7', task: 'Eski adresteki elektrik, su ve doğalgaz aboneliklerinin kapatılması için ilgili kurumlara (Enerjisa, ASKİ vb.) başvurun.' },
        { id: '8', task: 'Yeni adresteki aboneliklerin (elektrik, su, doğalgaz) taşınma gününde aktif olması için başvurularınızı yapın.' },
        { id: '9', task: 'Ev interneti (fiber/ADSL) ve sabit telefon hattı nakil başvurularını internet sağlayıcınıza iletin.' },
        { id: '10', task: 'Kargo ve posta gönderimlerinizin kaybolmaması için e-Devlet üzerinden resmi ikametgah ve adres değişikliği bildirimini yapın.' },
        { id: '11', task: 'Bina yönetimleriyle görüşerek taşınma günü yük asansörünün kullanımını ve bina önü kamyon park alanını rezerve edin.' },
      ]
    },
    {
      title: 'Taşınmaya 7 Gün Kala (Ambalajlama ve Hazırlık)',
      items: [
        { id: '12', task: 'Eğer paketleme hizmetini kendiniz yapacaksanız, kaliteli karton koliler, koli bantları ve havalı patpatları temin edin.' },
        { id: '13', task: 'Kırılacak mutfak eşyalarını gazete kağıtları yerine asitsiz ambalaj kağıtlarına sararak kolileyin ve üzerini etiketleyin.' },
        { id: '14', task: 'Yeni evdeki odalara göre kolilerin üzerine belirgin renkli etiketler yapıştırın (Örn: Mutfak, Salon vb.).' },
        { id: '15', task: 'Buzdolabı ve derin dondurucudaki donmuş gıdaları tüketmeye özen gösterin, yeni alışveriş yapmayın.' },
        { id: '16', task: 'Taşınma günü yanınızda olacak ilk gece acil ihtiyaç çantasını (diş fırçası, şarj cihazı, yedek giysi vb.) hazırlayın.' },
      ]
    },
    {
      title: 'Taşınmaya 1 Gün Kala (Son Kontroller)',
      items: [
        { id: '17', task: 'Buzdolabının fişini taşınmadan en az 12 saat önce çekin, içini tamamen boşaltıp kurulayın.' },
        { id: '18', task: 'Lider Nakliyat müşteri temsilcisiyle iletişime geçerek araç varış saatini ve ekibi teyit edin.' },
        { id: '19', task: 'Gardırop ve de-monte edilecek diğer mobilyaların içlerini tamamen boşaltın.' },
        { id: '20', task: 'Eski evinizde kalan son çöpleri atın, faturaların sayaç son endeks fotoğraflarını cep telefonunuzla çekin.' },
        { id: '21', task: 'Yeni evin anahtarlarını yanınıza aldığınızdan emin olun.' },
      ]
    },
    {
      title: 'Taşınma Günü (Büyük Gün)',
      items: [
        { id: '22', task: 'Nakliye ekibini karşılayın, hassas veya taşınmayacak özel eşyaları şefe göstererek bilgilendirin.' },
        { id: '23', task: 'Asansör kurulum açısının ve güvenlik şeritlerinin doğru yerleştirildiğini kontrol edin.' },
        { id: '24', task: 'Eşyalar kamyona yüklenirken boşalan odaları son kez kontrol edin, dolap içlerinde unutulan eşya kalmadığından emin olun.' },
        { id: '25', task: 'Eski evin doğalgaz, su vanalarını ve elektrik şalterlerini tamamen kapatın.' },
        { id: '26', task: 'Yeni eve ulaşıldığında eşyaların odalara doğru yerleştirilmesini koordine edin.' },
        { id: '27', task: 'Kurulumu tamamlanan gardırop ve beyaz eşyaları çalıştırıp monte durumlarını kontrol ettikten sonra teslim tutanağını imzalayın.' },
      ]
    }
  ];

  return (
    <div className="space-y-8" id="checklist-root">
      {/* Inject print override styles */}
      <style>{`
        @media print {
          header, footer, nav, button, .no-print, #iletisim-footer {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-container {
            max-width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          .print-card {
            border: 1px solid #ccc !important;
            box-shadow: none !important;
            margin-bottom: 20px !important;
            page-break-inside: avoid;
          }
        }
      `}</style>

      {/* Progress Bar & Actions (no-print) */}
      <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 no-print">
        <div className="space-y-2 w-full md:w-2/3">
          <div className="flex justify-between items-center text-xs font-bold text-forest uppercase">
            <span>Taşınma Hazırlık İlerlemesi</span>
            <span id="checklist-progress-text">%0 Tamamlandı</span>
          </div>
          <div className="w-full bg-off-white h-3.5 rounded-full overflow-hidden border border-gray-light">
            <div
              id="checklist-progress"
              className="bg-gold h-full transition-all duration-300 rounded-full"
              style={{ width: '0%' }}
            />
          </div>
          <span className="text-[10px] text-gray-400 block">* Tamamladığınız maddeleri işaretleyerek sürecinizi takip edebilirsiniz.</span>
        </div>

        <div className="flex gap-3 shrink-0 w-full md:w-auto">
          <button
            id="checklist-print-btn"
            className="flex-1 md:flex-initial bg-forest hover:bg-gold text-white hover:text-forest font-bold px-4 py-2.5 rounded-xl border border-forest transition-all duration-200 text-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4.5 h-4.5" />
            <span>Listeyi Yazdır (PDF)</span>
          </button>
          <button
            id="checklist-reset-btn"
            className="bg-off-white hover:bg-gray-light/40 text-charcoal font-bold px-4 py-2.5 rounded-xl border border-gray-light transition-all duration-200 text-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            aria-label="Listeyi temizle"
          >
            <RefreshCw className="w-4.5 h-4.5" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6 print-container">
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="bg-white rounded-xl border border-gray-light shadow-sm overflow-hidden print-card">
            
            {/* Group Header */}
            <div className="bg-forest/5 px-6 py-4 border-b border-gray-light flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-gold" />
              <h3 className="font-display font-bold text-forest text-sm md:text-base">{group.title}</h3>
            </div>

            {/* Group Items */}
            <div className="divide-y divide-gray-light/60 px-6">
              {group.items.map((item) => (
                <label
                  key={item.id}
                  className="py-4 flex items-start gap-4 cursor-pointer hover:bg-off-white/40 transition-colors select-none group"
                >
                  <input
                    type="checkbox"
                    data-id={item.id}
                    className="w-5 h-5 accent-gold border-gray-300 rounded focus:ring-gold cursor-pointer shrink-0 mt-0.5"
                  />
                  <span className="text-xs md:text-sm font-semibold leading-relaxed transition-all text-charcoal label-text">
                    {item.task}
                  </span>
                </label>
              ))}
            </div>

          </div>
        ))}
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var root = document.getElementById('checklist-root');
          if (!root) return;
          var progress = document.getElementById('checklist-progress');
          var progressText = document.getElementById('checklist-progress-text');
          var printBtn = document.getElementById('checklist-print-btn');
          var resetBtn = document.getElementById('checklist-reset-btn');
          var checkboxes = root.querySelectorAll('input[type="checkbox"]');
          
          function updateProgress() {
            var checked = root.querySelectorAll('input[type="checkbox"]:checked').length;
            var total = checkboxes.length;
            var pct = total > 0 ? Math.round((checked / total) * 100) : 0;
            if (progress) progress.style.width = pct + '%';
            if (progressText) progressText.innerText = '%' + pct + ' Tamamlandı';
          }

          root.addEventListener('change', function(e) {
            if (e.target && e.target.type === 'checkbox') {
              var label = e.target.nextElementSibling;
              if (e.target.checked) {
                if (label) label.classList.add('text-gray-400', 'line-through');
              } else {
                if (label) label.classList.remove('text-gray-400', 'line-through');
              }
              updateProgress();
            }
          });

          if (printBtn) {
            printBtn.addEventListener('click', function() {
              window.print();
            });
          }

          if (resetBtn) {
            resetBtn.addEventListener('click', function() {
              checkboxes.forEach(function(cb) {
                cb.checked = false;
                var label = cb.nextElementSibling;
                if (label) label.classList.remove('text-gray-400', 'line-through');
              });
              updateProgress();
            });
          }
        })();
      ` }} />
    </div>
  );
}
