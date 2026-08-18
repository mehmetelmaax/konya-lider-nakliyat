import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormSchema } from '@/lib/validation';
import { getEstimateFromForm } from '@/lib/pricing';

// Simple in-memory cache for IP rate limiting fallback
const ipCache = new Map<string, { count: number; expiresAt: number }>();

function cleanOldCache() {
  const now = Date.now();
  for (const [ip, data] of ipCache.entries()) {
    if (now > data.expiresAt) {
      ipCache.delete(ip);
    }
  }
}

// Helper to escape HTML tags to prevent HTML injection in emails
function escapeHtml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to mask PII in console logs for KVKK compliance
function maskName(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    const p = parts[0];
    return p.length <= 1 ? p : p[0] + '*'.repeat(p.length - 1);
  }
  const first = parts[0];
  const last = parts[parts.length - 1];
  return `${first[0]}${'*'.repeat(first.length - 1)} ${last[0]}${'*'.repeat(last.length - 1)}`;
}

function maskPhone(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 11) {
    return `${clean.substring(0, 4)}***${clean.substring(7, 9)}*${clean.substring(10)}`;
  }
  if (clean.length === 10) {
    return `0${clean.substring(0, 3)}***${clean.substring(6, 8)}*${clean.substring(9)}`;
  }
  return '***';
}

// Upstash Redis / Vercel KV REST API wrapper (Zero-dependency serverless helper)
async function redisCmd(cmd: string[]) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cmd)
    });
    if (res.ok) {
      const data = await res.json();
      return data.result;
    }
  } catch (err) {
    console.error('KV_REDIS_ERROR:', err);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting Check
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.headers.get('x-real-ip') || '127.0.0.1');
    
    let isRateLimited = false;

    // Try KV/Redis rate limiting first
    const limitKey = `rate_limit:${ip}`;
    const count = await redisCmd(['INCR', limitKey]);
    
    if (count !== null) {
      const numCount = Number(count);
      if (numCount === 1) {
        await redisCmd(['EXPIRE', limitKey, '60']); // 60s window
      }
      if (numCount > 3) {
        isRateLimited = true;
      }
    } else {
      // In-Memory Fallback (Note: In serverless/lambdas, this is unreliable due to stateless execution instances)
      cleanOldCache();
      const now = Date.now();
      const ipData = ipCache.get(ip);
      
      if (!ipData || now > ipData.expiresAt) {
        ipCache.set(ip, { count: 1, expiresAt: now + 60000 });
      } else {
        if (ipData.count >= 3) {
          isRateLimited = true;
        }
        ipData.count++;
      }
    }

    if (isRateLimited) {
      return NextResponse.json(
        { ok: false, message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => ({}));

    // 3. Honeypot check
    if (body.website && body.website.trim().length > 0) {
      console.warn('BOT_DETECTION: Honeypot filled by bot:', body.website);
      return NextResponse.json({ ok: true });
    }

    // 4. Server-side validation using Zod
    const validationResult = QuoteFormSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
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
    
    // Unified Price Calculation Engine
    const est = getEstimateFromForm(leadData.rooms, leadData.elevator, leadData.fromDistrict, leadData.toDistrict);

    // 5. Masked PII logging for KVKK compliance
    console.log('LEAD_CAPTURE:', JSON.stringify({
      name: maskName(leadData.name),
      phone: maskPhone(leadData.phone),
      fromDistrict: leadData.fromDistrict,
      toDistrict: leadData.toDistrict,
      rooms: leadData.rooms,
      elevator: leadData.elevator,
      referrer,
      timestamp,
      estimate: est
    }));

    // 6. Persistent Lead Capture (Vercel KV or Upstash Redis)
    const randomId = Math.random().toString(36).substring(2, 8);
    const redisKey = `lead:${Date.now()}:${randomId}`;
    const redisValue = JSON.stringify({
      ...leadData,
      referrer,
      timestamp,
      estimate: est,
      ipAddress: ip,
      kvkkOnayTimestamp: new Date().toISOString()
    });
    
    const kvSaved = await redisCmd(['SET', redisKey, redisValue]);
    if (kvSaved) {
      // Set lead expiration to 90 days to avoid storage bloat while keeping records
      await redisCmd(['EXPIRE', redisKey, '7776000']);
    }

    // 7. Secondary Backup Channel (Lead Webhook URL)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    let webhookSuccess = false;
    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'lead_captured',
            data: {
              ...leadData,
              referrer,
              timestamp,
              estimate: est,
              ipAddress: ip,
              kvkkOnayTimestamp: new Date().toISOString()
            }
          })
        });
        if (webhookResponse.ok) {
          webhookSuccess = true;
        } else {
          console.error('WEBHOOK_ERROR: Webhook notification delivery failed:', await webhookResponse.text());
        }
      } catch (err) {
        console.error('WEBHOOK_FATAL_ERROR: Unexpected error posting lead to webhook:', err);
      }
    }

    // 8. Email Notification via Resend
    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;
    const resendFrom = process.env.RESEND_FROM || 'Lider Nakliyat <onboarding@resend.dev>';

    if (!process.env.RESEND_FROM) {
      console.warn('RESEND_FROM is not configured in process.env. Falling back to default onboarding@resend.dev.');
    }

    let emailSuccess = false;

    if (apiKey && notifyEmail) {
      const escapedName = escapeHtml(leadData.name);
      const escapedPhone = escapeHtml(leadData.phone);
      const escapedFrom = escapeHtml(leadData.fromDistrict);
      const escapedTo = escapeHtml(leadData.toDistrict);
      const escapedRooms = escapeHtml(leadData.rooms);
      const escapedElevator = leadData.elevator === 'evet' ? 'Asansör Kurulsun' : 'Asansör İstenmiyor';
      
      const emailContent = {
        from: resendFrom,
        to: notifyEmail,
        subject: `Yeni Teklif Talebi - ${escapedName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9eef2; border-radius: 10px;">
            <h2 style="color: #102a43; border-bottom: 2px solid #f7931e; padding-bottom: 10px;">Yeni Teklif Talebi Alındı</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2; width: 180px;">Ad Soyad:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${escapedName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;"><a href="tel:${escapedPhone}">${escapedPhone}</a></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereden:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${escapedFrom}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereye:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${escapedTo}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Oda Sayısı:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${escapedRooms} Daire</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Asansör Kurulumu:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${escapedElevator}</td>
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

        if (response.ok) {
          emailSuccess = true;
        } else {
          console.error('RESEND_ERROR: Email notification delivery failed:', await response.text());
        }
      } catch (err) {
        console.error('RESEND_FATAL_ERROR: Unexpected error sending email notification:', err);
      }
    } else {
      console.warn('RESEND_WARNING: RESEND_API_KEY or NOTIFY_EMAIL is not set. Email notification skipped.');
    }

    // Lead is successfully captured if it is saved to KV/Redis, sent via Email, OR sent via Webhook
    const isCaptured = !!kvSaved || emailSuccess || webhookSuccess;
    if (!isCaptured) {
      throw new Error('Lead could not be saved to any channel (Email, Webhook, or KV Storage)');
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('API_TEKLIF_ERROR:', error);
    return NextResponse.json(
      { ok: false, message: 'Teklif talebiniz işlenirken bir sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
