"use client";

import { useRef, useEffect, useState } from "react";

interface WebcamProps {
  onCapture: (base64Image: string) => void;
}

export default function Webcam({ onCapture }: WebcamProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError("Camera access denied");
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setLoading(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/jpeg", 0.85);
    onCapture(image);
  };

  if (error) {
    return <p className="text-white">{error}</p>;
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full rounded-xl"
      />

      <canvas ref={canvasRef} className="hidden" />

      <button
        onClick={capture}
        disabled={loading}
        className="absolute bottom-6 left-1/2 -translate-x-1/2
                   w-16 h-16 rounded-full border-4 border-white"
      />
    </div>
  );
}
