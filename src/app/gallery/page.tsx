"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Heart, ZoomIn } from 'lucide-react';
import FallingPetals from '../../components/common/FallingPetals';

export default function GalleryPage() {
  // Real filenames from the public/images folder
  const imageFiles = [
    "10521740385957_.pic_hd.jpg", "10531740385962_.pic_hd.jpg", "10541740386001_.pic_hd.jpg",
    "10551740386008_.pic_hd.jpg", "10561740386046_.pic_hd.jpg", "10571740386060_.pic_hd.jpg",
    "10581740386520_.pic_hd.jpg", "10591740386520_.pic_hd.jpg", "10601740386522_.pic_hd.jpg",
    "10611740386524_.pic_hd.jpg", "10621740386527_.pic_hd.jpg", "10631740386530_.pic_hd.jpg",
    "10641740386533_.pic_hd.jpg", "10651740386536_.pic_hd.jpg", "10661740386540_.pic_hd.jpg",
    "10671740386545_.pic_hd.jpg", "10681740386549_.pic_hd.jpg", "10691740386550_.pic_hd.jpg",
    "10701740387216_.pic_hd.jpg", "10711740387219_.pic_hd.jpg", "10721740387220_.pic_hd.jpg",
    "10731740387222_.pic_hd.jpg", "10741740387223_.pic_hd.jpg", "10751740387224_.pic_hd.jpg",
    "10761740387225_.pic_hd.jpg", "10771740387227_.pic_hd.jpg", "10781740387229_.pic_hd.jpg",
    "10791740387230_.pic_hd.jpg", "10801740387231_.pic_hd.jpg", "10811740387233_.pic_hd.jpg",
    "10821740387235_.pic_hd.jpg", "10831740387236_.pic_hd.jpg", "10841740387238_.pic_hd.jpg",
    "10851740387239_.pic_hd.jpg", "10861740387242_.pic_hd.jpg", "10871740387274_.pic_hd.jpg",
    "10881740387277_.pic_hd.jpg", "10891740387283_.pic_hd.jpg", "10901740387288_.pic_hd.jpg",
    "10911740387297_.pic_hd.jpg", "10921740387302_.pic_hd.jpg", "WechatIMG1764.jpg",
    "WechatIMG1765.jpg", "WechatIMG1766.jpg", "WechatIMG1767.jpg", "WechatIMG1768.jpg",
    "WechatIMG1769.jpg", "WechatIMG1770.jpg"
  ];

  const photos = imageFiles.map((filename, i) => ({
    id: i,
    src: `/H-Z/images/${filename}`,
    caption: `Sweet Moment #${i + 1}`,
    date: "2024",
    height: i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/3]'
  }));

  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#fff0f5] text-gray-800 relative overflow-x-hidden font-serif">
       <FallingPetals />
       
       {/* Header */}
       <div className="relative z-10 pt-8 px-8 mb-8 flex items-center justify-between max-w-7xl mx-auto">
             <Link href="/" className="flex items-center gap-2 text-rose-400 hover:text-rose-600 transition-colors font-medium bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <ArrowLeft size={20} /> <span className="hidden md:inline">Back to Love Station</span>
            </Link>
            <h1 className="text-3xl md:text-5xl font-script text-rose-500 drop-shadow-sm">
                Our Sweet Gallery
            </h1>
            <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Masonry Grid */}
        <div className="relative z-10 px-4 pb-20 max-w-7xl mx-auto">
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="break-inside-avoid mb-6"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div className={`relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-zoom-in bg-white p-2 border border-rose-100 ${photo.height}`}>
                            <div className="relative w-full h-full rounded-xl overflow-hidden">
                                <img 
                                    src={photo.src} 
                                    alt={photo.caption} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-sm text-rose-500 px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <ZoomIn size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 pb-1 px-1">
                                <p className="text-xs text-center font-sans text-gray-500 uppercase tracking-widest">{photo.date}</p>
                                <div className="flex justify-center mt-1">
                                    <Heart size={12} className="text-rose-300 fill-rose-100" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
            {selectedPhoto && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative max-w-5xl max-h-[90vh] w-full bg-white p-2 rounded-lg shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <img 
                            src={selectedPhoto.src} 
                            alt={selectedPhoto.caption} 
                            className="w-full h-full max-h-[85vh] object-contain rounded-md"
                        />
                        <button 
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute -top-4 -right-4 bg-rose-500 text-white rounded-full p-2 shadow-lg hover:bg-rose-600 transition-colors"
                        >
                            <ArrowLeft size={24} className="rotate-45" /> {/* Close X icon approximation */}
                        </button>
                        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                            <span className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                                {selectedPhoto.caption}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}