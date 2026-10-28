"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { brand, navLinks } from "@/data/copy";
import { getLook } from "@/data/looks";
import { useFocusTrap } from "@/lib/focus-trap";
import { useUI } from "@/lib/store/ui";

/** Menu em tela cheia: preto quente com grade de pontos, links grandes em Bodoni e a roupa no hover. */
export function Menu() {
  const open = useUI((s) => s.panel === "menu");
  const close = useUI((s) => s.close);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(navLinks[0].look);
  const onEscape = useCallback(() => close(), [close]);

  useFocusTrap(ref, open, onEscape);

  // Fecha ao trocar de rota (inclui voltar/avançar do navegador).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname && open) close();
    lastPath.current = pathname;
  }, [pathname, open, close]);

  return (
    <div
      ref={ref}
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      inert={!open}
      data-open={open || undefined}
      className="group/menu no-print tex-pontos fixed inset-0 z-[60] flex flex-col bg-preto text-papel opacity-0 transition-[clip-path,opacity] duration-700 ease-remanesce [clip-path:inset(0_0_100%_0)] data-open:opacity-100 data-open:[clip-path:inset(0_0_0_0)]"
    >
      <div className="container-x flex h-header shrink-0 items-center justify-between">
        <Link href="/" onClick={close} className="text-[1.15rem]">
          <span className="wordmark">Remanesce</span>
        </Link>
        <button type="button" onClick={close} className="-mr-2 flex h-10 items-center gap-2 rounded-full px-3 hover:bg-papel/10" data-autofocus>
          <span className="text-small">Fechar</span>
          <Icon name="fechar" size={20} />
        </button>
      </div>

      <div data-lenis-prevent className="container-x grid flex-1 overflow-y-auto pb-8 pt-4 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
        <nav aria-label="Menu">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    onMouseEnter={() => setActive(link.look)}
                    onFocus={() => setActive(link.look)}
                    aria-current={current ? "page" : undefined}
                    className="group flex translate-y-5 items-baseline gap-4 py-1 opacity-0 transition-[opacity,transform] duration-700 ease-remanesce group-data-open/menu:translate-y-0 group-data-open/menu:opacity-100 md:gap-8"
                    style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
                  >
                    <span className="label w-8 shrink-0 text-papel/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="serif text-[clamp(2.4rem,min(6.4vw,8.6vh),5.6rem)] uppercase leading-[1.02] tracking-[0.01em] transition-transform duration-500 ease-remanesce group-hover:translate-x-3 group-aria-[current=page]:italic">
                      {link.label}
                    </span>
                    {current && <span aria-hidden className="size-2 self-center rounded-full bg-pinhao" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div aria-hidden className="relative hidden h-[64vh] max-h-[680px] md:block">
          {navLinks.map((link) => {
            const look = getLook(link.look)!;
            return (
              <div
                key={link.href}
                data-on={active === link.look || undefined}
                className="absolute inset-0 translate-y-3 opacity-0 transition-[opacity,transform] duration-700 ease-remanesce data-on:translate-y-0 data-on:opacity-100"
              >
                <Image src={look.cutout.front} alt="" fill sizes="(min-width: 768px) 30vw, 1px" className="object-contain" />
                <p className="kicker absolute -bottom-2 right-0 text-[1.1rem] text-papel/70">{look.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-x flex shrink-0 flex-col gap-4 border-t border-papel/10 py-5 md:flex-row md:items-center md:justify-between">
        <span className="kicker text-[1.15rem] text-papel/80">{brand.signature}</span>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-small">
          <Link href="/conta" onClick={close} className="hover:opacity-60">
            Minha Remanesce
          </Link>
          <Link href="/sacola" onClick={close} className="hover:opacity-60">
            Sacola
          </Link>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="hover:opacity-60">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
