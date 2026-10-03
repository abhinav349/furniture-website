"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { Material } from "@/lib/types";
import { cn } from "@/lib/utils";

const maintenanceTone: Record<Material["maintenance"], string> = {
  Low: "bg-moss/15 text-moss-deep",
  Moderate: "bg-wood-300/30 text-wood-700",
  High: "bg-rust/15 text-rust",
};

export function MaterialModal({
  material,
  onClose,
}: {
  material: Material | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!material) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [material, onClose]);

  return (
    <AnimatePresence>
      {material && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-paper lg:grid-cols-[1fr_1.1fr]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-canvas/90 p-2 text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Photo
                imageKey={material.image}
                alt={material.name}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">{material.category.replace("-", " ")}</p>
              <h3 className="mt-2 font-display text-2xl text-ink">{material.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{material.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Durability</p>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1.5 w-6 rounded-full",
                          i <= material.durability ? "bg-wood-500" : "bg-line"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Maintenance</p>
                  <span
                    className={cn(
                      "mt-2 inline-block rounded-full px-2.5 py-1 text-xs",
                      maintenanceTone[material.maintenance]
                    )}
                  >
                    {material.maintenance}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Applications</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {material.applications.map((a) => (
                    <span key={a} className="rounded-full bg-wood-100 px-2.5 py-1 text-xs text-ink-soft">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-auto pt-6 text-sm text-ink">
                Price Range <span className="ml-2 text-wood-500">{material.priceRange}</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
