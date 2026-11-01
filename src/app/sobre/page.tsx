/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { NextBlock } from "@/components/look/next-block";
import { EditorialRow, NumberedList, PageIntro, Prose, SectionTitle } from "@/components/page/editorial";
import { editHref, edits } from "@/data/collection";
import { aboutStory, brand, conceptToPiece } from "@/data/copy";
import { looks } from "@/data/looks";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A Remanesce e a lenda que a inspira: Curiaçu, a primeira Araucária e a gralha-azul. O renascimento por trás da coleção O Renascer da Permanência.",
};

const lookImage = (i: number, side: "front" | "back" = "front") => ({
  src: looks[i][side],
  fit: looks[i].fit,
  alt: side === "front" ? `Look ${looks[i].name}, de frente: ${looks[i].description}` : `Look ${looks[i].name}, de costas`,
});

/** Parágrafo de leitura: 16 → 20 px, linha longa limitada a ~62 caracteres. */
const reading = "max-w-[62ch] text-16 leading-[1.65] md:text-[1.25rem] md:leading-[1.6]";

// Textos do conceito a partir de docs/conceito.md (equipe Remanesce), sem mudar o sentido.
export default function AboutPage() {
  const story = aboutStory;

  return (
    <>
      <PageIntro kicker={`Sobre nós · ${brand.collection}`}>{brand.signature}</PageIntro>

      <EditorialRow image={lookImage(0)}>
        <SectionTitle>A Remanesce</SectionTitle>
        <Prose>
          <p>
            “O Renascer da Permanência” nasce da pinha da araucária, no encontro entre a natureza da árvore, a sua importância
            para o Paraná e a lenda que ela carrega.
          </p>
          <p className="text-soft">
            A coleção propõe uma reflexão sobre aquilo que é permanente e renasce de outra forma, mesmo diante das perdas e das
            transformações da vida.
          </p>
        </Prose>
      </EditorialRow>

      {/* A lenda: reportagem da RPC, em leitura editorial. */}
      <article aria-labelledby="lenda-titulo" className="grid-site mt-32 gap-y-0 lg:mt-60">
        <header className="col-span-6 border-t border-line pt-6 lg:col-span-12 lg:col-start-2 lg:pt-8">
          <p className="label text-muted">Folclore brasileiro · A lenda que nos inspira</p>
          <h2
            id="lenda-titulo"
            className="mt-8 max-w-[22ch] text-balance font-display text-[2.5rem] font-extralight leading-[1] tracking-[-0.02em] md:text-[3.5rem] lg:mt-12 lg:text-[4.5rem] 2xl:text-[5.5rem]"
          >
            {story.title}
          </h2>
          <p className="mt-6 font-display text-24 font-extralight italic md:text-32 lg:mt-8">{story.subtitle}</p>
          <p className="label mt-8 text-muted lg:mt-12">
            Por {story.source} — <time dateTime="2024-02-02T17:09">{story.date}</time>
          </p>
        </header>

        <div className="col-span-6 mt-16 lg:col-span-7 lg:col-start-6 lg:mt-24">
          <div className={`space-y-6 ${reading}`}>
            {story.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <figure className="col-span-6 my-16 lg:col-span-11 lg:col-start-2 lg:my-32">
          <blockquote className="font-display text-[1.75rem] font-extralight italic leading-[1.15] tracking-[-0.01em] md:text-40 lg:text-[3.5rem] lg:leading-[1.08]">
            <p>“{story.quote.text}”</p>
          </blockquote>
          <figcaption className="label mt-6 lg:mt-10 lg:pl-[calc(100%*4/11)]">
            — {story.quote.author}, <span className="text-muted">{story.quote.role}</span>
          </figcaption>
        </figure>

        <div className="col-span-6 lg:col-span-7 lg:col-start-6">
          <p className={reading}>{story.context}</p>
        </div>

        <div className="col-span-6 mt-24 flex items-center gap-4 lg:col-span-12 lg:col-start-2 lg:mt-40" aria-hidden>
          <span className="h-px flex-1 bg-line" />
          <img src={asset("/images/marca/sugar-apple.webp")} alt="" width={320} height={325} className="h-auto w-12 lg:w-16" />
          <span className="h-px flex-1 bg-line" />
        </div>

        <h3 className="title-display col-span-6 mt-16 max-w-[20ch] lg:col-span-10 lg:col-start-2 lg:mt-24 lg:text-[4rem]">
          {story.question}
        </h3>

        {story.legend.map((part, i) => (
          <section
            key={part.heading}
            aria-labelledby={`lenda-${i}`}
            className="col-span-6 mt-16 grid grid-cols-subgrid gap-y-6 lg:col-span-12 lg:col-start-2 lg:mt-24"
          >
            <h4 id={`lenda-${i}`} className="col-span-6 flex gap-6 lg:col-span-3 lg:flex-col lg:gap-2 lg:self-start">
              <span className="label tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-24 font-extralight leading-[1.1] lg:text-32">{part.heading}</span>
            </h4>
            <div className={`col-span-6 space-y-6 lg:col-span-7 lg:col-start-5 ${reading}`}>
              {part.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {i === story.legend.length - 1 && (
              // A gralha-azul pousada numa linha, como na sacola.
              <div className="col-span-6 mt-8 lg:col-span-7 lg:col-start-5" aria-hidden>
                <div className="flex justify-end border-b border-fg">
                  <img src={asset("/images/marca/bird.svg")} alt="" width={568} height={480} className="mr-[12%] h-auto w-24 md:w-32" />
                </div>
              </div>
            )}
          </section>
        ))}

        <footer className="label col-span-6 mt-16 text-muted lg:col-span-7 lg:col-start-6 lg:mt-24">
          <p>
            Fonte: reportagem da {story.source}, publicada em {story.date}. Texto organizado em seções pela Remanesce; a lenda é de
            origem indígena e não é de autoria da marca.
          </p>
        </footer>
      </article>

      <EditorialRow imageSide="right" image={lookImage(1, "back")}>
        <SectionTitle>Permanência</SectionTitle>
        <Prose>
          <p>
            A araucária pode passar dos duzentos anos de vida. Atravessa gerações e as transformações do tempo, e continua
            ali.
          </p>
          <p className="text-soft">
            Mas a permanência não é a conservação de algo imutável: é um processo contínuo de transformação, em que a memória
            se torna parte da renovação.
          </p>
        </Prose>
      </EditorialRow>

      <EditorialRow image={lookImage(5)}>
        <SectionTitle>Renascimento</SectionTitle>
        <Prose>
          <p>
            Sozinha, a araucária não continua. Quando o pólen encontra a pinha nasce o pinhão, e a semente na terra vira outra
            árvore.
          </p>
          <p className="text-soft">
            Renascer não é esquecer o passado para o novo existir: é ressignificar o que foi vivido, como a pinha que abriga as
            sementes de um novo ciclo.
          </p>
        </Prose>

        <div className="mt-24 lg:mt-40">
          <SectionTitle>Da pinha à peça</SectionTitle>
          <NumberedList items={conceptToPiece.map((c) => ({ title: c.to, text: c.from }))} />
        </div>
      </EditorialRow>

      <EditorialRow imageSide="right" image={lookImage(3)}>
        <SectionTitle>Os seis looks</SectionTitle>
        <NumberedList items={edits.map((e) => ({ title: looks.find((l) => l.slug === e.slug)!.name, href: editHref(e.slug) }))} />
        <Prose>
          <p className="text-soft">
            Toda em denim, com o vermelho aparecendo por dentro. Ao unir natureza, memória e vestuário, a moda vira uma forma de
            preservar histórias.
          </p>
        </Prose>
      </EditorialRow>

      <NextBlock kicker="próxima página" title="raiz" href="/raiz" image={lookImage(4)} />
    </>
  );
}
