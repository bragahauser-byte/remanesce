"use client";

/* eslint-disable @next/next/no-img-element */
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { srcSetOf } from "@/components/look/figure";
import { TransitionLink } from "@/components/layout/page-transition";
import { editHref, edits, priceRange } from "@/data/collection";
import { prefersReducedMotion } from "@/lib/hooks";

/**
 * Índice dos seis looks, como o sumário de uma revista: nomes enormes em PP Pangaia,
 * número e faixa de preço em rótulo. No mouse, a foto do look acompanha o cursor.
 */
export function LooksIndex() {
  const listRef = useRef<HTMLOListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const x = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
    };
    list.addEventListener("pointermove", onMove);
    return () => list.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative">
      <ol ref={listRef} className="relative border-t border-line" onPointerLeave={() => setActive(null)}>
        {edits.map((e, i) => (
          <li key={e.slug} className="border-b border-line">
            <TransitionLink
              href={editHref(e.slug)}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-6 items-baseline gap-x-[var(--gap)] py-4 lg:grid-cols-14 lg:py-5"
            >
              <span className="label col-span-1 tabular-nums text-muted">{String(e.number).padStart(2, "0")}</span>
              <span
                className={`col-span-5 font-display text-[3rem] font-extralight leading-[0.95] tracking-[-0.02em] transition-[color,transform] duration-700 ease-[var(--ease)] md:text-[4.5rem] lg:col-span-8 lg:col-start-3 lg:text-[clamp(4.5rem,7.4vw,9rem)] pointer-fine:group-hover:translate-x-[2vw] ${
                  active !== null && active !== i ? "text-muted" : ""
                }`}
              >
                {e.title}
              </span>
              <span className="label col-span-5 col-start-2 mt-2 text-muted lg:col-span-4 lg:col-start-11 lg:mt-0 lg:text-right">
                {e.line} · {priceRange(e)}
              </span>
            </TransitionLink>
          </li>
        ))}
      </ol>
      {/* Prévia que segue o cursor (só mouse). */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden w-[clamp(180px,16vw,300px)] pointer-fine:block"
      >
        <div
          className={`relative aspect-[596/719] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-panel transition-[opacity,clip-path] duration-500 ease-[var(--ease)] ${
            active === null ? "opacity-0 [clip-path:inset(50%_0%_50%_0%)]" : "opacity-100 [clip-path:inset(0%_0%_0%_0%)]"
          }`}
        >
          {edits.map((e, i) => (
            <img
              key={e.slug}
              src={e.image.front}
              srcSet={srcSetOf(e.image.front)}
              sizes="300px"
              alt=""
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
