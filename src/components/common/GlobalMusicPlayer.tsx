"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST = [
  { title: "Perfect", artist: "Ed Sheeran", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "A Thousand Years", artist: "Christina Perri", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  // Add more songs here
];

export default function GlobalMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 left-6 z-50 flex items-end gap-2"
    >
      <audio 
        ref={audioRef} 
        src={PLAYLIST[currentTrackIndex].url} 
        loop={false}
        onEnded={nextTrack}
        muted={isMuted}
      />

      <AnimatePresence>
        {isExpanded && (
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 overflow-hidden whitespace-nowrap h-12"
            >
                <div className="flex flex-col justify-center mr-2">
                    <span className="text-xs text-white font-medium leading-none">{PLAYLIST[currentTrackIndex].title}</span>
                    <span className="text-[10px] text-white/50 leading-none mt-1">{PLAYLIST[currentTrackIndex].artist}</span>
                </div>
                
                <button onClick={() => setIsMuted(!isMuted)} className="text-white/80 hover:text-white">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button onClick={nextTrack} className="text-white/80 hover:text-white">
                    <SkipForward size={16} />
                </button>
            </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
            if (!isPlaying) setIsPlaying(true);
            setIsExpanded(!isExpanded);
        }}
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
          isPlaying 
            ? "bg-rose-500 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]" 
            : "bg-black/40 border-white/10 text-white/60 backdrop-blur-md hover:bg-white/10"
        }`}
      >
        {isPlaying && (
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
        )}
        <Music size={20} className={isPlaying ? "animate-spin-slow" : ""} />
      </button>
    </motion.div>
  );
}
