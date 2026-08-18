import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-off-white flex flex-col pt-20">
      
      {/* Navy Hero area placeholder skeleton */}
      <div className="w-full bg-navy py-20 flex flex-col items-center justify-center space-y-4 animate-pulse">
        <div className="h-4 w-32 bg-white/10 rounded"></div>
        <div className="h-10 w-80 bg-white/20 rounded"></div>
        <div className="h-4 w-96 bg-white/10 rounded"></div>
      </div>

      {/* Main card skeleton layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-4 animate-pulse">
          <div className="h-6 w-12 bg-navy/10 rounded"></div>
          <div className="h-4 w-40 bg-navy/5 rounded"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-navy/5 rounded"></div>
            <div className="h-3 w-5/6 bg-navy/5 rounded"></div>
            <div className="h-3 w-4/5 bg-navy/5 rounded"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-4 animate-pulse">
          <div className="h-6 w-12 bg-navy/10 rounded"></div>
          <div className="h-4 w-40 bg-navy/5 rounded"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-navy/5 rounded"></div>
            <div className="h-3 w-5/6 bg-navy/5 rounded"></div>
            <div className="h-3 w-4/5 bg-navy/5 rounded"></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-4 animate-pulse">
          <div className="h-6 w-12 bg-navy/10 rounded"></div>
          <div className="h-4 w-40 bg-navy/5 rounded"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-navy/5 rounded"></div>
            <div className="h-3 w-5/6 bg-navy/5 rounded"></div>
            <div className="h-3 w-4/5 bg-navy/5 rounded"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
