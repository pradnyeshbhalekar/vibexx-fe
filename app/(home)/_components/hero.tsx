"use client"
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {

    const router = useRouter();
      const handleStart = () => {
        router.push("/mood"); // 👈 webcam page
  };

    return (
        <div className="min-h-screen flex flex-col items-center text-center py-12 space-y-32 text-zinc-100 bg-zinc-950">
            
                <div className="space-y-6 max-w-3xl">
                    <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-indigo-500/10 border border-indigo-500/200 text-indigo-400 text-xs font-bold justify-center uppercase tracking-widest">
                    Real-Time Mood Sync
                    </div>
                    <h1 className="text-5xl md:text-8xl font-extrabold -tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-600">Your Mood.<br/>Your Sonic <br/>Signature.</h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light">Vibexx captures your current headspace through advanced visual analysis, orchestrating a personalized Spotify experience that perfectly matches your wavelength</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <button 
                  onClick={handleStart}
                  className="w-full sm:w-auto px-10 py-4  bg-indigo-800 text-white font-bold rounded-full hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
                >
                  START YOUR VIBE
                </button>
                </div>
            </div>
        </div>

    )
}
export default Hero