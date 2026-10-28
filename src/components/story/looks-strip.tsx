"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { looks } from "@/data/looks";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Os seis looks em faixa horizontal. No desktop, o scroll vertical move a faixa
 * (seção presa). No celular e com movimento reduzido, é um carrossel nativo com swipe.
 */
export function LooksStrip() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="looks-titulo" data-tone="papel" className="relative overflow-hidden lg:h-[100svh]">
      <div className="flex h-full flex-col justify-center pb-12 pt-[calc(var(--spacing-header)+2rem)]">
        <div className="container-x flex items-end justify-between gap-6">
          <div>
            <p className="label text-cobre">O line-up</p>
            <h2 id="looks-titulo" className="serif mt-3 text-h2 text-tinta">
              Seis looks, <em>uma pinha</em>
            </h2>
          </div>
          <Link href="/colecao" className="label link-stitch shrink-0">
            Ver os looks
          </Link>
        </div>

        <div
          ref={track}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--spacing-gutter)] pb-4 [scrollbar-width:none] lg:mt-12 lg:w-max lg:snap-none lg:gap-8 lg:overflow-visible"
        >
          {looks.map((look) => (
            <Link
              key={look.number}
              href={`/colecao#look-${pad(look.number)}`}
              data-cursor="ver"
              className="group relative w-[68vw] shrink-0 snap-center sm:w-[40vw] lg:w-[min(26vw,380px)]"
            >
              <div className="relative">
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-2 bg-pinhao" />
                <div className="relative aspect-[3/4] bg-branco transition-transform duration-700 ease-remanesce group-hover:-translate-y-1.5">
                  <Image src={look.front} alt={`Look ${look.name}`} fill sizes="(min-width: 1024px) 26vw, 68vw" className="object-contain py-4 transition-opacity duration-700 group-hover:opacity-0" />
                  <Image src={look.back} alt="" fill sizes="(min-width: 1024px) 26vw, 68vw" className="object-contain py-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
              </div>
              <p className="label mt-4 text-tinta/55">
                Look {pad(look.number)} / {pad(looks.length)}
              </p>
              <p className="serif mt-1 text-h4">{look.name}</p>
              <p className="mt-1 text-small italic text-tinta/70">{look.line}</p>
            </Link>
          ))}
          <div aria-hidden className="w-[var(--spacing-gutter)] shrink-0 lg:w-[10vw]" />
        </div>
      </div>
    </section>
  );
}
