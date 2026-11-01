"use client";

import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { LookFigure } from "@/components/look/figure";
import { edits } from "@/data/collection";
import { primaryPages } from "@/data/copy";
import { looks } from "@/data/looks";
import { asset } from "@/lib/paths";
import { useFocusTrap } from "@/lib/focus-trap";
import { useReducedMotion } from "@/lib/hooks";
import { useUI } from "@/lib/store/ui";
import { barClass, hitArea, logoClass } from "./header";
import { getLenis } from "./smooth-scroll";

type Href = (typeof primaryPages)[number]["href"];

/** Rota atual → página principal a que pertence (os looks fazem parte do início). */
function sectionOf(pathname: string): Href | null {
  if (pathname === "/" || pathname.startsWith("/looks")) return "/";
  if (pathname.startsWith("/sobre")) return "/sobre";
  if (pathname.startsWith("/raiz")) return "/raiz";
  return null;
}

/**
 * Pôster de cada página dentro do cartão: logotipo e a Sugar apple no alto, título
 * em PP Pangaia e as fotos da página. Tudo em unidades do contêiner (cqw), então o
 * pôster tem a mesma composição em qualquer largura de cartão.
 */
function Preview({ href, title }: { href: Href; title: string }) {
  return (
    <div className="flex h-full flex-col bg-bg text-fg [container-type:inline-size]">
      <div className="flex items-start justify-between p-[4cqw]">
        <Wordmark title="" aria-hidden className="mt-[1cqw] h-[3.4cqw] w-auto" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/images/marca/sugar-apple.webp")} alt="" width={320} height={325} className="aspect-[320/325] h-auto w-[11cqw]" />
      </div>
      <p className="px-[4cqw] font-display text-[14cqw] font-extralight leading-[0.95] tracking-[-0.02em]">{title}</p>
      <div className="mt-auto flex gap-[1.5cqw] overflow-hidden p-[4cqw] pt-0">
        {href === "/" &&
          [0, 1, 2].map((i) => (
            <div key={i} className="flex w-[44%] shrink-0 flex-col">
              <span className="mb-[1.5cqw] text-[1.8cqw] font-medium uppercase">{edits[i].title}</span>
              <LookFigure src={edits[i].image.front} fit={edits[i].image.fit} alt="" className="aspect-[396/496] w-full" />
            </div>
          ))}
        {href === "/sobre" && (
          <>
            <LookFigure src={looks[3].front} fit={looks[3].fit} alt="" className="aspect-[4/5] w-[44%] shrink-0" />
            <LookFigure src={looks[5].back} fit={looks[5].fit} alt="" className="aspect-[4/5] w-[44%] shrink-0" />
          </>
        )}
        {href === "/raiz" && <LookFigure src={looks[4].front} fit={looks[4].fit} alt="" className="aspect-[4/5] w-[56%]" />}
      </div>
    </div>
  );
}

/**
 * Do cartão para a tela inteira sem deformar: escala uniforme (a maior das duas
 * razões, como object-fit: cover) com o cartão centralizado na tela e um clip-path
 * que recorta o excesso na proporção da tela. A proporção do conteúdo nunca muda;
 * só a janela de recorte se abre ou se fecha. Medido com o cartão em repouso.
 */
function coverFrom(tile: HTMLElement) {
  const w = tile.offsetWidth;
  const h = tile.offsetHeight;
  const r = tile.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const scale = Math.max(vw / w, vh / h);
  const insetX = Math.max(0, (w - vw / scale) / 2);
  const insetY = Math.max(0, (h - vh / scale) / 2);
  return {
    x: vw / 2 - (r.left + r.width / 2),
    y: vh / 2 - (r.top + r.height / 2),
    scale,
    clipPath: `inset(${insetY}px ${insetX}px ${insetY}px ${insetX}px)`,
  };
}

/** Cartão em repouso (mesma sintaxe de clip-path para o GSAP interpolar os números). */
const REST = { x: 0, y: 0, scale: 1, clipPath: "inset(0px 0px 0px 0px)" };

/**
 * Menu da referência: a página atual encolhe até virar um cartão, ao lado das
 * outras páginas, sobre um fundo neutro. Clicar num cartão faz ele crescer até
 * ocupar a tela e então a rota troca. ESC, o fundo ou o próprio cartão atual fecham.
 */
export function Menu() {
  const { panel, close } = useUI();
  const open = panel === "menu";
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const current = sectionOf(pathname);

  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const busy = useRef(false);
  const leaving = useRef<string | null>(null);

  // Seção de onde o menu foi aberto: não muda enquanto ele troca de página.
  const [origin, setOrigin] = useState<Href | null>(null);
  if (open && !mounted) {
    setMounted(true);
    setOrigin(current);
  }

  const stage = () => document.getElementById("stage");

  // Abrir
  useLayoutEffect(() => {
    if (!open || !mounted) return;
    const root = rootRef.current;
    if (!root) return;
    busy.current = true;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";

    const tiles = Object.entries(tileRefs.current).filter(([, el]) => el) as [string, HTMLAnchorElement][];
    const currentTile = origin ? tileRefs.current[origin] : null;
    const others = tiles.filter(([href]) => href !== origin).map(([, el]) => el);
    const bg = root.querySelector("[data-menu-bg]");
    const chrome = root.querySelectorAll("[data-menu-chrome]");

    if (reduced) {
      gsap.set([bg, ...tiles.map(([, el]) => el), ...chrome], { opacity: 1, clearProps: "transform,clipPath" });
      busy.current = false;
      return;
    }

    const tl = gsap.timeline({ onComplete: () => void (busy.current = false) });
    tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
    tl.to(stage(), { opacity: 0, duration: 0.3, ease: "power2.out" }, 0);
    if (currentTile) {
      // Mede em repouso, depois parte da tela inteira e encolhe até o cartão.
      gsap.set(currentTile, { ...REST, zIndex: 2, transformOrigin: "50% 50%" });
      tl.fromTo(currentTile, { ...coverFrom(currentTile), opacity: 1 }, { ...REST, duration: 1, ease: "expo.inOut" }, 0);
      // Sem clip-path em repouso: ele cortaria o contorno de foco do cartão.
      tl.set(currentTile, { zIndex: "auto", clearProps: "clipPath" });
    }
    tl.fromTo(
      others,
      { opacity: 0, y: 64 },
      { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 },
      currentTile ? 0.45 : 0.1,
    );
    tl.fromTo(chrome, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6);
    return () => void tl.kill();
  }, [open, mounted, origin, reduced]);

  // Depois de trocar de página por um cartão: revela a página nova.
  useEffect(() => {
    if (!leaving.current || sectionOf(pathname) !== leaving.current) return;
    leaving.current = null;
    window.scrollTo(0, 0);
    const root = rootRef.current;
    gsap.set(stage(), { opacity: 1 });
    gsap.to(root, {
      opacity: 0,
      duration: reduced ? 0 : 0.5,
      delay: reduced ? 0 : 0.15,
      ease: "power2.out",
      onComplete: () => {
        close();
        setMounted(false);
        busy.current = false;
        document.documentElement.style.overflow = "";
        getLenis()?.start();
      },
    });
  }, [pathname, close, reduced]);

  const dismiss = useCallback(() => {
    if (busy.current) return;
    const root = rootRef.current;
    const currentTile = current ? tileRefs.current[current] : null;
    const finish = () => {
      gsap.set(stage(), { clearProps: "opacity" });
      close();
      setMounted(false);
      busy.current = false;
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      // O header fica inerte com o menu aberto; o foco volta para o botão que abriu.
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-controls="menu-principal"]')?.focus({ preventScroll: true }));
    };
    if (reduced || !root) return finish();
    busy.current = true;
    const tl = gsap.timeline({ onComplete: finish });
    const others = Object.entries(tileRefs.current)
      .filter(([href, el]) => el && href !== current)
      .map(([, el]) => el);
    tl.to(root.querySelectorAll("[data-menu-chrome]"), { opacity: 0, duration: 0.2 }, 0);
    tl.to(others, { opacity: 0, y: 64, duration: 0.5, ease: "power2.in", stagger: 0.04 }, 0);
    if (currentTile) {
      gsap.set(currentTile, { ...REST, zIndex: 2, transformOrigin: "50% 50%" });
      tl.to(currentTile, { ...coverFrom(currentTile), duration: 0.9, ease: "expo.inOut" }, 0.1);
      tl.set(stage(), { opacity: 1 }, ">-0.05");
    } else {
      tl.to(stage(), { opacity: 1, duration: 0.4 }, 0.3);
    }
    tl.to(root.querySelector("[data-menu-bg]"), { opacity: 0, duration: 0.3 }, currentTile ? ">-0.1" : 0.3);
  }, [close, current, reduced]);

  const go = useCallback(
    (href: Href, e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (busy.current) return;
      if (href === current && pathname === href) return dismiss();
      const tile = tileRefs.current[href];
      const root = rootRef.current;
      if (!tile || !root) return router.push(href);
      busy.current = true;
      leaving.current = href;
      if (reduced) return router.push(href);
      const others = Object.entries(tileRefs.current)
        .filter(([h, el]) => el && h !== href)
        .map(([, el]) => el);
      const tl = gsap.timeline({ onComplete: () => router.push(href) });
      tl.to(root.querySelectorAll("[data-menu-chrome]"), { opacity: 0, duration: 0.2 }, 0);
      tl.to(others, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0);
      gsap.set(tile, { ...REST, zIndex: 2, transformOrigin: "50% 50%" });
      tl.to(tile, { ...coverFrom(tile), duration: 0.9, ease: "expo.inOut" }, 0.05);
    },
    [current, pathname, dismiss, reduced, router],
  );

  useFocusTrap(rootRef, open && mounted, dismiss);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/sobre");
    router.prefetch("/raiz");
  }, [router]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[60] overflow-hidden"
    >
      <div data-menu-bg className="absolute inset-0 bg-stage" onClick={dismiss} aria-hidden />

      {/* Mesma estrutura do header: logotipo na coluna 1, rótulo na 9, ação na borda direita. */}
      <div className={`${barClass} pointer-events-none relative z-[3] text-[#fff]`}>
        <span data-menu-chrome className="col-span-3 justify-self-start">
          <Wordmark title="Remanesce" className={logoClass} />
        </span>
        <p data-menu-chrome className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          Páginas
        </p>
        <button
          data-menu-chrome
          type="button"
          onClick={dismiss}
          className={`pointer-events-auto col-span-3 justify-self-end lg:col-span-2 lg:col-start-13 ${hitArea}`}
        >
          <span className="roll">
            <span>Fechar</span>
            <span aria-hidden>Fechar</span>
          </span>
        </button>
      </div>

      <nav
        aria-label="Páginas"
        className="pointer-events-none absolute inset-0 flex items-center gap-4 overflow-x-auto px-[8vw] [scrollbar-width:none] md:gap-[4vw] md:px-[4vw] lg:justify-center"
        data-lenis-prevent
      >
        {primaryPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            ref={(el) => {
              tileRefs.current[page.href] = el;
            }}
            onClick={(e) => go(page.href, e)}
            aria-current={page.href === current ? "page" : undefined}
            aria-label={page.href === current ? `${page.label}, página atual (fechar o menu)` : page.label}
            className="group pointer-events-auto relative block aspect-[538/708] w-[72vw] max-w-[calc(70dvh*538/708)] shrink-0 overflow-hidden opacity-0 will-change-transform focus-visible:outline-offset-8 focus-visible:outline-[#fff] md:w-[40vw] lg:w-[28vw] lg:max-w-[calc(75dvh*538/708)]"
          >
            <Preview href={page.href} title={page.title} />
            <span aria-hidden className="absolute inset-0 bg-[#000] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
