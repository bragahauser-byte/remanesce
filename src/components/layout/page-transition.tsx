"use client";

import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ComponentProps } from "react";
import { prefersReducedMotion } from "@/lib/hooks";
import { getLenis } from "./smooth-scroll";

/*
 * Transição entre páginas para os links de texto (logotipo, "Início", fim de página):
 * a página atual some em opacidade, a rota troca e a nova entra subindo 24 px.
 * Só opacidade e deslocamento: nada muda de escala. Os cards (voo da imagem) e o
 * menu têm transições próprias e não passam por aqui.
 */

const stage = () => document.getElementById("stage");
let pending: string | null = null;
let safety = 0;

/** Sai da página atual e navega. Cliques repetidos durante a saída são ignorados. */
export function leaveTo(href: string, push: (href: string) => void) {
  if (pending) return;
  const el = stage();
  if (!el || prefersReducedMotion()) return push(href);
  pending = href;
  gsap.to(el, { opacity: 0, duration: 0.32, ease: "power2.in", overwrite: true, onComplete: () => push(href) });
  // Se a rota não trocar (erro de rede), a página volta a aparecer em vez de ficar vazia.
  window.clearTimeout(safety);
  safety = window.setTimeout(() => {
    pending = null;
    gsap.to(el, { opacity: 1, duration: 0.3, clearProps: "opacity" });
  }, 4000);
}

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Link com a transição de saída. Mesma página: só volta ao topo. */
export function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        if (pathname === href) {
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(0, { duration: 1 });
          else window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        leaveTo(href, (to) => router.push(to));
      }}
      {...rest}
    />
  );
}

export function HomeLink(props: Omit<Props, "href">) {
  return <TransitionLink href="/" {...props} />;
}

/** Montado uma vez no layout: revela a página nova depois de uma saída com leaveTo. */
export function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pending) return;
    pending = null;
    window.clearTimeout(safety);
    const el = stage();
    if (!el) return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out", clearProps: "opacity" }, 0);
    tl.fromTo("#conteudo > *", { y: 24 }, { y: 0, duration: 0.9, ease: "expo.out", clearProps: "transform" }, 0);
  }, [pathname]);

  return null;
}
