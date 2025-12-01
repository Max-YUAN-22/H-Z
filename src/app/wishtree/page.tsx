"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../hooks/useLocalStorage"; // Import useLocalStorage

interface Wish {
  id: number;
  description: string;
  isCompleted: boolean;
}

export default function WishTreePage() {
  const { emotionalIndex, increaseEmotionalIndex } = useEmotionalIndex();
  const [wishes, setWishes] = useLocalStorage<Wish[]>("wishes", []); // Use useLocalStorage
  const [newWishDescription, setNewWishDescription] = useState("");

  const handleAddWish = () => {
    if (!newWishDescription.trim()) {
      alert("请填写心愿描述！");
      return;
    }
    const newId = wishes.length > 0 ? Math.max(...wishes.map(w => w.id)) + 1 : 1;
    setWishes([...wishes, { id: newId, description: newWishDescription, isCompleted: false }]);
    setNewWishDescription("");
  };

  const handleToggleWish = (id: number) => {
    setWishes(
      wishes.map((wish) => {
        if (wish.id === id) {
          if (!wish.isCompleted) {
            increaseEmotionalIndex(7); // Increase emotional index on wish completion
          }
          return { ...wish, isCompleted: !wish.isCompleted };
        }
        return wish;
      })
    );
  };

  // Simulate tree growth based on completed wishes
  const completedWishesCount = wishes.filter(wish => wish.isCompleted).length;
  const treeGrowthStage = Math.min(5, Math.floor(completedWishesCount / 2)); // 5 stages of growth

  const getTreeIcon = () => {
    switch (treeGrowthStage) {
      case 0: return "🌳"; // Seedling
      case 1: return "🌲"; // Small tree
      case 2: return "🌴"; // Medium tree
      case 3: return "🌵"; // Big tree
      case 4: return "🍂"; // Very big tree
      case 5: return "🌟"; // Fully grown, shining tree
      default: return "🌳";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        一起成长的心愿树
      </h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <Link href="/">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            回忆时间线
          </p>
        </Link>
        <Link href="/mailbox">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            情侣信箱
          </p>
        </Link>
        <Link href="/tasks">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            情侣任务
          </p>
        </Link>
        <Link href="/pet">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            虚拟宠物
          </p>
        </Link>
        <Link href="/timemachine">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            回忆时光机
          </p>
        </Link>
        <Link href="/music">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            配对音乐
          </p>
        </Link>
        <Link href="/timecapsule">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            时光胶囊
          </p>
        </Link>
        <div className="inline-block rounded-md bg-[var(--color-secondary)] px-4 py-2 text-white">
          情感指数: {emotionalIndex}
        </div>
      </div>

      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="mb-4 text-3xl font-semibold text-[var(--color-primary)]">
          心愿树 {getTreeIcon()}
        </h2>
        <p className="text-lg text-[var(--color-text)] mb-4">
          已完成 {completedWishesCount} 个心愿，心愿树正在成长！
        </p>

        <div className="flex items-center justify-center mb-6">
            <input
              type="text"
              value={newWishDescription}
              onChange={(e) => setNewWishDescription(e.target.value)}
              className="mr-2 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              placeholder="许下一个共同的心愿..."
            />
            <button
              onClick={handleAddWish}
              className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
            >
              许愿
            </button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {wishes.length === 0 ? (
            <p className="text-center text-[var(--color-text)]">这里还没有心愿，快来许下你们的第一个愿望吧！</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {wishes.map((wish) => (
                <div key={wish.id} className="rounded-lg bg-[var(--color-accent)] p-4 shadow-sm flex items-center justify-between">
                  <span className={`text-lg text-[var(--color-text)] ${wish.isCompleted ? "line-through text-gray-500" : ""}`}>
                    {wish.description}
                  </span>
                  <button
                    onClick={() => handleToggleWish(wish.id)}
                    className={`rounded-md px-3 py-1 text-white text-sm ${
                      wish.isCompleted ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {wish.isCompleted ? "取消完成" : "完成"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
