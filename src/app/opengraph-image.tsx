import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Konya Lider Nakliyat | Sabit Fiyatlı Evden Eve Taşımacılık';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D3E30',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '40px',
        }}
      >
        {/* Accent border strip at the top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            backgroundColor: '#D4AF37',
          }}
        />

        {/* Small subtitle/trust mark */}
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#D4AF37',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '20px',
          }}
        >
          Evden Eve Nakliyat
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '30px',
            textTransform: 'uppercase',
          }}
        >
          KONYA LIDER NAKLİYAT
        </div>

        {/* Features tag row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: '#BAC7D5',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            padding: '12px 30px',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '40px',
          }}
        >
          <span>Sabit Fiyat</span>
          <span style={{ margin: '0 15px', color: '#D4AF37' }}>•</span>
          <span>Sigortalı</span>
          <span style={{ margin: '0 15px', color: '#D4AF37' }}>•</span>
          <span>Asansörlü</span>
          <span style={{ margin: '0 15px', color: '#D4AF37' }}>•</span>
          <span>K3 Belgeli</span>
        </div>

        {/* Call to action phone number */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            backgroundColor: '#D4AF37',
            padding: '16px 40px',
            borderRadius: '16px',
          }}
        >
          <span style={{ color: '#0D3E30', marginRight: '10px' }}>📞</span>
          <span style={{ color: '#0D3E30' }}>0554 640 02 05</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
