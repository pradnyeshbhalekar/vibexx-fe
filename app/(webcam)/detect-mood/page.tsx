"use client";

import { useRouter } from "next/navigation";
import Webcam from "./_components/WebcamCapture";

export default function CapturePage() {
  const router = useRouter();

  const handleCapture = (base64Image: string) => {
    // persist image for next page
    sessionStorage.setItem("capturedImage", base64Image);

    // move forward
    router.push("/connect-spotify");
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <Webcam onCapture={handleCapture} />
    </main>
  );
}
