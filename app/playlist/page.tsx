"use client";

import { usePlaylist } from "../context/PlaylistContext";
import PlaylistView from "./_components/PlaylistView";

export default function PlaylistPage() {
  const { playlist } = usePlaylist();

  if (!playlist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No playlist data found.
      </div>
    );
  }

  return <PlaylistView playlist={playlist} />;
}