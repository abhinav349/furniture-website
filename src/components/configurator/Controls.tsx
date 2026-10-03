"use client";

import { cn, formatINR } from "@/lib/utils";
import type { ColorOption } from "@/lib/types";
import type { Material } from "@/lib/types";

export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; priceAdd?: number }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              value === opt.id
                ? "border-ink bg-ink text-canvas"
                : "border-line text-ink-soft hover:border-ink-soft"
            )}
          >
            {opt.label}
            {!!opt.priceAdd && (
              <span className="ml-1.5 text-xs opacity-60">+{formatINR(opt.priceAdd)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SwatchGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: ColorOption[];
  value: ColorOption;
  onChange: (color: ColorOption) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">{label}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => onChange(c)}
            className="flex flex-col items-center gap-1.5"
            aria-label={c.name}
            title={c.name}
          >
            <span
              className={cn(
                "h-9 w-9 rounded-full border-2 transition-transform",
                value.name === c.name ? "scale-110 border-ink" : "border-transparent"
              )}
              style={{ backgroundColor: c.hex }}
            />
            <span className="text-[10px] text-ink-faint">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MaterialPicker({
  label,
  materials,
  value,
  onChange,
}: {
  label: string;
  materials: Material[];
  value: string;
  onChange: (material: Material) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">{label}</p>
      <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
        {materials.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m)}
            className={cn(
              "flex min-w-[108px] flex-col gap-2 rounded-xl border p-2.5 text-left transition-colors",
              value === m.id ? "border-ink" : "border-line hover:border-ink-soft"
            )}
          >
            <span className="block h-14 w-full rounded-lg" style={{ backgroundColor: m.swatchHex }} />
            <span className="text-xs text-ink">{m.name}</span>
            <span className="text-[10px] text-ink-faint">{m.priceRange}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
