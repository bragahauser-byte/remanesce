"use client";

import { usePathname } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { getLook } from "@/data/looks";
import { categoryLabel, products } from "@/data/products";
import { useFocusTrap } from "@/lib/focus-trap";
import { formatBRL, normalize } from "@/lib/format";
import { useUI } from "@/lib/store/ui";
import { ProductImage } from "./product-image";
import { ProductLink } from "./product-link";

const index = products.map((p) => {
  const look = p.look ? getLook(p.look) : undefined;
  return {
    product: p,
    haystack: normalize(
      [p.name, p.code, categoryLabel(p.category), look ? `look ${look.number} ${look.name}` : "", p.color, p.short, p.tags.join(" ")].join(" "),
    ),
  };
});

const suggestions = ["Saia", "Vermelho", "Escamas", "Guacira", "Calça", "Losango"];

/** Busca em tela cheia: resultados instantâneos por nome, categoria, look e cor. */
export function SearchOverlay() {
  const open = useUI((s) => s.panel === "search");
  const close = useUI((s) => s.close);
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const onEscape = useCallback(() => close(), [close]);
  useFocusTrap(ref, open, onEscape);

  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname && open) close();
    lastPath.current = pathname;
  }, [pathname, open, close]);

  const results = useMemo(() => {
    const terms = normalize(deferred).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.filter((i) => terms.every((t) => i.haystack.includes(t))).map((i) => i.product);
  }, [deferred]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Buscar na loja"
      inert={!open}
      data-open={open || undefined}
      className="no-print fixed inset-0 z-[65] flex flex-col bg-linho/97 opacity-0 backdrop-blur-xl transition-opacity duration-500 ease-remanesce data-open:opacity-100"
    >
      <div className="container-x flex h-header shrink-0 items-center justify-end">
        <button type="button" onClick={close} className="label -mr-2 flex items-center gap-2 p-2 hover:text-cobre">
          Fechar <Icon name="fechar" />
        </button>
      </div>
      <div className="container-x flex-1 overflow-y-auto pb-24" data-lenis-prevent>
        <label htmlFor="busca" className="label text-cobre">
          Buscar
        </label>
        <div className="mt-3 flex items-center gap-4 border-b border-indigo/30 pb-3 focus-within:border-indigo">
          <Icon name="busca" size={28} className="shrink-0 text-indigo/50" />
          <input
            id="busca"
            data-autofocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Peça, look, cor…"
            autoComplete="off"
            className="serif min-w-0 flex-1 bg-transparent text-h2 placeholder:text-indigo/25 focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
          />
        </div>

        {!query && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="label text-indigo/55">Sugestões</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="label border border-indigo/20 px-3 py-1.5 hover:border-cobre hover:text-cobre"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <p role="status" className="label mt-8 text-indigo/55">
          {query && (results.length ? `${results.length} ${results.length === 1 ? "peça" : "peças"}` : "Nada encontrado. Tente outra palavra.")}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductLink slug={p.slug} onClick={close} className="group block" data-cursor="ver">
                <div className="relative aspect-[3/4] overflow-hidden bg-linho-escuro/40">
                  <ProductImage image={p.images.details[0]} alt="" sizes="(min-width: 768px) 16vw, 45vw" />
                </div>
                <p className="label mt-2 text-indigo/55">{p.code}</p>
                <p className="serif text-[1.1rem] group-hover:text-casca">{p.name}</p>
                <p className="label">{formatBRL(p.price)}</p>
              </ProductLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
