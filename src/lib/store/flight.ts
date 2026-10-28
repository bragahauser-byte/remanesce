import { create } from "zustand";

export type Box = { x: number; y: number; w: number; h: number };

export type Flight = {
  slug: string;
  src: string;
  from: Box;
};

type FlightState = {
  flight: Flight | null;
  target: Box | null;
  start: (flight: Flight) => void;
  land: (target: Box) => void;
  end: () => void;
};

/**
 * Transição card → página do look: a imagem do card "voa" até o lugar dela na
 * página nova. A galeria inicia o voo, a página nova informa o destino e a
 * FlightLayer faz a animação entre os dois retângulos.
 */
export const useFlight = create<FlightState>((set) => ({
  flight: null,
  target: null,
  start: (flight) => set({ flight, target: null }),
  land: (target) => set({ target }),
  end: () => set({ flight: null, target: null }),
}));

export const toBox = (r: DOMRect): Box => ({ x: r.left, y: r.top, w: r.width, h: r.height });
