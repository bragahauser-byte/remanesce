/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollMotion } from "@/components/motion/scroll-motion";
import { brand, contact } from "@/data/copy";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${brand.name}: parcerias, dúvidas sobre as peças, reparo e ressignificação. ${brand.city}.`,
};

/**
 * Tela CONTATO de novembro: a foto ocupa o lugar do primeiro card do início (mesma
 * medida, rente ao pé), o texto da marca começa na altura do alto da foto, os canais
 * ficam numa coluna estreita à direita e a gralha voa logo abaixo do texto.
 */
export default function ContactPage() {
  return (
    <>
      <section className="grid-site min-h-dvh content-start gap-y-12 pb-[var(--pad)] pt-[calc(var(--header-h)+48px)] lg:content-end lg:items-start lg:gap-y-0 lg:pt-0">
        <h1 className="sr-only">Contato</h1>

        <figure className="order-3 col-span-6 lg:order-1 lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div data-intro-image className="aspect-[596/719] w-full overflow-hidden bg-panel lg:w-[var(--card-w)]">
            <img
              src={asset("/images/sobre/frame-7-1600.webp")}
              srcSet={`${asset("/images/sobre/frame-7-800.webp")} 800w, ${asset("/images/sobre/frame-7-1600.webp")} 1600w`}
              sizes="(min-width: 1025px) 36vw, 100vw"
              alt="Papel de seda azul-claro estampado com o logotipo Remanesce, sobre fundo azul."
              className="h-full w-full object-cover"
            />
          </div>
        </figure>

        <div className="order-1 col-span-6 lg:order-2 lg:col-span-4 lg:col-start-6 lg:row-start-1 lg:pl-[clamp(32px,3.7vw,72px)]">
          <p data-reveal="up" className="t-body max-w-[30em]">
            {contact.intro}
          </p>
          <img
            src={asset("/images/marca/bird-flying.webp")}
            alt=""
            aria-hidden
            width={453}
            height={385}
            className="bird-float ml-auto mt-12 h-auto w-20 lg:mr-[4%] lg:mt-[clamp(48px,7vh,96px)] lg:w-[clamp(72px,5.6vw,120px)]"
          />
        </div>

        <address data-reveal="up" className="order-2 col-span-6 not-italic lg:order-3 lg:col-span-3 lg:col-start-11 lg:row-start-1">
          <dl className="t-body space-y-5">
            {contact.channels.map((c) => (
              <div key={c.label}>
                <dt className="label text-muted">{c.label}</dt>
                <dd className="mt-1">
                  {c.href ? (
                    <a href={c.href} className="link-stitch" {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="t-small mt-8 max-w-[22em] text-secondary">{contact.note}</p>
        </address>
      </section>
      <SiteFooter />
      <ScrollMotion />
    </>
  );
}
