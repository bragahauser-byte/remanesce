"use client";

import { useState, type FormEvent } from "react";
import { lookupCep, maskCep, shippingOptions, type Address, type ShippingOption } from "@/lib/checkout";
import { formatBRL } from "@/lib/format";

/** Estimativa de frete pelo CEP (ViaCEP + tabela simulada por região). */
export function ShippingEstimate({
  subtotal,
  freeByCoupon,
  selected,
  onSelect,
}: {
  subtotal: number;
  freeByCoupon: boolean;
  selected: ShippingOption["id"] | null;
  onSelect: (option: ShippingOption | null) => void;
}) {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error" | "notfound">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length !== 8) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const found = await lookupCep(cep);
      if (!found) {
        setState("notfound");
        setAddress(null);
        onSelect(null);
        return;
      }
      setAddress(found);
      setState("idle");
      onSelect(shippingOptions(found.state, subtotal, freeByCoupon)[0]);
    } catch {
      setState("error");
    }
  }

  const options = address ? shippingOptions(address.state, subtotal, freeByCoupon) : [];

  return (
    <div>
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="cep-estimativa" className="label text-tinta/70">
          Calcular frete
        </label>
        <div className="mt-2 flex max-w-sm border-b border-tinta/30 focus-within:border-tinta">
          <input
            id="cep-estimativa"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(maskCep(e.target.value))}
            className="min-w-0 flex-1 bg-transparent py-2 font-mono text-[14px] tracking-[0.06em] focus:outline-none"
          />
          <button type="submit" className="label px-2 hover:text-cobre" disabled={state === "loading"}>
            {state === "loading" ? "Buscando…" : "Calcular"}
          </button>
        </div>
        <p role="status" className="label mt-2 min-h-4 text-pinhao">
          {state === "error" && "Confira o CEP, por favor."}
          {state === "notfound" && "Não encontramos esse CEP. Confira os números, por favor."}
        </p>
      </form>
      {address && (
        <fieldset className="mt-2">
          <legend className="text-small text-tinta/70">
            {address.city} · {address.state}
          </legend>
          <div className="mt-3 grid gap-2">
            {options.map((o) => (
              <label
                key={o.id}
                className="flex cursor-pointer items-center justify-between gap-4 border border-tinta/15 px-4 py-3 has-checked:border-tinta"
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="frete-estimativa"
                    checked={selected === o.id}
                    onChange={() => onSelect(o)}
                    className="accent-tinta"
                  />
                  <span>
                    <span className="label block">{o.label}</span>
                    <span className="text-small text-tinta/60">{o.days}</span>
                  </span>
                </span>
                <span className="font-mono text-[13px]">{o.price === 0 ? "Grátis" : formatBRL(o.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
