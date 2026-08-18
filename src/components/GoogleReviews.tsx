'use client';

import React, { useEffect, useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SITE } from '@/lib/site-config';

interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // DOĞRULANACAK: Google Business Profile Place ID ve API Anahtarı temin edilmelidir.
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID;
  const apiKey = process.env.GBP_API_KEY; // Sunucu tarafı proxy'si veya doğrudan çağrı için

  useEffect(() => {
    if (!placeId || !apiKey) {
      // API bilgileri yoksa statik fallback veya boş liste gösterilecek, schema basılmayacaktır.
      return;
    }

    async function fetchReviews() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=tr`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.result && data.result.reviews) {
            setReviews(data.result.reviews);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('GBP_REVIEWS_FETCH_ERROR:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [placeId, apiKey]);

  if (!placeId || !apiKey) {
    return (
      <section className="py-12 bg-white rounded-2xl border border-gray-light p-8 text-center space-y-4">
        <div className="w-12 h-12 bg-orange/10 text-orange rounded-full flex items-center justify-center mx-auto">
          <MessageCircle className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-navy text-lg">
          Google Müşteri Yorumları Entegrasyonu
        </h3>
        <p className="text-gray-500 text-xs max-w-md mx-auto leading-relaxed">
          Google Business Profile API bağlantısı hazırlandı. Place ID ve API anahtarı tanımlandığında, gerçek Google yorumlarınız ve yıldız puanınız bu alanda canlı olarak listelenecektir.
        </p>
        <div className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-3 py-1.5 rounded w-fit mx-auto border border-gray-light/60">
          // DOĞRULANACAK: PLACE_ID ve API_KEY bekleniyor.
        </div>
      </section>
    );
  }

  if (loading) {
    return <div className="text-center py-10 text-xs text-gray-400">Yorumlar yükleniyor...</div>;
  }

  if (error || reviews.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.slice(0, 3).map((review, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-light shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-orange fill-orange' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-charcoal text-xs md:text-sm italic leading-relaxed">
                "{review.text}"
              </p>
            </div>
            
            <div className="flex items-center gap-3 border-t border-gray-light pt-4">
              {review.profile_photo_url && (
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="font-display font-bold text-navy text-xs">{review.author_name}</h4>
                <span className="text-[10px] text-gray-400">{review.relative_time_description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href={SITE.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('google_yorumlar_tumu', { sayfa: window.location.pathname })}
          className="text-orange hover:text-navy transition-colors font-bold text-xs uppercase tracking-widest"
        >
          Google'daki Tüm Yorumları Gör ➔
        </a>
      </div>
    </section>
  );
}

/**
 * Yalnızca Place ID ve API anahtarı mevcut olduğunda ve Google Business Profile yorumları çekilebildiğinde
 * schema çıktısına AggregateRating ve Review yapısal verisini ekleyen yardımcı fonksiyon.
 * API bağlantısı kurulmadığı sürece sahte veri basılmasını engelleyerek Google cezalarını önler.
 */
export function getGoogleReviewsSchema(reviewsData: GoogleReview[], averageRating: number, totalRatings: number) {
  const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID;
  const apiKey = process.env.GBP_API_KEY;

  if (!placeId || !apiKey || reviewsData.length === 0) {
    return null;
  }

  return {
    '@type': 'AggregateRating',
    'ratingValue': averageRating,
    'reviewCount': totalRatings,
    'bestRating': '5',
    'worstRating': '1',
    'itemReviewed': {
      '@type': 'MovingCompany',
      'name': SITE.name,
      'telephone': SITE.phone,
      'priceRange': SITE.priceRange,
      'image': `${SITE.url}/img/slayt-1.jpg`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': SITE.address.street,
        'addressLocality': SITE.address.locality,
        'addressRegion': SITE.address.region,
        'postalCode': SITE.address.postalCode,
        'addressCountry': SITE.address.country
      }
    },
    'review': reviewsData.map((review) => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': review.author_name
      },
      'datePublished': new Date(review.time * 1000).toISOString().split('T')[0],
      'reviewBody': review.text,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.rating,
        'bestRating': '5',
        'worstRating': '1'
      }
    }))
  };
}
