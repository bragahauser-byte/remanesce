import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/product-detail";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/loja/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short,
    openGraph: { title: product.name, description: product.short, images: [{ url: product.images.front.src, alt: product.images.front.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/loja/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <div className="container-x pt-[calc(var(--spacing-header)+1.5rem)] md:pt-[calc(var(--spacing-header)+2.5rem)]">
      <ProductDetail product={product} />
    </div>
  );
}
