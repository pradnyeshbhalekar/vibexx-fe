"use client";

import { createContext, useContext, useState } from "react";

type PlaylistContextType = {
  playlist: any | null;
  setPlaylist: (data: any) => void;
};

const PlaylistContext = createContext<PlaylistContextType | null>(null);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = useState<any | null>(null);

  return (
    <PlaylistContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const ctx = useContext(PlaylistContext);
  if (!ctx) throw new Error("usePlaylist must be used inside PlaylistProvider");
  return ctx;
}