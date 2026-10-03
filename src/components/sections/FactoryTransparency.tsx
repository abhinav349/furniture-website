"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Building2, Cpu, Layers3, ShieldCheck, MapPinned, Truck } from "lucide-react";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { factoryCapabilities, factoryFlow } from "@/lib/data/stats";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  capacity: Building2,
  machines: Cpu,
  lines: Layers3,
  qc: ShieldCheck,
  sourcing: MapPinned,
  logistics: Truck,
};

export function FactoryTransparency() {
  return (
    <section className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Factory Transparency</p>
          <h2 className="mt-3 font-display text-4xl lg:text-5xl">
            Nothing about how we build is hidden.
          </h2>
          <p className="mt-4 text-ink-soft">
            One factory, six production lines, and a quality bar every piece
            has to clear before it ships — here&apos;s the operation behind it.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {factoryCapabilities.map((cap) => {
            const Icon = icons[cap.id];
            return (
              <motion.div
                key={cap.id}
                variants={staggerItem}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-paper p-7"
              >
                {Icon && <Icon className="h-5 w-5 text-wood-500" />}
                <AnimatedCounter
                  value={cap.value}
                  prefix={cap.prefix}
                  suffix={cap.suffix}
                  className="font-display text-3xl text-ink"
                />
                <p className="text-sm font-medium text-ink">{cap.title}</p>
                <p className="text-sm text-ink-faint">{cap.description}</p>
              </motion.div>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-20">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">The Production Flow</p>
          <div className="relative mt-10 pb-2">
            <div className="absolute inset-x-2 top-[7px] h-px bg-line" />
            <motion.div
              className="absolute top-[4px] h-[7px] w-[7px] rounded-full bg-wood-500"
              style={{ marginLeft: "-3.5px" }}
              animate={{ left: ["2%", "98%"] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative flex items-start justify-between gap-2">
              {factoryFlow.map((stage, i) => (
                <div key={stage.id} className="flex flex-col items-center gap-3 text-center">
                  <motion.span
                    className="h-3.5 w-3.5 rounded-full bg-ink"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (i / factoryFlow.length) * 7,
                    }}
                  />
                  <span className="max-w-20 text-xs text-ink-soft">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
