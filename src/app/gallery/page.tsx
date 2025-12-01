"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GalleryPage() {
  // Placeholder images (using unstyled divs with gradients or placeholders for now to avoid external image dependency issues immediately, 
  // but ideally these would be <img src="..." />)
  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    height: i % 2 === 0 ? 'h-64' : 'h-96',
    color: `hsl(${Math.random() * 360}, 70%, 60%)`
  }));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
       <div className="mb-8 flex items-center justify-between max-w-7xl mx-auto">
             <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <ArrowLeft /> Back to Space
            </Link>
            <h1 className="text-2xl font-light tracking-widest">SWEET GALLERY</h1>
        </div>

        <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
            {photos.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`break-inside-avoid rounded-2xl overflow-hidden relative group cursor-zoom-in ${photo.height}`}
                >
                    <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundColor: photo.color }} 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                    {/* Caption on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium">Sweet Moment #{index + 1}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
  );
}
