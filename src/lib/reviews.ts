export interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface ReviewsData {
  configured: boolean;
  result: {
    rating: number | null;
    user_ratings_total: number | null;
    googleMapsUri: string | null;
    reviews: GoogleReview[];
  } | null;
}

export async function fetchGoogleReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GBP_API_KEY;
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID;

  if (!apiKey || !placeId) {
    return { configured: false, result: null };
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=tr`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      throw new Error(`Places API status: ${res.status}`);
    }

    const data = await res.json();

    return {
      configured: true,
      result: {
        rating: typeof data.rating === 'number' ? data.rating : null,
        user_ratings_total: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
        googleMapsUri: data.googleMapsUri ?? null,
        reviews: Array.isArray(data.reviews)
          ? data.reviews.map((r: any) => ({
              author_name: r.authorAttribution?.displayName ?? 'Google Kullanıcısı',
              profile_photo_url: r.authorAttribution?.photoUri ?? '',
              rating: typeof r.rating === 'number' ? r.rating : 0,
              relative_time_description: r.relativePublishTimeDescription ?? '',
              text: (r.text?.text ?? '').trim(),
              time: r.publishTime ? new Date(r.publishTime).getTime() : Date.now(),
            }))
          : [],
      },
    };
  } catch (error) {
    console.error('GBP_API_PROXY_ERROR:', error);
    return { configured: true, result: null };
  }
}
