"use client";

import { useEffect, useState } from "react";

export default function PlaylistCover() {
  const [cover, setCover] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("playlistResult");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const firstTrackImage = parsed?.tracks?.[0]?.image;

    if (firstTrackImage) setCover(firstTrackImage);
  }, []);

  return (
    <div
      className="w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-[40px]
      bg-gradient-to-br from-zinc-800/70 to-zinc-900/40
      border border-zinc-700/40 shadow-[0_0_60px_rgba(0,0,0,0.6)]
      overflow-hidden flex items-center justify-center"
    >
      {cover ? (
        <img
          src={cover}
          alt="Playlist cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="opacity-60">
          <svg
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            className="text-zinc-200"
          >
            <path
              d="M9 18V6l12-2v12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M21 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
