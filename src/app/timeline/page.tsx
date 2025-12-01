"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../hooks/useLocalStorage"; // Import useLocalStorage

interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  media: { type: "image" | "video"; url: string }[];
}

export default function TimelinePage() {
  const { emotionalIndex, increaseEmotionalIndex } = useEmotionalIndex();
  const [memories, setMemories] = useLocalStorage<Memory[]>("memories", []); // Use useLocalStorage
  const [newMemory, setNewMemory] = useState<Omit<Memory, "id" | "media">>({
    date: "",
    title: "",
    description: "",
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleAddMemory = () => {
    if (!newMemory.date || !newMemory.title || !newMemory.description) {
      alert("请填写所有回忆信息！");
      return;
    }

    const newId = memories.length > 0 ? Math.max(...memories.map(m => m.id)) + 1 : 1;
    const mediaPlaceholders = mediaFiles.map(file => ({
      type: file.type.startsWith("image") ? "image" : "video",
      url: URL.createObjectURL(file) // Use blob URL for preview
    }));

    setMemories([
      ...memories,
      { ...newMemory, id: newId, media: mediaPlaceholders },
    ]);
    setNewMemory({ date: "", title: "", description: "" });
    setMediaFiles([]);
    increaseEmotionalIndex(5); // Increase index when a memory is added
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        情侣回忆时间线
      </h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
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

      {/* Add New Memory Form */}
      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">
          添加新回忆
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">
              日期
            </label>
            <input
              type="date"
              value={newMemory.date}
              onChange={(e) =>
                setNewMemory({ ...newMemory, date: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">
              标题
            </label>
            <input
              type="text"
              value={newMemory.title}
              onChange={(e) =>
                setNewMemory({ ...newMemory, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              placeholder="回忆标题"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              描述
            </label>
            <textarea
              value={newMemory.description}
              onChange={(e) =>
                setNewMemory({ ...newMemory, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              rows={3}
              placeholder="回忆描述"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--color-text)]">
              上传照片/视频
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaUpload}
              className="mt-1 block w-full text-[var(--color-text)]"
            />
          </div>
        </div>
        <button
          onClick={handleAddMemory}
          className="mt-6 w-full rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
        >
          保存回忆
        </button>
      </div>

      {/* Memories Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {memories.length === 0 && (
          <p className="text-center text-[var(--color-text)]">还没有回忆，快来添加第一个回忆吧！</p>
        )}
        {memories
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((memory) => (
            <div key={memory.id} className="mb-8 flex">
              <div className="relative w-1/2 pr-8 text-right">
                <div className="absolute right-0 top-0 h-full w-0.5 bg-[var(--color-secondary)]"></div>
                <div className="absolute right-[-8px] top-0 h-4 w-4 rounded-full bg-[var(--color-primary)]"></div>
                <div className="rounded-lg bg-[var(--color-card-background)] p-4 shadow-md">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--color-primary)]">{memory.title}</h3>
                  <p className="mb-2 text-sm text-[var(--color-text)]">{memory.date}</p>
                  <p className="text-[var(--color-text)]">{memory.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {memory.media.map((item, index) => (
                      <div key={index} className="w-full">
                        {item.type === "image" ? (
                          <img src={item.url} alt="Memory media" className="h-auto w-full rounded-md object-cover" />
                        ) : (
                          <video src={item.url} controls className="h-auto w-full rounded-md object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
