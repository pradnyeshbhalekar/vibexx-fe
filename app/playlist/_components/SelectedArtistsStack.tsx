"use client";

import { useState } from "react";

type Artist = {
  id: string;
  name: string;
  image?: string | null;
};

export default function SelectedArtistsStack({
  artists,
}: {
  artists: Artist[];
}) {
  const [open, setOpen] = useState(false);

  if (!artists || artists.length === 0) return null;

  return (
    <>
      {/* STACK */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {artists.slice(0, 5).map((artist, i) => (
          <div
            key={artist.id}
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-black bg-zinc-800"
            style={{
              marginLeft: i === 0 ? 0 : -20,
              zIndex: 10 - i,
            }}
          >
            <img
              src={artist.image || "/placeholder.png"}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-3xl p-8 w-[420px] max-w-[90%]">
            <h2 className="text-xl font-bold tracking-widest mb-6">
              SELECTED ARTISTS
            </h2>

            <div className="space-y-4">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center gap-4"
                >
                  <img
                    src={artist.image || "/placeholder.png"}
                    alt={artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="uppercase tracking-widest text-sm">
                    {artist.name}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-8 w-full py-3 rounded-full bg-white text-black font-bold tracking-widest"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}