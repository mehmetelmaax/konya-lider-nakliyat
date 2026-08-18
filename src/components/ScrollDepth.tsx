'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ScrollDepth() {
  useEffect(() => {
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      if (docHeight <= 0) return;

      const scrollPos = window.scrollY;
      const scrollPercentage = Math.round((scrollPos / docHeight) * 100);

      const thresholds = [25, 50, 75, 100];
      for (const depth of thresholds) {
        if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          
          if (depth === 75) {
            trackEvent('blog_okundu');
          }
          
          trackEvent('scroll_depth', { depth });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
