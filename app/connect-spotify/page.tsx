"use client";

import { useEffect, useState } from "react";

interface MoodResult {
  emotion: string;
  score: number;
}

export default function ConnectSpotifyPage() {
  const [mood, setMood] = useState<MoodResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("moodResult");

    if (!stored) {
      setMood(null);
      return;
    }

    setMood(JSON.parse(stored));
  }, []);

  if (!mood) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Could not detect mood.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Mood Detected</h1>

      <p className="text-lg">
        Emotion: <span className="font-bold">{mood.emotion}</span>
      </p>

      <p className="text-sm text-zinc-400">
        Confidence: {(mood.score * 100).toFixed(1)}%
      </p>
    </main>
  );
}
