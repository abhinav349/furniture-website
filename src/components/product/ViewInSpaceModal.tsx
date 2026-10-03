"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ViewInSpaceModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-sm"
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
            className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl bg-paper lg:grid-cols-[1.3fr_1fr]"
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
                imageKey={product.gallery[0] ?? product.image}
                alt={`${product.name} shown in a styled room`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 flex items-center gap-2 rounded-full bg-charcoal/70 px-4 py-2 text-xs text-canvas backdrop-blur-sm">
                <span>Width {product.dimensions.width} cm</span>
                <span className="opacity-40">/</span>
                <span>Depth {product.dimensions.depth} cm</span>
                <span className="opacity-40">/</span>
                <span>Height {product.dimensions.height} cm</span>
              </div>
            </div>

            <div className="flex flex-col p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">In the Room</p>
              <h3 className="mt-2 font-display text-2xl text-ink">{product.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{product.materialLabel}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{product.description}</p>
              <p className="mt-6 text-lg text-ink">from {formatINR(product.basePrice)}</p>
              <div className="mt-auto flex flex-col gap-2 pt-6">
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm text-canvas"
                >
                  View Full Details <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/configurator?type=${product.furnitureType}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line px-5 py-3 text-sm text-ink"
                >
                  Customize This Piece
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
