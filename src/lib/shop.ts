import { categories, products, type Category, type Product } from "@/data/products";
import { shuffle } from "./random";

export type SortKey = "destaque" | "menor" | "maior";
export type View = "galeria" | "arquivo";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "destaque", label: "Destaque" },
  { key: "menor", label: "Menor preço" },
  { key: "maior", label: "Maior preço" },
];

type Raw = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseShopParams(raw: Raw) {
  const cat = first(raw.cat);
  const ordem = first(raw.ordem);
  const vista = first(raw.vista);
  return {
    cat: categories.some((c) => c.key === cat) ? (cat as Category) : null,
    sort: (sortOptions.some((s) => s.key === ordem) ? ordem : "destaque") as SortKey,
    view: (vista === "arquivo" ? "arquivo" : "galeria") as View,
  };
}

/** Href da loja preservando os outros parâmetros. */
export function shopHref(current: ReturnType<typeof parseShopParams>, patch: Partial<{ cat: Category | null; sort: SortKey; view: View }>) {
  const next = { ...current, ...patch };
  const qs = new URLSearchParams();
  if (next.cat) qs.set("cat", next.cat);
  if (next.sort !== "destaque") qs.set("ordem", next.sort);
  if (next.view !== "galeria") qs.set("vista", next.view);
  const s = qs.toString();
  return s ? `/loja?${s}` : "/loja";
}

/**
 * "Destaque": peças em destaque primeiro, com leve embaralhamento estável por dia,
 * para a loja parecer sempre fresca sem mudar entre servidor e cliente.
 */
export function listProducts(opts: ReturnType<typeof parseShopParams>, seed: number): Product[] {
  const list = opts.cat ? products.filter((p) => p.category === opts.cat) : products;
  if (opts.sort === "menor") return [...list].sort((a, b) => a.price - b.price);
  if (opts.sort === "maior") return [...list].sort((a, b) => b.price - a.price);
  const featured = shuffle(
    list.filter((p) => p.featured),
    seed,
  );
  const rest = shuffle(
    list.filter((p) => !p.featured),
    seed + 1,
  );
  // Intercala: 2 destaques, 1 comum, para a grade alternar tamanhos.
  const out: Product[] = [];
  while (featured.length || rest.length) {
    if (featured.length) out.push(featured.shift()!);
    if (rest.length) out.push(rest.shift()!);
    if (rest.length) out.push(rest.shift()!);
  }
  return out;
}

export const weightSpan: Record<Product["weight"], string> = {
  1: "col-span-1 md:col-span-3",
  2: "col-span-1 md:col-span-4",
  3: "col-span-2 md:col-span-6",
};
