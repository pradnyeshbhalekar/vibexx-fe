"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../_components/navbar";
import { AiFillSpotify } from "react-icons/ai";

const EMOTIONS = {
  calm: {
    label: "Calm",
    emoji: "😌",
    accent: "#615FFF",
    bg: "#1B1A33",
    quote: "Centered, steady, and at peace.",
  },
  angry: {
    label: "Angry",
    emoji: "😡",
    accent: "#EA4E77",
    bg: "#33161E",
    quote: "Intense, charged, and ready to burst.",
  },
  sad: {
    label: "Sad",
    emoji: "😔",
    accent: "#4B90E2",
    bg: "#162433",
    quote: "Quiet, heavy, and reflective.",
  },
  happy: {
    label: "Happy",
    emoji: "☺️",
    accent: "#FFD800",
    bg: "#332F12",
    quote: "Light, upbeat, and content.",
  },
} as const;

type MoodKey = keyof typeof EMOTIONS;

interface MoodResult {
  emotion: string; // raw FER emotion (neutral, fear, etc.)
  mood: MoodKey; // mapped app mood (calm, angry, sad, happy)
  score: number;
}

export default function ConnectSpotifyPage() {
  const [moodResult, setMoodResult] = useState<MoodResult | null>(null);
  const [selected, setSelected] = useState<MoodKey>("calm");

  const SpotifyButton = () => {
  window.location.replace('/login');
};


  // ✅ 1) Load moodResult once from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("moodResult");
      if (!stored) return;

      const parsed = JSON.parse(stored);

      const moodKey = parsed?.mood;

      if (moodKey && moodKey in EMOTIONS) {
        setMoodResult(parsed);
        setSelected(moodKey);
      } else {
        // fallback if old format exists (emotion instead of mood)
        const fallback = parsed?.emotion?.toLowerCase();

        if (fallback && fallback in EMOTIONS) {
          const fixed = { ...parsed, mood: fallback };
          setMoodResult(fixed);
          setSelected(fallback);
          localStorage.setItem("moodResult", JSON.stringify(fixed));
        } else {
          setMoodResult(null);
          setSelected("calm");
        }
      }
    } catch (err) {
      console.error("Invalid moodResult in localStorage:", err);
      setMoodResult(null);
      setSelected("calm");
    }
  }, []);

  // ✅ 2) Whenever user changes mood manually, save it back to localStorage
  useEffect(() => {
    if (!moodResult) return;

    const updated = {
      ...moodResult,
      mood: selected,
    };

    localStorage.setItem("moodResult", JSON.stringify(updated));
  }, [selected, moodResult]);

  if (!moodResult) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No mood detected.
      </div>
    );
  }

  const emotion = EMOTIONS[selected];
  const confidence = Math.round(moodResult.score * 100);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar showLogo />

      <main className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md rounded-[32px]
                     bg-zinc-900/60 border border-zinc-800
                     backdrop-blur-xl p-8 shadow-2xl"
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: emotion.bg }}
            >
              {emotion.emoji}
            </div>
          </div>

          {/* Header */}
          <p className="text-center text-xs tracking-[0.3em] text-zinc-400 mb-2">
            MOOD DETECTION
          </p>

          <h1
            className="text-center text-5xl font-bold mb-6"
            style={{ color: emotion.accent }}
          >
            {emotion.label}
          </h1>

          {/* Progress */}
          <div className="mb-6">
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                key={selected}
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: emotion.accent }}
              />
            </div>

            <div className="flex justify-between text-xs text-zinc-400 mt-2">
              <span>ANALYSIS PRECISION</span>
              <span style={{ color: emotion.accent }}>{confidence}%</span>
            </div>
          </div>

          {/* Quote */}
          <motion.p
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-zinc-300 italic mb-8"
          >
            “{emotion.quote}”
          </motion.p>

          {/* Interactive selector */}
          <p className="text-center text-xs tracking-widest text-zinc-500 mb-4">
            WAIT, I FEEL…
          </p>

          <div className="flex justify-center gap-4 mb-10">
            {(Object.keys(EMOTIONS) as MoodKey[]).map((key) => {
              const e = EMOTIONS[key];
              const active = key === selected;

              return (
                <motion.button
                  key={key}
                  onClick={() => setSelected(key)}
                  whileHover={{ scale: active ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    w-20 h-20 rounded-3xl
                    flex items-center justify-center
                    border transition-all duration-200
                    ${active ? "border-[#5A5A5E]" : "border-[#1E1E22]"}
                  `}
                  style={{
                    backgroundColor: "#0F0F12",
                    boxShadow: active
                      ? "0 0 0 1px rgba(255,255,255,0.06)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.02)",
                  }}
                >
                  <span
                    className={`
                      text-5xl transition-all duration-200
                      ${active ? "" : "grayscale opacity-30 blur-[0.3px]"}
                    `}
                  >
                    {e.emoji}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Spotify CTA */}
          <motion.button
            onClick={SpotifyButton}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-14 rounded-full bg-[#1DB954]
                       text-black font-bold tracking-wide
                       flex items-center justify-center gap-3
                       shadow-xl shadow-green-500/30"
          >
            <AiFillSpotify className="text-2xl" />
            CONTINUE TO SPOTIFY
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
