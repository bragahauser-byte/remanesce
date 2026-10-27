import Link from "next/link";
import type { ReactNode } from "react";
import { Diamond, Stitch } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { brand } from "@/data/copy";
import { getLook } from "@/data/looks";
import { categoryLabel, products, productsByLook, type Product } from "@/data/products";
import { formatBRL, installmentsLabel } from "@/lib/format";
import { BuyBox } from "./buy-box";
import { ProductCard } from "./product-card";
import { ProductGallery } from "./product-gallery";
import { TypeTag } from "./type-tag";

/** Conteúdo da PDP, usado na página cheia e no painel sobre a grade. */
export function ProductDetail({ product, inPanel = false }: { product: Product; inPanel?: boolean }) {
  const look = product.look ? getLook(product.look) : undefined;
  const siblings = product.look ? productsByLook(product.look).filter((p) => p.slug !== product.slug) : [];
  const related = siblings.length ? siblings : products.filter((p) => p.featured && p.slug !== product.slug).slice(0, 3);
  const TitleTag = inPanel ? "h2" : "h1";

  return (
    <article>
      <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <ProductGallery product={product} priority={!inPanel} />

        <div className={`lg:sticky lg:self-start ${inPanel ? "lg:top-6" : "lg:top-[calc(var(--spacing-header)+1.5rem)]"}`}>
          <nav aria-label="Trilha" className="label flex flex-wrap gap-x-2 text-indigo/55">
            <Link href="/loja" className="hover:text-cobre">
              Loja
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/loja?cat=${product.category}`} className="hover:text-cobre">
              {categoryLabel(product.category)}
            </Link>
            {look && (
              <>
                <span aria-hidden>/</span>
                <span>
                  Look {String(look.number).padStart(2, "0")} · {look.name}
                </span>
              </>
            )}
          </nav>

          <p className="label mt-8 text-cobre">{product.code}</p>
          <TitleTag className="serif mt-2 text-h2 text-casca">{product.name}</TitleTag>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <TypeTag key={t} tag={t} />
            ))}
          </div>

          <p className="mt-6 font-mono text-[1.15rem] tracking-[0.04em]">{formatBRL(product.price)}</p>
          <p className="mt-1 text-small text-indigo/65">{installmentsLabel(product.price)}</p>

          <p className="mt-6 flex items-center gap-2.5 text-small">
            <span aria-hidden className="size-3.5 rounded-full bg-indigo ring-1 ring-indigo/20 ring-offset-2 ring-offset-linho" />
            <Diamond size={6} />
            <span>{product.color}</span>
          </p>
          <p className="mt-5 max-w-md text-body text-indigo/85">{product.short}</p>

          <div className="mt-8">
            <BuyBox product={product} />
          </div>

          <div className="mt-8 flex items-start gap-4 bg-linho-escuro/70 p-5">
            <Icon name="broto" className="mt-0.5 shrink-0 text-araucaria" />
            <div>
              <p className="serif text-[1.2rem] leading-snug">Esta peça planta uma araucária.</p>
              <p className="mt-1 text-small text-indigo/70">
                Ao comprar, uma muda é plantada no Paraná e ganha um número no Passaporte da Peça.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Stitch />
            <Accordion title="A história da peça" defaultOpen>
              <p>{product.story}</p>
              {look && (
                <p className="mt-3 serif italic text-casca">
                  Look {look.name}: {look.line}
                </p>
              )}
            </Accordion>
            <Accordion title="Composição e cuidados">
              <p>{product.composition}</p>
              <ul className="mt-3 space-y-1.5">
                {product.care.map((c) => (
                  <li key={c} className="flex gap-3">
                    <Diamond size={5} className="mt-2" />
                    {c}
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion title="Entrega e trocas">
              <p>
                Enviamos para todo o Brasil em embalagem de papel-semente. Frete grátis acima de R$ 1.500. A primeira
                troca é gratuita em até 30 dias; a peça deve voltar com a tag de papel-semente.
              </p>
            </Accordion>
            <Accordion title="Passaporte da Peça e replantio">
              <p>
                Cada peça tem uma etiqueta com QR Code que abre o seu Passaporte: a história da peça, o número da
                araucária plantada e um espaço para registrar as memórias que ela viver com você.
              </p>
              <Link href={`/passaporte/${product.code}`} className="link-stitch mt-3 inline-block">
                Ver um Passaporte de exemplo
              </Link>
            </Accordion>
          </div>
        </div>
      </div>

      <section aria-labelledby={`completa-${product.slug}`} className="mt-24 md:mt-32">
        <div className="flex items-end justify-between gap-4">
          <h2 id={`completa-${product.slug}`} className="serif text-h3 text-casca">
            {siblings.length ? (
              <>
                Completa o <em>look</em>
              </>
            ) : (
              <>
                Também feito de <em>memória</em>
              </>
            )}
          </h2>
          {look && (
            <Link href="/looks" className="label link-stitch shrink-0">
              Ver os 6 looks
            </Link>
          )}
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {related.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} replace={inPanel} showTags={false} sizes="(min-width: 768px) 22vw, 46vw" />
            </li>
          ))}
        </ul>
      </section>

      <ProductJsonLd product={product} />
    </article>
  );
}

function Accordion({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-dashed border-cobre/50" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
        <span className="label-lg">{title}</span>
        <Icon name="seta-baixo" size={20} className="transition-transform duration-500 ease-remanesce group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-small leading-relaxed text-indigo/80">{children}</div>
    </details>
  );
}

function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    description: product.short,
    image: [`${brand.siteUrl}${product.images.front.src}`, `${brand.siteUrl}${product.images.back.src}`],
    brand: { "@type": "Brand", name: brand.name },
    material: "Denim 100% algodão",
    color: product.color,
    offers: {
      "@type": "Offer",
      url: `${brand.siteUrl}/loja/${product.slug}`,
      priceCurrency: "BRL",
      price: (product.price / 100).toFixed(2),
      availability: product.sizes.some((s) => s.stock > 0) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
