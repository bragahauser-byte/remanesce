import type { Metadata } from "next";
import { BagView } from "@/components/shop/bag-view";

export const metadata: Metadata = { title: "Sacola", robots: { index: false } };

export default function BagPage() {
  return (
    <div className="container-x pt-[calc(var(--spacing-header)+3rem)] md:pt-[calc(var(--spacing-header)+5rem)]">
      <BagView />
    </div>
  );
}
