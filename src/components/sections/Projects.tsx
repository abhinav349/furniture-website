"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Photo } from "@/components/ui/Photo";
import { ProjectModal } from "@/components/project/ProjectModal";
import { projects, projectCategories } from "@/lib/data/projects";
import type { Project, ProjectCategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

const aspects = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[4/3]"];

export function Projects({ limit }: { limit?: number }) {
  const [active, setActive] = useState<ProjectCategoryId | "all">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const list = active === "all" ? projects : projects.filter((p) => p.category === active);
    return limit ? list.slice(0, limit) : list;
  }, [active, limit]);

  return (
    <section id="projects" className="bg-canvas py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-faint">Custom Projects</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl lg:text-5xl">
              Spaces we&apos;ve furnished, end to end.
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm transition-colors",
              active === "all" ? "bg-ink text-canvas" : "bg-wood-100 text-ink-soft hover:bg-wood-300/60"
            )}
          >
            All
          </button>
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                active === c ? "bg-ink text-canvas" : "bg-wood-100 text-ink-soft hover:bg-wood-300/60"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setSelected(project)}
              className={cn(
                "group relative mb-5 block w-full overflow-hidden rounded-2xl",
                aspects[i % aspects.length]
              )}
            >
              <Photo
                imageKey={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/0 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <p className="text-[11px] uppercase tracking-[0.15em] text-canvas/70">
                  {project.category} · {project.location}
                </p>
                <p className="mt-1 font-display text-lg text-canvas">{project.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
