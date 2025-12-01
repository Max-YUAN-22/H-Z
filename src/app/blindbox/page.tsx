"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlindBoxPage() {
  const [cards, setCards] = useState([
    { id: 1, content: "Our First Date", type: "text", detail: "Remember the coffee shop?", flipped: false, color: "from-pink-500 to-rose-500" },
    { id: 2, content: "First Trip", type: "text", detail: "That sunset in Bali...", flipped: false, color: "from-purple-500 to-indigo-500" },
    { id: 3, content: "Funny Moment", type: "text", detail: "When you dropped the ice cream!", flipped: false, color: "from-yellow-400 to-orange-500" },
    { id: 4, content: "Secret Message", type: "text", detail: "I love you more than pizza.", flipped: false, color: "from-green-400 to-emerald-600" },
    { id: 5, content: "Special Day", type: "text", detail: "The day we said yes.", flipped: false, color: "from-blue-400 to-cyan-500" },
    { id: 6, content: "Dream Future", type: "text", detail: "A small house by the sea.", flipped: false, color: "from-rose-400 to-pink-600" },
  ]);

  const flipCard = (id: number) => {
    setCards(cards.map(card => card.id === id ? { ...card, flipped: !card.flipped } : card));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 flex flex-col">
        <div className="mb-8 flex items-center justify-between">
             <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <ArrowLeft /> Back to Space
            </Link>
            <h1 className="text-2xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300">
                MEMORY BLIND BOX
            </h1>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full perspective-1000">
            {cards.map((card) => (
                <div key={card.id} className="relative h-64 w-full group perspective-1000 cursor-pointer" onClick={() => flipCard(card.id)}>
                    <motion.div 
                        className="relative h-full w-full transition-all duration-700 preserve-3d"
                        animate={{ rotateY: card.flipped ? 180 : 0 }}
                    >
                        {/* Front */}
                        <div className={`absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br ${card.color} shadow-xl backface-hidden flex items-center justify-center border border-white/20`}>
                            <div className="text-center">
                                <div className="text-4xl mb-2">🎁</div>
                                <h3 className="text-xl font-bold text-white drop-shadow-md">Tap to Reveal</h3>
                                <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">#{card.id} Secret Memory</p>
                            </div>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 h-full w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rotate-y-180 backface-hidden flex flex-col items-center justify-center p-6 text-center">
                            <h3 className="text-xl font-semibold text-rose-300 mb-2">{card.content}</h3>
                            <p className="text-white/80 font-light">{card.detail}</p>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    </div>
  );
}
