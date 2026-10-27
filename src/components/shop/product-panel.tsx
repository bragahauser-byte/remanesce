"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { getLenis } from "@/components/layout/smooth-scroll";
import { Icon } from "@/components/icons/icon";
import { useFocusTrap } from "@/lib/focus-trap";

/**
 * Painel grande da PDP sobre a grade (desktop: desliza da direita, ~85% da tela;
 * mobile: sobe de baixo, tela cheia). ESC, clique fora ou "Voltar" fecham sem perder o scroll.
 */
export function ProductPanel({ title, children }: { title: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const closing = useRef(false);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => router.back(), reduced ? 0 : 420);
  }, [router]);

  useFocusTrap(ref, open, close);

  useEffect(() => {
    closing.current = false;
    const frame = requestAnimationFrame(() => setOpen(true));
    const root = document.documentElement;
    getLenis()?.stop();
    root.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(frame);
      getLenis()?.start();
      root.style.overflow = "";
    };
  }, []);

  // Ao trocar de peça dentro do painel, volta ao topo.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="no-print fixed inset-0 z-[70]" data-no-transition>
      <div
        aria-hidden
        onClick={close}
        className={`absolute inset-0 bg-indigo/45 backdrop-blur-[2px] transition-opacity duration-500 ease-remanesce ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-0 flex flex-col bg-linho shadow-[-24px_0_60px_rgb(22_27_39/0.25)] transition-transform duration-[600ms] ease-remanesce md:left-auto md:w-[85vw] ${
          open ? "translate-x-0 translate-y-0" : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        <span aria-hidden className="absolute inset-y-0 left-0 hidden w-1 bg-pinhao md:block" />
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-indigo/10 px-4 md:px-10">
          <button type="button" onClick={close} className="label flex items-center gap-3 py-2 hover:text-cobre" data-autofocus>
            <Icon name="seta-esquerda" size={22} /> Voltar à loja
          </button>
          <button type="button" onClick={close} className="-mr-2 p-2 hover:text-cobre" aria-label="Fechar">
            <Icon name="fechar" />
          </button>
        </div>
        <div ref={scroller} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 pb-24 pt-6 md:px-10 md:pt-10">
          {children}
        </div>
      </div>
    </div>
  );
}
