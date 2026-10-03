import type { ColorOption, FurnitureType, HandleStyle, LegStyle, Finish } from "./types";

export type SizeKey = "S" | "M" | "L" | "XL";

export const sizeScales: Record<SizeKey, number> = {
  S: 0.85,
  M: 1,
  L: 1.15,
  XL: 1.3,
};

export const sizeLabels: Record<SizeKey, string> = {
  S: "Compact",
  M: "Standard",
  L: "Generous",
  XL: "Grand",
};

export const furnitureTypeLabels: Record<FurnitureType, string> = {
  sofa: "Sofa",
  armchair: "Armchair",
  "dining-table": "Dining Table",
  bed: "Bed Frame",
  cabinet: "Cabinet",
};

export const baseDimensions: Record<
  FurnitureType,
  { width: number; depth: number; height: number }
> = {
  sofa: { width: 210, depth: 92, height: 80 },
  armchair: { width: 75, depth: 82, height: 76 },
  "dining-table": { width: 200, depth: 100, height: 76 },
  bed: { width: 180, depth: 200, height: 110 },
  cabinet: { width: 180, depth: 48, height: 80 },
};

export const basePrices: Record<FurnitureType, number> = {
  sofa: 65000,
  armchair: 32000,
  "dining-table": 48000,
  bed: 55000,
  cabinet: 42000,
};

export const baseDeliveryWeeks: Record<FurnitureType, [number, number]> = {
  sofa: [5, 7],
  armchair: [4, 6],
  "dining-table": [6, 8],
  bed: [6, 8],
  cabinet: [5, 7],
};

export const legStyleOptions: { id: LegStyle; label: string; priceAdd: number }[] = [
  { id: "tapered", label: "Tapered", priceAdd: 0 },
  { id: "block", label: "Block", priceAdd: 0 },
  { id: "hairpin", label: "Hairpin", priceAdd: 1500 },
  { id: "turned", label: "Turned", priceAdd: 2500 },
];

export const handleStyleOptions: { id: HandleStyle; label: string; priceAdd: number }[] = [
  { id: "bar", label: "Bar Pull", priceAdd: 800 },
  { id: "knob", label: "Knob", priceAdd: 400 },
  { id: "recessed", label: "Recessed", priceAdd: 1500 },
  { id: "brass-pull", label: "Brass Pull", priceAdd: 2200 },
];

export const finishOptions: { id: Finish; label: string; priceAdd: number }[] = [
  { id: "matte", label: "Matte", priceAdd: 0 },
  { id: "satin", label: "Satin", priceAdd: 1200 },
  { id: "glossy", label: "Glossy", priceAdd: 2500 },
];

export const usesFabric = (type: FurnitureType) =>
  type === "sofa" || type === "armchair" || type === "bed";

export const usesHandles = (type: FurnitureType) => type === "cabinet";

function materialMultiplier(priceRange: string) {
  switch (priceRange) {
    case "₹":
      return 1;
    case "₹₹":
      return 1.08;
    case "₹₹₹":
      return 1.18;
    case "₹₹₹₹":
    default:
      return 1.3;
  }
}

export interface ConfigInput {
  furnitureType: FurnitureType;
  sizeKey: SizeKey;
  legStyle: LegStyle;
  handleStyle: HandleStyle;
  finish: Finish;
  woodPriceRange: string;
  fabricPriceRange: string;
}

export interface ConfigResult {
  price: number;
  dimensions: { width: number; depth: number; height: number };
  deliveryWeeks: [number, number];
}

export function calculateConfig(input: ConfigInput): ConfigResult {
  const scale = sizeScales[input.sizeKey];
  const base = baseDimensions[input.furnitureType];
  const dimensions = {
    width: Math.round(base.width * scale),
    depth: Math.round(base.depth * (scale > 1 ? 1 + (scale - 1) * 0.5 : scale)),
    height: base.height,
  };

  const legAdd = legStyleOptions.find((l) => l.id === input.legStyle)?.priceAdd ?? 0;
  const handleAdd = usesHandles(input.furnitureType)
    ? handleStyleOptions.find((h) => h.id === input.handleStyle)?.priceAdd ?? 0
    : 0;
  const finishAdd = finishOptions.find((f) => f.id === input.finish)?.priceAdd ?? 0;

  const materialMult =
    materialMultiplier(input.woodPriceRange) *
    (usesFabric(input.furnitureType) ? materialMultiplier(input.fabricPriceRange) : 1);

  const sizePriceMult = 0.8 + scale * 0.35;

  const base_price = basePrices[input.furnitureType];
  const price = Math.round(
    (base_price * sizePriceMult * materialMult + legAdd + handleAdd + finishAdd) / 100
  ) * 100;

  const [minW, maxW] = baseDeliveryWeeks[input.furnitureType];
  const extra = scale >= 1.15 ? 1 : 0;
  const deliveryWeeks: [number, number] = [minW + extra, maxW + extra];

  return { price, dimensions, deliveryWeeks };
}

export interface ProductConfigInput {
  basePrice: number;
  baseDimensions: { width: number; depth: number; height: number };
  sizeKey: SizeKey;
  legStyle: LegStyle;
  productionWeeks: [number, number];
  materialPriceRange?: string;
}

export function calculateProductConfig(input: ProductConfigInput): ConfigResult {
  const scale = sizeScales[input.sizeKey];
  const dimensions = {
    width: Math.round(input.baseDimensions.width * scale),
    depth: Math.round(
      input.baseDimensions.depth * (scale > 1 ? 1 + (scale - 1) * 0.5 : scale)
    ),
    height: input.baseDimensions.height,
  };
  const legAdd = legStyleOptions.find((l) => l.id === input.legStyle)?.priceAdd ?? 0;
  const sizePriceMult = 0.82 + scale * 0.3;
  const materialMult = input.materialPriceRange ? materialMultiplier(input.materialPriceRange) : 1;
  const price = Math.round((input.basePrice * sizePriceMult * materialMult + legAdd) / 100) * 100;
  const extra = scale >= 1.15 ? 1 : 0;
  const deliveryWeeks: [number, number] = [
    input.productionWeeks[0] + extra,
    input.productionWeeks[1] + extra,
  ];
  return { price, dimensions, deliveryWeeks };
}

export const defaultFabricColor: ColorOption = { name: "Oat", hex: "#D9CDB8" };
export const defaultWoodColor: ColorOption = { name: "Natural Oak", hex: "#C9A876" };

export const woodColorPalette: ColorOption[] = [
  { name: "Natural Oak", hex: "#C9A876" },
  { name: "Walnut", hex: "#5B3A26" },
  { name: "Teak", hex: "#8A5A34" },
  { name: "Ebony Stain", hex: "#2A2220" },
  { name: "Whitewash", hex: "#E8DFCF" },
];

export const fabricColorPalette: ColorOption[] = [
  { name: "Oat", hex: "#D9CDB8" },
  { name: "Stone Grey", hex: "#A8A296" },
  { name: "Charcoal", hex: "#3A3733" },
  { name: "Terracotta", hex: "#B5542B" },
  { name: "Sage", hex: "#6B7360" },
  { name: "Cognac", hex: "#A9652E" },
  { name: "Espresso", hex: "#4A2E1E" },
  { name: "Black", hex: "#1E1C19" },
];
