"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/icon";
import type { DetailedLine } from "@/lib/checkout";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useStock } from "@/lib/stock";
import { ProductImage } from "./product-image";

/** Linha da sacola: troca de tamanho, quantidade limitada pelo estoque, remover. */
export function CartLineItem({ line, compact = false }: { line: DetailedLine; compact?: boolean }) {
  const { product } = line;
  const stockOf = useStock();
  const setQty = useCart((s) => s.setQty);
  const setSize = useCart((s) => s.setSize);
  const remove = useCart((s) => s.remove);
  const max = stockOf(product, line.size);
  const single = product.sizes.length === 1;

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/loja/${product.slug}`}
        className={`relative shrink-0 overflow-hidden bg-linho-escuro/40 ${compact ? "h-28 w-21" : "h-36 w-27 md:h-44 md:w-33"}`}
      >
        <ProductImage image={product.images.details[0]} alt={product.name} sizes="140px" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label text-indigo/50">{product.code}</p>
            <Link href={`/loja/${product.slug}`} className={`serif mt-0.5 block leading-tight hover:text-casca ${compact ? "text-[1.1rem]" : "text-h4"}`}>
              {product.name}
            </Link>
          </div>
          <p className="label shrink-0 pt-0.5">{formatBRL(line.total)}</p>
        </div>

        <div className="mt-auto flex flex-wrap items-end gap-3 pt-3">
          {single ? (
            <span className="label text-indigo/60">Tamanho único</span>
          ) : (
            <label className="label flex items-center gap-2 text-indigo/60">
              Tam.
              <select
                value={line.size}
                onChange={(e) => setSize(product.slug, line.size, e.target.value)}
                className="h-9 border border-indigo/20 bg-transparent px-2 font-mono text-[12px] text-indigo"
              >
                {product.sizes.map((s) => {
                  const out = stockOf(product, s.label) === 0;
                  return (
                    <option key={s.label} value={s.label} disabled={out && s.label !== line.size}>
                      {s.label}
                      {out ? " (esgotado)" : ""}
                    </option>
                  );
                })}
              </select>
            </label>
          )}
          <div className="flex h-9 items-center border border-indigo/20" role="group" aria-label={`Quantidade de ${product.name}`}>
            <button
              type="button"
              onClick={() => setQty(product.slug, line.size, line.qty - 1, max)}
              className="grid h-full w-8 place-items-center hover:text-cobre"
              aria-label="Diminuir"
            >
              <Icon name="menos" size={16} />
            </button>
            <output className="w-5 text-center font-mono text-[12px]">{line.qty}</output>
            <button
              type="button"
              onClick={() => setQty(product.slug, line.size, line.qty + 1, max)}
              disabled={line.qty >= max}
              className="grid h-full w-8 place-items-center hover:text-cobre disabled:opacity-30"
              aria-label="Aumentar"
            >
              <Icon name="mais" size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => remove(product.slug, line.size)}
            className="label ml-auto text-indigo/55 underline-offset-4 hover:text-pinhao hover:underline"
          >
            Remover
          </button>
        </div>
        {line.qty > max && <p className="label mt-2 text-pinhao">Só restam {max} neste tamanho.</p>}
      </div>
    </li>
  );
}
