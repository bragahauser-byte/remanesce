import type { Metadata } from "next";
import { NextBlock } from "@/components/look/next-block";
import { EditorialRow, NumberedList, PageIntro, Prose, SectionTitle } from "@/components/page/editorial";
import { editHref } from "@/data/collection";
import { brand, conceptToPiece } from "@/data/copy";
import { looks } from "@/data/looks";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Conceito",
  description:
    "O Renascer da Permanência: a pinha da araucária como imagem do que permanece e renasce em outra forma. O conceito por trás da coleção de denim da Remanesce.",
};

// Textos a partir de docs/conceito.md (equipe Remanesce), sem mudar o sentido.
export default function ConceptPage() {
  return (
    <>
      <PageIntro kicker={`Conceito · ${brand.collection}`}>
        A permanência não é ficar igual. É a essência de algo continuar existindo.
      </PageIntro>

      <EditorialRow image={{ src: looks[0].cutout.front, alt: `Look ${looks[0].name}, de frente: ${looks[0].description}` }}>
        <SectionTitle>O conceito</SectionTitle>
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

      <EditorialRow imageSide="right" image={{ src: looks[1].cutout.back, alt: `Look ${looks[1].name}, de costas` }}>
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

      <EditorialRow image={{ src: looks[5].cutout.front, alt: `Look ${looks[5].name}, de frente: ${looks[5].description}` }}>
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

      <EditorialRow
        image={{ src: asset("/images/lineup/lineup-frente.jpg"), alt: "Line-up da coleção: os seis looks de frente", kind: "photo" }}
      >
        <SectionTitle>Os seis looks</SectionTitle>
        <NumberedList items={looks.map((l) => ({ title: l.name, href: editHref(l.slug) }))} />
        <Prose>
          <p className="text-soft">
            Toda em denim, com o vermelho aparecendo por dentro. Ao unir natureza, memória e vestuário, a moda vira uma forma de
            preservar histórias.
          </p>
        </Prose>
      </EditorialRow>

      <NextBlock
        kicker="próxima página"
        title="raiz"
        href="/raiz"
        image={{ src: looks[2].cutout.front, alt: `Look ${looks[2].name}, de frente` }}
      />
    </>
  );
}
