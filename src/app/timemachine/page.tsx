"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";

interface Memory {
  id: number;
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
}

export default function TimeMachinePage() {
  const { emotionalIndex } = useEmotionalIndex();
  // In a real app, memories would be fetched or passed down from a global state.
  // For this prototype, let's use some dummy memories.
  const [allMemories] = useState<Memory[]>([
    { id: 1, date: "2023-12-01", title: "第一次约会", description: "电影院的第一次见面，心跳加速。" },
    { id: 2, date: "2024-06-15", title: "周年纪念旅行", description: "在海边看日出，非常浪漫。" },
    { id: 3, date: "2023-01-20", title: "第一次争吵", description: "虽然有不愉快，但也更了解彼此。" },
    { id: 4, date: "2024-12-01", title: "H&Z空间开启", description: "我们自己的小天地！" },
    { id: 5, date: "2024-03-08", title: "意外的惊喜", description: "收到了一束鲜花，非常感动。" },
  ]);

  const today = new Date();
  const currentMonthDay = today.toISOString().slice(5, 10); // "MM-DD"

  const recommendedMemories = allMemories.filter(memory => {
    return memory.date.slice(5, 10) === currentMonthDay;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        回忆时光机
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
        <Link href="/tasks">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往情侣任务
          </p>
        </Link>
        <Link href="/pet">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            前往虚拟宠物
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

      <div className="max-w-4xl mx-auto">
        {recommendedMemories.length > 0 && (
          <div className="mb-8 p-6 bg-[var(--color-card-background)] rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
              今日推荐回忆 ({currentMonthDay})
            </h2>
            {recommendedMemories.map((memory) => (
              <div key={memory.id} className="mb-4 last:mb-0">
                <h3 className="text-xl font-bold text-[var(--color-text)]">{memory.title}</h3>
                <p className="text-sm text-[var(--color-text)] mb-1">{memory.date}</p>
                <p className="text-[var(--color-text)]">{memory.description}</p>
              </div>
            ))}
          </div>
        )}

        <h2 className="mb-6 text-3xl font-bold text-[var(--color-primary)] text-center">
          所有回忆
        </h2>
        {allMemories.length === 0 ? (
          <p className="text-center text-[var(--color-text)]">这里还没有任何回忆，快去时间线添加吧！</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMemories
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Newest first
              .map((memory) => (
                <div key={memory.id} className="rounded-lg bg-[var(--color-card-background)] p-6 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--color-primary)]">{memory.title}</h3>
                  <p className="mb-2 text-sm text-[var(--color-text)]">{memory.date}</p>
                  <p className="text-[var(--color-text)]">{memory.description}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
