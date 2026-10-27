"use client";

import { Icon } from "@/components/icons/icon";
import { useHydrated } from "@/lib/hooks";
import { useSaved } from "@/lib/store/saved";

/** Guardar a peça: o pinhão fica vermelho, como a semente que a gralha guarda. */
export function SaveButton({ slug, name, className = "", withLabel = false }: { slug: string; name: string; className?: string; withLabel?: boolean }) {
  const hydrated = useHydrated();
  const saved = useSaved((s) => s.slugs.includes(slug));
  const toggle = useSaved((s) => s.toggle);
  const on = hydrated && saved;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={on}
      aria-label={on ? `Remover ${name} dos guardados` : `Guardar ${name}`}
      className={`group/save flex items-center gap-2 transition-colors hover:text-pinhao ${className}`}
    >
      <Icon name="pinhao" filled={on} className="transition-transform duration-500 ease-remanesce group-active/save:scale-90" />
      {withLabel && <span className="label">{on ? "Guardado" : "Guardar"}</span>}
    </button>
  );
}
