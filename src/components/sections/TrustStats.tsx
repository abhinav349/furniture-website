"use client";

import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { motion } from "framer-motion";
import { trustStats } from "@/lib/data/stats";

export function TrustStats() {
  return (
    <section className="border-y border-line bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Why Ligna</p>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl">
            Two decades of furniture people actually keep.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {trustStats.map((stat) => (
            <motion.div key={stat.id} variants={staggerItem}>
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-display text-3xl text-ink lg:text-4xl"
              />
              <p className="mt-2 text-sm text-ink-faint">{stat.label}</p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
