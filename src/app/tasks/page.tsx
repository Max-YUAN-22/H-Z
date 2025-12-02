"use client";

import { useState } from "react";
import Link from "next/link";
import { useEmotionalIndex } from "../context/EmotionalIndexContext";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import useLocalStorage

interface Task {
  id: number;
  description: string;
  isCompleted: boolean;
  reward: string; // e.g., "Unlock a new emoji", "5 emotional points"
}

export default function TasksPage() {
  const { emotionalIndex, increaseEmotionalIndex } = useEmotionalIndex();
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []); // Use useLocalStorage
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskReward, setNewTaskReward] = useState("");

  const handleAddTask = () => {
    if (!newTaskDescription || !newTaskReward) {
      alert("请填写任务描述和奖励！");
      return;
    }
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, description: newTaskDescription, isCompleted: false, reward: newTaskReward }]);
    setNewTaskDescription("");
    setNewTaskReward("");
  };

  const handleToggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          if (!task.isCompleted) {
            increaseEmotionalIndex(task.reward.includes("emotional points") ? parseInt(task.reward.split(" ")[0]) : 10); // Increase emotional index on completion
          }
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <h1 className="mb-8 text-4xl font-bold text-[var(--color-primary)] text-center">
        情侣任务与奖励
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

      {/* Add New Task Form */}
      <div className="mb-12 rounded-lg bg-[var(--color-card-background)] p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="mb-4 text-2xl font-semibold text-[var(--color-primary)]">
          设定新任务
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">
              任务描述
            </label>
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              placeholder="例如：一起做一顿浪漫晚餐"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)]">
              完成奖励
            </label>
            <input
              type="text"
              value={newTaskReward}
              onChange={(e) => setNewTaskReward(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[var(--color-secondary)] p-2 text-[var(--color-text)]"
              placeholder="例如：解锁新表情，获得10情感点"
            />
          </div>
        </div>
        <button
          onClick={handleAddTask}
          className="mt-6 w-full rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
        >
          添加任务
        </button>
      </div>

      {/* Task List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-[var(--color-primary)] text-center">
          当前任务
        </h2>
        {tasks.length === 0 && (
          <p className="text-center text-[var(--color-text)]">还没有任务，快来设定你们的第一个目标吧！</p>
        )}
        <div className="grid grid-cols-1 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="rounded-lg bg-[var(--color-card-background)] p-6 shadow-md flex items-center justify-between">
              <div>
                <h3 className={`text-xl font-semibold text-[var(--color-primary)] ${task.isCompleted ? "line-through" : ""}`}>
                  {task.description}
                </h3>
                <p className="text-sm text-[var(--color-text)]">奖励: {task.reward}</p>
              </div>
              <button
                onClick={() => handleToggleTask(task.id)}
                className={`rounded-md px-4 py-2 text-white ${
                  task.isCompleted ? "bg-gray-500 hover:bg-gray-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {task.isCompleted ? "未完成" : "完成"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
