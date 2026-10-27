import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderView } from "@/components/checkout/order-view";

export const metadata: Metadata = { title: "Pedido recebido", robots: { index: false } };

export default function OrderPage() {
  return (
    <div className="container-x pt-[calc(var(--spacing-header)+3rem)] md:pt-[calc(var(--spacing-header)+5rem)]">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <OrderView />
      </Suspense>
    </div>
  );
}
