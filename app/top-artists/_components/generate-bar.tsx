"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  picked: number;
  maxPick: number;
  selectedIds: string[];
  onSuccess: (data: any) => void;
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

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  const handleGenerate = async () => {
    if (!ready || loading) return;

    try {
      setLoading(true);
      setError(null);

      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("Not authenticated");

      const moodResult = JSON.parse(localStorage.getItem("moodResult") || "{}");
      if (!moodResult?.mood) throw new Error("Mood missing");

      const res = await fetch(`${BACKEND_URL}/api/playlist/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          mood: moodResult.mood,
          selected_artists: selectedIds,
          limit: 30,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // 🚀 SEND FULL PLAYLIST OBJECT
      onSuccess(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleGenerate}
      disabled={!ready || loading}
    >
      Generate Playlist
    </motion.button>
  );
}