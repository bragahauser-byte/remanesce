import type { Metadata } from "next";
import { LookView, SnapPage } from "@/components/story/look-view";
import { looks } from "@/data/looks";
import { productsByLook } from "@/data/products";

export const metadata: Metadata = {
  title: "Looks",
  description: "Os seis looks da coleção O Renascer da Permanência, de frente e de costas, com as peças de cada um.",
};

export default function LooksPage() {
  return (
    <>
      <SnapPage />
      <h1 className="sr-only">Os seis looks</h1>
      {looks.map((look) => {
        const pieces = productsByLook(look.number);
        return <LookView key={look.number} look={look} pieces={pieces} total={pieces.reduce((n, p) => n + p.price, 0)} />;
      })}
    </>
  );
}
