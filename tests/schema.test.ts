import { describe, it, expect } from 'vitest';
import { organizationSchema, breadcrumbSchema, serviceSchema, faqSchema } from '../src/lib/schema';

describe('JSON-LD Schema Verification Tests', () => {
  it('should generate valid organizationSchema', () => {
    const schema = organizationSchema() as unknown as Record<string, unknown>;
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('MovingCompany');

    const logo = schema.logo as { width: number; height: number };
    expect(logo.width).toBe(400);
    expect(logo.height).toBe(266);

    // Katı kural: doğrulanmamış aggregateRating asla yayınlanmamalı
    expect(schema.aggregateRating).toBeUndefined();
    expect(schema.review).toBeUndefined();
  });

  it('should generate valid breadcrumbSchema', () => {
    const schema = breadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hizmetler', url: '/hizmetler' }
    ]);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].name).toBe('Ana Sayfa');
  });

  it('should generate valid serviceSchema', () => {
    const schema = serviceSchema({
      name: 'Asansörlü Evden Eve Nakliyat',
      description: 'Test açıklama',
      slug: 'asansorlu-evden-eve-nakliyat',
      areaName: 'Konya'
    });
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Service');
    expect(schema.name).toContain('Asansörlü');
  });

  it('should generate valid serviceSchema with provider reference to organization', () => {
    const schema = serviceSchema({
      name: 'Asansörlü Evden Eve Nakliyat',
      description: 'Test açıklama',
      slug: 'asansorlu-evden-eve-nakliyat',
      areaName: 'Konya'
    }) as unknown as { provider?: { '@id'?: string } };
    expect(schema.provider).toBeDefined();
    expect(schema.provider?.['@id']).toContain('#organization');
  });

  it('should generate valid faqSchema', () => {
    const schema = faqSchema([
      { question: 'Soru 1', answer: 'Cevap 1' }
    ]);
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].name).toBe('Soru 1');
  });
});
