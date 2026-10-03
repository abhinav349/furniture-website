"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/data/nav";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-line bg-canvas/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink" data-cursor>
          LIGNA
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
              data-cursor
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Magnetic>
            <Link
              href="/quote"
              data-cursor
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm text-canvas transition-colors hover:bg-wood-700"
            >
              Get a Quote <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Magnetic>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 text-ink lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3.5 text-lg text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quote"
                onClick={() => setOpen(false)}
                className="mt-5 mb-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm text-canvas"
              >
                Get a Quote <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
