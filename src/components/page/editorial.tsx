import Link from "next/link";
import type { ReactNode } from "react";
import { LookFigure } from "@/components/look/figure";
import { PageIntro } from "./page-intro";

export { PageIntro };

/**
 * Linha editorial da referência (página "about"): imagem pequena na coluna da
 * esquerda, presa enquanto o texto da metade direita rola.
 */
export function EditorialRow({
  image,
  children,
  imageSide = "left",
}: {
  image?: { src: string; alt: string; kind?: "figure" | "photo" };
  children: ReactNode;
  imageSide?: "left" | "right";
}) {
  return (
    <section className="grid-site mt-32 items-start gap-y-12 lg:mt-60">
      {image && (
        <div className={`col-span-4 lg:sticky lg:top-24 lg:col-span-3 ${imageSide === "right" ? "lg:col-start-12" : "lg:col-start-1"}`}>
          {image.kind === "photo" ? (
            <div className="aspect-[4/5] overflow-hidden bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover mix-blend-multiply terra:mix-blend-normal" />
            </div>
          ) : (
            <LookFigure src={image.src} alt={image.alt} className="aspect-[4/5] w-full" />
          )}
        </div>
      )}
      <div className={`col-span-6 ${imageSide === "right" ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-9"}`}>{children}</div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-24 font-normal uppercase tracking-[-0.01em] lg:text-32">{children}</h2>;
}

/** Parágrafos de 24 → 32 px, como o texto corrido grande da referência. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="mt-8 space-y-8 text-24 font-light tracking-[-0.02em] lg:text-32 [&_strong]:font-medium">{children}</div>;
}

export function NumberedList({ items }: { items: { title: string; text?: string; href?: string }[] }) {
  return (
    <ol className="mt-8 text-24 font-light tracking-[-0.02em] lg:text-32">
      {items.map((item, i) => (
        <li key={item.title} className="grid grid-cols-[48px_1fr] gap-x-2 lg:grid-cols-[72px_1fr]">
          <span className="tabular-nums">{String(i + 1).padStart(2, "0")}.</span>
          <span>
            {item.href ? (
              <Link href={item.href} className="group inline-block">
                <span className="roll-host">
                  <span>{item.title}</span>
                  <span aria-hidden className="text-muted">
                    {item.title}
                  </span>
                </span>
              </Link>
            ) : (
              item.title
            )}
            {item.text && <span className="mb-6 mt-2 block text-16 font-normal tracking-normal text-soft lg:mb-8">{item.text}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
