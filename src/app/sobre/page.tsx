import type { Metadata } from "next";
import Image from "next/image";
import { BrandSymbol } from "@/components/brand/logo";
import { Stitch } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { FadeIn, RevealLines } from "@/components/story/reveal";
import { brand, microcopy, team } from "@/data/copy";
import { looks } from "@/data/looks";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Quem faz a Remanesce, por que denim e o propósito de uma marca que transforma memória em roupa.",
};

export default function AboutPage() {
  return (
    <div className="pt-[calc(var(--spacing-header)+4rem)]">
      <section className="container-x grid gap-12 pb-section md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label text-cobre">Sobre a marca</p>
          <RevealLines
            as="h1"
            lines={[
              "Moda como forma",
              <>
                de <em>guardar</em> histórias.
              </>,
            ]}
            className="serif mt-5 text-h1 text-tinta"
          />
          <div className="mt-10 max-w-xl space-y-5 text-[1.1rem] leading-relaxed">
            <p>
              A Remanesce é uma marca de denim autoral nascida em Curitiba. Cada coleção parte de algo que permanece, e
              pergunta como isso pode renascer em outra forma.
            </p>
            <p>
              A primeira coleção, {brand.collection}, nasce da pinha da araucária: da árvore que atravessa séculos, da
              memória do Paraná e da lenda de Curiaçu e Guacira.
            </p>
            <p>Fazemos poucas peças, pensadas para durar, ser consertadas e passar adiante.</p>
          </div>
        </div>
        <div className="relative md:col-span-4 md:col-start-9">
          <div className="relative mx-auto aspect-[3/7] w-full max-w-[240px]">
            <Image src={looks[3].front} alt={`Look ${looks[3].name}`} fill sizes="240px" className="object-contain" />
          </div>
        </div>
      </section>

      <section data-tone="preto" className="tex-sarja bg-tinta py-section text-branco">
        <div className="container-x grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <p className="label text-cobre">Por que denim</p>
            <p className="serif mt-5 text-h2">
              “O tecido que envelhece com quem veste e guarda a <em>memória do corpo</em>.”
            </p>
          </div>
          <div className="space-y-5 text-branco/85 md:col-span-6 md:col-start-7">
            <p>
              O denim marca. Desbota onde a mão repousa, vinca onde o corpo dobra, cede onde a vida pede. Nenhuma peça envelhece
              igual a outra: cada uma vira o registro de quem a usou.
            </p>
            <p>
              Por isso a coleção é toda em denim, com o vermelho aparecendo só por dentro: nos forros, nas fendas, nos losangos.
              O que sustenta tudo quase nunca está à vista.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="equipe-titulo" className="container-x py-section">
        <h2 id="equipe-titulo" className="serif text-h2 text-tinta">
          Quem <em>faz</em>
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <li key={m.name}>
              <FadeIn delay={i * 80} className="flex h-full flex-col border border-tinta/15 p-6">
                <BrandSymbol size={36} seed={i === 0 ? "var(--pinhao)" : "currentColor"} />
                <p className="serif mt-10 text-h4">{m.name}</p>
                <p className="label mt-2 text-tinta/60">{m.role}</p>
              </FadeIn>
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <Stitch />
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <div>
            <p className="label text-tinta/55">Contato</p>
            <a href={`mailto:${brand.email}`} className="serif mt-2 block text-h4 hover:text-tinta">
              {brand.email}
            </a>
          </div>
          <div>
            <p className="label text-tinta/55">Ateliê</p>
            <p className="serif mt-2 text-h4">{brand.city}</p>
          </div>
          <div>
            <p className="label text-tinta/55">Instagram</p>
            <a href={brand.instagram} target="_blank" rel="noreferrer" className="serif mt-2 flex items-center gap-2 text-h4 hover:text-tinta">
              <Icon name="instagram" /> @remanesce
            </a>
          </div>
        </div>
        <p className="label mt-16 text-tinta/50">{microcopy.academic} Conceito e line-up: equipe Remanesce.</p>
      </section>
    </div>
  );
}
