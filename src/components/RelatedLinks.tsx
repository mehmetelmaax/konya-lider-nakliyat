import React from 'react';
import Link from 'next/link';
import { SERVICES, DISTRICTS } from '@/lib/site-config';
import { blogDatabase } from '@/lib/blog-data';

interface RelatedLinksProps {
  currentSlug: string;
  type: 'hizmet' | 'bolge' | 'blog';
  title?: string;
}

export default function RelatedLinks({ currentSlug, type, title }: RelatedLinksProps) {
  const links: { href: string; text: string }[] = [];

  // Simple hash function for string slug
  const getSlugHash = (slug: string) => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash += slug.charCodeAt(i);
    }
    return hash;
  };

  const hashVal = getSlugHash(currentSlug || 'default');

  // Helper to generate varied anchor texts for districts
  const getDistrictAnchor = (name: string, index: number) => {
    const templates = [
      `${name} evden eve nakliyat firması`,
      `${name} asansörlü ev taşıma`,
      `${name} sigortalı nakliye hizmeti`,
      `${name} profesyonel taşımacılık`,
      `${name} uygun fiyatlı nakliyat`,
      `${name} ev taşıma çözümleri`,
    ];
    return templates[(index + hashVal) % templates.length];
  };

  // Helper to generate varied anchor texts for services
  const getServiceAnchor = (name: string, index: number, prefix: string = '') => {
    const templates = [
      `Güvenilir ${prefix ? prefix + ' ' : ''}${name} hizmeti`,
      `Profesyonel ${prefix ? prefix + ' ' : ''}${name}`,
      `Sözleşmeli ${prefix ? prefix + ' ' : ''}${name} süreci`,
      `Konya ${prefix ? prefix + ' ' : ''}${name} çözümleri`,
      `${prefix ? prefix + ' ' : ''}${name} firmaları`,
    ];
    return templates[(index + hashVal) % templates.length];
  };

  // Helper to generate varied anchor texts for blogs
  const getBlogAnchor = (title: string, index: number) => {
    const templates = [
      `${title} rehberi`,
      `${title} detaylı incelemesi`,
      `${title} yazımız`,
      `${title} ipuçları`,
    ];
    return templates[(index + hashVal) % templates.length];
  };

  if (type === 'hizmet') {
    // 4 merkez ilçe + 3 ilgili hizmet + 2 blog yazısı
    const merkezDistricts = DISTRICTS.filter(d => d.tier === 'merkez');
    merkezDistricts.forEach((d, idx) => {
      links.push({
        href: `/bolgeler/${d.slug}`,
        text: getDistrictAnchor(d.name, idx + 7),
      });
    });

    const otherServices = SERVICES.filter(s => s.slug !== currentSlug).slice(0, 3);
    otherServices.forEach((s, idx) => {
      links.push({
        href: `/hizmetler/${s.slug}`,
        text: getServiceAnchor(s.name, idx + 1),
      });
    });

    const blogs = Object.values(blogDatabase).slice(0, 2);
    blogs.forEach((b, idx) => {
      links.push({
        href: `/blog/${b.id}`,
        text: getBlogAnchor(b.title.replace(/\?$/, ''), idx + 4),
      });
    });
  } 
  
  else if (type === 'bolge') {
    // 3 neighbors + 6 services + /konya-nakliyat-fiyatlari
    const currentDistrict = DISTRICTS.find(d => d.slug === currentSlug);
    let neighborsList: Array<(typeof DISTRICTS)[number]> = [];
    
    if (currentDistrict && currentDistrict.neighbors) {
      neighborsList = DISTRICTS.filter(d => 
        currentDistrict.neighbors.some(n => d.slug.startsWith(n))
      ).slice(0, 3);
    }
    
    // Fallback if no neighbors found
    if (neighborsList.length < 3) {
      neighborsList = DISTRICTS.filter(d => d.slug !== currentSlug).slice(0, 3);
    }

    neighborsList.forEach((d, idx) => {
      links.push({
        href: `/bolgeler/${d.slug}`,
        text: getDistrictAnchor(d.name, idx + 13),
      });
    });

    // Take up to 6 services
    const services = SERVICES.slice(0, 6);
    services.forEach((s, idx) => {
      links.push({
        href: `/hizmetler/${s.slug}`,
        text: getServiceAnchor(s.name, idx + 7, currentDistrict ? currentDistrict.name : ''),
      });
    });

    // Add fiyatlari link
    links.push({
      href: '/konya-nakliyat-fiyatlari',
      text: `${currentDistrict ? currentDistrict.name : 'Konya'} ev taşıma fiyatları listesi`,
    });
  } 
  
  else if (type === 'blog') {
    // 2 hizmet + 2 bölge + 2 blog
    const services = SERVICES.slice(0, 2);
    services.forEach((s, idx) => {
      links.push({
        href: `/hizmetler/${s.slug}`,
        text: getServiceAnchor(s.name, idx + 13),
      });
    });

    const districts = DISTRICTS.filter(d => d.tier === 'merkez').slice(0, 2);
    districts.forEach((d, idx) => {
      links.push({
        href: `/bolgeler/${d.slug}`,
        text: getDistrictAnchor(d.name, idx + 19),
      });
    });

    const otherBlogs = Object.values(blogDatabase).filter(b => b.id !== currentSlug).slice(0, 2);
    otherBlogs.forEach((b, idx) => {
      links.push({
        href: `/blog/${b.id}`,
        text: getBlogAnchor(b.title.replace(/\?$/, ''), idx + 9),
      });
    });

    links.push({
      href: '/konya-nakliyat-firmalari',
      text: 'Konya En İyi Evden Eve Nakliyat Firmaları',
    });
  }

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 no-print">
      <h3 className="font-display font-bold text-forest text-lg border-b border-gray-light pb-3">
        {title || 'Alakalı Hizmetlerimiz ve Bölgelerimiz'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="text-gold-text hover:underline font-semibold flex items-center gap-1.5"
          >
            <span>➔</span>
            <span>{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
