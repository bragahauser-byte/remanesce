"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { ProductLink } from "@/components/shop/product-link";
import type { Look } from "@/data/looks";
import type { Product } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { useStock } from "@/lib/stock";

const pad = (n: number) => String(n).padStart(2, "0");
// Tamanho padrão do "Comprar o look"; calças usam o equivalente numérico.
const DEFAULT_SIZE: Record<string, string> = { calcas: "40" };

/** Um look em tela cheia: frente/costas, peças com preço e "Comprar o look". */
export function LookView({ look, pieces, total }: { look: Look; pieces: Product[]; total: number }) {
  const [side, setSide] = useState<"frente" | "costas">("frente");
  const add = useCart((s) => s.add);
  const open = useUI((s) => s.open);
  const stockOf = useStock();
  const [added, setAdded] = useState(false);

  function buyLook() {
    for (const p of pieces) {
      const preferred = p.sizes.length === 1 ? p.sizes[0].label : (DEFAULT_SIZE[p.category] ?? "M");
      const size = stockOf(p, preferred) > 0 ? preferred : p.sizes.find((s) => stockOf(p, s.label) > 0)?.label;
      if (size) add({ slug: p.slug, size, qty: 1 }, stockOf(p, size));
    }
    setAdded(true);
    open("bag");
  }

  return (
    <section
      id={`look-${pad(look.number)}`}
      aria-labelledby={`look-${look.number}-titulo`}
      className="relative grid min-h-[100svh] snap-start items-center pb-24 pt-[calc(var(--spacing-header)+1rem)] md:pb-10"
    >
      <div className="container-x grid gap-8 md:grid-cols-12 md:items-center">
        <div className="relative md:col-span-5 md:col-start-2">
          <div className="relative mx-auto h-[min(64svh,620px)] w-full max-w-[300px]">
            {(["frente", "costas"] as const).map((s) => (
              <Image
                key={s}
                src={s === "frente" ? look.front : look.back}
                alt={`Look ${look.name}, ${s === "frente" ? "frente" : "costas"}: ${look.description}`}
                fill
                sizes="300px"
                className={`object-contain transition-opacity duration-700 ease-remanesce ${side === s ? "opacity-100" : "opacity-0"}`}
                aria-hidden={side !== s}
              />
            ))}
          </div>
          <div role="group" aria-label="Lado" className="mt-4 flex justify-center gap-6">
            {(["frente", "costas"] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={side === s}
                onClick={() => setSide(s)}
                className="label relative pb-1 text-indigo/50 aria-pressed:text-indigo"
              >
                {s === "frente" ? "Frente" : "Costas"}
                {side === s && <span aria-hidden className="stitch-x absolute inset-x-0 bottom-0" />}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p className="label text-cobre">
            Look {pad(look.number)} / 06
          </p>
          <h2 id={`look-${look.number}-titulo`} className="serif mt-3 text-h1 text-casca">
            {look.name}
          </h2>
          <p className="serif mt-4 text-h4 italic">{look.line}</p>
          <ul className="mt-8 divide-y divide-dashed divide-cobre/40 border-y border-dashed border-cobre/40">
            {pieces.map((p) => (
              <li key={p.slug}>
                <ProductLink slug={p.slug} className="group flex items-baseline justify-between gap-4 py-3.5">
                  <span>
                    <span className="label block text-indigo/50">{p.code}</span>
                    <span className="serif text-[1.25rem] group-hover:text-casca">{p.name}</span>
                  </span>
                  <span className="label">{formatBRL(p.price)}</span>
                </ProductLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={buyLook}
            className="label-lg mt-8 flex h-14 w-full items-center justify-center gap-3 bg-indigo text-linho hover:bg-denim sm:w-auto sm:px-10"
          >
            Comprar o look · {formatBRL(total)} <Icon name="sacola" size={20} />
          </button>
          <p role="status" className="mt-3 min-h-5 text-small text-indigo/60">
            {added ? "Peças na sacola em tamanho M (calças 40). Ajuste os tamanhos na sacola." : "Adiciona as peças em M (calças 40); ajuste depois na sacola."}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Ativa o scroll snap na página enquanto ela estiver aberta. */
export function SnapPage() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.scrollSnapType = "y proximity";
    return () => {
      root.style.scrollSnapType = "";
    };
  }, []);
  return null;
}
