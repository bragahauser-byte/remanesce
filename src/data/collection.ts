/*
 * Fonte única da vitrine editorial: cada item da galeria do início é um look,
 * com as peças que ele reúne. Nomes, preços e textos vêm de
 * products.ts e looks.ts; aqui só se organiza a apresentação.
 */

import { formatPrice } from "@/lib/format";
import { looks } from "./looks";
import { products, type Product } from "./products";

export type Edit = {
  slug: string;
  number: number;
  /** Título em caixa baixa, como os cases da referência. */
  title: string;
  line: string;
  description: string;
  image: { front: string; back: string; alt: string; backAlt: string; fit: "cover" | "contain" };
  pieces: Product[];
  /** Lado da imagem do primeiro bloco de peça; os seguintes alternam. */
  startSide: "left" | "right";
};

export const edits: Edit[] = looks.map<Edit>((look, i) => ({
  slug: look.slug,
  number: look.number,
  title: look.name.toLowerCase(),
  line: look.line,
  description: look.description,
  image: {
    front: look.front,
    back: look.back,
    alt: `Look ${look.name}, de frente: ${look.description}`,
    backAlt: `Look ${look.name}, de costas`,
    fit: look.fit,
  },
  pieces: products.filter((p) => p.look === look.number),
  startSide: i % 2 === 0 ? "left" : "right",
}));

export const getEdit = (slug: string) => edits.find((e) => e.slug === slug);

export const nextEdit = (slug: string) => {
  const i = edits.findIndex((e) => e.slug === slug);
  return edits[(i + 1) % edits.length];
};

export const editHref = (slug: string) => `/looks/${slug}`;

/** Faixa de preço do look ("R$ 489 — R$ 689"). */
export function priceRange(edit: Edit) {
  const prices = edit.pieces.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatPrice(min) : `${formatPrice(min)} — ${formatPrice(max)}`;
}
