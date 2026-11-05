"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { priceRange, type Edit } from "@/data/collection";
import { prefersReducedMotion, useReducedMotion } from "@/lib/hooks";
import { toBox, useFlight } from "@/lib/store/flight";
import { getLenis } from "@/components/layout/smooth-scroll";
import { Words } from "@/components/motion/scroll-motion";
import { LookFigure } from "./figure";

/**
 * Abertura do look (telas PRODUTO e PRODUTO SCROLL 1): título gigante no pé da metade
 * esquerda, preso enquanto a coluna da direita rola; a foto ocupa a metade direita da
 * grade (colunas 8–14) do header até a margem de baixo; depois dela, o texto longo do
 * look acende palavra por palavra.
 */
export function LookHero({ edit }: { edit: Edit }) {
  const rootRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const arriving = useFlight((s) => s.flight?.slug === edit.slug);
  const land = useFlight((s) => s.land);
  const [view, setView] = useState(0);

  // Chegando de um card: informa o destino do voo e esconde a foto até a cópia pousar.
  useLayoutEffect(() => {
    const figure = figureRef.current;
    if (!figure || !useFlight.getState().flight) return;
    if (useFlight.getState().flight?.slug !== edit.slug) return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    land(toBox(figure.getBoundingClientRect()));
  }, [edit.slug, land]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const delay = useFlight.getState().flight ? 0.6 : 0.15;
      // Tipografia só em fade (ease in-out): título, depois os rótulos.
      gsap.from("[data-line]", { opacity: 0, duration: 1.1, ease: "sine.inOut", stagger: 0.08, delay });
      gsap.from("[data-meta] > *", { opacity: 0, duration: 0.9, ease: "sine.inOut", stagger: 0.1, delay: delay + 0.3 });
      if (!useFlight.getState().flight) {
        gsap.fromTo(
          figureRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut", delay: 0.05, clearProps: "clipPath" },
        );
      }
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const pieces = edit.pieces.length;
  const views = [
    { key: "frente", label: "Frente", src: edit.image.front, alt: edit.image.alt },
    { key: "costas", label: "Costas", src: edit.image.back, alt: edit.image.backAlt },
  ];

  // Celular: as vistas deslizam na horizontal; o rótulo ativo acompanha a rolagem.
  const scrollerRef = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    const el = scrollerRef.current;
    if (el && el.clientWidth) setView(Math.round(el.scrollLeft / el.clientWidth));
  };
  const show = (i: number) => {
    setView(i);
    const el = scrollerRef.current;
    if (!el || window.matchMedia("(min-width: 1025px)").matches) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section ref={rootRef} className="grid-site relative items-start">
      <div className="order-2 col-span-6 lg:order-1 lg:col-span-7 lg:row-span-2 lg:self-stretch">
        <div className="flex flex-col justify-end pt-10 lg:sticky lg:top-0 lg:h-dvh lg:pb-[var(--pad)] lg:pt-0">
          <h1 className="headline" aria-label={edit.title}>
            {edit.title.split(" ").map((word, i) => (
              <span key={i} data-line className="reveal-line" aria-hidden>
                <span>{word}</span>
              </span>
            ))}
          </h1>
          {/* Rótulos do pé: "LOOK 01 / 3 PEÇAS" na coluna 1 e a coleção na coluna 5. */}
          <div data-meta className="label mt-8 grid grid-cols-6 gap-[var(--gap)] lg:mt-[clamp(48px,7vh,96px)] lg:grid-cols-7">
            <p className="col-span-3 lg:col-span-4">
              Look {String(edit.number).padStart(2, "0")}
              <br />
              <span className="text-muted">
                {pieces} {pieces === 1 ? "peça" : "peças"}
              </span>
            </p>
            <p className="col-span-3">
              O Renascer da Permanência
              <br />
              <span className="text-muted">{priceRange(edit)}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Foto do look: frente e costas (no desktop elas se cruzam; no celular deslizam). */}
      <div className="relative order-1 col-span-6 pt-[var(--header-h)] lg:order-2 lg:col-span-7 lg:col-start-8">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          role="region"
          aria-roledescription="galeria"
          aria-label={`Fotos do look ${edit.title}`}
          className="-mx-[var(--pad)] flex snap-x snap-mandatory gap-[var(--gap)] overflow-x-auto overscroll-x-contain px-[var(--pad)] scroll-px-[var(--pad)] [scrollbar-width:none] lg:mx-0 lg:grid lg:snap-none lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {views.map((v, i) => (
            <figure
              key={v.key}
              className={`w-full shrink-0 snap-start transition-opacity duration-700 ease-[var(--ease)] lg:[grid-area:1/1] ${
                i === view ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0"
              }`}
            >
              <LookFigure
                ref={i === 0 ? figureRef : undefined}
                src={v.src}
                fit={edit.image.fit}
                alt={v.alt}
                priority={i === 0}
                sizes="(min-width: 1025px) 50vw, 100vw"
                className={`aspect-[4/5] w-full lg:ml-auto lg:aspect-auto lg:h-[var(--hero-h)] lg:w-[var(--hero-w)] ${i === 0 && arriving ? "invisible" : ""}`}
              />
            </figure>
          ))}
        </div>
        <div className="label mt-3 flex gap-6 lg:absolute lg:bottom-3 lg:right-4 lg:mt-0" role="group" aria-label="Escolher vista">
          {views.map((v, i) => (
            <button
              key={v.key}
              type="button"
              onClick={() => show(i)}
              aria-pressed={view === i}
              className={`relative min-h-11 transition-colors duration-300 lg:min-h-8 ${view === i ? "text-fg" : "text-muted hover:text-fg"}`}
            >
              {String(i + 1).padStart(2, "0")}. {v.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-2.5 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease)] lg:bottom-1 ${view === i ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="order-3 col-span-6 pb-16 pt-16 lg:col-span-7 lg:col-start-8 lg:pb-[30dvh] lg:pt-[28dvh]">
        <Words text={edit.manifesto} className="statement" />
      </div>
    </section>
  );
}
