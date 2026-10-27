import type { Metadata } from "next";
import { Diamond } from "@/components/brand/textures";
import { BookingForm } from "@/components/forms/booking-form";
import { Icon } from "@/components/icons/icon";
import { RevealLines } from "@/components/story/reveal";
import { services, servicesIntro } from "@/data/copy";

export const metadata: Metadata = {
  title: "Serviços de Permanência",
  description: "Reparo para sempre, ajuste sob medida e ressignificar: serviços para que cada peça Remanesce se transforme com você.",
};

export default function ServicesPage() {
  return (
    <div className="pt-[calc(var(--spacing-header)+4rem)]">
      <header className="container-x pb-16">
        <p className="label text-cobre">Serviços de Permanência</p>
        <RevealLines
          as="h1"
          lines={[
            "Uma peça Remanesce",
            <>
              não <em>termina</em>.
            </>,
          ]}
          className="serif mt-5 text-h1 text-casca"
        />
        <p className="mt-8 max-w-xl text-[1.15rem] text-indigo/80">{servicesIntro} Agende no ateliê, em Curitiba, ou envie a peça pelos Correios.</p>
        <nav aria-label="Serviços" className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {services.map((s) => (
            <a key={s.key} href={`#${s.key}`} className="label link-stitch">
              {s.title}
            </a>
          ))}
        </nav>
      </header>

      {services.map((s, i) => (
        <section
          key={s.key}
          id={s.key}
          aria-labelledby={`${s.key}-titulo`}
          className={`scroll-mt-20 border-t border-dashed border-cobre/50 py-20 md:py-28 ${i % 2 ? "bg-linho-escuro/60" : ""}`}
        >
          <div className="container-x grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="label text-indigo/50">0{i + 1}</p>
              <Icon name={s.icon} size={48} strokeWidth={0.9} className="mt-6" />
              <h2 id={`${s.key}-titulo`} className="serif mt-6 text-h2 text-casca">
                {s.title}
              </h2>
              <p className="serif mt-4 text-h4 italic">{s.line}</p>
              <p className="mt-6 max-w-md text-indigo/80">{s.detail}</p>
              <p className="label mt-6 flex items-center gap-2 text-indigo/60">
                <Diamond size={5} /> {i === 0 ? "Gratuito por toda a vida da peça" : i === 1 ? "Primeiro ajuste incluído" : "Sob orçamento, a partir de R$ 390"}
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h3 className="label-lg mb-8">Agendar</h3>
              <BookingForm service={s.key} label={s.title} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
