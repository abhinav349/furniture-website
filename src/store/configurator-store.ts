"use client";

import { create } from "zustand";
import type { FurnitureType, HandleStyle, LegStyle, Finish, ColorOption } from "@/lib/types";
import { defaultFabricColor, defaultWoodColor, type SizeKey } from "@/lib/configurator";
import { materials } from "@/lib/data/materials";

const defaultWoodMaterialId =
  materials.find((m) => m.category === "solid-wood")?.id ?? materials[0].id;
const defaultFabricMaterialId =
  materials.find((m) => m.category === "fabric")?.id ?? materials[0].id;

export interface ConfiguratorState {
  furnitureType: FurnitureType;
  sizeKey: SizeKey;
  woodMaterialId: string;
  fabricMaterialId: string;
  fabricColor: ColorOption;
  woodColor: ColorOption;
  legStyle: LegStyle;
  handleStyle: HandleStyle;
  finish: Finish;
  setFurnitureType: (type: FurnitureType) => void;
  setSizeKey: (size: SizeKey) => void;
  setWoodMaterialId: (id: string) => void;
  setFabricMaterialId: (id: string) => void;
  setFabricColor: (color: ColorOption) => void;
  setWoodColor: (color: ColorOption) => void;
  setLegStyle: (style: LegStyle) => void;
  setHandleStyle: (style: HandleStyle) => void;
  setFinish: (finish: Finish) => void;
  loadSnapshot: (snapshot: Partial<ConfiguratorSnapshot>) => void;
  reset: () => void;
}

export type ConfiguratorSnapshot = Pick<
  ConfiguratorState,
  | "furnitureType"
  | "sizeKey"
  | "woodMaterialId"
  | "fabricMaterialId"
  | "fabricColor"
  | "woodColor"
  | "legStyle"
  | "handleStyle"
  | "finish"
>;

const initial: ConfiguratorSnapshot = {
  furnitureType: "sofa",
  sizeKey: "M",
  woodMaterialId: defaultWoodMaterialId,
  fabricMaterialId: defaultFabricMaterialId,
  fabricColor: defaultFabricColor,
  woodColor: defaultWoodColor,
  legStyle: "tapered",
  handleStyle: "bar",
  finish: "satin",
};

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  ...initial,
  setFurnitureType: (furnitureType) => set({ furnitureType }),
  setSizeKey: (sizeKey) => set({ sizeKey }),
  setWoodMaterialId: (woodMaterialId) => set({ woodMaterialId }),
  setFabricMaterialId: (fabricMaterialId) => set({ fabricMaterialId }),
  setFabricColor: (fabricColor) => set({ fabricColor }),
  setWoodColor: (woodColor) => set({ woodColor }),
  setLegStyle: (legStyle) => set({ legStyle }),
  setHandleStyle: (handleStyle) => set({ handleStyle }),
  setFinish: (finish) => set({ finish }),
  loadSnapshot: (snapshot) => set({ ...snapshot }),
  reset: () => set({ ...initial }),
}));
