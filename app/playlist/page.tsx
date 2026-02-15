"use client";

import { usePlaylist } from "../context/PlaylistContext";
import PlaylistCover from "./_components/PlaylistCover";

export default function PlaylistPage() {
  const { playlist } = usePlaylist();
  console.log(playlist)

  // 🛑 HARD GUARD
  if (!playlist || !Array.isArray(playlist.tracks)) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No playlist data found. Please regenerate.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <PlaylistCover />

      <div className="space-y-4 mt-10">
        {playlist.tracks.map((track: any, index: number) => (
          <div key={track.id || index}>
            {index + 1}. {track.name}
          </div>
        ))}
      </div>
    </div>
  );
}