"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, CalendarDays, Layers } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { Project } from "@/lib/types";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl bg-paper lg:grid-cols-[1.3fr_1fr]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-canvas/90 p-2 text-ink"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Photo
                imageKey={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-faint">{project.category}</p>
              <h3 className="mt-2 font-display text-2xl text-ink">{project.title}</h3>
              <div className="mt-4 flex flex-col gap-2 text-sm text-ink-soft">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {project.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> {project.year}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers className="h-4 w-4" /> {project.pieces} pieces delivered
                </span>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">{project.description}</p>
              <p className="mt-auto pt-6 text-xs uppercase tracking-[0.15em] text-ink-faint">
                Scope — {project.scope}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
