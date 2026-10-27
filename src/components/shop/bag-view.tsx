"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons/icon";
import { microcopy } from "@/data/copy";
import { totals, type ShippingOption } from "@/lib/checkout";
import { useHydrated } from "@/lib/hooks";
import { useCart } from "@/lib/store/cart";
import { CartLineItem } from "./cart-line";
import { OrderSummary } from "./order-summary";
import { ShippingEstimate } from "./shipping-estimate";
import { formatBRL } from "@/lib/format";

export function BagView() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const coupon = useCart((s) => s.coupon);
  const [shipping, setShipping] = useState<ShippingOption | null>(null);
  const t = totals(hydrated ? lines : [], coupon, shipping?.price ?? null);

  if (!hydrated) return <div className="min-h-[50vh]" aria-busy="true" />;

  if (t.detailed.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-start justify-center py-16">
        <p className="label text-cobre">Sacola</p>
        <h1 className="serif mt-4 text-h1 text-casca">{microcopy.emptyBag}</h1>
        <Link href="/loja" className="label-lg mt-10 flex h-13 items-center gap-3 bg-indigo px-8 text-linho hover:bg-denim">
          {microcopy.emptyBagCta} <Icon name="seta" size={22} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
      <div>
        <p className="label text-cobre">Sacola</p>
        <h1 className="serif mt-3 text-h1 text-casca">
          O que você <em>guardou</em>
        </h1>
        <ul className="mt-10 divide-y divide-dashed divide-cobre/40 border-y border-dashed border-cobre/40">
          {t.detailed.map((l) => (
            <CartLineItem key={`${l.slug}:${l.size}`} line={l} />
          ))}
        </ul>
        <div className="mt-10">
          <ShippingEstimate
            subtotal={t.subtotal}
            freeByCoupon={!!t.coupon?.freeShipping}
            selected={shipping?.id ?? null}
            onSelect={setShipping}
          />
        </div>
      </div>
      <aside className="lg:sticky lg:top-[calc(var(--spacing-header)+1.5rem)] lg:self-start">
        <OrderSummary t={t} shippingLabel={shipping ? (shipping.price === 0 ? "Grátis" : formatBRL(shipping.price)) : null} />
        <Link
          href="/checkout"
          className="label-lg mt-4 flex h-14 items-center justify-center gap-3 bg-indigo text-linho hover:bg-denim"
        >
          Finalizar compra <Icon name="seta" size={22} />
        </Link>
        <p className="label mt-4 flex items-center justify-center gap-2 text-indigo/55">
          <Icon name="cadeado" size={16} /> {microcopy.demo}
        </p>
      </aside>
    </div>
  );
}
