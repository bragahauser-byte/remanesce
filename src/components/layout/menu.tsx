"use client";

/* eslint-disable @next/next/no-img-element */
import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { srcSetOf } from "@/components/look/figure";
import { edits } from "@/data/collection";
import { primaryPages } from "@/data/copy";
import { asset } from "@/lib/paths";
import { useFocusTrap } from "@/lib/focus-trap";
import { useReducedMotion } from "@/lib/hooks";
import { useUI } from "@/lib/store/ui";
import { barClass, hitArea, logoClass, navClass, Roll } from "./header";
import { getLenis } from "./smooth-scroll";

type Href = (typeof primaryPages)[number]["href"];

/** Rota atual → página principal a que pertence (os looks fazem parte do início). */
function sectionOf(pathname: string): Href | null {
  if (pathname === "/" || pathname.startsWith("/looks")) return "/";
  if (pathname.startsWith("/sobre")) return "/sobre";
  if (pathname.startsWith("/contato")) return "/contato";
  return null;
}

/*
 * Como o brandonyasin.com faz o menu: cada cartão é uma tela inteira (100vw × 100dvh)
 * reduzida por uma escala UNIFORME e recortada por um clip-path no canto de cima à
 * esquerda. Nada estica: só a janela de recorte muda. Abrir = a página atual encolhe
 * até o primeiro cartão; escolher = a fileira inteira se aproxima (movimento de câmera)
 * até o cartão escolhido ocupar a tela.
 *
 * Medidas das telas de novembro: o cartão tem o tamanho dos cards do início
 * (596 × 719 em 1728 × 1117, var --card-w), rente ao pé da tela no desktop.
 */
type Layout = {
  vw: number;
  vh: number;
  /** Escala do cartão (página → cartão). */
  s: number;
  /** Largura e altura visíveis da página dentro do cartão (px da página). */
  visW: number;
  visH: number;
  /** Clip-path do cartão em repouso. */
  clip: string;
  x: (i: number) => number;
  y: number;
  maxScroll: number;
};

const FULL = "inset(0px 0px 0px 0px)";

function measure(probe: HTMLElement, count: number): Layout {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const css = getComputedStyle(document.documentElement);
  const pad = parseFloat(css.getPropertyValue("--pad")) || 16;
  const gap = parseFloat(css.getPropertyValue("--gap")) || 12;
  const w = probe.offsetWidth;
  const h = probe.offsetHeight;
  const s = Math.max(w / vw, h / vh);
  const visW = w / s;
  const visH = h / s;
  const desktop = vw >= 768;
  const y = desktop ? vh - pad - h : Math.max(pad * 4, (vh - h) / 2 + pad);
  return {
    vw,
    vh,
    s,
    visW,
    visH,
    clip: `inset(0px ${Math.max(0, vw - visW)}px ${Math.max(0, vh - visH)}px 0px)`,
    x: (i) => pad + i * (w + gap),
    y,
    maxScroll: Math.max(0, pad * 2 + count * w + (count - 1) * gap - vw),
  };
}

/** Imagem com srcset das fotos de 800/1600 px. */
function Img({ src, className }: { src: string; className: string }) {
  return <img src={src} srcSet={srcSetOf(src)} sizes="30vw" alt="" decoding="async" className={className} />;
}

/**
 * Pôster de cada página (tela MENU): título em PP Pangaia no alto, a Sugar apple no
 * canto e as fotos da página. Tudo em unidades do contêiner (cqw/cqh), medido na
 * prancha, então a composição é a mesma em qualquer tamanho de cartão.
 */
function Poster({ href, title }: { href: Href; title: string }) {
  return (
    <div className="absolute left-0 top-0 h-[var(--vis-h)] w-[var(--vis-w)] overflow-hidden bg-[#fff] text-[#111] [container-type:size]">
      {/* Título no pôster: o display da escala, reduzido junto com o cartão (cqw). */}
      <p
        data-poster-chrome
        className="absolute left-[2cqw] top-[1.2cqw] font-display text-[10.5cqw] font-extralight leading-[var(--lh-display-3xl)] tracking-[var(--ls-display-l)]"
      >
        {title}
      </p>
      {/* Sugar apple nos três cartões (início, sobre nós e contato). */}
      <img
        data-poster-chrome
        src={asset("/images/marca/sugar-apple.webp")}
        alt=""
        width={320}
        height={325}
        className="absolute right-[2cqw] top-[2.2cqw] aspect-[320/325] w-[10cqw]"
      />
      {href === "/" && (
        // No desktop o pôster repete a geometria do início (cards rentes ao pé), então a
        // página e o cartão se dissolvem um no outro sem fantasma.
        <div className="absolute left-[2cqw] top-[26.5cqh] flex h-[72cqh] gap-[3cqw] lg:bottom-[var(--pad)] lg:left-[var(--pad)] lg:top-auto lg:h-[var(--card-h)] lg:gap-[var(--gap)]">
          {edits.slice(0, 2).map((e) => (
            <div key={e.slug} className="h-full w-[71.5cqw] shrink-0 overflow-hidden bg-panel lg:w-[var(--card-w)]">
              <Img src={e.image.front} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
      {href === "/sobre" && (
        <div className="absolute left-[2cqw] top-[63.7cqh] flex h-[34.6cqh] gap-[1.5cqw] lg:bottom-[var(--pad)] lg:left-[var(--pad)] lg:top-auto lg:grid lg:h-auto lg:w-[calc((100vw-2*var(--pad)-13*var(--gap))/2+6*var(--gap))] lg:grid-cols-3 lg:gap-[var(--gap)]">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-full w-[34.5cqw] shrink-0 overflow-hidden bg-panel lg:aspect-[4/5] lg:h-auto lg:w-auto">
              <Img src={asset(`/images/sobre/frame-${n}-1600.webp`)} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
      {href === "/contato" && (
        <div className="absolute left-[2cqw] top-[48.4cqh] h-[50cqh] w-[110cqw] overflow-hidden bg-panel lg:bottom-[var(--pad)] lg:left-[var(--pad)] lg:top-auto lg:h-[var(--card-h)] lg:w-[var(--card-w)]">
          <Img src={asset("/images/sobre/frame-7-1600.webp")} className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}

export function Menu() {
  const { panel, close } = useUI();
  const open = panel === "menu";
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const current = sectionOf(pathname);

  const [mounted, setMounted] = useState(false);
  // Seção de onde o menu foi aberto: a página atual é sempre o primeiro cartão.
  const [origin, setOrigin] = useState<Href | null>(null);
  if (open && !mounted) {
    setMounted(true);
    setOrigin(current);
  }
  const pages = origin ? [primaryPages.find((p) => p.href === origin)!, ...primaryPages.filter((p) => p.href !== origin)] : [...primaryPages];

  const rootRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const L = useRef<Layout | null>(null);
  const scroll = useRef({ value: 0, target: 0, raf: 0 });
  const busy = useRef(false);
  const drag = useRef<{ x: number; start: number; last: number; t: number; v: number; moved: boolean; id: number } | null>(null);
  const leaving = useRef<string | null>(null);

  const stage = () => document.getElementById("stage");
  const header = () => document.querySelector<HTMLElement>("[data-site-header]");
  const tiles = () => tileRefs.current.slice(0, pages.length).filter(Boolean) as HTMLAnchorElement[];

  /** Posição de repouso de cada cartão (com a rolagem horizontal da fileira). */
  const rest = useCallback((i: number) => {
    const l = L.current!;
    return { x: l.x(i) - scroll.current.value, y: l.y, scale: l.s, clipPath: l.clip };
  }, []);

  /** Mede a tela e aplica as variáveis do pôster (área visível em px da página). */
  const relayout = useCallback(() => {
    const probe = probeRef.current;
    const root = rootRef.current;
    if (!probe || !root) return null;
    const l = measure(probe, pages.length);
    L.current = l;
    root.style.setProperty("--vis-w", `${l.visW}px`);
    root.style.setProperty("--vis-h", `${l.visH}px`);
    root.style.setProperty("--tile-w", `${l.vw}px`);
    root.style.setProperty("--tile-h", `${l.vh}px`);
    scroll.current.value = scroll.current.target = Math.min(scroll.current.target, l.maxScroll);
    return l;
  }, [pages.length]);

  /*
   * A página real (#stage) encolhe junto com o primeiro cartão, pela mesma conta, e some
   * no meio do caminho revelando o pôster por baixo. Com a rolagem: o ponto (0, scrollY)
   * da página precisa cair no canto do cartão.
   */
  const stageAt = useCallback((l: Layout, slot: { x: number; y: number }) => {
    const el = stage()!;
    const sy = window.scrollY;
    const H = el.offsetHeight;
    return {
      x: slot.x,
      y: slot.y + sy * (1 - l.s),
      scale: l.s,
      clipPath: `inset(${sy}px ${Math.max(0, l.vw - l.visW)}px ${Math.max(0, H - sy - l.visH)}px 0px)`,
    };
  }, []);
  const stageFull = () => {
    const el = stage()!;
    const sy = window.scrollY;
    return { x: 0, y: 0, scale: 1, clipPath: `inset(${sy}px 0px ${Math.max(0, el.offsetHeight - sy - window.innerHeight)}px 0px)` };
  };
  const liftStage = () => gsap.set(stage(), { position: "relative", zIndex: 61, transformOrigin: "0 0", willChange: "transform" });
  const dropStage = (opacity: number) =>
    gsap.set(stage(), { clearProps: "position,zIndex,transform,transformOrigin,clipPath,willChange", opacity });

  const finish = useCallback(() => {
    dropStage(1);
    gsap.set(stage(), { clearProps: "opacity" });
    gsap.set(header(), { clearProps: "opacity" });
    close();
    setMounted(false);
    busy.current = false;
    leaving.current = null;
    document.documentElement.style.overflow = "";
    getLenis()?.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close]);

  // Abrir: a página atual vira o primeiro cartão; os outros chegam pela mesma câmera.
  useLayoutEffect(() => {
    if (!open || !mounted) return;
    const root = rootRef.current;
    const l = relayout();
    if (!root || !l) return;
    busy.current = true;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    scroll.current.value = scroll.current.target = 0;

    const list = tiles();
    const bg = root.querySelector("[data-menu-bg]");
    const chrome = root.querySelectorAll("[data-menu-chrome]");
    list.forEach((t, i) => gsap.set(t, { ...rest(i), transformOrigin: "0 0", opacity: 1 }));

    if (reduced) {
      gsap.set([bg, ...chrome], { opacity: 1 });
      gsap.set(stage(), { opacity: 0 });
      busy.current = false;
      return;
    }

    const D = 1.25;
    const ease = "expo.inOut";
    const tl = gsap.timeline({
      onComplete: () => {
        dropStage(0);
        busy.current = false;
      },
    });
    tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
    tl.to(header(), { opacity: 0, duration: 0.25, ease: "power2.out" }, 0);

    if (origin) {
      // Câmera: no início o cartão atual ocupa a tela e os outros estão à direita, na mesma escala.
      const c = rest(0);
      list.forEach((t, i) => {
        const r = rest(i);
        const from = { x: (r.x - c.x) / l.s, y: (r.y - c.y) / l.s, scale: 1, clipPath: i === 0 ? FULL : l.clip };
        tl.fromTo(t, from, { ...r, duration: D, ease }, 0);
      });
      gsap.set(list[0], { zIndex: 2 });
      tl.set(list[0], { zIndex: "auto" });
      // Título e Sugar apple do cartão atual surgem quando a página já virou cartão.
      tl.fromTo(list[0].querySelectorAll("[data-poster-chrome]"), { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, D * 0.5);
      // A página real encolhe por cima do pôster e se dissolve nele.
      liftStage();
      tl.fromTo(stage(), stageFull(), { ...stageAt(l, c), duration: D, ease }, 0);
      tl.to(stage(), { opacity: 0, duration: 0.45, ease: "power1.inOut" }, D * 0.3);
    } else {
      // Página fora do menu (sacola, raiz...): ela some e os cartões sobem.
      tl.to(stage(), { opacity: 0, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(list, { y: l.y + 80, opacity: 0 }, { y: l.y, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.06 }, 0.15);
    }
    tl.fromTo(chrome, { opacity: 0 }, { opacity: 1, duration: 0.5 }, D * 0.6);
    return () => void tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mounted, origin, reduced]);

  /**
   * Escolher um cartão (ou fechar pelo atual): a fileira inteira se aproxima até o
   * cartão `i` ocupar a tela. Fechando, a página real reaparece pelo caminho inverso.
   */
  const zoomInto = useCallback(
    (i: number, onDone: () => void, revealStage: boolean) => {
      const root = rootRef.current;
      const l = L.current;
      const list = tiles();
      if (!root || !l || !list[i]) return onDone();
      busy.current = true;
      cancelAnimationFrame(scroll.current.raf);
      const D = 1.1;
      const ease = "expo.inOut";
      const c = rest(i);
      const tl = gsap.timeline({ onComplete: onDone });
      tl.to(root.querySelectorAll("[data-menu-chrome]"), { opacity: 0, duration: 0.25 }, 0);
      gsap.set(list[i], { zIndex: 2 });
      tl.to(list[i].querySelectorAll("[data-poster-chrome]"), { opacity: 0, duration: 0.35, ease: "power2.in" }, D * 0.2);
      list.forEach((t, j) => {
        const r = rest(j);
        tl.to(t, { x: (r.x - c.x) / l.s, y: (r.y - c.y) / l.s, scale: 1, clipPath: j === i ? FULL : l.clip, duration: D, ease }, 0);
      });
      if (revealStage) {
        liftStage();
        gsap.set(stage(), { ...stageAt(l, c), opacity: 0 });
        tl.to(stage(), { ...stageFull(), duration: D, ease }, 0);
        tl.to(stage(), { opacity: 1, duration: 0.4, ease: "power1.inOut" }, D * 0.45);
        tl.to(header(), { opacity: 1, duration: 0.3 }, D * 0.8);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rest, stageAt],
  );

  const dismiss = useCallback(() => {
    if (busy.current) return;
    const root = rootRef.current;
    const back = () =>
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-controls="menu-principal"]')?.focus({ preventScroll: true }));
    if (reduced || !root) {
      finish();
      return back();
    }
    if (origin) {
      zoomInto(0, () => {
        finish();
        back();
      }, true);
      return;
    }
    busy.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        finish();
        back();
      },
    });
    tl.to(root.querySelectorAll("[data-menu-chrome]"), { opacity: 0, duration: 0.2 }, 0);
    tl.to(tiles(), { opacity: 0, y: "+=64", duration: 0.5, ease: "power2.in", stagger: 0.04 }, 0);
    tl.to(stage(), { opacity: 1, duration: 0.4 }, 0.3);
    tl.to(header(), { opacity: 1, duration: 0.3 }, 0.4);
    tl.to(root.querySelector("[data-menu-bg]"), { opacity: 0, duration: 0.3 }, 0.4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finish, origin, reduced, zoomInto]);

  const go = useCallback(
    (href: Href, i: number, e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (busy.current || drag.current?.moved) return;
      // Cartão da página atual fecha o menu (num look, o cartão "início" leva ao início).
      if (pathname === href) return dismiss();
      if (reduced) {
        leaving.current = href;
        return router.push(href);
      }
      zoomInto(
        i,
        () => {
          leaving.current = href;
          router.push(href);
        },
        false,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [origin, pathname, dismiss, reduced, router, zoomInto],
  );

  // Depois de trocar de página por um cartão: a página nova aparece por baixo do pôster.
  useEffect(() => {
    if (!leaving.current || sectionOf(pathname) !== leaving.current) return;
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    dropStage(1);
    gsap.set(header(), { clearProps: "opacity" });
    gsap.to(rootRef.current, { opacity: 0, duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.05, ease: "power2.out", onComplete: finish });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Rolagem horizontal da fileira (roda, arraste e toque) com inércia.
  const applyScroll = useCallback(() => {
    tiles().forEach((t, i) => gsap.set(t, { x: rest(i).x }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest]);
  const scrollTo = useCallback(
    (target: number) => {
      const l = L.current;
      if (!l) return;
      const sc = scroll.current;
      sc.target = Math.max(0, Math.min(target, l.maxScroll));
      if (sc.raf) return;
      const step = () => {
        const d = sc.target - sc.value;
        sc.value = Math.abs(d) < 0.3 ? sc.target : sc.value + d * 0.12;
        applyScroll();
        sc.raf = sc.value === sc.target ? 0 : requestAnimationFrame(step);
      };
      sc.raf = requestAnimationFrame(step);
    },
    [applyScroll],
  );

  useEffect(() => {
    if (!mounted) return;
    const root = rootRef.current;
    if (!root) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (busy.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      scrollTo(scroll.current.target + delta * (e.deltaMode === 1 ? 32 : 1));
    };
    const onResize = () => {
      if (busy.current) return;
      relayout();
      tiles().forEach((t, i) => gsap.set(t, rest(i)));
    };
    root.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    const sc = scroll.current;
    return () => {
      root.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(sc.raf);
      sc.raf = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, scrollTo, relayout, rest]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy.current || e.button !== 0) return;
    drag.current = { x: e.clientX, start: scroll.current.target, last: e.clientX, t: performance.now(), v: 0, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      rootRef.current?.setPointerCapture(e.pointerId);
    }
    if (!d.moved) return;
    const now = performance.now();
    d.v = (e.clientX - d.last) / Math.max(1, now - d.t);
    d.last = e.clientX;
    d.t = now;
    scrollTo(d.start - dx);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d?.moved) {
      rootRef.current?.releasePointerCapture(e.pointerId);
      scrollTo(scroll.current.target - d.v * 240);
    }
    window.setTimeout(() => (drag.current = null), 0);
  };

  useFocusTrap(rootRef, open && mounted, dismiss);

  useEffect(() => {
    primaryPages.forEach((p) => router.prefetch(p.href));
  }, [router]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="fixed inset-0 z-[60] touch-none select-none overflow-clip"
    >
      <div data-menu-bg className="absolute inset-0 bg-azul" onClick={() => !drag.current?.moved && dismiss()} aria-hidden />
      {/* Medida do card da vitrine (a mesma do início). */}
      <div ref={probeRef} aria-hidden className="pointer-events-none invisible absolute h-[var(--card-h)] w-[var(--card-w)]" />

      <div className={`${barClass} pointer-events-none relative z-[3] text-[#fff]`}>
        <span data-menu-chrome className="opacity-0">
          <Wordmark title="Remanesce" className={logoClass} />
        </span>
        <div data-menu-chrome className={`${navClass} opacity-0`}>
          <button type="button" onClick={dismiss} className={`pointer-events-auto ${hitArea}`}>
            <Roll>Fechar</Roll>
          </button>
        </div>
      </div>

      <nav aria-label="Páginas" className="pointer-events-none absolute inset-0 z-[2] overflow-clip">
        {pages.map((page, i) => {
          const isCurrent = page.href === current;
          return (
            <Link
              key={page.href}
              href={page.href}
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              onClick={(e) => go(page.href, i, e)}
              onFocus={() => {
                const l = L.current;
                if (!l || busy.current) return;
                const x = l.x(i);
                const w = l.visW * l.s;
                const sc = scroll.current.target;
                if (x - sc < 0) scrollTo(x - l.x(0));
                else if (x + w - sc > l.vw) scrollTo(x + w - l.vw + l.x(0));
              }}
              onDragStart={(e) => e.preventDefault()}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={isCurrent && pathname === page.href ? `${page.label}, página atual (fechar o menu)` : page.label}
              className="group pointer-events-auto absolute left-0 top-0 block h-[var(--tile-h)] w-[var(--tile-w)] opacity-0 will-change-transform focus-visible:outline-none"
            >
              <Poster href={page.href} title={page.title} />
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-[var(--vis-h)] w-[var(--vis-w)] bg-[#000] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.05] group-focus-visible:opacity-[0.08]"
              />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
