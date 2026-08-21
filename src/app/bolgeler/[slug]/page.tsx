import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Building, Shield } from 'lucide-react';
import { DISTRICTS } from '@/lib/site-config';
import { DISTRICTS_CONTENT } from '@/lib/districts-content';
import QuoteForm from '@/components/QuoteForm';
import PricingMatrix from '@/components/geo/PricingMatrix';
import BuildingAnalysis from '@/components/geo/BuildingAnalysis';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for all districts in next build
export async function generateStaticParams() {
  return DISTRICTS.map((d) => ({
    slug: d.slug,
  }));
}

// Generate dynamic metadata based on the active district config
export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const district = DISTRICTS.find((d) => d.slug === slug);
  const content = DISTRICTS_CONTENT[slug];

  if (!district || !content) {
    return notFound();
  }

  // Quality check: Ensure no empty content is rendered
  if (!content.name || !content.intro || !content.mahalleler || content.mahalleler.length === 0) {
    throw new Error(`CRITICAL_SEO_ERROR: District page content for "${slug}" is empty or incomplete!`);
  }

  return {
    title: `${content.name} Evden Eve Nakliyat | Lider Nakliyat`,
    description: `Konya ${content.name} ilçesinde ${content.mahalleler.slice(0, 3).join(', ')} mahallelerinde asansörlü, sigortalı, marangozlu evden eve nakliyat.`,
    alternates: {
      canonical: `/bolgeler/${slug}`,
    },
    robots: {
      index: district.indexable,
      follow: true,
    },
  };
}

export default async function DistrictPage({ params }: RouteParams) {
  const { slug } = await params;
  const district = DISTRICTS.find((d) => d.slug === slug);
  const content = DISTRICTS_CONTENT[slug];

  if (!district || !content) {
    return notFound();
  }

  // Strict enforcement: Throw error during build if required SEO elements are missing
  if (
    !content.name ||
    !content.intro ||
    content.intro.length < 150 || // Ensure significant custom content
    !content.binaStoku ||
    !content.asansorNotu ||
    !content.ortalamaSure ||
    !content.yerelReferans ||
    !content.sss ||
    content.sss.length < 3
  ) {
    throw new Error(`CRITICAL_SEO_ERROR: Content quality validation failed for district "${slug}". Required fields are missing or too thin.`);
  }

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: `${content.name} Evden Eve Nakliyat`,
        description: `Konya ${content.name} ilçesinde ${content.mahalleler.slice(0, 4).join(', ')} mahallelerinde asansörlü, sigortalı, marangozlu evden eve nakliyat.`,
        slug: `bolgeler/${slug}`,
        areaName: content.name,
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '/bolgeler' },
        { name: content.name, url: `/bolgeler/${slug}` },
      ]),
      faqSchema(content.sss),
    ],
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb 
          items={[
            { name: 'Bölgelerimiz', url: '/bolgeler' }, 
            { name: content.name, url: `/bolgeler/${slug}` }
          ]} 
          className="pt-4" 
        />
        
        {/* Intro Section */}
        <section className="py-20 bg-forest text-white text-center space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest font-sans uppercase">
            {district.tier === 'merkez' ? 'KONYA MERKEZ İLÇE SERVİSİ' : 'KONYA TAŞRA İLÇE SERVİSİ'}
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            {content.name} Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            {content.name} ilçesinin tüm mahallelerinde K3 belgeli kapalı kasa araçlarımız, marangozlu nakliye ekiplerimiz ve dış cephe asansörlerimizle sabit fiyat garantili profesyonel taşıma çözümleri sunuyoruz.
          </p>
        </section>

        {/* AI Overviews & GEO Optimization Direct Answer Block */}
        <section className="bg-white/60 py-6 border-b border-gray-light/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-light shadow-sm text-sm text-charcoal leading-relaxed">
              <h2 className="font-bold text-forest text-base mb-2">{content.name} Evden Eve Nakliyat Hakkında Sıkça Sorulan Temel Soru</h2>
              <p>
                <strong>Soru:</strong> Lider Nakliyat {content.name} ilçesinde nasıl ev taşıma hizmeti vermektedir?
                <br />
                <strong>Cevap:</strong> Konya Lider Nakliyat, {content.name} ilçesinde <strong>K3 yetki belgesi</strong> ve özmal dış cephe asansör filosuyla sigortalı evden eve nakliye hizmeti sunar. Bölgedeki bina yapılarına uygun asansör sistemlerimiz ve kadrolu ekibimizle tüm nakliyat sürecini resmi sabit fiyat sözleşmesi altında güvenceye alarak tamamlarız.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Kurumsal Güvence */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-gold" />
              <span>Güvenilir {content.name} Nakliye Çözümleri</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              {content.intro}
            </p>
          </div>

          <PricingMatrix />
          <BuildingAnalysis districtName={content.name} />
          
          <RelatedLinks currentSlug={slug} type="bolge" />

          {/* Section 2: Mahalleler */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              <span>{content.name}'da Hizmet Verdiğimiz Mahalleler</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              {content.name} ilçesinin dört bir yanına ayrım yapmaksızın hızlı ve güvenilir nakliye tır ve kamyonetlerimizi sevk ediyoruz. Bölgede yoğun olarak hizmet verdiğimiz mahalleler:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {content.mahalleler.map((mah, idx) => (
                <div key={idx} className="bg-off-white p-4 rounded-lg border border-gray-light/60 text-center font-bold text-forest text-sm">
                  {mah}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Ulaşım ve İntikal */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl flex items-center gap-2">
              <Building className="w-6 h-6 text-gold" />
              <span>Ulaşım, Mesafe ve İntikal Bilgileri</span>
            </h2>
            <div className="text-charcoal text-sm md:text-base leading-relaxed space-y-3">
              <p>
                {content.name} ilçesi Konya merkez depomuza yaklaşık <strong>{district.distanceKm === 0 ? 'şehir içi mesafede' : `${district.distanceKm} km`}</strong> uzaklıktadır. Taşınma günü lojistik ekiplerimiz belirlenen saatte adrese intikal eder.
              </p>
              <p>
                <strong>Bina Stoğu Yapısı:</strong> {content.binaStoku}
              </p>
              <p>
                <strong>Eşya Asansörü Kurulumu:</strong> {content.asansorNotu}
              </p>
              <p>
                <strong>Tipik Taşınma Süresi:</strong> {content.ortalamaSure}
              </p>
              <p>
                <strong>Yerel Faaliyet Notu:</strong> {content.yerelReferans}
              </p>
            </div>
          </div>

          {/* Fast Quote Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm">
            <h2 className="font-display font-bold text-forest text-xl md:text-2xl text-center mb-6">
              Hızlı Teklif Al
            </h2>
            <QuoteForm defaultDistrict={content.name} />
          </div>

        </section>
      </main>
    </>
  );
}
