"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { categories } from "@/data/products";
import { daySeed } from "@/lib/random";
import { listProducts, parseShopParams, shopHref, sortOptions, weightSpan } from "@/lib/shop";
import { EditorialPhrase, EditorialQuote, EditorialTexture } from "./editorial";
import { ProductCard } from "./product-card";
import { ProductImage } from "./product-image";
import { ProductLink } from "./product-link";

/** Grade da loja com filtros na URL (?cat=, ?ordem=, ?vista=). */
export function ShopResults() {
  const search = useSearchParams();
  const params = parseShopParams(Object.fromEntries(search.entries()));
  // Ordem embaralhada por dia: calculada no navegador (a grade é renderizada no cliente).
  const list = listProducts(params, daySeed());
  const editorial = params.view === "galeria" && !params.cat && params.sort === "destaque";

  return (
    <>
      <div className="sticky top-header z-30 border-y border-indigo/10 bg-linho/85 backdrop-blur-md">
        <div className="container-x flex items-center gap-6 overflow-x-auto py-3 [scrollbar-width:none]">
          <nav aria-label="Categorias" className="flex shrink-0 gap-5">
            <FilterLink href={shopHref(params, { cat: null })} active={!params.cat}>
              Tudo
            </FilterLink>
            {categories.map((c) => (
              <FilterLink key={c.key} href={shopHref(params, { cat: c.key })} active={params.cat === c.key}>
                {c.label}
              </FilterLink>
            ))}
          </nav>
          <span className="ml-auto h-4 w-px shrink-0 bg-indigo/15" />
          <nav aria-label="Ordenar" className="flex shrink-0 gap-5">
            {sortOptions.map((s) => (
              <FilterLink key={s.key} href={shopHref(params, { sort: s.key })} active={params.sort === s.key}>
                {s.label}
              </FilterLink>
            ))}
          </nav>
          <span className="h-4 w-px shrink-0 bg-indigo/15" />
          <nav aria-label="Visualização" className="flex shrink-0 gap-5">
            <FilterLink href={shopHref(params, { view: "galeria" })} active={params.view === "galeria"}>
              Galeria
            </FilterLink>
            <FilterLink href={shopHref(params, { view: "arquivo" })} active={params.view === "arquivo"}>
              Arquivo
            </FilterLink>
          </nav>
        </div>
      </div>

      <p className="container-x label pt-6 text-indigo/55" role="status">
        {list.length} {list.length === 1 ? "peça" : "peças"}
      </p>

      {list.length === 0 ? (
        <p className="container-x serif py-24 text-h3 text-casca">Nenhuma peça aqui por enquanto.</p>
      ) : params.view === "arquivo" ? (
        <ul className="container-x grid grid-cols-3 gap-x-3 gap-y-8 pt-6 sm:grid-cols-4 md:grid-cols-6 md:gap-x-5">
          {list.map((p) => (
            <li key={p.slug}>
              <ProductLink slug={p.slug} data-cursor="ver" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-linho-escuro/50">
                  <ProductImage image={p.images.details[0]} sizes="(min-width: 768px) 16vw, 33vw" />
                </div>
                <p className="label mt-2 text-[10px] group-hover:text-cobre md:text-[11px]">{p.code}</p>
                <span className="sr-only">{p.name}</span>
              </ProductLink>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="container-x grid grid-flow-dense grid-cols-2 items-start gap-x-3 gap-y-14 pt-6 md:grid-cols-12 md:gap-x-6 md:gap-y-20">
          {list.map((p, i) => (
            <Fragment key={p.slug}>
              <li className={`${weightSpan[p.weight]} ${p.weight < 3 ? "md:self-center" : ""}`}>
                <ProductCard
                  product={p}
                  mode={p.weight === 1 && i % 2 === 1 ? "detalhe" : "look"}
                  aspect={p.weight === 3 ? "aspect-[4/5]" : "aspect-[3/4]"}
                  sizes={p.weight === 3 ? "(min-width: 768px) 46vw, 92vw" : "(min-width: 768px) 30vw, 46vw"}
                  priority={i < 3}
                />
              </li>
              {editorial && i === 2 && <EditorialPhrase />}
              {editorial && i === 6 && <EditorialTexture />}
              {editorial && i === 9 && <EditorialQuote />}
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className="label relative whitespace-nowrap py-1.5 text-indigo/55 transition-colors hover:text-indigo aria-[current=true]:text-indigo"
    >
      {children}
      {active && <span aria-hidden className="stitch-x absolute inset-x-0 -bottom-0.5" />}
    </Link>
  );
}
