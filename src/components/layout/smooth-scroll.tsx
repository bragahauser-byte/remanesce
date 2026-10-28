"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { useUI } from "@/lib/store/ui";

let instance: Lenis | null = null;

/** Instância ativa do Lenis (null com movimento reduzido). Páginas com GSAP ligam o ScrollTrigger nela. */
export function getLenis() {
  return instance;
}

export function SmoothScroll() {
  const reduced = useReducedMotion();
  // Em /colecao o scroll snap nativo conduz a página.
  const native = usePathname() === "/colecao";
  const panel = useUI((s) => s.panel);

  useEffect(() => {
    if (reduced || native) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.11, anchors: true });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, [reduced, native]);

  useEffect(() => {
    const root = document.documentElement;
    if (panel) {
      instance?.stop();
      root.style.overflow = "hidden";
    } else {
      instance?.start();
      root.style.overflow = "";
    }
  }, [panel]);

  return null;
}
