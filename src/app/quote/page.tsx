import type { Metadata } from "next";
import { SmartQuote } from "@/components/sections/SmartQuote";

export const metadata: Metadata = {
  title: "Get a Quote — Ligna",
  description: "Tell us what you're building and we'll generate a project brief for our team.",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function QuotePage(props: PageProps<"/quote">) {
  const sp = await props.searchParams;
  return (
    <div className="pt-20">
      <SmartQuote prefill={{ type: first(sp.type), furnitureType: first(sp.furnitureType) }} />
    </div>
  );
}
