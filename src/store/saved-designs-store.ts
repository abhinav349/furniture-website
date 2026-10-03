"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ConfiguratorSnapshot } from "./configurator-store";

export interface SavedDesign {
  id: string;
  name: string;
  createdAt: number;
  snapshot: ConfiguratorSnapshot;
}

interface SavedDesignsState {
  designs: SavedDesign[];
  addDesign: (snapshot: ConfiguratorSnapshot) => SavedDesign;
  removeDesign: (id: string) => void;
}

export const useSavedDesignsStore = create<SavedDesignsState>()(
  persist(
    (set) => ({
      designs: [],
      addDesign: (snapshot) => {
        const design: SavedDesign = {
          id: `design-${Date.now()}`,
          name: `${snapshot.furnitureType} design`,
          createdAt: Date.now(),
          snapshot,
        };
        set((state) => ({ designs: [design, ...state.designs].slice(0, 20) }));
        return design;
      },
      removeDesign: (id) =>
        set((state) => ({ designs: state.designs.filter((d) => d.id !== id) })),
    }),
    { name: "ligna-saved-designs" }
  )
);
