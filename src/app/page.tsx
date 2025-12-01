"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Clock, Map, Mail, Music, Gift, Dog, History } from "lucide-react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "1201";

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
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/20 blur-[120px]" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
        </div>

        <div className="max-w-5xl w-full z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-thin tracking-[0.2em] mb-4">H & Z SPACE</h1>
            <p className="text-white/40 uppercase tracking-widest text-sm">Welcome back, my love</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MenuCard href="/anniversary" title="3D Anniversary" subtitle="Interactive Heart & Gallery" icon={<Heart className="text-rose-400" />} delay={0.1} featured />
            <MenuCard href="/timeline" title="Timeline" subtitle="Our Story in Time" icon={<History className="text-blue-400" />} delay={0.2} />
            <MenuCard href="/travel" title="World Map" subtitle="Places We've Been" icon={<Map className="text-emerald-400" />} delay={0.3} />
            <MenuCard href="/mailbox" title="Mailbox" subtitle="Secret Letters" icon={<Mail className="text-yellow-400" />} delay={0.4} />
            <MenuCard href="/wishtree" title="Wish Tree" subtitle="Make a Wish" icon={<Gift className="text-purple-400" />} delay={0.5} />
            <MenuCard href="/pet" title="Virtual Pet" subtitle="Our Little Companion" icon={<Dog className="text-orange-400" />} delay={0.6} />
            <MenuCard href="/music" title="Music" subtitle="Our Playlist" icon={<Music className="text-pink-400" />} delay={0.7} />
            <MenuCard href="/timecapsule" title="Time Capsule" subtitle="Messages for Future" icon={<Clock className="text-cyan-400" />} delay={0.8} />
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
        className={`h-full flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm cursor-pointer group ${featured ? "bg-gradient-to-br from-rose-900/20 to-black/20 border-rose-500/20" : ""}`}
      >
        <div className="mb-4 bg-white/5 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
            {icon}
        </div>
        <div>
            <h3 className={`font-light mb-1 text-white ${featured ? "text-3xl" : "text-xl"}`}>{title}</h3>
            <p className="text-white/40 text-sm">{subtitle}</p>
        </div>
      </motion.div>
    </Link>
  );
}


