"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlaylist } from "../context/PlaylistContext";
import PlaylistView from "./_components/PlaylistView";

export default function PlaylistPage() {
  const router = useRouter();
  const { playlist } = usePlaylist();

  useEffect(() => {
    if (!playlist) {
      router.replace("/top-artists");
    }
  }, [playlist, router]);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading playlist…
      </div>
    );
  }

  return <PlaylistView playlist={playlist} />;
}