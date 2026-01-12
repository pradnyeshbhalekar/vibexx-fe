"use client";

import { useRouter } from "next/navigation";
import Webcam from "../(webcam)/detect-mood/_components/WebcamCapture";

export default function MoodPage() {
  const router = useRouter();

  async function handleCapture(base64Image: string) {
    const res = await fetch("http://127.0.0.1:5000/api/detectmood/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64Image, // Flask expects "image"
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Flask error: ${text}`);
    }

    const moodResult = await res.json();

    // persist for next page
    localStorage.setItem("moodResult", JSON.stringify(moodResult));

    router.push("/connect-spotify");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <Webcam onCapture={handleCapture} />
    </main>
  );
}
