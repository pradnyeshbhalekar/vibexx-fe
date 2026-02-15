"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Mood = {
  emotion: string;
  confidence: number;
  description: string;
};

const MoodContext = createContext<{
  mood: Mood | null;
  setMood: (m: Mood) => void;
}>({
  mood: null,
  setMood: () => {},
});

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<Mood | null>(null);

  // ✅ rehydrate once
  useEffect(() => {
    if (!mood) {
      const stored = sessionStorage.getItem("mood");
      if (stored) {
        setMood(JSON.parse(stored));
      }
    }
  }, []);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export const useMood = () => useContext(MoodContext);