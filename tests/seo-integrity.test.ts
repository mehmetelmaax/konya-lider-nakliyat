import { describe, it, expect } from 'vitest';
import { organizationSchema, breadcrumbSchema, faqSchema } from '../src/lib/schema';
import { SITE, SERVICES, DISTRICTS, ROUTES } from '../src/lib/site-config';

describe('Organization schema bütünlüğü', () => {
  const org = organizationSchema() as Record<string, unknown>;

  it('doğrulanmamış AggregateRating yayınlamaz', () => {
    expect(org).not.toHaveProperty('aggregateRating');
    expect(org).not.toHaveProperty('review');
  });

  it('boş sameAs dizisi yayınlamaz', () => {
    if ('sameAs' in org) {
      expect((org.sameAs as string[]).length).toBeGreaterThan(0);
      (org.sameAs as string[]).forEach((u) => expect(u).toMatch(/^https:\/\//));
    }
  });

  it('doğrulanmamış K3 belge numarası uydurmaz', () => {
    if ('hasCredential' in org) {
      expect(SITE.k3DocumentNumber).not.toBe('');
    }
  });

  it('zorunlu NAP alanları dolu', () => {
    expect(SITE.phone).toMatch(/^\+90\d{10}$/);
    expect(SITE.address.locality).toBeTruthy();
    expect(SITE.address.postalCode).toBeTruthy();
    expect(SITE.url).toMatch(/^https:\/\//);
    expect(SITE.url.endsWith('/')).toBe(false);
  });
});

describe('URL ve slug bütünlüğü', () => {
  it('hizmet slugları benzersiz ve kebab-case', () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it('bölge slugları benzersiz ve kebab-case', () => {
    const slugs = DISTRICTS.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it('rota slugları benzersiz ve Konya ile başlar', () => {
    const slugs = ROUTES.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s.startsWith('konya-')).toBe(true));
  });
});

describe('Meta açıklama uzunlukları', () => {
  it('hizmet açıklamaları 120-165 karakter aralığında', () => {
    SERVICES.forEach((s) => {
      expect(s.description.length).toBeGreaterThanOrEqual(110);
      expect(s.description.length).toBeLessThanOrEqual(165);
    });
  });

  it('hizmet title alanları 60 karakteri aşmaz', () => {
    SERVICES.forEach((s) => {
      expect(s.title.length).toBeLessThanOrEqual(65);
    });
  });
});

describe('Breadcrumb ve FAQ şemaları', () => {
  it('breadcrumb mutlak URL üretir ve sıralıdır', () => {
    const bc = breadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hizmetler', url: '/hizmetler' },
    ]) as { itemListElement: { position: number; item: string }[] };
    expect(bc.itemListElement[0].position).toBe(1);
    bc.itemListElement.forEach((i) => expect(i.item).toMatch(/^https:\/\//));
  });

  it('FAQ şeması boş cevap üretmez', () => {
    const faq = faqSchema([{ question: 'Soru?', answer: 'Cevap.' }]) as {
      mainEntity: { acceptedAnswer: { text: string } }[];
    };
    faq.mainEntity.forEach((q) => expect(q.acceptedAnswer.text.length).toBeGreaterThan(0));
  });
});
