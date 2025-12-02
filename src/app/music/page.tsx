"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import useLocalStorage

interface Song {
  id: number;
  title: string;
  artist: string;
  url?: string; // Placeholder for actual music URL
}

export default function MusicPage() {
  const { emotionalIndex } = useEmotionalIndex();
  const [playlist, setPlaylist] = useLocalStorage<Song[]>("playlist", [
    { id: 1, title: "Can't Help Falling in Love", artist: "Elvis Presley" },
    { id: 2, title: "Perfect", artist: "Ed Sheeran" },
  ]);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongArtist, setNewSongArtist] = useState("");

  const handleAddSong = () => {
    if (!newSongTitle || !newSongArtist) {
      alert("请填写歌曲标题和艺术家！");
      return;
    }
    const newId = playlist.length > 0 ? Math.max(...playlist.map(s => s.id)) + 1 : 1;
    setPlaylist([...playlist, { id: newId, title: newSongTitle, artist: newSongArtist }]);
    setNewSongTitle("");
    setNewSongArtist("");
  };

  const handleRemoveSong = (id: number) => {
    setPlaylist(playlist.filter(song => song.id !== id));
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        情侣配对音乐
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
        <div className="inline-block rounded-md bg-[var(--color-secondary)] px-4 py-2 text-white">
          情感指数: {emotionalIndex}
        </div>
      </div>

      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">
          添加新歌曲
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">
              歌曲标题
            </label>
            <input
              type="text"
              value={newSongTitle}
              onChange={(e) => setNewSongTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              placeholder="例如：Perfect"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">
              艺术家
            </label>
            <input
              type="text"
              value={newSongArtist}
              onChange={(e) => setNewSongArtist(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              placeholder="例如：Ed Sheeran"
            />
          </div>
        </div>
        <button
          onClick={handleAddSong}
          className="w-full rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
        >
          添加到播放列表
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-[var(--color-primary)] text-center">
          我们的专属播放列表
        </h2>
        {playlist.length === 0 ? (
          <p className="text-center text-[var(--color-text)]">播放列表是空的，快去添加你们喜欢的歌曲吧！</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {playlist.map((song) => (
              <div key={song.id} className="rounded-lg bg-[var(--color-card-background)] p-4 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-primary)]">{song.title}</h3>
                  <p className="text-sm text-[var(--color-text)]">{song.artist}</p>
                </div>
                <button
                  onClick={() => handleRemoveSong(song.id)}
                  className="rounded-md bg-red-500 px-3 py-1 text-white text-sm hover:bg-red-600"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
