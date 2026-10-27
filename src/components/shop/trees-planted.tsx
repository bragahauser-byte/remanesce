"use client";

import { CountUp } from "@/components/ui/count-up";
import { raiz } from "@/data/copy";
import { useHydrated } from "@/lib/hooks";
import { useOrders } from "@/lib/store/orders";

/** Contador de araucárias: valor base (exemplo do projeto) + peças compradas neste navegador. */
export function TreesPlanted({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const sold = useOrders((s) => s.orders.reduce((n, o) => n + o.items.reduce((m, i) => m + i.qty, 0), 0));
  return <CountUp key={hydrated ? "c" : "s"} value={raiz.treesBase + (hydrated ? sold : 0)} className={className} />;
}
