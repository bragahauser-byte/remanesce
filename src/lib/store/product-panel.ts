import { create } from "zustand";
import { BASE_PATH } from "../paths";

type PanelState = {
  slug: string | null;
  /** Abre a PDP como painel sobre a página atual e muda a URL para /loja/[slug]. */
  open: (slug: string) => void;
  /** Troca a peça dentro do painel sem empilhar histórico. */
  swap: (slug: string) => void;
  /** Volta no histórico: o painel fecha quando a URL deixa de ser a da peça. */
  close: () => void;
  reset: () => void;
};

export const productHref = (slug: string) => `/loja/${slug}`;

export const useProductPanel = create<PanelState>((set, get) => ({
  slug: null,
  open: (slug) => {
    if (get().slug) return get().swap(slug);
    window.history.pushState(null, "", `${BASE_PATH}${productHref(slug)}`);
    set({ slug });
  },
  swap: (slug) => {
    window.history.replaceState(null, "", `${BASE_PATH}${productHref(slug)}`);
    set({ slug });
  },
  close: () => window.history.back(),
  reset: () => set({ slug: null }),
}));
