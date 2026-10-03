"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { MaterialModal } from "@/components/material/MaterialModal";
import { materials, materialCategories } from "@/lib/data/materials";
import type { Material, MaterialCategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Materials({ limit }: { limit?: number }) {
  const [active, setActive] = useState<MaterialCategoryId | "all">("all");
  const [selected, setSelected] = useState<Material | null>(null);

  const filtered = useMemo(() => {
    const list = active === "all" ? materials : materials.filter((m) => m.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <section id="materials" className="bg-wood-100/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Material Library</p>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl">
            Every surface starts as a material decision.
          </h2>
          <p className="mt-4 text-ink-soft">
            Tap any swatch for texture, durability, maintenance, and where we
            typically use it.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              active === "all" ? "bg-ink text-canvas" : "bg-paper text-ink-soft hover:bg-wood-300/40"
            )}
          >
            All
          </button>
          {materialCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                active === c.id ? "bg-ink text-canvas" : "bg-paper text-ink-soft hover:bg-wood-300/40"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {filtered.map((material) => (
            <button
              key={material.id}
              onClick={() => setSelected(material)}
              className="group flex flex-col gap-3 text-left"
            >
              <span className="relative block aspect-square overflow-hidden rounded-2xl">
                <Photo
                  imageKey={material.image}
                  alt={material.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span
                  className="absolute bottom-2 left-2 h-6 w-6 rounded-full border-2 border-canvas"
                  style={{ backgroundColor: material.swatchHex }}
                />
              </span>
              <div>
                <p className="text-sm text-ink">{material.name}</p>
                <p className="text-xs text-ink-faint">{material.priceRange}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <MaterialModal material={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
