/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { NextBlock } from "@/components/look/next-block";
import { ScrollMotion, Words } from "@/components/motion/scroll-motion";
import { LooksIndex } from "@/components/page/looks-index";
import { aboutStory, brand, conceptToPiece, denimCycle, manifesto } from "@/data/copy";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A Remanesce e a lenda que a inspira: Curiaçu, a primeira Araucária e a gralha-azul. O renascimento por trás da coleção O Renascer da Permanência.",
};

/*
 * Sobre nós como uma edição de revista de moda, numa grade suíça de 14 colunas:
 * fólios numerados, títulos em PP Pangaia, texto corrido em Instrument Sans com
 * capitular, legendas em rótulo e as fotos editoriais de novembro (Frame 1–9).
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
function Photo({ n, className = "", ratio = "aspect-[3/4]", parallax = 0.06, sizes = "(min-width: 1025px) 40vw, 100vw" }: {
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

const caption = "label mt-3 flex justify-between gap-4 text-muted";
const body = "text-16 leading-[1.5] lg:text-[clamp(1rem,1.04vw,1.25rem)] lg:leading-[1.45]";
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
      <header className="grid-site min-h-dvh content-between gap-y-10 pb-[var(--pad)] pt-[calc(var(--header-h)+24px)]">
        <div className="col-span-6 lg:col-span-9">
          <p className="label text-muted">Edição 01 · Novembro de 2026</p>
          <h1 className="mt-4 font-display text-[22vw] font-extralight leading-[0.82] tracking-[-0.035em] md:text-[17vw] lg:text-[clamp(7rem,12.5vw,15rem)]">
            <span className="reveal-line">
              <span data-reveal="up">sobre nós</span>
            </span>
          </h1>
        </div>

        <nav aria-label="Nesta edição" className="col-span-6 lg:col-span-4 lg:col-start-11 lg:pt-[clamp(40px,4vw,80px)]">
          <p className="label text-muted">Nesta edição</p>
          <ol className="mt-3 border-t border-line">
            {sections.map((s, i) => (
              <li key={s.id} className="border-b border-line">
                <a href={`#${s.id}`} className="group flex items-baseline gap-4 py-2 text-16 lg:text-[clamp(0.9375rem,0.97vw,1.125rem)]">
                  <span className="label tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2">{s.label}</span>
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
        <p className="statement col-span-6 self-end lg:col-span-6 lg:col-start-9">{brand.description}</p>
      </header>

      {/* ------------------------------------------------------- 01 A Remanesce */}
      <section aria-labelledby="marca-titulo" className="grid-site mt-32 gap-y-12 lg:mt-56">
        <Folio n="01" id="marca">
          A Remanesce
        </Folio>
        <h2 id="marca-titulo" className="col-span-6 font-display text-[3.5rem] font-extralight leading-[0.9] tracking-[-0.03em] md:text-[6rem] lg:col-span-12 lg:text-[clamp(6rem,10vw,12rem)]">
          <Words as="span" text={brand.signature} />
        </h2>

        <figure className="col-span-6 lg:col-span-5 lg:row-span-2">
          <Photo n={2} ratio="aspect-[2/3]" parallax={0.08} />
          <figcaption className={caption}>
            <span>Retrato · gola de escamas</span>
            <span>p. 02</span>
          </figcaption>
        </figure>

        <div className={`col-span-6 lg:col-span-4 lg:col-start-7 lg:pt-24 ${body}`}>
          <p data-reveal="up" className="dropcap">
            A coleção “O Renascer da Permanência” nasce da pinha da araucária, no encontro entre a natureza da árvore, a sua importância para o
            Paraná e a lenda que ela carrega. A coleção propõe uma reflexão sobre aquilo que é permanente e renasce de outra forma, mesmo
            diante das perdas e das transformações da vida.
          </p>
          {manifesto.slice(1, 3).map((p) => (
            <p key={p} data-reveal="up" className="mt-5">
              {p}
            </p>
          ))}
        </div>
        <div className={`col-span-6 lg:col-span-3 lg:col-start-12 lg:pt-24 ${body}`}>
          <p data-reveal="up" className="text-muted">
            {manifesto[3]}
          </p>
          <p data-reveal="up" className="mt-5 font-display text-24 font-extralight italic leading-[1.15] lg:text-[clamp(1.5rem,1.85vw,2.25rem)]">
            {manifesto[0]}
          </p>
        </div>
      </section>

      {/* Página dupla: a foto horizontal sangra de margem a margem. */}
      <figure className="mt-32 px-[var(--pad)] lg:mt-56">
        <Photo n={5} ratio="aspect-[5757/4608] lg:aspect-[16/9]" parallax={0.1} sizes="100vw" />
        <figcaption className={caption}>
          <span>O vermelho escondido sob as escamas</span>
          <span>pp. 03–04</span>
        </figcaption>
      </figure>

      {/* ------------------------------------------------------------ 02 A lenda */}
      <article aria-labelledby="lenda-titulo" className="grid-site mt-32 gap-y-12 lg:mt-56">
        <Folio n="02" id="lenda">
          A lenda que nos inspira
        </Folio>

        <div className="col-span-6 lg:col-span-5 lg:row-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <Photo n={1} ratio="aspect-[2/3]" parallax={0.05} />
            <p className={caption}>
              <span>Folclore brasileiro</span>
              <span>p. 05</span>
            </p>
          </div>
        </div>

        <header className="col-span-6 lg:col-span-8 lg:col-start-7">
          <p className="label text-muted">Por {story.source} · {story.date}</p>
          <h2
            id="lenda-titulo"
            data-reveal="up"
            className="mt-6 text-balance font-display text-[2.25rem] font-extralight leading-[1] tracking-[-0.02em] md:text-[3.5rem] lg:text-[clamp(3rem,4.4vw,5.5rem)]"
          >
            {story.title}
          </h2>
          <p className="mt-6 font-display text-24 font-extralight italic lg:text-[clamp(1.5rem,1.85vw,2.25rem)]">{story.subtitle}</p>
        </header>

        <div className={`col-span-6 grid gap-y-5 lg:col-span-8 lg:col-start-7 lg:grid-cols-2 lg:gap-x-[var(--gap)] ${body}`}>
          {story.intro.map((p, i) => (
            <p key={p} data-reveal="up" className={i === 0 ? "dropcap" : undefined}>
              {p}
            </p>
          ))}
          <p data-reveal="up">{story.context}</p>
        </div>

        <figure className="col-span-6 lg:col-span-8 lg:col-start-7">
          <blockquote className="font-display text-[1.75rem] font-extralight italic leading-[1.1] tracking-[-0.01em] md:text-40 lg:text-[clamp(2.25rem,2.9vw,3.5rem)]">
            <Words text={`“${story.quote.text}”`} />
          </blockquote>
          <figcaption className="label mt-6">
            — {story.quote.author}, <span className="text-muted">{story.quote.role}</span>
          </figcaption>
        </figure>

        <h3 className="col-span-6 mt-16 font-display text-[2.5rem] font-extralight leading-[1] tracking-[-0.02em] lg:col-span-10 lg:mt-32 lg:text-[clamp(3.5rem,5.2vw,6.5rem)]">
          {story.question}
        </h3>

        {story.legend.map((part, i) => (
          <section key={part.heading} aria-labelledby={`lenda-${i}`} className="col-span-full mt-8 grid grid-cols-subgrid gap-y-6 lg:mt-20">
            <h4 id={`lenda-${i}`} className="col-span-6 border-t border-line pt-3 lg:col-span-3">
              <span className="label block tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-2 block font-display text-32 font-extralight leading-[1.05] lg:text-[clamp(2rem,2.3vw,2.75rem)]">{part.heading}</span>
            </h4>
            <div className={`col-span-6 space-y-5 border-t border-line pt-3 lg:col-span-5 lg:col-start-5 ${body}`}>
              {part.paragraphs.map((p) => (
                <p key={p} data-reveal="up">
                  {p}
                </p>
              ))}
            </div>
            <figure className={`col-span-4 lg:col-span-4 ${i === 1 ? "lg:col-start-11 lg:-mt-24" : "lg:col-start-11"}`}>
              <Photo n={([3, 4, 6] as const)[i]} ratio={i === 1 ? "aspect-[3/4]" : "aspect-[4/5]"} parallax={0.07} sizes="(min-width: 1025px) 28vw, 66vw" />
              <figcaption className={caption}>
                <span>{["Curiaçu e Guacira", "A primeira araucária", "A gralha-azul"][i]}</span>
                <span>p. {String(6 + i).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </section>
        ))}

        {/* A gralha-azul pousada no fio, como na sacola. */}
        <div className="col-span-6 mt-8 lg:col-span-10 lg:col-start-5" aria-hidden>
          <div className="flex justify-end border-b border-fg">
            <img src={asset("/images/marca/bird.svg")} alt="" width={568} height={480} className="mr-[10%] h-auto w-24 md:w-32" />
          </div>
        </div>
        <p className="label col-span-6 text-muted lg:col-span-6 lg:col-start-5">
          Fonte: reportagem da {story.source}, publicada em {story.date}. Texto organizado em seções pela Remanesce; a lenda é de origem
          indígena e não é de autoria da marca.
        </p>
      </article>

      {/* ------------------------------------------- 03 Permanência e renascimento */}
      <section aria-labelledby="tempo-titulo" className="grid-site mt-32 gap-y-12 lg:mt-56">
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
          },
          {
            title: "renascimento",
            lead: "Sozinha, a araucária não continua. Quando o pólen encontra a pinha nasce o pinhão, e a semente na terra vira outra árvore.",
            text: "Renascer não é esquecer o passado para o novo existir: é ressignificar o que foi vivido, como a pinha que abriga as sementes de um novo ciclo.",
          },
        ].map((c, i) => (
          <div key={c.title} className={`col-span-6 ${i === 0 ? "lg:col-span-6" : "lg:col-span-6 lg:col-start-9 lg:pt-40"}`}>
            <p className="font-display text-[3.5rem] font-extralight leading-[0.9] tracking-[-0.03em] md:text-[5rem] lg:text-[clamp(5rem,7.4vw,9rem)]">{c.title}</p>
            <p data-reveal="up" className="statement mt-8">
              {c.lead}
            </p>
            <p data-reveal="up" className={`mt-6 max-w-[40em] text-muted ${body}`}>
              {c.text}
            </p>
          </div>
        ))}

        <div className="col-span-full mt-16 lg:mt-32">
          <p className="label text-muted">Da pinha à peça</p>
          <ol className="mt-4 grid gap-y-10 border-t border-fg pt-6 md:grid-cols-3 md:gap-x-[var(--gap)]">
            {conceptToPiece.map((c, i) => (
              <li key={c.to} data-reveal="up">
                <span className="font-display text-[4rem] font-extralight leading-none tabular-nums lg:text-[clamp(4rem,5.6vw,7rem)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="ui-lg mt-6">{c.to}</p>
                <p className="label mt-2 text-muted">{c.from}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- 04 O cuidado */}
      <section aria-labelledby="cuidado-titulo" className="grid-site mt-32 gap-y-12 lg:mt-56">
        <Folio n="04" id="cuidado">
          O cuidado
        </Folio>
        <div className="col-span-6 lg:col-span-5">
          <h2 id="cuidado-titulo" className="font-display text-[3rem] font-extralight leading-[0.95] tracking-[-0.02em] lg:text-[clamp(4rem,5.6vw,7rem)]">
            até a embalagem volta à terra
          </h2>
        </div>
        <p data-reveal="up" className={`col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end ${body}`}>
          {pack.text} O papel de seda leva o logotipo, a fita leva a Sugar apple e a sacola de algodão fica com você.
        </p>

        {(
          [
            { n: 7, label: "Papel de seda", offset: "" },
            { n: 8, label: "Fita com a Sugar apple", offset: "lg:mt-32" },
            { n: 9, label: "Sacola de algodão", offset: "lg:mt-16" },
          ] as const
        ).map((p, i) => (
          <figure key={p.n} className={`col-span-6 md:col-span-2 lg:col-span-4 ${["lg:col-start-1", "lg:col-start-6", "lg:col-start-11"][i]} ${p.offset}`}>
            <Photo n={p.n} ratio="aspect-[3/4]" parallax={0.05} sizes="(min-width: 1025px) 28vw, 100vw" />
            <figcaption className={caption}>
              <span>{p.label}</span>
              <span>p. {String(9 + i).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      {/* ------------------------------------------------------ 05 Os seis looks */}
      <section aria-labelledby="looks-titulo" className="grid-site mt-32 gap-y-8 lg:mt-56">
        <Folio n="05" id="looks">
          Os seis looks
        </Folio>
        <h2 id="looks-titulo" className={`col-span-6 lg:col-span-5 ${body}`}>
          Toda em denim, com o vermelho aparecendo por dentro. Ao unir natureza, memória e vestuário, a moda vira uma forma de preservar
          histórias.
        </h2>
        <div className="col-span-full">
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
