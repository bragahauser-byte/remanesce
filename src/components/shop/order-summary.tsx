"use client";

import { useState, type FormEvent } from "react";
import { Stitch } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { findCoupon, type totals } from "@/lib/checkout";
import { formatBRL, installments } from "@/lib/format";
import { useCart } from "@/lib/store/cart";
import { ProductImage } from "./product-image";

type Totals = ReturnType<typeof totals>;

/** Resumo do pedido: sempre visível no checkout e na sacola. */
export function OrderSummary({
  t,
  shippingLabel,
  showItems = false,
  showCoupon = true,
}: {
  t: Totals;
  /** null: frete ainda não calculado. */
  shippingLabel?: string | null;
  showItems?: boolean;
  showCoupon?: boolean;
}) {
  const parcel = installments(t.total);
  return (
    <div className="bg-linho-escuro/60 p-6 md:p-8">
      <h2 className="label-lg">Resumo do pedido</h2>
      {showItems && (
        <ul className="mt-5 space-y-4">
          {t.detailed.map((l) => (
            <li key={`${l.slug}:${l.size}`} className="flex gap-3">
              <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-linho">
                <ProductImage image={l.product.images.details[0]} alt="" sizes="48px" />
                <span className="absolute -right-0 -top-0 grid size-4 place-items-center bg-indigo font-mono text-[9px] text-linho">{l.qty}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="serif truncate text-[1.05rem] leading-tight">{l.product.name}</p>
                <p className="label mt-0.5 text-indigo/55">Tam. {l.size}</p>
              </div>
              <p className="label shrink-0">{formatBRL(l.total)}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="my-5">
        <Stitch />
      </div>
      <dl className="space-y-2.5 text-small">
        <Row label={`Subtotal (${t.pieces} ${t.pieces === 1 ? "peça" : "peças"})`} value={formatBRL(t.subtotal)} />
        {t.discount > 0 && <Row label={`Cupom ${t.coupon?.code}`} value={`− ${formatBRL(t.discount)}`} accent />}
        <Row
          label="Frete"
          value={shippingLabel === null || shippingLabel === undefined ? "Calcule com o CEP" : shippingLabel}
          muted={shippingLabel === null || shippingLabel === undefined}
        />
      </dl>
      <div className="my-5">
        <Stitch />
      </div>
      <div className="flex items-baseline justify-between">
        <span className="label-lg">Total</span>
        <span className="font-mono text-[1.35rem]">{formatBRL(t.total)}</span>
      </div>
      <p className="mt-1 text-right text-small text-indigo/60">
        {parcel.n > 1 ? `ou ${parcel.n}× de ${formatBRL(parcel.value)} sem juros` : "à vista"}
      </p>
      {t.pieces > 0 && (
        <p className="mt-5 flex items-center gap-2.5 text-small text-araucaria">
          <Icon name="broto" size={18} /> Este pedido planta {t.pieces} {t.pieces === 1 ? "araucária" : "araucárias"}.
        </p>
      )}
      {showCoupon && <CouponForm />}
    </div>
  );
}

function Row({ label, value, accent, muted }: { label: string; value: string; accent?: boolean; muted?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-indigo/75">{label}</dt>
      <dd className={`font-mono text-[13px] ${accent ? "text-pinhao" : ""} ${muted ? "text-indigo/50" : ""}`}>{value}</dd>
    </div>
  );
}

export function CouponForm() {
  const coupon = useCart((s) => s.coupon);
  const setCoupon = useCart((s) => s.setCoupon);
  const [error, setError] = useState<string | null>(null);
  const applied = findCoupon(coupon);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get("cupom") ?? "");
    if (!code.trim()) return;
    const found = findCoupon(code);
    if (!found) {
      setError("Esse cupom não existe. Confira as letras, por favor.");
      return;
    }
    setError(null);
    setCoupon(found.code);
    e.currentTarget.reset();
  }

  if (applied) {
    return (
      <div className="mt-6 flex items-center justify-between gap-3 border border-dashed border-cobre px-4 py-3">
        <p className="text-small">
          <span className="label">{applied.code}</span> · {applied.label}
        </p>
        <button type="button" onClick={() => setCoupon(null)} className="label text-indigo/60 hover:text-pinhao">
          Remover
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6" noValidate>
      <label htmlFor="cupom" className="label text-indigo/70">
        Cupom
      </label>
      <div className="mt-2 flex border-b border-indigo/30 focus-within:border-indigo">
        <input
          id="cupom"
          name="cupom"
          autoComplete="off"
          placeholder="Ex.: PERMANENCIA10"
          aria-invalid={!!error || undefined}
          aria-describedby="cupom-erro"
          className="min-w-0 flex-1 bg-transparent py-2 font-mono text-[13px] uppercase tracking-[0.06em] placeholder:normal-case placeholder:tracking-normal placeholder:text-indigo/40 focus:outline-none"
        />
        <button type="submit" className="label px-2 hover:text-cobre">
          Aplicar
        </button>
      </div>
      <p id="cupom-erro" role="status" className="label mt-2 min-h-4 text-pinhao">
        {error}
      </p>
    </form>
  );
}
