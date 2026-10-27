"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { Icon } from "@/components/icons/icon";
import { microcopy } from "@/data/copy";
import { FREE_SHIPPING_FROM, totals } from "@/lib/checkout";
import { useFocusTrap } from "@/lib/focus-trap";
import { formatBRL, installmentsLabel } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { CartLineItem } from "./cart-line";

/** Mini-sacola lateral: abre ao adicionar uma peça ou pelo ícone do header. */
export function BagDrawer() {
  const open = useUI((s) => s.panel === "bag");
  const close = useUI((s) => s.close);
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const { detailed, subtotal, pieces } = totals(hydrated ? lines : []);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const onEscape = useCallback(() => close(), [close]);
  useFocusTrap(ref, open, onEscape);

  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname && open) close();
    lastPath.current = pathname;
  }, [pathname, open, close]);

  const missing = FREE_SHIPPING_FROM - subtotal;

  return (
    <div className="no-print fixed inset-0 z-[75]" inert={!open} aria-hidden={!open}>
      <div
        onClick={close}
        className={`absolute inset-0 bg-indigo/40 transition-opacity duration-500 ease-remanesce ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sacola-titulo"
        className={`absolute inset-y-0 right-0 flex w-full flex-col bg-linho transition-transform duration-[600ms] ease-remanesce sm:w-[460px] ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-pinhao" />
        <div className="flex h-header shrink-0 items-center justify-between border-b border-indigo/10 px-6">
          <h2 id="sacola-titulo" className="label-lg">
            Sacola {pieces > 0 && <span className="text-indigo/50">({pieces})</span>}
          </h2>
          <button type="button" onClick={close} className="-mr-2 p-2 hover:text-cobre" aria-label="Fechar sacola" data-autofocus>
            <Icon name="fechar" />
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Icon name="pinhao" size={40} className="text-indigo/40" />
            <p className="serif mt-6 text-h4 text-casca">{microcopy.emptyBag}</p>
            <Link href="/loja" onClick={close} className="label link-stitch mt-6">
              {microcopy.emptyBagCta}
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-indigo/10 px-6 py-3">
              <p className="label text-indigo/70">
                {missing > 0 ? `Faltam ${formatBRL(missing)} para o frete grátis` : "Frete grátis garantido"}
              </p>
              <div className="mt-2 h-px bg-indigo/10">
                <div className="h-px bg-cobre transition-[width] duration-700" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%` }} />
              </div>
            </div>
            <ul data-lenis-prevent className="flex-1 divide-y divide-dashed divide-cobre/40 overflow-y-auto px-6">
              {detailed.map((l) => (
                <CartLineItem key={`${l.slug}:${l.size}`} line={l} compact />
              ))}
            </ul>
            <div className="border-t border-indigo/10 px-6 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="label">Subtotal</span>
                <span className="font-mono text-[1.05rem]">{formatBRL(subtotal)}</span>
              </div>
              <p className="mt-1 text-right text-small text-indigo/60">{installmentsLabel(subtotal)}</p>
              <div className="mt-5 grid gap-2">
                <Link
                  href="/checkout"
                  onClick={close}
                  className="label-lg flex h-13 items-center justify-center gap-3 bg-indigo text-linho hover:bg-denim"
                >
                  Finalizar compra <Icon name="seta" size={22} />
                </Link>
                <Link href="/sacola" onClick={close} className="label-lg flex h-12 items-center justify-center border border-indigo/25 hover:border-indigo">
                  Ver sacola
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
