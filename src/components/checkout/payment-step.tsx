"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Icon } from "@/components/icons/icon";
import { microcopy } from "@/data/copy";
import { cardBrand, DECLINED_TEST_CARD, maskCard, maskExpiry, onlyDigits, pixPayload } from "@/lib/checkout";
import { cardSchema, type Card, type CardInput } from "@/lib/checkout-schemas";
import { formatBRL, installments, MAX_INSTALLMENTS } from "@/lib/format";
import { Field } from "./field";

export type Payment = { method: "pix" | "card"; installments: number; brand?: string; last4?: string };

const PIX_SECONDS = 15 * 60;

export function PaymentStep({ total, orderId, onPay }: { total: number; orderId: string; onPay: (p: Payment) => void }) {
  const [method, setMethod] = useState<"pix" | "card">("pix");

  return (
    <div>
      <h2 className="serif text-h3 text-tinta">Como você prefere pagar?</h2>
      <div role="tablist" aria-label="Forma de pagamento" className="mt-8 grid grid-cols-2 border border-tinta/20">
        {(
          [
            ["pix", "Pix", "pix"],
            ["card", "Cartão de crédito", "cartao"],
          ] as const
        ).map(([key, label, icon]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={method === key}
            onClick={() => setMethod(key)}
            className="label-lg flex h-14 items-center justify-center gap-2.5 transition-colors aria-selected:bg-tinta aria-selected:text-branco"
          >
            <Icon name={icon} size={20} /> {label}
          </button>
        ))}
      </div>
      <div className="mt-8">{method === "pix" ? <PixPanel total={total} orderId={orderId} onPay={onPay} /> : <CardPanel total={total} onPay={onPay} />}</div>
      <p className="label mt-8 flex items-center gap-2 text-tinta/55">
        <Icon name="cadeado" size={16} /> {microcopy.demo}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- Pix */

function PixPanel({ total, orderId, onPay }: { total: number; orderId: string; onPay: (p: Payment) => void }) {
  const [round, setRound] = useState(0);
  const payload = pixPayload(`${orderId}-${round}`, total);
  const [qr, setQr] = useState<string | null>(null);
  const [left, setLeft] = useState(PIX_SECONDS);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    let alive = true;
    QRCode.toDataURL(payload, { margin: 1, width: 440, color: { dark: "#161B27", light: "#F1EDE4" } }).then((url) => alive && setQr(url));
    return () => {
      alive = false;
    };
  }, [payload]);

  useEffect(() => {
    const t0 = Date.now();
    const id = window.setInterval(() => setLeft(Math.max(0, PIX_SECONDS - Math.floor((Date.now() - t0) / 1000))), 1000);
    return () => window.clearInterval(id);
  }, [round]);

  const expired = left === 0;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  async function copy() {
    await navigator.clipboard?.writeText(payload).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  function regenerate() {
    setRound((r) => r + 1);
    setLeft(PIX_SECONDS);
  }

  function paid() {
    setConfirming(true);
    window.setTimeout(() => onPay({ method: "pix", installments: 1 }), 1400);
  }

  return (
    <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:items-start">
      <div className="relative aspect-square w-full max-w-[220px] bg-branco p-2 ring-1 ring-tinta/15">
        {/* eslint-disable-next-line @next/next/no-img-element -- QR gerado em data URL */}
        {qr && <img src={qr} alt={`QR Code Pix de ${formatBRL(total)} (exemplo)`} className={`h-full w-full ${expired ? "opacity-15" : ""}`} />}
        {expired && <p className="label absolute inset-0 grid place-items-center text-center text-pinhao">Código expirado</p>}
      </div>
      <div>
        <p className="font-mono text-[1.35rem]">{formatBRL(total)}</p>
        <p className="mt-1 text-small text-tinta/70">Abra o app do seu banco, escolha Pix e leia o QR Code ou cole o código.</p>
        <p className="label mt-4" aria-live="off">
          {expired ? (
            <span className="text-pinhao">O código expirou.</span>
          ) : (
            <>
              Expira em <span className="tabular-nums">{mm}:{ss}</span>
            </>
          )}
        </p>
        <div className="mt-4 flex border border-tinta/20">
          <input readOnly value={payload} aria-label="Código Pix copia e cola" className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-[11px] text-tinta/70" />
          <button type="button" onClick={copy} className="label flex shrink-0 items-center gap-2 border-l border-tinta/20 px-4 hover:text-cobre">
            <Icon name={copied ? "check" : "copiar"} size={16} /> {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <p className="sr-only" role="status">
          {copied ? "Código copiado." : ""}
        </p>
        {expired ? (
          <button type="button" onClick={regenerate} className="label-lg mt-6 flex h-14 w-full items-center justify-center gap-3 border border-tinta hover:bg-tinta hover:text-branco">
            Gerar novo código
          </button>
        ) : (
          <button
            type="button"
            onClick={paid}
            disabled={confirming}
            className="label-lg mt-6 flex h-14 w-full items-center justify-center gap-3 bg-tinta text-branco hover:bg-preto disabled:opacity-70"
          >
            {confirming ? "Confirmando pagamento…" : "Já paguei"}
            {!confirming && <Icon name="check" size={20} />}
          </button>
        )}
        <p className="mt-3 text-small text-tinta/55">Pagamento simulado: o QR Code é um exemplo e não gera cobrança.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Cartão */

function CardPanel({ total, onPay }: { total: number; onPay: (p: Payment) => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CardInput, unknown, Card>({ resolver: zodResolver(cardSchema), defaultValues: { installments: installments(total).n }, mode: "onTouched" });
  const [state, setState] = useState<"idle" | "processing" | "declined">("idle");
  const number = register("number");
  const expiry = register("expiry");
  const brand = cardBrand(useWatch({ control, name: "number" }) ?? "");
  const maxN = installments(total, MAX_INSTALLMENTS).n;

  function submit(data: Card) {
    setState("processing");
    // Nada do cartão é salvo: só bandeira e 4 últimos dígitos seguem para o pedido.
    const digits = onlyDigits(data.number);
    window.setTimeout(() => {
      if (digits === DECLINED_TEST_CARD) {
        setState("declined");
        return;
      }
      onPay({ method: "card", installments: data.installments, brand: cardBrand(digits) ?? undefined, last4: digits.slice(-4) });
    }, 1600);
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate autoComplete="on">
      {state === "declined" && (
        <div role="alert" className="mb-8 border-l-2 border-pinhao bg-pinhao/5 px-5 py-4">
          <p className="label-lg text-pinhao">Pagamento recusado</p>
          <p className="mt-1 text-small">
            O banco emissor não autorizou esta compra (simulação). Confira os dados, tente outro cartão ou pague com Pix.
          </p>
        </div>
      )}
      <div className="grid gap-7 sm:grid-cols-6">
        <Field
          label="Número do cartão"
          inputMode="numeric"
          autoComplete="cc-number"
          mono
          placeholder="0000 0000 0000 0000"
          {...number}
          onChange={(e) => {
            e.target.value = maskCard(e.target.value);
            number.onChange(e);
          }}
          error={errors.number?.message}
          hint={brand ? `Bandeira: ${brand}` : "Teste: 4242 4242 4242 4242 aprova · 4000 0000 0000 0002 recusa"}
          className="sm:col-span-6"
        />
        <Field label="Nome impresso no cartão" autoComplete="cc-name" {...register("holder")} error={errors.holder?.message} className="sm:col-span-6" />
        <Field
          label="Validade"
          inputMode="numeric"
          autoComplete="cc-exp"
          mono
          placeholder="MM/AA"
          {...expiry}
          onChange={(e) => {
            e.target.value = maskExpiry(e.target.value);
            expiry.onChange(e);
          }}
          error={errors.expiry?.message}
          className="sm:col-span-3"
        />
        <Field
          label="CVV"
          inputMode="numeric"
          autoComplete="cc-csc"
          mono
          maxLength={4}
          placeholder="000"
          {...register("cvv")}
          error={errors.cvv?.message}
          className="sm:col-span-3"
        />
        <div className="sm:col-span-6">
          <label htmlFor="installments" className="label text-tinta/70">
            Parcelas
          </label>
          <select
            id="installments"
            {...register("installments")}
            className="mt-1.5 block w-full border-b border-tinta/30 bg-transparent py-2.5 font-mono text-[14px] focus:border-tinta focus:outline-none"
          >
            {Array.from({ length: maxN }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}× de {formatBRL(Math.ceil(total / n))} sem juros
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={state === "processing"}
        className="label-lg mt-10 flex h-14 w-full items-center justify-center gap-3 bg-tinta text-branco hover:bg-preto disabled:opacity-70"
      >
        {state === "processing" ? "Processando…" : `Pagar ${formatBRL(total)}`}
        {state !== "processing" && <Icon name="cadeado" size={18} />}
      </button>
    </form>
  );
}
