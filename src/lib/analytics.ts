export type GAEventName = 
  | 'quote_form_start'
  | 'quote_form_submit'
  | 'phone_click'
  | 'whatsapp_click'
  | 'price_calculator_use'
  | 'scroll_75'
  | 'sss_acildi'
  | 'harita_tikla'
  | 'whatsapp_tikla'
  | 'telefon_tikla'
  | 'google_yorumlar_tumu'
  | 'fiyat_hesaplandi'
  | 'teklif_formu_basladi'
  | 'teklif_formu_hata'
  | 'teklif_formu_gonderildi'
  | 'blog_okundu'
  | 'scroll_depth';

export function trackEvent(name: GAEventName, params?: Record<string, any>) {
  if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);

    // Dynamic Google Ads conversion tracking integration
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
    if (gadsId) {
      let label = '';
      if (name === 'quote_form_submit' || name === 'teklif_formu_gonderildi') {
        label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL_QUOTE || '';
      } else if (name === 'phone_click' || name === 'telefon_tikla') {
        label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL_PHONE || '';
      } else if (name === 'whatsapp_click' || name === 'whatsapp_tikla') {
        label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL_WHATSAPP || '';
      }

      if (label) {
        window.gtag('event', 'conversion', {
          'send_to': `${gadsId}/${label}`
        });
      }
    }
  }
}

export function trackConversion() {
  if (typeof window !== 'undefined' && window.gtag) {
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
    const label = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL_QUOTE;
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
