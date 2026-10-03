"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { Photo } from "@/components/ui/Photo";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { processStages } from "@/lib/data/process";
import { cn } from "@/lib/utils";

export function FactoryStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const total = processStages.length;
    let lastIndex = 0;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: panel,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const continuous = self.progress * (total - 1);
        imageRefs.current.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(continuous - i);
          el.style.opacity = String(Math.max(0, 1 - dist));
        });
        if (barRef.current) {
          barRef.current.style.height = `${self.progress * 100}%`;
        }
        const index = Math.min(total - 1, Math.round(continuous));
        if (index !== lastIndex) {
          lastIndex = index;
          setActiveIndex(index);
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const stage = processStages[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal text-canvas"
      style={{ height: `${processStages.length * 100}vh` }}
    >
      <div ref={panelRef} className="relative h-screen w-full overflow-hidden">
        {processStages.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Photo
              imageKey={s.image}
              alt={s.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-10 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-canvas/60">
              The Making Of — Stage {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(processStages.length).padStart(2, "0")}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl">
                  {stage.title}
                </h3>
                <p className="mt-5 max-w-md text-canvas/80">{stage.description}</p>
                {stage.stat && (
                  <div className="mt-8">
                    <AnimatedCounter
                      value={stage.stat.value}
                      suffix={stage.stat.suffix}
                      className="font-display text-5xl text-wood-300"
                    />
                    <p className="mt-1 text-sm uppercase tracking-[0.15em] text-canvas/60">
                      {stage.stat.label}
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-stretch gap-6">
            <div className="relative w-px self-stretch bg-canvas/20">
              <div
                ref={barRef}
                className="absolute left-0 top-0 w-px bg-wood-300"
                style={{ height: "0%" }}
              />
            </div>
            <ol className="flex flex-col justify-between gap-3">
              {processStages.map((s, i) => (
                <li
                  key={s.id}
                  className={cn(
                    "text-xs uppercase tracking-[0.15em] transition-colors duration-300",
                    i === activeIndex ? "text-canvas" : "text-canvas/40"
                  )}
                >
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
