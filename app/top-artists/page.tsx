"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../_components/navbar";
import SonicPioneerGrid from "./_components/sonic-pioneer-grid";
import GenerateBar from "./_components/generate-bar";
import { usePlaylist } from "../context/PlaylistContext";

export type Pioneer = {
  id: string;
  name: string;
  image?: string | null;
};

const MAX_PICK = 5;

export default function TopArtistsPage() {
  const router = useRouter();
  const { setPlaylist } = usePlaylist();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  const [pioneers, setPioneers] = useState<Pioneer[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 🔐 Save JWT from URL once
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      window.history.replaceState({}, "", "/top-artists");
    }
  }, []);

  // 🎵 Fetch top artists
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);

        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          router.push("/connect-spotify");
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/artists/top-30`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch artists");

        const data = await res.json();

        setPioneers(
          (data.artists || []).map((a: any) => ({
            id: a.id,
            name: a.name,
            image: a.image ?? null,
          }))
        );
      } catch (err) {
        console.error(err);
        setPioneers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [router]);

  const togglePick = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_PICK) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      <Navbar showLogo />

      <main className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mt-12 text-center">
          <h1 className="text-4xl font-extrabold sm:text-6xl">
            SONIC PIONEERS
          </h1>
          <p className="mt-5 text-xs tracking-widest text-white/45">
            PICK EXACTLY{" "}
            <span className="text-indigo-300">{MAX_PICK}</span> PIONEERS
          </p>
        </div>

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
        onSuccess={(playlist) => {
          setPlaylist(playlist); // ✅ CONTEXT, NOT localStorage
          router.push("/playlist");
        }}
      />
    </div>
  );
}