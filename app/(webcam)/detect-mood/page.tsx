"use client";

import { useRouter } from "next/navigation";
import Webcam from "./_components/WebcamCapture";
import Navbar from "../../_components/navbar";

export default function CapturePage() {
  const router = useRouter();

  const handleCapture = (base64Image: string) => {
    sessionStorage.setItem("capturedImage", base64Image);
    router.push("/connect-spotify");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar showLogo />

      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        {/* Text */}
        <div className="text-center max-w-xl mb-12">
          <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-3">
            Mood Detection
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Let Your Face Speak
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Vibexx reads subtle facial cues to understand your emotional
            state and generate a playlist that matches your current wavelength.
          </p>
        </div>

        {/* Webcam */}
        <Webcam onCapture={handleCapture} />
      </main>
    </div>
  );
}