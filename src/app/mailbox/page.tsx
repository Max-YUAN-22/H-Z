"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../hooks/useLocalStorage"; // Import useLocalStorage

interface Message {
  id: number;
  sender: string; // 'me' or 'partner'
  recipient: string; // 'me' or 'partner'
  content: string;
  sentDate: string;
  unlockDate: string;
  isUnlocked: boolean;
}

export default function MailboxPage() {
  const { emotionalIndex, increaseEmotionalIndex } = useEmotionalIndex();
  const [messages, setMessages] = useLocalStorage<Message[]>("messages", []); // Use useLocalStorage
  const [newMessageContent, setNewMessageContent] = useState("");
  const [newMessageUnlockDate, setNewMessageUnlockDate] = useState("");

  const handleSendMessage = (sender: string, recipient: string) => {
    if (!newMessageContent || !newMessageUnlockDate) {
      alert("请填写信件内容和解锁日期！");
      return;
    }

    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    const isUnlocked = new Date(newMessageUnlockDate) <= new Date(today);

    setMessages([
      ...messages,
      {
        id: newId,
        sender,
        recipient,
        content: newMessageContent,
        sentDate: today,
        unlockDate: newMessageUnlockDate,
        isUnlocked,
      },
    ]);
    setNewMessageContent("");
    setNewMessageUnlockDate("");
    increaseEmotionalIndex(3); // Increase index when a message is sent
  };

  const checkUnlockStatus = () => {
    const today = new Date().toISOString().split('T')[0];
    setMessages(
      messages.map((msg) =>
        new Date(msg.unlockDate) <= new Date(today) && !msg.isUnlocked
          ? { ...msg, isUnlocked: true }
          : msg
      )
    );
  };

  // Check unlock status on page load/update
  useState(() => {
    checkUnlockStatus();
  }, [messages]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        情侣私密信箱
      </h1>

      <div className="flex justify-center gap-4 mb-8">
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

      {/* Send New Message Form */}
      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">
          写一封信
        </h2>
        <textarea
          value={newMessageContent}
          onChange={(e) => setNewMessageContent(e.target.value)}
          className="mb-4 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
          rows={5}
          placeholder="写下你想对TA说的话..."
        ></textarea>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-text)]">
            设定解锁日期
          </label>
          <input
            type="date"
            value={newMessageUnlockDate}
            onChange={(e) => setNewMessageUnlockDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => handleSendMessage('me', 'partner')}
            className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
          >
            发送给TA
          </button>
        </div>
      </div>

      {/* Inbox */}
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-[var(--color-primary)] text-center">
          收件箱
        </h2>
        {messages.filter(msg => msg.recipient === 'me').length === 0 && (
          <p className="text-center text-[var(--color-text)]">你的信箱空空如也，等待TA的来信吧！</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages
            .filter(msg => msg.recipient === 'me')
            .sort((a, b) => new Date(a.sentDate).getTime() - new Date(b.sentDate).getTime())
            .map((message) => (
              <div key={message.id} className="rounded-lg bg-[var(--color-card-background)] p-6 shadow-md">
                <p className="text-sm text-[var(--color-text)] mb-2">
                  发送日期: {message.sentDate}
                </p>
                <p className="text-sm text-[var(--color-text)] mb-4">
                  解锁日期: {message.unlockDate}
                </p>
                {message.isUnlocked ? (
                  <>
                    <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                      来自: {message.sender === 'me' ? '你' : '伴侣'}
                    </h3>
                    <p className="text-[var(--color-text)] whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </>
                ) : (
                  <p className="text-lg font-medium text-[var(--color-secondary)]">
                    这封信将在 {message.unlockDate} 解锁，敬请期待！
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
