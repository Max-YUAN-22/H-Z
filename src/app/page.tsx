"use client";

import { useState } from "react";
import Image from "next/image";
import TimelinePage from "./timeline/page"; // Import the TimelinePage component

export default function Home() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const correctPassword = "1201";

  const handleLogin = () => {
    if (password === correctPassword) {
      setLoggedIn(true);
      setError("");
    } else {
      setError("纪念日密码错误，请重试。"); // Anniversary password incorrect, please try again.
    }
  };

  if (loggedIn) {
    return <TimelinePage />; // Render the TimelinePage after successful login
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
      <div className="flex flex-col items-center justify-center rounded-lg bg-[var(--color-card-background)] p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-[var(--color-primary)]">H&Z空间</h1>
        <p className="mb-6 text-[var(--color-text)]">请输入纪念日密码</p>
        <input
          type="password"
          className="mb-4 rounded-md border border-[var(--color-secondary)] p-2 text-center text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <button
          className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-white hover:bg-[var(--color-secondary)]"
          onClick={handleLogin}
        >
          进入空间
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
      <div className="absolute top-4 left-4">
            {/* Placeholder for Dog element */}
            <Image src="/dog-icon.svg" alt="Dog" width={50} height={50} className="opacity-50" />
        </div>
        <div className="absolute bottom-4 right-4">
            {/* Placeholder for Cat element */}
            <Image src="/cat-icon.svg" alt="Cat" width={50} height={50} className="opacity-50" />
        </div>
    </div>
  );
}


