import type { ImageKey } from "./images";

export type FurnitureType =
  | "sofa"
  | "armchair"
  | "dining-table"
  | "bed"
  | "cabinet";

export type LegStyle = "tapered" | "block" | "hairpin" | "turned";
export type HandleStyle = "bar" | "knob" | "recessed" | "brass-pull";
export type Finish = "matte" | "satin" | "glossy";

export interface ColorOption {
  name: string;
  hex: string;
}

export type MaterialCategoryId =
  | "solid-wood"
  | "engineered-wood"
  | "veneer"
  | "laminate"
  | "metal"
  | "glass"
  | "fabric"
  | "stone";

export interface Material {
  id: string;
  name: string;
  category: MaterialCategoryId;
  image: ImageKey;
  swatchHex: string;
  durability: number; // 1-5
  maintenance: "Low" | "Moderate" | "High";
  applications: string[];
  priceRange: string;
  description: string;
}

export type ProductCategoryId =
  | "living-room"
  | "bedroom"
  | "dining"
  | "office"
  | "hospitality"
  | "custom";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategoryId;
  furnitureType: FurnitureType;
  materialLabel: string;
  basePrice: number;
  dimensions: { width: number; depth: number; height: number };
  productionWeeks: [number, number];
  colors: ColorOption[];
  woodTones: ColorOption[];
  image: ImageKey;
  gallery: ImageKey[];
  description: string;
  tags: string[];
  defaultLegStyle: LegStyle;
}

export type ProjectCategoryId =
  | "Residential"
  | "Hotel"
  | "Restaurant"
  | "Office"
  | "Retail"
  | "Architecture";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategoryId;
  location: string;
  year: number;
  image: ImageKey;
  scope: string;
  pieces: number;
  description: string;
}

export interface ProcessStage {
  id: string;
  index: number;
  title: string;
  description: string;
  image: ImageKey;
  stat?: { value: number; suffix?: string; label: string };
}
