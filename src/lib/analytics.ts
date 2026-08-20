export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
}

export function trackConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
    const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
    if (gadsId && label) {
      window.gtag('event', 'conversion', {
        'send_to': `${gadsId}/${label}`
      });
    }
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
