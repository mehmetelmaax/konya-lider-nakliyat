import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '../src/app/api/teklif/route';
import { NextRequest } from 'next/server';

describe('Teklif API Fallback Tests', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return 503 with fallback: whatsapp when no lead channels are configured', async () => {
    // Ensure all target env variables are undefined
    delete process.env.KV_REST_API_URL;
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.LEAD_WEBHOOK_URL;
    delete process.env.RESEND_API_KEY;
    delete process.env.NOTIFY_EMAIL;

    const requestBody = {
      name: 'Test Kullanıcı',
      phone: '05555555555',
      fromDistrict: 'Selçuklu',
      toDistrict: 'Meram',
      rooms: '3+1',
      elevator: 'hayir',
      kvkkOnay: true
    };

    const req = new Request('http://localhost/api/teklif', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }) as NextRequest;

    const response = await POST(req);
    expect(response.status).toBe(503);

    const data = await response.json();
    expect(data.ok).toBe(false);
    expect(data.fallback).toBe('whatsapp');
  });
});
