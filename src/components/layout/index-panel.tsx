"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { indexSections } from "@/data/copy";
import { looks } from "@/data/looks";
import { useFocusTrap } from "@/lib/focus-trap";
import { useUI } from "@/lib/store/ui";

const pad = (n: number) => String(n).padStart(2, "0");
export const lookHref = (slug: string) => `/colecao/${slug}`;

/**
 * Índice (A24): painel branco que desce sob o header com os seis looks e as seções.
 * O item ativo (rota atual ou foco/hover) vira uma barra preta com o número à direita.
 */
export function IndexPanel() {
  const open = useUI((s) => s.panel === "index");
  const close = useUI((s) => s.close);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const onEscape = useCallback(() => close(), [close]);
  const [hovered, setHovered] = useState<string | null>(null);
  useFocusTrap(ref, open, onEscape);

  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname && open) close();
    lastPath.current = pathname;
  }, [pathname, open, close]);

  const activeHref = hovered ?? pathname;

  return (
    <div className="no-print fixed inset-0 top-header z-40" inert={!open} aria-hidden={!open}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-tinta/10 transition-opacity duration-500 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        ref={ref}
        id="indice"
        role="dialog"
        aria-modal="true"
        aria-label="Índice"
        className={`absolute inset-x-0 top-0 origin-top bg-branco text-tinta shadow-[0_30px_60px_rgb(17_17_17/0.08)] transition-[clip-path] duration-[600ms] ease-remanesce ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div data-lenis-prevent className="container-x grid max-h-[calc(100svh-var(--spacing-header))] gap-10 overflow-y-auto py-8 md:grid-cols-[1fr_280px] md:py-10">
          <div>
            <p className="label text-cinza">Coleção 01 · seis looks</p>
            <ol className="mt-4 border-t border-linha" onMouseLeave={() => setHovered(null)}>
              {looks.map((look) => {
                const href = lookHref(look.slug);
                const active = activeHref === href;
                return (
                  <li key={look.slug} className="border-b border-linha">
                    <Link
                      href={href}
                      onClick={close}
                      onMouseEnter={() => setHovered(href)}
                      onFocus={() => setHovered(href)}
                      data-active={active || undefined}
                      className="group flex items-center justify-between gap-6 px-3 py-3 transition-colors duration-200 data-active:bg-tinta data-active:text-branco"
                    >
                      <span className="serif text-[clamp(1.5rem,3vw,2.25rem)] uppercase leading-none tracking-[0.02em]">{look.name}</span>
                      <span className="label hidden flex-1 truncate text-right normal-case tracking-normal text-cinza group-data-active:text-branco/60 sm:block">
                        {look.line}
                      </span>
                      <span className="label tabular-nums">{pad(look.number)}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <p className="label text-cinza">Seções</p>
            <ul className="mt-4 space-y-1">
              {indexSections.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} onClick={close} className="kicker block py-1 text-[1.35rem] transition-opacity hover:opacity-60">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/loja" onClick={close} className="pill mt-8 w-full">
              Ir para a loja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
