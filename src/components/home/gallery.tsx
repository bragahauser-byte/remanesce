"use client";

import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { LookFigure } from "@/components/look/figure";
import { editHref, edits, priceRange } from "@/data/collection";
import { prefersReducedMotion, useReducedMotion } from "@/lib/hooks";
import { toBox, useFlight } from "@/lib/store/flight";

const SCROLL_KEY = "remanesce:galeria";
const INTRO_KEY = "remanesce:intro";

function readSession(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // Sem armazenamento: só perde a posição ao voltar.
  }
}

/**
 * Galeria horizontal do início (referência: faixa de cases rente ao pé da tela).
 * A roda do mouse rola na horizontal com inércia, o mouse pode arrastar, o toque
 * usa a rolagem nativa e o teclado navega pelos links (cada card entra na tela ao
 * receber foco).
 */
export function Gallery() {
  const router = useRouter();
  const reduced = useReducedMotion();
  const startFlight = useFlight((s) => s.start);
  const trackRef = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const raf = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const leaving = useRef(false);

  // Rolagem suave por interpolação até o alvo.
  const animateTo = (value: number) => {
    const track = trackRef.current;
    if (!track) return;
    target.current = Math.max(0, Math.min(value, track.scrollWidth - track.clientWidth));
    if (raf.current) return;
    const step = () => {
      const diff = target.current - track.scrollLeft;
      if (Math.abs(diff) < 0.5) {
        track.scrollLeft = target.current;
        raf.current = 0;
        return;
      }
      track.scrollLeft += diff * 0.1;
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  // Posição salva (voltar de um look) e entrada da galeria na primeira visita.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const saved = Number(readSession(SCROLL_KEY) ?? 0);
    track.scrollLeft = saved;
    target.current = track.scrollLeft;

    const items = Array.from(track.querySelectorAll<HTMLElement>("[data-item]"));
    if (reduced || prefersReducedMotion() || readSession(INTRO_KEY)) return;
    writeSession(INTRO_KEY, "1");
    const first = items[0].offsetLeft;
    // As fotos começam empilhadas sobre a primeira e se espalham pela faixa.
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(items, {
      x: (i) => first - items[i].offsetLeft + i * 32,
      y: (i) => (i % 2 ? 24 : -8),
      scale: (i) => 0.82 - Math.min(i, 4) * 0.02,
      duration: 1.6,
      ease: "expo.inOut",
      stagger: 0.03,
    });
    tl.from(track.querySelectorAll("[data-name]"), { yPercent: 100, duration: 0.8, ease: "expo.out", stagger: 0.04 }, "-=0.6");
    return () => void tl.kill();
  }, [reduced]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (!delta) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : 1;
      if (!raf.current) target.current = track.scrollLeft;
      animateTo(target.current + delta * unit);
    };
    const onScroll = () => writeSession(SCROLL_KEY, String(Math.round(track.scrollLeft)));

    track.addEventListener("wheel", onWheel, { passive: false });
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, []);

  // Arrastar com o mouse (o toque já rola nativamente).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current!;
    drag.current = { x: e.clientX, left: track.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      trackRef.current!.setPointerCapture(e.pointerId);
    }
    if (d.moved) animateTo(d.left - dx * 1.4);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d?.moved) trackRef.current!.releasePointerCapture(e.pointerId);
    // O clique que encerra um arraste não abre o card.
    window.setTimeout(() => (drag.current = null), 0);
  };

  const open = (e: React.MouseEvent<HTMLAnchorElement>, slug: string, src: string) => {
    if (drag.current?.moved) {
      e.preventDefault();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || reduced) return;
    e.preventDefault();
    if (leaving.current) return;
    leaving.current = true;
    const track = trackRef.current!;
    const item = e.currentTarget.closest<HTMLElement>("[data-item]")!;
    const box = item.querySelector<HTMLElement>("[data-figure]")!;
    startFlight({ slug, src, from: toBox(box.getBoundingClientRect()) });
    gsap.set(box, { visibility: "hidden" });

    // Os outros cards recuam a partir do pé, os rótulos descem para dentro da máscara.
    const others = Array.from(track.querySelectorAll<HTMLElement>("[data-item]")).filter((el) => el !== item);
    const tl = gsap.timeline({ onComplete: () => router.push(editHref(slug), { scroll: true }) });
    tl.to(others, { scale: 0.9, opacity: 0, duration: 0.6, ease: "power3.in", stagger: 0.02, transformOrigin: "50% 100%" }, 0);
    tl.to(track.querySelectorAll("[data-name]"), { yPercent: 100, duration: 0.4, ease: "power2.in" }, 0);
  };

  return (
    <div
      ref={trackRef}
      role="region"
      aria-label="Coleção O Renascer da Permanência: looks"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="flex h-[calc(100dvh-40px)] select-none items-end gap-2 overflow-x-auto overscroll-x-contain px-[var(--pad)] pb-[var(--pad)] [scrollbar-width:none] md:h-[calc(100dvh-56px)] lg:h-[calc(100dvh-88px)] [&::-webkit-scrollbar]:hidden"
    >
      {edits.map((edit, i) => (
        <article
          key={edit.slug}
          data-item
          style={{ zIndex: edits.length - i }}
          className="relative w-[83%] shrink-0 will-change-transform md:w-[36.6%] lg:w-[calc(28.74%-8px)]"
        >
          <Link
            href={editHref(edit.slug)}
            onClick={(e) => open(e, edit.slug, edit.image.front)}
            onDragStart={(e) => e.preventDefault()}
            onFocus={(e) => e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })}
            className="group block transition-transform duration-500 ease-[var(--ease)] pointer-fine:hover:-translate-y-2"
          >
            <span className="mb-2 block overflow-hidden lg:mb-4">
              <span data-name className="label flex justify-between gap-4">
                <span className="roll-host w-full min-w-0">
                  <span className="truncate">
                    {String(edit.number).padStart(2, "0")} {edit.title}
                  </span>
                  <span aria-hidden className="truncate">
                    {edit.pieces.length} {edit.pieces.length === 1 ? "peça" : "peças"} · {priceRange(edit)}
                  </span>
                </span>
              </span>
            </span>
            <div data-figure>
              <LookFigure
                src={edit.image.front}
                back={edit.image.back}
                alt={edit.image.alt}
                priority={i < 4}
                className="aspect-[396/496] w-full"
              />
            </div>
            <span className="label mt-2 block text-muted pointer-fine:sr-only">
              {edit.pieces.length} {edit.pieces.length === 1 ? "peça" : "peças"}, {priceRange(edit)}
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
