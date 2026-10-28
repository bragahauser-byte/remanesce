"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { categories, type Product } from "@/data/products";
import { formatPrice, installmentsLabel } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useStock } from "@/lib/stock";
import { LookFigure } from "./figure";

type Props = {
  piece: Product;
  index: number;
  side: "left" | "right";
  src: string;
  alt: string;
};

/**
 * Uma peça do look: imagem de um lado, texto do outro, alternando a cada peça.
 * Nome e preço entram na composição sem painel de compra: tamanhos em texto e
 * um link para guardar na sacola.
 */
export function PieceBlock({ piece, index, side, src, alt }: Props) {
  const stockOf = useStock();
  const add = useCart((s) => s.add);
  const lines = useCart((s) => s.lines);
  const single = piece.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? piece.sizes[0].label : null);
  const [status, setStatus] = useState<"idle" | "need-size" | "added" | "limit">("idle");
  const id = useId();

  const number = String(index + 1).padStart(2, "0");
  const singular = categories.find((c) => c.key === piece.category)?.singular ?? "";
  const detail = piece.images.details[0];
  const soldOut = piece.sizes.every((s) => stockOf(piece, s.label) === 0);

  function onAdd() {
    if (!size) return setStatus("need-size");
    const available = stockOf(piece, size);
    const already = lines.find((l) => l.slug === piece.slug && l.size === size)?.qty ?? 0;
    if (available - already <= 0) return setStatus("limit");
    add({ slug: piece.slug, size, qty: 1 }, available);
    setStatus("added");
  }

  const imageCol = side === "left" ? "lg:col-start-1" : "lg:col-start-9";
  const textCol = side === "left" ? "lg:col-start-9" : "lg:col-start-2 lg:row-start-1";

  return (
    <section aria-labelledby={`${id}-nome`} className="grid-site mt-24 items-end gap-y-8 lg:mt-40">
      <figure className={`col-span-6 ${imageCol}`}>
        <LookFigure src={src} alt={alt} focus={detail?.objectPosition} zoom={Math.min(detail?.zoom ?? 1, 1.3)} className="aspect-[4/5] w-full" />
        <figcaption className="label mt-2 flex gap-8">
          <span>{number}.</span>
          <span>{piece.name}</span>
        </figcaption>
      </figure>

      <div className={`col-span-6 lg:col-span-5 ${textCol}`}>
        <p className="label text-muted">
          Peça {number} · {singular}
        </p>
        <h2 id={`${id}-nome`} className="mt-4 text-32 font-light tracking-[-0.03em] lg:text-48">
          {piece.name}
        </h2>
        <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-16 font-semibold tabular-nums">{formatPrice(piece.price)}</span>
          <span className="label text-muted">{installmentsLabel(piece.price)}</span>
        </p>

        <p className="lead mt-8 max-w-[40ch]">{piece.short}</p>
        <p className="mt-4 max-w-[52ch] text-16 text-soft">{piece.story}</p>

        <dl className="mt-8 grid grid-cols-[96px_1fr] gap-x-4 gap-y-2 border-t border-line pt-4">
          <dt className="label text-muted">Cor</dt>
          <dd className="text-12 leading-4">{piece.color}</dd>
          <dt className="label text-muted">Material</dt>
          <dd className="text-12 leading-4">{piece.composition}</dd>
          <dt className="label text-muted">Código</dt>
          <dd className="text-12 leading-4 tabular-nums">{piece.code}</dd>
        </dl>

        <div className="mt-8 border-t border-line pt-4">
          {!single && (
            <fieldset>
              <legend className="label text-muted">Tamanho{size ? `: ${size}` : ""}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {piece.sizes.map((s) => {
                  const out = stockOf(piece, s.label) === 0;
                  return (
                    <label
                      key={s.label}
                      className={`label grid h-10 min-w-10 place-items-center border px-2 transition-colors has-checked:border-fg has-checked:bg-fg has-checked:text-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg ${
                        out ? "cursor-not-allowed border-line text-muted line-through" : "cursor-pointer border-line hover:border-fg"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${id}-tamanho`}
                        value={s.label}
                        checked={size === s.label}
                        disabled={out}
                        onChange={() => {
                          setSize(s.label);
                          setStatus("idle");
                        }}
                        className="sr-only"
                      />
                      {s.label}
                      {out && <span className="sr-only"> (esgotado)</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <button type="button" onClick={onAdd} disabled={soldOut} className="label-lg link-stitch disabled:opacity-40">
              {soldOut ? "Esgotado" : "Adicionar à sacola"}
            </button>
            <p role="status" className="label text-muted">
              {status === "need-size" && "Escolha um tamanho."}
              {status === "limit" && "Você já tem todas as unidades deste tamanho."}
              {status === "added" && (
                <>
                  Guardado na sacola ·{" "}
                  <Link href="/sacola" className="text-fg underline underline-offset-4">
                    ver sacola
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
