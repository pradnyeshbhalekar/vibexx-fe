"use client";

import { useEffect, useState } from "react";
import PlaylistCover from "./_components/PlaylistCover";

export default function PlaylistPage() {
  const [playlist, setPlaylist] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("playlistResult");
    if (stored) setPlaylist(JSON.parse(stored));
  }, []);

  if (!playlist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No playlist data found.
      </div>
    );
  }

  const title = playlist.title || "MIDNIGHT ECHOES & MOONLIT MELODIES";
  const trackCount = playlist.track_count || playlist.tracks?.length || 0;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-zinc-800/30 blur-[120px]" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-zinc-700/20 blur-[140px]" />
      </div>

      <div className="relative px-8 md:px-16 py-12 md:py-16 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
          <PlaylistCover />

          <div className="flex-1 w-full text-center md:text-left">
            <p className="text-xs tracking-[0.35em] uppercase text-indigo-300/70 mb-4">
              Late-night calm archive
            </p>

            <h1 className="text-[52px] leading-[0.95] md:text-[84px] font-extrabold tracking-tight uppercase">
              {title}
            </h1>

            {/* Pills row */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-5 py-2 rounded-full text-xs tracking-widest uppercase bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                Wavelength:{" "}
                <span className="text-white">{playlist.mood || "Calm"}</span>
              </span>

              <span className="px-5 py-2 rounded-full text-xs tracking-widest uppercase bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                Language: <span className="text-white">Mix</span>
              </span>

              <span className="px-5 py-2 rounded-full text-xs tracking-widest uppercase bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                {trackCount} Tracks • HQ
              </span>
            </div>

            {/* Spotify button */}
            <a
              href={playlist.playlist_url}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center justify-center w-full md:w-[520px]
              rounded-full bg-[#1DB954] text-black font-extrabold tracking-[0.35em] uppercase
              py-5 text-sm md:text-base
              shadow-[0_0_60px_rgba(29,185,84,0.35)]
              hover:shadow-[0_0_90px_rgba(29,185,84,0.55)]
              hover:scale-[1.02]
              transition"
            >
              Listen on Spotify
            </a>

            {/* bottom small buttons */}
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <button
                className="w-full md:w-[250px] py-4 rounded-full bg-zinc-900/60 border border-zinc-800
                text-zinc-300 tracking-widest text-xs uppercase hover:bg-zinc-900 transition"
              >
                New Scan
              </button>

              <button
                className="w-full md:w-[250px] py-4 rounded-full bg-zinc-900/60 border border-zinc-800
                text-zinc-300 tracking-widest text-xs uppercase hover:bg-zinc-900 transition"
              >
                Edit Config
              </button>
            </div>
          </div>
        </div>

        {/* TRACK LIST HEADER */}
        <div className="mt-16 hidden md:grid grid-cols-12 text-xs tracking-[0.3em] uppercase text-zinc-500 px-6">
          <div className="col-span-1">#</div>
          <div className="col-span-7">Composition</div>

          <div className="col-span-3 text-right">Link</div>
        </div>

        {/* TRACK LIST */}
        <div className="mt-6 space-y-4">
          {playlist.tracks.map((track: any, index: number) => {
            const artistName = Array.isArray(track.artists)
              ? track.artists.join(", ")
              : track.artists || "Unknown Artist";

            return (
              <a
                key={track.id || index}
                href={track.spotify_url}
                target="_blank"
                rel="noreferrer"
                className="
                  group block px-6 py-5 rounded-[28px]
                  bg-zinc-900/25 border border-zinc-800 backdrop-blur
                  transition-all duration-300
                  hover:bg-zinc-900/40
                  hover:border-[#3729AB]
                  hover:shadow-[0_0_40px_rgba(55,41,171,0.35)]
                  hover:-translate-y-[2px]
                "
              >
                <div className="flex items-center justify-between gap-6">
                  {/* LEFT */}
                  <div className="flex items-center gap-5 min-w-0">
                    {/* index */}
                    <span className="text-zinc-500 font-medium w-6 shrink-0">
                      {index + 1}
                    </span>

                    {/* album image */}
                    <div className="w-[54px] h-[54px] rounded-2xl overflow-hidden border border-zinc-800 shrink-0">
                      <img
                        src={track.image}
                        alt={track.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    {/* song details */}
                    <div className="min-w-0">
                      <p className="font-semibold tracking-wide uppercase truncate group-hover:text-white transition">
                        {track.name}
                      </p>

                      <p className="text-xs text-zinc-500 tracking-widest uppercase truncate mt-1">
                        {artistName} • {track.album_name}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 shrink-0">
                    {track.mood_score !== undefined && (
                      <span
                        className="hidden md:inline-flex px-4 py-2 rounded-full text-[10px] tracking-[0.25em] uppercase
                        bg-zinc-900/60 border border-zinc-800 text-zinc-400
                        group-hover:border-[#3729AB] transition"
                      >
                        Score:{" "}
                        <span className="text-white ml-2">
                          {Math.round(track.mood_score)}
                        </span>
                      </span>
                    )}

                    <span className="text-zinc-500 text-sm group-hover:text-white transition">
                      ↗
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
