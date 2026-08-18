import React from 'react';
import { organizationSchema } from '@/lib/schema';

export default function JsonLd({ data }: { data: any }) {
  let mergedData = { ...data };
  if (mergedData && typeof mergedData === 'object') {
    if (Array.isArray(mergedData['@graph'])) {
      const hasOrg = mergedData['@graph'].some(
        (item: any) =>
          item['@type'] === 'MovingCompany' ||
          item['@id']?.endsWith('#organization')
      );
      if (!hasOrg) {
        const org = { ...organizationSchema() } as any;
        delete org['@context'];
        mergedData['@graph'] = [org, ...mergedData['@graph']];
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
