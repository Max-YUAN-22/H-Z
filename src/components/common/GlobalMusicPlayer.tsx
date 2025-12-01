"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PLAYLIST = [
  { title: "Perfect", artist: "Ed Sheeran", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "A Thousand Years", artist: "Christina Perri", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
];

export default function GlobalMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default to keep clean
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt autoplay on mount, often blocked but worth a try for "immersive" feel
    const attemptPlay = async () => {
        if (audioRef.current) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (e) {
                console.log("Autoplay blocked, waiting for interaction");
            }
        }
    };
    // attemptPlay(); // Commented out to avoid annoyance, let user click
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Play blocked", e));
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 z-50 flex flex-row-reverse items-center gap-3"
    >
      <audio 
        ref={audioRef} 
        src={PLAYLIST[currentTrackIndex].url} 
        loop={false}
        onEnded={nextTrack}
        muted={isMuted}
      />

      <button
        onClick={() => {
            if (!isPlaying) setIsPlaying(true);
            setIsExpanded(!isExpanded);
        }}
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 ${
          isPlaying 
            ? "bg-rose-500/80 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] backdrop-blur-xl" 
            : "bg-white/10 border-white/20 text-white/80 backdrop-blur-md hover:bg-white/20"
        }`}
      >
        {isPlaying && (
             <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-20 animate-ping"></span>
        )}
        <Music size={24} className={isPlaying ? "animate-spin-slow" : ""} />
      </button>

      <AnimatePresence>
        {isExpanded && (
            <motion.div
                initial={{ width: 0, opacity: 0, x: 20 }}
                animate={{ width: "auto", opacity: 1, x: 0 }}
                exit={{ width: 0, opacity: 0, x: 20 }}
                className="glass-card rounded-full pr-6 pl-4 py-2 flex items-center gap-4 overflow-hidden whitespace-nowrap h-14"
            >
                 <button onClick={togglePlay} className="text-white hover:text-rose-300 transition-colors">
                    {isPlaying ? (
                        <div className="h-3 w-3 bg-white rounded-sm" /> // Pause icon
                    ) : (
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" /> // Play icon
                    )}
                </button>

                <div className="flex flex-col justify-center w-24">
                    <span className="text-sm text-white font-medium leading-none truncate font-serif">{PLAYLIST[currentTrackIndex].title}</span>
                    <span className="text-[10px] text-white/60 leading-none mt-1 truncate font-sans">{PLAYLIST[currentTrackIndex].artist}</span>
                </div>
                
                <div className="w-px h-6 bg-white/10" />

                <button onClick={nextTrack} className="text-white/80 hover:text-white transition-colors">
                    <SkipForward size={18} />
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
