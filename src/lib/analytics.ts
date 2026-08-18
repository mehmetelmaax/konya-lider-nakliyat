export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
}

export function trackConversion() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
    const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
    if (gadsId && label) {
      (window as any).gtag('event', 'conversion', {
        'send_to': `${gadsId}/${label}`
      });
    }
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}
