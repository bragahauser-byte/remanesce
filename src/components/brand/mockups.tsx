import Image from "next/image";
import type { ReactNode } from "react";
import { looks } from "@/data/looks";
import { asset } from "@/lib/paths";
import { BrandSymbol } from "./logo";
import { ScalePattern } from "./textures";

/*
 * Modos de aplicação (item 8): mockups ilustrados em SVG/CSS, sem fotos.
 * Cores de materiais (kraft, couro) ficam aqui por serem matéria, não marca.
 */

const KRAFT = "#C8A47A";
const KRAFT_DARK = "#A9855C";
const LEATHER = "#7A4526";

export function Mockup({ title, caption, children, dark = false }: { title: string; caption: string; children: ReactNode; dark?: boolean }) {
  return (
    <figure className="break-inside-avoid">
      <div className={`relative grid aspect-[4/3] place-items-center overflow-hidden ${dark ? "bg-preto" : "bg-papel"}`}>{children}</div>
      <figcaption className="mt-4">
        <p className="serif text-h4">{title}</p>
        <p className="mt-1 text-small text-tinta/70">{caption}</p>
      </figcaption>
    </figure>
  );
}

/* 1. Sacola de papel kraft com alça de cordão vermelho */
export function BagMockup() {
  return (
    <div className="relative aspect-[4/3] h-[88%]" aria-hidden>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        <ellipse cx="200" cy="280" rx="110" ry="8" fill="#000" opacity=".12" />
        <path d="M150 84c0-46 100-46 100 0" fill="none" stroke="var(--pinhao)" strokeWidth="3" />
        <path d="M118 80h164l14 196H104z" fill={KRAFT} />
        <path d="M282 80l14 196h-22l-8-196z" fill={KRAFT_DARK} opacity=".7" />
        <path d="M118 80h164v14H118z" fill={KRAFT_DARK} opacity=".55" />
        <circle cx="150" cy="88" r="3.5" fill="#6B4E30" />
        <circle cx="250" cy="88" r="3.5" fill="#6B4E30" />
      </svg>
      <div className="absolute inset-x-0 top-[44%] flex flex-col items-center gap-3 text-tinta">
        <BrandSymbol size={58} />
        <span className="wordmark text-[12px]">Remanesce</span>
      </div>
    </div>
  );
}

/* 2. Caixa índigo com escamas que abre no hover, revelando o vermelho */
export function BoxMockup() {
  return (
    <div className="group relative h-[62%] w-[58%] [perspective:900px]" aria-hidden>
      <div className="absolute inset-0 bg-pinhao shadow-[inset_0_10px_30px_rgb(0_0_0/0.5)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-tinta">
        <ScalePattern scale={1.1} opacity={0.6} id="escamas-caixa" />
      </div>
      <div className="absolute inset-0 origin-top bg-tinta shadow-xl transition-transform duration-[900ms] ease-remanesce [transform-style:preserve-3d] group-hover:[transform:rotateX(68deg)]">
        <ScalePattern scale={1.1} opacity={0.6} id="escamas-tampa" />
        <div className="absolute inset-0 grid place-items-center text-branco">
          <BrandSymbol size={64} />
        </div>
      </div>
      <p className="label absolute -bottom-7 left-0 right-0 text-center text-tinta/55">Passe o mouse para abrir</p>
    </div>
  );
}

/* 3. Tag de papel-semente, frente e verso */
const seeds = Array.from({ length: 34 }, (_, i) => [((i * 53) % 100) / 100, ((i * 37) % 100) / 100]);

function Tag({ children, rotate }: { children: ReactNode; rotate: number }) {
  return (
    <div className="relative" style={{ transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 120 40" className="absolute -top-9 left-1/2 h-10 w-28 -translate-x-1/2">
        <path d="M60 40C40 10 20 4 4 8" fill="none" stroke="var(--pinhao)" strokeWidth="1.5" />
      </svg>
      <div className="relative h-56 w-32 bg-[#EAE3D2] [clip-path:polygon(18%_0,82%_0,100%_12%,100%_100%,0_100%,0_12%)]">
        {seeds.map(([x, y], i) => (
          <span key={i} className="absolute size-[3px] rounded-full bg-[#9C8B6E]" style={{ left: `${x * 92 + 4}%`, top: `${y * 88 + 10}%` }} />
        ))}
        <span className="absolute left-1/2 top-3 size-3 -translate-x-1/2 rounded-full bg-papel ring-1 ring-tinta/30" />
        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-3 pt-6 text-center text-tinta">{children}</div>
      </div>
    </div>
  );
}

export function SeedTagMockup({ qrSvg }: { qrSvg: string }) {
  return (
    <div className="flex items-start gap-8 pt-8" aria-hidden>
      <Tag rotate={-5}>
        <BrandSymbol size={44} />
        <span className="wordmark text-[10px]">Remanesce</span>
        <span className="font-mono text-[7px] tracking-widest">RMN-04-SAI</span>
      </Tag>
      <Tag rotate={4}>
        <span className="serif text-[15px] italic leading-tight">Plante esta etiqueta.</span>
        <span className="block size-16 [&_svg]:h-full [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
        <span className="font-mono text-[6.5px] uppercase leading-snug tracking-wider">Passaporte da Peça</span>
      </Tag>
    </div>
  );
}

/* 4. Etiqueta interna bordada */
export function WovenLabelMockup() {
  return (
    <div className="relative h-24 w-[70%] bg-tinta text-branco shadow-lg" aria-hidden>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.05)_0_1px,transparent_1px_3px)]" />
      <div className="absolute inset-1.5 outline-1 outline-dashed outline-cobre/70" />
      <div className="relative flex h-full flex-col items-center justify-center gap-1">
        <span className="wordmark text-[17px]">Remanesce</span>
        <span className="serif text-[11px] italic text-branco/85">O que permanece, renasce.</span>
        <span className="font-mono text-[8px] tracking-[0.2em] text-cobre">RMN-02-VES · 100% ALGODÃO</span>
      </div>
      <span className="absolute -left-2 top-1/2 h-8 w-3 -translate-y-1/2 bg-tinta [clip-path:polygon(100%_0,0_50%,100%_100%)]" />
      <span className="absolute -right-2 top-1/2 h-8 w-3 -translate-y-1/2 bg-tinta [clip-path:polygon(0_0,100%_50%,0_100%)]" />
    </div>
  );
}

/* 5. Patch de couro da cintura */
export function PatchMockup() {
  return (
    <div className="tex-sarja grid h-full w-full place-items-center bg-preto" aria-hidden>
      <div className="relative grid h-[44%] w-[62%] place-items-center rounded-md shadow-[0_6px_14px_rgb(0_0_0/0.35)]" style={{ background: `radial-gradient(circle at 30% 30%, #8F5634, ${LEATHER} 70%)` }}>
        <div className="absolute inset-2 rounded outline-1 outline-dashed outline-[#D9A066]/70" />
        <div className="flex items-center gap-3 text-[#4A2412] [filter:drop-shadow(0_1px_0_rgb(255_255_255/0.18))]">
          <BrandSymbol size={40} seed="#4A2412" />
          <span className="wordmark text-[12px]">Remanesce</span>
        </div>
      </div>
    </div>
  );
}

/* 6. Cartão de agradecimento */
export function ThankYouMockup() {
  return (
    <div className="relative w-[62%] rotate-[-2deg] bg-branco p-6 shadow-[0_10px_30px_rgb(22_27_39/0.18)]" aria-hidden>
      <BrandSymbol size={26} />
      <p className="serif mt-3 text-[15px] italic leading-relaxed text-tinta/85 [font-variation-settings:'opsz'_11]">
        Helena, obrigada por levar a Saia Guacira. Que ela guarde muitas histórias.
      </p>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-tinta">Sua araucária: nº 1.285</p>
      <p className="serif mt-3 text-right text-[13px] italic text-tinta">com carinho, equipe Remanesce</p>
    </div>
  );
}

/* 7. Cartão de visita, frente e verso */
export function BusinessCardMockup() {
  return (
    <div className="relative h-[70%] w-[78%]" aria-hidden>
      <div className="absolute left-0 top-0 grid h-[62%] w-[66%] rotate-[-6deg] place-items-center bg-tinta text-branco shadow-xl">
        <ScalePattern scale={0.8} opacity={0.25} id="escamas-cartao" />
        <BrandSymbol size={48} />
      </div>
      <div className="absolute bottom-0 right-0 flex h-[62%] w-[66%] rotate-[4deg] flex-col justify-between bg-branco p-4 shadow-xl">
        <div>
          <p className="serif text-[15px]">Maria Fernanda</p>
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-tinta/60">Direção criativa</p>
        </div>
        <div className="font-mono text-[7px] uppercase leading-relaxed tracking-[0.1em] text-tinta/75">
          contato@remanesce.com.br
          <br />
          Curitiba · Paraná
        </div>
        <span className="absolute bottom-3 right-3 h-3 w-1.5 bg-pinhao [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
      </div>
    </div>
  );
}

/* 8. Papel de seda com escamas */
export function TissueMockup() {
  return (
    <div className="relative h-[78%] w-[78%] rotate-[3deg] bg-[#F7F4EE]/90 shadow-[0_8px_24px_rgb(22_27_39/0.12)] [clip-path:polygon(0_0,100%_0,100%_78%,80%_100%,0_100%)]" aria-hidden>
      <ScalePattern scale={1.4} opacity={0.5} stroke="#2B3445" id="escamas-seda" />
      <div className="absolute bottom-0 right-0 h-[22%] w-[20%] bg-papel [clip-path:polygon(0_0,100%_0,0_100%)] shadow-[-2px_-2px_6px_rgb(0_0_0/0.1)]" />
    </div>
  );
}

/* 9. Instagram: feed e story */
export function InstagramMockup() {
  return (
    <div className="flex h-[86%] items-center gap-5" aria-hidden>
      <div className="flex aspect-[4/5] h-[86%] flex-col bg-white shadow-lg">
        <div className="flex items-center gap-1.5 p-1.5">
          <span className="grid size-4 place-items-center rounded-full bg-tinta text-branco">
            <BrandSymbol size={10} seed="var(--linho)" />
          </span>
          <span className="text-[7px] font-medium">remanesce</span>
        </div>
        <div className="relative flex-1 bg-branco">
          <Image src={asset("/images/lineup/lineup-frente.jpg")} alt="" fill sizes="200px" className="object-cover object-[50%_70%]" />
          <span className="label absolute bottom-1.5 left-1.5 bg-tinta px-1 text-[6px] text-branco">Coleção 01</span>
        </div>
        <p className="p-1.5 text-[6.5px] leading-snug">
          <b>remanesce</b> O que permanece, renasce. 🌲
        </p>
      </div>
      <div className="relative flex aspect-[9/16] h-full flex-col justify-between overflow-hidden bg-tinta p-3 text-branco shadow-lg">
        <div className="tex-sarja absolute inset-0" />
        <div className="relative h-0.5 bg-branco/30">
          <div className="h-full w-1/2 bg-branco" />
        </div>
        <div className="relative mx-auto h-[52%] w-[60%] bg-branco">
          <Image src={looks[3].front} alt="" fill sizes="80px" className="object-contain" />
        </div>
        <div className="relative">
          <p className="serif text-[13px] italic leading-tight">O vermelho escondido sob as escamas.</p>
          <p className="mt-1 font-mono text-[6px] uppercase tracking-[0.14em] text-cobre">Look 04 · Guacira</p>
        </div>
      </div>
    </div>
  );
}
