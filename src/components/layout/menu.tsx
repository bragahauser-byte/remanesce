"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { Diamond } from "@/components/brand/textures";
import { brand, navLinks } from "@/data/copy";
import { useFocusTrap } from "@/lib/focus-trap";
import { asset } from "@/lib/paths";
import { useUI } from "@/lib/store/ui";

const lookImage = (n: number) => asset(`/images/looks/look-0${n}-frente.jpg`);

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
      className="group/menu no-print tex-sarja fixed inset-0 z-[60] flex flex-col bg-indigo text-linho opacity-0 transition-[clip-path,opacity] duration-700 ease-remanesce [clip-path:inset(0_0_100%_0)] data-open:opacity-100 data-open:[clip-path:inset(0_0_0_0)]"
    >
      <div className="container-x flex h-header shrink-0 items-center justify-between">
        <button
          type="button"
          onClick={close}
          className="-ml-2.5 flex h-11 items-center gap-2.5 px-2.5 hover:text-cobre"
          data-autofocus
        >
          <Icon name="fechar" />
          <span className="label">Fechar</span>
        </button>
        <Link href="/" onClick={close} className="text-[1.05rem] md:text-[1.35rem]">
          <span className="wordmark">Remanesce</span>
        </Link>
        <span className="label hidden w-24 text-right text-linho/60 md:block">Coleção 01</span>
        <span className="w-11 md:hidden" />
      </div>

      <div data-lenis-prevent className="container-x grid flex-1 overflow-y-auto pb-8 pt-6 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12 md:pb-12">
        <nav aria-label="Principal">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href} className="border-b border-linho/10 first:border-t">
                  <Link
                    href={link.href}
                    onClick={close}
                    onMouseEnter={() => setActive(link.look)}
                    onFocus={() => setActive(link.look)}
                    aria-current={current ? "page" : undefined}
                    className="group flex translate-y-5 items-baseline gap-4 py-2.5 opacity-0 transition-[opacity,transform] duration-700 ease-remanesce group-data-open/menu:translate-y-0 group-data-open/menu:opacity-100 md:gap-8 md:py-3"
                    style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
                  >
                    <span className="label w-8 shrink-0 text-linho/50">{String(i + 1).padStart(2, "0")}</span>
                    <span className="serif text-[clamp(2.4rem,min(6.4vw,8.4vh),5.2rem)] leading-[1.02] transition-[color,transform] duration-500 ease-remanesce group-hover:translate-x-3 group-hover:text-cobre group-aria-[current=page]:italic">
                      {link.label}
                    </span>
                    {current && <Diamond className="self-center" size={7} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div aria-hidden className="relative hidden h-[62vh] max-h-[640px] md:block">
          {navLinks.map((link) => (
            <div
              key={link.href}
              data-on={active === link.look || undefined}
              className="absolute inset-0 bg-linho opacity-0 transition-opacity duration-700 ease-remanesce data-on:opacity-100"
            >
              <Image
                src={lookImage(link.look)}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 1px"
                className="object-contain py-6"
              />
              <span className="absolute inset-x-0 -bottom-1.5 h-1.5 bg-pinhao" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-x flex shrink-0 flex-col gap-4 border-t border-linho/10 py-5 md:flex-row md:items-center md:justify-between">
        <span className="serif text-lg italic text-linho/80">{brand.signature}</span>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/conta" onClick={close} className="label link-stitch">
            Minha Remanesce
          </Link>
          <Link href="/sacola" onClick={close} className="label link-stitch">
            Sacola
          </Link>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className="label link-stitch">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
