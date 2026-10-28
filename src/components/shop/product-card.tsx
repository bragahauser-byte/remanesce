import type { Product } from "@/data/products";
import { formatBRL } from "@/lib/format";
import { ProductImage } from "./product-image";
import { ProductLink } from "./product-link";
import { SaveButton } from "./save-button";
import { TypeTag } from "./type-tag";

type Props = {
  product: Product;
  /** "look": foto inteira; "detalhe": recorte da peça como imagem principal. */
  mode?: "look" | "detalhe";
  sizes?: string;
  aspect?: string;
  showTags?: boolean;
  priority?: boolean;
};

/**
 * Card de produto. No hover, a foto troca de frente para costas e o card sobe,
 * revelando uma faixa vermelha por baixo, como o forro.
 */
export function ProductCard({
  product,
  mode = "look",
  sizes = "(min-width: 768px) 25vw, 50vw",
  aspect = "aspect-[3/4]",
  showTags = true,
  priority,
}: Props) {
  const primary = mode === "detalhe" ? product.images.details[0] : product.images.front;
  const secondary = mode === "detalhe" ? product.images.front : product.images.back;

  return (
    <article className="group relative">
      <ProductLink
        slug={product.slug}
        data-cursor="ver"
        className="block focus-visible:outline-offset-8"
        aria-label={`${product.name}, ${formatBRL(product.price)}`}
      >
        <div className="relative">
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-2 bg-pinhao" />
          <div
            className={`relative overflow-hidden bg-branco transition-transform duration-700 ease-remanesce group-hover:-translate-y-1.5 ${aspect}`}
          >
            <ProductImage
              image={primary}
              sizes={sizes}
              priority={priority}
              className="transition-opacity duration-700 ease-remanesce group-hover:opacity-0"
            />
            <ProductImage
              image={secondary}
              alt=""
              sizes={sizes}
              className="opacity-0 transition-opacity duration-700 ease-remanesce group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-3 opacity-0 outline-1 outline-dashed outline-cobre/70 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>
        {showTags && product.tags.length > 0 && (
          <div className="pointer-events-none absolute left-2 top-3 flex flex-col items-start gap-1.5 md:left-3">
            {product.tags.slice(0, 2).map((t) => (
              <TypeTag key={t} tag={t} />
            ))}
          </div>
        )}
      </ProductLink>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="label text-tinta/55">{product.code}</p>
          <h3 className="serif mt-1 text-[1.15rem] leading-tight md:text-[1.35rem]">
            <ProductLink slug={product.slug} tabIndex={-1} className="hover:text-tinta">
              {product.name}
            </ProductLink>
          </h3>
          <p className="label mt-1.5 text-tinta">{formatBRL(product.price)}</p>
        </div>
        <SaveButton slug={product.slug} name={product.name} className="-mr-2 -mt-1 shrink-0 p-2" />
      </div>
    </article>
  );
}
