"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Mood = {
  emotion: string;
  confidence: number;
  description: string;
};

type Props = {
  picked: number;
  maxPick: number;
  selectedIds: string[];
  mood: Mood; 
  onSuccess: (playlistData: any) => void;
};

export default function GenerateBar({
  picked,
  maxPick,
  selectedIds,
  mood,
  onSuccess,
}: Props) {
  const ready = picked === maxPick;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  const handleGenerate = async () => {
    if (!ready || loading) return;

    if (!mood || !mood.emotion) {
      setError("Mood not found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Not authenticated");

      console.log("Generating playlist with mood:", mood);

      const res = await fetch(`${BACKEND_URL}/api/playlist/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mood: mood.emotion,             
          confidence: mood.confidence,     
          selected_artists: selectedIds,
          limit: 30,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create playlist");
      }

      onSuccess(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
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
              Generating playlist…
            </>
          ) : (
            <>Generate Playlist ({picked}/{maxPick})</>
          )}
        </motion.button>
      </div>
    </div>
  );
}