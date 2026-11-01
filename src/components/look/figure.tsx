/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, Ref } from "react";

type FigureProps = {
  src: string;
  alt: string;
  /** Vista de costas que aparece no hover (cards do início). */
  back?: string;
  /** "cover": foto de estúdio que preenche a moldura; "contain": recorte sem fundo. */
  fit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLDivElement>;
  /** Ponto focal e ampliação leve, para destacar uma peça dentro do look. */
  focus?: string;
  zoom?: number;
  priority?: boolean;
  /** Largura de exibição para o srcset (fotos de 800 e 1600 px). */
  sizes?: string;
};

/** "…-1600.webp" → srcset com a versão de 800 px. Outros arquivos não têm variações. */
export function srcSetOf(src: string) {
  return src.endsWith("-1600.webp") ? `${src.replace(/-1600\.webp$/, "-800.webp")} 800w, ${src} 1600w` : undefined;
}

/**
 * A roupa sobre o painel de fundo. Fotos de estúdio (quadradas, modelo centralizada)
 * preenchem a moldura com object-fit: cover, então só o fundo lateral fica de fora;
 * recortes sem fundo ocupam 92% da altura. Nos dois casos a proporção da imagem é a
 * original em qualquer moldura, inclusive durante a transição entre card e página.
 */
export function LookFigure({ src, alt, back, fit = "cover", className = "", style, ref, focus, zoom = 1, priority, sizes }: FigureProps) {
  const img =
    fit === "cover"
      ? "h-full w-full object-cover object-center [grid-area:1/1]"
      : "h-[92%] w-auto max-w-[92%] object-contain [grid-area:1/1]";
  // Uma foto quadrada numa moldura retrato é cortada pela altura: o srcset precisa da largura equivalente.
  const sz = sizes ?? "(min-width: 1025px) 60vw, 125vw";
  return (
    <div ref={ref} style={style} className={`relative grid place-items-center overflow-hidden bg-panel ${className}`}>
      <div
        className="absolute inset-0 grid grid-cols-1 grid-rows-1 place-items-center"
        style={zoom !== 1 ? { transform: `scale(${zoom})`, transformOrigin: focus ?? "50% 50%" } : undefined}
      >
        <img
          src={src}
          srcSet={srcSetOf(src)}
          sizes={srcSetOf(src) ? sz : undefined}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`${img} ${back ? "transition-opacity duration-500 ease-[var(--ease)] pointer-fine:group-hover:opacity-0" : ""}`}
        />
        {back && (
          <img
            src={back}
            srcSet={srcSetOf(back)}
            sizes={srcSetOf(back) ? sz : undefined}
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
