"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/icon";
import { microcopy } from "@/data/copy";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { useStock } from "@/lib/stock";
import { flyToBag } from "./fly-to-bag";
import { SaveButton } from "./save-button";
import { SizeGuide } from "./size-guide";

/** Seletor de tamanho, quantidade, "Adicionar à sacola" e guardar. */
export function BuyBox({ product }: { product: Product }) {
  const stockOf = useStock();
  const add = useCart((s) => s.add);
  const inCart = useCart((s) => s.lines);
  const openPanel = useUI((s) => s.open);
  const single = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? product.sizes[0].label : null);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<"idle" | "need-size" | "added" | "limit">("idle");

  const numeric = product.category === "calcas";
  const available = size ? stockOf(product, size) : 0;
  const already = size ? (inCart.find((l) => l.slug === product.slug && l.size === size)?.qty ?? 0) : 0;
  const room = Math.max(0, available - already);
  const soldOut = product.sizes.every((s) => stockOf(product, s.label) === 0);

  async function onAdd(e: React.MouseEvent<HTMLButtonElement>) {
    if (!size) {
      setStatus("need-size");
      return;
    }
    if (room <= 0) {
      setStatus("limit");
      return;
    }
    const amount = Math.min(qty, room);
    add({ slug: product.slug, size, qty: amount }, available);
    setStatus("added");
    setQty(1);
    await flyToBag(e.currentTarget);
    openPanel("bag");
  }

  return (
    <div>
      {!single && (
        <fieldset>
          <div className="flex items-baseline justify-between">
            <legend className="label text-indigo/70">
              Tamanho{size ? `: ${size}` : ""}
            </legend>
            <SizeGuide numeric={numeric} />
          </div>
          <div className={`mt-3 grid gap-2 ${numeric ? "grid-cols-4 sm:grid-cols-7" : "grid-cols-5"}`}>
            {product.sizes.map((s) => {
              const left = stockOf(product, s.label);
              const out = left === 0;
              return (
                <label
                  key={s.label}
                  className={`relative grid h-11 cursor-pointer place-items-center border text-small transition-colors has-checked:border-indigo has-checked:bg-indigo has-checked:text-linho has-focus-visible:outline has-focus-visible:outline-dashed has-focus-visible:outline-cobre ${
                    out ? "cursor-not-allowed border-indigo/10 text-indigo/35" : "border-indigo/25 hover:border-indigo"
                  }`}
                >
                  <input
                    type="radio"
                    name={`tamanho-${product.slug}`}
                    value={s.label}
                    checked={size === s.label}
                    disabled={out}
                    onChange={() => {
                      setSize(s.label);
                      setStatus("idle");
                    }}
                    className="sr-only"
                  />
                  <span className={out ? "line-through" : ""}>{s.label}</span>
                  <span className="sr-only">{out ? " (esgotado)" : left <= 2 ? ` (últimas ${left})` : ""}</span>
                  {!out && left <= 2 && <span aria-hidden className="absolute right-1 top-1 size-1 rounded-full bg-pinhao" />}
                </label>
              );
            })}
          </div>
          {size && available > 0 && available <= 2 && (
            <p className="label mt-2 text-pinhao">
              {available === 1 ? "Última unidade" : `Últimas ${available} unidades`} neste tamanho
            </p>
          )}
        </fieldset>
      )}

      <div className="mt-6 flex gap-3">
        <div className="flex h-14 items-center border border-indigo/25" role="group" aria-label="Quantidade">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-full w-11 place-items-center hover:text-cobre disabled:opacity-30"
            disabled={qty <= 1}
            aria-label="Diminuir quantidade"
          >
            <Icon name="menos" size={18} />
          </button>
          <output className="w-6 text-center font-mono text-small" aria-live="polite">
            {qty}
          </output>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(Math.max(1, room || 1), q + 1))}
            className="grid h-full w-11 place-items-center hover:text-cobre disabled:opacity-30"
            disabled={!!size && qty >= room}
            aria-label="Aumentar quantidade"
          >
            <Icon name="mais" size={18} />
          </button>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={soldOut}
          className="label-lg group relative flex h-14 flex-1 items-center justify-center gap-3 overflow-hidden bg-indigo text-linho transition-colors hover:bg-denim disabled:bg-indigo/30"
        >
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-0 bg-pinhao transition-[height] duration-500 ease-remanesce group-hover:h-1" />
          {soldOut ? "Esgotado" : "Adicionar à sacola"}
          {!soldOut && <Icon name="sacola" size={20} />}
        </button>
      </div>

      <p role="status" className="label mt-3 min-h-5">
        {status === "need-size" && <span className="text-pinhao">Escolha um tamanho, por favor.</span>}
        {status === "limit" && <span className="text-pinhao">Você já tem todas as unidades deste tamanho na sacola.</span>}
        {status === "added" && (
          <span className="flex items-center gap-2 text-araucaria">
            <Icon name="check" size={16} /> {microcopy.added}
          </span>
        )}
      </p>

      <SaveButton slug={product.slug} name={product.name} withLabel className="mt-2 py-2" />
    </div>
  );
}
