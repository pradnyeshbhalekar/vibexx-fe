"use client";

import { usePlaylist } from "../context/PlaylistContext";
import PlaylistCover from "./_components/PlaylistCover";

export default function PlaylistPage() {
  const { playlist } = usePlaylist();

  if (!playlist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No playlist data found. Start from Top Artists.
      </div>
    );
  }

  const title =
    playlist.title || "MIDNIGHT ECHOES & MOONLIT MELODIES";
  const trackCount =
    playlist.track_count || playlist.tracks?.length || 0;

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

            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-5 py-2 rounded-full text-xs tracking-widest uppercase bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                Wavelength:{" "}
                <span className="text-white">
                  {playlist.mood || "Calm"}
                </span>
              </span>

              <span className="px-5 py-2 rounded-full text-xs tracking-widest uppercase bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                {trackCount} Tracks • HQ
              </span>
            </div>

            <a
              href={playlist.playlist_url}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center justify-center w-full md:w-[520px]
              rounded-full bg-[#1DB954] text-black font-extrabold tracking-[0.35em] uppercase
              py-5 text-sm md:text-base
              shadow-[0_0_60px_rgba(29,185,84,0.35)]
              hover:shadow-[0_0_90px_rgba(29,185,84,0.55)]
              transition"
            >
              Listen on Spotify
            </a>
          </div>
        </div>

        {/* TRACK LIST */}
        <div className="mt-10 space-y-4">
          {playlist.tracks.map((track: any, index: number) => (
            <a
              key={track.id}
              href={track.spotify_url}
              target="_blank"
              rel="noreferrer"
              className="block px-6 py-5 rounded-[28px]
              bg-zinc-900/25 border border-zinc-800 backdrop-blur
              hover:bg-zinc-900/40 transition"
            >
              <div className="flex items-center gap-5">
                <span className="text-zinc-500 w-6">
                  {index + 1}
                </span>

                <img
                  src={track.image}
                  alt={track.name}
                  className="w-[54px] h-[54px] rounded-2xl object-cover"
                />

                <div>
                  <p className="font-semibold uppercase">
                    {track.name}
                  </p>
                  <p className="text-xs text-zinc-500 uppercase">
                    {Array.isArray(track.artists)
                      ? track.artists.join(", ")
                      : track.artists}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}