"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { microcopy } from "@/data/copy";
import { totals, type ShippingOption } from "@/lib/checkout";
import { formatBRL, installments } from "@/lib/format";
import { useHydrated } from "@/lib/hooks";
import { asset } from "@/lib/paths";
import { useCart } from "@/lib/store/cart";
import { CartLineItem } from "./cart-line";
import { CouponForm } from "./order-summary";
import { ShippingEstimate } from "./shipping-estimate";

/** Recuo do texto na largura da miniatura + espaço, como na referência (tudo alinha ao nome da peça). */
const indent = "md:pl-[calc(7rem+1.5rem)]";

/**
 * Linha horizontal com a gralha-azul pousada nela (referência "image 4135": a ilustração
 * de traço pousa sobre o fio do campo). Os pés tocam a linha: o SVG foi enquadrado rente
 * ao desenho por `npm run imagens`.
 */
function Perch({ at = "78%" }: { at?: string }) {
  return (
    <div className="relative border-b border-[#fff]" aria-hidden>
      <img
        src={asset("/images/marca/bird-linha.svg")}
        alt=""
        width={568}
        height={480}
        className="relative h-12 w-auto -translate-x-1/2 md:h-16"
        style={{ left: at }}
      />
    </div>
  );
}

/**
 * Sacola sobre o azul da marca (#263054) com texto branco: título em PP Pangaia, as
 * peças entre dois fios, o pássaro pousado no fio de baixo e o total logo abaixo,
 * recuado até o alinhamento dos nomes (referência "image 4133").
 */
export function BagView() {
  const hydrated = useHydrated();
  const lines = useCart((s) => s.lines);
  const coupon = useCart((s) => s.coupon);
  const [shipping, setShipping] = useState<ShippingOption | null>(null);
  const t = totals(hydrated ? lines : [], coupon, shipping?.price ?? null);
  const parcel = installments(t.total);

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
    <section aria-labelledby="sacola-titulo" className="surface-azul min-h-dvh pb-24 pt-28 md:pt-36 lg:pt-44">
      <div className="px-[var(--pad)]">
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 pb-6 md:pb-8">
          <h1 id="sacola-titulo" className="font-display text-[3rem] font-extralight leading-[0.95] tracking-[-0.02em] md:text-64 lg:text-96">
            sacola
          </h1>
          <p className="label pb-1 text-muted" aria-live="polite">
            {!hydrated ? " " : count === 0 ? "Vazia" : `${count} ${count === 1 ? "peça" : "peças"}`}
          </p>
        </header>

        {!hydrated ? (
          <div className="min-h-[40vh] border-t border-[#fff]" aria-busy="true" />
        ) : t.detailed.length === 0 ? (
          <div className="border-t border-[#fff]">
            <div className={`py-12 md:py-16 ${indent}`}>
              <p className="title-display max-w-[18ch]">{microcopy.emptyBag}</p>
              <p className="mt-4 max-w-[44ch] text-16 text-soft">As peças que você guardar aparecem aqui, com o tamanho escolhido.</p>
            </div>
            <Perch at="72%" />
            <div className={`pt-10 ${indent}`}>
              <Link href="/" className="btn-line w-full sm:w-auto sm:min-w-64">
                {microcopy.emptyBagCta}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-line border-t border-[#fff]">
              {t.detailed.map((l) => (
                <CartLineItem key={`${l.slug}:${l.size}`} line={l} />
              ))}
            </ul>
            <div className="pt-6 md:pt-10">
              <Perch />
            </div>

            <div className={`mt-8 max-w-[calc(34rem+8.5rem)] md:mt-10 ${indent}`}>
              <dl className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 text-16">
                <dt className="font-display font-extralight italic">Subtotal</dt>
                <dd className="tabular-nums">{formatBRL(t.subtotal)}</dd>
                {t.discount > 0 && (
                  <>
                    <dt className="font-display font-extralight italic">Cupom {t.coupon?.code}</dt>
                    <dd className="tabular-nums">− {formatBRL(t.discount)}</dd>
                  </>
                )}
                <dt className="font-display font-extralight italic">Frete</dt>
                <dd className="text-right">
                  {shipping ? (shipping.price === 0 ? "Grátis" : formatBRL(shipping.price)) : <span className="text-muted">Calcule abaixo</span>}
                </dd>
                <dt className="mt-2 font-display text-24 font-extralight italic">Total</dt>
                <dd className="mt-2 text-24 tabular-nums">{formatBRL(t.total)}</dd>
                <dd className="col-span-2 text-right text-12 text-muted">
                  {parcel.n > 1 ? `ou ${parcel.n}× de ${formatBRL(parcel.value)} sem juros` : "à vista"}
                </dd>
              </dl>

              <Link
                href="/checkout"
                className="label-lg mt-8 flex min-h-14 items-center justify-center bg-[#fff] px-8 text-azul transition-opacity duration-300 hover:opacity-85 focus-visible:outline-[#fff]"
              >
                Finalizar compra
              </Link>
              <p className="label mt-4 text-center text-muted">{microcopy.demo}</p>
              <p className="mt-6 text-16 text-soft">
                Este pedido planta {count} {count === 1 ? "araucária" : "araucárias"}.
              </p>

              <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-2 md:gap-8">
                <ShippingEstimate
                  subtotal={t.subtotal}
                  freeByCoupon={!!t.coupon?.freeShipping}
                  selected={shipping?.id ?? null}
                  onSelect={setShipping}
                />
                <div className="[&>form]:mt-0 [&>div]:mt-0">
                  <CouponForm />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
