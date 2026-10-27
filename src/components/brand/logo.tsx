import type { SVGProps } from "react";

/*
 * Símbolo: pinha geométrica em escamas (chevrons) dentro de um losango vertical.
 * No centro, entre as escamas, o pinhão vermelho: o que está guardado por dentro.
 */

const chevrons: [number, number][] = [
  // [y do topo, meia-largura]
  [8, 5.2],
  [13, 8],
  [18, 10.8],
  [33, 11.1],
  [38, 8.3],
  [43, 5.5],
];

type SymbolProps = SVGProps<SVGSVGElement> & {
  size?: number;
  /** Cor do pinhão central. Use "currentColor" para versões monocromáticas. */
  seed?: string;
  title?: string;
};

export function BrandSymbol({ size = 40, seed = "var(--pinhao)", title, ...rest }: SymbolProps) {
  return (
    <svg
      width={(size * 40) / 56}
      height={size}
      viewBox="0 0 40 56"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      <path d="M20 1.5 38.5 28 20 54.5 1.5 28z" />
      {chevrons.map(([y, w]) => (
        <path key={y} d={`M${20 - w} ${y}L20 ${y + 4.5}L${20 + w} ${y}`} />
      ))}
      <path
        d="M20 23.2c1.6 1.7 2.4 3.6 2.3 5.9-.1 2.1-1 3.8-2.3 4.6-1.3-.8-2.2-2.5-2.3-4.6-.1-2.3.7-4.2 2.3-5.9z"
        fill={seed}
        stroke="none"
      />
    </svg>
  );
}

type LogoProps = {
  variant?: "wordmark" | "horizontal" | "stacked" | "symbol";
  className?: string;
  /** Altura do símbolo em px (nas variantes que o têm). */
  symbolSize?: number;
  seed?: string;
};

export function Logo({ variant = "wordmark", className = "", symbolSize = 28, seed }: LogoProps) {
  if (variant === "symbol") {
    return <BrandSymbol size={symbolSize} seed={seed} className={className} title="Remanesce" />;
  }
  if (variant === "horizontal") {
    return (
      <span className={`inline-flex items-center gap-[0.6em] ${className}`}>
        <BrandSymbol size={symbolSize} seed={seed} />
        <span className="wordmark leading-none">Remanesce</span>
      </span>
    );
  }
  if (variant === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center gap-[0.5em] ${className}`}>
        <BrandSymbol size={symbolSize} seed={seed} />
        <span className="wordmark leading-none">Remanesce</span>
        <span className="label text-[0.42em] tracking-[0.2em] opacity-70">O que permanece, renasce.</span>
      </span>
    );
  }
  return <span className={`wordmark leading-none ${className}`}>Remanesce</span>;
}
