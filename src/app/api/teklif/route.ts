import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormSchema } from '@/lib/validation';

// Simple in-memory cache for IP rate limiting
const ipCache = new Map<string, { count: number; expiresAt: number }>();

function cleanOldCache() {
  const now = Date.now();
  for (const [ip, data] of ipCache.entries()) {
    if (now > data.expiresAt) {
      ipCache.delete(ip);
    }
  }
}

function calculateServerEstimate(rooms: string, elevator: string, fromDistrict: string, toDistrict: string) {
  let basePrice = 12000;
  if (rooms === '2+1') basePrice = 15000;
  if (rooms === '3+1') basePrice = 18000;
  if (rooms === '4+1+') basePrice = 22000;
  if (rooms === 'ofis') basePrice = 12000;

  if (elevator === 'evet') {
    basePrice += 2500;
  }

  if (
    toDistrict.includes('Şehirlerarası') || 
    fromDistrict.includes('Şehirlerarası') ||
    toDistrict.includes('İl Dışı') ||
    fromDistrict.includes('İl Dışı')
  ) {
    return { min: basePrice + 17500, max: basePrice + 32000 };
  }

  return { min: basePrice, max: basePrice + 5000 };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    cleanOldCache();
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.headers.get('x-real-ip') || '127.0.0.1');
    
    const now = Date.now();
    const ipData = ipCache.get(ip);
    
    if (!ipData || now > ipData.expiresAt) {
      ipCache.set(ip, { count: 1, expiresAt: now + 60000 }); // 60s window
    } else {
      if (ipData.count >= 3) {
        return NextResponse.json(
          { ok: false, message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyin.' },
          { status: 429 }
        );
      }
      ipData.count++;
    }

    // 2. Parse request body
    const body = await req.json().catch(() => ({}));

    // 3. Honeypot check (website must be empty)
    if (body.website && body.website.trim().length > 0) {
      console.warn('BOT_DETECTION: Honeypot filled by bot:', body.website);
      // Return 200 silently to deceive the bot
      return NextResponse.json({ ok: true });
    }

    // 4. Server-side validation using Zod
    const validationResult = QuoteFormSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      // Get the first error message to display
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const errorMessage = (fieldErrors as any)[firstErrorKey]?.[0] || 'Lütfen bilgilerinizi kontrol edin.';
      
      return NextResponse.json(
        { ok: false, message: errorMessage, errors: fieldErrors },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;
    const referrer = req.headers.get('referer') || '/teklif-al';
    const timestamp = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
    const est = calculateServerEstimate(leadData.rooms, leadData.elevator, leadData.fromDistrict, leadData.toDistrict);

    // 5. Log lead as JSON (Vercel backup)
    console.log('LEAD_CAPTURE:', JSON.stringify({
      ...leadData,
      referrer,
      timestamp,
      estimate: est
    }));

    // 6. Send email notification via Resend
    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (apiKey && notifyEmail) {
      const emailContent = {
        // TODO: Bu gönderici adresi (onboarding@resend.dev) Resend'in test adresidir ve sadece kendi doğrulanmış e-postanıza gönderim yapar. Canlı ortamda doğrulanmış kurumsal domain adresinizle değiştirilmelidir.
        from: 'Lider Nakliyat <onboarding@resend.dev>',
        to: notifyEmail,
        subject: `Yeni Teklif Talebi - ${leadData.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9eef2; rounded: 10px;">
            <h2 style="color: #102a43; border-bottom: 2px solid #f7931e; padding-bottom: 10px;">Yeni Teklif Talebi Alındı</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2; width: 180px;">Ad Soyad:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;"><a href="tel:${leadData.phone}">${leadData.phone}</a></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereden:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.fromDistrict}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereye:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.toDistrict}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Oda Sayısı:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.rooms} Daire</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Asansör Kurulumu:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.elevator === 'evet' ? 'Asansör Kurulsun' : 'Asansör İstenmiyor'}</td>
              </tr>
              <tr style="background: #fff8e7;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2; color: #a85b00;">Tahmini Fiyat:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2; font-weight: bold; color: #a85b00;">
                  ${est.min.toLocaleString('tr-TR')} TL - ${est.max.toLocaleString('tr-TR')} TL
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Zaman Damgası:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${timestamp}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Referans Sayfa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2; font-size: 11px;">${referrer}</td>
              </tr>
            </table>
            <div style="margin-top: 25px; font-size: 11px; color: #7b8a97; text-align: center;">
              Bu e-posta Konya Lider Nakliyat web sitesi teklif hesaplayıcısı üzerinden otomatik olarak gönderilmiştir.
            </div>
          </div>
        `
      };

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailContent)
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('RESEND_ERROR: Email notification delivery failed:', errText);
        } else {
          console.log('RESEND_SUCCESS: Email notification sent successfully to:', notifyEmail);
        }
      } catch (err) {
        console.error('RESEND_FATAL_ERROR: Unexpected error sending email notification:', err);
      }
    } else {
      console.warn('RESEND_WARNING: RESEND_API_KEY or NOTIFY_EMAIL is not set in env. Skipping email notification.');
    }

    // Return success to the user even if email delivery fails (the log backup is safe)
    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('API_TEKLIF_ERROR:', error);
    return NextResponse.json(
      { ok: false, message: 'İstek işlenirken sunucuda bir hata oluştu.' },
      { status: 500 }
    );
  }
}
