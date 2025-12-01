"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GalleryPage() {
  const imageFiles = [
    "10521740385957_.pic_hd.jpg",
    "10531740385962_.pic_hd.jpg",
    "10541740386001_.pic_hd.jpg",
    "10551740386008_.pic_hd.jpg",
    "10561740386046_.pic_hd.jpg",
    "10571740386060_.pic_hd.jpg",
    "10581740386520_.pic_hd.jpg",
    "10591740386520_.pic_hd.jpg",
    "10601740386522_.pic_hd.jpg",
    "10611740386524_.pic_hd.jpg",
    "10621740386527_.pic_hd.jpg",
    "10631740386530_.pic_hd.jpg",
    "10641740386533_.pic_hd.jpg",
    "10651740386536_.pic_hd.jpg",
    "10661740386540_.pic_hd.jpg",
    "10671740386545_.pic_hd.jpg",
    "10681740386549_.pic_hd.jpg",
    "10691740386550_.pic_hd.jpg",
    "10701740387216_.pic_hd.jpg",
    "10711740387219_.pic_hd.jpg",
    "10721740387220_.pic_hd.jpg",
    "10731740387222_.pic_hd.jpg",
    "10741740387223_.pic_hd.jpg",
    "10751740387224_.pic_hd.jpg",
    "10761740387225_.pic_hd.jpg",
    "10771740387227_.pic_hd.jpg",
    "10781740387229_.pic_hd.jpg",
    "10791740387230_.pic_hd.jpg",
    "10801740387231_.pic_hd.jpg",
    "10811740387233_.pic_hd.jpg",
    "10821740387235_.pic_hd.jpg",
    "10831740387236_.pic_hd.jpg",
    "10841740387238_.pic_hd.jpg",
    "10851740387239_.pic_hd.jpg",
    "10861740387242_.pic_hd.jpg",
    "10871740387274_.pic_hd.jpg",
    "10881740387277_.pic_hd.jpg",
    "10891740387283_.pic_hd.jpg",
    "10901740387288_.pic_hd.jpg",
    "10911740387297_.pic_hd.jpg",
    "10921740387302_.pic_hd.jpg",
    "WechatIMG1764.jpg",
    "WechatIMG1765.jpg",
    "WechatIMG1766.jpg",
    "WechatIMG1767.jpg",
    "WechatIMG1768.jpg",
    "WechatIMG1769.jpg",
    "WechatIMG1770.jpg"
  ];

  const photos = imageFiles.map((filename, i) => ({
    id: i,
    src: `/H-Z/images/${filename}`,
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
                        style={{ backgroundImage: `url('${photo.src}')` }} 
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
