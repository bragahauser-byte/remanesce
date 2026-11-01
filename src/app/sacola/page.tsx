import type { Metadata } from "next";
import { BagView } from "@/components/shop/bag-view";

export const metadata: Metadata = { title: "Sacola", robots: { index: false } };

export default function BagPage() {
  return <BagView />;
}
