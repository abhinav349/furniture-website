"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SplitText } from "@/components/ui/SplitText";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroScene } from "@/components/three/HeroScene";

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.4 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * -24);
    y.set(relY * -24);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-[100svh] w-full overflow-hidden bg-charcoal"
    >
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ x: springX, y: springY }}
      >
        <Photo
          imageKey="modernLivingHero"
          alt="A warm, minimal living room furnished with a premium sofa and natural wood furniture"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/55" />
      <HeroScene className="absolute inset-0 h-full w-full opacity-80 mix-blend-screen" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-6 pb-24 lg:px-10 lg:pb-28">
          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-canvas/70">
            Ligna — Furniture Manufacturers Since 1999
          </p>

          <h1 className="max-w-4xl font-display text-[13vw] leading-[0.98] text-canvas sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <SplitText text="Crafted for Spaces" />
            <SplitText text="That Matter." delay={0.12} />
          </h1>

          <p className="mt-7 max-w-md text-base text-canvas/80 sm:text-lg">
            From our factory floor to your living room, we design and
            manufacture furniture built around the way you live and work.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                href="/showroom"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full bg-canvas px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-wood-300"
              >
                Explore Collection <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/configurator"
                data-cursor
                className="inline-flex items-center gap-2 rounded-full border border-canvas/40 px-6 py-3.5 text-sm font-medium text-canvas transition-colors hover:bg-canvas/10"
              >
                Build Your Furniture <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/b2b"
                data-cursor
                className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-canvas/80 underline-offset-4 transition-colors hover:text-canvas hover:underline"
              >
                For Businesses <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-canvas/70"
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
