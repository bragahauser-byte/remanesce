"use client";

import { getProduct, type Product } from "@/data/products";
import { useHydrated } from "./hooks";
import { useOrders } from "./store/orders";

/** Estoque disponível por tamanho: estoque do catálogo menos o vendido neste navegador. */
export function useStock() {
  const hydrated = useHydrated();
  const sold = useOrders((s) => s.sold);
  return (product: Product | string, size: string) => {
    const p = typeof product === "string" ? getProduct(product) : product;
    const base = p?.sizes.find((s) => s.label === size)?.stock ?? 0;
    return Math.max(0, base - (hydrated ? (sold[`${p?.slug}:${size}`] ?? 0) : 0));
  };
}
