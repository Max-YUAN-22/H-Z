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
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Full Screen Hero Background */}
        <div className="fixed inset-0 z-0">
            <img 
                src="/H-Z/images/WechatIMG1764.jpg" 
                alt="Background" 
                className="w-full h-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-[#fff0f5]" />
        </div>

        <FallingPetals />

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col items-center pt-20 pb-10 px-4">
            
            {/* Header / Timer */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                 <h1 className="text-6xl md:text-8xl font-light tracking-wide mb-4 font-serif text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                    H & Z
                 </h1>
                 <p className="text-white/90 text-lg tracking-[0.5em] uppercase font-medium mb-8 drop-shadow-md">
                    Loving you since {startDate}
                 </p>
                 
                 <div className="glass-card inline-flex items-center justify-center gap-4 md:gap-8 px-8 py-4 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg">
                    <TimerUnit value={timeTogether.days} label="Days" />
                    <span className="text-2xl text-white/80 pb-2">:</span>
                    <TimerUnit value={timeTogether.hours} label="Hours" />
                    <span className="text-2xl text-white/80 pb-2">:</span>
                    <TimerUnit value={timeTogether.minutes} label="Mins" />
                    <span className="text-2xl text-white/80 pb-2">:</span>
                    <TimerUnit value={timeTogether.seconds} label="Secs" />
                 </div>
            </motion.div>

            {/* Menu Grid */}
            <div className="max-w-6xl w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <MenuCard href="/anniversary" title="Anniversary" subtitle="Our Special Day" icon={<Heart className="text-rose-500" />} delay={0.1} featured />
                <MenuCard href="/timeline" title="Timeline" subtitle="Our Story" icon={<History className="text-blue-400" />} delay={0.2} />
                <MenuCard href="/gallery" title="Gallery" subtitle="Sweet Memories" icon={<ImageIcon className="text-pink-400" />} delay={0.25} />
                <MenuCard href="/blindbox" title="Blind Box" subtitle="Daily Surprise" icon={<Box className="text-purple-400" />} delay={0.3} />
                <MenuCard href="/travel" title="Travel" subtitle="Places We've Been" icon={<Map className="text-emerald-400" />} delay={0.3} />
                <MenuCard href="/games" title="Games" subtitle="Fun Time" icon={<Gamepad2 className="text-orange-400" />} delay={0.35} />
                <MenuCard href="/mailbox" title="Mailbox" subtitle="Love Letters" icon={<Mail className="text-yellow-400" />} delay={0.4} />
                <MenuCard href="/wishtree" title="Wish Tree" subtitle="Future Dreams" icon={<Gift className="text-indigo-400" />} delay={0.5} />
                <MenuCard href="/pet" title="Pet" subtitle="Virtual Companion" icon={<Dog className="text-amber-500" />} delay={0.6} />
                <MenuCard href="/music" title="Music" subtitle="Our Songs" icon={<Music className="text-cyan-400" />} delay={0.7} />
                <MenuCard href="/timecapsule" title="Time Capsule" subtitle="To Future Us" icon={<Clock className="text-teal-400" />} delay={0.8} />
              </div>
            </div>
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

function TimerUnit({ value, label }: { value: number, label: string }) {
    return (
        <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-3xl md:text-5xl font-light text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-serif">
                {value.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90 mt-1 font-sans font-medium">
                {label}
            </span>
        </div>
    );
}

function MenuCard({ href, title, subtitle, icon, delay, featured = false }: any) {
  return (
    <Link href={href} className={featured ? "md:col-span-2 md:row-span-2" : ""}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.03, y: -5 }}
        className={`h-full flex flex-col justify-between p-6 rounded-3xl cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-xl ${
            featured 
            ? "bg-gradient-to-br from-white/80 to-white/40 border border-white/60 p-8 backdrop-blur-xl" 
            : "bg-white/60 hover:bg-white/80 border border-white/50 backdrop-blur-md"
        }`}
      >
        <div className={`mb-4 w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md ${
            featured ? "bg-rose-100 text-rose-500" : "bg-white text-gray-600"
        }`}>
            {icon}
        </div>
        <div>
            <h3 className={`font-medium mb-1 text-gray-800 font-serif ${featured ? "text-3xl" : "text-xl"}`}>{title}</h3>
            <p className="text-gray-500 text-xs uppercase tracking-wider font-sans">{subtitle}</p>
        </div>
      </motion.div>
    </Link>
  );
}


