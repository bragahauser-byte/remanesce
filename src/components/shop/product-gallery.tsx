"use client";

import { useRef, useState, type PointerEvent } from "react";
import { Icon } from "@/components/icons/icon";
import type { Product, ProductImage as ProductImageData } from "@/data/products";
import { ProductImage } from "./product-image";

const labels = ["Frente", "Costas", "Detalhe", "Detalhe"];

/**
 * Galeria da PDP. Desktop: imagens empilhadas. Mobile: carrossel com swipe
 * e indicadores em pesponto. Clique abre o lightbox com zoom.
 */
export function ProductGallery({ product, priority }: { product: Product; priority?: boolean }) {
  const images: ProductImageData[] = [product.images.front, product.images.back, ...product.images.details];
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function open(i: number) {
    setZoomed(i);
    dialog.current?.showModal();
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function goTo(i: number) {
    const el = track.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div>
      {/* Mobile: carrossel */}
      <div className="lg:hidden">
        <div
          ref={track}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
          aria-roledescription="carrossel"
          aria-label={`Imagens de ${product.name}`}
        >
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              className="relative aspect-[3/4] w-full shrink-0 snap-center md:aspect-[4/3] overflow-hidden bg-linho"
              aria-label={`${labels[i]}: ampliar imagem`}
            >
              <ProductImage image={img} sizes="(min-width: 1024px) 1px, 100vw" priority={priority && i === 0} />
            </button>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Escolher imagem">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`${labels[i]} (${i + 1} de ${images.length})`}
              onClick={() => goTo(i)}
              className="grid h-6 w-8 place-items-center"
            >
              <span className={`block h-px w-full ${index === i ? "bg-indigo" : "stitch-x opacity-70"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: empilhadas */}
      <div className="hidden grid-cols-2 gap-3 lg:grid">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(i)}
            data-cursor="ver"
            className={`group relative overflow-hidden bg-linho ${i < 2 ? "col-span-2 aspect-[4/5]" : "aspect-[3/4]"}`}
            aria-label={`${labels[i]}: ampliar imagem`}
          >
            <ProductImage image={img} sizes={i < 2 ? "(min-width: 768px) 50vw" : "(min-width: 768px) 25vw"} priority={priority && i === 0} />
            <span className="label absolute bottom-3 left-3 bg-linho/85 px-1.5 py-0.5 text-indigo/70">
              {String(i + 1).padStart(2, "0")} · {labels[i]}
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setZoomed(null)}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-linho p-0 backdrop:bg-indigo/60"
        aria-label={`Ampliação: ${product.name}`}
      >
        {zoomed !== null && <Lightbox image={images[zoomed]} onClose={() => dialog.current?.close()} />}
      </dialog>
    </div>
  );
}

function Lightbox({ image, onClose }: { image: ProductImageData; onClose: () => void }) {
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  function onMove(e: PointerEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        onClick={() => setZoom((z) => !z)}
        onPointerMove={onMove}
        className={`relative block h-full w-full overflow-hidden ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        aria-label={zoom ? "Reduzir" : "Ampliar"}
      >
        <span
          className="absolute inset-0 block transition-transform duration-500 ease-remanesce"
          style={{ transform: zoom ? "scale(1.5)" : "none", transformOrigin: origin }}
        >
          <ProductImage image={image} sizes="100vw" className="py-10" />
        </span>
      </button>
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="label absolute right-4 top-4 flex items-center gap-2 bg-linho/80 px-3 py-2 hover:text-cobre"
      >
        <Icon name="fechar" size={20} /> Fechar
      </button>
    </div>
  );
}
