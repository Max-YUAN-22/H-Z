"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../hooks/useLocalStorage"; // Import useLocalStorage

interface Capsule {
  id: number;
  type: "text" | "video" | "voice";
  content: string; // text content or URL for media
  unlockDate: string;
  isUnlocked: boolean;
  creationDate: string;
}

export default function TimeCapsulePage() {
  const { emotionalIndex } = useEmotionalIndex();
  const [capsules, setCapsules] = useLocalStorage<Capsule[]>("capsules", []); // Use useLocalStorage
  const [newCapsuleType, setNewCapsuleType] = useState<"text" | "video" | "voice">("text");
  const [newCapsuleContent, setNewCapsuleContent] = useState("");
  const [newCapsuleUnlockDate, setNewCapsuleUnlockDate] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleAddCapsule = () => {
    if (!newCapsuleUnlockDate || (!newCapsuleContent && !mediaFile)) {
      alert("请填写胶囊内容和解锁日期！");
      return;
    }

    const newId = capsules.length > 0 ? Math.max(...capsules.map(c => c.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    const isUnlocked = new Date(newCapsuleUnlockDate) <= new Date(today);

    let contentToStore = newCapsuleContent;
    if (mediaFile) {
        contentToStore = URL.createObjectURL(mediaFile); // Use blob URL for preview
    }

    setCapsules([
      ...capsules,
      {
        id: newId,
        type: newCapsuleType,
        content: contentToStore,
        unlockDate: newCapsuleUnlockDate,
        isUnlocked,
        creationDate: today,
      },
    ]);
    setNewCapsuleType("text");
    setNewCapsuleContent("");
    setNewCapsuleUnlockDate("");
    setMediaFile(null);
  };

  const checkUnlockStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    setCapsules(
      capsules.map((cap) =>
        new Date(cap.unlockDate) <= new Date(today) && !cap.isUnlocked
          ? { ...cap, isUnlocked: true }
          : cap
      )
    );
  };

  // Check unlock status on page load/update
  useState(() => {
    checkUnlockStatus();
  }, [capsules]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        时光胶囊
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
        <Link href="/wishtree">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            心愿树
          </p>
        </Link>
        <Link href="/music">
          <p className="inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-[var(--color-primary)] hover:bg-[var(--color-secondary)]">
            配对音乐
          </p>
        </Link>
        <div className="inline-block rounded-md bg-[var(--color-secondary)] px-4 py-2 text-white">
          情感指数: {emotionalIndex}
        </div>
      </div>

      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">
          创建新时光胶囊
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            胶囊类型
          </label>
          <select
            value={newCapsuleType}
            onChange={(e) => {
              setNewCapsuleType(e.target.value as "text" | "video" | "voice");
              setNewCapsuleContent(""); // Clear content on type change
              setMediaFile(null); // Clear media file
            }}
            className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
          >
            <option value="text">文字</option>
            <option value="video">视频</option>
            <option value="voice">语音</option>
          </select>
        </div>
        {newCapsuleType === "text" ? (
          <textarea
            value={newCapsuleContent}
            onChange={(e) => setNewCapsuleContent(e.target.value)}
            className="mb-4 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
            rows={5}
            placeholder="写下你想对TA说的话，或保存一段文字回忆..."
          ></textarea>
        ) : (
          <input
            type="file"
            accept={newCapsuleType === "video" ? "video/*" : "audio/*"}
            onChange={(e) => setMediaFile(e.target.files ? e.target.files[0] : null)}
            className="mb-4 block w-full text-[var(--color-text)]"
          />
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            设定解锁日期
          </label>
          <input
            type="date"
            value={newCapsuleUnlockDate}
            onChange={(e) => setNewCapsuleUnlockDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
          />
        </div>
        <button
          onClick={handleAddCapsule}
          className="w-full rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
        >
          封存时光胶囊
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-[var(--color-primary)] text-center">
          已封存的时光胶囊
        </h2>
        {capsules.length === 0 ? (
          <p className="text-center text-[var(--color-text)]">这里还没有时光胶囊，快去创建第一个吧！</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capsules
              .sort((a, b) => new Date(a.unlockDate).getTime() - new Date(b.unlockDate).getTime()) // Sort by unlock date
              .map((capsule) => (
                <div key={capsule.id} className="rounded-lg bg-[var(--color-card-background)] p-6 shadow-md">
                  <p className="text-sm text-[var(--color-text)] mb-2">
                    创建日期: {capsule.creationDate}
                  </p>
                  <p className="text-sm text-[var(--color-text)] mb-4">
                    解锁日期: {capsule.unlockDate}
                  </p>
                  {capsule.isUnlocked ? (
                    <>
                      <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                        {capsule.type === "text" ? "文字回忆" : capsule.type === "video" ? "视频回忆" : "语音回忆"}
                      </h3>
                      {capsule.type === "text" ? (
                        <p className="text-[var(--color-text)] whitespace-pre-wrap">{capsule.content}</p>
                      ) : capsule.type === "video" ? (
                        <video src={capsule.content} controls className="w-full rounded-md" />
                      ) : (
                        <audio src={capsule.content} controls className="w-full rounded-md" />
                      )}
                    </>
                  ) : (
                    <p className="text-lg font-medium text-[var(--color-secondary)]">
                      此时光胶囊将在 {capsule.unlockDate} 解锁，敬请期待！
                    </p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
