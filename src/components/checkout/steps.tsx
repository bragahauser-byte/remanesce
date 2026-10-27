"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Icon } from "@/components/icons/icon";
import { lookupCep, maskCep, maskCpf, maskPhone, onlyDigits, shippingOptions } from "@/lib/checkout";
import { deliverySchema, identitySchema, type Delivery, type Identity } from "@/lib/checkout-schemas";
import { formatBRL } from "@/lib/format";
import { Field } from "./field";

const nextButton =
  "label-lg mt-10 flex h-14 w-full items-center justify-center gap-3 bg-indigo text-linho transition-colors hover:bg-denim disabled:opacity-50 sm:w-auto sm:px-10";

/* ------------------------------------------------------- 1. Identificação */

export function IdentityStep({ defaults, onNext }: { defaults?: Partial<Identity>; onNext: (data: Identity) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Identity>({ resolver: zodResolver(identitySchema), defaultValues: defaults, mode: "onTouched" });
  const cpf = register("cpf");
  const phone = register("phone");

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <h2 className="serif text-h3 text-casca">Quem recebe esta peça?</h2>
      <div className="mt-8 grid gap-7 sm:grid-cols-2">
        <Field label="Nome completo" autoComplete="name" {...register("name")} error={errors.name?.message} className="sm:col-span-2" />
        <Field label="E-mail" type="email" autoComplete="email" {...register("email")} error={errors.email?.message} className="sm:col-span-2" />
        <Field
          label="CPF"
          inputMode="numeric"
          mono
          placeholder="000.000.000-00"
          {...cpf}
          onChange={(e) => {
            e.target.value = maskCpf(e.target.value);
            cpf.onChange(e);
          }}
          error={errors.cpf?.message}
        />
        <Field
          label="Telefone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          mono
          placeholder="(41) 90000-0000"
          {...phone}
          onChange={(e) => {
            e.target.value = maskPhone(e.target.value);
            phone.onChange(e);
          }}
          error={errors.phone?.message}
        />
      </div>
      <button type="submit" className={nextButton}>
        Continuar para entrega <Icon name="seta" size={22} />
      </button>
    </form>
  );
}

/* -------------------------------------------------------------- 2. Entrega */

export function DeliveryStep({
  defaults,
  subtotal,
  freeByCoupon,
  onShipping,
  onNext,
}: {
  defaults?: Partial<Delivery>;
  subtotal: number;
  freeByCoupon: boolean;
  onShipping: (state: string | null, id: Delivery["shipping"] | null) => void;
  onNext: (data: Delivery) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Delivery>({ resolver: zodResolver(deliverySchema), defaultValues: { shipping: "padrao", ...defaults }, mode: "onTouched" });
  const [lookup, setLookup] = useState<"idle" | "loading" | "ok">(defaults?.street ? "ok" : "idle");
  const cep = register("cep");
  const uf = useWatch({ control, name: "state" });
  const shipping = useWatch({ control, name: "shipping" });
  const options = uf && uf.length === 2 ? shippingOptions(uf, subtotal, freeByCoupon) : [];

  async function fillFromCep(value: string) {
    if (onlyDigits(value).length !== 8) return;
    setLookup("loading");
    try {
      const address = await lookupCep(value);
      if (!address) {
        setError("cep", { message: "Não encontramos esse CEP. Confira os números, por favor." });
        setLookup("idle");
        onShipping(null, null);
        return;
      }
      clearErrors("cep");
      setValue("street", address.street, { shouldValidate: !!address.street });
      setValue("district", address.district, { shouldValidate: !!address.district });
      setValue("city", address.city, { shouldValidate: true });
      setValue("state", address.state, { shouldValidate: true });
      setLookup("ok");
      onShipping(address.state, shipping ?? "padrao");
      setTimeout(() => setFocus(address.street ? "number" : "street"), 50);
    } catch {
      setError("cep", { message: "Não conseguimos consultar o CEP agora. Preencha o endereço, por favor." });
      setLookup("ok");
    }
  }

  return (
    <form onSubmit={handleSubmit(onNext)} noValidate>
      <h2 className="serif text-h3 text-casca">Para onde ela vai?</h2>
      <div className="mt-8 grid gap-7 sm:grid-cols-6">
        <Field
          label="CEP"
          inputMode="numeric"
          autoComplete="postal-code"
          mono
          placeholder="00000-000"
          {...cep}
          onChange={(e) => {
            e.target.value = maskCep(e.target.value);
            cep.onChange(e);
            fillFromCep(e.target.value);
          }}
          error={errors.cep?.message}
          hint={
            lookup === "loading" ? (
              "Buscando endereço…"
            ) : (
              <a href="https://buscacepinter.correios.com.br/" target="_blank" rel="noreferrer" className="underline underline-offset-4">
                Não sei meu CEP
              </a>
            )
          }
          className="sm:col-span-2"
        />
        <div className="hidden sm:col-span-4 sm:block" />
        {lookup !== "idle" && (
          <>
            <Field label="Rua" autoComplete="address-line1" {...register("street")} error={errors.street?.message} className="sm:col-span-4" />
            <Field label="Número" inputMode="numeric" {...register("number")} error={errors.number?.message} className="sm:col-span-2" />
            <Field label="Complemento (opcional)" autoComplete="address-line2" {...register("complement")} className="sm:col-span-3" />
            <Field label="Bairro" {...register("district")} error={errors.district?.message} className="sm:col-span-3" />
            <Field label="Cidade" autoComplete="address-level2" {...register("city")} error={errors.city?.message} className="sm:col-span-4" />
            <Field
              label="UF"
              autoComplete="address-level1"
              maxLength={2}
              {...register("state", { onChange: (e) => onShipping(e.target.value.toUpperCase(), shipping) })}
              error={errors.state?.message}
              className="sm:col-span-2"
            />
          </>
        )}
      </div>

      {options.length > 0 && (
        <fieldset className="mt-10">
          <legend className="label text-indigo/70">Entrega</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {options.map((o) => (
              <label
                key={o.id}
                className="flex cursor-pointer items-start justify-between gap-4 border border-indigo/15 p-4 transition-colors has-checked:border-indigo has-checked:bg-linho-escuro/50"
              >
                <span className="flex items-start gap-3">
                  <input
                    type="radio"
                    value={o.id}
                    {...register("shipping", { onChange: () => onShipping(uf, o.id) })}
                    className="mt-1 accent-indigo"
                  />
                  <span>
                    <span className="label-lg flex items-center gap-2">
                      <Icon name="caminhao" size={18} /> {o.label}
                    </span>
                    <span className="mt-1 block text-small text-indigo/60">{o.days}</span>
                  </span>
                </span>
                <span className="font-mono text-[13px]">{o.price === 0 ? "Grátis" : formatBRL(o.price)}</span>
              </label>
            ))}
          </div>
          {errors.shipping && <p className="label mt-2 text-pinhao">{errors.shipping.message}</p>}
        </fieldset>
      )}

      <button type="submit" className={nextButton} disabled={lookup === "loading"}>
        Continuar para pagamento <Icon name="seta" size={22} />
      </button>
    </form>
  );
}
