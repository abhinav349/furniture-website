"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Configurator } from "@/components/configurator/Configurator";

export function ConfiguratorSection() {
  return (
    <section id="configurator" className="bg-wood-100/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Design Your Furniture</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl lg:text-5xl">
            Build it to your exact room, in real time.
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Pick a form, a material, a finish — watch the price, dimensions,
            and delivery window update with every choice.
          </p>
        </Reveal>

        <div className="mt-12">
          <Configurator embedded />
        </div>
      </div>
    </section>
  );
}
