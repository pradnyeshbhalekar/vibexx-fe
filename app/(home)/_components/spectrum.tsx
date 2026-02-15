"use client";

import Image from "next/image";
import { useState } from "react";

type MoodKey = "happy" | "sad" | "angry" | "calm";

const EMOTIONS: Record<
  MoodKey,
  {
    label: string;
    image: string;
    accent: string;
    quote: string;
  }
> = {
  happy: {
    label: "HAPPY",
    image: "/emoji/happy.png",
    accent: "#FFD800",
    quote:
      "Lively rhythms, uptempo beats, and bright melodies curated to amplify your internal sunshine.",
  },
  sad: {
    label: "SAD",
    image: "/emoji/sad.png",
    accent: "#4B90E2",
    quote:
      "Soft tones, mellow tempos, and reflective melodies for quiet moments.",
  },
  angry: {
    label: "ANGRY",
    image: "/emoji/angry.png",
    accent: "#EA4E77",
    quote:
      "High-energy tracks, sharp beats, and intense sounds to release pressure.",
  },
  calm: {
    label: "CALM",
    image: "/emoji/calm.png",
    accent: "#615FFF",
    quote:
      "Balanced rhythms and soothing textures to center your mind.",
  },
};

const AUDIO_PROFILES: Record<MoodKey, { title: string; desc: string }[]> = {
  happy: [
    { title: "Upbeat Tempo", desc: "Energetic rhythms with higher BPM." },
    { title: "Major Keys", desc: "Bright harmonies that feel optimistic." },
    { title: "Dance Energy", desc: "Grooves that invite movement." },
    { title: "Positive Hooks", desc: "Catchy melodies and feel-good lyrics." },
  ],
  sad: [
    { title: "Slow Tempo", desc: "Lower BPM for emotional breathing room." },
    { title: "Minor Keys", desc: "Melancholic harmonic language." },
    { title: "Soft Vocals", desc: "Expressive, intimate performances." },
    { title: "Minimal Layers", desc: "Sparse arrangements that linger." },
  ],
  angry: [
    { title: "High Intensity", desc: "Fast, aggressive rhythmic drive." },
    { title: "Hard Drops", desc: "Sharp transitions and impact moments." },
    { title: "Distortion", desc: "Raw textures that release tension." },
    { title: "Bold Energy", desc: "Unapologetic sonic presence." },
  ],
  calm: [
    { title: "Balanced Tempo", desc: "Steady rhythms that slow the system." },
    { title: "Warm Tones", desc: "Soft pads and organic textures." },
    { title: "Ambient Space", desc: "Open arrangements with air." },
    { title: "Low Dynamics", desc: "No sudden spikes or surprises." },
  ],
};

export default function Spectrum() {
  const [selected, setSelected] = useState<MoodKey>("happy");
  const emotion = EMOTIONS[selected];

  return (
    <section className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <div
        className="
          mx-auto w-full
          px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
          py-16 sm:py-20 md:py-24 lg:py-28
          pb-24 sm:pb-28 md:pb-32 lg:pb-40
        "
      >
        <div
          className="
            grid grid-cols-1
            lg:grid-cols-[1.1fr_1.9fr]
            gap-16 lg:gap-24
            items-start
          "
        >
          {/* LEFT */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500 mb-4">
              Emotional Intelligence
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 md:mb-6">
              THE SPECTRUM
            </h1>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-[42ch]">
              We translate human emotion into sound — reading micro-expressions and
              shaping music that resonates with your current state of mind.
            </p>

            {/* PILLS */}
            <div
              className="
                mt-8
                grid grid-cols-2 gap-4
                sm:flex sm:flex-wrap
                lg:flex-nowrap lg:gap-6
              "
            >
              {(Object.keys(EMOTIONS) as MoodKey[]).map((key) => {
                const active = key === selected;
                return (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`
                      w-full sm:w-auto
                      px-8 py-3
                      rounded-full
                      text-xs sm:text-sm
                      font-semibold tracking-[0.25em]
                      uppercase
                      transition-all duration-200
                      ${
                        active
                          ? "bg-indigo-500 text-white ring-2 ring-indigo-400/40"
                          : "bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white hover:border-white/20"
                      }
                    `}
                  >
                    {EMOTIONS[key].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="col-span-1 md:col-span-2 rounded-2xl md:rounded-[32px] bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-white/5 backdrop-blur-xl p-6 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-white/10 border border-white/10 mb-5 md:mb-6">
                <Image src={emotion.image} alt={emotion.label} width={36} height={36} />
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 md:mb-5"
                style={{ color: emotion.accent }}
              >
                {emotion.label}
              </h2>

              <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-lg">
                {emotion.quote}
              </p>
            </div>

            {AUDIO_PROFILES[selected].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl md:rounded-3xl bg-zinc-900/40 border border-white/5 p-5 md:p-8"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-zinc-500 mb-2">
                  Audio Profile
                </p>
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}