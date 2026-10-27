import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="container-x pb-10 pt-[calc(var(--spacing-header)+2.5rem)] md:pt-[calc(var(--spacing-header)+4rem)]">
      <CheckoutView />
    </div>
  );
}
