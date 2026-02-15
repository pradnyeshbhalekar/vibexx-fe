"use client";

import SelectedArtistsStack from "./SelectedArtistsStack";
import PlaylistCover from "../_components/PlaylistCover";

type Artist = {
  id: string;
  name: string;
  image?: string | null;
};

type Track = {
  id: string;
  name: string;
  image?: string;
  artists?: string[] | string;
  spotify_url: string;
};

type Playlist = {
  playlist_name: string;
  mood: string;
  playlist_url: string;
  track_count: number;
  selected_artists?: Artist[];
  tracks?: Track[];
};

export default function PlaylistView({ playlist }: { playlist: Playlist }) {
  const title =
    playlist.playlist_name || "MIDNIGHT ECHOES & MOONLIT MELODIES";

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

            {/* ✅ SELECTED ARTISTS STACK (NO onClick) */}
            {playlist.selected_artists?.length ? (
              <div className="mt-6 flex justify-center md:justify-start">
                <SelectedArtistsStack
                  artists={playlist.selected_artists}
                />
              </div>
            ) : null}

            {/* Pills */}
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

            {/* Spotify */}
            <a
              href={playlist.playlist_url}
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex items-center justify-center w-full md:w-[520px]
              rounded-full bg-[#1DB954] text-black font-extrabold tracking-[0.35em] uppercase
              py-5 text-sm md:text-base transition"
            >
              Listen on Spotify
            </a>
          </div>
        </div>

        {/* TRACK LIST */}
        <div className="mt-12 space-y-4">
          {playlist.tracks?.map((track, index) => (
            <a
              key={track.id || index}
              href={track.spotify_url}
              target="_blank"
              rel="noreferrer"
              className="group block px-6 py-5 rounded-[28px]
                bg-zinc-900/25 border border-zinc-800
                hover:bg-zinc-900/40 transition"
            >
              <div className="flex items-center gap-5">
                <span className="text-zinc-500 w-6">
                  {index + 1}
                </span>

                <img
                  src={track.image || "/placeholder-track.png"}
                  alt={track.name}
                  className="w-[54px] h-[54px] rounded-2xl object-cover"
                />

                <div className="min-w-0">
                  <p className="font-semibold uppercase truncate">
                    {track.name}
                  </p>
                  <p className="text-xs text-zinc-500 uppercase truncate">
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