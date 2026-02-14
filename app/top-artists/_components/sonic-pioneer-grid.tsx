"use client";

import SonicPioneerCard from "./sonic-pioneer-card";
import type { Pioneer } from "../types";

type Props = {
  pioneers: Pioneer[];
  loading: boolean;
  selectedIds: string[];
  maxPick: number;
  onTogglePick: (id: string) => void;
};

export default function SonicPioneerGrid({
  pioneers,
  loading,
  selectedIds,
  maxPick,
  onTogglePick,
}: Props) {
  if (loading) {
    return (
      <section className="mt-14">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-[140px] rounded-[28px] bg-white/[0.04] ring-1 ring-white/10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-3">
                <div className="h-16 w-16 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!pioneers || pioneers.length === 0) {
    return (
      <section className="mt-14">
        <div className="rounded-[28px] bg-white/[0.03] p-8 ring-1 ring-white/10">
          <p className="text-sm font-medium text-white/70">
            No pioneers loaded yet.
          </p>
          <p className="mt-2 text-xs text-white/45">
            Your UI is ready. Add your fetch/useEffect and map real data here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-14">
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {pioneers.map((p) => {
          const active = selectedIds.includes(p.id);
          const disablePick = !active && selectedIds.length >= maxPick;

          return (
            <SonicPioneerCard
              key={p.id}
              name={p.name}
              image={p.image ?? null}
              active={active}
              disabled={disablePick}
              onClick={() => onTogglePick(p.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
