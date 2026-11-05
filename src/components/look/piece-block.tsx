"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { categories, type Product } from "@/data/products";
import { formatPrice, installmentsLabel } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { useStock } from "@/lib/stock";
import { LookFigure, srcSetOf } from "./figure";

type Props = {
  piece: Product;
  index: number;
  side: "left" | "right";
};

/** Foto da peça sozinha (fundo branco, inteira) ou, sem ela, o recorte da foto do look. */
function PieceImage({ piece }: { piece: Product }) {
  const image = piece.images.details[0];
  if (image.kind === "peca") {
    return (
      <div data-reveal="image" className="relative aspect-square w-full overflow-hidden bg-[#fff]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={srcSetOf(image.src)}
          sizes="(min-width: 1025px) 45vw, 100vw"
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-[4%] h-[92%] w-[92%] object-contain"
        />
      </div>
    );
  }
  return (
    <LookFigure
      src={image.src}
      alt={image.alt}
      fit={piece.images.front.fit}
      focus={image.objectPosition}
      zoom={image.zoom}
      className="aspect-square w-full"
    />
  );
}

/**
 * Uma peça do look: imagem de um lado, texto do outro, alternando a cada peça.
 * Nome em PP Pangaia, preço, tamanhos e o botão "Adicionar à sacola".
 */
export function PieceBlock({ piece, index, side }: Props) {
  const stockOf = useStock();
  const add = useCart((s) => s.add);
  const lines = useCart((s) => s.lines);
  const single = piece.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? piece.sizes[0].label : null);
  const [status, setStatus] = useState<"idle" | "need-size" | "added" | "limit">("idle");
  // Confirmação discreta: o botão fica preenchido por um instante a cada peça guardada.
  const [flash, setFlash] = useState(0);
  const id = useId();

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(0), 1200);
    return () => window.clearTimeout(t);
  }, [flash]);

  const number = String(index + 1).padStart(2, "0");
  const singular = categories.find((c) => c.key === piece.category)?.singular ?? "";
  const soldOut = piece.sizes.every((s) => stockOf(piece, s.label) === 0);

  function onAdd() {
    if (!size) return setStatus("need-size");
    const available = stockOf(piece, size);
    const already = lines.find((l) => l.slug === piece.slug && l.size === size)?.qty ?? 0;
    if (available - already <= 0) return setStatus("limit");
    add({ slug: piece.slug, size, qty: 1 }, available);
    setStatus("added");
    setFlash((n) => n + 1);
  }

  const inBag = size ? (lines.find((l) => l.slug === piece.slug && l.size === size)?.qty ?? 0) : 0;

  // Telas PRODUTO SCROLL 2 e 3: imagem em 6 colunas de um lado, texto em 6 do outro,
  // com 2 colunas de respiro; cada peça ocupa uma tela e fica centrada nela.
  const imageCol = side === "left" ? "lg:col-start-1" : "lg:col-start-9";
  const textCol = side === "left" ? "lg:col-start-9" : "lg:col-start-1 lg:row-start-1";

  return (
    <section aria-labelledby={`${id}-nome`} className="grid-site items-center gap-y-8 py-16 lg:min-h-dvh lg:py-[var(--header-h)]">
      <figure className={`col-span-6 ${imageCol}`}>
        <PieceImage piece={piece} />
        <figcaption className="label mt-2 flex gap-8">
          <span>{number}.</span>
          <span>{piece.name}</span>
        </figcaption>
      </figure>

      <div data-reveal="up" className={`col-span-6 ${textCol}`}>
        <p className="label text-muted">
          Peça {number} · {singular}
        </p>
        <h2 id={`${id}-nome`} className="title-display mt-4">
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
                      className={`label grid h-11 min-w-11 place-items-center border px-2 transition-colors has-checked:border-fg has-checked:bg-fg has-checked:text-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg ${
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

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              type="button"
              onClick={onAdd}
              disabled={soldOut}
              aria-describedby={`${id}-status`}
              data-added={flash ? "" : undefined}
              className="btn-line w-full data-added:bg-fg data-added:text-bg sm:w-auto sm:min-w-64"
            >
              {soldOut ? "Esgotado" : "Adicionar à sacola"}
            </button>
            <p id={`${id}-status`} role="status" aria-live="polite" className="label text-muted">
              {status === "need-size" && "Escolha um tamanho."}
              {status === "limit" && "Você já tem todas as unidades deste tamanho."}
              {status === "added" && (
                <>
                  Guardado na sacola{inBag > 1 ? ` (${inBag} no tamanho ${size})` : ""} ·{" "}
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
