import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  slug: string;
  size: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  coupon: string | null;
  setCoupon: (code: string | null) => void;
  add: (line: CartLine, max?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number, max?: number) => void;
  setSize: (slug: string, from: string, to: string) => void;
  clear: () => void;
};

const same = (a: CartLine, slug: string, size: string) => a.slug === slug && a.size === size;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      coupon: null,
      setCoupon: (coupon) => set({ coupon }),
      add: (line, max = 99) =>
        set((s) => {
          const existing = s.lines.find((l) => same(l, line.slug, line.size));
          if (existing) {
            return {
              lines: s.lines.map((l) =>
                same(l, line.slug, line.size) ? { ...l, qty: Math.min(max, l.qty + line.qty) } : l,
              ),
            };
          }
          return { lines: [...s.lines, { ...line, qty: Math.min(max, line.qty) }] };
        }),
      remove: (slug, size) => set((s) => ({ lines: s.lines.filter((l) => !same(l, slug, size)) })),
      setQty: (slug, size, qty, max = 99) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => !same(l, slug, size))
              : s.lines.map((l) => (same(l, slug, size) ? { ...l, qty: Math.min(max, qty) } : l)),
        })),
      setSize: (slug, from, to) =>
        set((s) => {
          if (from === to) return s;
          const moving = s.lines.find((l) => same(l, slug, from));
          if (!moving) return s;
          const target = s.lines.find((l) => same(l, slug, to));
          const rest = s.lines.filter((l) => !same(l, slug, from));
          if (target) {
            return { lines: rest.map((l) => (same(l, slug, to) ? { ...l, qty: l.qty + moving.qty } : l)) };
          }
          return { lines: s.lines.map((l) => (same(l, slug, from) ? { ...l, size: to } : l)) };
        }),
      clear: () => set({ lines: [], coupon: null }),
    }),
    { name: "remanesce:sacola", version: 1 },
  ),
);

export const selectCount = (s: CartState) => s.lines.reduce((n, l) => n + l.qty, 0);
