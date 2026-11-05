/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { NextBlock } from "@/components/look/next-block";
import { ScrollMotion } from "@/components/motion/scroll-motion";
import { LooksIndex } from "@/components/page/looks-index";
import { aboutStory, brand, conceptToPiece, denimCycle, manifesto } from "@/data/copy";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A Remanesce e a lenda que a inspira: Curiaçu, a primeira Araucária e a gralha-azul. O renascimento por trás da coleção O Renascer da Permanência.",
};

/*
 * Sobre nós como uma edição de revista de moda, numa grade suíça de 14 colunas.
 * O espaço em branco trabalha a favor: colunas de texto estreitas, fotos deslocadas na
 * grade e distâncias grandes entre as seções. Tipografia só da escala (tokens.css):
 * PP Pangaia nos títulos (display-*), Instrument Sans no texto (t-body, t-lead, label).
 * A abertura repete o pôster do menu: título no alto e três fotos no pé.
 */

type Frame = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const frames: Record<Frame, string> = {
  1: "Modelo de cabelos cacheados em jaqueta e calça de denim, fotografada de baixo entre prédios, em preto e branco.",
  2: "Retrato de perfil sobre fundo laranja: cabelo ruivo curto e a gola alta coberta de escamas de denim.",
  3: "Modelo recostada num sofá branco, com top e saia de escamas de denim, em preto e branco.",
  4: "Modelo agachada sobre as pedras à beira-mar, com top e pantalona de escamas de denim.",
  5: "Modelo deitada num divã de couro sobre fundo vermelho, com o look de escamas e o vermelho por dentro; uma pinha no chão.",
  6: "Modelo sentada numa poltrona de couro, com vestido de denim, e uma pinha no chão, em preto e branco.",
  7: "Papel de seda azul-claro estampado com o logotipo Remanesce.",
  8: "Fita de cetim creme com a Sugar apple bordada em dourado, sobre fundo azul.",
  9: "Sacola de algodão azul-marinho com o logotipo Remanesce, segurada pelas alças.",
};

/** Foto editorial: a moldura se abre ao entrar na tela e a imagem anda um pouco (parallax). */
function Photo({ n, className = "", ratio = "aspect-[3/4]", parallax = 0.06, sizes = "(min-width: 1025px) 30vw, 100vw" }: {
  n: Frame;
  className?: string;
  ratio?: string;
  parallax?: number;
  sizes?: string;
}) {
  const src = asset(`/images/sobre/frame-${n}-1600.webp`);
  return (
    <div data-reveal="image" className={`relative overflow-hidden bg-panel ${ratio} ${className}`}>
      <div data-parallax={parallax} className="absolute inset-x-0 -inset-y-[8%]">
        <img
          src={src}
          srcSet={`${asset(`/images/sobre/frame-${n}-800.webp`)} 800w, ${src} 1600w`}
          sizes={sizes}
          alt={frames[n]}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/** Fólio de seção: número, nome e um fio até a margem, como o cabeçalho de página de revista. */
function Folio({ n, children, id }: { n: string; children: string; id?: string }) {
  return (
    <div id={id} className="label col-span-full flex scroll-mt-[calc(var(--header-h)+24px)] items-baseline gap-4 border-t border-fg pt-3">
      <span className="tabular-nums">{n}</span>
      <span>{children}</span>
      <span className="ml-auto hidden text-muted md:inline">
        {brand.name} · {brand.collection}
      </span>
    </div>
  );
}

function Caption({ children, page }: { children: string; page: string }) {
  return (
    <figcaption className="t-caption mt-3 flex justify-between gap-4 text-muted">
      <span>{children}</span>
      <span className="tabular-nums">{page}</span>
    </figcaption>
  );
}

/** Distância entre seções: o branco é parte da página. */
const section = "grid-site mt-[clamp(160px,22vw,400px)] gap-y-12";
const title = "font-display font-extralight";
const sections = [
  { id: "marca", label: "A Remanesce" },
  { id: "lenda", label: "A lenda" },
  { id: "tempo", label: "Permanência e renascimento" },
  { id: "cuidado", label: "O cuidado" },
  { id: "looks", label: "Os seis looks" },
];

export default function AboutPage() {
  const story = aboutStory;
  const pack = denimCycle.find((d) => d.title === "A embalagem")!;

  return (
    <>
      {/* ---------------------------------------------------------------- capa */}
      <header className="grid-site min-h-dvh content-between gap-y-12 pb-[var(--pad)] pt-[calc(var(--header-h)+clamp(24px,4vh,64px))]">
        <div className="col-span-6 lg:col-span-9">
          <p className="label text-muted">Edição 01 · Novembro de 2026</p>
          <h1 data-reveal="up" className={`${title} display-3xl mt-6`}>
            sobre nós
          </h1>
        </div>

        <nav aria-label="Nesta edição" className="col-span-6 lg:col-span-3 lg:col-start-12">
          <p className="label text-muted">Nesta edição</p>
          <ol className="mt-4 border-t border-line">
            {sections.map((s, i) => (
              <li key={s.id} className="border-b border-line">
                <a href={`#${s.id}`} className="t-small flex items-baseline gap-4 py-2 transition-opacity duration-300 ease-in-out hover:opacity-50">
                  <span className="t-caption tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Três fotos no pé (as mesmas do cartão "sobre nós" no menu). */}
        <div className="col-span-6 grid grid-cols-3 gap-[var(--gap)] lg:col-span-7">
          {([1, 2, 3] as const).map((n) => (
            <Photo key={n} n={n} ratio="aspect-[4/5]" parallax={0.04} sizes="(min-width: 1025px) 16vw, 33vw" />
          ))}
        </div>
        <p data-reveal="up" className="t-lead col-span-6 max-w-[26em] self-end text-secondary lg:col-span-3 lg:col-start-12">
          {brand.description}
        </p>
      </header>

      {/* ------------------------------------------------------- 01 A Remanesce */}
      <section aria-labelledby="marca-titulo" className={section}>
        <Folio n="01" id="marca">
          A Remanesce
        </Folio>
        <h2 id="marca-titulo" data-reveal="up" className={`${title} display-2xl col-span-6 mt-8 lg:col-span-10 lg:mt-16`}>
          {brand.signature}
        </h2>

        <figure className="col-span-5 mt-16 lg:col-span-4 lg:col-start-2 lg:mt-40">
          <Photo n={2} ratio="aspect-[2/3]" parallax={0.08} />
          <Caption page="p. 02">Retrato · gola de escamas</Caption>
        </figure>

        <div className="t-body col-span-6 lg:col-span-4 lg:col-start-9 lg:mt-[clamp(240px,24vw,420px)]">
          <p data-reveal="up" className="t-lead dropcap">
            A coleção “O Renascer da Permanência” nasce da pinha da araucária, no encontro entre a natureza da árvore, a sua
            importância para o Paraná e a lenda que ela carrega.
          </p>
          <p data-reveal="up" className="mt-6 text-secondary">
            Ela propõe uma reflexão sobre aquilo que é permanente e renasce de outra forma, mesmo diante das perdas e das
            transformações da vida. {manifesto[1]}
          </p>
          <p data-reveal="up" className="mt-6 text-secondary">
            {manifesto[2]} {manifesto[3]}
          </p>
        </div>

        <p data-reveal="up" className={`${title} display-s col-span-6 mt-24 italic lg:col-span-5 lg:col-start-9 lg:mt-40`}>
          {manifesto[0]}
        </p>
      </section>

      {/* Página dupla: a foto horizontal, recuada das margens, com branco em volta. */}
      <figure className="grid-site mt-[clamp(160px,22vw,400px)]">
        <div className="col-span-6 lg:col-span-10 lg:col-start-3">
          <Photo n={5} ratio="aspect-[5757/4608]" parallax={0.08} sizes="(min-width: 1025px) 70vw, 100vw" />
          <Caption page="pp. 03–04">O vermelho escondido sob as escamas</Caption>
        </div>
      </figure>

      {/* ------------------------------------------------------------ 02 A lenda */}
      <article aria-labelledby="lenda-titulo" className={section}>
        <Folio n="02" id="lenda">
          A lenda que nos inspira
        </Folio>

        <header className="col-span-6 mt-8 lg:col-span-9 lg:mt-16">
          <p className="label text-muted">
            Por {story.source} · {story.date}
          </p>
          <h2 id="lenda-titulo" data-reveal="up" className={`${title} display-l mt-8 text-balance`}>
            {story.title}
          </h2>
          <p data-reveal="up" className={`${title} display-s mt-8 italic text-secondary`}>
            {story.subtitle}
          </p>
        </header>

        <div className="col-span-5 mt-12 lg:col-span-4 lg:mt-32">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <Photo n={1} ratio="aspect-[2/3]" parallax={0.05} />
            <Caption page="p. 05">Folclore brasileiro</Caption>
          </div>
        </div>

        <div className="t-body col-span-6 space-y-6 lg:col-span-4 lg:col-start-8 lg:mt-32">
          {story.intro.map((p, i) => (
            <p key={p} data-reveal="up" className={i === 0 ? "t-lead dropcap" : "text-secondary"}>
              {p}
            </p>
          ))}
          <p data-reveal="up" className="text-secondary">
            {story.context}
          </p>
        </div>

        <figure className="col-span-6 mt-24 lg:col-span-10 lg:col-start-3 lg:mt-[clamp(200px,20vw,360px)]">
          <blockquote data-reveal="up" className={`${title} display-m italic`}>
            <p>“{story.quote.text}”</p>
          </blockquote>
          <figcaption className="label mt-8">
            — {story.quote.author}, <span className="text-muted">{story.quote.role}</span>
          </figcaption>
        </figure>

        <h3 data-reveal="up" className={`${title} display-l col-span-6 mt-24 lg:col-span-8 lg:mt-[clamp(200px,20vw,360px)]`}>
          {story.question}
        </h3>

        {story.legend.map((part, i) => {
          const photo = ([3, 4, 6] as const)[i];
          const names = ["Curiaçu e Guacira", "A primeira araucária", "A gralha-azul"];
          return (
            <section key={part.heading} aria-labelledby={`lenda-${i}`} className="col-span-full mt-16 grid grid-cols-subgrid gap-y-8 lg:mt-40">
              <h4 id={`lenda-${i}`} className="col-span-6 border-t border-line pt-3 lg:col-span-3">
                <span className="label block tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className={`${title} display-s mt-3 block`}>{part.heading}</span>
              </h4>
              <div className="t-body col-span-6 space-y-6 border-t border-line pt-3 lg:col-span-4 lg:col-start-5">
                {part.paragraphs.map((p) => (
                  <p key={p} data-reveal="up">
                    {p}
                  </p>
                ))}
              </div>
              <figure className={`col-span-4 lg:col-span-3 lg:col-start-11 ${i === 1 ? "lg:mt-24" : ""}`}>
                <Photo n={photo} ratio="aspect-[3/4]" parallax={0.07} sizes="(min-width: 1025px) 22vw, 66vw" />
                <Caption page={`p. ${String(6 + i).padStart(2, "0")}`}>{names[i]}</Caption>
              </figure>
            </section>
          );
        })}

        {/* A gralha-azul pousada no fio, como na sacola. */}
        <div className="col-span-6 mt-24 lg:col-span-8 lg:col-start-5 lg:mt-32" aria-hidden>
          <div className="flex justify-end border-b border-fg">
            <img src={asset("/images/marca/bird.svg")} alt="" width={568} height={480} className="mr-[10%] h-auto w-24 md:w-32" />
          </div>
        </div>
        <p className="t-caption col-span-6 max-w-[48em] text-muted lg:col-span-5 lg:col-start-5">
          Fonte: reportagem da {story.source}, publicada em {story.date}. Texto organizado em seções pela Remanesce; a lenda é de origem
          indígena e não é de autoria da marca.
        </p>
      </article>

      {/* ------------------------------------------- 03 Permanência e renascimento */}
      <section aria-labelledby="tempo-titulo" className={section}>
        <Folio n="03" id="tempo">
          Permanência e renascimento
        </Folio>
        <h2 id="tempo-titulo" className="sr-only">
          Permanência e renascimento
        </h2>
        {[
          {
            title: "permanência",
            lead: "A araucária pode passar dos duzentos anos de vida. Atravessa gerações e as transformações do tempo, e continua ali.",
            text: "Mas a permanência não é a conservação de algo imutável: é um processo contínuo de transformação, em que a memória se torna parte da renovação.",
            col: "lg:col-span-5 lg:col-start-1 lg:mt-16",
          },
          {
            title: "renascimento",
            lead: "Sozinha, a araucária não continua. Quando o pólen encontra a pinha nasce o pinhão, e a semente na terra vira outra árvore.",
            text: "Renascer não é esquecer o passado para o novo existir: é ressignificar o que foi vivido, como a pinha que abriga as sementes de um novo ciclo.",
            col: "lg:col-span-5 lg:col-start-9 lg:mt-[clamp(240px,24vw,440px)]",
          },
        ].map((c) => (
          <div key={c.title} className={`col-span-6 mt-12 ${c.col}`}>
            <p data-reveal="up" className={`${title} display-xl`}>
              {c.title}
            </p>
            <p data-reveal="up" className="t-lead mt-10 max-w-[26em]">
              {c.lead}
            </p>
            <p data-reveal="up" className="t-body mt-4 max-w-[30em] text-secondary">
              {c.text}
            </p>
          </div>
        ))}

        <div className="col-span-full mt-24 lg:mt-[clamp(200px,20vw,360px)]">
          <p className="label text-muted">Da pinha à peça</p>
          <ol className="mt-4 grid gap-y-12 border-t border-fg pt-8 md:grid-cols-3 md:gap-x-[var(--gap)]">
            {conceptToPiece.map((c, i) => (
              <li key={c.to} data-reveal="up" className="md:pr-[10%]">
                <span className={`${title} display-l block tabular-nums`}>{String(i + 1).padStart(2, "0")}</span>
                <p className="t-title mt-8">{c.to}</p>
                <p className="label mt-3 text-muted">{c.from}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- 04 O cuidado */}
      <section aria-labelledby="cuidado-titulo" className={section}>
        <Folio n="04" id="cuidado">
          O cuidado
        </Folio>
        <h2 id="cuidado-titulo" data-reveal="up" className={`${title} display-l col-span-6 mt-8 lg:col-span-6 lg:mt-16`}>
          até a embalagem volta à terra
        </h2>
        <p data-reveal="up" className="t-body col-span-6 max-w-[30em] text-secondary lg:col-span-4 lg:col-start-10 lg:mt-16 lg:self-end">
          {pack.text} O papel de seda leva o logotipo, a fita leva a Sugar apple e a sacola de algodão fica com você.
        </p>

        {(
          [
            { n: 7, label: "Papel de seda", col: "lg:col-span-3 lg:col-start-1 lg:mt-32" },
            { n: 8, label: "Fita com a Sugar apple", col: "lg:col-span-3 lg:col-start-6 lg:mt-[clamp(240px,22vw,400px)]" },
            { n: 9, label: "Sacola de algodão", col: "lg:col-span-3 lg:col-start-11 lg:mt-48" },
          ] as const
        ).map((p, i) => (
          <figure key={p.n} className={`col-span-4 md:col-span-2 ${i === 1 ? "col-start-3 md:col-start-auto" : ""} ${p.col}`}>
            <Photo n={p.n} ratio="aspect-[3/4]" parallax={0.05} sizes="(min-width: 1025px) 22vw, 66vw" />
            <Caption page={`p. ${String(9 + i).padStart(2, "0")}`}>{p.label}</Caption>
          </figure>
        ))}
      </section>

      {/* ------------------------------------------------------ 05 Os seis looks */}
      <section aria-labelledby="looks-titulo" className={section}>
        <Folio n="05" id="looks">
          Os seis looks
        </Folio>
        <h2 id="looks-titulo" data-reveal="up" className="t-lead col-span-6 mt-8 max-w-[26em] lg:col-span-4 lg:mt-16">
          Toda em denim, com o vermelho aparecendo por dentro. Ao unir natureza, memória e vestuário, a moda vira uma forma de preservar
          histórias.
        </h2>
        <div className="col-span-full mt-16 lg:mt-24">
          <LooksIndex />
        </div>
      </section>

      <NextBlock
        kicker="próxima página"
        title="contato"
        href="/contato"
        image={{ src: asset("/images/sobre/frame-7-1600.webp"), alt: frames[7], fit: "cover" }}
      />
      <SiteFooter />
      <ScrollMotion />
    </>
  );
}
