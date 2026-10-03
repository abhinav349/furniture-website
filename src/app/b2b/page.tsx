import type { Metadata } from "next";
import { B2B } from "@/components/sections/B2B";
import { SmartQuote } from "@/components/sections/SmartQuote";

export const metadata: Metadata = {
  title: "For Businesses — Ligna",
  description:
    "Bulk manufacturing, custom dimensions, private labelling, and pan-India delivery for hotels, offices, and developers.",
};

export default function B2BPage() {
  return (
    <div className="pt-20">
      <B2B />
      <SmartQuote prefill={{ type: "commercial" }} />
    </div>
  );
}
