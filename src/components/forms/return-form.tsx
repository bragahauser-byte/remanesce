"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Field } from "@/components/checkout/field";
import { Icon } from "@/components/icons/icon";

const schema = z.object({
  name: z.string().trim().min(2, "Conte seu nome, por favor."),
  email: z.string().trim().email("Confira o e-mail, por favor."),
  piece: z.string().trim().min(3, "Conte um pouco sobre a peça."),
});
type Data = z.infer<typeof schema>;

/** "Devolva e Renasça": cadastro de um jeans antigo para virar escamas (simulado). */
export function ReturnForm() {
  const [sent, setSent] = useState<Data | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({ resolver: zodResolver(schema), mode: "onTouched" });

  if (sent) {
    return (
      <div role="status" className="border border-dashed border-branco/40 p-8">
        <Icon name="broto" size={32} />
        <p className="serif mt-4 text-h4">Obrigado, {sent.name.split(" ")[0]}.</p>
        <p className="mt-2 text-branco/80">
          Seu jeans vai virar escamas. Enviamos as instruções de envio para {sent.email}. Quando ele chegar, você ganha R$ 100 de crédito.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            reset();
          }}
          className="label link-stitch mt-6"
        >
          Cadastrar outra peça
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(setSent)} noValidate className="grid gap-7 sm:grid-cols-2 [&_input]:border-branco/30 [&_input]:text-branco [&_label]:text-branco/70">
      <Field label="Nome" autoComplete="name" {...register("name")} error={errors.name?.message} />
      <Field label="E-mail" type="email" autoComplete="email" {...register("email")} error={errors.email?.message} />
      <Field label="A peça (ex.: calça jeans da minha mãe, anos 90)" {...register("piece")} error={errors.piece?.message} className="sm:col-span-2" />
      <button type="submit" className="label-lg flex h-13 items-center justify-center gap-3 bg-branco text-tinta hover:bg-papel sm:col-span-2 sm:w-fit sm:px-10">
        Quero devolver e renascer <Icon name="seta" size={22} />
      </button>
    </form>
  );
}
