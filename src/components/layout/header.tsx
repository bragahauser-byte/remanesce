"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/brand/wordmark";
import { brand } from "@/data/copy";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";

/** Páginas de fundo azul: o header fica branco, sem o modo "difference". */
const onBlue = (pathname: string) => pathname.startsWith("/sacola");

/**
 * Header da referência: rótulos de 12 px sobre a grade de 14 colunas e o logotipo
 * tipográfico. Fica por cima de tudo em "difference", então inverte sobre as fotos.
 * No celular o logotipo abre a linha e Menu/Sacola ficam à direita.
 */
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
      <div className="grid-site label items-start pt-3 md:pt-4">
        <Link href="/" className="pointer-events-auto col-span-2 hidden self-start md:block lg:col-span-4" tabIndex={-1} aria-hidden>
          <span className="roll-host">
            <span>Denim autoral</span>
            <span>Início</span>
          </span>
          <span className="block">{brand.collection}</span>
        </Link>

        {/* Logotipo: área de toque de 44 px de altura, sem alterar a proporção 1338 × 186. */}
        <Link
          href="/"
          aria-label="Remanesce, início"
          className="pointer-events-auto col-span-4 -my-3 flex h-11 items-center self-start md:col-span-2 lg:col-span-6"
        >
          <Wordmark title="Remanesce" className="h-5 w-auto md:h-6 lg:h-7 xl:h-8" />
        </Link>

        <div className="pointer-events-auto col-span-2 flex flex-col items-end text-right lg:col-span-2 lg:col-start-13">
          <button
            type="button"
            onClick={() => open("menu")}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            className="label"
          >
            <span className="roll">
              <span>Menu</span>
              <span aria-hidden>Menu</span>
            </span>
          </button>
          <Link href="/sacola" className="label" aria-label={`Sacola${hydrated && count ? `, ${count} ${count === 1 ? "peça" : "peças"}` : ", vazia"}`}>
            <span className="roll">
              <span>{bagLabel}</span>
              <span aria-hidden>{bagLabel}</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
