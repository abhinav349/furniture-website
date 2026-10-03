import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import type { FurnitureType } from "@/lib/types";

export const metadata: Metadata = {
  title: "Design Your Furniture — Ligna",
  description: "Configure a fully custom piece — live preview, live price, live delivery estimate.",
};

const validTypes: FurnitureType[] = ["sofa", "armchair", "dining-table", "bed", "cabinet"];

export default async function ConfiguratorPage(props: PageProps<"/configurator">) {
  const sp = await props.searchParams;
  const raw = sp.type;
  const typeParam = Array.isArray(raw) ? raw[0] : raw;
  const initialType = validTypes.includes(typeParam as FurnitureType)
    ? (typeParam as FurnitureType)
    : undefined;

  return (
    <div className="pb-28 pt-28 lg:pt-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">
            Design Your Furniture
          </p>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl">
            Build it to your exact room.
          </h1>
          <p className="mt-4 text-ink-soft">
            A fully custom piece, configured by you — live preview, live
            price, and a live delivery estimate as you build it.
          </p>
        </div>
        <div className="mt-12">
          <Configurator initialType={initialType} />
        </div>
      </div>
    </div>
  );
}
