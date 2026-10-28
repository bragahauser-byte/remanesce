import Image from "next/image";
import Link from "next/link";
import { BrandSymbol } from "@/components/brand/logo";
import { Icon } from "@/components/icons/icon";
import { TreesPlanted } from "@/components/shop/trees-planted";
import { brand, microcopy, navLinks } from "@/data/copy";
import { asset } from "@/lib/paths";
import { Newsletter } from "./newsletter";

const shopLinks = [
  { href: "/loja", label: "Toda a coleção" },
  { href: "/loja?cat=saias", label: "Saias" },
  { href: "/loja?cat=calcas", label: "Calças" },
  { href: "/loja?cat=jaquetas", label: "Jaquetas" },
  { href: "/sacola", label: "Sacola" },
  { href: "/conta", label: "Minha Remanesce" },
];

/** Rodapé (Grace + FARM): faixa de foto em gradiente e bloco preto quente. */
export function Footer() {
  return (
    <footer className="no-print mt-section text-papel">
      <div aria-hidden className="relative h-[34vh] min-h-56 overflow-hidden bg-preto">
        <Image
          src={asset("/images/lineup/lineup-costas.jpg")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[50%_62%] opacity-80 [filter:sepia(0.25)_saturate(0.9)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(24_21_8/0)_0%,rgb(101_4_16/0.18)_55%,#181508_100%)]" />
        <p className="kicker absolute bottom-6 left-[var(--spacing-gutter)] text-[clamp(1.6rem,4vw,3rem)] text-papel">{brand.signature}</p>
      </div>

      <div className="tex-pontos bg-preto">
        <div className="container-x grid gap-14 pb-32 pt-16 md:grid-cols-12 md:gap-10 md:pb-14 md:pt-20">
          <div className="md:col-span-5">
            <Newsletter />
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="label text-papel/55">Araucárias plantadas</p>
            <p className="serif mt-3 text-h2 leading-none">
              <TreesPlanted />
            </p>
            <p className="mt-4 max-w-xs text-small text-papel/70">
              Cada peça vendida planta uma muda no Paraná.{" "}
              <Link href="/raiz" className="underline underline-offset-4 hover:opacity-70">
                Conheça a Raiz
              </Link>
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:col-span-3 md:col-start-10 md:grid-cols-1">
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small text-papel/80 hover:text-papel">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 md:hidden">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small text-papel/80 hover:text-papel">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="container-x">
          <div className="h-px bg-papel/10" />
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4">
              <BrandSymbol size={44} />
              <div>
                <p className="wordmark text-lg">Remanesce</p>
                <p className="label mt-1 text-papel/50">Coleção 01 · 2026</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-small text-papel/60 md:items-end">
              <a href={brand.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-papel">
                <Icon name="instagram" size={18} /> @remanesce
              </a>
              <p>
                {brand.city} · CNPJ {brand.cnpj}
              </p>
              <p className="label text-papel/45">{microcopy.academic}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
