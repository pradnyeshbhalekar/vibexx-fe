"use client";

import { useRouter } from "next/navigation";
import Navbar from "../_components/navbar";
import Webcam from "../(webcam)/detect-mood/_components/WebcamCapture";
import { useMood } from "../context/MoodContext";

export default function MoodPage() {
  const router = useRouter();
  const { setMood } = useMood();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  async function handleCapture(base64Image: string) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/detectmood/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!res.ok) throw new Error(await res.text());

      const moodResult = await res.json();
      console.log("MOOD RESULT 👉", moodResult);

      // ✅ store in memory
      setMood(moodResult);

      // ✅ navigate normally
      router.push("/connect-spotify");
    } catch (err) {
      console.error("Mood detection error:", err);
      alert("Could not detect mood. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar showLogo />

      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-xl mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-3">
            Mood Detection
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Read the Moment
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Vibexx analyzes facial expressions and translates them into music
            that matches your current emotional state.
          </p>
        </div>

        <Webcam onCapture={handleCapture} />
      </main>
    </div>
  );
}