import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopResults } from "@/components/shop/shop-results";
import { brand } from "@/data/copy";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Loja",
  description: "Peças em denim da coleção O Renascer da Permanência: tops, saias, calças, vestidos e jaquetas com escamas e vermelho por dentro.",
};

export default function ShopPage() {
  return (
    <div className="pt-header">
      <header className="container-x pb-10 pt-14 md:pb-14 md:pt-24">
        <p className="label text-cobre">{brand.collectionLabel}</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h1 className="serif text-h1 text-casca">
            A <em>loja</em>
          </h1>
          <p className="max-w-sm text-small text-indigo/70">
            Vague pela coleção como numa galeria. Cada peça é denim; cada escama, uma memória.
          </p>
        </div>
      </header>
      <Suspense fallback={<GridFallback />}>
        <ShopResults />
      </Suspense>
    </div>
  );
}

function GridFallback() {
  return (
    <div className="container-x grid grid-cols-2 gap-6 pt-20 md:grid-cols-4" aria-hidden>
      {products.slice(0, 8).map((p) => (
        <div key={p.slug} className="aspect-[3/4] animate-pulse bg-linho-escuro/60" />
      ))}
    </div>
  );
}
