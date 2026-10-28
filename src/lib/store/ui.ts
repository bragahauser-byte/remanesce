import { create } from "zustand";

type Panel = "menu" | "search" | "bag" | "index" | null;

type UIState = {
  panel: Panel;
  open: (panel: Exclude<Panel, null>) => void;
  close: () => void;
  toggle: (panel: Exclude<Panel, null>) => void;
};

/** Painéis globais (menu, índice, busca, mini-sacola). Só um aberto por vez. */
export const useUI = create<UIState>((set, get) => ({
  panel: null,
  open: (panel) => set({ panel }),
  close: () => set({ panel: null }),
  toggle: (panel) => set({ panel: get().panel === panel ? null : panel }),
}));
