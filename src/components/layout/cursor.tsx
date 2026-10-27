"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

type Mode = "default" | "link" | "ver" | "lenda";

/**
 * Cursor da marca (só ponteiro fino): círculo fino; sobre produto vira losango com "VER";
 * sobre link da lenda vira um pinhão. Elementos declaram o modo com data-cursor="ver|lenda".
 */
export function Cursor() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;
  const dot = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const el = (e.target as Element | null)?.closest?.("[data-cursor], a, button, [role='button'], label, summary");
      const declared = el?.getAttribute("data-cursor") as Mode | null;
      setMode(declared ?? (el ? "link" : "default"));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="no-print pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms" }}
    >
      <div
        data-mode={mode}
        className="group/cursor relative -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-remanesce"
      >
        {/* círculo */}
        <span className="block size-3.5 rounded-full border border-linho transition-all duration-500 ease-remanesce group-data-[mode=link]/cursor:size-10 group-data-[mode=lenda]/cursor:scale-0 group-data-[mode=ver]/cursor:scale-0" />
        {/* losango VER */}
        <span className="absolute left-1/2 top-1/2 grid h-[72px] w-12 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center transition-transform duration-500 ease-remanesce group-data-[mode=ver]/cursor:scale-100">
          <svg viewBox="0 0 48 72" className="absolute inset-0 h-full w-full">
            <path d="M24 1 47 36 24 71 1 36z" fill="none" stroke="var(--linho)" strokeWidth="1" />
          </svg>
          <span className="font-mono text-[10px] tracking-[0.12em] text-linho">VER</span>
        </span>
        {/* pinhão */}
        <svg
          viewBox="0 0 24 24"
          className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 scale-0 transition-transform duration-500 ease-remanesce group-data-[mode=lenda]/cursor:scale-100"
        >
          <path
            d="M12 2.8c2.7 2.9 4 6.4 3.8 10.4-.2 3.7-1.7 6.6-3.8 8-2.1-1.4-3.6-4.3-3.8-8C8 9.2 9.3 5.7 12 2.8z"
            fill="none"
            stroke="var(--linho)"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </div>
  );
}
