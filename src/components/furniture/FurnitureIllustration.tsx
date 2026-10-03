"use client";

import { useId, useMemo } from "react";
import type { FurnitureType, HandleStyle, LegStyle, Finish } from "@/lib/types";
import { shade } from "@/lib/color";

const FLOOR_Y = 282;

function Legs({
  xs,
  topY,
  woodHex,
  legStyle,
  short = false,
}: {
  xs: number[];
  topY: number;
  woodHex: string;
  legStyle: LegStyle;
  short?: boolean;
}) {
  const bottom = short ? topY + 26 : FLOOR_Y;
  const dark = shade(woodHex, -0.22);

  return (
    <>
      {xs.map((x, i) => {
        const key = `leg-${i}`;
        if (legStyle === "hairpin") {
          const spread = 10;
          return (
            <g key={key} stroke={shade(woodHex, -0.05)} strokeWidth={3} strokeLinecap="round">
              <line x1={x - spread} y1={topY} x2={x} y2={bottom} />
              <line x1={x + spread} y1={topY} x2={x} y2={bottom} />
            </g>
          );
        }
        if (legStyle === "turned") {
          const w = 10;
          return (
            <path
              key={key}
              d={`M${x - w} ${topY} h${w * 2} v6 q0 6 -5 8 q5 6 5 14 q0 8 -${w} 8 q-${w} 0 -${w} -8 q0 -8 5 -14 q-5 -2 -5 -8 Z`}
              fill={woodHex}
              stroke={dark}
              strokeWidth={0.5}
            />
          );
        }
        if (legStyle === "block") {
          const w = 14;
          return (
            <rect
              key={key}
              x={x - w / 2}
              y={topY}
              width={w}
              height={bottom - topY}
              rx={2}
              fill={woodHex}
              stroke={dark}
              strokeWidth={0.5}
            />
          );
        }
        // tapered
        const topW = 13;
        const botW = 6;
        return (
          <path
            key={key}
            d={`M${x - topW / 2} ${topY} h${topW} l-${(topW - botW) / 2} ${bottom - topY} h-${botW} Z`}
            fill={woodHex}
            stroke={dark}
            strokeWidth={0.5}
          />
        );
      })}
    </>
  );
}

function Handle({ x, y, style }: { x: number; y: number; style: HandleStyle }) {
  const metal = style === "brass-pull" ? "#B89150" : "#8C8C8C";
  if (style === "recessed") {
    return <rect x={x - 14} y={y} width={28} height={3} rx={1.5} fill="#00000022" />;
  }
  if (style === "knob") {
    return <circle cx={x} cy={y + 14} r={5} fill={metal} />;
  }
  // bar / brass-pull
  return <rect x={x - 3} y={y} width={6} height={32} rx={3} fill={metal} />;
}

function finishOverlay(finish: Finish, id: string) {
  if (finish === "matte") return null;
  const opacity = finish === "glossy" ? 0.22 : 0.1;
  return (
    <rect
      x={0}
      y={0}
      width={480}
      height={320}
      fill={`url(#${id})`}
      opacity={opacity}
      style={{ mixBlendMode: "screen" }}
    />
  );
}

export interface FurnitureIllustrationProps {
  type: FurnitureType;
  fabricHex: string;
  woodHex: string;
  legStyle: LegStyle;
  handleStyle?: HandleStyle;
  finish?: Finish;
  className?: string;
}

export function FurnitureIllustration({
  type,
  fabricHex,
  woodHex,
  legStyle,
  handleStyle = "bar",
  finish = "satin",
  className,
}: FurnitureIllustrationProps) {
  const uid = useId().replace(/:/g, "");
  const fabricLight = useMemo(() => shade(fabricHex, 0.08), [fabricHex]);
  const fabricDark = useMemo(() => shade(fabricHex, -0.1), [fabricHex]);
  const woodLight = useMemo(() => shade(woodHex, 0.06), [woodHex]);
  const woodDark = useMemo(() => shade(woodHex, -0.12), [woodHex]);

  const fabricGradId = `fabricGrad-${uid}`;
  const woodGradId = `woodGrad-${uid}`;
  const sheenId = `sheen-${uid}`;

  return (
    <svg viewBox="0 0 480 320" className={className} role="img" aria-label={`${type} preview`}>
      <defs>
        <linearGradient id={fabricGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={fabricLight} />
          <stop offset="1" stopColor={fabricDark} />
        </linearGradient>
        <linearGradient id={woodGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={woodLight} />
          <stop offset="1" stopColor={woodDark} />
        </linearGradient>
        <linearGradient id={sheenId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="240" cy="296" rx="168" ry="13" fill="#000000" opacity="0.08" />

      {type === "sofa" && (
        <g>
          <rect x="70" y="92" width="340" height="88" rx="26" fill={`url(#${fabricGradId})`} />
          <rect x="58" y="120" width="48" height="112" rx="20" fill={fabricDark} />
          <rect x="374" y="120" width="48" height="112" rx="20" fill={fabricDark} />
          <rect x="96" y="172" width="288" height="66" rx="18" fill={`url(#${fabricGradId})`} />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={104 + i * 96}
              y={150}
              width={84}
              height={52}
              rx={16}
              fill={fabricLight}
              opacity={0.9}
            />
          ))}
          <Legs xs={[130, 350]} topY={232} woodHex={woodHex} legStyle={legStyle} />
          {finishOverlay(finish, sheenId)}
        </g>
      )}

      {type === "armchair" && (
        <g>
          <rect x="150" y="82" width="180" height="108" rx="28" fill={`url(#${fabricGradId})`} />
          <rect x="128" y="128" width="42" height="102" rx="18" fill={fabricDark} />
          <rect x="310" y="128" width="42" height="102" rx="18" fill={fabricDark} />
          <rect x="150" y="192" width="180" height="58" rx="16" fill={`url(#${fabricGradId})`} />
          <rect x="162" y="168" width="156" height="46" rx="14" fill={fabricLight} opacity={0.9} />
          <Legs xs={[178, 302]} topY={244} woodHex={woodHex} legStyle={legStyle} />
          {finishOverlay(finish, sheenId)}
        </g>
      )}

      {type === "dining-table" && (
        <g>
          <Legs xs={[108, 372]} topY={150} woodHex={woodHex} legStyle={legStyle} />
          <rect x="54" y="130" width="372" height="24" rx="8" fill={`url(#${woodGradId})`} />
          <rect x="54" y="150" width="372" height="7" fill={woodDark} opacity={0.6} />
          {finishOverlay(finish, sheenId)}
        </g>
      )}

      {type === "bed" && (
        <g>
          <rect x="90" y="68" width="300" height="112" rx="22" fill={`url(#${fabricGradId})`} />
          <rect x="106" y="124" width="88" height="34" rx="14" fill={fabricLight} opacity={0.85} />
          <rect x="206" y="124" width="88" height="34" rx="14" fill={fabricLight} opacity={0.85} />
          <rect x="58" y="168" width="364" height="42" rx="10" fill={`url(#${woodGradId})`} />
          <rect x="70" y="150" width="340" height="26" rx="10" fill="#F7F3EC" stroke={woodDark} strokeWidth="1" />
          <Legs xs={[102, 378]} topY={210} woodHex={woodHex} legStyle={legStyle} short />
          {finishOverlay(finish, sheenId)}
        </g>
      )}

      {type === "cabinet" && (
        <g>
          <rect x="90" y="88" width="300" height="172" rx="10" fill={`url(#${woodGradId})`} />
          <line x1="190" y1="92" x2="190" y2="256" stroke={woodDark} strokeWidth="1.5" opacity={0.5} />
          <line x1="290" y1="92" x2="290" y2="256" stroke={woodDark} strokeWidth="1.5" opacity={0.5} />
          <Handle x={170} y={150} style={handleStyle} />
          <Handle x={270} y={150} style={handleStyle} />
          <Handle x={370} y={150} style={handleStyle} />
          <Legs xs={[112, 368]} topY={260} woodHex={woodHex} legStyle={legStyle} short />
          {finishOverlay(finish, sheenId)}
        </g>
      )}
    </svg>
  );
}
