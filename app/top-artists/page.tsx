"use client"
import { useState,useEffect } from "react";
import Navbar from "../_components/navbar";
import { useRouter } from "next/navigation";
import SonicPioneerCard from "./_components/sonic-pioneer-card";
import SonicPioneerGrid from "./_components/sonic-pioneer-grid";
import GenerateBar from "./_components/generate-bar";
export type Pioneer = {
    id : string,
    name : string,
    image? : string | null;
}

const MAX_PICK = 5

export default function SonicPioneersPage() {
  const router = useRouter();

  // ✅ normal useState (you will set it later using useEffect)
  const [pioneers, setPioneers] = useState<Pioneer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const togglePick = (id: string) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(id);

      if (exists) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_PICK) return prev;

      return [...prev, id];
    });
  };

  useEffect(()=>{
    const fetchPioneers = async () => {
        try{
            setLoading(true)

            const res = await fetch('/api/artists/top-30',{
            credentials: "include",
            })
            
            if(!res.ok) throw new Error("Failed to fetch artists")

            const data = await res.json()
            console.log(data.artists)

            setPioneers(
                data.artists.map((p:any) => ({
                    id:p.id,
                    name:p.name,
                    image: p.image ?? null
                }))
            )
        }catch(err){
            console.error(err)
            setPioneers([])
        }finally{
            setLoading(false)

        }

    }
    fetchPioneers()
  },[])

  return (
    <div className="min-h-screen bg-[#06070b] text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[75%] h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute left-[20%] top-[20%] h-[280px] w-[280px] rounded-full bg-purple-500/10 blur-[90px]" />
      </div>

      <Navbar showLogo />

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="mt-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            SONIC PIONEERS
          </h1>

          <p className="mt-5 text-xs font-medium tracking-[0.35em] text-white/45">
            PICK EXACTLY{" "}
            <span className="text-indigo-300/90">{MAX_PICK} PIONEERS</span> TO
            GROUND YOUR BASE ARCHIVE
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
  onSuccess={(data) => {
    router.push("/playlist");
  }}
/>
    </div>
  );
}