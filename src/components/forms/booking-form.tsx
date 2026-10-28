"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Field } from "@/components/checkout/field";
import { Icon } from "@/components/icons/icon";
import { maskPhone, onlyDigits } from "@/lib/checkout";
import { formatDate } from "@/lib/format";
import { useAccount, type Booking } from "@/lib/store/account";

const newProtocol = () => `SRV-${Math.floor(10000 + Math.random() * 90000)}`;

const times = ["10:00", "11:30", "14:00", "15:30", "17:00"];

const schema = z.object({
  date: z
    .string()
    .min(1, "Escolha uma data.")
    .refine((v) => new Date(`${v}T12:00:00`) > new Date(), "Escolha uma data a partir de amanhã.")
    .refine((v) => new Date(`${v}T12:00:00`).getDay() !== 0, "O ateliê não abre aos domingos."),
  time: z.string().min(1, "Escolha um horário."),
  name: z.string().trim().min(2, "Conte seu nome, por favor."),
  email: z.string().trim().email("Confira o e-mail, por favor."),
  phone: z.string().refine((v) => onlyDigits(v).length >= 10, "Confira o telefone, com DDD."),
  description: z.string().trim().max(600).optional(),
});
type Data = z.infer<typeof schema>;

/** Agendamento de um Serviço de Permanência: gera protocolo e salva em Minha Remanesce. */
export function BookingForm({ service, label }: { service: Booking["service"]; label: string }) {
  const user = useAccount((s) => s.user);
  const book = useAccount((s) => s.book);
  const [done, setDone] = useState<Booking | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({ resolver: zodResolver(schema), mode: "onTouched", values: user ? ({ name: user.name, email: user.email } as Data) : undefined });
  const phone = register("phone");

  function submit(data: Data) {
    const booking: Booking = {
      protocol: newProtocol(),
      service,
      serviceLabel: label,
      date: data.date,
      time: data.time,
      name: data.name,
      email: data.email,
      phone: data.phone,
      description: data.description ?? "",
      createdAt: new Date().toISOString(),
    };
    book(booking);
    setDone(booking);
  }

  if (done) {
    return (
      <div role="status" className="border border-dashed border-cobre p-6 md:p-8">
        <p className="label text-cobre">Protocolo {done.protocol}</p>
        <p className="serif mt-3 text-h4">Agendado: {done.serviceLabel}.</p>
        <p className="mt-2 flex items-center gap-2 text-tinta/75">
          <Icon name="calendario" size={18} /> {formatDate(done.date, { weekday: "long", day: "numeric", month: "long" })} às {done.time}
        </p>
        <div className="mt-6 flex flex-wrap gap-6">
          <Link href="/conta?aba=servicos" className="label link-stitch">
            Ver em Minha Remanesce
          </Link>
          <button
            type="button"
            onClick={() => {
              setDone(null);
              reset();
            }}
            className="label link-stitch"
          >
            Novo agendamento
          </button>
        </div>
      </div>
    );
  }

  const id = (n: string) => `${service}-${n}`;
  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-7 sm:grid-cols-2">
      <Field id={id("data")} label="Data" type="date" {...register("date")} error={errors.date?.message} />
      <div>
        <label htmlFor={id("horario")} className="label text-tinta/70">
          Horário
        </label>
        <select
          id={id("horario")}
          {...register("time")}
          defaultValue=""
          className="mt-1.5 block w-full border-b border-tinta/30 bg-transparent py-2.5 font-mono text-[14px] focus:border-tinta focus:outline-none"
        >
          <option value="" disabled>
            Escolha
          </option>
          {times.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.time && <p className="label mt-1.5 text-pinhao">{errors.time.message}</p>}
      </div>
      <Field id={id("nome")} label="Nome" autoComplete="name" {...register("name")} error={errors.name?.message} />
      <Field id={id("email")} label="E-mail" type="email" autoComplete="email" {...register("email")} error={errors.email?.message} />
      <Field
        id={id("telefone")}
        label="Telefone"
        type="tel"
        mono
        {...phone}
        onChange={(e) => {
          e.target.value = maskPhone(e.target.value);
          phone.onChange(e);
        }}
        error={errors.phone?.message}
      />
      <div className="sm:col-span-2">
        <label htmlFor={id("descricao")} className="label text-tinta/70">
          Conte sobre a peça (opcional)
        </label>
        <textarea
          id={id("descricao")}
          rows={3}
          {...register("description")}
          className="mt-1.5 block w-full resize-y border-b border-tinta/30 bg-transparent py-2.5 focus:border-tinta focus:outline-none"
        />
      </div>
      <button type="submit" className="label-lg flex h-13 items-center justify-center gap-3 bg-tinta text-branco hover:bg-preto sm:w-fit sm:px-10">
        Agendar <Icon name="calendario" size={20} />
      </button>
    </form>
  );
}
