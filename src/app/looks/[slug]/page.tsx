import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LookHero } from "@/components/look/look-hero";
import { NextBlock } from "@/components/look/next-block";
import { PieceBlock } from "@/components/look/piece-block";
import { editHref, edits, getEdit, nextEdit } from "@/data/collection";

export function generateStaticParams() {
  return edits.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/looks/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const edit = getEdit(slug);
  if (!edit) return {};
  const title = edit.number <= 6 ? `Look ${edit.title}` : edit.title;
  return {
    title,
    description: `${edit.line} ${edit.description}`,
    openGraph: { title, description: edit.line, images: [{ url: edit.image.front, alt: edit.image.alt }] },
  };
}

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
        // As peças alternam a vista do look: costas, frente, costas…
        const back = i % 2 === 0;
        return (
          <PieceBlock
            key={piece.slug}
            piece={piece}
            index={i}
            side={side}
            src={back ? edit.image.back : edit.image.front}
            alt={piece.images[back ? "back" : "front"].alt}
          />
        );
      })}
      <NextBlock
        kicker={next.number <= 6 ? "próximo look" : "e também"}
        title={next.title}
        href={editHref(next.slug)}
        image={{ src: next.image.front, alt: next.image.alt }}
        flightSlug={next.slug}
      />
    </article>
  );
}
