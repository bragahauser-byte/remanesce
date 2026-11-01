"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { priceRange, type Edit } from "@/data/collection";
import { prefersReducedMotion, useReducedMotion } from "@/lib/hooks";
import { toBox, useFlight } from "@/lib/store/flight";
import { getLenis } from "@/components/layout/smooth-scroll";
import { LookFigure } from "./figure";

/**
 * Abertura do look (referência: página de case). Título gigante em caixa baixa no
 * pé da metade esquerda, preso enquanto a coluna da direita rola; foto na metade
 * direita, de cima a baixo; a declaração entra logo abaixo da foto.
 */
export function LookHero({ edit }: { edit: Edit }) {
  const rootRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const arriving = useFlight((s) => s.flight?.slug === edit.slug);
  const land = useFlight((s) => s.land);

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
      const delay = useFlight.getState().flight ? 0.55 : 0.15;
      gsap.from("[data-line] > span", { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.08, delay });
      gsap.from("[data-meta]", { opacity: 0, duration: 0.8, delay: delay + 0.4 });
      if (!useFlight.getState().flight) {
        gsap.from(figureRef.current, { opacity: 0, duration: 0.8, ease: "power2.out", delay: 0.1 });
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
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = scrollerRef.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const show = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reduce = prefersReducedMotion();
    el.scrollTo({ left: i * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={rootRef} className="grid-site relative items-start">
      <div className="order-2 col-span-6 lg:order-1 lg:col-span-8 lg:row-span-2 lg:self-stretch">
        <div className="flex flex-col justify-end pt-6 lg:sticky lg:top-0 lg:h-dvh lg:pb-[var(--pad)] lg:pt-0">
          <h1 className="headline" aria-label={edit.title}>
            {edit.title.split(" ").map((word, i) => (
              <span key={i} data-line className="reveal-line" aria-hidden>
                <span>{word}</span>
              </span>
            ))}
          </h1>
          <div data-meta className="label mt-6 grid grid-cols-2 gap-2 lg:mt-16">
            <p>
              Look {String(edit.number).padStart(2, "0")}
              <br />
              <span className="text-muted">
                {pieces} {pieces === 1 ? "peça" : "peças"}
              </span>
            </p>
            <p>
              O Renascer da Permanência
              <br />
              <span className="text-muted">{priceRange(edit)}</span>
            </p>
          </div>
        </div>
      </div>

      {/*
        Vistas do look: frente e costas. No desktop ficam uma abaixo da outra enquanto o
        título fica preso à esquerda; no celular deslizam lado a lado (scroll-snap).
      */}
      <div className="order-1 col-span-6 mt-16 lg:order-2">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          role="region"
          aria-roledescription="galeria"
          aria-label={`Fotos do look ${edit.title}`}
          className="-mx-[var(--pad)] flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-[var(--pad)] scroll-px-[var(--pad)] [scrollbar-width:none] lg:mx-0 lg:snap-none lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {views.map((view, i) => (
            <figure key={view.key} className="w-full shrink-0 snap-start">
              <LookFigure
                ref={i === 0 ? figureRef : undefined}
                src={view.src}
                fit={edit.image.fit}
                alt={view.alt}
                priority={i === 0}
                sizes="(min-width: 1025px) 60vw, 125vw"
                className={`aspect-[4/5] w-full lg:aspect-auto lg:h-[calc(100dvh-80px)] ${i === 0 && arriving ? "invisible" : ""}`}
              />
              <figcaption className="label mt-2 hidden lg:block">
                {String(i + 1).padStart(2, "0")}. {view.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="label mt-3 flex gap-6 lg:hidden" role="group" aria-label="Escolher vista">
          {views.map((view, i) => (
            <button
              key={view.key}
              type="button"
              onClick={() => show(i)}
              aria-pressed={active === i}
              className={`relative min-h-11 transition-colors duration-300 ${active === i ? "text-fg" : "text-muted"}`}
            >
              {String(i + 1).padStart(2, "0")}. {view.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 bottom-2.5 h-px bg-current transition-transform duration-500 ease-[var(--ease)] origin-left ${active === i ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          ))}
        </div>
      </div>
      <p className="statement order-3 col-span-6 mt-12 lg:col-start-9 lg:mt-32 lg:pb-16">
        {edit.line} <span className="text-muted">{edit.description}</span>
      </p>
    </section>
  );
}
