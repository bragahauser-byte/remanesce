import type { Metadata } from "next";
import { ScalePattern, Stitch } from "@/components/brand/textures";
import { ReturnForm } from "@/components/forms/return-form";
import { Icon } from "@/components/icons/icon";
import { TreesPlanted } from "@/components/shop/trees-planted";
import { ParanaMap } from "@/components/story/parana-map";
import { FadeIn, RevealLines } from "@/components/story/reveal";
import { ToneController } from "@/components/story/tone";
import { denimCycle, plantingPoints, raiz } from "@/data/copy";

export const metadata: Metadata = {
  title: "Raiz",
  description: "Cada peça Remanesce planta uma araucária no Paraná. Conheça o replantio, o ciclo do denim e o programa Devolva e Renasça.",
};

const number = new Intl.NumberFormat("pt-BR");

export default function RaizPage() {
  const totalPoints = plantingPoints.reduce((n, p) => n + p.trees, 0);
  return (
    <>
      <ToneController />

      <section data-tone="preto" className="relative overflow-hidden bg-preto pb-section pt-[calc(var(--spacing-header)+5rem)] text-branco">
        <ScalePattern scale={2.6} opacity={0.16} id="escamas-raiz-hero" />
        <div className="container-x relative">
          <p className="label text-branco/70">Raiz · sustentabilidade e replantio</p>
          <RevealLines
            as="h1"
            lines={[
              "Cada peça,",
              <>
                uma <em>araucária</em>.
              </>,
            ]}
            className="serif mt-6 text-display"
          />
          <div className="mt-14 grid gap-12 md:grid-cols-12 md:items-end">
            <p className="max-w-xl text-[1.15rem] leading-relaxed text-branco/85 md:col-span-6 md:text-[1.3rem]">
              A cada peça vendida, uma muda de araucária é plantada em parceria com projetos de reflorestamento no Paraná.{" "}
              {raiz.line}
            </p>
            <div className="md:col-span-4 md:col-start-9">
              <p className="label text-branco/70">Araucárias plantadas</p>
              <p className="serif mt-2 text-[clamp(4rem,9vw,8rem)] leading-none">
                <TreesPlanted />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section data-tone="branco" aria-labelledby="mapa-titulo" className="container-x py-section">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <p className="label text-cobre">Onde plantamos</p>
            <h2 id="mapa-titulo" className="serif mt-3 text-h2 text-tinta">
              Cinco pontos, <em>uma floresta</em>.
            </h2>
            <ul className="mt-8 divide-y divide-dashed divide-cobre/40 border-y border-dashed border-cobre/40">
              {plantingPoints.map((p) => (
                <li key={p.city} className="flex items-baseline justify-between py-3">
                  <span className="serif text-[1.15rem]">{p.city}</span>
                  <span className="label">{number.format(p.trees)} mudas</span>
                </li>
              ))}
            </ul>
            <p className="label mt-3 text-tinta/55">Total nos pontos: {number.format(totalPoints)} mudas</p>
          </div>
          <div className="text-tinta md:col-span-7 md:col-start-6">
            <ParanaMap />
          </div>
        </div>
      </section>

      {/* Ciclo do denim */}
      <section data-tone="papel" aria-labelledby="ciclo-titulo" className="py-section">
        <div className="container-x">
          <p className="label text-cobre">O ciclo do denim</p>
          <RevealLines lines={["Nada se perde."]} className="serif mt-3 text-h1 text-tinta" />
          <span id="ciclo-titulo" className="sr-only">
            O ciclo do denim
          </span>
          <ol className="mt-14 grid gap-px bg-tinta/10 sm:grid-cols-2 lg:grid-cols-4">
            {denimCycle.map((step, i) => (
              <li key={step.title} className="bg-papel">
                <FadeIn delay={i * 100} className="flex h-full flex-col p-7">
                  <span className="label text-tinta/50">0{i + 1}</span>
                  <Icon name={step.icon} size={36} strokeWidth={1} className="mt-6" />
                  <h3 className="serif mt-8 text-h4">{step.title}</h3>
                  <p className="mt-3 text-small text-tinta/75">{step.text}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Devolva e Renasça */}
      <section data-tone="preto" aria-labelledby="devolva-titulo" className="tex-sarja bg-preto py-section text-branco">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-branco/70">Programa</p>
            <h2 id="devolva-titulo" className="serif mt-3 text-h1">
              Devolva e <em>Renasça</em>
            </h2>
            <p className="mt-6 max-w-md text-branco/85">
              Traga um jeans antigo. Ele vira escamas de novas peças, e você ganha crédito para a próxima. O tecido que guardou
              uma história continua guardando, em outra forma.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ReturnForm />
          </div>
        </div>
      </section>

      {/* Por que replantar */}
      <section data-tone="branco" aria-labelledby="ameaca-titulo" className="container-x py-section">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Icon name="araucaria" size={64} strokeWidth={0.8} className="text-tinta" />
            <h2 id="ameaca-titulo" className="serif mt-6 text-h2 text-tinta">
              Por que <em>replantar</em> importa
            </h2>
          </div>
          <div className="space-y-5 text-[1.1rem] leading-relaxed md:col-span-6 md:col-start-7">
            <p>
              A araucária (<em>Araucaria angustifolia</em>) é a árvore símbolo da Floresta com Araucárias, a Floresta Ombrófila
              Mista do Sul do Brasil. Séculos de exploração de madeira e a conversão da floresta em lavouras e pastagens
              reduziram drasticamente sua área original.
            </p>
            <p>
              Hoje a espécie está classificada como <strong className="font-medium">Criticamente em Perigo</strong> na Lista
              Vermelha da IUCN e consta como <strong className="font-medium">Em Perigo</strong> na lista oficial brasileira de
              espécies ameaçadas.
            </p>
            <p>
              Ela também depende de quem a planta: a gralha-azul, que enterra pinhões e esquece parte deles, é uma das grandes
              semeadoras da floresta. Replantar é fazer o que a lenda conta.
            </p>
            <Stitch />
            <p className="label text-tinta/60">
              Fontes:{" "}
              <a href="https://www.iucnredlist.org/search?query=Araucaria%20angustifolia&searchType=species" target="_blank" rel="noreferrer" className="link-stitch">
                IUCN Red List
              </a>{" "}
              ·{" "}
              <a href="https://www.gov.br/mma/pt-br/assuntos/biodiversidade-e-biomas/biodiversidade/especies-ameacadas-de-extincao" target="_blank" rel="noreferrer" className="link-stitch">
                MMA · Espécies ameaçadas
              </a>
            </p>
          </div>
        </div>
        <p className="label mt-20 text-tinta/45">
          Nota: a parceria de reflorestamento, os pontos de plantio e os números desta página são exemplos do projeto acadêmico.
        </p>
      </section>
    </>
  );
}
