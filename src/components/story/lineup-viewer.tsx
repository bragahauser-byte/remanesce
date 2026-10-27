"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductLink } from "@/components/shop/product-link";
import { looks } from "@/data/looks";
import { productsByLook } from "@/data/products";
import { asset } from "@/lib/paths";

// Centro horizontal de cada look na imagem do line-up (em %).
const centers = [13, 27.3, 41.6, 57, 73, 88.6];

/** Line-up completo, frente/costas, com cada look clicável para a peça principal. */
export function LineupViewer() {
  const [side, setSide] = useState<"frente" | "costas">("frente");
  return (
    <div>
      <div role="group" aria-label="Lado do line-up" className="flex gap-6">
        {(["frente", "costas"] as const).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={side === s}
            onClick={() => setSide(s)}
            className="label relative pb-1.5 text-indigo/50 aria-pressed:text-indigo"
          >
            {s === "frente" ? "Frente" : "Costas"}
            {side === s && <span aria-hidden className="stitch-x absolute inset-x-0 bottom-0" />}
          </button>
        ))}
      </div>
      <div className="relative mt-6 aspect-[16/7.8] w-full overflow-hidden bg-linho">
        {(["frente", "costas"] as const).map((s) => (
          <Image
            key={s}
            src={asset(`/images/lineup/lineup-${s}.jpg`)}
            alt={`Line-up da coleção O Renascer da Permanência, ${s}: seis looks em denim com escamas e detalhes em vermelho.`}
            fill
            sizes="(min-width: 1440px) 1400px, 100vw"
            className={`object-cover object-bottom transition-opacity duration-700 ${side === s ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {looks.map((look, i) => {
          const main = productsByLook(look.number)[look.number === 4 || look.number === 1 ? 1 : 0];
          return (
            <ProductLink
              key={look.number}
              slug={main.slug}
              data-cursor="ver"
              className="group absolute bottom-[6%] top-[4%] w-[12%] -translate-x-1/2"
              style={{ left: `${centers[i]}%` }}
              aria-label={`Look ${look.name}: ver ${main.name}`}
            >
              <span className="absolute inset-0 opacity-0 outline-1 outline-dashed outline-cobre transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="label absolute bottom-0 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-indigo px-2 py-1 text-[10px] text-linho opacity-0 transition-opacity group-hover:opacity-100 md:block">
                {look.name}
              </span>
            </ProductLink>
          );
        })}
      </div>
    </div>
  );
}
