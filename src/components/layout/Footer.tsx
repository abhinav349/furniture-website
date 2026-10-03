import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerColumns, socialLinks } from "@/lib/data/nav";

export function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal text-canvas">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl">LIGNA</p>
            <p className="mt-4 max-w-xs text-sm text-canvas/60">
              Furniture designed and manufactured in-house — from factory
              floor to final placement, for homes and for businesses building
              at scale.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.18em] text-canvas/40">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-canvas/75 transition-colors hover:text-canvas"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-canvas/40">
              Connect
            </p>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-canvas/75 transition-colors hover:text-canvas"
                  >
                    {link.label} <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-canvas/10 pt-6 text-xs text-canvas/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ligna Furniture Co. All rights reserved.</p>
          <p>Designed &amp; manufactured in India.</p>
        </div>
      </div>
    </footer>
  );
}
