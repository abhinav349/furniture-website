import type { Metadata } from "next";
import { Showroom } from "@/components/sections/Showroom";

export const metadata: Metadata = {
  title: "Collections — Ligna",
  description: "Browse every Ligna collection, from living room to hospitality contract pieces.",
};

export default function ShowroomPage() {
  return (
    <div className="pt-20">
      <Showroom />
    </div>
  );
}
