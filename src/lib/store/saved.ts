import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedState = {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
};

/** Guardados (favoritos): "guardar como a gralha guarda a semente". */
export const useSaved = create<SavedState>()(
  persist(
    (set, get) => ({
      slugs: [],
      toggle: (slug) =>
        set((s) => ({ slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [slug, ...s.slugs] })),
      has: (slug) => get().slugs.includes(slug),
    }),
    { name: "remanesce:guardados", version: 1 },
  ),
);
