"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { brand } from "@/data/copy";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { HomeLink } from "./page-transition";

/** Páginas de fundo azul: o header fica branco, sem o modo "difference". */
const onBlue = (pathname: string) => pathname.startsWith("/sacola");

/*
 * Estrutura única do topo, usada pelo header e pelo menu aberto: a grade do site
 * (6/14 colunas, margem --pad) numa linha só, com todos os itens alinhados pela linha
 * de base. O logotipo não tem linha de base própria, então a dele é a borda de baixo,
 * que coincide com a base das letras em caixa alta.
 *   coluna 1  → logotipo (mesma margem do conteúdo)
 *   coluna 9  → rótulo (segundo eixo das páginas: hero, peças e textos), só no desktop
 *   borda direita → Menu e Sacola
 */
export const barClass = "grid-site items-baseline pt-4 text-16 font-normal leading-6 tracking-[-0.005em] lg:pt-6";
export const logoClass = "block h-5 w-auto md:h-6 lg:h-7";
/** Área de toque de 44 px sem mexer no layout (o pseudo-elemento cresce para fora). */
export const hitArea = "relative after:absolute after:-inset-x-2 after:-inset-y-2.5 after:content-['']";

export function Header() {
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const { panel, open } = useUI();
  const pathname = usePathname();
  const menuOpen = panel === "menu";
  const bagLabel = `Sacola${hydrated && count > 0 ? ` (${count})` : ""}`;

  return (
    <header
      className={`no-print pointer-events-none fixed inset-x-0 top-0 z-50 text-[#fff] ${onBlue(pathname) ? "" : "mix-blend-difference"}`}
      inert={menuOpen || undefined}
    >
      <div className={barClass}>
        <HomeLink aria-label="Remanesce, início" className={`pointer-events-auto col-span-3 justify-self-start ${hitArea}`}>
          <Wordmark title="Remanesce" className={logoClass} />
        </HomeLink>

        <HomeLink tabIndex={-1} aria-hidden className="pointer-events-auto hidden justify-self-start lg:col-span-4 lg:col-start-9 lg:block">
          <span className="roll-host">
            <span>{brand.collection}</span>
            <span>Início</span>
          </span>
        </HomeLink>

        <nav aria-label="Atalhos" className="pointer-events-auto col-span-3 flex justify-self-end gap-6 lg:col-span-2 lg:col-start-13">
          <button type="button" onClick={() => open("menu")} aria-expanded={menuOpen} aria-controls="menu-principal" className={hitArea}>
            <span className="roll">
              <span>Menu</span>
              <span aria-hidden>Menu</span>
            </span>
          </button>
          <Link
            href="/sacola"
            className={`tabular-nums ${hitArea}`}
            aria-label={`Sacola${hydrated && count ? `, ${count} ${count === 1 ? "peça" : "peças"}` : ", vazia"}`}
          >
            <span className="roll">
              <span>{bagLabel}</span>
              <span aria-hidden>{bagLabel}</span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
