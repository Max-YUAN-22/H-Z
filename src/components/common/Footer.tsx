"use client";

import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-white/80 backdrop-blur-md border-t border-rose-100 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-600">
                <span className="font-serif font-bold text-lg text-rose-500">H & Z</span>
                <span className="text-xs uppercase tracking-widest opacity-60">Love Station</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Made with</span>
                <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
                <span>for our memories</span>
            </div>

            <div className="text-xs text-gray-400">
                © 2023 - {currentYear} All Rights Reserved
            </div>
        </div>
    </footer>
  );
}
