import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const userGalleryDir = path.join(rootDir, 'kullanici-galeri');
const publicImgDir = path.join(rootDir, 'public', 'img');
const galeriPagePath = path.join(rootDir, 'src', 'app', 'galeri', 'page.tsx');

const TITLES = [
  'Eşya Yükleme ve İstifleme',
  'Profesyonel Ambalajlama İşlemi',
  'Asansörlü Nakliye Kurulumu',
  'Marangozlu De-montaj Hizmeti',
  'Hassas Eşya Paketleme',
  'Şehirlerarası Nakliye Sevk',
  'Güvenli Taşımacılık Ekibi',
  'Evden Eve Eşya Transferi',
  'Asansörlü Eşya İndirme',
  'Kaliteli Ambalaj Malzemeleri'
];

const DESCS = [
  'Kapalı kasa nakliyat tırımıza eşyaların hasar görmeyecek şekilde düzenli istiflenmesi.',
  'Eşyaların taşınma esnasında çizilmesini önleyen kalın balonlu patpat naylon sarımı.',
  'Yüksek katlı binalarda güvenli taşıma sağlayan mobil asansör sistemimiz.',
  'Mobilyalarınızın taşınma öncesinde uzman marangozumuzca sökülmesi ve numaralandırılması.',
  'Kırılacak cam ve mutfak eşyalarının Kraft kağıtlarla sarılıp kolilere yerleştirilmesi.',
  'Konya Selçuklu merkezimizden diğer illere yola çıkmaya hazır kapalı kasa taşıma aracımız.',
  'Konya Lider Nakliyat güvencesiyle uzman kadromuz iş başında.',
  'Eşyaların oda oda tasnif edilip yeni evinizde istenen yerlere yerleştirilmesi.',
  'Apartman içi merdivenleri kullanmadan balkondan doğrudan araca yükleme yapılması.',
  'Koli, köşe koruyucu bentler ve özel ambalaj ipleriyle yapılan kurumsal paketleme.'
];

function processUserImages() {
  if (!fs.existsSync(userGalleryDir)) {
    console.error('kullanici-galeri folder does not exist.');
    return;
  }

  const files = fs.readdirSync(userGalleryDir)
    .filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'))
    .sort();

  if (files.length === 0) {
    console.log('No user images found in kullanici-galeri.');
    return;
  }

  console.log(`Found ${files.length} images to process...`);
  
  const newItems = [];

  files.forEach((file, index) => {
    const ext = path.extname(file).toLowerCase();
    const newFileName = `konya-nakliyat-faaliyet-${index + 1}${ext}`;
    const srcPath = path.join(userGalleryDir, file);
    const destPath = path.join(publicImgDir, newFileName);

    // Copy file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied & renamed: ${file} -> ${newFileName}`);

    // Create gallery item structure
    newItems.push({
      src: `/img/${newFileName}`,
      title: TITLES[index % TITLES.length],
      desc: DESCS[index % DESCS.length],
      alt: `Konya Lider Evden Eve Nakliyat firmasına ait ${TITLES[index % TITLES.length].toLowerCase()} gerçek faaliyet fotoğrafı`
    });
  });

  // Now, let's update src/app/galeri/page.tsx
  let pageContent = fs.readFileSync(galeriPagePath, 'utf8');

  // Match the array format in page.tsx: const galleryItems: GalleryItem[] = [ ... ];
  const arrayStartTag = 'const galleryItems: GalleryItem[] = [';
  const arrayEndTag = '];';

  const startIndex = pageContent.indexOf(arrayStartTag);
  const endIndex = pageContent.indexOf(arrayEndTag, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    console.error('Could not locate galleryItems array in page.tsx');
    return;
  }

  // Build the new array content combining original slayt images and the new ones
  const originalItems = [
    {
      src: '/img/slayt-1.jpg',
      title: 'Şehirlerarası Nakliyat Tırımız',
      desc: 'Büyük boy çelik kasa ev eşyası taşıma kamyonumuz yükleme esnasında.',
      alt: "Konya'dan Türkiye geneline K3 belgeli araçlarla şehirlerarası evden eve nakliyat taşıması yapan büyük nakliye tırı",
    },
    {
      src: '/img/slayt-2.jpg',
      title: 'Dış Cephe Asansör Kurulumu',
      desc: 'Rezidans tipi binalarda balkondan eşya transferi yapan teleskopik asansörümüz.',
      alt: "Konya Selçuklu'da yüksek katlı bir rezidansın dış cephesine kurulmuş teleskopik yük ve eşya taşıma asansörü",
    },
    {
      src: '/img/slayt-3.jpg',
      title: 'Asansörlü Nakliye Aracımız',
      desc: 'Mobil asansör kasalı taşıma kamyonetimiz dar sokakta operasyonda.',
      alt: "Asansörlü nakliyat taşıma hizmeti veren teleskopik asansör sistemli Konya Lider Nakliyat taşıma aracı",
    },
    {
      src: '/img/arac-filosu.jpg',
      title: 'Kapalı Kasa Ev Eşyası Kamyonumuz',
      desc: 'Rüzgardan, yağmurdan korunaklı özel yapım mobilya kasalı aracımız.',
      alt: "Eşyaların yolda zarar görmemesi için içi MDF kaplı kapalı kasa evden eve taşımacılık nakliye kamyonu",
    },
    {
      src: '/img/paketleme-detay.jpg',
      title: 'Özenli Eşya Ambalajlama',
      desc: 'Kraft kağıt ve patpat naylonlarla korumaya alınmış mobilyalar.',
      alt: "Lider Nakliyat marangozlarınca balonlu patpat ambalaj malzemeleri ile paketlenerek korumaya alınmış gardırop ve mobilyalar",
    },
    {
      src: '/img/ekip.jpg',
      title: 'Profesyonel Nakliye Ekibimiz',
      desc: 'Lider logolu kurumsal kıyafetli kadrolu taşıma personellerimiz.',
      alt: "Konya Lider Evden Eve Nakliyat kurumsal logolu iş elbiseleriyle uzman ve sigortalı profesyonel taşıma ekibimiz",
    }
  ];

  const allItems = [...originalItems, ...newItems];

  const formattedArray = allItems.map(item => `  {
    src: '${item.src}',
    title: '${item.title}',
    desc: '${item.desc}',
    alt: "${item.alt}",
  }`).join(',\n');

  const newArrayBlock = `${arrayStartTag}\n${formattedArray}\n${arrayEndTag}`;

  pageContent = pageContent.substring(0, startIndex) + newArrayBlock + pageContent.substring(endIndex + arrayEndTag.length);

  fs.writeFileSync(galeriPagePath, pageContent, 'utf8');
  console.log('Successfully updated src/app/galeri/page.tsx with new images!');
}

processUserImages();
