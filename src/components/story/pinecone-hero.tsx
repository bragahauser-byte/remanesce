"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import { hero } from "@/data/copy";
import { looks } from "@/data/looks";
import { seeded } from "@/lib/random";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------------------------------------------- geometria da pinha */

const CX = 200;
const CY = 290;
const rows = [3, 4, 5, 6, 6, 6, 5, 4, 3]; // 42 escamas

type Scale = { d: string; x: number; y: number; dx: number; dy: number; rot: number; delay: number; fill: string };

const scales: Scale[] = (() => {
  const rand = seeded(42);
  const out: Scale[] = [];
  rows.forEach((n, r) => {
    const y = 78 + r * 48;
    const half = Math.sin((Math.PI * (r + 0.7)) / (rows.length + 0.4)) * 128;
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const x = CX - half + t * half * 2 + (r % 2 ? 6 : -6);
      const w = 30 + (half / 128) * 8;
      const d = `M${x - w} ${y - 14}C${x - w} ${y + 14} ${x - 10} ${y + 34} ${x} ${y + 48}C${x + 10} ${y + 34} ${x + w} ${y + 14} ${x + w} ${y - 14}C${x + w * 0.45} ${y - 6} ${x - w * 0.45} ${y - 6} ${x - w} ${y - 14}Z`;
      // Abre em espiral: direção a partir do centro, girada.
      const angle = Math.atan2(y - CY, x - CX || 0.01) + 0.75;
      const dist = 340 + rand() * 260;
      out.push({
        d,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        rot: (rand() - 0.5) * 220,
        delay: Math.hypot(x - CX, y - CY) / 260,
        fill: ["#161B27", "#1D2433", "#2B3445"][(r + i) % 3],
      });
    }
  });
  return out;
})();

/**
 * Hero "a pinha que abre": as escamas se abrem em espiral com o scroll, o pinhão
 * vermelho aparece no centro, cai, e a tela transita para o primeiro look.
 */
export function PineconeHero() {
  const root = useRef<HTMLElement>(null);
  const look = looks[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=260%", scrub: 0.8, pin: true },
        });
        gsap.set(q("[data-beat]"), { autoAlpha: 0, yPercent: 30 });
        gsap.set(q("[data-beat='0']"), { autoAlpha: 1, yPercent: 0 });
        gsap.set(q("[data-look]"), { autoAlpha: 0, scale: 0.94 });

        tl.to(q("[data-cone]"), { rotation: 18, scale: 1.04, duration: 0.15, transformOrigin: "50% 50%" }, 0)
          .to(q("[data-cue]"), { autoAlpha: 0, duration: 0.06 }, 0)
          .to(q("[data-stem]"), { autoAlpha: 0, duration: 0.08 }, 0.14);

        q("[data-scale]").forEach((el, i) => {
          const s = scales[i];
          tl.to(el, { x: s.dx, y: s.dy, rotation: s.rot, autoAlpha: 0, duration: 0.4, ease: "power1.in", transformOrigin: "50% 0%" }, 0.12 + s.delay * 0.16);
        });

        tl.to(q("[data-beat='0']"), { autoAlpha: 0, yPercent: -30, duration: 0.08 }, 0.2)
          .to(q("[data-beat='1']"), { autoAlpha: 1, yPercent: 0, duration: 0.08 }, 0.28)
          .to(q("[data-seed]"), { scale: 2.6, duration: 0.18, transformOrigin: "50% 50%" }, 0.42)
          .to(q("[data-beat='1']"), { autoAlpha: 0, yPercent: -30, duration: 0.08 }, 0.62)
          .to(q("[data-seed]"), { y: 420, rotation: 40, autoAlpha: 0, duration: 0.18, ease: "power2.in" }, 0.66)
          .to(q("[data-look]"), { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.76)
          .to(q("[data-beat='2']"), { autoAlpha: 1, yPercent: 0, duration: 0.1 }, 0.8)
          .to({}, { duration: 0.12 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-titulo" className="relative h-[100svh] overflow-hidden bg-branco">
      <h1 id="hero-titulo" className="sr-only">
        Remanesce. {hero.beats.join(" ")}
      </h1>

      <div className="absolute inset-0 grid place-items-center pt-header">
        {/* primeiro look: aparece quando a pinha termina de abrir */}
        <div data-look className="absolute inset-0 grid place-items-center pt-header opacity-0 motion-reduce:opacity-100 md:justify-items-end md:pr-[12vw]">
          <div className="relative h-[min(68svh,640px)] w-[min(30svh,280px)]">
            <Image src={look.front} alt={`Look ${look.name}: ${look.description}`} fill sizes="280px" priority className="object-contain" />
          </div>
        </div>

        <svg data-cone viewBox="0 0 400 560" className="relative h-[min(62svh,560px)] w-auto overflow-visible motion-reduce:hidden" aria-hidden>
          <path
            data-seed
            d={`M${CX} ${CY - 26}c9 9.5 13.3 21.2 12.6 34.4-.6 12.2-5.6 21.8-12.6 26.4-7-4.6-12-14.2-12.6-26.4-.7-13.2 3.6-24.9 12.6-34.4z`}
            fill="var(--pinhao)"
          />
          {scales.map((s, i) => (
            <path key={i} data-scale d={s.d} fill={s.fill} stroke="var(--cobre)" strokeWidth="1" strokeOpacity=".7" />
          ))}
          <path data-stem d={`M${CX} 40v-28`} stroke="var(--indigo)" strokeWidth="2" />
        </svg>
      </div>

      <div className="container-x pointer-events-none absolute inset-x-0 bottom-[12svh] md:bottom-[10svh]">
        <div className="relative h-[1.9em] text-[clamp(2.6rem,7.4vw,7.5rem)] leading-[0.95] motion-reduce:h-auto md:h-[1.1em]">
          {hero.beats.map((beat, i) => (
            <p
              key={beat}
              data-beat={i}
              aria-hidden
              className={`serif absolute bottom-0 left-0 max-w-[14ch] text-tinta motion-reduce:relative motion-reduce:block md:max-w-none ${i === 2 ? "italic" : ""} ${
                i === 0 ? "" : "opacity-0 motion-reduce:opacity-100"
              }`}
            >
              {beat}
            </p>
          ))}
        </div>
      </div>

      <p data-cue className="label absolute bottom-6 right-[var(--spacing-gutter)] hidden items-center gap-3 text-tinta/60 md:flex motion-reduce:hidden">
        Role para abrir a pinha
        <span aria-hidden className="stitch-y block h-8" />
      </p>
    </section>
  );
}
