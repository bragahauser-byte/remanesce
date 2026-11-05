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
        className="absolute bottom-0 left-[8%] h-12 w-auto md:left-auto md:right-[30%] md:h-16 lg:h-[clamp(72px,6vw,112px)]"
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

  const row = "flex items-baseline justify-between gap-6 border-b border-inverse/20 py-3";

  return (
    <section aria-labelledby="sacola-titulo" className="surface-azul min-h-dvh pb-24 pt-[calc(var(--header-h)+clamp(48px,12vh,160px))]">
      <div className="grid-site">
        <div className="col-span-full grid grid-cols-subgrid lg:col-span-12">
          {/* Título da página e contagem, sobre o primeiro fio. */}
          <header className="col-span-full flex items-end justify-between gap-x-8 border-b border-inverse/40 pb-4">
            <h1 id="sacola-titulo" className="t-title uppercase">
              Sua seleção
            </h1>
            <p className="label text-inverse-secondary" aria-live="polite">
              {!hydrated ? " " : count === 0 ? "Vazia" : `${count} ${count === 1 ? "peça" : "peças"}`}
            </p>
          </header>

          {!hydrated ? (
            <div className="col-span-full min-h-[40vh] border-b border-inverse/40" aria-busy="true" />
          ) : t.detailed.length === 0 ? (
            <div className="col-span-full grid grid-cols-subgrid border-b border-inverse/40 pb-24 pt-12 lg:py-20">
              <div className={textCol}>
                <p className="title-display max-w-[14ch]">{microcopy.emptyBag}</p>
                <p className="t-body mt-4 max-w-[34em] text-inverse-secondary">As peças que você guardar aparecem aqui, com o tamanho escolhido.</p>
                <TransitionLink
                  href="/"
                  className="nav-text mt-10 flex h-14 w-full max-w-[343px] items-center justify-center bg-[#fff] text-[#111] transition-opacity duration-300 ease-in-out hover:opacity-85"
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
            <div className="col-span-full mt-16 grid grid-cols-subgrid gap-y-16 lg:mt-20">
              {/* Resumo: o que se paga, em ordem de leitura, e a ação principal. */}
              <section aria-labelledby="resumo-titulo" className="col-span-6 lg:order-2 lg:col-span-3 lg:col-start-10">
                <h2 id="resumo-titulo" className="label text-inverse-secondary">
                  Resumo do pedido
                </h2>
                <dl className="t-body mt-4 border-t border-inverse/40">
                  <div className={row}>
                    <dt className="text-inverse-secondary">Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(t.subtotal)}</dd>
                  </div>
                  {t.discount > 0 && (
                    <div className={row}>
                      <dt className="text-inverse-secondary">Cupom {t.coupon?.code}</dt>
                      <dd className="tabular-nums">− {formatPrice(t.discount)}</dd>
                    </div>
                  )}
                  <div className={row}>
                    <dt className="text-inverse-secondary">Frete</dt>
                    <dd className="text-right">
                      {shipping ? (shipping.price === 0 ? "Grátis" : formatPrice(shipping.price)) : <span className="text-inverse-secondary">a calcular</span>}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-6 pt-5">
                    <dt className="t-title">Total</dt>
                    <dd className="t-title tabular-nums">{formatPrice(t.total)}</dd>
                  </div>
                  <div className="text-right">
                    <dt className="sr-only">Parcelamento</dt>
                    <dd className="t-small text-inverse-secondary">
                      {installmentsLabel(t.total)}
                      {installmentsLabel(t.total).startsWith("ou") ? " sem juros" : ""}
                    </dd>
                  </div>
                </dl>
                <Link
                  href="/checkout"
                  className="nav-text mt-8 flex h-14 w-full items-center justify-center bg-[#fff] text-[#111] transition-opacity duration-300 ease-in-out hover:opacity-85 focus-visible:outline-[#fff]"
                >
                  Comprar
                </Link>
                <p className="t-caption mt-4 text-inverse-secondary">{microcopy.demo}</p>
                <p className="t-small mt-1 text-inverse-secondary">
                  Este pedido planta {count} {count === 1 ? "araucária" : "araucárias"}.
                </p>
              </section>

              {/* Entrega e cupom, no eixo do texto das peças. */}
              <div className="col-span-6 grid content-start gap-10 sm:grid-cols-2 lg:order-1 lg:col-span-5 lg:col-start-4 lg:gap-x-[var(--gap)]">
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
