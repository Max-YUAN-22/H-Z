"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Clock, Map, Mail, Music, Gift, Dog, History, Image as ImageIcon, Box, Gamepad2 } from "lucide-react";

import FallingPetals from "../components/common/FallingPetals";
import LandingScene from "../components/home/LandingScene";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useLocalStorage("hz_logged_in", false);
  const [error, setError] = useState("");
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const correctPassword = "1201";
  const startDate = "2024-12-01"; 

  useEffect(() => {
    const timer = setInterval(() => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    if (password === correctPassword) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password, try our anniversary date!");
    }
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 bg-rose-50">
        {/* Subtle Background Texture */}
        <div className="fixed inset-0 z-0 overflow-hidden">
            <img 
                src="/H-Z/images/WechatIMG1764.jpg" 
                alt="Background" 
                className="w-full h-full object-cover opacity-20 scale-110 blur-xl" 
            />
            <div className="absolute inset-0 bg-white/80" />
        </div>

        <FallingPetals />

        {/* Main Content - Solid White Card for Maximum Clarity */}
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-5xl bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden flex flex-col md:flex-row min-h-[650px]"
        >
            {/* Left Side: Identity & Timer (Rose Theme) */}
            <div className="w-full md:w-5/12 bg-[#fff0f5] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                 {/* Decorative blob */}
                 <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                 <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

                 {/* Avatars - Larger & Clearer */}
                 <div className="relative z-10 flex items-center justify-center gap-6 mb-10">
                    <div className="w-28 h-28 rounded-full border-[6px] border-white shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                        <img src="/H-Z/images/WechatIMG1769.jpg" alt="Boy" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-rose-500 animate-pulse-soft">
                        <Heart fill="#f43f5e" size={42} className="drop-shadow-md" />
                    </div>
                    <div className="w-28 h-28 rounded-full border-[6px] border-white shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                        <img src="/H-Z/images/WechatIMG1770.jpg" alt="Girl" className="w-full h-full object-cover" />
                    </div>
                 </div>

                 <h2 className="relative z-10 text-4xl font-serif text-gray-800 mb-2 font-bold tracking-tight">H & Z</h2>
                 <p className="relative z-10 text-rose-500 text-xs font-bold uppercase tracking-[0.3em] mb-10 bg-white/60 px-4 py-1 rounded-full">
                    Since {startDate}
                 </p>

                 {/* Timer Card */}
                 <div className="relative z-10 w-full bg-white rounded-3xl p-8 shadow-lg border border-rose-100">
                     <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-2">We've been loving for</p>
                     <div className="text-6xl font-serif text-rose-500 font-bold mb-4 tracking-tighter">
                        {timeTogether.days}<span className="text-lg text-gray-400 font-sans font-medium ml-2">Days</span>
                     </div>
                     <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
                         <div>
                             <span className="block text-xl font-bold text-gray-700">{timeTogether.hours}</span>
                             <span className="text-[10px] uppercase text-gray-400 font-bold">Hours</span>
                         </div>
                         <div className="border-l border-gray-100">
                             <span className="block text-xl font-bold text-gray-700">{timeTogether.minutes}</span>
                             <span className="text-[10px] uppercase text-gray-400 font-bold">Mins</span>
                         </div>
                         <div className="border-l border-gray-100">
                             <span className="block text-xl font-bold text-gray-700">{timeTogether.seconds}</span>
                             <span className="text-[10px] uppercase text-gray-400 font-bold">Secs</span>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Right Side: App Grid (Clean White) */}
            <div className="w-full md:w-7/12 bg-white p-10 md:p-14 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-serif text-gray-800 font-bold">
                        Love Station
                    </h3>
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Menu</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <StationItem href="/timeline" icon={<History />} label="Timeline" color="bg-blue-50 text-blue-500" delay={0} />
                    <StationItem href="/gallery" icon={<ImageIcon />} label="Gallery" color="bg-pink-50 text-pink-500" delay={0.1} />
                    <StationItem href="/wishtree" icon={<Gift />} label="Wishes" color="bg-purple-50 text-purple-500" delay={0.2} />
                    <StationItem href="/mailbox" icon={<Mail />} label="Letters" color="bg-yellow-50 text-yellow-500" delay={0.3} />
                    <StationItem href="/anniversary" icon={<Heart />} label="Anniversary" color="bg-rose-50 text-rose-500" delay={0.4} />
                    <StationItem href="/travel" icon={<Map />} label="Travel" color="bg-emerald-50 text-emerald-500" delay={0.5} />
                    <StationItem href="/blindbox" icon={<Box />} label="Surprise" color="bg-indigo-50 text-indigo-500" delay={0.6} />
                    <StationItem href="/pet" icon={<Dog />} label="Pet" color="bg-orange-50 text-orange-500" delay={0.7} />
                    <StationItem href="/games" icon={<Gamepad2 />} label="Games" color="bg-teal-50 text-teal-500" delay={0.8} />
                </div>
            </div>
        </motion.div>

        {/* Footer text */}
        <div className="fixed bottom-4 text-gray-400 text-xs z-10 font-medium tracking-wide">
            Designed for H & Z • Forever
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] relative overflow-hidden">
       {/* 3D Background Scene */}
       <LandingScene />
       
       <FallingPetals />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center justify-center rounded-[32px] bg-white shadow-2xl border border-white p-12 w-full max-w-md"
      >
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500 shadow-inner">
            <Heart fill="#f43f5e" size={32} />
        </div>
        <h1 className="mb-2 text-4xl font-serif font-bold text-gray-800">Welcome Back</h1>
        <p className="mb-10 text-gray-400 text-sm font-medium uppercase tracking-widest">H & Z Private Space</p>
        
        <div className="w-full space-y-4">
            <input
            type="password"
            className="w-full rounded-2xl bg-gray-50 border border-gray-200 p-5 text-center text-gray-800 font-bold text-lg placeholder-gray-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 focus:outline-none transition-all"
            placeholder="1201"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                handleLogin();
                }
            }}
            />
            <button
            className="w-full rounded-2xl bg-rose-500 hover:bg-rose-600 p-5 text-white font-bold tracking-wider shadow-[0_10px_20px_-10px_rgba(244,63,94,0.5)] transition-all hover:transform hover:-translate-y-1"
            onClick={handleLogin}
            >
            ENTER SPACE
            </button>
        </div>
        {error && <p className="mt-4 text-rose-500 text-sm font-medium">{error}</p>}
      </motion.div>
    </div>
  );
}

function StationItem({ href, icon, label, color, delay }: { href: string, icon: any, label: string, color: string, delay: number }) {
    return (
        <Link href={href}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-3xl transition-all cursor-pointer h-full aspect-square shadow-sm hover:shadow-lg border border-gray-100 ${color} bg-opacity-20`}
            >
                {/* Icon Container */}
                <div className={`p-4 rounded-2xl bg-white shadow-sm`}>
                    {React.cloneElement(icon, { size: 28, className: "text-current" })}
                </div>
                <span className="text-sm font-bold text-gray-600">{label}</span>
            </motion.div>
        </Link>
    );
}