"use client";

import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { microcopy } from "@/data/copy";
import { useReducedMotion } from "@/lib/hooks";
import { toBox, useFlight } from "@/lib/store/flight";
import { LookFigure } from "./figure";

type Props = {
  kicker: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
  /** Com o slug do look, a miniatura voa até a foto da página seguinte. */
  flightSlug?: string;
};

/**
 * Fim de página da referência ("next case"): título gigante no pé à esquerda e a
 * miniatura do próximo destino no canto direito.
 */
export function NextBlock({ kicker, title, href, image, flightSlug }: Props) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const startFlight = useFlight((s) => s.start);
  const figureRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!flightSlug || reduced || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const figure = figureRef.current;
    if (!figure) return;
    e.preventDefault();
    if (busy.current) return;
    busy.current = true;
    startFlight({ slug: flightSlug, src: image.src, from: toBox(figure.getBoundingClientRect()) });
    gsap.set(figure, { visibility: "hidden" });
    gsap.to(e.currentTarget.querySelectorAll("[data-fade]"), {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => router.push(href),
    });
  };

  return (
    <footer className="mt-32 lg:mt-48">
      <Link href={href} onClick={onClick} className="group grid-site min-h-[60dvh] items-end pb-[var(--pad)]">
        <p data-fade className="headline col-span-6 lg:col-span-10">
          <span className="block">{kicker}</span>
          <span className="block text-muted transition-colors duration-500 group-hover:text-fg">{title}</span>
        </p>
        <LookFigure
          ref={figureRef}
          src={image.src}
          alt={image.alt}
          className="col-span-2 col-start-5 mt-8 aspect-[396/496] w-full lg:col-span-2 lg:col-start-13 lg:mt-0"
        />
      </Link>
      <div className="grid-site label border-t border-line py-4 text-muted">
        <p className="col-span-3 lg:col-span-4">© 2026 Remanesce</p>
        <p className="col-span-3 lg:col-span-6">{microcopy.academic}</p>
      </div>
    </footer>
  );
}
