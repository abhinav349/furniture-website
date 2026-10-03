"use client";

import { MoveHorizontal, MoveVertical } from "lucide-react";
import { FurnitureIllustration } from "@/components/furniture/FurnitureIllustration";
import type { FurnitureType, HandleStyle, LegStyle, Finish } from "@/lib/types";

export function PreviewPanel({
  furnitureType,
  fabricHex,
  woodHex,
  legStyle,
  handleStyle,
  finish,
  width,
  depth,
  height,
}: {
  furnitureType: FurnitureType;
  fabricHex: string;
  woodHex: string;
  legStyle: LegStyle;
  handleStyle?: HandleStyle;
  finish?: Finish;
  width: number;
  depth: number;
  height: number;
}) {
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-wood-100 p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(28,26,23,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(28,26,23,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <span className="absolute left-5 top-5 rounded-full bg-canvas/80 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-ink-soft">
        Live Preview
      </span>

      <FurnitureIllustration
        type={furnitureType}
        fabricHex={fabricHex}
        woodHex={woodHex}
        legStyle={legStyle}
        handleStyle={handleStyle}
        finish={finish}
        className="h-auto w-full max-w-xl drop-shadow-xl"
      />

      <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-6 text-xs text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <MoveHorizontal className="h-3.5 w-3.5" /> {width} cm wide
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoveHorizontal className="h-3.5 w-3.5 rotate-90" /> {depth} cm deep
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MoveVertical className="h-3.5 w-3.5" /> {height} cm high
        </span>
      </div>
    </div>
  );
}
