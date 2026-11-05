"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useId, useState } from "react";
import { brand, microcopy, newsletter } from "@/data/copy";
import { asset } from "@/lib/paths";

const about = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Raiz · a lenda", href: "/raiz" },
  { label: "A coleção", href: "/" },
  { label: "Manual da marca", href: "/marca" },
];

const help = [
  { label: "Contato", href: "/contato" },
  { label: "Sacola", href: "/sacola" },
  { label: "Fale por e-mail", href: `mailto:${brand.email}` },
];

/** Título de coluna em PP Pangaia, como "About" e "Assistance" da tela de rodapé. */
const heading = "t-title font-display font-extralight";
const link = "label block py-2 transition-opacity duration-300 ease-in-out hover:opacity-50";

/**
 * Rodapé (tela PRODUTO SCROLL 5, sem o bege: tudo branco). Três colunas na grade
 * (Sobre, Atendimento e a newsletter), a Sugar apple e o © no pé.
 */
export function SiteFooter() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "invalid">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Projeto acadêmico: nada é enviado, só a confirmação na tela.
    setState(/^\S+@\S+\.\S+$/.test(email) ? "ok" : "invalid");
  };

  return (
    <footer className="mt-24 border-t border-line bg-[#fff] text-[#111] lg:mt-40">
      <div className="grid-site min-h-[70dvh] content-between gap-y-12 pb-[var(--pad)] pt-8 lg:pt-10">
        <nav aria-label="Sobre" className="col-span-3 lg:col-span-4">
          <p className={heading}>Sobre</p>
          <ul className="mt-6 lg:mt-8">
            {about.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Atendimento" className="col-span-3 lg:col-span-4 lg:col-start-6">
          <p className={heading}>Atendimento</p>
          <ul className="mt-6 lg:mt-8">
            {help.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 lg:col-span-4 lg:col-start-10">
          <p className={heading}>
            {newsletter.title}
            <br />
            Inscreva-se.
          </p>
          <form onSubmit={submit} noValidate className="mt-6 lg:mt-8">
            <label htmlFor={`${id}-email`} className="sr-only">
              Seu e-mail
            </label>
            <div className="flex items-center border-b border-[#111]">
              <input
                id={`${id}-email`}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setState("idle");
                }}
                placeholder="Seu e-mail"
                className="t-lead min-h-11 w-full bg-transparent font-display font-extralight outline-none placeholder:text-muted"
              />
              <button type="submit" className="label min-h-11 shrink-0 pl-4 transition-opacity hover:opacity-50">
                {newsletter.button}
              </button>
            </div>
            <p role="status" aria-live="polite" className="t-caption mt-2 min-h-4 text-muted">
              {state === "ok" && newsletter.success}
              {state === "invalid" && newsletter.invalid}
            </p>
          </form>
          <a href={brand.instagram} target="_blank" rel="noreferrer" className={`${link} mt-4 inline-flex items-center gap-3`}>
            Siga no Instagram
            <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
        </div>

        <div className="col-span-6 lg:col-span-14">
          <img src={asset("/images/marca/sugar-apple.webp")} alt="" width={320} height={325} className="mb-6 h-auto w-16 lg:w-[clamp(64px,5.6vw,112px)]" />
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <p className="nav-text">© 2026 Remanesce</p>
            <p className="t-caption text-muted">{microcopy.academic}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
