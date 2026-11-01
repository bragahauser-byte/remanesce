"use client";

import { ProductLink } from "./product-link";
import { Icon } from "@/components/icons/icon";
import type { DetailedLine } from "@/lib/checkout";
import { formatBRL } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useStock } from "@/lib/stock";
import { ProductImage } from "./product-image";

/**
 * Linha da sacola (referência "image 4133"): miniatura, nome em PP Pangaia em caixa
 * alta, tamanho e cor em itálico, ações em rótulo; preço e quantidade à direita.
 * Troca de tamanho, quantidade limitada pelo estoque e remover.
 */
export function CartLineItem({ line }: { line: DetailedLine }) {
  const { product } = line;
  const stockOf = useStock();
  const setQty = useCart((s) => s.setQty);
  const setSize = useCart((s) => s.setSize);
  const remove = useCart((s) => s.remove);
  const max = stockOf(product, line.size);
  const single = product.sizes.length === 1;
  const thumb = product.images.details[0];

  return (
    <li className="flex gap-4 py-6 md:gap-6">
      <ProductLink
        slug={product.slug}
        tabIndex={-1}
        aria-hidden
        className={`relative aspect-[4/5] w-24 shrink-0 overflow-hidden md:w-28 ${thumb.kind === "peca" ? "bg-[#fff]" : "bg-panel"}`}
      >
        <ProductImage image={thumb} alt="" sizes="112px" />
      </ProductLink>

      <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="min-w-0">
          <ProductLink
            slug={product.slug}
            className="block font-display text-16 font-medium uppercase leading-tight tracking-[0.02em] underline-offset-4 hover:underline md:text-[1.125rem]"
          >
            {product.name}
          </ProductLink>
          <p className="mt-1 font-display text-16 font-extralight italic leading-tight md:text-[1.125rem]">
            {single ? "Tamanho único" : `Tamanho ${line.size}`}, {product.color.split(" · ")[0].toLowerCase()}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {!single && (
              <label className="label flex items-center gap-2">
                Tam.
                <select
                  value={line.size}
                  onChange={(e) => setSize(product.slug, line.size, e.target.value)}
                  className="h-10 border border-line bg-transparent px-2 text-12 text-fg [&>option]:text-[#111]"
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
            <div className="flex h-10 items-center border border-line" role="group" aria-label={`Quantidade de ${product.name}`}>
              <button
                type="button"
                onClick={() => setQty(product.slug, line.size, line.qty - 1, max)}
                className="grid h-full w-10 place-items-center transition-opacity hover:opacity-60"
                aria-label="Diminuir"
              >
                <Icon name="menos" size={16} />
              </button>
              <output className="w-6 text-center text-12 tabular-nums" aria-live="polite">
                {line.qty}
              </output>
              <button
                type="button"
                onClick={() => setQty(product.slug, line.size, line.qty + 1, max)}
                disabled={line.qty >= max}
                className="grid h-full w-10 place-items-center transition-opacity hover:opacity-60 disabled:opacity-30"
                aria-label="Aumentar"
              >
                <Icon name="mais" size={16} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => remove(product.slug, line.size)}
              className="label min-h-10 underline-offset-4 hover:underline"
            >
              Remover
            </button>
          </div>
          {line.qty > max && <p className="label mt-2 text-pinhao">Só restam {max} neste tamanho.</p>}
        </div>

        <div className="shrink-0 md:text-right">
          <p className="text-16 tabular-nums md:text-[1.125rem]">{formatBRL(line.total)}</p>
          <p className="font-display text-12 font-extralight italic text-soft">
            Qtd: {line.qty}
            {line.qty > 1 && ` · ${formatBRL(product.price)} cada`}
          </p>
        </div>
      </div>
    </li>
  );
}
