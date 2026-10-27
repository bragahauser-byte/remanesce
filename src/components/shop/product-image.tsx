import Image from "next/image";
import type { ProductImage as ProductImageData } from "@/data/products";

type Props = {
  image: ProductImageData;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Sobrescreve o alt (ex.: imagem decorativa duplicada). */
  alt?: string;
};

/**
 * Foto do look inteiro (contida, flutuando sobre o linho) ou recorte de detalhe
 * (cobre a moldura, com ponto focal e ampliação). Preencha o pai com position: relative.
 */
export function ProductImage({ image, sizes, className = "", priority, alt }: Props) {
  const detail = image.kind === "detalhe";
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={image.src.endsWith(".svg")}
      className={`${detail ? "object-cover" : "object-contain"} ${className}`}
      style={
        detail
          ? {
              objectPosition: image.objectPosition,
              transform: `scale(${image.zoom ?? 1})`,
              transformOrigin: image.objectPosition,
            }
          : undefined
      }
    />
  );
}
