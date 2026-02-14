// app/playlist/page.tsx
"use client";

import { usePlaylist } from "../context/PlaylistContext";

export default function PlaylistPage() {
  const { playlist } = usePlaylist();

  if (!playlist) {
    return <div>No playlist data</div>;
  }

  return (
    <div>
      <h1>{playlist.mood}</h1>
      {playlist.tracks.map((t: any) => (
        <div key={t.id}>{t.name}</div>
      ))}
    </div>
  );
}