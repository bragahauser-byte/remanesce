"use client";

import { useSyncExternalStore } from "react";

export type Theme = "claro" | "terra";

export const THEME_KEY = "remanesce:tema";

/** Roda no <head> antes da pintura: aplica o tema salvo sem piscar. */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="terra")document.documentElement.dataset.theme="terra"}catch(e){}`;

const listeners = new Set<() => void>();

function read(): Theme {
  return document.documentElement.dataset.theme === "terra" ? "terra" : "claro";
}

export function setTheme(theme: Theme, animate = true) {
  const root = document.documentElement;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && !reduced) {
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 950);
  }
  if (theme === "terra") root.dataset.theme = "terra";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Sem armazenamento (aba anônima): o tema vale só nesta visita.
  }
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  meta?.setAttribute("content", theme === "terra" ? "#2c2922" : "#ffffff");
  listeners.forEach((l) => l());
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => "claro",
  );
}
