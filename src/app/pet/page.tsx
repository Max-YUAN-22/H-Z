"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import useLocalStorage

interface PetStats {
  happiness: number;
  hunger: number;
}

export default function PetPage() {
  const { emotionalIndex, increaseEmotionalIndex, decreaseEmotionalIndex } = useEmotionalIndex();
  const [petStats, setPetStats] = useLocalStorage<PetStats>("petStats", {
    happiness: 50,
    hunger: 50,
  });
  const [petMessage, setPetMessage] = useState("你好！");

  // Determine pet appearance/mood based on emotional index and pet stats
  const getPetAppearance = () => {
    if (emotionalIndex > 80 && petStats.happiness > 70) return "开心活泼的狗狗/猫猫";
    if (emotionalIndex < 30 || petStats.hunger < 30) return "有点沮丧的狗狗/猫猫";
    return "平静的狗狗/猫猫";
  };

  const handleFeed = () => {
    setPetStats((prev) => ({ ...prev, hunger: Math.min(100, prev.hunger + 20) }));
    increaseEmotionalIndex(5);
    setPetMessage("谢谢喂食！肚子饱饱！");
  };

  const handlePlay = () => {
    setPetStats((prev) => ({ ...prev, happiness: Math.min(100, prev.happiness + 20) }));
    increaseEmotionalIndex(10);
    setPetMessage("玩得好开心啊！");
  };

  const handlePet = () => {
    setPetStats((prev) => ({ ...prev, happiness: Math.min(100, prev.happiness + 10), hunger: Math.max(0, prev.hunger - 5) })); // Petting consumes a little hunger
    increaseEmotionalIndex(2);
    setPetMessage("摸摸头，好舒服！");
  };

  // Effect to update pet mood based on emotional index
  useEffect(() => {
    if (emotionalIndex >= 90) {
      setPetMessage("主人，你们的爱让我充满活力！");
    } else if (emotionalIndex <= 20) {
      setPetMessage("主人，我感觉有点不开心...");
    } else if (emotionalIndex > 60) {
      setPetMessage("很高兴能和你们在一起！");
    }
    // Reduce pet stats over time (e.g., hunger)
    const timer = setTimeout(() => {
        setPetStats(prev => ({
            happiness: Math.max(0, prev.happiness - 1),
            hunger: Math.max(0, prev.hunger - 2)
        }));
    }, 60000); // Decrease every minute
    return () => clearTimeout(timer);
  }, [emotionalIndex]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        虚拟宠物
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <Link href="/">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            返回回忆时间线
          </p>
        </Link>
        <Link href="/mailbox">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往情侣信箱
          </p>
        </Link>
        <Link href="/timemachine">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往回忆时光机
          </p>
        </Link>
        <Link href="/wishtree">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往心愿树
          </p>
        </Link>
        <Link href="/music">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往配对音乐
          </p>
        </Link>
        <Link href="/timecapsule">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往时光胶囊
          </p>
        </Link>
        <div className="inline-block rounded-md bg-[var(--color-secondary)] px-4 py-2 text-white">
          情感指数: {emotionalIndex}
        </div>
      </div>

      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="mb-4 text-3xl font-semibold text-[var(--color-primary)]">
          我的{getPetAppearance()}
        </h2>
        <div className="relative w-48 h-48 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
          {/* Placeholder for Pet Image/Animation */}
          <p className="text-gray-500 text-lg">🐶🐱</p> 
        </div>
        <p className="text-lg text-[var(--color-text)] mb-4">{petMessage}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-2 bg-[var(--color-accent)] rounded-md">
                <p className="text-sm font-medium text-[var(--color-primary)]">幸福感: {petStats.happiness}</p>
            </div>
            <div className="p-2 bg-[var(--color-accent)] rounded-md">
                <p className="text-sm font-medium text-[var(--color-primary)]">饥饿度: {petStats.hunger}</p>
            </div>
             <div className="p-2 bg-[var(--color-accent)] rounded-md">
                <p className="text-sm font-medium text-[var(--color-primary)]">感情指数: {emotionalIndex}</p>
            </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleFeed}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            喂食
          </button>
          <button
            onClick={handlePlay}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            玩耍
          </button>
          <button
            onClick={handlePet}
            className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          >
            爱抚
          </button>
        </div>
      </div>
    </div>
  );
}
