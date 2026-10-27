"use client";

import { useEffect } from "react";

export const tones = {
  linho: { bg: "#F1EDE4", fg: "#161B27" },
  "linho-escuro": { bg: "#E4DDD0", fg: "#161B27" },
  denim: { bg: "#2B3445", fg: "#F1EDE4" },
  indigo: { bg: "#161B27", fg: "#F1EDE4" },
  araucaria: { bg: "#34402E", fg: "#F1EDE4" },
} as const;

export type Tone = keyof typeof tones;

/**
 * Fundo que muda de tom com o scroll: cada seção declara data-tone="…";
 * a que ocupa o centro da tela define --page-bg e --page-fg (transição suave no CSS).
 */
export function ToneController() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (!sections.length) return;
    const apply = (tone: Tone) => {
      root.style.setProperty("--page-bg", tones[tone].bg);
      root.style.setProperty("--page-fg", tones[tone].fg);
      root.dataset.tone = tone;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) apply(entry.target.getAttribute("data-tone") as Tone);
        }
      },
      // Linha imaginária no meio da tela.
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      root.style.removeProperty("--page-bg");
      root.style.removeProperty("--page-fg");
      delete root.dataset.tone;
    };
  }, []);
  return null;
}
