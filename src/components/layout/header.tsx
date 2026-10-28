"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandSymbol } from "@/components/brand/logo";
import { useHydrated } from "@/lib/hooks";
import { selectCount, useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { useTheme } from "@/lib/theme";
import { ThemeDial } from "./theme-dial";

const clock = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/**
 * Header da referência: quatro colunas de rótulos de 12 px sobre a grade de 14,
 * com o seletor redondo no canto. Fica por cima de tudo em "difference", então
 * inverte sobre as fotos.
 */
export function Header() {
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const { panel, open } = useUI();
  const theme = useTheme();
  const now = useClock();
  const [hh, mm] = now ? clock.format(now).split(":") : ["--", "--"];
  const menuOpen = panel === "menu";

  return (
    <header
      className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 text-[#fff] mix-blend-difference"
      inert={menuOpen || undefined}
    >
      <div className="grid-site label items-start pt-2 md:pt-4">
        <Link href="/" className="pointer-events-auto col-span-3 self-start md:col-span-2 lg:col-span-4" aria-label="Remanesce, início">
          <span className="roll-host">
            <span>Remanesce</span>
            <span aria-hidden>Início</span>
          </span>
          <span className="block">Denim autoral</span>
        </Link>

        <Link
          href="/"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-auto col-span-2 hidden self-start md:block lg:col-span-4"
        >
          <BrandSymbol size={48} seed="currentColor" className="-mt-1" />
        </Link>

        <div className="pointer-events-auto col-span-2 flex flex-col items-start lg:col-span-4">
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
              <span>Sacola{hydrated && count > 0 ? ` (${count})` : ""}</span>
              <span aria-hidden>Sacola{hydrated && count > 0 ? ` (${count})` : ""}</span>
            </span>
          </Link>
        </div>

        <p className="hidden lg:col-span-2 lg:block" aria-live="off">
          <span className="block">{theme === "terra" ? "Tema terra" : "Hora local"}</span>
          <span className="block tabular-nums">
            {hh}
            <span className="mx-2">.</span>
            {mm}
          </span>
        </p>
      </div>

      <ThemeDial className="pointer-events-auto absolute right-2 top-2 md:right-4 md:top-4" />
    </header>
  );
}
