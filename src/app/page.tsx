"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Clock, Map, Mail, Music, Gift, Dog, History, Image as ImageIcon, Box, Gamepad2 } from "lucide-react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const correctPassword = "1201";
  // Set your start date here
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
      setError("纪念日密码错误，请重试。");
    }
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/20 blur-[120px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
        </div>

        {/* Love Timer Section */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center z-10"
        >
             <h1 className="text-5xl font-thin tracking-[0.2em] mb-2">H & Z SPACE</h1>
             <div className="flex items-center justify-center gap-4 text-rose-300/80 font-light tracking-widest mt-4">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-medium text-white">{timeTogether.days}</span>
                    <span className="text-xs uppercase opacity-50">Days</span>
                </div>
                <span className="text-2xl opacity-30">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-medium text-white">{timeTogether.hours.toString().padStart(2, '0')}</span>
                    <span className="text-xs uppercase opacity-50">Hours</span>
                </div>
                <span className="text-2xl opacity-30">:</span>
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-medium text-white">{timeTogether.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-xs uppercase opacity-50">Mins</span>
                </div>
                <span className="text-2xl opacity-30">:</span>
                 <div className="flex flex-col items-center">
                    <span className="text-3xl font-medium text-white">{timeTogether.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-xs uppercase opacity-50">Secs</span>
                </div>
             </div>
             <p className="text-white/30 text-xs mt-2 tracking-[0.5em] uppercase">Falling in love since {startDate}</p>
        </motion.div>

        <div className="max-w-6xl w-full z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <MenuCard href="/anniversary" title="3D Anniversary" subtitle="Interactive Heart" icon={<Heart className="text-rose-400" />} delay={0.1} featured />
            <MenuCard href="/timeline" title="Timeline" subtitle="Our Story" icon={<History className="text-blue-400" />} delay={0.2} />
            <MenuCard href="/gallery" title="Sweet Gallery" subtitle="Panoramic Album" icon={<ImageIcon className="text-pink-300" />} delay={0.25} />
            <MenuCard href="/blindbox" title="Blind Box" subtitle="3D Memories" icon={<Box className="text-purple-300" />} delay={0.3} />
            <MenuCard href="/travel" title="World Map" subtitle="Our Footprints" icon={<Map className="text-emerald-400" />} delay={0.3} />
            <MenuCard href="/games" title="Mini Games" subtitle="Witch's Poison" icon={<Gamepad2 className="text-orange-400" />} delay={0.35} />
            <MenuCard href="/mailbox" title="Mailbox" subtitle="Secret Letters" icon={<Mail className="text-yellow-400" />} delay={0.4} />
            <MenuCard href="/wishtree" title="Wish Tree" subtitle="Make a Wish" icon={<Gift className="text-purple-400" />} delay={0.5} />
            <MenuCard href="/pet" title="Virtual Pet" subtitle="Companion" icon={<Dog className="text-orange-400" />} delay={0.6} />
            <MenuCard href="/music" title="Music" subtitle="Playlist" icon={<Music className="text-pink-400" />} delay={0.7} />
            <MenuCard href="/timecapsule" title="Time Capsule" subtitle="Future Messages" icon={<Clock className="text-cyan-400" />} delay={0.8} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center justify-center rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-12 shadow-2xl w-full max-w-md"
      >
        <h1 className="mb-2 text-3xl font-light tracking-[0.3em] text-white">H&Z</h1>
        <p className="mb-8 text-white/40 text-xs uppercase tracking-widest">Private Space</p>
        
        <div className="w-full space-y-4">
            <input
            type="password"
            className="w-full rounded-lg bg-black/20 border border-white/10 p-4 text-center text-white placeholder-white/20 focus:border-rose-500/50 focus:outline-none transition-all"
            placeholder="ENTER PASSCODE"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === "Enter") {
                handleLogin();
                }
            }}
            />
            <button
            className="w-full rounded-lg bg-rose-500/80 hover:bg-rose-500 p-4 text-white font-medium tracking-wider transition-all"
            onClick={handleLogin}
            >
            ENTER
            </button>
        </div>
        {error && <p className="mt-4 text-rose-400 text-sm">{error}</p>}
      </motion.div>
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
        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
        className={`h-full flex flex-col justify-between p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-pointer group ${featured ? "bg-gradient-to-br from-rose-900/20 to-black/20 border-rose-500/20 p-8" : ""}`}
      >
        <div className="mb-4 bg-white/5 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
            {icon}
        </div>
        <div>
            <h3 className={`font-light mb-1 text-white ${featured ? "text-3xl" : "text-lg"}`}>{title}</h3>
            <p className="text-white/40 text-xs uppercase tracking-wider">{subtitle}</p>
        </div>
      </motion.div>
    </Link>
  );
}


