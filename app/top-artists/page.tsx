"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../_components/navbar";
import SonicPioneerGrid from "./_components/sonic-pioneer-grid";
import GenerateBar from "./_components/generate-bar";

/* ---------- TYPES ---------- */
export type Pioneer = {
  id: string;
  name: string;
  image?: string | null;
};

const MAX_PICK = 5;

/* ---------- JWT READER (must be inside Suspense) ---------- */
function SaveJWT() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      sessionStorage.setItem("jwt", token);
      window.history.replaceState({}, "", "/top-artists");
    }
  }, [router]);

  return null;
}

/* ---------- PAGE ---------- */
export default function SonicPioneersPage() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI;

  const [pioneers, setPioneers] = useState<Pioneer[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* ---------- FETCH ARTISTS ---------- */
  useEffect(() => {
    const fetchPioneers = async () => {
      try {
        setLoading(true);

        const jwt = sessionStorage.getItem("jwt");
        if (!jwt) {
          router.replace("/connect-spotify");
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/artists/top-30`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = await res.json();
        console.log("ARTISTS RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data?.error || "Failed to fetch artists");
        }

        const artists = data?.artists;

        if (!Array.isArray(artists)) {
          throw new Error("Invalid artists payload");
        }

        setPioneers(
          artists.map((p: any) => ({
            id: p.id,
            name: p.name,
            image: p.image ?? null,
          }))
        );
      } catch (err) {
        console.error(err);
        setPioneers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPioneers();
  }, [router, BACKEND_URL]);

  /* ---------- SELECTION ---------- */
  const togglePick = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_PICK) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      {/* Suspense fixes Next.js build error */}
      <Suspense fallback={null}>
        <SaveJWT />
      </Suspense>

      <Navbar showLogo />

      <main className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mt-12 text-center">
          <h1 className="text-4xl font-extrabold sm:text-6xl">
            SONIC PIONEERS
          </h1>
          <p className="mt-5 text-xs tracking-widest text-white/45">
            PICK EXACTLY{" "}
            <span className="text-indigo-300">{MAX_PICK}</span> PIONEERS
          </p>
        </div>

        <SonicPioneerGrid
          loading={loading}
          pioneers={pioneers}
          selectedIds={selectedIds}
          maxPick={MAX_PICK}
          onTogglePick={togglePick}
        />
      </main>

      <GenerateBar
        picked={selectedIds.length}
        maxPick={MAX_PICK}
        selectedIds={selectedIds}
        onSuccess={() => router.push("/playlist")}
      />
    </div>
  );
}