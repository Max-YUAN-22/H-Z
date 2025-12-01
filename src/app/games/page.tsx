"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FlaskConical } from 'lucide-react';

export default function GamesPage() {
  const [result, setResult] = useState<string | null>(null);

  const potions = [
    { id: 'red', color: 'bg-red-500', shadow: 'shadow-red-500/50', label: "Love Potion", outcomes: ["Kiss your partner for 10s!", "Say 'I love you' in a funny voice.", "Give a 1-minute shoulder massage."] },
    { id: 'blue', color: 'bg-blue-500', shadow: 'shadow-blue-500/50', label: "Truth Serum", outcomes: ["What's your favorite thing about me?", "Confess a tiny secret.", "Describe our first date in 3 words."] },
  ];

  const drinkPotion = (outcomes: string[]) => {
    const random = outcomes[Math.floor(Math.random() * outcomes.length)];
    setResult(random);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-12 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <ArrowLeft /> Back to Space
            </Link>
            <h1 className="text-2xl font-light tracking-widest">WITCH'S LAB</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Choose Your Poison</h2>
            
            <div className="flex gap-12 mb-16">
                {potions.map((potion) => (
                    <motion.button
                        key={potion.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => drinkPotion(potion.outcomes)}
                        className={`w-32 h-48 rounded-full ${potion.color} ${potion.shadow} shadow-2xl flex flex-col items-center justify-end pb-8 relative overflow-hidden group`}
                    >
                        <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-0 right-0 h-4 w-full bg-white/30 animate-pulse" />
                        <FlaskConical className="text-white mb-2 z-10" size={32} />
                        <span className="font-bold z-10">{potion.label}</span>
                    </motion.button>
                ))}
            </div>

            {result && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-center max-w-lg"
                >
                    <h3 className="text-rose-300 text-xl mb-2 font-bold">The Witch Says:</h3>
                    <p className="text-2xl">{result}</p>
                    <button 
                        onClick={() => setResult(null)}
                        className="mt-6 text-sm text-white/50 hover:text-white underline"
                    >
                        Try Again
                    </button>
                </motion.div>
            )}
        </div>
    </div>
  );
}
