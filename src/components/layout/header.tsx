"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { HomeLink, leaveTo } from "./page-transition";

/** Páginas de fundo azul: o header fica branco, sem o modo "difference". */
const onBlue = (pathname: string) => pathname.startsWith("/sacola");

/** Páginas que fecham (look e sacola): no lugar de Menu, "Fechar". */
const closable = (pathname: string) => pathname.startsWith("/looks/") || pathname.startsWith("/sacola");

/*
 * Topo das telas de novembro: logotipo grande à esquerda (317 px em 1728) e a navegação
 * em caixa alta à direita (24 px, gap 80), os dois rentes à margem de 24 px.
 * Mesma estrutura no menu aberto (`barClass` e `logoClass`).
 */
export const barClass = "flex items-start justify-between px-[var(--pad)] pt-[var(--pad)]";
export const logoClass = "block h-[var(--logo-h)] w-auto";
export const navClass = "nav-text flex items-start gap-8 md:gap-12 lg:gap-[clamp(48px,4.63vw,96px)]";
/** Área de toque de 44 px sem mexer no layout (o pseudo-elemento cresce para fora). */
export const hitArea = "relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']";

/** Rótulo que rola no hover: o texto sobe e a cópia entra por baixo. */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

export function Header() {
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const { panel, open } = useUI();
  const pathname = usePathname();
  const router = useRouter();
  const menuOpen = panel === "menu";
  const blue = onBlue(pathname);
  const close = closable(pathname);
  const bagLabel = `Sacola${hydrated && count > 0 ? ` (${count})` : ""}`;

  // Fechar volta para a página anterior do site; sem histórico, para o início.
  const onClose = () => {
    const internal = typeof document !== "undefined" && document.referrer.startsWith(window.location.origin);
    if (window.history.length > 1 && (internal || pathname.startsWith("/sacola"))) {
      leaveTo("back", () => router.back());
      return;
    }
    leaveTo("/", (to) => router.push(to));
  };

  return (
    <header
      data-site-header
      className={`no-print pointer-events-none fixed inset-x-0 top-0 z-50 text-[#fff] ${blue ? "" : "mix-blend-difference"}`}
      inert={menuOpen || undefined}
    >
      <div className={barClass}>
        <HomeLink aria-label="Remanesce, início" className={`pointer-events-auto ${hitArea}`}>
          <Wordmark title="Remanesce" className={logoClass} />
        </HomeLink>

        <nav aria-label="Atalhos" className={`pointer-events-auto ${navClass}`}>
          {/* Na sacola não há link para ela mesma; nos looks ela só aparece com peças. */}
          {!blue && (!close || (hydrated && count > 0)) && (
            <Link
              href="/sacola"
              className={`tabular-nums ${hitArea}`}
              aria-label={`Sacola${hydrated && count ? `, ${count} ${count === 1 ? "peça" : "peças"}` : ", vazia"}`}
            >
              <Roll>{bagLabel}</Roll>
            </Link>
          )}
          {close ? (
            <button type="button" onClick={onClose} className={hitArea}>
              <Roll>Fechar</Roll>
            </button>
          ) : (
            <button type="button" onClick={() => open("menu")} aria-expanded={menuOpen} aria-controls="menu-principal" className={hitArea}>
              <Roll>Menu</Roll>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
