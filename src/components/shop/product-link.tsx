import Link from "next/link";
import type { ComponentProps } from "react";
import { editHref, edits } from "@/data/collection";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { slug: string };

/** Link para a peça: abre a página do look que a reúne. */
export function ProductLink({ slug, ...rest }: Props) {
  const edit = edits.find((e) => e.pieces.some((p) => p.slug === slug)) ?? edits[0];
  return <Link href={editHref(edit.slug)} {...rest} />;
}
