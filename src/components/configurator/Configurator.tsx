"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, ClipboardList, History, Trash2 } from "lucide-react";
import { useConfiguratorStore } from "@/store/configurator-store";
import { useSavedDesignsStore } from "@/store/saved-designs-store";
import {
  calculateConfig,
  fabricColorPalette,
  finishOptions,
  furnitureTypeLabels,
  handleStyleOptions,
  legStyleOptions,
  sizeLabels,
  usesFabric,
  usesHandles,
  woodColorPalette,
  type SizeKey,
} from "@/lib/configurator";
import { materials } from "@/lib/data/materials";
import { FurnitureIllustration } from "@/components/furniture/FurnitureIllustration";
import { PreviewPanel } from "@/components/configurator/PreviewPanel";
import { MaterialPicker, OptionGroup, SwatchGroup } from "@/components/configurator/Controls";
import { cn, formatINR } from "@/lib/utils";
import type { FurnitureType } from "@/lib/types";

const furnitureTypes: FurnitureType[] = ["sofa", "armchair", "dining-table", "bed", "cabinet"];
const frameMaterials = materials.filter((m) => m.category !== "fabric");
const fabricMaterials = materials.filter((m) => m.category === "fabric");
const sizeOptions: { id: SizeKey; label: string }[] = (["S", "M", "L", "XL"] as SizeKey[]).map(
  (id) => ({ id, label: `${id} — ${sizeLabels[id]}` })
);

export function Configurator({
  initialType,
  embedded = false,
}: {
  initialType?: FurnitureType;
  embedded?: boolean;
}) {
  const state = useConfiguratorStore();
  const { addDesign, designs, removeDesign } = useSavedDesignsStore();
  const [saved, setSaved] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (initialType) state.setFurnitureType(initialType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialType]);

  const woodMaterial = useMemo(
    () => frameMaterials.find((m) => m.id === state.woodMaterialId) ?? frameMaterials[0],
    [state.woodMaterialId]
  );
  const fabricMaterial = useMemo(
    () => fabricMaterials.find((m) => m.id === state.fabricMaterialId) ?? fabricMaterials[0],
    [state.fabricMaterialId]
  );

  const result = useMemo(
    () =>
      calculateConfig({
        furnitureType: state.furnitureType,
        sizeKey: state.sizeKey,
        legStyle: state.legStyle,
        handleStyle: state.handleStyle,
        finish: state.finish,
        woodPriceRange: woodMaterial.priceRange,
        fabricPriceRange: fabricMaterial.priceRange,
      }),
    [state.furnitureType, state.sizeKey, state.legStyle, state.handleStyle, state.finish, woodMaterial, fabricMaterial]
  );

  function handleSave() {
    addDesign({
      furnitureType: state.furnitureType,
      sizeKey: state.sizeKey,
      woodMaterialId: state.woodMaterialId,
      fabricMaterialId: state.fabricMaterialId,
      fabricColor: state.fabricColor,
      woodColor: state.woodColor,
      legStyle: state.legStyle,
      handleStyle: state.handleStyle,
      finish: state.finish,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  const fabricRelevant = usesFabric(state.furnitureType);
  const handlesRelevant = usesHandles(state.furnitureType);

  return (
    <div className={cn("grid gap-10 lg:grid-cols-[1fr_1fr]", embedded ? "" : "lg:gap-14")}>
      <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
        <PreviewPanel
          furnitureType={state.furnitureType}
          fabricHex={state.fabricColor.hex}
          woodHex={state.woodColor.hex}
          legStyle={state.legStyle}
          handleStyle={state.handleStyle}
          finish={state.finish}
          width={result.dimensions.width}
          depth={result.dimensions.depth}
          height={result.dimensions.height}
        />

        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Estimated Price</p>
            <p className="mt-1 font-display text-3xl text-ink">{formatINR(result.price)}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Est. Delivery</p>
            <p className="mt-1 text-lg text-ink">
              {result.deliveryWeeks[0]}–{result.deliveryWeeks[1]} weeks
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/quote?type=${state.furnitureType}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm text-canvas transition-colors hover:bg-wood-700"
          >
            <ClipboardList className="h-4 w-4" /> Request Quote
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-5 py-3.5 text-sm text-ink transition-colors hover:border-ink-soft"
          >
            <AnimatePresence mode="wait" initial={false}>
              {saved ? (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2"
                >
                  <Check className="h-4 w-4" /> Saved
                </motion.span>
              ) : (
                <motion.span
                  key="save"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2"
                >
                  <Bookmark className="h-4 w-4" /> Save Design
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {designs.length > 0 && (
          <div className="rounded-2xl border border-line bg-paper p-5">
            <button
              onClick={() => setShowSaved((v) => !v)}
              className="flex w-full items-center justify-between text-sm text-ink-soft"
            >
              <span className="inline-flex items-center gap-2">
                <History className="h-4 w-4" /> Saved Designs ({designs.length})
              </span>
              <span>{showSaved ? "Hide" : "Show"}</span>
            </button>
            {showSaved && (
              <ul className="mt-4 flex flex-col gap-2">
                {designs.map((d) => (
                  <li
                    key={d.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5"
                  >
                    <button
                      onClick={() => state.loadSnapshot(d.snapshot)}
                      className="flex items-center gap-3 text-left"
                    >
                      <span
                        className="h-7 w-7 shrink-0 rounded-full"
                        style={{ backgroundColor: d.snapshot.fabricColor.hex }}
                      />
                      <span className="text-sm text-ink">
                        {furnitureTypeLabels[d.snapshot.furnitureType]} · {d.snapshot.sizeKey}
                      </span>
                    </button>
                    <button
                      onClick={() => removeDesign(d.id)}
                      className="text-ink-faint hover:text-rust"
                      aria-label="Remove saved design"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-9">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-ink-faint">Furniture Type</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {furnitureTypes.map((type) => (
              <button
                key={type}
                onClick={() => state.setFurnitureType(type)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors",
                  state.furnitureType === type
                    ? "border-ink bg-wood-100"
                    : "border-line hover:border-ink-soft"
                )}
              >
                <FurnitureIllustration
                  type={type}
                  fabricHex="#D9CDB8"
                  woodHex="#C9A876"
                  legStyle="tapered"
                  className="h-10 w-full"
                />
                <span className="text-[11px] text-ink-soft">{furnitureTypeLabels[type]}</span>
              </button>
            ))}
          </div>
        </div>

        <OptionGroup
          label="Size"
          options={sizeOptions}
          value={state.sizeKey}
          onChange={state.setSizeKey}
        />

        <MaterialPicker
          label="Wood / Material"
          materials={frameMaterials}
          value={state.woodMaterialId}
          onChange={(m) => state.setWoodMaterialId(m.id)}
        />

        <SwatchGroup
          label="Color"
          options={woodColorPalette}
          value={state.woodColor}
          onChange={state.setWoodColor}
        />

        {fabricRelevant && (
          <>
            <MaterialPicker
              label="Fabric"
              materials={fabricMaterials}
              value={state.fabricMaterialId}
              onChange={(m) =>
                state.setFabricMaterialId(m.id)
              }
            />
            <SwatchGroup
              label="Fabric Color"
              options={fabricColorPalette}
              value={state.fabricColor}
              onChange={state.setFabricColor}
            />
          </>
        )}

        <OptionGroup
          label="Leg Style"
          options={legStyleOptions.map((l) => ({ id: l.id, label: l.label, priceAdd: l.priceAdd }))}
          value={state.legStyle}
          onChange={state.setLegStyle}
        />

        {handlesRelevant && (
          <OptionGroup
            label="Handle Style"
            options={handleStyleOptions.map((h) => ({ id: h.id, label: h.label, priceAdd: h.priceAdd }))}
            value={state.handleStyle}
            onChange={state.setHandleStyle}
          />
        )}

        <OptionGroup
          label="Finish"
          options={finishOptions.map((f) => ({ id: f.id, label: f.label, priceAdd: f.priceAdd }))}
          value={state.finish}
          onChange={state.setFinish}
        />
      </div>
    </div>
  );
}
