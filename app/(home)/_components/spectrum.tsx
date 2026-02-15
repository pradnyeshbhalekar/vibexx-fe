"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MOODS = {
  happy: {
    label: "HAPPY",
    image: "/emoji/happy.png",
    color: "#FFD800",
    description:
      "Lively rhythms, uptempo beats, and bright melodies curated to amplify your internal sunshine.",
  },
  sad: {
    label: "SAD",
    image: "/emoji/sad.png",
    color: "#4B90E2",
    description:
      "Soft textures, slow tempos, and emotional depth for quiet reflection.",
  },
  angry: {
    label: "ANGRY",
    image: "/emoji/angry.png",
    color: "#EA4E77",
    description:
      "Heavy basslines, sharp drops, and raw energy to release the pressure.",
  },
  calm: {
    label: "CALM",
    image: "/emoji/calm.png",
    color: "#615FFF",
    description:
      "Ambient layers and steady rhythms designed for balance and focus.",
  },
} as const;

type MoodKey = keyof typeof MOODS;

export default function MoodSpectrum() {
  const [active, setActive] = useState<MoodKey>("happy");
  const mood = MOODS[active];

  return (
    <section className="w-full bg-zinc-950 text-zinc-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-3">
            Emotional Intelligence
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold">
            THE <span className="text-indigo-400">SPECTRUM</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl">
            Our AI deciphers subtle nuances of emotion and maps them to their
            perfect sonic counterpart.
          </p>
        </div>

        {/* MOOD TABS */}
        <div className="flex gap-3 mb-14">
          {(Object.keys(MOODS) as MoodKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`
                px-6 py-2 rounded-full text-xs tracking-widest font-bold
                transition-all
                ${
                  active === key
                    ? "bg-indigo-500 text-black shadow-lg"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }
              `}
            >
              {MOODS[key].label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* FEATURE CARD */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[32px] bg-zinc-900/60 border border-zinc-800
                       p-10 backdrop-blur"
          >
            {/* IMAGE */}
            <div className="w-20 h-20 mb-6 rounded-2xl bg-zinc-800 flex items-center justify-center">
              <img
                src={mood.image}
                alt={mood.label}
                className="w-14 h-14 object-contain"
              />
            </div>

            <h3
              className="text-4xl font-extrabold mb-4"
              style={{ color: mood.color }}
            >
              {mood.label}
            </h3>

            <p className="text-zinc-300 leading-relaxed">
              {mood.description}
            </p>
          </motion.div>

          {/* PLACEHOLDER CONTENT GRID */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-[28px] h-[200px]
                           bg-zinc-900/40 border border-zinc-800
                           flex flex-col justify-between p-6
                           hover:bg-zinc-900/60 transition"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800
                                flex items-center justify-center text-zinc-400">
                  ▶
                </div>

                <div>
                  <div className="h-2 w-24 bg-zinc-700 rounded mb-2" />
                  <div className="h-2 w-16 bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}