'use client';

import React, { useEffect, useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SITE } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';

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
  const [rating, setRating] = useState(4.9);
  const [ratingsCount, setRatingsCount] = useState(120);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (data.result) {
            if (data.result.reviews) {
              setReviews(data.result.reviews);
            }
            if (data.result.rating) {
              setRating(data.result.rating);
            }
            if (data.result.user_ratings_total) {
              setRatingsCount(data.result.user_ratings_total);
            }
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
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-xs text-gray-400">Yorumlar yükleniyor...</div>;
  }

  if (error || reviews.length === 0) {
    return (
      <section className="py-12 bg-white rounded-2xl border border-gray-light p-8 text-center space-y-4 text-charcoal">
        <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto">
          <MessageCircle className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-forest text-lg">
          Google Müşteri Yorumları
        </h3>
        <p className="text-gray-500 text-xs max-w-md mx-auto leading-relaxed">
          Google Business Profile API bağlantısı kurulamadı. Yorumları görmek için lütfen daha sonra tekrar deneyiniz.
        </p>
      </section>
    );
  }

  // Schema for MovingCompany AggregateRating & Reviews (EEAT SEO)
  const reviewsSchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${SITE.url}/#organization`,
    'name': SITE.name,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': rating,
      'reviewCount': ratingsCount
    },
    'review': reviews.map((review) => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': review.author_name
      },
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': review.rating
      },
      'reviewBody': review.text
    }))
  };

  return (
    <section className="space-y-8 text-left">
      <JsonLd data={reviewsSchema} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.slice(0, 3).map((review, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-light shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-gold fill-gold' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-charcoal text-xs md:text-sm italic leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
            
            <div className="flex items-center gap-3 border-t border-gray-light pt-4">
              {review.profile_photo_url ? (
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-forest/5 text-forest flex items-center justify-center text-xs font-bold font-display border border-forest/10">
                  {review.author_name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-display font-bold text-forest text-xs">{review.author_name}</h4>
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
          className="text-gold hover:text-forest transition-colors font-bold text-xs uppercase tracking-widest"
        >
          Google&apos;daki Tüm Yorumları Gör ➔
        </a>
      </div>
    </section>
  );
}
