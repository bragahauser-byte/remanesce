"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { productHref, useProductPanel } from "@/lib/store/product-panel";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { slug: string };

/**
 * Link para a peça. Clique simples abre a PDP como painel sobre a página atual
 * (a URL muda para /loja/[slug]); abrir em nova aba ou recarregar leva à página cheia.
 */
export function ProductLink({ slug, onClick, ...rest }: Props) {
  const open = useProductPanel((s) => s.open);
  return (
    <Link
      href={productHref(slug)}
      scroll={false}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        open(slug);
      }}
      {...rest}
    />
  );
}
