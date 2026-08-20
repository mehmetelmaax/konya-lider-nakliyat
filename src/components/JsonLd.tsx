import React from 'react';
import { organizationSchema } from '@/lib/schema';

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const mergedData = { ...data };
  if (mergedData && typeof mergedData === 'object') {
    const graph = mergedData['@graph'];
    if (Array.isArray(graph)) {
      const hasOrg = graph.some(
        (item: unknown) =>
          item &&
          typeof item === 'object' &&
          ((item as Record<string, unknown>)['@type'] === 'MovingCompany' ||
            String((item as Record<string, unknown>)['@id'] || '').endsWith('#organization'))
      );
      if (!hasOrg) {
        const org = { ...organizationSchema() } as Record<string, unknown>;
        delete org['@context'];
        mergedData['@graph'] = [org, ...graph];
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mergedData) }}
    />
  );
}
