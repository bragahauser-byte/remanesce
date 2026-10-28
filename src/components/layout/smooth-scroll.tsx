"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks";

let instance: Lenis | null = null;

/** Instância ativa do Lenis (null com movimento reduzido ou no início). */
export function getLenis() {
  return instance;
}

export function SmoothScroll() {
  const reduced = useReducedMotion();
  // No início a página não rola na vertical: a galeria horizontal toma a roda do mouse.
  const home = usePathname() === "/";

  useEffect(() => {
    if (reduced || home) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    instance = lenis;
    return () => {
      lenis.destroy();
      instance = null;
    };
  }, [reduced, home]);

  return null;
}
