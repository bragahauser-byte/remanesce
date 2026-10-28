"use client";

import { useRef, useState } from "react";
import { Icon, type IconName } from "@/components/icons/icon";

function useCopied() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    await navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return [copied, copy] as const;
}

type Swatch = { token: string; name: string; hex: string; rgb: string; cmyk: string; use: string; share: number };

/** Amostra de cor: clique copia o HEX. */
export function ColorSwatch({ color, large }: { color: Swatch; large?: boolean }) {
  const [copied, copy] = useCopied();
  const dark = ["indigo", "denim", "casca", "pinhao", "pinhao-vivo", "gralha", "araucaria"].includes(color.token);
  return (
    <button
      type="button"
      onClick={() => copy(color.hex)}
      className={`group flex w-full flex-col text-left ${large ? "sm:col-span-2" : ""}`}
      aria-label={`Copiar ${color.name}, ${color.hex}`}
    >
      <span
        className={`relative flex w-full items-end justify-between p-4 ring-1 ring-tinta/10 ${large ? "h-44" : "h-32"} ${dark ? "text-branco" : "text-tinta"}`}
        style={{ background: color.hex }}
      >
        <span className="label">{copied ? "Copiado" : color.hex}</span>
        <Icon name={copied ? "check" : "copiar"} size={18} className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
      </span>
      <span className="serif mt-3 text-[1.2rem]">{color.name}</span>
      <span className="label mt-1 text-tinta/55">
        RGB {color.rgb} · CMYK {color.cmyk}
      </span>
      <span className="mt-1.5 text-small text-tinta/75">{color.use}</span>
    </button>
  );
}

/** Ícone da grade: clique copia o SVG. */
export function IconTile({ name }: { name: IconName }) {
  const [copied, copy] = useCopied();
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <button
      type="button"
      onClick={() => {
        const svg = ref.current?.querySelector("svg");
        if (svg) copy(svg.outerHTML.replace(/ aria-hidden="true"| focusable="false"/g, ""));
      }}
      className="group flex aspect-square flex-col items-center justify-center gap-3 border border-tinta/10 transition-colors hover:border-cobre"
      aria-label={`Copiar SVG do ícone ${name}`}
    >
      <span ref={ref}>
        <Icon name={name} size={32} filled={name === "pinhao" || name === "losango"} />
      </span>
      <span className="label text-[10px] text-tinta/60 group-hover:text-cobre">{copied ? "SVG copiado" : name}</span>
    </button>
  );
}

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="label-lg no-print flex h-12 items-center gap-3 border border-tinta/25 px-6 hover:border-tinta">
      Baixar PDF do manual <Icon name="seta-baixo" size={18} />
    </button>
  );
}
