import type { Metadata } from "next";
import QRCode from "qrcode";
import type { ReactNode } from "react";
import { ColorSwatch, IconTile, PrintButton } from "@/components/brand/brand-client";
import { BrandSymbol, Logo } from "@/components/brand/logo";
import {
  BagMockup,
  BoxMockup,
  BusinessCardMockup,
  InstagramMockup,
  Mockup,
  PatchMockup,
  SeedTagMockup,
  ThankYouMockup,
  TissueMockup,
  WovenLabelMockup,
} from "@/components/brand/mockups";
import { Diamond, FrayedEdge, ScalePattern, Stitch } from "@/components/brand/textures";
import { iconNames } from "@/components/icons/icon";
import { brand, palette } from "@/data/copy";

export const metadata: Metadata = {
  title: "Marca",
  description: "Manual de identidade vivo da Remanesce: logotipo, cores, fontes, texturas, ícones e modos de aplicação.",
};

const sections = [
  ["logo", "Logo"],
  ["cores", "Cores"],
  ["fontes", "Fontes"],
  ["texturas", "Texturas"],
  ["icones", "Ícones"],
  ["aplicacoes", "Aplicações"],
] as const;

function Section({ id, n, title, intro, children }: { id: string; n: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-24 border-t border-dashed border-cobre/50 py-16 md:py-24 print:break-before-page">
      <p className="label text-cobre">{n}</p>
      <h2 id={`${id}-titulo`} className="serif mt-2 text-h2 text-casca">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-indigo/75">{intro}</p>
      <div className="mt-12">{children}</div>
    </section>
  );
}

const fonts = [
  {
    role: "Títulos",
    name: "Bodoni Moda",
    className: "serif",
    sample: "O que permanece, renasce.",
    why: "Serifa de alto contraste, editorial, linhagem de maison. As hastes finas e grossas lembram o pesponto sobre o denim. Itálico nas palavras-chave.",
    weights: "Variável · 400 a 900 · itálico",
  },
  {
    role: "Subtítulos, rótulos e preços",
    name: "IBM Plex Mono",
    className: "font-mono uppercase tracking-[0.08em]",
    sample: "RMN-04-SAI · R$ 1.490,00",
    why: "Voz de etiqueta, arquivo e catalogação: memória registrada, código da peça, tag de jeans. Sempre em caixa alta, tracking 0,08em.",
    weights: "400 · 500",
  },
  {
    role: "Texto corrido",
    name: "Instrument Sans",
    className: "font-sans",
    sample: "A permanência não é ficar parado, é continuar existindo em outra forma.",
    why: "Sans contemporânea, legível e neutra, que deixa a serifa e a mono brilharem.",
    weights: "400 · 500",
  },
];

const scale = [
  ["Display", "text-display", "Bodoni 160–220px"],
  ["H1", "text-h1", "96px"],
  ["H2", "text-h2", "64px"],
  ["H3", "text-h3", "40px"],
  ["H4", "text-h4", "28px"],
] as const;

export default async function BrandPage() {
  const qrSvg = await QRCode.toString(`${brand.siteUrl}/passaporte/RMN-04-SAI`, {
    type: "svg",
    margin: 0,
    color: { dark: "#161B27", light: "#0000" },
  });

  return (
    <div className="pt-[calc(var(--spacing-header)+3rem)]">
      <header className="container-x flex flex-wrap items-end justify-between gap-8 pb-12">
        <div>
          <p className="label text-cobre">Manual de identidade · itens 8 a 12</p>
          <h1 className="serif mt-4 text-h1 text-casca">
            A <em>marca</em>
          </h1>
          <p className="mt-6 max-w-xl text-[1.1rem] text-indigo/80">
            Um manual vivo: tudo aqui é o próprio sistema do site. Clique numa cor para copiar o HEX, num ícone para copiar o SVG.
          </p>
        </div>
        <PrintButton />
      </header>

      <div className="container-x grid gap-12 lg:grid-cols-[180px_1fr]">
        <nav aria-label="Seções do manual" className="no-print lg:sticky lg:top-28 lg:self-start">
          <ol className="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-3">
            {sections.map(([id, label], i) => (
              <li key={id}>
                <a href={`#${id}`} className="label flex items-center gap-3 text-indigo/60 hover:text-cobre">
                  <span className="text-indigo/35">{String(i + 1).padStart(2, "0")}</span> {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0">
          {/* 1. Logo */}
          <Section id="logo" n="01" title="Logotipo e símbolo" intro="Uma pinha geométrica feita de escamas em ponta, dentro de um losango vertical. No centro, o pinhão vermelho: o que está guardado por dentro. O logotipo é Bodoni Moda em caixa alta, tracking 0,18em.">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="grid aspect-[4/3] place-items-center bg-linho-escuro p-6 md:col-span-2">
                <Logo variant="horizontal" className="text-[clamp(1.4rem,3vw,2.4rem)]" symbolSize={64} />
              </div>
              <div className="grid aspect-[4/3] place-items-center bg-indigo p-6 text-linho">
                <Logo variant="stacked" className="text-xl" symbolSize={72} />
              </div>
              <div className="grid aspect-[4/3] place-items-center bg-linho-escuro">
                <BrandSymbol size={110} />
              </div>
              <div className="relative grid aspect-[4/3] place-items-center bg-linho-escuro">
                <div className="relative p-6 outline-1 outline-dashed outline-cobre">
                  <BrandSymbol size={80} />
                  <span className="label absolute -top-6 left-0 text-[10px] text-cobre">x</span>
                  <span className="absolute inset-0 -m-[1px] outline-1 outline-indigo/10" />
                </div>
                <p className="label absolute bottom-3 left-3 text-[10px] text-indigo/60">Área de proteção = x (altura do pinhão × 2)</p>
              </div>
              <div className="relative grid aspect-[4/3] place-items-center gap-2 bg-linho-escuro">
                <div className="flex items-end gap-6">
                  <BrandSymbol size={16} />
                  <span className="wordmark text-[11px]">Remanesce</span>
                </div>
                <p className="label absolute bottom-3 left-3 text-[10px] text-indigo/60">Mínimo: símbolo 16px · logotipo 80px de largura</p>
              </div>
            </div>
            <h3 className="label-lg mt-14">Usos incorretos</h3>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["Distorcer", <Logo key="a" className="inline-block scale-x-[1.6] text-lg" />],
                ["Trocar a cor para vermelho", <Logo key="b" className="text-lg text-pinhao" />],
                ["Girar", <Logo key="c" className="inline-block -rotate-12 text-lg" />],
                ["Aplicar sobre imagem sem contraste", <span key="d" className="tex-escamas grid h-full w-full place-items-center bg-denim"><Logo className="text-lg text-indigo" /></span>],
              ].map(([label, el]) => (
                <li key={label as string}>
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-linho-escuro">
                    {el}
                    <svg viewBox="0 0 100 75" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                      <path d="M4 4 96 71" stroke="var(--pinhao)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>
                  <p className="mt-2 text-small text-indigo/70">{label}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* 2. Cores */}
          <Section id="cores" n="02 · item 9" title="Família de cores" intro="Cores extraídas do próprio line-up. Proporção: cerca de 70% linho, 25% índigo e denim, 5% cobre e vermelho. O vermelho quase nunca é superfície: aparece por baixo, nas aberturas.">
            <div className="flex h-10 w-full overflow-hidden ring-1 ring-indigo/10" aria-label="Proporção de uso das cores">
              <span className="bg-linho" style={{ width: "70%" }} />
              <span className="bg-indigo" style={{ width: "25%" }} />
              <span className="bg-cobre" style={{ width: "3%" }} />
              <span className="bg-pinhao" style={{ width: "2%" }} />
            </div>
            <p className="label mt-2 text-indigo/55">70 linho · 25 índigo/denim · 5 cobre + vermelho</p>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {palette.map((c) => (
                <ColorSwatch key={c.token} color={c} />
              ))}
            </div>
          </Section>

          {/* 3. Fontes */}
          <Section id="fontes" n="03 · item 10" title="Família de fontes" intro="Três fontes, três vozes: a serifa editorial que fala da marca, a mono que cataloga como uma etiqueta e a sans que conta com clareza.">
            <div className="space-y-6">
              {fonts.map((f) => (
                <article key={f.name} className="grid gap-6 border border-indigo/10 p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
                  <div>
                    <p className="label text-cobre">{f.role}</p>
                    <p className={`mt-3 text-h3 ${f.className === "serif" ? "serif" : f.className}`}>{f.name}</p>
                    <p className="label mt-3 text-indigo/55">{f.weights}</p>
                    <p className="mt-4 text-small text-indigo/75">{f.why}</p>
                  </div>
                  <div className="flex flex-col justify-between gap-6">
                    <p className={`${f.className} ${f.className === "serif" ? "text-h2" : "text-h4"} leading-tight`}>{f.sample}</p>
                    <p className={`${f.className} break-all text-[1.1rem] text-indigo/60`}>Aa Bb Cc Ç ã é ô 0123456789 R$ — “”</p>
                  </div>
                </article>
              ))}
            </div>
            <h3 className="label-lg mt-14">Escala</h3>
            <ol className="mt-6 divide-y divide-dashed divide-cobre/40 border-y border-dashed border-cobre/40">
              {scale.map(([label, cls, size]) => (
                <li key={label} className="flex items-baseline gap-6 overflow-hidden py-4">
                  <span className="label w-20 shrink-0 text-indigo/55">{label}</span>
                  <span className={`serif ${cls} truncate text-casca`}>Renasce</span>
                  <span className="label ml-auto shrink-0 text-indigo/55">{size}</span>
                </li>
              ))}
              <li className="flex items-baseline gap-6 py-4">
                <span className="label w-20 shrink-0 text-indigo/55">Rótulo</span>
                <span className="label">Coleção 01 · Denim e vermelho</span>
                <span className="label ml-auto text-indigo/55">12–13px</span>
              </li>
              <li className="flex items-baseline gap-6 py-4">
                <span className="label w-20 shrink-0 text-indigo/55">Corpo</span>
                <span>Cada peça é denim. Cada escama, uma memória.</span>
                <span className="label ml-auto shrink-0 text-indigo/55">17/1.6</span>
              </li>
            </ol>
          </Section>

          {/* 4. Texturas */}
          <Section id="texturas" n="04 · item 11" title="Kit de texturas" intro="Seis texturas leves, feitas em SVG e CSS, que carregam a matéria do denim e a geometria da pinha para a tela.">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["Sarja", "Diagonais finas a 63°, como o tecido do jeans. Fundo das seções escuras.", <div key="1" className="tex-sarja h-full w-full bg-indigo" />],
                ["Escamas da pinha", "A textura-assinatura: escamas pontudas sobrepostas em traço cobre.", <div key="2" className="relative h-full w-full bg-indigo"><ScalePattern scale={1.6} opacity={0.7} id="tx-escamas" /></div>],
                ["Pesponto", "Linha tracejada cobre 6/4. Divisórias, contornos em hover, sublinhados.", <div key="3" className="grid h-full w-full content-center gap-6 bg-linho-escuro px-8"><Stitch /><Stitch /><span className="label link-stitch w-fit">Link com pesponto</span></div>],
                ["Losango vermelho", "Como os recortes da calça do look 5: marcador, bullet e ponto de destaque.", <div key="4" className="flex h-full w-full items-center justify-center gap-6 bg-linho-escuro"><Diamond size={10} /><Diamond size={18} /><Diamond size={28} /></div>],
                ["Desfiado", "Borda irregular com franjas que termina seções, como a barra da saia do look 1.", <div key="5" className="relative h-full w-full bg-linho-escuro"><div className="h-1/2 bg-indigo" /><FrayedEdge className="absolute inset-x-0 top-1/2" /></div>],
                ["Grão de papel", "Ruído sutil sobre o linho, para o fundo não parecer digital demais.", <div key="6" className="tex-grao h-full w-full bg-linho opacity-90 [background-size:180px]" />],
              ].map(([name, use, el]) => (
                <li key={name as string}>
                  <div className="aspect-[4/3] overflow-hidden ring-1 ring-indigo/10">{el}</div>
                  <p className="serif mt-3 text-[1.2rem]">{name}</p>
                  <p className="mt-1 text-small text-indigo/70">{use}</p>
                </li>
              ))}
            </ul>
          </Section>

          {/* 5. Ícones */}
          <Section id="icones" n="05 · item 12" title="Ícones da marca" intro="Conjunto próprio em 24×24, traço 1,25, cantos levemente arredondados. O mesmo vocabulário das escamas. Guardar é um pinhão: guardar como a gralha guarda a semente.">
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {iconNames.map((n) => (
                <li key={n}>
                  <IconTile name={n} />
                </li>
              ))}
            </ul>
          </Section>

          {/* 6. Aplicações */}
          <Section id="aplicacoes" n="06 · item 8" title="Modos de aplicação" intro="Mockups ilustrados de embalagens, etiquetas, cartões e redes. Materiais crus, índigo e o vermelho sempre por dentro.">
            <div className="grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              <Mockup title="Sacola" caption="Papel kraft cru, símbolo impresso em índigo e alça de cordão vermelho.">
                <BagMockup />
              </Mockup>
              <Mockup title="Caixa" caption="Papelão índigo com escamas em relevo seco. Por dentro, vermelho: a caixa abre como a pinha.">
                <BoxMockup />
              </Mockup>
              <Mockup title="Tag de papel-semente" caption="Frente com o símbolo; verso com “Plante esta etiqueta.” e o QR do Passaporte da Peça.">
                <SeedTagMockup qrSvg={qrSvg} />
              </Mockup>
              <Mockup title="Etiqueta interna bordada" caption="Tecida em índigo com fio linho e código em cobre, costurada no forro.">
                <WovenLabelMockup />
              </Mockup>
              <Mockup title="Patch de couro" caption="Couro vegetal na cintura do jeans, com o símbolo gravado a quente." dark>
                <PatchMockup />
              </Mockup>
              <Mockup title="Cartão de agradecimento" caption="Escrito à mão pela equipe, com o número da araucária plantada pelo pedido.">
                <ThankYouMockup />
              </Mockup>
              <Mockup title="Cartão de visita" caption="Frente índigo com escamas e símbolo; verso linho com os dados e um losango vermelho.">
                <BusinessCardMockup />
              </Mockup>
              <Mockup title="Papel de seda" caption="Seda clara com escamas em índigo, para envolver cada peça.">
                <TissueMockup />
              </Mockup>
              <Mockup title="Instagram" caption="Feed com o line-up e story com um look por vez, frase em Bodoni itálico.">
                <InstagramMockup />
              </Mockup>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
