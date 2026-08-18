'use client';

import React, { useEffect } from 'react';
import { SITE } from '@/lib/site-config';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global Application Error captured:', error);
  }, [error]);

  return (
    <html lang="tr">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'sans-serif',
        backgroundColor: '#F9FAFB',
        color: '#102A43',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '500px',
          padding: '40px 20px',
          margin: '20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E4E7EB',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 900,
            margin: '0 0 16px 0',
            color: '#102A43'
          }}>
            Kritik Bir Hata Oluştu
          </h1>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#486581',
            margin: '0 0 24px 0'
          }}>
            Uygulama yüklenirken kritik bir hata meydana geldi. Sorunu gidermek için sayfayı yenilemeyi deneyebilirsiniz.
          </p>
          
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#F7931E',
              color: '#102A43',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'opacity 0.2s',
              margin: '0 0 20px 0'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Sayfayı Yeniden Yükle
          </button>

          <div style={{
            borderTop: '1px solid #E4E7EB',
            paddingTop: '20px',
            fontSize: '13px',
            color: '#627D98'
          }}>
            Destek için bizi arayın: <br />
            <a
              href={SITE.phoneHref}
              style={{
                color: '#F7931E',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
