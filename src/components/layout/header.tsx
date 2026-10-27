"use client";

import Link from "next/link";
import { Icon } from "@/components/icons/icon";
import { useHydrated, useScrolled } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useSaved } from "@/lib/store/saved";
import { useUI } from "@/lib/store/ui";

const iconButton =
  "relative grid size-11 place-items-center rounded-full transition-colors duration-300 hover:text-cobre";

export function Header() {
  const scrolled = useScrolled();
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const saved = useSaved((s) => s.slugs.length);
  const { panel, toggle } = useUI();

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="no-print fixed inset-x-0 top-0 z-50 h-header border-b border-transparent text-[var(--page-fg)] transition-[background-color,border-color,backdrop-filter,color] duration-700 ease-remanesce data-scrolled:border-[color-mix(in_srgb,var(--page-fg)_12%,transparent)] data-scrolled:bg-[color-mix(in_srgb,var(--page-bg)_82%,transparent)] data-scrolled:backdrop-blur-md"
    >
      <div className="container-x grid h-full grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => toggle("menu")}
            aria-expanded={panel === "menu"}
            aria-controls="menu-principal"
            className="group -ml-2.5 flex h-11 items-center gap-2.5 px-2.5 hover:text-cobre"
          >
            <Icon name="menu" />
            <span className="label hidden md:inline">Menu</span>
          </button>
        </div>

        <Link href="/" aria-label="Remanesce, página inicial" className="text-[1.05rem] md:text-[1.35rem]">
          <span className="wordmark">Remanesce</span>
        </Link>

        <nav aria-label="Atalhos" className="-mr-2.5 flex items-center justify-end">
          <button
            type="button"
            onClick={() => toggle("search")}
            aria-expanded={panel === "search"}
            className={iconButton}
            aria-label="Buscar"
          >
            <Icon name="busca" />
          </button>
          <Link href="/conta" className={`${iconButton} hidden md:grid`} aria-label="Minha Remanesce">
            <Icon name="conta" />
          </Link>
          <Link
            href="/conta?aba=guardados"
            className={`${iconButton} hidden sm:grid`}
            aria-label={`Guardados${hydrated && saved ? `, ${saved} peças` : ""}`}
          >
            <Icon name="pinhao" filled={hydrated && saved > 0} />
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
              <span className="absolute right-0.5 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-pinhao px-1 font-mono text-[10px] leading-none text-linho">
                {count}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
