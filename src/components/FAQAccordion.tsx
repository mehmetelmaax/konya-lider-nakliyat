'use client';

import React, { useState } from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { faqs } from '@/lib/faq-data';
import { trackEvent } from '@/lib/analytics';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    if (isOpening) {
      trackEvent('sss_acildi', { soru: faqs[index].question });
    }
  };

  return (
    <section className="py-20 bg-white" id="sorular">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold-text font-bold text-xs tracking-widest">
            AKLINIZA TAKILANLAR
          </span>
          <h2 className="font-display font-black text-forest text-3xl md:text-4xl tracking-tight leading-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-charcoal text-sm md:text-base max-w-xl mx-auto">
            Taşınma öncesinde müşterilerimizin en çok sorduğu soruların net ve dürüst cevapları.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-gray-light rounded-lg overflow-hidden bg-off-white hover:bg-white hover:border-gold/20 transition-all duration-200"
              >
                {/* Accordion Trigger button */}
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  className="w-full flex justify-between items-center px-6 py-5 text-left text-forest font-display font-bold text-base md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold select-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-forest/70 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-gold-text' : ''
                    }`} 
                  />
                </button>

                {/* Accordion Content wrapper */}
                <div 
                  id={`faq-panel-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-gray-light' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 py-5 text-charcoal text-sm leading-relaxed bg-white">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Written Guarantee Box */}
        <div className="border border-gold/20 bg-gold/5 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="bg-gold/15 text-gold-text p-4 rounded-full flex-shrink-0">
            <CheckCircle2 className="w-8 h-8 text-gold-text" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-bold text-forest text-lg">
              Lider Hasar Güvence Taahhütnamesi
            </h3>
            <p className="text-charcoal text-sm md:text-base leading-relaxed font-medium">
              "Lider Nakliyat olarak taşıdığımız mobilyalarda oluşabilecek darbe veya kırılmaları marangoz ekibimizle yerinde onarır, onarılamayacak hasarları nakit olarak karşılarız."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
