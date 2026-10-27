import { BrandSymbol, Logo } from "@/components/brand/logo";
import { Diamond, FrayedEdge, Stitch } from "@/components/brand/textures";
import { Icon, iconNames } from "@/components/icons/icon";
import { brand } from "@/data/copy";

// Página provisória da Fase 1. A Início definitiva entra na Fase 4.
export default function Home() {
  return (
    <div className="pt-header">
      <section className="container-x py-24">
        <p className="label text-cobre">{brand.collectionLabel}</p>
        <h1 className="serif mt-6 text-display text-casca">
          Tudo muda. <em>Nada</em> se perde.
        </h1>
        <p className="mt-8 max-w-xl text-body">{brand.description}</p>
        <div className="mt-12 flex flex-wrap items-end gap-12">
          <Logo variant="horizontal" className="text-2xl" symbolSize={44} />
          <Logo variant="stacked" className="text-xl" symbolSize={64} />
          <BrandSymbol size={96} />
        </div>
      </section>
      <Stitch />
      <section className="container-x grid grid-cols-4 gap-6 py-16 sm:grid-cols-6 md:grid-cols-10">
        {iconNames.map((n) => (
          <div key={n} className="flex flex-col items-center gap-3">
            <Icon name={n} size={32} filled={n === "pinhao"} />
            <span className="label text-[10px]">{n}</span>
          </div>
        ))}
      </section>
      <section className="relative bg-indigo text-linho">
        <div className="tex-sarja">
          <div className="container-x grid gap-6 py-20 md:grid-cols-3">
            <div className="tex-escamas h-48 border border-linho/10" />
            <div className="tex-escamas-lg h-48 border border-linho/10" />
            <div className="flex items-center gap-4">
              <Diamond size={14} /> <span className="label">Vermelho por dentro</span>
            </div>
          </div>
        </div>
        <FrayedEdge className="absolute inset-x-0 top-full" />
      </section>
    </div>
  );
}
