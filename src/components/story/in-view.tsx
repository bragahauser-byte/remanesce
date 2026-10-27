"use client";

import { useEffect, useRef, useState } from "react";

/**
 * true quando o elemento entra na tela (uma vez). Com movimento reduzido, já começa true.
 */
export function useInView<T extends HTMLElement | SVGElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || reduced) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}
