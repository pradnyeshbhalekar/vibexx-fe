"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../_components/navbar";
import SonicPioneerGrid from "./_components/sonic-pioneer-grid";
import GenerateBar from "./_components/generate-bar";
import type { Pioneer } from "./types";
import { useMood } from "../context/MoodContext";

const MAX_PICK = 5;

export default function TopArtistsClient() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  const { mood } = useMood(); // 👈 REQUIRED
  const [pioneers, setPioneers] = useState<Pioneer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 🧠 HARD GUARD — no mood, no page
  useEffect(() => {
    if (!mood) {
      router.replace("/mood");
    }
  }, [mood, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("jwt", tokenFromUrl);
      window.history.replaceState({}, "", "/top-artists");
    }

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      router.replace("/connect-spotify");
      return;
    }

    const fetchArtists = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/artists/top-30`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = await res.json();
        if (!res.ok || !Array.isArray(data.artists)) {
          throw new Error("Invalid artist response");
        }

        setPioneers(
          data.artists.map((a: any) => ({
            id: a.id,
            name: a.name,
            image: a.image ?? null,
          }))
        );
      } catch (err) {
        console.error(err);
        router.replace("/connect-spotify");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [router, BACKEND_URL]);

  const togglePick = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_PICK) return prev;
      return [...prev, id];
    });
  };

  // ⛔ Prevent render until mood exists
  if (!mood) return null;

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Navbar showLogo />

      <main className="mx-auto max-w-6xl px-6 pb-28">
        <SonicPioneerGrid
          loading={loading}
          pioneers={pioneers}
          selectedIds={selectedIds}
          maxPick={MAX_PICK}
          onTogglePick={togglePick}
        />
      </main>

      <GenerateBar
        picked={selectedIds.length}
        maxPick={MAX_PICK}
        selectedIds={selectedIds}
        mood={mood} // ✅ THIS WAS MISSING
        onSuccess={() => router.push("/playlist")}
      />
    </div>
  );
}