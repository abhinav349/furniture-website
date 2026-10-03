"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    // Reads a browser-only API (matchMedia) that isn't available during SSR,
    // so this can only be determined once mounted on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let raf = 0;

    function handleMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      const target = e.target as HTMLElement | null;
      setActive(!!target?.closest("[data-cursor]"));
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/40 transition-all duration-200 ${
          active ? "h-14 w-14 bg-ink/5" : "h-8 w-8"
        }`}
      />
    </>
  );
}
