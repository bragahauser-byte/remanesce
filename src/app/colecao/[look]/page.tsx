import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LookView } from "@/components/story/look-view";
import { looks } from "@/data/looks";
import { productsByLook } from "@/data/products";

export function generateStaticParams() {
  return looks.map((l) => ({ look: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/colecao/[look]">): Promise<Metadata> {
  const { look: slug } = await params;
  const look = looks.find((l) => l.slug === slug);
  return look ? { title: `Look ${look.name}`, description: `${look.line} ${look.description}` } : {};
}

export default async function LookPage({ params }: PageProps<"/colecao/[look]">) {
  const { look: slug } = await params;
  const look = looks.find((l) => l.slug === slug);
  if (!look) notFound();
  const pieces = productsByLook(look.number);
  return <LookView look={look} pieces={pieces} total={pieces.reduce((n, p) => n + p.price, 0)} />;
}
