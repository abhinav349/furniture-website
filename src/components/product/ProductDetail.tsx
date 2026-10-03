"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Wrench } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { PreviewPanel } from "@/components/configurator/PreviewPanel";
import { MaterialPicker, OptionGroup, SwatchGroup } from "@/components/configurator/Controls";
import {
  calculateProductConfig,
  legStyleOptions,
  sizeLabels,
  usesFabric,
  defaultWoodColor,
  type SizeKey,
} from "@/lib/configurator";
import { materials } from "@/lib/data/materials";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ViewInSpaceModal } from "@/components/product/ViewInSpaceModal";
import { formatINR } from "@/lib/utils";
import type { Product, LegStyle } from "@/lib/types";

const frameMaterials = materials.filter((m) => m.category !== "fabric");
const fabricMaterials = materials.filter((m) => m.category === "fabric");
const sizeOptions: { id: SizeKey; label: string }[] = (["S", "M", "L", "XL"] as SizeKey[]).map(
  (id) => ({ id, label: `${id} — ${sizeLabels[id]}` })
);

export function ProductDetail({ product }: { product: Product }) {
  const fabricRelevant = usesFabric(product.furnitureType);

  const [sizeKey, setSizeKey] = useState<SizeKey>("M");
  const [legStyle, setLegStyle] = useState<LegStyle>(product.defaultLegStyle);
  const [primaryColor, setPrimaryColor] = useState(product.colors[0]);
  const [secondaryColor, setSecondaryColor] = useState(product.woodTones[0] ?? defaultWoodColor);
  const [materialId, setMaterialId] = useState(
    (fabricRelevant ? fabricMaterials[0]?.id : frameMaterials[0]?.id) ?? frameMaterials[0].id
  );

  const material = useMemo(
    () => materials.find((m) => m.id === materialId) ?? frameMaterials[0],
    [materialId]
  );

  const fabricHex = fabricRelevant ? primaryColor.hex : "#D9CDB8";
  const woodHex = fabricRelevant ? secondaryColor.hex : primaryColor.hex;

  const result = useMemo(
    () =>
      calculateProductConfig({
        basePrice: product.basePrice,
        baseDimensions: product.dimensions,
        sizeKey,
        legStyle,
        productionWeeks: product.productionWeeks,
        materialPriceRange: material.priceRange,
      }),
    [product, sizeKey, legStyle, material]
  );

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  const [viewing, setViewing] = useState<Product | null>(null);

  return (
    <div className="pb-28 pt-28 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">
            {product.category.replace("-", " ")} / {product.furnitureType.replace("-", " ")}
          </p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <PreviewPanel
              furnitureType={product.furnitureType}
              fabricHex={fabricHex}
              woodHex={woodHex}
              legStyle={legStyle}
              finish="satin"
              width={result.dimensions.width}
              depth={result.dimensions.depth}
              height={result.dimensions.height}
            />
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.15em] text-ink-faint">
                Studio Photography
              </p>
              <div className="grid grid-cols-3 gap-3">
                {product.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                    <Photo
                      imageKey={img}
                      alt={`${product.name} — view ${i + 1}`}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-7">
            <div>
              {product.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-wood-100 px-3 py-1 text-[11px] uppercase tracking-wide text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-display text-4xl text-ink lg:text-5xl">{product.name}</h1>
              <p className="mt-2 text-ink-soft">{product.materialLabel}</p>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">
                {product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-line bg-paper p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Price</p>
                <p className="mt-1 font-display text-3xl text-ink">{formatINR(result.price)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Dimensions</p>
                <p className="mt-1 text-sm text-ink">
                  {result.dimensions.width} × {result.dimensions.depth} × {result.dimensions.height} cm
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">
                  <Clock className="mr-1 inline h-3.5 w-3.5" /> Production
                </p>
                <p className="mt-1 text-sm text-ink">
                  {result.deliveryWeeks[0]}–{result.deliveryWeeks[1]} weeks
                </p>
              </div>
            </div>

            <OptionGroup
              label="Size"
              options={sizeOptions}
              value={sizeKey}
              onChange={setSizeKey}
            />

            <MaterialPicker
              label={fabricRelevant ? "Fabric Material" : "Material"}
              materials={fabricRelevant ? fabricMaterials : frameMaterials}
              value={materialId}
              onChange={(m) => setMaterialId(m.id)}
            />

            <SwatchGroup
              label="Color"
              options={product.colors}
              value={primaryColor}
              onChange={setPrimaryColor}
            />

            {fabricRelevant && (
              <SwatchGroup
                label="Leg &amp; Frame"
                options={product.woodTones}
                value={secondaryColor}
                onChange={setSecondaryColor}
              />
            )}

            <OptionGroup
              label="Leg Style"
              options={legStyleOptions.map((l) => ({ id: l.id, label: l.label, priceAdd: l.priceAdd }))}
              value={legStyle}
              onChange={setLegStyle}
            />

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/quote?furnitureType=${product.category}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-canvas transition-colors hover:bg-wood-700"
              >
                Request Quote <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/configurator?type=${product.furnitureType}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm text-ink transition-colors hover:border-ink-soft"
              >
                <Wrench className="h-4 w-4" /> Customize Further
              </Link>
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">You Might Also Like</p>
              <h2 className="mt-3 font-display text-3xl">More from this collection</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onViewInSpace={setViewing} />
              ))}
            </div>
          </div>
        )}
      </div>

      <ViewInSpaceModal product={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
