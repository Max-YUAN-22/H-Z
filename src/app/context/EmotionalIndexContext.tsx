"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import useLocalStorage from "../../hooks/useLocalStorage"; // Import useLocalStorage

interface EmotionalIndexContextType {
  emotionalIndex: number;
  increaseEmotionalIndex: (amount?: number) => void;
  decreaseEmotionalIndex: (amount?: number) => void;
}

const EmotionalIndexContext = createContext<EmotionalIndexContextType | undefined>(undefined);

export function EmotionalIndexProvider({ children }: { children: ReactNode }) {
  const [emotionalIndex, setEmotionalIndex] = useLocalStorage("emotionalIndex", 50); // Use useLocalStorage

  const increaseEmotionalIndex = (amount: number = 1) => {
    setEmotionalIndex((prev) => Math.min(100, prev + amount));
  };

  const decreaseEmotionalIndex = (amount: number = 1) => {
    setEmotionalIndex((prev) => Math.max(0, prev - amount));
  };

  return (
    <EmotionalIndexContext.Provider value={{ emotionalIndex, increaseEmotionalIndex, decreaseEmotionalIndex }}>
      {children}
    </EmotionalIndexContext.Provider>
  );
}

export function useEmotionalIndex() {
  const context = useContext(EmotionalIndexContext);
  if (context === undefined) {
    throw new Error("useEmotionalIndex must be used within an EmotionalIndexProvider");
  }
  return context;
}
