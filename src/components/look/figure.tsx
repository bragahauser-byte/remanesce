/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, Ref } from "react";

type FigureProps = {
  src: string;
  alt: string;
  /** Vista de costas que aparece no hover (cards do início). */
  back?: string;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
  /** Ponto focal e ampliação leve, para destacar uma peça dentro do look. */
  focus?: string;
  zoom?: number;
  priority?: boolean;
};

/**
 * A roupa recortada sobre o painel de fundo. A figura ocupa 92% da altura do
 * painel em qualquer tamanho, então o card e a página do look têm a mesma
 * proporção e a transição entre eles não deforma a imagem.
 */
export function LookFigure({ src, alt, back, className = "", style, ref, focus, zoom = 1, priority }: FigureProps) {
  const img = "h-[92%] w-auto max-w-[92%] object-contain [grid-area:1/1]";
  return (
    <div ref={ref} style={style} className={`relative grid place-items-center overflow-hidden bg-panel ${className}`}>
      <div
        className="absolute inset-0 grid grid-cols-1 grid-rows-1 place-items-center"
        style={zoom !== 1 ? { transform: `scale(${zoom})`, transformOrigin: focus ?? "50% 50%" } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`${img} ${back ? "transition-opacity duration-500 ease-[var(--ease)] pointer-fine:group-hover:opacity-0" : ""}`}
        />
        {back && (
          <img
            src={back}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className={`${img} opacity-0 transition-opacity duration-500 ease-[var(--ease)] pointer-fine:group-hover:opacity-100`}
          />
        )}
      </div>
    </div>
  );
}
