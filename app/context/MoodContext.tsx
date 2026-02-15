"use client";

import { createContext, useContext, useState } from "react";

type Mood = {
  emotion: "calm" | "happy" | "sad" | "angry";
  confidence: number;
  description: string;
};

type MoodContextType = {
  mood: Mood | null;
  setMood: (mood: Mood) => void;
};

const MoodContext = createContext<MoodContextType | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  // ✅ LAZY INITIALIZATION (runs once)
  const [mood, setMoodState] = useState<Mood | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const stored = sessionStorage.getItem("mood");
      return stored ? JSON.parse(stored) : null;
    } catch {
      sessionStorage.removeItem("mood");
      return null;
    }
  });

  const setMood = (m: Mood) => {
    setMoodState(m);
    sessionStorage.setItem("mood", JSON.stringify(m));
  };

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) {
    throw new Error("useMood must be used inside MoodProvider");
  }
  return ctx;
}