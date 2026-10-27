import { seeded } from "@/lib/random";

/* Kit de texturas (item 11) em componentes. Versões CSS em src/styles/textures.css. */

/** 3. Pesponto: linha tracejada cobre usada como divisória. */
export function Stitch({
  className = "",
  vertical = false,
  color = "var(--cobre)",
}: {
  className?: string;
  vertical?: boolean;
  color?: string;
}) {
  return (
    <svg
      aria-hidden
      className={`${vertical ? "h-full w-px" : "h-px w-full"} block ${className}`}
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="0"
        x2={vertical ? "0" : "100%"}
        y2={vertical ? "100%" : "0"}
        stroke={color}
        strokeWidth="2"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

/** 4. Losango vermelho: marcador, bullet, ponto de destaque. */
export function Diamond({ className = "", size = 10, color = "var(--pinhao)" }: { className?: string; size?: number; color?: string }) {
  return (
    <svg aria-hidden width={size} height={size * 2} viewBox="0 0 10 20" className={`inline-block shrink-0 ${className}`}>
      <path d="M5 0 10 10 5 20 0 10z" fill={color} />
    </svg>
  );
}

function frayPaths(seed: number) {
  const rand = seeded(seed);
  const width = 1200;
  let body = `M0 0H${width}V6`;
  const threads: string[] = [];
  for (let x = width; x >= 0; x -= 3) {
    const long = rand() > 0.9;
    const y = 6 + rand() * (long ? 14 : 6);
    body += `L${x.toFixed(1)} ${y.toFixed(1)}`;
    if (rand() > 0.72) {
      const tx = x + (rand() - 0.5) * 2;
      threads.push(`M${tx.toFixed(1)} ${(y - 1).toFixed(1)}l${((rand() - 0.5) * 3).toFixed(1)} ${(4 + rand() * 9).toFixed(1)}`);
    }
  }
  body += "L0 6z";
  return { body, threads: threads.join("") };
}

const frays = new Map<number, ReturnType<typeof frayPaths>>();
function getFray(seed: number) {
  if (!frays.has(seed)) frays.set(seed, frayPaths(seed));
  return frays.get(seed)!;
}

/**
 * 5. Desfiado: borda irregular com franjas, como a barra da saia do look 1.
 * `side="bottom"`: franjas caem abaixo da seção. `side="top"`: sobem acima dela.
 */
export function FrayedEdge({
  color = "var(--indigo)",
  side = "bottom",
  className = "",
  seed = 7,
}: {
  color?: string;
  side?: "top" | "bottom";
  className?: string;
  seed?: number;
}) {
  const { body, threads } = getFray(seed);
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 26"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-[18px] w-full md:h-[26px] ${side === "top" ? "-scale-y-100" : ""} ${className}`}
    >
      <path d={body} fill={color} />
      <path d={threads} stroke={color} strokeWidth="0.8" fill="none" opacity="0.8" />
    </svg>
  );
}

/** Borda de escamas pontudas (painel de transição, divisórias). */
export function ScaleEdge({ color = "var(--indigo)", className = "", count = 24 }: { color?: string; className?: string; count?: number }) {
  const w = 1200 / count;
  let d = "M0 0H1200V2";
  for (let i = count; i > 0; i--) {
    const x0 = i * w;
    const mid = x0 - w / 2;
    d += `C${x0 - w * 0.08} 18 ${mid + w * 0.18} 30 ${mid} 44C${mid - w * 0.18} 30 ${x0 - w + w * 0.08} 18 ${x0 - w} 2`;
  }
  d += "z";
  return (
    <svg aria-hidden viewBox="0 0 1200 44" preserveAspectRatio="none" className={`block w-full ${className}`}>
      <path d={d} fill={color} />
    </svg>
  );
}

/** 2. Escamas da pinha como SVG (escala livre). */
export function ScalePattern({
  className = "",
  stroke = "var(--cobre)",
  opacity = 0.5,
  scale = 1,
  id = "escamas",
}: {
  className?: string;
  stroke?: string;
  opacity?: number;
  scale?: number;
  id?: string;
}) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width={28 * scale} height={22 * scale} patternUnits="userSpaceOnUse">
          <g
            transform={`scale(${scale})`}
            fill="none"
            stroke={stroke}
            strokeWidth={0.8 / scale}
            strokeLinecap="round"
            strokeOpacity={opacity}
          >
            <path d="M0 0C1 8 7 13 14 22C21 13 27 8 28 0" />
            <path d="M0 11C7 2 13-3 14-11M14-11C15-3 21 2 28 11" />
            <path d="M0 33C7 24 13 19 14 11C15 19 21 24 28 33" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** 6. Grão de papel, aplicado uma vez sobre a página inteira. */
export function GrainOverlay() {
  return <div aria-hidden className="grain-overlay tex-grao no-print" />;
}
