"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons/icon";
import { primaryNav } from "@/data/copy";
import { useHydrated, useScrolled } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useSaved } from "@/lib/store/saved";
import { useUI } from "@/lib/store/ui";

const iconButton = "relative grid size-10 place-items-center rounded-full transition-opacity hover:opacity-60";

/**
 * Header (A24 + FARM): transparente sobre a página, vira vidro ao rolar.
 * Desktop: logotipo à esquerda, links no centro com Índice ▾, ícones e menu à direita.
 * Mobile: menu à esquerda, logotipo no centro, busca e sacola à direita.
 */
export function Header() {
  const scrolled = useScrolled();
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const saved = useSaved((s) => s.slugs.length);
  const { panel, toggle } = useUI();
  const pathname = usePathname();

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="no-print fixed inset-x-0 top-0 z-50 h-header text-[var(--page-fg)] transition-[background-color,backdrop-filter,color] duration-500 ease-remanesce data-scrolled:bg-[color-mix(in_srgb,var(--page-bg)_86%,transparent)] data-scrolled:backdrop-blur-lg"
    >
      <div className="container-x grid h-full grid-cols-[1fr_auto_1fr] items-center lg:grid-cols-[auto_1fr_auto] lg:gap-10">
        {/* esquerda */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => toggle("menu")}
            aria-expanded={panel === "menu"}
            aria-controls="menu-principal"
            aria-label="Menu"
            className={`${iconButton} -ml-2 lg:hidden`}
          >
            <Icon name="menu" />
          </button>
          <Link href="/" aria-label="Remanesce, início" className="hidden text-[1.15rem] lg:block">
            <span className="wordmark">Remanesce</span>
          </Link>
        </div>

        {/* centro */}
        <Link href="/" aria-label="Remanesce, início" className="text-[1.05rem] lg:hidden">
          <span className="wordmark">Remanesce</span>
        </Link>
        <nav aria-label="Principal" className="hidden items-center justify-center gap-8 lg:flex">
          {primaryNav.map((item) => {
            const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className="relative flex items-center gap-2 text-[0.9375rem] transition-opacity hover:opacity-60"
              >
                {item.label}
                {"chip" in item && (
                  <span className="rounded-full bg-[var(--page-fg)] px-2 py-0.5 text-[10px] leading-none text-[var(--page-bg)]">{item.chip}</span>
                )}
                {current && <span aria-hidden className="absolute -bottom-1.5 left-0 right-0 h-px bg-current" />}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => toggle("index")}
            aria-expanded={panel === "index"}
            aria-controls="indice"
            className="flex items-center gap-1 text-[0.9375rem] transition-opacity hover:opacity-60"
          >
            Índice
            <Icon name="seta-baixo" size={16} className={`transition-transform duration-300 ${panel === "index" ? "rotate-180" : ""}`} />
          </button>
        </nav>

        {/* direita */}
        <nav aria-label="Atalhos" className="-mr-2 flex items-center justify-end gap-0.5">
          <button type="button" onClick={() => toggle("search")} aria-expanded={panel === "search"} className={iconButton} aria-label="Buscar">
            <Icon name="busca" />
          </button>
          <Link
            href="/conta?aba=favoritos"
            className={`${iconButton} hidden sm:grid`}
            aria-label={`Favoritos${hydrated && saved ? `, ${saved} peças` : ""}`}
          >
            <Icon name="coracao" filled={hydrated && saved > 0} />
          </Link>
          <button
            type="button"
            onClick={() => toggle("bag")}
            aria-expanded={panel === "bag"}
            className={iconButton}
            aria-label={`Sacola${hydrated && count ? `, ${count} ${count === 1 ? "peça" : "peças"}` : ", vazia"}`}
            data-bag-target
          >
            <Icon name="sacola" />
            {hydrated && count > 0 && (
              <span className="absolute right-0 top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-pinhao px-1 text-[10px] font-medium leading-none text-branco">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => toggle("menu")}
            aria-expanded={panel === "menu"}
            aria-controls="menu-principal"
            aria-label="Menu"
            className={`${iconButton} hidden lg:grid`}
          >
            <Icon name="menu" />
          </button>
        </nav>
      </div>
    </header>
  );
}
