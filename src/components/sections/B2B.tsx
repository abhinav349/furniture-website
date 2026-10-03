"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import {
  Boxes,
  RulerDimensionLine,
  Sparkles,
  SlidersHorizontal,
  DraftingCompass,
  Leaf,
  Layers3,
  Truck,
  ArrowUpRight,
} from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { motion } from "framer-motion";
import { b2bAudiences, b2bCapabilities } from "@/lib/data/b2b";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  bulk: Boxes,
  "custom-dimensions": RulerDimensionLine,
  "private-labeling": Sparkles,
  "project-pricing": SlidersHorizontal,
  "cad-support": DraftingCompass,
  sourcing: Leaf,
  "large-volume": Layers3,
  "pan-india": Truck,
};

export function B2B() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-canvas lg:py-32">
      <div className="absolute inset-0 opacity-30">
        <Photo
          imageKey="officeLounge"
          alt="A contract-furnished commercial lounge space"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-canvas/50">For Businesses</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl lg:text-5xl">
              Furniture at the Scale of Your Vision.
            </h2>
          </div>
          <Magnetic>
            <Link
              href="/quote?type=commercial"
              className="inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3.5 text-sm font-medium text-ink"
            >
              Start a B2B Project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Magnetic>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {b2bAudiences.map((a) => (
            <span
              key={a}
              className="rounded-full border border-canvas/20 px-4 py-1.5 text-xs text-canvas/70"
            >
              {a}
            </span>
          ))}
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-canvas/10 sm:grid-cols-2 lg:grid-cols-4">
          {b2bCapabilities.map((cap) => {
            const Icon = icons[cap.id];
            return (
              <motion.div
                key={cap.id}
                variants={staggerItem}
                className="flex flex-col gap-3 bg-charcoal p-6"
              >
                {Icon && <Icon className="h-5 w-5 text-wood-300" />}
                <p className="font-display text-lg text-canvas">{cap.title}</p>
                <p className="text-sm text-canvas/60">{cap.description}</p>
              </motion.div>
            );
          })}
        </RevealGroup>

        <div className="mt-10">
          <Link
            href="/b2b"
            className="inline-flex items-center gap-1.5 text-sm text-canvas/70 hover:text-canvas"
          >
            More on B2B &amp; contract supply <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
