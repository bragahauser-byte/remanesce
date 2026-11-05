import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { Film } from "@/components/look/film";
import { LookHero } from "@/components/look/look-hero";
import { NextBlock } from "@/components/look/next-block";
import { PieceBlock } from "@/components/look/piece-block";
import { ScrollMotion } from "@/components/motion/scroll-motion";
import { editHref, edits, getEdit, nextEdit } from "@/data/collection";

export function generateStaticParams() {
  return edits.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/looks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) return {};
  const title = `Look ${edit.title}`;
  return {
    title,
    description: `${edit.line} ${edit.description}`,
    openGraph: { title, description: edit.line, images: [{ url: edit.image.front, alt: edit.image.alt }] },
  };
}

/** Página do look: telas PRODUTO e PRODUTO SCROLL 1–5. */
export default async function LookPage({ params }: PageProps<"/looks/[slug]">) {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) notFound();
  const next = nextEdit(slug);

  return (
    <article>
      <LookHero edit={edit} />
      {edit.pieces.map((piece, i) => {
        const flip = i % 2 === 1;
        const side = flip ? (edit.startSide === "left" ? "right" : "left") : edit.startSide;
        return <PieceBlock key={piece.slug} piece={piece} index={i} side={side} />;
      })}
      <Film poster={edit.film.poster} video={edit.film.video} alt={`Look ${edit.title} no estúdio, de corpo inteiro.`} />
      <NextBlock
        kicker="próximo look"
        title={next.title}
        href={editHref(next.slug)}
        image={{ src: next.image.front, alt: next.image.alt, fit: next.image.fit }}
        flightSlug={next.slug}
      />
      <SiteFooter />
      <ScrollMotion />
    </article>
  );
}
