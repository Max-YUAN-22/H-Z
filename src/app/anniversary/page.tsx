"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Hand, Camera } from 'lucide-react';
import Link from 'next/link';

// Dynamically import the 3D scene to avoid SSR issues with canvas
const Experience = dynamic(() => import('../../components/anniversary/Experience'), { 
  ssr: false,
  loading: () => <div className="flex h-screen items-center justify-center text-white">Loading 3D Experience...</div>
});

export default function AnniversaryPage() {
  const [isExploded, setIsExploded] = useState(false);
  const [gestureStatus, setGestureStatus] = useState<"disabled" | "loading" | "active">("disabled");
  
  // Handler for manual interaction (Mouse Click / Touch)
  const toggleExplosion = () => {
    setIsExploded(prev => !prev);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#050A30]">
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Experience isExploded={isExploded} />
      </div>

      {/* UI Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-8">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href="/" className="pointer-events-auto flex items-center gap-2 text-white/80 hover:text-white">
            <LinkIcon size={20} />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-light tracking-[0.2em] text-rose-200">
            ANNIVERSARY
          </h1>
        </header>

        {/* Instructions / Status */}
        <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="pointer-events-auto cursor-pointer"
                onClick={toggleExplosion}
            >
                {isExploded ? (
                    <div className="rounded-full border border-rose-500/30 bg-black/20 px-6 py-2 backdrop-blur-md">
                        <p className="text-sm font-light text-rose-100">Tap or Clench Fist to Gather</p>
                    </div>
                ) : (
                    <div className="rounded-full border border-rose-500/30 bg-black/20 px-6 py-2 backdrop-blur-md">
                         <p className="text-sm font-light text-rose-100">Tap or Open Hand to Explode</p>
                    </div>
                )}
            </motion.div>
        </div>

        {/* Footer / Controls */}
        <footer className="flex justify-between items-end">
            <div className="text-xs text-white/40">
                Designed for You
            </div>
            
            {/* Camera / Gesture Toggle (Placeholder for now) */}
            {/* 
            <button 
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
                onClick={() => setGestureStatus(gestureStatus === 'active' ? 'disabled' : 'loading')}
            >
                <Camera size={16} />
                {gestureStatus === 'disabled' ? 'Enable Hand Control' : gestureStatus === 'loading' ? 'Loading AI...' : 'Gesture Active'}
            </button>
            */}
        </footer>
      </div>
      
      {/* Manual Interaction Layer (Invisible, captures clicks anywhere if not on UI) */}
      <div 
        className="absolute inset-0 z-[1]" 
        onClick={toggleExplosion}
      />
    </div>
  );
}
