"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ViewInSpaceModal } from "@/components/product/ViewInSpaceModal";
import { products, productCategories } from "@/lib/data/products";
import type { Product, ProductCategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Showroom({ limit }: { limit?: number }) {
  const [active, setActive] = useState<ProductCategoryId | "all">("all");
  const [viewing, setViewing] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const list = active === "all" ? products : products.filter((p) => p.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <section id="showroom" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">The Showroom</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl lg:text-5xl">
              Furniture for every room you&apos;re building.
            </h2>
          </div>
          <Link
            href="/showroom"
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
          >
            View full collection <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              active === "all" ? "bg-ink text-canvas" : "bg-wood-100 text-ink-soft hover:bg-wood-300/60"
            )}
          >
            All
          </button>
          {productCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                active === c.id ? "bg-ink text-canvas" : "bg-wood-100 text-ink-soft hover:bg-wood-300/60"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 5) * 0.06}>
              <ProductCard product={product} onViewInSpace={setViewing} />
            </Reveal>
          ))}
        </div>
      </div>

      <ViewInSpaceModal product={viewing} onClose={() => setViewing(null)} />
    </section>
  );
}
