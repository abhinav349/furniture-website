import type { Metadata } from "next";
import { Materials } from "@/components/sections/Materials";

export const metadata: Metadata = {
  title: "Materials — Ligna",
  description: "Explore the solid wood, veneer, metal, glass, fabric, and stone we build with.",
};

export default function MaterialsPage() {
  return (
    <div className="pt-20">
      <Materials />
    </div>
  );
}
