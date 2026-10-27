import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/product-detail";
import { ProductPanel } from "@/components/shop/product-panel";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/** PDP como painel sobre a página atual (rota interceptada). */
export default async function ProductModal({ params }: PageProps<"/loja/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <ProductPanel title={product.name}>
      <ProductDetail product={product} inPanel />
    </ProductPanel>
  );
}
