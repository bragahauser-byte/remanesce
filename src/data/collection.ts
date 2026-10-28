/*
 * Fonte única da vitrine editorial: cada item da galeria do início é um look
 * (ou o acessório), com as peças que ele reúne. Nomes, preços e textos vêm de
 * products.ts e looks.ts; aqui só se organiza a apresentação.
 */

import { formatPrice } from "@/lib/format";
import { asset } from "@/lib/paths";
import { looks } from "./looks";
import { products, type Product } from "./products";

export type Edit = {
  slug: string;
  number: number;
  /** Título em caixa baixa, como os cases da referência. */
  title: string;
  line: string;
  description: string;
  image: { front: string; back: string; alt: string; backAlt: string; width: number; height: number };
  pieces: Product[];
  /** Lado da imagem do primeiro bloco de peça; os seguintes alternam. */
  startSide: "left" | "right";
};

const lenco = products.find((p) => p.slug === "lenco-escama")!;

export const edits: Edit[] = [
  ...looks.map<Edit>((look, i) => ({
    slug: look.slug,
    number: look.number,
    title: look.name.toLowerCase(),
    line: look.line,
    description: look.description,
    image: {
      front: look.cutout.front,
      back: look.cutout.back,
      alt: `Look ${look.name}, de frente: ${look.description}`,
      backAlt: `Look ${look.name}, de costas`,
      width: look.size.width,
      height: look.size.height,
    },
    pieces: products.filter((p) => p.look === look.number),
    startSide: i % 2 === 0 ? "left" : "right",
  })),
  {
    slug: "lenco-escama",
    number: 7,
    title: "lenço escama",
    line: "Nenhum retalho se perde.",
    description: lenco.short,
    image: {
      front: asset("/images/produtos/lenco-escama-frente.svg"),
      back: asset("/images/produtos/lenco-escama-dobrado.svg"),
      alt: lenco.images.front.alt,
      backAlt: lenco.images.back.alt,
      width: 600,
      height: 800,
    },
    pieces: [lenco],
    startSide: "right",
  },
];

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
