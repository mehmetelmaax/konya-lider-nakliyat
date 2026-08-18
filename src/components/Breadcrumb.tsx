'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

interface BreadcrumbProps {
  items: { name: string; url: string }[];
  className?: string;
  dark?: boolean;
}

export default function Breadcrumb({ items, className, dark }: BreadcrumbProps) {
  const allItems = [{ name: 'Ana Sayfa', url: '/' }, ...items];

  return (
    <>
      <JsonLd data={breadcrumbSchema(allItems)} />
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 text-xs flex items-center gap-1.5 flex-wrap no-print ${dark ? 'text-gray-300' : 'text-gray-500'} ${className || 'pt-28'}`}>
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          
          if (isLast) {
            return (
              <span key={idx} className={`font-semibold ${dark ? 'text-white' : 'text-charcoal'}`} aria-current="page">
                {item.name}
              </span>
            );
          }
          
          return (
            <React.Fragment key={idx}>
              <Link
                href={item.url}
                className={`hover:text-orange transition-colors font-medium ${dark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                {item.name}
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
