import type { Metadata } from "next";
import { NextBlock } from "@/components/look/next-block";
import { EditorialRow, NumberedList, PageIntro, Prose, SectionTitle } from "@/components/page/editorial";
import { chapters, denimCycle, plantingPoints, raiz } from "@/data/copy";
import { edits } from "@/data/collection";
import { looks } from "@/data/looks";

export const metadata: Metadata = {
  title: "Raiz",
  description:
    "As origens da Remanesce: a araucária no Paraná, a memória passada de geração em geração, a lenda de Curiaçu e Guacira e o denim que volta à terra.",
};

export default function RootsPage() {
  const trees = plantingPoints.reduce((n, p) => n + p.trees, 0);

  return (
    <>
      <PageIntro kicker="Raiz · origens e referências">Raiz é o que passa de geração em geração.</PageIntro>

      <EditorialRow image={{ src: looks[2].front, fit: looks[2].fit, alt: `Look ${looks[2].name}, de frente: ${looks[2].description}` }}>
        <SectionTitle>A árvore</SectionTitle>
        <Prose>
          {chapters.natureza.body.map((p, i) => (
            <p key={i} className={i > 0 ? "text-soft" : undefined}>
              {p}
            </p>
          ))}
        </Prose>
      </EditorialRow>

      <EditorialRow imageSide="right" image={{ src: looks[4].back, fit: looks[4].fit, alt: `Look ${looks[4].name}, de costas` }}>
        <SectionTitle>A memória</SectionTitle>
        <Prose>
          {chapters.memoria.body.map((p, i) => (
            <p key={i} className={i > 0 ? "text-soft" : undefined}>
              {p}
            </p>
          ))}
        </Prose>
      </EditorialRow>

      <EditorialRow image={{ src: looks[3].front, fit: looks[3].fit, alt: `Look ${looks[3].name}, de frente: ${looks[3].description}` }}>
        <SectionTitle>A lenda</SectionTitle>
        <NumberedList items={chapters.lenda.frames.map((f) => ({ title: f.title, text: f.text }))} />
        <p className="label mt-8 text-muted">{chapters.lenda.credit}</p>
      </EditorialRow>

      <EditorialRow
        imageSide="right"
        image={{ src: looks[5].back, fit: looks[5].fit, alt: `Look ${looks[5].name}, de costas` }}
      >
        <SectionTitle>O material</SectionTitle>
        <NumberedList items={denimCycle.map((d) => ({ title: d.title, text: d.text }))} />
      </EditorialRow>

      <EditorialRow image={{ src: looks[4].front, fit: looks[4].fit, alt: `Look ${looks[4].name}, de frente: ${looks[4].description}` }}>
        <SectionTitle>{raiz.title}</SectionTitle>
        <Prose>
          <p>{raiz.line}</p>
        </Prose>
        <dl className="mt-12 border-t border-line">
          {plantingPoints.map((p) => (
            <div key={p.city} className="flex items-baseline justify-between border-b border-line py-2">
              <dt className="label">{p.city}</dt>
              <dd className="text-16 tabular-nums text-soft">{p.trees} araucárias</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between py-2">
            <dt className="label">Total</dt>
            <dd className="text-16 font-semibold tabular-nums">{trees}</dd>
          </div>
        </dl>
        <p className="label mt-4 text-muted">Pontos e números de exemplo · projeto acadêmico.</p>
      </EditorialRow>

      <NextBlock kicker="próxima página" title="início" href="/" image={{ src: edits[0].image.front, fit: edits[0].image.fit, alt: edits[0].image.alt }} />
    </>
  );
}
