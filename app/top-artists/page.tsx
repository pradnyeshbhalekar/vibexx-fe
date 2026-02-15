"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePlaylist } from "../context/PlaylistContext";
import GenerateBar from "./_components/generate-bar";
import SonicPioneerGrid from "./_components/sonic-pioneer-grid";

export type Pioneer = {
  id: string;
  name: string;
  image?: string | null;
};

const MAX_PICK = 5;

export default function TopArtistsPage() {
  const router = useRouter();
  const { setPlaylist } = usePlaylist();

  const [artists, setArtists] = useState<Pioneer[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  // 🔐 Save JWT from callback URL
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
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        router.push("/connect-spotify");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/api/artists/top-30`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setArtists(data.artists || []);
      } catch (e) {
        console.error(e);
        router.push("/connect-spotify");
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

  return (
    <div className="min-h-screen bg-black text-white">
      <SonicPioneerGrid
        loading={loading}
        pioneers={artists}
        selectedIds={selectedIds}
        maxPick={MAX_PICK}
        onTogglePick={togglePick}
      />

      <GenerateBar
        picked={selectedIds.length}
        maxPick={MAX_PICK}
        selectedIds={selectedIds}
        onSuccess={(playlistData) => {
          // ✅ SEND VIA CONTEXT (THIS IS THE KEY)
          setPlaylist(playlistData);
          router.push("/playlist");
        }}
      />
    </div>
  );
}