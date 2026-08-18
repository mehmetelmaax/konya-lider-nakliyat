import { SITE, SERVICES, DISTRICTS } from './site-config';
import { FACTS } from './facts';

export function organizationSchema() {
  const socialFiltered = [
    SITE.social.facebook as string,
    SITE.social.instagram as string,
    SITE.social.youtube as string,
    SITE.social.googleBusinessProfile as string
  ].filter((value) => value && value.trim() !== '');

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${SITE.url}/#organization`,
    'name': SITE.name,
    'alternateName': SITE.shortName,
    'url': SITE.url,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE.url}/img/logo.png`,
      'width': 200,
      'height': 60
    },
    'image': `${SITE.url}/img/slayt-1.jpg`,
    'telephone': SITE.phone,
    'email': SITE.email,
    'description': `${SITE.name}, Konya genelinde K3 yetki belgesi ve mobil dış cephe asansörleri ile ${FACTS.foundedYear} yılından bu yana sabit fiyat garantili ve sigortalı evden eve taşımacılık hizmeti sunmaktadır.`,
    'slogan': 'Sabit fiyat garantisiyle sigortalı ve asansörlü evden eve nakliyat.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': SITE.address.street,
      'addressLocality': SITE.address.locality,
      'addressRegion': SITE.address.region,
      'postalCode': SITE.address.postalCode,
      'addressCountry': SITE.address.country,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': SITE.geo.lat,
      'longitude': SITE.geo.lng,
    },
    'hasMap': SITE.googleMapsUrl,
    'serviceArea': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': SITE.geo.lat,
        'longitude': SITE.geo.lng
      },
      'geoRadius': '150000'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': SITE.hours.opens,
      'closes': SITE.hours.closes,
    },
    'areaServed': DISTRICTS.map((district) => ({
      '@type': 'AdministrativeArea',
      'name': `${district.name}, Konya`
    })),
    'foundingDate': `${FACTS.foundedYear}-03-15`,
    'priceRange': SITE.priceRange,
    'currenciesAccepted': 'TRY',
    'paymentAccepted': 'Nakit, Kredi Kartı, Havale/EFT',
    
    // Professional K3 Certification Schema (DOĞRULANACAK)
    ...(SITE.k3DocumentNumber ? {
      'hasCredential': {
        '@type': 'EducationalOccupationalCredential',
        'credentialCategory': 'K3 Yetki Belgesi',
        'educationalLevel': 'K3 Karayolu Eşya Taşımacılığı Yetki Belgesi',
        'credentialNumber': SITE.k3DocumentNumber,
        'recognizedBy': {
          '@type': 'GovernmentOrganization',
          'name': 'Ulaştırma ve Altyapı Bakanlığı'
        }
      }
    } : {}),

    // Number of Employees (DOĞRULANACAK)
    ...(SITE.numberOfEmployees ? {
      'numberOfEmployees': {
        '@type': 'QuantitativeValue',
        'value': SITE.numberOfEmployees
      }
    } : {}),

    'knowsAbout': [
      'evden eve nakliyat',
      'asansörlü nakliyat',
      'eşya paketleme',
      'ofis taşımacılığı',
      'şehirlerarası nakliyat',
      'parça eşya taşıma',
      'piyano ve kasa taşıma',
      'eşya depolama',
      'ücretsiz ekspertiz'
    ],
    'makesOffer': SERVICES.map((service) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Service',
        'name': service.name,
        'description': service.description,
        'url': `${SITE.url}/hizmetler/${service.slug}`
      }
    })),
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Lider Nakliyat Hizmetleri',
      'itemListElement': SERVICES.map((service) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': service.name,
          'description': service.description,
          'url': `${SITE.url}/hizmetler/${service.slug}`
        }
      }))
    },
    ...(socialFiltered.length > 0 ? { 'sameAs': socialFiltered } : {})
  };

  return organization;
}

// 2b) websiteSchema() -> WebSite
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    'url': SITE.url,
    'name': SITE.name,
    'publisher': {
      '@id': `${SITE.url}/#organization`
    },
    'inLanguage': 'tr-TR'
  };
}

// 2c) serviceSchema({ name, description, slug, areaName? }) -> '@type': 'Service'
export function serviceSchema({ name, description, slug, areaName }: { name: string; description: string; slug: string; areaName?: string }) {
  const cleanSlug = slug.startsWith('/') ? slug : `/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Moving Services',
    'name': name,
    'description': description,
    'provider': {
      '@id': `${SITE.url}/#organization`
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': areaName ? `${areaName}, Konya` : 'Konya'
    },
    'url': `${SITE.url}${cleanSlug}`
  };
}

// 2d) breadcrumbSchema(items: {name, url}[]) -> BreadcrumbList
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => {
      const cleanUrl = item.url.startsWith('http') 
        ? item.url 
        : `${SITE.url}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;
      return {
        '@type': 'ListItem',
        'position': idx + 1,
        'name': item.name,
        'item': cleanUrl
      };
    })
  };
}

// 2e) faqSchema(faqs: {question, answer}[]) -> FAQPage
export function faqSchema(faqsList: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsList.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function localBusinessSchema() {
  const org = { ...organizationSchema() } as any;
  delete org['@context'];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      {
        '@type': 'ContactPage',
        '@id': `${SITE.url}/iletisim/#webpage`,
        'url': `${SITE.url}/iletisim`,
        'name': `İletişim | ${SITE.name}`,
        'description': `Konya Lider Nakliyat Selçuklu ofis iletişim bilgileri. Fiyat teklifi almak, rezervasyon yapmak veya bilgi edinmek için bize ulaşın.`,
        'mainEntity': {
          '@id': `${SITE.url}/#organization`
        }
      }
    ]
  };
}
