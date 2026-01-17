"use client";

import { useMemo, useState } from "react";

type Props = {
  name?: string;
  image?: string | null;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function SonicPioneerCard({
  name = "Unknown",
  image,
  active = false,
  disabled = false,
  onClick,
}: Props) {
  const [imgError, setImgError] = useState(false);

  const initials = useMemo(() => {
    const parts = name.trim().split(" ").filter(Boolean);
    const first = parts[0]?.[0] ?? "A";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (first + last).toUpperCase();
  }, [name]);

  const showImage = !!image && !imgError;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "group relative h-[140px] w-full rounded-[28px]",
        "bg-white/[0.03] ring-1 ring-white/10",
        "transition duration-200",
        "hover:bg-white/[0.05] hover:ring-white/15",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        active ? "ring-2 ring-indigo-400/60" : "",
      ].join(" ")}
    >
      {/* glossy highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/[0.05] to-transparent opacity-80" />

      {/* soft glow when active */}
      {active && (
        <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-indigo-500/15 blur-xl" />
      )}

      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-4">
        <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full ring-1 ring-white/10">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image!}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-white/[0.04]">
              <span className="text-sm font-semibold tracking-wide text-white/70">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="w-full text-center">
          <p className="truncate text-[11px] font-semibold tracking-[0.22em] text-white/70">
            {name.toUpperCase()}
          </p>
        </div>
      </div>

      {/* hover outline */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 ring-1 ring-indigo-400/30 transition group-hover:opacity-100" />
    </button>
  );
}
