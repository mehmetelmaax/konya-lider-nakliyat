import { fetchGoogleReviews } from '@/lib/reviews';
import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24 saat

/**
 * Google Business Profile yorum proxy'si.
 * Sadece fetchGoogleReviews sarmalayıcısıdır.
 */
export async function GET() {
  const data = await fetchGoogleReviews();
  return NextResponse.json(data);
}
