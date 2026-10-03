"use client";

import Link from "next/link";
import { Scan, Wrench } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  onViewInSpace,
}: {
  product: Product;
  onViewInSpace: (product: Product) => void;
}) {
  return (
    <div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-wood-100">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block"
          data-cursor
        >
          <Photo
            imageKey={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </Link>

        {product.tags[0] && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-canvas/90 px-3 py-1 text-[11px] uppercase tracking-wide text-ink">
            {product.tags[0]}
          </span>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full gap-2 p-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onViewInSpace(product)}
            data-cursor
            className="pointer-events-auto inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-canvas/95 py-2.5 text-xs font-medium text-ink backdrop-blur-sm transition-colors hover:bg-canvas"
          >
            <Scan className="h-3.5 w-3.5" /> View in Space
          </button>
          <Link
            href={`/configurator?type=${product.furnitureType}`}
            data-cursor
            className="pointer-events-auto inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink/90 py-2.5 text-xs font-medium text-canvas backdrop-blur-sm transition-colors hover:bg-ink"
          >
            <Wrench className="h-3.5 w-3.5" /> Customize
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/product/${product.slug}`} className="font-display text-lg text-ink">
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-ink-faint">{product.materialLabel}</p>
        </div>
        <p className="shrink-0 text-sm text-ink-soft">from {formatINR(product.basePrice)}</p>
      </div>
      <p className="mt-1 text-xs text-ink-faint">
        {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} cm
      </p>
    </div>
  );
}
