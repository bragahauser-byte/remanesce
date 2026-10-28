import { create } from "zustand";

type Panel = "menu" | null;

type UIState = {
  panel: Panel;
  open: (panel: Exclude<Panel, null>) => void;
  close: () => void;
  toggle: (panel: Exclude<Panel, null>) => void;
};

/** Painel global aberto (hoje só o menu de páginas). */
export const useUI = create<UIState>((set, get) => ({
  panel: null,
  open: (panel) => set({ panel }),
  close: () => set({ panel: null }),
  toggle: (panel) => set({ panel: get().panel === panel ? null : panel }),
}));
