import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderItem = {
  slug: string;
  code: string;
  name: string;
  size: string;
  qty: number;
  /** Preço unitário em centavos. */
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string };
  address: { cep: string; street: string; number: string; complement?: string; district: string; city: string; state: string };
  shipping: { id: string; label: string; days: string; price: number };
  payment: { method: "pix" | "card"; installments: number; brand?: string; last4?: string };
  coupon?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  /** Uma araucária por peça. */
  trees: number[];
  deliveryBy: string;
};

type OrdersState = {
  orders: Order[];
  /** Unidades vendidas por "slug:tamanho", para o estoque local. */
  sold: Record<string, number>;
  place: (order: Order) => void;
};

export const useOrders = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      sold: {},
      place: (order) =>
        set((s) => {
          const sold = { ...s.sold };
          for (const item of order.items) {
            const key = `${item.slug}:${item.size}`;
            sold[key] = (sold[key] ?? 0) + item.qty;
          }
          return { orders: [order, ...s.orders], sold };
        }),
    }),
    { name: "remanesce:pedidos", version: 1 },
  ),
);
