import type { Metadata } from "next";
import { FactoryStory } from "@/components/sections/FactoryStory";
import { FactoryTransparency } from "@/components/sections/FactoryTransparency";

export const metadata: Metadata = {
  title: "The Factory — Ligna",
  description: "27 years of in-house manufacturing — our process, capacity, and quality control.",
};

export default function FactoryPage() {
  return (
    <div className="pt-20">
      <FactoryStory />
      <FactoryTransparency />
    </div>
  );
}
