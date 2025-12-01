"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Clock, Map, Mail, Music, Gift, Dog, History, Image as ImageIcon, Box, Gamepad2 } from "lucide-react";

import FallingPetals from "../components/common/FallingPetals";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const correctPassword = "1201";
  const startDate = "2023-12-01"; 

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
      <div className="min-h-screen relative flex items-center justify-center p-4">
        {/* Fixed Background */}
        <div className="fixed inset-0 z-0">
            <img 
                src="/H-Z/images/WechatIMG1764.jpg" 
                alt="Background" 
                className="w-full h-full object-cover blur-sm scale-105" 
            />
            <div className="absolute inset-0 bg-black/10" />
        </div>

        <FallingPetals />

        {/* Main Love Station Card */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative z-10 w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
        >
            {/* Left Side: Identity & Timer */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-rose-50/80 to-white/80 p-10 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/60 relative">
                 {/* Avatars */}
                 <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-rose-200 overflow-hidden relative group">
                        <img src="/H-Z/images/WechatIMG1769.jpg" alt="Boy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <motion.div 
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="text-rose-500 relative z-10"
                    >
                        <Heart fill="#f43f5e" size={32} className="drop-shadow-lg" />
                    </motion.div>
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg border-4 border-blue-200 overflow-hidden relative group">
                        <img src="/H-Z/images/WechatIMG1770.jpg" alt="Girl" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                 </div>

                 <h2 className="text-3xl font-serif text-gray-800 mb-1 font-medium">H & Z</h2>
                 <p className="text-rose-400 text-xs uppercase tracking-[0.2em] mb-8 font-sans">Loving you since {startDate}</p>

                 <div className="space-y-3 w-full bg-white/50 rounded-2xl p-6 shadow-inner">
                     <div className="text-gray-500 font-serif text-sm italic">We have been in love for</div>
                     <div className="text-5xl font-serif text-rose-500 font-bold drop-shadow-sm">
                        {timeTogether.days} <span className="text-sm font-sans text-gray-400 font-normal uppercase tracking-widest ml-1">Days</span>
                     </div>
                     <div className="flex justify-center gap-4 text-gray-500 text-xs font-medium tracking-wider pt-2 border-t border-gray-100">
                         <div className="flex flex-col">
                             <span className="text-lg text-gray-700 font-serif">{timeTogether.hours}</span>
                             <span className="text-[10px] uppercase text-gray-400">Hours</span>
                         </div>
                         <div className="flex flex-col">
                             <span className="text-lg text-gray-700 font-serif">{timeTogether.minutes}</span>
                             <span className="text-[10px] uppercase text-gray-400">Mins</span>
                         </div>
                         <div className="flex flex-col">
                             <span className="text-lg text-gray-700 font-serif">{timeTogether.seconds}</span>
                             <span className="text-[10px] uppercase text-gray-400">Secs</span>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Right Side: Menu Grid */}
            <div className="w-full md:w-3/5 p-8 md:p-12 bg-white/40">
                <h3 className="text-xl font-serif text-gray-700 mb-8 text-center md:text-left pl-2 border-l-4 border-rose-300">
                    Our Love Station
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <StationItem href="/timeline" icon={<History />} label="Love Timeline" color="text-blue-400" />
                    <StationItem href="/gallery" icon={<ImageIcon />} label="Sweet Album" color="text-pink-500" />
                    <StationItem href="/wishtree" icon={<Gift />} label="Wish List" color="text-purple-500" />
                    <StationItem href="/mailbox" icon={<Mail />} label="Love Letters" color="text-yellow-500" />
                    <StationItem href="/anniversary" icon={<Heart />} label="Anniversary" color="text-rose-600" />
                    <StationItem href="/travel" icon={<Map />} label="Footprints" color="text-emerald-500" />
                    <StationItem href="/blindbox" icon={<Box />} label="Surprise" color="text-indigo-400" />
                    <StationItem href="/pet" icon={<Dog />} label="Our Pet" color="text-amber-500" />
                    <StationItem href="/games" icon={<Gamepad2 />} label="Game Room" color="text-orange-400" />
                </div>
            </div>
        </motion.div>

        {/* Footer text */}
        <div className="fixed bottom-4 text-white/60 text-xs z-10">
            Made with ❤️ for H & Z
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff0f5] relative overflow-hidden">
       {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img src="/H-Z/images/WechatIMG1764.jpg" alt="Background" className="w-full h-full object-cover opacity-80 blur-md" />
            <div className="absolute inset-0 bg-white/30" />
        </div>
       
       <FallingPetals />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center justify-center rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 p-12 shadow-2xl w-full max-w-md"
      >
        <h1 className="mb-2 text-4xl font-serif tracking-widest text-rose-500 drop-shadow-sm">H & Z</h1>
        <p className="mb-8 text-rose-400/80 text-xs uppercase tracking-[0.3em]">Our Little World</p>
        
        <div className="w-full space-y-4">
            <input
            type="password"
            className="w-full rounded-xl bg-white/50 border border-white/50 p-4 text-center text-rose-500 placeholder-rose-300 focus:border-rose-400 focus:outline-none transition-all shadow-inner"
            placeholder="ENTER PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                handleLogin();
                }
            }}
            />
            <button
            className="w-full rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 p-4 text-white font-bold tracking-wider transition-all shadow-lg hover:shadow-rose-300/50 transform hover:-translate-y-1"
            onClick={handleLogin}
            >
            OPEN LOVE
            </button>
        </div>
        {error && <p className="mt-4 text-rose-500 text-sm bg-white/50 px-3 py-1 rounded-full">{error}</p>}
      </motion.div>
    </div>
  );
}

function StationItem({ href, icon, label, color }: { href: string, icon: any, label: string, color: string }) {
    return (
        <Link href={href}>
            <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-white/50 cursor-pointer h-full"
            >
                <div className={`p-3 rounded-full bg-gray-50 ${color} bg-opacity-10`}>
                    {React.cloneElement(icon, { size: 24, className: color })}
                </div>
                <span className="text-sm text-gray-600 font-medium">{label}</span>
            </motion.div>
        </Link>
    );
}

import React from "react";


