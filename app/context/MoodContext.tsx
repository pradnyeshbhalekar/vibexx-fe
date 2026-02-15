"use client";

import { createContext, useContext, useState } from "react";

type MoodResult = {
  emotion: string;
  confidence: number;
  description: string;
};

const MoodContext = createContext<{
  mood: MoodResult | null;
  setMood: (m: MoodResult) => void;
} | null>(null);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<MoodResult | null>(null);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used inside MoodProvider");
  return ctx;
}