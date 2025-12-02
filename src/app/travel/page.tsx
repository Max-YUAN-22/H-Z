"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map with SSR disabled to avoid "window is not defined" error from Leaflet
const LeafletMap = dynamic(() => import('../../components/travel/LeafletMap'), { 
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center bg-rose-50 text-rose-400">Loading Map...</div>
});

export default function TravelPage() {
  return (
    <div className="h-screen w-full relative bg-[#fff0f5]">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-6 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors font-medium">
             <ArrowLeft size={20} /> Back to Love Station
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-800">Our Footprints</h1>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="absolute inset-0 z-0 pt-20 pb-8 px-4">
         <LeafletMap />
      </div>
    </div>
  );
}
