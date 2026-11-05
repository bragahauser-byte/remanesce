"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { microcopy } from "@/data/copy";
import { totals, type ShippingOption } from "@/lib/checkout";
import { formatPrice, installmentsLabel } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { asset } from "@/lib/paths";
import { useCart } from "@/lib/store/cart";
import { CartLineItem } from "./cart-line";
import { TransitionLink } from "@/components/layout/page-transition";
import { CouponForm } from "./order-summary";
import { ShippingEstimate } from "./shipping-estimate";

/** Eixo do texto: a coluna seguinte à foto da peça (4 no desktop, a mesma da tela SACOLA). */
const textCol = "col-span-6 lg:col-span-4 lg:col-start-4";

/**
 * Fio horizontal com a gralha-azul pousada nele, rente à margem direita (tela SACOLA).
 * Os pés tocam a linha: o SVG foi enquadrado rente ao desenho por `npm run imagens`.
 */
function Perch() {
  return (
    <div className="pointer-events-none relative col-span-full -mt-px h-0" aria-hidden>
      <img
        src={asset("/images/marca/bird-linha.svg")}
        alt=""
        width={568}
        height={480}
        className="absolute bottom-0 right-[1%] h-12 w-auto md:h-20 lg:h-[clamp(80px,7.4vw,140px)]"
      />
    </div>
  );
}

/**
 * Sacola sobre o azul da marca (#263054) com texto branco (tela SACOLA de novembro):
 * "Sua seleção", as peças entre fios a 50% de branco, a gralha pousada no último fio,
 * e o total com "Comprar" no eixo do texto.
 */
export function BagView() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const coupon = useCart((s) => s.coupon);
  const [shipping, setShipping] = useState<ShippingOption | null>(null);
  const t = totals(hydrated ? lines : [], coupon, shipping?.price ?? null);

  // O fundo da página inteira (inclusive o "elástico" da rolagem) fica azul enquanto a sacola está aberta.
  useEffect(() => {
    const html = document.documentElement;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previous = meta?.content;
    html.style.background = "var(--azul)";
    meta?.setAttribute("content", "#263054");
    return () => {
      html.style.background = "";
      if (previous) meta?.setAttribute("content", previous);
    };
  }, []);

  const count = t.pieces;

  return (
    <section aria-labelledby="sacola-titulo" className="surface-azul min-h-dvh pb-24 pt-[max(calc(var(--header-h)+64px),26dvh)]">
      <div className="grid-site">
        <div className="col-span-full grid grid-cols-subgrid lg:col-span-12">
          <header className="col-span-full flex items-end justify-between gap-x-8 border-b border-[#fff]/50 pb-4 lg:pb-[clamp(12px,1.1vw,24px)]">
            <h1 id="sacola-titulo" className="ui-lg uppercase">
              Sua seleção
            </h1>
            <p className="label pb-1 text-[#fff]/50" aria-live="polite">
              {!hydrated ? " " : count === 0 ? "Vazia" : `${count} ${count === 1 ? "peça" : "peças"}`}
            </p>
          </header>

          {!hydrated ? (
            <div className="col-span-full min-h-[40vh] border-b border-[#fff]/50" aria-busy="true" />
          ) : t.detailed.length === 0 ? (
            <div className="col-span-full grid grid-cols-subgrid border-b border-[#fff]/50 pb-20 pt-12 lg:py-16">
              <div className={textCol}>
                <p className="title-display max-w-[18ch]">{microcopy.emptyBag}</p>
                <p className="mt-4 max-w-[44ch] text-16 text-[#fff]/50">As peças que você guardar aparecem aqui, com o tamanho escolhido.</p>
                <TransitionLink
                  href="/"
                  className="nav-text mt-10 flex h-[clamp(52px,3.35vw,60px)] w-full max-w-[343px] items-center justify-center bg-[#fff] text-[#000] transition-opacity hover:opacity-85"
                >
                  {microcopy.emptyBagCta}
                </TransitionLink>
              </div>
            </div>
          ) : (
            <ul className="col-span-full grid grid-cols-subgrid">
              {t.detailed.map((l) => (
                <CartLineItem key={`${l.slug}:${l.size}`} line={l} />
              ))}
            </ul>
          )}
          <Perch />

          {hydrated && t.detailed.length > 0 && (
            <div className="col-span-full mt-10 grid grid-cols-subgrid gap-y-12 lg:mt-14">
              <div className={textCol}>
                <dl className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 text-16">
                  <dt className="text-[#fff]/50">Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(t.subtotal)}</dd>
                  {t.discount > 0 && (
                    <>
                      <dt className="text-[#fff]/50">Cupom {t.coupon?.code}</dt>
                      <dd className="tabular-nums">− {formatPrice(t.discount)}</dd>
                    </>
                  )}
                  <dt className="text-[#fff]/50">Frete</dt>
                  <dd className="text-right">
                    {shipping ? (shipping.price === 0 ? "Grátis" : formatPrice(shipping.price)) : <span className="text-[#fff]/50">Calcule ao lado</span>}
                  </dd>
                </dl>
                <p className="ui-lg mt-6 flex flex-wrap gap-x-6 tabular-nums">
                  <span>{formatPrice(t.total)}</span>
                  <span className="text-[#fff]/50">{installmentsLabel(t.total)}</span>
                </p>
                <Link
                  href="/checkout"
                  className="nav-text mt-6 flex h-[clamp(52px,3.35vw,60px)] w-full max-w-[343px] items-center justify-center bg-[#fff] text-[#000] transition-opacity duration-300 hover:opacity-85 focus-visible:outline-[#fff]"
                >
                  Comprar
                </Link>
                <p className="label mt-4 text-[#fff]/50">{microcopy.demo}</p>
                <p className="mt-2 text-16 text-[#fff]/50">
                  Este pedido planta {count} {count === 1 ? "araucária" : "araucárias"}.
                </p>
              </div>

              <div className="col-span-6 grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
                <ShippingEstimate
                  subtotal={t.subtotal}
                  freeByCoupon={!!t.coupon?.freeShipping}
                  selected={shipping?.id ?? null}
                  onSelect={setShipping}
                />
                <div className="[&>div]:mt-0 [&>form]:mt-0">
                  <CouponForm />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
