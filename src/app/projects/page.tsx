import type { Metadata } from "next";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects — Ligna",
  description: "Residential, hospitality, retail, and office projects furnished end to end by Ligna.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <Projects />
    </div>
  );
}
