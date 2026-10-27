import Link from "next/link";
import { BrandSymbol } from "@/components/brand/logo";
import { FrayedEdge } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { TreesPlanted } from "@/components/shop/trees-planted";
import { brand, microcopy, navLinks } from "@/data/copy";
import { Newsletter } from "./newsletter";

const shopLinks = [
  { href: "/loja", label: "Toda a loja" },
  { href: "/loja?cat=saias", label: "Saias" },
  { href: "/loja?cat=calcas", label: "Calças" },
  { href: "/loja?cat=jaquetas", label: "Jaquetas" },
  { href: "/sacola", label: "Sacola" },
  { href: "/conta", label: "Minha Remanesce" },
];

export function Footer() {
  return (
    <footer className="no-print relative mt-section bg-indigo text-linho">
      <FrayedEdge side="top" className="absolute inset-x-0 bottom-full" />
      <div className="tex-sarja">
        <div className="container-x grid gap-16 pb-32 pt-20 md:grid-cols-12 md:gap-10 md:pb-16 md:pt-28">
          <div className="md:col-span-5">
            <Newsletter />
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="label text-linho/60">Araucárias plantadas</p>
            <p className="serif mt-3 text-h2 leading-none">
              <TreesPlanted />
            </p>
            <p className="mt-4 max-w-xs text-small text-linho/70">
              Cada peça vendida planta uma muda no Paraná.{" "}
              <Link href="/raiz" className="link-stitch text-linho">
                Conheça a Raiz
              </Link>
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:col-span-3 md:col-start-10 md:grid-cols-1">
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small text-linho/80 hover:text-cobre">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5 md:hidden">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-small text-linho/80 hover:text-cobre">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="container-x">
          <div className="stitch-x opacity-60" />
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-5">
              <BrandSymbol size={52} />
              <div>
                <p className="wordmark text-xl">Remanesce</p>
                <p className="serif mt-1 italic text-linho/70">{brand.signature}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-small text-linho/60 md:items-end">
              <a href={brand.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cobre">
                <Icon name="instagram" size={18} /> @remanesce
              </a>
              <p>
                {brand.city} · CNPJ {brand.cnpj}
              </p>
              <p className="label text-linho/50">{microcopy.academic}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
