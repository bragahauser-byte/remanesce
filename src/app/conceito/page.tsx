import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Diamond, FrayedEdge, ScalePattern, Stitch } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { CycleDiagram } from "@/components/story/cycle-diagram";
import { Legend } from "@/components/story/legend";
import { LineupViewer } from "@/components/story/lineup-viewer";
import { FadeIn, RevealLines } from "@/components/story/reveal";
import { ToneController } from "@/components/story/tone";
import { brand, chapters, conceptToPiece, memories } from "@/data/copy";
import { getLook } from "@/data/looks";

export const metadata: Metadata = {
  title: "O Renascer da Permanência",
  description: "A coleção nasce da pinha da araucária: natureza, memória do Paraná e a lenda de Curiaçu e Guacira, em denim e vermelho.",
};

export default function CollectionPage() {
  const { natureza, memoria, lenda } = chapters;
  return (
    <>
      <ToneController />

      {/* Abertura */}
      <section data-tone="branco" className="container-x flex min-h-[92svh] flex-col justify-end pb-16 pt-[calc(var(--spacing-header)+4rem)]">
        <p className="label text-cobre">{brand.collectionLabel}</p>
        <RevealLines
          as="h1"
          lines={[
            "O Renascer",
            <>
              da <em>Permanência</em>
            </>,
          ]}
          className="serif mt-6 text-display text-tinta"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <p className="max-w-xl text-[1.15rem] leading-relaxed md:col-span-6 md:text-[1.3rem]">
            Uma reflexão sobre o que permanece e renasce de outra forma, mesmo diante das perdas e das transformações da vida.
          </p>
          <nav aria-label="Capítulos" className="flex flex-wrap gap-x-8 gap-y-2 md:col-span-5 md:col-start-8 md:justify-end">
            {[
              ["#natureza", "I · Natureza"],
              ["#memoria", "II · Memória"],
              ["#lenda", "III · Lenda"],
              ["#peca", "Do conceito à peça"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="label link-stitch">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* I. Natureza */}
      <section id="natureza" data-tone="papel" aria-labelledby="natureza-titulo" className="scroll-mt-16 py-section">
        <div className="container-x grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <p className="label text-cobre">{natureza.label}</p>
            <h2 id="natureza-titulo" className="serif mt-3 text-h1 text-tinta">
              {natureza.title}
            </h2>
            <p className="serif mt-6 text-h4 italic text-tinta">{natureza.lead}</p>
            <div className="mt-8 max-w-lg space-y-5">
              {natureza.body.map((p, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <p>{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <CycleDiagram steps={natureza.cycle} />
          </div>
        </div>
      </section>

      {/* II. Memória */}
      <section id="memoria" data-tone="preto" aria-labelledby="memoria-titulo" className="tex-sarja relative scroll-mt-16 bg-preto py-section text-branco">
        <div className="container-x">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="label text-cobre">{memoria.label}</p>
              <h2 id="memoria-titulo" className="serif mt-3 text-h1">
                {memoria.title}
              </h2>
              <p className="serif mt-6 text-h4 italic text-branco/85">{memoria.lead}</p>
              <Icon name="mapa-parana" size={120} strokeWidth={0.6} className="mt-12 text-cobre" />
            </div>
            <div className="space-y-5 text-[1.1rem] leading-relaxed text-branco/85 md:col-span-6 md:col-start-7 md:pt-24">
              {memoria.body.map((p, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <p>{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>

          <h3 className="label mt-24 text-branco/60">Memórias que permanecem</h3>
          {/* Conteúdo de exemplo: memórias fictícias */}
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {memories.map((m, i) => (
              <li key={m.name}>
                <FadeIn delay={i * 100} className="flex h-full flex-col bg-tinta p-6 ring-1 ring-branco/10">
                  <Diamond size={6} />
                  <p className="serif mt-5 text-[1.25rem] leading-snug">“{m.text}”</p>
                  <p className="label mt-auto pt-6 text-branco/60">
                    {m.name} · {m.city}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ul>
          <p className="label mt-4 text-branco/40">Memórias de exemplo · projeto acadêmico</p>
        </div>
      </section>

      {/* III. Lenda */}
      <section id="lenda" data-tone="preto" aria-labelledby="lenda-titulo" className="tex-sarja relative scroll-mt-16 overflow-hidden bg-tinta py-section text-branco">
        <div className="container-x">
          <p className="label text-cobre">{lenda.label}</p>
          <h2 id="lenda-titulo" className="serif mt-3 text-h1">
            {lenda.title}
          </h2>
          <p className="serif mt-6 max-w-3xl text-h4 italic text-branco/85">{lenda.lead}</p>
          <div className="mt-8">
            <Legend frames={lenda.frames} />
          </div>
          <p className="label mt-16 text-branco/45">{lenda.credit}</p>
        </div>
      </section>

      {/* Do conceito à peça */}
      <section id="peca" data-tone="branco" aria-labelledby="peca-titulo" className="relative scroll-mt-16">
        <FrayedEdge side="bottom" className="absolute inset-x-0 top-0" />
        <div className="container-x py-section">
          <p className="label text-cobre">Do conceito à peça</p>
          <RevealLines
            lines={[
              <>
                Como a pinha <em>virou roupa</em>
              </>,
            ]}
            className="serif mt-3 text-h1 text-tinta"
          />
          <span id="peca-titulo" className="sr-only">
            Do conceito à peça
          </span>
          <ol className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3 md:gap-8">
            {conceptToPiece.map((c, i) => {
              const look = getLook(c.look)!;
              return (
                <li key={c.from}>
                  <FadeIn delay={i * 120}>
                    <div className="relative mx-auto aspect-square max-w-[300px] overflow-hidden bg-papel">
                      <Image
                        src={look.front}
                        alt={`Detalhe do look ${look.name}: ${c.to.toLowerCase()}`}
                        fill
                        sizes="300px"
                        className="object-cover"
                        style={{ objectPosition: c.focus, transform: `scale(${c.zoom})`, transformOrigin: c.focus }}
                      />
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="label text-tinta/60">{c.from}</span>
                      <Icon name="seta" size={20} className="shrink-0 text-cobre" />
                    </div>
                    <p className="serif mt-2 text-h4">{c.to}</p>
                  </FadeIn>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Line-up */}
      <section data-tone="branco" aria-labelledby="lineup-titulo" className="container-x pb-section">
        <Stitch />
        <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
          <h2 id="lineup-titulo" className="serif text-h2 text-tinta">
            O line-up <em>completo</em>
          </h2>
          <p className="max-w-sm text-small text-tinta/65">Toque em um look para ver a peça.</p>
        </div>
        <div className="mt-8">
          <LineupViewer />
        </div>
        <div className="relative mt-24 overflow-hidden bg-tinta px-6 py-20 text-center text-branco md:py-28">
          <ScalePattern scale={2} opacity={0.35} id="escamas-cta" />
          <p className="label relative text-cobre">{brand.signature}</p>
          <p className="serif relative mt-4 text-h2">
            Vista o que <em>permanece</em>.
          </p>
          <Link href="/loja" className="label-lg relative mt-10 inline-flex h-14 items-center gap-3 bg-branco px-10 text-tinta hover:bg-papel">
            Entrar na loja <Icon name="seta" size={22} />
          </Link>
        </div>
      </section>
    </>
  );
}
