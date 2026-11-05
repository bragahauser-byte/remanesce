"use client";

import { useId, useState } from "react";
import { ProductLink } from "./product-link";
import type { DetailedLine } from "@/lib/checkout";
import { formatPrice, installmentsLabel } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useStock } from "@/lib/stock";
import { ProductImage } from "./product-image";

const action = "nav-text min-h-11 text-[0.875rem] underline decoration-1 underline-offset-[5px] transition-opacity hover:opacity-60 lg:min-h-8 lg:text-[clamp(0.875rem,0.88vw,1rem)]";

/**
 * Linha da sacola (tela SACOLA de novembro): a peça sobre branco nas colunas 1–3, nome,
 * descrição, "Editar" e "Remover", preço com parcelas; a quantidade num quadro no canto
 * direito. "Editar" abre os tamanhos ali mesmo.
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
    <li className="col-span-full grid grid-cols-subgrid gap-y-6 border-b border-[#fff]/50 py-6 lg:py-[clamp(24px,2.3vw,48px)]">
      <ProductLink
        slug={product.slug}
        tabIndex={-1}
        aria-hidden
        className="relative col-span-3 aspect-[356/430] w-full overflow-hidden bg-[#fff]"
      >
        <div className="absolute inset-[14%_12%]">
          <ProductImage image={thumb} alt="" sizes="(min-width: 1025px) 20vw, 45vw" />
        </div>
      </ProductLink>

      {/* Quantidade: no celular ao lado da foto, no desktop no canto direito da linha. */}
      <div className="col-span-3 justify-self-end lg:order-3 lg:col-span-2 lg:col-start-11">
        <label className="ui-lg relative flex h-[clamp(44px,3.2vw,56px)] items-center gap-3 border border-[#fff]/50 pl-3 pr-10 lg:pl-[0.7vw]">
          <span aria-hidden className="uppercase">Qtd: {line.qty}</span>
          <span className="sr-only">Quantidade de {product.name}</span>
          <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute right-3 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
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
      </div>

      <div className="col-span-6 flex min-w-0 flex-col lg:col-span-4 lg:col-start-4 lg:row-start-1">
        <ProductLink slug={product.slug} className="ui-lg block underline-offset-4 hover:underline">
          {product.name}
        </ProductLink>
        <p className="mt-1 text-12 uppercase tracking-[0.02em] text-[#fff]/50">
          {single ? "Tamanho único" : `Tamanho ${line.size}`} · {product.color.split(" · ")[0]}
        </p>

        <p className="mt-6 text-16 leading-[1.2] lg:text-[clamp(0.9375rem,0.97vw,1.125rem)]">{product.short}</p>
        <p className="mt-2 text-16 leading-[1.2] text-[#fff]/50 lg:text-[clamp(0.9375rem,0.97vw,1.125rem)]">{product.story}</p>

        <div className="mt-6 flex flex-wrap gap-x-8 lg:mt-8">
          {!single && (
            <button type="button" onClick={() => setEditing((v) => !v)} aria-expanded={editing} aria-controls={`${id}-tam`} className={action}>
              {editing ? "Pronto" : "Editar"}
            </button>
          )}
          <button type="button" onClick={() => remove(product.slug, line.size)} className={action}>
            Remover
          </button>
        </div>

        {editing && !single && (
          <fieldset id={`${id}-tam`} className="mt-4">
            <legend className="label text-[#fff]/50">Tamanho</legend>
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
                    className="label grid h-11 min-w-11 place-items-center border border-[#fff]/50 px-2 transition-colors hover:border-[#fff] disabled:line-through disabled:opacity-40 aria-pressed:bg-[#fff] aria-pressed:text-azul"
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}
        {line.qty > max && <p className="label mt-2 text-[#ffc2c2]">Só restam {max} neste tamanho.</p>}

        <p className="ui-lg mt-8 flex flex-wrap gap-x-6 tabular-nums lg:mt-10">
          <span>{formatPrice(line.total)}</span>
          <span className="text-[#fff]/50">{installmentsLabel(line.total)}</span>
        </p>
      </div>
    </li>
  );
}
