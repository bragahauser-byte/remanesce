import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BrandSymbol } from "@/components/brand/logo";
import { Stitch } from "@/components/brand/textures";
import { Icon } from "@/components/icons/icon";
import { ProductImage } from "@/components/shop/product-image";
import { ProductLink } from "@/components/shop/product-link";
import { ParanaMap } from "@/components/story/parana-map";
import { PassportMemories, TreeNumber } from "@/components/story/passport-client";
import { plantingPoints, raiz } from "@/data/copy";
import { getLook } from "@/data/looks";
import { getProductByCode, products } from "@/data/products";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ codigo: p.code }));
}

export async function generateMetadata({ params }: PageProps<"/passaporte/[codigo]">): Promise<Metadata> {
  const { codigo } = await params;
  const product = getProductByCode(codigo);
  return product ? { title: `Passaporte · ${product.name}`, description: product.story, robots: { index: false } } : {};
}

/** Passaporte da Peça: a página que o QR da etiqueta abre. */
export default async function PassportPage({ params }: PageProps<"/passaporte/[codigo]">) {
  const { codigo } = await params;
  const product = getProductByCode(codigo);
  if (!product) notFound();
  const look = product.look ? getLook(product.look) : undefined;
  const index = products.indexOf(product);
  const point = plantingPoints[index % plantingPoints.length];
  const exampleTree = raiz.treesBase - 40 + index * 3;

  return (
    <div className="pt-[calc(var(--spacing-header)+3rem)]">
      <section className="container-x grid gap-12 pb-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative aspect-[3/4] overflow-hidden bg-papel/50 ring-1 ring-tinta/10">
            <ProductImage image={product.images.front} sizes="(min-width: 768px) 40vw, 92vw" priority />
            <span className="absolute left-4 top-4 flex items-center gap-2 bg-branco/90 px-2.5 py-1.5">
              <Icon name="qr" size={16} />
              <span className="label">{product.code}</span>
            </span>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div className="flex items-center gap-3">
            <BrandSymbol size={32} />
            <p className="label text-cobre">Passaporte da Peça</p>
          </div>
          <h1 className="serif mt-6 text-h1 text-tinta">{product.name}</h1>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-dashed border-cobre/50 py-6">
            <div>
              <dt className="label text-tinta/55">Código</dt>
              <dd className="mt-1 font-mono">{product.code}</dd>
            </div>
            <div>
              <dt className="label text-tinta/55">Look</dt>
              <dd className="serif mt-1 text-[1.15rem]">{look ? `${String(look.number).padStart(2, "0")} · ${look.name}` : "Acessório"}</dd>
            </div>
            <div>
              <dt className="label text-tinta/55">Criada em</dt>
              <dd className="mt-1">{formatDate(product.createdAt)}</dd>
            </div>
            <div>
              <dt className="label text-tinta/55">Composição</dt>
              <dd className="mt-1 text-small">Denim 100% algodão</dd>
            </div>
          </dl>
          <div className="mt-8 bg-preto p-6 text-branco">
            <p className="label text-branco/70">Esta peça plantou a araucária</p>
            <p className="serif mt-2 text-h2 leading-none">
              nº{" "}
              <Suspense fallback={new Intl.NumberFormat("pt-BR").format(exampleTree)}>
                <TreeNumber fallback={exampleTree} />
              </Suspense>
            </p>
            <p className="mt-3 flex items-center gap-2 text-small text-branco/80">
              <Icon name="broto" size={18} /> Ponto de plantio: {point.city}, Paraná
            </p>
          </div>
          <h2 className="label-lg mt-10">A história da peça</h2>
          <p className="mt-3 text-[1.1rem] leading-relaxed">{product.story}</p>
          {look && <p className="serif mt-3 italic text-tinta">“{look.line}”</p>}
          <ProductLink slug={product.slug} className="label link-stitch mt-6 inline-block">
            Ver a peça na loja
          </ProductLink>
        </div>
      </section>

      <section className="container-x pb-20">
        <Stitch />
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <p className="label text-cobre">Onde ela virou árvore</p>
            <p className="serif mt-3 text-h3">{point.city}</p>
            <p className="mt-3 text-small text-tinta/70">Um dos cinco pontos de plantio da Remanesce no Paraná (exemplo do projeto acadêmico).</p>
          </div>
          <div className="text-tinta md:col-span-7 md:col-start-6">
            <ParanaMap highlight={point.city} />
          </div>
        </div>
      </section>

      <section className="tex-sarja bg-tinta py-20 text-branco md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-cobre">Memórias desta peça</p>
            <h2 className="serif mt-3 text-h2">
              Para passar <em>adiante</em>.
            </h2>
            <p className="mt-5 max-w-md text-branco/80">
              Registre onde vocês estiveram e o que viveram. Um dia esta peça muda de mãos, e a história vai junto.
            </p>
            <p className="label mt-4 text-branco/45">As memórias ficam guardadas neste navegador.</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <PassportMemories code={product.code} />
          </div>
        </div>
      </section>
    </div>
  );
}
