"use client";

import { useId, useState } from "react";
import { ProductLink } from "./product-link";
import type { DetailedLine } from "@/lib/checkout";
import { formatPrice, installmentsLabel } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useStock } from "@/lib/stock";
import { ProductImage } from "./product-image";

const action = "label min-h-11 underline decoration-1 underline-offset-4 transition-opacity duration-300 ease-in-out hover:opacity-60 lg:min-h-0";

/**
 * Linha da sacola (tela SACOLA de novembro), em três níveis: nome (title) e detalhes
 * (rótulo), descrição (body) e história (small, secundária), ações em rótulo. À direita,
 * a quantidade no alto e o preço da linha no pé, alinhados à margem.
 */
export function CartLineItem({ line }: { line: DetailedLine }) {
  const { product } = line;
  const id = useId();
  const stockOf = useStock();
  const setQty = useCart((s) => s.setQty);
  const setSize = useCart((s) => s.setSize);
  const remove = useCart((s) => s.remove);
  const [editing, setEditing] = useState(false);
  const max = stockOf(product, line.size);
  const single = product.sizes.length === 1;
  const thumb = product.images.details[0];
  const options = Array.from({ length: Math.max(1, Math.min(max, 9)) }, (_, i) => i + 1);

  return (
    <li className="col-span-full grid grid-cols-subgrid gap-y-6 border-b border-inverse/40 py-8 lg:py-10">
      <ProductLink
        slug={product.slug}
        tabIndex={-1}
        aria-hidden
        className="relative col-span-2 aspect-[356/430] w-full self-start overflow-hidden bg-[#fff] lg:col-span-3"
      >
        <div className="absolute inset-[12%_10%]">
          <ProductImage image={thumb} alt="" sizes="(min-width: 1025px) 20vw, 30vw" />
        </div>
      </ProductLink>

      <div className="col-span-4 flex min-w-0 flex-col lg:col-span-5 lg:col-start-4">
        <ProductLink slug={product.slug} className="t-title block underline-offset-4 hover:underline">
          {product.name}
        </ProductLink>
        <p className="label mt-2 text-inverse-secondary">
          {single ? "Tamanho único" : `Tamanho ${line.size}`} · {product.color.split(" · ")[0]}
        </p>

        <p className="t-body mt-6 max-w-[34em]">{product.short}</p>
        <p className="t-small mt-2 hidden max-w-[40em] text-inverse-secondary md:block">{product.story}</p>

        <div className="mt-6 flex flex-wrap gap-x-8 lg:mt-8">
          {!single && (
            <button type="button" onClick={() => setEditing((v) => !v)} aria-expanded={editing} aria-controls={`${id}-tam`} className={action}>
              {editing ? "Pronto" : "Editar tamanho"}
            </button>
          )}
          <button type="button" onClick={() => remove(product.slug, line.size)} className={action}>
            Remover
          </button>
        </div>

        {editing && !single && (
          <fieldset id={`${id}-tam`} className="mt-4">
            <legend className="label text-inverse-secondary">Tamanho</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const out = stockOf(product, s.label) === 0 && s.label !== line.size;
                return (
                  <button
                    key={s.label}
                    type="button"
                    disabled={out}
                    aria-pressed={s.label === line.size}
                    onClick={() => setSize(product.slug, line.size, s.label)}
                    className="label grid h-11 min-w-11 place-items-center border border-inverse/40 px-2 transition-colors duration-300 hover:border-inverse disabled:line-through disabled:opacity-40 aria-pressed:bg-[#fff] aria-pressed:text-azul"
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
        {line.qty > max && <p className="label mt-2 text-[#ffc2c2]">Só restam {max} neste tamanho.</p>}
      </div>

      {/* Quantidade no alto e preço no pé, encostados na margem direita. */}
      <div className="col-span-4 col-start-3 flex items-end justify-between gap-6 lg:col-span-3 lg:col-start-10 lg:flex-col lg:items-end">
        <label className="t-body relative flex h-11 shrink-0 items-center whitespace-nowrap border border-inverse/40 pl-3 pr-10 uppercase">
          <span aria-hidden>Qtd: {line.qty}</span>
          <span className="sr-only">Quantidade de {product.name}</span>
          <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-3 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
          <select
            value={line.qty}
            onChange={(e) => setQty(product.slug, line.size, Number(e.target.value), max)}
            className="absolute inset-0 cursor-pointer opacity-0 [&>option]:text-[#111]"
          >
            {options.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <p className="text-right tabular-nums">
          <span className="t-title block">{formatPrice(line.total)}</span>
          <span className="t-small block text-inverse-secondary">
            {line.qty > 1 ? `${formatPrice(product.price)} cada · ` : ""}
            {installmentsLabel(line.total)}
          </span>
        </p>
      </div>
    </li>
  );
}
