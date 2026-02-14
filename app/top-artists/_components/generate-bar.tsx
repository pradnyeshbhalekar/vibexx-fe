"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  picked: number;
  maxPick: number;
  selectedIds: string[];
  onSuccess?: (data: any) => void;
};

export default function GenerateBar({
  picked,
  maxPick,
  selectedIds,
  onSuccess,
}: Props) {
  const ready = picked === maxPick;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const BACKEND_URL =process.env.NEXT_PUBLIC_BACKEND_URI


  const handleGenerate = async () => {
    if (!ready || loading) return;

    setLoading(true);
    setError(null);

    try {
      // get mood from localStorage
      const moodResult = JSON.parse(localStorage.getItem("moodResult") || "{}");
      const mood = moodResult?.mood;

      if (!mood) throw new Error("Mood not found in localStorage");

      // 1) Save selected artists in session
      const selectRes = await fetch(`${BACKEND_URL}/api/artists/select`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artist_ids: selectedIds }),
      });

      const selectData = await selectRes.json();

      if (!selectRes.ok) {
        throw new Error(selectData?.error || "Failed to save artists");
      }


      const res = await fetch('/api/playlist/create', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 30,
          mood: mood,
        }),
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create playlist");
      }


      localStorage.setItem("playlistResult", JSON.stringify(data));

      onSuccess?.(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-20 flex justify-center px-6">
      <div className="w-full max-w-2xl space-y-2">
        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}

        <motion.button
          onClick={handleGenerate}
          disabled={!ready || loading}
          whileHover={!loading && ready ? { scale: 1.02 } : {}}
          whileTap={!loading && ready ? { scale: 0.98 } : {}}
          className={`
            w-full h-14 rounded-full font-bold tracking-wide
            flex items-center justify-center gap-3
            transition-all
            ${
              ready && !loading
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-400 cursor-not-allowed"
            }
          `}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
              Generating playlist...
            </>
          ) : (
            <>Generate Playlist ({picked}/{maxPick})</>
          )}
        </motion.button>
      </div>
    </div>
  );
}
