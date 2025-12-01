"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const Globe = dynamic(() => import('../../components/travel/Globe'), { ssr: false });

export default function TravelPage() {
  return (
    <div className="relative h-screen w-full bg-black text-white">
      <div className="absolute top-0 left-0 z-10 p-8">
        <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
             <ArrowLeft /> Back to Space
        </Link>
        <h1 className="mt-4 text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
            OUR FOOTPRINTS
        </h1>
        <p className="mt-2 text-sm text-white/40 uppercase tracking-[0.2em]">
            Exploring the world together
        </p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Globe />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
          <p className="text-white/20 text-xs">Interactive Globe Coming Soon</p>
      </div>
    </div>
  );
}
