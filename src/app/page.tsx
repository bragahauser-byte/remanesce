import Link from "next/link";
import { Diamond, ScalePattern } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { ProductCard } from "@/components/shop/product-card";
import { TreesPlanted } from "@/components/shop/trees-planted";
import { LooksStrip } from "@/components/story/looks-strip";
import { PineconeHero } from "@/components/story/pinecone-hero";
import { FadeIn, RevealLines } from "@/components/story/reveal";
import { ToneController } from "@/components/story/tone";
import { layers, manifesto, raiz, services, servicesIntro } from "@/data/copy";
import { products } from "@/data/products";

const featured = ["saia-guacira", "jaqueta-raiz", "vestido-semente", "lenco-escama"].map((s) => products.find((p) => p.slug === s)!);

export default function Home() {
  return (
    <>
      <ToneController />
      <div data-tone="branco">
        <PineconeHero />
      </div>

      {/* Manifesto */}
      <section data-tone="branco" aria-labelledby="manifesto-titulo" className="container-x py-section">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-cobre md:col-span-3">Manifesto</p>
          <div className="md:col-span-8">
            <RevealLines
              lines={[
                <>
                  Somos feitos do que <em>permanece</em>.
                </>,
              ]}
              className="serif text-h1 text-tinta"
              as="h2"
            />
            <span id="manifesto-titulo" className="sr-only">
              Manifesto
            </span>
            <div className="mt-12 max-w-2xl space-y-6 text-[1.15rem] leading-relaxed md:text-[1.3rem]">
              {manifesto.slice(1).map((p, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <p className={i === manifesto.length - 2 ? "serif text-h4 italic text-tinta" : ""}>{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LooksStrip />

      {/* Três camadas */}
      <section data-tone="preto" aria-labelledby="camadas-titulo" className="tex-sarja relative bg-tinta py-section text-branco">
        <div className="container-x">
          <p className="label text-cobre">O conceito em três camadas</p>
          <RevealLines
            lines={[
              <>
                Permanecer é <em>renascer</em>
              </>,
              "em outra forma.",
            ]}
            className="serif mt-4 max-w-4xl text-h1"
          />
          <span id="camadas-titulo" className="sr-only">
            O conceito em três camadas
          </span>
          <ol className="mt-16 grid gap-px bg-branco/10 md:grid-cols-3">
            {layers.map((l, i) => (
              <li key={l.key} className="bg-tinta">
                <FadeIn delay={i * 120} className="flex h-full flex-col p-8 md:p-10">
                  <Icon name={l.icon} size={44} strokeWidth={1} className={"text-cobre"} />
                  <p className="label mt-10 text-branco/55">{l.label}</p>
                  <h3 className="serif mt-2 text-h3">{l.title}</h3>
                  <p className="mt-4 text-branco/80">{l.line}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
          <Link href="/conceito" className="label link-stitch mt-12 inline-flex items-center gap-3 text-branco">
            Ler a coleção <Icon name="seta" size={20} />
          </Link>
        </div>
      </section>

      {/* Raiz */}
      <section data-tone="preto" aria-labelledby="raiz-titulo" className="relative overflow-hidden bg-preto py-section text-branco">
        <ScalePattern scale={2.4} opacity={0.18} id="escamas-raiz" />
        <div className="container-x relative grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label text-branco/70">Raiz</p>
            <h2 id="raiz-titulo" className="serif mt-4 text-h1">
              {raiz.title.split(",")[0]}, <em>{raiz.title.split(",")[1]?.trim()}</em>
            </h2>
            <p className="mt-6 max-w-md text-[1.15rem] text-branco/80">{raiz.line}</p>
            <Link href="/raiz" className="label-lg mt-10 inline-flex h-13 items-center gap-3 bg-branco px-8 text-tinta hover:bg-papel">
              Conhecer a Raiz <Icon name="seta" size={22} />
            </Link>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="label text-branco/70">Araucárias plantadas</p>
            <p className="serif mt-2 text-[clamp(4rem,10vw,8.5rem)] leading-none">
              <TreesPlanted />
            </p>
            <p className="mt-3 flex items-center gap-2 text-small text-branco/70">
              <Icon name="broto" size={18} /> uma por peça vendida
            </p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section data-tone="branco" aria-labelledby="servicos-titulo" className="container-x py-section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-cobre">Serviços de Permanência</p>
            <RevealLines lines={[servicesIntro]} className="serif mt-4 max-w-3xl text-h2 text-tinta" />
            <span id="servicos-titulo" className="sr-only">
              Serviços de Permanência
            </span>
          </div>
          <Link href="/servicos" className="label link-stitch shrink-0">
            Agendar um serviço
          </Link>
        </div>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.key}>
              <FadeIn delay={i * 100}>
                <Link
                  href={`/servicos#${s.key}`}
                  className="group relative flex h-full min-h-72 flex-col border border-tinta/15 p-8 transition-colors hover:border-transparent"
                >
                  <span aria-hidden className="pointer-events-none absolute inset-2 opacity-0 outline-1 outline-dashed outline-cobre transition-opacity group-hover:opacity-100" />
                  <Icon name={s.icon} size={36} strokeWidth={1} />
                  <h3 className="serif mt-auto pt-12 text-h4">{s.title}</h3>
                  <p className="mt-2 text-small text-tinta/70">{s.line}</p>
                  <Diamond size={6} className="mt-6 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </section>

      {/* Destaques */}
      <section data-tone="branco" aria-labelledby="destaques-titulo" className="container-x pb-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="destaques-titulo" className="serif text-h2 text-tinta">
            Da <em>loja</em>
          </h2>
          <Link href="/loja" className="label link-stitch">
            Ver todas as peças
          </Link>
        </div>
        <ul className="mt-12 grid grid-cols-2 items-end gap-x-3 gap-y-12 md:grid-cols-12 md:gap-x-6">
          {featured.map((p, i) => (
            <li key={p.slug} className={["col-span-2 md:col-span-4", "md:col-span-3", "md:col-span-3", "md:col-span-2"][i]}>
              <ProductCard
                product={p}
                mode={i === 1 || i === 2 ? "detalhe" : "look"}
                aspect={i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"}
                sizes={i === 0 ? "(min-width: 768px) 40vw, 92vw" : "(min-width: 768px) 22vw, 46vw"}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
